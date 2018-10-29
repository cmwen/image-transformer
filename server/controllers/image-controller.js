const {
    parseOptions,
    calcDimensionByWidthAndHeight,
    calcDimensionByMaxEdge,
    isValidDimension,
    isValidFormat
} = require("./image-converter-handler");

const { imageConverter } = require("../util/image-converter");
const {
    invalidFormatError,
    invalidDimensionError,
    fileNotFoundError
} = require("../models/error");
const {
    OPTION_FORMAT,
    OPTION_MAX,
    OPTION_WIDTH,
    OPTION_HEIGHT
} = require("../models/option");
const { retrieveImage, storeImage } = require("../util/image-store");

const DEFAULT_OUTPUT_FORMAT = "jpeg";

exports.collectImageInRequest = function(req, res, next) {
    req.imageConverter = {};

    if (req.file) {
        req.imageConverter.buffer = req.file.buffer;
        req.imageConverter.contentType = req.file.mimetype;
        next();
    } else if (req.body) {
        req.imageConverter.buffer = req.body;
        req.imageConverter.contentType = req.get("content-type");
        next();
    } else {
        throw new Error("Unable to find file in the request.");
    }
};

exports.doReturnOriginalImage = function(req, res) {
    res.set("Content-Type", req.imageConverter.contentType);

    res.send(req.imageConverter.buffer);
};

exports.getOriginalImageBufferByName = async function(req, res, next) {
    const index = req.params.filename;

    try {
        const buf = await retrieveImage(index);

        req.imageConverter = {};
        req.imageConverter.buffer = buf;

        next();
    } catch (err) {
        next(fileNotFoundError(index));
    }
};

exports.doGetOriginalImage = async function(req, res) {
    const converter = imageConverter(req.imageConverter.buffer);
    const metadata = await converter.getMetadata();

    res.set("Content-Type", `image/${metadata.format}`);
    res.send(req.imageConverter.buffer);
};

exports.doSaveImage = async (req, res, next) => {
    const converter = imageConverter(req.imageConverter.buffer);
    try {
        await converter.getMetadata();

        storeImage(req.params.filename, req.imageConverter.buffer);
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};

exports.doConvert = async function(req, res, next) {
    const converter = imageConverter(req.imageConverter.buffer);

    let outputFormat = DEFAULT_OUTPUT_FORMAT;
    let options = parseOptions(req.params.option);

    try {
        const metadata = await converter.getMetadata();

        let targetDimension = {
            width: metadata.width,
            height: metadata.height
        };
        if (options.get(OPTION_WIDTH) && options.get(OPTION_HEIGHT)) {
            targetDimension = calcDimensionByWidthAndHeight(metadata, {
                w: options.get(OPTION_WIDTH),
                h: options.get(OPTION_HEIGHT)
            });
        } else if (options.get(OPTION_MAX)) {
            targetDimension = calcDimensionByMaxEdge(
                metadata,
                options.get(OPTION_MAX)
            );
        }

        if (!isValidDimension(options)) {
            throw invalidDimensionError(req.params.option);
        }

        const format = options.get(OPTION_FORMAT);
        if (format) {
            if (!isValidFormat(format)) {
                throw invalidFormatError(format);
            }
            outputFormat = options.get(OPTION_FORMAT);
        }

        res.set("Content-Type", `image/${outputFormat}`);
        const data = await converter.convert(
            targetDimension.width,
            targetDimension.height,
            outputFormat
        );

        res.send(data);
    } catch (err) {
        next(err);
    }
};

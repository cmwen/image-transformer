const sharp = require("sharp");

const { invalidSourceFormatError } = require("../models/error");

exports.imageConverter = buffer => {
    const img = sharp(buffer);

    return {
        getMetadata: async () =>
            img
                .metadata()
                .then(m => m)
                .catch(err => Promise.reject(invalidSourceFormatError())),
        convert: async (width, height, format) =>
            img
                .resize(width, height)
                .toFormat(format)
                .toBuffer()
                .then(m => m)
                .catch(err => Promise.reject(invalidSourceFormatError())),
    };
};

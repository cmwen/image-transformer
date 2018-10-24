const { LENGTH_OPTIONS } = require("../models/option");

function parseOptions(optionString) {
    const params = optionString.split(",");
    return params
        .map(param => param.split("_"))
        .filter(token => {
            if (token.length === 2) {
                return true;
            } else {
                console.log("Drop invalid format token", token);
                return false;
            }
        })
        .reduce((acc, current) => {
            acc.set(current[0], current[1]);
            return acc;
        }, new Map());
}
exports.parseOptions = parseOptions;

function isValidFormat(format) {
    const lowercaseFormat =
        format && typeof format === "string" ? format.toLowerCase() : "";
    return ["jpeg", "webp", "png"].findIndex(f => f === lowercaseFormat) >= 0;
}
exports.isValidFormat = isValidFormat;

function isValidDimension(options) {
    return (
        LENGTH_OPTIONS.filter(option => {
            const value = options.get(option);
            if (value === undefined) return false;
            const s = parseInt(value);
            return isNaN(s) || s <= 0;
        }).length === 0
    );
}
exports.isValidDimension = isValidDimension;

function calcDimensionByMaxEdge({ width, height }, maxEdge) {
    let scale = maxEdge / Math.max(height, width);
    return {
        width: Math.floor(scale * width),
        height: Math.floor(height * scale)
    };
}
exports.calcDimensionByMaxEdge = calcDimensionByMaxEdge;

function calcDimensionByWidthAndHeight({ width, height }, { w, h }) {
    const fitWithWidth = width / height > w / h;
    let scale;
    if (fitWithWidth) {
        scale = w / width;
    } else {
        scale = h / height;
    }
    return {
        width: Math.floor(scale * width),
        height: Math.floor(height * scale)
    };
}
exports.calcDimensionByWidthAndHeight = calcDimensionByWidthAndHeight;

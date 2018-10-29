exports.invalidFormatError = format => {
    let err = new Error(
        `Target format "${format}" is unsupported. Use jpeg, png, webp instead.`
    );
    err.code = 400;
    return err;
};

exports.invalidDimensionError = option => {
    let err = new Error(`Option "${option}" is invalid.`);
    err.code = 400;
    return err;
};

exports.invalidSourceFormatError = () => {
    let err = new Error(
        `Uploaded file format is unsupported. Try jpeg, png, webp instead.`
    );
    err.code = 400;
    return err;
};

exports.fileNotFoundError = filename => {
    let err = new Error(`File ${filename} cannot be found.`);
    err.code = 404;
    return err;
};

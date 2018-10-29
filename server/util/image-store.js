
const fs = require('fs');
const path = require('path');
const util = require('util');

const uploadDir = process.env.UPLOAD_DIR || './upload';
const appRoot = process.env.PWD;

async function storeImage(name, buffer) {
    const uploadDirPath = path.join(appRoot, uploadDir);
    const pExists = util.promisify(fs.exists);
    const uploadDirExist = await pExists(uploadDirPath);
    
    if (!uploadDirExist) {
        const pMkDir =  util.promisify(fs.mkdir);
        await pMkDir(uploadDirPath);
    }

    const pWriteFile = util.promisify(fs.writeFile);
    return pWriteFile(path.join(appRoot, uploadDir, name), buffer);
}

exports.storeImage = storeImage;

function retrieveImage(name) {
    const pReadFile = util.promisify(fs.readFile);
    return pReadFile(path.join(appRoot, uploadDir, name));
}

exports.retrieveImage = retrieveImage

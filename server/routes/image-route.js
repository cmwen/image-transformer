var multer = require("multer");
var upload = multer();

module.exports = function(app) {
    const controller = require("../controllers/image-controller");

    // On-the-fly conversion
    app.route("/image")
        .post(upload.single("photo"), controller.collectImageInRequest)
        .post(controller.doReturnOriginalImage);

    app.route("/image/:filename")
        .post(upload.single("photo"), controller.collectImageInRequest)
        .post(controller.doSaveImage)
        .get(
            controller.getOriginalImageBufferByName,
            controller.doGetOriginalImage
        );

    // On-the-fly conversion
    app.route("/image/:option")
        .post(upload.single("photo"), controller.collectImageInRequest)
        .post(controller.doConvert);

    app.route("/image/:option/:filename").get(
        controller.getOriginalImageBufferByName,
        controller.doConvert
    );
};

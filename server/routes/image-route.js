var multer = require("multer");
var upload = multer();

module.exports = function(app) {
    const controller = require("../controllers/image-controller");

    app.route("/image/:filename")
        .post(upload.single("photo"), controller.collectImageInRequest)
        .post(controller.doOriginalImage);

    app.route("/image/:option/:filename")
        .post(upload.single("photo"), controller.collectImageInRequest)
        .post(controller.doConvert);
};

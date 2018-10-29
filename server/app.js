const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const port = process.env.NODE_PORT || 9999;
const uploadLimit = process.env.UPLOAD_LIMIT || '1000kb';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "image/*", limit: uploadLimit }));

app.use(express.static(path.join(__dirname, '../client')))

var routes = require("./routes/image-route");
routes(app);

app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + " not found" });
});

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err);
    if (err.code) {
        res.status(err.code).send(err.message);
    } else if (err.type === 'entity.too.large') {
        res.status(400).send(`Uploaded file is too large. Try size under ${uploadLimit}`);
    } else {
        res.status(500).send("Internal Error. Please try again.");
    }
}

app.use(errorHandler);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

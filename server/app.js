const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 9999;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "image/*", limit: "1000kb" }));

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
    } else {
        res.status(500).send("Internal Error. Please try again.");
    }
}

app.use(errorHandler);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

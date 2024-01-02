const express = require("express");
const bodyParser = require("body-parser");
// transport des cookies
const cookie = require("cookie-parser");
const path = require("path");

const app = express();
app.use(cookie());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, "uploads")));

const port = 8000;
require("./database/index");
const routes = require("./routes");

// cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
// utilisation des routes
app.use(routes);
app.listen(port, () => {
    console.log(`serveur Node écoutant sur le port ${port}`);
});
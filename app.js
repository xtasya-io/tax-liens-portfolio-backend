const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const db = require("./src/db");

// Using middlewares to all the requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
Using Cross Origin middelware
**/

const { corsMiddleware } = require("./src/middlewares");
const cors = require("cors")

app.use(corsMiddleware);
app.use(cors());

/* 
  Importing Routes
**/

const routes = require("./src/routes");

/*
  Using Routes
**/

app.use("/api", routes);


/**
 * Static
 */

const _clientDir = "client/build";

app.use("/", express.static(path.resolve(__dirname, `${_clientDir}/`)));

app.get("/  ", (req, res) => {
  res.sendFile(path.join(__dirname, `${_clientDir}/index.html`));
});

module.exports = app;

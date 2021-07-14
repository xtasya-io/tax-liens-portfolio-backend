require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");

const stripeRoutes = require('./src/routes/stripe.routes')

// Using middlewares to all the requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

/*
  Using Cross Origin middelware
**/

const { cors } = require("./src/middlewares");

app.use(cors);

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

// Payment

app.use('/v1/checkout',stripeRoutes)

const _clientDir = "client/build";

app.use("/", express.static(path.resolve(__dirname, `${_clientDir}/`)));

app.get("/  ", (req, res) => {
  res.sendFile(path.join(__dirname, `${_clientDir}/index.html`));
});



module.exports = app;

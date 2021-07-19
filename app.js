require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const stripeRoutes = require("./src/routes/stripe.routes");
const PUBLISHABLE_KEY =
  "pk_test_51ISo8BBdTsia79TvvPiOhcEdgJW5RrLgYuqSmgo7FwC1JdsSIeCd0O867AdapRzapwhZYY8mCfrbqK9yHTh3LPxf00pIAjIYFw";
const SECRET_KEY =
  "sk_test_51ISo8BBdTsia79TvAqLvTk18vcwIA3IqgP1L0ovVH3wqR1zUbjLaEpI8avUH1PdRxNObvtXHqF1Sh1oN5gEBjDIk00HgympT1p";
const stripe = require("stripe")(SECRET_KEY);
// Using middlewares to all the requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

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
app.get("/", (req, res) => {
  res.render("Home", { key: PUBLISHABLE_KEY });
});
app.post("/payment", (req, res) => {
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: "Malek Wahmi",
      address: {
        line1: "23 Mountain Valleyt New Delhi",
        postal_code: "75812",
        city: "oakland",
        state: "california",
        country: "usa",
      },
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: 7000,
        description: "web development Product",
        currency: "USD",
        customer: customer.id,
      })
    })
    .then((charge)=>{
      console.log(charge)
      res.send("Success")
    })
    .catch((err)=>{
      res.send(err)
    })
});

// app.use("/api/payment", stripeRoutes);

const _clientDir = "client/build";

app.use("/", express.static(path.resolve(__dirname, `${_clientDir}/`)));

app.get("/  ", (req, res) => {
  res.sendFile(path.join(__dirname, `${_clientDir}/index.html`));
});

module.exports = app;

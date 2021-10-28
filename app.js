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

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

/*
Using Cross Origin middelware
**/

const { cors } = require("./src/middlewares");

app.use(cors);

app.post("/api/stripe", async (req, res) => {
  try {
    const param = {};
    param.card = {
      number: "4242424242424242",
      exp_month: 2,
      exp_year: 2024,
      cvc: "212",
    };

    stripe.tokens.create(param, function (err, token) {
      if (err) {
        console.log("err: " + err);
      }
      if (token) {
        console.log("success: " + JSON.stringify(token, null, 2));
      } else {
        console.log("Something wrong");
      }
    });

    // const payment = await stripe.paymentIntents.create({
    //   amount,
    //   currency: "USD",
    //   description: "LienTrax Company",
    //   payment_method: id,
    //   confirm: true,
    // });
    // console.log("payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Payment faild",
      success: false,
    });
  }
});
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

require("dotenv").config();
  
const SECRET_KEY =
process.env.SECRET_KEY;
const stripe = require("stripe")(SECRET_KEY);
module.exports = {
  create: (req, res) => {
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
        });
      })
      .then((charge) => {
        console.log(charge);
        res.send("Success");
      })
      .catch((err) => {
        res.send(err);
      });
  },
};

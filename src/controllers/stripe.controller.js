

const PUBLISHABLE_KEY =
  "pk_test_51ISo8BBdTsia79TvvPiOhcEdgJW5RrLgYuqSmgo7FwC1JdsSIeCd0O867AdapRzapwhZYY8mCfrbqK9yHTh3LPxf00pIAjIYFw";
const SECRET_KEY =
  "sk_test_51ISo8BBdTsia79TvAqLvTk18vcwIA3IqgP1L0ovVH3wqR1zUbjLaEpI8avUH1PdRxNObvtXHqF1Sh1oN5gEBjDIk00HgympT1p";
const stripe = require("stripe")(SECRET_KEY);
module.exports = {
  
  create: async (req, res) => {
    const customer = await stripe.customers
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
      });
    res.send("success");
  },
  

};

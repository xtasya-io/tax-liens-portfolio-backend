const { token } = require("morgan");


const stripe = require("stripe")(
  "s_test_51ISo8BBdTsia79TvAqLvTk18vcwIA3IqgP1L0ovVH3wqR1zUbjLaEpI8avUH1PdRxNObvtXHqF1Sh1oN5gEBjDIk00HgympT1p"
);
// module.exports = {
//   create: async (req, res) => {
//     try {
//       const customer = await stripe.customers.create({
//         email: "malek@example.edu",
//       });
//       res.send({ customerId: customer.id, customerEmail: customer.email });
//     } catch (err) {
//       res.send(err);
//     }
//   },
// };

console.log('hi')
module.exports = {
    
  create: async (req, res) => {
    const {
      cardNumber,
      cardExpMonth,
      cardExpYear,
      cardCVC,
      cardName,
      country,
      postal_code,
    } = req.body;
    if (!cardNumber || !cardExpMonth || !cardExpYear || cardCVC) {
      return res.send("Please Provide All Necessary Details to save the card");
    }
    try {
      const customer = await token.create({
        card: {
          name: cardName,
          number: cardNumber,
          exp_month: cardExpMonth,
          exp_year: cardExpYear,
          cvc: cardCVC,
          address_country: country,
          address_zip: postal_code,
        },
      });
      res.send({ customerId: customer.id, stripe_account: StripeAccountId });
      const card = await stripe.customers.createSource({ customerId });
      res.send(card.id);
    } catch (err) {
      res.send(err);
    }
  },
};



const stripe = require("stripe")
module.exports = {
  create: async (req, res) => {
    try {
      const customer = await stripe.customers.create({
        email: "malek@example.edu",
      });
      res.send({ customerId: customer.id, customerEmail: customer.email });
    } catch (err) {
      res.send(err);
    }
  },
// add Card 
  addCard: async (req, res) => {
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
      const cardToken = await stripe.token.create({
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

      return res.send({
        card: card.id,
      });
    } catch (err) {
      res.send(err);
    }
  },
  // create payment charge
  createPayment: async (req, res) => {
    const { amount, cardId, oneTime, email } = req.body;
    if (oneTime) {
      const {
        cardNumber,
        cardExpMonth,
        cardExpYear,
        cardCVC,
        country,
        postalCode,
      } = req.body;

      if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
        return res.send(
          "Necessary Card Details are required for One Time Payment"
        );
      }
      try {
        const cardToken = await stripe.tokens.create({
          card: {
            number: cardNumber,
            exp_month: cardExpMonth,
            exp_year: cardExpYear,
            cvc: cardCVC,
            address_state: country,
            address_zip: postalCode,
          },
        });

        const charge = await stripe.charges.create({
          amount: amount,
          currency: "usd",
          source: cardToken.id,
          receipt_email: email,
          description: `Stripe Charge Of Amount ${amount} for One Time Payment`,
        });

        if (charge.status === "succeeded") {
          return res.send({ Success: charge });
        } else {
          return res.send("Please try again later for One Time Payment");
        }
      } catch (error) {
        return res.send(error);
      }
    } else {
      try {
        const createCharge = await stripe.charges.create({
          amount: amount,
          currency: "usd",
          receipt_email: email,
          customer: customerId,
          card: cardId,
          description: `Stripe Charge Of Amount ${amount} for Payment`,
        });
        if (createCharge.status === "succeeded") {
          return res.send("Success");
        } else {
          return res
            .status(400)
            .send({ Error: "Please try again later for payment" });
        }
      } catch (error) {
        return res.send(error);
      }
    }
  },
};

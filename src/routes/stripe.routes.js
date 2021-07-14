const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripe.controller')

router.post("/customer",stripeController.create)

router.post("/addcard",stripeController.addCard)

router.post("/payment",stripeController.createPayment)


module.exports = router;
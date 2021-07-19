const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripe.controller')

router.post("/payment",stripeController.create)



// router.post("/payment",stripeController.createPayment)


module.exports = router;
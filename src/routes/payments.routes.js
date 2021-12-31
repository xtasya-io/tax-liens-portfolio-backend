const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/payments.controller');
const { authenticateToken } = require('../middlewares');
const { authorize } = require("../middlewares/authorize");

router.post(
    '/:id/init-payment',
    authenticateToken,
    authorize(["client"]),
    paymentsController.initPayment
)

module.exports = router;
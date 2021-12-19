const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/payments.controller');
const { authenticateToken } = require('../middlewares')

router.post('/:id/init-payment', authenticateToken, paymentsController.initPayment)

module.exports = router;
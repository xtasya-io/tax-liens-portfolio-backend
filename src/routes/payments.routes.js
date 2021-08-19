const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/payments.controller');
const { authenticateToken } = require('../middlewares')

router.get('/details/users/:id', authenticateToken, paymentsController.getPayment)
// router.post('/details/users/:id', authenticateToken, paymentsController.createPayment)

router.get('/status/users/:id', authenticateToken, paymentsController.getPaymentStatus)

module.exports = router;
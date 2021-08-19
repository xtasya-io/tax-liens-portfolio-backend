const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/payments.controller');
const { authenticateToken } = require('../middlewares')

router.get('/', authenticateToken, paymentsController.getAllPayments)
router.post('/', authenticateToken, paymentsController.createPayment)
router.get('/users/:id', authenticateToken, paymentsController.getUserPayments)
router.get('/details/users/:id', authenticateToken, paymentsController.getUserActivePayment)
router.get('/status/users/:id', authenticateToken, paymentsController.getPaymentStatus)

module.exports = router;
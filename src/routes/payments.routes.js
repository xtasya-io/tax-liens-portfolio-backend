const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/payments.controller');
const { authenticateToken } = require('../middlewares')

router.get('/', authenticateToken, paymentsController.getAllPayments)
router.post('/', authenticateToken, paymentsController.createPayment)
router.post('/create-portal-session', authenticateToken, paymentsController.createPortalSession)

module.exports = router;
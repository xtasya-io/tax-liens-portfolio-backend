const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/payments.controller');
const { authenticateToken } = require('../middlewares')

router.get('/', authenticateToken, paymentsController.getAllPayments)
router.post('/', authenticateToken, paymentsController.createPayment)
// router.post('/create-portal-session', authenticateToken, paymentsController.createPortalSession)

router.post('/:id/init-payment', authenticateToken, paymentsController.initPayment)

module.exports = router;
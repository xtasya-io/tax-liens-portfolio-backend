const express = require('express');
const router = express.Router();
const usersContoller = require('../controllers/users.controller');
const { authenticateToken } = require('../middlewares/index')
const paymentsController = require('../controllers/payments.controller');

router.get("/", usersContoller.getAllUsers);
router.put("/:id", usersContoller.updateUser);
router.put("/ban/:id", authenticateToken, usersContoller.banUser);
router.put("/unban/:id", authenticateToken, usersContoller.unbanUser);

// Activation

router.put("/:id/activate", authenticateToken, usersContoller.activateAccount)

// Payments routes

router.get('/:id/payments', authenticateToken, paymentsController.getUserPayments)
router.get('/:id/payments/active-payment', authenticateToken, paymentsController.getUserActivePayment)
router.get('/:id/payments/status', authenticateToken, paymentsController.getUserPaymentStatus)
router.get('/:id/payments/latest-payment', authenticateToken, paymentsController.getUserLatestPayment)

module.exports = router;
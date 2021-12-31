const express = require('express');
const router = express.Router();
const usersContoller = require('../controllers/users.controller');
const { authenticateToken } = require('../middlewares/index')
const paymentsController = require('../controllers/payments.controller');

router.get("/", usersContoller.getAllUsers);
router.get("/:id", usersContoller.getUserById);
router.put("/:id", usersContoller.updateUser);
router.put("/ban/:id", authenticateToken, usersContoller.banUser);
router.put("/unban/:id", authenticateToken, usersContoller.unbanUser);

// Activation

router.put("/:id/activate", authenticateToken, usersContoller.activateAccount)

module.exports = router;
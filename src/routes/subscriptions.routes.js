const express = require('express');
const router = express.Router();
const subscriptionsController = require('../controllers/subscriptions.controller');
const { authorize } = require('../middlewares/authorize');
const { authenticateToken } = require('../middlewares/index')

router.get(
    "/users/:id",
    authenticateToken,
    authorize(["client", "admin"]),
    subscriptionsController.getUserSubscription
);

module.exports = router;
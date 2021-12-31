const express = require('express');
const router = express.Router();
const adminContoller = require('../controllers/admin.controller');
const { authenticateToken } = require('../middlewares');
const { authorize } = require('../middlewares/authorize');

router.post("/", authenticateToken, authorize(["admin"]), adminContoller.createAdmin)

module.exports = router;
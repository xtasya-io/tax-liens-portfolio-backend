const express = require('express');
const router = express.Router();
const authContoller = require('../controllers/auth.controller')

router.post("/admin/login", authContoller.login)

module.exports = router;
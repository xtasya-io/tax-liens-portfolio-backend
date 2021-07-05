const express = require('express');
const router = express.Router();
const adminContoller = require('../controllers/admin.controller')

router.post("/", adminContoller.createAdmin)

module.exports = router;
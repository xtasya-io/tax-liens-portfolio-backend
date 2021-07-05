const express = require('express');
const router = express.Router();
const usersContoller = require('../controllers/users.controller')

router.get("/", usersContoller.getAllUsers);
router.put("/:id", usersContoller.updateUser);

module.exports = router;
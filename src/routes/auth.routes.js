const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');
const { createUserSchema } = require("../validations/users.validation")
const checkSchemaErrors = require("../middlewares/schema-errors")
const authContoller = require('../controllers/auth.controller');

router.post("/admin/login", authContoller.login)
router.post("/users/login", authContoller.login)

router.post("/users/registration",
    checkSchema(createUserSchema),
    checkSchemaErrors,
    authContoller.registerUser
)

module.exports = router;
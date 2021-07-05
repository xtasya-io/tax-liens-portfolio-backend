const express = require("express");
const router = express.Router();
const taxLiensContoller = require("../controllers/taxLiens.controller");

router.get("/", taxLiensContoller.getAllTaxLiens);

module.exports = router;

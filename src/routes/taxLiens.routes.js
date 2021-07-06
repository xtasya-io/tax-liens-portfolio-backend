const express = require("express");
const router = express.Router();
const taxLiensContoller = require("../controllers/taxLiens.controller");

router.get("/", taxLiensContoller.getAllTaxLiens);
router.post("/", taxLiensContoller.createTaxLien);
router.put("/:id", taxLiensContoller.updateTaxLien);
router.delete("/:id", taxLiensContoller.deleteTaxLien);

module.exports = router;

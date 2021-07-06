const express = require("express");
const router = express.Router();
const taxLiensController = require("../controllers/taxLiens.controller");

router.get("/", taxLiensController.getTaxLiens);
router.post("/", taxLiensController.createTaxLien);
router.put("/:id", taxLiensController.updateTaxLien);
router.delete("/:id", taxLiensController.deleteTaxLien);

module.exports = router;

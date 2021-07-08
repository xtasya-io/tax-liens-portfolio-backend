const express = require("express");
const router = express.Router();
const taxLiensContoller = require("../controllers/taxLiens.controller");

router.get("/", taxLiensContoller.getAllTaxLiens);
router.get("/:id", taxLiensContoller.getTaxLienById);
router.post("/", taxLiensContoller.createTaxLien);
router.put("/:id", taxLiensContoller.updateTaxLien);
router.delete("/:id", taxLiensContoller.deleteTaxLien);

module.exports = router;

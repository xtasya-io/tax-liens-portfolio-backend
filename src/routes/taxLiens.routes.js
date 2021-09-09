const express = require("express");
const router = express.Router();
const taxLiensController = require("../controllers/taxLiens.controller");

router.get("/", taxLiensController.getTaxLiens);
router.get("/:id", taxLiensController.getTaxLienById);
router.get("/users/:id", taxLiensController.getTaxLiensByUser);
router.get('/users/:id/charts', taxLiensController.getTaxLiensCharts)

router.post("/", taxLiensController.createTaxLien);
router.put("/:id", taxLiensController.updateTaxLien);
router.delete("/:id", taxLiensController.deleteTaxLien);

router.put("/active-status/:id", taxLiensController.markTaxlienAsActive);
router.put("/overdue-status/:id", taxLiensController.markTaxlienAsOverdue);

module.exports = router;

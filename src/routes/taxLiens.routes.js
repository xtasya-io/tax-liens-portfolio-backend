const express = require("express");
const router = express.Router();
const taxLiensController = require("../controllers/taxLiens.controller");
const authenticateToken = require("../middlewares/authenticate-token");
const { authorize } = require("../middlewares/authorize");

// Fetch Taxliens

router.get("/", 
    authenticateToken, 
    authorize(["client"], true), 
    taxLiensController.getTaxLiens
);

router.get("/:id", 
    authenticateToken, 
    authorize(["client"], true), 
    taxLiensController.getTaxLienById
);

router.get("/users/:id", 
    authenticateToken, 
    authorize(["client"], true), 
    taxLiensController.getTaxLiensByUser
);

router.get('/users/:id/charts', 
    authenticateToken, 
    authorize(["client"], true), 
    taxLiensController.getTaxLiensCharts
);

// Create and update Taxliens

router.post("/", 
    authenticateToken, 
    authorize(["client"], true), 
    taxLiensController.createTaxLien
);

router.put("/:id", 
    authenticateToken, 
    authorize(["client"], true), 
    taxLiensController.updateTaxLien
);

router.delete("/:id", 
    authenticateToken, 
    authorize(["client"], true), 
    taxLiensController.deleteTaxLien
);

// Update Taxliens status

router.put("/active-status/:id", 
    authenticateToken, 
    authorize(["client"], true), 
    taxLiensController.markTaxlienAsActive
);

router.put("/overdue-status/:id", 
    authenticateToken, 
    authorize(["client"], true), 
    taxLiensController.markTaxlienAsOverdue
);

module.exports = router;

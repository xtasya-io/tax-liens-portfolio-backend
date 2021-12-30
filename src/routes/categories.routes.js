const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller');
const { authenticateToken } = require('../middlewares');
const { authorize } = require('../middlewares/authorize');

router.route('/', authenticateToken)
    .get(
        authorize(["client", "admin"]),
        categoriesController.getAllCategories
    )
    .post(
        authorize(["admin"]),
        categoriesController.createCategory
    )

router.route('/:categoryId', authenticateToken)
    .put(
        authorize(["admin"]),
        categoriesController.updateCategory
    )
    .delete(
        authorize(["admin"]),
        categoriesController.deleteCategory
    )

// Not needed

router.delete('/delete-by-code/:categoryCode', categoriesController.deleteCategoryByCode)

router.post('/delete-multiple', categoriesController.deleteCategories)

module.exports = router;
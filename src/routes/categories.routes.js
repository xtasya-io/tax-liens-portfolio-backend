const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller');
const { authenticateToken } = require('../middlewares')

router.route('/', authenticateToken)
    .get(categoriesController.getAllCategories)
    .post(categoriesController.createCategory)

router.route('/:categoryId', authenticateToken)
    .put(categoriesController.updateCategory)
    .delete(categoriesController.deleteCategory)

router.delete('/delete-by-code/:categoryCode', categoriesController.deleteCategoryByCode)

router.post('/delete-multiple', categoriesController.deleteCategories)

module.exports = router;
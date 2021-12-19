const { categoriesService } = require('../services')
const catchAsync = require('../utils/catchAsync')
const httpStatus = require("http-status")

module.exports = {

    getAllCategories: catchAsync(async (req, res) => {
        let categories = await categoriesService.getCategories();
        res.status(httpStatus.OK).send(categories)
    }),

    createCategory: catchAsync(async (req, res) => {
        let category = await categoriesService.createCategory(req.body);
        if (category) res.status(httpStatus.OK).send(category.dataValues)
    }),

    updateCategory: catchAsync(async (req, res) => {
        let category = await categoriesService.updateCategory(req.params.categoryId, req.body)
        if (category) res.status(httpStatus.OK).send(category)
    }),

    deleteCategory: catchAsync(async (req, res) => {
        let deleted = await categoriesService.deleteCategory(req.params.categoryId)
        if (deleted > 0) res.status(httpStatus.OK).json({ message: 'Deleted' })
    }),

    deleteCategoryByCode: catchAsync(async (req, res) => {
        let deleted = await categoriesService.deleteCategoryByCode(req.params.categoryCode)
        if (deleted > 0) res.status(httpStatus.OK).json({ message: 'Deleted' })
    }),

    deleteCategories: catchAsync(async (req, res) => {
        let deleted = await categoriesService.deleteCategories(req.body.categoriesCodes)
        if (deleted > 0) res.status(httpStatus.OK).json({ message: 'Deleted' })
    })
}
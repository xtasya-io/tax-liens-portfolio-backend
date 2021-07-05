const { Category } = require("../models");
const repository = require("../repositories/base.repository")

module.exports = {
    /**
     * Get attributes from Categories where filter
     * @param {object} filter
     * @param {Array<string>} attributes
     * @returns {Promise<{count: number, rows: Category[]}>}
     */
    getCategories: async (filter = {}, attributes = ["id", "code", "title"]) => {
        return repository.find(Category, { where: filter }, { attributes: attributes })
    },

    /**
     * Create a new Category
     * @param {object} categoryData
     * @returns {Promise<Category>}
     */
    createCategory: async (categoryData) => {
        const codetaken = await Category.isCodeTaken(categoryData.code)
        if (codetaken) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Code already taken');
        }
        return repository.create(Category, categoryData);
    },

    /**
     * Update a Category
     * @param {string} categoryId
     * @param {object} categoryData
     * @returns {Promise<Category>}
     */
    updateCategory: async (categoryId, categoryData) => {
        return repository.update(Category, { id: categoryId }, categoryData)
    },

    /**
     * Delete a Category
     * @param {string} categoryId
     * @returns {Promise<number>}
     */
    deleteCategory: async (categoryId) => {
        return repository.delete(Category, { id: categoryId })
    },

    /**
     * Delete a Category
     * @param {string} categoryCode
     * @returns {Promise<number>}
     */
    deleteCategoryByCode: async (categoryCode) => {
        return repository.delete(Category, { code: categoryCode })
    },

    /**
     * Delete multiple categories
     * @param {array} categoriesCodes
     * @returns {Promise<number>}
     */
    deleteCategories: async (categoriesCodes) => {
        return repository.deleteMultiple(Category, { where: { code: categoriesCodes } })
    }
}
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../db/connection');

/**
 * @typedef Category
 */
class Category extends Model { }

/**
 * Check if code does not exist already
 * @param {number} code
 * @returns {Promise<boolean>}
 */
Category.isCodeTaken = function (code) {
    const category = Category.findAll({ where: { code: code } })
    return (!!category.length)
};

Category.init(
    {
        code: {
            type: DataTypes.STRING(4),
            allowNull: false,
            unique: true,
            validate(value) {
                if (value.length > 4) {
                    throw new Error('category code needs to be a 4 digit number')
                }
            }
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

    },
    { sequelize }
)

module.exports = Category;
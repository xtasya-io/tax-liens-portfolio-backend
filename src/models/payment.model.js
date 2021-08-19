const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../db/connection');

/**
 * @typedef Payment
 */
class Payment extends Model { }

Payment.init(
    {

        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },

        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        },

        type: {
            type: DataTypes.ENUM(['month', 'year']),
            allowNull: false
        }

    },
    { sequelize }
)

module.exports = Payment;
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../db/connection');

/**
 * @typedef User
 */
class User extends Model { }

User.init(
    {
        email: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate(value) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error('Password must contain at least one letter and one number');
                }
            },
            private: true, // used by the toJSON plugin
        },
        firstName: {
            type: DataTypes.STRING(32),
            allowNull: false,
            field: "first_name"
        },
        lastName: {
            type: DataTypes.STRING(32),
            allowNull: false,
            field: "last_name"
        },
        phone: {
            type: DataTypes.STRING(32)
        },
        isBanned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    // {
    //     freezeTableName: true
    // }
    { sequelize })

module.exports = User;
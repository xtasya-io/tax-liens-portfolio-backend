const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../db/connection');
const bcrypt = require("bcryptjs")

/**
 * @typedef User
 */
class User extends Model {
    /**
     * Check if password matches the admin's password
     * @param {string} password
     * @returns {Promise<boolean>}
     */
    isPasswordMatch = function (password) {
        return bcrypt.compare(password, this.password);
    };
}

/**
 * Check if email is taken
 * @param {string} email - The new user's email
 * @param {ObjectId} [excludeUserId] - The id of the admin to be excluded
 * @returns {Promise<boolean>}
 */
User.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

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
        },
        // birthDate: {
        //     type: DataTypes.DATE
        // },
        firstLineAddress: {
            type: DataTypes.STRING(64),
        },
        secondLineAddress: {
            type: DataTypes.STRING(64),
        },
        county: {
            type: DataTypes.STRING(64),
        },
        state: {
            type: DataTypes.STRING(64),
        },
        country: {
            type: DataTypes.STRING(64),
        },
        zipCode: {
            type: DataTypes.INTEGER(5),
        },
    },
    // {
    //     freezeTableName: true
    // }
    { sequelize })

module.exports = User;
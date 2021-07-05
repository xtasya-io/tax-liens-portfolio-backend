// const { Sequelize, DataTypes, Model } = require('sequelize');
// const sequelize = require('../db/connection');
// const validator = require("validator");
// const bcrypt = require('bcryptjs');

// /**
//  * @typedef Admin
//  */
// class Admin extends Model {
//     /**
//      * Check if password matches the admin's password
//      * @param {string} password
//      * @returns {Promise<boolean>}
//      */
//     // isPasswordMatch = function (password) {
//     //     return bcrypt.compare(password, this.password);
//     // };

// }

// /**
//  * Check if email is taken
//  * @param {string} email - The admin's email
//  * @param {ObjectId} [excludeAdminId] - The id of the admin to be excluded
//  * @returns {Promise<boolean>}
//  */
// Admin.isEmailTaken = async function (email, excludeAdminId) {
//     const admin = await this.findOne({ email, _id: { $ne: excludeAdminId } });
//     return !!admin;
// };

// Admin.init(
//     {
//         email: {
//             type: DataTypes.STRING(64),
//             allowNull: false,
//             unique: true,
//             validate(value) {
//                 if (!validator.isEmail(value)) {
//                     throw new Error('Invalid email');
//                 }
//             },
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate(value) {
//                 if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
//                     throw new Error('Password must contain at least one letter and one number');
//                 }
//             },
//             private: true, // used by the toJSON plugin
//         },
//         firstName: {
//             type: DataTypes.STRING(32),
//             allowNull: false,
//             field: "first_name"
//         },
//         lastName: {
//             type: DataTypes.STRING(32),
//             allowNull: false,
//             field: "last_name"
//         },
//         phone: {
//             type: DataTypes.STRING(32)
//         },
//     },
//     // {
//     //     freezeTableName: true
//     // }
//     { sequelize })

// // const { DataTypes } = require('sequelize');
// const Person = require("./person.model");
// // const sequelize = require('../db/connection');

// /**
//  * @typedef Admin
//  */
// class Admin extends Person {
// }

// Admin.init(
//     {},
//     { sequelize }
// )

// module.exports = Admin;
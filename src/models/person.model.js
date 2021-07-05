// const { Sequelize, DataTypes, Model } = require('sequelize');
// const sequelize = require('../db/connection');

// /**
//  * @typedef Person
//  */
// class Person extends Model {

//     /**
//      * Check if password matches the person's password
//      * @param {string} password
//      * @returns {Promise<boolean>}
//      */
//     isPasswordMatch = function (password) {
//         return bcrypt.compare(password, this.password);
//     };

// }

// /**
//  * Check if email is taken
//  * @param {string} email - The person's email
//  * @param {ObjectId} [excludePersonId] - The id of the person to be excluded
//  * @returns {Promise<boolean>}
//  */
// Person.isEmailTaken = async function (email, excludePersonId) {
//     const person = await this.findOne({ email, _id: { $ne: excludePersonId } });
//     return !!person;
// };

// const personSchema = {
//     email: {
//         type: DataTypes.STRING(64),
//         allowNull: false,
//         unique: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Invalid email');
//             }
//         },
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate(value) {
//             if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
//                 throw new Error('Password must contain at least one letter and one number');
//             }
//         },
//         private: true, // used by the toJSON plugin
//     },
//     firstName: {
//         type: DataTypes.STRING(32),
//         allowNull: false,
//         field: "first_name"
//     },
//     lastName: {
//         type: DataTypes.STRING(32),
//         allowNull: false,
//         field: "last_name"
//     },
//     phone: {
//         type: DataTypes.STRING(32)
//     },
//     isBanned: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     },
//     isAdmin: {
//         type: DataTypes.BOOLEAN,

//     }
// }

// Person.schema(personSchema)

// module.exports = Person;
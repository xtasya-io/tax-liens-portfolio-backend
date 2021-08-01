require("dotenv").config()
const { User } = require("../models");
const repository = require("../repositories/base.repository");
const bcrypt = require("bcryptjs");


/**
 * Get attributes from Users where filter
 * @param {object} filter
 * @param {Array<string>} attributes
 * @returns {Promise<{count: number, rows: User[]}>}
 */
const getUsers = async (filter = {}, attributes = ["id", "firstName", "lastName", "email", "phone"]) => {
    return repository.find(User, { where: filter }, { attributes: attributes })
}

/**
 * Update User By id
 * @param {Number} userId
 * @param {Object} data
 * @returns {Promise<User>}
 */
const updateUser = async (userId, userData) => {
    return User.update({
        userData,
        where: { id: userId }
    })
}

/**
 * Get user by email
 * @param {String} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
    return User.findOne({ where: { email: email } }, { attributes: { exclude: ['password'] } })
}

/**
 * Create new user
 * @param {Object} userData
 * @returns {Promise<User>}
 */
const createUser = async (userData) => {
    let { firstName, lastName, email, password } = userData
    // if (User.isEmailTaken(email)) throw Error("User already exists")
    password = await bcrypt.hash(password, 10)
    return User.create({
        firstName,
        lastName,
        email,
        password
    })
}

/**
 * ban a user
 * @param {Number} userId
 * @returns {Promise<User>}
 */
const banUser = async (userId) => {
    return User.update(
        { isBanned: true },
        { where: { id: userId } },
    )
}

/**
 * unban a user
 * @param {Number} userId
 * @returns {Promise<User>}
 */
const unbanUser = async (userId) => {
    return User.update(
        { isBanned: false },
        { where: { id: userId } },
    )
}

module.exports = { getUsers, updateUser, getUserByEmail, createUser, banUser, unbanUser }
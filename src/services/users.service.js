const { User } = require("../models");
const repository = require("../repositories/base.repository");


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
 * Get attributes from Users where filter
 * @param {Object} filter
 * @param {Array<string>} attributes
 * @returns {Promise<{count: number, rows: User[]}>}
 */
const updateuser = async (id) => {
    return repository.update(User, { id: id }, id)
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
    console.log("Creating user ...")
}

module.exports = { getUsers, updateuser, getUserByEmail }
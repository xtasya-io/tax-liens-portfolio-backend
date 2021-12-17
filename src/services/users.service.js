require("dotenv").config()
const { User } = require("../models");
const repository = require("../repositories/base.repository");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const paymentsService = require("./payments.service");


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
 * Get one user by id
 * @param {Number} userId
 * @returns {Promise<User>}
 */
const getUserById = async (userId, attributes = ["id", "firstName", "lastName", "email", "phone"]) => {
    return User.findByPk(userId, { attributes: attributes })
}

/**
 * Update User By id
 * @param {Number} userId
 * @param {Object} data
 * @returns {Promise<User>}
 */
const updateUser = async (userId, userData) => {
    return User.update(
        userData,
        { where: { id: userId } }
    )
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
    
    // Getting data from the request body
    let { firstName, lastName, email, password } = userData
    
    // Returning user exist in case email is used
    if (await User.findOne({ where: { email: email } })) throw new ApiError(httpStatus.CONFLICT, "User already exists")
    
    // Hashing the password
    try {
        password = await bcrypt.hash(password, 10)
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error)
    }

    // Creating the new user object
    let user = Object.assign({}, {
        firstName,
        lastName,
        email,
        password,
        status: "free",
        subscriptionId: null
    })

    // Save the new user in the database
    return User.create(user)
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

/**
 * activate user account
 * @param {Number} userId
 * @returns {Promise<StripeSession>} 
 */
const activateAccount = async (userId, plan) => {

        // Getting user by id
        let user = User.findOne({ id: userId })

        // Throwing error if user do not exist
        if (!user) throw new ApiError(httpStatus.NOT_FOUND, "Could not find user!")

        // Throwing error if user account is premium
        if (user.status === "premium") throw new ApiError(httpStatus.CONFLICT, "User account is already premium")

        // Get price id by plan type
        let priceId = null;

        switch (plan) {
            case "month":
                priceId = process.env.MONTH_PLAN_PRICE_ID
                break;
            case "year":
                priceId = process.env.YEAR_PLAN_PRICE_ID
                break;
            default:
                throw new ApiError(500, "Could not process selected plan")
        }

        // Creating stripe session
        let payment = await paymentsService.createPayment(userId, priceId)

        return payment.url

}

module.exports = { getUsers, getUserById, updateUser, getUserByEmail, createUser, banUser, unbanUser, activateAccount }
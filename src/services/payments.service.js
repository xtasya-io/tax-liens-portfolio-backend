const httpStatus = require("http-status")
const { Payment } = require("../models")
const ApiError = require('../utils/ApiError')

/**
 * Get Active Payment of User
 * @param {String} userId
 * @returns {Promise<Payment>}
 */
const getUserActivePayment = async (userId) => {
    return Payment.findOne({
        where: { user: userId, isActive: true }
    })
}

/**
 * Get Current Payment of User
 * @param {String} userId
 * @returns {Promise<Payment>}
 */
const getUserCurrentPayment = async (userId) => {
    return Payment.findAndCountAll({
        where: { user: userId },
        order: [
            ['endDate', 'DESC'],
            ['startDate', 'DESC']
        ],
        limit: 1
    })
}

/**
 * Get Payments of User
 * @param {String} userId
 * @returns {Promise<Payment>}
 */
const getPaymentsByUser = async (userId) => {
    return Payment.findAll({
        where: { user: userId },
        order: [
            ['endDate', 'DESC'],
            ['startDate', 'DESC']
        ]
    })
}

/**
 * Get Payment Status of User
 * @param {String} userId
 * @returns {Boolean}
 */
const getUserPaymentStatus = async (userId) => {
    let payment = (await getUserCurrentPayment(userId)).rows[0]
    if (!payment) {
        return false
    }
    let endDate = new Date(payment.endDate)
    return endDate.getTime() - Date.now() > 0
}

/**
 * Create a new payment
 * @param {String} userId
 * @returns {Boolean}
 */
const createPayment = async ({ userId, type }) => {

    let existingPayment = await Payment.findOne({ where: { user: userId, isActive: true } })
    if (existingPayment) {
        throw new ApiError(httpStatus.CONFLICT, "User has an active payment already")
    }

    let startDate = new Date();
    let endDate;

    switch (type) {
        case 'month':
            endDate = startDate.setMonth(startDate.getMonth() + 1)
            break;
        case 'year':
            endDate = startDate.setFullYear(startDate.getFullYear() + 1)
            break;
        default:
            throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, "Invalid subscription type")
    }

    return Payment.create({
        user: userId,
        startDate,
        endDate,
        type,
        isActive: true
    })

}

/**
 * Get Payment Status of User
 * @returns {Promise<User[]>}
 */
const getAllPayments = async () => {

    return Payment.findAll()

}

module.exports = {
    getUserActivePayment,
    getPaymentsByUser,
    getUserPaymentStatus,
    createPayment,
    getAllPayments
}
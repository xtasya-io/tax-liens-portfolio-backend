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
 * Get Latest Payment of User
 * @param {String} userId
 * @returns {Promise<Payment>}
 */
const getUserLatestPayment = async (userId) => {
    let payments = await Payment.findAndCountAll({
        where: { user: userId },
        order: [
            ['endDate', 'DESC'],
            ['startDate', 'DESC']
        ],
        limit: 1
    })
    return payments.rows[0]
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
    let payment = (await getUserLatestPayment(userId)).rows[0]
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
    // if (existingPayment) {
    //     throw new ApiError(httpStatus.CONFLICT, "User has an active payment already")
    // }

    let startDate;

    if (!existingPayment) startDate = new Date();

    if (existingPayment) {
        startDate = new Date(
            existingPayment.endDate.setDate(
                existingPayment.endDate.getDate() + 1
            ));

    }

    let endDate = new Date(startDate)

    switch (type) {
        case 'month':
            endDate = endDate.setMonth(endDate.getMonth() + 1)
            break;
        case 'year':
            endDate = endDate.setFullYear(endDate.getFullYear() + 1)
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

    return Payment.findAll({
        order: [
            ['startDate', 'DESC']
        ]
    })

}

module.exports = {
    getUserLatestPayment,
    getUserActivePayment,
    getPaymentsByUser,
    getUserPaymentStatus,
    createPayment,
    getAllPayments
}
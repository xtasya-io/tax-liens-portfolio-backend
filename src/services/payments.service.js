const httpStatus = require("http-status")
const { Payment, User } = require("../models")
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
    if (payments.rows.length == 0) throw new ApiError(404, "No payments for the current user")
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
    let payment = await (getUserLatestPayment(userId))
    if (!payment) {
        return false
    }
    let endDate = new Date(payment.endDate)
    return endDate.getTime() > Date.now()
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
 * Get all the payments
 * @returns {Promise<Payment[]>}
 */
const getAllPayments = async () => {

    return Payment.findAll({
        order: [
            ['startDate', 'DESC']
        ],
        include: [{ model: User }]
    })

}

/**
 * Get all the payments
 * @returns {Promise<User[]>}
 */
const markPaymentAsOverdue = async () => {

    let payments = await Payment.findAll({
        where: { isActive: true },
        order: [
            ['startDate', 'DESC']
        ]
    })

    Promise.all(payments.map(async (payment) => {
        if (new Date(payment.endDate) < new Date()) {
            // if (new Date(payment.endDate) < new Date('2021-11-17T03:24:00')) {
            payment.setDataValue("isActive", false)
            console.log('updating payment #', payment.id)
            await payment.save()
        }
    }))

}

module.exports = {
    getUserLatestPayment,
    getUserActivePayment,
    getPaymentsByUser,
    getUserPaymentStatus,
    markPaymentAsOverdue,
    createPayment,
    getAllPayments
}
const httpStatus = require("http-status")
const { Payment } = require("../models")

/**
 * Get Payment of User
 * @param {String} userId
 * @returns {Promise<Payment>}
 */
const getUserPayment = async (userId) => {
    return Payment.findOne({
        where: { user: userId }
    })
}

/**
 * Get Payment Status of User
 * @param {String} userId
 * @returns {Boolean}
 */
const getUserPaymentStatus = async (userId) => {
    let payment = await Payment.findOne({
        where: { user: userId }
    })
    if (!payment) {
        return false
    }
    let endDate = new Date(payment.endDate)
    return endDate.getTime() - Date.now() > 0
}

/**
 * Get Payment Status of User
 * @param {String} userId
 * @returns {Boolean}
 */
const createPayment = async ({ userId, type }) => {

    let existingPayment = await Payment.findOne({ where: { user: userId, isActive: true } })
    if (existingPayment) {
        throw new Error("User has an active payment already")
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
            throw new Error("Invalid subscription type")
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
    getUserPayment,
    getUserPaymentStatus,
    createPayment,
    getAllPayments
}
require("dotenv").config();
const httpStatus = require("http-status");
const { Payment, User } = require("../models");
const ApiError = require('../utils/ApiError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
const createPayment = async (userId, priceId) => {

    try {
        // Call to Stripe API to create payment session
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'], // TODO: enable paypal
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            success_url: process.env.USER_DASHBOARD_URL + '/#/payment-success',
            cancel_url: process.env.USER_DASHBOARD_URL + '/#/payment-fail'
        })

        // Return Stripe session
        return (session)
    
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error)
    }

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

/**
 * init payment
 * @param {Number} userId
 * @returns {Promise<StripeSession>} 
 */
 const initPayment = async (userId, plan) => {

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
    let payment = await createPayment(userId, priceId)

    return payment

}


module.exports = {
    getUserLatestPayment,
    getUserActivePayment,
    getPaymentsByUser,
    getUserPaymentStatus,
    markPaymentAsOverdue,
    createPayment,
    getAllPayments,
    initPayment
}
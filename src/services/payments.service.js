require("dotenv").config();
const httpStatus = require("http-status");
const { Payment, User } = require("../models");
const ApiError = require('../utils/ApiError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


/**
 * Create a new payment
 * @param {String} priceId
 * @returns {Boolean}
 */
const createPayment = async (priceId) => {

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
    let payment = await createPayment(priceId)

    return payment

}


module.exports = {
    createPayment,
    initPayment
}
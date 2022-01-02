require("dotenv").config()

const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
// const usersService = require('./users.service');
const User = require("../models/user.model");

const Stripe = require('stripe');
const Subscription = require("../models/subscription.model");

module.exports = {
  /**
   * Get All Subscriptions list
   * @returns {Promise<{count: number, rows: TaxLien[]}>}
   */
  getAllSubscriptions: async () => {
  },

  /**
   * Get All Subscriptions list
   * @param id
   * @returns {Promise<Subscription>}
   */
  getSubscriptionById: async (id) => {
    let subscription = await Subscription.findByPk(id)

    if (!subscription) throw new ApiError(httpStatus.NOT_FOUND, "Subscription not found")

    return subscription
  },   

  /**
   * Get All Subscriptions list
   * @param userId
   * @returns {Promise<Subscription>}
   */
  getSubscriptionByUserId: async (userId) => {

    // Get user by userId
    const user = await User.findByPk(userId);

    // Get susbcription data
    let subscriptionId = user.subscriptionId

    // Throw an error if user have no subscriptionId
    if (!subscriptionId) throw new ApiError(httpStatus.NOT_FOUND, "No subscription associated to this user")

    let subscription = await Subscription.findByPk(subscriptionId)

    if (!subscription) throw new ApiError(httpStatus.NOT_FOUND, "Subscription not found")

    return subscription;

  },

  /**
   * Confirm subscription
   * @returns {Promise<{Subscription>}
   */
  ConfirmTemporarySubscription: async (subscriptionId) => {

    // Getting the subscription by Id
    let subscription = await Subscription.findOne({ id: subscriptionId })
    if (!subscription) throw new ApiError(httpStatus.NOT_FOUND, "Could not find the user's subscription")
    if (subscription.status !== "temporary") throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, "Could not process payment, please contact admin")

    // Initializing Stripe with the secret key
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    // Getting the payment session data from Stripe API
    let session = await stripe.checkout.sessions.retrieve(
        subscription.sessionId
    );

    // Checking if the payment was done
    if (subscription.payment_status === "unpaid") throw new ApiError(httpStatus.EXPECTATION_FAILED, "Payment has not been done!")

    // Preparing the Subscription data

    // Getting duration from Payment Fee
    let duration = session.amount_total === 9990 ? "year" : "month"

    // Setting startDate to today
    let startDate = new Date();
    
    // Initializing endDate
    let endDate;

    switch (duration) {
        case "month":
            endDate = new Date(startDate.getTime()+(31*24*60*60*1000))
            break;
        case "year":
            endDate = new Date(startDate.getTime()+(365*24*60*60*1000))
            break;
    }

    // Creating the new subscription
    subscription = {
        ...subscription,
        startDate,
        endDate,
        duration,
        status: "confirmed",
        type: "premium"
    }

    // Saving the new subscription
    return Subscription.update(subscription, { where: { id: subscriptionId } })

  },

  /**
   * Create Temporary subscription
   * @returns {Promise<{Subscription>}
   */
   createTemporarySubscription: async (sessionId) => {

    // Setting dateFrom to today
    let dateFrom = new Date();

    // Creating the new subscription
    let subscription = Object.assign({}, {
        sessionId,
        dateFrom,
        status: "temporary",
    })

    // Saving the new subscription
    return Subscription.create(subscription)

  },

}
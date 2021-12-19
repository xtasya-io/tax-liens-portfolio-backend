require("dotenv").config()

const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Subscription } = require("../models");

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = {
  /**
   * Get All Subscriptions list
   * @returns {Promise<{count: number, rows: TaxLien[]}>}
   */
  getAllSubscriptions: async () => {
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

    // Getting the payment session data from Stripe API
    let session = await stripe.sessions.retrieve(
        subscription.sessionId
    );

    console.log("================", session)

    // Setting dateFrom to today
    // let dateFrom = new Date();
    
    // // Initializing dateTo
    // let dateTo;

    // switch (duration) {
    //     case "month":
    //         dateTo = new Date(dateFrom.getTime()+(31*24*60*60*1000))
    //         break;
    //     case "year":
    //         dateTo = new Date(dateFrom.getTime()+(365*24*60*60*1000))
    //         break;
    // }

    // // Creating the new subscription
    // let subscription = Object.assign({}, {
    //     dateFrom,
    //     dateTo,
    //     duration,
    //     type: "premium"
    // })

    // // Saving the new subscription
    // return Subscription.create(subscription)

  },

  /**
   * Create Temporary subscription
   * @returns {Promise<{Subscription>}
   */
   CreateTemporarySubscription: async (sessionId) => {

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
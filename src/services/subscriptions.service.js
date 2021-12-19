const { Subscription } = require("../models");

module.exports = {
  /**
   * Get All Subscriptions list
   * @returns {Promise<{count: number, rows: TaxLien[]}>}
   */
  getAllSubscriptions: async () => {
  },

  /**
   * Create a new subscription
   * @returns {Promise<{Subscription>}
   */
  CreateSubscription: async (duration) => {
      
    // Setting dateFrom to today
    let dateFrom = new Date();
    
    // Initializing dateTo
    let dateTo;

    switch (duration) {
        case "month":
            dateTo = new Date(dateFrom.getTime()+(31*24*60*60*1000))
            break;
        case "year":
            dateTo = new Date(dateFrom.getTime()+(365*24*60*60*1000))
            break;
    }

    // Creating the new subscription
    let subscription = Object.assign({}, {
        dateFrom,
        dateTo,
        duration,
        type: "premium"
    })

    // Saving the new subscription
    return Subscription.create(subscription)

  },

}
const { Payment } = require("../models")

module.exports = {
    /**
     * Get Payment of User
     * @param {String} userId
     * @returns {Promise<Payment>}
     */
    getUserPayment: async (userId) => {
        return Payment.findOne({
            where: { user: userId }
        })
    },

    /**
     * Get Payment Status of User
     * @param {String} userId
     * @returns {Boolean}
     */
    getUserPaymentStatus: async (userId) => {
        let payment = await Payment.findOne({
            where: { user: userId }
        })
        if (!payment) {
            return false
        }
        let endDate = new Date(payment.endDate)
        return Date.now() - endDate.getTime()
    }
}
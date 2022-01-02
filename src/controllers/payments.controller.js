require("dotenv").config();
const { paymentsService, usersService, subscriptionsService } = require('../services')
const catchAsync = require('../utils/catchAsync')
const httpStatus = require("http-status")
const ApiError = require('../utils/ApiError')

const initPayment = catchAsync(async (req, res) => {

    let userId = req.params.id
    let subscriptionPlan = req.body.plan

    // Creating a new Stripe Payment Session
    let session = await paymentsService.initPayment(userId, subscriptionPlan);

    // Creating a new temporary subscription with the session
    let subscription = await subscriptionsService.createTemporarySubscription(session.id);

    // Assigning the temporary session to the user
    await usersService.updateUser(userId, { subscriptionId: subscription.id });

    res.status(httpStatus.TEMPORARY_REDIRECT).json({ "paymentUrl": session.url });
    
})

module.exports = {
    initPayment
}
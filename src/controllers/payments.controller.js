require("dotenv").config();
const { paymentsService, usersService, subscriptionsService } = require('../services')
const catchAsync = require('../utils/catchAsync')
const httpStatus = require("http-status")
const ApiError = require('../utils/ApiError')

const getAllPayments = catchAsync(async (req, res) => {
    let payments = await paymentsService.getAllPayments()
    res.status(httpStatus.OK).send(payments)
})

const getUserActivePayment = catchAsync(async (req, res) => {
    let payment = await paymentsService.getUserActivePayment(req.params.id)
    if (!payment) throw new ApiError(httpStatus.NOT_FOUND, "No active payments for this user")
    res.status(httpStatus.OK).send({ payment: payment })
});

const getUserPayments = catchAsync(async (req, res) => {
    let payments = await paymentsService.getPaymentsByUser(req.params.id)
    res.status(httpStatus.OK).send(payments)
})

const getUserPaymentStatus = catchAsync(async (req, res) => {
    let isPaid = await paymentsService.getUserPaymentStatus(req.params.id);
    res.status(httpStatus.OK).send({ paymentStatus: isPaid })
});

const initPayment = catchAsync(async (req, res) => {

    let userId = req.params.id
    let subscriptionPlan = req.body.plan

    // Creating a new Stripe Payment Session
    let session = await paymentsService.initPayment(userId, subscriptionPlan);

    // Creating a new temporary subscription with the session
    let subscription = await subscriptionsService.CreateTemporarySubscription(session.id);

    // Assigning the temporary session to the user
    await usersService.updateUser(userId, { subscriptionId: subscription.id })

    res.json({ "paymentUrl": session })
})

const getUserLatestPayment = catchAsync(async (req, res) => {
    let payment = await paymentsService.getUserLatestPayment(req.params.id)
    res.status(httpStatus.OK).json({ "payment": payment })
})

module.exports = {
    getAllPayments,
    getUserPayments,
    getUserLatestPayment,
    getUserActivePayment,
    getUserPaymentStatus,
    initPayment
}
const { paymentsService, usersService } = require('../services')
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

const createPayment = catchAsync(async (req, res) => {
    let user = await usersService.getUserById(req.body.userId)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "Could not find user")
    } else {
        // let payment = await paymentsService.createPayment(req.body)
        // if (payment) res.status(httpStatus.CREATED).send()
        let paymentUrl = paymentsService.createPayment(req.body)
        if (paymentUrl) res.redirect(303, paymentUrl)
    }
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
    createPayment,
}
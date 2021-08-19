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

const getPaymentStatus = catchAsync(async (req, res) => {
    let isPaid = await paymentsService.getUserPaymentStatus(req.params.id);
    res.status(httpStatus.OK).send({ paymentStatus: isPaid })
});

const createPayment = catchAsync(async (req, res) => {
    let user = await usersService.getUserById(req.body.userId)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "Could not find user")
    } else {
        let payment = await paymentsService.createPayment(req.body)
        if (payment) res.status(httpStatus.CREATED).send()
    }
})

module.exports = {
    getAllPayments,
    getUserPayments,
    getUserActivePayment,
    getPaymentStatus,
    createPayment,
}
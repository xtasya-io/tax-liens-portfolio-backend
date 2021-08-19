const { paymentsService, usersService } = require('../services')
const catchAsync = require('../utils/catchAsync')
const httpStatus = require("http-status")

const getPayment = catchAsync(async (req, res) => {
    let payment = await paymentsService.getUserPayment(req.params.id)
    if (payment) res.status(httpStatus.OK).send({ payment: payment })
    if (!payment) res.status(httpStatus.NOT_FOUND).send("No payments for this user")
});

const getPaymentStatus = catchAsync(async (req, res) => {
    let isPaid = await paymentsService.getUserPaymentStatus(req.params.id);
    res.status(httpStatus.OK).send({ paymentStatus: isPaid })
});

const createPayment = catchAsync(async (req, res) => {
    let user = await usersService.getUserById(req.body.userId)
    if (!user) res.status(httpStatus.NOT_FOUND).send("Could not find user")

    let payment = await paymentsService.createPayment(req.body)
    if (!payment) res.status(httpStatus.INTERNAL_SERVER_ERROR).send("An error occured")

    res.status(httpStatus.CREATED).send()
})

module.exports = {
    getAllPayments,
    getPayment,
    getPaymentStatus,
    createPayment,
}
const { paymentsService } = require('../services')
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

module.exports = {
    getPayment,
    getPaymentStatus
}
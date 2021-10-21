const catchAsync = require('../utils/catchAsync')
const httpStatus = require("http-status")
const ApiError = require('../utils/ApiError')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const webhookHandler = catchAsync(async (req, res) => {
    let data;
    let eventType;
    // Check if webhook signing is configured
    const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING
})

module.exports = {
    webhookHandler
}
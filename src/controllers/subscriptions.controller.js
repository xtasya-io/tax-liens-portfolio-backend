const { subscriptionsService } = require('../services')
const catchAsync = require('../utils/catchAsync')
const httpStatus = require("http-status");
const ApiError = require('../utils/ApiError');

const getUserSubscription = catchAsync(async (req, res) => {
    let userId = req.params.id;
    if (req.user.id != userId) throw new ApiError(httpStatus.FORBIDDEN, "You don't have access to this subscription")
    let subscription = await subscriptionsService.getSubscriptionByUserId(req.params.id);
    res.status(httpStatus.OK).send(subscription)
})

module.exports = { getUserSubscription }
const httpStatus = require("http-status")

const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const message = err.message || httpStatus[statusCode];
        const response = {
            code: statusCode,
            message,
            ...({ stack: err.stack }),
        };
        console.log(err.stack)
        res.status(statusCode).send(response)
    });
};

module.exports = catchAsync;

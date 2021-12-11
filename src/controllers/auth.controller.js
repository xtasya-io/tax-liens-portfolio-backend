require('dotenv').config()

const httpStatus = require('http-status');
const { tokenService, authService, usersService } = require("../services");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");


const login = catchAsync(async (req, res) => {
    const { email, password, type } = req.body;
    const user = await authService.loginWithEmailAndPassword(email, password, type)
    const accessToken = tokenService.generateToken(email)
    res.status(200).send({ user: user, accessToken })
})

const registerUser = catchAsync(async (req, res) => {
    try {
        const user = await usersService.createUser(req.body)
        res.status(httpStatus.CREATED).send(user)
    }
    catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error)
    }
})

module.exports = { login, registerUser }
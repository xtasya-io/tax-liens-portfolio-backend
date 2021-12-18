require('dotenv').config()

const httpStatus = require('http-status');
const { tokenService, authService, usersService } = require("../services");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");


const login = catchAsync(async (req, res) => {
    const { email, password, type } = req.body;
    const user = await authService.loginWithEmailAndPassword(email, password, type)
    const accessToken = tokenService.generateToken(email)
    res.status(200).send({ user, accessToken })
})

const registerUser = catchAsync(async (req, res) => {
    const user = await usersService.createUser(req.body)
    res.status(httpStatus.CREATED).send(user)
})

module.exports = { login, registerUser }
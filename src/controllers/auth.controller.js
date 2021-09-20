require('dotenv').config()

const httpStatus = require('http-status');
const { tokenService, authService, usersService, stripeService } = require("../services");
const catchAsync = require("../utils/catchAsync");


const login = catchAsync(async (req, res) => {
    const { email, password, type } = req.body;
    const user = await authService.loginWithEmailAndPassword(email, password, type)
    // const customer = await stripeService.addNewCustomer(email)
    // console.log(customer)
    const accessToken = tokenService.generateToken(email)
    res.status(200).send({ user: user, accessToken })
})

const registerUser = catchAsync(async (req, res) => {
    await usersService.createUser(req.body)
    res.status(httpStatus.CREATED).end()
})

module.exports = { login, registerUser }
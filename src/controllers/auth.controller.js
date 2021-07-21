require('dotenv').config()

const { tokenService, authService } = require("../services");
const catchAsync = require("../utils/catchAsync");


const login = catchAsync(async (req, res) => {
    const { email, password, type } = req.body;
    const user = await authService.loginWithEmailAndPassword(email, password, type)
    const accessToken = tokenService.generateToken(email)
    res.status(200).send({ user: user, accessToken })
})

const registerUser = catchAsync(async (req, res) => {
    console.log(".....")
})

module.exports = { login, registerUser }
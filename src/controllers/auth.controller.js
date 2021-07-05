require('dotenv').config()

const { tokenService, authService } = require("../services");
const catchAsync = require("../utils/catchAsync");


module.exports = {
    login: catchAsync(async (req, res) => {
        const { email, password, type } = req.body;
        console.log(email, password, type)
        const user = await authService.loginWithEmailAndPassword(email, password, type)
        const accessToken = tokenService.generateToken(email)
        res.status(200).send({ user: user, accessToken })
    })
}
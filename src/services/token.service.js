require('dotenv').config()

const jwt = require("jsonwebtoken");

module.exports = {
    generateToken: (email) => {
        const adminEmail = { email: email }
        const accessToken = jwt.sign(adminEmail, process.env.ACCESS_TOKEN_SECRET)
        return accessToken
    }
}
const jwt = require('jsonwebtoken')
const httpStatus = require("http-status");
const { usersService } = require('../services');

module.exports = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = (authHeader && authHeader.split(' ')[1]) || req.headers['x-access-token'] || req.query.token;
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (!token) res.status(httpStatus.FORBIDDEN).send({ message: "No Bearer Token provided"});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
        if (err) {
            res.status(httpStatus.FORBIDDEN).send({ message: "Invalid Bearer Token"});
            return;
        }
        let user = await usersService.getUserByEmail(data.email)
        req.user = user;
        next()
    })
}
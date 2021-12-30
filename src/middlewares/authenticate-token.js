const jwt = require('jsonwebtoken')
const httpStatus = require("http-status");
const { usersService, adminService } = require('../services');

module.exports = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = (authHeader && authHeader.split(' ')[1]) || req.headers['x-access-token'] || req.query.token;

    if (!token) res.status(httpStatus.FORBIDDEN).send({ message: "No Bearer Token provided"});

    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {

        if (err) {
            res.status(httpStatus.FORBIDDEN).send({ message: "Invalid Bearer Token"});
            return;
        }

        // Checking if the requester is a user
        let user = await usersService.getUserByEmail(data.email)
        if (user) {
            req.user = user;
            next()
        }

        // Checking if the requester is an admin        
        let admin = await adminService.getAdminByEmail(data.email)
        if (admin) {
            req.user = admin;
            next()
        }
        
    })

}
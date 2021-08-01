const jwt = require('jsonwebtoken')
const httpStatus = require("http-status")

module.exports = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = (authHeader && authHeader.split(' ')[1]) || req.headers['x-access-token'] || req.query.token;
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (!token) return res.sendStatus(httpStatus.FORBIDDEN);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) return res.sendStatus(httpStatus.FORBIDDEN);
        req.user = data;
        next()
    })
}
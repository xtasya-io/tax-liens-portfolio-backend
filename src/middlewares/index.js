const authenticateToken = require("./authenticate-token");
const corsMiddleware = require("./cors.middleware");
const authorize = require('./authorize');

module.exports = { authenticateToken, corsMiddleware, authorize }
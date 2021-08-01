const authenticateToken = require("./authenticate-token");
const cors = require("./cors.middleware");
const authorize = require('./authorize');

module.exports = { authenticateToken, cors, authorize }
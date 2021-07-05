const authenticateToken = require("./authenticate-token.middleware");
const cors = require("./cors.middleware");

module.exports = { authenticateToken, cors }
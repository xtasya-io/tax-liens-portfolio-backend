require("dotenv").config()

const apiAccess = (req, res, next) => {
    const host = req.get('host');
    const baseUrl = process.env.SERVER_BASE_URL || "http://127.0.0.1:8000";
    if (host !== 'api.preprod.tledger.tech') {
        logger('Authorization', 'Access Denied to use API');
        next(new Error('Access denied'));
    }
    next();
};

module.exports = apiAccess
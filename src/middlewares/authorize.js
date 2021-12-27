const httpStatus = require("http-status");
const { usersService, adminsService } = require("../services");
const ApiError = require("../utils/ApiError");

const DEFAULT_ALLOWED_ROLES = ['client'];

module.exports.authorize = 
    (roles = DEFAULT_ALLOWED_ROLES, premium = false) => async (req, res, next) => {

        if (req.user) {

            if (roles.length === 1 && roles[0] === 'admin') {
                if (await adminsService.getAdminById(req.user.id)) {
                    next();
                    return;
                }
                res.status(httpStatus.FORBIDDEN).send("Could not access admin only API route")
            }

            if (roles.length === 1 && roles[0] === 'client') {
                let user = await usersService.getUserById(req.user.id)

                switch (user.status) {
                    case "banned":
                        throw new ApiError(httpStatus.FORBIDDEN, "User is banned");
                    case "free":
                        if (premium) throw new ApiError(httpStatus.FORBIDDEN, "User should make a payment");
                        next();
                    default:
                        next();
                }
            }

        }
    }
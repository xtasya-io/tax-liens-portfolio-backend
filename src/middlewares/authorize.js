const httpStatus = require("http-status");
const { adminService } = require("../services");
const ApiError = require("../utils/ApiError");

const DEFAULT_ALLOWED_ROLES = ['client'];

module.exports.authorize = 
    (roles = DEFAULT_ALLOWED_ROLES, premium = false) => async (req, res, next) => {

        if (req.user) {

            if (roles.length === 1 && roles[0] === 'admin') {
                if (await adminService.getAdminById(req.user.id)) {
                    next();
                    return;
                }
                res.status(httpStatus.FORBIDDEN).send("Could not access admin only API route")
            }

            if (roles.length === 1 && roles[0] === 'client') {

                switch (req.user.status) {
                    case "banned":
                        throw new ApiError(httpStatus.FORBIDDEN, "User is banned");
                    case "free":
                        if (premium) throw new ApiError(httpStatus.FORBIDDEN, "User does not have a subscription");
                        next();
                    default:
                        next();
                }
            }

            if (roles.length > 1) {

                // Default authorize if it's an admin
                if (await adminService.getAdminById(req.user.id)) {
                    next();
                    return;
                } else {

                    // Check user status if not admin
                    switch (req.user.status) {
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

        } else {

            throw new ApiError(httpStatus.NOT_FOUND, "User not found");

        }
    }
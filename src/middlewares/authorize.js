const httpStatus = require("http-status");
const { usersService, adminsService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const DEFAULT_ALLOWED_ROLES = ['client'];

module.exports.authorize = catchAsync(
    (roles = DEFAULT_ALLOWED_ROLES) => async (req, res, next) => {

        if (req.user) {

            if (roles.length == 1 && roles[0] == 'admin') {
                if (await adminsService.getAdminById(req.user)) {
                    next();
                    return;
                }
                res.status(httpStatus.FORBIDDEN).send("Could not access admin only API route")
            }

            if (roles.length == 1 && roles[0] == 'user') {
                let user = await usersService.getUserById(req.user)
                if (user) {
                    if (!user.isBanned) {
                        next();
                        return;
                    }
                    res.status(httpStatus.FORBIDDEN).send("User is banned and could not access API route")
                }
                res.status(httpStatus.FORBIDDEN).send("User could not access API route")
            }

        }
    })
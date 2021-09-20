const adminService = require('./admin.service');
const ApiError = require('../utils/ApiError');
const httpStatus = require("http-status");
const usersService = require('./users.service');

/**
 * Login with admin and password
 * @param {string} email
 * @param {string} password
 * @param {string} type
 * @returns {Promise<Admin>}
 */
const loginWithEmailAndPassword = async (email, password, type) => {
    if (type == "admin") {
        const admin = await adminService.getAdminByEmail(email);
        if (!admin) throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
        if (!(await admin.isPasswordMatch(password))) throw new ApiError(httpStatus.FORBIDDEN, 'Incorrect password');
        return admin;
    } else if (type == "user") {
        const user = await usersService.getUserByEmail(email);
        if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        if (!(await user.isPasswordMatch(password))) throw new ApiError(httpStatus.FORBIDDEN, 'Incorrect password');
        if (user.isBanned) throw new ApiError(httpStatus.FORBIDDEN, 'The user is Banned')
        return user;
    } else {
        throw new Error(httpStatus.NOT_ACCEPTABLE, 'Type is required')
    }
};

module.exports = {
    loginWithEmailAndPassword
}
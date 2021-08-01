const httpStatus = require("http-status");
const bcrypt = require("bcryptjs")
const { Admin } = require("../models")


/**
 * Get admin by email
 * @param {string} email
 * @returns {Promise<Admin>}
 */
const getAdminByEmail = async (email) => {
    return Admin.findOne({ where: { email: email } }, { attributes: { exclude: ['password'] } });
};

/**
 * Get admin by id
 * @param {number} id
 * @returns {Promise<Admin>}
 */
const getAdminById = async (id) => {
    return Admin.findOne({ where: { id: id } }, { attributes: { exclude: ['password'] } });
};

/**
 * Create new Admin
 * @param {string} adminData
 * @returns {Promise<Admin>}
 */
const createAdmin = async (adminData) => {
    console.log(Admin)
    const freeEmail = await Admin.isEmailTaken(adminData.email)
    if (freeEmail) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    adminData.password = await bcrypt.hash(adminData.password, 10)
    return Admin.create(adminData);
};



module.exports = {
    getAdminByEmail,
    createAdmin,
    getAdminById
}
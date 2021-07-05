const { adminService } = require("../services")
const catchAsync = require("../utils/catchAsync");
const httpStatus = require('http-status');


module.exports = {
    createAdmin: catchAsync(async (req, res) => {
        let admin = await adminService.createAdmin(req.body);
        if (admin) res.status(httpStatus.OK).send(admin)
    })
}
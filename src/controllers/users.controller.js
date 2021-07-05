const { usersService } = require('../services')
const catchAsync = require('../utils/catchAsync')
const httpStatus = require("http-status")

module.exports = {

    getAllUsers: catchAsync(async (req, res) => {
        let users = await usersService.getUsers();
        res.status(httpStatus.OK).send(users)
    }),

    updateUser: catchAsync(async (req, res) => {
        let user = await usersService.banUser(req.params.id)
        res.status(httpStatus.OK).send(user)
    })
}
const { usersService } = require('../services')
const catchAsync = require('../utils/catchAsync')
const httpStatus = require("http-status")

const getAllUsers = catchAsync(async (req, res) => {
    let users = await usersService.getUsers();
    res.status(httpStatus.OK).send(users)
})

const getUserById = catchAsync(async (req, res) => {
    let user = await usersService.getUserById(req.params.id);
    res.status(httpStatus.OK).send(user)
})

const updateUser = catchAsync(async (req, res) => {
    let user = await usersService.updateUser(req.params.id, req.body);
    res.status(httpStatus.OK).send(user)
})

const banUser = catchAsync(async (req, res) => {
    let user = await usersService.banUser(req.params.id)
    res.status(httpStatus.OK).send(user)
})

const unbanUser = catchAsync(async (req, res) => {
    let user = await usersService.unbanUser(req.params.id)
    res.status(httpStatus.OK).send(user)
})

const activateAccount = catchAsync(async (req, res) => {
    let user = await usersService.activateAccount(req.params.id);
    res.status(204).send(user);
})

module.exports = { getAllUsers, getUserById, updateUser, banUser, unbanUser, activateAccount }
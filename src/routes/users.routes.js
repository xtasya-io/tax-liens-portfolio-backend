const express = require('express');
const router = express.Router();
const usersContoller = require('../controllers/users.controller');
const { authorize } = require('../middlewares/authorize');
const { authenticateToken } = require('../middlewares/index')

// Get all users
router.get(
    "/",
    authenticateToken,
    authorize(["admin"]),
    usersContoller.getAllUsers
);

router.route("/:id", authenticateToken)
    // Get user data by id
    .get(
        authorize(["client", "admin"]),
        usersContoller.getUserById
    )
    // Update user by id
    .put(
        authorize(["client", "admin"]),
        usersContoller.updateUser
    )

// Ban / unBan users

router.put(
    "/ban/:id",
    authenticateToken,
    authorize(["admin"]),
    usersContoller.banUser
);

router.put(
    "/unban/:id",
    authenticateToken,
    authorize(["admin"]),
    usersContoller.unbanUser
);

// Activation

router.put(
    "/:id/activate",
    authenticateToken,
    authorize(["client", "admin"]),
    usersContoller.activateAccount
)

module.exports = router;
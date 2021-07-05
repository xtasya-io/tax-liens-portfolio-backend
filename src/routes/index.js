const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const adminRoutes = require("./admin.routes");
const categoriesRoutes = require("./categories.routes");
const usersRoutes = require("./users.routes");
const taxLiensRoutes = require("./taxLiens.routes");

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/admins",
    route: adminRoutes,
  },
  {
    path: "/categories",
    route: categoriesRoutes,
  },
  {
    path: "/users",
    route: usersRoutes,
  },
  {
    path: "/tax-liens",
    route: taxLiensRoutes,
  },
];

const devRoutes = [
  // routes available only in development mode
];

// Applying default routes
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// Applying development routes
devRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "taxliens",
  process.env.DB_USERNAME,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DYALECT,
  }
);

(async () => {
  try {
    // Connecting to MySQL
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    // Synchronizing Tables
    // await sequelize.sync({ alter: true, force: false });
    // console.log("Tables synchronized successfully.");
  } catch (error) {
    console.error(error);
  }
})();

module.exports = sequelize;

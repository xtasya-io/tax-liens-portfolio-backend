const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");

/**
 * @typedef TaxLien
 */

class TaxLien extends Model { }

TaxLien.init(
  {
    purchaseDate: {
      type: DataTypes.DATE,
    },
    state: {
      type: DataTypes.STRING(2),
    },
    county: {
      type: DataTypes.STRING(64),
    },
    certificate: {
      type: DataTypes.INTEGER,
    },
    interest: {
      type: DataTypes.INTEGER,
    },
    investment: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.INTEGER,
    },
    user: {
      type: DataTypes.INTEGER,
    },
    // premium: {
    //   type: DataTypes.INTEGER,
    // },
    // monthlyProfitability: {
    //   type: DataTypes.INTEGER,
    // },
    // profit: {
    //   type: DataTypes.INTEGER,
    // },
    // profitability: {
    //   type: DataTypes.INTEGER,
    // },
  },
  { sequelize }
);

module.exports = TaxLien;

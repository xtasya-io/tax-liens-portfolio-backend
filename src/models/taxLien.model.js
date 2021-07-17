const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");
const validator = require("validator");

/**
 * @typedef TaxLien
 */

class TaxLien extends Model {}

TaxLien.init(
  {
    purchaseDate: {
      type: DataTypes.DATE,
    },
    state: {
      type: DataTypes.STRING(10),
    },
    county: {
      type: DataTypes.STRING(32),
    },
    certificateNumber: {
      type: DataTypes.INTEGER,
    },
    propertyType: {
      type: DataTypes.STRING(15),
    },
    auctionInterest: {
      type: DataTypes.INTEGER,
    },
    premium: {
      type: DataTypes.INTEGER,
    },
    investedAmount: {
      type: DataTypes.INTEGER,
    },
    monthlyProfitability: {
      type: DataTypes.INTEGER,
    },
    profit: {
      type: DataTypes.INTEGER,
    },
    profitability: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize }
);

module.exports = TaxLien;

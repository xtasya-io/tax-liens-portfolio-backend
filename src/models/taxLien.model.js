const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");
const validator = require("validator");

/**
 * @typedef TaxLien
 */

class TaxLien extends Model {}

TaxLien.init(
  {
    // startDate: {
    //   type: DataTypes.DATE,
    // },
    // endDate: {
    //   type: DataTypes.DATE,
    // },
    county: {
      type: DataTypes.STRING(32),
    },
    // auction: {
    //   type: DataTypes.STRING(32),
    // },
    // parcel: {
    //   type: DataTypes.STRING(32),
    // },
    // type: {
    //   type: DataTypes.STRING(32),
    // },
    // bidProcedure: {
    //   type: DataTypes.STRING(32),
    // },
    // email: {
    //   type: DataTypes.STRING(32),
    // },
    // phone: {
    //   type: DataTypes.STRING(13),
    // },
    // appraiserLink: {
    //   type: DataTypes.STRING(32),
    // },
    // taxCollectorLink: {
    //   type: DataTypes.STRING(32),
    // },
    // faceValue: {
    //   type: DataTypes.INTEGER,
    // },
    // caseNumber: {
    //   type: DataTypes.STRING(32),
    // },
    // assessedValue: {
    //   type: DataTypes.INTEGER,
    // },
    // landValue: {
    //   type: DataTypes.INTEGER,
    // },
    // buildingValue: {
    //   type: DataTypes.INTEGER,
    // },
    // lienToland: {
    //   type: DataTypes.INTEGER,
    // },
    // lienToValue: {
    //   type: DataTypes.INTEGER,
    // },
    // address: {
    //   type: DataTypes.STRING(32),
    // },
    // city: {
    //   type: DataTypes.ENUM("string"),
    // },
    zip: {
      type: DataTypes.INTEGER,
    },
    // state: {
    //   type: DataTypes.ENUM("string"),
    // },
    // certPercentage: {
    //   type: DataTypes.INTEGER,
    // },
    // acres: {
    //   type: DataTypes.INTEGER,
    // },
    // buildingSqFeet: {
    //   type: DataTypes.INTEGER,
    // },
    beds: {
      type: DataTypes.INTEGER,
    },
    baths: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize }
);

module.exports = TaxLien;

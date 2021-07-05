const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");
const validator = require("validator");

/**
 * @typedef TaxLien
 */

class TaxLien extends Model {}

TaxLien.init(
  {
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    state: {
      type: DataTypes.STRING(2),

      field: "state",
    },
    county: {
      type: DataTypes.STRING(32),

      field: "county",
    },
    auction: {
      type: DataTypes.STRING(32),

      field: "auction",
    },
    parcel: {
      type: DataTypes.STRING(32),

      field: "parcel",
    },
    type: {
      type: DataTypes.STRING(32),

      field: "type",
    },
    bidProcedure: {
      type: DataTypes.STRING(32),

      field: "bidProcedure",
    },
    email: {
      type: DataTypes.STRING(32),
    },
    phone: {
      type: DataTypes.STRING(13),
    },
    appraiserLink: {
      type: DataTypes.STRING(32),
    },
    taxCollectorLink: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: "taxCollectorLink",
    },
    faceValue: {
      type: DataTypes.INTEGER,
    },
    caseNumber: {
      type: DataTypes.STRING(32),
    },
    assessedValue: {
      type: DataTypes.INTEGER,
    },
    landValue: {
      type: DataTypes.INTEGER,
    },
    buildingValue: {
      type: DataTypes.INTEGER,
    },
    lienToland: {
      type: DataTypes.INTEGER,
    },
    lienToValue: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING(32),
    },
    city: {
      type: DataTypes.ENUM("string"),
    },
    zip: {
      type: DataTypes.INTEGER,
    },
    state: {
      type: DataTypes.ENUM("string"),
    },
    certPercentage: {
      type: DataTypes.INTEGER,
    },
    acres: {
      type: DataTypes.INTEGER,
    },
    buildingSqFeet: {
      type: DataTypes.INTEGER,
    },
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

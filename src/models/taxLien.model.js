const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");
const validator = require("validator");

/**
 * @typedef Taxlien
 */

class Taxlien extends Model {}

Taxlien.init(
  {
    startDate: {
      type: DataTypes.DATE(),
    },
    endDate: {
      type: DataTypes.DATE(),
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
      type: DataTypes.NUMBER,
    },
    caseNumber: {
      type: DataTypes.STRING(32),
    },
    assessedValue: {
      type: DataTypes.NUMBER,
    },
    landValue: {
      type: DataTypes.NUMBER,
    },
    buildingValue: {
      type: DataTypes.NUMBER,
    },
    lienToland: {
      type: DataTypes.NUMBER,
    },
    lienToValue: {
      type: DataTypes.NUMBER,
    },
    address: {
      type: DataTypes.STRING(32),
    },
    city: {
      type: DataTypes.ENUM("string"),
    },
    zip: {
      type: DataTypes.NUMBER,
    },
    state: {
      type: DataTypes.ENUM("string"),
    },
    certPercentage: {
      type: DataTypes.NUMBER,
    },
    acres: {
      type: DataTypes.NUMBER,
    },
    buildingSqFeet: {
      type: DataTypes.NUMBER,
    },
    beds: {
      type: DataTypes.NUMBER,
    },
    baths: {
      type: DataTypes.NUMBER,
    },
  },
  { sequelize }
);

module.exports = Taxlien;

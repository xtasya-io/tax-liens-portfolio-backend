// /* TODO
// Create a TaxLien model with the following attributes
// - category: String
// - startDate: date
// - endDate: date
// - state: String
// - county: String
// - auction: String
// - parcel: String
// - type: String
// - bidProcedure: String
// - phone: String
// - email: String
// - appraiserLink: String
// - taxCollectorLink: String
// - faceValue: Number
// - caseNumbe: String
// - assessedValue: Number
// - landValue: number
// - buildingValue: Number
// - lienToLand: Number
// - lienToValue: Number
// - address: String
// - city: String // TODO: transform to enum
// - zip: number
// - state: String // TODO: transform to enum
// - certPercentage: Number
// - acres: Number
// - buildingSqFeet: Number
// - beds: Number
// - baths: Number
// */
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
    startDate: {
      type: DataTypes.DATE(),
    },
    state: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: "state",
    },
    county: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: "county",
    },
    auction: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: "auction",
    },
    parcel: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: "parcel",
    },
    type: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: "type",
    },
    bidProcedure: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: "bidProcedure",
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(32),
    },
    appraiserLink: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    taxCollectorLink: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: "taxCollectorLink",
    },
    faceValue: {
      type: DataTypes.NUMBER,
    },
    caseNumbe: {
      type: DataTypes.STRING(32),
      allowNull: false,
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

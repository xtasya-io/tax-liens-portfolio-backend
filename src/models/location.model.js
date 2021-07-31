const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");
const User = require(".");

/**
 * @typedef Location
 */
class Location extends Model { }

Location.init(
    {
        firstLine: {
            type: DataTypes.STRING(64),
        },
        secondLine: {
            type: DataTypes.STRING(64),
        },
        county: {
            type: DataTypes.STRING(64),
        },
        state: {
            type: DataTypes.STRING(64),
        },
        country: {
            type: DataTypes.STRING(64),
        },
        zipCode: {
            type: DataTypes.INTEGER(5),
        },
    },
    { sequelize }
);

Location.belongsTo(User);

module.exports = Location;

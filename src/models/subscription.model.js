const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");
const User = require("./");

/**
 * @typedef Subscription
 */
class Subscription extends Model { }

/**
 * Check if payment deadline is overdue
 * @returns {Promise<boolean>}
 */
Subscription.isPaymentOverdue = function () {
  return Date.now() - this.startDate + this.duration;
};

Subscription.init(
  {
    startDate: {
      type: DataTypes.DATE(),
      // defaultValue: new Date()
    },
    duration: {
      type: DataTypes.SMALLINT, // 60 * 60 * 24 * chosen duration
    },
    type: {
      type: DataTypes.ENUM("premium"),
    },
  },
  { sequelize }
);

Subscription.belongsTo(User);

module.exports = Subscription;

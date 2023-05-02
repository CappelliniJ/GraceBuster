const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("Cart", {
  fulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Cart;

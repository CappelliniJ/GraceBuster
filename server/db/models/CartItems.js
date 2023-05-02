const Sequelize = require("sequelize");
const db = require("../db");
const Cart = require("./Cart");
const Movies = require("./Movies");

const CartItems = db.define("CartItems", {
  quantity: {
    type: Sequelize.INTEGER,
  },
  MovieId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Movies,
      key: "id",
    },
  },
});

module.exports = CartItems;

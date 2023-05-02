const router = require("express").Router();
const Cart = require("../db/models/Cart");
const CartItems = require("../db/models/CartItems");
const Movies = require("../db/models/Movies");

router.get("/:cartId", async (req, res, next) => {
  try {
    const cartId = req.params.cartId;
    const cartItems = await CartItems.findAll({
      where: { CartId: cartId },
      include: [Movies],
    });
    res.json(cartItems);
  } catch (error) {
    next(error);
  }
});

router.post("/:userId/add", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const movieId = req.body.movieId;

    let userCart = await Cart.findOne({ where: { userId } });
    if (!userCart) {
      userCart = await Cart.create({ userId });
    }

    const [cartItem, created] = await CartItems.findOrCreate({
      where: { MovieId: movieId, CartId: userCart.id },
      defaults: { quantity: 1 },
    });

    if (!created) {
      cartItem.quantity = cartItem.quantity + 1;
      await cartItem.save();
    }

    res.status(200).json(cartItem);
  } catch (error) {
    next(error);
  }
});

// Update the quantity of a movie in the user's cart
router.put("/:userId/update", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const movieId = req.body.movieId;
    const newQuantity = req.body.quantity;
    const userCart = await Cart.findOne({ where: { userId } });

    const cartItem = await CartItems.findOne({
      where: { MovieId: movieId, CartId: userCart.id },
    });

    if (cartItem) {
      cartItem.quantity = newQuantity;
      await cartItem.save();
      res.status(200).json(cartItem);
    } else {
      res.status(404).send("Cart item not found");
    }
  } catch (err) {
    next(err);
  }
});

// Remove a movie from the user's cart
router.delete("/:userId/remove", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const movieId = req.body.movieId;
    const userCart = await Cart.findOne({ where: { userId } });

    const cartItem = await CartItems.findOne({
      where: { MovieId: movieId, CartId: userCart.id },
    });

    if (cartItem) {
      await cartItem.destroy();
      res.status(204).end();
    } else {
      res.status(404).send("Cart item not found");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;

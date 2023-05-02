const router = require('express').Router();
const { models } = require('../db');
const { User, Cart, Product } = models;

// Middleware to authenticate users based on token in request headers
async function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const user = await User.findByToken(token);
      req.user = user;
    } catch (error) {
      console.log(error);
    }
  }
  next();
}

// Middleware to restrict access to admin users only
function adminOnly(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.sendStatus(403);
  }
}

router.use(authenticateUser);

// Get all users (admin only)
router.get('/', adminOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'isAdmin'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Get user by ID (admin only)
router.get('/:id', adminOnly, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'email', 'isAdmin'],
      include: [{ model: Cart, include: [{ model: Product }] }],
    });
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Get products in cart of user by ID (admin only)
router.get('/:id/cart', adminOnly, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.params.id },
      include: [{ model: Product }],
    });
    if (!cart) {
      res.sendStatus(404);
      return;
    }
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

module.exports = router;


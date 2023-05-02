const router = require('express').Router();
const { models } = require('../db');
const { User, Cart, Product } = models;

// Get all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Get user by ID
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'email'],
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

module.exports = router;




// explicitly select only the id and username fields - even though
// users' passwords are encrypted, it won't help if we just
// send everything to anyone who asks!


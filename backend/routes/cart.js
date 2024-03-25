const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart');

// Example of adding an item to the cart
router.post('/add', async (req, res) => {
  const { userId, productId, license, type } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { user_id: userId },
      { $push: { items: { product_id: productId, type: type,license:license } } },
      { upsert: true, new: true }
    );
    console.error('added item to cart:', success);
    alert("successfully added")
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
});

// Example of getting user's cart
router.get('/cart', async (req, res) => {
  const { userId } = req.query;
  try {
    const cart = await Cart.findOne({ user_id: userId }).populate('items.product_id');
    res.render('cart', { cart }); // Render the cart.ejs view with cart data
  } catch (error) {
    console.error('Error getting user cart:', error);
    throw error;
  }
});
module.exports = router;
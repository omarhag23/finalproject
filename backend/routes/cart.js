const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart');
const path = require('path');
router.use(express.static(path.join(__dirname, '..', 'frontend')));
// Example of adding an item to the cart
router.post('/add', async (req, res) => {
  const { userId, productId, license, type } = req.body;
  console.log('user ',userId,' produ :',productId,'lice :',license,' ty: ',type)
  try {
    const cart = await Cart.findOneAndUpdate(
      { user_id: userId },
      { $push: { items: { product_id: productId, type: type,license:license } } },
      { upsert: true, new: true }
    );
    console.log('added item to cart:',cart);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
});

// Example of getting user's cart
router.get('/', async (req, res) => {
  const { userId } = req.query;
  try {
    const cart = await Cart.findOne({ user_id: userId }).populate('items.product_id');
    res.json({ cart }); // Send cart data as JSON response
  } catch (error) {
    console.error('Error getting user cart:', error);
    throw error;
  }
});
module.exports = router;
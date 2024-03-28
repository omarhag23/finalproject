const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart');

const path = require('path');
router.use(express.static(path.join(__dirname, '..', 'frontend')));
// Example of adding an item to the cart
router.post('/add', async (req, res) => {
  const { userId, productId, license, type } = req.body;
  
  console.log('require ...',type);

  const model = require('../models/',type);
  console.log('trying to find a model . ...');
  try {
    const product = await model.findOne({_id: productId });
     
    // Initialize price variable
    let price = null;

    // Retrieve cover, title, and set price based on license
    let cover = null;
    let title = null;
    if (product) {
      console.log('beat found ...');
        cover = product.cover;
        title = product.title;
        price = product.license;
               
        }
    
    const cart = await Cart.findOneAndUpdate(
      { username: userId },
      { $push: { items: { product_id: productId, type: type,license:license,cover:cover,title:title,price:price } } },
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
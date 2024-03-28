const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart');
const Beat = require('../models/Beat');
const path = require('path');
router.use(express.static(path.join(__dirname, '..', 'frontend')));
// Example of adding an item to the cart
router.post('/add', async (req, res) => {
  const { userId, productId, license, type } = req.body;
  console.log('user ',userId,' produ :',productId,'lice :',license,' ty: ',type)
  try {
    const beat = await Beat.findOne({ productId });

    // Initialize price variable
    let price = null;

    // Retrieve cover, title, and set price based on license
    let cover = null;
    let title = null;
    if (beat) {
        cover = beat.cover;
        title = beat.title;

        switch (license) {
            case "mp3lease":
                price = beat.mp3price;
                break;
            case "wavlease":
                price = beat.wavprice;
                break;
            case "exclusive":
                price = beat.exclusive;
                break;
            default:
                price = null;
        }
    }
    const cart = await Cart.findOneAndUpdate(
      { username: userId },
      { $push: { items: { product_id: productId, type: type,license:license,cover:cover } } },
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
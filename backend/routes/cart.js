const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Blockchain = require('./blockchain');
let model;

const path = require('path');
router.use(express.static(path.join(__dirname, '..', 'frontend')));
// Example of adding an item to the cart
router.post('/add', async (req, res) => {
  const { userId, price, productId, license, type } = req.body;
  console.log('price 1  ...',price);
  switch (type)
  {
    case 'Beat':
        model = require('../models/Beat');
      break;
    case 'Kit':
       model = require('../models/Kit');
      break;
    case 'Service':
       model = require('../models/Service');
        break;  
    // Add more cases as needed for other models
    default:
      // Handle the case when the type is not recognized
      console.error('Unknown model type:', type);
  }
  console.log('trying to find a model . ...');
  try {
    const product = await model.findOne({_id: productId });
    if (product) {
        cover = product.cover;
        title = product.title;}
    const cart = await Cart.findOneAndUpdate(
      { username: userId },
      { $push: { items: { product_id: productId, type: type,license:license,cover:cover,title:title,price:price } } },
      { upsert: true, new: true }
    );
  } catch (error) {
    throw error;
  }
});

// Example of getting user's cart
router.get('/', async (req, res) => {
  const { userId } = req.query;
  try {
    const cart = await Cart.findOne({ user_id: userId }).populate('items.product_id');
    res.json({ cart });
    cart=null; // Send cart data as JSON response
  } catch (error) {
    console.error('Error getting user cart:', error);
    throw error;
  }
});


router.post('/checkout', async (req, res) => {
  console.log('in tha checkout ...');
   // const errorhand = await Blockchain.deployContrac(userId, total);
   const { total} = req.body; 
   try {
    console.log('total  ...',total);
    const block = await Blockchain.deployContract(total);
    if (block) {
      // Authentication successful
      console.error('contract succesfull ');
      res.redirect('/download');
    cart=null; // Send cart data as JSON response

  } }catch (error) {
    console.error('Error getting user cart:', error);
    throw error;
  }   
    
});

module.exports = router;
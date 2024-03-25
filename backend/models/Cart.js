const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    type: String,
    product_id: { type: mongoose.Schema.Types.ObjectId },
    license: String
  });
  
  // Define Schema for Cart
  const cartSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [cartItemSchema]
  });


module.exports = mongoose.model('cart',cartSchema)
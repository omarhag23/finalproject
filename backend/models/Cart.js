const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    
    product_id: { type: mongoose.Schema.Types.ObjectId },
    title :String,
    license: String,
    cover: String,
    price :Number,
    type: String    
  });
  
  // Define Schema for Cart
  const cartSchema = new mongoose.Schema({
    username: String ,
    items: [cartItemSchema],
    myItems :[cartItemSchema]
  });


module.exports = mongoose.model('cart',cartSchema)
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); 
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const path = require('path');
app.set('views', path.join(__dirname, '..','frontend'));
app.use(express.static(path.join(__dirname, '..', 'frontend')));



// Import routes
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');



// Middleware
app.use(cookieParser());
app.use(session({
    secret: 'your_secret_key_heree',
    resave: false,
    saveUninitialized: true
}));


app.use((req, res, next) => {
    res.locals.username = req.session.username; // Add session data to locals
    next();
});
mongoose.set('strictQuery', false);
app.use('/api/shop', shopRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);

const MURL = 'mongodb+srv://omarabbas300:BreezyWave88@cluster0.cj2gpyv.mongodb.net/Finalproject1?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MURL, () => {
    console.log('MongoDB is up and running...');
});

app.get('/detail', async (req, res) => {
  try {

    
    console.log("in tha app detail , id : ",productId," type: ",type);
    // Construct the URL with the parameters
    const url = `http://linux01.dcs.bbk.ac.uk:3000/api/cart/detail?productId=${productId}&type=${type}`;
    const response = await fetch(url);
    const beat = await response.json();
    // Render the view here using the cart data
    res.render('detail', { beat });
  } catch (error) {
    console.error('Error fetching cart data:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/cart', async (req, res) => {
    try {
      // Assuming you've made a request to the endpoint that sends cart data
      console.log('about to fetch')
      const response = await fetch('http://linux01.dcs.bbk.ac.uk:3000/api/cart');
      const data = await response.json();
      console.log('fetched,response',data.cart)
      const cart = data.cart;
      console.log('about to render')
      // Render the view here using the cart data
      res.render('cart', { cart });
    } catch (error) {
      console.error('Error fetching cart data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/beats', async (req, res) => {
    try {
      // Assuming you've made a request to the endpoint that sends cart data
      const response = await fetch('http://linux01.dcs.bbk.ac.uk:3000/api/shop/beats');
      const data = await response.json();
      const beats = data.beats;
      // Render the view here using the cart data
      res.render('beats', { beats });
    } catch (error) {
      console.error('Error fetching cart data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/services', async (req, res) => {
    try {
      // Assuming you've made a request to the endpoint that sends cart data
      const response = await fetch('http://linux01.dcs.bbk.ac.uk:3000/api/shop/services');
      const data = await response.json();
      const services = data.services;
      // Render the view here using the cart data
      res.render('services', { services });
    } catch (error) {
      console.error('Error fetching cart data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/kits', async (req, res) => {
    try {
      // Assuming you've made a request to the endpoint that sends cart data
      const response = await fetch('http://linux01.dcs.bbk.ac.uk:3000/api/shop/kits');
      const data = await response.json();
      const kits = data.kits;
      // Render the view here using the cart data
      res.render('kits', { kits });
    } catch (error) {
      console.error('Error fetching cart data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/checkout', async (req, res) => {
    try {
      // Assuming you've made a request to the endpoint that sends cart data
      console.log('about to fetch')
      const response = await fetch('http://linux01.dcs.bbk.ac.uk:3000/api/cart');
      const data = await response.json();
      console.log('fetched,response',data.cart)
      const cart = data.cart;
      console.log('about to render')
      // Render the view here using the cart data
      res.render('checkout', { cart });
    } catch (error) {
      console.error('Error fetching cart data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

app.get('/', (req, res) => {

    
    res.render('index');
});
// Start the server
app.listen(3000, () => {
    console.log('Server dfd is up and running...');
});

const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
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
const paypalRoutes = require('./routes/paypal');



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
app.use('/api/pay', paypalRoutes);


const MURL = 'mongodb+srv://omarabbas300:BreezyWave88@cluster0.cj2gpyv.mongodb.net/Finalproject1?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MURL, () => {
    console.log('MongoDB is up and running...');
});



app.get('/download', (req, res) => {
  // Specify the file path you want to download
  const filePath = '/products.zip';

  // Send the file as a response
  res.download(filePath, 'products.zip', (err) => {
      if (err) {
          console.error('Error downloading file:', err);
          res.status(500).send('Error downloading file');
      } else {
          console.log('File downloaded successfully');
          res.render('downloads');
  
      }
  });
});

app.get('/detail', async (req, res) => {
  try {

    
    // Assuming you
    const productId = req.query.productId;
    const type = req.query.type;
    console.log("in tha app detail , id : ",productId," type: ",type);
    // Construct the URL with the parameters
    const url = `http://linux01.dcs.bbk.ac.uk:3000/api/cart/detail?productId=${productId}&type=${type}`;
    const response = await fetch(url);
    const data = await response.json();
    const product =data.product;
    console.log("in tha app detail 2 , product: ",product);
    // Render the view here using the cart data
    res.render('detail', { product :product,type:type });
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


  app.get('/cancel', async (req, res) => {
    try {
  
      
      // Assuming you
      const productId = req.query.id;
      const user = req.query.user;
      // Construct the URL with the parameters
      const url = `http://linux01.dcs.bbk.ac.uk:3000/api/cart/cancel?id=${productId}&user=${user}`;

      const response = await fetch(url);
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






  
app.get('/user', async (req, res) => {
  try {
    // Assuming you've made a request to the endpoint that sends cart data
    const username = req.query.username;
    console.log('about to fetch, username : ',username);
    const url = `http://linux01.dcs.bbk.ac.uk:3000/api/user/detail?username=${username}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log('fetched,response',data.cart," user data : ",data.user," balance : ",data.balance);
    const cart = data.cart;
    const user = data.user;
    const balance = data.balance;
    console.log('about to render')
    // Render the view here using the cart data
    res.render('user', { cart,user,balance,username });
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


app.get('/register', (req, res) => {    
  res.render('register');
});

app.get('/login', (req, res) => {    
  res.render('login');
});
// Start the server
app.listen(3000, () => {
    console.log('Server dfd is up and running...');
});

const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController');
const Cart = require('../models/Cart');
const User = require('../models/User');

//register
router.post('/register', async (req, res) => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send('Request body is emptyness');
    }
      const { username, email, pass,confpass } = req.body;
      console.log('req body look ',req.body);
      console.log('userjs :  email:', email,'usernamde:', username,'pass:', pass,'confpassb:',confpass);
      if (pass==confpass)
      {
        const userExists = await UserController.registerUser(username, email, pass);
            
        if (userExists) {
        res.status(409).send('User already exists');
      }
      else
      res.redirect('/api/shop/login');
      }
      //res.redirect('/index');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error registering user');
    }
  });
  
  // login
  router.post('/login', async (req, res) => {
    try {
      console.error('in the login')
      const { username, password } = req.body;
      const user = await UserController.authenticateUser(username, password);
      if (user) {
        // Authentication successful
        console.error('authentication super OK',username, ' logged in,trying to redirect ');
        req.session.username = username;
        res.redirect('/');
      } else {
        // Authentication failed (invalid credentials)
          res.redirect('/');
      }
    } catch (error) {
      console.error(error);
      
    }
  });

  router.get('/detail',async (req, res) => {
    // Destroy the session
    const username = req.query.username;
    console.log('username : ',username  );
      try {
        const cart = await Cart.findOne({ username: username }).populate('myItems.product_id');
        const user = await User.findOne({username:username});
        const balance = UserController.checkBalance(username);

        console.log('fetched,response',data.cart," user data : ",data.user," balance : ",data.balance);

        res.json({ cart,user,balance });
         // Send cart data as JSON response
      } catch (error) {
        console.error('Error getting user cart:', error);
        throw error;
      }
    });



  router.get('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Error destroying session');
        }
        // Redirect the user to the homepage or login page
        res.redirect('/');
    });
});
router.get('/index', (req, res) => {
  res.render('index'); 
});
module.exports = router;

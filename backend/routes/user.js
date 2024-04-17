const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController');
const Cart = require('../models/Cart');
const User = require('../models/User');

//register
router.post('/register', async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send('Request body is empty');
    }

    const { username, email, pass, confpass } = req.body;
    console.log('req body:', req.body);
    console.log('userjs: email:', email, 'username:', username, 'pass:', pass, 'confpass:', confpass);

    if (pass === confpass) {
      const registrationResult = await UserController.registerUser(username, email, pass);

      if (registrationResult.success) {
        res.json({ success: true, message: "Registration successful" });
      } else {
        console.error('Error registering user:', registrationResult.message);
        res.status(500).json({ error: "error.message" });
      }
    } else {
      res.status(500).json({ error: "error.message" });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "error.message" });
  }
});
  
  // login
  router.post('/login', async (req, res) => {
    try {
      console.error('in the login')
      const { username, password } = req.body;
      const user = await UserController.authenticateUser(username, password);
      if (user.success) {
        // Authentication successful
        console.error('authentication super OK',username, ' logged in,trying to redirect ');
        req.session.username = username;
        res.redirect('/');
      } else {
        // Authentication failed (invalid credentials)
        res.status(500).json({ error: "error.message" });
         
      }  
    } catch (error) {
      res.status(500).json({ error: "error.message" });
      
    
  }});

  router.post('/deposit', async (req, res) => {
   try{
      console.error('in the deposit')
      const {amount,username}  = req.body;
      console.error('in the deposit, amount : ',amount,"userna : ",username);
      const user = await User.findOne({ username: username });
      console.log('User Found ',user);
      const buyerAddress= user.ethAddress;
      const totalPriceInDollars = amount;
      console.log('EthAddress Found ',buyerAddress);
      const block = await UserController.deposit(buyerAddress,totalPriceInDollars);
      if (block.success) {
        // Authentication successful
        console.error('deposit succesfull ');
        res.status(200).json({ success: true, message: 'Deposit successful' });
    }else
     // throw error;
     res.status(500).json({ error: "error.message" });
   }catch(err)
   {
   res.status(500).json({ error: "error.message" });}
  });



  router.get('/detail',async (req, res) => {

    const username = req.query.username;
    console.log('username : ',username  );
      try {
        const cart = await Cart.findOne({ username: username }).populate('myItems.product_id');
        const user = await User.findOne({username:username});
        const balance = await UserController.checkBalance(username);
        console.log('fetched,response',cart," user data : ",user," balance : ",balance);

        res.json({ cart,user,balance });
         // Send cart data as JSON response
      } catch (error) {
        console.error('Error getting user cart:', error);
        throw error;
      }
    });


    router.get('/cancel',async (req, res) => {

      const username = req.query.user;
      const id = req.query.id;
      console.log('username : ',username ," id : ",id );
        try {
          const cart = await Cart.findOne({ username: username }).populate('myItems.product_id');
          cart.myItems.deleteMany( { product_id: id } )
          res.json("success");
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

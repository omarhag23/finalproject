const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController');

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
      res.status(201).send('User registered successfullssy'); 
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
        console.error('authentication super OK',username, ' logged in,trying to redirect ')
        req.session.username = username;
        res.redirect('/');
      } else {
        // Authentication failed (invalid credentials)
        res.status(401).send('username or password wrong');
      }
    } catch (error) {
      console.error(error);
      
    }
  });


  router.post('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Error destroying session');
        }
        // Redirect the user to the homepage or login page
        res.redirect('/index');
    });
});
router.get('/index', (req, res) => {
  res.render('index'); 
});
module.exports = router;

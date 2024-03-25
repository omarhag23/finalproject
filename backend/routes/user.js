const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController');

//register
router.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      await UserController.registerUser(username, email, password);
      res.status(201).send('User registered successfully');
      alert("successfully added");
      res.redirect('/index');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error registering user');
    }
  });
  
  // login
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await UserController.authenticateUser(username, password);
      if (user) {
        // Authentication successful
        res.status(200).json({ user });
        req.session.username = username;
        alert("successfully added");
        res.redirect('/index');
      } else {
        // Authentication failed (invalid credentials)
        res.status(401).send('username or password wrong');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error authenticating user');
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

const express = require('express');
const router = express.Router();
const Beat = require('../models/Beat');
const Service = require('../models/Service');
const Kit = require('../models/Kit');


router.get('/beats', async (req, res) => {
  try {
    try {
      const beats = await Beat.find(); // Correct usage of Mongoose find() method
      res.json({ beats }); // Send cart data as JSON response
    } catch (error) {
      console.error('Big Error getting beats:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error rendering beats page:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/kits', async (req, res) => {
  try {
    try {
      const kits = await Kit.find(); // Correct usage of Mongoose find() method
      res.json({ kits }); // Send cart data as JSON response
    } catch (error) {
      console.error('Big Error getting services:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error rendering kits page:', error);
    res.status(500).send('Internal Server Error');
  }
});



router.get('/services', async (req, res) => {
  try {
    try {
      
      const services = await Service.find(); // Correct usage of Mongoose find() method
      res.json({ services }); // Send cart data as JSON response
    } catch (error) {
      console.error('Big Error getting services:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error rendering serices page:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Beat = require('../models/Beat');
const Service = require('../models/Service');
const Kit = require('../models/Kit');
const path = require('path');


router.get('/beats', async (req, res) => {
  try {
    try {
      const beats = await Beat.find(); // Correct usage of Mongoose find() method
      res.render('beats', { beats });
    } catch (error) {
      console.error('Error getting beats:', error);
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
      const kits = Kit.find().toArray;
    } catch (error) {
      console.error('Error getting kits:', error);
      throw error;
    }
    res.render('kits', { kits});
  } catch (error) {
    console.error('Error rendering beats page:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/services', async (req, res) => {
  try {
    try {
      const services = Service.find().toArray;
    } catch (error) {
      console.error('Error getting services:', error);
      throw error;
    }
    res.render('beats', { beats});
  } catch (error) {
    console.error('Error rendering services page:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

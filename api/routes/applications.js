const express = require('express');
const router = express.Router();

const App = require("../models/application.model");

router.get('/', async (req, res) => {
  try {
    const data = await App.find(); // Replace with your actual query
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

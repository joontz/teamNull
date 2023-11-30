const express = require('express');
const router = express.Router();

const Course = require("../models/course.model");

router.get('/', async (req, res) => {
  try {
    const data = await Course.find(); // Replace with your actual query
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

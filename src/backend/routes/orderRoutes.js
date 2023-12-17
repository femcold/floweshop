// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('./model/Order');

// Create order
router.post('/create', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

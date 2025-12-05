// controllers/orderController.js
const Order = require('../model/Order');

// Create a new order
const createOrder = async (req, res) => {
  const { items, totalPrice } = req.body;

  // Validate that items array exists and is not empty
  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'No items found in the order' });
  }

  // Validate total price is provided and greater than zero
  if (!totalPrice || totalPrice <= 0) {
    return res.status(400).json({ message: 'Total price is required and must be greater than zero' });
  }

  // Create a new order linked to the authenticated user
  const order = await Order.create({
    user: req.user._id,
    items,
    totalPrice
  });

  // Return success response with order details
  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    order
  });
};

// Get all orders for the logged-in user
const getMyOrders = async (req, res) => {
  // Find all orders for this user and sort them (newest first)
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

  // Return orders list
  res.json(orders);
};

module.exports = { createOrder, getMyOrders };

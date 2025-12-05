// // controller/orderController.js
// const Order = require('../model/Order');

// const createOrder = (req, res) => {
//   const { name, price, quantity } = req.body;
//   if (!name || !price || !quantity) {
//     return res.status(400).json({ message: 'Name, price and quantity required' });
//   }

//   const order = Order.create({
//     userId: req.user.id,
//     name,
//     price: Number(price),
//     quantity: Number(quantity)
//   });

//   res.status(201).json(order);
// };

// const getMyOrders = (req, res) => {
//   const orders = Order.findByUserId(req.user.id);
//   res.json(orders);
// };

// module.exports = { createOrder, getMyOrders };
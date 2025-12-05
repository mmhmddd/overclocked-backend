// // controller/userController.js
// const User = require('../model/User');
// const Order = require('../model/Order');

// const getMyProfile = (req, res) => {
//   const { password, ...user } = req.user;
//   const orders = Order.findByUserId(req.user.id);
//   res.json({ ...user, orders });
// };

// module.exports = { getMyProfile };
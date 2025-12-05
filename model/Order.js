// const { readJSON, writeJSON, ORDERS_FILE } = require('../config/db');

// class Order {
//   static getAll() {
//     return readJSON(ORDERS_FILE);
//   }

//   static saveAll(orders) {
//     writeJSON(ORDERS_FILE, orders);
//   }

//   static create(orderData) {
//     const orders = this.getAll();
//     const newOrder = {
//       id: Date.now().toString(),
//       userId: orderData.userId,
//       name: orderData.name,
//       price: orderData.price,
//       quantity: orderData.quantity,
//       total: orderData.price * orderData.quantity,
//       createdAt: new Date().toISOString()
//     };
//     orders.push(newOrder);
//     this.saveAll(orders);
//     return newOrder;
//   }

//   static findByUserId(userId) {
//     const orders = this.getAll();
//     return orders.filter(o => o.userId === userId);
//   }
// }

// module.exports = Order;
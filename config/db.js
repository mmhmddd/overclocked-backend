// config/db.js
const fs = require('fs');
const path = require('path');

const USERS_FILE = path.join(__dirname, '../data/users.json');
const ORDERS_FILE = path.join(__dirname, '../data/orders.json');

// Ensure data folder and files exist
if (!fs.existsSync(path.join(__dirname, '../data'))) {
  fs.mkdirSync(path.join(__dirname, '../data'));
}
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, '[]');
if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, '[]');

const readJSON = (file) => {
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
};

const writeJSON = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

module.exports = { readJSON, writeJSON, USERS_FILE, ORDERS_FILE };
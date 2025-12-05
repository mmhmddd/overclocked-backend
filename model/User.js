const bcrypt = require('bcryptjs');
const { readJSON, writeJSON, USERS_FILE } = require('../config/db');

class User {
  static async getAll() {
    return readJSON(USERS_FILE);
  }

  static saveAll(users) {
    writeJSON(USERS_FILE, users);
  }

  static async create(userData) {
    const users = await this.getAll();
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email || null,
      phone: userData.phone || null,
      password: bcrypt.hashSync(userData.password, 10),
      address: userData.address || null,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    this.saveAll(users);
    return newUser;
  }

  static async findByEmailOrPhone(identifier) {
    const users = await this.getAll();
    return users.find(u => u.email === identifier || u.phone === identifier);
  }

  static async findByEmail(email) {
    const users = await this.getAll();
    return users.find(u => u.email === email);
  }

  static async findById(id) {
    const users = await this.getAll();
    return users.find(u => u.id === id);
  }
}

module.exports = User;
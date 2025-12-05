const User = require('../model/User');
const { generateToken } = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;

    if (!name || !password) {
      return res.status(400).json({
        message: 'Name and password are required',
      });
    }

    if (!email && !phone) {
      return res.status(400).json({
        message: 'Either email or phone is required',
      });
    }

    const existingUser = await User.findByEmailOrPhone(email || phone);
    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email or phone already exists',
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: email ? email.trim().toLowerCase() : null,
      phone: phone ? phone.trim() : null,
      password,
      address: address ? address.trim() : null,
    });

    const token = generateToken(user.id);
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    const user = await User.findByEmail(email.trim().toLowerCase());

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

module.exports = { registerUser, loginUser };
// server.js or app.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware - MUST come before routes
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Add global JSON parse error handler (IMPORTANT!)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON format' });
  }
  next();
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
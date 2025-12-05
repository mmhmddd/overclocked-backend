const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/db');
const auth= require('./routes/auth');
const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', auth);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





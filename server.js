const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/db');
const auth= require('./routes/auth');
const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/userRoutes');
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', auth);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
//const authController = require('./routes/au');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactionRoutes');


dotenv.config();
const app = express();
connectDB();

app.use(express.json());

// authentication route
app.use('/api/auth', authRoutes);
// transactions route
app.use('/api/transactions', transactionRoutes);
app.use('/api/register', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

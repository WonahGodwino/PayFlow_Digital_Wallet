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
// post/api/transaction
app.use('/api/transactions', transactionRoutes);

//user registeration and wallet creation route
//post/api/register
app.use('/api/register', authRoutes);

//GET user transactions
///api/transactions/user/:userId	
app.use('/api/view/transactions/', transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

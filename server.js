const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
//const authController = require('./routes/au');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactionRoutes');
const walletRoutes = require('./routes/walletRoutes');

dotenv.config();
const app = express();
connectDB();

app.use(express.json());


// Authentication, registration and login routes
// authentication route
app.use('/api/auth', authRoutes);
//user registeration and wallet creation route
//post/api/auth/register

//login Post /api/auth/login


// to create transactions
// post/api/transactions
app.use('/api/transactions', transactionRoutes);

//GET user transactions
///api/view/transactions/user/:userId	
app.use('/api/view/transactions/', transactionRoutes);

//  Wallet route
// GET /api/wallet/me/:userid
app.use('/api/wallet', walletRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

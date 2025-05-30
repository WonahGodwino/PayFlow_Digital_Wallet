const express = require('express');
const router = express.Router();
const walletController = require('../controllers/transactionController'); 
const authMiddleware = require('../middleware/auth');

// Route to get wallet balance of authenticated user
router.get('/me', authMiddleware, walletController.getMyWallet);

module.exports = router;

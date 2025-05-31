const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController'); 
const authMiddleware = require('../middleware/authMiddleware');

// Route to get wallet balance of authenticated user
router.get('/me', authMiddleware, walletController.getMyWallet);

module.exports = router;

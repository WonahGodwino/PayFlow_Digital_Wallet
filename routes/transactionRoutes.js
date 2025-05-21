const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/authMiddleware');

// @route   POST /api/transactions
// @desc    Create a new transaction
// @access  Private
router.post('/', auth, transactionController.createTransaction);

module.exports = router;

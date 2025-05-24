const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/authMiddleware');


// @route   POST /api/transactions
// @desc    Create a new transaction
// @access  Private
// POST /api/transactions
router.post('/', auth, transactionController.createTransaction);

//Additional functionality outside my milestone 2
//viewing user's transaction history using user Id
//GET /api/transactions/user/:userId

// GET /api/transactions/user/:userId
router.get('/user/:userId', auth, transactionController.getUserTransactions);

module.exports = router;

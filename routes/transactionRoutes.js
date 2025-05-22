const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/authMiddleware');

// @route   POST /api/transactions
// @desc    Create a new transaction
// @access  Private
router.post('/transactions', auth, transactionController.createTransaction);

//Additional functionality outside my milestone 2
//viewing user's transaction history using user Id
//GET /api/view_user/transactions/:userId

router.get('/view_user/transactions/:userId', auth, transactionController.getUserTransactions);

module.exports = router;

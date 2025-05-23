const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register user and create wallet
router.post('/register', authController.register);


// @route   POST /api/auth/login
// @desc    Login user and return JWT token
router.post('/login', authController.login);

module.exports = router;

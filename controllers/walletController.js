const Wallet = require('../models/wallet');
const User = require('../models/User');

// Get wallet of the currently authenticated user
exports.getMyWallet = async (req, res) => {
  const userId = req.user; // Comes from authentication middleware

  try {
    const wallet = await Wallet.findOne({ userId }).populate('userId', 'email');

    if (!wallet) {
      return res.status(404).json({ msg: '❗No Wallet associated with the user ID' });
    }

    res.status(200).json({
      msg: '✅ Wallet retrieved successfully',
      wallet: {
        user: wallet.userId.email,
        balance: wallet.balance,
        currency: wallet.currency,
        lastUpdated: wallet.lastUpdated,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: '❗Server error while fetching your wallet' });
  }
};

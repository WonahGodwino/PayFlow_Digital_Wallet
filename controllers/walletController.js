const Wallet = require('../models/Wallet');
const User = require('../models/User');

// Get wallet of the currently authenticated user
exports.getMyWallet = async (req, res) => {
  const userId = req.user; // Comes from authentication middleware

  try {
    const wallet = await Wallet.findOne({ userId }).populate('userId', 'email name');

    if (!wallet) {
      return res.status(404).json({ msg: '❗No Wallet associated with the user ID' });
    }

    res.status(200).json({
      msg: '✅ Wallet retrieved successfully',
      wallet: {
        name: wallet.userId.name,
        email: wallet.userId.email,
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

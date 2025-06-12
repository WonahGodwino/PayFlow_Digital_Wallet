const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    default: 1000
  },
  currency: {
    type: String,
    default: 'NGN'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Fix: Prevent OverwriteModelError in development caused by model being compiled multiple times
const Wallet = mongoose.models.Wallet || mongoose.model('Wallet', WalletSchema);

module.exports = Wallet;


const Transaction = require('../models/Transaction');
const Wallet = require('../models/Wallet');

exports.createTransaction = async (req, res) => {
  const { receiverId, amount, transactionType } = req.body;
  const senderId = req.user;

  if (!['Credit', 'Debt'].includes(transactionType)) {
    return res.status(400).json({ msg: 'Invalid transaction type' });
  }

  if (!receiverId || !amount || amount <= 0) {
    return res.status(400).json({ msg: 'Invalid transaction details' });
  }

  try {
    // Update sender's wallet
    const senderWallet = await Wallet.findOne({ userId: senderId });
    if (transactionType === 'Debt' && senderWallet.balance < amount) {
      return res.status(400).json({ msg: 'Insufficient funds' });
    }

    // Update wallets
    const receiverWallet = await Wallet.findOne({ userId: receiverId });
    if (!receiverWallet) return res.status(404).json({ msg: 'Receiver wallet not found' });

    if (transactionType === 'Debt') {
      senderWallet.balance -= amount;
      receiverWallet.balance += amount;
    } else {
      // For Credit, it's like depositing to receiver's account (e.g., admin top-up)
      receiverWallet.balance += amount;
    }

    await senderWallet.save();
    await receiverWallet.save();

    const transaction = new Transaction({
      senderId,
      receiverId,
      amount,
      transactionType
    });

    await transaction.save();
    res.status(201).json({ msg: 'Transaction successful', transaction });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

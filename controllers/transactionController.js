const Transaction = require('../models/Transaction');
const Wallet = require('../models/wallet');
const User = require('../models/User');

exports.createTransaction = async (req, res) => {
  const { transactionType, amount, receiver } = req.body;
  const senderId = req.user; // this is comes from auth in middleware

  if (!['Deposit', 'Transfer'].includes(transactionType)) {
    return res.status(400).json({ msg: '❗Invalid transaction type' });
  }

  if (!amount || amount <= 0) {
    return res.status(400).json({ msg: '❗Invalid transaction amount' });
  }

  try {
    const senderWallet = await Wallet.findOne({ userId: senderId });
    if (!senderWallet) return res.status(404).json({ msg: '❗Sender Does not have a Wallet yet' });

    // Handle DEPOSIT
    if (transactionType === 'Deposit') {
      senderWallet.balance += amount;
      await senderWallet.save();

      const depositTx = new Transaction({
        senderId,
        receiverId: senderId,
        amount,
        transactionType: 'Credit', // Record as Credit for Deposit
      });
      await depositTx.save();

      return res.status(201).json({ msg: '✅ Deposit successful', transaction: depositTx });
    }

    // Handle TRANSFER
    if (transactionType === 'Transfer') {
      if (!receiver) return res.status(400).json({ msg: '❗Receiver ID required for transfer' });

      const receiverUser = await User.findById(receiver);
      if (!receiverUser) return res.status(404).json({ msg: '❗Receiver not found, Reciever should create an account to use the service' });

      const receiverWallet = await Wallet.findOne({ userId: receiver });
      if (!receiverWallet) return res.status(404).json({ msg: '❗Receiver wallet not found' });

      if (senderWallet.balance < amount) {
        return res.status(400).json({ msg: '❗Insufficient balance' });
      }

      // Perform Transfer
      senderWallet.balance -= amount;
      receiverWallet.balance += amount;

      await senderWallet.save();
      await receiverWallet.save();

      // Create sender transaction (Debt)
      const senderTx = new Transaction({
        senderId,
        receiverId: receiver,
        amount,
        transactionType: 'Debt',
      });

      // Create receiver transaction (Credit)
      const receiverTx = new Transaction({
        senderId,
        receiverId: receiver,
        amount,
        transactionType: 'Credit',
      });

      await senderTx.save();
      await receiverTx.save();

      return res.status(201).json({
        msg: '✅Transfer successful',
        transactions: {
          senderTransaction: senderTx,
          receiverTransaction: receiverTx,
        },
      });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: '❗Server error, Contact Support' });
  }
};

// function to view user transaction by ID
exports.getUserTransactions = async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await Transaction.find({
      $or: [
        { senderId: userId },
        { receiverId: userId } 
      ]
    })
    .sort({ createdAt: -1 })  // Most recent first
    .populate('senderId', 'email')  // Populate sender info (e.g., email)
    .populate('receiverId', 'email');  // Populate receiver info

    res.status(200).json({ transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error while fetching transactions' });
  }
};


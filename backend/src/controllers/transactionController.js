const Transaction = require('../models/Transaction');

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId }).populate('categoryId');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const { type, amount, date, description, categoryId } = req.body;
    const newTransaction = new Transaction({
      type,
      amount,
      date,
      description,
      categoryId,
      userId: req.userId
    });
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.userId
    });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found.' });
    }
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { type, amount, date, description, categoryId } = req.body;
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { type, amount, date, description, categoryId },
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found.' });
    }
    res.json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found.' });
    }
    res.json({ message: 'Transaction deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
    const payload = { type, amount, date, description: description || undefined, userId: req.userId };
    if (categoryId) payload.categoryId = categoryId;
    const newTransaction = new Transaction(payload);
    const savedTransaction = await newTransaction.save();
    await savedTransaction.populate('categoryId');
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
    }).populate('categoryId');
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
    const update = {};
    if (type !== undefined) update.type = type;
    if (amount !== undefined) update.amount = amount;
    if (date !== undefined) update.date = date;
    if (description !== undefined) update.description = description;
    if (categoryId !== undefined) update.categoryId = categoryId || null;
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      update,
      { new: true }
    ).populate('categoryId');
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

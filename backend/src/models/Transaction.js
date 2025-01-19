const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['income', 'expense'], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);

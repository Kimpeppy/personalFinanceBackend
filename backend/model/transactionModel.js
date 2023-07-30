const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    // Account ID of the transaction
    account_id: {
      type: String,
    },
    // Name of the transaction
    name: {
      type: String,
    },
    // Amount of the transaction
    amount: {
      type: Number,
    },
    // Currency of the transaction
    currency: {
      type: String,
    },
    // Category of the transaction (can be an array of strings)
    category: [
      {
        type: String,
      },
    ],
    // Date of the transaction (in string format)
    date: {
      type: String,
    },
    // Type of the transaction (e.g., special, place, etc.)
    transaction_type: {
      type: String,
    },
  },
  { timestamps: true } // This will add "createdAt" and "updatedAt" timestamps
);

module.exports = mongoose.model('Transaction', transactionSchema);

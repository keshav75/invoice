const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  invoiceNumber: String,
  customerName: String,
  amount: Number,
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid'],
    default: 'unpaid'
  },
  paymentDetails: {
    transactionId: String,
    paymentDate: Date
  }
});

module.exports = mongoose.model('Invoice', invoiceSchema);

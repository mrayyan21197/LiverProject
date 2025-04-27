import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
  created_at: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;

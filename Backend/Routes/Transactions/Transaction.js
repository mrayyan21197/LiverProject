import express from "express";
import mongoose from "mongoose";
import Transaction from "../../Models/Transactions.js";
const router = express.Router();

/** 
 *  POST: Create a new transaction 
 */
router.post("/transactions", async (req, res) => {
    try {
        const { order_id, client_id, freelancer_id, amount, status } = req.body;

        const newTransaction = new Transaction({
            order_id,
            client_id,
            freelancer_id,
            amount,
            status
        });

        await newTransaction.save();
        res.status(201).json({ message: "Transaction created successfully", transaction: newTransaction });
    } catch (error) {
        res.status(500).json({ error: "Failed to create transaction", details: error.message });
    }
});

/** 
 *  GET: Retrieve all transactions 
 */
router.get("/transactions", async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate("order_id client_id freelancer_id", "username email")
            .sort({ created_at: -1 });

        res.status(200).json({ transactions });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve transactions", details: error.message });
    }
});

/** 
 *  GET: Retrieve a specific transaction by ID 
 */
router.get("/transactions/:transactionId", async (req, res) => {
    try {
        const { transactionId } = req.params;

        const transaction = await Transaction.findById(transactionId)
            .populate("order_id client_id freelancer_id", "username email");

        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        res.status(200).json({ transaction });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve transaction", details: error.message });
    }
});

/** 
 *  PUT: Update transaction status by ID 
 */
router.put("/transactions/:transactionId", async (req, res) => {
    try {
        const { transactionId } = req.params;
        const { status } = req.body;

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            transactionId,
            { status, updated_at: Date.now() },
            { new: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction updated successfully", transaction: updatedTransaction });
    } catch (error) {
        res.status(500).json({ error: "Failed to update transaction", details: error.message });
    }
});

/** 
 *  DELETE: Remove a transaction by ID 
 */
router.delete("/transactions/:transactionId", async (req, res) => {
    try {
        const { transactionId } = req.params;

        const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);

        if (!deletedTransaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete transaction", details: error.message });
    }
});

/** 
 *  GET: Retrieve transactions related to a specific client or freelancer 
 */
router.get("/transactions/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        const transactions = await Transaction.find({
            $or: [{ client_id: userId }, { freelancer_id: userId }]
        })
            .populate("order_id client_id freelancer_id", "username email")
            .sort({ created_at: -1 });

        res.status(200).json({ transactions });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve transactions", details: error.message });
    }
});

export default router;

import express from "express";
import Order from "../../Models/Order.js";
const router = express.Router();
import { Gig, User, Review,FreelancerPortfolio } from "../../Models/index.js";
router.get("/getorders", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("gig_id", "title description price") // Populating gig details
      .populate("client_id", "username email full_verification") // Client details
      .populate("freelancer_id", "username email full_verification") // Freelancer details
      .lean();

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/orders/:currentUserId", async (req, res) => {
  try {
    const { currentUserId } = req.params;

    if (!currentUserId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const orders = await Order.find({
      $or: [{ freelancer_id: currentUserId }, { client_id: currentUserId }],
    })
      .populate({
        path: "gig_id",
        select: "title description price category images",
      }) // Populate gig details
      .populate({
        path: "client_id",
        select: "username email full_verification",
      }) // Populate client details
      .populate({
        path: "freelancer_id",
        select: "username email full_verification",
      }) // Populate freelancer details
      .lean();

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



router.post("/orders", async (req, res) => {
  try {
    const { gig_id, client_id, freelancer_id, total_amount, delivery_date, requirements } = req.body;

    const newOrder = new Order({
      gig_id,
      client_id,
      freelancer_id,
      total_amount,
      delivery_date,
      requirements,
      status: "In Progress", 
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: "Order created successfully", order: newOrder });

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create order", error: error.message });
  }
});
router.delete("/orders/cancel/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.put("/orders/complete/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = "Completed";
    await order.save();
    res.status(200).json({ success: true, message: "Order marked as completed", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;

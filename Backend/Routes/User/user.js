import express from "express";
import { User, FreelancerPortfolio, Gig, Order, Review , Messages as Message  } from "../../Models/index.js";
const router = express.Router();

//update the role when clickeds
router.put("/updateRole", async (req, res) => {
  try {
    const { id, newRole } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role: newRole },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Get a user by a parrticular id 
router.get("/getUser/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from URL params

    if (!id) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
router.get("/getUsers", async (req, res) => {
  try {
    // Get all users as plain objects
    const users = await User.find().lean();

    // For each user, populate additional data in parallel
    const populatedUsers = await Promise.all(users.map(async (user) => {
      // Retrieve freelancer portfolio (if any)
      const portfolio = await FreelancerPortfolio.findOne({ freelancer_id: user._id }).lean();

      // Retrieve gigs if user is a freelancer
      let gigs = [];
      if (user.role === "freelancer") {
        gigs = await Gig.find({ freelancer_id: user._id }).lean();
      }

      // Retrieve orders where the user is either client or freelancer
      const orders = await Order.find({
        $or: [{ client_id: user._id }, { freelancer_id: user._id }]
      }).lean();

      // Retrieve reviews where the user is the reviewee
      const reviews = await Review.find({ reviewee_id: user._id })
        .populate("reviewer_id", "username email full_verification")
        .lean();

      // Retrieve messages where the user is either sender or receiver
      const messages = await Message.find({
        $or: [{ sender_id: user._id }, { receiver_id: user._id }]
      }).lean();

      return {
        ...user,
        portfolio,
        gigs,
        orders,
        reviews,
        messages,
      };
    }));

    res.status(200).json({ users: populatedUsers });
  } catch (error) {
    console.error("Error fetching users with populated data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE /deleteUser/:id - Delete a user and their gigs
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // First, delete gigs where the user is the freelancer
    await Gig.deleteMany({ freelancer_id: id });
    
    // Optionally, you could also delete orders, messages or other related documents

    // Then, delete the user itself
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    
    res.status(200).json({
      success: true,
      message: "User and their gigs deleted successfully.",
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;

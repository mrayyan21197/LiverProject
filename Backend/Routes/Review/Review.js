// import express from "express";
// import { Review, Order, User } from "../../Models/index.js";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { order_id, reviewer_id, reviewee_id, rating, comment } = req.body;

//     // Validate required fields
//     if (!order_id || !reviewer_id || !reviewee_id || !rating) {
//       return res.status(400).json({ error: "Missing required fields." });
//     }

//     // Check if order exists
//     const order = await Order.findById(order_id);
//     if (!order) {
//       return res.status(404).json({ error: "Order not found." });
//     }

//     // Check if users exist
//     const reviewer = await User.findById(reviewer_id);
//     const reviewee = await User.findById(reviewee_id);

//     if (!reviewer || !reviewee) {
//       return res.status(404).json({ error: "Reviewer or Reviewee not found." });
//     }

//     // Create a new review
//     const review = new Review({
//       order_id,
//       reviewer_id,
//       reviewee_id,
//       rating,
//       comment,
//     });

//     await review.save();

//     res.status(201).json({
//       message: "Review submitted successfully.",
//       review,
//     });
//   } catch (error) {
//     console.error("Error creating review:", error);
//     res.status(500).json({ error: "Server error." });
//   }
// });

// router.get("/:reviewee_id", async (req, res) => {
//   try {
//     const { reviewee_id } = req.params;

//     // Check if user exists
//     const user = await User.findById(reviewee_id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found." });
//     }

//     // Fetch all reviews for the given user
//     const reviews = await Review.find({ reviewee_id }).populate("reviewer_id", "username email");

//     res.status(200).json({ reviews });
//   } catch (error) {
//     console.error("Error fetching reviews:", error);
//     res.status(500).json({ error: "Server error." });
//   }
// });

// export default router;
import express from "express";
import { Review, Order, User } from "../../Models/index.js";

const router = express.Router();


router.get("/getReviews", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("reviewer_id", "username email full_verification")
      .populate("reviewee_id", "username email full_verification")
      .lean();

    if (!reviews.length) {
      return res.status(404).json({ message: "No reviews found." });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/reviews/:reviewee_id", async (req, res) => {
  try {
    const { reviewee_id } = req.params;

    // Verify that the reviewee exists.
    const user = await User.findById(reviewee_id, "username email full_verification").lean();
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Fetch all reviews for this user.
    const reviews = await Review.find({ reviewee_id })
      .populate("reviewer_id", "username email full_verification")
      .populate("reviewee_id", "username email full_verification")
      .lean();

    res.status(200).json({ user, reviews });
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addReview", async (req, res) => {
  try {
    const { order_id, reviewer_id, rating, comment } = req.body;

    // Validate required fields.
    if (!order_id || !reviewer_id || !rating) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Find the order to extract freelancer_id as the reviewee.
    const order = await Order.findById(order_id).lean();
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }
    const reviewee_id = order.freelancer_id;

    // Ensure both reviewer and reviewee exist.
    const reviewer = await User.findById(reviewer_id).lean();
    const reviewee = await User.findById(reviewee_id).lean();

    if (!reviewer || !reviewee) {
      return res.status(404).json({ error: "Reviewer or reviewee not found." });
    }

    // Check if a review from this reviewer for this order already exists.
    let existingReview = await Review.findOne({ order_id, reviewer_id });
    if (existingReview) {
      // Update the existing review.
      existingReview.rating = rating;
      existingReview.comment = comment || existingReview.comment;
      // Optionally update the timestamp:
      existingReview.created_at = new Date();
      await existingReview.save();
      return res.status(200).json({
        success: true,
        message: "Review updated successfully.",
        review: existingReview,
      });
    } else {
      // Create a new review.
      const newReview = new Review({
        order_id,
        reviewer_id,
        reviewee_id,
        rating,
        comment,
      });
      await newReview.save();
      return res.status(201).json({
        success: true,
        message: "Review submitted successfully.",
        review: newReview,
      });
    }
  } catch (error) {
    console.error("Error posting review:", error);
    res.status(500).json({ error: "Internal Server Error", detail: error.message });
  }
});

export default router;

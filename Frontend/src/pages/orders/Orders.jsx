import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faSpinner,
  faCheckCircle,
  faTimes,
  faTimesCircle,
  faUpload,
  faPaperPlane,
  faStar as fasStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import Message from "../Message/Message";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [processingAction, setProcessingAction] = useState(null);
  // New state for submit work modal
  const [showSubmitWorkModal, setShowSubmitWorkModal] = useState(false);
  const [workDescription, setWorkDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [submitOrderId, setSubmitOrderId] = useState(null);
  // New state for review modal
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewOrderId, setReviewOrderId] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    // Get current user from localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);

        // Fetch orders once we have the current user ID
        fetchOrders(parsedUser.id);
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
        setError("Could not retrieve user information");
        setLoading(false);
      }
    } else {
      setError("No user found. Please log in.");
      setLoading(false);
    }
  }, []);

  const fetchOrders = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://liverbackend.vercel.app/api/auth/orders/${userId}`
      );
      console.log(response.data);
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.response?.data?.message || "Failed to fetch orders");
      setLoading(false);
    }
  };

  // Modified to open modal instead of directly submitting
  const openSubmitWorkModal = (orderId) => {
    setSubmitOrderId(orderId);
    setWorkDescription("");
    setSelectedFile(null);
    setShowSubmitWorkModal(true);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Actual submit work function that will be called from the modal
  const handleSubmitWork = async () => {
    if (!submitOrderId) return;

    setUploadingFile(true);
    try {
      // Create form data to send file and description
      const formData = new FormData();
      formData.append("freelancerId", currentUser.id);
      formData.append("description", workDescription);
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const response = await axios.put(
        `https://liverbackend.vercel.app/api/auth/orders/complete/${submitOrderId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update the order status in our local state
      const updatedOrders = orders.map((order) =>
        order._id === submitOrderId ? { ...order, status: "Completed" } : order
      );
      setOrders(updatedOrders);

      // Show success toast or notification
      alert("Work submitted successfully!");
      setShowSubmitWorkModal(false);
    } catch (err) {
      console.error("Error submitting work:", err);
      alert(err.response?.data?.message || "Failed to submit work");
    } finally {
      setUploadingFile(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    setProcessingAction(orderId + "-cancel");
    try {
      const response = await axios.delete(
        `https://liverbackend.vercel.app/api/auth/orders/cancel/${orderId}`
      );

      // Update the order status in our local state
      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, status: "Cancelled" } : order
      );
      setOrders(updatedOrders);

      // Show success toast or notification
      alert("Order cancelled successfully!");
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert(err.response?.data?.message || "Failed to cancel order");
    } finally {
      setProcessingAction(null);
    }
  };

  // New function to open review modal
  const openReviewModal = (orderId) => {
    setReviewOrderId(orderId);
    setRating(0);
    setReviewComment("");
    setShowReviewModal(true);
  };

  // New function to handle submit review
  const handleSubmitReview = async () => {
    if (!reviewOrderId || rating === 0) {
      alert("Please provide a rating");
      return;
    }

    setSubmittingReview(true);
    try {
      const reviewData = {
        order_id: reviewOrderId,
        reviewer_id: currentUser.id,
        rating: rating,
        comment: reviewComment,
      };

      const response = await axios.post(
        "https://liverbackend.vercel.app/api/auth/addReview",
        reviewData
      );

      // Update the local state to mark this order as reviewed
      const updatedOrders = orders.map((order) =>
        order._id === reviewOrderId ? { ...order, hasReview: true } : order
      );
      setOrders(updatedOrders);

      // Show success notification
      alert("Review submitted successfully!");
      setShowReviewModal(false);
    } catch (err) {
      console.error("Error submitting review:", err);
      alert(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const openMessageModal = (order) => {
    setSelectedOrder(order);
    setShowMessageModal(true);
  };

  // Helper function for star rating
  const renderStarRating = (
    value,
    hoverValue,
    onRatingChange,
    onHoverChange
  ) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => {
          // For half stars (e.g. 3.5), we show a half star for the 4th position
          const isHalfStar = Math.ceil(value) === star && value % 1 !== 0;
          const isFilled = hoverValue ? star <= hoverValue : star <= value;

          return (
            <button
              key={star}
              type="button"
              className="text-xl focus:outline-none"
              onClick={() => onRatingChange(star)}
              onMouseEnter={() => onHoverChange(star)}
              onMouseLeave={() => onHoverChange(value)}
            >
              <FontAwesomeIcon
                icon={isHalfStar ? faStarHalfAlt : isFilled ? fasStar : farStar}
                className={isFilled ? "text-yellow-400" : "text-gray-300"}
              />
            </button>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            className="text-4xl text-green-500 mb-2"
          />
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-xl font-medium mb-2">{error}</div>
          <p className="text-gray-600">
            Please try again later or contact support
          </p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-xl font-medium mb-2">
            Please log in to view your orders
          </div>
          <p className="text-gray-600">
            You need to be logged in to access this page
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Your Orders</h1>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <span className="font-bold text-green-600">
                  {currentUser.name?.charAt(0) || "U"}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-700">Welcome back,</p>
                <p className="text-green-600 font-bold">{currentUser.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* No orders state */}
        {orders.length === 0 && !loading && (
          <div className="bg-white rounded-lg shadow-sm p-20 text-center">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <p className="text-xl text-gray-500 mb-2">No orders found</p>
            <p className="text-gray-400">Your order history will appear here</p>
          </div>
        )}

        {/* Table */}
        {orders.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-sm text-gray-500 uppercase tracking-wider">
                    <th className="py-4 px-4 text-left font-semibold">Image</th>
                    <th className="py-4 px-4 text-left font-semibold">Title</th>
                    <th className="py-4 px-4 text-left font-semibold">Price</th>
                    <th className="py-4 px-4 text-left font-semibold">
                      Status
                    </th>
                    <th className="py-4 px-4 text-left font-semibold">
                      {currentUser.isSeller ? "Buyer" : "Seller"}
                    </th>
                    <th className="py-4 px-4 text-left font-semibold">
                      Contact
                    </th>
                    {/* New Review column */}

                    <th className="py-4 px-4 text-left font-semibold">
                      Review
                    </th>
                    {currentUser.isSeller && (
                      <th className="py-4 px-4 text-left font-semibold">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    // Determine if the user is the seller (freelancer) or buyer (client)
                    const isSeller =
                      currentUser.id === order.freelancer_id?._id ||
                      currentUser.id === order.freelancer_id;
                    const otherParty = isSeller
                      ? order.client_id?.username || "Client"
                      : order.freelancer_id?.username || "Freelancer";

                    return (
                      <tr
                        key={order._id}
                        className={`border-b text-lg hover:bg-green-50 transition-colors duration-150`}
                      >
                        <td className="py-4 px-4">
                          <div className="w-16 h-12 rounded-md shadow-sm overflow-hidden">
                            <img
                              className="w-full h-full object-cover"
                              src={
                                order.gig_id?.images?.[0] ||
                                "https://via.placeholder.com/150"
                              }
                              alt={order.gig_id?.title || "Gig image"}
                            />
                          </div>
                        </td>
                        <td className="py-4 px-4 font-medium text-gray-800">
                          {order.gig_id?.title || "Untitled Gig"}
                        </td>
                        <td className="py-4 px-4 text-green-600 font-semibold">
                          $
                          {order.total_amount?.toFixed(2) ||
                            order.gig_id?.price?.toFixed(2) ||
                            "0.00"}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`py-1 px-3 rounded-full text-sm font-medium
                            ${
                              order.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status || "Pending"}
                          </span>
                        </td>
                        <td className="py-4 px-4">{otherParty}</td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => openMessageModal(order)}
                            className="bg-green-50 hover:bg-green-100 text-green-600 p-2 rounded-full transition-colors duration-150"
                            title="Contact"
                          >
                            <FontAwesomeIcon
                              icon={faEnvelope}
                              className="text-lg"
                            />
                          </button>
                        </td>
                        {/* New Review column for buyers (not sellers) */}
                        <td className="py-4 px-4">
                          {order.status === "Completed" && !order.hasReview ? (
                            <button
                              onClick={() => openReviewModal(order._id)}
                              className="bg-yellow-50 hover:bg-yellow-100 text-yellow-600 p-2 rounded-full transition-colors duration-150"
                              title="Add Review"
                            >
                              <FontAwesomeIcon
                                icon={fasStar}
                                className="text-lg"
                              />
                            </button>
                          ) : order.status === "Completed" &&
                            order.hasReview ? (
                            <span className="text-sm text-green-500 italic">
                              Reviewed
                            </span>
                          ) : (
                            <span className="text-sm text-gray-500 italic">
                              Not Available
                            </span>
                          )}
                        </td>
                        {currentUser.isSeller && (
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              {/* Only show actions if current user is the freelancer for this order */}
                              {currentUser.id ===
                              (order.freelancer_id?._id ||
                                order.freelancer_id) ? (
                                <>
                                  {order.status !== "Completed" &&
                                    order.status !== "Cancelled" && (
                                      <>
                                        <button
                                          onClick={() =>
                                            openSubmitWorkModal(order._id)
                                          }
                                          className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-md flex items-center transition-colors duration-150"
                                        >
                                          <FontAwesomeIcon
                                            icon={faCheckCircle}
                                            className="mr-1"
                                          />
                                          <span className="text-sm">
                                            Submit Work
                                          </span>
                                        </button>

                                        <button
                                          onClick={() =>
                                            handleCancelOrder(order._id)
                                          }
                                          disabled={
                                            processingAction ===
                                            order._id + "-cancel"
                                          }
                                          className={`${
                                            processingAction ===
                                            order._id + "-cancel"
                                              ? "bg-gray-300 cursor-not-allowed"
                                              : "bg-red-600 hover:bg-red-700"
                                          } text-white py-1 px-3 rounded-md flex items-center transition-colors duration-150`}
                                        >
                                          {processingAction ===
                                          order._id + "-cancel" ? (
                                            <FontAwesomeIcon
                                              icon={faSpinner}
                                              spin
                                              className="mr-1"
                                            />
                                          ) : (
                                            <FontAwesomeIcon
                                              icon={faTimesCircle}
                                              className="mr-1"
                                            />
                                          )}
                                          <span className="text-sm">
                                            Cancel
                                          </span>
                                        </button>
                                      </>
                                    )}
                                  {(order.status === "Completed" ||
                                    order.status === "Cancelled") && (
                                    <span className="text-sm text-gray-500 italic">
                                      No actions available
                                    </span>
                                  )}
                                </>
                              ) : (
                                <span className="text-sm text-gray-500 italic">
                                  No actions available
                                </span>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Message Modal */}
      {showMessageModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowMessageModal(false)}
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Message{" "}
                {currentUser.isSeller
                  ? selectedOrder.client_id?.username || "Client"
                  : selectedOrder.freelancer_id?.username || "Freelancer"}
              </h2>
              <div className="border-t pt-4">
                {/* The key part is passing the id prop here */}
                <Message
                  id={
                    currentUser.isSeller
                      ? selectedOrder.client_id?._id || selectedOrder.client_id
                      : selectedOrder.freelancer_id?._id ||
                        selectedOrder.freelancer_id
                  }
                  onClose={() => setShowMessageModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Work Modal */}
      {showSubmitWorkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowSubmitWorkModal(false)}
              disabled={uploadingFile}
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Submit Your Work
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Work Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows={4}
                    placeholder="Describe what you're delivering..."
                    value={workDescription}
                    onChange={(e) => setWorkDescription(e.target.value)}
                    disabled={uploadingFile}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload File
                  </label>
                  <div className="relative">
                    <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-green-500 focus:outline-none">
                      <span className="flex flex-col items-center space-y-2">
                        {selectedFile ? (
                          <>
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className="w-6 h-6 text-green-500"
                            />
                            <span className="font-medium text-gray-700">
                              {selectedFile.name} (
                              {Math.round(selectedFile.size / 1024)} KB)
                            </span>
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon
                              icon={faUpload}
                              className="w-6 h-6 text-gray-400"
                            />
                            <span className="font-medium text-gray-600">
                              Drop files to upload or{" "}
                              <span className="text-green-600">browse</span>
                            </span>
                          </>
                        )}
                      </span>
                      <input
                        type="file"
                        name="file_upload"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={uploadingFile}
                      />
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Upload any relevant files for this order
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                  onClick={() => setShowSubmitWorkModal(false)}
                  disabled={uploadingFile}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitWork}
                  disabled={uploadingFile}
                  className={`${
                    uploadingFile
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white px-4 py-2 text-sm font-medium rounded-md flex items-center transition-colors duration-150`}
                >
                  {uploadingFile ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                      <span>Submit Work</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowReviewModal(false)}
              disabled={submittingReview}
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
            <div className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Leave Your Review
                </h2>
                <p className="text-gray-500">
                  Share your experience with this service
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How would you rate your experience?
                  </label>
                  <div className="mb-2">
                    {renderStarRating(
                      rating,
                      hoverRating,
                      setRating,
                      setHoverRating
                    )}
                  </div>
                  <div className="text-yellow-500 font-medium">
                    {rating > 0
                      ? `${rating.toFixed(1)} out of 5`
                      : "Select a rating"}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    rows={5}
                    placeholder="Tell us what you liked or didn't like about this service..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    disabled={submittingReview}
                  ></textarea>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleSubmitReview}
                  disabled={submittingReview || rating === 0}
                  className={`${
                    submittingReview || rating === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  } text-white w-full py-3 text-sm font-medium rounded-md flex items-center justify-center transition-colors duration-150`}
                >
                  {submittingReview ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                      <span>Submitting Review...</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={fasStar} className="mr-2" />
                      <span>Submit Review</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;

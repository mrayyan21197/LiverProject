import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import Message from "../Message/Message";
import {
  Star,
  Clock,
  RefreshCw,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Share2,
  X,
  AlertCircle,
} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Gig() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("about");
  const [gigData, setGigData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requirementText, setRequirementText] = useState("");
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  // Fetch gig data when component mounts or ID changes
  useEffect(() => {
    const fetchGigData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://liverbackend.vercel.app/api/auth/gig/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch gig data");
        }

        const data = await response.json();
        console.log(data);
        setGigData(data);

        // Calculate average rating if reviews exist
        if (
          data.reviews &&
          Array.isArray(data.reviews) &&
          data.reviews.length > 0
        ) {
          const totalRating = data.reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          setAverageRating((totalRating / data.reviews.length).toFixed(1));
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchGigData();
    }
  }, [id]);

  const getCurrentUser = () => {
    try {
      const storedUser = localStorage.getItem("currentUser");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Error reading currentUser from localStorage", e);
      return null;
    }
  };

  const getCurrentUserId = () => {
    const currentUser = getCurrentUser();
    return currentUser?.id || "mock-client-id";
  };
  const isCurrentUserSeller = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;

    const freelancerId = gigData.freelancer_id?._id || gigData.freelancer_id;
    return currentUser.id === freelancerId;
  };
  const handleContinueClick = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      window.location.href = "/register";
    } else {
      setIsModalOpen(true);
    }
  };
  const handleMessageClick = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      window.location.href = "/register";
    } else {
      setIsMessageModalOpen(true);
    }
  };
  const handleOrderSubmit = async () => {
    try {
      setOrderLoading(true);
      setOrderError(null);

      // Calculate delivery date (typically 'delivery_time' days from now)
      const deliveryDays =
        gigData.delivery_time || gigData.packages?.standard?.delivery_time || 4;
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + parseInt(deliveryDays));

      const orderData = {
        gig_id: id,
        client_id: getCurrentUserId(),
        freelancer_id: gigData.freelancer_id?._id || gigData.freelancer_id, // Depending on your data structure
        total_amount: gigData.price || gigData.packages?.standard?.price || 99,
        delivery_date: deliveryDate.toISOString(),
        requirements: requirementText,
      };

      const response = await fetch("https://liverbackend.vercel.app/api/auth/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      setOrderSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setOrderSuccess(false);
      }, 3000);
    } catch (err) {
      setOrderError(err.message);
    } finally {
      setOrderLoading(false);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    adaptiveHeight: false,
    lazyLoad: "ondemand",
    // Ensure slides are contained
    className: "center",
    centerMode: false,
    centerPadding: "0px",
  };

  // Create a default set of images in case none are provided by the API
  const defaultImages = [
    "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
  ];

  // Random profile images for reviews
  const profileImages = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  ];

  // Helper function to get random profile image
  const getRandomProfileImage = () => {
    const randomIndex = Math.floor(Math.random() * profileImages.length);
    return profileImages[randomIndex];
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays < 1) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  if (!gigData)
    return (
      <div className="flex justify-center items-center min-h-screen">
        No gig data found
      </div>
    );

  // Make sure we have an array of images to work with
  const images =
    gigData.images && Array.isArray(gigData.images) && gigData.images.length > 0
      ? gigData.images
      : defaultImages;

  // Get freelancer name and image
  const freelancerName =
    gigData.freelancer_id?.full_verification?.[0]?.full_name ||
    "John Developer";
  const freelancerImage =
    gigData.freelancer_id?.full_verification?.[0]?.profile_pic ||
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop";
  const gigPrice = gigData.price || gigData.packages?.standard?.price || 99;

  // Get reviews count and rating
  const reviewsCount = gigData.reviews?.length || 0;
  const rating = averageRating || gigData.portfolio?.overall_rating || 5.0;

  return (
    <div className="bg-[#F7F9FC] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side */}
          <div className="lg:w-2/3">
            <nav className="text-[#74767E] text-sm mb-5">
              {gigData.category || "Graphics & Design"} 
            </nav>

            <h1 className="text-[#404145] text-[28px] font-bold mb-6">
              {gigData.title ||
                "Professional and responsive website design and development"}
            </h1>

            {/* Seller Info */}
            <div className="flex items-center gap-4 mb-6">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={freelancerImage}
                alt="Seller"
              />
              <div className="flex items-center gap-4">
                <span className="font-semibold text-[#404145]">
                  {freelancerName}
                </span>
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(rating)
                            ? "fill-[#FFB33E] text-[#FFB33E]"
                            : "fill-[#E4E5E7] text-[#E4E5E7]"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[#FFB33E] font-medium">{rating}</span>
                  <span className="text-[#74767E]">({reviewsCount})</span>
                </div>
              </div>
            </div>

            {/* Image Slider - Fixed to ensure proper display */}
            <div className="mb-10 relative">
              {/* Wrapper to control height and contain the slider */}
              <div
                style={{ height: "600px" }}
                className="relative overflow-hidden rounded-lg"
              >
                <Slider {...settings}>
                  {images.map((image, index) => (
                    <div key={index} className="outline-none">
                      <div className="h-[600px] relative">
                        <img
                          src={image}
                          alt={`Project Preview ${index + 1}`}
                          className="w-full h-full object-cover absolute top-0 left-0"
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <div className="flex gap-8">
                <button
                  className={`pb-4 px-2 ${
                    activeTab === "about"
                      ? "border-b-2 border-[#1DBF73] text-[#1DBF73]"
                      : "text-[#74767E]"
                  }`}
                  onClick={() => setActiveTab("about")}
                >
                  About This Gig
                </button>
                <button
                  className={`pb-4 px-2 ${
                    activeTab === "reviews"
                      ? "border-b-2 border-[#1DBF73] text-[#1DBF73]"
                      : "text-[#74767E]"
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews ({reviewsCount})
                </button>
              </div>
            </div>

            {activeTab === "about" ? (
              <>
                {/* About This Gig */}
                <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
                  <h2 className="text-[#404145] text-xl font-bold mb-6">
                    About This Gig
                  </h2>
                  <div className="text-[#62646A] leading-7 space-y-4">
                    <p>
                      {gigData.description ||
                        "I will create a professional and responsive website tailored to your needs, ensuring it looks great on all devices and provides an excellent user experience."}
                    </p>
                    {gigData.about && <p>{gigData.about}</p>}
                  </div>
                </div>

                {/* About The Seller */}
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h2 className="text-[#404145] text-xl font-bold mb-6">
                    About The Seller
                  </h2>
                  <div className="flex items-start gap-6">
                    <img
                      src={freelancerImage}
                      alt="Seller"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div className="space-y-3">
                      <h3 className="font-medium text-lg">{freelancerName}</h3>
                      <p className="text-[#62646A]">
                        {gigData.portfolio?.skills?.[0]?.name ||
                          "Full Stack Web Developer"}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.round(rating)
                                  ? "fill-[#FFB33E] text-[#FFB33E]"
                                  : "fill-[#E4E5E7] text-[#E4E5E7]"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[#FFB33E] font-medium">
                          {rating}
                        </span>
                        <span className="text-[#74767E]">({reviewsCount})</span>
                      </div>
                      {/* <button className="border border-[#1DBF73] text-[#1DBF73] px-6 py-2 rounded-md hover:bg-[#1DBF73] hover:text-white transition-colors">
                        Contact Me
                      </button> */}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Reviews Section */
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                  <h2 className="text-[#404145] text-xl font-bold mb-4 md:mb-0">
                    {reviewsCount} Reviews for this Gig
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-[#FFB33E] font-medium text-xl">
                      {rating}
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.round(rating)
                              ? "fill-[#FFB33E] text-[#FFB33E]"
                              : "fill-[#E4E5E7] text-[#E4E5E7]"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[#74767E]">({reviewsCount})</span>
                  </div>
                </div>

                {/* Rating summary */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {[5, 4, 3, 2, 1].map((starCount) => {
                      // Calculate how many reviews have this rating
                      const ratingCount = gigData.reviews
                        ? gigData.reviews.filter((r) => r.rating === starCount)
                            .length
                        : 0;

                      // Calculate percentage
                      const percentage =
                        reviewsCount > 0
                          ? Math.round((ratingCount / reviewsCount) * 100)
                          : 0;

                      return (
                        <div
                          key={starCount}
                          className="flex items-center gap-3"
                        >
                          <span className="text-[#74767E] w-3">
                            {starCount}
                          </span>
                          <Star className="w-4 h-4 fill-[#FFB33E] text-[#FFB33E]" />
                          <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-[#FFB33E] h-full rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-[#74767E] text-sm">
                            {percentage}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Check if reviews exist in gigData */}
                  {gigData.reviews &&
                  Array.isArray(gigData.reviews) &&
                  gigData.reviews.length > 0
                    ? gigData.reviews.map((review, index) => {
                        // Get random reviewer info
                        const reviewerName =
                          review.reviewer_id?.username || `Client ${index + 1}`;
                        const reviewerAvatar = getRandomProfileImage();
                        const country = [
                          "United States",
                          "Canada",
                          "United Kingdom",
                          "Australia",
                          "Germany",
                          "France",
                        ][Math.floor(Math.random() * 6)];

                        return (
                          <div
                            key={review._id || index}
                            className="border-b border-gray-100 pb-8"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <img
                                  src={reviewerAvatar}
                                  alt={reviewerName}
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                  <h3 className="font-medium text-[#404145]">
                                    {reviewerName}
                                  </h3>
                                  <div className="flex items-center gap-2 text-sm text-[#74767E]">
                                    <span>{country}</span>
                                    <span>•</span>
                                    <span>{formatDate(review.created_at)}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Share2 className="w-5 h-5 text-[#74767E] cursor-pointer hover:text-[#1DBF73]" />
                                <Flag className="w-5 h-5 text-[#74767E] cursor-pointer hover:text-red-500" />
                              </div>
                            </div>

                            <div className="flex mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "fill-[#FFB33E] text-[#FFB33E]"
                                      : "fill-[#E4E5E7] text-[#E4E5E7]"
                                  }`}
                                />
                              ))}
                            </div>

                            <p className="text-[#62646A] leading-7 mb-4">
                              {review.comment ||
                                "Great service! I'm very satisfied with the work."}
                            </p>

                            <div className="flex items-center gap-6 text-sm">
                              <span className="text-[#74767E]">Helpful?</span>
                              <button className="flex items-center gap-2 text-[#74767E] hover:text-[#1DBF73]">
                                <ThumbsUp className="w-4 h-4" />
                                <span>Yes</span>
                                <span>({Math.floor(Math.random() * 30)})</span>
                              </button>
                              <button className="flex items-center gap-2 text-[#74767E] hover:text-[#1DBF73]">
                                <ThumbsDown className="w-4 h-4" />
                                <span>No</span>
                                <span>({Math.floor(Math.random() * 5)})</span>
                              </button>
                            </div>
                          </div>
                        );
                      })
                    : [
                        {
                          id: 1,
                          name: "Sarah Johnson",
                          country: "United States",
                          avatar:
                            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                          rating: 5,
                          date: "2 weeks ago",
                          review:
                            "Amazing work! The website exceeded my expectations. The developer was very communicative and delivered everything on time. The design is beautiful and works perfectly on all devices. I'll definitely be coming back for more projects!",
                          helpful: 24,
                          notHelpful: 1,
                        },
                        {
                          id: 2,
                          name: "Michael Chen",
                          country: "Singapore",
                          avatar:
                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                          rating: 5,
                          date: "1 month ago",
                          review:
                            "Exceptional service! The attention to detail was remarkable. They went above and beyond to ensure my website was exactly what I needed. The code is clean and well-documented. Highly recommend!",
                          helpful: 18,
                          notHelpful: 0,
                        },
                      ].map((review) => (
                        <div
                          key={review.id}
                          className="border-b border-gray-100 pb-8"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={review.avatar}
                                alt={review.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div>
                                <h3 className="font-medium text-[#404145]">
                                  {review.name}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-[#74767E]">
                                  <span>{review.country}</span>
                                  <span>•</span>
                                  <span>{review.date}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Share2 className="w-5 h-5 text-[#74767E] cursor-pointer hover:text-[#1DBF73]" />
                              <Flag className="w-5 h-5 text-[#74767E] cursor-pointer hover:text-red-500" />
                            </div>
                          </div>

                          <div className="flex mb-3">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-[#FFB33E] text-[#FFB33E]"
                              />
                            ))}
                          </div>

                          <p className="text-[#62646A] leading-7 mb-4">
                            {review.review}
                          </p>

                          <div className="flex items-center gap-6 text-sm">
                            <span className="text-[#74767E]">Helpful?</span>
                            <button className="flex items-center gap-2 text-[#74767E] hover:text-[#1DBF73]">
                              <ThumbsUp className="w-4 h-4" />
                              <span>Yes</span>
                              <span>({review.helpful})</span>
                            </button>
                            <button className="flex items-center gap-2 text-[#74767E] hover:text-[#1DBF73]">
                              <ThumbsDown className="w-4 h-4" />
                              <span>No</span>
                              <span>({review.notHelpful})</span>
                            </button>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            )}
          </div>
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
              {isMessageModalOpen ? (
                <div className="relative">
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={() => setIsMessageModalOpen(false)}
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <Message />
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">
                      {gigData.packages?.standard?.title || "Standard Package"}
                    </h3>
                    <span className="text-2xl font-bold">${gigPrice}</span>
                  </div>

                  <p className="text-[#62646A] mb-6">
                    {gigData.packages?.standard?.description ||
                      gigData.short_description ||
                      "Get a professional website with modern design, responsive layout, and optimized performance."}
                  </p>

                  <div className="flex justify-between mb-6 text-sm text-[#62646A]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {gigData.delivery_time ||
                          gigData.packages?.standard?.delivery_time ||
                          "4"}{" "}
                        Days Delivery
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4" />
                      <span>
                        {gigData.revision ||
                          gigData.packages?.standard?.revisions ||
                          "3"}{" "}
                        Revisions
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {(
                      gigData.features ||
                      gigData.packages?.standard?.features || [
                        "Responsive Design",
                        "Source Code",
                        "Content Upload",
                        "Design Customization",
                        "Include Source File",
                      ]
                    ).map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 text-[#62646A]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#1DBF73]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {isCurrentUserSeller() ? (
                    <div className="w-full bg-blue-100 text-blue-700 p-4 rounded-md mb-3 text-center">
                      This is your gig. You cannot order your own services.
                    </div>
                  ) : (
                    <>
                      <button
                        className="w-full bg-[#1DBF73] text-white py-3 rounded-md hover:bg-[#19a463] transition-colors font-medium"
                        onClick={handleContinueClick}
                      >
                        Continue (${gigPrice})
                      </button>
                      <button
                        className="w-full mt-3 border border-[#1DBF73] text-[#1DBF73] py-3 rounded-md hover:bg-[#F7F9FC] transition-colors font-medium"
                        onClick={handleMessageClick}
                      >
                        Contact Seller
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      // {/* Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-md relative overflow-hidden">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#404145] mb-6">
                Complete Your Order
              </h2>

              {orderSuccess ? (
                <div className="bg-green-50 p-4 rounded-md mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <p className="text-green-700 font-medium">
                      Order placed successfully!
                    </p>
                  </div>
                </div>
              ) : orderError ? (
                <div className="bg-red-50 p-4 rounded-md mb-6">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                    <p className="text-red-700 font-medium">{orderError}</p>
                  </div>
                </div>
              ) : null}

              {/* Order summary */}
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={images[0]}
                    alt="Gig thumbnail"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-medium text-[#404145]">
                      {gigData.title || "Professional Website Development"}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[#74767E] text-sm">
                      <span>By {freelancerName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between font-medium mb-2">
                  <span>Subtotal</span>
                  <span>${gigPrice}</span>
                </div>
                <div className="flex justify-between font-medium mb-2">
                  <span>Service Fee</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Total</span>
                  <span>${gigPrice}</span>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-6">
                <label
                  htmlFor="requirements"
                  className="block font-medium mb-2"
                >
                  Project Requirements
                </label>
                <textarea
                  id="requirements"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#1DBF73] resize-none"
                  rows="5"
                  placeholder="Tell the seller what you need... Be specific about your project requirements."
                  value={requirementText}
                  onChange={(e) => setRequirementText(e.target.value)}
                ></textarea>
              </div>
              {/* Place order button */}
              <button
                className={`w-full bg-[#1DBF73] text-white py-3 rounded-md hover:bg-[#19a463] transition-colors font-medium ${
                  orderLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                onClick={handleOrderSubmit}
                disabled={orderLoading}
              >
                {orderLoading ? "Processing..." : "Place Order"}
              </button>

              <p className="text-xs text-center text-gray-500 mt-4">
                By placing an order, you agree to the Terms of Service and
                Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Gig;

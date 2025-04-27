// import { useState, useEffect } from "react";
// import { Search, Filter } from "lucide-react";
// import GigCard from "../../components/gigCard/GigCard";
// import axios from "axios";

// const AdminGigs = () => {
//   const [gigs, setGigs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTitle, setSearchTitle] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedRating, setSelectedRating] = useState("");

//   useEffect(() => {
//     const fetchGigs = async () => {
//       try {
//         setLoading(true);
//         // Using axios with the correct endpoint; no query parameters for now
//         const params = {};
//         const response = await axios.get("http://localhost:3000/api/auth/gigs", { params });
        
//         if (response.status !== 200) {
//           throw new Error("Failed to fetch gigs");
//         }
//         // Extract the gigs array from the response object
//         setGigs(response.data.gigs);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error("Error fetching gigs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGigs();
//   }, []);

//   // Calculate average rating from reviews
//   const calculateAverageRating = (reviews) => {
//     if (!reviews || reviews.length === 0) return 0;
    
//     // Sum all ratings
//     const sum = reviews.reduce((total, review) => {
//       return total + (review.rating || 0);
//     }, 0);
    
//     // Calculate average
//     return sum / reviews.length;
//   };

//   // Filter gigs based on search criteria
//   const filteredGigs = gigs.filter(gig => {
//     const matchesTitle = searchTitle
//       ? gig.title?.toLowerCase().includes(searchTitle.toLowerCase()) ||
//         gig.description?.toLowerCase().includes(searchTitle.toLowerCase())
//       : true;
    
//       const categoryLower = selectedCategory?.toLowerCase();

//       const matchesCategory = selectedCategory
//         ? gig.category?.toLowerCase().includes(categoryLower) ||
//           gig.gig_tags?.some(tag => tag.toLowerCase().includes(categoryLower))
//         : true;
    
//     // Calculate average rating for this gig
//     const avgRating = calculateAverageRating(gig.reviews || []);
    
//     const matchesRating = selectedRating
//       ? avgRating >= parseInt(selectedRating)
//       : true;
    
//     return matchesTitle && matchesCategory && matchesRating;
//   });

//   return (
//     <div>
//       {/* Top Bar / Filters */}
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold">Gigs</h1>
//       </div>

//       {/* Filter Section */}
//       <div className="bg-white p-4 rounded shadow mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
//           {/* Search by Title */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Search by Title
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Enter gig title"
//                 className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400 pr-8"
//                 value={searchTitle}
//                 onChange={(e) => setSearchTitle(e.target.value)}
//               />
//               <Search size={16} className="absolute right-2 top-2.5 text-gray-400" />
//             </div>
//           </div>
          
//           {/* Category Dropdown */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Category
//             </label>
//             <select
//               className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//             >
//               <option value="">All Categories</option>
//               <option value="frontend">Frontend </option>
//               <option value="backend">Backend </option>
//               <option value="fullstack">Website Development</option>
//               <option value="graphics-design">Graphics Design</option>
//               <option value="content-writing">Content Writing</option>
//               <option value="digital-marketing">Digital Marketing</option>
//               <option value="video-editing">Video Editing</option>
//               <option value="audio-production">Audio Production</option>
//             </select>
//           </div>
          
//           {/* Rating Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Rating
//             </label>
//             <select
//               className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
//               value={selectedRating}
//               onChange={(e) => setSelectedRating(e.target.value)}
//             >
//               <option value="">All Ratings</option>
//               <option value="4">4 & above</option>
//               <option value="3">3 & above</option>
//               <option value="2">2 & above</option>
//               <option value="1">1 & above</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Loading, Error, and Empty States */}
//       {loading && (
//         <div className="text-center py-8">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
//           <p className="mt-2 text-gray-600">Loading gigs...</p>
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
//           <p>Error: {error}</p>
//           <button 
//             className="mt-2 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
//             onClick={() => window.location.reload()}
//           >
//             Try Again
//           </button>
//         </div>
//       )}

//       {!loading && !error && filteredGigs.length === 0 && (
//         <div className="text-center py-8 bg-white rounded shadow">
//           <Filter size={40} className="mx-auto text-gray-400 mb-2" />
//           <p className="text-gray-600">No gigs match your filter criteria.</p>
//         </div>
//       )}

//       {/* Gigs Grid Container using GigCard component */}
//       {!loading && !error && filteredGigs.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredGigs.map((gig) => (
//             <GigCard key={gig._id} item={gig} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminGigs;
import { useState, useEffect } from "react";
import { Search, Filter, Check, X, AlertCircle } from "lucide-react";
import GigCard from "../../components/gigCard/GigCard";
import axios from "axios";

const AdminGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [activeTab, setActiveTab] = useState("approved");
  const [processingGigId, setProcessingGigId] = useState(null);

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async () => {
    try {
      setLoading(true);
      // Using axios with the correct endpoint; no query parameters for now
      const params = {};
      const response = await axios.get("http://localhost:3000/api/auth/gigs", { params });
      
      if (response.status !== 200) {
        throw new Error("Failed to fetch gigs");
      }
      // Extract the gigs array from the response object
      setGigs(response.data.gigs);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching gigs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate average rating from reviews
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    
    // Sum all ratings
    const sum = reviews.reduce((total, review) => {
      return total + (review.rating || 0);
    }, 0);
    
    // Calculate average
    return sum / reviews.length;
  };

  // Handle gig approval
  const handleApproveGig = async (gigId) => {
    try {
      setProcessingGigId(gigId);
      const response = await axios.put(`http://localhost:3000/api/auth/gig/approve/${gigId}`);
      
      if (response.status === 200) {
        // Update the gig status locally
        setGigs(gigs.map(gig => 
          gig._id === gigId ? { ...gig, isApproved: true } : gig
        ));
      }
    } catch (err) {
      console.error("Error approving gig:", err);
      alert("Failed to approve gig. Please try again.");
    } finally {
      setProcessingGigId(null);
    }
  };

  // Handle gig rejection/deletion
  const handleRejectGig = async (gigId) => {
    if (window.confirm("Are you sure you want to reject and delete this gig?")) {
      try {
        setProcessingGigId(gigId);
        const response = await axios.delete(`http://localhost:3000/api/auth/gig/${gigId}`);
        
        if (response.status === 200) {
          // Remove the gig from the local state
          setGigs(gigs.filter(gig => gig._id !== gigId));
        }
      } catch (err) {
        console.error("Error rejecting gig:", err);
        alert("Failed to reject gig. Please try again.");
      } finally {
        setProcessingGigId(null);
      }
    }
  };

  // Filter gigs based on search criteria and approval status
  const filteredGigs = gigs.filter(gig => {
    const matchesTitle = searchTitle
      ? gig.title?.toLowerCase().includes(searchTitle.toLowerCase()) ||
        gig.description?.toLowerCase().includes(searchTitle.toLowerCase())
      : true;
    
    const categoryLower = selectedCategory?.toLowerCase();

    const matchesCategory = selectedCategory
      ? gig.category?.toLowerCase().includes(categoryLower) ||
        gig.gig_tags?.some(tag => tag.toLowerCase().includes(categoryLower))
      : true;
    
    // Calculate average rating for this gig
    const avgRating = calculateAverageRating(gig.reviews || []);
    
    const matchesRating = selectedRating
      ? avgRating >= parseInt(selectedRating)
      : true;
    
    const matchesApproval = activeTab === "approved" ? gig.isApproved : !gig.isApproved;
    
    return matchesTitle && matchesCategory && matchesRating && matchesApproval;
  });

  return (
    <div>
      {/* Top Bar / Filters */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Gigs Management</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex mb-6 border-b">
        <button
          className={`py-3 px-6 font-medium ${
            activeTab === "approved"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-600 hover:text-green-600"
          }`}
          onClick={() => setActiveTab("approved")}
        >
          Approved Gigs
          <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {gigs.filter(gig => gig.isApproved).length}
          </span>
        </button>
        <button
          className={`py-3 px-6 font-medium ${
            activeTab === "pending"
              ? "text-yellow-600 border-b-2 border-yellow-600"
              : "text-gray-600 hover:text-yellow-600"
          }`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Approvals
          <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {gigs.filter(gig => !gig.isApproved).length}
          </span>
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded shadow mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
          {/* Search by Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search by Title
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter gig title"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400 pr-8"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
              <Search size={16} className="absolute right-2 top-2.5 text-gray-400" />
            </div>
          </div>
          
          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="frontend">Frontend </option>
              <option value="backend">Backend </option>
              <option value="fullstack">Website Development</option>
              <option value="graphics-design">Graphics Design</option>
              <option value="content-writing">Content Writing</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="video-editing">Video Editing</option>
              <option value="audio-production">Audio Production</option>
            </select>
          </div>
          
          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <select
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
            >
              <option value="">All Ratings</option>
              <option value="4">4 & above</option>
              <option value="3">3 & above</option>
              <option value="2">2 & above</option>
              <option value="1">1 & above</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section title based on active tab */}
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-medium">
          {activeTab === "approved" ? "Approved Gigs" : "Pending Approval Requests"}
        </h2>
        <div className="ml-auto">
          <button
            onClick={fetchGigs}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-gray-600"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Loading, Error, and Empty States */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading gigs...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          <p>Error: {error}</p>
          <button 
            className="mt-2 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && filteredGigs.length === 0 && (
        <div className="text-center py-8 bg-white rounded shadow">
          <Filter size={40} className="mx-auto text-gray-400 mb-2" />
          <p className="text-gray-600">
            {activeTab === "approved" 
              ? "No approved gigs match your filter criteria." 
              : "No pending gigs waiting for approval."}
          </p>
        </div>
      )}

      {/* Gigs Grid Container with conditional rendering based on tab */}
      {!loading && !error && filteredGigs.length > 0 && (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${activeTab === "pending" ? "2" : "4"} gap-6`}>
          {filteredGigs.map((gig) => (
            <div key={gig._id} className="relative">
              {activeTab === "pending" ? (
                <div className="bg-white rounded shadow overflow-hidden">
                  <div className="relative">
                    {gig.coverimage && (
                      <img 
                        src={gig.coverimage} 
                        alt={gig.title} 
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center">
                      <AlertCircle size={12} className="mr-1" />
                      Pending
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{gig.title}</h3>
                    <p className="text-gray-500 text-sm mb-2">{gig.category}</p>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">{gig.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex items-center text-sm">
                        <span className="font-medium">Price:</span>
                        <span className="ml-2 text-green-600 font-bold">${gig.price}</span>
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <span className="font-medium">Delivery:</span>
                        <span className="ml-2">{gig.delivery_time} days</span>
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <span className="font-medium">Tags:</span>
                        <div className="ml-2 flex flex-wrap gap-1">
                          {gig.gig_tags?.slice(0, 3).map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                          {(gig.gig_tags?.length > 3) && (
                            <span className="text-gray-500 text-xs">+{gig.gig_tags.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApproveGig(gig._id)}
                        disabled={processingGigId === gig._id}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded font-medium flex items-center justify-center"
                      >
                        {processingGigId === gig._id ? (
                          <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                        ) : (
                          <>
                            <Check size={16} className="mr-2" />
                            Approve
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleRejectGig(gig._id)}
                        disabled={processingGigId === gig._id}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded font-medium flex items-center justify-center"
                      >
                        {processingGigId === gig._id ? (
                          <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                        ) : (
                          <>
                            <X size={16} className="mr-2" />
                            Reject
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <GigCard item={gig} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGigs;
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const MyGigs = () => {
//   const [gigs, setGigs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     // Get currentUser from localStorage
//     const storedUser = localStorage.getItem("currentUser");
//     if (storedUser) {
//       setCurrentUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const fetchMyGigs = async () => {
//     if (!currentUser || !currentUser.id) return;

//     try {
//       setLoading(true);
//       const response = await axios.get(`https://liverbackend.vercel.app/api/auth/gigs/freelancer/${currentUser.id}`);
      
//       if (response.data && response.data.gigs) {
//         setGigs(response.data.gigs);
//       }
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching gigs:", err);
//       setError("Failed to load gigs. Please try again later.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMyGigs();
//   }, [currentUser]);

//   const handleDeleteGig = async (gigId) => {
//     if (!currentUser || !currentUser.id) return;
    
//     try {
//       setDeleteLoading(true);
      
//       // Call the delete API endpoint
//       await axios.delete(`https://liverbackend.vercel.app/api/auth/gig/${gigId}`);
      
//       // If successful, update the state to remove the deleted gig
//       setGigs(prevGigs => prevGigs.filter(gig => gig._id !== gigId));
      
//       setDeleteLoading(false);
//       alert("Gig deleted successfully!");
//     } catch (err) {
//       console.error("Error deleting gig:", err);
//       setDeleteLoading(false);
//       alert(err.response?.data?.error || "Failed to delete gig. Please try again.");
//     }
//   };

//   if (!currentUser) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="text-xl font-medium text-gray-700 p-8 bg-white rounded-lg shadow-md">
//           Please log in to view your gigs.
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="flex flex-col items-center">
//           <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
//           <p className="mt-4 text-xl font-medium text-gray-700">Loading your gigs...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="text-xl text-red-500 p-8 bg-white rounded-lg shadow-md border-l-4 border-red-500">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Title Section */}
//         <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-md">
//           <h1 className="text-3xl font-bold text-gray-800 flex items-center">
//             <span className="bg-green-500 w-2 h-8 rounded mr-3"></span>
//             {currentUser.isSeller ? "My Gigs" : "My Orders"}
//           </h1>
//           {currentUser.isSeller && (
//             <Link to="/addGig">
//               <button className="bg-green-500 text-white font-medium px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300 transform hover:scale-105 shadow-md flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
//                 </svg>
//                 Add New Gig
//               </button>
//             </Link>
//           )}
//         </div>

//         {/* Content */}
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           {gigs.length === 0 ? (
//             <div className="text-center py-16 px-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
//               </svg>
//               <p className="text-2xl font-medium text-gray-700 mt-4">You don't have any gigs yet.</p>
//               {currentUser.isSeller && (
//                 <Link to="/addGig">
//                   <button className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300">
//                     Create your first gig
//                     <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </button>
//                 </Link>
//               )}
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                       Image
//                     </th>
//                     <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                       Title
//                     </th>
//                     <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                       Price
//                     </th>
//                     <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                       Sales
//                     </th>
//                     <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {gigs.map((gig) => (
//                     <tr key={gig._id} className="hover:bg-gray-50 transition duration-200">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex-shrink-0 h-16 w-24 rounded-md overflow-hidden shadow-sm">
//                           <img
//                             className="h-full w-full object-cover"
//                             src={gig.coverimage || "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"}
//                             alt={gig.title}
//                           />
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-base font-medium text-gray-800 line-clamp-2">
//                           {gig.title}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-lg font-bold text-green-600">
//                           ${gig.price}.<span className="text-xs">99</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="px-3 py-1 inline-flex items-center bg-green-100 text-green-800 rounded-full">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                             <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
//                           </svg>
//                           {gig.reviews ? gig.reviews.length : 0} Sales
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm">
//                         <div className="flex space-x-3">
//                           <Link to={`/gig/${gig._id}`} className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                               <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                               <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
//                             </svg>
//                             View
//                           </Link>
//                           <button 
//                             className="text-red-600 hover:text-red-800 font-medium flex items-center"
//                             disabled={deleteLoading}
//                             onClick={() => {
//                               if(window.confirm("Are you sure you want to delete this gig?")) {
//                                 handleDeleteGig(gig._id);
//                               }
//                             }}
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                               <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                             </svg>
//                             {deleteLoading ? "Deleting..." : "Delete"}
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyGigs;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MyGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get currentUser from localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchMyGigs = async () => {
    if (!currentUser || !currentUser.id) return;

    try {
      setLoading(true);
      const response = await axios.get(`https://liverbackend.vercel.app/api/auth/gigs/freelancer/${currentUser.id}`);
      
      if (response.data && response.data.gigs) {
        // Filter gigs where isApproved is true
        const approvedGigs = response.data.gigs.filter(gig => gig.isApproved === true);
        setGigs(approvedGigs);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching gigs:", err);
      setError("Failed to load gigs. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyGigs();
  }, [currentUser]);

  const handleDeleteGig = async (gigId) => {
    if (!currentUser || !currentUser.id) return;
    
    try {
      setDeleteLoading(true);
      
      // Call the delete API endpoint
      await axios.delete(`https://liverbackend.vercel.app/api/auth/gig/${gigId}`);
      
      // If successful, update the state to remove the deleted gig
      setGigs(prevGigs => prevGigs.filter(gig => gig._id !== gigId));
      
      setDeleteLoading(false);
      alert("Gig deleted successfully!");
    } catch (err) {
      console.error("Error deleting gig:", err);
      setDeleteLoading(false);
      alert(err.response?.data?.error || "Failed to delete gig. Please try again.");
    }
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-xl font-medium text-gray-700 p-8 bg-white rounded-lg shadow-md">
          Please log in to view your gigs.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-medium text-gray-700">Loading your gigs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-xl text-red-500 p-8 bg-white rounded-lg shadow-md border-l-4 border-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <span className="bg-green-500 w-2 h-8 rounded mr-3"></span>
            {currentUser.isSeller ? "My Approved Gigs" : "My Orders"}
          </h1>
          {currentUser.isSeller && (
            <Link to="/addGig">
              <button className="bg-green-500 text-white font-medium px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300 transform hover:scale-105 shadow-md flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add New Gig
              </button>
            </Link>
          )}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {gigs.length === 0 ? (
            <div className="text-center py-16 px-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-2xl font-medium text-gray-700 mt-4">You don't have any approved gigs yet.</p>
              {currentUser.isSeller && (
                <Link to="/addGig">
                  <button className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300">
                    Create your first gig
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Sales
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {gigs.map((gig) => (
                    <tr key={gig._id} className="hover:bg-gray-50 transition duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex-shrink-0 h-16 w-24 rounded-md overflow-hidden shadow-sm">
                          <img
                            className="h-full w-full object-cover"
                            src={gig.coverimage || "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                            alt={gig.title}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-base font-medium text-gray-800 line-clamp-2">
                          {gig.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-bold text-green-600">
                          ${gig.price}.<span className="text-xs">99</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="px-3 py-1 inline-flex items-center bg-green-100 text-green-800 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                          </svg>
                          {gig.reviews ? gig.reviews.length : 0} Sales
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-3">
                          <Link to={`/gig/${gig._id}`} className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            View
                          </Link>
                          <button 
                            className="text-red-600 hover:text-red-800 font-medium flex items-center"
                            disabled={deleteLoading}
                            onClick={() => {
                              if(window.confirm("Are you sure you want to delete this gig?")) {
                                handleDeleteGig(gig._id);
                              }
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {deleteLoading ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyGigs;
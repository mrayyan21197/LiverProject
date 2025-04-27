// import { useState, useEffect } from "react";
// import { useOutletContext } from "react-router-dom";
// import { Eye, Trash2 } from "lucide-react";

// const Users = () => {
//   // Get activeView from the outlet context
//   const { activeView: contextActiveView } = useOutletContext();

//   // State for active view (sync with context)
//   const [activeView, setActiveView] = useState(contextActiveView || "clients");

//   // Update local state when context changes
//   useEffect(() => {
//     if (contextActiveView) {
//       setActiveView(contextActiveView);
//     }
//   }, [contextActiveView]);

//   // State for modal visibility
//   const [detailsModalVisible, setDetailsModalVisible] = useState(false);
//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//   // State for selected item
//   const [selectedItem, setSelectedItem] = useState(null);

//   // Sample data - in production, this would come from API
//   const clientsData = [
//     {
//       id: "CLI001",
//       name: "Alice Johnson",
//       email: "alice@example.com",
//       address: "123 Main St, Cityville",
//       phone: "(555) 123-4567",
//       signUpDate: "January 10, 2025",
//       lastLogin: "March 15, 2025",
//       accountStatus: "Active",
//       totalSpending: "$2,500",
//     },
//     {
//       id: "CLI002",
//       name: "Bob Williams",
//       email: "bob@example.com",
//       address: "456 Elm St, Townsville",
//       phone: "(555) 987-6543",
//       signUpDate: "February 5, 2025",
//       lastLogin: "April 2, 2025",
//       accountStatus: "Active",
//       totalSpending: "$1,200",
//     },
//   ];

//   const freelancersData = [
//     {
//       id: "FRE001",
//       name: "John Doe",
//       skill: "Web Developer",
//       rating: "4.5",
//       skills: "HTML, CSS, JavaScript, React",
//       completedProjects: "15",
//       totalEarning: "$5,000",
//       availability: "Available",
//       hourlyRate: "$30/hr",
//       experienceYears: "5+ Years",
//       projects: [
//         { name: "Project Alpha (E-commerce Website)", rating: "5.0" },
//         { name: "Project Beta (Landing Page)", rating: "4.5" },
//         { name: "Project Gamma (Blog Platform)", rating: "4.0" },
//       ],
//     },
//     {
//       id: "FRE002",
//       name: "Jane Smith",
//       skill: "Graphic Designer",
//       rating: "4.8",
//       skills: "Photoshop, Illustrator, UI/UX Design",
//       completedProjects: "22",
//       totalEarning: "$7,800",
//       availability: "Busy",
//       hourlyRate: "$45/hr",
//       experienceYears: "8+ Years",
//       projects: [
//         { name: "Brand Identity for StartupX", rating: "5.0" },
//         { name: "UI Design for Mobile App", rating: "4.9" },
//         { name: "Marketing Materials for EventY", rating: "4.7" },
//       ],
//     },
//   ];
//   const [pageTitle, setpageTitle] = useState("");
//   // Filtered data based on active view
//   const [filteredData, setFilteredData] = useState([]);
//   // Search filters
//   const [nameFilter, setNameFilter] = useState("");
//   const [emailFilter, setEmailFilter] = useState("");
//   const [skillFilter, setSkillFilter] = useState("");
//   const [ratingFilter, setRatingFilter] = useState("");

//   // Effect to update filtered data when view changes or filters change
//   useEffect(() => {
//     let data = activeView === "clients" ? clientsData : freelancersData;

//     // Apply name filter
//     if (nameFilter) {
//       data = data.filter((item) =>
//         item.name.toLowerCase().includes(nameFilter.toLowerCase())
//       );
//     }

//     // Apply email filter (clients only)
//     if (activeView === "clients" && emailFilter) {
//       data = data.filter((item) =>
//         item.email.toLowerCase().includes(emailFilter.toLowerCase())
//       );
//     }

//     // Apply skill filter (freelancers only)
//     if (activeView === "freelancers" && skillFilter) {
//       data = data.filter(
//         (item) => skillFilter === "" || item.skill === skillFilter
//       );
//     }

//     // Apply rating filter (freelancers only)
//     if (activeView === "freelancers" && ratingFilter) {
//       data = data.filter(
//         (item) => parseFloat(item.rating) >= parseFloat(ratingFilter)
//       );
//     }

//     setFilteredData(data);
//   }, [activeView, nameFilter, emailFilter, skillFilter, ratingFilter]);

//   // Function to view details
//   const handleViewDetails = (item) => {
//     setSelectedItem(item);
//     setDetailsModalVisible(true);
//   };

//   // Function to handle delete
//   const handleDelete = (item) => {
//     setSelectedItem(item);
//     setDeleteModalVisible(true);
//   };

//   // Function to confirm delete
//   const confirmDelete = () => {
//     // In production, this would be an API call
//     alert(`${activeView === "clients" ? "Client" : "Freelancer"} deleted!`);
//     setDeleteModalVisible(false);
//   };

//   // Toggle view tabs
//   const handleViewChange = (view) => {
//     if (view === "clients") {
//       setpageTitle("Clients");
//     } else {
//       setpageTitle("Freelancers");
//     }
//     setActiveView(view);
//   };

//   return (
//     <>
//       {/* Top Bar / Header */}
//       <h1 className="text-2xl font-bold">
//         {activeView.charAt(0).toUpperCase() + activeView.slice(1).toLowerCase()}
//       </h1>

//       {/* View Toggle Tabs */}
//       <div className="mb-4 border-b border-gray-200">
//         <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
//           <li className="mr-2">
//             <button
//               className={`inline-flex items-center p-4 border-b-2 ${
//                 activeView === "clients"
//                   ? "text-green-600 border-green-600"
//                   : "border-transparent hover:text-gray-600 hover:border-gray-300"
//               }`}
//               onClick={() => handleViewChange("clients")}
//             >
//               Clients
//             </button>
//           </li>
//           <li className="mr-2">
//             <button
//               className={`inline-flex items-center p-4 border-b-2 ${
//                 activeView === "freelancers"
//                   ? "text-green-600 border-green-600"
//                   : "border-transparent hover:text-gray-600 hover:border-gray-300"
//               }`}
//               onClick={() => handleViewChange("freelancers")}
//             >
//               Freelancers
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Filter Section */}
//       <div className="bg-white p-4 rounded shadow mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
//           {/* Common Filter: Search by name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Search by name
//             </label>
//             <input
//               type="text"
//               placeholder={`Enter ${
//                 activeView === "clients" ? "client" : "freelancer"
//               } name`}
//               className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
//               value={nameFilter}
//               onChange={(e) => setNameFilter(e.target.value)}
//             />
//           </div>

//           {/* Client-specific filter */}
//           {activeView === "clients" && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 placeholder="Enter client email"
//                 className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
//                 value={emailFilter}
//                 onChange={(e) => setEmailFilter(e.target.value)}
//               />
//             </div>
//           )}

//           {/* Freelancer-specific filters */}
//           {activeView === "freelancers" && (
//             <>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Skill
//                 </label>
//                 <select
//                   className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
//                   value={skillFilter}
//                   onChange={(e) => setSkillFilter(e.target.value)}
//                 >
//                   <option value="">All Skills</option>
//                   <option value="Web Developer">Web Developer</option>
//                   <option value="Graphic Designer">Graphic Designer</option>
//                   <option value="Content Writer">Content Writer</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Rating
//                 </label>
//                 <select
//                   className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
//                   value={ratingFilter}
//                   onChange={(e) => setRatingFilter(e.target.value)}
//                 >
//                   <option value="">All Ratings</option>
//                   <option value="4">4 & above</option>
//                   <option value="3">3 & above</option>
//                   <option value="2">2 & above</option>
//                   <option value="1">1 & above</option>
//                 </select>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Table Container */}
//       <div className="bg-white rounded shadow">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="border-b bg-gray-50">
//               <tr>
//                 {/* Common column: ID */}
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
//                   {activeView === "clients" ? "ID" : "Freelancer ID"}
//                 </th>

//                 {/* Common column: Name */}
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
//                   Name
//                 </th>

//                 {/* Conditional columns based on view */}
//                 {activeView === "clients" ? (
//                   <>
//                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
//                       Email
//                     </th>
//                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
//                       Address
//                     </th>
//                   </>
//                 ) : (
//                   <>
//                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
//                       Skill
//                     </th>
//                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
//                       Rating
//                     </th>
//                   </>
//                 )}

//                 {/* Common column: Actions */}
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 text-sm">
//               {filteredData.map((item) => (
//                 <tr key={item.id}>
//                   <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>

//                   {/* Conditional cells based on view */}
//                   {activeView === "clients" ? (
//                     <>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {item.email}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {item.address}
//                       </td>
//                     </>
//                   ) : (
//                     <>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {item.skill}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {item.rating}
//                       </td>
//                     </>
//                   )}

//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center space-x-3">
//                       {/* Eye icon to view details */}
//                       <button
//                         className="text-gray-600 hover:text-blue-500"
//                         onClick={() => handleViewDetails(item)}
//                       >
//                         <Eye size={18} />
//                       </button>
//                       {/* Trash icon to delete */}
//                       <button
//                         className="text-gray-600 hover:text-red-500"
//                         onClick={() => handleDelete(item)}
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Modal for Details */}
//       {detailsModalVisible && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
//             {/* Modal Header */}
//             <div className="border-b px-4 py-2 flex justify-between items-center">
//               <h5 className="font-semibold text-lg">
//                 {activeView === "clients" ? "Client" : "Freelancer"} Details
//               </h5>
//               <button
//                 onClick={() => setDetailsModalVisible(false)}
//                 className="text-gray-600 hover:text-gray-900"
//               >
//                 <span className="text-xl">×</span>
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="p-6">
//               {/* Top Section: Profile Pic & Basic Info */}
//               <div className="flex items-center space-x-4 mb-6">
//                 {/* Profile Picture */}
//                 <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
//                   <img
//                     src="/api/placeholder/80/80"
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-800">
//                     {selectedItem?.name}
//                   </h2>
//                   <p className="text-gray-500">
//                     {activeView === "clients"
//                       ? selectedItem?.address
//                       : selectedItem?.skill}
//                   </p>
//                 </div>
//               </div>

//               {/* Conditional content based on view */}
//               {activeView === "clients" ? (
//                 <>
//                   {/* Client Details */}
//                   <div className="mb-6">
//                     <h3 className="font-semibold text-gray-800">
//                       Contact Information
//                     </h3>
//                     <p className="text-gray-600">
//                       <strong>Phone:</strong> {selectedItem?.phone}
//                     </p>
//                     <p className="text-gray-600">
//                       <strong>Email:</strong> {selectedItem?.email}
//                     </p>
//                   </div>

//                   <div className="mb-6">
//                     <h3 className="font-semibold text-gray-800">
//                       Account Activity
//                     </h3>
//                     <p className="text-gray-600">
//                       <strong>Sign Up Date:</strong> {selectedItem?.signUpDate}
//                     </p>
//                     <p className="text-gray-600">
//                       <strong>Last Login:</strong> {selectedItem?.lastLogin}
//                     </p>
//                     <p className="text-gray-600">
//                       <strong>Account Status:</strong>{" "}
//                       {selectedItem?.accountStatus}
//                     </p>
//                   </div>

//                   <div className="mb-6">
//                     <h3 className="font-semibold text-gray-800">
//                       Total Spending
//                     </h3>
//                     <p className="text-gray-600">
//                       {selectedItem?.totalSpending}
//                     </p>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   {/* Freelancer Details */}
//                   <div className="flex items-center space-x-2 mb-6">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 text-yellow-400"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                     <span className="text-gray-700 font-medium">
//                       {selectedItem?.rating}
//                     </span>
//                     <span className="text-gray-500 text-sm">
//                       (Overall Rating)
//                     </span>
//                   </div>

//                   <div className="mb-6">
//                     <h3 className="font-semibold text-gray-800">Skills</h3>
//                     <p className="text-gray-600">{selectedItem?.skills}</p>
//                   </div>

//                   <div className="mb-6">
//                     <h3 className="font-semibold text-gray-800">
//                       Projects Done
//                     </h3>
//                     <ul className="list-disc list-inside text-gray-600">
//                       {selectedItem?.projects?.map((project, index) => (
//                         <li key={index}>
//                           {project.name} - {project.rating}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <h4 className="font-semibold text-gray-800">
//                         Total Completed Projects
//                       </h4>
//                       <p className="text-gray-600">
//                         {selectedItem?.completedProjects}
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-800">
//                         Total Earning
//                       </h4>
//                       <p className="text-gray-600">
//                         {selectedItem?.totalEarning}
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-800">
//                         Availability
//                       </h4>
//                       <p className="text-gray-600">
//                         {selectedItem?.availability}
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-800">
//                         Hourly Rate
//                       </h4>
//                       <p className="text-gray-600">
//                         {selectedItem?.hourlyRate}
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-800">
//                         Experience Years
//                       </h4>
//                       <p className="text-gray-600">
//                         {selectedItem?.experienceYears}
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-800">Portfolio</h4>
//                       <a href="#" className="text-blue-500 hover:underline">
//                         View Portfolio
//                       </a>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Modal Footer */}
//             <div className="border-t px-4 py-2 flex justify-end">
//               <button
//                 onClick={() => setDetailsModalVisible(false)}
//                 className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal for Delete Confirmation */}
//       {deleteModalVisible && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
//             {/* Modal Header */}
//             <div className="px-4 py-2 flex justify-between items-center">
//               <h5 className="font-semibold text-lg">Are you sure?</h5>
//               <button
//                 onClick={() => setDeleteModalVisible(false)}
//                 className="text-gray-600 hover:text-gray-900"
//               >
//                 <span className="text-xl">×</span>
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="p-6">
//               <p className="text-gray-800 mb-4">
//                 This action cannot be undone. This will permanently delete
//                 {selectedItem && ` ${selectedItem.name}`}.
//               </p>
//             </div>

//             {/* Modal Footer */}
//             <div className="px-4 py-2 flex justify-end space-x-2">
//               <button
//                 onClick={() => setDeleteModalVisible(false)}
//                 className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Users;
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Eye, Trash2, Star } from "lucide-react";
import axios from "axios"; // Assuming axios is installed for API calls

const Users = () => {
  // Get activeView from the outlet context
  const { activeView: contextActiveView } = useOutletContext();

  // State for active view (sync with context)
  const [activeView, setActiveView] = useState(contextActiveView || "clients");

  // Update local state when context changes
  useEffect(() => {
    if (contextActiveView) {
      setActiveView(contextActiveView);
    }
  }, [contextActiveView]);

  // State for modal visibility
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  // State for selected item
  const [selectedItem, setSelectedItem] = useState(null);

  // State for API data
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users data from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://liverbackend.vercel.app/api/auth/getUsers"
        );
        setUsersData(response.data.users || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Calculate average rating from orders
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return "0.0";

    const ratingsSum = reviews.reduce((sum, review) => {
      const rating = parseFloat(review.rating || 0);
      return sum + rating;
    }, 0);

    return (ratingsSum / reviews.length).toFixed(1);
  };
  const countCompletedProjects = (orders) => {
    if (!orders || orders.length === 0) return "0";

    const completedCount = orders.filter(
      (order) => order.status === "Completed"
    ).length;

    return completedCount.toString();
  };
  // Sample freelancers data with corrected rating calculation
  const freelancersData = usersData
    .filter(
      (user) =>
        user.role === "freelancer" ||
        (user.portfolio &&
          user.portfolio.skills &&
          user.portfolio.skills.length > 0)
    )
    .map((user) => {
      // Calculate average rating from reviews if available
      const calculatedRating =
        user.reviews && user.reviews.length > 0
          ? calculateAverageRating(user.reviews)
          : "0.0";
      const completedProjects = countCompletedProjects(user.orders);
      return {
        id: user._id,
        name:
          (user.full_verification && user.full_verification[0]?.full_name) ||
          user.username,
        email: user.email,
        profilePic: user.full_verification && user.full_verification[0]?.profile_pic || null,
        skill: user.portfolio?.skills[0]?.name || "Not specified",
        skills:
          user.portfolio?.skills
            .map((s) => `${s.name} (${s.level})`)
            .join(", ") || "Not specified",
        rating: calculatedRating,
        completedProjects: completedProjects || "0",
        totalEarning: "$" + Math.floor(Math.random() * 10000), // Hardcoded as not available in API
        availability: Math.random() > 0.5 ? "Available" : "Busy", // Hardcoded as not available in API
        hourlyRate: "$" + (Math.floor(Math.random() * 50) + 20) + "/hr", // Hardcoded as not available in API
        experienceYears: Math.floor(Math.random() * 10) + 1 + "+ Years", // Hardcoded as not available in API
        projects: user.orders?.slice(0, 3).map((order) => ({
          name: order.requirements || "Project",
          rating: (Math.random() * 2 + 3).toFixed(1),
        })) || [
          { name: "Sample Project 1", rating: "4.5" },
          { name: "Sample Project 2", rating: "4.0" },
        ],
      };
    });

  // Client data from API
  const clientsData = usersData
    .filter((user) => user.role === "client" || !user.portfolio)
    .map((user) => ({
      id: user._id,
      name:
        (user.full_verification && user.full_verification[0]?.full_name) ||
        user.username,
      email: user.email,
      profilePic: user.full_verification && user.full_verification[0]?.profile_pic || null,
      address:
        (user.full_verification && user.full_verification[0]?.country) ||
        "Not specified",
      phone: "Not provided", // Not available in API
      signUpDate: new Date(user.created_at).toLocaleDateString(),
      lastLogin: "Not available", // Not available in API
      accountStatus: user.verified ? "Verified" : "Unverified",
      totalSpending: user.orders
        ? "$" +
          user.orders.reduce(
            (total, order) => total + (order.total_amount || 0),
            0
          )
        : "$0",
    }));

  const [pageTitle, setpageTitle] = useState("");
  // Filtered data based on active view
  const [filteredData, setFilteredData] = useState([]);
  // Search filters
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  useEffect(() => {
    // Default to empty arrays while loading
    if (loading) {
      setFilteredData([]);
      return;
    }

    let data = activeView === "clients" ? clientsData : freelancersData;

    // Apply name filter
    if (nameFilter) {
      data = data.filter((item) =>
        item.name?.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    // Apply email filter (clients only)
    if (activeView === "clients" && emailFilter) {
      data = data.filter((item) =>
        item.email?.toLowerCase().includes(emailFilter.toLowerCase())
      );
    }

    // Apply skill filter (freelancers only)
    if (activeView === "freelancers" && skillFilter) {
      data = data.filter(
        (item) => skillFilter === "" || item.skill === skillFilter
      );
    }

    // Apply rating filter (freelancers only)
    if (activeView === "freelancers" && ratingFilter) {
      data = data.filter(
        (item) => parseFloat(item.rating) >= parseFloat(ratingFilter)
      );
    }

    setFilteredData(data);
  }, [
    activeView,
    nameFilter,
    emailFilter,
    skillFilter,
    ratingFilter,
    loading,
    usersData,
  ]);

  // Function to view details
  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setDetailsModalVisible(true);
  };

  // Function to handle delete
  const handleDelete = (item) => {
    setSelectedItem(item);
    setDeleteModalVisible(true);
  };

  // Function to confirm delete
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `https://liverbackend.vercel.app/api/auth/deleteUser/${selectedItem.id}`
      );
      // Remove the deleted user from state
      setUsersData(usersData.filter((user) => user._id !== selectedItem.id));
      alert(
        `${
          activeView === "clients" ? "Client" : "Freelancer"
        } deleted successfully!`
      );
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(
        `Failed to delete ${
          activeView === "clients" ? "client" : "freelancer"
        }. Please try again.`
      );
    } finally {
      setDeleteModalVisible(false);
    }
  };

  // Toggle view tabs
  const handleViewChange = (view) => {
    if (view === "clients") {
      setpageTitle("Clients");
    } else {
      setpageTitle("Freelancers");
    }
    setActiveView(view);
  };

  // Get all unique skills for the filter dropdown
  const uniqueSkills = Array.from(
    new Set(freelancersData.map((f) => f.skill).filter(Boolean))
  );

  // Helper for rendering rating stars
  const RatingStars = ({ rating }) => {
    const ratingNum = parseFloat(rating);
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= ratingNum
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating}</span>
      </div>
    );
  };

  return (
    <>
      {/* Top Bar / Header */}
      <h1 className="text-2xl font-bold">
        {activeView.charAt(0).toUpperCase() + activeView.slice(1).toLowerCase()}
      </h1>

      {/* View Toggle Tabs */}
      <div className="mb-4 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
          <li className="mr-2">
            <button
              className={`inline-flex items-center p-4 border-b-2 ${
                activeView === "clients"
                  ? "text-green-600 border-green-600"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => handleViewChange("clients")}
            >
              Clients
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-flex items-center p-4 border-b-2 ${
                activeView === "freelancers"
                  ? "text-green-600 border-green-600"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => handleViewChange("freelancers")}
            >
              Freelancers
            </button>
          </li>
        </ul>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded shadow mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
          {/* Common Filter: Search by name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search by name
            </label>
            <input
              type="text"
              placeholder={`Enter ${
                activeView === "clients" ? "client" : "freelancer"
              } name`}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>

          {/* Client-specific filter */}
          {activeView === "clients" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter client email"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
                value={emailFilter}
                onChange={(e) => setEmailFilter(e.target.value)}
              />
            </div>
          )}

          {/* Freelancer-specific filters */}
          {activeView === "freelancers" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skill
                </label>
                <select
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                >
                  <option value="">All Skills</option>
                  {uniqueSkills.map((skill, index) => (
                    <option key={index} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <select
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                >
                  <option value="">All Ratings</option>
                  <option value="4">4 & above</option>
                  <option value="3">3 & above</option>
                  <option value="2">2 & above</option>
                  <option value="1">1 & above</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Table Container */}
      {!loading && !error && (
        <div className="bg-white rounded shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  {/* Common column: ID */}
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    {activeView === "clients" ? "Client ID" : "Freelancer ID"}
                  </th>

                  {/* Common column: Name */}
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Name
                  </th>

                  {/* Conditional columns based on view */}
                  {activeView === "clients" ? (
                    <>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Address
                      </th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Skill
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Rating
                      </th>
                    </>
                  )}

                  {/* Common column: Actions */}
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.name}
                      </td>

                      {/* Conditional cells based on view */}
                      {activeView === "clients" ? (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.address}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.skill}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <RatingStars rating={item.rating} />
                          </td>
                        </>
                      )}

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          {/* Eye icon to view details */}
                          <button
                            className="text-gray-600 hover:text-blue-500"
                            onClick={() => handleViewDetails(item)}
                          >
                            <Eye size={18} />
                          </button>
                          {/* Trash icon to delete */}
                          <button
                            className="text-gray-600 hover:text-red-500"
                            onClick={() => handleDelete(item)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No {activeView} found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for Details - Improved design for freelancer modal */}
      {detailsModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-4 py-3 flex justify-between items-center">
              <h5 className="font-semibold text-lg">
                {activeView === "clients" ? "Client" : "Freelancer"} Details
              </h5>
              <button
                onClick={() => setDetailsModalVisible(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <span className="text-xl">×</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              {/* Common: Profile Header */}
              <div className="flex items-center space-x-4 mb-4 p-2 rounded-lg bg-gray-50">
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  {selectedItem && selectedItem.profilePic ? (
                    <img
                      src={selectedItem.profilePic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src="/api/placeholder/64/64"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {selectedItem?.name}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {activeView === "clients"
                      ? selectedItem?.address
                      : selectedItem?.skill}
                  </p>
                  {activeView === "freelancers" && (
                    <div className="mt-1">
                      <RatingStars rating={selectedItem?.rating} />
                    </div>
                  )}
                </div>
              </div>

              {/* Conditional content based on view */}
              {activeView === "clients" ? (
                <>
                  {/* Client Details */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800">
                      Contact Information
                    </h3>
                    <p className="text-gray-600">
                      <strong>Email:</strong> {selectedItem?.email}
                    </p>
                    {selectedItem?.phone && (
                      <p className="text-gray-600">
                        <strong>Phone:</strong> {selectedItem?.phone}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800">
                      Account Activity
                    </h3>
                    <p className="text-gray-600">
                      <strong>Sign Up Date:</strong> {selectedItem?.signUpDate}
                    </p>
                    {selectedItem?.lastLogin && (
                      <p className="text-gray-600">
                        <strong>Last Login:</strong> {selectedItem?.lastLogin}
                      </p>
                    )}
                    <p className="text-gray-600">
                      <strong>Account Status:</strong>{" "}
                      {selectedItem?.accountStatus}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800">
                      Total Spending
                    </h3>
                    <p className="text-gray-600">
                      {selectedItem?.totalSpending}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Freelancer Details - Improved compact layout */}
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem?.skills.split(", ").map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="text-xs text-gray-500 uppercase">
                        Projects
                      </h4>
                      <p className="font-semibold text-green-600">
                        {selectedItem?.completedProjects}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="text-xs text-gray-500 uppercase">
                        Earnings
                      </h4>
                      <p className="font-semibold">
                        {selectedItem?.totalEarning}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="text-xs text-gray-500 uppercase">
                        Status
                      </h4>
                      <p
                        className={`font-semibold ${
                          selectedItem?.availability === "Available"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {selectedItem?.availability}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="text-xs text-gray-500 uppercase">Rate</h4>
                      <p className="font-semibold">
                        {selectedItem?.hourlyRate}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="text-xs text-gray-500 uppercase">
                        Experience
                      </h4>
                      <p className="font-semibold">
                        {selectedItem?.experienceYears}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="text-xs text-gray-500 uppercase">Email</h4>
                      <p className="font-semibold text-sm truncate">
                        {selectedItem?.email}
                      </p>
                    </div>
                  </div>

                  {selectedItem?.projects && selectedItem.projects.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        Recent Projects
                      </h3>
                      <div className="space-y-2">
                        {selectedItem.projects.map((project, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center border-b border-gray-100 py-2"
                          >
                            <span className="text-sm font-medium truncate max-w-xs">
                              {project.name}
                            </span>
                            <div className="flex items-center text-sm">
                              <Star
                                size={14}
                                className="text-yellow-400 fill-yellow-400 mr-1"
                              />
                              <span>{project.rating}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t px-4 py-3 flex justify-end">
              <button
                onClick={() => setDetailsModalVisible(false)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Delete Confirmation */}
      {deleteModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            {/* Modal Header */}
            <div className="px-4 py-2 flex justify-between items-center">
              <h5 className="font-semibold text-lg">Are you sure?</h5>
              <button
                onClick={() => setDeleteModalVisible(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <span className="text-xl">×</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-800 mb-4">
                This action cannot be undone. This will permanently delete
                {selectedItem &&
                  ` ${selectedItem.name} (ID: ${selectedItem.id})`}
                .
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-2 flex justify-end space-x-2">
              <button
                onClick={() => setDeleteModalVisible(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;

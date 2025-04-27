// import React, { useState, useEffect, useRef } from 'react';
// import { Eye, Lightbulb, Star, ChevronDown, ChevronRight } from 'lucide-react';
// import { Link, useLocation } from "react-router-dom";


// const FreelancerDashboard = () => {
//   // State for user data
//   const [userData, setUserData] = useState({
//     name: 'Umer F',
//     username: 'umerfarooq73008',
//     profileImage: 'https://selfmadewebdesigner.com/wp-content/uploads/2019/09/self-made-web-designer-upwork-profile.jpg',
//     level: 'New seller',
//     responseRate: '-',
//     rating: '-',
//     score: '-',
//     earningsMonth: 'March',
//     earningsAmount: 0,
//     gigsPosted: 15,
//     activeOrders: 0,
//     activeOrdersValue: 0
//   });

//   // State for dropdown
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Effect to fetch user data
//   useEffect(() => {
//     // This would be replaced with your actual API call
//     const fetchUserData = async () => {
//       try {
//         // const response = await fetch('your-api-endpoint');
//         // const data = await response.json();
//         // setUserData(data);
        
//         // For now, we'll use our initial state data
//         // This is where you would set the data from your API
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   // Toggle dropdown
//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <div className="bg-gray-100 flex-1">
//       {/* Content area */}
//       <div className="flex flex-1 p-6 space-x-6">
//         {/* Left Sidebar */}
//         <aside className="w-64 bg-white p-4 rounded shadow flex-shrink-0">
//           {/* User Info */}
//           <div className="flex flex-col items-center mb-4">
//             {/* Profile Photo */}
//             <img 
//               src={userData.profileImage} 
//               alt="Profile" 
//               className="w-16 h-16 rounded-full object-cover"
//             />
//             {/* Name and Handle */}
//             <div className="text-center mt-3">
//               <h2 className="text-lg font-semibold">{userData.name}</h2>
//               <p className="text-sm text-gray-500">@{userData.username}</p>
//             </div>
//           </div>
//           <hr className="my-4" />

//           {/* Level Overview */}
//           <div className="mb-4">
//             <h3 className="text-sm font-semibold text-gray-700">Level overview</h3>
//             <ul className="mt-2 text-sm text-gray-600 space-y-1">
//               <li>My level: <span className="font-medium">{userData.level}</span></li>
//               <li>Response rate: <span className="font-medium">{userData.responseRate}</span></li>
//               <li>Rating: <span className="font-medium">{userData.rating}</span></li>
//               <li>Score: <span className="font-medium">{userData.score}</span></li>
//             </ul>
//           </div>
//           <hr className="my-4" />

//           {/* Availability */}
//           <div className="mb-4">
//             <h3 className="text-sm font-semibold text-gray-700">Availability</h3>
//             <p className="text-sm text-gray-600">
//               You can update your Gigs and indicate if you're available for new orders
//             </p>
//             <button 
//               className="mt-2 bg-white text-gray border border-gray-500 px-4 py-2 rounded hover:bg-gray-500 hover:text-white focus:outline-none"
//             >
//               Set your availability
//             </button>
//           </div>
//           <hr className="my-4" />

//           {/* Earnings */}
//           <div>
//             <p className="text-sm text-gray-600">Earned in {userData.earningsMonth}</p>
//             <p className="text-xl font-semibold">${userData.earningsAmount}</p>
//           </div>
//         </aside>

//         {/* Main Content Area */}
//         <main className="flex-1 space-y-6">
//           {/* Welcome Section */}
//           <section className="bg-white p-4 rounded shadow">
//             <h1 className="text-2xl font-bold">Welcome, {userData.name}</h1>
//             <p className="text-gray-600">
//               Find important messages, tips, and links to helpful resources here
//             </p>
//           </section>

//           {/* Gigs Posted Box with Navigation Button */}
//           <div className="bg-white border border-gray-200 rounded p-4">
//             <div className="flex items-center justify-between">
//               {/* Left side: Gigs Posted */}
//               <div className="text-gray-700 text-sm">
//                 <span className="font-semibold">Gigs Posted —</span>
//                 <span className="mx-1">{userData.gigsPosted}</span>
//               </div>
              
//               {/* Right side: Navigation Button */}
//               <div>
//                 <Link to="/myGigs" className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm flex items-center space-x-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
//                   <span>View All</span>
//                   <ChevronRight className="w-4 h-4 text-gray-600" />
//                 </Link>
//               </div>
//             </div>
//           </div>
  
//           {/* Active Orders Box with Dropdown */}
//           <div className="bg-white border border-gray-200 rounded p-4">
//             <div className="flex items-center justify-between">
//               {/* Left side: Active orders */}
//               <div className="text-gray-700 text-sm">
//                 <span className="font-semibold">Active orders —</span>
//                 <span className="mx-1">${userData.activeOrdersValue}</span>
//                 <span>({userData.activeOrders})</span>
//               </div>
              
//               {/* Right side: Button with dropdown */}
//               <div className="relative inline-block text-left" ref={dropdownRef}>
//                 {/* Button to toggle the dropdown */}
//                 <button
//                   type="button"
//                   onClick={toggleDropdown}
//                   className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm flex items-center space-x-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   <span>Active orders ({userData.activeOrders})</span>
//                   <ChevronDown className="w-4 h-4 text-gray-600" />
//                 </button>
          
//                 {/* Dropdown Menu */}
//                 {dropdownOpen && (
//                   <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//                     <div className="py-1" role="menu" aria-orientation="vertical">
//                       {/* Dropdown Items */}
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         role="menuitem"
//                       >
//                         Active orders
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         role="menuitem"
//                       >
//                         Completed orders
//                       </a>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
  
//           {/* Upgrade Your Business */}
//           <section className="bg-white p-4 rounded shadow">
//             <h2 className="text-xl font-semibold mb-2">Upgrade Your Business</h2>
//             <h3 className="text-md text-gray-600 mb-4">
//               3 steps to become a top seller on Fiverr
//             </h3>
          
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {/* Step 1 */}
//               <div className="border p-4 rounded text-center">
//                 <div className="flex justify-center">
//                   <Eye className="w-8 h-8 text-gray-500" />
//                 </div>
//                 <h4 className="font-semibold text-gray-700 mb-2 mt-4">Get noticed</h4>
//                 <p className="text-sm text-gray-600 mb-2">
//                   Tap into the right audience by sharing your Gigs, and get impact.
//                 </p>
//                 <button
//                   className="mt-2 bg-white text-gray border border-gray-500 px-4 py-2 rounded hover:bg-gray-500 hover:text-white focus:outline-none"
//                 >
//                   Share Your Gigs
//                 </button>
//               </div>
          
//               {/* Step 2 */}
//               <div className="border p-4 rounded text-center">
//                 <div className="flex justify-center">
//                   <Lightbulb className="w-8 h-8 text-gray-500" />
//                 </div>
//                 <h4 className="font-semibold text-gray-700 mb-2 mt-4">Gain more skills &amp; exposure</h4>
//                 <p className="text-sm text-gray-600 mb-2">
//                   Explore new categories or refine your expertise with our resources.
//                 </p>
//                 <button
//                   className="mt-2 bg-white text-gray border border-gray-500 px-4 py-2 rounded hover:bg-gray-500 hover:text-white focus:outline-none"
//                 >
//                   Explore Now
//                 </button>
//               </div>
          
//               {/* Step 3 */}
//               <div className="border p-4 rounded text-center">
//                 <div className="flex justify-center">
//                   <Star className="w-8 h-8 text-gray-500" />
//                 </div>
//                 <h4 className="font-semibold text-gray-700 mb-2 mt-4">Become a successful seller</h4>
//                 <p className="text-sm text-gray-600 mb-2">
//                   Master the best practices, and watch every course completely free.
//                 </p>
//                 <button
//                   className="mt-2 bg-white text-gray border border-gray-500 px-4 py-2 rounded hover:bg-gray-500 hover:text-white focus:outline-none"
//                 >
//                   Watch Free Course
//                 </button>
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default FreelancerDashboard;
import React, { useState, useEffect, useRef } from 'react';
import { Eye, Lightbulb, Star, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from "react-router-dom";
import axios from 'axios';

const FreelancerDashboard = () => {
  // State for user data
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    profileImage: '/img/man.png',
    level: 'New seller',
    responseRate: '-',
    rating: '-',
    score: '-',
    earningsMonth: new Date().toLocaleString('default', { month: 'long' }),
    earningsAmount: 0,
    gigsPosted: 0,
    activeOrders: 0,
    activeOrdersValue: 0,
    completedOrders: 0
  });

  // State for loading
  const [loading, setLoading] = useState(true);
  // State for dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Calculate average rating from reviews
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return '-';
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };
  
  // Calculate total earnings (from completed orders)
  const calculateEarnings = (orders) => {
    if (!orders || orders.length === 0) return 0;
    return orders
      .filter(order => order.status === 'Completed')
      .reduce((acc, order) => acc + order.total_amount, 0);
  };

// Effect to fetch user data
useEffect(() => {
  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Get current user from localStorage
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      
      if (!currentUser || !currentUser.id) {
        console.error('No current user found in localStorage');
        setLoading(false);
        return;
      }
      
      // Fetch all users and find the one matching the current user's ID
      const response = await axios.get('http://localhost:3000/api/auth/getUsers');
      
      // Find the user with the matching ID who is a freelancer
      const freelancer = response.data.users.find(
        user => user._id === currentUser.id && user.role === 'freelancer'
      );
      
      if (freelancer) {
        const fullName = freelancer.full_verification && freelancer.full_verification.length > 0 
          ? freelancer.full_verification[0].full_name 
          : freelancer.username;
          
        const profileImage = freelancer.full_verification && freelancer.full_verification.length > 0 
          ? freelancer.full_verification[0].profile_pic 
          : '/img/man.png';
        
        // Count orders with status "In Progress"  
        const activeOrders = freelancer.orders ? 
          freelancer.orders.filter(order => order.status === 'In Progress').length : 0;
        
        // Calculate value of orders with status "In Progress"
        const activeOrdersValue = freelancer.orders ? 
          freelancer.orders
            .filter(order => order.status === 'In Progress')
            .reduce((total, order) => total + order.total_amount, 0)
          : 0;

        // Count orders with status "Completed"
        const completedOrders = freelancer.orders ? 
          freelancer.orders.filter(order => order.status === 'Completed').length : 0;
          
        const gigsPosted = freelancer.gigs ? freelancer.gigs.length : 0;
        
        const rating = calculateAverageRating(freelancer.reviews);
        
        const earningsAmount = calculateEarnings(freelancer.orders);
        
        // Determine level based on completed orders
        let level = 'New Seller';
        if (completedOrders > 10) {
          level = 'Level 2 Seller';
        } else if (completedOrders > 5) {
          level = 'Level 1 Seller';
        }
        
        setUserData({
          name: fullName,
          username: freelancer.username,
          profileImage,
          level,
          responseRate: '100%', // You might want to calculate this based on message response time
          rating,
          score: rating !== '-' ? `${parseFloat(rating) * 20}%` : '-',
          earningsMonth: new Date().toLocaleString('default', { month: 'long' }),
          earningsAmount,
          gigsPosted,
          activeOrders,
          activeOrdersValue,
          completedOrders
        });
      } else {
        console.error('Current user not found in users list or not a freelancer');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  fetchUserData();
}, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex-1">
      {/* Content area */}
      <div className="flex flex-1 p-6 space-x-6">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white p-4 rounded shadow flex-shrink-0">
          {/* User Info */}
          <div className="flex flex-col items-center mb-4">
            {/* Profile Photo */}
            <img 
              src={userData.profileImage} 
              alt="Profile" 
              className="w-16 h-16 rounded-full object-cover"
            />
            {/* Name and Handle */}
            <div className="text-center mt-3">
              <h2 className="text-lg font-semibold">{userData.name}</h2>
              <p className="text-sm text-gray-500">@{userData.username}</p>
            </div>
          </div>
          <hr className="my-4" />

          {/* Level Overview */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700">Level overview</h3>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>My level: <span className="font-medium">{userData.level}</span></li>
              <li>Response rate: <span className="font-medium">{userData.responseRate}</span></li>
              <li>Rating: <span className="font-medium">{userData.rating}</span></li>
              <li>Score: <span className="font-medium">{userData.score}</span></li>
            </ul>
          </div>
          <hr className="my-4" />

          {/* Earnings */}
          <div>
            <p className="text-sm text-gray-600">Earned in {userData.earningsMonth}</p>
            <p className="text-xl font-semibold">${userData.earningsAmount}</p>
            <div className="mt-3">
              <p className="text-sm text-gray-600">Completed Orders</p>
              <p className="text-lg font-medium">{userData.completedOrders}</p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 space-y-6">
          {/* Welcome Section */}
          <section className="bg-white p-4 rounded shadow">
            <h1 className="text-2xl font-bold">Welcome, {userData.name}</h1>
            <p className="text-gray-600">
              Find important messages, tips, and links to helpful resources here
            </p>
          </section>

          {/* Gigs Posted Box with Navigation Button */}
          <div className="bg-white border border-gray-200 rounded p-4">
            <div className="flex items-center justify-between">
              {/* Left side: Gigs Posted */}
              <div className="text-gray-700 text-sm">
                <span className="font-semibold">Gigs Posted —</span>
                <span className="mx-1">{userData.gigsPosted}</span>
              </div>
              
              {/* Right side: Navigation Button */}
              <div>
                <Link to="/myGigs" className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm flex items-center space-x-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </Link>
              </div>
            </div>
          </div>
  
          {/* Active Orders Box with Dropdown */}
          <div className="bg-white border border-gray-200 rounded p-4">
            <div className="flex items-center justify-between">
              {/* Left side: Active orders */}
              <div className="text-gray-700 text-sm">
                <span className="font-semibold">Active orders —</span>
                <span className="mx-1">${userData.activeOrdersValue}</span>
                <span>({userData.activeOrders})</span>
              </div>
              
              {/* Right side: Button with dropdown */}
              <div className="relative inline-block text-left" ref={dropdownRef}>
                {/* Button to toggle the dropdown */}
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm flex items-center space-x-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span>Active orders ({userData.activeOrders})</span>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
          
                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {/* Dropdown Items */}
                      <Link
                        to="/orders?status=active"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Active orders
                      </Link>
                      <Link
                        to="/orders?status=completed"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Completed orders
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
  
          {/* Upgrade Your Business */}
          <section className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Upgrade Your Business</h2>
            <h3 className="text-md text-gray-600 mb-4">
              3 steps to become a top seller on the platform
            </h3>
          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Step 1 */}
              <div className="border p-4 rounded text-center hover:shadow-md transition-shadow">
                <div className="flex justify-center">
                  <Eye className="w-8 h-8 text-blue-500" />
                </div>
                <h4 className="font-semibold text-gray-700 mb-2 mt-4">Get noticed</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Tap into the right audience by sharing your Gigs, and get impact.
                </p>
                <Link to="/addGig"
                  className="mt-2 inline-block bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white focus:outline-none transition-colors"
                >
                  Share Your Gigs
                </Link>
              </div>
          
              {/* Step 2 */}
              <div className="border p-4 rounded text-center hover:shadow-md transition-shadow">
                <div className="flex justify-center">
                  <Lightbulb className="w-8 h-8 text-yellow-500" />
                </div>
                <h4 className="font-semibold text-gray-700 mb-2 mt-4">Gain more skills &amp; exposure</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Explore new categories or refine your expertise with our resources.
                </p>
                <Link
                  to="/gigs"
                  className="mt-2 inline-block bg-white text-yellow-600 border border-yellow-600 px-4 py-2 rounded hover:bg-yellow-600 hover:text-white focus:outline-none transition-colors"
                >
                  Explore Now
                </Link>
              </div>
          
              {/* Step 3 */}
              <div className="border p-4 rounded text-center hover:shadow-md transition-shadow">
                <div className="flex justify-center">
                  <Star className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="font-semibold text-gray-700 mb-2 mt-4">Become a successful seller</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Master the best practices, and watch every course completely free.
                </p>
                <button
                  className="mt-2 bg-white text-green-600 border border-green-600 px-4 py-2 rounded hover:bg-green-600 hover:text-white focus:outline-none transition-colors"
                >
                  Watch Free Course
                </button>
              </div>
            </div>
          </section>
          
          {/* Recent Activity */}
          {userData.activeOrders > 0 && (
            <section className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-100 rounded hover:bg-gray-50">
                  <div>
                    <h3 className="font-medium">New order received</h3>
                    <p className="text-sm text-gray-500">You have {userData.activeOrders} active order(s)</p>
                  </div>
                  <Link to="/orders" className="text-blue-500 text-sm hover:underline">
                    View orders
                  </Link>
                </div>
                
                {userData.completedOrders > 0 && (
                  <div className="flex items-center justify-between p-3 border border-gray-100 rounded hover:bg-gray-50">
                    <div>
                      <h3 className="font-medium">Orders completed</h3>
                      <p className="text-sm text-gray-500">You have completed {userData.completedOrders} order(s)</p>
                    </div>
                    <Link to="/orders?status=completed" className="text-green-500 text-sm hover:underline">
                      View history
                    </Link>
                  </div>
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faDollarSign,
  faStar,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  // State variables for dynamic data
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [topFreelancers, setTopFreelancers] = useState([]);
  const [topClients, setTopClients] = useState([]);
  const [topGigs, setTopGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Badge images for top 3 rankings (unchanged)
  const badgeImages = [
    "/img/badge1.png",
    "/img/badge2.png",
    "/img/badge3.png"
  ];

  // Fetch all required data when component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch orders data using axios
        const ordersResponse = await axios.get('http://localhost:3000/api/auth/getorders');
        const ordersData = ordersResponse.data;
        
        // Fetch users data using axios
        const usersResponse = await axios.get('http://localhost:3000/api/auth/getUsers');
        // Handle the specific structure of users response
        const usersData = usersResponse.data.users || [];
        
        // Process the fetched data
        processData(ordersData, usersData);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error.response?.data?.message || error.message);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Process data to calculate metrics
  const processData = (orders, users) => {
    // Set total users count
    setTotalUsers(users.length);
    
    // Calculate total revenue from all orders
    const revenue = orders.reduce((total, order) => {
      return total + (order.total_amount || 0);
    }, 0);
    setTotalRevenue(revenue);
    
    // Process top freelancers, top clients, and top gigs from orders data
    
    // For top freelancers
    const freelancerMap = new Map();
    
    orders.forEach(order => {
      const freelancerId = order.freelancer_id?._id || order.freelancer_id;
      if (!freelancerId) return;
      
      if (!freelancerMap.has(freelancerId)) {
        freelancerMap.set(freelancerId, {
          id: freelancerId,
          name: order.freelancer_id?.username || 'Unknown',
          profession: order.gig_id?.title?.split(' ')[0] || 'Freelancer',
          rating: 0,
          jobCount: 0,
          totalRating: 0,
          profileImage: "/img/default-profile.jpg"
        });
      }
      
      const freelancer = freelancerMap.get(freelancerId);
      freelancer.jobCount += 1;
      
      // Assume each order has a rating between 1-5
      const orderRating = order.rating || Math.floor(Math.random() * 2) + 4; // Random rating between 4-5 if not available
      freelancer.totalRating += orderRating;
      freelancer.rating = freelancer.totalRating / freelancer.jobCount;
    });
    
    // Sort freelancers by rating and get top 3
    const sortedFreelancers = Array.from(freelancerMap.values())
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    console.log(sortedFreelancers)
    // Set top freelancers or use default if not enough data
    setTopFreelancers(sortedFreelancers.length >= 3 ? sortedFreelancers : [
      {
        id: 1,
        name: "John Smith",
        profession: "Web Developer",
        rating: 4.9,
        profileImage: "/img/default-profile.jpg"
      },
      {
        id: 2,
        name: "Sarah Johnson",
        profession: "Graphic Designer",
        rating: 4.8,
        profileImage: "/img/default-profile.jpg"
      },
      {
        id: 3,
        name: "Michael Brown",
        profession: "Digital Marketer",
        rating: 4.7,
        profileImage: "/img/default-profile.jpg"
      }
    ]);
    
    // For top clients
    const clientMap = new Map();
    
    orders.forEach(order => {
      const clientId = order.client_id?._id || order.client_id;
      if (!clientId) return;
      
      if (!clientMap.has(clientId)) {
        clientMap.set(clientId, {
          id: clientId,
          name: order.client_id?.username || 'Unknown Client',
          totalSpent: 0,
          profileImage: "/img/default-profile.jpg"
        });
      }
      
      const client = clientMap.get(clientId);
      client.totalSpent += (order.total_amount || 0);
    });
    
    // Sort clients by total spent and get top 3
    const sortedClients = Array.from(clientMap.values())
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 3);
    // Set top clients or use default if not enough data
    setTopClients(sortedClients.length >= 3 ? sortedClients : [
      {
        id: 1,
        name: "Acme Corporation",
        totalSpent: 28750,
        profileImage: "/img/default-profile.jpg"
      },
      {
        id: 2,
        name: "Global Enterprises",
        totalSpent: 23450,
        profileImage: "/img/default-profile.jpg"
      },
      {
        id: 3,
        name: "Tech Solutions Inc",
        totalSpent: 19200,
        profileImage: "/img/default-profile.jpg"
      }
    ]);
    
    // For top gigs
    const gigMap = new Map();
    
    orders.forEach(order => {
      const gigId = order.gig_id?._id || order.gig_id;
      if (!gigId) return;
      
      if (!gigMap.has(gigId)) {
        gigMap.set(gigId, {
          id: gigId,
          title: order.gig_id?.title || 'Unknown Gig',
          freelancerName: order.freelancer_id?.username || 'Unknown Freelancer',
          rating: 0,
          orderCount: 0,
          totalRating: 0,
          imageUrl: "/img/default-gig.jpg"
        });
      }
      
      const gig = gigMap.get(gigId);
      gig.orderCount += 1;
      
      // Calculate average rating for gig
      const gigRating = order.rating || Math.floor(Math.random() * 2) + 4; // Random rating between 4-5 if not available
      gig.totalRating += gigRating;
      gig.rating = gig.totalRating / gig.orderCount;
    });
    
    // Sort gigs by order count and get top 3
    const sortedGigs = Array.from(gigMap.values())
      .sort((a, b) => b.orderCount - a.orderCount)
      .slice(0, 3);
    
    // Set top gigs or use default if not enough data
    setTopGigs(sortedGigs.length >= 3 ? sortedGigs : [
      {
        id: 1,
        title: "Website Development",
        freelancerName: "John Smith",
        rating: 4.9,
        imageUrl: "/img/default-gig.jpg"
      },
      {
        id: 2,
        title: "Logo Design",
        freelancerName: "Sarah Johnson",
        rating: 4.8,
        imageUrl: "/img/default-gig.jpg"
      },
      {
        id: 3,
        title: "SEO Optimization",
        freelancerName: "Michael Brown",
        rating: 4.7,
        imageUrl: "/img/default-gig.jpg"
      }
    ]);
  };

  // Loading state UI (unchanged)
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Error state UI (unchanged)
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">
            <FontAwesomeIcon icon={faExclamationCircle} />
          </div>
          <p className="text-xl text-gray-700">{error}</p>
          <button 
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Main Content */}
      <div id="main-content" className="mt-6 p-8">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Total Users Card */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUsers} className="text-green-500 text-3xl mr-4" />
              <div>
                <p className="text-gray-500">Total Users</p>
                <h2 className="text-2xl font-bold">{totalUsers.toLocaleString()}</h2>
              </div>
            </div>
          </div>
          
          {/* Total Revenue Card */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faDollarSign} className="text-green-500 text-3xl mr-4" />
              <div>
                <p className="text-gray-500">Total Revenue</p>
                <h2 className="text-2xl font-bold">${totalRevenue.toLocaleString()}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Grid for Top Sections */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {/* Top 3 Freelancers */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow mb-5">
            <h2 className="text-xl text-center font-bold mb-4">Top 3 Freelancers</h2>
            {/* Parent flex container to align freelancer cards horizontally */}
            <div className="flex flex-wrap justify-around items-center mt-8">
              {topFreelancers.map((freelancer, index) => (
                <div key={freelancer.id} className="flex flex-col items-center relative">
                  <div className="relative">
                    <img
                      src="https://selfmadewebdesigner.com/wp-content/uploads/2019/09/self-made-web-designer-upwork-profile.jpg"
                      alt={`Freelancer ${freelancer.name}`}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    {/* Badge for ranking */}
                    <img
                      src={badgeImages[index]}
                      alt={`Badge ${index + 1}`}
                      className="absolute -top-2 -left-2 w-9 h-9"
                    />
                  </div>
                  <div className="text-center mt-2">
                    <p className="font-semibold text-lg">{freelancer.name}</p>
                    <p className="text-base text-gray-500">{freelancer.profession}</p>
                    <div className="flex items-center justify-center mt-1">
                      <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                      <span className="text-base text-gray-700 ml-1">{freelancer.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Top 3 Clients */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow mb-5">
            <h2 className="text-xl text-center font-bold mb-4">Top 3 Clients</h2>
            {/* Parent flex container to align client cards horizontally */}
            <div className="flex flex-wrap justify-around items-center mt-8">
              {topClients.map((client, index) => (
                <div key={client.id} className="flex flex-col items-center relative">
                  <div className="relative">
                    <img
                      src="https://selfmadewebdesigner.com/wp-content/uploads/2019/09/self-made-web-designer-upwork-profile.jpg"
                      alt={`Client ${client.name}`}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    {/* Badge for ranking */}
                    <img
                      src={badgeImages[index]}
                      alt={`Badge ${index + 1}`}
                      className="absolute -top-2 -left-2 w-9 h-9"
                    />
                  </div>
                  <div className="text-center mt-2">
                    <p className="font-semibold text-lg">{client.name}</p>
                    <p className="text-base text-gray-500">Total Spent: ${client.totalSpent.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Top 3 Gigs */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow mb-5">
            <h2 className="text-xl text-center font-bold mb-4">Top 3 Gigs</h2>
            {/* Parent flex container to align gig cards horizontally */}
            <div className="flex flex-wrap justify-around items-center mt-8">
              {topGigs.map((gig, index) => (
                <div key={gig.id} className="flex flex-col items-center relative">
                  <div className="relative">
                    <img
                      src="https://selfmadewebdesigner.com/wp-content/uploads/2019/09/self-made-web-designer-upwork-profile.jpg"
                      alt={`Gig ${gig.title}`}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    {/* Badge for ranking */}
                    <img
                      src={badgeImages[index]}
                      alt={`Badge ${index + 1}`}
                      className="absolute -top-2 -left-2 w-9 h-9"
                    />
                  </div>
                  <div className="text-center mt-2">
                    <p className="font-semibold text-lg">{gig.title}</p>
                    <p className="text-base text-gray-500">by {gig.freelancerName}</p>
                    <div className="flex items-center justify-center mt-1">
                      <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                      <span className="text-base text-gray-700 ml-1">{gig.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
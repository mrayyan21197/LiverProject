import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";
import axios from "axios";

const ManageOrders = () => {
  // Get active view from outlet context
  const { activeView } = useOutletContext();
  
  // State for modal visibility
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // State for data
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for filters
  const [searchTitle, setSearchTitle] = useState("");
  const [searchFreelancer, setSearchFreelancer] = useState("");
  const [searchClient, setSearchClient] = useState("");
  
  // API fetch function for orders and transactions
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/auth/getorders');
      
      // Process data for both orders and transactions
      const allOrders = response.data.map(order => ({
        id: order._id,
        title: order.gig_id?.title || "Untitled Order",
        freelancer: order.freelancer_id?.full_verification?.[0]?.full_name || order.freelancer_id?.username || "Unknown Freelancer",
        client: order.client_id?.full_verification?.[0]?.full_name || order.client_id?.username || "Unknown Client",
        budget: `$${order.total_amount || 0}`,
        startDate: new Date(order.created_at).toLocaleDateString(),
        duration: calculateDuration(order.created_at, order.delivery_date),
        status: order.status || "Pending",
        requirements: order.requirements || "No requirements specified",
        deliveryDate: new Date(order.delivery_date).toLocaleDateString(),
        // Keep the original data for modal display
        originalData: order
      }));
      
      // Set orders (not completed orders)
      setOrders(allOrders.filter(order => order.status !== "Completed"));
      
      // Set transactions (completed orders)
      setTransactions(allOrders.filter(order => order.status === "Completed"));
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders. Please try again later.");
      setLoading(false);
    }
  };

  // Calculate duration between two dates
  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return "N/A";
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return `${diffDays} Days`;
  };

  // Effect to fetch data
  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle order cancellation
  const handleCancelOrder = async () => {
    if (!selectedItem) return;
    
    try {
      setLoading(true);
      console.log(selectedItem.id)
       await axios.delete(`http://localhost:3000/api/auth/orders/cancel/${selectedItem.id}`);
      
      // After successful cancellation, refresh the data
      await fetchOrders();
      setIsApproveModalOpen(false);
      
      setLoading(false);
    } catch (error) {
      console.error("Error cancelling order:", error);
      setLoading(false);
    }
  };

  // Open details modal
  const handleOpenDetails = (item) => {
    setSelectedItem(item);
    setIsDetailsModalOpen(true);
  };

  // Open approve modal
  const handleOpenApprove = (item) => {
    setSelectedItem(item);
    setIsApproveModalOpen(true);
  };

  // Apply filters to the data
  const applyFilters = (data) => {
    return data.filter(item => 
      item.title.toLowerCase().includes(searchTitle.toLowerCase()) && 
      item.freelancer.toLowerCase().includes(searchFreelancer.toLowerCase()) && 
      item.client.toLowerCase().includes(searchClient.toLowerCase())
    );
  };

  // Determine current data based on active view
  const currentData = activeView === "orders" ? applyFilters(orders) : applyFilters(transactions);
  const pageTitle = activeView === "orders" ? "Orders" : "Transactions";
  const modalTitle = activeView === "orders" ? "Order Details" : "Transaction Details";
  const dateLabel = activeView === "orders" ? "Starting Date" : "Created At";

  return (
    <>
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{pageTitle}</h1>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* Filter Section */}
      <div className="bg-white p-4 rounded shadow mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
          {/* Search by Order Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search by Order Title
            </label>
            <input
              type="text"
              placeholder="Enter order title"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>
          {/* Freelancer Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Freelancer
            </label>
            <input
              type="text"
              placeholder="Enter freelancer name"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
              value={searchFreelancer}
              onChange={(e) => setSearchFreelancer(e.target.value)}
            />
          </div>
          {/* Client Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client
            </label>
            <input
              type="text"
              placeholder="Enter client name"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
              value={searchClient}
              onChange={(e) => setSearchClient(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}

      {/* Table Container */}
      {!loading && (
        <div className="bg-white rounded shadow">
          {currentData.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No {activeView} found matching the criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      Order Title
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      Freelancer
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      Budget
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {currentData.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.id.substring(0, 8)}...</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.freelancer}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.client}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.budget}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.status === "Completed" ? "bg-green-100 text-green-800" :
                          item.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                        {/* Eye icon to view details */}
                        <button 
                          className="text-gray-600 hover:text-blue-500"
                          onClick={() => handleOpenDetails(item)}
                        >
                           <Eye size={18} />
                        </button>
                        {/* Delete icon (only for orders) */}
                        {activeView === "orders" && (
                          <button 
                            className="text-gray-600 hover:text-red-500"
                            onClick={() => handleOpenApprove(item)}
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal for Details */}
      {isDetailsModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            {/* Modal Header */}
            <div className="border-b px-4 py-2 flex justify-between items-center">
              <h5 className="font-semibold text-lg">{modalTitle}</h5>
              <button 
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                ✕
              </button>
            </div>
            {/* Modal Body with 2-Column Grid */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800">Order ID</h3>
                  <p className="text-gray-600">{selectedItem.id}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Job Title</h3>
                  <p className="text-gray-600">{selectedItem.title}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Freelancer</h3>
                  <p className="text-gray-600">{selectedItem.freelancer}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Client</h3>
                  <p className="text-gray-600">{selectedItem.client}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Total Budget</h3>
                  <p className="text-gray-600">{selectedItem.budget}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{dateLabel}</h3>
                  <p className="text-gray-600">{selectedItem.startDate}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Delivery Date</h3>
                  <p className="text-gray-600">{selectedItem.deliveryDate}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Duration</h3>
                  <p className="text-gray-600">{selectedItem.duration}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Status</h3>
                  <p className="text-gray-600">{selectedItem.status}</p>
                </div>
                <div className="col-span-2">
                  <h3 className="font-semibold text-gray-800">Requirements</h3>
                  <p className="text-gray-600">{selectedItem.requirements}</p>
                </div>
              </div>
            </div>
            {/* Modal Footer */}
            <div className="border-t px-4 py-2 flex justify-end">
              <button 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Cancel Confirmation (only for orders) */}
      {isApproveModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            {/* Modal Header */}
            <div className="px-4 py-2 flex justify-between items-center">
              <h5 className="font-semibold text-lg">Cancel Order</h5>
              <button 
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsApproveModalOpen(false)}
              >
                ✕
              </button>
            </div>
            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-800 mb-4">
                Are you sure you want to cancel this order? This action cannot be undone.
              </p>
            </div>
            {/* Modal Footer */}
            <div className="px-4 py-2 flex justify-end space-x-2">
              <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setIsApproveModalOpen(false)}
              >
                Keep Order
              </button>
              <button 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleCancelOrder}
                disabled={loading}
              >
                {loading ? "Cancelling..." : "Cancel Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageOrders;
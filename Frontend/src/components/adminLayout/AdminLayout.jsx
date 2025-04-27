import { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import AdminSidebar from "../adminSidebar/AdminSidebar";

const AdminLayout = () => {
  // State for sidebar collapse
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // State for active view (clients or freelancers)
  const [activeView, setActiveView] = useState("clients");
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Sidebar */}
      <AdminSidebar 
        collapsed={sidebarCollapsed} 
        toggleSidebar={toggleSidebar} 
        setActiveView={setActiveView}
      />
      
      {/* Main Content */}
      <div 
        className={`transition-all duration-300 p-8 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <Outlet context={{ activeView }} />
      </div>
    </div>
  );
};

export default AdminLayout;
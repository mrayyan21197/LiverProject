import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  User, 
  Briefcase, 
  ShoppingCart, 
  ArrowLeftRight, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const AdminSidebar = ({ collapsed, toggleSidebar, setActiveView }) => {
  const location = useLocation();
  
  // Navigation items with icons, labels, and paths
  const navItems = [
    { 
      icon: <BarChart3 size={20} />, 
      label: "Dashboard", 
      path: "/admin/dashboard",
      action: null
    },
    { 
      icon: <User size={20} />, 
      label: "Freelancers", 
      path: "/admin/freelancers",
      action: () => setActiveView("freelancers")
    },
    { 
      icon: <Users size={20} />, 
      label: "Clients", 
      path: "/admin/clients",
      action: () => setActiveView("clients")
    },
    { 
      icon: <Briefcase size={20} />, 
      label: "Gigs", 
      path: "/admin/gigs",
      action: null
    },
    { 
      icon: <ShoppingCart size={20} />, 
      label: "Orders", 
      path: "/admin/orders",
      action: () => setActiveView("orders")
    },
    { 
      icon: <ArrowLeftRight size={20} />, 
      label: "Transactions", 
      path: "/admin/transactions",
      action: () => setActiveView("transactions")
    },
    { 
      icon: <LogOut size={20} />, 
      label: "Logout", 
      path: "/",
      action: null
    }
  ];

  return (
    <div 
      className={`h-screen fixed top-0 left-0 bg-white shadow-lg duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top Bar of the Sidebar with Admin label and Toggle Button */}
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && <p className="text-2xl font-bold text-green-500">Admin</p>}
        <button
          onClick={toggleSidebar}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white w-10 h-10 rounded-full shadow-lg hover:shadow-xl focus:outline-none flex items-center justify-center transform transition-transform duration-300"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-4">
        {navItems.map((item, index) => (
          <Link 
            key={index}
            to={item.path}
            className={`flex items-center p-4 hover:bg-gray-200 ${
              location.pathname === item.path ? 'bg-gray-200' : ''
            }`}
            onClick={item.action ? item.action : undefined}
          >
            <span className={`text-green-500 ${collapsed ? '' : 'mr-3'}`}>
              {item.icon}
            </span>
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, LogOut, Menu, X, ShoppingCart, MessageSquare, Bell, Briefcase, LayoutDashboard, Moon, Sun, ChevronDown } from "lucide-react";
import axios from 'axios';
import Register from "../../pages/registeration/register";
import { jwtDecode } from "jwt-decode";
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (currentUser && currentUser.token) {
      const decoded = jwtDecode(currentUser.token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        console.log("Token expired. Logging out...");
        handleLogout();
      } else {
        const timeUntilLogout = (decoded.exp - currentTime) * 1000;
        const logoutTimer = setTimeout(() => {
          handleLogout();
          alert(`Session expired login again`);
        }, timeUntilLogout);

        return () => clearTimeout(logoutTimer);
      }
    }
  }, [currentUser]);
  useEffect(() => {
    // Close mobile menu when changing pages
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = async () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setDarkMode(false);
    window.location.href="/";
  };

  const handleBecomeSellerClick = () => {
    setShowSellerModal(true);
  };

  const handleCloseModal = () => {
    setShowSellerModal(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const handleBecomeSeller = async () => {
    try {
      const response = await axios.put("https://liverbackend.vercel.app/api/auth/updateRole", 
        { id: currentUser.id, newRole: "freelancer" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const updatedUser = { ...currentUser, isSeller: true };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      setShowSellerModal(false);
    } catch (error) {
      console.error("Error becoming a seller:", error);
    }
  };

  const isHomePage = pathname === "/";
  const navbarBg = scrolled || !isHomePage 
    ? darkMode ? "bg-gray-800 shadow-md" : "bg-white shadow-md" 
    : "bg-[#013914]";
  const textColor = scrolled || !isHomePage 
    ? darkMode ? "text-gray-200" : "text-gray-700" 
    : "text-white";

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarBg} h-[80px] flex items-center`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold">
                <span className={isHomePage && !scrolled ? "text-white" : darkMode ? "text-white" : "text-[#404145]"}>liverr</span>
                <span className="text-green-500">.</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`${textColor} p-2 rounded-md hover:bg-opacity-20 hover:bg-gray-100`}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Fiverr Business - non-clickable */}
              <span className={`${textColor} cursor-default`}>
                Liverr Business
              </span>
              
              <Link to="/gigs" className={`${textColor} hover:text-green-500 transition-colors`}>
                Explore
              </Link>
              
              {/* English - non-clickable */}
              <span className={`${textColor} cursor-default flex items-center`}>
                English
              
              </span>

              {currentUser ? (
                <>
                  {/* Become a Seller button (only shown if user is not a seller) */}
                  {!currentUser.isSeller && (
                    <button
                      onClick={handleBecomeSellerClick}
                      className="px-4 py-2 rounded-md border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors"
                    >
                      Become a Seller
                    </button>
                  )}

                  <div className="relative group">
                    <div className="flex items-center space-x-2 cursor-pointer">
                      {currentUser.img ? (
                        <img
                          src={currentUser.img}
                          alt={currentUser.name}
                          className="w-8 h-8 rounded-full object-cover border-2 border-green-500"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                          {currentUser.name?.[0]?.toUpperCase() || "A"}
                        </div>
                      )}
                      <span className={textColor}>{currentUser.name || "User"}</span>
                      <ChevronDown className={`h-4 w-4 ${textColor}`} />
                    </div>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 w-56 mt-0.5 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                      {/* Common Option: Verify Account */}
                      <div className="py-1 border-b dark:border-gray-700">
                        <Link to="/verify" className="flex items-center px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                          <Bell className="w-4 h-4 mr-2" />
                          Verify Account
                        </Link>
                      </div>

                      {/* Seller Options */}
                      {currentUser.isSeller ? (
                        <div>
                          <div className="py-1 border-b dark:border-gray-700">
                            <div className="px-4 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400">Seller</div>
                            <Link to="/FreelancerDashboard" className="flex items-center px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                              <LayoutDashboard className="w-4 h-4 mr-2" />
                              Dashboard
                            </Link>
                            <Link to="/myGigs" className="flex items-center px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                              <Briefcase className="w-4 h-4 mr-2" />
                              My Gigs
                            </Link>
                            <Link to="/addGig" className="flex items-center px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                              <span className="w-4 h-4 mr-2 text-lg">+</span>
                              Add New Gig
                            </Link>
                            <Link to="/orders" className="flex items-center px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Orders
                            </Link>
                            <Link to="/messages" className="flex items-center px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Messages
                            </Link>
                            <button
                              onClick={toggleDarkMode}
                              className="w-full flex items-center px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              {darkMode ? (
                                <>
                                  <Sun className="w-4 h-4 mr-2" />
                                  Light Mode
                                </>
                              ) : (
                                <>
                                  <Moon className="w-4 h-4 mr-2" />
                                  Dark Mode
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="py-1 border-b dark:border-gray-700">
                            <div className="px-4 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400">Buyer</div>
                            <Link to="/orders" className="flex items-center px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Orders
                            </Link>
                            <Link to="/messages" className="flex items-center px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Messages
                            </Link>
                            <button
                              onClick={toggleDarkMode}
                              className="w-full flex items-center px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              {darkMode ? (
                                <>
                                  <Sun className="w-4 h-4 mr-2" />
                                  Light Mode
                                </>
                              ) : (
                                <>
                                  <Moon className="w-4 h-4 mr-2" />
                                  Dark Mode
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Logout */}
                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleRegisterClick}
                    className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
                  >
                    Join
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`fixed inset-0 z-40 ${darkMode ? "bg-gray-900" : "bg-white"} pt-20`}>
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col space-y-6">
              {/* Non-clickable items */}
              <span className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"} cursor-default`}>
                Liverr Business
              </span>
              <Link 
                to="/gigs" 
                className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"} hover:text-green-500`}
              >
                Explore
              </Link>
              <span className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"} cursor-default flex items-center`}>
                English 
              </span>
              
              {/* User actions */}
              {currentUser ? (
                <>
                  <Link to="/verify" className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"} hover:text-green-500`}>
                    Verify Account
                  </Link>
                  
                  {!currentUser.isSeller && (
                    <button
                      onClick={handleBecomeSellerClick}
                      className="px-4 py-2 rounded-md border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors text-left"
                    >
                      Become a Seller
                    </button>
                  )}
                  
                  {currentUser.isSeller ? (
                    <>
                      <div className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Seller</div>
                      <Link to="/FreelancerDashboard" className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"} hover:text-green-500`}>
                        Dashboard
                      </Link>
                      <Link to="/myGigs" className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"} hover:text-green-500`}>
                        My Gigs
                      </Link>
                      <Link to="/addGig" className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"} hover:text-green-500`}>
                        Add New Gig
                      </Link>
                    </>
                  ) : (
                    <div className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Buyer</div>
                  )}
                  
                  <Link to="/orders" className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"} hover:text-green-500`}>
                    Orders
                  </Link>
                  <Link to="/messages" className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"} hover:text-green-500`}>
                    Messages
                  </Link>
                  
                  <button
                    onClick={toggleDarkMode}
                    className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"} hover:text-green-500 text-left flex items-center`}
                  >
                    {darkMode ? (
                      <>
                        <Sun className="w-5 h-5 mr-2" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="w-5 h-5 mr-2" />
                        Dark Mode
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className={`text-lg font-medium text-red-500 hover:text-red-600 text-left flex items-center`}
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleRegisterClick}
                  className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors self-start"
                >
                  Join
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Become Seller Modal */}
      {showSellerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} rounded-lg shadow-xl max-w-md mx-4 w-full p-6`}>
            <h3 className="text-xl font-bold mb-4">Become a Seller</h3>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-6`}>
              Are you sure you want to become a seller? You'll be able to create and sell your services on Fiverr.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className={`px-4 py-2 border ${darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-50"} rounded-md transition-colors`}
              >
                No, Cancel
              </button>
              <button
                onClick={handleBecomeSeller}
                className="px-4 py-2 bg-green-500 rounded-md text-white hover:bg-green-600 transition-colors"
              >
                Yes, Become a Seller
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-xl max-w-4xl mx-4 w-full overflow-auto max-h-[90vh]`}>
            <div className="flex justify-end p-2">
              <button
                onClick={handleCloseRegisterModal}
                className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <Register onRegisterSuccess={handleCloseRegisterModal} isModal={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
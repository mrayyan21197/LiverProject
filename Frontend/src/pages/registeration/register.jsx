// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./register.css"; 

// const Register = () => {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     if (success || error) {
//       const timer = setTimeout(() => {
//         setSuccess("");
//         setError("");
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, [success, error]);

//   // Validation function
//   const validateForm = () => {
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (isFlipped && user.username.length < 4) {
//       setError("Username must be at least 4 characters long.");
//       return false;
//     }
//     if (!emailRegex.test(user.email)) {
//       setError("Invalid email format.");
//       return false;
//     }
//     if (user.password.length < 8) {
//       setError("Password must be at least 8 characters long.");
//       return false;
//     }
//     setError("");
//     return true;
//   };

//   const handleSubmit = async (e, type) => {
//     e.preventDefault();
//     if (!validateForm()) return;
  
//     try {
//       const apiUrl = `http://localhost:3000/api/auth/${type}`;
//       const response = await axios.post(apiUrl, user); 
  
//       if (type === "login") {
//         const currentUser = {
//           id: response.data.currentUser.id,
//           name: response.data.currentUser.username,  
//           isSeller: response.data.currentUser.isSeller,
//           isVerified:response.data.currentUser.isVerified,
//           token : response.data.token
//         };
//         localStorage.setItem("currentUser", JSON.stringify(currentUser));
//         window.location.href = "/";
//       } else {
//         setIsFlipped(false); 
//       }
  
//       setUser({
//         username: "",
//         email: "",
//         password: "",
//       });
  
//       setSuccess(type === "login" ? "Login successful!" : "Signup successful! Please login.");
//       setError("");
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong.");
//     }
//   };
  

//   return (
//     <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 py-12 px-4">
//       <div className={`flip-container ${isFlipped ? "flipped" : ""}`}>
//         <div className="flipper">
//           {/* Login Container */}
//           <div className="login-container">
//             {/* Left Section */}
//             <div className="left-section">
//               <div className="z-10 relative">
//                 <h2 className="text-2xl font-bold mb-6">Success starts here</h2>
//                 <ul className="mt-3 space-y-2">
//                   <li className="flex items-center">
//                     <span className="text-green-400 mr-2">✔</span> Find top freelancers worldwide
//                   </li>
//                   <li className="flex items-center">
//                     <span className="text-green-400 mr-2">✔</span> Get quality work done fast
//                   </li>
//                   <li className="flex items-center">
//                     <span className="text-green-400 mr-2">✔</span> Secure payments & easy collaboration
//                   </li>
//                   <li className="flex items-center">
//                     <span className="text-green-400 mr-2">✔</span> Scale your business effortlessly
//                   </li>
//                 </ul>
//               </div>
//             </div>
            
//             {/* Right Section */}
//             <div className="right-section">
//               <h3 className="text-xl font-medium mb-3">Sign in to your account</h3>
//               <p className="mb-4 text-gray-600">
//                 Don't have an account?{" "}
//                 <a 
//                   href="#" 
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setIsFlipped(true);
//                   }}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Join here
//                 </a>
//               </p>
//               {error && <p className="text-red-500 mb-4">{error}</p>}
//               {success && <p className="text-green-500 mb-4">{success}</p>}
              
//               <form onSubmit={(e) => handleSubmit(e, "login")}>
//                 <div className="mb-4">
//                   <input
//                     type="email"
//                     name="email"
//                     className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Email"
//                     value={user.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <input
//                     type="password"
//                     name="password"
//                     className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Password"
//                     value={user.password}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
//                   Login
//                 </button>
//               </form>
              
//               <p className="mt-6 text-gray-500 text-center text-sm">
//                 By joining, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{" "}
//                 <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
//               </p>
//             </div>
//           </div>

//           {/* Signup Container */}
//           <div className="signup-container">
//             {/* Right Section (Banner) */}
//             <div className="signup-right-section">
//               <div className="z-10 relative">
//                 <h2 className="text-2xl font-bold mb-6">Join the best freelancing platform</h2>
//                 <ul className="mt-3 space-y-2">
//                   <li className="flex items-center">
//                     <span className="text-green-400 mr-2">✔</span> Work with trusted clients
//                   </li>
//                   <li className="flex items-center">
//                     <span className="text-green-400 mr-2">✔</span> Get paid securely & on time
//                   </li>
//                   <li className="flex items-center">
//                     <span className="text-green-400 mr-2">✔</span> Showcase your talent to the world
//                   </li>
//                   <li className="flex items-center">
//                     <span className="text-green-400 mr-2">✔</span> Join a community of professionals
//                   </li>
//                 </ul>
//               </div>
//             </div>
            
//             {/* Left Section (Form) */}
//             <div className="signup-left-section">
//               <h3 className="text-xl font-medium mb-3">Create your account</h3>
//               <p className="mb-4 text-gray-600">
//                 Already have an account?{" "}
//                 <a 
//                   href="#" 
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setIsFlipped(false);
//                   }}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Sign in
//                 </a>
//               </p>
//               {error && <p className="text-red-500 mb-4">{error}</p>}
//               {success && <p className="text-green-500 mb-4">{success}</p>}
              
//               <form onSubmit={(e) => handleSubmit(e, "signup")}>
//                 <div className="mb-4">
//                   <input
//                     type="text"
//                     name="username"
//                     className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Username"
//                     value={user.username}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <input
//                     type="email"
//                     name="email"
//                     className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Email"
//                     value={user.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <input
//                     type="password"
//                     name="password"
//                     className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Password"
//                     value={user.password}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
//                   Sign Up
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Register;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "./register.css"; 

const Register = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [isFlipped, setIsFlipped] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Validation function
  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (isFlipped && user.username.length < 4) {
      setError("Username must be at least 4 characters long.");
      return false;
    }
    if (!emailRegex.test(user.email)) {
      setError("Invalid email format.");
      return false;
    }
    if (user.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Check for admin credentials
    if (type === "login" && user.email === "admin@admin.com" && user.password === "admin123") {
      navigate("/admin/dashboard");
      return;
    }
  
    try {
      const apiUrl = `http://localhost:3000/api/auth/${type}`;
      const response = await axios.post(apiUrl, user); 
  
      if (type === "login") {
        const currentUser = {
          id: response.data.currentUser.id,
          name: response.data.currentUser.username,  
          isSeller: response.data.currentUser.isSeller,
          isVerified: response.data.currentUser.isVerified,
          token: response.data.token
        };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        window.location.href="/"; 
      } else {
        setIsFlipped(false); 
      }
  
      setUser({
        username: "",
        email: "",
        password: "",
      });
  
      setSuccess(type === "login" ? "Login successful!" : "Signup successful! Please login.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 py-12 px-4">
      <div className={`flip-container ${isFlipped ? "flipped" : ""}`}>
        <div className="flipper">
          {/* Login Container */}
          <div className="login-container">
            {/* Left Section */}
            <div className="left-section">
              <div className="z-10 relative">
                <h2 className="text-2xl font-bold mb-6">Success starts here</h2>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✔</span> Find top freelancers worldwide
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✔</span> Get quality work done fast
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✔</span> Secure payments & easy collaboration
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✔</span> Scale your business effortlessly
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right Section */}
            <div className="right-section">
              <h3 className="text-xl font-medium mb-3">Sign in to your account</h3>
              <p className="mb-4 text-gray-600">
                Don't have an account?{" "}
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsFlipped(true);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Join here
                </a>
              </p>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {success && <p className="text-green-500 mb-4">{success}</p>}
              
              <form onSubmit={(e) => handleSubmit(e, "login")}>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  Login
                </button>
              </form>
              
              <p className="mt-6 text-gray-500 text-center text-sm">
                By joining, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </div>

          {/* Signup Container */}
          <div className="signup-container">
            {/* Right Section (Banner) */}
            <div className="signup-right-section">
              <div className="z-10 relative">
                <h2 className="text-2xl font-bold mb-6">Join the best freelancing platform</h2>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✔</span> Work with trusted clients
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✔</span> Get paid securely & on time
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✔</span> Showcase your talent to the world
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✔</span> Join a community of professionals
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Left Section (Form) */}
            <div className="signup-left-section">
              <h3 className="text-xl font-medium mb-3">Create your account</h3>
              <p className="mb-4 text-gray-600">
                Already have an account?{" "}
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsFlipped(false);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Sign in
                </a>
              </p>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {success && <p className="text-green-500 mb-4">{success}</p>}
              
              <form onSubmit={(e) => handleSubmit(e, "signup")}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="username"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Username"
                    value={user.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
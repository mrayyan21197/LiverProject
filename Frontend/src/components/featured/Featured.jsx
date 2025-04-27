// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

// const Featured = () => {
//   return (
//     <div className="h-[600px] flex justify-center bg-green-900 text-white">
//       <div className="max-w-[1400px] flex items-center w-full px-6">
//         {/* Left Section */}
//         <div className="flex flex-col gap-6">
//           <h1 className="text-5xl font-bold">
//             Find the perfect <span className="italic font-light">freelance</span> services for your business
//           </h1>

//           {/* Search Box */}
//           <div className="bg-white rounded-lg flex items-center justify-between overflow-hidden shadow-lg">
//             <div className="flex items-center gap-3 px-4 py-2">
//               <FontAwesomeIcon icon={faSearch} className="text-gray-500 text-lg" />
//               <input
//                 type="text"
//                 placeholder='Try "building mobile app"'
//                 className="border-none outline-none text-black placeholder-gray-500"
//               />
//             </div>
//             <button className="w-32 h-12 bg-green-500 text-white font-semibold hover:bg-green-600 transition">
//               Search
//             </button>
//           </div>

//           {/* Popular Services */}
//           <div className="flex items-center gap-3 flex-wrap">
//             <span className="font-medium">Popular:</span>
//             {["Web Design", "WordPress", "Logo Design", "AI Services"].map((item) => (
//               <button
//                 key={item}
//                 className="border border-white px-4 py-2 rounded-full bg-transparent text-sm hover:bg-white hover:text-green-900 transition"
//               >
//                 {item}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Right Section (Image) */}
//         <div className="hidden lg:block h-full">
//           <img src="./img/man.png" alt="Man" className="h-full object-contain" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Featured;
// import React, { useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const Featured = () => {
//   // Animated typing effect
//   const [placeholder, setPlaceholder] = React.useState("");
//   const phrases = [
//     "Try \"building mobile app\"",
//     "Try \"logo design\"",
//     "Try \"AI content writing\"",
//     "Try \"video animation\""
//   ];
  
//   useEffect(() => {
//     let currentPhraseIndex = 0;
//     let currentCharIndex = 0;
//     let isDeleting = false;
//     let typingSpeed = 150;
    
//     const type = () => {
//       const currentPhrase = phrases[currentPhraseIndex];
      
//       if (isDeleting) {
//         setPlaceholder(currentPhrase.substring(0, currentCharIndex - 1));
//         currentCharIndex--;
//         typingSpeed = 50;
//       } else {
//         setPlaceholder(currentPhrase.substring(0, currentCharIndex + 1));
//         currentCharIndex++;
//         typingSpeed = 150;
//       }
      
//       if (!isDeleting && currentCharIndex === currentPhrase.length) {
//         isDeleting = true;
//         typingSpeed = 1500; // Pause before deleting
//       }
      
//       if (isDeleting && currentCharIndex === 0) {
//         isDeleting = false;
//         currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
//       }
      
//       setTimeout(type, typingSpeed);
//     };
    
//     const typingTimer = setTimeout(type, 1000);
//     return () => clearTimeout(typingTimer);
//   }, []);

//   return (
//     <div className="relative h-[650px] flex justify-center bg-gradient-to-r from-green-900 to-green-800 text-white overflow-hidden">
//       {/* Background animated shapes */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(5)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full bg-green-700 opacity-10"
//             style={{
//               width: Math.random() * 300 + 100,
//               height: Math.random() * 300 + 100,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               x: [0, Math.random() * 100 - 50],
//               y: [0, Math.random() * 100 - 50],
//             }}
//             transition={{
//               repeat: Infinity,
//               repeatType: "reverse",
//               duration: Math.random() * 20 + 10,
//             }}
//           />
//         ))}
//       </div>
      
//       <div className="max-w-[1400px] flex items-center w-full px-6 z-10">
//         {/* Left Section */}
//         <motion.div 
//           className="flex flex-col gap-8 w-full lg:w-3/5"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <motion.h1 
//             className="text-4xl md:text-6xl font-bold leading-tight"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//           >
//             Find the perfect <motion.span 
//               className="font-light italic bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-300"
//               animate={{ 
//                 scale: [1, 1.05, 1],
//               }}
//               transition={{ 
//                 repeat: Infinity,
//                 repeatType: "reverse",
//                 duration: 2,
//               }}
//             >
//               freelance
//             </motion.span> services for your business
//           </motion.h1>
          
//           <motion.p 
//             className="text-xl text-green-100"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6, duration: 0.8 }}
//           >
//             Connect with talented professionals ready to bring your ideas to life
//           </motion.p>
          
//           {/* Search Box */}
//           <motion.div 
//             className="bg-white rounded-lg flex items-center justify-between overflow-hidden shadow-2xl border-2 border-transparent focus-within:border-green-400 transition-all duration-300"
//             initial={{ opacity: 0, width: "90%" }}
//             animate={{ opacity: 1, width: "100%" }}
//             transition={{ delay: 0.9, duration: 0.8 }}
//             whileHover={{ scale: 1.02 }}
//           >
//             <div className="flex items-center gap-3 px-4 py-3 flex-1">
//               <FontAwesomeIcon icon={faSearch} className="text-gray-500 text-lg" />
//               <input
//                 type="text"
//                 placeholder={placeholder}
//                 className="border-none outline-none text-black placeholder-gray-500 w-full text-lg"
//               />
//             </div>
//             <button className="w-36 h-14 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 text-lg">
//               Search
//             </button>
//           </motion.div>
          
//           {/* Popular Services */}
//           <motion.div 
//             className="flex items-center gap-3 flex-wrap"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.2, duration: 0.8 }}
//           >
//             <span className="font-medium">Popular:</span>
//             {["Web Design", "WordPress", "Logo Design", "AI Services", "Animation"].map((item, index) => (
//               <Link
//                 to={`/gigs?cat=${item.toLowerCase().replace(" ", "-")}`}
//                 key={item}
//               >
//                 <motion.button
//                   className="border border-white px-4 py-2 rounded-full bg-transparent text-sm hover:bg-white hover:text-green-900 transition-all duration-300"
//                   whileHover={{ scale: 1.05, backgroundColor: "white", color: "#065f46" }}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.2 + index*0.1, duration: 0.5 }}
//                 >
//                   {item}
//                 </motion.button>
//               </Link>
//             ))}
//           </motion.div>
//         </motion.div>
        
//         {/* Right Section (Image) */}
//         <motion.div 
//           className="hidden lg:block h-full relative flex-1"
//           initial={{ opacity: 0, x: 100 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.5, duration: 1 }}
//         >
//           <div className="absolute -top-10 -right-10 w-80 h-80 rounded-full bg-gradient-to-br from-green-400 to-blue-400 opacity-20 blur-xl"></div>
//           <motion.img 
//             src="./img/man.png" 
//             alt="Freelancer" 
//             className="h-full object-contain relative z-10"
//             initial={{ y: 20 }}
//             animate={{ y: [0, -15, 0] }}
//             transition={{ 
//               repeat: Infinity,
//               duration: 4,
//             }}
//           />
//         </motion.div>
//       </div>
      
//       {/* Wave effect at bottom */}
//       <div className="absolute bottom-0 left-0 w-full">
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
//           <path 
//             fill="#f3f4f6" 
//             fillOpacity="1" 
//             d="M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,101.3C672,96,768,128,864,149.3C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
//           ></path>
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default Featured;
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Featured = () => {
  // Floating animation variants
  const floatAnimation = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Bounce animation for goofy elements
  const bounceAnimation = {
    animate: {
      scale: [1, 1.1, 1],
      rotate: [-2, 2, -2],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Pulse animation
  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative h-[650px] flex justify-center bg-gradient-to-r from-green-900 to-green-800 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated bubbles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-700 opacity-10"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: Math.random() * 10 + 10,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Fun geometric shapes */}
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 border-4 border-green-500 opacity-20 rotate-45"
          animate={{
            rotate: [45, 90, 45],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-40 right-20 w-40 h-40 border-4 border-blue-300 opacity-20 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Playful spiral */}
        <motion.div 
          className="absolute top-1/4 right-1/3 w-16 h-16 border-b-4 border-r-4 border-yellow-300 opacity-30 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      <div className="max-w-[1400px] flex items-center w-full px-6 z-10">
        {/* Left Section - Content */}
        <motion.div 
          className="flex flex-col gap-8 w-full lg:w-3/5"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover 
            <motion.span
              className="inline-block mx-2"
              animate={{ 
                rotate: [0, -5, 5, -5, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                repeat: Infinity,
                repeatDelay: 5,
                duration: 1,
              }}
            >
              amazing
            </motion.span>
            <motion.span 
              className="font-light italic bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-300 relative"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 5,
              }}
            >
              freelance
              <motion.span 
                className="absolute -top-6 -right-6 text-2xl transform rotate-12"
                animate={{
                  y: [-3, 3, -3],
                  x: [-3, 3, -3],
                  rotate: [12, 25, 12],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
              >
                ✨
              </motion.span>
            </motion.span> talent!
          </motion.h1>
          
          <motion.p 
            className="text-xl text-green-100 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Connect with world-class professionals who bring your 
            <motion.span 
              className="inline-block mx-1"
              animate={{
                scale: [1, 1.3, 1],
                color: ["#f0fdf4", "#86efac", "#f0fdf4"],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                delay: 1,
              }}
            >
              wildest ideas
            </motion.span> 
            to life!
          </motion.p>

          {/* Animated category cards */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {[
              {name: "Web Design", icon: "🎨", color: "from-pink-400 to-purple-500"},
              {name: "Mobile Apps", icon: "📱", color: "from-blue-400 to-indigo-500"},
              {name: "AI Services", icon: "🤖", color: "from-green-400 to-teal-500"}
            ].map((category, index) => (
              <motion.div 
                key={index}
                className={`bg-gradient-to-br ${category.color} bg-opacity-90 rounded-lg p-4 border border-white border-opacity-20 shadow-lg`}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: Math.random() < 0.5 ? -2 : 2,
                  y: -5,
                }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  delay: 0.9 + index * 0.2, 
                  duration: 0.5,
                }}
              >
                <motion.div 
                  className="text-3xl mb-2"
                  {...bounceAnimation}
                >
                  {category.icon}
                </motion.div>
                <div className="text-lg font-medium">{category.name}</div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Fun explore button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8"
          >
            <Link to="/gigs">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white font-bold text-lg shadow-xl relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(74, 222, 128, 0.6)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  animate={{
                    x: ["-100%", "100%"],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
                Explore Services
                <motion.span 
                  className="ml-2 inline-block"
                  animate={{
                    x: [0, 5, 0],
                    rotate: [0, 15, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    repeatDelay: 1,
                  }}
                >
                  →
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>
          
          {/* Fun trust badges */}
          <motion.div 
            className="flex flex-wrap items-center gap-6 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            {[
              {icon: "✓", text: "Verified Experts"},
              {icon: "🔒", text: "Secure Payments"},
              {icon: "🌟", text: "24/7 Support"}
            ].map((badge, index) => (
              <motion.div 
                key={index}
                className="flex items-center gap-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.5 + index * 0.2, duration: 0.5 }}
                {...floatAnimation}
              >
                <motion.div 
                  className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-800 text-lg shadow-md"
                  {...pulseAnimation}
                >
                  {badge.icon}
                </motion.div>
                <span className="text-green-100">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Right Section - Animated Image */}
        <motion.div 
          className="hidden lg:block h-full relative flex-1"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.div 
            className="absolute -top-10 -right-10 w-80 h-80 rounded-full bg-gradient-to-br from-green-400 to-blue-400 opacity-20 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
          />
          
          {/* Orbiting elements around the main image */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-xl z-20"
              style={{
                originX: 0.5,
                originY: 1.5,
              }}
              initial={{
                rotate: i * (360 / 5),
              }}
              animate={{
                rotate: [i * (360 / 5), i * (360 / 5) + 360],
              }}
              transition={{
                repeat: Infinity,
                duration: 15,
                ease: "linear",
              }}
            >
              {["💻", "📱", "🎨", "🚀", "💡"][i]}
            </motion.div>
          ))}
          
          <motion.img 
            src="./img/man.png" 
            alt="Freelancer" 
            className="h-full object-contain relative z-10"
            initial={{ y: 20 }}
            animate={{ 
              y: [-15, 15, -15],
              rotate: [-2, 2, -2],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
      
      {/* Animated wave effect at bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          className="w-full"
          animate={{
            x: [-20, 20, -20],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
          }}
        >
          <motion.path 
            fill="#f3f4f6" 
            fillOpacity="1" 
            d="M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,101.3C672,96,768,128,864,149.3C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            animate={{
              d: [
                "M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,101.3C672,96,768,128,864,149.3C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,64L48,90.7C96,117,192,171,288,186.7C384,203,480,181,576,154.7C672,128,768,96,864,106.7C960,117,1056,171,1152,181.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,101.3C672,96,768,128,864,149.3C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 15,
              ease: "easeInOut"
            }}
          />
        </motion.svg>
      </div>
    </div>
  );
};

export default Featured;
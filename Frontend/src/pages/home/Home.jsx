import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slider/Slider";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCards/ProjectCard";
import { cards, projects } from "../../data";
import { motion } from "framer-motion";

const Home = () => {
  // Parallax effect for scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed');
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className="home overflow-hidden">
      <Featured />
      <TrustedBy />

      {/* Category Slide Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-20 bg-gradient-to-r from-gray-50 to-white relative"
      >
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl font-bold text-gray-800 mb-3 text-center"
          >
            Explore Popular <span className="text-green-500">Categories</span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto"
          >
            Discover top-rated services that match your needs
          </motion.p>
          <Slide slidesToShow={5} arrowsScroll={5}>
            {cards.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CatCard card={card} />
              </motion.div>
            ))}
          </Slide>
        </div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-green-100 rounded-full opacity-30 blur-3xl"></div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-gradient-to-b from-green-50 to-green-100 py-28 relative"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full opacity-20 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-20 px-5 md:px-10 relative z-10">
          <motion.div 
            className="flex-1 space-y-10"
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl font-bold text-gray-800 leading-tight"
            >
              A world of <span className="text-green-600">talent</span> at your fingertips
            </motion.h2>
            
            {[
              "The best for every budget",
              "Quality work done quickly",
              "Protected payments, every time",
              "24/7 support",
            ].map((text, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                whileHover={{ x: 10 }}
                className="transform transition duration-300"
              >
                <div className="flex items-center gap-4 text-xl font-semibold text-gray-800 mb-3">
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    <FontAwesomeIcon icon={faCheck} className="text-white text-sm" />
                  </motion.div>
                  {text}
                </div>
                <p className="text-gray-600 ml-14 text-lg">
                  {index === 0
                    ? "Find high-quality services at every price point. No hourly rates, just project-based pricing."
                    : index === 1
                    ? "Find the right freelancer to begin working on your project within minutes."
                    : index === 2
                    ? "Always know what you'll pay upfront. Your payment isn't released until you approve the work."
                    : "Questions or concerns? Our dedicated support team is ready to help, anytime."}
                </p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="flex-1"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur opacity-30"></div>
              <div className="absolute -inset-1 bg-white/50 rounded-2xl blur-sm"></div>
              <video 
                className="relative w-full rounded-xl shadow-2xl border-4 border-white" 
                src="./img/video.mp4" 
                controls 
              />
              <motion.div
                className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 3,
                }}
              >
                <span className="text-white text-sm font-bold">Watch Now</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Explore Marketplace */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-32 bg-white relative overflow-hidden"
      >
        <div className="parallax absolute top-0 left-0 w-full h-full" data-speed="-0.05">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-blue-50"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-green-50"></div>
          <div className="absolute top-40 right-40 w-40 h-40 rounded-full bg-yellow-50"></div>
          <div className="absolute bottom-40 left-40 w-60 h-60 rounded-full bg-purple-50"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <motion.h2 
              className="text-5xl font-bold text-gray-800 mb-4"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "linear" 
              }}
              style={{
                backgroundImage: "linear-gradient(90deg, #16a34a, #0ea5e9, #16a34a)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Explore the marketplace
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover services that power your business and creative endeavors
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8"
            variants={staggerContainer}
          >
            {[
              { title: "Graphics & Design", icon: "graphics-design.d32a2f8.svg" },
              { title: "Digital Marketing", icon: "online-marketing.74e221b.svg" },
              { title: "Writing & Translation", icon: "writing-translation.32ebe2e.svg" },
              { title: "Video & Animation", icon: "video-animation.f0d9d71.svg" },
              { title: "Music & Audio", icon: "music-audio.320af20.svg" },
              { title: "Programming & Tech", icon: "programming.9362366.svg" },
              { title: "Business", icon: "business.bbdf319.svg" },
              { title: "Lifestyle", icon: "lifestyle.745b575.svg" },
              { title: "Data", icon: "data.718910f.svg" },
              { title: "Photography", icon: "photography.01cf943.svg" },
            ].map(({ title, icon }, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  y: -10
                }}
                className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md transition-all duration-300"
              >
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-green-50 to-blue-50 rounded-full flex items-center justify-center mb-4 overflow-hidden"
                  whileHover={{ rotate: 5 }}
                >
                  <motion.img
                    src={`https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/${icon}`}
                    alt={title}
                    className="w-12 h-12"
                    whileHover={{ scale: 1.2 }}
                  />
                </motion.div>
                <motion.div 
                  className="w-12 h-0.5 bg-gray-200 my-3"
                  whileHover={{ width: 64, backgroundColor: "#10b981" }}
                  transition={{ type: "tween" }}
                ></motion.div>
                <span className="text-gray-700 font-medium text-center">{title}</span>
                <motion.div
                  className="mt-3 opacity-0 group-hover:opacity-100 flex items-center gap-1 text-green-500 font-medium"
                  initial={{ height: 0 }}
                  whileHover={{ height: "auto" }}
                >
                  <span>Explore</span>
                  <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Business Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-32 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full opacity-10"
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"]
          }}
          transition={{ 
            repeat: Infinity,
            repeatType: "reverse",
            duration: 20,
            ease: "linear"
          }}
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"%23ffffff\" fill-opacity=\"0.1\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')",
            backgroundSize: "30px 30px"
          }}
        ></motion.div>
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-20 px-5 md:px-10 relative z-10">
          <motion.div 
            className="flex-1 space-y-8"
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-block bg-gradient-to-r from-blue-400 to-green-400 px-6 py-3 rounded-full shadow-lg mb-6"
            >
              <h3 className="text-2xl font-bold flex items-center gap-2">
                liverr <span className="font-light">business</span>
                <motion.div
                  animate={{ 
                    rotate: 360
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 10,
                    ease: "linear"
                  }}
                >
                  <FontAwesomeIcon icon={faStar} className="text-yellow-300 ml-1" />
                </motion.div>
              </h3>
            </motion.div>
            
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl font-bold leading-tight"
            >
              A business solution <br/>designed for <motion.span 
                className="font-light italic"
                animate={{ 
                  color: ["#ffffff", "#4ade80", "#ffffff"]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity
                }}
              >teams</motion.span>
            </motion.h2>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-blue-100"
            >
              Upgrade to a curated experience packed with tools and benefits, dedicated to businesses
            </motion.p>
            
            {[
              "Connect to freelancers with proven business experience",
              "Get matched with the perfect talent by a customer success manager",
              "Manage teamwork and boost productivity with one powerful workspace",
            ].map((text, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="flex items-center gap-4 text-lg"
                whileHover={{ x: 10 }}
              >
                <motion.div 
                  className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.2 }}
                >
                  <FontAwesomeIcon icon={faCheck} className="text-blue-900 text-sm" />
                </motion.div>
                <span>{text}</span>
              </motion.div>
            ))}
            
            <motion.button 
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 px-8 rounded-lg shadow-xl transition duration-300 font-bold text-lg group flex items-center gap-3"
            >
              Explore Liverr Business
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5
                }}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </motion.span>
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="flex-1"
            variants={fadeInUp}
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute -inset-3 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-lg blur opacity-30"></div>
              <div className="relative">
                <img
                  className="w-full rounded-lg shadow-2xl"
                  src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
                  alt="Business Services"
                />
                <motion.div 
                  className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 flex items-center gap-2"
                  animate={{ 
                    y: [0, -8, 0]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 3
                  }}
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faStar} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Trusted by</p>
                    <p className="text-sm font-bold text-blue-900">10,000+ businesses</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Projects Slide Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-28 bg-gradient-to-b from-gray-50 to-white relative"
      >
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="text-5xl font-bold text-gray-800 mb-3">
              Inspiring <span className="text-green-500">projects</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              Discover handpicked work from talented freelancers around the world
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            className="mb-12"
          >
            <Slide slidesToShow={4} arrowsScroll={4}>
              {projects.map((card) => (
                <motion.div
                  key={card.id}
                  whileHover={{ 
                    y: -15,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <ProjectCard card={card} />
                </motion.div>
              ))}
            </Slide>
          </motion.div>
          
          <motion.div 
            className="flex justify-center"
            variants={fadeInUp}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-8 rounded-full shadow-lg flex items-center gap-3 font-semibold"
            >
              Discover all projects
              <motion.span
                animate={{ 
                  x: [0, 5, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5,
                }}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Newsletter Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-24 bg-gradient-to-r from-green-900 to-green-800 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-20 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_10%,_transparent_10.01%)] bg-[length:20px_20px]"></div>
        <div className="absolute bottom-0 right-0 w-full h-20 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_10%,_transparent_10.01%)] bg-[length:20px_20px]"></div>
        
        <div className="max-w-4xl mx-auto px-5 text-center relative z-10">
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to start growing with us?
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-green-100 mb-10 max-w-2xl mx-auto"
          >
            Join thousands of businesses and freelancers who are already thriving on our platform
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-96 px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-green-400/50"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto whitespace-nowrap bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-lg shadow-xl font-bold"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
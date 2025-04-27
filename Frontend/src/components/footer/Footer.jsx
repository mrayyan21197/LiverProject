import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebookF, faLinkedinIn, faPinterest, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faDollarSign, faUniversalAccess } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      color: "#10B981",
      transition: {
        duration: 0.3
      }
    }
  };

  const listItemVariants = {
    hover: {
      x: 5,
      color: "#10B981",
      transition: { duration: 0.2 }
    }
  };

  const sectionHeadingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  // Categories with their items
  const categories = [
    {
      title: "Categories",
      items: ["Graphics & Design", "Digital Marketing", "Writing & Translation", "Video & Animation", "Music & Audio", "Programming & Tech", "Data", "Business", "Lifestyle", "Photography", "Sitemap"]
    },
    {
      title: "About",
      items: ["Press & News", "Partnerships", "Privacy Policy", "Terms of Service", "Intellectual Property Claims", "Investor Relations", "Contact Sales"]
    },
    {
      title: "Support",
      items: ["Help & Support", "Trust & Safety", "Selling on Liverr", "Buying on Liverr"]
    },
    {
      title: "Community",
      items: ["Customer Success Stories", "Community Hub", "Forum", "Events", "Blog", "Influencers", "Affiliates", "Podcast", "Invite a Friend", "Become a Seller", "Community Standards"]
    },
    {
      title: "More From Fiverr",
      items: ["Liverr Business", "Liverr Pro", "Liverr Logo Maker", "Liverr Guides", "Get Inspired", "Liverr Select", "ClearVoice", "Liverr Workspace", "Learn", "Working Not Working"]
    }
  ];

  const socialIcons = [
    { icon: faTwitter, color: "#1DA1F2" },
    { icon: faFacebookF, color: "#4267B2" },
    { icon: faLinkedinIn, color: "#0077B5" },
    { icon: faPinterest, color: "#E60023" },
    { icon: faInstagram, color: "#C13584" }
  ];

  return (
    <motion.footer 
      className="flex justify-center text-gray-600 mt-12 mb-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-6xl px-6">
        {/* Top Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              onHoverStart={() => setHoveredCategory(idx)}
              onHoverEnd={() => setHoveredCategory(null)}
            >
              <motion.h2 
                className="text-gray-700 font-semibold mb-3"
                variants={sectionHeadingVariants}
              >
                {category.title}
                <motion.div 
                  className="h-0.5 bg-green-500 mt-1"
                  initial={{ width: 0 }}
                  animate={{ width: hoveredCategory === idx ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.h2>
              <ul className="space-y-1 text-sm">
                {category.items.map((item, itemIdx) => (
                  <motion.li 
                    key={itemIdx}
                    variants={listItemVariants}
                    whileHover="hover"
                    className="cursor-pointer"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider with animation */}
        <motion.hr 
          className="my-6 border-gray-300"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 1.5 }}
        />

        {/* Bottom Section */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <motion.h2 
              className="text-lg font-bold text-gray-800"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                delay: 1 
              }}
            >
              Liverr
            </motion.h2>
            <motion.span 
              className="text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              © Liverr International Ltd. 2023
            </motion.span>
          </div>

          <div className="flex items-center gap-6">
            {/* Social Media Icons with hover animations */}
            <div className="flex gap-4 text-gray-500">
              {socialIcons.map((social, idx) => (
                <motion.div
                  key={idx}
                  variants={socialIconVariants}
                  whileHover="hover"
                >
                  <FontAwesomeIcon 
                    icon={social.icon} 
                    className="text-xl cursor-pointer" 
                  />
                </motion.div>
              ))}
            </div>

            {/* Language and Currency */}
            <motion.div 
              className="flex items-center gap-2 text-gray-600 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <FontAwesomeIcon icon={faGlobe} className="text-lg" />
              <span>English</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 text-gray-600 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <FontAwesomeIcon icon={faDollarSign} className="text-lg" />
              <span>USD</span>
            </motion.div>

            <motion.div
              whileHover={{ 
                scale: 1.2, 
                rotate: 360,
                transition: { duration: 0.5 }
              }}
            >
              <FontAwesomeIcon 
                icon={faUniversalAccess} 
                className="text-xl text-gray-500 cursor-pointer" 
              />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Fun floating elements in the background */}
        <div className="relative">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute hidden md:block w-2 h-2 rounded-full bg-green-400 opacity-70"
              initial={{ 
                x: Math.random() * 100 - 50 + "%", 
                y: Math.random() * 100 - 50 + "%" 
              }}
              animate={{
                x: [
                  Math.random() * 100 - 50 + "%", 
                  Math.random() * 100 - 50 + "%",
                  Math.random() * 100 - 50 + "%"
                ],
                y: [
                  Math.random() * 100 - 50 + "%", 
                  Math.random() * 100 - 50 + "%",
                  Math.random() * 100 - 50 + "%"
                ],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
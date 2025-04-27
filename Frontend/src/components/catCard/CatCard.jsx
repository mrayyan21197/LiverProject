// import React from "react";
// import { Link } from "react-router-dom";

// const CatCard = ({ card }) => {
//   return (
//     <Link to="/gigs?cat=design">
//       <div className="relative w-[252px] h-[344px] text-white rounded-lg cursor-pointer overflow-hidden transition-transform hover:scale-105">
//         <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
//         <span className="absolute top-4 left-4 text-sm font-light">{card.desc}</span>
//         <span className="absolute top-10 left-4 text-2xl font-semibold">{card.title}</span>
//       </div>
//     </Link>
//   );
// };

// export default CatCard;
import React from "react";
import { motion } from "framer-motion";

const CatCard = ({ card, isHovered, onMouseEnter, onMouseLeave }) => {
  return (

      <motion.div 
        className="relative w-[252px] h-[344px] text-white rounded-lg cursor-pointer overflow-hidden mx-auto"
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.3 } 
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Overlay gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10"
          animate={{ 
            opacity: isHovered ? 0.8 : 0.6 
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Background image */}
        <motion.img 
          src={card.img} 
          alt={card.title} 
          className="w-full h-full object-cover"
          animate={{ 
            scale: isHovered ? 1.1 : 1 
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Content */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full p-6 z-20"
          animate={{ 
            y: isHovered ? -10 : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.span 
            className="block text-sm font-light text-gray-200 mb-2"
            animate={{ 
              opacity: isHovered ? 1 : 0.8 
            }}
          >
            {card.desc}
          </motion.span>
          
          <motion.span 
            className="block text-2xl font-semibold"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              originX: 0
            }}
            transition={{ duration: 0.3 }}
          >
            {card.title}
          </motion.span>
          
          {/* Call to action button appears on hover */}
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.button 
              className="bg-white text-green-800 px-4 py-2 rounded-md font-medium text-sm hover:bg-green-500 hover:text-white transition-colors duration-300"
              whileTap={{ scale: 0.95 }}
            >
              Explore Now
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
  );
};

export default CatCard;
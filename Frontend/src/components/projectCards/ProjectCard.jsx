// import React from "react";

// const ProjectCard = ({ card }) => {
//   return (
//     <div className="w-[300px] h-[300px] rounded-md overflow-hidden cursor-pointer border border-gray-200 transition-transform hover:scale-105 ">
//       {/* Project Image */}
//       <img src={card.img} alt="Project" className="w-full h-[70%] object-cover" />

//       {/* User Info */}
//       <div className="flex items-center gap-5 p-4">
//         {/* Profile Picture */}
//         <img src={card.pp} alt={card.username} className="w-10 h-10 rounded-full object-cover" />

//         {/* Text Details */}
//         <div className="flex flex-col">
//           <h2 className="text-sm font-semibold">{card.cat}</h2>
//           <span className="text-sm text-gray-500">{card.username}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;
import React from "react";
import { motion } from "framer-motion";
const ProjectCard = ({ card, isHovered, onMouseEnter, onMouseLeave }) => {
  return (
      <motion.div 
        className="w-[300px] h-[320px] rounded-xl overflow-hidden cursor-pointer border border-gray-200 bg-white shadow-sm mx-auto"
        whileHover={{ 
          scale: 1.03,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Project Image with overlay on hover */}
        <div className="relative w-full h-[200px] overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 z-10"
            animate={{ opacity: isHovered ? 0.6 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.img 
            src={card.img} 
            alt="Project" 
            className="w-full h-full object-cover"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.5 }}
          />
          
          {/* View project button appears on hover */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button 
              className="bg-white text-green-700 px-6 py-2 rounded-md font-semibold shadow-lg hover:bg-green-500 hover:text-white transition-colors duration-300"
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20 }}
              animate={{ y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              View Project
            </motion.button>
          </motion.div>
        </div>
          
        {/* User Info */}
        <div className="p-5">
          <motion.div 
            className="flex items-center gap-4"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Profile Picture */}
            <motion.img 
              src={card.pp} 
              alt={card.username} 
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
            
            {/* Text Details */}
            <div className="flex flex-col">
              <motion.h2 
                className="text-lg font-semibold text-gray-800"
                animate={{ 
                  color: isHovered ? "#047857" : "#1f2937" 
                }}
                transition={{ duration: 0.3 }}
              >
                {card.cat}
              </motion.h2>
              <motion.span className="text-sm text-gray-500">
                by <span className="font-medium">{card.username}</span>
              </motion.span>
            </div>
          </motion.div>
          
          {/* Rating appears on hover */}
          <motion.div 
            className="mt-3 flex items-center gap-1"
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.svg 
                key={star} 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 text-yellow-400 fill-current" 
                viewBox="0 0 20 20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.2, delay: 0.1 + star * 0.05 }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
            <motion.span 
              className="text-sm text-gray-600 ml-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              5.0 (24 reviews)
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
  );
};

export default ProjectCard;
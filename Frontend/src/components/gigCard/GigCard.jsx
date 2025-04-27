// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar, faHeart, faCheck } from "@fortawesome/free-solid-svg-icons";

// const GigCard = (props) => {
//   const [isHovered, setIsHovered] = useState(false);
  
//   // Calculate average rating from reviews
//   const calculateAverageRating = () => {
//     if (!props.item.reviews || props.item.reviews.length === 0) {
//       return 5; // Default rating if no reviews
//     }
    
//     const totalRating = props.item.reviews.reduce((sum, review) => sum + review.rating, 0);
//     return (totalRating / props.item.reviews.length).toFixed(1);
//   };
  
//   const averageRating = calculateAverageRating();
  
//   // Convert USD to PKR (using an approximate exchange rate of 1 USD = 280 PKR)
//   const priceInPKR = Math.round(props.item.price * 280);
  
//   return (
//     <Link to={`/gig/${props.item._id}`} className="no-underline">
//       <div 
//         className="w-full max-w-xs bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {/* Top rating badge - NEW */}
//         <div className="absolute z-10 top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center">
//           <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
//           <span className="font-bold">{averageRating}</span>
//           <span className="text-gray-500 text-xs ml-1">
//             ({props.item.reviews ? props.item.reviews.length : 0})
//           </span>
//         </div>
        
//         <img
//           src={props.item.coverimage}
//           className="w-full h-44 object-cover"
//           alt="Gig Image"
//         />
        
//         <div className="p-4">
//           <div className="flex items-center justify-between mb-2">
//             <div className="flex items-center">
//               <img
//                 src={props.item.freelancer_id.full_verification[0].profile_pic}
//                 alt="User"
//                 className="w-8 h-8 rounded-full object-cover"
//               />
//               <span className="ml-2 font-bold">
//                 {props.item.freelancer_id.full_verification[0].full_name}
//               </span>
//             </div>
//             <span className="text-gray-500 text-sm font-medium">Level: 2</span>
//           </div>
          
//           <p className="text-gray-600 text-sm truncate">
//             {props.item.description}
//           </p>
          
//           {/* Tags - NEW */}
//           {props.item.gig_tags && props.item.gig_tags.length > 0 && (
//             <div className="flex flex-wrap gap-1 mt-2">
//               {props.item.gig_tags.slice(0, 2).map((tag, index) => (
//                 <span 
//                   key={index}
//                   className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           )}
          
//           {/* Delivery time - NEW */}
//           <div className="flex items-center mt-2 text-xs text-gray-500">
//             <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-1" />
//             <span>{props.item.delivery_time} day delivery</span>
//           </div>
          
//           <hr className="border-gray-200 my-3" />
          
//           <div className="flex justify-between items-center">
//             <FontAwesomeIcon
//               icon={faHeart}
//               className="text-red-400 cursor-pointer text-lg hover:text-red-600 transition-colors"
//             />
            
//             <div className="text-right">
//               <span className="text-gray-500 text-xs">Starting at</span>
//               <h5 className="text-lg font-bold text-black">
//                 {isHovered ? (
//                   <span className="text-green-500">PKR {priceInPKR}</span>
//                 ) : (
//                   <span>${props.item.price}</span>
//                 )}
//               </h5>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default GigCard;
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCheck, faClock } from "@fortawesome/free-solid-svg-icons";

const GigCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate average rating from reviews
  const calculateAverageRating = () => {
    if (!props.item.reviews || props.item.reviews.length === 0) {
      return 5; // Default rating if no reviews
    }
    
    const totalRating = props.item.reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / props.item.reviews.length).toFixed(1);
  };
  
  const averageRating = calculateAverageRating();
  
  // Calculate satisfaction based on average rating
  const calculateSatisfaction = () => {
    if (!props.item.reviews || props.item.reviews.length === 0) {
      return 100; // 100% satisfaction if no reviews
    }
    
    // Convert rating to percentage (assuming rating is out of 5)
    return Math.round((averageRating / 5) * 100);
  };
  
  const satisfaction = calculateSatisfaction();
  
  // Convert USD to PKR (using an approximate exchange rate of 1 USD = 280 PKR)
  const priceInPKR = Math.round(props.item.price * 280);
  
  // Array of possible seller levels
  const sellerLevels = [
    "Level 1 Seller",
    "Level 2 Seller",
    "Level 3 Seller",
    "Top Rated Seller",
    "Fiverr Pro"
  ];
  
  // Randomly assign a seller level (use useMemo to keep it consistent between renders)
  const sellerLevel = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * sellerLevels.length);
    return sellerLevels[randomIndex];
  }, [props.item._id]); // Re-calculate only if the gig item changes
  
  return (
    <Link to={`/gig/${props.item._id}`} className="no-underline">
      <div 
        className="w-full max-w-xs bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container with gradient overlay */}
        <div className="relative">
          <img
            src={props.item.coverimage}
            className="w-full h-48 object-cover"
            alt="Gig Image"
          />
          
          {/* Rating badge with better styling */}
          <div className="absolute z-10 top-3 right-3 bg-white px-2 py-1 rounded-lg shadow-sm flex items-center">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
            <span className="font-bold">{averageRating}</span>
            <span className="text-gray-600 text-xs ml-1">
              ({props.item.reviews ? props.item.reviews.length : 0})
            </span>
          </div>
        </div>
        
        <div className="p-4">
          {/* User info with better spacing */}
          <div className="flex items-center mb-3">
            <div className="relative">
              <img
                src={props.item.freelancer_id.full_verification[0].profile_pic}
                alt="User"
                className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-3 h-3 border border-white"></div>
            </div>
            <div className="ml-2">
              <span className="text-sm font-bold block">
                {props.item.freelancer_id.full_verification[0].full_name}
              </span>
              <span className="text-xs text-gray-500">{sellerLevel}</span>
            </div>
          </div>
          
          {/* Description with better typography */}
          <p className="text-gray-700 text-sm font-medium line-clamp-2 mb-3">
            {props.item.description}
          </p>
          
          {/* Tags with improved styling */}
          {props.item.gig_tags && props.item.gig_tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {props.item.gig_tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Delivery info with better icons */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faClock} className="text-gray-400 mr-1" />
              <span>{props.item.delivery_time} day delivery</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-1" />
              <span>{satisfaction}% Satisfaction</span>
            </div>
          </div>
          
          <div className="mt-1 pt-3 border-t border-gray-100">
            <div className="flex justify-end items-center">
              <div className="text-right">
                <span className="text-gray-500 text-xs block">Starting at</span>
                <h5 className={`text-lg font-bold transition-colors duration-300 ${isHovered ? 'text-green-500' : 'text-black'}`}>
                  {isHovered ? `PKR ${priceInPKR}` : `$${props.item.price}`}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
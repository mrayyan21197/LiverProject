// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const Slide = ({ children, slidesToShow, arrowsScroll }) => {
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: slidesToShow || 3,
//     slidesToScroll: arrowsScroll || 1,
//     arrows: true,
//   };

//   return (
//     <div className="flex justify-center py-10 bg-gray-100">
//       <div className="w-full max-w-6xl">
//         <Slider {...settings}>{children}</Slider>
//       </div>
//     </div>
//   );
// };

// export default Slide;
import React, { useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button 
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-green-600 hover:scale-110 transition-all duration-300 mr-4 opacity-90 hover:opacity-100"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button 
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-green-600 hover:scale-110 transition-all duration-300 ml-4 opacity-90 hover:opacity-100"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  );
};

const Slide = ({ children, slidesToShow, arrowsScroll, background = "bg-gray-50", title }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow || 3,
    slidesToScroll: arrowsScroll || 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(slidesToShow - 1, 3),
          slidesToScroll: Math.min(arrowsScroll - 1, 3),
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(slidesToShow - 2, 2),
          slidesToScroll: Math.min(arrowsScroll - 2, 2),
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
    beforeChange: (current, next) => {
      setHoveredIndex(null);
    }
  };

  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { 
        isHovered: index === hoveredIndex,
        onMouseEnter: () => setHoveredIndex(index),
        onMouseLeave: () => setHoveredIndex(null) 
      });
    }
    return child;
  });

  return (
    <div className={`py-16 ${background}`}>
      <motion.div 
        className="w-full max-w-7xl mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {title && (
          <div className="text-center mb-10">
            <motion.h3 
              className="text-3xl font-bold text-gray-800 mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {title}
            </motion.h3>
            <motion.div 
              className="w-20 h-1 bg-green-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            ></motion.div>
          </div>
        )}
        
        <div className="relative slider-container">
          <Slider {...settings}>{childrenWithProps}</Slider>
        </div>
      </motion.div>
    </div>
  );
};

export default Slide;
// import React from "react";

// const TrustedBy = () => {
//   return (
//     <div className="bg-gray-100 h-[100px] flex justify-center">
//       <div className="max-w-[760px] flex items-center gap-5 text-gray-400 font-medium">
//         <span>Trusted by:</span>
//         {[
//           "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.188a797.png",
//           "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.06d74c8.png",
//           "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.887e47e.png",
//           "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg2x.6dc32e4.png",
//           "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.22728be.png",
//         ].map((src, index) => (
//           <img key={index} src={src} alt="Trusted Brand" className="h-[50px] object-contain transition-transform hover:scale-105" />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrustedBy;
import React from "react";
import { motion } from "framer-motion";

const TrustedBy = () => {
  const brandLogos = [
    {
      src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.188a797.png",
      alt: "Facebook"
    },
    {
      src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.06d74c8.png",
      alt: "Google"
    },
    {
      src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.887e47e.png", 
      alt: "Netflix"
    },
    {
      src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg2x.6dc32e4.png",
      alt: "P&G"
    },
    {
      src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.22728be.png",
      alt: "PayPal"
    },
  ];

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="text-gray-500 font-medium text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Trusted by:
          </motion.span>
          
          {brandLogos.map((brand, index) => (
            <motion.div
              key={index}
              className="hover:shadow-md p-2 rounded-md hover:bg-white transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.05,
                rotate: [-1, 1, -1, 0],
                transition: { duration: 0.3 }
              }}
            >
              <img 
                src={brand.src} 
                alt={brand.alt} 
                className="h-[40px] md:h-[50px] object-contain grayscale hover:grayscale-0 transition-all duration-300" 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TrustedBy;
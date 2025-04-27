// import React, { useState, useEffect } from "react";
// import "./VerificationPage.css";
// import { Plus } from 'lucide-react';
// import axios from "axios";

// const VerificationPage = () => {
//   const [step, setStep] = useState(1);
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [country, setCountry] = useState("");
//   const [cnic, setCnic] = useState("");
//   const [skills, setSkills] = useState([{ name: "", level: "Beginner" }]);
//   const [education, setEducation] = useState([{ country: "", university: "", title: "", major: "", year: "" }]);
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [isSeller, setIsSeller] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Check user role from localStorage on component mount
//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
//     const userIsSeller = currentUser.isSeller;
//     setIsSeller(userIsSeller);
//   }, []);

//   // Validation functions for each step
//   const validateStep1 = () => {
//     return firstName.trim() !== "" &&
//            lastName.trim() !== "" &&
//            country !== "" &&
//            cnic.trim() !== "" &&
//            profilePhoto !== null;
//   };

//   const validateStep2 = () => {
//     // Check if all skills have a name
//     const validSkills = skills.every(skill => skill.name.trim() !== "");

//     // Check if all education entries have all required fields
//     const validEducation = education.every(
//       edu => edu.country.trim() !== "" &&
//              edu.university.trim() !== "" &&
//              edu.title.trim() !== "" &&
//              edu.major.trim() !== "" &&
//              edu.year.trim() !== ""
//     );

//     return validSkills && validEducation;
//   };

//   const validateStep3 = () => {
//     return password.trim() !== "" &&
//            confirmPassword.trim() !== "" &&
//            password === confirmPassword &&
//            agreeToTerms;
//   };

//   // Check if current step is valid
//   const isCurrentStepValid = () => {
//     if (step === 1) return validateStep1();
//     if (step === 2 && isSeller) return validateStep2();
//     if (step === 2 && !isSeller) return validateStep3(); // Security step is step 2 for non-sellers
//     if (step === 3) return validateStep3();
//     return false;
//   };

//   // Handle next step with correct logic for both user types
//   const handleNext = () => {
//     if (!isCurrentStepValid()) {
//       setError("Please fill in all required fields before proceeding.");
//       return;
//     }

//     setError("");

//     if (isSeller) {
//       // For sellers: normal 3-step flow
//       if (step < 3) {
//         setStep(step + 1);
//       } else {
//         handleSubmit();
//       }
//     } else {
//       // For non-sellers: 2-step flow
//       if (step === 1) {
//         setStep(2); // Go directly to security step (which is step 2 for non-sellers)
//       } else {
//         handleSubmit();
//       }
//     }
//   };

//   // Handle previous step with correct logic for both user types
//   const handlePrev = () => {
//     setError("");

//     if (step > 1) {
//       setStep(step - 1);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // In a real app, you would upload this file to a server and get a URL
//       // For now, we'll use a local object URL
//       setProfilePhoto(`/img/${file.name}`);
//     }
//   };

//   // Submit form data to API
//   const handleSubmit = async () => {
//     setIsLoading(true);
//     setError("");

//     try {
//       const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
//       const userId = currentUser.id;

//       if (!userId) {
//         setError("User ID not found. Please log in again.");
//         setIsLoading(false);
//         return;
//       }

//       // Prepare the API request data
//       const requestData = {
//         userId,
//         full_verification: {
//           full_name: `${firstName} ${lastName}`,
//           profile_pic: profilePhoto,
//           country: country,
//           cnic: cnic
//         }
//       };

//       // Only include freelancer portfolio data if the user is a seller
//       if (isSeller) {
//         // Prepare education data in the format expected by the API
//         const formattedEducation = education.map(edu => ({
//           degree: `${edu.title} in ${edu.major} from ${edu.university}`,
//           graduation_year: parseInt(edu.year)
//         }));

//         requestData.freelancer_portfolio = {
//           education: formattedEducation,
//           skills: skills.map(skill => ({
//             name: skill.name,
//             level: skill.level
//           }))
//         };
//       } else {
//         // For non-sellers, include an empty portfolio to avoid validation issues on the backend
//         requestData.freelancer_portfolio = {
//           education: [],
//           skills: []
//         };
//       }

//       // Make the API request with explicit configuration
//       const response = await axios({
//         method: 'post',
//         url: 'http://localhost:3000/api/auth/professional_info',
//         data: requestData,
//         headers: {
//           'Content-Type': 'application/json',
//           // Include authentication token if needed
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         timeout: 10000 // 10 seconds timeout
//       });

//       if (response.status === 201) {
//         alert("Verification completed successfully!");
//         console.log(requestData);
//         setProfilePhoto(null);
//         setFirstName("");
//         setLastName("");
//         setCountry("");
//         setCnic("");
//         setSkills([{ name: "", level: "Beginner" }]);
//         setEducation([{ country: "", university: "", title: "", major: "", year: "" }]);
//         setPassword("");
//         setConfirmPassword("");
//         setAgreeToTerms(false);
//         setStep(1);
//       }
//     } catch (error) {
//       console.error("Error submitting verification data:", error);

//       if (error.response) {
//         // The request was made and the server responded with a status code outside of 2xx
//         setError(`Server error: ${error.response.data.error || error.response.status}`);
//       } else if (error.request) {
//         // The request was made but no response was received
//         setError("No response from server. Please check your internet connection and try again.");
//       } else {
//         // Something happened in setting up the request
//         setError(`Error: ${error.message}`);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="verification-container max-w-4xl mx-auto mt-24 p-8 bg-white shadow-lg rounded-xl border border-gray-200 py-8">
//       {/* Progress Bar - Different for sellers and non-sellers */}
//       <div className="relative flex justify-between items-center mb-8">
//         <div className="flex items-center w-full">
//           {/* Show either 2 or 3 steps based on user type */}
//           {(isSeller ? [1, 2, 3] : [1, 2]).map((num, index, array) => (
//             <div key={num} className="flex flex-col items-center" style={{ width: `${100 / array.length}%` }}>
//               <div
//                 className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all duration-300 ${
//                   step >= num ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
//                 }`}
//               >
//                 {num}
//               </div>
//               {index < array.length - 1 && (
//                 <div
//                   className={`h-1 w-full progress-bar ${
//                     step > num ? "bg-green-500" : "bg-gray-300"
//                   }`}
//                 ></div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Error message display */}
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}

//       {/* Step 1: Personal Info - Shown to all users */}
//       {step === 1 && (
//         <>
//           <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">👤 Personal Information</h2>
//           <div className="flex flex-col items-center">
//             <label className="text-lg font-medium mb-4">Profile Picture <span className="text-red-500">*</span></label>

//             {/* Modern File Upload with + icon */}
//             <div className="relative">
//               <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" accept="image/*" required />
//               {profilePhoto ? (
//                 <div className="relative">
//                   <img
//                     src={profilePhoto}
//                     alt="Preview"
//                     className="w-24 h-24 rounded-full object-cover border-2 border-green-500 shadow-md"
//                   />
//                   <label
//                     htmlFor="fileInput"
//                     className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-green-600 transition-colors"
//                   >
//                     <Plus className="w-4 h-4 text-white" />
//                   </label>
//                 </div>
//               ) : (
//                 <label
//                   htmlFor="fileInput"
//                   className="w-24 h-24 rounded-full border-2 border-dashed border-green-500 flex items-center justify-center cursor-pointer hover:bg-green-50 transition-colors"
//                 >
//                   <Plus className="w-8 h-8 text-green-500" />
//                 </label>
//               )}
//             </div>
//             {!profilePhoto && (
//               <p className="text-sm text-red-500 mt-2">Profile picture is required</p>
//             )}
//           </div>
//           <div className="mt-6 space-y-4">
//             <div>
//               <input
//                 type="text"
//                 placeholder="First Name *"
//                 className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 required
//               />
//               {firstName.trim() === "" && (
//                 <p className="text-sm text-red-500 mt-1">First name is required</p>
//               )}
//             </div>
//             <div>
//               <input
//                 type="text"
//                 placeholder="Last Name *"
//                 className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 required
//               />
//               {lastName.trim() === "" && (
//                 <p className="text-sm text-red-500 mt-1">Last name is required</p>
//               )}
//             </div>
//             <div>
//               <select
//                 className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
//                 value={country}
//                 onChange={(e) => setCountry(e.target.value)}
//                 required
//               >
//                 <option value="">Select Country *</option>
//                 <option value="US">United States</option>
//                 <option value="UK">United Kingdom</option>
//                 <option value="CA">Canada</option>
//                 <option value="AU">Australia</option>
//                 <option value="DE">Germany</option>
//                 <option value="FR">France</option>
//                 <option value="IN">India</option>
//                 <option value="JP">Japan</option>
//                 <option value="BR">Brazil</option>
//                 <option value="Other">Other</option>
//               </select>
//               {country === "" && (
//                 <p className="text-sm text-red-500 mt-1">Country selection is required</p>
//               )}
//             </div>
//             <div>
//               <input
//                 type="text"
//                 placeholder="CNIC No *"
//                 className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
//                 value={cnic}
//                 onChange={(e) => setCnic(e.target.value)}
//                 required
//               />
//               {cnic.trim() === "" && (
//                 <p className="text-sm text-red-500 mt-1">CNIC number is required</p>
//               )}
//             </div>
//           </div>
//         </>
//       )}

//       {/* Step 2: Professional Info - Only shown to sellers */}
//       {step === 2 && isSeller && (
//         <>
//           <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">💼 Professional Info</h2>

//           {/* Skills */}
//           <label className="block font-medium mb-2">Skills <span className="text-red-500">*</span></label>
//           {skills.map((skill, index) => (
//             <div key={index} className="flex space-x-3 mb-3">
//               <input
//                 type="text"
//                 placeholder="Skill name *"
//                 className="w-2/3 p-3 border rounded-lg"
//                 value={skill.name}
//                 onChange={(e) => {
//                   const newSkills = [...skills];
//                   newSkills[index].name = e.target.value;
//                   setSkills(newSkills);
//                 }}
//                 required
//               />
//               <select
//                 className="w-1/3 p-3 border rounded-lg"
//                 value={skill.level}
//                 onChange={(e) => {
//                   const newSkills = [...skills];
//                   newSkills[index].level = e.target.value;
//                   setSkills(newSkills);
//                 }}
//                 required
//               >
//                 <option value="Beginner">Beginner</option>
//                 <option value="Intermediate">Intermediate</option>
//                 <option value="Expert">Expert</option>
//               </select>
//               <button
//                 type="button"
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//                 onClick={() => {
//                   if (skills.length > 1) {
//                     setSkills(skills.filter((_, i) => i !== index));
//                   } else {
//                     setError("You must have at least one skill.");
//                   }
//                 }}
//               >
//                 ✖
//               </button>
//             </div>
//           ))}
//           {skills.some(skill => skill.name.trim() === "") && (
//             <p className="text-sm text-red-500 mb-2">All skill names are required</p>
//           )}
//           <button
//             type="button"
//             className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
//             onClick={() => setSkills([...skills, { name: "", level: "Beginner" }])}
//           >
//             ➕ Add Skill
//           </button>

//           {/* Education */}
//           <label className="block font-medium mb-2">Education <span className="text-red-500">*</span></label>
//           {education.map((edu, index) => (
//             <div key={index} className="grid grid-cols-2 gap-4 mb-3">
//               <input
//                 type="text"
//                 placeholder="Country *"
//                 className="p-3 border rounded-lg"
//                 value={edu.country}
//                 onChange={(e) => {
//                   const newEducation = [...education];
//                   newEducation[index].country = e.target.value;
//                   setEducation(newEducation);
//                 }}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="University *"
//                 className="p-3 border rounded-lg"
//                 value={edu.university}
//                 onChange={(e) => {
//                   const newEducation = [...education];
//                   newEducation[index].university = e.target.value;
//                   setEducation(newEducation);
//                 }}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Title *"
//                 className="p-3 border rounded-lg"
//                 value={edu.title}
//                 onChange={(e) => {
//                   const newEducation = [...education];
//                   newEducation[index].title = e.target.value;
//                   setEducation(newEducation);
//                 }}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Major *"
//                 className="p-3 border rounded-lg"
//                 value={edu.major}
//                 onChange={(e) => {
//                   const newEducation = [...education];
//                   newEducation[index].major = e.target.value;
//                   setEducation(newEducation);
//                 }}
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="Year *"
//                 className="p-3 border rounded-lg"
//                 value={edu.year}
//                 onChange={(e) => {
//                   const newEducation = [...education];
//                   newEducation[index].year = e.target.value;
//                   setEducation(newEducation);
//                 }}
//                 required
//               />
//               <button
//                 type="button"
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//                 onClick={() => {
//                   if (education.length > 1) {
//                     setEducation(education.filter((_, i) => i !== index));
//                   } else {
//                     setError("You must have at least one education entry.");
//                   }
//                 }}
//               >
//                 ✖
//               </button>
//             </div>
//           ))}
//           {education.some(edu =>
//             edu.country.trim() === "" ||
//             edu.university.trim() === "" ||
//             edu.title.trim() === "" ||
//             edu.major.trim() === "" ||
//             edu.year.trim() === ""
//           ) && (
//             <p className="text-sm text-red-500 mb-2">All education fields are required</p>
//           )}
//           <button
//             type="button"
//             className="bg-gray-500 text-white px-4 py-2 rounded"
//             onClick={() => setEducation([...education, { country: "", university: "", title: "", major: "", year: "" }])}
//           >
//             ➕ Add Education
//           </button>
//         </>
//       )}

//       {/* Security Step: Step 3 for sellers, Step 2 for non-sellers */}
//       {(step === 3 || (step === 2 && !isSeller)) && (
//         <>
//           <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
//             🔒 Account Security
//           </h2>
//           <div className="space-y-4">
//             <div>
//               <input
//                 type="password"
//                 placeholder="Password *"
//                 className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               {password.trim() === "" && (
//                 <p className="text-sm text-red-500 mt-1">Password is required</p>
//               )}
//             </div>
//             <div>
//               <input
//                 type="password"
//                 placeholder="Confirm Password *"
//                 className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//               {confirmPassword.trim() === "" && (
//                 <p className="text-sm text-red-500 mt-1">Confirm password is required</p>
//               )}
//               {password !== confirmPassword && confirmPassword.trim() !== "" && (
//                 <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
//               )}
//             </div>
//           </div>
//           <label className="flex items-center mt-4 space-x-2">
//             <input
//               type="checkbox"
//               required
//               className="w-4 h-4"
//               checked={agreeToTerms}
//               onChange={(e) => setAgreeToTerms(e.target.checked)}
//             />
//             <span>I agree to the Terms and Conditions <span className="text-red-500">*</span></span>
//           </label>
//           {!agreeToTerms && (
//             <p className="text-sm text-red-500 mt-1">You must agree to the terms and conditions</p>
//           )}
//         </>
//       )}

//       {/* Navigation Buttons */}
//       <div className="flex justify-between mt-8">
//         <button
//           type="button"
//           onClick={handlePrev}
//           disabled={step === 1}
//           className={`px-6 py-3 rounded-lg font-semibold transition ${
//             step === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-green-400 hover:bg-green-500 text-white"
//           }`}
//         >
//            Back
//         </button>
//         <button
//           type="button"
//           onClick={handleNext}
//           disabled={isLoading || !isCurrentStepValid()}
//           className={`px-6 py-3 rounded-lg font-semibold transition ${
//             isLoading || !isCurrentStepValid()
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-green-500 hover:bg-green-600 text-white"
//           }`}
//         >
//           {isLoading ? "Processing..." : ((isSeller && step === 3) || (!isSeller && step === 2) ? "Submit" : "Next")}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VerificationPage;
import React, { useState, useEffect } from "react";
import "./VerificationPage.css";
import { Plus } from "lucide-react";
import axios from "axios";

const VerificationPage = () => {
  const [step, setStep] = useState(1);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [cnic, setCnic] = useState("");
  const [skills, setSkills] = useState([{ name: "", level: "Beginner" }]);
  const [education, setEducation] = useState([
    { country: "", university: "", title: "", major: "", year: "" },
  ]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Check user role from localStorage on component mount and fetch user data
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const userIsSeller = currentUser.isSeller;
    setIsSeller(userIsSeller);

    // Fetch user data for two-way binding
    fetchUserData();
  }, []);

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "{}"
      );

      if (!currentUser.id) {
        console.log("No user ID found, user might not be logged in");
        return;
      }

      // Make the API request without authentication header
      const response = await axios.get(
        `http://localhost:3000/api/auth/getUser/${currentUser.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data) {
        populateFormData(response.data?.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Don't show error to user, just log it - this is just pre-filling data
    }
  };

  // Function to populate form fields with fetched data
  const populateFormData = (userData) => {
    // Check if user has completed verification before
    if (userData.full_verification && userData.full_verification.length > 0) {
      const verification = userData.full_verification[0];
      // Set profile photo if exists
      if (verification.profile_pic) {
        setProfilePhoto(verification.profile_pic);
      }

      // Set country if exists
      if (verification.country) {
        setCountry(verification.country);
      }

      // Set CNIC if exists
      if (verification.cnic) {
        setCnic(verification.cnic);
      }

      // Set first and last name from full_name if exists
      if (verification.full_name) {
        const nameParts = verification.full_name.split(" ");
        if (nameParts.length > 0) {
          setFirstName(nameParts[0]);
          if (nameParts.length > 1) {
            setLastName(nameParts.slice(1).join(" "));
          }
        }
      }
    }
    
    // Populate skills and education data for sellers
    if (userData.freelancer_portfolio) {
      // Populate skills if they exist
      if (userData.freelancer_portfolio.skills && userData.freelancer_portfolio.skills.length > 0) {
        setSkills(userData.freelancer_portfolio.skills.map(skill => ({
          name: skill.name || "",
          level: skill.level || "Beginner"
        })));
      }
      
      // Populate education if it exists
      if (userData.freelancer_portfolio.education && userData.freelancer_portfolio.education.length > 0) {
        const formattedEducation = userData.freelancer_portfolio.education.map(edu => {
          // Parse the degree string to extract university, title, and major
          // Assuming format "title in major from university"
          const degreeStr = edu.degree || "";
          let university = "";
          let title = "";
          let major = "";
          
          // Simple parsing logic - can be improved based on actual data format
          const fromIndex = degreeStr.indexOf(" from ");
          if (fromIndex !== -1) {
            university = degreeStr.substring(fromIndex + 6).trim();
            
            const inIndex = degreeStr.indexOf(" in ");
            if (inIndex !== -1 && inIndex < fromIndex) {
              title = degreeStr.substring(0, inIndex).trim();
              major = degreeStr.substring(inIndex + 4, fromIndex).trim();
            }
          }
          
          return {
            country: edu.country || "",
            university: university,
            title: title,
            major: major,
            year: edu.graduation_year ? edu.graduation_year.toString() : ""
          };
        });
        
        if (formattedEducation.length > 0) {
          setEducation(formattedEducation);
        }
      }
    }
  };

  // Validation functions for each step
  const validateStep1 = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      country !== "" &&
      cnic.trim() !== "" &&
      profilePhoto !== null
    );
  };

  const validateStep2 = () => {
    // Check if all skills have a name
    const validSkills = skills.every((skill) => skill.name.trim() !== "");

    // Check if all education entries have all required fields
    const validEducation = education.every(
      (edu) =>
        edu.country.trim() !== "" &&
        edu.university.trim() !== "" &&
        edu.title.trim() !== "" &&
        edu.major.trim() !== "" &&
        edu.year.trim() !== ""
    );

    return validSkills && validEducation;
  };

  const validateStep3 = () => {
    return (
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      password === confirmPassword &&
      agreeToTerms
    );
  };

  // Check if current step is valid
  const isCurrentStepValid = () => {
    if (step === 1) return validateStep1();
    if (step === 2 && isSeller) return validateStep2();
    if (step === 2 && !isSeller) return validateStep3(); // Security step is step 2 for non-sellers
    if (step === 3) return validateStep3();
    return false;
  };

  // Handle next step with correct logic for both user types
  const handleNext = () => {
    if (!isCurrentStepValid()) {
      setError("Please fill in all required fields before proceeding.");
      return;
    }

    setError("");

    if (isSeller) {
      // For sellers: normal 3-step flow
      if (step < 3) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    } else {
      // For non-sellers: 2-step flow
      if (step === 1) {
        setStep(2); // Go directly to security step (which is step 2 for non-sellers)
      } else {
        handleSubmit();
      }
    }
  };

  // Handle previous step with correct logic for both user types
  const handlePrev = () => {
    setError("");

    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this file to a server and get a URL
      // For now, we'll use a local object URL
      setProfilePhoto(`/img/${file.name}`);
    }
  };

  // Submit form data to API
  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "{}"
      );
      const userId = currentUser.id;

      if (!userId) {
        setError("User ID not found. Please log in again.");
        setIsLoading(false);
        return;
      }

      // Prepare the API request data
      const requestData = {
        userId,
        full_verification: {
          full_name: `${firstName} ${lastName}`,
          profile_pic: profilePhoto,
          country: country,
          cnic: cnic,
        },
      };

      // Only include freelancer portfolio data if the user is a seller
      if (isSeller) {
        // Prepare education data in the format expected by the API
        const formattedEducation = education.map((edu) => ({
          degree: `${edu.title} in ${edu.major} from ${edu.university}`,
          graduation_year: parseInt(edu.year),
        }));

        requestData.freelancer_portfolio = {
          education: formattedEducation,
          skills: skills.map((skill) => ({
            name: skill.name,
            level: skill.level,
          })),
        };
      } else {
        // For non-sellers, include an empty portfolio to avoid validation issues on the backend
        requestData.freelancer_portfolio = {
          education: [],
          skills: [],
        };
      }

      // Make the API request with explicit configuration
      const response = await axios.post(
        "http://localhost:3000/api/auth/professional_info",
        requestData
      );

      if (response.status === 201) {
        alert("Verification completed successfully!");
        console.log(requestData);
        setProfilePhoto(null);
        setFirstName("");
        setLastName("");
        setCountry("");
        setCnic("");
        setSkills([{ name: "", level: "Beginner" }]);
        setEducation([
          { country: "", university: "", title: "", major: "", year: "" },
        ]);
        setPassword("");
        setConfirmPassword("");
        setAgreeToTerms(false);
        setStep(1);
      }
    } catch (error) {
      console.error("Error submitting verification data:", error);

      if (error.response) {
        // The request was made and the server responded with a status code outside of 2xx
        setError(
          `Server error: ${error.response.data.error || error.response.status}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        setError(
          "No response from server. Please check your internet connection and try again."
        );
      } else {
        // Something happened in setting up the request
        setError(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="verification-container max-w-4xl mx-auto mt-24 p-8 bg-white shadow-lg rounded-xl border border-gray-200 py-8">
      {/* Progress Bar - Different for sellers and non-sellers */}
      <div className="relative flex justify-between items-center mb-8">
        <div className="flex items-center w-full">
          {/* Show either 2 or 3 steps based on user type */}
          {(isSeller ? [1, 2, 3] : [1, 2]).map((num, index, array) => (
            <div
              key={num}
              className="flex flex-col items-center"
              style={{ width: `${100 / array.length}%` }}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all duration-300 ${
                  step >= num
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {num}
              </div>
              {index < array.length - 1 && (
                <div
                  className={`h-1 w-full progress-bar ${
                    step > num ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Error message display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Step 1: Personal Info - Shown to all users */}
      {step === 1 && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            👤 Personal Information
          </h2>
          <div className="flex flex-col items-center">
            <label className="text-lg font-medium mb-4">
              Profile Picture <span className="text-red-500">*</span>
            </label>

            {/* Modern File Upload with + icon */}
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
                accept="image/*"
                required
              />
              {profilePhoto ? (
                <div className="relative">
                  <img
                    src={profilePhoto}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-green-500 shadow-md"
                  />
                  <label
                    htmlFor="fileInput"
                    className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-green-600 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </label>
                </div>
              ) : (
                <label
                  htmlFor="fileInput"
                  className="w-24 h-24 rounded-full border-2 border-dashed border-green-500 flex items-center justify-center cursor-pointer hover:bg-green-50 transition-colors"
                >
                  <Plus className="w-8 h-8 text-green-500" />
                </label>
              )}
            </div>
            {!profilePhoto && (
              <p className="text-sm text-red-500 mt-2">
                Profile picture is required
              </p>
            )}
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <input
                type="text"
                placeholder="First Name *"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              {firstName.trim() === "" && (
                <p className="text-sm text-red-500 mt-1">
                  First name is required
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name *"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {lastName.trim() === "" && (
                <p className="text-sm text-red-500 mt-1">
                  Last name is required
                </p>
              )}
            </div>
            <div>
              <select
                className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value="">Select Country *</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="IN">India</option>
                <option value="JP">Japan</option>
                <option value="BR">Brazil</option>
                <option value="Other">Other</option>
              </select>
              {country === "" && (
                <p className="text-sm text-red-500 mt-1">
                  Country selection is required
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="CNIC No *"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                required
              />
              {cnic.trim() === "" && (
                <p className="text-sm text-red-500 mt-1">
                  CNIC number is required
                </p>
              )}
            </div>
          </div>
        </>
      )}

      {/* Step 2: Professional Info - Only shown to sellers */}
      {step === 2 && isSeller && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            💼 Professional Info
          </h2>

          {/* Skills */}
          <label className="block font-medium mb-2">
            Skills <span className="text-red-500">*</span>
          </label>
          {skills.map((skill, index) => (
            <div key={index} className="flex space-x-3 mb-3">
              <input
                type="text"
                placeholder="Skill name *"
                className="w-2/3 p-3 border rounded-lg"
                value={skill.name}
                onChange={(e) => {
                  const newSkills = [...skills];
                  newSkills[index].name = e.target.value;
                  setSkills(newSkills);
                }}
                required
              />
              <select
                className="w-1/3 p-3 border rounded-lg"
                value={skill.level}
                onChange={(e) => {
                  const newSkills = [...skills];
                  newSkills[index].level = e.target.value;
                  setSkills(newSkills);
                }}
                required
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
              <button
                type="button"
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => {
                  if (skills.length > 1) {
                    setSkills(skills.filter((_, i) => i !== index));
                  } else {
                    setError("You must have at least one skill.");
                  }
                }}
              >
                ✖
              </button>
            </div>
          ))}
          {skills.some((skill) => skill.name.trim() === "") && (
            <p className="text-sm text-red-500 mb-2">
              All skill names are required
            </p>
          )}
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
            onClick={() =>
              setSkills([...skills, { name: "", level: "Beginner" }])
            }
          >
            ➕ Add Skill
          </button>

          {/* Education */}
          <label className="block font-medium mb-2">
            Education <span className="text-red-500">*</span>
          </label>
          {education.map((edu, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-3">
              <input
                type="text"
                placeholder="Country *"
                className="p-3 border rounded-lg"
                value={edu.country}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].country = e.target.value;
                  setEducation(newEducation);
                }}
                required
              />
              <input
                type="text"
                placeholder="University *"
                className="p-3 border rounded-lg"
                value={edu.university}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].university = e.target.value;
                  setEducation(newEducation);
                }}
                required
              />
              <input
                type="text"
                placeholder="Title *"
                className="p-3 border rounded-lg"
                value={edu.title}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].title = e.target.value;
                  setEducation(newEducation);
                }}
                required
              />
              <input
                type="text"
                placeholder="Major *"
                className="p-3 border rounded-lg"
                value={edu.major}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].major = e.target.value;
                  setEducation(newEducation);
                }}
                required
              />
              <input
                type="number"
                placeholder="Year *"
                className="p-3 border rounded-lg"
                value={edu.year}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].year = e.target.value;
                  setEducation(newEducation);
                }}
                required
              />
              <button
                type="button"
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => {
                  if (education.length > 1) {
                    setEducation(education.filter((_, i) => i !== index));
                  } else {
                    setError("You must have at least one education entry.");
                  }
                }}
              >
                ✖
              </button>
            </div>
          ))}
          {education.some(
            (edu) =>
              edu.country.trim() === "" ||
              edu.university.trim() === "" ||
              edu.title.trim() === "" ||
              edu.major.trim() === "" ||
              edu.year.trim() === ""
          ) && (
            <p className="text-sm text-red-500 mb-2">
              All education fields are required
            </p>
          )}
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() =>
              setEducation([
                ...education,
                { country: "", university: "", title: "", major: "", year: "" },
              ])
            }
          >
            ➕ Add Education
          </button>
        </>
      )}

      {/* Security Step: Step 3 for sellers, Step 2 for non-sellers */}
      {(step === 3 || (step === 2 && !isSeller)) && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            🔒 Account Security
          </h2>
          <div className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Password *"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {password.trim() === "" && (
                <p className="text-sm text-red-500 mt-1">
                  Password is required
                </p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password *"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {confirmPassword.trim() === "" && (
                <p className="text-sm text-red-500 mt-1">
                  Confirm password is required
                </p>
              )}
              {password !== confirmPassword &&
                confirmPassword.trim() !== "" && (
                  <p className="text-sm text-red-500 mt-1">
                    Passwords do not match
                  </p>
                )}
            </div>
          </div>
          <label className="flex items-center mt-4 space-x-2">
            <input
              type="checkbox"
              required
              className="w-4 h-4"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
            />
            <span>
              I agree to the Terms and Conditions{" "}
              <span className="text-red-500">*</span>
            </span>
          </label>
          {!agreeToTerms && (
            <p className="text-sm text-red-500 mt-1">
              You must agree to the terms and conditions
            </p>
          )}
        </>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={handlePrev}
          disabled={step === 1}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            step === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-400 hover:bg-green-500 text-white"
          }`}
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={isLoading || !isCurrentStepValid()}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            isLoading || !isCurrentStepValid()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {isLoading
            ? "Processing..."
            : (isSeller && step === 3) || (!isSeller && step === 2)
            ? "Submit"
            : "Next"}
        </button>
      </div>
    </div>
  );
};

export default VerificationPage;
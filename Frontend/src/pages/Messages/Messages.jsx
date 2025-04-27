// import React from "react";
// import { Link } from "react-router-dom";

// const Messages = () => {
//   const currentUser = {
//     id: 1,
//     username: "Anna",
//     isSeller: true,
//   };

//   const message = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
//   maxime cum corporis esse aspernatur laborum dolorum? Animi
//   molestias aliquam, cum nesciunt, aut, ut quam vitae saepe repellat
//   nobis praesentium placeat.`;

//   const messagesData = [
//     { id: '67d9aae89ed4c79a67e5506a', name: "Charley Sharp", time: "1 hour ago", active: true },
//     { id: 2, name: "John Doe", time: "2 hours ago", active: true },
//     { id: 3, name: "Elinor Good", time: "1 day ago", active: false },
//     { id: 4, name: "Garner David", time: "2 days ago", active: false },
//     { id: 5, name: "Troy Oliver", time: "1 week ago", active: false },
//   ];

//   return (
//     <div className="flex justify-center">
//       <div className="w-full max-w-5xl mx-8 my-12">
//         {/* Title */}
//         <div className="flex justify-between items-center pb-4 border-b border-gray-300">
//           <h1 className="text-2xl font-semibold">Messages</h1>
//         </div>

//         {/* Messages Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full mt-4 border-collapse">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="text-left p-4">{currentUser.isSeller ? "Buyer" : "Seller"}</th>
//                 <th className="text-left p-4">Last Message</th>
//                 <th className="text-left p-4">Date</th>
//                 <th className="text-left p-4">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {messagesData.map(({ id, name, time, active }) => (
//                 <tr key={id} className={`${active ? "bg-green-50" : "bg-white"} hover:bg-gray-100 transition-all`}>
//                   <td className="p-4 font-medium">{name}</td>
//                   <td className="p-4 text-gray-600">
//                     <Link to={`/message/${id}`} className="text-blue-600 hover:underline">
//                       {message.substring(0, 100)}...
//                     </Link>
//                   </td>
//                   <td className="p-4 text-gray-500">{time}</td>
//                   <td className="p-4">
//                     {active && (
//                       <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
//                         Mark as Read
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Messages;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current user from local storage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    // Fetch messages
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/auth/messages/all");
        console.log(response.data);
        if (response.data.success) {
          setMessages(response.data.messages);
        } else {
          setError("Failed to fetch messages");
        }
      } catch (err) {
        setError(err.message || "Error fetching messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Function to format date
  const formatMessageDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else if (diffInHours < 168) { // 7 days
      return `${Math.floor(diffInHours / 24)} days ago`;
    } else {
      return format(date, "MMM d, yyyy");
    }
  };

  // Mark message as read
  const markAsRead = async (messageId) => {
    try {
      if (!currentUser) return;
      
      // Get the ID of the other party (to use as receiverId in API call)
      const message = messages.find(msg => msg._id === messageId);
      if (!message) return;
      
      // Determine receiverId based on who is the current user
      const receiverId = currentUser.id === message.sender_id?._id 
        ? message.receiver_id?._id 
        : message.sender_id?._id;
      
      // Call the API
      await axios.put(`http://localhost:3000/api/auth/messages/read/${messageId}/${receiverId}`);
      
      // Update UI
      setMessages(messages.map(msg => 
        msg._id === messageId ? { ...msg, is_read: true } : msg
      ));
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  // Filter messages for the current user
  const userMessages = messages.filter(msg => {
    if (!currentUser) return false;
    return msg.sender_id?._id === currentUser.id || msg.receiver_id?._id === currentUser.id;
  });

  // Consolidate messages from the same person
  const consolidatedChats = React.useMemo(() => {
    if (!currentUser) return [];
    
    // Create a map to store the latest message from each chat partner
    const chatMap = new Map();
    
    userMessages.forEach(message => {
      // Determine the ID of the other party
      const otherPartyId = message.sender_id?._id === currentUser.id 
        ? message.receiver_id?._id 
        : message.sender_id?._id;
      
      // If we don't have a message from this person yet, or this message is newer
      if (!chatMap.has(otherPartyId) || 
          new Date(message.created_at) > new Date(chatMap.get(otherPartyId).created_at)) {
        chatMap.set(otherPartyId, message);
      }
    });
    
    // Convert map back to array
    return Array.from(chatMap.values());
  }, [userMessages, currentUser]);

  // Get other party's name (sender or receiver based on current user)
  const getOtherPartyName = (message) => {
    if (!currentUser) return "Unknown";
    
    if (message.sender_id?._id === currentUser.id) {
      return message.receiver_id?.username || "Unknown";
    } else {
      return message.sender_id?.username || "Unknown";
    }
  };

  // Get other party's profile pic with fallback
  const getProfilePic = (message) => {
    if (!currentUser) return "/img/avatar-placeholder.png";
    
    let profileData, otherId;
    
    if (message.sender_id?._id === currentUser.id) {
      profileData = message.receiver_id?.full_verification?.[0];
      otherId = message.receiver_id?._id || "unknown";
    } else {
      profileData = message.sender_id?.full_verification?.[0];
      otherId = message.sender_id?._id || "unknown";
    }
    
    return profileData?.profile_pic || `https://api.dicebear.com/7.x/initials/svg?seed=${getOtherPartyName(message)}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gray-900 px-6 py-5">
            <h1 className="text-2xl font-medium text-white">Messages</h1>
            <p className="text-gray-400 text-sm">Your conversations</p>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-gray-900 border-r-gray-200 border-b-gray-200 border-l-gray-200"></div>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-gray-600">
              <p>Error: {error}</p>
              <button 
                className="mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : consolidatedChats.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700">No Messages</h3>
              <p className="mt-2 text-gray-500 text-sm">Your inbox is empty.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {consolidatedChats.map((message) => {
                const isUnread = !message.is_read && message.receiver_id?._id === currentUser.id;
                const otherPartyName = getOtherPartyName(message);
                
                return (
                  <Link 
                    key={message._id}
                    to={`/message/${message._id}`}
                    className="block hover:bg-gray-50 transition-colors" 
                    onClick={() => isUnread && markAsRead(message._id)}
                  >
                    <div className={`flex items-center p-4 ${isUnread ? 'bg-gray-50' : ''}`}>
                      <div className="flex-shrink-0 relative">
                        <img 
                          src={getProfilePic(message)} 
                          alt={otherPartyName} 
                          className="w-12 h-12 rounded-full object-cover border border-gray-200"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/img/avatar-placeholder.png";
                          }}
                        />
                        {isUnread && (
                          <span className="absolute -right-1 -top-1 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
                        )}
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <div className="flex items-baseline justify-between">
                          <h3 className={`font-medium ${isUnread ? 'text-gray-900' : 'text-gray-700'}`}>
                            {otherPartyName}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {formatMessageDate(message.created_at)}
                          </span>
                        </div>
                        <p className={`mt-1 text-sm ${isUnread ? 'text-gray-900' : 'text-gray-500'}`}>
                          {message.content.length > 60 
                            ? `${message.content.substring(0, 60)}...` 
                            : message.content}
                        </p>
                      </div>
                      
                      {isUnread && (
                        <div className="ml-4 flex-shrink-0">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
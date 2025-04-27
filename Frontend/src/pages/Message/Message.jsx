import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Send } from "lucide-react"; 

const Message = ({id:propsId}) => {
  const { id: paramsId } = useParams();
  const id = propsId || paramsId;
  const sender = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const userId = sender?.id || "YOUR_SENDER_ID";

  const [receiverId, setReceiverId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [receiverInfo, setReceiverInfo] = useState(null);

  // First, determine the correct receiver ID based on the param ID
  useEffect(() => {
    const determineReceiverId = async () => {
      try {
        // Check if the ID is a valid gig ID first
        try {
          const gigResponse = await axios.get(`https://liverbackend.vercel.app/api/auth/gig/${id}`);
          
          // Check if we got valid gig data
          if (gigResponse.data && gigResponse.data._id === id) {
            // This is a gig ID
            console.log("Found gig ID:", id);
            const freelancerId = gigResponse.data.freelancer_id._id || gigResponse.data.freelancer_id;
            setReceiverId(freelancerId);
            setReceiverInfo(gigResponse.data.freelancer_id);
            return;
          }
        } catch (gigError) {
          console.log("Not a gig ID, checking if it's a message ID...");
        }
        
        // If not a gig ID, check if it's a message ID
        const messagesResponse = await axios.get("https://liverbackend.vercel.app/api/auth/messages/all");
        
        if (messagesResponse.data.success && messagesResponse.data.messages) {
          // Find the message that matches the ID from params
          const matchingMessage = messagesResponse.data.messages.find(
            message => message._id === id
          );

          if (matchingMessage) {
            console.log("Found message ID:", id);
            // Determine who the receiver is based on the current user
            const determinedReceiverId = 
              matchingMessage.sender_id._id === userId 
                ? matchingMessage.receiver_id._id 
                : matchingMessage.sender_id._id;
            
            // Set receiver info
            setReceiverInfo(
              matchingMessage.sender_id._id === userId 
                ? matchingMessage.receiver_id 
                : matchingMessage.sender_id
            );
            setReceiverId(determinedReceiverId);
            return;
          }
        }
        
        // If we get here, we couldn't determine the receiver ID
        console.log("Could not determine receiver type, using ID directly:", id);
        setReceiverId(id); // Fallback to using the param ID directly
        
      } catch (error) {
        console.error("Error determining receiver ID:", error);
        setReceiverId(id); // Fallback to using the param ID directly
      }
    };

    if (id) {
      determineReceiverId();
    }
  }, [id, userId]);

  // Scroll to bottom function for messages
  const scrollToBottom = () => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  };

  // Fetch chat messages once receiverId is determined
  useEffect(() => {
    if (!userId || !receiverId) return;
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://liverbackend.vercel.app/api/auth/chat/${userId}/${receiverId}`
        );
        setMessages(response.data.chat || []);

        // If receiver info is not set yet, try to get it from messages
        if (!receiverInfo && response.data.chat && response.data.chat.length > 0) {
          const firstMsg = response.data.chat[0];
          if (firstMsg.sender_id?._id === receiverId) {
            setReceiverInfo(firstMsg.sender_id);
          } else if (firstMsg.receiver_id?._id === receiverId) {
            setReceiverInfo(firstMsg.receiver_id);
          }
        }

        // Mark unread messages as read
        const unreadMessages = response.data.chat.filter(
          (msg) => (msg.receiver_id?._id || msg.receiver_id) === userId && !msg.is_read
        );

        if (unreadMessages.length > 0) {
          try {
            // Use your updated API endpoint for marking messages as read
            await axios.put(`https://liverbackend.vercel.app/api/auth/messages/read/${id}/${userId}`);
          } catch (error) {
            console.error("Error marking messages as read:", error);
          }
        }
        
        setLoading(false);
        // Scroll to bottom after messages load
        setTimeout(scrollToBottom, 100);
      } catch (error) {
        console.log("Error fetching messages:", error);
        setLoading(false);
      }
    };

    fetchMessages();
    
  }, [userId, receiverId, receiverInfo, id]);

  // Send new message
  const sendMessage = async () => {
    if (!newMessage.trim() || !userId || !receiverId) return;

    try {
      const response = await axios.post("https://liverbackend.vercel.app/api/auth/messages", {
        sender_id: userId,
        receiver_id: receiverId,
        content: newMessage,
      });

      setMessages([...messages, response.data.data]);
      setNewMessage("");
      
      // Scroll to bottom after sending message
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Format date function
  const formatMessageTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle key press for sending message with Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Function to get profile image with fallback
  const getProfileImage = (user, isCurrentUser) => {
    // For demo purposes, use random avatar APIs with a fallback
    if (isCurrentUser) {
      // If it's the current user
      return sender?.profile_pic || "https://api.dicebear.com/7.x/fun-emoji/svg?seed=" + userId;
    } else {
      // If it's the other user in the conversation
      const receiverProfilePic = user?.full_verification?.[0]?.profile_pic;
      const randomSeed = user?._id || "unknown";
      return receiverProfilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`;
    }
  };

  // Random fun message bubble styles for goofy appearance
  const getRandomBubbleStyle = (isCurrentUser) => {
    const bubbleStyles = [
      { bg: isCurrentUser ? "bg-pink-100 border-pink-200" : "bg-pink-500", rotate: "transform rotate-1" },
      { bg: isCurrentUser ? "bg-purple-100 border-purple-200" : "bg-purple-500", rotate: "transform -rotate-1" },
      { bg: isCurrentUser ? "bg-blue-100 border-blue-200" : "bg-blue-500", rotate: "transform rotate-1" },
      { bg: isCurrentUser ? "bg-yellow-100 border-yellow-200" : "bg-yellow-500", rotate: "" },
      { bg: isCurrentUser ? "bg-green-100 border-green-200" : "bg-green-500", rotate: "transform -rotate-1" }
    ];
    
    // Use message content length to pick a style (for consistency)
    const styleIndex = Math.floor(Math.random() * bubbleStyles.length);
    return bubbleStyles[styleIndex];
  };

  return (
    <div className="flex justify-center bg-white rounded-lg shadow-sm">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center p-4 border-b border-gray-100">
          <span className="font-medium text-gray-800">Messages</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-600 text-sm">
            {receiverInfo ? receiverInfo.username : `Receiver: ${receiverId || 'Loading...'}`}
          </span>
        </div>

        {/* Messages Container with improved styling */}
        <div 
          id="message-container"
          className="flex flex-col gap-4 p-4 h-[400px] overflow-y-auto bg-gray-50"
        >
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-bounce flex space-x-2">
                <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>
          ) : messages.length > 0 ? (
            messages.map((msg, index) => {
              const isCurrentUser = (msg.sender_id?._id || msg.sender_id) === userId;
              const bubbleStyle = getRandomBubbleStyle(isCurrentUser);
              
              return (
                <div
                  key={msg._id}
                  className={`flex gap-3 max-w-[80%] ${
                    isCurrentUser ? "flex-row-reverse self-end" : "self-start"
                  }`}
                >
                  <img
                    src={getProfileImage(msg.sender_id, isCurrentUser)}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-white shadow-sm hover:scale-110 transition-all"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/img/avatar-placeholder.png";
                    }}
                  />
                  <div className="flex flex-col">
                    <p
                      className={`p-3 rounded-2xl text-sm leading-relaxed ${bubbleStyle.rotate} ${
                        isCurrentUser
                          ? `${bubbleStyle.bg} text-gray-800 rounded-tr-none border`
                          : `${bubbleStyle.bg} text-white rounded-tl-none`
                      } hover:scale-105 transition-all shadow-sm`}
                    >
                      {msg.content}
                    </p>
                    <span 
                      className={`text-xs text-gray-400 mt-1 ${
                        isCurrentUser ? "text-right mr-2" : "ml-2"
                      }`}
                    >
                      {formatMessageTime(msg.created_at)}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>No messages yet</p>
              <p className="text-sm">Start the conversation!</p>
            </div>
          )}
        </div>

        {/* Message Input with improved styling */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Write a message..."
              className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400 resize-none text-sm"
              rows="3"
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className={`p-3 rounded-full ${
                newMessage.trim() 
                  ? "bg-green-500 text-white hover:bg-green-600" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              } transition-all flex items-center justify-center`}
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-right">Press Enter to send</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
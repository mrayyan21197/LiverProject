import express from "express";
import Message from "../../Models/Messages.js";
const router = express.Router();

router.put("/messages/:messageId/read", async (req, res) => {
  try {
    const { messageId } = req.params;

    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { is_read: true },
      { new: true } 
    );

    if (!updatedMessage) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    res.status(200).json({ success: true, message: "Message marked as read", data: updatedMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating message status", error: error.message });
  }
});

router.get("/messages/unread/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find unread messages for the user
      const unreadMessages = await Message.find({ receiver_id: userId, is_read: false })
        .populate("sender_id", "name email"); // Populate sender details
  
      res.status(200).json({ success: true, unreadMessages });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching unread messages", error: error.message });
    }
  });

  router.put("/messages/read/:chatId/:receiverId", async (req, res) => {
    try {
      const { chatId, receiverId } = req.params;
  
      const updatedMessages = await Message.updateMany(
        { receiver_id: receiverId, is_read: false }, // Update only unread messages
        { is_read: true }
      );
  
      res.status(200).json({ success: true, message: "All messages marked as read", updatedMessages });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error updating messages", error: error.message });
    }
  });
  
  router.post("/messages", async (req, res) => {
    try {
        const { sender_id, receiver_id, content } = req.body;
    
        if (!sender_id || !receiver_id || !content) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newMessage = new Message({ sender_id, receiver_id, content });
        await newMessage.save();

        res.status(201).json({ message: "Message sent successfully!", data: newMessage });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

router.get("/chats/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }

        // Find all messages where the user is either sender or receiver
        const messages = await Message.find({
            $or: [{ sender_id: userId }, { receiver_id: userId }]
        }).populate("sender_id receiver_id", "username email"); // Populating sender & receiver details

        if (!messages.length) {
            return res.status(404).json({ message: "No chats found." });
        }

        // Group messages by conversation partner
        const chats = {};
        messages.forEach(msg => {
            const otherUserId = msg.sender_id._id.toString() === userId ? msg.receiver_id._id.toString() : msg.sender_id._id.toString();

            if (!chats[otherUserId]) {
                chats[otherUserId] = {
                    user: msg.sender_id._id.toString() === userId ? msg.receiver_id : msg.sender_id,
                    messages: []
                };
            }

            chats[otherUserId].messages.push(msg);
        });

        res.status(200).json({ chats });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

router.get("/chat/:user1Id/:user2Id", async (req, res) => {
    try {
        const { user1Id, user2Id } = req.params;

        if (!user1Id || !user2Id) {
            return res.status(400).json({ error: "Both user IDs are required." });
        }

        // Find messages where user1 and user2 are either sender or receiver
        const messages = await Message.find({
            $or: [
                { sender_id: user1Id, receiver_id: user2Id },
                { sender_id: user2Id, receiver_id: user1Id }
            ]
        }).populate("sender_id receiver_id", "username email") // Populating sender & receiver details
          .sort({ created_at: 1 }); // Sorting messages in chronological order

        if (!messages.length) {
            return res.status(404).json({ message: "No messages found between these users." });
        }

        res.status(200).json({ chat: messages });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

router.get("/messages/all", async (req, res) => {
  try {
    const messages = await Message.find()
      .populate("sender_id", "username email full_verification")
      .populate("receiver_id", "username email full_verification")
      .lean();

    if (!messages.length) {
      return res.status(404).json({ success: false, message: "No messages found." });
    }

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching all messages:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
});

export default router;

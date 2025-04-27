import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true }, 
    is_read: { type: Boolean, default: false }, 
    created_at: { type: Date, default: Date.now }
  },
  { timestamps: true } 
);
const Message = mongoose.model("Message", MessageSchema);
export default Message;

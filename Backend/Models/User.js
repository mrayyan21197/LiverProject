import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },

  role: { 
    type: String, 
    enum: ['freelancer', 'client', 'admin'], 
    default: 'client'
  },
  full_verification: [
    {
      full_name: { type: String },
      profile_pic: { type: String },
      country: { type: String },
      cnic: { type: String },
    }
  ]
});

const User = mongoose.model('User', UserSchema);
export default User;

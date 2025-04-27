import mongoose from "mongoose";


const FreelancerPortfolioSchema = new mongoose.Schema({
  freelancer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  completed_orders: { type: Number, default: 0 },
  overall_rating: { type: Number, min: 1, max: 5, default: 1 },

  education: [
    {
      degree: { type: String },
      graduation_year: { type: Number }
    }
  ],

  skills: [
    {
      name: { type: String, required: true },
      level: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'], required: true }
    }
  ],

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date }
});

const FreelancerPortfolio = mongoose.model('FreelancerPortfolio', FreelancerPortfolioSchema);
export default FreelancerPortfolio;
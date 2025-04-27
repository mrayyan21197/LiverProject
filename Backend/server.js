import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import registrationRoutes from "./Routes/Registeration/registeration.js";
import ProfessionalInfo from "./Routes/Professional_Info/info.js";
import CreateGig from "./Routes/Gig_Operations/create_gig.js";
import GetGig from "./Routes/Gig_Operations/get_gigs.js";
import Order from "./Routes/Orders/Order.js";
import Transaction from "./Routes/Transactions/Transaction.js";
import Message from "./Routes/Messages/Messages.js";
import cors from "cors";
import Review from "./Routes/Review/Review.js";
import userRoutes from "./Routes/User/user.js";
import cookieParser from "cookie-parser";
import http from "http";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoDbString = process.env.ConnectionString;

app.use(express.json());
app.use(cors({
  origin:"https://liverfrontend.vercel.app",
  methods:["POST","GET","PUT","DELETE"],
  credentials:true
}));
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

const myvar = "/api/auth";
app.use(myvar, registrationRoutes);
app.use(myvar, ProfessionalInfo);
app.use(myvar, CreateGig);
app.use(myvar, GetGig);
app.use(myvar, Order);
app.use(myvar, Transaction);
app.use(myvar, Message);
app.use(myvar, Review);
app.use(myvar, userRoutes);
const server = http.createServer(app);
mongoose
  .connect(mongoDbString)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(PORT,"0.0.0.0",()=>console.log(`Server is listening on port : ${PORT}`))
  })
  .catch((err) => console.error("MongoDB connection error:", err));
export default app;
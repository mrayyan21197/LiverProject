import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../Models/index.js";



const router = express.Router();
router.put("/hashPasswords", async (req, res) => {
  try {
    const users = await User.find(); // Get all users

    const updatedUsers = await Promise.all(
      users.map(async (user) => {
        if (user.password.startsWith("$2b$")) return null;

        const hashed = await bcrypt.hash(user.password, 10);
        user.password = hashed;
        await user.save();
        return user.username;
      })
    );

    res.status(200).json({
      message: "Passwords hashed successfully",
      updatedUsers: updatedUsers.filter(Boolean),
    });
  } catch (error) {
    console.error("Error hashing passwords:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    const currentUser = {
      id: user._id,
      username: user.username,
      isSeller: user.role === "freelancer",
      isVerified:user.verified
    };
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(200).json({ message: "Login successful", token,currentUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

export default router;

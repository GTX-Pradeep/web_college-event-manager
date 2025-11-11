import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, role, srn } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      role,
      srn: role === 'student' ? srn : '' // Only save SRN for students
    });
    await newUser.save();

    res.json({ message: "Signup successful ✅" });
  } catch (error) {
    res.json({ error });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    res.json({ 
      message: "Login successful ✅", 
      token, 
      role: user.role, 
      name: user.name,
      srn: user.srn || '',
      profilePicture: user.profilePicture || ''
    });
  } catch (error) {
    res.json({ error });
  }
});

// Update profile picture
router.put("/profile-picture", auth, async (req, res) => {
  try {
    const { profilePicture } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePicture },
      { new: true }
    );

    res.json({ 
      message: "Profile picture updated successfully ✅",
      profilePicture: user.profilePicture 
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile picture", error });
  }
});

// Get current user profile
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

export default router;

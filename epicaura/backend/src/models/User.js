import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "club"], required: true }, // login type
  srn: { type: String, default: '' }, // Student Registration Number (for students only)
  profilePicture: { type: String, default: '' } // URL to profile picture
});

export default mongoose.model("User", userSchema);

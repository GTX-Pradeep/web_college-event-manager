import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // Tech, Cultural, Sports, etc.
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  venue: { type: String, required: true },
  auditorium: { type: String, required: true },
  poster: { type: String }, // URL or path to poster image
  isPaid: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
  description: { type: String, required: true },
  registrationLink: { type: String, default: '' }, // Google Forms or registration link
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  clubName: { type: String, required: true },
  clubProfilePicture: { type: String, default: '' }, // Club's profile picture
  status: { type: String, enum: ["upcoming", "ongoing", "completed"], default: "upcoming" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Event", eventSchema);

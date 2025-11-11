import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  auditorium: { type: String, required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  clubName: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  status: { type: String, enum: ["booked", "cancelled", "completed"], default: "booked" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);

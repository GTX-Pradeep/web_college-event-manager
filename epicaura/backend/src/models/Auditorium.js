import mongoose from "mongoose";

const auditoriumSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    unique: true,
    enum: [
      "Opera House",
      "MRD Auditorium",
      "Auditorium 1A",
      "Auditorium 1B",
      "Auditorium 2A",
      "Auditorium 2B",
      "F Block Seminar Hall",
      "Seminar Hall 1",
      "Seminar Hall 2",
      "Seminar Hall 3",
      "Seminar Hall 4",
      "Seminar Hall 5",
      "Seminar Hall 6",
      "13th Floor",
      "PESU 52"
    ]
  },
  capacity: { type: Number, required: true },
  facilities: [{ type: String }], // AC, Projector, Sound System, etc.
  isAvailable: { type: Boolean, default: true }
});

export default mongoose.model("Auditorium", auditoriumSchema);

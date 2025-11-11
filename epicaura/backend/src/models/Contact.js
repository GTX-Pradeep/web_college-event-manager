import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  srn: { type: String, required: true },
  branch: { type: String, required: true },
  department: { type: String, required: true },
  query: { type: String, required: true },
  status: { type: String, enum: ["pending", "resolved"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Contact", contactSchema);

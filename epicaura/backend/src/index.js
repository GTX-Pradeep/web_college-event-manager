import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";
import auditoriumRoutes from "./routes/auditoriums.js";
import contactRoutes from "./routes/contact.js";
import uploadRoutes from "./routes/upload.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/auditoriums", auditoriumRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/upload", uploadRoutes);


// Default route
app.get("/", (req, res) => {
  res.send("EpicAura Backend Running ✅");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

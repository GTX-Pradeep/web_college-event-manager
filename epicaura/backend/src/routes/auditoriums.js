import express from "express";
import Auditorium from "../models/Auditorium.js";
import Booking from "../models/Booking.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get all auditoriums
router.get("/", async (req, res) => {
  try {
    const auditoriums = await Auditorium.find().sort({ name: 1 });
    res.json(auditoriums);
  } catch (error) {
    res.status(500).json({ message: "Error fetching auditoriums", error });
  }
});

// Get auditorium availability for a specific date
router.get("/availability/:date", async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const auditoriums = await Auditorium.find();
    
    const availability = await Promise.all(
      auditoriums.map(async (auditorium) => {
        const bookings = await Booking.find({
          auditorium: auditorium.name,
          date: date,
          status: "booked"
        }).populate('eventId');
        
        if (bookings.length === 0) {
          return {
            name: auditorium.name,
            capacity: auditorium.capacity,
            facilities: auditorium.facilities,
            isAvailable: true,
            bookings: []
          };
        }
        
        // Return all bookings for this auditorium on this date
        return {
          name: auditorium.name,
          capacity: auditorium.capacity,
          facilities: auditorium.facilities,
          isAvailable: false,
          bookings: bookings.map(b => ({
            eventName: b.eventId?.name,
            clubName: b.clubName,
            startTime: b.startTime,
            endTime: b.endTime,
            timeRange: `${b.startTime} - ${b.endTime}`
          }))
        };
      })
    );
    
    res.json(availability);
  } catch (error) {
    res.status(500).json({ message: "Error checking availability", error });
  }
});

// Initialize auditoriums (run once to set up database)
router.post("/initialize", async (req, res) => {
  try {
    const auditoriums = [
      { name: "Opera House", capacity: 500, facilities: ["AC", "Projector", "Sound System", "Stage Lighting"] },
      { name: "MRD Auditorium", capacity: 400, facilities: ["AC", "Projector", "Sound System"] },
      { name: "Auditorium 1A", capacity: 200, facilities: ["AC", "Projector"] },
      { name: "Auditorium 1B", capacity: 200, facilities: ["AC", "Projector"] },
      { name: "Auditorium 2A", capacity: 150, facilities: ["AC", "Projector"] },
      { name: "Auditorium 2B", capacity: 150, facilities: ["AC", "Projector"] },
      { name: "F Block Seminar Hall", capacity: 100, facilities: ["AC", "Projector"] },
      { name: "Seminar Hall 1", capacity: 80, facilities: ["AC", "Projector"] },
      { name: "Seminar Hall 2", capacity: 80, facilities: ["AC", "Projector"] },
      { name: "Seminar Hall 3", capacity: 80, facilities: ["AC", "Projector"] },
      { name: "Seminar Hall 4", capacity: 80, facilities: ["AC", "Projector"] },
      { name: "Seminar Hall 5", capacity: 80, facilities: ["AC", "Projector"] },
      { name: "Seminar Hall 6", capacity: 80, facilities: ["AC", "Projector"] },
      { name: "13th Floor", capacity: 120, facilities: ["AC", "Projector", "Whiteboard"] },
      { name: "PESU 52", capacity: 300, facilities: ["AC", "Projector", "Sound System", "Stage"] }
    ];

    // Clear existing auditoriums
    await Auditorium.deleteMany({});
    
    // Insert new auditoriums
    await Auditorium.insertMany(auditoriums);
    
    res.json({ message: "Auditoriums initialized successfully ✅", count: auditoriums.length });
  } catch (error) {
    res.status(500).json({ message: "Error initializing auditoriums", error: error.message });
  }
});

export default router;

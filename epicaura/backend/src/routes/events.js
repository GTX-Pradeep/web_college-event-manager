import express from "express";
import Event from "../models/Event.js";
import Booking from "../models/Booking.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
});

// Get upcoming events (today and future)
router.get("/upcoming", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const events = await Event.find({ 
      date: { $gte: today },
      status: { $in: ["upcoming", "ongoing"] }
    }).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching upcoming events", error });
  }
});

// Get past events
router.get("/past", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const events = await Event.find({ 
      $or: [
        { date: { $lt: today } },
        { status: "completed" }
      ]
    }).sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching past events", error });
  }
});

// Get events by category
router.get("/category/:category", async (req, res) => {
  try {
    const events = await Event.find({ category: req.params.category }).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events by category", error });
  }
});

// Get events by club (protected route) - MUST come before /:id
router.get("/my-events", auth, async (req, res) => {
  try {
    if (req.user.role !== "club") {
      return res.status(403).json({ message: "Only clubs can access this route" });
    }
    const events = await Event.find({ clubId: req.user.id }).sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your events", error });
  }
});

// Get single event by ID - MUST come after specific routes
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error });
  }
});

// Create new event (club only)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "club") {
      return res.status(403).json({ message: "Only clubs can create events" });
    }

    // Import User model to get club's profile picture
    const User = (await import("../models/User.js")).default;
    const club = await User.findById(req.user.id);

    const { name, category, date, startTime, endTime, venue, auditorium, poster, isPaid, price, description, clubName, registrationLink } = req.body;

    // Validate time range
    if (!startTime || !endTime) {
      return res.status(400).json({ message: "Both start time and end time are required" });
    }

    // Convert time strings to comparable format (HH:MM)
    const start = startTime.replace(/\s*(AM|PM|am|pm)/i, '');
    const end = endTime.replace(/\s*(AM|PM|am|pm)/i, '');
    
    // Helper function to check if time ranges overlap
    const timeRangesOverlap = (start1, end1, start2, end2) => {
      // Convert time to minutes for easy comparison
      const toMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
      };
      
      const s1 = toMinutes(start1);
      const e1 = toMinutes(end1);
      const s2 = toMinutes(start2);
      const e2 = toMinutes(end2);
      
      // Check if ranges overlap
      return (s1 < e2) && (s2 < e1);
    };

    // Check if auditorium is already booked for overlapping time on that date
    const eventDate = new Date(date);
    const existingBookings = await Booking.find({
      auditorium,
      date: eventDate,
      status: "booked"
    });

    // Check for time conflicts
    for (const booking of existingBookings) {
      const bookingStart = booking.startTime.replace(/\s*(AM|PM|am|pm)/i, '');
      const bookingEnd = booking.endTime.replace(/\s*(AM|PM|am|pm)/i, '');
      
      if (timeRangesOverlap(start, end, bookingStart, bookingEnd)) {
        return res.status(400).json({ 
          message: `Auditorium is already booked from ${booking.startTime} to ${booking.endTime} on this date`,
          conflictingBooking: {
            clubName: booking.clubName,
            startTime: booking.startTime,
            endTime: booking.endTime
          }
        });
      }
    }

    const newEvent = new Event({
      name,
      category,
      date: eventDate,
      startTime,
      endTime,
      venue,
      auditorium,
      poster,
      isPaid: isPaid || false,
      price: price || 0,
      description,
      registrationLink: registrationLink || '',
      clubId: req.user.id,
      clubName,
      clubProfilePicture: club?.profilePicture || ''
    });

    await newEvent.save();

    // Create booking for the auditorium
    const booking = new Booking({
      auditorium,
      eventId: newEvent._id,
      clubId: req.user.id,
      clubName,
      date: eventDate,
      startTime,
      endTime,
      status: "booked"
    });

    await booking.save();

    res.json({ message: "Event created successfully ✅", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
});

// Update event (club only - own events)
router.put("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "club") {
      return res.status(403).json({ message: "Only clubs can update events" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.clubId.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own events" });
    }

    // If auditorium, date, or time is being changed, check for conflicts
    const { auditorium, date, startTime, endTime } = req.body;
    if (auditorium || date || startTime || endTime) {
      const checkAuditorium = auditorium || event.auditorium;
      const checkDate = date || event.date;
      const checkStartTime = startTime || event.startTime;
      const checkEndTime = endTime || event.endTime;

      // Helper function to convert time to minutes
      const timeToMinutes = (timeStr) => {
        const [time, period] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        return hours * 60 + minutes;
      };

      // Check if two time ranges overlap
      const timeRangesOverlap = (start1, end1, start2, end2) => {
        const s1 = timeToMinutes(start1);
        const e1 = timeToMinutes(end1);
        const s2 = timeToMinutes(start2);
        const e2 = timeToMinutes(end2);
        return s1 < e2 && s2 < e1;
      };

      // Find other events with the same auditorium and date (excluding current event)
      const checkDateObj = new Date(checkDate);
      const existingEvents = await Event.find({
        auditorium: checkAuditorium,
        date: checkDateObj,
        _id: { $ne: req.params.id } // Exclude current event
      });

      // Check for time conflicts
      for (const existingEvent of existingEvents) {
        if (timeRangesOverlap(
          checkStartTime, 
          checkEndTime, 
          existingEvent.startTime, 
          existingEvent.endTime
        )) {
          return res.status(400).json({ 
            message: `This auditorium is already booked from ${existingEvent.startTime} to ${existingEvent.endTime} on this date` 
          });
        }
      }
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: "Event updated successfully ✅", event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
});

// Delete event (club only - own events)
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "club") {
      return res.status(403).json({ message: "Only clubs can delete events" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.clubId.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own events" });
    }

    // Delete associated booking
    await Booking.deleteMany({ eventId: req.params.id });

    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: "Event deleted successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
});

export default router;

import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// Submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, srn, branch, department, query } = req.body;

    if (!name || !srn || !branch || !department || !query) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({
      name,
      srn,
      branch,
      department,
      query
    });

    await newContact.save();

    res.json({ message: "Your query has been submitted successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting query", error: error.message });
  }
});

// Get all contacts (admin route - optional)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts", error });
  }
});

export default router;

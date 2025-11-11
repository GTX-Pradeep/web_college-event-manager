# 🚀 New Features Guide - EpicAura

## ⏰ Time-Based Booking System

### What's New?
- Events now have **Start Time** and **End Time** instead of just a date
- Automatic **time conflict detection** prevents double-booking
- Smart algorithm checks if time slots overlap for the same auditorium

### How It Works:

#### For Clubs (Creating Events):
1. Go to **Add Event** page
2. Fill in the event details
3. Add **Start Time** (e.g., 9:00 AM)
4. Add **End Time** (e.g., 11:00 AM)
5. Select an auditorium
6. Click **Create Event**

#### Conflict Detection:
- If another event is already booked in the same auditorium during your requested time, you'll get an error
- Example:
  - Event A: 9:00 AM - 11:00 AM ✅ (Booked)
  - Event B: 10:00 AM - 12:00 PM ❌ (Conflicts with Event A)
  - Event C: 11:00 AM - 1:00 PM ✅ (No conflict)

### Time Overlap Algorithm:
```
Two time slots overlap if:
(Start1 < End2) AND (Start2 < End1)

Example:
Event A: 9:00 AM (540 min) - 11:00 AM (660 min)
Event B: 10:00 AM (600 min) - 12:00 PM (720 min)

Check: (540 < 720) AND (600 < 660) = TRUE (Overlaps!)
```

---

## 🔗 Registration Link Feature

### What's New?
- Clubs can add **Google Forms** or any registration link to events
- Students can **click on event cards** to register instantly
- Visual indicator shows which events have registration links

### How It Works:

#### For Clubs (Adding Registration Links):
1. Go to **Add Event** page
2. Fill in all event details
3. Scroll to **Registration Link** field (optional)
4. Paste your Google Forms link (or any registration URL)
   - Example: `https://forms.google.com/...`
5. Click **Create Event**

#### For Students (Registering for Events):
1. Browse events on **Home** or **Events** page
2. Look for the **🔗 Click to Register** badge on event cards
3. Click anywhere on the event card
4. Registration form opens in a **new tab**
5. Fill out the form and submit!

### Visual Indicators:
- **Clickable cards** have:
  - Purple border on hover
  - Cursor changes to pointer
  - Pulsing "Click to Register" badge
  - Smooth hover animation

---

## 📊 Auditorium Booking View

### What's New?
- **Multiple bookings per day** are now visible
- Each booking shows **time range**
- Better view of auditorium availability

### How to Check Availability:
1. Go to **Auditoriums** page (Clubs only)
2. Select a date using the date picker
3. View all bookings for that date
4. Each booking shows:
   - Event name
   - Club name
   - Time range (e.g., 9:00 AM - 11:00 AM)
   - Auditorium details

---

## 🎨 Updated About Page

### New Information Added:
- Explanation of time-based booking
- Registration link feature details
- How-to guides for both students and clubs
- Updated feature lists with new capabilities

---

## 🧪 Testing the Features

### Test Scenario 1: Time Conflict Detection
```powershell
cd backend
.\test-endpoints.ps1
```
The script will:
1. Create Event A (9:00 AM - 11:00 AM)
2. Try to create Event B (10:00 AM - 12:00 PM) - Should fail!
3. Show conflict error message

### Test Scenario 2: Registration Link
1. **Create an event with a Google Forms link**
   - Login as a club
   - Add event with registration link
   - Submit

2. **Test clicking the event card**
   - Logout and login as a student (or stay logged out)
   - Go to Events page
   - Click on the event card with register badge
   - Verify link opens in new tab

### Test Scenario 3: Without Registration Link
1. Create an event without a registration link
2. The event card should NOT show "Click to Register" badge
3. Card should NOT be clickable

---

## 📋 Technical Details

### Backend Changes:
- **Event Model**: Added `startTime`, `endTime`, `registrationLink` fields
- **Events Routes**: Time overlap detection algorithm
- **Auditoriums Routes**: Multiple bookings display

### Frontend Changes:
- **EventCard Component**: Click handling with `window.open()`
- **AddEvent Form**: New input fields for times and link
- **Auditoriums Page**: Display time ranges for bookings
- **About Page**: Updated feature descriptions

### Database Schema:
```javascript
Event {
  title: String,
  description: String,
  category: String,
  date: Date,
  startTime: String,      // NEW: "9:00 AM"
  endTime: String,        // NEW: "11:00 AM"
  venue: String,
  image: String,
  organizer: String,
  club: ObjectId,
  auditorium: ObjectId,
  registrationLink: String // NEW: Optional Google Forms link
}
```

---

## 💡 Best Practices

### For Clubs:
1. **Always add start and end times** for accurate scheduling
2. **Use registration links** for better attendance tracking
3. **Check auditorium availability** before creating events
4. **Test your registration link** before sharing

### For Students:
1. **Click on event cards** to register quickly
2. **Check event timings** before planning your day
3. **Register early** using the provided forms

---

## 🐛 Known Behaviors

### Registration Links:
- Field is **optional** - events work fine without it
- Link validation is minimal - make sure your link is correct
- Opens in **new tab** to prevent navigation loss

### Time Conflict:
- Checks are **strict** - even 1-minute overlap is rejected
- Only checks **same auditorium** on same date
- Different auditoriums can have same time slots

---

## 📞 Need Help?

If you encounter any issues:
1. Check browser console for errors (F12)
2. Verify backend is running on port 5000
3. Verify frontend is running on port 3000
4. Check MongoDB connection
5. Review error messages in terminal

---

**Last Updated**: Now with time-based booking and registration links!
**Version**: 2.0.0

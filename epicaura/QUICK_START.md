# 🎯 EpicAura - Quick Start Guide

## ✅ Your Application is Ready!

Both frontend and backend are now running:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

## 🚀 First Steps

### 1. Initialize Auditoriums (One-time setup)
Open a browser and navigate to:
```
POST http://localhost:5000/api/auditoriums/initialize
```
Or run this in PowerShell:
```powershell
Invoke-RestMethod -Uri http://localhost:5000/api/auditoriums/initialize -Method POST
```

### 2. Create Test Accounts

**Student Account:**
1. Go to http://localhost:3000/signup
2. Fill in:
   - Name: Alice Student
   - Email: alice@student.com
   - Password: password123
   - Role: Student
3. Click "Sign Up"

**Club Account:**
1. Go to http://localhost:3000/signup
2. Fill in:
   - Name: Coding Club
   - Email: coding@club.com
   - Password: clubpass123
   - Role: Club
3. Click "Sign Up"

## 📱 Testing the Application

### As a Student:
1. **Login** at http://localhost:3000/login
2. **Browse Events** - View all upcoming events
3. **Filter by Category** - Tech, Cultural, Sports, etc.
4. **Search Events** - Search by name, club, or description
5. **View Past Events** - Check completed events
6. **Contact Form** - Submit queries

### As a Club:
1. **Login** at http://localhost:3000/login
2. **Add Event** - Create a new event
   - Fill in all details
   - Select auditorium
   - Set paid/free status
3. **Your Events** - View and manage all your events
4. **Auditoriums** - Check availability
   - Select a date
   - View which auditoriums are booked
5. **Delete Events** - Remove events if needed

## 🎨 Navigation Guide

### Student Dashboard
```
Home → Events → Past Events → About → Contact
```

### Club Dashboard
```
Home → Events → Add Event → Auditoriums → Your Events → About → Contact
```

## 🔧 Common Tasks

### Add a New Event (Club)
1. Login as club
2. Click "Add Event" in navbar
3. Fill the form:
   - Event Name: "Tech Workshop 2025"
   - Category: Tech
   - Date: Select future date
   - Time: 10:00 AM
   - Venue: MRD Auditorium
   - Auditorium: MRD Auditorium
   - Description: Your event details
4. Click "Create Event"

### Check Auditorium Availability
1. Login as club
2. Click "Auditoriums" in navbar
3. Select a date
4. View green (Available) or red (Booked) status
5. See booking details for booked auditoriums

### Submit Contact Query
1. Click "Contact" in navbar
2. Fill the form:
   - Name, SRN, Branch, Department, Query
3. Submit

## 📊 Backend Testing

Run comprehensive API tests:
```powershell
cd backend
.\test-endpoints.ps1
```

This will test all 13 endpoints and create sample data.

## 🎯 Project Features Checklist

- ✅ User Authentication (Student & Club)
- ✅ Event Management (CRUD)
- ✅ Auditorium Booking System
- ✅ Past Events Tracking
- ✅ Category Filtering
- ✅ Search Functionality
- ✅ Contact Form
- ✅ Responsive Design
- ✅ Protected Routes
- ✅ Role-based Access

## 🐛 Troubleshooting

### Frontend not loading?
```powershell
cd frontend
npm run dev
```

### Backend not responding?
```powershell
cd backend
npm start
```

### MongoDB connection error?
Check your `.env` file in backend folder:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### Port already in use?
Kill processes:
```powershell
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
```

## 📸 Screenshots to Take for Presentation

1. Home Page with events
2. Login/Signup pages
3. Events page with filters
4. Past Events page
5. Add Event form (Club)
6. Your Events page (Club)
7. Auditorium availability page
8. Contact form
9. About page
10. Responsive view on mobile

## 🎓 Presentation Points

1. **Problem Statement**: Centralized event management for college
2. **Solution**: Full-stack web application
3. **Tech Stack**: MERN (MongoDB, Express, React, Node.js)
4. **Features**: Dual roles, event management, booking system
5. **Security**: JWT authentication, password hashing
6. **Scalability**: Can handle multiple clubs and events
7. **User Experience**: Clean UI, easy navigation, responsive design

## 💡 Tips for Demo

- Create 3-4 sample events before demo
- Show both student and club perspectives
- Demonstrate booking conflict prevention
- Show search and filter features
- Display responsive design on different screen sizes

---

**Ready to explore! 🚀**

Open http://localhost:3000 in your browser and start testing!

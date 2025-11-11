# 🎭 EpicAura - College Event Management System

A full-stack web application for managing college events, connecting students and clubs seamlessly.

## 📋 Features

### For Students 👨‍🎓
- Browse all upcoming college events
- Filter events by category (Tech, Cultural, Sports, etc.)
- Search events by name, club, or description
- View past events with complete details
- Free and paid event listings
- **🆕 Click on events to register instantly**
- **🆕 Quick access to Google Forms registration**
- **🆕 View event timings (start and end times)**

### For Clubs 🏛️
- Create and manage events easily
- Book auditoriums for events
- Track all your club's events
- View auditorium availability
- **🆕 Time-based booking with conflict detection**
- **🆕 Add registration/Google Forms links to events**
- **🆕 Automatic time slot overlap prevention**
- Delete events if needed

### 🚀 Smart Features
- ⏰ **Time-Based Booking**: Events have start and end times, preventing double-booking
- 🔗 **Registration Links**: Optional Google Forms or registration URLs
- 🎯 **Click-to-Register**: Students can click event cards to open registration forms
- ✅ **Conflict Detection**: Automatic checking for time slot overlaps

## 🛠️ Technology Stack

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **Vite** - Build tool
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
epicaura/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Event.js
│   │   │   ├── Auditorium.js
│   │   │   ├── Booking.js
│   │   │   └── Contact.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── events.js
│   │   │   ├── auditoriums.js
│   │   │   └── contact.js
│   │   └── index.js
│   ├── package.json
│   ├── test-endpoints.ps1
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx/css
│   │   │   ├── Footer.jsx/css
│   │   │   └── EventCard.jsx/css
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx/css
│   │   │   ├── Events.jsx/css
│   │   │   ├── PastEvents.jsx
│   │   │   ├── About.jsx/css
│   │   │   ├── Contact.jsx/css
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Auth.css
│   │   │   └── Club/
│   │   │       ├── AddEvent.jsx
│   │   │       ├── YourEvents.jsx
│   │   │       ├── Auditoriums.jsx
│   │   │       └── ClubPages.css
│   │   ├── App.jsx/css
│   │   ├── index.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── start.ps1
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running instance)
- npm or yarn

### Environment Setup

1. **Clone the repository**
```bash
cd c:\Users\Dell\Documents\wt_mini\epicaura
```

2. **Backend Setup**

Create `.env` file in the `backend` folder:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
PORT=5000
```

Install dependencies:
```bash
cd backend
npm install
```

3. **Frontend Setup**

Install dependencies:
```bash
cd frontend
npm install
```

### Running the Application

#### Option 1: Use the Startup Script (Recommended)
```powershell
.\start.ps1
```

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Access the Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user (student/club)
- `POST /api/auth/login` - Login user

### Events
- `GET /api/events` - Get all events
- `GET /api/events/upcoming` - Get upcoming events
- `GET /api/events/past` - Get past events
- `GET /api/events/category/:category` - Filter by category
- `GET /api/events/my-events` - Get club's events (protected)
- `POST /api/events` - Create new event (club only)
- `PUT /api/events/:id` - Update event (club only)
- `DELETE /api/events/:id` - Delete event (club only)

### Auditoriums
- `GET /api/auditoriums` - Get all auditoriums
- `GET /api/auditoriums/availability/:date` - Check availability
- `POST /api/auditoriums/initialize` - Initialize auditoriums (admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)

## 🏢 Available Auditoriums (15)

1. Opera House (500 capacity)
2. MRD Auditorium (400 capacity)
3. Auditorium 1A (200 capacity)
4. Auditorium 1B (200 capacity)
5. Auditorium 2A (150 capacity)
6. Auditorium 2B (150 capacity)
7. F Block Seminar Hall (100 capacity)
8. Seminar Hall 1-6 (80 capacity each)
9. 13th Floor (120 capacity)
10. PESU 52 (300 capacity)

## 🧪 Testing

Run backend endpoint tests:
```powershell
cd backend
.\test-endpoints.ps1
```

## 👥 User Roles

### Student
- View all events
- Filter and search events
- View past events
- Submit contact queries

### Club
- All student features
- Create events
- Manage own events
- Check auditorium availability
- Book auditoriums

## 🎨 Features Highlights

- ✅ Role-based authentication (Student/Club)
- ✅ JWT token-based security
- ✅ Password hashing with bcrypt
- ✅ Event categorization
- ✅ Date-based filtering
- ✅ Auditorium booking system
- ✅ **Time-based conflict detection** 🆕
- ✅ **Registration link integration** 🆕
- ✅ **Clickable event cards** 🆕
- ✅ **Start/End time for events** 🆕
- ✅ Responsive design
- ✅ Search functionality
- ✅ Contact form integration

## 🆕 New Features Guide

See [NEW_FEATURES.md](NEW_FEATURES.md) for detailed documentation on:
- ⏰ Time-based booking system
- 🔗 Registration link feature
- 🎯 Click-to-register functionality
- 📊 Enhanced auditorium booking view

## 📝 Default Test Accounts

After running the test script, you can use:

**Student Account:**
- Email: alice@student.com
- Password: password123

**Club Account:**
- Email: coding@club.com
- Password: clubpass123

## 🔒 Security

- Passwords are hashed using bcryptjs
- JWT tokens for authentication
- Protected routes for club-specific features
- Authorization checks on all sensitive endpoints

## 🤝 Contributing

This is a college project. For any issues or suggestions, please contact the development team.

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Developer

PES University - Web Technologies Mini Project

---

**Built with ❤️ for college event management**

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Common Pages
import Home from './pages/Home';
import Events from './pages/Events';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

// Student Pages
import PastEvents from './pages/PastEvents';

// Club Pages
import AddEvent from './pages/Club/AddEvent';
import EditEvent from './pages/Club/EditEvent';
import YourEvents from './pages/Club/YourEvents';
import Auditoriums from './pages/Club/Auditoriums';

import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, requireAuth, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function AppContent() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Profile Route */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute requireAuth>
                <Profile />
              </ProtectedRoute>
            } 
          />

          {/* Student Routes */}
          <Route 
            path="/past-events" 
            element={
              <ProtectedRoute requireAuth allowedRoles={['student']}>
                <PastEvents />
              </ProtectedRoute>
            } 
          />

          {/* Club Routes */}
          <Route 
            path="/add-event" 
            element={
              <ProtectedRoute requireAuth allowedRoles={['club']}>
                <AddEvent />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/edit-event/:id" 
            element={
              <ProtectedRoute requireAuth allowedRoles={['club']}>
                <EditEvent />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/your-events" 
            element={
              <ProtectedRoute requireAuth allowedRoles={['club']}>
                <YourEvents />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/auditoriums" 
            element={
              <ProtectedRoute requireAuth allowedRoles={['club']}>
                <Auditoriums />
              </ProtectedRoute>
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;

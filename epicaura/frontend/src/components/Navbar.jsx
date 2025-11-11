import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated, isStudent, isClub } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🎭 EpicAura
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/events" className="nav-link">Events</Link>
          </li>
          
          {isStudent && (
            <li className="nav-item">
              <Link to="/past-events" className="nav-link">Past Events</Link>
            </li>
          )}
          
          {isClub && (
            <>
              <li className="nav-item">
                <Link to="/add-event" className="nav-link">Add Event</Link>
              </li>
              <li className="nav-item">
                <Link to="/your-events" className="nav-link">Your Events</Link>
              </li>
              <li className="nav-item">
                <Link to="/auditoriums" className="nav-link">Auditoriums</Link>
              </li>
            </>
          )}
          
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
          
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">Profile</Link>
              </li>
              <li className="nav-item">
                <span className="nav-user">
                  {user?.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt={user?.name} 
                      className="profile-pic-small"
                    />
                  ) : (
                    <span className="profile-icon">👤</span>
                  )}
                  {user?.name}
                </span>
                <button onClick={handleLogout} className="nav-btn logout-btn">Logout</button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login">
                <button className="nav-btn">Login</button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

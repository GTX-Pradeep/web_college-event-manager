import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import EventCard from '../../components/EventCard';
import EventDetailsModal from '../../components/EventDetailsModal';
import './ClubPages.css';

const YourEvents = () => {
  const { getAuthHeader } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchYourEvents();
  }, []);

  const fetchYourEvents = async () => {
    try {
      const response = await axios.get('/api/events/my-events', {
        headers: getAuthHeader()
      });
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching your events:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      await axios.delete(`/api/events/${eventId}`, {
        headers: getAuthHeader()
      });
      alert('Event deleted successfully! ✅');
      fetchYourEvents(); // Refresh the list
    } catch (error) {
      alert('Failed to delete event: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="club-page">
      <div className="container">
        <div className="page-header">
          <h1>📋 Your Events</h1>
          <p>Manage all your club events</p>
          <Link to="/add-event">
            <button className="add-event-btn">➕ Add New Event</button>
          </Link>
        </div>

        {loading ? (
          <div className="loading">Loading your events...</div>
        ) : events.length === 0 ? (
          <div className="no-events">
            <h3>No events created yet</h3>
            <p>Start by creating your first event!</p>
            <Link to="/add-event">
              <button className="add-event-btn">➕ Create Event</button>
            </Link>
          </div>
        ) : (
          <>
            <p className="results-count">
              You have {events.length} {events.length === 1 ? 'event' : 'events'}
            </p>
            <div className="events-grid">
              {events.map(event => (
                <div key={event._id} className="event-wrapper">
                  <EventCard event={event} onClick={handleEventClick} />
                  <div className="event-actions">
                    <button 
                      onClick={() => navigate(`/edit-event/${event._id}`)}
                      className="edit-btn"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(event._id)}
                      className="delete-btn"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {selectedEvent && (
        <EventDetailsModal event={selectedEvent} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default YourEvents;

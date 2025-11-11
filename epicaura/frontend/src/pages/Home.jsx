import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import EventDetailsModal from '../components/EventDetailsModal';
import './Home.css';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const categories = ['All', 'Tech', 'Cultural', 'Sports', 'Academic', 'Workshop', 'Other'];

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.category === selectedCategory));
    }
  }, [selectedCategory, events]);

  const fetchUpcomingEvents = async () => {
    try {
      const response = await axios.get('/api/events/upcoming');
      setEvents(response.data);
      setFilteredEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>🎭 Welcome to EpicAura</h1>
          <p>Your one-stop platform for all college events</p>
          <p className="hero-subtitle">Discover, Participate, and Create Amazing Experiences</p>
        </div>
      </section>

      <div className="container">
        <section className="upcoming-section">
          <h2>Upcoming Events</h2>
          
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading">Loading events...</div>
          ) : filteredEvents.length === 0 ? (
            <div className="no-events">
              <h3>No upcoming events found</h3>
              <p>{selectedCategory !== 'All' ? `No events in ${selectedCategory} category` : 'Check back later for new events!'}</p>
            </div>
          ) : (
            <div className="events-grid">
              {filteredEvents.map(event => (
                <EventCard key={event._id} event={event} onClick={handleEventClick} />
              ))}
            </div>
          )}
        </section>
      </div>

      {selectedEvent && (
        <EventDetailsModal event={selectedEvent} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Home;

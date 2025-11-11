import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import EventDetailsModal from '../components/EventDetailsModal';
import '../pages/Events.css';

const PastEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const categories = ['All', 'Tech', 'Cultural', 'Sports', 'Academic', 'Workshop', 'Other'];

  useEffect(() => {
    fetchPastEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.clubName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [selectedCategory, searchTerm, events]);

  const fetchPastEvents = async () => {
    try {
      const response = await axios.get('/api/events/past');
      setEvents(response.data);
      setFilteredEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching past events:', error);
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
    <div className="events-page">
      <div className="container">
        <div className="page-header">
          <h1>📜 Past Events</h1>
          <p>Browse through events that have already taken place</p>
        </div>

        <div className="filters-section">
          <input
            type="text"
            className="search-input"
            placeholder="Search past events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

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
        </div>

        {loading ? (
          <div className="loading">Loading past events...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="no-events">
            <h3>No past events found</h3>
            <p>
              {searchTerm 
                ? `No past events match your search "${searchTerm}"`
                : selectedCategory !== 'All' 
                  ? `No past events in ${selectedCategory} category`
                  : 'No past events available yet!'}
            </p>
          </div>
        ) : (
          <>
            <p className="results-count">
              Showing {filteredEvents.length} past {filteredEvents.length === 1 ? 'event' : 'events'}
            </p>
            <div className="events-grid">
              {filteredEvents.map(event => (
                <EventCard key={event._id} event={event} onClick={handleEventClick} />
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

export default PastEvents;

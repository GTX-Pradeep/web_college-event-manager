import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import EventDetailsModal from '../components/EventDetailsModal';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const categories = ['All', 'Tech', 'Cultural', 'Sports', 'Academic', 'Workshop', 'Other'];

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [selectedCategory, searchTerm, events]);

  const fetchEvents = async () => {
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
    <div className="events-page">
      <div className="container">
        <div className="page-header">
          <h1>📅 All Events</h1>
          <p>Discover amazing events happening at your college</p>
        </div>

        <div className="filters-section">
          <input
            type="text"
            className="search-input"
            placeholder="Search events by name, club, or description..."
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
          <div className="loading">Loading events...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="no-events">
            <h3>No events found</h3>
            <p>
              {searchTerm 
                ? `No events match your search "${searchTerm}"`
                : selectedCategory !== 'All' 
                  ? `No events in ${selectedCategory} category`
                  : 'Check back later for new events!'}
            </p>
          </div>
        ) : (
          <>
            <p className="results-count">
              Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
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

export default Events;

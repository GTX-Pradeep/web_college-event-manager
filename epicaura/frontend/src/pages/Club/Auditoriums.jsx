import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClubPages.css';

const Auditoriums = () => {
  const [auditoriums, setAuditoriums] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuditoriums();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      checkAvailability();
    }
  }, [selectedDate]);

  const fetchAuditoriums = async () => {
    try {
      const response = await axios.get('/api/auditoriums');
      setAuditoriums(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching auditoriums:', error);
      setLoading(false);
    }
  };

  const checkAvailability = async () => {
    try {
      const response = await axios.get(`/api/auditoriums/availability/${selectedDate}`);
      setAvailability(response.data);
    } catch (error) {
      console.error('Error checking availability:', error);
    }
  };

  const getAvailabilityInfo = (auditoriumName) => {
    const info = availability.find(a => a.name === auditoriumName);
    return info || { isAvailable: true, bookings: [] };
  };

  return (
    <div className="club-page">
      <div className="container">
        <div className="page-header">
          <h1>🏢 Available Auditoriums</h1>
          <p>Check auditorium availability and details</p>
        </div>

        <div className="date-selector">
          <label>Check Availability for:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {loading ? (
          <div className="loading">Loading auditoriums...</div>
        ) : auditoriums.length === 0 ? (
          <div className="no-events">
            <h3>No auditoriums found</h3>
            <p>Please contact admin to initialize auditoriums.</p>
          </div>
        ) : (
          <div className="auditoriums-grid">
            {auditoriums.map(auditorium => {
              const availInfo = getAvailabilityInfo(auditorium.name);
              return (
                <div key={auditorium._id} className={`auditorium-card ${!availInfo.isAvailable ? 'booked' : ''}`}>
                  <div className="auditorium-header">
                    <h3>{auditorium.name}</h3>
                    <span className={`availability-badge ${availInfo.isAvailable ? 'available' : 'booked'}`}>
                      {availInfo.isAvailable ? '✓ Available' : '✗ Booked'}
                    </span>
                  </div>
                  
                  <div className="auditorium-details">
                    <p><strong>👥 Capacity:</strong> {auditorium.capacity} people</p>
                    
                    <div className="facilities">
                      <strong>🔧 Facilities:</strong>
                      <ul>
                        {auditorium.facilities && auditorium.facilities.map((facility, index) => (
                          <li key={index}>{facility}</li>
                        ))}
                      </ul>
                    </div>

                    {!availInfo.isAvailable && availInfo.bookings && availInfo.bookings.length > 0 && (
                      <div className="bookings-list">
                        <strong>📅 Bookings for this date:</strong>
                        {availInfo.bookings.map((booking, index) => (
                          <div key={index} className="booking-info">
                            <p><strong>Club:</strong> {booking.clubName}</p>
                            <p><strong>Event:</strong> {booking.eventName}</p>
                            <p><strong>Time:</strong> {booking.timeRange}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="auditorium-legend">
          <h3>Legend:</h3>
          <div className="legend-items">
            <div className="legend-item">
              <span className="availability-badge available">✓ Available</span>
              <p>Auditorium is free for booking</p>
            </div>
            <div className="legend-item">
              <span className="availability-badge booked">✗ Booked</span>
              <p>Auditorium is already booked</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auditoriums;

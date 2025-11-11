import React from 'react';
import './EventCard.css';

const EventCard = ({ event, onClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const hasRegistrationLink = event.registrationLink && event.registrationLink.trim() !== '';

  return (
    <div 
      className="event-card clickable"
      onClick={() => onClick(event)}
      style={{ cursor: 'pointer' }}
    >
      {event.poster && (
        <div className="event-poster">
          <img src={event.poster} alt={event.name} onError={(e) => e.target.src = 'https://via.placeholder.com/300x200?text=Event+Poster'} />
        </div>
      )}
      
      <div className="event-content">
        <div className="event-header">
          <h3>{event.name}</h3>
          <span className={`event-badge ${event.isPaid ? 'paid' : 'free'}`}>
            {event.isPaid ? `₹${event.price}` : 'FREE'}
          </span>
        </div>
        
        <p className="event-club">
          {event.clubProfilePicture ? (
            <img 
              src={event.clubProfilePicture} 
              alt={event.clubName}
              className="club-profile-pic"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <span className="club-icon">🏛️</span>
          )}
          {event.clubName}
        </p>
        
        <div className="event-details">
          <p><strong>📅 Date:</strong> {formatDate(event.date)}</p>
          <p><strong>🕐 Time:</strong> {event.startTime || event.time} - {event.endTime || 'N/A'}</p>
          <p><strong>📍 Venue:</strong> {event.venue}</p>
          <p><strong>🏢 Auditorium:</strong> {event.auditorium}</p>
          <p><strong>🏷️ Category:</strong> {event.category}</p>
        </div>
        
        <p className="event-description">{truncateDescription(event.description)}</p>
        
        <div className="event-footer">
          <span className={`status-badge ${event.status}`}>{event.status}</span>
          {hasRegistrationLink && (
            <span className="register-badge">
              🔗 Registration Available
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;

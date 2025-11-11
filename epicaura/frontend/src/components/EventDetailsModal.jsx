import React from 'react';
import './EventDetailsModal.css';

const EventDetailsModal = ({ event, onClose }) => {
  if (!event) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    });
  };

  const handleRegisterClick = () => {
    if (event.registrationLink && event.registrationLink.trim() !== '') {
      window.open(event.registrationLink, '_blank');
    }
  };

  const hasRegistrationLink = event.registrationLink && event.registrationLink.trim() !== '';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          {event.poster && (
            <div className="modal-poster">
              <img src={event.poster} alt={event.name} />
            </div>
          )}
          
          <div className="modal-title-section">
            <h2>{event.name}</h2>
            <p className="modal-club">
              {event.clubProfilePicture ? (
                <img 
                  src={event.clubProfilePicture} 
                  alt={event.clubName}
                  className="modal-club-profile-pic"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <span className="modal-club-icon">🏛️</span>
              )}
              {event.clubName}
            </p>
            <span className={`modal-badge ${event.isPaid ? 'paid' : 'free'}`}>
              {event.isPaid ? `₹${event.price}` : 'FREE EVENT'}
            </span>
          </div>
        </div>

        <div className="modal-body">
          <div className="detail-section">
            <h3>📋 Event Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <strong>📅 Date:</strong>
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="detail-item">
                <strong>🕐 Start Time:</strong>
                <span>{event.startTime || event.time}</span>
              </div>
              <div className="detail-item">
                <strong>🕑 End Time:</strong>
                <span>{event.endTime || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <strong>📍 Venue:</strong>
                <span>{event.venue}</span>
              </div>
              <div className="detail-item">
                <strong>🏢 Auditorium:</strong>
                <span>{event.auditorium}</span>
              </div>
              <div className="detail-item">
                <strong>🏷️ Category:</strong>
                <span>{event.category}</span>
              </div>
              <div className="detail-item">
                <strong>📊 Status:</strong>
                <span className={`status-badge ${event.status}`}>{event.status}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>📝 Description</h3>
            <p className="modal-description">{event.description}</p>
          </div>

          {hasRegistrationLink && (
            <div className="modal-footer">
              <button className="register-btn" onClick={handleRegisterClick}>
                🔗 Register for this Event
              </button>
              <p className="register-note">You'll be redirected to the registration form</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;

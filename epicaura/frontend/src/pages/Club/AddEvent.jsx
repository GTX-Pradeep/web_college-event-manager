import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './ClubPages.css';

const AddEvent = () => {
  const { getAuthHeader, user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Tech',
    date: '',
    startTime: '',
    endTime: '',
    venue: '',
    auditorium: 'Opera House',
    poster: '',
    registrationLink: '',
    isPaid: false,
    price: 0,
    description: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [posterFile, setPosterFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const auditoriums = [
    'Opera House', 'MRD Auditorium', 'Auditorium 1A', 'Auditorium 1B',
    'Auditorium 2A', 'Auditorium 2B', 'F Block Seminar Hall',
    'Seminar Hall 1', 'Seminar Hall 2', 'Seminar Hall 3',
    'Seminar Hall 4', 'Seminar Hall 5', 'Seminar Hall 6',
    '13th Floor', 'PESU 52'
  ];

  const categories = ['Tech', 'Cultural', 'Sports', 'Academic', 'Workshop', 'Other'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setPosterFile(file);
    
    // Upload immediately
    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('poster', file);

    try {
      const response = await axios.post('/api/upload/poster', formDataUpload, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setFormData({ ...formData, poster: response.data.url });
      alert('Poster uploaded successfully!');
    } catch (error) {
      alert('Failed to upload poster: ' + (error.response?.data?.message || 'Unknown error'));
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const eventData = {
        ...formData,
        clubName: user.name,
        price: formData.isPaid ? parseFloat(formData.price) : 0
      };

      const response = await axios.post(
        '/api/events',
        eventData,
        { headers: getAuthHeader() }
      );

      if (response.data.message) {
        alert('Event created successfully! ✅');
        navigate('/your-events');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event');
    }
    setLoading(false);
  };

  return (
    <div className="club-page">
      <div className="container">
        <div className="page-header">
          <h1>➕ Add New Event</h1>
          <p>Create and publish your event</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="event-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-row">
              <div className="form-group">
                <label>Event Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter event name"
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <label>Start Time *</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>End Time *</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Venue *</label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                  placeholder="Enter venue location"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Auditorium *</label>
                <select name="auditorium" value={formData.auditorium} onChange={handleChange}>
                  {auditoriums.map(aud => (
                    <option key={aud} value={aud}>{aud}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Poster Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
              />
              {uploading && <small style={{color: '#667eea'}}>Uploading...</small>}
              {formData.poster && (
                <div style={{marginTop: '10px'}}>
                  <img src={formData.poster} alt="Poster preview" style={{maxWidth: '200px', borderRadius: '8px'}} />
                  <p style={{fontSize: '12px', color: '#666', marginTop: '5px'}}>Uploaded poster</p>
                </div>
              )}
              <small style={{color: '#666', fontSize: '12px', marginTop: '5px', display: 'block'}}>
                Upload an image (JPG, PNG, GIF, WebP - Max 5MB)
              </small>
            </div>

            <div className="form-group">
              <label>Registration Link (Google Forms, etc.)</label>
              <input
                type="url"
                name="registrationLink"
                value={formData.registrationLink}
                onChange={handleChange}
                placeholder="https://forms.google.com/your-form-link (Optional)"
              />
              <small style={{color: '#666', fontSize: '12px', marginTop: '5px', display: 'block'}}>
                Add a registration/Google Form link for attendees to register. Leave empty if not needed.
              </small>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="isPaid"
                  checked={formData.isPaid}
                  onChange={handleChange}
                />
                Paid Event
              </label>
            </div>

            {formData.isPaid && (
              <div className="form-group">
                <label>Entry Fee (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required={formData.isPaid}
                  min="0"
                  placeholder="Enter amount"
                />
              </div>
            )}

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Describe your event..."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Creating Event...' : 'Create Event'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;

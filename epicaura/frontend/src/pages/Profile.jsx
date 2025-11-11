import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const { user, updateProfilePicture, getAuthHeader } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.profilePicture || '');
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'url'
  const [profilePictureUrl, setProfilePictureUrl] = useState(user?.profilePicture || '');
  const [currentUser, setCurrentUser] = useState(user);
  
  // User stats
  const [userStats, setUserStats] = useState({
    eventsCreated: 0,
    totalAttendees: 0,
    upcomingEvents: 0
  });

  useEffect(() => {
    // Fetch latest user data to get SRN and other updated info
    fetchUserProfile();
    
    if (user?.role === 'club') {
      fetchUserStats();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/api/auth/me', {
        headers: getAuthHeader()
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setCurrentUser(user); // Fallback to context user
    }
  };

  const fetchUserStats = async () => {
    try {
      const response = await axios.get('/api/events/my-events', {
        headers: getAuthHeader()
      });
      const events = response.data;
      
      const now = new Date();
      const upcoming = events.filter(e => new Date(e.date) >= now).length;
      
      setUserStats({
        eventsCreated: events.length,
        upcomingEvents: upcoming,
        totalAttendees: events.reduce((acc, e) => acc + (e.attendees || 0), 0)
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage('Please select an image file ❌');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('File size must be less than 5MB ❌');
        return;
      }
      
      setSelectedFile(file);
      setMessage('');
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file first ❌');
      return;
    }

    setUploadLoading(true);
    setMessage('');

    try {
      // Upload file to server
      const formData = new FormData();
      formData.append('profile', selectedFile);

      const uploadResponse = await axios.post('/api/upload/profile', formData, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data'
        }
      });

      const imageUrl = uploadResponse.data.url;

      // Update user profile with the new image URL
      const result = await updateProfilePicture(imageUrl);
      
      if (result.success) {
        setMessage('Profile picture updated successfully! ✅');
        setPreviewUrl(imageUrl);
        setSelectedFile(null);
      } else {
        setMessage('Failed to update profile picture ❌');
      }
    } catch (error) {
      setMessage('Error uploading file: ' + (error.response?.data?.message || error.message) + ' ❌');
    }
    
    setUploadLoading(false);
  };

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const result = await updateProfilePicture(profilePictureUrl);
    
    if (result.success) {
      setMessage('Profile picture updated successfully! ✅');
      setPreviewUrl(profilePictureUrl);
    } else {
      setMessage('Failed to update profile picture ❌');
    }
    
    setLoading(false);
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>👤 My Profile</h1>
          <p>Manage your account settings and information</p>
        </div>

        <div className="profile-container">
          {/* Left Column - Profile Info */}
          <div className="profile-left">
            <div className="profile-card">
              <div className="profile-pic-section">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt={currentUser?.name} 
                    className="profile-pic-large"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="no-profile-pic" style={{display: previewUrl ? 'none' : 'flex'}}>
                  <span>👤</span>
                  <p>No profile picture</p>
                </div>
              </div>

              <div className="profile-info-card">
                <h2>{currentUser?.name}</h2>
                <p className="role-badge">
                  {currentUser?.role === 'club' ? '🏛️ Club Account' : '👨‍🎓 Student Account'}
                </p>
                <p className="user-email">📧 {currentUser?.email}</p>
              </div>
            </div>

            {/* Stats Card - Only for clubs */}
            {currentUser?.role === 'club' && (
              <div className="stats-card">
                <h3>📊 Your Statistics</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-number">{userStats.eventsCreated}</span>
                    <span className="stat-label">Total Events</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{userStats.upcomingEvents}</span>
                    <span className="stat-label">Upcoming Events</span>
                  </div>
                </div>
              </div>
            )}

            {/* Account Info */}
            <div className="account-info-card">
              <h3>ℹ️ Account Information</h3>
              <div className="info-row">
                <span className="info-label">Account Type:</span>
                <span className="info-value">{currentUser?.role === 'club' ? 'Club Organizer' : 'Student'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{currentUser?.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{currentUser?.name}</span>
              </div>
              {currentUser?.role === 'student' && currentUser?.srn && (
                <div className="info-row">
                  <span className="info-label">SRN:</span>
                  <span className="info-value">{currentUser?.srn}</span>
                </div>
              )}
              <div className="info-row">
                <span className="info-label">Member Since:</span>
                <span className="info-value">2025</span>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Picture Upload */}
          <div className="profile-right">
            <div className="upload-section">
              <h2>📸 Update Profile Picture</h2>
              
              {message && (
                <div className={message.includes('✅') ? 'success-message' : 'error-message'}>
                  {message}
                </div>
              )}

              {/* Tab Switcher */}
              <div className="tab-switcher">
                <button 
                  className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
                  onClick={() => setActiveTab('upload')}
                >
                  📤 Upload File
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'url' ? 'active' : ''}`}
                  onClick={() => setActiveTab('url')}
                >
                  🔗 Use URL
                </button>
              </div>

              {/* File Upload Tab */}
              {activeTab === 'upload' && (
                <div className="upload-tab">
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      id="profile-pic-input"
                      accept="image/*"
                      onChange={handleFileSelect}
                      style={{display: 'none'}}
                    />
                    <label htmlFor="profile-pic-input" className="file-input-label">
                      <span className="upload-icon">📁</span>
                      <span>{selectedFile ? selectedFile.name : 'Choose an image file'}</span>
                    </label>
                  </div>

                  {selectedFile && (
                    <div className="file-info">
                      <p>✓ File selected: {selectedFile.name}</p>
                      <p>Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
                    </div>
                  )}

                  <button 
                    onClick={handleFileUpload} 
                    className="upload-btn"
                    disabled={!selectedFile || uploadLoading}
                  >
                    {uploadLoading ? '⏳ Uploading...' : '📤 Upload & Save'}
                  </button>
                </div>
              )}

              {/* URL Tab */}
              {activeTab === 'url' && (
                <div className="url-tab">
                  <form onSubmit={handleUrlSubmit}>
                    <div className="form-group">
                      <label>Image URL</label>
                      <input
                        type="url"
                        value={profilePictureUrl}
                        onChange={(e) => {
                          setProfilePictureUrl(e.target.value);
                          setPreviewUrl(e.target.value);
                        }}
                        placeholder="https://example.com/your-image.jpg"
                        required
                      />
                    </div>

                    <button type="submit" className="upload-btn" disabled={loading}>
                      {loading ? '⏳ Updating...' : '💾 Save URL'}
                    </button>
                  </form>
                </div>
              )}

              {/* Guidelines */}
              <div className="guidelines-section">
                <h3>� Guidelines</h3>
                <ul className="guidelines-list">
                  <li>✓ Use a clear, professional photo</li>
                  <li>✓ Square images work best (1:1 ratio)</li>
                  <li>✓ Recommended: 200x200px or larger</li>
                  <li>✓ Supported: JPG, PNG, GIF</li>
                  <li>✓ Maximum file size: 5MB</li>
                  <li>✓ Your face should be clearly visible</li>
                </ul>
              </div>

              {/* Preview Section */}
              {previewUrl && (
                <div className="preview-card">
                  <h3>🔍 Preview</h3>
                  <div className="preview-container">
                    <div className="preview-item">
                      <p>Navbar View:</p>
                      <img 
                        src={previewUrl} 
                        alt="Small preview" 
                        className="preview-small"
                      />
                    </div>
                    <div className="preview-item">
                      <p>Profile View:</p>
                      <img 
                        src={previewUrl} 
                        alt="Large preview" 
                        className="preview-large"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

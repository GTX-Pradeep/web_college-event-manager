import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    srn: '',
    branch: '',
    department: '',
    query: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/contact', formData);
      if (response.data.message) {
        setSubmitted(true);
        setFormData({
          name: '',
          srn: '',
          branch: '',
          department: '',
          query: ''
        });
      }
    } catch (err) {
      setError('Failed to submit query. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>Have a question? We're here to help!</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>Fill out the form and our team will get back to you within 24 hours.</p>
            
            <div className="info-items">
              <div className="info-item">
                <h3>📧 Email</h3>
                <p>support@epicaura.edu</p>
              </div>
              <div className="info-item">
                <h3>📍 Location</h3>
                <p>PES University Campus</p>
              </div>
              <div className="info-item">
                <h3>⏰ Office Hours</h3>
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            {submitted ? (
              <div className="success-message">
                <h2>✅ Query Submitted Successfully!</h2>
                <p>Thank you for contacting us. We'll get back to you soon.</p>
                <button onClick={() => setSubmitted(false)} className="submit-btn">
                  Submit Another Query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {error && <div className="error-message">{error}</div>}
                
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label>SRN *</label>
                  <input
                    type="text"
                    name="srn"
                    value={formData.srn}
                    onChange={handleChange}
                    required
                    placeholder="Enter your SRN"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Branch *</label>
                    <input
                      type="text"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      required
                      placeholder="e.g., CSE"
                    />
                  </div>

                  <div className="form-group">
                    <label>Department *</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Query *</label>
                  <textarea
                    name="query"
                    value={formData.query}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Type your query here..."
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Query'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

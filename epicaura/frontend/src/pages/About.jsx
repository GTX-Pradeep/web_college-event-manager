import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h1>About EpicAura</h1>
          <p className="subtitle">Your Gateway to College Events</p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2>🎯 Our Mission</h2>
            <p>
              EpicAura is designed to bridge the gap between students and clubs, making event discovery 
              and management seamless and efficient. We provide a centralized platform where students can 
              explore upcoming events and clubs can showcase their activities.
            </p>
          </section>

          <section className="about-section">
            <h2>✨ What We Offer</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>📅 For Students</h3>
                <ul>
                  <li>Browse all upcoming college events</li>
                  <li>Filter events by category and date</li>
                  <li>View past events and their details</li>
                  <li>Get complete event information with timings</li>
                  <li>Click on events to register instantly</li>
                  <li>Quick access to Google Forms registration</li>
                </ul>
              </div>
              <div className="feature-card">
                <h3>🏛️ For Clubs</h3>
                <ul>
                  <li>Create and manage events easily</li>
                  <li>Book auditoriums with time slots</li>
                  <li>Add registration/Google Forms links</li>
                  <li>Automatic time conflict detection</li>
                  <li>Track your event history</li>
                  <li>Reach wider student audience</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>🚀 Smart Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>⏰ Time-Based Booking</h3>
                <p>
                  Our smart booking system prevents double-booking by checking time slot conflicts 
                  automatically. Each event has a start and end time, ensuring smooth scheduling.
                </p>
              </div>
              <div className="feature-card">
                <h3>🔗 Registration Links</h3>
                <p>
                  Clubs can add Google Forms or any registration link to their events. Students can 
                  simply click on the event card to register - no need to search for links!
                </p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>🎓 About the Platform</h2>
            <p>
              Built with modern web technologies including React.js, Node.js, Express.js, and MongoDB, 
              EpicAura offers a smooth and responsive user experience. Our platform ensures that no 
              event goes unnoticed and every student stays connected with campus activities.
            </p>
          </section>

          <section className="about-section stats-section">
            <h2>📊 Platform Features</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>15+</h3>
                <p>Auditoriums Available</p>
              </div>
              <div className="stat-card">
                <h3>24/7</h3>
                <p>Platform Availability</p>
              </div>
              <div className="stat-card">
                <h3>100%</h3>
                <p>Free to Use</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;

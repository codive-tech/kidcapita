import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>KidCapita</h3>
            <p>Money Smarts for the Next Generation</p>
            <p className="footer-tagline">
              Empowering children with financial literacy through engaging, age-appropriate education.
            </p>
          </div>
          
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/programs">Our Programs</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Programs</h4>
            <ul className="footer-links">
              <li><Link to="/programs">All Programs</Link></li>
              <li><Link to="/programs">Level 1 (Ages 5-8)</Link></li>
              <li><Link to="/programs">Level 2 (Ages 9-12)</Link></li>
              <li><Link to="/programs">Level 3 (Ages 13-15)</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Get Started</h4>
            <ul className="footer-links">
              <li><Link to="/book-demo">Book a Demo</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 KidCapita. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


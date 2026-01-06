import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <span className="logo-text">KidCapita</span>
          </Link>
        </div>
        
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li><Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={closeMenu}>About Us</Link></li>
          <li><Link to="/programs" className={`nav-link ${isActive('/programs')}`} onClick={closeMenu}>Our Programs</Link></li>
          <li><Link to="/book-demo" className="btn-gold" onClick={closeMenu}>Book a Demo</Link></li>
        </ul>
        
        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


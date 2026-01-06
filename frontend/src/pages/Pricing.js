import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import './Pricing.css';

const Pricing = () => {
  const [pricing, setPricing] = useState({ levels: [], programs: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPricing();
  }, []);

  const loadPricing = async () => {
    try {
      const data = await api.getPricing();
      setPricing(data);
      setLoading(false);
    } catch (err) {
      console.error('Error loading pricing:', err);
      setLoading(false);
    }
  };

  return (
    <div className="pricing-page">
      <section className="page-hero">
        <div className="hero-content">
          <h1 className="hero-title">Simple, Transparent Pricing</h1>
          <p className="hero-subtitle">Invest in your child's financial future with our comprehensive programs</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Core Curriculum Levels</h2>
          <p className="section-subtitle">
            Each level includes 50 engaging classes with hands-on activities, projects, and assessments.
          </p>

          {loading ? (
            <p className="loading-text">Loading pricing...</p>
          ) : (
            <div className="pricing-grid">
              {pricing.levels.map((level, index) => (
                <div key={level._id} className={`pricing-card ${index === 1 ? 'featured' : ''}`}>
                  {index === 1 && <div className="pricing-badge">Most Popular</div>}
                  <h3>{level.name}</h3>
                  <p className="pricing-age">{level.ageRange}</p>
                  <p style={{ color: '#666', marginBottom: '1rem' }}>{level.totalClasses} Classes</p>
                  
                  <div className="pricing-amount">
                    ₹{level.priceINR.toLocaleString()}
                    <span className="pricing-currency">or {level.priceBHD} BHD</span>
                  </div>
                  
                  <Link 
                    to="/book-demo" 
                    className={`btn ${index === 1 ? 'btn-gold' : 'btn-outline'}`}
                    style={{ marginTop: '1.5rem', width: '100%' }}
                  >
                    Book a Demo
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="section bg-offwhite">
        <div className="container">
          <h2 className="section-title">Optional Add-On Programs</h2>
          <p className="section-subtitle">
            These are <strong>optional</strong> and complement the core curriculum.
          </p>

          <div className="important-note">
            <p>
              ⚠️ <strong>Note:</strong> These add-on programs are <em>not part of</em> the main 3-level financial literacy curriculum.
            </p>
          </div>

          {!loading && pricing.programs.length > 0 && (
            <div className="pricing-grid">
              {pricing.programs.map((program) => (
                <div key={program._id} className="pricing-card">
                  <h3>{program.name}</h3>
                  <p style={{ color: '#666', margin: '1rem 0' }}>{program.description}</p>
                  
                  <div className="pricing-amount">
                    ₹{program.priceINR.toLocaleString()}
                    <span className="pricing-currency">or {program.priceBHD} BHD</span>
                  </div>
                  
                  <p style={{ marginTop: '1rem', color: '#D4AF37', fontWeight: 600 }}>
                    <em>Optional Add-On</em>
                  </p>
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/programs" className="btn btn-outline">Learn More About Add-Ons</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container text-center">
          <h2>Ready to Get Started?</h2>
          <p className="cta-text">Book a free demo class and see the KidCapita difference</p>
          <div className="cta-buttons">
            <Link to="/book-demo" className="btn btn-gold-lg">Book a Demo</Link>
            <Link to="/contact" className="btn btn-white-outline-lg">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;


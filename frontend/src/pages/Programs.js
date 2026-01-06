import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import './Programs.css';

const Programs = () => {
  const [levels, setLevels] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load pricing data which includes both levels and programs
      const pricingData = await api.getPricing();
      
      // Load levels for curriculum details
      const levelsData = await api.getLevels();
      
      // Match pricing with levels
      const levelsWithPricing = pricingData.levels.map(priceLevel => {
        const levelDetails = levelsData.find(l => l.slug === priceLevel.slug);
        return {
          ...priceLevel,
          ...levelDetails
        };
      });
      
      setLevels(levelsWithPricing);
      setAddOns(pricingData.programs);
      setLoading(false);
    } catch (err) {
      console.error('Error loading programs:', err);
      setLoading(false);
    }
  };

  return (
    <div className="programs">
      <section className="page-hero">
        <div className="hero-content">
          <h1 className="hero-title">Our Programs</h1>
          <p className="hero-subtitle">Comprehensive financial literacy programs for Grade 1–10</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="important-note warning">
            <h2 style={{ marginBottom: '1rem', color: 'var(--black)', textAlign: 'center' }}>⚠️ Important Notice</h2>
            <p>
              Some programs on this page are <strong>optional add-ons</strong>. They are <strong>NOT part of</strong> 
              the main 3-level financial literacy curriculum. The essential financial literacy education is delivered 
              through our core curriculum levels.
            </p>
          </div>
        </div>
      </section>

      {/* Core Curriculum Levels */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Core Curriculum Programs</h2>
          <p className="section-subtitle">
            Our comprehensive 3-level financial literacy curriculum for Grade 1–10
          </p>

          {loading ? (
            <p className="loading-text">Loading programs...</p>
          ) : (
            <div className="pricing-grid">
              {levels.map((level, index) => (
                <div key={level._id} className={`pricing-card ${index === 1 ? 'featured' : ''}`}>
                  {index === 1 && <div className="pricing-badge">Most Popular</div>}
                  <h3>{level.name}</h3>
                  <p className="pricing-age">{level.ageRange}</p>
                  <p style={{ color: '#666', marginBottom: '1rem' }}>{level.totalClasses} Classes</p>
                  
                  <div className="pricing-amount">
                    ₹{level.priceINR.toLocaleString()}
                    <span className="pricing-currency">or {level.priceBHD} BHD</span>
                  </div>
                  
                  <p style={{ marginTop: '1rem', color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {level.description}
                  </p>
                  
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

      {/* Optional Add-Ons */}
      {!loading && addOns.length > 0 && (
        <section className="section bg-offwhite">
          <div className="container">
            <h2 className="section-title">Optional Add-On Programs</h2>
            <p className="section-subtitle">
              Enhance your child's learning with these specialized enrichment programs
            </p>

            <div className="important-note warning">
              <p>
                ⚠️ <strong>Note:</strong> These add-on programs are <em>optional</em> and <strong>not part of</strong> the main 3-level financial literacy curriculum.
              </p>
            </div>

            <div className="pricing-grid">
              {addOns.map((program, index) => (
                <div key={program._id} className="pricing-card">
                  <div className="feature-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    {index === 0 ? '💰' : '🚀'}
                  </div>
                  <h3>{program.name}</h3>
                  <p style={{ color: '#666', margin: '1rem 0' }}>{program.description}</p>
                  
                  <div className="pricing-amount">
                    ₹{program.priceINR.toLocaleString()}
                    <span className="pricing-currency">or {program.priceBHD} BHD</span>
                  </div>
                  
                  <p style={{ marginTop: '1rem', color: '#D4AF37', fontWeight: 600, fontStyle: 'italic' }}>
                    Optional Add-On
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section cta-section">
        <div className="container text-center">
          <h2>Ready to Get Started?</h2>
          <p className="cta-text">Book a free demo and see which program is right for your child</p>
          <div className="cta-buttons">
            <Link to="/book-demo" className="btn btn-gold-lg">Book a Demo</Link>
            <Link to="/about" className="btn btn-white-outline-lg">Learn More</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;


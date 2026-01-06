import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import './Curriculum.css';

const Curriculum = () => {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeLevel, setActiveLevel] = useState(null);

  useEffect(() => {
    loadCurriculum();
  }, []);

  const loadCurriculum = async () => {
    try {
      const data = await api.getLevels();
      setLevels(data);
      setLoading(false);
    } catch (err) {
      setError('Unable to load curriculum. Please try again later.');
      setLoading(false);
    }
  };

  const toggleLevel = (index) => {
    setActiveLevel(activeLevel === index ? null : index);
  };

  return (
    <div className="curriculum">
      {/* Page Header */}
      <section className="page-hero">
        <div className="hero-content">
          <h1 className="hero-title">Our Curriculum</h1>
          <p className="hero-subtitle">
            A comprehensive 3-level journey from basic money concepts to real-world financial mastery
          </p>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Progressive Financial Education</h2>
          <p className="overview-text">
            Each level contains <strong>50 classes</strong> organized into <strong>10 comprehensive units</strong>. 
            Students progress from foundational concepts to advanced financial topics through engaging activities, 
            projects, and real-world simulations.
          </p>

          {/* Important Note */}
          <div className="important-note">
            <h3>📚 Core Curriculum</h3>
            <p>
              This is the <strong>official KidCapita curriculum</strong> covering financial literacy for ages 5-15. 
              Optional add-on programs like KidVestor and KidVentor are available separately and are 
              <em> not replacements</em> for these core levels. <Link to="/programs">View optional programs →</Link>
            </p>
          </div>

          {/* Curriculum Accordion */}
          <div className="accordion">
            {loading && <p className="loading-text">Loading curriculum...</p>}
            {error && <p className="error-text">{error}</p>}
            
            {!loading && !error && levels.map((level, index) => (
              <div className="accordion-item" key={level._id} id={`level-${index + 1}`}>
                <div 
                  className={`accordion-header ${activeLevel === index ? 'active' : ''}`}
                  onClick={() => toggleLevel(index)}
                >
                  <div>
                    <h3 className="accordion-title">{level.name}</h3>
                    <p className="accordion-meta">{level.ageRange} • {level.totalClasses} Classes</p>
                  </div>
                  <span className="accordion-icon">▼</span>
                </div>
                
                <div className={`accordion-content ${activeLevel === index ? 'active' : ''}`}>
                  <div className="accordion-body">
                    <p className="level-description">{level.description}</p>
                    
                    <div className="unit-list">
                      {level.units.map((unit, unitIndex) => (
                        <div className="unit-card" key={unitIndex}>
                          <h4>{unit.title}</h4>
                          
                          <h5>Class Focus:</h5>
                          <ul>
                            {unit.classFocus.map((focus, i) => (
                              <li key={i}>{focus}</li>
                            ))}
                          </ul>
                          
                          <h5>Sample Activity:</h5>
                          <p><strong>{unit.sampleActivity}</strong></p>
                          
                          <h5>Key Outcome:</h5>
                          <p><em>{unit.keyOutcome}</em></p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container text-center">
          <h2>Ready to Start?</h2>
          <p className="cta-text">Book a free demo class and experience our curriculum firsthand</p>
          <div className="cta-buttons">
            <Link to="/book-demo" className="btn btn-gold-lg">Book a Demo</Link>
            <Link to="/pricing" className="btn btn-white-outline-lg">View Pricing</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Curriculum;


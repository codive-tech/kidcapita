import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Money habits, sorted early.</h1>
          <p className="hero-subtitle">
            Grade 1–10 online classes that teach kids how to earn, save, spend, and grow money with confidence.
          </p>
          <div className="hero-buttons">
            <Link to="/book-demo" className="btn btn-gold-lg">Book a Demo</Link>
            <Link to="/programs" className="btn btn-white-outline-lg">Our Programs</Link>
          </div>
        </div>
      </section>

      {/* Why KidCapita Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Choose KidCapita?</h2>
          <p className="section-subtitle">Building financial confidence from an early age</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Age-Appropriate</h3>
              <p>Three carefully designed levels for ages 5-8, 9-12, and 13-15, ensuring content matches your child's development.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Global & Online</h3>
              <p>Access quality financial education from anywhere in the world with our interactive online classes.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Small Batches</h3>
              <p>Maximum 10 students per batch ensures personalized attention and active participation.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Comprehensive</h3>
              <p>50 classes per level covering everything from basic saving to investing and entrepreneurship.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎮</div>
              <h3>Fun & Interactive</h3>
              <p>Learn through games, simulations, projects, and real-world activities that make finance exciting.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Real-World Skills</h3>
              <p>Practical knowledge they'll use throughout life: budgeting, saving, investing, and business basics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Levels Overview */}
      <section className="section bg-offwhite">
        <div className="container">
          <h2 className="section-title">Our 3-Level Journey</h2>
          <p className="section-subtitle">Progressive financial literacy from foundation to mastery</p>
          
          <div className="levels-grid">
            <div className="level-card">
              <div className="level-badge">Level 1</div>
              <h3>Early Money Explorers</h3>
              <p className="level-age">Ages 5-8</p>
              <p className="level-description">
                Discover what money is, learn the difference between needs and wants, and build saving habits through stories and play.
              </p>
              <ul className="level-highlights">
                <li>Understanding money basics</li>
                <li>Needs vs wants</li>
                <li>Saving & spending wisely</li>
                <li>First mini-business</li>
              </ul>
              <Link to="/programs" className="btn btn-outline-sm">View Details</Link>
            </div>

            <div className="level-card featured">
              <div className="level-badge gold">Level 2</div>
              <h3>Smart Spenders</h3>
              <p className="level-age">Ages 9-12</p>
              <p className="level-description">
                Master budgeting, explore digital money, understand banking, and launch your first business idea through teamwork.
              </p>
              <ul className="level-highlights">
                <li>Budgeting & planning</li>
                <li>Digital money & safety</li>
                <li>Banking basics</li>
                <li>Entrepreneurship</li>
              </ul>
              <Link to="/programs" className="btn btn-gold-sm">View Details</Link>
            </div>

            <div className="level-card">
              <div className="level-badge">Level 3</div>
              <h3>Teen Investors</h3>
              <p className="level-age">Ages 13-15</p>
              <p className="level-description">
                Build real-world confidence with investing, understanding taxes, exploring the digital economy, and developing leadership skills.
              </p>
              <ul className="level-highlights">
                <li>Investment fundamentals</li>
                <li>Taxes & civic responsibility</li>
                <li>Digital economy & fintech</li>
                <li>Leadership & teamwork</li>
              </ul>
              <Link to="/programs" className="btn btn-outline-sm">View Details</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container text-center">
          <h2>Ready to Start Your Child's Financial Journey?</h2>
          <p className="cta-text">Join hundreds of families building money smarts for the next generation</p>
          <div className="cta-buttons">
            <Link to="/book-demo" className="btn btn-gold-lg">Book a Free Demo</Link>
            <Link to="/programs" className="btn btn-white-outline-lg">View Programs</Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Book a Demo</h3>
              <p>Schedule a free demo class to see if KidCapita is right for your child.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Choose Your Level</h3>
              <p>We'll recommend the appropriate level based on your child's age.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Join a Batch</h3>
              <p>We form batches of 5-10 students. Your child joins the next available batch.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Start Learning</h3>
              <p>50 engaging classes with projects, games, and real-world activities!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


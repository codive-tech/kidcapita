import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about">
      {/* Page Header */}
      <section className="page-hero">
        <div className="hero-content">
          <h1 className="hero-title">About KidCapita</h1>
          <p className="hero-subtitle">
            Building financial confidence in the next generation through engaging, age-appropriate education.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Mission</h2>
          <p className="mission-text">
            At KidCapita, we believe that financial literacy is a fundamental life skill that should be taught from an early age. 
            Our mission is to empower children aged 5-15 with the knowledge, skills, and confidence to make smart money decisions 
            throughout their lives.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Expert Curriculum</h3>
              <p>Our 3-level curriculum is carefully designed by education and finance experts to match each age group's cognitive development and real-world needs.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌟</div>
              <h3>Engaging Learning</h3>
              <p>We make finance fun through interactive games, real-world simulations, creative projects, and collaborative activities that keep kids excited about learning.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Parent Partnership</h3>
              <p>We work closely with parents to reinforce concepts at home, providing regular updates and resources to support your child's financial education journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section bg-offwhite">
        <div className="container">
          <h2 className="section-title">Why Financial Literacy Matters</h2>
          <div className="story-content">
            <p>
              In today's complex financial world, children are exposed to money concepts earlier than ever before. 
              From online shopping to digital payments, the financial landscape is evolving rapidly. Yet traditional 
              education systems often overlook this crucial life skill.
            </p>
            <p>
              Research shows that children who learn about money management early are more likely to:
            </p>
            <ul>
              <li>Make informed financial decisions as adults</li>
              <li>Avoid debt and manage credit responsibly</li>
              <li>Save and invest for their future goals</li>
              <li>Understand the value of work and entrepreneurship</li>
              <li>Develop critical thinking about consumer choices</li>
            </ul>
            <p>
              KidCapita bridges this gap, providing structured, progressive financial education that prepares 
              children for real-world financial challenges and opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">What Makes KidCapita Different?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Progressive Learning Path</h3>
              <p>Our 3-level system grows with your child, from basic money concepts at ages 5-8 to investing and entrepreneurship by ages 13-15.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Practical Application</h3>
              <p>Every concept is reinforced with hands-on activities, simulations, and real-world projects that make learning tangible and memorable.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Small Class Sizes</h3>
              <p>With a maximum of 10 students per batch, every child receives personalized attention and actively participates in discussions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>Global Accessibility</h3>
              <p>Our online platform means quality financial education is accessible to families worldwide, regardless of location.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Flexible Batching</h3>
              <p>We form batches when we have 5-10 students ready, ensuring your child starts learning at the optimal time.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Measurable Progress</h3>
              <p>Regular assessments, project showcases, and parent updates help you track your child's growing financial confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-offwhite">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="value-icon">💡</div>
              <h3>Empowerment</h3>
              <p>We believe every child can master financial concepts when taught with the right approach.</p>
            </div>
            <div className="step">
              <div className="value-icon">🎨</div>
              <h3>Creativity</h3>
              <p>Learning about money should be fun, engaging, and spark curiosity about the world.</p>
            </div>
            <div className="step">
              <div className="value-icon">🤲</div>
              <h3>Responsibility</h3>
              <p>We teach not just personal finance, but also social responsibility and giving back.</p>
            </div>
            <div className="step">
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>We embrace modern financial concepts like digital payments, fintech, and impact investing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container text-center">
          <h2>Join the KidCapita Community</h2>
          <p className="cta-text">Give your child the gift of financial confidence</p>
          <div className="cta-buttons">
            <Link to="/book-demo" className="btn btn-gold-lg">Book a Free Demo</Link>
            <Link to="/programs" className="btn btn-white-outline-lg">Our Programs</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;


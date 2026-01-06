import React, { useState } from 'react';
import api from '../api/api';
import './BookDemo.css';

const BookDemo = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    childName: '',
    childAge: '',
    chosenLevel: '',
    chosenAddOns: [],
    preferredMonth: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        chosenAddOns: checked
          ? [...prev.chosenAddOns, value]
          : prev.chosenAddOns.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);

    // Convert childAge to number
    const submitData = {
      ...formData,
      childAge: parseInt(formData.childAge, 10)
    };

    console.log('Submitting booking:', submitData);

    try {
      const response = await api.createBooking(submitData);
      console.log('Booking response:', response);
      setSuccess(true);
      setFormData({
        parentName: '',
        parentEmail: '',
        parentPhone: '',
        childName: '',
        childAge: '',
        chosenLevel: '',
        chosenAddOns: [],
        preferredMonth: '',
        message: ''
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Booking submission error:', err);
      setError(err.message || 'Failed to submit booking. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="book-demo">
      <section className="page-hero" style={{ minHeight: '350px' }}>
        <div className="hero-content">
          <h1 className="hero-title">Book a Free Demo</h1>
          <p className="hero-subtitle">Experience the KidCapita difference firsthand. Schedule a free demo class for your child.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {success && (
            <div className="success-message">
              <strong>Thank you!</strong> Your demo request has been submitted successfully. We will contact you within 24 hours.
            </div>
          )}

          {error && (
            <div className="error-message">{error}</div>
          )}

          <div className="form-container">
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Demo Booking Form</h2>
            
            <form onSubmit={handleSubmit}>
              <h3 style={{ margin: '0 0 1rem', color: 'var(--gold)' }}>Parent/Guardian Information</h3>
              
              <div className="form-group">
                <label htmlFor="parentName">Full Name *</label>
                <input
                  type="text"
                  id="parentName"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="parentEmail">Email Address *</label>
                <input
                  type="email"
                  id="parentEmail"
                  name="parentEmail"
                  value={formData.parentEmail}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="parentPhone">Phone Number</label>
                <input
                  type="tel"
                  id="parentPhone"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleChange}
                  placeholder="+1234567890"
                />
              </div>

              <h3 style={{ margin: '2rem 0 1rem', color: 'var(--gold)' }}>Child Information</h3>
              
              <div className="form-group">
                <label htmlFor="childName">Child's Name *</label>
                <input
                  type="text"
                  id="childName"
                  name="childName"
                  value={formData.childName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="childAge">Child's Age *</label>
                <select
                  id="childAge"
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select age</option>
                  {[...Array(11)].map((_, i) => (
                    <option key={i + 5} value={i + 5}>{i + 5} years</option>
                  ))}
                </select>
              </div>

              <h3 style={{ margin: '2rem 0 1rem', color: 'var(--gold)' }}>Program Selection</h3>
              
              <div className="form-group">
                <label htmlFor="chosenLevel">Choose Level *</label>
                <select
                  id="chosenLevel"
                  name="chosenLevel"
                  value={formData.chosenLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select level</option>
                  <option value="Level 1 (Ages 5-8)">Level 1 – Early Money Explorers (Ages 5-8)</option>
                  <option value="Level 2 (Ages 9-12)">Level 2 – Smart Spenders (Ages 9-12)</option>
                  <option value="Level 3 (Ages 13-15)">Level 3 – Teen Investors (Ages 13-15)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Optional Add-Ons</label>
                <div className="checkbox-group">
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="kidvestor"
                      name="addOns"
                      value="KidVestor"
                      checked={formData.chosenAddOns.includes('KidVestor')}
                      onChange={handleChange}
                    />
                    <label htmlFor="kidvestor" style={{ fontWeight: 'normal', cursor: 'pointer' }}>
                      KidVestor (Advanced investing concepts)
                    </label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="kidventor"
                      name="addOns"
                      value="KidVentor"
                      checked={formData.chosenAddOns.includes('KidVentor')}
                      onChange={handleChange}
                    />
                    <label htmlFor="kidventor" style={{ fontWeight: 'normal', cursor: 'pointer' }}>
                      KidVentor (Entrepreneurship & maker program)
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="preferredMonth">Preferred Start Month</label>
                <select
                  id="preferredMonth"
                  name="preferredMonth"
                  value={formData.preferredMonth}
                  onChange={handleChange}
                >
                  <option value="">No preference</option>
                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Additional Comments or Questions</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us anything else we should know..."
                />
              </div>

              <button type="submit" className="form-submit" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Demo Request'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookDemo;


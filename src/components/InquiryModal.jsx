import React, { useState } from 'react';
import { X, Send, Mail, CheckCircle, MapPin, Phone, AlertTriangle, Loader2, Globe } from 'lucide-react';
import './InquiryModal.css';

export default function InquiryModal({ isOpen, onClose, initialType }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: initialType || 'General Inquiry',
    state: 'Uttar Pradesh',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [docketRef, setDocketRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.details || data.error || 'Server error');
      }

      setDocketRef(data.docketRef);
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Unable to submit your request. Please try again or contact us directly at +91 120 4896530.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setError('');
    setLoading(false);
    setDocketRef('');
    setFormData({
      name: '',
      phone: '',
      email: '',
      type: initialType || 'General Inquiry',
      state: 'Uttar Pradesh',
      message: ''
    });
    onClose();
  };

  return (
    <div className="inquiry-modal-overlay" onClick={onClose}>
      <div className="inquiry-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="inquiry-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={26} />
        </button>

        {!submitted ? (
          <div className="inquiry-form-layout">
            <div className="inquiry-sidebar">
              <div className="inquiry-badge">
                <Mail size={16} />
                <span>CONTACT & INQUIRY</span>
              </div>
              <h3>Contact Nexus Human Rights</h3>
              <p>
                Send us your grievance, fellowship query, team application, or general inquiry. Our team will get in touch with you promptly.
              </p>

              <div className="inquiry-office-info">
                <div className="info-row">
                  <MapPin size={16} className="info-icon" />
                  <span>Flat No. 12A01/B, Tower-S-3, Rishab Cloud 9, Sector-1, Vaishali, Ghaziabad, UP — 201010</span>
                </div>
                <div className="info-row">
                  <Phone size={16} className="info-icon" />
                  <span>+91 120 4896530 (Helpline)</span>
                </div>
                <div className="info-row">
                  <Mail size={16} className="info-icon" />
                  <a href="mailto:mail@nexushumanrightscoi.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                    mail@nexushumanrightscoi.com
                  </a>
                </div>
                <div className="info-row">
                  <Globe size={16} className="info-icon" />
                  <a href="https://nexushumanrightscoi.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    nexushumanrightscoi.com
                  </a>
                </div>
              </div>
            </div>

            <div className="inquiry-form-container">
              <h4>Contact Us</h4>

              {error && (
                <div className="inquiry-error-banner">
                  <AlertTriangle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="inquiry-form">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Inquiry Category *</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Legal Aid & Grievance">Legal Aid & Grievance</option>
                      <option value="Join Our Team">Join Our Team / Careers</option>
                      <option value="Fellowship 2026">Human Rights Fellowship 2026</option>
                      <option value="Volunteer Network">Volunteer Registration</option>
                      <option value="Partnership / CSR">Institutional Partnership / CSR</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>State / Region *</label>
                    <select 
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    >
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Other State">Other State in India</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Message / Details *</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Please provide details of your inquiry, message, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="inquiry-submit-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 size={16} className="inquiry-spinner" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="inquiry-success-box">
            <CheckCircle size={64} className="success-check-icon" />
            <h3>Message Successfully Sent</h3>
            <p className="success-reference">
              Reference ID: <strong>{docketRef}</strong>
            </p>
            <p className="success-message">
              Thank you, <strong>{formData.name}</strong>. Your message has been received. Our team will review your submission and contact you at <strong>{formData.phone}</strong> promptly.
            </p>
            <button className="inquiry-done-btn" onClick={handleReset}>
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

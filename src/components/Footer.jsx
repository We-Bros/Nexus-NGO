import React from 'react';
import { 
  Phone, Mail, MapPin, Youtube, 
  ArrowUp, Globe, ShieldCheck
} from 'lucide-react';
import './Footer.css';

export default function Footer({ org, navMenu }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" id="contact">
      <div className="container-fluid footer-inner-container">

        {/* Main Footer Content */}
        <div className="footer-main-grid">
          {/* Left Column: Organization, Address & Credentials */}
          <div className="footer-brand-column">
            <div className="ft-logo-wrap">
              <a href="#" className="ft-logo-link">
                <img src="/images/logo.jpeg" alt="Logo" className="ft-logo-img" />
                <div className="ft-logo-text">
                  <span className="ft-title">NEXUS HUMAN RIGHTS</span>
                  <span className="ft-subtitle">COUNCIL OF INDIA</span>
                </div>
              </a>
            </div>

            <div className="ft-address-box">
              <div className="ft-addr-line">
                <MapPin size={16} className="ft-addr-icon" />
                <p>
                  Flat No. 12A01/B, Tower-S-3, Rishab Cloud 9, Sector-1, Vaishali, Ghaziabad, Uttar Pradesh — 201010
                </p>
              </div>

              <div className="ft-contact-item">
                <Phone size={14} />
                <span>Phone: <a href="tel:+917705005573">+91 77050 05573</a></span>
              </div>
              <div className="ft-contact-item">
                <Mail size={14} />
                <span>Email: <a href="mailto:mail@nexushumanrightscoi.com">mail@nexushumanrightscoi.com</a></span>
              </div>
              <div className="ft-contact-item">
                <Globe size={14} />
                <span>Website: <a href="https://nexushumanrightscoi.com/" target="_blank" rel="noopener noreferrer">nexushumanrightscoi.com</a></span>
              </div>
              <div className="ft-contact-item ft-reg-no-line">
                <ShieldCheck size={14} className="ft-reg-icon" />
                <span>Reg. No: <strong>U88900UP2026NPL250995</strong></span>
              </div>
            </div>
          </div>

          {/* Right Columns: Navigation Menus */}
          <div className="footer-nav-columns">
            <div className="ft-link-col">
              <h4>Our Work</h4>
              <ul>
                <li><a href="#what-we-do">What We Do</a></li>
                <li><a href="#who-we-are">Who We Are</a></li>
                <li><a href="#where-we-work">Where We Work</a></li>
                <li><a href="#grievance">Emergency Legal Aid</a></li>
              </ul>
            </div>

            <div className="ft-link-col">
              <h4>About Us</h4>
              <ul>
                <li><a href="#leadership">Founders</a></li>
                <li><a href="#vision">Our Vision & Mission</a></li>
                <li><a href="#values">Core Values</a></li>
              </ul>
            </div>

            <div className="ft-link-col">
              <h4>Resources</h4>
              <ul>
                <li><a href="#contact">Contact & Office</a></li>
                <li><a href="#join-us">Get Involved</a></li>
              </ul>
            </div>

            <div className="ft-link-col">
              <h4>Get Involved</h4>
              <ul>
                <li><a href="#join-us">Human Rights Fellowship</a></li>
                <li><a href="#join-us">Open Positions</a></li>
                <li><a href="#join-us">Volunteer Network</a></li>
                <li><a href="#grievance">Legal Aid Grievance Desk</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Domains Bar */}
        <div className="footer-domains-bar">
          Official Domain: <strong><a href="https://nexushumanrightscoi.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>nexushumanrightscoi.com</a></strong>
        </div>

        {/* Bottom Bar: Copyright & YouTube */}
        <div className="footer-bottom-bar">
          <div className="ft-copyright">
            <p>© 2026 Nexus Human Rights Council of India. All Rights Reserved.</p>
          </div>

          <div className="ft-social-icons">
            <a 
              href={org.socialLinks.youtube} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="YouTube Channel"
              className="ft-youtube-link"
            >
              <Youtube size={18} />
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button 
        className="back-to-top-btn" 
        onClick={scrollToTop}
        aria-label="Scroll back to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}

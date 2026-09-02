import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ChevronDown, Phone, Mail, ShieldAlert } from 'lucide-react';
import './Header.css';

export default function Header({ navMenu, onOpenSearch, onOpenInquiry }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <header className={`site-header ${isScrolled ? 'is-sticky' : ''}`}>
      <div className="header-container">
        {/* Logo and Brand */}
        <a href="#" className="header-logo-group">
          <img 
            src="/images/logo.jpeg" 
            alt="Nexus Human Rights Council of India Logo" 
            className="header-logo-img" 
          />
          <div className="header-brand-text">
            <span className="brand-title">NEXUS HUMAN RIGHTS</span>
            <span className="brand-subtitle">COUNCIL OF INDIA</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navMenu.map((item, idx) => (
              <li 
                key={idx} 
                className={`nav-item ${item.children ? 'has-dropdown' : ''}`}
                onMouseEnter={() => setActiveDropdown(idx)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a href={item.href} className="nav-link">
                  <span>{item.title}</span>
                  {item.children && <ChevronDown size={14} className="dropdown-arrow" />}
                </a>

                {item.children && (
                  <ul className={`dropdown-menu ${activeDropdown === idx ? 'show-dropdown' : ''}`}>
                    {item.children.map((subItem, sIdx) => (
                      <li key={sIdx} className="dropdown-item">
                        <a href={subItem.href} className="dropdown-link">
                          {subItem.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Header Actions: Grievance/Inquiry Button + Search Button + Hamburger */}
        <div className="header-actions">
          <button 
            className="action-btn emergency-btn"
            onClick={onOpenInquiry}
            title="File Citizen Grievance / Legal Aid Request"
          >
            <ShieldAlert size={16} />
            <span className="emergency-btn-text">Legal Aid Desk</span>
          </button>

          <button 
            className="action-btn search-trigger-btn" 
            onClick={onOpenSearch}
            title="Search the Nexus website"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'drawer-open' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-brand">
            <img src="/images/logo.jpeg" alt="Logo" className="drawer-logo" />
            <span>Nexus Human Rights</span>
          </div>
          <button 
            className="drawer-close-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <div className="drawer-content">
          <ul className="mobile-nav-list">
            {navMenu.map((item, idx) => (
              <li key={idx} className="mobile-nav-item">
                <div 
                  className="mobile-nav-heading"
                  onClick={() => item.children ? toggleDropdown(idx) : setMobileMenuOpen(false)}
                >
                  <a href={item.href}>{item.title}</a>
                  {item.children && (
                    <ChevronDown 
                      size={18} 
                      className={`mobile-chevron ${activeDropdown === idx ? 'rotated' : ''}`} 
                    />
                  )}
                </div>

                {item.children && activeDropdown === idx && (
                  <ul className="mobile-submenu">
                    {item.children.map((sub, sIdx) => (
                      <li key={sIdx} className="mobile-subitem">
                        <a 
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {sub.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="drawer-contact-card">
            <h4>Registered Office</h4>
            <p>Flat No. 12A01/B, Tower-S-3, Rishab Cloud 9, Sector-1, Vaishali, Ghaziabad, UP — 201010</p>
            <div className="drawer-contact-links">
              <a href="tel:+911204896530"><Phone size={14} /> +91 120 4896530</a>
              <a href="mailto:contact@nhrci.org"><Mail size={14} /> contact@nhrci.org</a>
            </div>
            <button 
              className="drawer-grievance-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
            >
              <ShieldAlert size={16} /> File Grievance / Inquire
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)} />
      )}
    </header>
  );
}

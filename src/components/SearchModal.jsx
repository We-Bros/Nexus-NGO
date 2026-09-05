import React, { useState } from 'react';
import { Search, X, ArrowRight, BookOpen, Shield, Users, FileText } from 'lucide-react';
import './SearchModal.css';

export default function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const quickLinks = [
    { title: "Who We Are & What We Do", category: "Our Work", icon: <Shield size={16} />, href: "#who-we-are" },
    { title: "Contact & Inquiry Desk", category: "Our Work", icon: <Shield size={16} />, href: "#contact" },
    { title: "Founders & Board of Advisors", category: "About Us", icon: <Users size={16} />, href: "#leadership" },
    { title: "Our Core Mission & Vision", category: "About Us", icon: <BookOpen size={16} />, href: "#vision" }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    alert(`Searching for: "${searchQuery}"\nFound 12 matching articles, guides, and legal resources.`);
  };

  return (
    <div className="search-modal-overlay">
      <div className="search-modal-content">
        <button className="search-close-btn" onClick={onClose} aria-label="Close search">
          <X size={32} />
        </button>

        <div className="search-inner-box">
          <span className="search-pill">NEXUS KNOWLEDGE DISCOVERY</span>
          <h2 className="search-main-heading">Find what you are looking for...</h2>
          <p className="search-subtitle">
            Search across human rights charters, legal aid guides, leadership keynotes, and community updates.
          </p>

          <form onSubmit={handleSearchSubmit} className="search-form-bar">
            <Search className="search-form-icon" size={24} />
            <input 
              type="text" 
              placeholder="Enter keywords or phrases (e.g., Legal aid, Fellowship, Founders, Address...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="submit" className="search-submit-btn">
              SEARCH
            </button>
          </form>

          {/* Quick Topics */}
          <div className="search-quick-links">
            <span className="quick-label">POPULAR RESOURCES:</span>
            <div className="quick-tags">
              {quickLinks.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.href} 
                  onClick={onClose}
                  className="quick-tag-item"
                >
                  <span className="quick-icon">{item.icon}</span>
                  <span className="quick-text">{item.title}</span>
                  <ArrowRight size={14} className="quick-arrow" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

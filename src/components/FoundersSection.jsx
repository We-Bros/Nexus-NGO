import React from 'react';
import { Youtube, ExternalLink } from 'lucide-react';
import './FoundersSection.css';

export default function FoundersSection({ founders }) {
  const channelUrl = "https://www.youtube.com/@NexushumanRightcouncilofindia";

  return (
    <section className="founders-section section-padding section-boundary" id="leadership">
      <div className="container">
        <div className="section-title">
          <span className="section-badge">LEADERSHIP</span>
          <h2>Our Founders</h2>
          <p>
            The visionary leaders guiding our mission to defend human rights and empower communities across India.
          </p>
        </div>

        <div className="founders-grid">
          {founders.map((founder, idx) => (
            <div key={idx} className="founder-card">
              <div className="founder-avatar-wrapper">
                <div 
                  className="founder-initials-circle"
                  style={{ background: founder.accentColor || '#1c3e70' }}
                >
                  <span className="founder-initials-text">{founder.initials}</span>
                </div>
              </div>

              <div className="founder-info-body">
                <h3 className="founder-name">{founder.name}</h3>
                <span className="founder-role-badge">{founder.role}</span>
                <p className="founder-bio">{founder.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="founders-channel-link">
          <a 
            href={channelUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="channel-btn"
          >
            <Youtube size={20} />
            <span>Visit Our YouTube Channel</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

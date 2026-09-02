import React from 'react';
import { Play, Youtube, Award, ExternalLink } from 'lucide-react';
import './FoundersSection.css';

export default function FoundersSection({ founders, onOpenVideo }) {
  return (
    <section className="founders-section section-padding" id="leadership">
      <div className="container">
        <div className="section-title">
          <span className="section-badge">LEADERSHIP & VISION</span>
          <h2>Founders & Strategic Advisors</h2>
          <p>
            Dedicated legal jurists, human rights defenders, and public impact leaders guiding our mission to empower citizens across India.
          </p>
        </div>

        <div className="founders-grid">
          {founders.map((founder, idx) => (
            <div key={idx} className="founder-card">
              <div className="founder-image-wrapper">
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  className="founder-img" 
                />
                <div className="founder-image-overlay" />
                
                {/* Video Play Overlay */}
                <button 
                  className="founder-video-btn"
                  onClick={() => onOpenVideo(founder.youtubeId, `${founder.name} — Keynote Address`)}
                  title={`Watch ${founder.name}'s Keynote on YouTube`}
                >
                  <div className="yt-icon-box">
                    <Play size={18} fill="#ffffff" />
                  </div>
                  <span>Watch Keynote</span>
                </button>
              </div>

              <div className="founder-info-body">
                <span className="founder-role-badge">{founder.role}</span>
                <h3 className="founder-name">{founder.name}</h3>
                <p className="founder-bio">{founder.bio}</p>

                <div className="founder-card-footer">
                  <button 
                    className="founder-yt-link"
                    onClick={() => onOpenVideo(founder.youtubeId, `${founder.name} — Keynote Address`)}
                  >
                    <Youtube size={18} className="yt-red" />
                    <span>Watch Address</span>
                  </button>

                  <a 
                    href={founder.youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="founder-ext-link"
                    title="Open on YouTube"
                  >
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

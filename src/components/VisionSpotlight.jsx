import React from 'react';
import { ExternalLink, Eye, Compass, Youtube } from 'lucide-react';
import './VisionSpotlight.css';

export default function VisionSpotlight({ data }) {
  return (
    <section className="vision-spotlight-section" id="scroll-bottom">
      <div className="container">
        {/* Top Split: Narrative Left + Video Right */}
        <div className="spotlight-top-grid">
          <div className="spotlight-narrative">
            <span className="section-badge">{data.badge || "OUR CORE MISSION"}</span>
            <h2 className="spotlight-heading">{data.title}</h2>
            <div className="spotlight-description">
              <p>{data.description}</p>
            </div>
          </div>

          <div className="spotlight-video-col">
            <a 
              href={data.video.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="video-card-preview"
            >
              <img 
                src={data.video.thumbnail} 
                alt="Nexus Human Rights Video Preview" 
                className="video-thumb-img"
              />
              <div className="video-thumb-overlay" />
              
              <div className="video-play-trigger">
                <div className="play-circle-btn">
                  <Youtube size={28} />
                </div>
              </div>

              <div className="video-bottom-caption">
                <span className="video-tag">YOUTUBE CHANNEL</span>
                <p className="video-title-text">{data.video.title}</p>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Split: Vision Card & Mission Card */}
        <div className="vision-mission-grid" id="vision">
          <div className="vm-card vision-card">
            <div className="vm-header">
              <div className="vm-icon-box vision-icon">
                <Eye size={24} />
              </div>
              <h3>{data.vision.title}</h3>
            </div>
            <p className="vm-text">{data.vision.text}</p>
          </div>

          <div className="vm-card mission-card">
            <div className="vm-header">
              <div className="vm-icon-box mission-icon">
                <Compass size={24} />
              </div>
              <h3>{data.mission.title}</h3>
            </div>
            <p className="vm-text">{data.mission.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

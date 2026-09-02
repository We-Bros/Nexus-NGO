import React from 'react';
import './TopMarquee.css';

export default function TopMarquee({ text, link, badge }) {
  return (
    <div className="top-marquee-container">
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="marquee-item">
              {badge && <span className="marquee-badge">{badge}</span>}
              <a href={link || "#reports"} className="marquee-text">
                {text || "Read our latest Annual Human Rights & Impact Report here"}
              </a>
              <span className="marquee-separator">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

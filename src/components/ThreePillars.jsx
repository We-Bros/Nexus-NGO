import React from 'react';
import { ArrowRight } from 'lucide-react';
import './ThreePillars.css';

export default function ThreePillars({ pillars }) {
  return (
    <section className="three-pillars-section section-padding-sm" id="our-work">
      <div className="container">
        <div className="pillars-grid">
          {pillars.map((pillar) => (
            <div 
              key={pillar.id} 
              className="pillar-card" 
              style={{ backgroundColor: pillar.bgColor }}
              id={pillar.id}
            >
              {/* Image Container with matching overlay */}
              <div className="pillar-img-wrap">
                <img 
                  src={pillar.image} 
                  alt={pillar.title} 
                  className="pillar-img" 
                />
                <div 
                  className="pillar-img-overlay" 
                  style={{ backgroundColor: pillar.bgColor }} 
                />
              </div>

              {/* Pillar Content */}
              <div className="pillar-content">
                <h3 className="pillar-title">
                  <a href={pillar.linkHref}>{pillar.title}</a>
                </h3>
                <p className="pillar-desc">{pillar.description}</p>
                <div className="pillar-action">
                  <a href={pillar.linkHref} className="pillar-know-more">
                    <span>{pillar.linkText}</span>
                    <ArrowRight size={16} />
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

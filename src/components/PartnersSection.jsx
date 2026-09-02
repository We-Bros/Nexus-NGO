import React from 'react';
import { ArrowRight, Award, Shield, Landmark, Scale } from 'lucide-react';
import './PartnersSection.css';

export default function PartnersSection({ partners }) {
  const partnerIcons = [
    <Scale size={32} />,
    <Landmark size={32} />,
    <Shield size={32} />,
    <Award size={32} />
  ];

  return (
    <section className="partners-section" id="partners">
      <div className="container">
        <div className="partners-header text-center">
          <span className="section-badge">RECOGNITION & COLLABORATION</span>
          <h2 className="partners-main-title">{partners.heading}</h2>
          <p className="partners-subtitle">{partners.subheading}</p>
        </div>

        <div className="partners-grid-cards">
          {partners.items.map((item, idx) => (
            <div key={idx} className="partner-item-card">
              <div className="partner-icon-circle">
                {partnerIcons[idx % partnerIcons.length]}
              </div>
              <h4 className="partner-name">{item.name}</h4>
              <span className="partner-type-badge">{item.subtitle}</span>
            </div>
          ))}
        </div>

        <div className="partners-action-row">
          <a href="#partners" className="btn-primary">
            <span>Learn About Our Partnerships</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

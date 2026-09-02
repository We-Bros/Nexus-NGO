import React from 'react';
import { Maximize2, Shield, Heart, Scale, Globe, CheckCircle } from 'lucide-react';
import './InfographicsSection.css';

export default function InfographicsSection({ infographics, onOpenLightbox }) {
  const coreValues = [
    { title: "Respect", desc: "For human life and intrinsic personal dignity" },
    { title: "Equality", desc: "Non-discrimination under the law for all citizens" },
    { title: "Freedom", desc: "Liberty of expression, conscience, and movement" },
    { title: "Dignity", desc: "Protection from oppression and economic vulnerability" },
    { title: "A Better Tomorrow", desc: "Building sustainable and peaceful communities" }
  ];

  const keyRights = [
    "Right to life, liberty and security",
    "Right to equality and non-discrimination",
    "Right to education and personal development",
    "Right to freedom of thought, conscience and religion",
    "Right to work, fair wages and safe conditions",
    "Right to health, sanitation and a clean environment",
    "Right to a fair public trial and legal assistance",
    "Right to participate in cultural and civic life"
  ];

  return (
    <section className="infographics-section section-padding" id="infographics">
      <div className="container">
        <div className="section-title">
          <span className="section-badge">CONSTITUTIONAL CHARTER</span>
          <h2>Human Rights Core Framework & Office</h2>
          <p>
            Official educational infographics, constitutional rights charters, and registered premises of Nexus Human Rights Council of India.
          </p>
        </div>

        {/* Infographic Visual Gallery Grid */}
        <div className="infographics-gallery-grid">
          {infographics.map((item) => (
            <div 
              key={item.id} 
              className="infographic-visual-card"
              onClick={() => onOpenLightbox(item.image, item.title, item.subtitle)}
            >
              <div className="info-card-image-wrap">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="info-card-img" 
                />
                <div className="info-card-hover-overlay">
                  <div className="maximize-badge">
                    <Maximize2 size={20} />
                    <span>Click to Enlarge Poster</span>
                  </div>
                </div>
              </div>

              <div className="info-card-caption">
                <h4 className="info-card-title">{item.title}</h4>
                <p className="info-card-subtitle">{item.subtitle}</p>
                <span className="info-preview-snippet">{item.previewText}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Values & Rights Highlights Row */}
        <div className="framework-breakdown-row">
          {/* Left: 5 Core Values */}
          <div className="framework-col-left">
            <h3 className="framework-heading">Core Values</h3>
            <p className="framework-subtext">Fundamental pillars guiding every intervention and legal advocacy effort.</p>
            <div className="values-list">
              {coreValues.map((v, idx) => (
                <div key={idx} className="value-item">
                  <div className="value-num">{idx + 1}</div>
                  <div>
                    <h5 className="value-name">{v.title}</h5>
                    <p className="value-desc">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Examples of Guaranteed Human Rights */}
          <div className="framework-col-right">
            <h3 className="framework-heading">Universal Human Rights Examples</h3>
            <p className="framework-subtext">Universal, Inalienable, Indivisible, and Interdependent rights for everyone.</p>
            <div className="rights-checklist-grid">
              {keyRights.map((right, idx) => (
                <div key={idx} className="right-check-item">
                  <CheckCircle size={18} className="check-icon" />
                  <span>{right}</span>
                </div>
              ))}
            </div>
            
            <div className="un-quote-box">
              <p className="un-quote-text">
                “Human rights are not a privilege, they are a birthright.”
              </p>
              <span className="un-quote-source">— United Nations Universal Declaration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

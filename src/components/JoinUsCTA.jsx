import React from 'react';
import { ArrowRight, Sparkles, UserPlus } from 'lucide-react';
import './JoinUsCTA.css';

export default function JoinUsCTA({ joinUs, onOpenInquiry }) {
  return (
    <section className="join-us-section" id="join-us">
      <div className="container text-center">
        <div className="join-us-inner">
          <span className="join-us-pill">GET INVOLVED</span>
          <h2 className="join-us-title">{joinUs.heading}</h2>
          <p className="join-us-subtitle">{joinUs.subheading}</p>

          <div className="join-us-buttons-row">
            <button 
              className="join-btn-primary"
              onClick={() => onOpenInquiry('Join Our Team')}
            >
              <UserPlus size={18} />
              <span>JOIN OUR TEAM</span>
            </button>

            <button 
              className="join-btn-fellowship"
              onClick={() => onOpenInquiry('Fellowship 2026')}
            >
              <Sparkles size={18} />
              <span>JOIN OUR FELLOWSHIP</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

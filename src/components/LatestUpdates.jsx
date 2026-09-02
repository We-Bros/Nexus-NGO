import React from 'react';
import { ArrowRight, BellRing } from 'lucide-react';
import './LatestUpdates.css';

export default function LatestUpdates({ update, onOpenInquiry }) {
  return (
    <section className="latest-updates-strip" id="announcements">
      <div className="container">
        <div className="updates-row">
          <div className="updates-left">
            <div className="updates-icon-pulse">
              <BellRing size={20} />
            </div>
            <div className="updates-text-group">
              <span className="updates-kicker">LATEST OPPORTUNITY</span>
              <h4 className="updates-title">{update.headline}</h4>
            </div>
          </div>

          <div className="updates-right">
            <span className="updates-announcement-pill">{update.badge}</span>
            <a href={update.link || "#join-us"} className="updates-btn">
              <span>{update.buttonText}</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

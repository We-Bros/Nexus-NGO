import React from 'react';
import { Quote } from 'lucide-react';
import './QuoteSection.css';

export default function QuoteSection({ quoteData }) {
  return (
    <section className="quote-banner-section">
      <div className="container text-center">
        <div className="quote-banner-inner">
          <Quote size={40} className="quote-banner-icon" />
          <h2 className="quote-banner-text">
            {quoteData.quote || "“The best solutions to complex human rights problems often come from those closest to the issues.”"}
          </h2>
          <span className="quote-banner-author">
            {quoteData.author || "Nexus Human Rights Council of India"}
          </span>
        </div>
      </div>
    </section>
  );
}

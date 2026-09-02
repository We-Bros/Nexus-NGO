import React from 'react';
import { FileText, Download, BookOpen, ArrowUpRight } from 'lucide-react';
import './ReportsSection.css';

export default function ReportsSection({ reports, onOpenReport }) {
  return (
    <section className="reports-section" id="reports">
      <div className="container">
        <div className="section-title">
          <span className="section-badge">PUBLICATIONS & RESEARCH</span>
          <h2>Knowledge Hub & Reports</h2>
          <p>
            Groundbreaking empirical research, legal policy assessments, and frontline data insights on human rights protection in India.
          </p>
        </div>

        <div className="reports-grid">
          {reports.map((report) => (
            <div key={report.id} className="report-card-horizontal">
              <div className="report-cover-wrapper">
                <img 
                  src={report.image} 
                  alt={report.title} 
                  className="report-cover-img" 
                />
                <span className="report-badge-floating">{report.category}</span>
              </div>

              <div className="report-content-body">
                <div className="report-meta">
                  <span className="report-pages-tag">{report.pages}</span>
                  <span className="report-format-tag">PDF DOCUMENT</span>
                </div>

                <h3 className="report-title">{report.title}</h3>
                <p className="report-summary">{report.summary}</p>

                <div className="report-cta-row">
                  <a 
                    href="#infographics" 
                    className="report-download-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Opening "${report.title}" (PDF document)\nDownloading high-res report summary.`);
                    }}
                  >
                    <Download size={15} />
                    <span>Download Report</span>
                  </a>
                  <a 
                    href="#infographics" 
                    className="report-preview-link"
                  >
                    <span>View Highlights</span>
                    <ArrowUpRight size={15} />
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

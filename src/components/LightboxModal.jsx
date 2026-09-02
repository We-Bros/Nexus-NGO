import React from 'react';
import { X, Download, ZoomIn } from 'lucide-react';
import './LightboxModal.css';

export default function LightboxModal({ isOpen, onClose, image, title, subtitle }) {
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = `${title || 'nexus-infographic'}.jpeg`;
    link.click();
  };

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-header">
          <div className="lightbox-titles">
            <h4>{title}</h4>
            {subtitle && <p>{subtitle}</p>}
          </div>

          <div className="lightbox-controls">
            <button 
              className="lightbox-btn" 
              onClick={handleDownload}
              title="Download image"
            >
              <Download size={18} />
              <span>Download</span>
            </button>
            <button 
              className="lightbox-close-btn" 
              onClick={onClose}
              aria-label="Close poster view"
            >
              <X size={26} />
            </button>
          </div>
        </div>

        <div className="lightbox-image-container">
          <img src={image} alt={title || "Poster preview"} className="lightbox-img" />
        </div>
      </div>
    </div>
  );
}

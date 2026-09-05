import React, { useEffect } from 'react';
import { X, Download } from 'lucide-react';
import './LightboxModal.css';

export default function LightboxModal({ isOpen, onClose, image, title, subtitle }) {
  useEffect(() => {
    if (!isOpen) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = `${(title || 'nexus-infographic').toLowerCase().replace(/\s+/g, '-')}.jpeg`;
    link.click();
  };

  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true">
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
              type="button"
            >
              <Download size={18} />
              <span>Download</span>
            </button>
            <button 
              className="lightbox-close-btn" 
              onClick={onClose}
              aria-label="Close poster view"
              type="button"
            >
              <X size={24} />
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

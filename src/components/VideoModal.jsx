import React from 'react';
import { X } from 'lucide-react';
import './VideoModal.css';

export default function VideoModal({ isOpen, onClose, youtubeId, title }) {
  if (!isOpen) return null;

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="video-modal-header">
          <h4 className="video-modal-title">{title || "Nexus Human Rights Video Spotlight"}</h4>
          <button className="video-modal-close" onClick={onClose} aria-label="Close video">
            <X size={26} />
          </button>
        </div>

        <div className="video-iframe-container">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId || 'VoYC_NpmGNI'}?autoplay=1&rel=0`}
            title={title || "YouTube video player"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

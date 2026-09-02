import React from 'react';
import { Play, ArrowRight, Newspaper, Video } from 'lucide-react';
import './NewsAndVideo.css';

export default function NewsAndVideo({ data, onOpenVideo }) {
  return (
    <section className="news-and-video-section section-padding-sm" id="news-video">
      <div className="container">
        <div className="two-cards-grid">
          {/* Left: In The News Card */}
          <div className="news-card">
            <div className="news-inner">
              <div className="news-text-col">
                <div className="card-kicker">
                  <Newspaper size={14} />
                  <span>{data.news.tag}</span>
                </div>
                <h3 className="news-title">{data.news.title}</h3>
                <p className="news-source">Published in {data.news.source}</p>
                <a 
                  href={data.news.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="news-btn"
                >
                  <span>KNOW MORE</span>
                  <ArrowRight size={14} />
                </a>
              </div>

              <div className="news-image-col">
                <img 
                  src={data.news.image} 
                  alt="News highlight" 
                  className="news-img" 
                />
              </div>
            </div>
          </div>

          {/* Right: Featured Video Card */}
          <div className="video-spotlight-card">
            <div 
              className="video-spotlight-bg"
              style={{ backgroundImage: `url(${data.video.thumbnail})` }}
            />
            <div className="video-spotlight-overlay" />

            <div className="video-spotlight-content">
              <div className="card-kicker-light">
                <Video size={14} />
                <span>{data.video.tag}</span>
              </div>
              <h3 className="video-spotlight-title">{data.video.title}</h3>
              
              <button 
                className="video-watch-btn"
                onClick={() => onOpenVideo(data.video.youtubeId, data.video.title)}
              >
                <div className="play-icon-circle-sm">
                  <Play size={14} fill="currentColor" />
                </div>
                <span>{data.video.buttonText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

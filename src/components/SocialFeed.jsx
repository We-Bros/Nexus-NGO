import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import './SocialFeed.css';

export default function SocialFeed({ feed }) {
  const [likesState, setLikesState] = useState(
    feed.reduce((acc, item) => ({ ...acc, [item.id]: { count: item.likes, liked: false } }), {})
  );
  const [savedState, setSavedState] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleLike = (id) => {
    setLikesState((prev) => {
      const current = prev[id];
      return {
        ...prev,
        [id]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked
        }
      };
    });
  };

  const toggleSave = (id) => {
    setSavedState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const nextFeed = () => {
    setCurrentIndex((prev) => (prev + 1) % feed.length);
  };

  const prevFeed = () => {
    setCurrentIndex((prev) => (prev - 1 + feed.length) % feed.length);
  };

  return (
    <section className="social-feed-section" id="social-feed">
      <div className="container">
        <div className="section-title">
          <span className="section-badge">COMMUNITY & VOICES</span>
          <h2>Field Stories & Social Feed</h2>
          <p>
            Real moments, grassroot paralegal sessions, and citizen voices from our ongoing field interventions.
          </p>
        </div>

        <div className="social-carousel-wrapper">
          <button 
            className="social-nav-btn nav-prev"
            onClick={prevFeed}
            aria-label="Previous story"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="social-cards-grid">
            {feed.map((item, idx) => {
              const isLiked = likesState[item.id]?.liked;
              const likeCount = likesState[item.id]?.count || item.likes;
              const isSaved = savedState[item.id];

              return (
                <div key={item.id} className="social-post-card">
                  {/* Card Header: Profile Info */}
                  <div className="post-profile-header">
                    <div className="profile-avatar-wrap">
                      <img 
                        src="/images/logo.jpeg" 
                        alt="Nexus Human Rights Profile" 
                        className="profile-avatar-img" 
                      />
                    </div>
                    <div className="profile-text-wrap">
                      <h4 className="profile-username">{item.handle}</h4>
                      <span className="post-location-tag">
                        <MapPin size={12} />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Post Image */}
                  <div className="post-image-wrap">
                    <img 
                      src={item.image} 
                      alt="Field activity" 
                      className="post-main-img" 
                    />
                  </div>

                  {/* Post Action Icons */}
                  <div className="post-actions-bar">
                    <div className="actions-left-group">
                      <button 
                        className={`action-icon-btn ${isLiked ? 'is-liked' : ''}`}
                        onClick={() => toggleLike(item.id)}
                        aria-label="Like post"
                      >
                        <Heart size={20} fill={isLiked ? "#e53e3e" : "none"} color={isLiked ? "#e53e3e" : "#2d3748"} />
                      </button>
                      <button 
                        className="action-icon-btn"
                        onClick={() => alert("Comment feature: Sharing thoughts on field action.")}
                        aria-label="Comment on post"
                      >
                        <MessageCircle size={20} />
                      </button>
                      <button 
                        className="action-icon-btn"
                        onClick={() => alert("Link copied to clipboard! Share on WhatsApp / Socials.")}
                        aria-label="Share post"
                      >
                        <Send size={20} />
                      </button>
                    </div>

                    <button 
                      className={`action-icon-btn ${isSaved ? 'is-saved' : ''}`}
                      onClick={() => toggleSave(item.id)}
                      aria-label="Bookmark post"
                    >
                      <Bookmark size={20} fill={isSaved ? "#1c3e70" : "none"} color={isSaved ? "#1c3e70" : "#2d3748"} />
                    </button>
                  </div>

                  {/* Likes count & caption */}
                  <div className="post-caption-body">
                    <span className="post-likes-count">{likeCount} likes</span>
                    <p className="post-caption-text">
                      <strong>{item.handle}</strong> {item.caption}
                    </p>
                    <span className="post-tag-pill">{item.tag}</span>
                    <span className="post-time-stamp">{item.date}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button 
            className="social-nav-btn nav-next"
            onClick={nextFeed}
            aria-label="Next story"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}

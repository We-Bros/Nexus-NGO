import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ArrowRight } from 'lucide-react';
import './HeroSlider.css';

export default function HeroSlider({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (idx) => {
    setCurrentSlide(idx);
  };

  return (
    <div 
      className="hero-slider-section" 
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="slider-container">
        {slides.map((slide, idx) => (
          <div 
            key={slide.id} 
            className={`slide-item ${idx === currentSlide ? 'slide-active' : ''}`}
          >
            {/* Background Image with Overlay */}
            <div 
              className="slide-background"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="slide-overlay" />

            {/* Slide Content Box */}
            <div className="container slide-content-container">
              <div className="banner-textarea-section">
                <div className="banner-textarea-card">
                  <div className="slide-tag-badge">
                    {slide.tag || "NEXUS HUMAN RIGHTS"}
                  </div>
                  <h1 className="slide-headline">
                    {slide.headline}
                  </h1>
                  <p className="slide-subline">
                    {slide.subline}
                  </p>
                  <div className="slide-cta-wrapper">
                    <a href={slide.ctaLink} className="slide-cta-btn">
                      <span>{slide.ctaText}</span>
                      <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button 
          className="slider-arrow arrow-prev" 
          onClick={prevSlide}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          className="slider-arrow arrow-next" 
          onClick={nextSlide}
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots Indicators */}
        <div className="slider-dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`dot-indicator ${idx === currentSlide ? 'dot-active' : ''}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Scroll Down Anchor */}
        <a href="#scroll-bottom" className="hero-scroll-down" aria-label="Scroll down">
          <ChevronDown size={28} className="bounce-arrow" />
        </a>
      </div>
    </div>
  );
}

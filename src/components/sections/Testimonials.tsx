import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';

export const Testimonials: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIdx];

  return (
    <section className="section-py" style={{ background: 'var(--bg-cream)', position: 'relative' }}>
      <div className="container-narrow">
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <span className="section-eyebrow">COLLECTOR PERSPECTIVES</span>
          <h2 className="section-title">WORN WITH PURPOSE.</h2>
          <p className="section-subtitle">
            Reflections from our international patrons and horological collectors.
          </p>
        </div>

        {/* Testimonial Card Slider */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-light)',
            padding: '48px 40px',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative',
            textAlign: 'center'
          }}
        >
          {/* Quote Icon */}
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--bg-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto'
            }}
          >
            <Quote size={20} color="var(--color-champagne-gold)" />
          </div>

          {/* Rating Stars */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '20px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="var(--color-champagne-gold)" color="var(--color-champagne-gold)" />
            ))}
          </div>

          {/* Quote Body */}
          <blockquote
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              fontStyle: 'italic',
              color: 'var(--color-deep-brown)',
              lineHeight: '1.65',
              maxWidth: '720px',
              margin: '0 auto 28px auto'
            }}
          >
            “{current.quote}”
          </blockquote>

          {/* Customer Meta */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-deep-brown)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {current.author}
            </h4>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
              {current.location}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-champagne-gold)', fontWeight: 600, marginTop: '6px', display: 'inline-block' }}>
              Timepiece: {current.watchModel}
            </span>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '36px' }}>
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'var(--bg-cream)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)'
              }}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Pagination Dots */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  style={{
                    width: currentIdx === i ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: currentIdx === i ? 'var(--color-champagne-gold)' : 'var(--border-light)',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'var(--bg-cream)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)'
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

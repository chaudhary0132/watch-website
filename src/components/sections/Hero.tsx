import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { HeroWatch } from '../3d/HeroWatch';

export const Hero: React.FC = () => {
  const handleScrollToDiscover = () => {
    const nextSection = document.querySelector('#features');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreCollection = () => {
    const collectionSection = document.querySelector('#collection');
    if (collectionSection) {
      collectionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '120px',
        paddingBottom: '60px',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(180deg, #F5EEE5 0%, #EFE5D9 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Background Decorative Glows */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(176, 138, 69, 0.12) 0%, rgba(245, 238, 229, 0) 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Hero Editorial Typography */}
          <div style={{ maxWidth: '580px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: 'var(--color-champagne-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Sparkles size={13} color="var(--color-champagne-gold)" /> ARVÉN — FINE HOROLOGY
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(3rem, 6.5vw, 5.5rem)',
                fontWeight: 600,
                lineHeight: 1.02,
                color: 'var(--color-deep-brown)',
                marginBottom: '28px',
                letterSpacing: '-0.02em'
              }}
            >
              TIME,
              <br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-champagne-gold)' }}>
                REFINED.
              </span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.22rem)',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                marginBottom: '40px',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                maxWidth: '520px'
              }}
            >
              “Precision craftsmanship and timeless design, created for those who value every moment.”
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <button
                onClick={handleExploreCollection}
                className="btn btn-primary"
                style={{ padding: '18px 40px', fontSize: '0.85rem' }}
              >
                EXPLORE COLLECTION
              </button>

              <button
                onClick={handleScrollToDiscover}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                  padding: '12px 0'
                }}
                className="btn-text"
              >
                SCROLL TO DISCOVER <ArrowDown size={14} color="var(--color-champagne-gold)" />
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
                marginTop: '60px',
                paddingTop: '28px',
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              <div>
                <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-deep-brown)' }}>
                  100%
                </span>
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                  Swiss Calibre
                </span>
              </div>
              <div>
                <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-deep-brown)' }}>
                  40MM
                </span>
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                  Golden Ratio
                </span>
              </div>
              <div>
                <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-deep-brown)' }}>
                  18K
                </span>
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                  Gold Accents
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Watch Experience */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '580px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Soft backdrop vignette */}
            <div
              style={{
                position: 'absolute',
                width: '85%',
                height: '85%',
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.85) 0%, rgba(245,238,229,0) 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
              }}
            />

            <HeroWatch
              caseColor="#B08A45"
              strapColor="#4A3325"
              dialColor="#F5EEE5"
              interactive={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

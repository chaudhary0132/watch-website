import React from 'react';
import { WatchCardGraphic } from '../ui/WatchCardGraphic';
import { useQuickView } from '../../context/QuickViewContext';
import { PRODUCTS } from '../../data/products';
import { ArrowRight, Compass, ShieldCheck, Droplets, Clock } from 'lucide-react';

export const ArvenSignature: React.FC = () => {
  const { openQuickView } = useQuickView();
  const signatureWatch = PRODUCTS[0]; // ARVÉN Classic Signature

  return (
    <section className="section-py" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Visual Showcase */}
          <div
            style={{
              position: 'relative',
              background: 'radial-gradient(circle at center, #FFFFFF 0%, #E9DED1 100%)',
              borderRadius: 'var(--radius-xl)',
              padding: '60px 40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <div style={{ transform: 'scale(1.25)' }}>
              <WatchCardGraphic
                caseColor="#B08A45"
                dialColor="#F5EEE5"
                strapColor="#4A3325"
                size={260}
              />
            </div>

            {/* Floating Gold Quality Seal */}
            <div
              style={{
                position: 'absolute',
                bottom: '30px',
                right: '30px',
                background: 'rgba(251, 248, 243, 0.95)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 18px',
                boxShadow: 'var(--shadow-md)',
                textAlign: 'center'
              }}
            >
              <span style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-champagne-gold)', fontWeight: 700, display: 'block' }}>
                CALIBRE AV-101
              </span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-deep-brown)' }}>
                Swiss Automatic
              </span>
            </div>
          </div>

          {/* Right Column: Narrative & 4 Technical Specs Grid */}
          <div>
            <span className="section-eyebrow">THE SIGNATURE</span>
            <h2 className="section-title" style={{ marginBottom: '16px' }}>ARVÉN SIGNATURE</h2>

            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--color-dark-brown)', lineHeight: '1.7', marginBottom: '32px' }}>
              “A refined expression of the ARVÉN philosophy — balanced proportions, precise mechanics and timeless materials.”
            </p>

            {/* 4 Key Specifications Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px',
                marginBottom: '36px'
              }}
            >
              <div
                style={{
                  background: 'var(--bg-cream)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <Clock size={24} color="var(--color-champagne-gold)" />
                <div>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-deep-brown)', display: 'block' }}>
                    40MM
                  </span>
                  <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                    CASE SIZE
                  </span>
                </div>
              </div>

              <div
                style={{
                  background: 'var(--bg-cream)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <ShieldCheck size={24} color="var(--color-champagne-gold)" />
                <div>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-deep-brown)', display: 'block' }}>
                    SAPPHIRE
                  </span>
                  <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                    CRYSTAL
                  </span>
                </div>
              </div>

              <div
                style={{
                  background: 'var(--bg-cream)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <Droplets size={24} color="var(--color-champagne-gold)" />
                <div>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-deep-brown)', display: 'block' }}>
                    100M
                  </span>
                  <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                    WATER RESISTANCE
                  </span>
                </div>
              </div>

              <div
                style={{
                  background: 'var(--bg-cream)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <Compass size={24} color="var(--color-champagne-gold)" />
                <div>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-deep-brown)', display: 'block' }}>
                    AUTOMATIC
                  </span>
                  <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                    MOVEMENT
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openQuickView(signatureWatch)}
              className="btn btn-primary"
              style={{ padding: '16px 36px', fontSize: '0.85rem' }}
            >
              VIEW DETAILS <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { PRESS_MENTIONS } from '../../data/testimonials';

export const Press: React.FC = () => {
  return (
    <section
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '60px 0'
      }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="section-eyebrow" style={{ marginBottom: 0 }}>
            AS FEATURED IN
          </span>
        </div>

        {/* 4 Publication Text Badges Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            alignItems: 'center'
          }}
        >
          {PRESS_MENTIONS.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                padding: '24px 20px',
                textAlign: 'center',
                transition: 'all var(--transition-normal)'
              }}
              className="glass-card"
            >
              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  color: 'var(--color-deep-brown)',
                  textTransform: 'uppercase',
                  marginBottom: '10px'
                }}
              >
                {item.publication}
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: '1.5' }}>
                {item.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Compass, Sparkles, Shield, Truck } from 'lucide-react';

export const FeatureStrip: React.FC = () => {
  const features = [
    {
      icon: Compass,
      title: 'SWISS MOVEMENT',
      subtitle: 'Precision engineered'
    },
    {
      icon: Sparkles,
      title: 'PREMIUM MATERIALS',
      subtitle: 'Selected for quality'
    },
    {
      icon: Shield,
      title: '2 YEAR WARRANTY',
      subtitle: 'Confidence guaranteed'
    },
    {
      icon: Truck,
      title: 'COMPLIMENTARY SHIPPING',
      subtitle: 'Worldwide delivery'
    }
  ];

  return (
    <section
      id="features"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '36px 0'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '28px',
            alignItems: 'center'
          }}
        >
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '8px 12px'
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <Icon size={20} color="var(--color-champagne-gold)" />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: 'var(--color-deep-brown)',
                      textTransform: 'uppercase',
                      marginBottom: '2px'
                    }}
                  >
                    {feat.title}
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                    {feat.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

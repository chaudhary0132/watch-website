import React from 'react';
import { Award, ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

export const WhyArven: React.FC = () => {
  const benefits = [
    {
      icon: Award,
      title: 'SWISS QUALITY',
      subtitle: 'Precision mechanical movement',
      desc: 'Engineered and hand-assembled in Switzerland adhering to strict chronometric tolerance benchmarks.'
    },
    {
      icon: ShieldCheck,
      title: '2 YEAR WARRANTY',
      subtitle: 'Designed with confidence',
      desc: 'Comprehensive coverage on all mechanical components and internal movements worldwide.'
    },
    {
      icon: Truck,
      title: 'FREE SHIPPING',
      subtitle: 'Complimentary worldwide delivery',
      desc: 'Express door-to-door courier service with full declared value insurance coverage included.'
    },
    {
      icon: RotateCcw,
      title: 'EASY RETURNS',
      subtitle: 'Simple return experience',
      desc: '30-day complimentary return and exchange window with prepaid international return labels.'
    },
    {
      icon: Headphones,
      title: 'EXCLUSIVE SERVICE',
      subtitle: 'Dedicated customer support',
      desc: 'Personalized private concierge support available 24/7 for adjustments, sizing, and bespoke care.'
    }
  ];

  return (
    <section className="section-py" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">THE ARVÉN PROMISE</span>
          <h2 className="section-title">
            MORE THAN A WATCH.
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-champagne-gold)' }}>
              IT'S A SIGNATURE.
            </span>
          </h2>
          <p className="section-subtitle">
            An unwavering commitment to horological mastery and white-glove client dedication.
          </p>
        </div>

        {/* 5 Benefits Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px'
          }}
        >
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-cream)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  padding: '32px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'all var(--transition-normal)'
                }}
                className="product-card"
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '1px solid var(--border-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <Icon size={24} color="var(--color-champagne-gold)" />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-deep-brown)',
                    marginBottom: '6px'
                  }}
                >
                  {b.title}
                </h3>

                <span style={{ fontSize: '0.78rem', color: 'var(--color-champagne-gold)', fontWeight: 600, display: 'block', marginBottom: '10px' }}>
                  {b.subtitle}
                </span>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.55' }}>
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

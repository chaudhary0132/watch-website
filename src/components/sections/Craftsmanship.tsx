import React, { useState } from 'react';
import { Cpu, Disc, Sparkles, Layers, ShieldCheck, Gem } from 'lucide-react';

export const Craftsmanship: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState(0);

  const pillars = [
    {
      icon: Cpu,
      title: 'Mechanical Movement',
      detail: '28,800 VPH High-Beat Calibre',
      desc: 'Our proprietary calibres feature 28 synthetic rubies, Glucydur balance wheels, and Nivaflex mainsprings ensuring +/- 2 seconds daily chronometer precision.'
    },
    {
      icon: Disc,
      title: 'Watch Gears & Escapement',
      detail: 'Precision Micro-Milled Teeth',
      desc: 'Escapement wheels and pinions cut with diamond-tipped micro tools to tolerances below 0.002mm, providing near-frictionless kinetic power transfer.'
    },
    {
      icon: Sparkles,
      title: 'Sunburst & Enamel Dial',
      detail: 'Multi-Layered Optical Depth',
      desc: 'Each dial receives 12 layers of fine hand-applied lacquer or Grand Feu enamel, followed by diamond-polished solid 18k gold applied indices.'
    },
    {
      icon: Layers,
      title: 'Handcrafted Leather Strap',
      detail: 'Full-Grain Tuscan Calfskin',
      desc: 'Vegetable-tanned in Santa Croce, Italy. Hand-stitched with saddle-grade thread and finished with beveled, lacquered edge seals.'
    },
    {
      icon: ShieldCheck,
      title: 'Polished 18k Metal Alloy',
      detail: 'Hand-Finished Zaratsu Luster',
      desc: 'Alternating between mirror-polished bevels and satin-brushed flanks, hand-buffed for 8 hours on tin laps for distortion-free reflection.'
    },
    {
      icon: Gem,
      title: 'Sapphire Crystal Dome',
      detail: '9 Mohs Hardness Scale',
      desc: 'Double-domed synthetic corundum sapphire crystal treated with triple-layer anti-reflective coating on both inner and outer surfaces.'
    }
  ];

  const handleDiscoverProcess = () => {
    const processEl = document.querySelector('#process');
    if (processEl) {
      processEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="craftsmanship" className="section-py" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">THE CRAFTSMANSHIP</span>
          <h2 className="section-title">CRAFTED WITH PRECISION.</h2>
          <p className="section-subtitle" style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', fontSize: '1.15rem' }}>
            “Every ARVÉN timepiece is shaped by meticulous craftsmanship, attention to detail and a commitment to timeless design.”
          </p>
          <div style={{ marginTop: '24px' }}>
            <button onClick={handleDiscoverProcess} className="btn btn-outline">
              DISCOVER OUR PROCESS
            </button>
          </div>
        </div>

        {/* 6-Grid Horological Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isHovered = selectedPillar === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setSelectedPillar(idx)}
                style={{
                  background: isHovered ? 'var(--bg-cream)' : '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  border: isHovered ? '1px solid var(--color-champagne-gold)' : '1px solid var(--border-light)',
                  padding: '36px',
                  boxShadow: isHovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                  transition: 'all var(--transition-normal)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      background: 'var(--bg-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-gold)'
                    }}
                  >
                    <Icon size={24} color="var(--color-champagne-gold)" />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-serif)', color: 'var(--text-muted)', fontWeight: 600 }}>
                    0{idx + 1}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-deep-brown)', marginBottom: '4px' }}>
                  {pillar.title}
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-champagne-gold)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                  {pillar.detail}
                </span>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

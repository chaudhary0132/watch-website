import React, { useState } from 'react';
import { PenTool, Cog, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';

export const WatchmakingProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'DESIGN',
      subtitle: 'Proportions & Aesthetics',
      icon: PenTool,
      desc: 'Every ARVÉN watch starts with hand-drawn architectural sketches exploring Golden Ratio dial symmetry, ergonomic lug curves, and balanced tactile weight.',
      highlight: 'Over 200 hours of initial case geometry prototyping.'
    },
    {
      number: '02',
      title: 'ENGINEERING',
      subtitle: 'Swiss Tolerances & Metallurgy',
      icon: Cog,
      desc: 'Our horologists refine the mechanical train using multi-axis CNC micro-milling, matching 316L stainless steel with 18k yellow gold and ruby jewel bearings.',
      highlight: 'Calibre tolerances calibrated to 0.001mm accuracy.'
    },
    {
      number: '03',
      title: 'ASSEMBLY',
      subtitle: 'Hand-Built in Le Locle',
      icon: Wrench,
      desc: 'Inside cleanroom ateliers, a single master watchmaker painstakingly installs the mainspring, escapement, dial, and Dauphine hands under stereoscopic microscopes.',
      highlight: 'Over 140 individual components assembled by hand.'
    },
    {
      number: '04',
      title: 'FINISHING',
      subtitle: 'Zaratsu Polish & Chronometry',
      icon: Sparkles,
      desc: 'Each timepiece undergoes 15-day COSC-standard multi-position testing, water pressure sealing up to 100m, and final mirror chamfer inspection.',
      highlight: 'Certified with our ARVÉN Master Chronometer Seal.'
    }
  ];

  return (
    <section id="process" className="section-py" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">HOROLOGICAL TIMELINE</span>
          <h2 className="section-title">FROM IDEA TO TIMEPIECE</h2>
          <p className="section-subtitle">
            An uncompromising four-stage journey from conceptual vision to perpetual mechanical precision.
          </p>
        </div>

        {/* 4-Step Interactive Timeline */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            position: 'relative'
          }}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                style={{
                  background: isActive ? '#FFFFFF' : 'var(--bg-cream)',
                  borderRadius: 'var(--radius-lg)',
                  border: isActive ? '2px solid var(--color-champagne-gold)' : '1px solid var(--border-light)',
                  padding: '32px 24px',
                  boxShadow: isActive ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal)',
                  position: 'relative'
                }}
              >
                {/* Step Number Top */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: isActive ? 'var(--color-champagne-gold)' : 'var(--color-light-brown)'
                    }}
                  >
                    {step.number}
                  </span>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: isActive ? 'var(--bg-secondary)' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-light)'
                    }}
                  >
                    <Icon size={18} color="var(--color-champagne-gold)" />
                  </div>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-deep-brown)', marginBottom: '4px', letterSpacing: '0.06em' }}>
                  {step.title}
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-champagne-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '12px' }}>
                  {step.subtitle}
                </span>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
                  {step.desc}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--color-deep-brown)',
                    background: 'var(--bg-primary)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <CheckCircle2 size={13} color="var(--color-champagne-gold)" />
                  {step.highlight}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { WatchCustomizer3D } from '../3d/WatchCustomizer3D';

export const WatchCustomizerSection: React.FC = () => {
  return (
    <section id="bespoke" className="section-py" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">ARVÉN BESPOKE ATELIER</span>
          <h2 className="section-title">CREATE YOUR SIGNATURE</h2>
          <p className="section-subtitle">
            Configure your personalized timepiece in real-time. Choose case metallurgy, dial finishes, and artisanal leather straps.
          </p>
        </div>

        {/* 3D Customizer Studio Component */}
        <WatchCustomizer3D />
      </div>
    </section>
  );
};

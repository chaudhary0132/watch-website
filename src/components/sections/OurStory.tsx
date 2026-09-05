import React from 'react';
import { Compass, Sparkles, Feather } from 'lucide-react';

export const OurStory: React.FC = () => {
  const handleScrollToJournal = () => {
    const journalEl = document.querySelector('#journal');
    if (journalEl) {
      journalEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="story" className="section-py" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Brand Story Narrative */}
          <div style={{ maxWidth: '580px' }}>
            <span className="section-eyebrow">OUR HERITAGE</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', marginBottom: '24px' }}>
              TIMELESS BY DESIGN.
            </h2>

            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--color-dark-brown)', lineHeight: '1.7', marginBottom: '20px' }}>
              “We founded ARVÉN on a single enduring conviction: that in an era of ephemeral speed, a mechanical timepiece must remain an anchor of quiet substance and timeless individuality.”
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.75', marginBottom: '32px' }}>
              <p>
                From our dedicated atelier in the Jura mountains of Le Locle, Switzerland, our watchmakers unite classical hand-finishing techniques with cutting-edge micron engineering. We reject mass production in favor of limited, numbered production runs where every gear train, balance bridge, and bevel is inspected with uncompromising rigor.
              </p>
              <p>
                An ARVÉN is not merely an instrument to count passing hours; it is a physical manifestation of intention. A refined golden dialogue between the artisan who created it and the discerning individual who wears it.
              </p>
            </div>

            <button onClick={handleScrollToJournal} className="btn btn-primary" style={{ padding: '16px 36px' }}>
              DISCOVER OUR STORY
            </button>
          </div>

          {/* Right Column: Editorial Visual Card */}
          <div
            style={{
              position: 'relative',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-light)',
              padding: '40px',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            {/* Atelier Heritage Graphic */}
            <div
              style={{
                width: '100%',
                height: '320px',
                background: 'radial-gradient(circle at center, #FBF8F3 0%, #E9DED1 100%)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '24px',
                position: 'relative'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <Compass size={30} color="var(--color-champagne-gold)" />
              </div>

              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--color-deep-brown)', textTransform: 'uppercase', marginBottom: '6px' }}>
                ARVÉN
              </span>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.18em', color: 'var(--color-champagne-gold)', textTransform: 'uppercase', fontWeight: 600 }}>
                ATELIER D'HORLOGERIE • GENÈVE
              </span>

              <div style={{ marginTop: '24px', display: 'flex', gap: '20px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Origins</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-deep-brown)' }}>Le Locle, CH</span>
                </div>
                <div style={{ width: '1px', background: 'var(--border-subtle)' }} />
                <div>
                  <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Standards</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-deep-brown)' }}>COSC & Chronometer</span>
                </div>
              </div>
            </div>

            {/* Signature Horologist Stamp */}
            <div
              style={{
                marginTop: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-deep-brown)', display: 'block' }}>
                  Henri Laurent
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Master Horologist & Co-Founder</span>
              </div>

              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.4rem', color: 'var(--color-champagne-gold)' }}>
                Arvén
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

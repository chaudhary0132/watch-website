import React from 'react';

export const FinalCta: React.FC = () => {
  const handleShopCollection = () => {
    const el = document.querySelector('#collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #F5EEE5 0%, #E9DED1 100%)',
        padding: '130px 0',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      <div className="container-narrow">
        <span className="section-eyebrow">BEGIN YOUR JOURNEY</span>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
            color: 'var(--color-deep-brown)',
            lineHeight: 1.08,
            marginBottom: '20px'
          }}
        >
          YOUR TIME.
          <br />
          <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-champagne-gold)' }}>
            YOUR SIGNATURE.
          </span>
        </h2>

        <p
          style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            maxWidth: '560px',
            margin: '0 auto 40px auto',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic'
          }}
        >
          “Discover an ARVÉN timepiece designed to become part of your story.”
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <button
            onClick={handleShopCollection}
            className="btn btn-primary"
            style={{ padding: '18px 44px', fontSize: '0.88rem' }}
          >
            SHOP COLLECTION
          </button>
          <button
            onClick={handleContact}
            className="btn btn-outline"
            style={{ padding: '18px 44px', fontSize: '0.88rem' }}
          >
            CONTACT US
          </button>
        </div>
      </div>
    </section>
  );
};

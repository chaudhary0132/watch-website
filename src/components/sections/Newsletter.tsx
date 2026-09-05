import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles } from 'lucide-react';
import { useToast } from '../ui/Toast';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    setSubscribed(true);
    showToast('Welcome to the ARVÉN Private Society. Your 10% welcome code is ARVEN10.', 'success');
  };

  return (
    <section
      id="newsletter"
      style={{
        background: 'linear-gradient(135deg, #2C1E17 0%, #4A3325 100%)',
        color: 'var(--bg-cream)',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Radial Lighting */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(176, 138, 69, 0.15) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container-narrow" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Sparkles size={14} color="var(--color-champagne-gold)" />
          <span style={{ fontSize: '0.78rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-champagne-gold)', fontWeight: 600 }}>
            PRIVATE ATELIER DISPATCH
          </span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            color: '#FFFFFF',
            marginBottom: '18px',
            lineHeight: 1.1
          }}
        >
          STAY IN TIME.
        </h2>

        <p
          style={{
            fontSize: '1.05rem',
            color: '#DFCDBC',
            maxWidth: '560px',
            margin: '0 auto 36px auto',
            lineHeight: '1.7',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic'
          }}
        >
          “Join the ARVÉN community and be the first to discover new collections, private releases and stories from our world.”
        </p>

        {subscribed ? (
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              maxWidth: '480px',
              margin: '0 auto'
            }}
          >
            <CheckCircle2 size={32} color="var(--color-champagne-gold)" style={{ margin: '0 auto 12px auto' }} />
            <h4 style={{ color: '#FFFFFF', fontSize: '1.2rem', marginBottom: '6px' }}>
              Welcome to ARVÉN Society
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#DFCDBC' }}>
              Your private invitation and complimentary VIP code <strong>ARVEN10</strong> have been dispatched.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            style={{
              display: 'flex',
              maxWidth: '520px',
              margin: '0 auto',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(201, 169, 139, 0.35)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px',
              backdropFilter: 'blur(12px)'
            }}
          >
            <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
              <Mail size={18} color="#C9A98B" style={{ position: 'absolute', left: '16px' }} />
              <input
                type="email"
                required
                placeholder="ENTER YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 44px',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em'
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-gold"
              style={{
                padding: '14px 28px',
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                flexShrink: 0
              }}
            >
              SUBSCRIBE
            </button>
          </form>
        )}

        <span style={{ display: 'block', fontSize: '0.72rem', color: '#A39386', marginTop: '20px', letterSpacing: '0.05em' }}>
          We respect your privacy. Unsubscribe at any time.
        </span>
      </div>
    </section>
  );
};

import React from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube, Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      style={{
        background: '#2C1E17',
        color: '#FBF8F3',
        padding: '90px 0 40px 0',
        borderTop: '1px solid #4A3325'
      }}
    >
      <div className="container">
        {/* Main Footer 4-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px',
            marginBottom: '70px'
          }}
        >
          {/* Column 1: Brand Wordmark & Philosophy */}
          <div style={{ maxWidth: '320px' }}>
            <a
              href="#hero"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.85rem',
                fontWeight: 700,
                letterSpacing: '0.24em',
                color: '#FBF8F3',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '14px'
              }}
            >
              ARVÉN
            </a>

            <p style={{ fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-champagne-gold)', fontWeight: 600, marginBottom: '16px' }}>
              TIMELESS DESIGN. PRECISION CRAFTSMANSHIP.
            </p>

            <p style={{ fontSize: '0.85rem', color: '#C9A98B', lineHeight: '1.65', marginBottom: '24px' }}>
              Independent Swiss horology atelier committed to perpetual precision, hand-applied metallurgy, and bespoke personal commissions.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '14px' }}>
              {[
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Youtube, href: '#' }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(201, 169, 139, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-champagne-gold)',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: COLLECTION */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.18em', color: 'var(--color-champagne-gold)', textTransform: 'uppercase', marginBottom: '20px' }}>
              COLLECTION
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'All Watches', action: () => scrollTo('#collection') },
                { name: 'New Arrivals', action: () => scrollTo('#collection') },
                { name: 'Best Sellers', action: () => scrollTo('#collection') },
                { name: 'Limited Editions', action: () => scrollTo('#collection') },
                { name: 'Bespoke Atelier', action: () => scrollTo('#bespoke') }
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={item.action}
                    style={{
                      fontSize: '0.86rem',
                      color: '#DFCDBC',
                      transition: 'color var(--transition-fast)',
                      textAlign: 'left'
                    }}
                    className="footer-link-hover"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: CUSTOMER CARE */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.18em', color: 'var(--color-champagne-gold)', textTransform: 'uppercase', marginBottom: '20px' }}>
              CUSTOMER CARE
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Shipping & Delivery',
                'Returns & Exchanges',
                '2-Year Swiss Warranty',
                'Horological Care Guide',
                'Track Consignment'
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#contact"
                    style={{
                      fontSize: '0.86rem',
                      color: '#DFCDBC',
                      transition: 'color var(--transition-fast)'
                    }}
                    className="footer-link-hover"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: CONTACT & BOUTIQUE */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.18em', color: 'var(--color-champagne-gold)', textTransform: 'uppercase', marginBottom: '20px' }}>
              CONTACT & ATELIER
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#DFCDBC', fontSize: '0.86rem' }}>
                <MapPin size={16} color="var(--color-champagne-gold)" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>Rue du Rhône 42, 1204 Genève, Switzerland</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#DFCDBC', fontSize: '0.86rem' }}>
                <Phone size={16} color="var(--color-champagne-gold)" style={{ flexShrink: 0 }} />
                <span>+41 22 819 0000</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#DFCDBC', fontSize: '0.86rem' }}>
                <Mail size={16} color="var(--color-champagne-gold)" style={{ flexShrink: 0 }} />
                <span>concierge@arven-horology.ch</span>
              </li>
            </ul>

            <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(201,169,139,0.2)' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-champagne-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>
                Atelier Visiting Hours
              </span>
              <span style={{ fontSize: '0.8rem', color: '#FBF8F3' }}>Mon — Sat, 10:00 - 18:30 (By Appointment)</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div
          style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(201, 169, 139, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.78rem',
            color: '#A39386'
          }}
        >
          <div>
            © 2026 ARVÉN. All Rights Reserved. Master Horology Genève.
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" className="footer-link-hover">Privacy Policy</a>
            <a href="#" className="footer-link-hover">Terms of Service</a>
            <a href="#" className="footer-link-hover">Cookie Settings</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link-hover:hover {
          color: var(--color-champagne-gold) !important;
        }
      `}</style>
    </footer>
  );
};

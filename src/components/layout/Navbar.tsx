import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useQuickView } from '../../context/QuickViewContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { setIsSearchOpen } = useQuickView();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'COLLECTION', href: '#collection' },
    { name: 'CRAFTSMANSHIP', href: '#craftsmanship' },
    { name: 'ABOUT US', href: '#story' },
    { name: 'JOURNAL', href: '#journal' },
    { name: 'CONTACT', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          transition: 'all var(--transition-normal)',
          background: isScrolled ? 'rgba(251, 248, 243, 0.92)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
          padding: isScrolled ? '16px 0' : '28px 0',
          boxShadow: isScrolled ? '0 4px 20px rgba(44, 30, 23, 0.04)' : 'none'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand Wordmark */}
          <a
            href="#hero"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.65rem',
              fontWeight: 700,
              letterSpacing: '0.24em',
              color: 'var(--color-deep-brown)',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ARVÉN
          </a>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'none', gap: '32px', alignItems: 'center' }} className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                  position: 'relative',
                  padding: '6px 0'
                }}
                className="nav-link-hover"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Search Icon Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search timepieces and articles"
              style={{
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                borderRadius: '50%',
                transition: 'color var(--transition-fast)'
              }}
            >
              <Search size={20} strokeWidth={1.8} />
            </button>

            {/* Shopping Bag Icon with Live Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View shopping bag"
              style={{
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                position: 'relative'
              }}
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              {totalItemsCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    background: 'var(--color-champagne-gold)',
                    color: '#FFFFFF',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(176, 138, 69, 0.4)'
                  }}
                >
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* SHOP NOW Primary Button (Desktop) */}
            <a
              href="#collection"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#collection');
              }}
              className="btn btn-primary desktop-cta"
              style={{
                padding: '10px 22px',
                fontSize: '0.75rem',
                letterSpacing: '0.16em'
              }}
            >
              SHOP NOW
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="mobile-menu-btn"
              style={{
                display: 'none',
                color: 'var(--text-primary)',
                padding: '8px'
              }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 890,
            background: 'var(--bg-cream)',
            padding: '100px 32px 40px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            animation: 'fadeIn 0.3s ease forwards'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.75rem',
                  color: 'var(--color-deep-brown)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '12px'
                }}
              >
                <span>{link.name}</span>
                <ArrowRight size={18} color="var(--color-champagne-gold)" />
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleNavClick('#collection');
              }}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              EXPLORE COLLECTION
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              ARVÉN • FINE HOROLOGY • SWISS MADE
            </p>
          </div>
        </div>
      )}

      {/* CSS rules for navbar responsiveness */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-cta {
            display: inline-flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 899px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-cta {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
        .nav-link-hover {
          position: relative;
        }
        .nav-link-hover::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 1.5px;
          background: var(--color-champagne-gold);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        .nav-link-hover:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
};

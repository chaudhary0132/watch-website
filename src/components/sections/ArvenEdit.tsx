import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Eye, ShoppingBag, Award } from 'lucide-react';
import { EDIT_PRODUCTS } from '../../data/products';
import { WatchCardGraphic } from '../ui/WatchCardGraphic';
import { useQuickView } from '../../context/QuickViewContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../ui/Toast';

export const ArvenEdit: React.FC = () => {
  const { openQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleAddDirect = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    showToast(`Added ${product.name} to your shopping bag.`, 'success');
  };

  return (
    <section className="section-py" style={{ background: 'var(--bg-secondary)', overflow: 'hidden' }}>
      <div className="container">
        {/* Header with Carousel Navigation Arrows */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="section-eyebrow">CURATED SELECTION</span>
            <h2 className="section-title" style={{ marginBottom: '8px' }}>THE ARVÉN EDIT</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              The most requested timepieces across our international private client network.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-deep-brown)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'var(--color-deep-brown)',
                border: '1px solid var(--color-deep-brown)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--bg-cream)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Carousel Container */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '30px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '20px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {EDIT_PRODUCTS.map((product) => (
            <div
              key={product.id}
              onClick={() => openQuickView(product)}
              style={{
                flex: '0 0 calc(33.333% - 20px)',
                minWidth: '320px',
                scrollSnapAlign: 'start',
                background: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
                padding: '32px',
                boxShadow: 'var(--shadow-md)',
                cursor: 'pointer',
                transition: 'all var(--transition-normal)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              className="product-card"
            >
              {/* Bestseller Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '24px',
                  left: '24px',
                  background: 'var(--color-champagne-gold)',
                  color: '#FFFFFF',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: 'var(--shadow-gold)'
                }}
              >
                <Award size={12} /> BESTSELLER
              </div>

              {/* Watch Illustration Visual */}
              <div
                style={{
                  height: '280px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'radial-gradient(circle, #FFFFFF 0%, #F5EEE5 100%)',
                  borderRadius: 'var(--radius-md)',
                  margin: '20px 0'
                }}
              >
                <WatchCardGraphic
                  caseColor={product.colorOptions?.[0]?.caseColor || '#B08A45'}
                  dialColor={product.colorOptions?.[0]?.dialColor || '#F5EEE5'}
                  strapColor={product.colorOptions?.[0]?.strapColor || '#4A3325'}
                  hasChronograph={product.category === 'chronograph'}
                  size={210}
                />
              </div>

              {/* Product Info */}
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-champagne-gold)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                  SWISS CALIBRE
                </span>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-deep-brown)', marginBottom: '4px' }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  {product.subtitle}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Acquisition Price</span>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 600, color: 'var(--color-deep-brown)' }}>
                    ${product.price.toLocaleString()}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openQuickView(product);
                    }}
                    className="btn btn-outline"
                    style={{ padding: '12px 0', fontSize: '0.75rem', letterSpacing: '0.1em' }}
                  >
                    <Eye size={14} /> QUICK VIEW
                  </button>
                  <button
                    onClick={(e) => handleAddDirect(product, e)}
                    className="btn btn-primary"
                    style={{ padding: '12px 0', fontSize: '0.75rem', letterSpacing: '0.1em' }}
                  >
                    <ShoppingBag size={14} /> ADD TO BAG
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Eye, ShoppingBag, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { WatchCardGraphic } from '../ui/WatchCardGraphic';
import { useQuickView } from '../../context/QuickViewContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../ui/Toast';

export const FeaturedCollection: React.FC = () => {
  const { openQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [activeFilter, setActiveFilter] = useState<'all' | 'automatic' | 'chronograph' | 'heritage' | 'minimalist'>('all');

  const filteredProducts = activeFilter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeFilter);

  const handleAddDirect = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    showToast(`Added ${product.name} to your shopping bag.`, 'success');
  };

  return (
    <section id="collection" className="section-py" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">FEATURED COLLECTION</span>
          <h2 className="section-title">SIGNATURE TIMEPIECES</h2>
          <p className="section-subtitle">
            “Discover ARVÉN timepieces designed around precision, craftsmanship and timeless character.”
          </p>

          {/* Category Filter Tabs */}
          <div
            style={{
              display: 'inline-flex',
              gap: '10px',
              marginTop: '28px',
              padding: '6px',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-light)'
            }}
          >
            {[
              { id: 'all', label: 'All Models' },
              { id: 'automatic', label: 'Automatic' },
              { id: 'chronograph', label: 'Chronograph' },
              { id: 'heritage', label: 'Heritage' },
              { id: 'minimalist', label: 'Noir Edition' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: activeFilter === tab.id ? 'var(--color-deep-brown)' : 'transparent',
                  color: activeFilter === tab.id ? 'var(--bg-cream)' : 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column Product Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => openQuickView(product)}
              style={{ cursor: 'pointer' }}
            >
              {/* Product Badge */}
              {product.badge && (
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    zIndex: 3,
                    background: 'var(--color-deep-brown)',
                    color: 'var(--bg-cream)',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  {product.badge}
                </div>
              )}

              {/* Watch Illustration Container */}
              <div className="product-image-container">
                <WatchCardGraphic
                  caseColor={product.colorOptions?.[0]?.caseColor || '#B08A45'}
                  dialColor={product.colorOptions?.[0]?.dialColor || '#F5EEE5'}
                  strapColor={product.colorOptions?.[0]?.strapColor || '#4A3325'}
                  hasChronograph={product.category === 'chronograph'}
                  size={200}
                />
              </div>

              {/* Product Info */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--color-deep-brown)', marginBottom: '4px', letterSpacing: '0.04em' }}>
                    {product.name}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    {product.subtitle}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                    {product.description}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Price</span>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 600, color: 'var(--color-deep-brown)' }}>
                      ${product.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Dual Action Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuickView(product);
                      }}
                      className="btn btn-outline"
                      style={{ padding: '10px 0', fontSize: '0.72rem', letterSpacing: '0.1em' }}
                    >
                      <Eye size={14} /> VIEW WATCH
                    </button>
                    <button
                      onClick={(e) => handleAddDirect(product, e)}
                      className="btn btn-primary"
                      style={{ padding: '10px 0', fontSize: '0.72rem', letterSpacing: '0.1em' }}
                    >
                      <ShoppingBag size={14} /> ADD TO BAG
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { useQuickView } from '../../context/QuickViewContext';
import { PRODUCTS } from '../../data/products';
import { JOURNAL_ARTICLES } from '../../data/journal';
import { WatchCardGraphic } from '../ui/WatchCardGraphic';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openQuickView, openArticle } = useQuickView();
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return PRODUCTS;
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredArticles = useMemo(() => {
    if (!query.trim()) return JOURNAL_ARTICLES;
    const q = query.toLowerCase();
    return JOURNAL_ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="modal-overlay" style={{ alignItems: 'flex-start', paddingTop: '80px' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '720px',
          background: 'var(--bg-cream)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        {/* Search Header Input */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            background: '#FFFFFF'
          }}
        >
          <Search size={22} color="var(--color-champagne-gold)" />
          <input
            type="text"
            autoFocus
            placeholder="Search timepieces, calibres, stories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1.15rem',
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-primary)',
              background: 'transparent'
            }}
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
            style={{
              padding: '8px',
              borderRadius: '50%',
              color: 'var(--text-secondary)',
              background: 'var(--bg-primary)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Suggestions & Results Area */}
        <div style={{ maxHeight: '520px', overflowY: 'auto', padding: '24px 28px' }}>
          {/* Quick Tag Recommendations */}
          {!query && (
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                Popular Searches
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['Chronograph', 'Classic 40mm', 'Swiss Automatic', 'Heritage', 'Gold Dial', 'Le Locle Atelier'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      background: '#FFFFFF',
                      border: '1px solid var(--border-light)',
                      fontSize: '0.78rem',
                      color: 'var(--text-primary)',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Timepieces Section */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span className="section-eyebrow" style={{ marginBottom: 0 }}>TIMEPIECES ({filteredProducts.length})</span>
            </div>

            {filteredProducts.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No matching timepieces found.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      openQuickView(product);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '12px 16px',
                      background: '#FFFFFF',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                    className="search-item-hover"
                  >
                    <div style={{ width: '48px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <WatchCardGraphic
                        caseColor={product.colorOptions?.[0]?.caseColor || '#B08A45'}
                        dialColor={product.colorOptions?.[0]?.dialColor || '#F5EEE5'}
                        strapColor={product.colorOptions?.[0]?.strapColor || '#4A3325'}
                        size={40}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h4 style={{ fontSize: '0.95rem', color: 'var(--color-deep-brown)', fontWeight: 600 }}>
                          {product.name}
                        </h4>
                        {product.badge && (
                          <span
                            style={{
                              fontSize: '0.65rem',
                              background: 'var(--bg-secondary)',
                              color: 'var(--color-champagne-gold)',
                              padding: '2px 6px',
                              borderRadius: '2px',
                              fontWeight: 600
                            }}
                          >
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{product.subtitle}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 600, color: 'var(--color-deep-brown)' }}>
                        ${product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Journal Articles Section */}
          <div>
            <span className="section-eyebrow" style={{ marginBottom: '12px' }}>EDITORIAL JOURNAL ({filteredArticles.length})</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    openArticle(article);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <BookOpen size={16} color="var(--color-champagne-gold)" />
                    <div>
                      <h5 style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                        {article.title}
                      </h5>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {article.category} • {article.readTime}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={14} color="var(--text-muted)" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

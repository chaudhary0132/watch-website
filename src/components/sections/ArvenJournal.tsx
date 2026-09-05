import React from 'react';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../../data/journal';
import { useQuickView } from '../../context/QuickViewContext';

export const ArvenJournal: React.FC = () => {
  const { openArticle } = useQuickView();

  return (
    <section id="journal" className="section-py" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">EDITORIAL & ESSAYS</span>
          <h2 className="section-title">THE ARVÉN JOURNAL</h2>
          <p className="section-subtitle">
            Exploring the nuances of horology, design philosophy, and mechanical artistry.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}
        >
          {JOURNAL_ARTICLES.map((article, idx) => (
            <article
              key={article.id}
              onClick={() => openArticle(article)}
              style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all var(--transition-normal)'
              }}
              className="product-card"
            >
              {/* Graphic Banner */}
              <div
                style={{
                  height: '220px',
                  background: 'radial-gradient(circle at center, #FBF8F3 0%, #E9DED1 100%)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottom: '1px solid var(--border-subtle)',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '1px solid var(--border-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px'
                  }}
                >
                  <BookOpen size={24} color="var(--color-champagne-gold)" />
                </div>
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', color: 'var(--color-champagne-gold)', textTransform: 'uppercase', fontWeight: 600 }}>
                  ISSUE NO. 0{idx + 1}
                </span>
              </div>

              {/* Article Content Preview */}
              <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', color: 'var(--color-champagne-gold)', textTransform: 'uppercase' }}>
                      {article.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {article.readTime}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.35rem',
                      color: 'var(--color-deep-brown)',
                      lineHeight: '1.3',
                      marginBottom: '12px'
                    }}
                  >
                    {article.title}
                  </h3>

                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
                    {article.excerpt}
                  </p>
                </div>

                <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="btn-text" style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    READ ARTICLE <ArrowRight size={14} />
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {article.date}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

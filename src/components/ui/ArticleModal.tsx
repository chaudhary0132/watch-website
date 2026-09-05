import React from 'react';
import { X, Clock, Calendar, User, Share2 } from 'lucide-react';
import { useQuickView } from '../../context/QuickViewContext';
import { useToast } from './Toast';

export const ArticleModal: React.FC = () => {
  const { selectedArticle, closeArticle } = useQuickView();
  const { showToast } = useToast();

  if (!selectedArticle) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard.', 'info');
    }
  };

  return (
    <div className="modal-overlay" style={{ padding: '20px' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '760px',
          maxHeight: '85vh',
          background: 'var(--bg-cream)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-xl)',
          overflowY: 'auto',
          position: 'relative',
          padding: '44px',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        <button
          onClick={closeArticle}
          aria-label="Close article reader"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#FFFFFF',
            border: '1px solid var(--border-light)',
            padding: '8px',
            borderRadius: '50%',
            color: 'var(--text-secondary)'
          }}
        >
          <X size={20} />
        </button>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <span className="section-eyebrow" style={{ marginBottom: 0 }}>
              {selectedArticle.category}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={13} /> {selectedArticle.readTime}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} /> {selectedArticle.date}
            </span>
          </div>

          <h1 style={{ fontSize: '2.25rem', color: 'var(--color-deep-brown)', marginBottom: '16px', lineHeight: 1.2 }}>
            {selectedArticle.title}
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderTop: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              marginBottom: '28px'
            }}
          >
            <span style={{ fontSize: '0.85rem', color: 'var(--color-dark-brown)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
              <User size={14} color="var(--color-champagne-gold)" /> {selectedArticle.author}
            </span>
            <button
              onClick={handleShare}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              <Share2 size={13} /> Share Story
            </button>
          </div>

          {/* Blockquote feature */}
          <blockquote
            style={{
              borderLeft: '3px solid var(--color-champagne-gold)',
              paddingLeft: '20px',
              margin: '0 0 28px 0',
              fontFamily: 'var(--font-serif)',
              fontSize: '1.2rem',
              fontStyle: 'italic',
              color: 'var(--color-deep-brown)',
              lineHeight: 1.5
            }}
          >
            “{selectedArticle.quote}”
          </blockquote>

          {/* Article Paragraphs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {selectedArticle.content.map((paragraph, idx) => (
              <p key={idx} style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-primary)' }}>
                {paragraph}
              </p>
            ))}
          </div>

          <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', letterSpacing: '0.2em', color: 'var(--color-deep-brown)' }}>
              ARVÉN • LE LOCLE, SWITZERLAND
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Check, Shield, Truck, RotateCcw, ShoppingBag, Eye } from 'lucide-react';
import { useQuickView } from '../../context/QuickViewContext';
import { useCart } from '../../context/CartContext';
import { useToast } from './Toast';
import { WatchCardGraphic } from './WatchCardGraphic';

export const QuickViewModal: React.FC = () => {
  const { selectedProduct, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'heritage'>('overview');

  if (!selectedProduct) return null;

  const currentOption = selectedProduct.colorOptions?.[selectedColorIdx] || {
    name: 'Standard Edition',
    caseColor: '#B08A45',
    strapColor: '#4A3325',
    dialColor: '#F5EEE5'
  };

  const handleAddToBag = () => {
    addToCart(
      selectedProduct,
      quantity,
      currentOption.name,
      'Handcrafted Italian Leather',
      currentOption.dialColor
    );
    showToast(`Added ${selectedProduct.name} to your shopping bag.`, 'success');
    closeQuickView();
  };

  return (
    <div className="modal-overlay" style={{ padding: '20px' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '960px',
          maxHeight: '90vh',
          background: 'var(--bg-cream)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-xl)',
          overflowY: 'auto',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          aria-label="Close product quick view"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid var(--border-light)',
            padding: '8px',
            borderRadius: '50%',
            color: 'var(--text-secondary)'
          }}
        >
          <X size={20} />
        </button>

        {/* Left Column: Watch Presentation Graphic */}
        <div
          style={{
            background: 'radial-gradient(circle at center, #FFFFFF 0%, #E9DED1 100%)',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            borderRight: '1px solid var(--border-light)'
          }}
        >
          {selectedProduct.badge && (
            <span
              style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                background: 'var(--color-deep-brown)',
                color: 'var(--bg-cream)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              {selectedProduct.badge}
            </span>
          )}

          <div style={{ transform: 'scale(1.15)', margin: '20px 0' }}>
            <WatchCardGraphic
              caseColor={currentOption.caseColor}
              dialColor={currentOption.dialColor}
              strapColor={currentOption.strapColor}
              hasChronograph={selectedProduct.category === 'chronograph'}
              size={240}
            />
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textAlign: 'center' }}>
            {currentOption.name}
          </p>
        </div>

        {/* Right Column: Details, Specs, & Cart Trigger */}
        <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span className="section-eyebrow" style={{ marginBottom: '4px' }}>FINE HOROLOGY</span>
            <h2 style={{ fontSize: '2rem', color: 'var(--color-deep-brown)', marginBottom: '4px' }}>
              {selectedProduct.name}
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              {selectedProduct.subtitle}
            </p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--color-deep-brown)' }}>
                ${selectedProduct.price.toLocaleString()}
              </span>
              {selectedProduct.originalPrice && (
                <span style={{ fontSize: '1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  ${selectedProduct.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '16px' }}>
              {(['overview', 'specs', 'heritage'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '8px 0',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: activeTab === tab ? 'var(--color-champagne-gold)' : 'var(--text-secondary)',
                    borderBottom: activeTab === tab ? '2px solid var(--color-champagne-gold)' : '2px solid transparent'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            {activeTab === 'overview' && (
              <div>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.65', color: 'var(--text-primary)', marginBottom: '16px' }}>
                  {selectedProduct.description}
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {selectedProduct.features.map((feat, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      <Check size={14} color="var(--color-champagne-gold)" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
                <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Case Diameter</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{selectedProduct.specs.caseDiameter}</span>
                </div>
                <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Movement</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{selectedProduct.specs.movement}</span>
                </div>
                <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Crystal Glass</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{selectedProduct.specs.glass}</span>
                </div>
                <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Water Resistance</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{selectedProduct.specs.waterResistance}</span>
                </div>
              </div>
            )}

            {activeTab === 'heritage' && (
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '0.88rem', lineHeight: '1.65', color: 'var(--text-primary)', fontStyle: 'italic' }}>
                  “{selectedProduct.story}”
                </p>
              </div>
            )}

            {/* Finish & Color Chooser */}
            {selectedProduct.colorOptions && selectedProduct.colorOptions.length > 1 && (
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  Select Finish
                </span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {selectedProduct.colorOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColorIdx(idx)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: selectedColorIdx === idx ? '2px solid var(--color-champagne-gold)' : '1px solid var(--border-light)',
                        background: selectedColorIdx === idx ? '#FFFFFF' : 'transparent',
                        fontSize: '0.78rem',
                        fontWeight: 500,
                        color: 'var(--text-primary)'
                      }}
                    >
                      {opt.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleAddToBag}
                className="btn btn-primary"
                style={{ flex: 1, padding: '16px', fontSize: '0.88rem' }}
              >
                <ShoppingBag size={18} /> ADD TO BAG
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Shield size={13} color="var(--color-champagne-gold)" /> 2-Year Swiss Warranty
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Truck size={13} color="var(--color-champagne-gold)" /> Complimentary Insured Delivery
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <RotateCcw size={13} color="var(--color-champagne-gold)" /> 30-Day Returns
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

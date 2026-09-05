import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShieldCheck, Truck, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { WatchCardGraphic } from '../ui/WatchCardGraphic';
import { useToast } from '../ui/Toast';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    discountPercent,
    total,
    promoCode,
    applyPromoCode,
    setIsCheckoutOpen
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const { showToast } = useToast();

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const result = applyPromoCode(inputCode);
    showToast(result.message, result.success ? 'success' : 'error');
    if (result.success) setInputCode('');
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="modal-overlay" style={{ justifyContent: 'flex-end', padding: 0 }}>
      {/* Backdrop click dismiss */}
      <div
        style={{ position: 'absolute', inset: 0 }}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over Drawer Panel */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '480px',
          height: '100%',
          background: 'var(--bg-cream)',
          borderLeft: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-xl)',
          animation: 'slideRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          zIndex: 1001
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#FFFFFF'
          }}
        >
          <div>
            <span className="section-eyebrow" style={{ marginBottom: '2px' }}>YOUR SELECTION</span>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--color-deep-brown)' }}>Shopping Bag</h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close shopping bag"
            style={{
              padding: '8px',
              borderRadius: '50%',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-primary)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Complimentary Shipping Meter */}
        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: '12px 28px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Truck size={16} color="var(--color-champagne-gold)" />
          <span style={{ fontSize: '0.78rem', color: 'var(--text-primary)', fontWeight: 500 }}>
            Complimentary Worldwide Insured Express Delivery Included
          </span>
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-dark-brown)', marginBottom: '8px' }}>
                Your bag is empty
              </p>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Discover our signature handcrafted timepieces.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  const el = document.querySelector('#collection');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-primary"
                style={{ fontSize: '0.8rem', padding: '12px 28px' }}
              >
                EXPLORE COLLECTION
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${idx}`}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '16px',
                    background: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    position: 'relative'
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      width: '76px',
                      height: '92px',
                      background: 'radial-gradient(circle, #FFFFFF 0%, #F5EEE5 100%)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <WatchCardGraphic
                      caseColor={item.product.colorOptions?.[0]?.caseColor || '#B08A45'}
                      dialColor={item.product.colorOptions?.[0]?.dialColor || '#F5EEE5'}
                      strapColor={item.product.colorOptions?.[0]?.strapColor || '#4A3325'}
                      size={60}
                    />
                  </div>

                  {/* Item Details */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ fontSize: '1rem', color: 'var(--color-deep-brown)', fontWeight: 600 }}>
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(idx)}
                          aria-label="Remove item"
                          style={{ color: 'var(--text-muted)', padding: '2px' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {item.selectedCase} • {item.selectedStrap}
                      </p>

                      {item.customEngraving && (
                        <p style={{ fontSize: '0.72rem', color: 'var(--color-champagne-gold)', fontStyle: 'italic' }}>
                          Monogram: “{item.customEngraving}”
                        </p>
                      )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                      {/* Quantity Modifier */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid var(--border-light)',
                          borderRadius: 'var(--radius-sm)',
                          background: 'var(--bg-cream)'
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(idx, item.quantity - 1)}
                          style={{ padding: '4px 8px', color: 'var(--text-primary)' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, padding: '0 8px' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(idx, item.quantity + 1)}
                          style={{ padding: '4px 8px', color: 'var(--text-primary)' }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-deep-brown)' }}>
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout Controls */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '24px 28px',
              borderTop: '1px solid var(--border-subtle)',
              background: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Tag size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                <input
                  type="text"
                  placeholder="Promo (try ARVEN10)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 34px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    outline: 'none',
                    textTransform: 'uppercase'
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline"
                style={{ padding: '8px 18px', fontSize: '0.75rem', letterSpacing: '0.1em' }}
              >
                APPLY
              </button>
            </form>

            {/* Calculations Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-champagne-gold)', fontWeight: 600 }}>
                  <span>VIP Discount ({discountPercent}%)</span>
                  <span>-${discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Insured Global Shipping</span>
                <span style={{ color: 'var(--color-champagne-gold)', fontWeight: 600 }}>COMPLIMENTARY</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--color-deep-brown)',
                  fontFamily: 'var(--font-serif)',
                  paddingTop: '8px',
                  borderTop: '1px solid var(--border-subtle)',
                  marginTop: '4px'
                }}
              >
                <span>Estimated Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleCheckoutClick}
              className="btn btn-primary"
              style={{ width: '100%', padding: '16px', fontSize: '0.88rem' }}
            >
              PROCEED TO CONCIERGE CHECKOUT <ArrowRight size={16} />
            </button>

            {/* Trust Badges in Cart */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} color="var(--color-champagne-gold)" /> 2-Year Warranty
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Truck size={14} color="var(--color-champagne-gold)" /> Free Insured Delivery
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

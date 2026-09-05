import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Lock, CreditCard, Sparkles, Award } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, total, clearCart, discountAmount } = useCart();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    firstName: 'Lord',
    lastName: 'Kensington',
    email: 'client@arven-horology.ch',
    phone: '+41 22 819 0000',
    address: '42 Rue du Rhône',
    city: 'Geneva',
    postalCode: '1204',
    country: 'Switzerland',
    paymentMethod: 'card'
  });
  const [orderNumber, setOrderNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `AV-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(orderId);
    setStep('success');

    // Trigger golden celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#B08A45', '#DFCDBC', '#4A3325', '#F5EEE5']
    });

    clearCart();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('form');
  };

  return (
    <div className="modal-overlay" style={{ padding: '20px' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          background: 'var(--bg-cream)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-xl)',
          overflowY: 'auto',
          position: 'relative',
          padding: '40px',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        <button
          onClick={handleClose}
          aria-label="Close checkout"
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

        {step === 'form' ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span className="section-eyebrow">CONCIERGE CHECKOUT</span>
              <h2 style={{ fontSize: '2rem', color: 'var(--color-deep-brown)' }}>Reserve Your Timepiece</h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Every ARVÉN timepiece is individually verified by our master watchmakers prior to courier dispatch.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              {/* Left: Client & Delivery Information */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--color-deep-brown)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                  1. Collector & Delivery Details
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', background: '#FFFFFF' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', background: '#FFFFFF' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    Email for Horological Certificate
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', background: '#FFFFFF' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', background: '#FFFFFF' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                      City / Country
                    </label>
                    <input
                      type="text"
                      required
                      value={`${formData.city}, ${formData.country}`}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', background: '#FFFFFF' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                      Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', background: '#FFFFFF' }}
                    />
                  </div>
                </div>
              </div>

              {/* Right: Payment & Summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--color-deep-brown)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                  2. Payment & Verification
                </h4>

                <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <CreditCard size={18} color="var(--color-champagne-gold)" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Encrypted Luxury Escrow Checkout
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="4000 •••• •••• 9842"
                      defaultValue="•••• •••• •••• 8841"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', background: 'var(--bg-cream)' }}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="12/28"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', background: 'var(--bg-cream)' }}
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        defaultValue="784"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', background: 'var(--bg-cream)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Summary Box */}
                <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                    <span>Total Timepieces</span>
                    <span style={{ fontWeight: 600 }}>{cart.length} item(s)</span>
                  </div>
                  {discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--color-champagne-gold)' }}>
                      <span>VIP Privilege Discount</span>
                      <span style={{ fontWeight: 600 }}>-${discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.85rem' }}>
                    <span>Insured Courier</span>
                    <span style={{ color: 'var(--color-champagne-gold)', fontWeight: 600 }}>COMPLIMENTARY</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--color-deep-brown)', fontWeight: 700 }}>
                    <span>Total Amount</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '16px', fontSize: '0.9rem' }}
                >
                  <Lock size={16} /> AUTHORIZE COMMISSION (${total.toLocaleString()})
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  <ShieldCheck size={14} color="var(--color-champagne-gold)" />
                  256-Bit Bank Grade Encryption • Official ARVÉN Seal
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* Order Confirmation View */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'var(--bg-secondary)',
                border: '2px solid var(--color-champagne-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto'
              }}
            >
              <Award size={36} color="var(--color-champagne-gold)" />
            </div>

            <span className="section-eyebrow">ORDER CONFIRMED</span>
            <h2 style={{ fontSize: '2.4rem', color: 'var(--color-deep-brown)', marginBottom: '8px' }}>
              Welcome to the ARVÉN Society
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 24px auto' }}>
              Thank you, {formData.firstName} {formData.lastName}. Your bespoke commission <strong>#{orderNumber}</strong> has been registered at our Le Locle atelier.
            </p>

            {/* Certificate Box */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                maxWidth: '480px',
                margin: '0 auto 32px auto',
                boxShadow: 'var(--shadow-md)',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px', marginBottom: '12px' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-deep-brown)' }}>
                  ARVÉN GENÈVE
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-champagne-gold)', fontWeight: 600 }}>
                  CERTIFIED AUTHENTIC
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <strong>Commission ID:</strong> {orderNumber}
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <strong>Registered Client:</strong> {formData.firstName} {formData.lastName}
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <strong>Destination:</strong> {formData.address}, {formData.city}
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-champagne-gold)', fontWeight: 500, marginTop: '8px' }}>
                A digital certificate & courier tracking have been transmitted to {formData.email}.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="btn btn-primary"
              style={{ padding: '14px 36px' }}
            >
              RETURN TO ATELIER
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import { WatchModel } from './WatchModel';
import { WatchLighting } from './WatchLighting';
import { useCart } from '../../context/CartContext';
import { useToast } from '../ui/Toast';
import { PRODUCTS } from '../../data/products';
import { Check, Sparkles, ShoppingBag, RotateCcw } from 'lucide-react';

const CASE_OPTIONS = [
  { id: 'yellow-gold', name: '18k Yellow Gold', color: '#B08A45', priceMod: 0 },
  { id: 'rose-gold', name: '18k Rose Gold', color: '#C98B75', priceMod: 200 },
  { id: 'platinum', name: 'Platinum Silver', color: '#D8D8D8', priceMod: 400 },
  { id: 'dlc-noir', name: 'DLC Midnight Black', color: '#2A2725', priceMod: 150 }
];

const STRAP_OPTIONS = [
  { id: 'cognac', name: 'Cognac Calfskin', color: '#4A3325', type: 'leather' as const, priceMod: 0 },
  { id: 'espresso', name: 'Espresso Alligator', color: '#2C1E17', type: 'leather' as const, priceMod: 120 },
  { id: 'saddle-tan', name: 'Saddle Tan Horween', color: '#8C5A3C', type: 'leather' as const, priceMod: 80 },
  { id: 'onyx-black', name: 'Onyx Black Bridle', color: '#1A1817', type: 'leather' as const, priceMod: 50 }
];

const DIAL_OPTIONS = [
  { id: 'champagne', name: 'Sunburst Champagne', color: '#F5EEE5', priceMod: 0 },
  { id: 'ivory', name: 'Grand Feu Ivory', color: '#FDFCF7', priceMod: 150 },
  { id: 'noir', name: 'Onyx Noir', color: '#2C1E17', priceMod: 100 },
  { id: 'silver', name: 'Argent Silver', color: '#E8E4DF', priceMod: 0 }
];

export const WatchCustomizer3D: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState(CASE_OPTIONS[0]);
  const [selectedStrap, setSelectedStrap] = useState(STRAP_OPTIONS[0]);
  const [selectedDial, setSelectedDial] = useState(DIAL_OPTIONS[0]);
  const [engraving, setEngraving] = useState('');

  const { addToCart } = useCart();
  const { showToast } = useToast();

  const basePrice = 3650;
  const totalPrice = basePrice + selectedCase.priceMod + selectedStrap.priceMod + selectedDial.priceMod;

  const handleAddToBag = () => {
    // Create bespoke product representation
    const bespokeProduct = {
      ...PRODUCTS[0],
      id: `bespoke-${Date.now()}`,
      name: 'ARVÉN BESPOKE COMMISSION',
      subtitle: `${selectedCase.name} • ${selectedStrap.name}`,
      price: totalPrice,
      badge: 'BESPOKE EDITION'
    };

    addToCart(
      bespokeProduct,
      1,
      selectedCase.name,
      selectedStrap.name,
      selectedDial.name,
      engraving.trim() ? engraving.trim() : undefined
    );

    showToast(`Added Bespoke Commission ($${totalPrice.toLocaleString()}) to your bag`, 'success');
  };

  const handleReset = () => {
    setSelectedCase(CASE_OPTIONS[0]);
    setSelectedStrap(STRAP_OPTIONS[0]);
    setSelectedDial(DIAL_OPTIONS[0]);
    setEngraving('');
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        background: 'var(--bg-cream)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-light)',
        padding: '36px',
        boxShadow: 'var(--shadow-lg)'
      }}
    >
      {/* 3D Interactive Viewport */}
      <div
        style={{
          position: 'relative',
          minHeight: '440px',
          background: 'radial-gradient(circle at center, #FFFFFF 0%, #E9DED1 100%)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Canvas
          camera={{ position: [0, 2.2, 4.4], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <WatchLighting />
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.2}>
            <group rotation={[0.2, -0.3, 0.05]} scale={1.05}>
              <WatchModel
                caseColor={selectedCase.color}
                strapColor={selectedStrap.color}
                dialColor={selectedDial.color}
                strapType={selectedStrap.type}
              />
            </group>
          </Float>
          <ContactShadows position={[0, -1.8, 0]} opacity={0.3} scale={7} blur={2} far={4} color="#2C1E17" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping={true}
            autoRotate={true}
            autoRotateSpeed={0.6}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={(Math.PI * 3) / 4}
          />
        </Canvas>

        {/* Live Spec Overlay Pill */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            padding: '8px 20px',
            borderRadius: '9999px',
            border: '1px solid var(--border-gold)',
            fontSize: '0.78rem',
            color: 'var(--color-dark-brown)',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Sparkles size={14} color="var(--color-champagne-gold)" />
          Live 3D Customizer • {selectedCase.name}
        </div>
      </div>

      {/* Customization Control Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="section-eyebrow" style={{ marginBottom: 0 }}>BESPOKE ATELIER</span>
            <button
              onClick={handleReset}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              <RotateCcw size={12} /> Reset
            </button>
          </div>

          <h3 style={{ fontSize: '1.85rem', marginBottom: '6px', color: 'var(--color-deep-brown)' }}>
            ARVÉN Bespoke Commission
          </h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '24px', color: 'var(--text-secondary)' }}>
            Configure your personalized timepiece in real-time. Hand-assembled to your bespoke specification in Le Locle.
          </p>

          {/* 1. Case Material Selector */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, marginBottom: '10px' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>1. Case Finish</span>
              <span style={{ color: 'var(--color-champagne-gold)' }}>{selectedCase.name}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {CASE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedCase(opt)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: selectedCase.id === opt.id ? '2px solid var(--color-champagne-gold)' : '1px solid var(--border-light)',
                    background: selectedCase.id === opt.id ? 'var(--bg-cream)' : '#FFFFFF',
                    textAlign: 'left',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: opt.color,
                      border: '1px solid rgba(0,0,0,0.15)',
                      flexShrink: 0
                    }}
                  />
                  <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-primary)' }}>{opt.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Strap Selection */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, marginBottom: '10px' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>2. Handcrafted Strap</span>
              <span style={{ color: 'var(--color-champagne-gold)' }}>{selectedStrap.name}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {STRAP_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedStrap(opt)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: selectedStrap.id === opt.id ? '2px solid var(--color-champagne-gold)' : '1px solid var(--border-light)',
                    background: selectedStrap.id === opt.id ? 'var(--bg-cream)' : '#FFFFFF',
                    textAlign: 'left',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      backgroundColor: opt.color,
                      border: '1px solid rgba(0,0,0,0.15)',
                      flexShrink: 0
                    }}
                  />
                  <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-primary)' }}>{opt.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Dial Finish */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, marginBottom: '10px' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>3. Dial Aesthetic</span>
              <span style={{ color: 'var(--color-champagne-gold)' }}>{selectedDial.name}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {DIAL_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedDial(opt)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: selectedDial.id === opt.id ? '2px solid var(--color-champagne-gold)' : '1px solid var(--border-light)',
                    background: selectedDial.id === opt.id ? 'var(--bg-cream)' : '#FFFFFF',
                    textAlign: 'left',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: opt.color,
                      border: '1px solid rgba(0,0,0,0.2)',
                      flexShrink: 0
                    }}
                  />
                  <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-primary)' }}>{opt.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Complimentary Caseback Engraving */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, marginBottom: '8px' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>4. Complimentary Caseback Monogram</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Max 16 chars</span>
            </div>
            <input
              type="text"
              maxLength={16}
              placeholder="e.g., A.V. — 2026"
              value={engraving}
              onChange={(e) => setEngraving(e.target.value.toUpperCase())}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                background: '#FFFFFF',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                color: 'var(--text-primary)',
                outline: 'none',
                letterSpacing: '0.15em'
              }}
            />
          </div>
        </div>

        {/* Pricing Summary & Action CTA */}
        <div
          style={{
            paddingTop: '20px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Bespoke Total
              </span>
              <div style={{ fontSize: '1.85rem', fontFamily: 'var(--font-serif)', color: 'var(--color-deep-brown)', fontWeight: 600 }}>
                ${totalPrice.toLocaleString()}
              </div>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-champagne-gold)', fontWeight: 500 }}>
              Includes 2-Year Swiss Warranty & Global Insured Delivery
            </span>
          </div>

          <button
            onClick={handleAddToBag}
            className="btn btn-primary"
            style={{ width: '100%', padding: '16px', fontSize: '0.9rem' }}
          >
            <ShoppingBag size={18} /> Commission This Timepiece
          </button>
        </div>
      </div>
    </div>
  );
};

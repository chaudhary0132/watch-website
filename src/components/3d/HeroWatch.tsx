import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows } from '@react-three/drei';
import { WatchModel } from './WatchModel';
import { WatchLighting } from './WatchLighting';

interface HeroWatchProps {
  caseColor?: string;
  strapColor?: string;
  dialColor?: string;
  interactive?: boolean;
}

export const HeroWatch: React.FC<HeroWatchProps> = ({
  caseColor = '#B08A45',
  strapColor = '#4A3325',
  dialColor = '#F5EEE5',
  interactive = true
}) => {
  const controlsRef = useRef<any>(null);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', minHeight: '440px' }}>
      <Canvas
        camera={{ position: [0, 2.4, 4.6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <WatchLighting />

          {/* Gentle luxury floating dynamics */}
          <Float
            speed={1.5}
            rotationIntensity={0.25}
            floatIntensity={0.3}
            floatingRange={[-0.05, 0.05]}
          >
            <group rotation={[0.3, -0.4, 0.1]} scale={1.05}>
              <WatchModel
                caseColor={caseColor}
                strapColor={strapColor}
                dialColor={dialColor}
                autoRotate={false}
              />
            </group>
          </Float>

          {/* Realistic studio contact shadow */}
          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.35}
            scale={8}
            blur={2.4}
            far={4}
            color="#2C1E17"
          />

          {interactive && (
            <OrbitControls
              ref={controlsRef}
              enableZoom={true}
              minDistance={3.2}
              maxDistance={6.5}
              enablePan={false}
              enableDamping={true}
              dampingFactor={0.06}
              autoRotate={true}
              autoRotateSpeed={0.8}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={(Math.PI * 5) / 6}
            />
          )}
        </Suspense>
      </Canvas>

      {/* Subtle Interactive Instruction Pill */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(251, 248, 243, 0.88)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(176, 138, 69, 0.35)',
          padding: '6px 16px',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          pointerEvents: 'none',
          boxShadow: '0 4px 12px rgba(44, 30, 23, 0.06)',
          zIndex: 10
        }}
      >
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#B08A45',
            animation: 'shimmer 2s infinite ease-in-out'
          }}
        />
        <span
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: '#4A3325'
          }}
        >
          Interactive 3D • Drag to Rotate
        </span>
      </div>
    </div>
  );
};

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface WatchModelProps {
  caseColor?: string;
  strapColor?: string;
  dialColor?: string;
  strapType?: 'leather' | 'mesh';
  autoRotate?: boolean;
}

export const WatchModel: React.FC<WatchModelProps> = ({
  caseColor = '#B08A45',
  strapColor = '#4A3325',
  dialColor = '#F5EEE5',
  strapType = 'leather',
  autoRotate = false
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const secondsHandRef = useRef<THREE.Group>(null);
  const rotorRef = useRef<THREE.Group>(null);

  // Animate ticking seconds hand and subtle idle rotor movement
  useFrame((state, delta) => {
    if (secondsHandRef.current) {
      secondsHandRef.current.rotation.z -= delta * 0.8;
    }
    if (rotorRef.current) {
      rotorRef.current.rotation.z += Math.sin(state.clock.elapsedTime * 1.5) * 0.01;
    }
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  // Calculate 12 hour indices positions
  const hourIndices = useMemo(() => {
    const indices = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      const isTwelve = i === 0;
      const isQuarter = i % 3 === 0;
      const radius = 1.32;
      const x = Math.sin(angle) * radius;
      const y = Math.cos(angle) * radius;
      indices.push({
        angle,
        x,
        y,
        isTwelve,
        isQuarter,
        width: isTwelve ? 0.07 : isQuarter ? 0.055 : 0.038,
        height: isTwelve ? 0.28 : isQuarter ? 0.24 : 0.18
      });
    }
    return indices;
  }, []);

  // Minute tick marks (60 ticks around dial perimeter)
  const minuteTicks = useMemo(() => {
    const ticks = [];
    for (let i = 0; i < 60; i++) {
      if (i % 5 !== 0) {
        const angle = (i * Math.PI) / 30;
        const radius = 1.34;
        ticks.push({
          x: Math.sin(angle) * radius,
          y: Math.cos(angle) * radius,
          angle
        });
      }
    }
    return ticks;
  }, []);

  // PBR Materials based on props
  const caseMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(caseColor),
        metalness: 0.95,
        roughness: 0.18,
        envMapIntensity: 1.5
      }),
    [caseColor]
  );

  const polishedGoldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(caseColor),
        metalness: 0.98,
        roughness: 0.1,
        envMapIntensity: 2.0
      }),
    [caseColor]
  );

  const dialMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(dialColor),
        metalness: 0.15,
        roughness: 0.35,
        bumpScale: 0.02
      }),
    [dialColor]
  );

  const strapMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(strapColor),
        metalness: strapType === 'mesh' ? 0.9 : 0.05,
        roughness: strapType === 'mesh' ? 0.3 : 0.65,
        bumpScale: 0.05
      }),
    [strapColor, strapType]
  );

  const sapphireMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#FFFFFF'),
        transparent: true,
        opacity: 0.38,
        roughness: 0.02,
        metalness: 0.1,
        transmission: 0.88,
        ior: 1.77, // Sapphire IOR
        reflectivity: 0.9,
        clearcoat: 1.0,
        clearcoatRoughness: 0.01
      }),
    []
  );

  return (
    <group ref={groupRef} dispose={null}>
      {/* ========================================================
          WATCH CASE & BEZEL
          ======================================================== */}
      {/* Main 40mm cylindrical case */}
      <mesh material={caseMaterial} castShadow receiveShadow>
        <cylinderGeometry args={[1.58, 1.58, 0.36, 64]} />
      </mesh>

      {/* Stepped outer bezel with mirror chamfer */}
      <mesh position={[0, 0.19, 0]} material={polishedGoldMaterial} castShadow>
        <cylinderGeometry args={[1.62, 1.56, 0.06, 64]} />
      </mesh>

      {/* Fluted inner bezel ring */}
      <mesh position={[0, 0.21, 0]} material={polishedGoldMaterial}>
        <torusGeometry args={[1.48, 0.035, 16, 64]} />
      </mesh>

      {/* 4 Sculpted Lugs */}
      {/* Top Left Lug */}
      <mesh position={[-0.95, 0, 1.6]} rotation={[0.15, 0.2, 0]} material={caseMaterial} castShadow>
        <boxGeometry args={[0.26, 0.3, 0.9]} />
      </mesh>
      {/* Top Right Lug */}
      <mesh position={[0.95, 0, 1.6]} rotation={[0.15, -0.2, 0]} material={caseMaterial} castShadow>
        <boxGeometry args={[0.26, 0.3, 0.9]} />
      </mesh>
      {/* Bottom Left Lug */}
      <mesh position={[-0.95, 0, -1.6]} rotation={[-0.15, -0.2, 0]} material={caseMaterial} castShadow>
        <boxGeometry args={[0.26, 0.3, 0.9]} />
      </mesh>
      {/* Bottom Right Lug */}
      <mesh position={[0.95, 0, -1.6]} rotation={[-0.15, 0.2, 0]} material={caseMaterial} castShadow>
        <boxGeometry args={[0.26, 0.3, 0.9]} />
      </mesh>

      {/* Crown at 3 o'clock */}
      <group position={[1.72, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh material={polishedGoldMaterial} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.22, 24]} />
        </mesh>
        <mesh position={[0, 0.12, 0]} material={caseMaterial}>
          <cylinderGeometry args={[0.14, 0.17, 0.06, 24]} />
        </mesh>
      </group>

      {/* Chronograph Pushers (at 2 o'clock and 4 o'clock) */}
      <group position={[1.58, 0, 0.7]} rotation={[0, 0.45, Math.PI / 2]}>
        <mesh material={polishedGoldMaterial}>
          <cylinderGeometry args={[0.11, 0.11, 0.18, 20]} />
        </mesh>
      </group>
      <group position={[1.58, 0, -0.7]} rotation={[0, -0.45, Math.PI / 2]}>
        <mesh material={polishedGoldMaterial}>
          <cylinderGeometry args={[0.11, 0.11, 0.18, 20]} />
        </mesh>
      </group>

      {/* ========================================================
          DIAL & APPLIED ELEMENTS
          ======================================================== */}
      {/* Primary Dial Plate */}
      <group position={[0, 0.19, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh material={dialMaterial} receiveShadow>
          <circleGeometry args={[1.46, 64]} />
        </mesh>

        {/* Inner concentric sunburst groove */}
        <mesh position={[0, 0, 0.005]} material={dialMaterial}>
          <ringGeometry args={[0.88, 0.92, 64]} />
        </mesh>

        {/* 12 Applied Gold Hour Markers */}
        {hourIndices.map((idx, i) => (
          <group key={i} position={[idx.x, idx.y, 0.015]} rotation={[0, 0, -idx.angle]}>
            <mesh material={polishedGoldMaterial} castShadow>
              <boxGeometry args={[idx.width, idx.height, 0.028]} />
            </mesh>
            {/* Double marker for 12 o'clock */}
            {idx.isTwelve && (
              <mesh position={[0.1, 0, 0]} material={polishedGoldMaterial} castShadow>
                <boxGeometry args={[idx.width, idx.height, 0.028]} />
              </mesh>
            )}
          </group>
        ))}

        {/* Minute tick markers */}
        {minuteTicks.map((tick, i) => (
          <group key={i} position={[tick.x, tick.y, 0.008]} rotation={[0, 0, -tick.angle]}>
            <mesh material={polishedGoldMaterial}>
              <boxGeometry args={[0.018, 0.06, 0.012]} />
            </mesh>
          </group>
        ))}

        {/* Sub-Dial Left (Running seconds or 30-min chrono counter) */}
        <group position={[-0.52, 0, 0.005]}>
          <mesh material={dialMaterial}>
            <circleGeometry args={[0.34, 32]} />
          </mesh>
          <mesh material={polishedGoldMaterial}>
            <ringGeometry args={[0.33, 0.35, 32]} />
          </mesh>
          {/* Sub-dial small hand */}
          <mesh position={[0, 0.08, 0.012]} rotation={[0, 0, 0.8]} material={polishedGoldMaterial}>
            <boxGeometry args={[0.02, 0.16, 0.01]} />
          </mesh>
        </group>

        {/* Sub-Dial Right (Chronograph counter) */}
        <group position={[0.52, 0, 0.005]}>
          <mesh material={dialMaterial}>
            <circleGeometry args={[0.34, 32]} />
          </mesh>
          <mesh material={polishedGoldMaterial}>
            <ringGeometry args={[0.33, 0.35, 32]} />
          </mesh>
          {/* Sub-dial small hand */}
          <mesh position={[0, 0.08, 0.012]} rotation={[0, 0, -1.2]} material={polishedGoldMaterial}>
            <boxGeometry args={[0.02, 0.16, 0.01]} />
          </mesh>
        </group>

        {/* Date window aperture at 6 o'clock */}
        <group position={[0, -0.72, 0.01]}>
          <mesh material={polishedGoldMaterial}>
            <ringGeometry args={[0.15, 0.18, 4]} />
          </mesh>
          <mesh position={[0, 0, -0.005]}>
            <planeGeometry args={[0.26, 0.22]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </mesh>
        </group>

        {/* ARVÉN Brand Signature Plaque under 12 o'clock */}
        <group position={[0, 0.64, 0.01]}>
          <mesh material={polishedGoldMaterial}>
            <boxGeometry args={[0.42, 0.09, 0.015]} />
          </mesh>
        </group>

        {/* Center Pinion (Hand Boss) */}
        <mesh position={[0, 0, 0.045]} material={polishedGoldMaterial}>
          <cylinderGeometry args={[0.09, 0.09, 0.05, 32]} />
        </mesh>

        {/* Hour Hand (Faceted Dauphine design) */}
        <group position={[0, 0, 0.04]} rotation={[0, 0, -Math.PI / 3]}>
          <mesh position={[0, 0.38, 0]} material={polishedGoldMaterial} castShadow>
            <boxGeometry args={[0.075, 0.72, 0.02]} />
          </mesh>
        </group>

        {/* Minute Hand (Slender Dauphine) */}
        <group position={[0, 0, 0.05]} rotation={[0, 0, Math.PI / 6]}>
          <mesh position={[0, 0.58, 0]} material={polishedGoldMaterial} castShadow>
            <boxGeometry args={[0.06, 1.12, 0.02]} />
          </mesh>
        </group>

        {/* Seconds Hand (Flame-blued or gold needle with counterweight) */}
        <group ref={secondsHandRef} position={[0, 0, 0.06]}>
          <mesh position={[0, 0.52, 0]} castShadow>
            <boxGeometry args={[0.018, 1.25, 0.015]} />
            <meshStandardMaterial color="#B08A45" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Counterweight disc */}
          <mesh position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.02, 16]} />
            <meshStandardMaterial color="#B08A45" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          SAPPHIRE CRYSTAL (Double-domed with optical physics)
          ======================================================== */}
      <mesh position={[0, 0.28, 0]} material={sapphireMaterial}>
        <cylinderGeometry args={[1.54, 1.54, 0.1, 64]} />
      </mesh>

      {/* ========================================================
          LUXURY STRAP (Top and Bottom Handcrafted Leather/Mesh)
          ======================================================== */}
      {/* Top Strap Segment */}
      <group position={[0, -0.05, 2.6]}>
        <mesh rotation={[-0.2, 0, 0]} material={strapMaterial} castShadow receiveShadow>
          <boxGeometry args={[1.52, 0.18, 1.9]} />
        </mesh>
        {/* Contrast Stitching lines on top strap */}
        <mesh position={[-0.64, 0.05, 0]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.02, 0.02, 1.85]} />
          <meshStandardMaterial color="#C9A98B" roughness={0.8} />
        </mesh>
        <mesh position={[0.64, 0.05, 0]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.02, 0.02, 1.85]} />
          <meshStandardMaterial color="#C9A98B" roughness={0.8} />
        </mesh>
        {/* Leather Keeper Loop */}
        <mesh position={[0, 0.08, 0.5]} rotation={[-0.2, 0, 0]} material={strapMaterial}>
          <boxGeometry args={[1.6, 0.24, 0.22]} />
        </mesh>
      </group>

      {/* Bottom Strap Segment with Buckle */}
      <group position={[0, -0.05, -2.6]}>
        <mesh rotation={[0.2, 0, 0]} material={strapMaterial} castShadow receiveShadow>
          <boxGeometry args={[1.52, 0.18, 1.9]} />
        </mesh>
        {/* Contrast Stitching lines on bottom strap */}
        <mesh position={[-0.64, 0.05, 0]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.02, 0.02, 1.85]} />
          <meshStandardMaterial color="#C9A98B" roughness={0.8} />
        </mesh>
        <mesh position={[0.64, 0.05, 0]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.02, 0.02, 1.85]} />
          <meshStandardMaterial color="#C9A98B" roughness={0.8} />
        </mesh>
        {/* Pin Buckle Frame */}
        <group position={[0, -0.05, -1.05]} rotation={[0.2, 0, 0]}>
          <mesh material={polishedGoldMaterial} castShadow>
            <torusGeometry args={[0.42, 0.06, 12, 32]} />
          </mesh>
          <mesh position={[0, 0, 0.25]} rotation={[Math.PI / 2, 0, 0]} material={polishedGoldMaterial}>
            <cylinderGeometry args={[0.025, 0.025, 0.48, 12]} />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          EXHIBITION SAPPHIRE CASEBACK (Reverse Side)
          ======================================================== */}
      <group position={[0, -0.19, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {/* Caseback engraved rim */}
        <mesh material={caseMaterial}>
          <ringGeometry args={[1.1, 1.54, 48]} />
        </mesh>
        {/* Sapphire back window */}
        <mesh position={[0, 0, -0.01]} material={sapphireMaterial}>
          <circleGeometry args={[1.08, 48]} />
        </mesh>
        {/* Oscillating Gold Rotor */}
        <group ref={rotorRef} position={[0, 0, -0.03]}>
          <mesh material={polishedGoldMaterial}>
            <circleGeometry args={[0.95, 32, 0, Math.PI]} />
          </mesh>
          {/* Skeletonized cutout on rotor */}
          <mesh position={[0, 0.4, 0.005]} material={caseMaterial}>
            <cylinderGeometry args={[0.2, 0.2, 0.02, 16]} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

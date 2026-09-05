import React from 'react';

export const WatchLighting: React.FC = () => {
  return (
    <>
      {/* Soft warm ambient base */}
      <ambientLight intensity={0.85} color="#FFF5EB" />

      {/* Main Key Studio Light */}
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.8}
        color="#FFFBF5"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Warm Gold Fill Light (enhances gold reflections) */}
      <directionalLight
        position={[-5, 3, 3]}
        intensity={1.2}
        color="#FDE8C0"
      />

      {/* Rim / Backlight for edge definition */}
      <directionalLight
        position={[0, -4, -4]}
        intensity={0.9}
        color="#FFEEDB"
      />

      {/* Subtle top spotlight on the dial face */}
      <spotLight
        position={[0, 5, 4]}
        angle={0.4}
        penumbra={0.8}
        intensity={1.5}
        color="#FFFFFF"
      />
    </>
  );
};

import React from 'react';

interface WatchCardGraphicProps {
  caseColor?: string;
  dialColor?: string;
  strapColor?: string;
  hasChronograph?: boolean;
  size?: number;
  className?: string;
}

export const WatchCardGraphic: React.FC<WatchCardGraphicProps> = ({
  caseColor = '#B08A45',
  dialColor = '#F5EEE5',
  strapColor = '#4A3325',
  hasChronograph = false,
  size = 280,
  className = ''
}) => {
  const isNoir = dialColor === '#2C1E17' || dialColor === '#1C1512';
  const markerColor = isNoir ? '#D4AF37' : '#B08A45';
  const textColor = isNoir ? '#FFFFFF' : '#33251D';

  return (
    <svg
      viewBox="0 0 300 400"
      width={size}
      height={size * 1.33}
      className={className}
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Gradients */}
        <linearGradient id={`goldBezel-${caseColor}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFC386" />
          <stop offset="35%" stopColor={caseColor} />
          <stop offset="70%" stopColor="#876527" />
          <stop offset="100%" stopColor="#DFC386" />
        </linearGradient>

        <linearGradient id={`leatherStrap-${strapColor}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={strapColor} stopOpacity="0.85" />
          <stop offset="50%" stopColor={strapColor} />
          <stop offset="100%" stopColor={strapColor} stopOpacity="0.75" />
        </linearGradient>

        <radialGradient id={`dialGrad-${dialColor}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={isNoir ? '#3A2E28' : '#FFFDF9'} />
          <stop offset="75%" stopColor={dialColor} />
          <stop offset="100%" stopColor={isNoir ? '#1C1410' : '#E8DDD0'} />
        </radialGradient>

        <linearGradient id="sapphireGlare" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="70%" stopColor="#B08A45" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.25" />
        </linearGradient>

        <filter id="watchShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#2C1E17" floodOpacity="0.18" />
        </filter>
      </defs>

      <g filter="url(#watchShadow)">
        {/* Top Strap */}
        <path
          d="M 95,20 L 205,20 L 195,130 L 105,130 Z"
          fill={`url(#leatherStrap-${strapColor})`}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="1"
        />
        {/* Top Strap Stitching */}
        <line x1="102" y1="25" x2="110" y2="125" stroke="#C9A98B" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="198" y1="25" x2="190" y2="125" stroke="#C9A98B" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Bottom Strap */}
        <path
          d="M 105,270 L 195,270 L 205,380 L 95,380 Z"
          fill={`url(#leatherStrap-${strapColor})`}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="1"
        />
        {/* Bottom Strap Stitching */}
        <line x1="110" y1="275" x2="102" y2="375" stroke="#C9A98B" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="190" y1="275" x2="198" y2="375" stroke="#C9A98B" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Strap Keeper Loop */}
        <rect x="98" y="305" width="104" height="14" rx="2" fill={strapColor} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />

        {/* Lugs */}
        <path d="M 88,140 L 102,110 L 120,130 Z" fill={`url(#goldBezel-${caseColor})`} />
        <path d="M 212,140 L 198,110 L 180,130 Z" fill={`url(#goldBezel-${caseColor})`} />
        <path d="M 88,260 L 102,290 L 120,270 Z" fill={`url(#goldBezel-${caseColor})`} />
        <path d="M 212,260 L 198,290 L 180,270 Z" fill={`url(#goldBezel-${caseColor})`} />

        {/* Main Watch Case Outer Rim */}
        <circle cx="150" cy="200" r="76" fill={`url(#goldBezel-${caseColor})`} />
        <circle cx="150" cy="200" r="71" fill="#FFFFFF" opacity="0.1" />

        {/* Polished Stepped Bezel */}
        <circle cx="150" cy="200" r="69" fill={`url(#goldBezel-${caseColor})`} />
        <circle cx="150" cy="200" r="65" fill="#5A4323" opacity="0.3" />

        {/* Dial Face */}
        <circle cx="150" cy="200" r="64" fill={`url(#dialGrad-${dialColor})`} />
        {/* Inner concentric ring */}
        <circle cx="150" cy="200" r="42" fill="none" stroke={markerColor} strokeWidth="0.5" strokeDasharray="1 3" opacity="0.6" />

        {/* Crown at 3 o'clock */}
        <rect x="224" y="193" width="9" height="14" rx="2" fill={`url(#goldBezel-${caseColor})`} stroke="#61481E" strokeWidth="0.5" />
        {hasChronograph && (
          <>
            <rect x="220" y="165" width="7" height="10" rx="1.5" fill={`url(#goldBezel-${caseColor})`} />
            <rect x="220" y="225" width="7" height="10" rx="1.5" fill={`url(#goldBezel-${caseColor})`} />
          </>
        )}

        {/* Hour Markers (12, 3, 6, 9 and batons) */}
        {/* 12 o'clock double baton */}
        <rect x="147.5" y="142" width="2" height="11" fill={markerColor} />
        <rect x="150.5" y="142" width="2" height="11" fill={markerColor} />
        {/* 3 o'clock */}
        <rect x="201" y="198.5" width="10" height="3" fill={markerColor} />
        {/* 6 o'clock */}
        <rect x="148.5" y="247" width="3" height="10" fill={markerColor} />
        {/* 9 o'clock */}
        <rect x="139" y="198.5" width="10" height="3" fill={markerColor} />

        {/* Angled hour batons */}
        <line x1="177" y1="153" x2="173" y2="160" stroke={markerColor} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="197" y1="173" x2="190" y2="177" stroke={markerColor} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="197" y1="227" x2="190" y2="223" stroke={markerColor} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="177" y1="247" x2="173" y2="240" stroke={markerColor} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="123" y1="247" x2="127" y2="240" stroke={markerColor} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="103" y1="227" x2="110" y2="223" stroke={markerColor} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="103" y1="173" x2="110" y2="177" stroke={markerColor} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="123" y1="153" x2="127" y2="160" stroke={markerColor} strokeWidth="2.5" strokeLinecap="round" />

        {/* Brand Wordmark & Label */}
        <text
          x="150"
          y="172"
          textAnchor="middle"
          fill={textColor}
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="7.5"
          fontWeight="bold"
          letterSpacing="1.8"
        >
          ARVÉN
        </text>
        <text
          x="150"
          y="179"
          textAnchor="middle"
          fill={markerColor}
          fontFamily="'Inter', sans-serif"
          fontSize="3.2"
          letterSpacing="0.8"
        >
          AUTOMATIC
        </text>

        {/* Sub-dials if Chronograph */}
        {hasChronograph && (
          <>
            <circle cx="128" cy="200" r="13" fill="none" stroke={markerColor} strokeWidth="0.6" />
            <line x1="128" y1="200" x2="134" y2="196" stroke={markerColor} strokeWidth="1" strokeLinecap="round" />
            <circle cx="172" cy="200" r="13" fill="none" stroke={markerColor} strokeWidth="0.6" />
            <line x1="172" y1="200" x2="167" y2="205" stroke={markerColor} strokeWidth="1" strokeLinecap="round" />
          </>
        )}

        {/* Swiss Made inscription */}
        <text
          x="150"
          y="259"
          textAnchor="middle"
          fill={markerColor}
          fontFamily="'Inter', sans-serif"
          fontSize="3"
          letterSpacing="0.5"
        >
          SWISS MADE
        </text>

        {/* Hands */}
        {/* Hour Hand (Dauphine) */}
        <polygon points="150,200 147,198 126,178 149,176" fill={markerColor} />
        <polygon points="150,200 153,198 126,178 149,176" fill="#876527" opacity="0.4" />

        {/* Minute Hand (Dauphine) */}
        <polygon points="150,200 148,198 178,154 152,156" fill={markerColor} />
        <polygon points="150,200 152,198 178,154 152,156" fill="#876527" opacity="0.4" />

        {/* Center Boss Pinion */}
        <circle cx="150" cy="200" r="4.5" fill={markerColor} />
        <circle cx="150" cy="200" r="2" fill="#523D1A" />

        {/* Seconds Hand */}
        <line x1="150" y1="214" x2="150" y2="148" stroke="#B08A45" strokeWidth="0.8" />
        <circle cx="150" cy="210" r="1.8" fill="#B08A45" />

        {/* Sapphire Crystal Curvature & Highlight Glare */}
        <circle cx="150" cy="200" r="64" fill="url(#sapphireGlare)" pointerEvents="none" />
      </g>
    </svg>
  );
};

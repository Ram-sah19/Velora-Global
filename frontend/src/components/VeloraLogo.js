import React from 'react';

export default function VeloraLogo({ width = 42, height = 42, showText = true, textColor = '#0b0f19' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
      {/* VG Monogram SVG Icon */}
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 500 500" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25))' }}
      >
        <defs>
          <linearGradient id="goldGradComp" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D061" />
            <stop offset="35%" stopColor="#E5A93C" />
            <stop offset="70%" stopColor="#C48821" />
            <stop offset="100%" stopColor="#9A650C" />
          </linearGradient>

          <linearGradient id="goldLightComp" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFF3C4" />
            <stop offset="50%" stopColor="#E5A93C" />
            <stop offset="100%" stopColor="#B87D17" />
          </linearGradient>

          <linearGradient id="silverGradComp" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#E5E7EB" />
            <stop offset="80%" stopColor="#9CA3AF" />
            <stop offset="100%" stopColor="#4B5563" />
          </linearGradient>
        </defs>

        <g>
          {/* 'V' Gold Left Stem */}
          <path 
            d="M 120,130 L 200,130 C 220,210 250,330 285,385 C 245,375 205,285 175,205 Z" 
            fill="url(#goldGradComp)" 
          />
          <path 
            d="M 120,130 C 150,130 190,170 225,280 C 240,330 260,375 285,385 C 260,375 235,335 220,280 C 190,180 150,155 120,130 Z" 
            fill="url(#goldLightComp)" 
          />

          {/* 'V' Gold Right Swoosh */}
          <path 
            d="M 285,385 C 265,290 235,190 335,130 C 255,170 245,270 285,385 Z" 
            fill="url(#goldGradComp)" 
          />

          {/* 'G' Silver Arc */}
          <path 
            d="M 265,385 C 315,385 365,360 375,290 L 305,290 L 305,260 L 405,260 C 405,360 335,410 265,385 Z" 
            fill="url(#silverGradComp)" 
          />

          {/* 4-Point Gold Star */}
          <path 
            d="M 370,140 Q 370,160 390,160 Q 370,160 370,180 Q 370,160 350,160 Q 370,160 370,140 Z" 
            fill="url(#goldLightComp)" 
          />
        </g>
      </svg>

      {/* Optional Brand Text */}
      {showText && (
        <div style={{ textAlign: 'left' }}>
          <span style={{ 
            fontSize: '1.35rem', 
            fontWeight: '800', 
            letterSpacing: '0.04em', 
            color: textColor,
            display: 'block',
            lineHeight: '1'
          }}>
            VELOR<span style={{ color: '#E5A93C' }}>A</span>
          </span>
          <span style={{ 
            display: 'block', 
            fontSize: '0.62rem', 
            color: textColor === '#ffffff' ? '#94a3b8' : '#64748b', 
            letterSpacing: '0.2em', 
            textTransform: 'uppercase', 
            marginTop: '3px',
            fontWeight: '700'
          }}>
            — GLOBAL —
          </span>
        </div>
      )}
    </div>
  );
}

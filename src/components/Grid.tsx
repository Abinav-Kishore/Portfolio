import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GridProps {
  dark?: boolean;
}

export const Grid: React.FC<GridProps> = ({ dark = false }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Subtle parallax shift for grid
          gsap.set(el, { y: scrollY * 0.05 });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const strokePrimary = dark ? '#FFFFFF' : '#111111';
  const textColor = dark ? 'rgba(255, 255, 255, 0.3)' : '#66645F';

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-700"
    >
      {/* Background 60px linear-gradient grid from Editorial Aesthetic theme */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: dark
            ? 'linear-gradient(rgba(255, 255, 255, 0.08) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0.5px, transparent 0.5px)'
            : 'linear-gradient(#C8C4B9 0.5px, transparent 0.5px), linear-gradient(90deg, #C8C4B9 0.5px, transparent 0.5px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Blueprint Schematic Geometry from Editorial Aesthetic theme */}
      <div
        ref={gridRef}
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none transition-opacity duration-500"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Outer dashed structural boundary */}
          <path
            d="M200 200 L800 200 L800 800 L200 800 Z"
            stroke={strokePrimary}
            strokeWidth="0.5"
            strokeDasharray="10 5"
          />
          {/* Cardinal alignment axes */}
          <path
            d="M500 100 L500 900"
            stroke={strokePrimary}
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />
          <path
            d="M100 500 L900 500"
            stroke={strokePrimary}
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />
          {/* Cobalt focal circle */}
          <circle
            cx="500"
            cy="500"
            r="300"
            stroke="#355CFF"
            strokeWidth="0.5"
            opacity="0.4"
          />
          {/* Diamond center registration */}
          <rect
            x="450"
            y="450"
            width="100"
            height="100"
            stroke={strokePrimary}
            strokeWidth="0.5"
            transform="rotate(45 500 500)"
          />
        </svg>
      </div>

      {/* Corner Registration Marks & Technical Telemetry */}
      <div
        className="absolute bottom-24 left-8 sm:left-12 font-mono-tech text-[9px] tracking-widest uppercase transition-colors duration-500 z-10"
        style={{ color: textColor }}
      >
        <span>13.0827° N, 80.2707° E</span>
      </div>

      <div
        className="absolute bottom-10 left-8 sm:left-12 font-mono-tech text-[9px] tracking-widest uppercase transition-colors duration-500 z-10"
        style={{ color: textColor }}
      >
        <span>REF: PORTFOLIO_V6 // TS: 2026.09.07</span>
      </div>

      {/* Crosshair registration marks in corners */}
      <div className="absolute top-8 right-8 w-4 h-4 pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-3 h-[1px]" style={{ backgroundColor: strokePrimary }} />
        <div className="absolute top-0 right-0 h-3 w-[1px]" style={{ backgroundColor: strokePrimary }} />
      </div>
      <div className="absolute bottom-8 left-8 w-4 h-4 pointer-events-none opacity-30">
        <div className="absolute bottom-0 left-0 w-3 h-[1px]" style={{ backgroundColor: strokePrimary }} />
        <div className="absolute bottom-0 left-0 h-3 w-[1px]" style={{ backgroundColor: strokePrimary }} />
      </div>
    </div>
  );
};

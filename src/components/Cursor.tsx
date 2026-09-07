import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CursorProps {
  cursorText?: string;
  cursorMode?: string;
}

export const Cursor: React.FC<CursorProps> = ({ cursorText, cursorMode = 'default' }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only enable on non-touch devices with fine pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setIsEnabled(true);
    document.body.classList.add('custom-cursor-active');

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Center initial position off-screen
    gsap.set([cursor, dot], { xPercent: -50, yPercent: -50, opacity: 0 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });

      if (!hasMoved) {
        hasMoved = true;
        gsap.to([cursor, dot], { opacity: 1, duration: 0.3 });
      }

      // Dot follows immediately
      gsap.set(dot, { x: mouse.x, y: mouse.y });
    };

    // Smooth inertia for main cursor ring/capsule using ticker
    const ticker = () => {
      pos.x += (mouse.x - pos.x) * 0.18;
      pos.y += (mouse.y - pos.y) * 0.18;
      gsap.set(cursor, { x: pos.x, y: pos.y });
    };

    window.addEventListener('mousemove', onMouseMove);
    gsap.ticker.add(ticker);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(ticker);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  if (!isEnabled) return null;

  const isExpanded = cursorMode !== 'default' || Boolean(cursorText);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Immediate center point */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#111111] rounded-full pointer-events-none mix-blend-difference"
      />

      {/* Lagging ring / label pill */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none transition-all duration-200"
      >
        <div
          ref={labelRef}
          className={`flex items-center justify-center transition-all duration-300 font-mono-tech select-none ${
            isExpanded
              ? 'px-3 py-1.5 bg-[#111111] text-[#EAE6DC] text-[10px] tracking-widest uppercase font-semibold rounded-none shadow-md border border-[#355CFF]'
              : 'w-8 h-8 rounded-full border border-[#111111]/40'
          }`}
        >
          {isExpanded ? (
            <span className="flex items-center gap-1.5">
              <span>{cursorText || cursorMode.toUpperCase()}</span>
              <span className="text-[#355CFF]">↗</span>
            </span>
          ) : (
            <span className="opacity-0 text-[0px]">+</span>
          )}
        </div>

        {/* Subtle coordinate readout when in default mode */}
        {!isExpanded && (
          <div className="absolute left-7 top-7 text-[8px] font-mono-tech text-[#66645F]/70 tracking-tighter whitespace-nowrap opacity-60">
            X:{coords.x} Y:{coords.y}
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CursorProps {
  dark?: boolean;
  cursorText?: string;
  cursorMode?: string;
}

export const Cursor: React.FC<CursorProps> = ({
  dark = false,
  cursorText,
  cursorMode = 'default',
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  // Initialize synchronously on mount so DOM nodes render on the first pass
  const [isEnabled, setIsEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: fine)').matches;
  });

  useEffect(() => {
    // Media query to respond to pointer type changes (e.g. tablet docking)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsEnabled(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Center initial position
    gsap.set([cursor, dot], {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
    });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!isVisible) {
        isVisible = true;
        gsap.to([cursor, dot], { opacity: 1, duration: 0.2, overwrite: 'auto' });
      }

      // Dot moves synchronously with zero lag
      gsap.set(dot, { x: mouse.x, y: mouse.y });
    };

    const onMouseEnter = () => {
      isVisible = true;
      gsap.to([cursor, dot], { opacity: 1, duration: 0.2, overwrite: 'auto' });
    };

    const onMouseLeave = () => {
      isVisible = false;
      gsap.to([cursor, dot], { opacity: 0, duration: 0.25, overwrite: 'auto' });
    };

    // Smooth inertial follower for outer ring/badge
    const ticker = () => {
      pos.x += (mouse.x - pos.x) * 0.22;
      pos.y += (mouse.y - pos.y) * 0.22;
      gsap.set(cursor, { x: pos.x, y: pos.y });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    gsap.ticker.add(ticker);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      gsap.ticker.remove(ticker);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  const isExpanded = cursorMode !== 'default' || Boolean(cursorText);
  const displayText = cursorText || (cursorMode !== 'default' ? cursorMode.toUpperCase() : '');

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999]">
      {/* 
        Center Precision Point:
        High-visibility signature electric-blue core with a dual white+dark contrast border.
        Guaranteed optical visibility on paper, obsidian, canvas, and glass surfaces.
      */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none rounded-full transition-opacity duration-150 z-[99999] ${
          isExpanded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          width: '7px',
          height: '7px',
          backgroundColor: '#355CFF',
          boxShadow: dark
            ? '0 0 0 1.5px #FFFFFF, 0 0 8px rgba(53, 92, 255, 0.9)'
            : '0 0 0 1.5px #FFFFFF, 0 0 0 2.5px rgba(17, 17, 17, 0.65), 0 0 8px rgba(53, 92, 255, 0.7)',
        }}
      />

      {/* 
        Inertial Follower Ring / Interactive Telemetry Badge:
        Transitions only inner styling to avoid CSS-transform fighting with GSAP ticker.
      */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none z-[99998]"
        style={{ willChange: 'transform' }}
      >
        <div
          ref={labelRef}
          className={`flex items-center justify-center font-mono-tech select-none transition-all duration-200 ease-out ${
            isExpanded
              ? 'px-3.5 py-1.5 bg-[#111111] text-[#EAE6DC] text-[10px] tracking-widest uppercase font-bold rounded-none border border-[#355CFF] shadow-[0_4px_24px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.25)]'
              : 'w-9 h-9 rounded-full'
          }`}
          style={
            !isExpanded
              ? {
                  border: dark
                    ? '1.5px solid rgba(255, 255, 255, 0.9)'
                    : '1.5px solid rgba(17, 17, 17, 0.85)',
                  boxShadow: dark
                    ? '0 0 0 1px rgba(17, 17, 17, 0.7), 0 0 10px rgba(53, 92, 255, 0.3)'
                    : '0 0 0 1px rgba(255, 255, 255, 0.95), 0 2px 8px rgba(0, 0, 0, 0.12)',
                }
              : undefined
          }
        >
          {isExpanded && (
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span>{displayText}</span>
              <span className="text-[#355CFF] font-bold">↗</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

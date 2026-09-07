import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroScene3D } from './HeroScene3D';
import { PORTFOLIO_DATA } from '../data';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  setCursorMode: (mode: string, text?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setCursorMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLHeadingElement>(null);
  const titleLine3Ref = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const objectContainerRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(34);

  useEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    if (!container || !pin) return;

    // Live rotation number tick
    const rotInterval = setInterval(() => {
      setRotationAngle((prev) => (prev >= 359 ? 1 : prev + 1));
    }, 120);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          pin: pin,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });

      // Cinematic scrub choreography:
      // Line 1 drifts slightly left
      tl.to(
        titleLine1Ref.current,
        {
          x: -60,
          opacity: 0.2,
          ease: 'power1.out',
        },
        0
      );

      // Line 2 drifts slightly right
      tl.to(
        titleLine2Ref.current,
        {
          x: 60,
          opacity: 0.2,
          ease: 'power1.out',
        },
        0
      );

      // Line 3 drifts left
      tl.to(
        titleLine3Ref.current,
        {
          x: -40,
          opacity: 0.2,
          ease: 'power1.out',
        },
        0
      );

      // Technical annotations fade & separate
      tl.to(
        labelsRef.current,
        {
          y: -40,
          opacity: 0,
          ease: 'power2.in',
        },
        0.3
      );

      tl.to(
        metaRef.current,
        {
          opacity: 0,
          y: -20,
          ease: 'power1.in',
        },
        0.2
      );

      // 3D Object drifts and scales
      tl.to(
        objectContainerRef.current,
        {
          scale: 0.85,
          y: -50,
          ease: 'none',
        },
        0
      );
    }, container);

    return () => {
      clearInterval(rotInterval);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[220vh] bg-transparent select-none"
    >
      {/* Pinned 100vh viewport */}
      <div
        ref={pinRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between px-6 sm:px-12 md:px-16 pt-24 pb-10"
      >
        {/* Top Metadata Header */}
        <div
          ref={metaRef}
          className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#C8C4B9] pb-3 font-mono-tech text-[10px] text-[#66645F] tracking-widest uppercase gap-2"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#355CFF]" />
            <span>COMPUTER SCIENCE</span>
            <span className="text-[#C8C4B9]">|</span>
            <span>ENGINEERING</span>
            <span className="text-[#C8C4B9]">|</span>
            <span className="text-[#111111]">{PORTFOLIO_DATA.identity.location} // {PORTFOLIO_DATA.identity.year}</span>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-[9px] text-[#355CFF] font-semibold tracking-wider">
            <span>{PORTFOLIO_DATA.identity.heroSubstatement}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#355CFF]">
            <span>[SCRUB TO TRAVERSE]</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>

        {/* Floating Top-Left Technical Caliper Marker from Editorial Theme */}
        <div className="hidden lg:block absolute top-24 left-14 opacity-50 font-mono-tech text-[8px] text-[#66645F] pointer-events-none z-20">
          <p>AI_MODEL // EDGE_ENGINE</p>
          <p>SYS_INIT [ACTIVE]</p>
          <div className="w-10 h-10 border-l border-b border-[#355CFF] mt-1.5"></div>
        </div>

        {/* Center Crosshair with 'VIEW' Badge from Editorial Theme */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
          <div className="relative w-6 h-6">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#111111]"></div>
            <div className="absolute top-0 left-1/2 h-full w-[1px] bg-[#111111]"></div>
            <div className="absolute -top-10 left-6 px-2 py-0.5 bg-[#355CFF] text-white text-[9px] font-mono-tech font-bold rounded-xs shadow-md uppercase tracking-wider">
              VIEW
            </div>
          </div>
        </div>

        {/* Right-edge Vertical 'Scroll to travel' Indicator from Editorial Theme */}
        <div className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 pr-6 md:pr-8 flex-col items-center space-y-10 pointer-events-none z-20">
          <div className="rotate-90 origin-center text-[9px] font-bold tracking-[0.5em] text-[#C8C4B9] whitespace-nowrap uppercase font-mono-tech">
            Scroll to travel
          </div>
          <div className="w-[1px] h-28 bg-gradient-to-b from-[#C8C4B9] via-[#111111] to-transparent"></div>
        </div>

        {/* Center Arena: Staggered Editorial Headline Layered with 3D Object */}
        <div className="relative flex-1 flex items-center justify-between my-auto w-full">
          {/* Main Huge Typography */}
          <div className="relative z-10 w-full max-w-5xl pointer-events-none">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 font-mono-tech text-[11px] tracking-[0.25em] uppercase">
              <span className="font-bold text-[#111111]">{PORTFOLIO_DATA.identity.fullName}</span>
              <span className="text-[#C8C4B9]">//</span>
              <span className="font-bold text-[#355CFF]">{PORTFOLIO_DATA.identity.heroSubstatement}</span>
            </div>
            <h1 className="flex flex-col text-[#111111]">
              <span
                ref={titleLine1Ref}
                className="hero-headline font-display uppercase tracking-tight"
              >
                {PORTFOLIO_DATA.hero.titleLines[0]}
              </span>
              <span
                ref={titleLine2Ref}
                className="hero-headline font-display uppercase tracking-tight text-[#111111]"
              >
                {PORTFOLIO_DATA.hero.titleLines[1]}
              </span>
              <span
                ref={titleLine3Ref}
                className="hero-headline font-display uppercase tracking-tight text-[#355CFF]"
              >
                {PORTFOLIO_DATA.hero.titleLines[2]}
              </span>
            </h1>
          </div>

          {/* 3D Kinetic Sculpture Container */}
          <div
            ref={objectContainerRef}
            className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 w-[55vw] sm:w-[50vw] md:w-[44vw] h-[72vh] max-w-[680px] pointer-events-auto cursor-grab active:cursor-grabbing z-0"
            onMouseEnter={() => setCursorMode('drag', 'ORBIT')}
            onMouseLeave={() => setCursorMode('default')}
          >
            <HeroScene3D scrollProgress={scrollProgress} />

            {/* Tiny Technical Labels Surrounding the Object */}
            <div
              ref={labelsRef}
              className="absolute inset-0 pointer-events-none font-mono-tech text-[9px] sm:text-[10px] text-[#66645F] uppercase tracking-widest select-none flex flex-col justify-between p-4"
            >
              {/* Top-Right Label */}
              <div className="self-end border-l-2 border-[#355CFF] pl-2.5 py-1 bg-[#EAE6DC]/75 backdrop-blur-xs">
                <p className="text-[#111111] font-bold">ARTIFACT_01 // KINETIC RIG</p>
                <p>ROTATION: 0{rotationAngle}°</p>
                <p>SCALE: 1:25.04</p>
              </div>

              {/* Center-Right Measurement Marker */}
              <div className="self-end mr-6 text-right">
                <p className="text-[#355CFF]">┼ 0.884 RAD</p>
                <div className="w-16 h-[1px] bg-[#C8C4B9] my-1 ml-auto" />
                <p className="text-[8px] opacity-70">DELTA_T: 0.016s</p>
              </div>

              {/* Bottom-Right Label */}
              <div className="self-end border-t border-[#111111]/30 pt-1.5 flex items-center gap-3">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[#111111] font-semibold">SYSTEM ACTIVE</span>
                <span className="text-[8px] text-[#66645F]">NODES: 4,820</span>
              </div>
            </div>
          </div>

          {/* Floating Editorial Card from Design HTML */}
          <div className="hidden lg:block absolute right-16 bottom-6 w-80 z-20 pointer-events-auto">
            <div className="relative p-6 border border-[#C8C4B9] bg-[#EAE6DC]/60 backdrop-blur-sm shadow-sm">
              {/* Corner brackets */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-[#111111]"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-[#111111]"></div>
              
              <p className="font-editorial text-[13px] leading-relaxed mb-3 font-medium text-[#111111]">
                {PORTFOLIO_DATA.identity.coreStatement}
              </p>
              <p className="font-mono-tech text-[10px] text-[#66645F] mb-5 tracking-tight uppercase">
                {PORTFOLIO_DATA.identity.positioning}
              </p>

              <button
                onClick={() => {
                  const el = document.getElementById('work');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={() => setCursorMode('enter', 'ENTER')}
                onMouseLeave={() => setCursorMode('default')}
                className="flex items-center space-x-2 group font-mono-tech text-[10px] font-bold tracking-[0.2em] text-[#111111] hover:text-[#355CFF] transition-colors"
              >
                <span>EXPLORE WORK</span>
                <span className="text-[#355CFF] transition-transform group-hover:translate-x-1.5 font-bold">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Status & Measurement Line */}
        <div className="border-t border-[#C8C4B9] pt-3 flex flex-col sm:flex-row sm:items-center justify-between font-mono-tech text-[9px] text-[#66645F] tracking-widest uppercase gap-2">
          <div className="flex items-center space-x-6 sm:space-x-8">
            <span>LOC: {PORTFOLIO_DATA.identity.location}</span>
            <span>COORDS: {PORTFOLIO_DATA.identity.coordinates}</span>
            <span className="hidden md:inline text-[#C8C4B9]">|</span>
            <span className="hidden md:inline">SCROLL DEPTH: {Math.round(scrollProgress * 100)}%</span>
          </div>

          <div className="flex items-center gap-4 text-[#111111]">
            <span>EXPLORE BELOW</span>
            <span className="text-[#355CFF]">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
};


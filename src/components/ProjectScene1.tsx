import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ShieldCheck, Scan } from "lucide-react";
import { ProjectData } from "../types";
import { audioEngine } from "./AudioEngine";
import { PORTFOLIO_DATA } from "../data";

gsap.registerPlugin(ScrollTrigger);

interface ProjectScene1Props {
  onOpenModal: (project: ProjectData) => void;
  setCursorMode: (mode: string, text?: string) => void;
}

export const project1Data: ProjectData = PORTFOLIO_DATA.projects[0];

export const ProjectScene1: React.FC<ProjectScene1Props> = ({
  onOpenModal,
  setCursorMode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Cinematic scroll scrub
      gsap.fromTo(
        visualRef.current,
        { scale: 0.94, opacity: 0.7, y: 80 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
            end: "top 20%",
            scrub: 1,
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setCursorMode("default");
  };

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative w-full min-h-[140vh] py-24 px-6 sm:px-12 md:px-16 flex flex-col justify-between border-t border-[#C8C4B9] bg-transparent"
    >
      {/* Top Section Header */}
      <div className="section-header-row flex flex-col sm:flex-row items-start sm:items-baseline justify-between border-b border-[#C8C4B9] pb-3 sm:pb-4 mb-8 sm:mb-12 gap-3 sm:gap-0">
        <div className="flex items-baseline gap-2 sm:gap-4">
          <span className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-[#111111] leading-none">
            01
          </span>
          <div className="flex flex-col">
            <span className="font-mono-tech text-[9px] sm:text-[10px] md:text-xs text-[#355CFF] tracking-widest uppercase font-bold">
              {project1Data.category}
            </span>
            <span className="font-display text-lg sm:text-xl md:text-3xl font-bold tracking-tight text-[#111111] uppercase">
              {project1Data.title}
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4 sm:gap-6 font-mono-tech text-xs text-[#66645F] tracking-widest uppercase">
          <span>STATUS: BUILT</span>
          <span className="text-[#C8C4B9]">|</span>
          <span>PLATFORM: ANDROID ACCESSIBILITY</span>
          <span className="text-[#355CFF]">ENGINE: HEURISTIC OCR</span>
        </div>
      </div>

      {/* Hero Visual Composition (Occupies most of viewport) */}
      <div
        ref={visualRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setCursorMode("view", "INSPECT")}
        onClick={() => {
          audioEngine.playClick(1000);
          onOpenModal(project1Data);
        }}
        className="relative w-full h-[65vh] sm:h-[75vh] max-h-[820px] bg-[#E3DFD5] border border-[#C8C4B9] overflow-hidden cursor-pointer shadow-sm group transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        }}
      >
        {/* Editorial Corner Brackets */}
        <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#111111] z-20 pointer-events-none"></div>
        <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#111111] z-20 pointer-events-none"></div>

        {/* Background Architectural Blueprint SVG Layer */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid-dots-p1"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="#111111" fillOpacity="0.18" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-dots-p1)" />
            {/* Concentric Scanner Circles */}
            <circle
              cx="50%"
              cy="50%"
              r="140"
              stroke="#111111"
              strokeWidth="0.75"
              strokeDasharray="4 4"
              fill="none"
              opacity="0.4"
            />
            <circle
              cx="50%"
              cy="50%"
              r="220"
              stroke="#355CFF"
              strokeWidth="0.75"
              strokeDasharray="8 4"
              fill="none"
              opacity="0.3"
            />
            <circle
              cx="50%"
              cy="50%"
              r="300"
              stroke="#111111"
              strokeWidth="0.5"
              fill="none"
              opacity="0.2"
            />
          </svg>
        </div>

        {/* Centerpiece Vector Illustration: Mobile Threat Analysis Terminal */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-72 h-96 sm:w-80 sm:h-[420px] transition-transform duration-500">
            <svg viewBox="0 0 320 440" className="w-full h-full drop-shadow-md">
              {/* Stylized Device Shell */}
              <rect
                x="40"
                y="30"
                width="240"
                height="380"
                rx="20"
                fill={wireframeMode ? "none" : "#EAE6DC"}
                stroke="#111111"
                strokeWidth="2"
              />
              <rect
                x="56"
                y="50"
                width="208"
                height="340"
                fill={wireframeMode ? "none" : "#1A1A1A"}
                stroke="#111111"
                strokeWidth="1.5"
              />

              {/* Top Sensor Notch */}
              <rect
                x="130"
                y="38"
                width="60"
                height="5"
                rx="2.5"
                fill="#111111"
              />

              {/* QR Code / OCR Target Grid */}
              <rect
                x="80"
                y="80"
                width="160"
                height="160"
                fill="none"
                stroke="#355CFF"
                strokeWidth="1.5"
                strokeDasharray="6 4"
              />
              <rect
                x="95"
                y="95"
                width="40"
                height="40"
                fill={wireframeMode ? "none" : "#355CFF"}
                opacity="0.85"
              />
              <rect
                x="185"
                y="95"
                width="40"
                height="40"
                fill={wireframeMode ? "none" : "#355CFF"}
                opacity="0.85"
              />
              <rect
                x="95"
                y="185"
                width="40"
                height="40"
                fill={wireframeMode ? "none" : "#355CFF"}
                opacity="0.85"
              />

              {/* Scanning Laser Horizon */}
              <line
                x1="75"
                y1="160"
                x2="245"
                y2="160"
                stroke="#355CFF"
                strokeWidth="2"
              />
              <circle cx="160" cy="160" r="4" fill="#355CFF" />

              {/* OCR Detection Callout Card */}
              <rect
                x="75"
                y="260"
                width="170"
                height="110"
                fill={wireframeMode ? "none" : "#222222"}
                stroke="#355CFF"
                strokeWidth="1"
              />
              <line
                x1="90"
                y1="285"
                x2="210"
                y2="285"
                stroke="#EAE6DC"
                strokeWidth="2"
                opacity="0.9"
              />
              <line
                x1="90"
                y1="305"
                x2="180"
                y2="305"
                stroke="#EAE6DC"
                strokeWidth="1.5"
                opacity="0.7"
              />
              <line
                x1="90"
                y1="325"
                x2="150"
                y2="325"
                stroke="#355CFF"
                strokeWidth="2"
              />

              <text
                x="90"
                y="350"
                fill="#355CFF"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
              >
                [HEURISTIC SAFEGUARD: ACTIVE]
              </text>
            </svg>
          </div>
        </div>

        {/* Technical Callouts & Annotations on the Canvas */}
        <div className="absolute top-6 left-6 font-mono-tech text-[10px] sm:text-xs text-[#66645F] uppercase tracking-wider space-y-1">
          <div className="flex items-center gap-2 text-[#111111] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#355CFF]" />
            <span>THREAT ENGINE // REAL-TIME OCR HEURISTICS</span>
          </div>
          <div>ACCESSIBILITY DAEMON: ANDROID SUB-SERVICE</div>
          <div>CONTENT FILTER: QR · URL · MESSAGE · REPUTATION</div>
        </div>

        <div className="absolute top-6 right-6 font-mono-tech text-[10px] sm:text-xs text-right">
          <button
            onClick={(e) => {
              e.stopPropagation();
              audioEngine.playClick(1300);
              setWireframeMode(!wireframeMode);
            }}
            onMouseEnter={() =>
              setCursorMode("view", wireframeMode ? "SOLID" : "WIREFRAME")
            }
            onMouseLeave={() => setCursorMode("view", "INSPECT")}
            className="px-3 py-1 bg-[#111111] text-[#EAE6DC] hover:bg-[#355CFF] transition-colors"
          >
            {wireframeMode ? "SCHEMATIC: WIREFRAME" : "SCHEMATIC: COMPOSITE"}
          </button>
        </div>

        {/* Annotations Strip */}
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between font-mono-tech text-[10px] text-[#66645F] pointer-events-none">
          <div className="flex items-center gap-2">
            <Scan className="w-3.5 h-3.5 text-[#355CFF]" />
            <span className="text-[#111111] font-bold">
              THREAT ENGINE · OCR · RISK ANALYSIS · REAL-TIME
            </span>
          </div>
          <div className="text-[#111111] font-semibold bg-[#EAE6DC]/90 px-3 py-1 border border-[#C8C4B9]">
            CLICK TO OPEN FULL DOSSIER ↗
          </div>
        </div>
      </div>

      {/* Metadata Strip & Prominent VIEW PROJECT Trigger */}
      <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#C8C4B9] flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
        {/* Project Metadata Table */}
        <div className="meta-grid grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 font-mono-tech text-[11px] sm:text-xs">
          <div>
            <span className="text-[#66645F] block text-[9px] sm:text-[10px] uppercase mb-0.5">
              ROLE
            </span>
            <span className="font-bold text-[#111111]">
              {project1Data.role}
            </span>
          </div>
          <div>
            <span className="text-[#66645F] block text-[9px] sm:text-[10px] uppercase mb-0.5">
              STATUS
            </span>
            <span className="font-bold text-emerald-600">BUILT</span>
          </div>
          <div>
            <span className="text-[#66645F] block text-[9px] sm:text-[10px] uppercase mb-0.5">
              STACK
            </span>
            <span className="font-bold text-[#111111]">
              {project1Data.stack.join(" · ")}
            </span>
          </div>
          <div>
            <span className="text-[#66645F] block text-[9px] sm:text-[10px] uppercase mb-0.5">
              CATEGORY
            </span>
            <span className="font-bold text-[#355CFF]">
              {project1Data.category}
            </span>
          </div>
        </div>

        {/* Prominent VIEW PROJECT Trigger */}
        <button
          id="p1-view-btn"
          onClick={() => {
            audioEngine.playClick(1100);
            onOpenModal(project1Data);
          }}
          onMouseEnter={() => setCursorMode("open", "DOSSIER")}
          onMouseLeave={() => setCursorMode("default")}
          className="group self-stretch sm:self-start lg:self-auto flex items-center justify-center sm:justify-start gap-3 sm:gap-4 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#111111] text-[#EAE6DC] font-display text-sm sm:text-base lg:text-lg font-bold tracking-tight uppercase hover:bg-[#355CFF] transition-all duration-300 w-full sm:w-auto"
        >
          <span>VIEW PROJECT SPECIFICATION</span>
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform flex-shrink-0" />
        </button>
      </div>

      {/* Transition indicator to Scene 02 */}
      <div className="mt-10 sm:mt-16 pt-3 sm:pt-4 border-t border-dashed border-[#C8C4B9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono-tech text-[9px] sm:text-[10px] text-[#66645F] uppercase">
        <span>TRANSITIONING TO SCENE 02 // SARO MULTIMODAL SYSTEM</span>
        <span className="text-[#355CFF]">
          ↓ SCROLL DOWN TO ENTER LOCAL AI CHAMBER
        </span>
      </div>
    </section>
  );
};

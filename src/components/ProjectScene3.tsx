import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Layers,
  Sliders,
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { ProjectData } from "../types";
import { audioEngine } from "./AudioEngine";
import { PORTFOLIO_DATA } from "../data";

gsap.registerPlugin(ScrollTrigger);

interface ProjectScene3Props {
  onOpenModal: (project: ProjectData) => void;
  setCursorMode: (mode: string, text?: string) => void;
}

export const project3Data: ProjectData = PORTFOLIO_DATA.projects[2];

export const ProjectScene3: React.FC<ProjectScene3Props> = ({
  onOpenModal,
  setCursorMode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [explosion, setExplosion] = useState(48); // 0 (collapsed) to 100 (fully expanded)
  const [rotation, setRotation] = useState({ x: 14, y: -16 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });

  // Mouse drag to rotate perspective
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotation.x,
      rotY: rotation.y,
    };
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = (e.clientX - dragStartRef.current.x) * 0.25;
      const dy = (e.clientY - dragStartRef.current.y) * 0.25;
      setRotation({
        x: Math.max(-45, Math.min(45, dragStartRef.current.rotX - dy)),
        y: Math.max(-60, Math.min(60, dragStartRef.current.rotY + dx)),
      });
    };

    const onMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  const layerOffset = (explosion / 100) * 85;

  return (
    <section
      id="project-03"
      ref={containerRef}
      className="relative w-full min-h-[140vh] py-28 px-6 sm:px-12 md:px-16 flex flex-col justify-between border-t border-[#C8C4B9] bg-transparent text-[#111111]"
    >
      {/* Top Header */}
      <div className="section-header-row flex flex-col sm:flex-row items-start sm:items-baseline justify-between border-b border-[#C8C4B9] pb-3 sm:pb-4 mb-8 sm:mb-12 gap-3 sm:gap-0">
        <div className="flex items-baseline gap-2 sm:gap-4">
          <span className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-[#111111] leading-none">
            03
          </span>
          <div className="flex flex-col">
            <span className="font-mono-tech text-[9px] sm:text-[10px] md:text-xs text-[#355CFF] tracking-widest uppercase font-bold flex items-center gap-1.5 sm:gap-2">
              <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {project3Data.category}
            </span>
            <span className="font-display text-lg sm:text-xl md:text-3xl font-bold tracking-tight text-[#111111] uppercase">
              {project3Data.title}
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4 sm:gap-6 font-mono-tech text-xs text-[#66645F] tracking-widest uppercase">
          <span>STATUS: HACKATHON PROJECT</span>
          <span className="text-[#C8C4B9]">|</span>
          <span>REASONING: GEMINI MULTIMODAL</span>
          <span className="text-[#355CFF]">VECTOR DB: QDRANT</span>
        </div>
      </div>

      {/* Full-screen Interactive Disassembly Visual Canvas */}
      <div
        onMouseDown={handleMouseDown}
        onMouseEnter={() =>
          setCursorMode("drag", isDragging ? "ROTATING" : "DRAG ROTATE")
        }
        onMouseLeave={() => setCursorMode("default")}
        className={`relative w-full h-[68vh] sm:h-[76vh] max-h-[840px] bg-[#E3DFD5] border border-[#C8C4B9] overflow-hidden select-none cursor-grab ${
          isDragging ? "cursor-grabbing" : ""
        } shadow-sm group`}
      >
        {/* Editorial Corner Brackets */}
        <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#111111] z-20 pointer-events-none"></div>
        <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#111111] z-20 pointer-events-none"></div>

        {/* Background Architectural Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="p3-grid"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 30 0 L 0 0 0 30"
                  fill="none"
                  stroke="#C8C4B9"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#p3-grid)" />
          </svg>
        </div>

        {/* 3D Multi-Strata Architectural Isometric Projection for Document Analysis */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-out"
          style={{
            perspective: "1200px",
          }}
        >
          <div
            className="relative w-[320px] sm:w-[440px] h-[320px] sm:h-[440px]"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Strata Layer 1: Vector Indexing & Storage (Deepest) */}
            <div
              className="absolute inset-0 border-2 border-[#111111] bg-[#EAE6DC]/90 p-4 transition-transform duration-300"
              style={{
                transform: `translateZ(${-layerOffset * 1.5}px)`,
              }}
            >
              <div className="w-full h-full flex flex-col justify-between font-mono-tech text-[9px] text-[#66645F]">
                <div className="flex justify-between items-center text-[#111111]">
                  <span className="font-bold">
                    STRATA 01 // QDRANT EMBEDDINGS & REDIS
                  </span>
                  <span className="text-[#355CFF]">INDEXING</span>
                </div>
                <div className="grid grid-cols-4 gap-2 h-32 my-auto">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="border border-dashed border-[#C8C4B9] flex flex-col items-center justify-center text-[7px] text-[#111111]"
                    >
                      <span>VEC_{i + 1}</span>
                      <span className="text-[#355CFF] text-[6px]">1536-D</span>
                    </div>
                  ))}
                </div>
                <span className="text-[8px]">
                  EMBEDDING DENSITY: 12,400 TOKENS / CONTRACT
                </span>
              </div>
            </div>

            {/* Strata Layer 2: Syntactic Segmentation & Clause Parsing */}
            <div
              className="absolute inset-0 border border-[#355CFF] bg-[#E3DFD5]/85 p-4 transition-transform duration-300"
              style={{
                transform: `translateZ(${-layerOffset * 0.5}px)`,
              }}
            >
              <div className="w-full h-full flex flex-col justify-between font-mono-tech text-[9px] text-[#355CFF]">
                <div className="flex justify-between items-center">
                  <span className="font-bold">
                    STRATA 02 // FASTAPI SEGMENTATION PIPELINE
                  </span>
                  <span>CLASSIFICATION</span>
                </div>
                <div className="space-y-2 my-auto">
                  <div className="p-2 border border-[#355CFF]/40 bg-white/40 text-[#111111] text-[8px] flex justify-between">
                    <span>§ 4.2 INDEMNIFICATION CLAUSE</span>
                    <span className="text-emerald-700 font-bold">
                      [EXTRACTED]
                    </span>
                  </div>
                  <div className="p-2 border border-[#355CFF]/40 bg-white/40 text-[#111111] text-[8px] flex justify-between">
                    <span>§ 8.1 TERMINATION FOR CONVENIENCE</span>
                    <span className="text-amber-700 font-bold">[FLAGGED]</span>
                  </div>
                  <div className="p-2 border border-[#355CFF]/40 bg-white/40 text-[#111111] text-[8px] flex justify-between">
                    <span>§ 12.4 NON-COMPETE RESTRICTIONS</span>
                    <span className="text-red-700 font-bold">
                      [HIGH OBLIGATION]
                    </span>
                  </div>
                </div>
                <span className="text-[#66645F] text-[8px]">
                  SEGMENTATION ENGINE: AST HIERARCHICAL PARSER
                </span>
              </div>
            </div>

            {/* Strata Layer 3: Gemini Reasoning Core & Obligation Analyzer */}
            <div
              className="absolute inset-0 border-2 border-[#111111] bg-[#FAF8F5]/85 p-5 shadow-lg transition-transform duration-300"
              style={{
                transform: `translateZ(${layerOffset * 0.5}px)`,
              }}
            >
              <div className="w-full h-full flex flex-col justify-between font-mono-tech text-[9px]">
                <div className="flex justify-between items-center text-[#111111]">
                  <span className="font-bold">
                    STRATA 03 // GEMINI REASONING CORE
                  </span>
                  <span className="text-[#355CFF]">ANALYSIS</span>
                </div>
                <div className="my-auto space-y-2 text-[#111111]">
                  <div className="p-2 border border-[#C8C4B9] bg-white/60">
                    <p className="font-bold text-[9px] text-[#355CFF]">
                      REASONING SUMMARY
                    </p>
                    <p className="text-[8px] leading-relaxed text-[#66645F] mt-1 font-editorial">
                      Surface hidden operational liabilities in clause 4.2.
                      Unlimited consequential damage exposure detected.
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[8px] text-[#66645F] border-t border-[#C8C4B9] pt-1.5">
                    <span>RECURSIVE PROMPT: ACTIVE</span>
                    <span className="text-[#355CFF] font-bold">
                      LATENCY: 420MS
                    </span>
                  </div>
                </div>
                <span className="text-[#66645F] text-[8px]">
                  CONTEXT WINDOW: 1M TOKENS
                </span>
              </div>
            </div>

            {/* Strata Layer 4: Executive Risk Scoring & Audited Surface (Topmost) */}
            <div
              className="absolute inset-0 border-2 border-[#111111] bg-[#111111] text-[#EAE6DC] p-5 shadow-2xl transition-transform duration-300"
              style={{
                transform: `translateZ(${layerOffset * 1.5}px)`,
              }}
            >
              <div className="w-full h-full flex flex-col justify-between font-mono-tech text-[9px]">
                <div className="flex justify-between items-center text-white">
                  <span className="font-bold">
                    STRATA 04 // EXECUTIVE AUDIT DOSSIER
                  </span>
                  <span className="text-emerald-400 font-bold">
                    SCORING 8.4/10
                  </span>
                </div>
                <div className="my-auto space-y-3">
                  <div className="flex justify-between items-center border-b border-white/20 pb-1">
                    <span className="text-white/60">COMPLIANCE RISK</span>
                    <span className="text-emerald-400 font-bold">
                      LOW (1.2%)
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-1">
                    <span className="text-white/60">OBLIGATION BURDEN</span>
                    <span className="text-amber-400 font-bold">MODERATE</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-1">
                    <span className="text-white/60">AMBIGUOUS CLAUSES</span>
                    <span className="text-[#355CFF] font-bold">3 DETECTED</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[8px] text-white/40">
                  <span>FINAL INDEX GENERATED</span>
                  <span className="text-white">STATUS: EXPORT READY</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Annotations Strip */}
        <div className="absolute top-6 left-6 font-mono-tech text-[10px] sm:text-xs text-[#66645F] uppercase tracking-wider space-y-1 pointer-events-none">
          <div className="flex items-center gap-2 text-[#111111] font-bold">
            <FileText className="w-3.5 h-3.5 text-[#355CFF]" />
            <span>CONTRACT ANALYSIS ENGINE // 4-LAYER PIPELINE</span>
          </div>
          <div>
            EXTRACTION · CLASSIFICATION · SEGMENTATION · ANALYSIS · SCORING ·
            INDEXING
          </div>
        </div>

        {/* Bottom Interactive Sliders & Controls */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono-tech text-xs bg-[#EAE6DC]/90 backdrop-blur-sm p-4 border border-[#C8C4B9]">
          <div className="flex items-center gap-4 w-full sm:w-80">
            <span className="text-[#66645F] uppercase text-[10px] whitespace-nowrap flex items-center gap-1.5 font-bold">
              <Sliders className="w-3.5 h-3.5 text-[#355CFF]" />
              PIPELINE SPREAD:
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={explosion}
              onChange={(e) => {
                setExplosion(Number(e.target.value));
                audioEngine.playClick(600 + Number(e.target.value) * 6);
              }}
              onMouseEnter={() => setCursorMode("drag", "SLIDE")}
              onMouseLeave={() => setCursorMode("default")}
              className="w-full accent-[#355CFF] cursor-pointer"
            />
            <span className="font-bold text-[#111111] text-[11px] w-8">
              {explosion}%
            </span>
          </div>

          <div className="text-[10px] text-[#66645F] uppercase hidden md:block">
            DRAG TO ROTATE PIPELINE PERSPECTIVE [ROT: {Math.round(rotation.x)}°,{" "}
            {Math.round(rotation.y)}°]
          </div>

          <button
            onClick={() => {
              audioEngine.playClick(1000);
              onOpenModal(project3Data);
            }}
            onMouseEnter={() => setCursorMode("open", "DOSSIER")}
            onMouseLeave={() => setCursorMode("default")}
            className="px-4 py-2 bg-[#111111] text-[#EAE6DC] text-xs font-bold uppercase hover:bg-[#355CFF] transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <span>INSPECT DOSSIER</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Metadata Strip & Prominent Trigger */}
      <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#C8C4B9] flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
        <div className="meta-grid grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 font-mono-tech text-[11px] sm:text-xs">
          <div>
            <span className="text-[#66645F] block text-[9px] sm:text-[10px] uppercase mb-0.5">
              ROLE
            </span>
            <span className="font-bold text-[#111111]">
              {project3Data.role}
            </span>
          </div>
          <div>
            <span className="text-[#66645F] block text-[9px] sm:text-[10px] uppercase mb-0.5">
              STATUS
            </span>
            <span className="font-bold text-[#111111]">HACKATHON PROJECT</span>
          </div>
          <div>
            <span className="text-[#66645F] block text-[9px] sm:text-[10px] uppercase mb-0.5">
              STACK
            </span>
            <span className="font-bold text-[#355CFF]">
              Python · FastAPI · Gemini · Qdrant
            </span>
          </div>
          <div>
            <span className="text-[#66645F] block text-[9px] sm:text-[10px] uppercase mb-0.5">
              INFRA
            </span>
            <span className="font-bold text-[#111111]">PostgreSQL · Redis</span>
          </div>
        </div>

        <button
          id="p3-view-btn"
          onClick={() => {
            audioEngine.playClick(1100);
            onOpenModal(project3Data);
          }}
          onMouseEnter={() => setCursorMode("open", "DOSSIER")}
          onMouseLeave={() => setCursorMode("default")}
          className="group self-stretch sm:self-start lg:self-auto flex items-center justify-center sm:justify-start gap-3 sm:gap-4 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#111111] text-[#EAE6DC] font-display text-sm sm:text-base lg:text-lg font-bold tracking-tight uppercase hover:bg-[#355CFF] transition-all duration-300 w-full sm:w-auto"
        >
          <span>VIEW PROJECT SPECIFICATION</span>
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform flex-shrink-0" />
        </button>
      </div>
    </section>
  );
};

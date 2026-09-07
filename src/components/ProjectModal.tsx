import React, { useEffect } from 'react';
import { X, ArrowUpRight, CheckCircle2, Layers, Cpu, Code2 } from 'lucide-react';
import { ProjectData } from '../types';
import { audioEngine } from './AudioEngine';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
  setCursorMode: (mode: string, text?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  setCursorMode,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        audioEngine.playClick(900);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[110] bg-[#111111]/90 backdrop-blur-md flex justify-end"
    >
      {/* Dossier Side Panel */}
      <div className="w-full max-w-3xl h-full bg-[#EAE6DC] text-[#111111] overflow-y-auto p-6 sm:p-12 md:p-14 flex flex-col justify-between border-l border-[#111111]/30 shadow-2xl relative">
        {/* Top Bar */}
        <div>
          <div className="flex items-center justify-between border-b border-[#C8C4B9] pb-4 mb-8">
            <div className="font-mono-tech text-xs tracking-widest text-[#66645F] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#355CFF]" />
              <span>PROJECT DOSSIER // REF-{project.number}</span>
            </div>
            <button
              id="close-modal-btn"
              onClick={() => {
                audioEngine.playClick(900);
                onClose();
              }}
              onMouseEnter={() => setCursorMode('close', 'CLOSE')}
              onMouseLeave={() => setCursorMode('default')}
              className="flex items-center gap-2 px-3 py-1.5 border border-[#111111] text-xs font-mono-tech tracking-widest uppercase hover:bg-[#111111] hover:text-[#EAE6DC] transition-colors"
            >
              <span>DISMISS [ESC]</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Project Title Header */}
          <div className="mb-10">
            <span className="font-mono-tech text-sm text-[#355CFF] tracking-widest font-bold block mb-2">
              EXHIBIT {project.number}
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight uppercase mb-4 leading-none">
              {project.title}
            </h2>
            <p className="font-editorial text-lg sm:text-xl text-[#66645F] leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </div>

          {/* Technical Specifications Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[#C8C4B9] mb-10 font-mono-tech text-xs">
            <div>
              <span className="text-[#66645F] block text-[10px] uppercase">CLIENT</span>
              <span className="font-bold text-[#111111]">{project.client}</span>
            </div>
            <div>
              <span className="text-[#66645F] block text-[10px] uppercase">YEAR</span>
              <span className="font-bold text-[#111111]">{project.year}</span>
            </div>
            <div>
              <span className="text-[#66645F] block text-[10px] uppercase">ROLE</span>
              <span className="font-bold text-[#111111]">{project.role}</span>
            </div>
            <div>
              <span className="text-[#66645F] block text-[10px] uppercase">CATEGORY</span>
              <span className="font-bold text-[#355CFF]">{project.category}</span>
            </div>
          </div>

          {/* Architectural Blueprint Diagram (SVG) */}
          <div className="p-6 bg-[#E3DFD5] border border-[#C8C4B9] mb-10 relative">
            {/* Corner brackets */}
            <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t border-l border-[#111111] pointer-events-none"></div>
            <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b border-r border-[#111111] pointer-events-none"></div>

            <div className="absolute top-3 left-3 text-[9px] font-mono-tech text-[#66645F] tracking-widest">
              SCHEMATIC SYSTEM MAP // FIG. 01
            </div>
            <div className="my-4 pt-4">
              <svg className="w-full h-44" viewBox="0 0 600 180" fill="none">
                {/* Blueprint lines */}
                <rect x="20" y="20" width="560" height="140" stroke="#C8C4B9" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="120" cy="90" r="40" stroke="#111111" strokeWidth="1.5" />
                <circle cx="120" cy="90" r="15" fill="#355CFF" />
                <path d="M 160 90 L 280 90" stroke="#111111" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <rect x="280" y="50" width="120" height="80" stroke="#111111" strokeWidth="1.5" fill="#EAE6DC" />
                <path d="M 400 90 L 480 90" stroke="#111111" strokeWidth="1.5" />
                <polygon points="480,50 560,90 480,130" stroke="#355CFF" strokeWidth="1.5" fill="none" />
                <text x="120" y="150" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#66645F">INGEST_NODE</text>
                <text x="340" y="95" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#111111">KERNEL_PROCESS</text>
                <text x="520" y="150" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#355CFF">RAY_EMITTER</text>
              </svg>
            </div>
            <div className="flex justify-between text-[9px] font-mono-tech text-[#66645F] border-t border-[#C8C4B9]/70 pt-2">
              <span>LATENCY: 1.4ms</span>
              <span>GEOMETRY CACHE: 99.4% HIT</span>
              <span>RENDER TARGET: HDR 16-BIT</span>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="mb-10">
            <h4 className="font-mono-tech text-xs tracking-widest text-[#66645F] uppercase mb-3 flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-[#355CFF]" />
              TECHNICAL ARCHITECTURE & LIBS
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#111111] text-[#EAE6DC] font-mono-tech text-xs font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Quantitative Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="p-4 border border-[#C8C4B9] bg-white/40">
                <span className="font-display text-2xl font-extrabold text-[#111111] block mb-1">
                  {metric.value}
                </span>
                <span className="font-mono-tech text-[10px] text-[#66645F] uppercase tracking-wider">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-[#C8C4B9] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono-tech text-[#66645F]">
            STATUS: ARCHIVED & REPRODUCIBLE
          </div>
          <a
            href="#contact"
            onClick={() => {
              onClose();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={() => setCursorMode('enter', 'INQUIRE')}
            onMouseLeave={() => setCursorMode('default')}
            className="w-full sm:w-auto px-6 py-3 bg-[#355CFF] text-white font-mono-tech text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2 hover:bg-[#111111] transition-colors"
          >
            <span>INQUIRE ABOUT THIS SYSTEM</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

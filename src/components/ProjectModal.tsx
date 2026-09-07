import React, { useEffect } from "react";
import {
  X,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Cpu,
  Code2,
} from "lucide-react";
import { ProjectData } from "../types";
import { audioEngine } from "./AudioEngine";

type SchematicSpec = {
  caption: string;
  stats: string[];
  svg: React.ReactNode;
};

// Per-project system schematics — each dossier gets its own real system map
const SCHEMATICS: Record<string, SchematicSpec> = {
  // VIORA — capture → OCR → heuristic core → risk alert
  viora: {
    caption: 'SYSTEM MAP // CAPTURE → OCR → HEURISTIC CORE → ALERT',
    stats: ['OCR LATENCY: <45MS', 'MODE: ON-DEVICE', 'SURFACE: ANDROID ACCESSIBILITY'],
    svg: (
      <svg className="w-full h-48" viewBox="0 0 600 190" fill="none">
        <rect x="24" y="30" width="76" height="130" rx="10" stroke="#111111" strokeWidth="2" fill="#EAE6DC" />
        <rect x="35" y="48" width="54" height="94" fill="#1A1A1A" />
        <rect x="50" y="37" width="24" height="4" rx="2" fill="#111111" />
        <rect x="46" y="62" width="14" height="14" fill="#355CFF" opacity="0.9" />
        <rect x="64" y="62" width="14" height="14" fill="#355CFF" opacity="0.9" />
        <rect x="46" y="80" width="14" height="14" fill="#355CFF" opacity="0.9" />
        <line x1="35" y1="104" x2="89" y2="104" stroke="#355CFF" strokeWidth="2" />
        <text x="62" y="176" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#66645F">SCREEN_PAYLOAD</text>
        <path d="M 104 95 L 146 95" stroke="#111111" strokeWidth="1.5" />
        <polygon points="146,91 154,95 146,99" fill="#111111" />
        <circle cx="196" cy="95" r="36" stroke="#111111" strokeWidth="1.5" fill="#EAE6DC" />
        <circle cx="196" cy="95" r="24" stroke="#C8C4B9" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        <circle cx="196" cy="95" r="11" fill="#355CFF" />
        <text x="196" y="148" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#66645F">OCR_ENGINE</text>
        <path d="M 236 95 L 270 95" stroke="#111111" strokeWidth="1.5" />
        <polygon points="270,91 278,95 270,99" fill="#111111" />
        <rect x="284" y="52" width="140" height="86" stroke="#111111" strokeWidth="1.5" fill="#EAE6DC" />
        <rect x="284" y="52" width="140" height="20" fill="#111111" />
        <text x="292" y="66" fontSize="8" fontFamily="monospace" fill="#EAE6DC">HEURISTIC_CORE</text>
        <line x1="296" y1="90" x2="380" y2="90" stroke="#C8C4B9" strokeWidth="2" />
        <line x1="296" y1="104" x2="352" y2="104" stroke="#C8C4B9" strokeWidth="1.5" opacity="0.7" />
        <line x1="296" y1="118" x2="366" y2="118" stroke="#355CFF" strokeWidth="2" />
        <text x="354" y="176" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#66645F">THREAT_SCORING</text>
        <path d="M 428 95 L 454 95" stroke="#111111" strokeWidth="1.5" />
        <polygon points="454,91 462,95 454,99" fill="#111111" />
        <polygon points="516,52 568,138 464,138" stroke="#355CFF" strokeWidth="1.5" fill="none" />
        <text x="516" y="102" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#111111">RISK</text>
        <text x="516" y="176" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#66645F">USER_ALERT</text>
        <path d="M 464 148 C 380 182, 220 182, 122 150" stroke="#355CFF" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.5" />
      </svg>
    ),
  },
  // SARO — voice + vision → local LLM → device bus
  saro: {
    caption: 'SYSTEM MAP // VOICE + VISION → LOCAL LLM → DEVICE BUS',
    stats: ['INFERENCE: 100% LOCAL', 'LATENCY: <45MS', 'INPUTS: VOICE + VISION'],
    svg: (
      <svg className="w-full h-48" viewBox="0 0 600 190" fill="none">
        <circle cx="80" cy="56" r="30" stroke="#111111" strokeWidth="1.5" fill="#EAE6DC" />
        <rect x="74" y="44" width="12" height="18" rx="6" fill="#355CFF" />
        <path d="M 66 60 C 70 70, 90 70, 94 60" stroke="#111111" strokeWidth="1.5" fill="none" />
        <text x="80" y="16" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#66645F">VOICE_STREAM</text>
        <circle cx="80" cy="132" r="30" stroke="#111111" strokeWidth="1.5" fill="#EAE6DC" />
        <rect x="66" y="124" width="28" height="18" rx="3" stroke="#111111" strokeWidth="1.5" fill="none" />
        <circle cx="80" cy="133" r="5" fill="#355CFF" />
        <text x="80" y="180" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#66645F">VISION_FEED</text>
        <path d="M 112 56 C 158 56, 166 76, 206 82" stroke="#111111" strokeWidth="1.5" fill="none" />
        <path d="M 112 132 C 158 132, 166 108, 206 100" stroke="#111111" strokeWidth="1.5" fill="none" />
        <rect x="210" y="52" width="152" height="86" stroke="#355CFF" strokeWidth="1.5" fill="#EAE6DC" />
        <rect x="210" y="52" width="152" height="20" fill="#355CFF" />
        <text x="218" y="66" fontSize="8" fontFamily="monospace" fill="#FFFFFF">LOCAL_LLM // EDGE</text>
        <text x="222" y="94" fontSize="8" fontFamily="monospace" fill="#111111">INTENT_RESOLUTION</text>
        <text x="222" y="108" fontSize="8" fontFamily="monospace" fill="#66645F">CV_INFERENCE</text>
        <text x="222" y="122" fontSize="8" fontFamily="monospace" fill="#355CFF">ZERO_CLOUD</text>
        <text x="286" y="176" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#66645F">ON_DEVICE_REASONING</text>
        <path d="M 366 95 L 410 95" stroke="#111111" strokeWidth="1.5" />
        <polygon points="410,91 418,95 410,99" fill="#111111" />
        <polygon points="424,50 506,50 548,95 506,140 424,140" stroke="#111111" strokeWidth="1.5" fill="#EAE6DC" />
        <text x="482" y="92" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#111111">DEVICE_BUS</text>
        <text x="482" y="108" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#355CFF">HANDS_FREE</text>
        <text x="482" y="176" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#66645F">ACTUATION</text>
      </svg>
    ),
  },
  // OBLIQ — contract → segmenter → Gemini → Qdrant + risk score
  obliq: {
    caption: 'SYSTEM MAP // CONTRACT → SEGMENTER → GEMINI → QDRANT + RISK',
    stats: ['VECTOR DB: QDRANT', 'CONTEXT: 1M TOKENS', 'SCORING: AUTOMATED'],
    svg: (
      <svg className="w-full h-48" viewBox="0 0 600 190" fill="none">
        <rect x="30" y="36" width="88" height="118" stroke="#111111" strokeWidth="1.5" fill="#EAE6DC" />
        <line x1="44" y1="58" x2="104" y2="58" stroke="#C8C4B9" strokeWidth="2" />
        <line x1="44" y1="74" x2="96" y2="74" stroke="#C8C4B9" strokeWidth="1.5" />
        <line x1="44" y1="90" x2="100" y2="90" stroke="#C8C4B9" strokeWidth="1.5" />
        <line x1="44" y1="106" x2="88" y2="106" stroke="#355CFF" strokeWidth="2" />
        <line x1="44" y1="122" x2="98" y2="122" stroke="#C8C4B9" strokeWidth="1.5" />
        <text x="74" y="176" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#66645F">CONTRACT_INPUT</text>
        <path d="M 122 95 L 150 95" stroke="#111111" strokeWidth="1.5" />
        <polygon points="150,91 158,95 150,99" fill="#111111" />
        <rect x="164" y="52" width="132" height="86" stroke="#111111" strokeWidth="1.5" fill="#EAE6DC" />
        <rect x="164" y="52" width="132" height="20" fill="#111111" />
        <text x="172" y="66" fontSize="8" fontFamily="monospace" fill="#EAE6DC">FASTAPI_SEGMENTER</text>
        <text x="176" y="94" fontSize="8" fontFamily="monospace" fill="#111111">§4.2 [EXTRACTED]</text>
        <text x="176" y="108" fontSize="8" fontFamily="monospace" fill="#111111">§8.1 [FLAGGED]</text>
        <text x="176" y="122" fontSize="8" fontFamily="monospace" fill="#355CFF">§12.4 [HIGH OBLIG]</text>
        <text x="230" y="176" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#66645F">CLAUSE_GRAPH</text>
        <path d="M 300 95 L 328 95" stroke="#111111" strokeWidth="1.5" />
        <polygon points="328,91 336,95 328,99" fill="#111111" />
        <circle cx="384" cy="95" r="38" stroke="#355CFF" strokeWidth="1.5" fill="#EAE6DC" />
        <circle cx="384" cy="95" r="26" stroke="#C8C4B9" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        <circle cx="384" cy="95" r="12" fill="#355CFF" />
        <text x="384" y="176" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#66645F">GEMINI_REASONING</text>
        <path d="M 424 80 L 450 66" stroke="#111111" strokeWidth="1.5" />
        <path d="M 424 110 L 450 124" stroke="#111111" strokeWidth="1.5" />
        <polygon points="512,42 572,64 512,86 452,64" stroke="#111111" strokeWidth="1.5" fill="#EAE6DC" />
        <text x="512" y="60" textAnchor="middle" fontSize="8" fontFamily="monospace" fontWeight="bold" fill="#111111">QDRANT</text>
        <text x="512" y="70" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#66645F">VECTOR_INDEX</text>
        <rect x="456" y="112" width="118" height="42" stroke="#355CFF" strokeWidth="1.5" fill="#EAE6DC" />
        <text x="515" y="130" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#66645F">RISK_SCORE</text>
        <text x="515" y="147" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#355CFF">8.4 / 10</text>
      </svg>
    ),
  },
};

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
    if (project) {
      document.documentElement.classList.add("lenis-stopped");
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        audioEngine.playClick(900);
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const schematic = SCHEMATICS[project.id];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[110] bg-[#111111]/90 backdrop-blur-md flex justify-end overflow-hidden"
    >
      {/* Dossier Side Panel */}
      <div className="w-full max-w-3xl h-full bg-[#EAE6DC] text-[#111111] p-6 sm:p-12 md:p-14 flex flex-col border-l border-[#111111]/30 shadow-2xl relative overflow-hidden">
        {/* Oversized exhibit number watermark */}
        <div className="absolute -bottom-12 -right-2 font-display text-[220px] leading-none font-black text-[#111111]/[0.04] select-none pointer-events-none">
          {project.number}
        </div>
        {/* Top Bar - Fixed */}
        <div className="flex-shrink-0">
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
              onMouseEnter={() => setCursorMode("close", "CLOSE")}
              onMouseLeave={() => setCursorMode("default")}
              className="flex items-center gap-2 px-3 py-1.5 border border-[#111111] text-xs font-mono-tech tracking-widest uppercase hover:bg-[#111111] hover:text-[#EAE6DC] transition-colors"
            >
              <span>DISMISS [ESC]</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area — data-lenis-prevent lets the wheel scroll this panel while Lenis is stopped */}
        <div data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar">
          {/* Project Title Header */}
          <div className="mb-10">
            <span className="font-mono-tech text-sm text-[#355CFF] tracking-widest font-bold block mb-2">
              EXHIBIT {project.number}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase mb-4 leading-[0.95] break-words">
              {project.title}
            </h2>
            <div className="font-editorial text-base sm:text-lg text-[#66645F] leading-relaxed max-w-2xl break-words">
              {project.description}
            </div>
          </div>

          {/* Technical Specifications Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[#C8C4B9] mb-10 font-mono-tech text-xs">
            <div className="min-w-0 break-words">
              <span className="text-[#66645F] block text-[10px] uppercase">
                CLIENT
              </span>
              <span className="font-bold text-[#111111]">{project.client}</span>
            </div>
            <div className="min-w-0 break-words">
              <span className="text-[#66645F] block text-[10px] uppercase">
                YEAR
              </span>
              <span className="font-bold text-[#111111]">{project.year}</span>
            </div>
            <div className="min-w-0 break-words">
              <span className="text-[#66645F] block text-[10px] uppercase">
                ROLE
              </span>
              <span className="font-bold text-[#111111]">{project.role}</span>
            </div>
            <div className="min-w-0 break-words">
              <span className="text-[#66645F] block text-[10px] uppercase">
                CATEGORY
              </span>
              <span className="font-bold text-[#355CFF]">
                {project.category}
              </span>
            </div>
          </div>

          {/* Architectural Blueprint Diagram — bespoke per project */}
          <div className="p-6 bg-[#E3DFD5] border border-[#C8C4B9] mb-10 relative">
            {/* Corner brackets */}
            <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t border-l border-[#111111] pointer-events-none"></div>
            <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b border-r border-[#111111] pointer-events-none"></div>

            <div className="absolute top-3 left-3 text-[9px] font-mono-tech text-[#66645F] tracking-widest">
              {schematic
                ? schematic.caption
                : 'SCHEMATIC SYSTEM MAP // FIG. 01'}
            </div>
            <div className="my-4 pt-4">
              {schematic ? (
                schematic.svg
              ) : (
                <svg className="w-full h-44" viewBox="0 0 600 180" fill="none">
                  <rect x="20" y="20" width="560" height="140" stroke="#C8C4B9" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="120" cy="90" r="40" stroke="#111111" strokeWidth="1.5" />
                  <circle cx="120" cy="90" r="15" fill="#355CFF" />
                  <path d="M 160 90 L 280 90" stroke="#111111" strokeWidth="1.5" />
                  <rect x="280" y="50" width="120" height="80" stroke="#111111" strokeWidth="1.5" fill="#EAE6DC" />
                  <path d="M 400 90 L 480 90" stroke="#111111" strokeWidth="1.5" />
                  <polygon points="480,50 560,90 480,130" stroke="#355CFF" strokeWidth="1.5" fill="none" />
                </svg>
              )}
            </div>
            <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-[9px] font-mono-tech text-[#66645F] border-t border-[#C8C4B9]/70 pt-2">
              {schematic
                ? schematic.stats.map((stat) => <span key={stat}>{stat}</span>)
                : (
                  <>
                    <span>LATENCY: 1.4ms</span>
                    <span>GEOMETRY CACHE: 99.4% HIT</span>
                    <span>RENDER TARGET: HDR 16-BIT</span>
                  </>
                )}
            </div>
          </div>

          {/* Execution Pipeline — per-project stage breakdown */}
          {project.pipeline && project.pipeline.length > 0 && (
            <div className="mb-10">
              <h4 className="font-mono-tech text-xs tracking-widest text-[#66645F] uppercase mb-5 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#355CFF]" />
                EXECUTION PIPELINE
              </h4>
              <div className="ml-1.5 border-l-2 border-[#C8C4B9] pl-6 space-y-6">
                {project.pipeline.map((stage, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[30px] top-1 w-3 h-3 bg-[#355CFF] border-2 border-[#EAE6DC]" />
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="font-mono-tech text-xs font-bold text-[#111111] uppercase tracking-wider">
                        <span className="text-[#355CFF] mr-2">
                          0{idx + 1}
                        </span>
                        {stage.stage}
                      </span>
                      <span className="px-2 py-0.5 border border-[#355CFF] text-[#355CFF] font-mono-tech text-[9px] font-bold uppercase tracking-wider">
                        {stage.status}
                      </span>
                    </div>
                    <p className="font-editorial text-sm text-[#66645F] leading-relaxed break-words">
                      {stage.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

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
          <div className="mb-4">
            <h4 className="font-mono-tech text-xs tracking-widest text-[#66645F] uppercase mb-4 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#355CFF]" />
              SIGNAL METRICS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-[#C8C4B9] bg-white/40"
                >
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

          {/* Dossier Notes — evidence & provenance */}
          {project.notes && project.notes.length > 0 && (
            <div className="border-t border-[#C8C4B9] pt-6">
              <h4 className="font-mono-tech text-xs tracking-widest text-[#66645F] uppercase mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#355CFF]" />
                DOSSIER NOTES
              </h4>
              <ul className="space-y-2.5">
                {project.notes.map((note, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 font-editorial text-sm text-[#111111] leading-relaxed"
                  >
                    <span className="text-[#355CFF] font-mono-tech font-bold flex-shrink-0">
                      ▪
                    </span>
                    <span className="break-words">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom CTA - Fixed */}
        <div className="flex-shrink-0 border-t border-[#C8C4B9] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono-tech text-[#66645F]">
            STATUS: ARCHIVED & REPRODUCIBLE
          </div>
          <a
            href="#contact"
            onClick={() => {
              onClose();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            onMouseEnter={() => setCursorMode("enter", "INQUIRE")}
            onMouseLeave={() => setCursorMode("default")}
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

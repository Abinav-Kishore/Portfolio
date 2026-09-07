import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Cpu, Eye, Mic, Award } from "lucide-react";
import { ProjectData } from "../types";
import { audioEngine } from "./AudioEngine";
import { PORTFOLIO_DATA } from "../data";

gsap.registerPlugin(ScrollTrigger);

interface ProjectScene2Props {
  onOpenModal: (project: ProjectData) => void;
  setCursorMode: (mode: string, text?: string) => void;
  setIsDark: (dark: boolean) => void;
}

export const project2Data: ProjectData = PORTFOLIO_DATA.projects[1];

export const ProjectScene2: React.FC<ProjectScene2Props> = ({
  onOpenModal,
  setCursorMode,
  setIsDark,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeChannel, setActiveChannel] = useState<
    "VOICE" | "VISION" | "EDGE"
  >("VOICE");

  // Set dark mode when entering this section via ScrollTrigger
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top 45%",
      end: "bottom 45%",
      onEnter: () => setIsDark(true),
      onEnterBack: () => setIsDark(true),
      onLeave: () => setIsDark(false),
      onLeaveBack: () => setIsDark(false),
    });

    return () => st.kill();
  }, [setIsDark]);

  // Interactive Wireframe Synthetic Sensor Matrix Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    let mouseX = 0.5;
    let mouseY = 0.5;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
    };

    canvas.addEventListener("mousemove", onPointerMove);

    const cols = 36;
    const rows = 24;

    const render = () => {
      time += 0.025;
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;

      ctx.clearRect(0, 0, w, h);

      // Grid wireframe drawing
      const cellW = w / (cols - 1);
      const cellH = h / (rows - 1);

      // Calculate 3D points
      const points: { x: number; y: number; z: number }[][] = [];

      for (let r = 0; r < rows; r++) {
        points[r] = [];
        for (let c = 0; c < cols; c++) {
          const u = c / (cols - 1);
          const v = r / (rows - 1);

          // Distance from mouse position
          const dx = u - mouseX;
          const dy = v - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ripple = Math.sin(dist * 16 - time * 2) * Math.exp(-dist * 2.2);

          // Multimodal waves based on channel
          const baseWave =
            Math.sin(u * 8 + time) * Math.cos(v * 6 + time * 0.8) * 18 +
            Math.sin(u * 14 - time * 1.5) * 8;

          const z = baseWave + ripple * 38;
          const px = c * cellW;
          const py = r * cellH + z * 0.85;

          points[r][c] = { x: px, y: py, z };
        }
      }

      // Draw horizontal lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const pt = points[r][c];
          if (c === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        const alpha = 0.12 + (r / rows) * 0.35;
        ctx.strokeStyle =
          r % 4 === 0
            ? `rgba(53, 92, 255, ${alpha + 0.3})`
            : `rgba(234, 230, 220, ${alpha})`;
        ctx.lineWidth = r % 4 === 0 ? 1.5 : 0.8;
        ctx.stroke();
      }

      // Draw vertical lines
      for (let c = 0; c < cols; c += 2) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const pt = points[r][c];
          if (r === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = `rgba(234, 230, 220, 0.14)`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // Draw glowing active edge nodes
      for (let r = 4; r < rows - 4; r += 5) {
        for (let c = 4; c < cols - 4; c += 6) {
          const pt = points[r][c];
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#355CFF";
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onPointerMove);
    };
  }, [activeChannel]);

  return (
    <section
      id="project-02"
      ref={containerRef}
      className="relative w-full min-h-[140vh] py-24 px-6 sm:px-12 md:px-16 flex flex-col justify-between bg-[#111111] text-[#EAE6DC] border-t border-white/10 transition-colors duration-500"
    >
      {/* Top Header */}
      <div className="section-header-row flex flex-col sm:flex-row items-start sm:items-baseline justify-between border-b border-white/10 pb-3 sm:pb-4 mb-8 sm:mb-12 gap-3 sm:gap-0">
        <div className="flex items-baseline gap-2 sm:gap-4">
          <span className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none">
            02
          </span>
          <div className="flex flex-col">
            <span className="font-mono-tech text-[9px] sm:text-[10px] md:text-xs text-[#355CFF] tracking-widest uppercase font-bold">
              {project2Data.category}
            </span>
            <span className="font-display text-lg sm:text-xl md:text-3xl font-bold tracking-tight text-white uppercase">
              {project2Data.title}
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4 sm:gap-6 font-mono-tech text-xs text-white/50 tracking-widest uppercase">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            STATUS: HACKATHON WINNER
          </span>
          <span className="text-white/20">|</span>
          <span>LATENCY: &lt;45MS LOCAL</span>
          <span className="text-[#355CFF]">ENGINE: ON-DEVICE LLM + CV</span>
        </div>
      </div>

      {/* Hero Interactive Sensory Canvas */}
      <div
        onClick={() => {
          audioEngine.playClick(900);
          onOpenModal(project2Data);
        }}
        onMouseEnter={() => setCursorMode("drag", "WARP")}
        onMouseLeave={() => setCursorMode("default")}
        className="relative w-full h-[65vh] sm:h-[75vh] max-h-[820px] bg-[#161616] border border-white/10 overflow-hidden cursor-pointer shadow-2xl group"
      >
        {/* Corner Brackets */}
        <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-white z-20 pointer-events-none"></div>
        <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-white z-20 pointer-events-none"></div>

        {/* Dynamic Canvas */}
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Technical Callouts */}
        <div className="absolute top-6 left-6 font-mono-tech text-[10px] sm:text-xs text-white/60 uppercase tracking-wider space-y-1 pointer-events-none">
          <div className="flex items-center gap-2 text-white font-bold">
            <Cpu className="w-3.5 h-3.5 text-[#355CFF]" />
            <span>MULTIMODAL SENSORY MATRIX // EDGE CONTROLLER</span>
          </div>
          <div>MODALITY: DUAL-STREAM [VOICE + VISION INFERENCE]</div>
          <div className="text-[#355CFF]">
            INTERACTION: MOVE CURSOR TO SIMULATE SENSOR FEED
          </div>
        </div>

        {/* Sensory Channel Controls */}
        <div className="absolute top-6 right-6 font-mono-tech text-[10px] sm:text-xs flex items-center gap-2">
          {(["VOICE", "VISION", "EDGE"] as const).map((channel) => (
            <button
              key={channel}
              onClick={(e) => {
                e.stopPropagation();
                setActiveChannel(channel);
                audioEngine.playChime(
                  channel === "VOICE" ? 520 : channel === "VISION" ? 780 : 960,
                  0.2,
                );
              }}
              onMouseEnter={() => setCursorMode("view", channel)}
              onMouseLeave={() => setCursorMode("drag", "WARP")}
              className={`px-3 py-1 border transition-colors ${
                activeChannel === channel
                  ? "bg-[#355CFF] text-white border-[#355CFF]"
                  : "bg-black/60 text-white/70 border-white/20 hover:border-white"
              }`}
            >
              {channel} CHANNEL
            </button>
          ))}
        </div>

        {/* Bottom Annotations Bar */}
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between font-mono-tech text-[10px] text-white/50 pointer-events-none border-t border-white/10 pt-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-white font-bold">
              <Eye className="w-3.5 h-3.5 text-[#355CFF]" />
              VOICE INPUT · VISION · LOCAL MODEL · DEVICE CONTROL · EDGE AI
            </span>
          </div>
          <div className="text-white font-semibold bg-white/10 px-3 py-1 border border-white/20">
            VIEW DOSSIER ↗
          </div>
        </div>
      </div>

      {/* Metadata Strip & VIEW PROJECT Trigger */}
      <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
        <div className="meta-grid grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 font-mono-tech text-[11px] sm:text-xs">
          <div>
            <span className="text-white/40 block text-[9px] sm:text-[10px] uppercase mb-0.5">
              ROLE
            </span>
            <span className="font-bold text-white">{project2Data.role}</span>
          </div>
          <div>
            <span className="text-white/40 block text-[9px] sm:text-[10px] uppercase mb-0.5">
              STATUS
            </span>
            <span className="font-bold text-emerald-400">HACKATHON WINNER</span>
          </div>
          <div>
            <span className="text-white/40 block text-[9px] sm:text-[10px] uppercase mb-0.5">
              STACK
            </span>
            <span className="font-bold text-[#355CFF]">
              {project2Data.stack.join(" · ")}
            </span>
          </div>
          <div>
            <span className="text-white/40 block text-[9px] sm:text-[10px] uppercase mb-0.5">
              INFERENCE ARCH
            </span>
            <span className="font-bold text-white">100% PRIVATE EDGE EXEC</span>
          </div>
        </div>

        <button
          id="p2-view-btn"
          onClick={() => {
            audioEngine.playClick(1000);
            onOpenModal(project2Data);
          }}
          onMouseEnter={() => setCursorMode("open", "DOSSIER")}
          onMouseLeave={() => setCursorMode("default")}
          className="group self-stretch sm:self-start lg:self-auto flex items-center justify-center sm:justify-start gap-3 sm:gap-4 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-[#111111] font-display text-sm sm:text-base lg:text-lg font-bold tracking-tight uppercase hover:bg-[#355CFF] hover:text-white transition-all duration-300 w-full sm:w-auto"
        >
          <span>VIEW PROJECT SPECIFICATION</span>
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform flex-shrink-0" />
        </button>
      </div>

      {/* Smooth Return Transition indicator */}
      <div className="mt-10 sm:mt-16 pt-3 sm:pt-4 border-t border-dashed border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono-tech text-[9px] sm:text-[10px] text-white/50 uppercase">
        <span>RETURNING TO PAPER ENVIRONMENT // SCENE 03</span>
        <span className="text-[#355CFF]">
          ↓ SCROLL DOWN TO ENTER OBLIQ INTELLIGENCE CHAMBER
        </span>
      </div>
    </section>
  );
};

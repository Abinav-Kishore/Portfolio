import React, { useRef, useState, useEffect } from "react";
import {
  FlaskConical,
  Play,
  Pause,
  RefreshCw,
  Sliders,
  Clock,
  HardHat,
  Rss,
  Activity,
  Bot,
  LayoutDashboard,
} from "lucide-react";
import { audioEngine } from "./AudioEngine";
import { PORTFOLIO_DATA } from "../data";

interface ExperimentsProps {
  setCursorMode: (mode: string, text?: string) => void;
}

// UNIFEED — source feed streamed through the noise filter
const UNIFEED_SOURCES = [
  { src: "Hacker News RSS", title: "Clean distillation of tech headlines", noise: 0.04 },
  { src: "arXiv cs.AI", title: "Recent foundational papers", noise: 0.01 },
  { src: "Campus Notice Board", title: "Exam schedule + circulars", noise: 0.09 },
  { src: "SEO Listicle Roundup", title: "Content-farm trending digest", noise: 0.71 },
  { src: "Clickbait Trending", title: "You won't believe #7", noise: 0.94 },
];

// VANTIQ — specialist agents from the multi-agent stock intelligence platform
const VANTIQ_AGENTS = [
  { name: "TECH-SPIDER", role: "TECHNICAL / MOMENTUM" },
  { name: "FUND-SPIDER", role: "FUNDAMENTAL // RAG EVIDENCE" },
  { name: "SENTI-SPIDER", role: "NEWS SENTIMENT" },
];

const VANTIQ_SIGNALS: Record<string, { signal: string; stance: string }> = {
  AAPL: { signal: "ACCUMULATE", stance: "TECH + FUND ALIGN" },
  TSLA: { signal: "NEUTRAL", stance: "AGENTS DIVERGE" },
  NVDA: { signal: "BULLISH", stance: "HIGH-CONFIDENCE CONVERGENCE" },
};

// PLEXUS — RBAC portal rows (student / admin)
const PLEXUS_STUDENT_ROWS = [
  { title: "DSA-2 internal marks published", tag: "ACADEMICS" },
  { title: "Club Asymmetric — sprint this Saturday", tag: "CLUBS" },
  { title: "LeetCode weekly contest reminder", tag: "CP" },
  { title: "GENCUE internship drive — shortlist", tag: "PLACEMENTS" },
];

const PLEXUS_ADMIN_ROWS = [
  { title: "RBAC matrix synced — 38 active users", tag: "ACCESS" },
  { title: "Announcement broadcast delivered", tag: "OPS" },
  { title: "Permission audit: clean", tag: "SECURITY" },
  { title: "Attendance export queued", tag: "REPORTS" },
];

// Email Reply Drafter — tone-selectable drafts (mirrors the CLI --tone flag)
const EMAIL_DRAFTS: Record<"FRIENDLY" | "FORMAL", string> = {
  FRIENDLY:
    "Hi! Thanks for reaching out about VIORA — happy to walk you through how the OCR heuristics and the Android accessibility service flag suspicious QR codes and links in real time. When works for a quick call?",
  FORMAL:
    "Thank you for your interest in VIORA. I would be glad to provide further detail on the OCR heuristics and the Android accessibility service that flags suspicious QR codes and links in real time. Please let me know a convenient time.",
};

export const Experiments: React.FC<ExperimentsProps> = ({ setCursorMode }) => {
  const experimentsList = PORTFOLIO_DATA.experiments;
  const [activeExp, setActiveExp] = useState(0);
  const activeId = experimentsList[activeExp].id;

  // Shared canvas rig state (DeepTrace FFT · Surveillance flow · LeetCode traversal)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fftThreshold, setFftThreshold] = useState(72);
  const [traversalMode, setTraversalMode] = useState<"BFS" | "DFS">("BFS");

  // Chronos
  const [timerSeconds, setTimerSeconds] = useState(145);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Vantiq multi-agent run state
  const [vantiqTicker, setVantiqTicker] = useState<"AAPL" | "TSLA" | "NVDA">("NVDA");
  const [vantiqStep, setVantiqStep] = useState(0); // 0 idle · 1-3 agents · 4+ nexus
  const [riskProfile, setRiskProfile] = useState<"CONSERVATIVE" | "AGGRESSIVE">(
    "CONSERVATIVE",
  );
  const [vantiqLatencies, setVantiqLatencies] = useState([812, 1043, 690]);

  // Re-run the agent pipeline whenever a ticker is selected
  useEffect(() => {
    setVantiqStep(0);
    setVantiqLatencies([
      Math.round(600 + Math.random() * 600),
      Math.round(700 + Math.random() * 700),
      Math.round(400 + Math.random() * 500),
    ]);
    const iv = window.setInterval(() => {
      setVantiqStep((s) => (s >= 5 ? s : s + 1));
    }, 850);
    return () => window.clearInterval(iv);
  }, [vantiqTicker]);

  const vantiqConfidence = Math.min(
    96,
    Math.max(
      55,
      Math.round(62 + (vantiqLatencies[0] % 25)) +
        (riskProfile === "AGGRESSIVE" ? 9 : -5),
    ),
  );

  // Email drafter — staged pipeline then typewriter draft
  const [tone, setTone] = useState<"FRIENDLY" | "FORMAL">("FRIENDLY");
  const [agentStep, setAgentStep] = useState(0); // 0-4 pipeline stages
  const [typeStep, setTypeStep] = useState(0);
  const emailDraft = EMAIL_DRAFTS[tone];

  useEffect(() => {
    setAgentStep(0);
    setTypeStep(0);
    const timers: number[] = [];
    for (let i = 1; i <= 4; i++) {
      timers.push(window.setTimeout(() => setAgentStep(i), i * 620));
    }
    timers.push(
      window.setTimeout(() => {
        const iv = window.setInterval(() => {
          setTypeStep((s) => {
            if (s >= emailDraft.length) {
              window.clearInterval(iv);
              return s;
            }
            return s + 3;
          });
        }, 24);
        timers.push(iv);
      }, 4 * 620 + 150),
    );
    return () => {
      timers.forEach((t) => {
        window.clearTimeout(t);
        window.clearInterval(t);
      });
    };
  }, [tone, emailDraft]);

  // Smart PPE — statuses occasionally flip to a violation and self-resolve
  const [ppeAlerts, setPpeAlerts] = useState([
    "HELMET: OK",
    "VEST: OK",
    "HARNESS: VERIFIED",
  ]);

  useEffect(() => {
    const iv = window.setInterval(() => {
      setPpeAlerts((prev) =>
        prev.map((alert, i) => {
          if (i !== Math.floor(Math.random() * prev.length)) return alert;
          if (alert.includes("MISSING")) {
            // resolve the violation back to a compliant state
            if (alert.startsWith("HELMET")) return "HELMET: OK";
            if (alert.startsWith("VEST")) return "VEST: OK";
            return "HARNESS: VERIFIED";
          }
          return Math.random() < 0.45 ? `${alert.split(":")[0]}: MISSING` : alert;
        }),
      );
    }, 2000);
    return () => window.clearInterval(iv);
  }, []);

  const ppeCompliance = Math.round(
    (ppeAlerts.filter((a) => !a.includes("MISSING")).length / ppeAlerts.length) *
      100,
  );

  // Unifeed — items stream through the noise filter
  const [feedCursor, setFeedCursor] = useState(0);

  useEffect(() => {
    const iv = window.setInterval(() => {
      setFeedCursor((c) => (c + 1) % UNIFEED_SOURCES.length);
    }, 2400);
    return () => window.clearInterval(iv);
  }, []);

  // Plexus — animated attendance counter
  const [plexusRole, setPlexusRole] = useState<"STUDENT" | "ADMIN">("STUDENT");
  const [attendance, setAttendance] = useState(0);

  useEffect(() => {
    let v = 0;
    const iv = window.setInterval(() => {
      v += 4;
      setAttendance(Math.min(92, v));
      if (v >= 92) window.clearInterval(iv);
    }, 45);
    return () => window.clearInterval(iv);
  }, []);

  // Chronos timer loop
  useEffect(() => {
    let interval = 0;
    if (isTimerRunning) {
      interval = window.setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => window.clearInterval(interval);
  }, [isTimerRunning]);

  // Main canvas loop — only mounted for canvas-based experiments
  useEffect(() => {
    if (
      activeId !== "deepfake-detection" &&
      activeId !== "surveillance-integrity-ai" &&
      activeId !== "leetcode-engine"
    ) {
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let time = 0;
    let mouse = { x: 200, y: 160 };

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 500;
      canvas.height = 340;
    };
    resize();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", onMove);

    // Binary-tree layout for the LeetCode traversal visualizer
    const treeNodes: { x: number; y: number }[] = [];
    const treeEdges: [number, number][] = [];
    const buildTree = (x: number, y: number, spread: number, parent: number) => {
      const idx = treeNodes.length;
      treeNodes.push({ x, y });
      if (parent >= 0) treeEdges.push([parent, idx]);
      if (y + 60 > canvas.height - 30 || spread < 9) return;
      buildTree(x - spread, y + 60, spread / 2, idx);
      buildTree(x + spread, y + 60, spread / 2, idx);
    };
    buildTree(canvas.width / 2, 46, canvas.width * 0.24, -1);

    // BFS = level order (sort by depth then x) · DFS = pre-order build sequence
    const bfsOrder = treeNodes
      .map((_, i) => i)
      .sort((a, b) => treeNodes[a].y - treeNodes[b].y || treeNodes[a].x - treeNodes[b].x);
    const dfsOrder = treeNodes.map((_, i) => i);

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (activeId === "deepfake-detection") {
        // DeepTrace — DFDC frame FFT artifact spectrogram
        ctx.fillStyle = "#111111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const bands = 40;
        const bandW = canvas.width / bands;
        for (let i = 0; i < bands; i++) {
          const freq =
            Math.sin(i * 0.3 + time * 1.5) * 60 +
            Math.cos(i * 0.8 - time) * 40 +
            100;
          const isAnomaly = freq > (100 - fftThreshold) * 2.2;

          ctx.fillStyle = isAnomaly ? "#355CFF" : "rgba(234, 230, 220, 0.25)";
          ctx.fillRect(
            i * bandW + 2,
            canvas.height - freq - 40,
            bandW - 4,
            freq,
          );

          if (isAnomaly && i % 3 === 0) {
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "8px monospace";
            ctx.fillText(
              "FFT_ARTIFACT",
              i * bandW - 10,
              canvas.height - freq - 48,
            );
          }
        }

        const threshY = canvas.height - (100 - fftThreshold) * 2.2 - 40;
        ctx.strokeStyle = "#355CFF";
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(0, threshY);
        ctx.lineTo(canvas.width, threshY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = "#355CFF";
        ctx.font = "9px monospace";
        ctx.fillText("DEEPTRACE // DFDC_FRAME_BATCH", 20, 26);
        ctx.fillText("PYTORCH_CNN: SPATIAL + FREQ", 20, 40);
      } else if (activeId === "surveillance-integrity-ai") {
        // Surveillance integrity — optical-flow grid with anomaly probe
        ctx.fillStyle = "#111111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "rgba(234, 230, 220, 0.15)";
        ctx.lineWidth = 1;
        const gridX = 4;
        const gridY = 3;
        for (let x = 0; x <= gridX; x++) {
          ctx.beginPath();
          ctx.moveTo((x / gridX) * canvas.width, 0);
          ctx.lineTo((x / gridX) * canvas.width, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y <= gridY; y++) {
          ctx.beginPath();
          ctx.moveTo(0, (y / gridY) * canvas.height);
          ctx.lineTo(canvas.width, (y / gridY) * canvas.height);
          ctx.stroke();
        }

        ctx.strokeStyle = "#355CFF";
        ctx.lineWidth = 2;
        ctx.strokeRect(mouse.x - 45, mouse.y - 45, 90, 90);
        ctx.fillStyle = "#355CFF";
        ctx.font = "9px monospace";
        ctx.fillText("FRAME_TAMPER_DELTA: 0.042", mouse.x - 45, mouse.y - 52);
        ctx.fillText("TEMPORAL_CONSISTENCY: 99.8%", 20, 30);
        ctx.fillText("STREAM: PUBLIC_CCTV_FEED_04", canvas.width - 220, 30);
      } else {
        // Algorithmic engine — animated tree traversal (BFS / DFS)
        ctx.fillStyle = "#111111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "rgba(234, 230, 220, 0.2)";
        ctx.lineWidth = 1;
        for (const [p, c] of treeEdges) {
          ctx.beginPath();
          ctx.moveTo(treeNodes[p].x, treeNodes[p].y);
          ctx.lineTo(treeNodes[c].x, treeNodes[c].y);
          ctx.stroke();
        }

        const order = traversalMode === "BFS" ? bfsOrder : dfsOrder;
        const visited = Math.floor(time * 5) % (order.length + 8);

        for (let i = 0; i < treeNodes.length; i++) {
          const n = treeNodes[i];
          const oi = order.indexOf(i);
          const isVisited = oi < visited;
          const isFrontier = oi >= visited && oi < visited + 3;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = isVisited
            ? "#355CFF"
            : isFrontier
              ? "#EAE6DC"
              : "rgba(234, 230, 220, 0.3)";
          ctx.fill();
        }

        ctx.fillStyle = "#355CFF";
        ctx.font = "9px monospace";
        ctx.fillText(`TRAVERSAL: ${traversalMode}`, 20, 26);
        ctx.fillText("CONTEST_RATING: 2000+", 20, 40);
        ctx.fillText("PROBLEMS_SOLVED: 650+", 20, 54);

        const frontier = order
          .slice(visited, visited + 3)
          .map((i) => `N${i}`)
          .join(" → ");
        ctx.fillStyle = "rgba(234, 230, 220, 0.7)";
        ctx.fillText(
          `QUEUE: ${frontier || "—"}`,
          canvas.width - 190,
          canvas.height - 16,
        );
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, [activeExp, fftThreshold, traversalMode, activeId]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  };

  return (
    <section
      id="experiments"
      className="relative w-full min-h-screen py-32 px-6 sm:px-12 md:px-16 border-t border-[#C8C4B9] bg-transparent text-[#111111]"
    >
      {/* Header */}
      <div className="section-header-row flex flex-col sm:flex-row items-start sm:items-baseline justify-between border-b border-[#C8C4B9] pb-3 sm:pb-4 mb-10 sm:mb-16 gap-2 sm:gap-0">
        <div className="flex flex-wrap items-baseline gap-2 sm:gap-4">
          <span className="font-mono-tech text-sm text-[#355CFF] font-bold">
            SEC [03]
          </span>
          <span className="font-mono-tech text-[10px] sm:text-xs uppercase tracking-widest text-[#66645F] flex items-center gap-1.5 sm:gap-2">
            <FlaskConical className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#355CFF]" />
            LABORATORY NOTEBOOK & CODE EXPERIMENTS
          </span>
        </div>
        <div className="hidden sm:block font-mono-tech text-xs text-[#66645F] tracking-widest uppercase">
          INDEX: {experimentsList.length.toString().padStart(2, "0")} ACTIVE
          RESEARCH EXPERIMENTS
        </div>
      </div>

      {/* Main Title */}
      <div className="mb-10 sm:mb-14">
        <h2 className="sub-headline font-display uppercase font-black tracking-tight">
          EXPERIMENTS
        </h2>
        <p className="font-mono-tech text-[10px] sm:text-xs text-[#66645F] tracking-widest uppercase mt-1.5 sm:mt-2">
          EXPLORATIONS IN AI · VISION · NETWORKS · SYSTEMS · UX
        </p>
      </div>

      {/* Laboratory Notebook Interface: Tabs & Active Specimen Rig */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Experiments Index List */}
        <div className="lg:col-span-5 divide-y divide-[#C8C4B9] border-y border-[#C8C4B9]">
          {experimentsList.map((exp, idx) => (
            <div
              key={exp.id}
              onClick={() => {
                audioEngine.playClick(900 + idx * 100);
                setActiveExp(idx);
              }}
              onMouseEnter={() => setCursorMode("view", `RUN ${exp.number}`)}
              onMouseLeave={() => setCursorMode("default")}
              className={`py-4 px-4 cursor-pointer transition-all ${
                activeExp === idx
                  ? "bg-[#111111] text-[#EAE6DC]"
                  : "hover:bg-[#E3DFD5] text-[#111111]"
              }`}
            >
              <div className="flex items-center justify-between font-mono-tech text-[10px] mb-1">
                <span
                  className={
                    activeExp === idx ? "text-[#355CFF]" : "text-[#66645F]"
                  }
                >
                  EXPERIMENT // {exp.number}
                </span>
                <span
                  className={
                    activeExp === idx ? "text-white/60" : "text-[#66645F]"
                  }
                >
                  {exp.tags[0]}
                </span>
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold tracking-tight uppercase mb-1">
                {exp.title}
              </h3>
              <p
                className={`font-editorial text-xs leading-relaxed mb-2 ${
                  activeExp === idx ? "text-white/80" : "text-[#66645F]"
                }`}
              >
                {exp.description}
              </p>
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 font-mono-tech text-[9px]">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-1.5 py-0.5 border ${
                      activeExp === idx
                        ? "border-white/20 text-white/70"
                        : "border-[#111111]/20 text-[#66645F]"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Active Live Interactive Workbench */}
        <div className="lg:col-span-7 bg-[#EAE6DC] border border-[#111111] p-6 shadow-sm relative">
          {/* Corner brackets */}
          <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#111111]"></div>
          <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#111111]"></div>

          {/* Workbench Top HUD */}
          <div className="flex items-center justify-between border-b border-[#C8C4B9] pb-3 mb-6 font-mono-tech text-[10px] text-[#66645F] uppercase gap-3">
            <span className="flex items-center gap-2 text-[#111111] font-bold min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <span className="truncate">
                LIVE TEST BENCH // {experimentsList[activeExp].number}{" "}
                {experimentsList[activeExp].title}
              </span>
            </span>
            <span className="hidden md:inline flex-shrink-0">
              TAGS: {experimentsList[activeExp].tags.slice(0, 3).join(" · ")}
            </span>
          </div>

          {/* Workbench Dynamic Content Container */}
          <div className="w-full min-h-[380px] flex items-stretch relative overflow-hidden bg-[#E3DFD5] border border-[#C8C4B9]">
            {/* Canvas rig: DeepTrace FFT · Surveillance flow · LeetCode traversal */}
            {(activeId === "deepfake-detection" ||
              activeId === "surveillance-integrity-ai" ||
              activeId === "leetcode-engine") && (
              <div className="w-full flex flex-col justify-between p-2">
                <canvas
                  ref={canvasRef}
                  className="w-full h-[320px] block cursor-crosshair"
                />
                <div className="text-[9px] font-mono-tech text-[#66645F] bg-[#EAE6DC] px-3 py-1.5 flex items-center justify-between gap-3 border-t border-[#C8C4B9]">
                  <span>
                    {activeId === "deepfake-detection" &&
                      "DEEPTRACE // DFDC FRAMES — SWEEP CURSOR OR SLIDE THE THRESHOLD TO TUNE FFT ARTIFACT DETECTION"}
                    {activeId === "surveillance-integrity-ai" &&
                      "MOVE CURSOR TO PROBE THE OPTICAL-FLOW GRID // TAMPER DELTA UPDATES LIVE"}
                    {activeId === "leetcode-engine" &&
                      "WATCH THE TRAVERSAL WALK THE TREE — TOGGLE BFS / DFS TO CHANGE STRATEGY"}
                  </span>
                  {activeId === "deepfake-detection" && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Sliders className="w-3 h-3 text-[#355CFF]" />
                      <input
                        type="range"
                        min="20"
                        max="95"
                        value={fftThreshold}
                        onChange={(e) => setFftThreshold(Number(e.target.value))}
                        className="w-24 accent-[#355CFF]"
                      />
                      <span className="font-bold text-[#111111]">
                        {fftThreshold}%
                      </span>
                    </div>
                  )}
                  {activeId === "leetcode-engine" && (
                    <button
                      onClick={() => {
                        audioEngine.playClick(1000);
                        setTraversalMode((m) => (m === "BFS" ? "DFS" : "BFS"));
                      }}
                      onMouseEnter={() => setCursorMode("view", "SWITCH")}
                      onMouseLeave={() => setCursorMode("default")}
                      className="px-2.5 py-1 bg-[#111111] text-[#EAE6DC] text-[9px] font-bold uppercase hover:bg-[#355CFF] transition-colors flex-shrink-0"
                    >
                      STRATEGY: {traversalMode}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Chronos — minimal time-tracker UX */}
            {activeId === "chronos" && (
              <div className="w-full p-8 flex flex-col items-center justify-center text-center">
                <div className="w-48 h-48 rounded-full border-2 border-dashed border-[#111111] flex flex-col items-center justify-center p-4 bg-[#EAE6DC] shadow-inner mb-6 relative border-spacing-2">
                  <Clock className="w-5 h-5 text-[#355CFF] mb-2" />
                  <span className="font-display text-4xl font-extrabold tracking-tight text-[#111111]">
                    {formatTime(timerSeconds)}
                  </span>
                  <span className="font-mono-tech text-[9px] text-[#66645F] uppercase mt-1">
                    DEEP FOCUS INTERVAL
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      audioEngine.playClick(isTimerRunning ? 600 : 1200);
                      setIsTimerRunning(!isTimerRunning);
                    }}
                    onMouseEnter={() =>
                      setCursorMode("enter", isTimerRunning ? "PAUSE" : "START")
                    }
                    onMouseLeave={() => setCursorMode("default")}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#111111] text-[#EAE6DC] font-mono-tech text-xs uppercase font-bold hover:bg-[#355CFF] transition-colors"
                  >
                    {isTimerRunning ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {isTimerRunning ? "PAUSE LOG" : "START SESSION"}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      audioEngine.playClick(800);
                      setTimerSeconds(0);
                      setIsTimerRunning(false);
                    }}
                    className="p-2.5 border border-[#111111] hover:bg-[#C8C4B9] transition-colors"
                    title="Reset timer"
                  >
                    <RefreshCw className="w-4 h-4 text-[#111111]" />
                  </button>
                </div>
              </div>
            )}

            {/* Vantiq — explainable multi-agent stock intelligence pipeline */}
            {activeId === "value" && (
              <div className="w-full p-4 sm:p-6 flex flex-col bg-[#0D0D0C] text-[#EAE6DC]">
                <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4 font-mono-tech text-[10px] text-white/50">
                  <span className="flex items-center gap-2 font-bold text-[#355CFF]">
                    <Activity className="w-4 h-4" />
                    VANTIQ // MULTI-AGENT INTELLIGENCE PIPELINE
                  </span>
                  <span className="hidden sm:inline">
                    SPIDER-SENSE TRACE: EXPOSED
                  </span>
                </div>

                {/* Ticker selection */}
                <div className="flex items-center gap-2 mb-4">
                  {(["AAPL", "TSLA", "NVDA"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        audioEngine.playClick(900);
                        setVantiqTicker(t);
                      }}
                      onMouseEnter={() => setCursorMode("view", "ANALYZE")}
                      onMouseLeave={() => setCursorMode("default")}
                      className={`px-3 py-1.5 font-mono-tech text-xs font-bold border transition-colors ${
                        vantiqTicker === t
                          ? "bg-[#355CFF] text-white border-[#355CFF]"
                          : "bg-white/5 text-white/70 border-white/20 hover:border-white"
                      }`}
                    >
                      ${t}
                    </button>
                  ))}
                  <div className="ml-auto font-mono-tech text-[9px] text-white/40 hidden sm:block">
                    SOURCE: YAHOO FINANCE // FINNHUB NEWS
                  </div>
                </div>

                {/* Three specialist agents running in parallel */}
                <div className="space-y-2 mb-4">
                  {VANTIQ_AGENTS.map((agent, i) => {
                    const status =
                      vantiqStep >= i + 2
                        ? "DONE"
                        : vantiqStep === i + 1
                          ? "RUNNING"
                          : "QUEUED";
                    return (
                      <div
                        key={agent.name}
                        className="p-3 border border-white/10 bg-white/5 flex items-center justify-between font-mono-tech text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              status === "RUNNING"
                                ? "bg-[#355CFF] animate-pulse"
                                : status === "DONE"
                                  ? "bg-emerald-400"
                                  : "bg-white/20"
                            }`}
                          />
                          <div>
                            <div className="font-bold text-white">
                              {agent.name}
                            </div>
                            <div className="text-[9px] text-white/40">
                              {agent.role}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-[10px] font-bold ${
                              status === "DONE"
                                ? "text-emerald-400"
                                : status === "RUNNING"
                                  ? "text-[#355CFF]"
                                  : "text-white/30"
                            }`}
                          >
                            {status}
                          </div>
                          {status === "DONE" && (
                            <div className="text-[9px] text-white/40">
                              {vantiqLatencies[i]}MS
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* NEXUS synthesis layer */}
                <div className="p-3 border border-[#355CFF]/40 bg-[#355CFF]/10 flex-1 flex flex-col justify-between font-mono-tech text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#355CFF]">
                      NEXUS // SYNTHESIS LAYER
                    </span>
                    <span
                      className={
                        vantiqStep >= 4
                          ? "text-emerald-400 font-bold"
                          : "text-white/40 animate-pulse"
                      }
                    >
                      {vantiqStep >= 4 ? "COMPLETE" : "CONVERGING…"}
                    </span>
                  </div>
                  {vantiqStep >= 4 ? (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-2xl font-extrabold text-white">
                          {VANTIQ_SIGNALS[vantiqTicker].signal}
                        </span>
                        <span className="text-[10px] text-white/60 text-right">
                          {VANTIQ_SIGNALS[vantiqTicker].stance}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10">
                        <div
                          className="h-full bg-[#355CFF] transition-all duration-700"
                          style={{ width: `${vantiqConfidence}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[9px] text-white/40">
                        <span>
                          CONFIDENCE: {vantiqConfidence}% // PROFILE:{" "}
                          {riskProfile}
                        </span>
                        <span className="hidden sm:inline">
                          PERSONALIZED VIA RISK PROFILE
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 text-[10px] text-white/40 animate-pulse">
                      WEIGHTING AGENT AGREEMENT / DISAGREEMENT…
                    </div>
                  )}
                </div>

                {/* Risk profile personalization */}
                <div className="flex items-center justify-between mt-4 font-mono-tech text-[9px] text-white/40 gap-3">
                  <div className="flex items-center gap-2">
                    <span>PROFILE:</span>
                    {(["CONSERVATIVE", "AGGRESSIVE"] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          audioEngine.playClick(700);
                          setRiskProfile(r);
                        }}
                        onMouseEnter={() => setCursorMode("view", "ADAPT")}
                        onMouseLeave={() => setCursorMode("default")}
                        className={`px-2 py-1 border transition-colors ${
                          riskProfile === r
                            ? "bg-white text-[#111111] border-white font-bold"
                            : "border-white/20 hover:border-white"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                  <span className="hidden md:inline">
                    TRACE: MARKET_DATA → 3 AGENTS → NEXUS → PROFILE
                  </span>
                </div>
              </div>
            )}

            {/* Email Reply Drafter — staged agent run with typewriter draft */}
            {activeId === "ai-email-response-agent" && (
              <div className="w-full p-4 sm:p-6 flex flex-col bg-[#111111] text-[#EAE6DC]">
                <div className="flex items-center justify-between border-b border-white/20 pb-3 font-mono-tech text-xs gap-3">
                  <span className="flex items-center gap-2 font-bold text-[#355CFF]">
                    <Bot className="w-4 h-4" />
                    GMAIL_WORKER // HF_ROUTER
                  </span>
                  <span className="text-emerald-400 font-bold flex-shrink-0">
                    {agentStep >= 4
                      ? typeStep >= emailDraft.length
                        ? "[DRAFT_CREATED]"
                        : "[STREAMING]"
                      : "[WORKING]"}
                  </span>
                </div>

                <div className="my-auto space-y-2 font-mono-tech text-[10px] sm:text-xs py-4">
                  <div
                    className={
                      agentStep >= 1 ? "text-emerald-400" : "text-white/30"
                    }
                  >
                    &gt; FETCH_UNREAD: 3 THREADS [OAUTH2 OK]
                  </div>
                  <div
                    className={
                      agentStep >= 2 ? "text-emerald-400" : "text-white/30"
                    }
                  >
                    &gt; PARSE_HEADERS: FROM // SUBJECT // THREAD_ID
                  </div>
                  <div
                    className={
                      agentStep >= 3 ? "text-emerald-400" : "text-white/30"
                    }
                  >
                    &gt; BUILD_PROMPT [TONE: {tone}] → HF_ROUTER
                  </div>
                  <div
                    className={
                      agentStep >= 4 ? "text-[#355CFF]" : "text-white/30"
                    }
                  >
                    &gt; MODEL: LLAMA-3.3-8B-INSTRUCT{" "}
                    {agentStep >= 4 ? "[STREAMING]" : "[QUEUED]"}
                  </div>
                  {agentStep >= 4 && (
                    <div className="mt-2 p-3 border border-[#355CFF]/40 bg-[#355CFF]/10 text-white/90 leading-relaxed">
                      {emailDraft.slice(0, typeStep)}
                      {typeStep < emailDraft.length && (
                        <span className="text-[#355CFF] animate-pulse">▌</span>
                      )}
                    </div>
                  )}
                  {typeStep >= emailDraft.length && (
                    <div className="text-emerald-400">
                      &gt; DRAFT CREATED IN GMAIL // AUTO_SEND: FALSE
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono-tech text-[9px] text-white/40 gap-3">
                  <div className="flex items-center gap-2">
                    <span>TONE:</span>
                    {(["FRIENDLY", "FORMAL"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          audioEngine.playClick(900);
                          setTone(t);
                        }}
                        onMouseEnter={() => setCursorMode("enter", "REDRAFT")}
                        onMouseLeave={() => setCursorMode("default")}
                        className={`px-2 py-1 border transition-colors ${
                          tone === t
                            ? "bg-[#355CFF] text-white border-[#355CFF] font-bold"
                            : "border-white/20 hover:border-white"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <span className="hidden sm:inline">
                    TEMPERATURE: 0.2 // OPEN MODEL
                  </span>
                </div>
              </div>
            )}

            {/* Plexus — cross-platform student dashboard with RBAC portals */}
            {activeId === "plexus" && (
              <div className="w-full p-4 sm:p-6 flex flex-col bg-[#EAE6DC]">
                <div className="flex items-center justify-between border-b border-[#C8C4B9] pb-3 mb-4 font-mono-tech text-xs gap-3">
                  <span className="flex items-center gap-2 font-bold text-[#111111]">
                    <LayoutDashboard className="w-4 h-4 text-[#355CFF]" />
                    PLEXUS // STUDENT PLATFORM [EXPO]
                  </span>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {(["STUDENT", "ADMIN"] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          audioEngine.playClick(800);
                          setPlexusRole(r);
                        }}
                        onMouseEnter={() => setCursorMode("view", "SWITCH")}
                        onMouseLeave={() => setCursorMode("default")}
                        className={`px-2 py-1 border text-[9px] font-bold transition-colors ${
                          plexusRole === r
                            ? "bg-[#111111] text-[#EAE6DC] border-[#111111]"
                            : "border-[#111111]/20 text-[#66645F] hover:border-[#111111]"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Counters */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="p-3 border border-[#C8C4B9] bg-white/60">
                    <div className="font-display text-xl sm:text-2xl font-extrabold text-[#111111]">
                      {attendance}%
                    </div>
                    <div className="font-mono-tech text-[8px] sm:text-[9px] text-[#66645F] uppercase">
                      Attendance
                    </div>
                  </div>
                  <div className="p-3 border border-[#C8C4B9] bg-white/60">
                    <div className="font-display text-xl sm:text-2xl font-extrabold text-[#355CFF]">
                      12
                    </div>
                    <div className="font-mono-tech text-[8px] sm:text-[9px] text-[#66645F] uppercase">
                      Announcements
                    </div>
                  </div>
                  <div className="p-3 border border-[#C8C4B9] bg-white/60">
                    <div className="font-display text-xl sm:text-2xl font-extrabold text-[#111111]">
                      {plexusRole === "STUDENT" ? "4" : "38"}
                    </div>
                    <div className="font-mono-tech text-[8px] sm:text-[9px] text-[#66645F] uppercase">
                      {plexusRole === "STUDENT" ? "Pending Tasks" : "Users"}
                    </div>
                  </div>
                </div>

                {/* Role-scoped feed */}
                <div className="flex-1 space-y-2 overflow-hidden">
                  {(plexusRole === "STUDENT"
                    ? PLEXUS_STUDENT_ROWS
                    : PLEXUS_ADMIN_ROWS
                  ).map((row, i) => (
                    <div
                      key={`${plexusRole}-${row.title}`}
                      className="row-in p-2.5 border border-[#C8C4B9] bg-white/60 font-mono-tech text-[10px] sm:text-xs flex items-center justify-between gap-3"
                      style={{ animationDelay: `${i * 120}ms` }}
                    >
                      <span className="font-bold text-[#111111] truncate">
                        {row.title}
                      </span>
                      <span className="text-[#355CFF] font-bold flex-shrink-0">
                        {row.tag}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="font-mono-tech text-[9px] text-[#66645F] border-t border-[#C8C4B9] pt-2 mt-3">
                  RBAC PORTALS // REACT NATIVE (EXPO) // TYPESCRIPT
                </div>
              </div>
            )}

            {/* Smart PPE — live edge compliance scan */}
            {activeId === "smart-ppe-detection" && (
              <div className="w-full p-4 sm:p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-[#C8C4B9] pb-3 font-mono-tech text-xs gap-3">
                  <span className="flex items-center gap-2 font-bold text-[#111111]">
                    <HardHat className="w-4 h-4 text-[#355CFF]" />
                    EDGE COMPLIANCE RUNTIME // CAMERA_04
                  </span>
                  <span className="text-emerald-700 font-bold flex-shrink-0">
                    YOLO_V8 [ONLINE]
                  </span>
                </div>

                <div className="relative my-auto grid grid-cols-3 gap-3 py-4 overflow-hidden">
                  {/* scanning sweep */}
                  <div className="scanline absolute left-0 right-0 h-6 bg-gradient-to-b from-transparent via-[#355CFF]/15 to-transparent pointer-events-none" />
                  {ppeAlerts.map((alert, i) => {
                    const violated = alert.includes("MISSING");
                    return (
                      <div
                        key={i}
                        className={`p-3 sm:p-4 border flex flex-col items-center justify-center font-mono-tech text-xs text-center transition-colors duration-300 ${
                          violated
                            ? "border-red-400 bg-red-50"
                            : "border-[#111111] bg-white/70"
                        }`}
                      >
                        <span
                          className={`font-black text-sm mb-1 ${
                            violated ? "text-red-600" : "text-emerald-600"
                          }`}
                        >
                          {violated ? "✕" : "✓"}
                        </span>
                        <span className="font-bold text-[#111111]">{alert}</span>
                        <span className="text-[8px] text-[#66645F] mt-1">
                          INFERENCE 14MS @ EDGE
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="p-2 bg-[#111111] text-white font-mono-tech text-[9px] flex justify-between">
                  <span>COMPLIANCE_RATE: {ppeCompliance}%</span>
                  <span>SAFETY PROTOCOL: ENFORCED</span>
                </div>
              </div>
            )}

            {/* Unifeed — RSS noise filter streaming */}
            {activeId === "unifeed" && (
              <div className="w-full p-4 sm:p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-[#C8C4B9] pb-3 font-mono-tech text-xs gap-3">
                  <span className="flex items-center gap-2 font-bold text-[#111111]">
                    <Rss className="w-4 h-4 text-[#355CFF]" />
                    UNIFEED // ALGORITHMIC NOISE FILTER
                  </span>
                  <span className="text-[#355CFF] flex-shrink-0">
                    NLP FILTER: ACTIVE
                  </span>
                </div>

                <div className="space-y-2 my-auto py-3">
                  {[0, 1, 2, 3].map((offset) => {
                    const item =
                      UNIFEED_SOURCES[(feedCursor + offset) % UNIFEED_SOURCES.length];
                    const blocked = item.noise >= 0.5;
                    return (
                      <div
                        key={`${feedCursor}-${item.src}`}
                        className={`row-in p-2.5 border font-mono-tech text-[10px] sm:text-xs flex items-center justify-between gap-3 ${
                          blocked
                            ? "border-red-300 bg-red-50/60"
                            : "border-[#C8C4B9] bg-white/60"
                        }`}
                        style={{ animationDelay: `${offset * 90}ms` }}
                      >
                        <div className="min-w-0">
                          <div
                            className={`font-bold truncate ${
                              blocked
                                ? "text-[#66645F] line-through"
                                : "text-[#111111]"
                            }`}
                          >
                            {item.src}
                          </div>
                          <div className="text-[9px] text-[#66645F] truncate">
                            {item.title}
                          </div>
                        </div>
                        <span
                          className={`ml-3 flex-shrink-0 text-[9px] sm:text-[10px] font-bold ${
                            blocked ? "text-red-600" : "text-emerald-700"
                          }`}
                        >
                          {blocked ? "BLOCKED" : "PASS"} [{item.noise.toFixed(2)}]
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="text-[9px] font-mono-tech text-[#66645F] text-center border-t border-[#C8C4B9] pt-3">
                  FATIGUE MITIGATION: ZERO ENGAGEMENT-BASED RE-RANKING
                </div>
              </div>
            )}
          </div>

          {/* Workbench Footer Specifications */}
          <div className="mt-4 flex items-center justify-between font-mono-tech text-[9px] text-[#66645F] gap-3">
            <span className="truncate">
              SYSTEM: {experimentsList[activeExp].tags.join(" // ")}
            </span>
            <span className="text-[#355CFF] flex-shrink-0">
              ENGINEERING STUDY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

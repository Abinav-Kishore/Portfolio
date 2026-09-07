import React, { useRef, useState, useEffect } from 'react';
import { FlaskConical, Play, Pause, RefreshCw, Sliders, ShieldAlert, Cpu, Clock, Compass, Share2, HardHat, Rss } from 'lucide-react';
import { audioEngine } from './AudioEngine';
import { PORTFOLIO_DATA } from '../data';

interface ExperimentsProps {
  setCursorMode: (mode: string, text?: string) => void;
}

export const Experiments: React.FC<ExperimentsProps> = ({ setCursorMode }) => {
  const [activeExp, setActiveExp] = useState(0);

  // Canvas refs for visual simulations
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Experiment 1 (Deepfake FFT) state
  const [fftThreshold, setFftThreshold] = useState(72);

  // Experiment 3 (Chronos) state
  const [timerSeconds, setTimerSeconds] = useState(145);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Experiment 6 (PPE) simulated detections
  const [ppeAlerts, setPpeAlerts] = useState<string[]>(['HELMET: OK', 'VEST: OK', 'HARNESS: VERIFIED']);

  // Timer loop for Chronos
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Dynamic canvas simulation based on active experiment
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
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
    canvas.addEventListener('mousemove', onMove);

    // Nodes for Plexus / Network graph
    const nodeCount = 38;
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; label: string }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * 450 + 25,
        y: Math.random() * 280 + 30,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 3 + 2,
        label: `N_${i + 1}`,
      });
    }

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (activeExp === 0) {
        // 01 - Deepfake FFT Spectrogram Simulation
        ctx.fillStyle = '#111111';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const bands = 40;
        const bandW = canvas.width / bands;
        for (let i = 0; i < bands; i++) {
          const freq = Math.sin(i * 0.3 + time * 1.5) * 60 + Math.cos(i * 0.8 - time) * 40 + 100;
          const isAnomaly = freq > (100 - fftThreshold) * 2.2;

          ctx.fillStyle = isAnomaly ? '#355CFF' : 'rgba(234, 230, 220, 0.25)';
          ctx.fillRect(i * bandW + 2, canvas.height - freq - 40, bandW - 4, freq);

          // Anomaly tag marker
          if (isAnomaly && i % 3 === 0) {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '8px monospace';
            ctx.fillText('FFT_ARTIFACT', i * bandW - 10, canvas.height - freq - 48);
          }
        }

        // Threshold indicator line
        const threshY = canvas.height - (100 - fftThreshold) * 2.2 - 40;
        ctx.strokeStyle = '#355CFF';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(0, threshY);
        ctx.lineTo(canvas.width, threshY);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (activeExp === 1) {
        // 02 - Surveillance Integrity AI
        ctx.fillStyle = '#111111';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Security Camera Grid Frame
        ctx.strokeStyle = 'rgba(234, 230, 220, 0.15)';
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

        // Optical flow detection box tracking mouse
        ctx.strokeStyle = '#355CFF';
        ctx.lineWidth = 2;
        ctx.strokeRect(mouse.x - 45, mouse.y - 45, 90, 90);
        ctx.fillStyle = '#355CFF';
        ctx.font = '9px monospace';
        ctx.fillText('ANOMALY_DELTA: 0.042', mouse.x - 45, mouse.y - 52);
        ctx.fillText('STREAM_INTEGRITY: 99.8%', 20, 30);
      } else if (activeExp === 4) {
        // 05 - Plexus Interactive Node Graph
        ctx.fillStyle = '#EAE6DC';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 15 || n.x > canvas.width - 15) n.vx *= -1;
          if (n.y < 15 || n.y > canvas.height - 15) n.vy *= -1;

          // Mouse attraction
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            n.x += (dx / dist) * 0.6;
            n.y += (dy / dist) * 0.6;
          }

          // Draw node connections
          for (let j = i + 1; j < nodes.length; j++) {
            const m = nodes[j];
            const d = Math.hypot(n.x - m.x, n.y - m.y);
            if (d < 75) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(53, 92, 255, ${1 - d / 75})`;
              ctx.lineWidth = 0.8;
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(m.x, m.y);
              ctx.stroke();
            }
          }

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#111111';
          ctx.fill();
        }
      } else {
        // General schematic canvas for other experiments
        ctx.fillStyle = '#EAE6DC';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#111111';
        ctx.lineWidth = 1;
        ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

        // Crosshairs
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 40);
        ctx.lineTo(canvas.width / 2, canvas.height - 40);
        ctx.moveTo(40, canvas.height / 2);
        ctx.lineTo(canvas.width - 40, canvas.height / 2);
        ctx.strokeStyle = 'rgba(17, 17, 17, 0.15)';
        ctx.stroke();

        // Pulsing target circle at cursor
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 24 + Math.sin(time * 3) * 6, 0, Math.PI * 2);
        ctx.strokeStyle = '#355CFF';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', onMove);
    };
  }, [activeExp, fftThreshold]);

  const experimentsList = PORTFOLIO_DATA.experiments;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <section
      id="experiments"
      className="relative w-full min-h-screen py-32 px-6 sm:px-12 md:px-16 border-t border-[#C8C4B9] bg-transparent text-[#111111]"
    >
      {/* Header */}
      <div className="flex items-baseline justify-between border-b border-[#C8C4B9] pb-4 mb-16">
        <div className="flex items-baseline gap-4">
          <span className="font-mono-tech text-sm text-[#355CFF] font-bold">SEC [03]</span>
          <span className="font-mono-tech text-xs uppercase tracking-widest text-[#66645F] flex items-center gap-2">
            <FlaskConical className="w-3.5 h-3.5 text-[#355CFF]" />
            LABORATORY NOTEBOOK & CODE EXPERIMENTS
          </span>
        </div>
        <div className="hidden sm:block font-mono-tech text-xs text-[#66645F] tracking-widest uppercase">
          INDEX: {experimentsList.length.toString().padStart(2, '0')} ACTIVE RESEARCH EXPERIMENTS
        </div>
      </div>

      {/* Main Title */}
      <div className="mb-14">
        <h2 className="sub-headline font-display uppercase font-black tracking-tight">
          EXPERIMENTS
        </h2>
        <p className="font-mono-tech text-xs text-[#66645F] tracking-widest uppercase mt-2">
          EXPLORATIONS IN AI · VISION · NETWORKS · SYSTEMS · UX
        </p>
      </div>

      {/* Laboratory Notebook Interface: Tabs & Active Specimen Rig */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: 7 Experiments Index List */}
        <div className="lg:col-span-5 divide-y divide-[#C8C4B9] border-y border-[#C8C4B9]">
          {experimentsList.map((exp, idx) => (
            <div
              key={exp.id}
              onClick={() => {
                audioEngine.playClick(900 + idx * 100);
                setActiveExp(idx);
              }}
              onMouseEnter={() => setCursorMode('view', `RUN ${exp.number}`)}
              onMouseLeave={() => setCursorMode('default')}
              className={`py-4 px-4 cursor-pointer transition-all ${
                activeExp === idx
                  ? 'bg-[#111111] text-[#EAE6DC]'
                  : 'hover:bg-[#E3DFD5] text-[#111111]'
              }`}
            >
              <div className="flex items-center justify-between font-mono-tech text-[10px] mb-1">
                <span className={activeExp === idx ? 'text-[#355CFF]' : 'text-[#66645F]'}>
                  EXPERIMENT // {exp.number}
                </span>
                <span className={activeExp === idx ? 'text-white/60' : 'text-[#66645F]'}>
                  {exp.tags[0]}
                </span>
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold tracking-tight uppercase mb-1">
                {exp.title}
              </h3>
              <p
                className={`font-editorial text-xs leading-relaxed mb-2 ${
                  activeExp === idx ? 'text-white/80' : 'text-[#66645F]'
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
                        ? 'border-white/20 text-white/70'
                        : 'border-[#111111]/20 text-[#66645F]'
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
          <div className="flex items-center justify-between border-b border-[#C8C4B9] pb-3 mb-6 font-mono-tech text-[10px] text-[#66645F] uppercase">
            <span className="flex items-center gap-2 text-[#111111] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              LIVE TEST BENCH // {experimentsList[activeExp].number} {experimentsList[activeExp].title}
            </span>
            <span>TAGS: {experimentsList[activeExp].tags.join(' · ')}</span>
          </div>

          {/* Workbench Dynamic Content Container */}
          <div className="w-full min-h-[360px] flex items-center justify-center relative overflow-hidden bg-[#E3DFD5] border border-[#C8C4B9]">
            {/* Visual simulation canvas for experiments 0, 1, 4 */}
            {(activeExp === 0 || activeExp === 1 || activeExp === 4) && (
              <div className="w-full h-full flex flex-col justify-between p-2">
                <canvas ref={canvasRef} className="w-full h-[320px] block cursor-crosshair" />
                <div className="text-[9px] font-mono-tech text-[#66645F] bg-[#EAE6DC] px-3 py-1 flex items-center justify-between border-t border-[#C8C4B9]">
                  <span>
                    {activeExp === 0 && 'SWEEP CURSOR OR SLIDER TO ADJUST FFT ARTIFACT THRESHOLD'}
                    {activeExp === 1 && 'MOVE CURSOR TO PROBE SURVEILLANCE OPTICAL FLOW GRID'}
                    {activeExp === 4 && 'MOVE CURSOR TO DEFLECT KNOWLEDGE GRAPH NODES'}
                  </span>
                  {activeExp === 0 && (
                    <div className="flex items-center gap-2">
                      <span>THRESHOLD:</span>
                      <input
                        type="range"
                        min="20"
                        max="95"
                        value={fftThreshold}
                        onChange={(e) => setFftThreshold(Number(e.target.value))}
                        className="w-24 accent-[#355CFF]"
                      />
                      <span className="font-bold text-[#111111]">{fftThreshold}%</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Experiment 2: Chronos Minimal Time-tracker UX */}
            {activeExp === 2 && (
              <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center">
                <div className="w-48 h-48 rounded-full border-2 border-dashed border-[#111111] flex flex-col items-center justify-center p-4 bg-[#EAE6DC] shadow-inner mb-6 relative">
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
                    onMouseEnter={() => setCursorMode('enter', isTimerRunning ? 'PAUSE' : 'START')}
                    onMouseLeave={() => setCursorMode('default')}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#111111] text-[#EAE6DC] font-mono-tech text-xs uppercase font-bold hover:bg-[#355CFF] transition-colors"
                  >
                    {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isTimerRunning ? 'PAUSE LOG' : 'START SESSION'}</span>
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

            {/* Experiment 3: Value Product Discovery Engine */}
            {activeExp === 3 && (
              <div className="w-full h-full p-6 flex flex-col justify-between">
                <div className="border-b border-[#C8C4B9] pb-3 mb-4 flex items-center justify-between font-mono-tech text-[10px] text-[#66645F]">
                  <span>INTENT MATCHING // RANKING COEF: 0.962</span>
                  <span className="text-[#355CFF]">PYTHON FAST-EMBED</span>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'MECHANICAL CALIPER // 150MM HARDENED STEEL', score: '98.4%', match: 'GEOMETRIC PRECISION' },
                    { name: 'TITANIUM EDC PEN // 0.5MM G2 REFILL', score: '94.2%', match: 'TACTILE DURABILITY' },
                    { name: 'ANODIZED BLUEPRINT COMPASS // DUAL RATCHET', score: '91.8%', match: 'ARCHITECTURAL CRAFT' },
                  ].map((item, i) => (
                    <div key={i} className="p-3 border border-[#C8C4B9] bg-white/60 flex items-center justify-between font-mono-tech text-xs">
                      <div>
                        <div className="font-bold text-[#111111]">{item.name}</div>
                        <div className="text-[9px] text-[#66645F]">{item.match}</div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 bg-[#355CFF] text-white text-[10px] font-bold">
                          {item.score}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="font-mono-tech text-[9px] text-[#66645F] text-center pt-4 border-t border-[#C8C4B9]">
                  SEARCH VECTOR SPACE: HIGH-DIMENSIONAL COSINE SIMILARITY
                </div>
              </div>
            )}

            {/* Experiment 5: Smart PPE Detection */}
            {activeExp === 5 && (
              <div className="w-full h-full p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-[#C8C4B9] pb-3 font-mono-tech text-xs">
                  <span className="flex items-center gap-2 font-bold text-[#111111]">
                    <HardHat className="w-4 h-4 text-[#355CFF]" />
                    EDGE COMPLIANCE RUNTIME
                  </span>
                  <span className="text-emerald-700 font-bold">CAMERA_04 [ONLINE]</span>
                </div>

                <div className="my-auto grid grid-cols-3 gap-3">
                  {ppeAlerts.map((alert, i) => (
                    <div key={i} className="p-4 border border-[#111111] bg-white/70 flex flex-col items-center justify-center font-mono-tech text-xs text-center">
                      <span className="text-emerald-600 font-black text-sm mb-1">✓</span>
                      <span className="font-bold text-[#111111]">{alert}</span>
                      <span className="text-[8px] text-[#66645F] mt-1">YOLO_V8 INFERENCE</span>
                    </div>
                  ))}
                </div>

                <div className="p-2 bg-[#111111] text-white font-mono-tech text-[9px] flex justify-between">
                  <span>INFERENCE: 14MS @ EDGE</span>
                  <span>COMPLIANCE: 100% SECURE</span>
                </div>
              </div>
            )}

            {/* Experiment 6: Unifeed RSS Aggregator */}
            {activeExp === 6 && (
              <div className="w-full h-full p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-[#C8C4B9] pb-3 font-mono-tech text-xs">
                  <span className="flex items-center gap-2 font-bold text-[#111111]">
                    <Rss className="w-4 h-4 text-[#355CFF]" />
                    UNIFEED // ALGORITHMIC NOISE FILTER
                  </span>
                  <span className="text-[#355CFF]">NLP FILTER: ACTIVE</span>
                </div>

                <div className="space-y-2 my-auto">
                  <div className="p-2.5 border border-[#C8C4B9] bg-white/60 font-mono-tech text-xs flex justify-between">
                    <span className="text-[#111111] font-bold">Hacker News RSS: Clean Distillation</span>
                    <span className="text-emerald-700 text-[10px]">PASS [0.04 NOISE]</span>
                  </div>
                  <div className="p-2.5 border border-[#C8C4B9] bg-white/60 font-mono-tech text-xs flex justify-between">
                    <span className="text-[#111111] font-bold">arXiv cs.AI: Recent Foundational Papers</span>
                    <span className="text-emerald-700 text-[10px]">PASS [0.01 NOISE]</span>
                  </div>
                  <div className="p-2.5 border border-red-300 bg-red-50/50 font-mono-tech text-xs flex justify-between">
                    <span className="text-[#66645F] line-through">Clickbait Trending Digest</span>
                    <span className="text-red-600 text-[10px]">BLOCKED [0.94 NOISE]</span>
                  </div>
                </div>

                <div className="text-[9px] font-mono-tech text-[#66645F] text-center border-t border-[#C8C4B9] pt-3">
                  FATIGUE MITIGATION: ZERO ENGAGEMENT-BASED RE-RANKING
                </div>
              </div>
            )}
          </div>

          {/* Workbench Footer Specifications */}
          <div className="mt-4 flex items-center justify-between font-mono-tech text-[9px] text-[#66645F]">
            <span>SYSTEM: {experimentsList[activeExp].tags.join(' // ')}</span>
            <span className="text-[#355CFF]">ENGINEERING STUDY</span>
          </div>
        </div>
      </div>
    </section>
  );
};

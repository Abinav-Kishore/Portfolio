import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Copy,
  Check,
  ArrowUp,
  Mail,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
} from "lucide-react";
import { audioEngine } from "./AudioEngine";
import { PORTFOLIO_DATA } from "../data";

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  setCursorMode: (mode: string, text?: string) => void;
  onBackToTop: () => void;
  setIsDark?: (dark: boolean) => void;
}

export const Contact: React.FC<ContactProps> = ({
  setCursorMode,
  onBackToTop,
  setIsDark,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const email = PORTFOLIO_DATA.identity.email;
  const phone = PORTFOLIO_DATA.identity.phone;

  useEffect(() => {
    if (!setIsDark) return;
    const section = sectionRef.current;
    if (!section) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 50%",
      end: "bottom bottom",
      onEnter: () => setIsDark(true),
      onEnterBack: () => setIsDark(true),
      onLeave: () => setIsDark(false),
      onLeaveBack: () => setIsDark(false),
    });

    return () => st.kill();
  }, [setIsDark]);

  const handleCopy = () => {
    audioEngine.playClick(1500);
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen py-32 px-6 sm:px-12 md:px-16 bg-[#0D0D0C] text-[#EAE6DC] flex flex-col justify-between border-t border-white/10 transition-colors duration-700"
    >
      {/* Top Metadata Header */}
      <div className="section-header-row flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-3 sm:pb-4 font-mono-tech text-[10px] sm:text-xs tracking-widest text-white/50 uppercase gap-2 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#355CFF] animate-pulse" />
          <span>OUTRO & TRANSMISSION // SEC [04]</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>AVAILABILITY: {PORTFOLIO_DATA.identity.availability}</span>
        </div>
      </div>

      {/* Center Monumental Typography */}
      <div className="my-auto py-10 sm:py-16 md:py-20 max-w-6xl">
        <p className="font-mono-tech text-[10px] sm:text-xs md:text-sm tracking-widest text-[#355CFF] uppercase font-bold mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2">
          <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>
            LOCATION: {PORTFOLIO_DATA.identity.location} //{" "}
            {PORTFOLIO_DATA.identity.coordinates}
          </span>
        </p>

        <h2 className="hero-headline font-display uppercase tracking-tight text-white mb-6 sm:mb-8">
          HAVE A CHALLENGING PROBLEM?
          <br />
          <span className="text-[#355CFF]">LET'S ARCHITECT</span>
          <br />
          INTELLIGENT SYSTEMS.
        </h2>

        <p className="font-editorial text-base sm:text-lg md:text-2xl text-white/70 max-w-3xl leading-relaxed mb-8 sm:mb-12">
          I'm open to discussing engineering roles, full-stack systems
          development, deep learning research, and high-impact software
          challenges.
        </p>

        {/* Major Contact Actions (Editorial Links) */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 md:gap-6 font-mono-tech text-[12px] sm:text-[13px] md:text-sm lg:text-base">
          <a
            href={`mailto:${email}`}
            onMouseEnter={() => setCursorMode("open", "EMAIL")}
            onMouseLeave={() => setCursorMode("default")}
            onClick={() => audioEngine.playClick(1400)}
            className="group flex items-center justify-center sm:justify-start gap-2 sm:gap-3 py-3.5 sm:py-4 px-4 sm:px-6 bg-white text-[#111111] font-bold uppercase tracking-wider hover:bg-[#355CFF] hover:text-white transition-all duration-300 w-full sm:w-auto text-center"
          >
            <Mail className="w-4 h-4 flex-shrink-0" />
            <span className="break-all text-[11px] sm:text-[13px] md:text-sm">
              {email}
            </span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform flex-shrink-0 hidden sm:inline" />
          </a>

          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            onMouseEnter={() => setCursorMode("open", "CALL")}
            onMouseLeave={() => setCursorMode("default")}
            onClick={() => audioEngine.playClick(1400)}
            className="group flex items-center justify-center sm:justify-start gap-2 sm:gap-3 py-3.5 sm:py-4 px-4 sm:px-6 border border-white/30 text-white font-bold uppercase tracking-wider hover:border-white transition-all duration-300 w-full sm:w-auto"
          >
            <Phone className="w-4 h-4 text-[#355CFF] flex-shrink-0" />
            <span>{phone}</span>
          </a>

          <button
            onClick={handleCopy}
            onMouseEnter={() =>
              setCursorMode("open", copied ? "COPIED" : "COPY")
            }
            onMouseLeave={() => setCursorMode("default")}
            className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3.5 sm:py-4 border border-white/20 text-white hover:border-white transition-colors w-full sm:w-auto"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : (
              <Copy className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{copied ? "COPIED" : "COPY EMAIL"}</span>
          </button>

          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto">
            <a
              href={PORTFOLIO_DATA.identity.socials.github}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursorMode("open", "GITHUB")}
              onMouseLeave={() => setCursorMode("default")}
              className="group flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 text-white/80 hover:text-white py-3.5 px-4 sm:px-0 sm:py-3 border-b border-transparent sm:hover:border-[#355CFF] transition-all border border-white/15 sm:border-0"
            >
              <Github className="w-4 h-4 text-[#355CFF] flex-shrink-0" />
              <span>GITHUB</span>
              <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0 hidden sm:inline" />
            </a>

            <a
              href={PORTFOLIO_DATA.identity.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursorMode("open", "LINKEDIN")}
              onMouseLeave={() => setCursorMode("default")}
              className="group flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 text-white/80 hover:text-white py-3.5 px-4 sm:px-0 sm:py-3 border-b border-transparent sm:hover:border-[#355CFF] transition-all border border-white/15 sm:border-0"
            >
              <Linkedin className="w-4 h-4 text-[#355CFF] flex-shrink-0" />
              <span>LINKEDIN</span>
              <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0 hidden sm:inline" />
            </a>

            <a
              href={PORTFOLIO_DATA.identity.socials.x}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursorMode("open", "X")}
              onMouseLeave={() => setCursorMode("default")}
              className="group flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 text-white/80 hover:text-white py-3.5 px-4 sm:px-0 sm:py-3 border-b border-transparent sm:hover:border-[#355CFF] transition-all border border-white/15 sm:border-0"
            >
              <Twitter className="w-4 h-4 text-[#355CFF] flex-shrink-0" />
              <span>X / TWITTER</span>
              <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0 hidden sm:inline" />
            </a>
          </div>
        </div>
      </div>

      {/* Terminal Conclusion Bottom Bar / Colophon */}
      <div className="border-t border-white/10 pt-5 sm:pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 font-mono-tech text-[9px] sm:text-[10px] md:text-xs text-white/50 uppercase">
        <div className="space-y-0.5 sm:space-y-1">
          <div className="text-white font-bold tracking-wider">
            DESIGNED AS AN INTERACTIVE DIGITAL WORLD.
          </div>
          <div className="hidden sm:block">
            BUILT WITH REACT, THREE.JS, TYPESCRIPT, TAILWIND, GSAP.
          </div>
          <div className="text-white/40">
            {PORTFOLIO_DATA.identity.fullName.toUpperCase()} —{" "}
            {PORTFOLIO_DATA.identity.year}
          </div>
        </div>

        {/* Return to origin / Back to top */}
        <button
          onClick={() => {
            audioEngine.playClick(1600);
            onBackToTop();
          }}
          onMouseEnter={() => setCursorMode("enter", "ASCEND")}
          onMouseLeave={() => setCursorMode("default")}
          id="back-to-top-btn"
          className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 border border-white/20 text-white hover:bg-white hover:text-[#111111] transition-all w-full sm:w-auto text-center"
        >
          <span className="whitespace-nowrap">RETURN TO TOP [ORIGIN]</span>
          <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
        </button>
      </div>
    </section>
  );
};

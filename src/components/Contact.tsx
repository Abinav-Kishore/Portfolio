import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, ArrowUp, Mail, Github, Linkedin, Twitter, MapPin, Phone } from 'lucide-react';
import { audioEngine } from './AudioEngine';
import { PORTFOLIO_DATA } from '../data';

interface ContactProps {
  setCursorMode: (mode: string, text?: string) => void;
  onBackToTop: () => void;
}

export const Contact: React.FC<ContactProps> = ({ setCursorMode, onBackToTop }) => {
  const [copied, setCopied] = useState(false);
  const email = PORTFOLIO_DATA.identity.email;
  const phone = PORTFOLIO_DATA.identity.phone;

  const handleCopy = () => {
    audioEngine.playClick(1500);
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen py-32 px-6 sm:px-12 md:px-16 bg-[#0D0D0C] text-[#EAE6DC] flex flex-col justify-between border-t border-white/10 transition-colors duration-700"
    >
      {/* Top Metadata Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono-tech text-xs tracking-widest text-white/50 uppercase">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#355CFF] animate-pulse" />
          <span>OUTRO & TRANSMISSION // SEC [04]</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>AVAILABILITY: {PORTFOLIO_DATA.identity.availability}</span>
        </div>
      </div>

      {/* Center Monumental Typography */}
      <div className="my-auto py-16 sm:py-20 max-w-6xl">
        <p className="font-mono-tech text-xs sm:text-sm tracking-widest text-[#355CFF] uppercase font-bold mb-6 flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>LOCATION: {PORTFOLIO_DATA.identity.location} // {PORTFOLIO_DATA.identity.coordinates}</span>
        </p>

        <h2 className="hero-headline font-display uppercase tracking-tight text-white mb-8">
          HAVE A CHALLENGING PROBLEM?
          <br />
          <span className="text-[#355CFF]">LET'S ARCHITECT</span>
          <br />
          INTELLIGENT SYSTEMS.
        </h2>

        <p className="font-editorial text-lg sm:text-2xl text-white/70 max-w-3xl leading-relaxed mb-12">
          I'm open to discussing engineering roles, full-stack systems development, deep learning research, and high-impact software challenges.
        </p>

        {/* Major Contact Actions (Editorial Links) */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono-tech text-sm sm:text-base">
          <a
            href={`mailto:${email}`}
            onMouseEnter={() => setCursorMode('open', 'EMAIL')}
            onMouseLeave={() => setCursorMode('default')}
            onClick={() => audioEngine.playClick(1400)}
            className="group flex items-center gap-3 py-3.5 px-6 bg-white text-[#111111] font-bold uppercase tracking-wider hover:bg-[#355CFF] hover:text-white transition-all duration-300"
          >
            <Mail className="w-4 h-4" />
            <span>{email}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>

          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            onMouseEnter={() => setCursorMode('open', 'CALL')}
            onMouseLeave={() => setCursorMode('default')}
            onClick={() => audioEngine.playClick(1400)}
            className="group flex items-center gap-3 py-3.5 px-6 border border-white/30 text-white font-bold uppercase tracking-wider hover:border-white transition-all duration-300"
          >
            <Phone className="w-4 h-4 text-[#355CFF]" />
            <span>{phone}</span>
          </a>

          <button
            onClick={handleCopy}
            onMouseEnter={() => setCursorMode('open', copied ? 'COPIED' : 'COPY')}
            onMouseLeave={() => setCursorMode('default')}
            className="flex items-center gap-2 px-5 py-3.5 border border-white/20 text-white hover:border-white transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'COPIED' : 'COPY EMAIL'}</span>
          </button>

          <a
            href={PORTFOLIO_DATA.identity.socials.github}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setCursorMode('open', 'GITHUB')}
            onMouseLeave={() => setCursorMode('default')}
            className="group flex items-center gap-2 text-white/80 hover:text-white py-3 border-b border-transparent hover:border-[#355CFF] transition-all"
          >
            <Github className="w-4 h-4 text-[#355CFF]" />
            <span>GITHUB</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href={PORTFOLIO_DATA.identity.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setCursorMode('open', 'LINKEDIN')}
            onMouseLeave={() => setCursorMode('default')}
            className="group flex items-center gap-2 text-white/80 hover:text-white py-3 border-b border-transparent hover:border-[#355CFF] transition-all"
          >
            <Linkedin className="w-4 h-4 text-[#355CFF]" />
            <span>LINKEDIN</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href={PORTFOLIO_DATA.identity.socials.x}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setCursorMode('open', 'X')}
            onMouseLeave={() => setCursorMode('default')}
            className="group flex items-center gap-2 text-white/80 hover:text-white py-3 border-b border-transparent hover:border-[#355CFF] transition-all"
          >
            <Twitter className="w-4 h-4 text-[#355CFF]" />
            <span>X / TWITTER</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Terminal Conclusion Bottom Bar / Colophon */}
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono-tech text-[10px] sm:text-xs text-white/50 uppercase">
        <div className="space-y-1">
          <div className="text-white font-bold tracking-wider">
            DESIGNED AS AN INTERACTIVE DIGITAL WORLD.
          </div>
          <div>
            BUILT WITH REACT, THREE.JS, TYPESCRIPT, TAILWIND, GSAP.
          </div>
          <div className="text-white/40">
            {PORTFOLIO_DATA.identity.fullName.toUpperCase()} — {PORTFOLIO_DATA.identity.year}
          </div>
        </div>

        {/* Return to origin / Back to top */}
        <button
          onClick={() => {
            audioEngine.playClick(1600);
            onBackToTop();
          }}
          onMouseEnter={() => setCursorMode('enter', 'ASCEND')}
          onMouseLeave={() => setCursorMode('default')}
          className="flex items-center gap-2 px-5 py-3 border border-white/20 text-white hover:bg-white hover:text-[#111111] transition-all"
        >
          <span>RETURN TO TOP [ORIGIN]</span>
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

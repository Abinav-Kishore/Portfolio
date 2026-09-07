import React, { useState } from 'react';
import { Volume2, VolumeX, X, ArrowUpRight } from 'lucide-react';
import { audioEngine } from './AudioEngine';
import { PORTFOLIO_DATA } from '../data';

interface NavigationProps {
  dark?: boolean;
  onNavigate?: (targetId: string) => void;
  setCursorMode: (mode: string, text?: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  dark = false,
  onNavigate,
  setCursorMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleToggleIndex = () => {
    audioEngine.playClick(800);
    setIsOpen((prev) => !prev);
  };

  const handleToggleAudio = () => {
    const unmuted = audioEngine.toggleMute();
    setIsMuted(!unmuted);
  };

  const handleLinkClick = (id: string) => {
    audioEngine.playClick(1100);
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const textColor = dark ? 'text-white' : 'text-[#111111]';
  const borderColor = dark ? 'border-white/20' : 'border-[#111111]/20';
  const subTextColor = dark ? 'text-white/50' : 'text-[#66645F]';
  const lineBg = dark ? 'bg-white' : 'bg-[#111111]';

  return (
    <>
      {/* Fixed top navigation bar adhering to Editorial Aesthetic */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-start justify-between px-6 sm:px-12 md:px-16 py-7 pointer-events-none select-none transition-colors duration-500">
        {/* Top Left: NAME / COORDINATES */}
        <div className="pointer-events-auto flex flex-col items-start">
          <button
            id="nav-logo-btn"
            onClick={() => handleLinkClick('hero')}
            onMouseEnter={() => setCursorMode('enter', 'HOME')}
            onMouseLeave={() => setCursorMode('default')}
            className={`group text-left transition-opacity duration-300 hover:opacity-75`}
          >
            <span className={`block text-[10px] font-bold tracking-[0.2em] mb-1 uppercase ${textColor}`}>
              ABINAV KISHORE
            </span>
            <span className="block text-[10px] opacity-50 font-mono tracking-tighter text-[#66645F]">
              {PORTFOLIO_DATA.identity.coordinates} // CHENNAI
            </span>
          </button>
        </div>

        {/* Top Right: AUDIO & EDITORIAL INDEX */}
        <div className="pointer-events-auto flex items-center gap-6">
          {/* Sound Synthesizer toggle */}
          <button
            id="nav-audio-toggle"
            onClick={handleToggleAudio}
            onMouseEnter={() => setCursorMode('view', isMuted ? 'UNMUTE' : 'MUTE')}
            onMouseLeave={() => setCursorMode('default')}
            className={`hidden sm:flex items-center gap-2 py-1 px-2.5 border ${borderColor} ${textColor} text-[9px] font-mono-tech tracking-widest uppercase transition-all duration-200 hover:border-[#355CFF] hover:text-[#355CFF]`}
            title="Toggle interactive audio feedback"
          >
            {isMuted ? <VolumeX className="w-3 h-3 opacity-60" /> : <Volume2 className="w-3 h-3 text-[#355CFF]" />}
            <span>{isMuted ? 'MUTE' : 'ON'}</span>
          </button>

          {/* Editorial INDEX trigger with expanding bottom line */}
          <button
            id="nav-index-toggle"
            onClick={handleToggleIndex}
            onMouseEnter={() => setCursorMode('open', 'INDEX')}
            onMouseLeave={() => setCursorMode('default')}
            className="flex flex-col items-end cursor-pointer group focus:outline-none"
          >
            <span className={`text-[10px] font-bold tracking-[0.2em] mb-1 uppercase ${textColor}`}>
              INDEX
            </span>
            <div className={`w-8 h-[1px] ${lineBg} transition-all duration-300 group-hover:w-12 group-hover:bg-[#355CFF]`}></div>
          </button>
        </div>
      </header>

      {/* Full-screen Minimal Editorial Overlay */}
      {isOpen && (
        <div
          id="index-overlay"
          className="fixed inset-0 z-[100] bg-[#111111] text-[#EAE6DC] flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-y-auto"
        >
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="font-mono-tech text-xs tracking-widest text-white/50">
              ABINAV KISHORE // SYSTEM REVISION 2026
            </div>
            <button
              id="close-index-btn"
              onClick={handleToggleIndex}
              onMouseEnter={() => setCursorMode('close', 'CLOSE')}
              onMouseLeave={() => setCursorMode('default')}
              className="flex items-center gap-2 px-3 py-1 border border-white/20 text-xs font-mono-tech tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
            >
              <span>CLOSE</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Navigation Items (Huge Editorial Typography) */}
          <div className="my-auto py-12 flex flex-col gap-6 md:gap-8 max-w-5xl">
            {[
              { id: 'work', num: '01', label: 'WORK', note: 'VIORA · SARO · OBLIQ' },
              { id: 'about', num: '02', label: 'ABOUT', note: 'PHILOSOPHY, SPECIFICATION & BIOGRAPHY' },
              { id: 'experiments', num: '03', label: 'EXPERIMENTS', note: '7 ACTIVE LABORATORY BUILDS' },
              { id: 'experience', num: '04', label: 'EXPERIENCE', note: 'INDUSTRY INTERNSHIPS & EDUCATION' },
              { id: 'contact', num: '05', label: 'CONTACT', note: 'TRANSMISSION & COLLABORATION' },
            ].map((item) => (
              <button
                key={item.id}
                id={`index-link-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                onMouseEnter={() => setCursorMode('enter', item.label)}
                onMouseLeave={() => setCursorMode('default')}
                className="group flex flex-col sm:flex-row sm:items-baseline justify-between text-left py-2 border-b border-white/10 hover:border-[#355CFF] transition-all"
              >
                <div className="flex items-baseline gap-4 sm:gap-8">
                  <span className="font-mono-tech text-sm sm:text-base text-[#355CFF]">
                    ({item.num})
                  </span>
                  <span className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight group-hover:translate-x-4 transition-transform duration-300">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono-tech text-xs tracking-wider text-white/40 group-hover:text-white mt-2 sm:mt-0">
                  <span>{item.note}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#355CFF] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>

          {/* Bottom Footer inside Overlay */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono-tech text-white/40 gap-4">
            <div>LOCATION: CHENNAI, INDIA // 2026</div>
            <div className="flex items-center gap-6">
              <a
                href={`mailto:${PORTFOLIO_DATA.identity.email}`}
                className="hover:text-[#355CFF] transition-colors"
                onMouseEnter={() => setCursorMode('open', 'EMAIL')}
                onMouseLeave={() => setCursorMode('default')}
              >
                EMAIL ↗
              </a>
              <a
                href={PORTFOLIO_DATA.identity.socials.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#355CFF] transition-colors"
                onMouseEnter={() => setCursorMode('open', 'GITHUB')}
                onMouseLeave={() => setCursorMode('default')}
              >
                GITHUB ↗
              </a>
              <a
                href={PORTFOLIO_DATA.identity.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#355CFF] transition-colors"
                onMouseEnter={() => setCursorMode('open', 'LINKEDIN')}
                onMouseLeave={() => setCursorMode('default')}
              >
                LINKEDIN ↗
              </a>
              <a
                href={PORTFOLIO_DATA.identity.socials.x}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#355CFF] transition-colors"
                onMouseEnter={() => setCursorMode('open', 'X')}
                onMouseLeave={() => setCursorMode('default')}
              >
                X ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


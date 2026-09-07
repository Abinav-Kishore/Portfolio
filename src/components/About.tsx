import React, { useState } from 'react';
import { Award, GraduationCap, Briefcase, Code, CheckCircle2, Trophy, BookOpen, Layers } from 'lucide-react';
import { audioEngine } from './AudioEngine';
import { PORTFOLIO_DATA } from '../data';

interface AboutProps {
  setCursorMode: (mode: string, text?: string) => void;
}

export const About: React.FC<AboutProps> = ({ setCursorMode }) => {
  const [photoFilter, setPhotoFilter] = useState<'mono' | 'blueprint' | 'scan'>('mono');

  return (
    <section
      id="about"
      className="relative w-full min-h-screen py-32 px-6 sm:px-12 md:px-16 border-t border-[#C8C4B9] bg-transparent text-[#111111]"
    >
      {/* Section Header */}
      <div className="flex items-baseline justify-between border-b border-[#C8C4B9] pb-4 mb-16">
        <div className="flex items-baseline gap-4">
          <span className="font-mono-tech text-sm text-[#355CFF] font-bold">SEC [02]</span>
          <span className="font-mono-tech text-xs uppercase tracking-widest text-[#66645F]">
            MANIFESTO & BIOGRAPHY // {PORTFOLIO_DATA.identity.fullName.toUpperCase()}
          </span>
        </div>
        <div className="hidden sm:block font-mono-tech text-xs text-[#66645F] tracking-widest uppercase">
          STATION: CHENNAI, INDIA // 2026 // {PORTFOLIO_DATA.identity.cgpa}
        </div>
      </div>

      {/* Large Editorial Statement */}
      <div className="mb-20">
        <h2 className="sub-headline font-display uppercase font-black text-[#111111] max-w-5xl tracking-tight">
          ARCHITECTING
          <br />
          <span className="text-[#355CFF]">INTELLIGENT</span>
          <br />
          SYSTEMS & SCALABLE
          <br />
          SOFTWARE.
        </h2>
      </div>

      {/* Grid: Technical Disciplines & Scanned Personnel Docket */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Scanned Technical Document Portrait, Education & Achievements */}
        <div className="lg:col-span-5 space-y-8">
          <div
            onMouseEnter={() => setCursorMode('view', 'SCAN')}
            onMouseLeave={() => setCursorMode('default')}
            onClick={() => {
              audioEngine.playClick(1400);
              setPhotoFilter((prev) =>
                prev === 'mono' ? 'blueprint' : prev === 'blueprint' ? 'scan' : 'mono'
              );
            }}
            className="relative w-full aspect-[4/5] bg-[#E3DFD5] border border-[#111111] p-4 shadow-sm cursor-pointer group"
          >
            {/* Scanned Technical Document Header */}
            <div className="flex items-center justify-between border-b border-[#111111]/40 pb-2 mb-3 font-mono-tech text-[9px] text-[#66645F]">
              <span>ENGINEERING DOSSIER // SPECIMEN 01</span>
              <span>BIO-REF: AK-2026</span>
            </div>

            {/* Editorial Corner Brackets */}
            <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#111111] pointer-events-none"></div>
            <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#111111] pointer-events-none"></div>

            {/* Stylized Architectural Technical Specimen Avatar Canvas */}
            <div className="relative w-full h-[calc(100%-48px)] overflow-hidden border border-[#C8C4B9] bg-[#1a1a1a] flex items-center justify-center">
              {/* Technical Drawing Blueprint Grid */}
              <div className="absolute inset-0 bg-[#0F172A] opacity-90">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="avatar-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E293B" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#avatar-grid)" />
                  <circle cx="50%" cy="50%" r="80" stroke="#355CFF" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                  <circle cx="50%" cy="50%" r="130" stroke="#EAE6DC" strokeWidth="0.5" strokeDasharray="2 4" fill="none" opacity="0.4" />
                </svg>
              </div>

              {/* Monogram Silhouette */}
              <div className="relative z-10 text-center font-display text-white">
                <div className="text-7xl font-black tracking-tighter text-[#355CFF]">AK</div>
                <div className="font-mono-tech text-[9px] tracking-widest text-[#EAE6DC]/90 mt-2 uppercase font-bold">
                  {PORTFOLIO_DATA.identity.fullName}
                </div>
                <div className="font-mono-tech text-[8px] text-[#355CFF] mt-1 uppercase">
                  {PORTFOLIO_DATA.identity.positioning}
                </div>
              </div>

              {/* Architectural measurement calipers overlaid */}
              <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between font-mono-tech text-[8px] text-white/70">
                <div className="flex justify-between">
                  <span>┼ [CHENNAI / IN]</span>
                  <span>13.0827° N, 80.2707° E</span>
                </div>
                <div className="flex justify-between text-[#355CFF]">
                  <span>CGPA: 8.27 // CIT</span>
                  <span>STATUS // ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Document Footer with Stamp */}
            <div className="mt-3 flex items-center justify-between font-mono-tech text-[9px]">
              <span className="text-[#66645F]">CLICK TO RE-CALIBRATE SCANNER</span>
              <span className="px-2 py-0.5 border border-[#355CFF] text-[#355CFF] font-bold uppercase tracking-wider">
                ENGINEERING VERIFIED
              </span>
            </div>
          </div>

          {/* Education Docket */}
          <div className="border border-[#C8C4B9] bg-[#EAE6DC] p-5 shadow-xs relative">
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t border-l border-[#111111]"></div>
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b border-r border-[#111111]"></div>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[#355CFF] font-bold uppercase">
                <GraduationCap className="w-4 h-4" />
                ACADEMIC FORMATION
              </div>
              <span className="px-2 py-0.5 bg-[#355CFF] text-white font-mono-tech text-[10px] font-bold">
                {PORTFOLIO_DATA.education.cgpa}
              </span>
            </div>
            <h4 className="font-display text-base font-bold text-[#111111] uppercase">
              {PORTFOLIO_DATA.education.degree}
            </h4>
            <div className="font-mono-tech text-xs text-[#111111] font-semibold mt-1">
              {PORTFOLIO_DATA.education.institution}
            </div>
            <div className="font-mono-tech text-xs text-[#66645F] mt-0.5">
              {PORTFOLIO_DATA.education.location} // {PORTFOLIO_DATA.education.period}
            </div>
            <div className="mt-4 pt-3 border-t border-[#C8C4B9]">
              <div className="font-mono-tech text-[10px] text-[#66645F] uppercase mb-1 font-bold">
                CORE COMPUTER SCIENCE CURRICULUM:
              </div>
              <div className="font-mono-tech text-xs leading-relaxed text-[#111111]">
                {PORTFOLIO_DATA.education.coursework.join(' · ')}
              </div>
            </div>
          </div>

          {/* Key Achievements & Honors */}
          <div className="border border-[#C8C4B9] bg-[#EAE6DC] p-5 shadow-xs relative">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#355CFF] font-bold uppercase mb-4">
              <Trophy className="w-4 h-4" />
              HONORS & COMPETITIVE METRICS
            </div>
            <div className="space-y-3 font-mono-tech text-xs">
              {PORTFOLIO_DATA.achievements.map((ach, idx) => (
                <div key={idx} className="p-2.5 bg-white/60 border border-[#C8C4B9]">
                  <div className="flex items-center gap-2 font-bold text-[#111111]">
                    <span className="w-1.5 h-1.5 bg-[#355CFF]" />
                    <span>{ach.title}</span>
                  </div>
                  <div className="font-editorial text-xs text-[#66645F] mt-1 pl-3.5 leading-normal">
                    {ach.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Manifesto, Skills Matrix, Timeline & Certifications */}
        <div className="lg:col-span-7 space-y-12">
          {/* Manifesto Paragraphs */}
          <div className="font-editorial text-lg sm:text-xl text-[#111111] leading-relaxed space-y-6">
            <p className="font-medium text-[#111111]">
              {PORTFOLIO_DATA.about.intro}
            </p>
            <p className="text-[#66645F]">
              {PORTFOLIO_DATA.about.philosophy}
            </p>
            <p className="text-[#355CFF] font-medium">
              "{PORTFOLIO_DATA.about.conviction}"
            </p>
          </div>

          {/* Skills & Focus Areas Matrix */}
          <div className="border-y border-[#C8C4B9] py-8">
            <h4 className="font-mono-tech text-xs tracking-widest text-[#66645F] uppercase mb-6 flex items-center gap-2">
              <Code className="w-3.5 h-3.5 text-[#355CFF]" />
              TECHNICAL SPECIFICATIONS & STACK
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-mono-tech text-xs">
              <div className="p-3.5 border border-[#C8C4B9] bg-[#EAE6DC]">
                <div className="text-[10px] text-[#355CFF] font-bold uppercase mb-1">PROGRAMMING LANGUAGES</div>
                <div className="text-[#111111] font-semibold">{PORTFOLIO_DATA.skills.programmingLanguages.join(' · ')}</div>
              </div>

              <div className="p-3.5 border border-[#C8C4B9] bg-[#EAE6DC]">
                <div className="text-[10px] text-[#355CFF] font-bold uppercase mb-1">DSA & ALGORITHMIC PROBLEM SOLVING</div>
                <div className="text-[#111111] font-semibold">{PORTFOLIO_DATA.skills.dsa.join(' · ')}</div>
              </div>

              <div className="p-3.5 border border-[#C8C4B9] bg-[#EAE6DC]">
                <div className="text-[10px] text-[#355CFF] font-bold uppercase mb-1">BACKEND & SCALABLE APIS</div>
                <div className="text-[#111111] font-semibold">{PORTFOLIO_DATA.skills.backend.join(' · ')}</div>
              </div>

              <div className="p-3.5 border border-[#C8C4B9] bg-[#EAE6DC]">
                <div className="text-[10px] text-[#355CFF] font-bold uppercase mb-1">DATABASES & STORAGE</div>
                <div className="text-[#111111] font-semibold">{PORTFOLIO_DATA.skills.databases.join(' · ')}</div>
              </div>

              <div className="p-3.5 border border-[#C8C4B9] bg-[#EAE6DC]">
                <div className="text-[10px] text-[#355CFF] font-bold uppercase mb-1">FRONTEND & INTERACTIVE SYSTEMS</div>
                <div className="text-[#111111] font-semibold">{PORTFOLIO_DATA.skills.frontend.join(' · ')}</div>
              </div>

              <div className="p-3.5 border border-[#C8C4B9] bg-[#EAE6DC]">
                <div className="text-[10px] text-[#355CFF] font-bold uppercase mb-1">MACHINE LEARNING, AI & CV</div>
                <div className="text-[#111111] font-semibold">{PORTFOLIO_DATA.skills.machineLearningAI.join(' · ')}</div>
              </div>

              <div className="p-3.5 border border-[#C8C4B9] bg-[#EAE6DC]">
                <div className="text-[10px] text-[#355CFF] font-bold uppercase mb-1">SYSTEM DESIGN & ARCHITECTURE</div>
                <div className="text-[#111111] font-semibold">{PORTFOLIO_DATA.skills.systemDesign.join(' · ')}</div>
              </div>

              <div className="p-3.5 border border-[#C8C4B9] bg-[#EAE6DC]">
                <div className="text-[10px] text-[#355CFF] font-bold uppercase mb-1">ENGINEERING TOOLS & INFRA</div>
                <div className="text-[#111111] font-semibold">{PORTFOLIO_DATA.skills.tools.join(' · ')}</div>
              </div>
            </div>
          </div>

          {/* Professional Experience / Timeline Section */}
          <div id="experience" className="pt-2">
            <h4 className="font-mono-tech text-xs tracking-widest text-[#66645F] uppercase mb-6 flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-[#355CFF]" />
              PROFESSIONAL EXPERIENCE & LEADERSHIP
            </h4>
            <div className="divide-y divide-[#C8C4B9] font-mono-tech text-xs">
              {PORTFOLIO_DATA.experience.map((exp, idx) => (
                <div key={idx} className="py-5 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="text-[#355CFF] font-bold text-sm">[{exp.year}]</span>
                      <span className="font-bold text-[#111111] text-sm">{exp.role}</span>
                    </div>
                    <span className="text-[#66645F] uppercase text-[11px] font-semibold">{exp.company}</span>
                  </div>
                  <p className="font-editorial text-sm text-[#444] leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Docket */}
          <div className="pt-2 border-t border-[#C8C4B9]">
            <h4 className="font-mono-tech text-xs tracking-widest text-[#66645F] uppercase mb-4 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-[#355CFF]" />
              TECHNICAL CERTIFICATIONS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono-tech text-xs">
              {PORTFOLIO_DATA.certifications.map((cert, idx) => (
                <div key={idx} className="p-3 border border-[#C8C4B9] bg-[#EAE6DC]">
                  <div className="text-[10px] text-[#355CFF] font-bold uppercase mb-0.5">{cert.issuer}</div>
                  <div className="text-[#111111] font-medium">{cert.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

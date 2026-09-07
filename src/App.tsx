import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ProjectData } from './types';
import { Cursor } from './components/Cursor';
import { Grid } from './components/Grid';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ProjectScene1 } from './components/ProjectScene1';
import { ProjectScene2 } from './components/ProjectScene2';
import { ProjectScene3 } from './components/ProjectScene3';
import { ProjectModal } from './components/ProjectModal';
import { About } from './components/About';
import { Experiments } from './components/Experiments';
import { Contact } from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [cursorMode, setCursorMode] = useState<string>('default');
  const [cursorText, setCursorText] = useState<string | undefined>(undefined);
  const [modalProject, setModalProject] = useState<ProjectData | null>(null);

  // Initialize Lenis smooth scroll and connect to GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleSetCursor = (mode: string, text?: string) => {
    setCursorMode(mode);
    setCursorText(text);
  };

  const handleNavigate = (targetId: string) => {
    if (lenisRef.current) {
      if (targetId === 'hero') {
        lenisRef.current.scrollTo(0, { duration: 1.4 });
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          lenisRef.current.scrollTo(el, { duration: 1.4, offset: -20 });
        }
      }
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBackToTop = () => {
    handleNavigate('hero');
  };

  // Freeze background smooth-scroll while the project dossier modal is open
  useEffect(() => {
    if (modalProject) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [modalProject]);

  return (
    <div className={`relative min-h-screen transition-colors duration-700 ${isDark ? 'bg-[#0D0D0C]' : 'bg-[#EAE6DC]'}`}>
      {/* Custom Inertial Cursor */}
      <Cursor cursorMode={cursorMode} cursorText={cursorText} />

      {/* Persistent Architectural Parallax Grid */}
      <Grid dark={isDark} />

      {/* Minimal Fixed Navigation & Full-screen Index */}
      <Navigation
        dark={isDark}
        onNavigate={handleNavigate}
        setCursorMode={handleSetCursor}
      />

      {/* Main Continuous Visual Narrative */}
      <main className="relative z-10 w-full overflow-hidden">
        {/* Pinned 100vh Hero Scene with 3D Kinetic Sculpture */}
        <Hero setCursorMode={handleSetCursor} />

        {/* Work Scene Anchor */}
        <div className="w-full">
          {/* Project 01: Monolith OS (Spatial Architecture on Paper) */}
          <ProjectScene1
            onOpenModal={(proj) => setModalProject(proj)}
            setCursorMode={handleSetCursor}
          />

          {/* Project 02: Synthetic Terrain (Dark Inverted Obsidian Mode) */}
          <ProjectScene2
            onOpenModal={(proj) => setModalProject(proj)}
            setCursorMode={handleSetCursor}
            setIsDark={setIsDark}
          />

          {/* Project 03: Kinetic Blueprint (Experimental Multi-Strata 3D Rig) */}
          <ProjectScene3
            onOpenModal={(proj) => setModalProject(proj)}
            setCursorMode={handleSetCursor}
          />
        </div>

        {/* Section 02: Editorial About & Scanned Technical Portrait */}
        <About setCursorMode={handleSetCursor} />

        {/* Section 03: Laboratory Notebook of Code Experiments */}
        <Experiments setCursorMode={handleSetCursor} />

        {/* Section 04: Monumental Terminal Contact Experience */}
        <Contact
          setCursorMode={handleSetCursor}
          onBackToTop={handleBackToTop}
        />
      </main>

      {/* Project Inspection Dossier Drawer */}
      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
        setCursorMode={handleSetCursor}
      />
    </div>
  );
}

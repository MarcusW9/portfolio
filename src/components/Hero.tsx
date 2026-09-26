import React, { useEffect, useRef, useState } from 'react';
import { HeroInkCanvas } from './HeroInkCanvas.tsx';

interface HeroProps {
  onViewWork: () => void;
  onContactClick: () => void;
  scrollY?: number;
}

export const Hero: React.FC<HeroProps> = ({ onViewWork, onContactClick, scrollY = 0 }) => {
  // Staged rhythmic progression for calligraphic entry
  // Step 1: Landscape emerges softly like mountain mist
  // Step 2: Sidebar vertical seal & line descends
  // Step 3: Calligraphic Name "Marcus" strikes like the first brush stroke
  // Step 4: "Wong" descends as the second stroke
  // Step 5: Underline ink brush stroke sweeps across with 飞白 wisps
  // Step 6: Tagline and CTA actions bloom into view
  const [stage, setStage] = useState<number>(0);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Deliberate calligraphic pacing:
    // Beat 0: 80ms  (Shan Shui landscape & mist emerge)
    // Beat 1: 300ms (Sidebar metadata line drops)
    // Beat 2: 550ms (First stroke: "Marcus" touches down)
    // Beat 3: 880ms (Second stroke: "Wong" anchors beneath)
    // Beat 4: 1220ms (Calligraphic underline brush stroke sweeps across)
    // Beat 5: 1420ms (First dry-brush feibai wisp streaks)
    // Beat 6: 1580ms (Secondary dry-brush wisp settles)
    // Beat 7: 1780ms (Philosophy tagline blooms onto paper)
    // Beat 8: 2050ms (Actions settle into view)
    const timers = [
      setTimeout(() => setStage(1), 80),
      setTimeout(() => setStage(2), 300),
      setTimeout(() => setStage(3), 550),
      setTimeout(() => setStage(4), 880),
      setTimeout(() => setStage(5), 1220),
      setTimeout(() => setStage(6), 1420),
      setTimeout(() => setStage(7), 1580),
      setTimeout(() => setStage(8), 1780),
      setTimeout(() => setStage(9), 2050),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[92vh] flex items-center pt-24 md:pt-32 pb-16 overflow-hidden">
      {/* Interactive Sumi-e Brush & Bloom Canvas (Exclusive to Hero) */}
      <HeroInkCanvas heroRef={heroRef} />

      {/* Background Chinese Ink Shan Shui Landscape with Mountains Drifting at Different Parallax Speeds & Mist Drifting */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        
        {/* Layer 1: Distant Misty Mountain Layer (Atmospheric fade-in on mount) */}
        <div
          className={`absolute right-0 bottom-0 w-full lg:w-[72%] h-[88%] will-change-transform transition-all duration-1200 ease-out ${
            stage >= 1 ? 'opacity-80 scale-100 filter-none' : 'opacity-0 scale-[1.02] blur-sm'
          }`}
          style={{
            transform: `translate3d(0, ${scrollY * 0.12}px, 0)`
          }}
        >
          <img
            src="/src/assets/images/hero_shanshui_wuxia_1790414993742.jpg"
            alt="Shan Shui Chinese ink wash landscape with misty mountain peaks and solitary wuxia figure"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain object-right-bottom mix-blend-multiply"
          />
        </div>

        {/* Layer 2: Drifting Atmospheric Mist Clouds (Always running, very slowly) */}
        <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-55 animate-mist-slow">
          <div className="w-[140%] h-[120%] -left-[20%] -top-[10%] bg-[radial-gradient(ellipse_at_70%_60%,rgba(242,237,228,0.85)_0%,rgba(242,237,228,0.25)_50%,transparent_75%)]" />
        </div>
        <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40 animate-mist-reverse">
          <div className="w-[130%] h-[110%] -left-[10%] top-[10%] bg-[radial-gradient(ellipse_at_85%_75%,rgba(242,237,228,0.75)_0%,rgba(242,237,228,0.15)_45%,transparent_70%)]" />
        </div>

        {/* Foreground Paper gradient fades */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F2EDE4] via-[#F2EDE4]/70 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F2EDE4] via-transparent to-transparent h-40 bottom-0" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-14">
          
          {/* Vertical Metadata Sidebar (Paces in at Stage 2 with rhythmic vertical line drop) */}
          <div className="hidden md:flex flex-col items-center gap-4 pt-4 select-none">
            <span
              className={`text-[10px] tracking-[0.28em] uppercase text-[#7E786E] font-medium whitespace-nowrap [writing-mode:vertical-rl] rotate-180 transition-all duration-700 ease-out ${
                stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
              }`}
              style={{ letterSpacing: '0.28em' }}
            >
              LONDON · SENIOR PRODUCT MANAGER
            </span>
            <div
              className={`w-[1px] bg-[#1B1917]/20 transition-all duration-700 ease-out origin-top ${
                stage >= 2 ? 'h-24 scale-y-100 opacity-100' : 'h-24 scale-y-0 opacity-0'
              }`}
            />
          </div>

          {/* Main Hero Typographic Lockup */}
          <div className="max-w-2xl">
            {/* Mobile metadata (Paces in at Stage 2) */}
            <div
              className={`md:hidden flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#7E786E] font-medium mb-3 transition-all duration-600 ${
                stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              <span>LONDON</span>
              <span>·</span>
              <span>SENIOR PRODUCT MANAGER</span>
            </div>

            {/* Name with rhythmic two-beat calligraphic brush entry */}
            <h1 className="font-serif text-[4rem] sm:text-[5.5rem] lg:text-[7rem] leading-[0.92] tracking-[-0.02em] font-normal text-[#1B1917] select-none">
              {/* First stroke: "Marcus" - Fast brush touchdown into paper capillary */}
              <span
                className={`block transition-all duration-800 ${
                  stage >= 3
                    ? 'opacity-100 translate-y-0 filter-none'
                    : 'opacity-0 translate-y-4 blur-[4px]'
                }`}
                style={{ transitionTimingFunction: 'var(--ease-ink-strike)' }}
              >
                Marcus
              </span>

              {/* Second stroke: "Wong" - Deliberate downward anchor stroke */}
              <span
                className={`block transition-all duration-850 ${
                  stage >= 4
                    ? 'opacity-100 translate-y-0 filter-none'
                    : 'opacity-0 translate-y-4 blur-[4px]'
                }`}
                style={{ transitionTimingFunction: 'var(--ease-ink-strike)' }}
              >
                Wong
              </span>
            </h1>

            {/* Organic Chinese Calligraphy Ink Brush Underline (Sweeps across deliberately at Stage 5) */}
            <div className="relative my-4 md:my-5 w-full max-w-[420px] h-5 overflow-visible">
              <svg
                viewBox="0 0 420 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-[#1B1917] overflow-visible"
                preserveAspectRatio="none"
              >
                {/* Thick calligraphic stroke with organic drag against paper grain */}
                <path
                  d="M4,9 C45,5 98,12 152,7 C215,3 280,11 350,6 C382,4 408,8 416,7 C414,11 392,13 342,14 C272,15 198,11 135,14 C78,16 22,12 4,9 Z"
                  fill="currentColor"
                  className={`transition-all duration-1100 origin-left ${
                    stage >= 5 ? 'scale-x-100 opacity-90' : 'scale-x-0 opacity-0'
                  }`}
                  style={{
                    transformOrigin: '0% 50%',
                    transitionTimingFunction: 'var(--ease-ink-drag)'
                  }}
                />
                {/* Dry brush feibai wisp (飞白) drawing in with feathering speed */}
                <path
                  d="M30,7 C85,4 160,8 240,5 C310,3 370,7 410,5"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="400"
                  strokeDashoffset={stage >= 6 ? '0' : '400'}
                  className="transition-all duration-1200"
                  style={{
                    transitionTimingFunction: 'var(--ease-feibai)'
                  }}
                  opacity="0.85"
                />
                <path
                  d="M110,12 C180,14 260,11 330,13"
                  stroke="currentColor"
                  strokeWidth="0.7"
                  strokeDasharray="250"
                  strokeDashoffset={stage >= 7 ? '0' : '250'}
                  className="transition-all duration-1000"
                  style={{
                    transitionTimingFunction: 'var(--ease-feibai)'
                  }}
                  opacity="0.65"
                />
              </svg>
            </div>

            {/* Tagline Statement (Blooms gently onto parchment at Stage 8 with slow fibrous ink drying) */}
            <div
              className={`transition-all duration-1000 ${
                stage >= 8
                  ? 'opacity-100 translate-y-0 filter-none'
                  : 'opacity-0 translate-y-3 blur-[3px]'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-ink-bleed)' }}
            >
              <p className="font-serif text-xl sm:text-2xl md:text-[1.65rem] text-[#332E29] leading-snug font-normal mt-5 mb-8 max-w-lg">
                A product builder at the intersection
                <br />
                of AI and design.
              </p>

              {/* Minimal Underlined Actions (Settle into place at Stage 9) */}
              <div
                className={`flex items-center gap-8 text-[11px] sm:text-xs tracking-[0.22em] uppercase font-semibold text-[#1B1917] transition-all duration-700 ease-out ${
                  stage >= 9
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2'
                }`}
              >
                <button
                  type="button"
                  onClick={onViewWork}
                  className="group relative pb-1 hover:text-[#B23A2A] transition-colors cursor-pointer"
                >
                  <span>VIEW THE WORK</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1B1917] group-hover:bg-[#B23A2A] transition-colors" />
                </button>

                <button
                  type="button"
                  onClick={onContactClick}
                  className="group relative pb-1 text-[#655E54] hover:text-[#1B1917] transition-colors cursor-pointer"
                >
                  <span>GET IN TOUCH</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1B1917]/35 group-hover:bg-[#1B1917] transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

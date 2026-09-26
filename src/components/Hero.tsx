import React, { useRef } from 'react';
import { HeroInkCanvas } from './HeroInkCanvas.tsx';
import { gsap, useGSAP, EASE } from '../lib/gsap.ts';
import heroLandscape from '../assets/images/hero_shanshui_wuxia_1790414993742.jpg';

interface HeroProps {
  onViewWork: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewWork, onContactClick }) => {
  const heroRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Visitors who prefer reduced motion get the finished composition, no animation
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const blurIn = (px: number) => ({ filter: `blur(${px}px)` });
      const sharp = { filter: 'blur(0px)', clearProps: 'filter' };

      // Calligraphic entry, one brush beat after another:
      // landscape → metadata → "Marcus" → "Wong" → underline → dry-brush wisps → tagline → actions
      gsap.timeline()
        .fromTo('[data-hero="landscape"]',
          { opacity: 0, scale: 1.02, ...blurIn(4) },
          { opacity: 0.8, scale: 1, ...sharp, duration: 1.2, ease: 'power2.out' }, 0.08)
        .from('[data-hero="meta"]', { opacity: 0, y: -12, duration: 0.7, ease: 'power2.out' }, 0.3)
        .from('[data-hero="meta-mobile"]', { opacity: 0, y: 8, duration: 0.6, ease: 'power2.out' }, 0.3)
        .from('[data-hero="meta-line"]', { scaleY: 0, opacity: 0, transformOrigin: '50% 0%', duration: 0.7, ease: 'power2.out' }, 0.3)
        .fromTo('[data-hero="first"]', { opacity: 0, y: 16, ...blurIn(4) }, { opacity: 1, y: 0, ...sharp, duration: 0.8, ease: EASE.strike }, 0.55)
        .fromTo('[data-hero="second"]', { opacity: 0, y: 16, ...blurIn(4) }, { opacity: 1, y: 0, ...sharp, duration: 0.85, ease: EASE.strike }, 0.88)
        .from('[data-hero="underline"]', { scaleX: 0, opacity: 0, transformOrigin: '0% 50%', duration: 1.1, ease: EASE.drag }, 1.22)
        .from('[data-hero="wisp-1"]', { strokeDashoffset: 400, duration: 1.2, ease: EASE.feibai }, 1.42)
        .from('[data-hero="wisp-2"]', { strokeDashoffset: 250, duration: 1.0, ease: EASE.feibai }, 1.58)
        .fromTo('[data-hero="tagline"]', { opacity: 0, y: 12, ...blurIn(3) }, { opacity: 1, y: 0, ...sharp, duration: 1.0, ease: EASE.bleed }, 1.78)
        .from('[data-hero="actions"]', { opacity: 0, y: 8, duration: 0.7, ease: 'power2.out' }, 2.05);

      // Distant mountains drift slower than the page as the hero scrolls away
      gsap.to('[data-hero="parallax"]', {
        y: () => (heroRef.current?.offsetHeight ?? 0) * 0.12,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="relative min-h-[92vh] flex items-center pt-24 md:pt-32 pb-16 overflow-hidden">
      {/* Interactive Sumi-e Brush & Bloom Canvas (Exclusive to Hero) */}
      <HeroInkCanvas heroRef={heroRef} />

      {/* Background Chinese Ink Shan Shui Landscape with parallax & drifting mist */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">

        {/* Layer 1: Distant Misty Mountain Layer (parallax wrapper + fade-in on mount) */}
        <div data-hero="parallax" className="absolute right-0 bottom-0 w-full lg:w-[72%] h-[88%] will-change-transform">
          <div data-hero="landscape" className="w-full h-full opacity-80">
            <img
              src={heroLandscape}
              alt="Shan Shui Chinese ink wash landscape with misty mountain peaks and solitary wuxia figure"
              className="w-full h-full object-contain object-right-bottom mix-blend-multiply"
            />
          </div>
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

          {/* Vertical Metadata Sidebar */}
          <div className="hidden md:flex flex-col items-center gap-4 pt-4 select-none">
            <span
              data-hero="meta"
              className="text-[10px] tracking-[0.28em] uppercase text-[#7E786E] font-medium whitespace-nowrap [writing-mode:vertical-rl] rotate-180"
              style={{ letterSpacing: '0.28em' }}
            >
              LONDON · SENIOR PRODUCT MANAGER
            </span>
            <div data-hero="meta-line" className="w-[1px] h-24 bg-[#1B1917]/20" />
          </div>

          {/* Main Hero Typographic Lockup */}
          <div className="max-w-2xl">
            {/* Mobile metadata */}
            <div
              data-hero="meta-mobile"
              className="md:hidden flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#7E786E] font-medium mb-3"
            >
              <span>LONDON</span>
              <span>·</span>
              <span>SENIOR PRODUCT MANAGER</span>
            </div>

            {/* Name with rhythmic two-beat calligraphic brush entry */}
            <h1 className="font-serif text-[4rem] sm:text-[5.5rem] lg:text-[7rem] leading-[0.92] tracking-[-0.02em] font-normal text-[#1B1917] select-none">
              <span data-hero="first" className="block">Marcus</span>
              <span data-hero="second" className="block">Wong</span>
            </h1>

            {/* Organic Chinese Calligraphy Ink Brush Underline */}
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
                  data-hero="underline"
                  d="M4,9 C45,5 98,12 152,7 C215,3 280,11 350,6 C382,4 408,8 416,7 C414,11 392,13 342,14 C272,15 198,11 135,14 C78,16 22,12 4,9 Z"
                  fill="currentColor"
                  opacity="0.9"
                />
                {/* Dry brush feibai wisps (飞白) */}
                <path
                  data-hero="wisp-1"
                  d="M30,7 C85,4 160,8 240,5 C310,3 370,7 410,5"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="400"
                  strokeDashoffset="0"
                  opacity="0.85"
                />
                <path
                  data-hero="wisp-2"
                  d="M110,12 C180,14 260,11 330,13"
                  stroke="currentColor"
                  strokeWidth="0.7"
                  strokeDasharray="250"
                  strokeDashoffset="0"
                  opacity="0.65"
                />
              </svg>
            </div>

            {/* Tagline Statement */}
            <div data-hero="tagline">
              <p className="font-serif text-xl sm:text-2xl md:text-[1.65rem] text-[#332E29] leading-snug font-normal mt-5 mb-8 max-w-lg">
                A product builder at the intersection
                <br />
                of AI and design.
              </p>

              {/* Minimal Underlined Actions */}
              <div
                data-hero="actions"
                className="flex items-center gap-8 text-[11px] sm:text-xs tracking-[0.22em] uppercase font-semibold text-[#1B1917]"
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

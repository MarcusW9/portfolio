import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap.ts';
import footerMountains from '../assets/images/footer_misty_mountains_1790415016091.jpg';

interface InkWashFooterProps {
  className?: string;
}

export const InkWashFooter: React.FC<InkWashFooterProps> = ({
  className = ''
}) => {
  const footerRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    // Mountains rise gently into place as the footer scrolls into view
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('[data-footer="mountains"]', { y: 20 }, {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className={`relative w-full overflow-hidden select-none ${className}`}>
      {/* 1. Organic Transition Calligraphy Brush Divider */}
      <div className="relative w-full overflow-hidden pointer-events-none py-2">
        <svg
          viewBox="0 0 1440 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-5 md:h-7 text-[#1B1917] opacity-80"
        >
          {/* Main sweeping brush stroke */}
          <path
            d="M0,14 C120,9 260,18 420,11 C580,5 720,19 900,12 C1060,6 1220,18 1360,11 C1400,9 1430,13 1440,12 C1410,18 1340,19 1200,16 C1040,14 910,21 740,16 C570,12 430,22 280,17 C160,13 60,19 0,14 Z"
            fill="currentColor"
          />
          {/* Feibai (飞白) dry-brush bristle wisps */}
          <path
            d="M140,10 C290,6 480,15 670,9 C860,5 1050,14 1280,8"
            stroke="currentColor"
            strokeWidth="0.85"
            opacity="0.6"
            strokeDasharray="12 4 40 8 100 6"
          />
          <path
            d="M320,18 C520,22 750,16 990,20 C1140,22 1310,16 1420,18"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.45"
            strokeDasharray="8 6 25 10"
          />
        </svg>
      </div>

      {/* 2. Panoramic Misty Mountains & Layered Ink Wash Landscape */}
      <div className="relative w-full h-56 sm:h-72 md:h-96 pointer-events-none overflow-hidden">
        
        {/* Layer A: Parallax ink wash mountain painting with organic paper bleed */}
        <div
          data-footer="mountains"
          className="absolute inset-0 w-full h-[130%] -top-[15%] will-change-transform"
        >
          <img
            src={footerMountains}
            alt="Misty ink wash mountains along bottom horizon"
            className="w-full h-full object-cover object-bottom mix-blend-multiply opacity-80"
          />
        </div>

        {/* Layer B: Drifting Atmospheric Mist Clouds */}
        <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-55 animate-mist-slow">
          <div className="w-[150%] h-full bg-[radial-gradient(ellipse_at_50%_70%,rgba(242,237,228,0.85)_0%,rgba(242,237,228,0.2)_60%,transparent_85%)]" />
        </div>
        <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-35 animate-mist-reverse">
          <div className="w-[140%] h-full bg-[radial-gradient(ellipse_at_75%_60%,rgba(242,237,228,0.8)_0%,rgba(242,237,228,0.15)_50%,transparent_75%)]" />
        </div>

        {/* Layer C: Organic Ink Splatter & Calligraphic Wash Accents along bottom */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none overflow-hidden h-28 md:h-36 opacity-75">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-full text-[#1B1917]"
          >
            {/* Mountain base ink saturation bleed */}
            <path
              d="M0,120 L0,75 C90,65 180,82 280,70 C380,58 460,78 570,68 C680,58 790,80 910,72 C1030,64 1140,84 1250,70 C1340,58 1400,74 1440,70 L1440,120 Z"
              fill="rgba(30, 26, 23, 0.08)"
            />
            <path
              d="M0,120 L0,90 C120,84 220,95 340,88 C470,80 580,96 710,87 C830,78 960,98 1090,89 C1210,80 1330,96 1440,88 L1440,120 Z"
              fill="rgba(30, 26, 23, 0.12)"
            />
            {/* Fine calligraphic grass/reeds silhouette marks */}
            <path d="M120,76 L123,60 M124,76 L130,63 M132,77 L135,66" stroke="rgba(30,26,23,0.35)" strokeWidth="1" strokeLinecap="round" />
            <path d="M420,72 L424,54 M426,73 L432,58 M434,74 L436,62" stroke="rgba(30,26,23,0.3)" strokeWidth="1" strokeLinecap="round" />
            <path d="M880,74 L883,56 M886,75 L893,61 M895,76 L897,64" stroke="rgba(30,26,23,0.32)" strokeWidth="1" strokeLinecap="round" />
            <path d="M1210,73 L1213,58 M1215,74 L1222,62 M1224,75 L1227,65" stroke="rgba(30,26,23,0.3)" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>

        {/* Layer D: Soft Top Edge Feathering into Parchment */}
        <div className="absolute inset-x-0 top-0 h-32 md:h-44 bg-gradient-to-b from-[#F2EDE4] via-[#F2EDE4]/80 to-transparent z-10" />

        {/* Layer E: Bottom subtle ground gradient */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#EAE3D6] via-[#EAE3D6]/70 to-transparent z-10" />
      </div>

      {/* 3. Colophon & Site Identity (Minimal Calligraphic Colophon at the base) */}
      <div className="relative z-20 bg-[#EAE3D6] border-t border-[#1B1917]/10 pt-8 pb-10">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Identity & Seal */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#B23A2A]" />
            <span className="font-serif text-base tracking-tight text-[#1B1917] font-medium">
              Marcus Wong
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#7E786E] pl-2 border-l border-[#1B1917]/15">
              Portfolio · 墨意
            </span>
          </div>

          {/* Navigational & Profile Links */}
          <div className="flex items-center gap-8 text-[11px] tracking-[0.22em] uppercase text-[#666056] font-medium">
            <a
              href="https://www.linkedin.com/in/marcus-wong-0451a817b/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-[#1B1917] transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/MarcusW9"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-[#1B1917] transition-colors"
            >
              GitHub ↗
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-[#B23A2A] transition-colors cursor-pointer"
            >
              TOP ↑
            </button>
          </div>

          {/* Copyright & Location */}
          <div className="text-[10px] tracking-[0.2em] uppercase text-[#888175] font-light">
            © 2026 · London, UK
          </div>

        </div>
      </div>
    </footer>
  );
};

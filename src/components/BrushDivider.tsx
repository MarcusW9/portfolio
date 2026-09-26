import React, { useRef } from 'react';
import { gsap, useGSAP, EASE } from '../lib/gsap.ts';

interface BrushDividerProps {
  className?: string;
  intensity?: 'subtle' | 'medium' | 'deep';
}

export const BrushDivider: React.FC<BrushDividerProps> = ({
  className = '',
  intensity = 'medium'
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    // Draws in once, the first time the divider scrolls into view
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%', once: true },
      })
        .from('[data-brush="core"]', { scaleX: 0, opacity: 0, transformOrigin: '0% 50%', duration: 1, ease: EASE.drag })
        .from('[data-brush="wisp"]', { strokeDashoffset: 1200, duration: 1.1, ease: EASE.feibai, stagger: 0.1 }, 0.2);
    });
  }, { scope: containerRef });

  const opacityMap = {
    subtle: 'opacity-40',
    medium: 'opacity-65',
    deep: 'opacity-85'
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`w-full overflow-hidden select-none pointer-events-none py-4 ${className}`}
    >
      <svg
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        className={`w-full h-3 md:h-4 text-[#1B1917] fill-current ${opacityMap[intensity]} transition-opacity duration-300`}
      >
        {/* Core ink stroke expanding horizontally from left to right */}
        <path
          d="M0,12 C40,9 90,14 150,11 C220,8 290,15 380,12 C460,9 520,13 600,10 C690,7 770,14 850,11 C930,8 1010,13 1090,10 C1140,8 1180,12 1200,11 C1170,15 1120,14 1050,16 C970,18 890,13 810,16 C720,19 640,13 550,16 C470,18 390,13 310,16 C230,19 150,14 80,16 C40,17 10,14 0,12 Z"
          data-brush="core"
        />
        {/* Fine dry-brush bristle wisps (飞白) drawing in like an ink brush stroke */}
        <path
          d="M80,9 C150,7 230,11 310,8 C420,5 510,10 620,8 C740,6 850,11 960,8 C1040,6 1110,9 1160,8"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="1200"
          strokeDashoffset="0"
          fill="none"
          data-brush="wisp"
          opacity="0.6"
        />
        <path
          d="M140,15 C240,17 350,13 460,16 C570,18 680,14 790,17 C890,19 990,15 1070,16"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeDasharray="1200"
          strokeDashoffset="0"
          fill="none"
          data-brush="wisp"
          opacity="0.4"
        />
      </svg>
    </div>
  );
};

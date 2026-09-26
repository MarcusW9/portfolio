import React, { useRef, useState } from 'react';
import { gsap, useGSAP, EASE } from '../lib/gsap.ts';
import { PRINCIPLES } from '../data/portfolioData.ts';

export const ApproachSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const ensoRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    // The ensō is painted once, the first time it scrolls into view
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({
        scrollTrigger: { trigger: ensoRef.current, start: 'top 80%', once: true },
      })
        .from('[data-enso="stroke"]', { strokeDashoffset: 1000, duration: 1.8, ease: EASE.drag })
        .from('[data-enso="inner"]', { strokeDashoffset: 900, duration: 1.6, ease: EASE.feibai }, 0.32)
        .from('[data-enso="outer"]', { strokeDashoffset: 950, duration: 1.4, ease: EASE.feibai }, 0.56)
        .fromTo('[data-enso="quote"]',
          { opacity: 0, scale: 0.95, filter: 'blur(2px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', clearProps: 'filter', duration: 1, ease: EASE.bleed }, 0.85);
    });
  }, { scope: ensoRef });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="approach" className="relative py-20 md:py-28 border-t border-[#1B1917]/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-16 select-none">
          <div className="flex items-center gap-3">
            <span className="text-[#1B1917] font-serif text-xl">☵</span>
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-[#1B1917]">
              How I work
            </h2>
          </div>
          <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#7E786E] font-medium">
            APPROACH
          </span>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: The Zen Enso Circle with Quotation (Draws in when first in view) */}
          <div ref={ensoRef} className="lg:col-span-5 flex justify-center select-none">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[26rem] md:h-[26rem] flex items-center justify-center p-12 sm:p-14 group">
              {/* Hand-drawn Zen Ink Wash Enso Circle SVG */}
              <svg
                viewBox="0 0 400 400"
                className="absolute inset-0 w-full h-full text-[#1B1917] fill-none transition-transform duration-700 group-hover:rotate-3"
              >
                {/* Thick calligraphic stroke of the Enso - draws in once */}
                <path
                  d="M195,50 C280,52 350,115 352,200 C354,285 285,350 200,352 C115,354 50,285 48,200 C46,130 90,75 160,54"
                  stroke="currentColor"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeDasharray="1000"
                  strokeDashoffset="0"
                  data-enso="stroke"
                  opacity="0.85"
                />
                {/* Inner dry-brush feathering */}
                <path
                  d="M198,64 C270,66 334,124 336,198 C338,272 276,334 202,336 C128,338 68,276 66,202 C64,140 102,86 168,68"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="900"
                  strokeDashoffset="0"
                  data-enso="inner"
                  opacity="0.45"
                />
                <path
                  d="M190,38 C290,40 366,108 368,202 C370,296 294,368 200,370 C106,372 36,296 34,202 C32,130 76,70 150,42"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="950"
                  strokeDashoffset="0"
                  data-enso="outer"
                  opacity="0.3"
                />
              </svg>

              {/* Centered Wabi-sabi Quote with enhanced breathing gap from the calligraphic perimeter */}
              <div
                data-enso="quote"
                className="relative z-10 max-w-[190px] sm:max-w-[215px] md:max-w-[225px] text-center"
              >
                <blockquote className="font-serif text-base sm:text-lg md:text-[1.18rem] leading-relaxed text-[#1B1917] italic font-normal">
                  &ldquo;AI makes building easy. Knowing what to build is still the craft.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Core Principles */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-[#1B1917]/10">
            {PRINCIPLES.map((principle) => {
              const isExpanded = expandedId === principle.id;

              return (
                <div
                  key={principle.id}
                  onClick={() => toggleExpand(principle.id)}
                  className="py-7 md:py-8 group cursor-pointer transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-2xl md:text-[1.75rem] text-[#1B1917] font-normal group-hover:text-[#B23A2A] transition-colors">
                      {principle.title}
                    </h3>
                    <span className="font-serif text-sm md:text-base text-[#7E786E] font-light">
                      {principle.hanzi}
                    </span>
                  </div>

                  <p className="text-sm md:text-[15px] leading-relaxed text-[#555047] font-light mt-2 max-w-xl">
                    {principle.summary}
                  </p>

                  {/* Expandable Playbook Drawer */}
                  {isExpanded ? (
                    <div className="mt-4 pt-4 border-t border-[#1B1917]/10 text-xs md:text-sm text-[#454038] space-y-3 animate-fadeIn">
                      <div>
                        <span className="font-semibold text-[#1B1917] uppercase tracking-wider text-[10px] block mb-1">
                          PHILOSOPHY & RIGOR
                        </span>
                        <p className="font-light leading-relaxed">{principle.detail}</p>
                      </div>
                      <div className="bg-[#EAE3D6]/60 p-3 rounded-xs border-l-2 border-[#1B1917]">
                        <span className="font-semibold text-[#1B1917] uppercase tracking-wider text-[10px] block mb-1">
                          IN PRACTICE
                        </span>
                        <p className="font-light leading-relaxed">{principle.inPractice}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#7E786E] group-hover:text-[#1B1917] transition-colors inline-flex items-center gap-1">
                        <span>EXPLORE PLAYBOOK</span>
                        <span>+</span>
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

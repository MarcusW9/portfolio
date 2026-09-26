import React, { useState } from 'react';
import { CASE_STUDIES, CaseStudy } from '../data/portfolioData.ts';
import { BrushDivider } from './BrushDivider.tsx';

interface SelectedWorkProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectCaseStudy }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="work" className="relative py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10 select-none">
          <div className="flex items-center gap-3">
            <span className="text-[#1B1917] font-serif text-xl">≂</span>
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-[#1B1917]">
              Selected work
            </h2>
          </div>
          <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#7E786E] font-medium">
            CASE STUDIES
          </span>
        </div>

        {/* Case Studies List */}
        <div className="flex flex-col">
          {CASE_STUDIES.map((study, idx) => {
            const isHovered = hoveredId === study.id;

            return (
              <React.Fragment key={study.id}>
                {/* Organic Chinese ink brush divider */}
                <BrushDivider intensity={idx === 0 ? 'deep' : 'medium'} />

                <article
                  onMouseEnter={() => setHoveredId(study.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onSelectCaseStudy(study)}
                  className="relative group py-8 md:py-12 transition-all duration-500 cursor-pointer px-4 md:px-7 -mx-4 md:-mx-7 rounded-sm overflow-hidden"
                >
                  {/* Subtle ink wash bleed backdrop effect on hover */}
                  <div
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      background:
                        'radial-gradient(ellipse 70% 80% at 30% 50%, rgba(27, 25, 23, 0.05) 0%, rgba(178, 58, 42, 0.02) 60%, transparent 100%)'
                    }}
                  />

                  {/* Organic ink bleeding edge indicator line on left */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#B23A2A] transition-all duration-500 ${
                      isHovered ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                    }`}
                    style={{ transformOrigin: 'top center' }}
                  />

                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
                    
                    {/* Left Column: Number Index (Darkens deeply on hover) */}
                    <div className="md:col-span-2 select-none">
                      <span
                        className={`font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight transition-all duration-300 block ${
                          isHovered
                            ? 'text-[#0C0B0A] font-normal translate-x-1'
                            : 'text-[#1B1917]/50'
                        }`}
                      >
                        {study.index}
                      </span>
                    </div>

                    {/* Center Column: Narrative & Links */}
                    <div className="md:col-span-7 pr-0 md:pr-6">
                      {/* Clean unboxed metadata separator */}
                      <div className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#7E786E] mb-2.5 flex items-center gap-2">
                        <span>{study.client}</span>
                        {isHovered && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B23A2A] animate-ping" />
                        )}
                      </div>

                      <h3
                        className={`font-serif text-2xl sm:text-3xl md:text-4xl leading-tight font-normal transition-colors duration-300 mb-4 [text-wrap:balance] ${
                          isHovered ? 'text-[#B23A2A]' : 'text-[#1B1917]'
                        }`}
                      >
                        {study.title}
                      </h3>

                      <p className="text-sm md:text-[15px] leading-relaxed text-[#555047] font-light mb-6 max-w-xl">
                        {study.summary}
                      </p>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCaseStudy(study);
                          }}
                          className={`text-[10px] md:text-xs tracking-[0.22em] uppercase font-semibold pb-1 border-b transition-all duration-300 inline-flex items-center gap-1.5 cursor-pointer ${
                            isHovered
                              ? 'border-[#B23A2A] text-[#B23A2A]'
                              : 'border-[#1B1917] text-[#1B1917]'
                          }`}
                        >
                          <span>READ THE CASE STUDY</span>
                          <span
                            className={`text-xs transition-transform duration-300 ${
                              isHovered ? 'translate-x-1.5' : ''
                            }`}
                          >
                            →
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Prominent Outcome Metric (Vermilion seal red) */}
                    <div className="md:col-span-3 flex flex-col md:items-end justify-start pt-2 md:pt-0">
                      <div
                        className={`font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight tabular-nums transition-all duration-300 text-[#B23A2A] ${
                          isHovered
                            ? 'scale-105 drop-shadow-[0_2px_8px_rgba(178,58,42,0.25)]'
                            : ''
                        }`}
                      >
                        {study.highlightMetric}
                      </div>
                      <div className="text-[11px] md:text-xs text-[#7E786E] font-medium tracking-wide mt-1 md:text-right">
                        {study.highlightLabel}
                      </div>
                    </div>

                  </div>
                </article>
              </React.Fragment>
            );
          })}

          {/* Bottom closing ink brush divider */}
          <BrushDivider intensity="medium" />
        </div>
      </div>
    </section>
  );
};

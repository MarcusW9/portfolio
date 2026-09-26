import React, { useEffect } from 'react';
import { CaseStudy } from '../data/portfolioData.ts';
import { BrushDivider } from './BrushDivider.tsx';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ study, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (study) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [study, onClose]);

  if (!study) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 animate-fadeIn"
    >
      {/* Backdrop with frosted parchment blur */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#1B1917]/50 backdrop-blur-sm cursor-pointer transition-opacity"
      />

      {/* Sword-cut diagonal slash light beam (剑气) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 flex items-center justify-center">
        <div className="w-[180%] h-1.5 bg-gradient-to-r from-transparent via-[#F2EDE4] to-transparent shadow-[0_0_15px_rgba(255,255,255,0.9),0_0_30px_rgba(178,58,42,0.8)] animate-slash-line" />
      </div>

      {/* Modal Surface with sword-cut wipe entrance */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F2EDE4] border border-[#1B1917]/15 shadow-2xl p-6 sm:p-10 md:p-14 text-[#1B1917] bg-parchment-texture animate-sword-cut">
        {/* Top bar with unboxed category & close action */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1B1917]/10">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase font-semibold text-[#7E786E]">
            <span>{study.client}</span>
            <span>·</span>
            <span>{study.role}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Case Study"
            className="p-1.5 text-[#555047] hover:text-[#1B1917] hover:rotate-90 transition-all cursor-pointer font-serif text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* Title & Highlight Stat */}
        <div className="pt-8 pb-4">
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
            <h2 id="modal-title" className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.1] max-w-2xl">
              {study.title}
            </h2>
            <div className="md:text-right shrink-0">
              <span className="font-serif text-3xl sm:text-4xl text-[#B23A2A] font-light tabular-nums">
                {study.highlightMetric}
              </span>
              <span className="block text-[11px] tracking-wider text-[#7E786E] uppercase">
                {study.highlightLabel}
              </span>
            </div>
          </div>
        </div>

        <BrushDivider intensity="medium" className="my-2" />

        {/* Case Study Overview & Context */}
        <div className="space-y-8 pt-4">
          <div>
            <h3 className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#7E786E] mb-2">
              THE CONTEXT & BOTTLENECK
            </h3>
            <p className="text-base sm:text-lg font-serif text-[#332E29] leading-relaxed">
              {study.overview}
            </p>
            <p className="text-sm md:text-[15px] text-[#555047] font-light leading-relaxed mt-3">
              {study.problem}
            </p>
          </div>

          {/* Strategy & Architectural Pillars */}
          <div>
            <h3 className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#7E786E] mb-4">
              PRODUCT STRATEGY & EXECUTION
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {study.strategy.map((item, idx) => {
                const [headline, detail] = item.split(': ');
                return (
                  <div key={idx} className="p-4 bg-[#EAE3D6]/50 border-t-2 border-[#1B1917] space-y-1.5">
                    <span className="font-serif text-base font-medium text-[#1B1917] block">
                      {headline}
                    </span>
                    <p className="text-xs text-[#555047] leading-relaxed font-light">
                      {detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Measurable Outcomes */}
          <div>
            <h3 className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#7E786E] mb-4">
              MEASURABLE OUTCOMES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4 border-y border-[#1B1917]/10">
              {study.outcomes.map((outcome, idx) => (
                <div key={idx}>
                  <div className="font-serif text-2xl sm:text-3xl font-light text-[#1B1917] tabular-nums">
                    {outcome.stat}
                  </div>
                  <div className="text-xs text-[#555047] font-light mt-1">
                    {outcome.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Close Action Button */}
          <div className="pt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-xs tracking-[0.2em] uppercase font-semibold text-[#1B1917] border border-[#1B1917] hover:bg-[#1B1917] hover:text-[#F2EDE4] transition-colors cursor-pointer"
            >
              CLOSE CASE STUDY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

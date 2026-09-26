import React, { useState } from 'react';
import { METRICS, MetricItem } from '../data/portfolioData.ts';

export const AboutSection: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<MetricItem | null>(null);

  return (
    <section id="about" className="relative py-20 md:py-28 border-t border-[#1B1917]/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12 md:mb-16 select-none">
          <div className="flex items-center gap-3">
            <span className="text-[#1B1917] font-serif text-lg">⟶</span>
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-[#1B1917]">
              The path so far
            </h2>
          </div>
          <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#7E786E] font-medium">
            ABOUT
          </span>
        </div>

        {/* Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 mb-16 md:mb-20">
          <div className="lg:col-span-8">
            <p className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] leading-[1.12] text-[#1B1917] font-normal [text-wrap:balance]">
              I build products from nothing, <span className="italic font-normal">then</span> the teams and systems that let them grow.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-sm md:text-[15px] leading-relaxed text-[#555047] font-light max-w-md">
              Senior Product Manager in London. Marketplaces, 0→1 platforms and AI-led delivery, from a 50-year-old retailer&apos;s first marketplace to a six-week AI-built platform.
            </p>
          </div>
        </div>

        {/* Metrics Bar with clean dividers and tabular numerals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 border-y border-[#1B1917]/10 py-8 md:divide-x md:divide-[#1B1917]/10">
          {METRICS.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMetric(activeMetric?.id === item.id ? null : item)}
              className="px-2 md:px-6 py-2 group cursor-pointer transition-colors"
            >
              <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1B1917] tabular-nums tracking-tight group-hover:text-[#B23A2A] transition-colors">
                {item.value}
              </div>
              <div className="mt-2 text-xs md:text-sm text-[#454038] font-medium">
                {item.label}
              </div>
              <div className="text-[11px] text-[#7E786E] mt-0.5 font-light">
                {item.sublabel}
              </div>

              {/* Expandable note on click */}
              {activeMetric?.id === item.id && (
                <div className="mt-3 text-xs leading-relaxed text-[#555047] p-2.5 bg-[#EAE3D6]/70 rounded-xs border-l-2 border-[#B23A2A] animate-fadeIn">
                  {item.detail}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

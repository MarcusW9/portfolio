import React from 'react';
import { SIDE_PROJECTS } from '../data/portfolioData.ts';
import { BrushDivider } from './BrushDivider.tsx';
import zilingVillage from '../assets/images/ziling-village.jpg';

const SCREENSHOTS: Record<string, string> = {
  'ziling-village': zilingVillage,
};

export const SideProjects: React.FC = () => {
  return (
    <section id="projects" className="relative py-20 md:py-28 border-t border-[#1B1917]/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10 select-none">
          <div className="flex items-center gap-3">
            <span className="text-[#1B1917] font-serif text-xl">✎</span>
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-[#1B1917]">
              Side projects
            </h2>
          </div>
          <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#7E786E] font-medium">
            BUILT FOR FUN
          </span>
        </div>

        <BrushDivider intensity="deep" />

        {SIDE_PROJECTS.map((project) => (
          <article
            key={project.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start py-8 md:py-12"
          >
            {/* Narrative */}
            <div className="lg:col-span-6">
              <div className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#7E786E] mb-2.5">
                {project.label}
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-tight font-normal text-[#1B1917] mb-4">
                {project.title}{' '}
                <span lang="zh-Hans" className="text-[#7E786E]">{project.hanzi}</span>
              </h3>

              <p className="text-sm md:text-[15px] leading-relaxed text-[#555047] font-light mb-6 max-w-xl">
                {project.summary}
              </p>

              <ul className="space-y-4 mb-8 max-w-xl">
                {project.decisions.map((item) => {
                  const splitAt = item.indexOf(': ');
                  const headline = splitAt === -1 ? item : item.slice(0, splitAt);
                  const detail = splitAt === -1 ? '' : item.slice(splitAt + 2);
                  return (
                    <li key={headline} className="border-l-2 border-[#1B1917]/15 pl-4">
                      <span className="font-serif text-base md:text-lg text-[#1B1917] block">
                        {headline}
                      </span>
                      <span className="text-xs md:text-sm text-[#555047] font-light leading-relaxed">
                        {detail}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-[10px] md:text-xs tracking-[0.22em] uppercase font-semibold">
                <a
                  href={project.playUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="pb-1 border-b border-[#1B1917] text-[#1B1917] hover:text-[#B23A2A] hover:border-[#B23A2A] transition-colors"
                >
                  PLAY THE GAME ↗
                </a>
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="pb-1 border-b border-[#1B1917]/30 text-[#655E54] hover:text-[#1B1917] hover:border-[#1B1917] transition-colors"
                >
                  GITHUB ↗
                </a>
                <span className="text-[#7E786E] font-medium normal-case tracking-normal">
                  {project.note}
                </span>
              </div>
            </div>

            {/* Screenshot */}
            <a
              href={project.playUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Play ${project.title}`}
              className="lg:col-span-6 order-first lg:order-none group block"
            >
              <img
                src={SCREENSHOTS[project.id]}
                alt={`${project.title}: a pixel-art Jiangnan water town with a canal, stone bridge, tea house, market stalls and villagers`}
                loading="lazy"
                className="w-full h-auto rounded-sm border border-[#1B1917]/15 shadow-sm transition-transform duration-500 group-hover:-translate-y-1"
              />
            </a>
          </article>
        ))}

        <BrushDivider intensity="medium" />
      </div>
    </section>
  );
};

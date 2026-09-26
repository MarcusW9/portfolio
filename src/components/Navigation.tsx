import React, { useState, useEffect } from 'react';
import { SealChop } from './SealChop.tsx';

interface NavigationProps {
  onContactClick: () => void;
  inkEnabled?: boolean;
  onToggleInk?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onContactClick
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#F2EDE4]/90 backdrop-blur-md border-b border-[#1B1917]/8 py-3.5 shadow-[0_4px_20px_rgba(30,28,26,0.03)]'
          : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark & Seal Chop */}
        <div className="flex items-center gap-3">
          <SealChop
            size="md"
            label="MW"
            stampOnMount={true}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-left group cursor-pointer focus-visible:outline-none"
          >
            <span className="font-serif text-lg md:text-xl font-medium tracking-tight text-[#1B1917] group-hover:text-[#B23A2A] transition-colors">
              Marcus Wong
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Pure typography, no pill enclosures) */}
        <nav
          aria-label="Main Navigation"
          className="flex items-center gap-7 md:gap-10 text-[11px] md:text-xs tracking-[0.2em] font-medium uppercase text-[#555047]"
        >
          <button
            onClick={() => scrollToSection('work')}
            className="relative py-1 hover:text-[#1B1917] transition-colors cursor-pointer group"
          >
            <span>WORK</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#1B1917] transition-all duration-300 group-hover:w-full" />
          </button>

          <button
            onClick={() => scrollToSection('approach')}
            className="relative py-1 hover:text-[#1B1917] transition-colors cursor-pointer group"
          >
            <span>APPROACH</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#1B1917] transition-all duration-300 group-hover:w-full" />
          </button>

          <button
            onClick={() => scrollToSection('about')}
            className="relative py-1 hover:text-[#1B1917] transition-colors cursor-pointer group hidden sm:inline-block"
          >
            <span>STORY</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#1B1917] transition-all duration-300 group-hover:w-full" />
          </button>

          <button
            onClick={onContactClick}
            className="relative py-1 hover:text-[#1B1917] transition-colors cursor-pointer group"
          >
            <span>CONTACT</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B23A2A] transition-all duration-300 group-hover:w-full" />
          </button>
        </nav>
      </div>
    </header>
  );
};

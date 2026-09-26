import React, { useState } from 'react';
import { SealChop } from './SealChop.tsx';

interface ContactSectionProps {
  onOpenContactModal?: () => void;
  scrollY?: number;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ scrollY = 0 }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    // Dynamically assemble address to prevent bot scrapers from harvesting static text/href
    const parts = ['marcus', 'wsy', 'wong', '@', 'gmail', '.', 'com'];
    navigator.clipboard.writeText(parts.join(''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2600);
  };

  return (
    <section id="contact" className="relative pt-24 md:pt-32 pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 md:pb-28">
          
          {/* Left Column: Heading, Subtext & Links */}
          <div className="lg:col-span-8">
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-[#1B1917] leading-[0.96] mb-6">
              Let&apos;s talk.
            </h2>

            <p className="font-serif text-xl sm:text-2xl text-[#454038] font-light max-w-lg mb-8 leading-snug">
              Open to Senior and Lead product roles.
            </p>

            {/* Social & Profile Links */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-[11px] sm:text-xs tracking-[0.22em] uppercase font-semibold text-[#1B1917]">
              <a
                href="https://www.linkedin.com/in/marcus-wong-0451a817b/"
                target="_blank"
                rel="noreferrer noopener"
                className="group relative pb-1 text-[#655E54] hover:text-[#1B1917] transition-colors inline-flex items-center gap-1"
              >
                <span>LINKEDIN</span>
                <span className="text-xs leading-none">↗</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1B1917]/30 group-hover:bg-[#1B1917] transition-colors" />
              </a>

              <a
                href="https://github.com/MarcusW9"
                target="_blank"
                rel="noreferrer noopener"
                className="group relative pb-1 text-[#655E54] hover:text-[#1B1917] transition-colors inline-flex items-center gap-1"
              >
                <span>GITHUB</span>
                <span className="text-xs leading-none">↗</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1B1917]/30 group-hover:bg-[#1B1917] transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Column: Prominent Red Vermilion Seal Impression - Stamps & copies email on click */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end items-center pt-2">
            <div
              className="relative group cursor-pointer flex flex-col items-center lg:items-end select-none"
              onClick={handleCopyEmail}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCopyEmail();
                }
              }}
              title="Click seal to copy email address"
            >
              <div className="relative">
                <SealChop
                  size="lg"
                  label="MW"
                  stampedText={copied ? 'COPIED' : 'MW'}
                  stampOnMount={copied}
                  className={`transform transition-transform duration-300 ${
                    copied ? 'scale-110 rotate-[-3deg]' : 'hover:scale-105 rotate-1'
                  }`}
                />
                {copied && (
                  <span className="absolute -top-3 -right-2 text-[9px] bg-[#1B1917] text-[#F2EDE4] px-1.5 py-0.5 tracking-wider uppercase shadow-md animate-fadeIn">
                    STAMPED
                  </span>
                )}
              </div>
              <span className="block text-[10px] tracking-[0.2em] uppercase text-[#7E786E] font-medium mt-3 text-center lg:text-right transition-colors group-hover:text-[#1B1917]">
                {copied ? 'EMAIL COPIED · STAMP APPLIED' : 'CLICK SEAL TO COPY EMAIL'}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

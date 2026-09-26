/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navigation } from './components/Navigation.tsx';
import { Hero } from './components/Hero.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { SelectedWork } from './components/SelectedWork.tsx';
import { ApproachSection } from './components/ApproachSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { FluidScrollRibbon } from './components/FluidScrollRibbon.tsx';
import { InkDiffusionCanvas } from './components/InkDiffusionCanvas.tsx';
import { InkWashFooter } from './components/InkWashFooter.tsx';
import { CaseStudyModal } from './components/CaseStudyModal.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { CaseStudy } from './data/portfolioData.ts';

export default function App() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleScrollToWork = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F2EDE4] text-[#1B1917] selection:bg-[#B23A2A]/20 selection:text-[#B23A2A] bg-parchment-texture overflow-x-hidden">
      {/* Ambient Ink Dispersion on click across the rest of the page */}
      <InkDiffusionCanvas enabled={true} />

      {/* Fluid Calligraphic Scroll Ribbon (Directly echoing Image 3) */}
      <div className="fixed right-0 md:right-4 top-0 bottom-0 w-16 md:w-24 pointer-events-none z-20">
        <FluidScrollRibbon className="w-full h-full" />
      </div>

      {/* Top Bar Navigation */}
      <Navigation
        onContactClick={handleScrollToContact}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          onViewWork={handleScrollToWork}
          onContactClick={handleScrollToContact}
        />

        <AboutSection />

        <SelectedWork onSelectCaseStudy={(study) => setSelectedCaseStudy(study)} />

        <ApproachSection />

        <ContactSection />
      </main>

      {/* Ink-wash footer extending organically from bottom of page */}
      <InkWashFooter />

      {/* Modals */}
      <CaseStudyModal
        study={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

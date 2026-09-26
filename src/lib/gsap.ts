import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** True when the visitor has asked their device to minimise motion. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Brush-like eases, mirroring the cubic-bezier tokens in index.css. */
export const EASE = {
  strike: 'expo.out',
  drag: 'power3.out',
  bleed: 'power4.out',
  feibai: 'power2.out',
};

export { gsap, ScrollTrigger, useGSAP };

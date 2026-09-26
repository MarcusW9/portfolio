import React, { useEffect, useRef, useState } from 'react';

interface BrushDividerProps {
  className?: string;
  intensity?: 'subtle' | 'medium' | 'deep';
}

export const BrushDivider: React.FC<BrushDividerProps> = ({
  className = '',
  intensity = 'medium'
}) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Draw in once only
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
          className={`transition-all duration-1000 ease-out origin-left ${
            isInView ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
          }`}
          style={{ transformOrigin: '0% 50%' }}
        />
        {/* Fine dry-brush bristle wisps (飞白) drawing in like an ink brush stroke */}
        <path
          d="M80,9 C150,7 230,11 310,8 C420,5 510,10 620,8 C740,6 850,11 960,8 C1040,6 1110,9 1160,8"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="1200"
          strokeDashoffset={isInView ? '0' : '1200'}
          fill="none"
          className="transition-all duration-1200 delay-200 ease-out"
          opacity="0.6"
        />
        <path
          d="M140,15 C240,17 350,13 460,16 C570,18 680,14 790,17 C890,19 990,15 1070,16"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeDasharray="1200"
          strokeDashoffset={isInView ? '0' : '1200'}
          fill="none"
          className="transition-all duration-1000 delay-300 ease-out"
          opacity="0.4"
        />
      </svg>
    </div>
  );
};

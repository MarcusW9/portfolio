import React, { useState } from 'react';

interface SealChopProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  onClick?: () => void;
  className?: string;
  stampOnMount?: boolean;
  stampedText?: string | null;
}

export const SealChop: React.FC<SealChopProps> = ({
  size = 'md',
  label = 'MW',
  onClick,
  className = '',
  stampOnMount = false,
  stampedText = null
}) => {
  const [pressed, setPressed] = useState(false);

  const sizeClasses = {
    sm: 'w-7 h-7 text-[10px] tracking-tighter',
    md: 'w-10 h-10 text-xs tracking-tight',
    lg: 'w-16 h-16 text-lg tracking-normal'
  };

  const handlePress = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 280);
    onClick?.();
  };

  const displayLabel = stampedText || label;

  return (
    <button
      type="button"
      onClick={handlePress}
      aria-label="Marcus Wong Seal Impression"
      className={`relative inline-flex items-center justify-center font-serif font-bold text-[#F5EFEB] select-none transition-transform duration-200 cursor-pointer ${sizeClasses[size]} ${
        stampOnMount ? 'animate-seal-stamp' : ''
      } ${pressed ? 'scale-90 rotate-[-2deg]' : 'hover:scale-[1.04]'} ${className}`}
      title="Marcus Wong · 印"
    >
      {/* Background Seal Body with weathered organic stamp edges */}
      <span
        className="absolute inset-0 bg-[#B23A2A] shadow-sm transition-colors duration-300"
        style={{
          clipPath: `polygon(
            2% 2%, 14% 0%, 36% 2%, 62% 0%, 88% 3%, 98% 1%,
            100% 20%, 97% 48%, 99% 74%, 97% 98%,
            78% 99%, 46% 97%, 18% 100%, 2% 98%,
            0% 78%, 3% 52%, 1% 22%
          )`,
          boxShadow: 'inset 0 0 4px rgba(0, 0, 0, 0.35), 0 1px 2px rgba(178, 58, 42, 0.3)'
        }}
      />

      {/* Internal engraved border line like traditional Chinese stone chops */}
      <span
        aria-hidden="true"
        className="absolute inset-[2.5px] border border-[#F5EFEB]/40 pointer-events-none"
        style={{
          clipPath: `polygon(
            1% 2%, 25% 1%, 50% 2%, 75% 0%, 99% 2%,
            98% 30%, 100% 60%, 98% 98%,
            70% 99%, 40% 97%, 15% 100%, 1% 98%,
            2% 70%, 0% 40%, 2% 15%
          )`
        }}
      />

      {/* Weathered flecks */}
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 25%, white 1px, transparent 1.5px),
                            radial-gradient(circle at 75% 70%, black 1px, transparent 1.5px)`
        }}
      />

      {/* Carved Monogram */}
      <span className="relative z-10 font-serif font-black tracking-wider leading-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
        {displayLabel}
      </span>
    </button>
  );
};

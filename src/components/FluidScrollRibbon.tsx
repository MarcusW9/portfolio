import React, { useEffect, useRef } from 'react';

interface FluidScrollRibbonProps {
  className?: string;
  scrollProgress: number; // 0 to 1
}

export const FluidScrollRibbon: React.FC<FluidScrollRibbonProps> = ({
  className = '',
  scrollProgress
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      time += 0.015;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Base path calculation: Sinuous winding Chinese calligraphy line
      const steps = 180;
      const activeLength = Math.max(0.15, Math.min(1, scrollProgress * 1.15 + 0.1));
      const visibleSteps = Math.floor(steps * activeLength);

      const centerX = width / 2;

      // Draw overlapping fluid ink calligraphy loops (directly mirroring Image 3)
      for (let i = 0; i < visibleSteps; i++) {
        const t = i / steps;
        const y = t * height;

        // Dynamic fluid wave harmonics
        const wave1 = Math.sin(t * Math.PI * 4 + time * 0.4) * (width * 0.3);
        const wave2 = Math.sin(t * Math.PI * 7 - time * 0.25) * (width * 0.12);
        const x = centerX + wave1 + wave2;

        // Radius variations along the spine
        const baseRadius = 9 + Math.sin(t * Math.PI * 5 + time) * 5;
        const progressFade = Math.sin(t * Math.PI);
        const loopRadiusX = baseRadius * (1.2 + 0.5 * Math.cos(t * Math.PI * 8));
        const loopRadiusY = baseRadius * 0.65;

        // Ink tone: dark core with sumi-e translucent outer bleed
        const depthAlpha = 0.08 + 0.18 * Math.pow(Math.sin(t * Math.PI * 3 + time * 0.5), 2);
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.sin(t * Math.PI * 6 + time) * 0.4);

        // Outer ink wash halo
        ctx.beginPath();
        ctx.ellipse(0, 0, loopRadiusX * 1.6, loopRadiusY * 1.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(35, 30, 26, ${depthAlpha * 0.25})`;
        ctx.fill();

        // Inner calligraphic brush rings
        ctx.beginPath();
        ctx.ellipse(0, 0, loopRadiusX, loopRadiusY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(27, 25, 23, ${depthAlpha * 1.5})`;
        ctx.lineWidth = 0.85;
        ctx.stroke();

        // Dense core filament
        if (i % 2 === 0) {
          ctx.beginPath();
          ctx.arc(0, 0, loopRadiusX * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(20, 18, 16, ${depthAlpha * 1.8})`;
          ctx.fill();
        }

        ctx.restore();
      }

      // Leading brush tip bead (the flowing brush head)
      if (visibleSteps > 0 && visibleSteps < steps) {
        const tTip = visibleSteps / steps;
        const tipY = tTip * height;
        const tipX = centerX + Math.sin(tTip * Math.PI * 4 + time * 0.4) * (width * 0.3) + Math.sin(tTip * Math.PI * 7 - time * 0.25) * (width * 0.12);

        ctx.save();
        ctx.translate(tipX, tipY);
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(27, 25, 23, 0.85)';
        ctx.fill();

        // Gentle ink diffusion wisp at brush tip
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(27, 25, 23, 0.15)';
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollProgress]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      title="Ink Meridian Flow"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60 hover:opacity-90 transition-opacity duration-700"
      />
    </div>
  );
};

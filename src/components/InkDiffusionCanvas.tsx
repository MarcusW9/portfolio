import React, { useEffect, useRef } from 'react';

interface InkDrop {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
  points: { angle: number; dist: number }[];
}

interface InkDiffusionCanvasProps {
  enabled?: boolean;
}

export const InkDiffusionCanvas: React.FC<InkDiffusionCanvasProps> = ({ enabled = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dropsRef = useRef<InkDrop[]>([]);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleClick = (e: MouseEvent) => {
      // Check if click occurred outside the hero section
      const heroEl = document.querySelector('section');
      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect();
        const isInHero =
          e.clientX >= heroRect.left &&
          e.clientX <= heroRect.right &&
          e.clientY >= heroRect.top &&
          e.clientY <= heroRect.bottom;

        // If inside hero, the HeroInkCanvas already handles it with calligraphic precision
        if (isInHero) return;
      }

      // Create organic blooming ink drop with randomized fibrous jagged edges
      const pointCount = 18;
      const points = [];
      for (let i = 0; i < pointCount; i++) {
        points.push({
          angle: (i / pointCount) * Math.PI * 2,
          dist: 0.75 + Math.random() * 0.5
        });
      }

      dropsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 3.5,
        maxRadius: 26 + Math.random() * 16,
        alpha: 0.20, // Light and soft, matching paper parchment
        speed: 0.75 + Math.random() * 0.35,
        points
      });

      // Keep max 10 drops
      if (dropsRef.current.length > 10) {
        dropsRef.current.shift();
      }
    };

    window.addEventListener('click', handleClick);

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = dropsRef.current.length - 1; i >= 0; i--) {
        const drop = dropsRef.current[i];
        drop.radius += drop.speed;
        drop.alpha *= 0.978;

        if (drop.alpha < 0.005 || drop.radius > drop.maxRadius) {
          dropsRef.current.splice(i, 1);
          continue;
        }

        // Draw organic ink bloom with paper fiber bleed
        ctx.save();
        ctx.translate(drop.x, drop.y);
        ctx.beginPath();

        for (let j = 0; j < drop.points.length; j++) {
          const pt = drop.points[j];
          const r = drop.radius * pt.dist;
          const px = Math.cos(pt.angle) * r;
          const py = Math.sin(pt.angle) * r;
          if (j === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.closePath();

        // Soft, translucent warm ink wash
        const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, drop.radius);
        grad.addColorStop(0, `rgba(45, 40, 36, ${drop.alpha * 1.1})`);
        grad.addColorStop(0.6, `rgba(60, 52, 45, ${drop.alpha * 0.55})`);
        grad.addColorStop(1, 'rgba(70, 62, 54, 0)');

        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 w-full h-full mix-blend-multiply opacity-85"
    />
  );
};

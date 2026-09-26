import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap.ts';

interface StrokePoint {
  x: number;
  y: number;
  width: number;
  alpha: number;
  timestamp: number;
  hairs: { ox: number; oy: number; r: number; alphaOffset: number }[];
}

interface InkBloom {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  growSpeed: number;
  petals: { angle: number; dist: number }[];
}

interface HeroInkCanvasProps {
  heroRef: React.RefObject<HTMLElement | null>;
}

export const HeroInkCanvas: React.FC<HeroInkCanvasProps> = ({ heroRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    const heroEl = heroRef.current;
    const canvas = canvasRef.current;
    if (!heroEl || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Driven by the gsap ticker, and only while there is ink to draw
    let running = false;
    const wake = () => {
      if (running) return;
      running = true;
      gsap.ticker.add(render);
    };

    // Smooth spring lerp for silky brush feel
    let mouseX = -100;
    let mouseY = -100;
    let smoothX = -100;
    let smoothY = -100;
    let currentWidth = 11;
    let isInteracting = false;

    const strokes: StrokePoint[][] = [];
    let activeStroke: StrokePoint[] = [];
    const blooms: InkBloom[] = [];

    const resizeCanvas = () => {
      const rect = heroEl.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create delicate organic ink bloom on click
    const createBloom = (x: number, y: number, isMajor = false) => {
      const pointCount = isMajor ? 20 : 12;
      const petals = [];
      for (let i = 0; i < pointCount; i++) {
        petals.push({
          angle: (i / pointCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.25,
          dist: 0.65 + Math.random() * 0.55
        });
      }

      blooms.push({
        x,
        y,
        radius: isMajor ? 4 : 2.5,
        maxRadius: isMajor ? 38 + Math.random() * 18 : 16 + Math.random() * 10,
        // Softer, lighter translucent wash
        alpha: isMajor ? 0.22 : 0.14,
        growSpeed: isMajor ? 1.2 : 0.6,
        petals
      });

      if (blooms.length > 20) blooms.shift();
    };

    // Fine hair bristle positions for organic ink texture
    const createBristleHairs = (width: number) => {
      const hairs = [];
      const hairCount = Math.floor(Math.min(7, Math.max(3, width * 0.6)));
      for (let i = 0; i < hairCount; i++) {
        hairs.push({
          ox: (Math.random() - 0.5) * width * 0.75,
          oy: (Math.random() - 0.5) * width * 0.75,
          r: 0.6 + Math.random() * 1.0,
          alphaOffset: 0.6 + Math.random() * 0.4
        });
      }
      return hairs;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
        if (isInteracting && activeStroke.length > 0) {
          strokes.push(activeStroke);
          activeStroke = [];
        }
        isInteracting = false;
        return;
      }

      setHintVisible(false);
      wake();

      if (!isInteracting || smoothX < -50) {
        smoothX = x;
        smoothY = y;
        mouseX = x;
        mouseY = y;
        isInteracting = true;
        activeStroke = [];
      } else {
        mouseX = x;
        mouseY = y;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        setHintVisible(false);
        createBloom(x, y, true);
        wake();
        smoothX = x;
        smoothY = y;
        mouseX = x;
        mouseY = y;
      }
    };

    const handlePointerLeave = () => {
      if (activeStroke.length > 0) {
        strokes.push(activeStroke);
        activeStroke = [];
      }
      isInteracting = false;
    };

    heroEl.addEventListener('pointermove', handlePointerMove);
    heroEl.addEventListener('pointerdown', handlePointerDown);
    heroEl.addEventListener('pointerleave', handlePointerLeave);

    const render = () => {
      const rect = heroEl.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const now = performance.now();

      // 1. Spring physics for fluid brush smoothing
      if (isInteracting) {
        const dx = mouseX - smoothX;
        const dy = mouseY - smoothY;
        const speed = Math.hypot(dx, dy);

        smoothX += dx * 0.28;
        smoothY += dy * 0.28;

        // Tapered, elegant brush thickness
        const targetWidth = Math.max(3.0, Math.min(16, 17 - speed * 0.32));
        currentWidth += (targetWidth - currentWidth) * 0.18;

        const lastPt = activeStroke[activeStroke.length - 1];
        const stepDist = lastPt ? Math.hypot(smoothX - lastPt.x, smoothY - lastPt.y) : 999;

        if (stepDist > 3.0) {
          activeStroke.push({
            x: smoothX,
            y: smoothY,
            width: currentWidth,
            // Much lighter & ethereal translucent sumi-e value
            alpha: 0.20,
            timestamp: now,
            hairs: createBristleHairs(currentWidth)
          });

          // Occasional gentle ink fleck on brisk strokes
          if (speed > 32 && Math.random() > 0.85) {
            createBloom(
              smoothX + (Math.random() - 0.5) * currentWidth * 1.4,
              smoothY + (Math.random() - 0.5) * currentWidth * 1.4,
              false
            );
          }
        }
      }

      // 2. Blooming ink washes (light tea/water wash gradient)
      for (let i = blooms.length - 1; i >= 0; i--) {
        const b = blooms[i];
        b.radius += b.growSpeed;
        b.alpha *= 0.984;

        if (b.alpha < 0.004 || b.radius > b.maxRadius) {
          blooms.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.beginPath();
        for (let j = 0; j < b.petals.length; j++) {
          const petal = b.petals[j];
          const r = b.radius * petal.dist;
          const px = Math.cos(petal.angle) * r;
          const py = Math.sin(petal.angle) * r;
          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, b.radius);
        grad.addColorStop(0, `rgba(45, 40, 36, ${b.alpha * 1.1})`);
        grad.addColorStop(0.55, `rgba(60, 52, 45, ${b.alpha * 0.55})`);
        grad.addColorStop(1, 'rgba(70, 62, 54, 0)');

        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }

      // 3. Render strokes: delicate, translucent calligraphy
      const drawStrokeSegment = (pts: StrokePoint[]) => {
        if (pts.length < 2) return;

        // Pass 1: Soft Sumi-e water wash bleed (feathery outer halo)
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 1; i < pts.length; i++) {
          const pPrev = pts[i - 1];
          const pCurr = pts[i];

          const mx = (pPrev.x + pCurr.x) / 2;
          const my = (pPrev.y + pCurr.y) / 2;

          ctx.beginPath();
          ctx.moveTo(pPrev.x, pPrev.y);
          ctx.quadraticCurveTo(pPrev.x, pPrev.y, mx, my);

          const w = (pPrev.width + pCurr.width) / 2;
          const a = ((pPrev.alpha + pCurr.alpha) / 2) * 0.38;

          ctx.lineWidth = w * 1.5;
          ctx.strokeStyle = `rgba(68, 60, 52, ${a})`;
          ctx.stroke();
        }
        ctx.restore();

        // Pass 2: Main calligraphic body (soft charcoal/warm ink, never harsh pure black)
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 1; i < pts.length; i++) {
          const pPrev = pts[i - 1];
          const pCurr = pts[i];

          const mx = (pPrev.x + pCurr.x) / 2;
          const my = (pPrev.y + pCurr.y) / 2;

          ctx.beginPath();
          ctx.moveTo(pPrev.x, pPrev.y);
          ctx.quadraticCurveTo(pPrev.x, pPrev.y, mx, my);

          const w = (pPrev.width + pCurr.width) / 2;
          const a = (pPrev.alpha + pCurr.alpha) / 2;

          ctx.lineWidth = w * 0.85;
          ctx.strokeStyle = `rgba(40, 36, 32, ${a})`;
          ctx.stroke();
        }
        ctx.restore();

        // Pass 3: Subtle bristle hair flecks
        ctx.save();
        for (let i = 0; i < pts.length; i += 2) {
          const p = pts[i];
          const hairs = p.hairs;
          for (let h = 0; h < hairs.length; h++) {
            const hair = hairs[h];
            ctx.beginPath();
            ctx.arc(p.x + hair.ox, p.y + hair.oy, hair.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(45, 38, 34, ${p.alpha * hair.alphaOffset * 0.4})`;
            ctx.fill();
          }
        }
        ctx.restore();
      };

      // Draw archived strokes & age them
      for (let s = strokes.length - 1; s >= 0; s--) {
        const stroke = strokes[s];
        drawStrokeSegment(stroke);

        for (let i = stroke.length - 1; i >= 0; i--) {
          stroke[i].alpha *= 0.980;
          stroke[i].width *= 1.004;
          if (stroke[i].alpha < 0.004) {
            stroke.splice(i, 1);
          }
        }

        if (stroke.length === 0) {
          strokes.splice(s, 1);
        }
      }

      // Draw active stroke
      if (activeStroke.length > 1) {
        drawStrokeSegment(activeStroke);

        for (let i = activeStroke.length - 1; i >= 0; i--) {
          activeStroke[i].alpha *= 0.988;
          activeStroke[i].width *= 1.003;
          if (activeStroke[i].alpha < 0.004) {
            activeStroke.splice(i, 1);
          }
        }
      }

      // Fall asleep once the ink has faded and the brush is off the paper
      if (!isInteracting && strokes.length === 0 && activeStroke.length === 0 && blooms.length === 0) {
        gsap.ticker.remove(render);
        running = false;
      }
    };

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      heroEl.removeEventListener('pointermove', handlePointerMove);
      heroEl.removeEventListener('pointerdown', handlePointerDown);
      heroEl.removeEventListener('pointerleave', handlePointerLeave);
      gsap.ticker.remove(render);
    };
  }, [heroRef]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-10 w-full h-full mix-blend-multiply opacity-85"
      />
      {hintVisible && (
        <div className="absolute bottom-6 right-8 pointer-events-none z-20 hidden md:flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#7E786E]/80 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B23A2A]" />
          <span>Move cursor or click to brush ink · 墨意</span>
        </div>
      )}
    </>
  );
};

'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, BookOpen } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';

// A minimal generative art element — slowly drifting connected dots
function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    interface Point {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    }

    let points: Point[] = [];
    const TERRACOTTA = '#F4727E';

    const resize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || 400;
      canvas.width = width;
      canvas.height = height;
    };

    const init = () => {
      resize();
      const count = Math.min(Math.floor(width / 80), 12);
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      const maxDist = 180;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15;
            ctx.strokeStyle = TERRACOTTA;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of points) {
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = TERRACOTTA;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener('resize', init);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

const exploreCards = [
  { href: '/work', label: 'Work', tags: 'AI · Startups · Engineering' },
  { href: '/research', label: 'Research', tags: 'Physics · Elections · Universality' },
  { href: '/writing', label: 'Writing', tags: 'Essays · Thoughts · Words' },
  { href: '/photos', label: 'Photos', tags: 'Moments · Places · Light' },
];

export default function HomePage() {
  return (
    <PageWrapper>
      {/* Hero — barnali-style: photo left, name + tagline right, minimal */}
      <section className="relative min-h-screen -mt-14 pt-0 grid md:grid-cols-2">
        {/* Photo — fills left half, bleeds behind nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative hidden md:block order-2"
        >
          <Image
            src="/ritam-silhouette.jpg"
            alt="Ritam Pal"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#fafafa] to-transparent" />
        </motion.div>

        {/* Text — right side, like barnali: just name, tagline, contact */}
        <div className="relative flex items-center order-1 md:order-1">
          <div className="absolute inset-0 overflow-hidden">
            <ConstellationCanvas />
          </div>

          <div className="relative z-10 px-6 md:px-16 py-32 md:py-0">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold tracking-tight text-[#1a1a1a] leading-[1.05]"
            >
              Ritam<br />Pal
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 text-xs text-[#4a4a4a] tracking-[0.2em] uppercase"
            >
              AI Researcher &middot; Physicist &middot; Builder
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 space-y-2"
            >
              <a
                href="mailto:ritam@untitled.life"
                className="flex items-center gap-2 text-sm text-[#4a4a4a] hover:text-terracotta transition-colors"
              >
                <Mail size={14} />
                ritam@untitled.life
              </a>
              <a
                href="https://scholar.google.com/citations?user=9_ndyPcAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#4a4a4a] hover:text-terracotta transition-colors"
              >
                <BookOpen size={14} />
                Google Scholar
              </a>
            </motion.div>
          </div>
        </div>

        {/* Mobile: photo as tight banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:hidden order-first relative h-48 overflow-hidden"
        >
          <Image
            src="/ritam-silhouette.jpg"
            alt="Ritam Pal"
            fill
            className="object-cover object-top scale-110"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#fafafa] to-transparent" />
        </motion.div>
      </section>

      {/* Explore cards — barnali-style grid */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-8">Explore</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-200">
          {exploreCards.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
            >
              <Link
                href={item.href}
                className="block bg-[#fafafa] hover:bg-white p-8 h-full transition-colors group border-l-2 border-l-transparent hover:border-l-terracotta"
              >
                <span className="text-xs text-neutral-300 font-light">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-[#1a1a1a] group-hover:text-terracotta transition-colors">
                  {item.label}
                </h3>
                <p className="mt-2 text-xs text-neutral-400">
                  {item.tags}
                </p>
                <p className="mt-6 text-xs font-medium text-neutral-400 group-hover:text-terracotta transition-colors flex items-center gap-1">
                  ENTER <ArrowRight size={10} />
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}

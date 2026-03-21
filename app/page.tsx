'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
  { href: '/work', label: 'Work', desc: 'What I build' },
  { href: '/research', label: 'Research', desc: 'What I proved' },
  { href: '/writing', label: 'Writing', desc: 'What I think' },
  { href: '/photos', label: 'Photos', desc: 'What I see' },
];

export default function HomePage() {
  return (
    <PageWrapper>
      {/* Hero — text aligned to nav, photo fills to right edge */}
      <section className="relative min-h-[calc(100vh-3.5rem)] grid md:grid-cols-2">
        {/* Text — left side, content aligned to nav width */}
        <div className="relative flex items-center justify-end py-20 md:py-0">
          {/* Constellation background on text side */}
          <div className="absolute inset-0 overflow-hidden">
            <ConstellationCanvas />
          </div>

            <div className="relative z-10 max-w-md pl-6 pr-8 md:pl-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))]">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold tracking-tight text-[#1a1a1a] leading-[1.1]"
              >
                Ritam Pal
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-4 text-sm text-[#4a4a4a] tracking-widest uppercase"
              >
                AI Researcher &middot; Physicist &middot; Builder
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 text-base md:text-lg text-[#3a3a3a] leading-relaxed"
              >
                Asking dumb questions about statistical physics, elections,
                AI, and everything in between. Sometimes the answers
                turn into papers, sometimes into products, sometimes into
                nothing at all.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.48 }}
                className="mt-4 text-sm text-neutral-400 italic"
              >
                Lost in life.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-terracotta text-white text-sm rounded-md hover:bg-terracotta-dark transition-colors"
                >
                  See my work <ArrowRight size={14} />
                </Link>
                <Link
                  href="/about#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-300 text-sm rounded-md text-[#4a4a4a] hover:border-terracotta hover:text-terracotta transition-colors"
                >
                  Get in touch
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-6 flex items-center gap-4 text-xs text-neutral-400"
              >
                <span>Research Lead at <span className="text-terracotta">Conscious Engines</span></span>
                <span>&middot;</span>
                <span>Founder of <span className="text-terracotta">untitled.life</span></span>
              </motion.div>
            </div>
          </div>

          {/* Photo — fills entire right half to viewport edge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden md:block"
          >
            <Image
              src="/ritam-silhouette.jpg"
              alt="Ritam Pal"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Gradient fade from left (text side) into photo */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#fafafa] to-transparent" />
          </motion.div>

        {/* Mobile: show photo as banner, tight crop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:hidden -order-1 absolute top-0 left-0 right-0 h-44 overflow-hidden"
        >
          <Image
            src="/ritam-silhouette.jpg"
            alt="Ritam Pal"
            fill
            className="object-cover object-top scale-125"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#fafafa] to-transparent" />
        </motion.div>
      </section>

      {/* Numbered explore cards */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {exploreCards.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
            >
              <Link
                href={item.href}
                className="block p-6 rounded-lg bg-[#f5f5f5] hover:bg-[#eeeeee] transition-colors group"
              >
                <span className="text-xs font-medium text-terracotta tracking-wider">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-[#1a1a1a] group-hover:text-terracotta transition-colors">
                  {item.label}
                </h3>
                <p className="mt-1 text-xs text-[#4a4a4a]">
                  {item.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}

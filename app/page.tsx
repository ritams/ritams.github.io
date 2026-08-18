'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';

const exploreCards = [
  { href: '/work', label: 'Work', tags: 'AI · Startups · Engineering' },
  { href: '/research', label: 'Research', tags: 'Physics · Elections · Universality' },
  { href: '/writing', label: 'Writing', tags: 'Essays · Thoughts · Words' },
  { href: '/photos', label: 'Photos', tags: 'Moments · Places · Light' },
];

export default function HomePage() {
  return (
    <PageWrapper>
      {/* Hero — desktop: image 3/5 width right as background; mobile: image block then text, all in 100vh */}

      {/* === DESKTOP HERO === */}
      <section className="relative min-h-screen -mt-14 hidden md:block">
        {/* Background image — 3/5 width, right-aligned */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 bottom-0"
          style={{ width: '60%' }}
        >
          <Image
            src="/ritam-silhouette.jpg"
            alt="Ritam Pal"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 15%' }}
            priority
          />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#fafafa] to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 min-h-screen flex flex-col justify-end pb-32">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-8xl font-bold tracking-tight text-[#1a1a1a] leading-[1.05]"
          >
            Ritam Pal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-4 text-lg text-[#3a3a3a] max-w-md"
          >
            Lost in life, asking dumb questions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex gap-4"
          >
            <Link href="/work" className="inline-flex items-center gap-2 px-6 py-2.5 bg-terracotta text-white text-sm font-medium rounded-full hover:bg-[#e0626e] transition-colors">
              See my work <ArrowRight size={14} />
            </Link>
            <Link href="/about#contact" className="inline-flex items-center gap-2 px-6 py-2.5 border border-terracotta text-terracotta text-sm font-medium rounded-full hover:bg-terracotta hover:text-white transition-colors">
              Get in touch
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-10 flex items-center gap-3 text-xs text-[#666] tracking-wide"
          >
            <span>building <a href="https://untitled.life" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">untitled.life</a></span>
          </motion.div>
        </div>
      </section>

      {/* === MOBILE HERO === */}
      <section className="md:hidden h-screen -mt-14 flex flex-col">
        {/* Image block — takes up ~55% of viewport, contained not background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
          style={{ height: '50vh' }}
        >
          <Image
            src="/ritam-silhouette.jpg"
            alt="Ritam Pal"
            fill
            className="object-cover"
            style={{ objectPosition: '60% 25%' }}
            priority
          />
          {/* Bottom fade into white */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fafafa] to-transparent" />
        </motion.div>

        {/* Text block — bottom portion, all visible without scrolling */}
        <div className="relative z-10 px-6 pb-6 pt-3 flex-1 flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl font-bold tracking-tight text-[#1a1a1a] leading-[1.05]"
          >
            Ritam Pal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-2 text-sm text-[#3a3a3a]"
          >
            Lost in life, asking dumb questions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-5 flex gap-3"
          >
            <Link href="/work" className="inline-flex items-center gap-2 px-5 py-2 bg-terracotta text-white text-sm font-medium rounded-full hover:bg-[#e0626e] transition-colors">
              See my work <ArrowRight size={14} />
            </Link>
            <Link href="/about#contact" className="inline-flex items-center gap-2 px-5 py-2 border border-terracotta text-terracotta text-sm font-medium rounded-full hover:bg-terracotta hover:text-white transition-colors">
              Get in touch
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-5 flex items-center gap-2 text-[11px] text-[#666] tracking-wide"
          >
            <span>building <a href="https://untitled.life" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">untitled.life</a></span>
          </motion.div>
        </div>
      </section>

      {/* Explore cards — rounded to match site aesthetic */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-8">Explore</p>
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
                className="block bg-[#f5f5f5] hover:bg-[#eeeeee] p-8 h-full rounded-xl transition-colors group"
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

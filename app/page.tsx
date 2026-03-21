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
      {/* Hero — image 3/5 width from right, text overlaid */}
      <section className="relative min-h-screen -mt-14">
        {/* Background image — 3/5 width, right-aligned */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 bottom-0 hidden md:block"
          style={{ width: '60%' }}
        >
          <Image
            src="/ritam-silhouette.jpg"
            alt="Ritam Pal"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Subtle gradient on left edge for seamless blend */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#fafafa] to-transparent" />
        </motion.div>

        {/* Mobile: full-width image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 md:hidden"
        >
          <Image
            src="/ritam-silhouette.jpg"
            alt="Ritam Pal"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa]/90 via-[#fafafa]/40 to-transparent" />
        </motion.div>

        {/* Text content — aligned with nav (max-w-5xl mx-auto px-6) */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 min-h-screen flex flex-col justify-end pb-24 md:pb-32">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl md:text-8xl font-bold tracking-tight text-[#1a1a1a] leading-[1.05]"
          >
            Ritam Pal
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-4 text-base md:text-lg text-[#3a3a3a] max-w-md"
          >
            Lost in life, asking dumb questions.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex gap-4"
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-terracotta text-white text-sm font-medium rounded-full hover:bg-[#e0626e] transition-colors"
            >
              See my work
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/about#contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-terracotta text-terracotta text-sm font-medium rounded-full hover:bg-terracotta hover:text-white transition-colors"
            >
              Get in touch
            </Link>
          </motion.div>

          {/* Affiliation line with divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-10 flex items-center gap-3 text-xs text-[#666] tracking-wide"
          >
            <span>Research Lead, <a href="https://consciousengines.ai" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">Conscious Engines</a></span>
            <span className="w-px h-3 bg-[#ccc]" />
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

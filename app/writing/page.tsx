'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { writingItems } from '@/lib/data';

export default function WritingPage() {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-12">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a]"
        >
          Writing
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-[#4a4a4a] max-w-xl"
        >
          Pieces, essays, and things I&apos;ve put into words.
        </motion.p>

        <div className="mt-14 space-y-4">
          {writingItems.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              className="group flex items-start justify-between gap-4 p-5 rounded-lg bg-[#f5f5f5] hover:bg-[#eeeeee] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-medium text-[#1a1a1a] group-hover:text-terracotta transition-colors">
                  {item.title}
                </h2>
                <p className="mt-1 text-xs text-neutral-500">
                  {item.source} &middot; {item.date}
                </p>
                <p className="mt-2 text-xs text-[#4a4a4a] leading-relaxed">
                  {item.description}
                </p>
              </div>
              <ExternalLink
                size={14}
                className="mt-0.5 flex-shrink-0 text-neutral-400 group-hover:text-terracotta transition-colors"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

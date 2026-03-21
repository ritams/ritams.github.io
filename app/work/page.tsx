'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { workItems } from '@/lib/data';

export default function WorkPage() {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a]"
        >
          Work
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-[#4a4a4a] max-w-xl"
        >
          Things I&apos;m building and have built. The thread connecting them:
          taking rigorous thinking and turning it into systems that work.
        </motion.p>

        <div className="mt-16 space-y-6">
          {workItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              className="group relative p-6 md:p-8 rounded-xl bg-[#f5f5f5] hover:bg-[#eeeeee] transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-medium text-[#1a1a1a]">
                      {item.title}
                    </h2>
                    {item.current && (
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-terracotta/10 text-terracotta font-medium">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-terracotta mt-1">{item.role}</p>
                  <p className="mt-3 text-sm text-[#4a4a4a] leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-white text-[#4a4a4a]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-neutral-400 hover:text-terracotta transition-colors"
                    aria-label={`Visit ${item.title}`}
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

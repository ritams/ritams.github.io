'use client';

import { motion } from 'framer-motion';
import { ExternalLink, FileText } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { publications, researchAreas } from '@/lib/data';

export default function ResearchPage() {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-12">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a]"
        >
          Research
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-[#4a4a4a] max-w-xl"
        >
          PhD from IISER Pune under Prof. M.S. Santhanam.
          Sociophysics — using statistical mechanics to understand elections
          and social systems.
        </motion.p>

        {/* Research Areas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14"
        >
          <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-6">
            Research Areas
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {researchAreas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                className="p-5 rounded-lg bg-[#f5f5f5]"
              >
                <h3 className="text-sm font-medium text-[#1a1a1a]">
                  {area.title}
                </h3>
                <p className="mt-2 text-xs text-[#4a4a4a] leading-relaxed">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Publications */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-16"
        >
          <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-6">
            Publications
          </h2>
          <div className="space-y-4">
            {publications.map((pub, i) => (
              <motion.a
                key={pub.title}
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
                className="group flex items-start gap-4 p-5 rounded-lg bg-[#f5f5f5] hover:bg-[#eeeeee] transition-colors"
              >
                <FileText
                  size={16}
                  className="mt-0.5 flex-shrink-0 text-neutral-400 group-hover:text-terracotta transition-colors"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-[#1a1a1a] group-hover:text-terracotta transition-colors leading-snug">
                    {pub.title}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500">
                    {pub.journal} ({pub.year})
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-terracotta/10 text-terracotta font-medium whitespace-nowrap">
                    {pub.tag}
                  </span>
                  <ExternalLink
                    size={14}
                    className="text-neutral-400 group-hover:text-terracotta transition-colors"
                  />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Election Insights link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-12 p-6 rounded-lg bg-terracotta/5 border border-terracotta/20"
        >
          <p className="text-sm text-[#4a4a4a]">
            Explore the data interactively at{' '}
            <a
              href="https://electioninsights.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta hover:underline font-medium"
            >
              electioninsights.in
            </a>
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  );
}

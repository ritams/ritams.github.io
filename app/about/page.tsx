'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Github, Twitter, Instagram, Linkedin, BookOpen, Copy, Check } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { siteConfig } from '@/lib/data';

const socialLinks = [
  { href: siteConfig.social.twitter, icon: Twitter, label: 'Twitter' },
  { href: siteConfig.social.github, icon: Github, label: 'GitHub' },
  { href: siteConfig.social.instagram, icon: Instagram, label: 'Instagram' },
  { href: siteConfig.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: siteConfig.social.scholar, icon: BookOpen, label: 'Google Scholar' },
];

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1 rounded text-neutral-400 hover:text-terracotta transition-colors"
      aria-label="Copy email"
      title="Copy email"
    >
      {copied ? <Check size={13} className="text-terracotta" /> : <Copy size={13} />}
    </button>
  );
}

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-12">
        <div className="grid md:grid-cols-[280px_1fr] gap-12 md:gap-16">
          {/* Photo + contact sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="w-full rounded-lg overflow-hidden">
              <Image
                src="/ritam-silhouette.jpg"
                alt="Ritam Pal"
                width={280}
                height={350}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            <div className="space-y-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-sm text-[#4a4a4a] hover:text-terracotta transition-colors"
              >
                <Mail size={14} />
                {siteConfig.email}
              </a>
              <p className="text-xs text-neutral-500">
                {siteConfig.location}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md text-neutral-500 hover:text-terracotta hover:bg-neutral-100 transition-colors"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a]">
              About
            </h1>

            <div className="mt-8 space-y-5 text-sm text-[#4a4a4a] leading-relaxed max-w-2xl">
              <p>
                I&apos;m Ritam. Physicist by training, AI researcher and
                builder by practice. I did my PhD at IISER Pune, where I used
                statistical physics to study democratic elections — proving
                that the messy business of voting follows surprisingly clean
                universal laws. That work got published in Physical Review
                Letters and featured as a Nature Research Highlight.
              </p>

              <p>
                After the PhD, I moved to building things. I&apos;m currently
                the Research Lead at{' '}
                <span className="text-terracotta font-medium">
                  Conscious Engines
                </span>
                , where we&apos;re building Felix — a proactive AI assistant.
                My work there sits at the boundary of research and engineering:
                architecture decisions, training pipelines, turning intuitions
                from papers into production systems.
              </p>

              <p>
                I&apos;m also building{' '}
                <span className="text-terracotta font-medium">
                  untitled.life
                </span>
                {' '}&mdash; more soon. And I&apos;m co-founding{' '}
                <span className="text-terracotta font-medium">monomials</span>{' '}
                with Nisarg and Vikhyat (from IISER Pune) — a platform to
                connect PhD-level researchers with teams that need deep
                technical talent.
              </p>

              <p>
                Before this, I was at Upsurge Labs (Sowmay Jain&apos;s venture
                studio), where I contributed to Bhindi — an agentic AI platform
                with 300+ background agents across 70+ applications.
              </p>

              <p>
                The common thread: I like taking rigorous thinking — the kind
                you learn from doing physics — and applying it to problems
                where it&apos;s not traditionally expected. Whether that&apos;s
                proving universality in elections or training language models to
                reason about math, the impulse is the same.
              </p>

              <p>
                Outside work, I play badminton, take photographs, and read more
                than I should. Based in Bangalore.
              </p>

              <p className="italic text-neutral-400 mt-4">
                Lost in life. Mostly what I do is ask dumb questions.
              </p>
            </div>

          </motion.div>
        </div>

        {/* Contact */}
        <motion.div
          id="contact"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 pt-10 border-t border-neutral-200"
        >
          <h2 className="text-lg font-semibold text-[#1a1a1a]">Get in touch</h2>
          <p className="mt-3 text-sm text-[#4a4a4a]">
            Want to collaborate, chat about research, or just say hi?
          </p>
          <div className="mt-4 flex items-center gap-1">
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-terracotta hover:underline"
            >
              {siteConfig.email}
            </a>
            <CopyEmail />
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}

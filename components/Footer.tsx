'use client';

import { Github, Twitter, Instagram, Linkedin } from 'lucide-react';
import { siteConfig } from '@/lib/data';

const socialIcons = [
  { href: siteConfig.social.twitter, icon: Twitter, label: 'Twitter' },
  { href: siteConfig.social.github, icon: Github, label: 'GitHub' },
  { href: siteConfig.social.instagram, icon: Instagram, label: 'Instagram' },
  { href: siteConfig.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200/60 py-10 mt-24">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#4a4a4a]">
          {siteConfig.name}
        </p>
        <div className="flex items-center gap-4">
          {socialIcons.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-terracotta transition-colors"
              aria-label={label}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

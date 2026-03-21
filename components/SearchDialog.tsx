'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { workItems, publications, writingItems, researchAreas, navLinks } from '@/lib/data';

interface SearchResult {
  title: string;
  type: string;
  href: string;
  description?: string;
}

// Build search index from all content
function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  // Pages
  for (const link of navLinks) {
    results.push({
      title: link.label,
      type: 'Page',
      href: link.href,
    });
  }

  // Work items
  for (const item of workItems) {
    results.push({
      title: item.title,
      type: 'Work',
      href: '/work',
      description: item.role,
    });
  }

  // Publications
  for (const pub of publications) {
    results.push({
      title: pub.title,
      type: 'Publication',
      href: pub.link,
      description: `${pub.journal} (${pub.year})`,
    });
  }

  // Research areas
  for (const area of researchAreas) {
    results.push({
      title: area.title,
      type: 'Research',
      href: '/research',
      description: area.description.slice(0, 80) + '…',
    });
  }

  // Writing
  for (const item of writingItems) {
    results.push({
      title: item.title,
      type: 'Writing',
      href: item.link,
      description: item.source,
    });
  }

  return results;
}

const searchIndex = buildSearchIndex();

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query.trim()
    ? searchIndex.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase())
      )
    : searchIndex.slice(0, 6); // Show top items when empty

  // Keyboard shortcut to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [open]);

  // Arrow key navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        const result = results[selectedIndex];
        setOpen(false);
        if (result.href.startsWith('http')) {
          window.open(result.href, '_blank');
        } else {
          router.push(result.href);
        }
      }
    },
    [results, selectedIndex, router]
  );

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    if (result.href.startsWith('http')) {
      window.open(result.href, '_blank');
    } else {
      router.push(result.href);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-400 border border-neutral-200 rounded-md hover:border-neutral-300 hover:text-neutral-500 transition-colors"
        aria-label="Search"
      >
        <Search size={12} />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-neutral-100 rounded">
          ⌘K
        </kbd>
      </button>

      {/* Dialog */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
              onClick={() => setOpen(false)}
            />

            {/* Search panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50"
            >
              <div className="bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden">
                {/* Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-100">
                  <Search size={16} className="text-neutral-400 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Search pages, publications, work…"
                    className="flex-1 text-sm text-[#1a1a1a] placeholder:text-neutral-400 outline-none bg-transparent"
                  />
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1 text-neutral-400 hover:text-neutral-600"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Results */}
                <div className="max-h-72 overflow-y-auto py-2">
                  {results.length === 0 ? (
                    <p className="px-4 py-6 text-sm text-neutral-400 text-center">
                      No results found.
                    </p>
                  ) : (
                    results.map((result, i) => (
                      <button
                        key={`${result.type}-${result.title}-${i}`}
                        onClick={() => handleSelect(result)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          i === selectedIndex
                            ? 'bg-[#f5f5f5]'
                            : 'hover:bg-[#fafafa]'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#1a1a1a] truncate">
                            {result.title}
                          </p>
                          {result.description && (
                            <p className="text-xs text-neutral-400 truncate mt-0.5">
                              {result.description}
                            </p>
                          )}
                        </div>
                        <span className="shrink-0 text-[10px] uppercase tracking-wider text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">
                          {result.type}
                        </span>
                        {i === selectedIndex && (
                          <ArrowRight size={12} className="text-[#F4727E] shrink-0" />
                        )}
                      </button>
                    ))
                  )}
                </div>

                {/* Footer hint */}
                <div className="flex items-center gap-4 px-4 py-2 border-t border-neutral-100 text-[10px] text-neutral-400">
                  <span>↑↓ navigate</span>
                  <span>↵ select</span>
                  <span>esc close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

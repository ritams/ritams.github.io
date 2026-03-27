'use client';

import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import PageWrapper from '@/components/PageWrapper';
import { photos, photoPlaceholders } from '@/lib/data';

const aspectMap: Record<string, string> = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
};

export default function PhotosPage() {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a]"
        >
          Photos
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-[#4a4a4a] max-w-xl"
        >
          A small collection. More coming soon.
        </motion.p>

        <div className="mt-14 columns-2 md:columns-3 gap-4 space-y-4">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
              className="break-inside-avoid rounded-xl overflow-hidden group relative"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={1067}
                className="w-full h-auto object-cover rounded-xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-xl">
                <p className="text-white text-xs">{photo.location}</p>
              </div>
            </motion.div>
          ))}
          {photoPlaceholders.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + (photos.length + i) * 0.06 }}
              className={`break-inside-avoid rounded-xl bg-[#f5f5f5] ${aspectMap[photo.aspect]} flex items-center justify-center`}
            >
              <Camera
                size={24}
                className="text-neutral-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

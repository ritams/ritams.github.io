import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ritampal.com'),
  title: {
    default: 'Ritam Pal — Physics, AI, and Everything Between',
    template: '%s | Ritam Pal',
  },
  description:
    'Ritam Pal is a physicist turned AI researcher. Research Lead at Conscious Engines, building at the intersection of physics and AI.',
  keywords:
    'Ritam Pal, AI Research, Conscious Engines, untitled.life, monomials, Sociophysics, Statistical Physics, IISER Pune',
  authors: [{ name: 'Ritam Pal' }],
  openGraph: {
    type: 'website',
    title: 'Ritam Pal — Physics, AI, and Everything Between',
    description:
      'Physicist turned AI researcher. Building at the intersection of deep theory and useful systems.',
    url: 'https://ritampal.com/',
    siteName: 'Ritam Pal',
    images: [
      {
        url: '/ritam-twitter.jpg',
        width: 1200,
        height: 630,
        alt: 'Ritam Pal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ritam Pal — Physics, AI, and Everything Between',
    description:
      'Physicist turned AI researcher. Building at the intersection of deep theory and useful systems.',
    creator: '@ritam5013',
    images: ['/ritam-twitter.jpg'],
  },
  icons: {
    icon: '/ritam-logo.png',
  },
  alternates: {
    canonical: 'https://ritampal.com/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  dateCreated: '2024-01-01T00:00:00+05:30',
  dateModified: new Date().toISOString(),
  mainEntity: {
    '@type': 'Person',
    name: 'Ritam Pal',
    jobTitle: 'Research Lead',
    url: 'https://ritampal.com',
    image: 'https://ritampal.com/ritam-twitter.jpg',
    affiliation: {
      '@type': 'Organization',
      name: 'Conscious Engines',
    },
    description:
      'Physicist turned AI researcher building at the intersection of deep theory and useful systems.',
    sameAs: [
      'https://scholar.google.com/citations?user=9_ndyPcAAAAJ&hl=en',
      'https://www.researchgate.net/profile/Ritam-Pal-3',
      'https://www.linkedin.com/in/ritam-pal-93932b192/',
      'https://x.com/ritam5013',
      'https://github.com/ritams',
      'https://www.instagram.com/ritam.5013',
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}

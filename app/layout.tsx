import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://ritampal.com'),
    title: 'Ritam Pal | Physicist of Democracy - PhD Scholar at IISER Pune',
    description: 'Ritam Pal is a Physicist of Democracy & PMRF Fellow at IISER Pune, using statistical physics to decode universal laws in elections and social networks.',
    keywords: 'Ritam Pal, Sociophysics, Statistical Physics, Election Statistics, IISER Pune, PMRF Fellow, Complex Systems, Random Voting Model, Physicist of Democracy',
    authors: [{ name: 'Ritam Pal' }],
    openGraph: {
        type: 'website',
        title: 'Ritam Pal | Physicist of Democracy',
        description: 'Decoding the universal laws governing human collective behavior through statistical physics and complex systems theory.',
        url: 'https://ritampal.com/',
        siteName: 'Ritam Pal - Sociophysics Researcher',
        images: [
            {
                url: '/ritam-darkmode.jpg',
                width: 1200,
                height: 630,
                alt: 'Ritam Pal - Physicist of Democracy',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ritam Pal | Physicist of Democracy',
        description: 'PhD Scholar at IISER Pune using physics to understand democracy and social dynamics.',
        creator: '@ritam5013',
        images: ['/ritam-darkmode.jpg'],
    },
    icons: {
        icon: '/ritam-logo.png',
    },
    alternates: {
        canonical: 'https://ritampal.com/',
    },
};

// JSON-LD Structured Data
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: '2024-01-01T00:00:00+05:30',
    dateModified: new Date().toISOString(),
    mainEntity: {
        '@type': 'Person',
        name: 'Ritam Pal',
        jobTitle: 'PhD Scholar & PMRF Fellow',
        url: 'https://ritampal.com',
        image: 'https://ritampal.com/ritam-darkmode.jpg',
        affiliation: {
            '@type': 'Organization',
            name: 'IISER Pune',
        },
        description: 'Decoding the universal laws governing human collective behavior through statistical physics and complex systems theory.',
        sameAs: [
            'https://scholar.google.com/citations?user=9_ndyPcAAAAJ&hl=en',
            'https://www.researchgate.net/profile/Ritam-Pal-3',
            'https://orcid.org/0009-0008-5220-2188',
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
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="font-sans antialiased">{children}</body>
        </html>
    );
}

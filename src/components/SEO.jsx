import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title = "Ritam Pal | Physicist of Democracy",
    description = "Ritam Pal is a Physicist of Democracy & PMRF Fellow at IISER Pune, using statistical physics to decode universal laws in elections and social networks.",
    keywords = "Ritam Pal, Sociophysics, Statistical Physics, Election Statistics, IISER Pune, PMRF Fellow, Complex Systems, Random Voting Model, Physicist of Democracy",
    author = "Ritam Pal",
    url = "https://ritampal.com/",
    image = "https://ritampal.com/ritam-darkmode.jpg",
    type = "website"
}) => {

    // Structured Data (JSON-LD)
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "dateCreated": "2024-01-01T00:00:00+05:30",
        "dateModified": new Date().toISOString(),
        "mainEntity": {
            "@type": "Person",
            "name": "Ritam Pal",
            "jobTitle": "PhD Scholar & PMRF Fellow",
            "url": "https://ritampal.com",
            "image": "https://ritampal.com/ritam-darkmode.jpg",
            "affiliation": {
                "@type": "Organization",
                "name": "IISER Pune"
            },
            "description": "Decoding the universal laws governing human collective behavior through statistical physics and complex systems theory.",
            "sameAs": [
                "https://scholar.google.com/citations?user=9_ndyPcAAAAJ&hl=en",
                "https://www.researchgate.net/profile/Ritam-Pal-3",
                "https://orcid.org/0009-0008-5220-2188",
                "https://www.linkedin.com/in/ritam-pal-93932b192/",
                "https://x.com/ritam5013",
                "https://github.com/ritams",
                "https://www.instagram.com/ritam.5013"
            ]
        }
    };

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="Ritam Pal - Sociophysics Researcher" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@ritam5013" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
};

export default SEO;

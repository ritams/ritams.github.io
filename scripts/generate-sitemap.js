import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../dist');
const PUBLIC_DIR = path.resolve(__dirname, '../public'); // For development or copying
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');

// Define your routes here
const routes = [
    '/',
    // Add more routes as you create them, e.g. '/blog', '/research'
];

const domain = 'https://ritampal.com';

const generateSitemap = () => {
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map(route => `
    <url>
        <loc>${domain}${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${route === '/' ? '1.0' : '0.8'}</priority>
    </url>
    `).join('')}
</urlset>`;

    // Ensure dist directory exists (it might not if running independently of build)
    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR, { recursive: true });
    }

    fs.writeFileSync(SITEMAP_PATH, sitemapContent);
    console.log(`✅ Sitemap generated at ${SITEMAP_PATH}`);
};

generateSitemap();

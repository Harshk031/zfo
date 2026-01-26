import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITEMAP_PATH = path.join(__dirname, 'public', 'sitemap.xml');
const DOMAIN = 'https://www.zfo.co.in';

const pages = [
    '/',
    '/fizzroom',
    // Individual posts can be dynamically added here in a real app, 
    // for now we just add the main blog listing.
];

const generateSitemap = () => {
    const currentDate = new Date().toISOString().split('T')[0];

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages
            .map((page) => {
                return `  <url>
    <loc>${DOMAIN}${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
    <image:image>
      <image:loc>${DOMAIN}/logo.png</image:loc>
      <image:title>ZfO Logo</image:title>
    </image:image>
  </url>`;
            })
            .join('\n')}
</urlset>`;

    fs.writeFileSync(SITEMAP_PATH, sitemapContent);
    console.log('✅ Sitemap generated successfully at public/sitemap.xml');
};

generateSitemap();

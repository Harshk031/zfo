import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fizzPosts } from './src/data/fizzroomData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITEMAP_PATH = path.join(__dirname, 'public', 'sitemap.xml');
const DOMAIN = 'https://www.zfo.co.in';

const pages = [
    '/',
    '/fizzroom',
    '/faq',
    '/infographics/craft-soda-vs-regular-soda',
    // Add all individual blog posts
    ...fizzPosts.map(post => `/fizzroom/${post.id}`)
];

const generateSitemap = () => {
    const currentDate = new Date().toISOString().split('T')[0];

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages
            .map((page) => {
                // Set priority based on page type
                const priority = page === '/' ? '1.0' : page.startsWith('/fizzroom/') ? '0.7' : '0.8';
                const changefreq = page === '/' ? 'weekly' : 'monthly';
                
                return `  <url>
    <loc>${DOMAIN}${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
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
    console.log(`✅ Included ${pages.length} pages in sitemap`);
};

generateSitemap();

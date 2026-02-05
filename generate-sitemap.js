import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fizzPosts } from './src/data/fizzroomData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITEMAP_PATH = path.join(__dirname, 'public', 'sitemap.xml');
const DOMAIN = 'https://www.zfo.co.in';

// Helper function to parse date from fizzroomData
const parseDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? new Date().toISOString().split('T')[0] : date.toISOString().split('T')[0];
};

const pages = [
    {
        url: '/',
        priority: '1.0',
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0],
        image: '/logo.png',
        imageTitle: 'ZfO Logo'
    },
    {
        url: '/fizzroom',
        priority: '0.8',
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0],
        image: '/logo.png',
        imageTitle: 'ZfO Fizzroom - Articles & Stories'
    },
    {
        url: '/faq',
        priority: '0.8',
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0],
        image: '/logo.png',
        imageTitle: 'ZfO FAQ'
    },
    {
        url: '/infographics/craft-soda-vs-regular-soda',
        priority: '0.8',
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0],
        image: '/logo.png',
        imageTitle: 'Craft Soda vs Regular Soda Infographic'
    },
    // Add fizzroom posts with their dates and unique images
    ...fizzPosts.map(post => ({
        url: `/fizzroom/${post.id}`,
        priority: '0.7',
        changefreq: 'monthly',
        lastmod: parseDate(post.date),
        image: post.image,
        imageTitle: post.title
    }))
];

const generateSitemap = () => {
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages
        .map((page) => {
            return `  <url>
    <loc>${DOMAIN}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <image:image>
      <image:loc>${DOMAIN}${page.image}</image:loc>
      <image:title>${page.imageTitle}</image:title>
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

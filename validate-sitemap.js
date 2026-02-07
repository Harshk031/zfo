import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITEMAP_PATH = path.join(__dirname, 'public', 'sitemap.xml');

// Read and validate sitemap
const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');

// Check for domain consistency
const domainPattern = /https:\/\/www\.zfo\.co\.in/g;
const matches = sitemapContent.match(domainPattern);

console.log('Sitemap Validation Report:');
console.log('==========================');
console.log(`Total domain references found: ${matches ? matches.length : 0}`);
console.log(`Sitemap file size: ${sitemapContent.length} characters`);

// Check for any incorrect domains
const vercelPattern = /vercel\.app/g;
const vercelMatches = sitemapContent.match(vercelPattern);
if (vercelMatches) {
    console.log(`❌ Found ${vercelMatches.length} references to vercel.app - these should be fixed`);
} else {
    console.log('✅ No vercel.app references found in sitemap');
}

// Check for proper XML structure
if (sitemapContent.includes('<?xml version="1.0" encoding="UTF-8"?>') && 
    sitemapContent.includes('<urlset') && 
    sitemapContent.includes('</urlset>')) {
    console.log('✅ Sitemap has proper XML structure');
} else {
    console.log('❌ Sitemap structure issues detected');
}

// Count URLs
const urlCount = (sitemapContent.match(/<loc>/g) || []).length;
console.log(`✅ Sitemap contains ${urlCount} URLs`);

// Validate each URL starts with correct domain
const urlPattern = /<loc>(.*?)<\/loc>/g;
let match;
let validUrls = 0;
let invalidUrls = 0;

while ((match = urlPattern.exec(sitemapContent)) !== null) {
    const url = match[1];
    if (url.startsWith('https://www.zfo.co.in')) {
        validUrls++;
    } else {
        invalidUrls++;
        console.log(`❌ Invalid URL: ${url}`);
    }
}

console.log(`✅ Valid URLs: ${validUrls}`);
console.log(`❌ Invalid URLs: ${invalidUrls}`);

if (invalidUrls === 0 && validUrls > 0) {
    console.log('\n🎉 Sitemap validation PASSED');
} else {
    console.log('\n❌ Sitemap validation FAILED');
}
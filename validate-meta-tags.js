import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INDEX_HTML_PATH = path.join(__dirname, 'index.html');
const DIST_INDEX_HTML_PATH = path.join(__dirname, 'dist', 'index.html');

console.log('Meta Tag Consistency Validation');
console.log('===============================');

// Function to validate meta tags in a file
function validateMetaTags(filePath, fileName) {
    console.log(`\nChecking ${fileName}...`);
    
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check canonical URL
        const canonicalMatch = content.match(/<link rel="canonical" href="(.*?)"/);
        if (canonicalMatch) {
            const canonicalUrl = canonicalMatch[1];
            if (canonicalUrl === 'https://www.zfo.co.in/') {
                console.log('✅ Canonical URL is correct: https://www.zfo.co.in/');
            } else {
                console.log(`❌ Canonical URL incorrect: ${canonicalUrl}`);
            }
        } else {
            console.log('❌ No canonical URL found');
        }
        
        // Check Open Graph URL
        const ogUrlMatch = content.match(/<meta property="og:url" content="(.*?)"/);
        if (ogUrlMatch) {
            const ogUrl = ogUrlMatch[1];
            if (ogUrl === 'https://www.zfo.co.in/') {
                console.log('✅ Open Graph URL is correct: https://www.zfo.co.in/');
            } else {
                console.log(`❌ Open Graph URL incorrect: ${ogUrl}`);
            }
        } else {
            console.log('❌ No Open Graph URL found');
        }
        
        // Check Twitter URL
        const twitterUrlMatch = content.match(/<meta property="twitter:url" content="(.*?)"/);
        if (twitterUrlMatch) {
            const twitterUrl = twitterUrlMatch[1];
            if (twitterUrl === 'https://www.zfo.co.in/') {
                console.log('✅ Twitter URL is correct: https://www.zfo.co.in/');
            } else {
                console.log(`❌ Twitter URL incorrect: ${twitterUrl}`);
            }
        } else {
            console.log('❌ No Twitter URL found');
        }
        
        // Check structured data URLs
        const urlMatches = content.match(/"url": "(.*?)"/g);
        if (urlMatches) {
            let allCorrect = true;
            urlMatches.forEach(match => {
                const url = match.replace('"url": "', '').replace('"', '');
                if (url !== 'https://www.zfo.co.in' && url !== 'https://www.zfo.co.in/') {
                    console.log(`❌ Structured data URL incorrect: ${url}`);
                    allCorrect = false;
                }
            });
            if (allCorrect) {
                console.log('✅ All structured data URLs are correct');
            }
        }
        
        // Check for any vercel.app references
        if (content.includes('vercel.app')) {
            console.log('❌ Found vercel.app references that should be removed');
        } else {
            console.log('✅ No vercel.app references found');
        }
        
        // Count total domain references
        const domainCount = (content.match(/https:\/\/www\.zfo\.co\.in/g) || []).length;
        console.log(`✅ Total zfo.co.in references: ${domainCount}`);
        
    } catch (error) {
        console.log(`❌ Error reading ${fileName}: ${error.message}`);
    }
}

// Validate both source and deployed files
validateMetaTags(INDEX_HTML_PATH, 'source index.html');
validateMetaTags(DIST_INDEX_HTML_PATH, 'deployed index.html');

console.log('\nValidation complete!');
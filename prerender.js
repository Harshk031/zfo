import puppeteer from 'puppeteer';
import { createServer } from 'vite';
import { fizzPosts } from './src/data/fizzroomData.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define routes to pre-render
const routes = [
  '/',
  '/fizzroom',
  ...fizzPosts.map(post => `/fizzroom/${post.id}`)
];

async function prerender() {
  console.log('🚀 Starting pre-rendering process...');
  
  // Start Vite dev server
  const server = await createServer({
    server: {
      port: 5173,
      strictPort: true
    }
  });
  
  await server.listen();
  console.log('✅ Vite dev server started on http://localhost:5173');
  
  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Pre-render each route
  for (const route of routes) {
    const url = `http://localhost:5173${route}`;
    const outputPath = path.join(__dirname, 'dist', route === '/' ? 'index.html' : `${route}.html`);
    
    console.log(`📄 Pre-rendering: ${route}`);
    
    try {
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });
      
      // Wait for React to hydrate
      await page.waitForSelector('#root', { timeout: 10000 });
      
      // Get the HTML
      const html = await page.content();
      
      // Create directory if it doesn't exist
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Write the HTML
      fs.writeFileSync(outputPath, html);
      console.log(`✅ Saved: ${outputPath}`);
    } catch (error) {
      console.error(`❌ Error pre-rendering ${route}:`, error.message);
    }
  }
  
  await browser.close();
  await server.close();
  
  console.log('✨ Pre-rendering complete!');
}

prerender().catch(console.error);

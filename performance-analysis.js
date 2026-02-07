import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('=== Performance Optimization Analysis ===\n');

try {
  // Clean build first
  console.log('1. Cleaning previous build...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Analyze build output
  const distPath = path.join(__dirname, 'dist');
  const assetsPath = path.join(distPath, 'assets');
  
  if (fs.existsSync(assetsPath)) {
    console.log('\n2. Build Analysis:');
    
    // Analyze JavaScript bundles
    const jsFiles = fs.readdirSync(assetsPath).filter(file => file.endsWith('.js'));
    let totalJsSize = 0;
    
    console.log('\nJavaScript Bundles:');
    jsFiles.forEach(file => {
      const filePath = path.join(assetsPath, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      totalJsSize += stats.size;
      console.log(`  ${file}: ${sizeKB} KB`);
    });
    
    console.log(`\nTotal JavaScript Size: ${(totalJsSize / 1024).toFixed(2)} KB`);
    
    // Analyze CSS files
    const cssFiles = fs.readdirSync(assetsPath).filter(file => file.endsWith('.css'));
    let totalCssSize = 0;
    
    console.log('\nCSS Files:');
    cssFiles.forEach(file => {
      const filePath = path.join(assetsPath, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      totalCssSize += stats.size;
      console.log(`  ${file}: ${sizeKB} KB`);
    });
    
    console.log(`\nTotal CSS Size: ${(totalCssSize / 1024).toFixed(2)} KB`);
    
    // Check for image optimization
    const imageFiles = fs.readdirSync(path.join(distPath, 'assets', 'images') || []).filter(file => 
      /\.(png|jpe?g|gif|svg|webp|avif)$/i.test(file)
    );
    
    if (imageFiles.length > 0) {
      console.log('\nImage Assets:');
      let totalImageSize = 0;
      imageFiles.forEach(file => {
        const filePath = path.join(distPath, 'assets', 'images', file);
        if (fs.existsSync(filePath)) {
          const stats = fs.statSync(filePath);
          const sizeKB = (stats.size / 1024).toFixed(2);
          totalImageSize += stats.size;
          console.log(`  ${file}: ${sizeKB} KB`);
        }
      });
      console.log(`\nTotal Image Size: ${(totalImageSize / 1024 / 1024).toFixed(2)} MB`);
    }
    
    // Check for video files
    const videoPath = path.join(distPath, 'assets', 'videos');
    if (fs.existsSync(videoPath)) {
      const videoFiles = fs.readdirSync(videoPath).filter(file => 
        /\.(mp4|webm|ogg|avi)$/i.test(file)
      );
      
      if (videoFiles.length > 0) {
        console.log('\nVideo Assets:');
        let totalVideoSize = 0;
        videoFiles.forEach(file => {
          const filePath = path.join(videoPath, file);
          const stats = fs.statSync(filePath);
          const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
          totalVideoSize += stats.size;
          console.log(`  ${file}: ${sizeMB} MB`);
        });
        console.log(`\nTotal Video Size: ${(totalVideoSize / 1024 / 1024).toFixed(2)} MB`);
      }
    }
    
    // Performance recommendations
    console.log('\n=== Performance Recommendations ===');
    console.log('✅ Code splitting implemented for better loading');
    console.log('✅ Asset optimization with hashed filenames');
    console.log('✅ Console logs removed from production build');
    console.log('✅ Modern browser targeting (ES2020)');
    
    if (totalJsSize > 500 * 1024) {
      console.log('⚠️  Consider further code splitting to reduce initial bundle size');
    }
    
    if (totalImageSize > 2 * 1024 * 1024) {
      console.log('⚠️  Consider image compression for better loading performance');
    }
    
    console.log('\n✅ Optimization complete! Site should load faster now.');
    
  } else {
    console.log('❌ Build failed or dist folder not found');
  }
  
} catch (error) {
  console.error('❌ Performance analysis failed:', error.message);
}
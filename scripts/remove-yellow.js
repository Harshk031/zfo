#!/usr/bin/env node
// Script to replace all yellow accents with silver/gray

const fs = require('fs');
const path = require('path');

const replacements = [
    // Yellow to Gray replacements
    { from: /yellow-400/g, to: 'gray-300' },
    { from: /yellow-500/g, to: 'gray-400' },
    { from: /yellow-600/g, to: 'gray-500' },
    { from: /bg-yellow-500\/10/g, to: 'bg-gray-500/10' },
    { from: /text-yellow-400/g, to: 'text-gray-300' },
    { from: /border-yellow-400/g, to: 'border-gray-400' },
    { from: /from-yellow-500 to-orange-600/g, to: 'from-gray-400 to-gray-500' },
    { from: /from-yellow-500 via-orange-500 to-red-500/g, to: 'from-white via-gray-200 to-gray-300' },
    { from: /hover:text-yellow-300/g, to: 'hover:text-gray-200' },
    { from: /hover:text-yellow-400/g, to: 'hover:text-gray-300' },
];

const filesToUpdate = [
    'components/SEOFeatures.jsx',
    'components/PromoSection.jsx',
    'components/ProductDetails.jsx',
    'components/Navbar.jsx',
    'components/MovingBgText.jsx',
    'components/FloatingText.jsx',
    'components/ErrorBoundary.jsx',
    'components/ABTestedCTA.jsx',
    'app/faq/page.js',
    'app/about/page.js',
];

const rootDir = path.join(__dirname, '..');

filesToUpdate.forEach((file) => {
    const filePath = path.join(rootDir, file);

    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Skipping ${file} (not found)`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let changesMade = false;

    replacements.forEach(({ from, to }) => {
        if (content.match(from)) {
            content = content.replace(from, to);
            changesMade = true;
        }
    });

    if (changesMade) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated ${file}`);
    } else {
        console.log(`⏭️  No changes needed for ${file}`);
    }
});

console.log('\n✅ All yellow accents replaced with silver/gray!');

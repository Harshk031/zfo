#!/usr/bin/env node
// Script to add 'use client'; to all React components that need it

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.jsx'));

const componentsNeedingClient = [
    'ABTestedCTA.jsx',
    'Bottle.jsx',
    'BubbleCursor.jsx',
    'BubbleLayer.jsx',
    'Bubbles.jsx',
    'ChatBot.jsx',
    'CursorBottle.jsx',
    'ErrorBoundary.jsx',
    'FizzCard.jsx',
    'FizzroomTeaser.jsx',
    'FloatingText.jsx',
    'Footer.jsx',
    'Hero.jsx',
    'HeroScene.jsx',
    'LaunchTeaser.jsx',
    'LazyLoad.jsx',
    'LeadCapture.jsx',
    'MovingBgText.jsx',
    'Navbar.jsx',
    'OptimizedImage.jsx',
    'OptimizedVideo.jsx',
    'ProductDetails.jsx',
    'ProgressiveImage.jsx',
    'PromoSection.jsx',
    'SEOFeatures.jsx',
    'SideVideos.jsx',
    'SocialProof.jsx',
    'WhatsAppLead.jsx',
];

componentsNeedingClient.forEach(filename => {
    const filePath = path.join(componentsDir, filename);

    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        if (!content.startsWith("'use client'")) {
            content = "'use client';\n\n" + content;
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Added 'use client' to ${filename}`);
        } else {
            console.log(`⏭️  Skipped ${filename} (already has 'use client')`);
        }
    }
});

console.log('\n✅ All components updated!');

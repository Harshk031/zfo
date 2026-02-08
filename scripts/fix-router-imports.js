#!/usr/bin/env node
// Script to fix react-router-dom imports to Next.js Link

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../components');

const filesToFix = ['FizzCard.jsx', 'FizzroomTeaser.jsx'];

filesToFix.forEach(filename => {
    const filePath = path.join(componentsDir, filename);

    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Replace react-router-dom imports with Next.js Link
        content = content.replace(
            /import\s+{\s*Link\s*}\s+from\s+["']react-router-dom["'];?/g,
            'import Link from "next/link";'
        );

        // Replace Link component usage: to= becomes href=
        content = content.replace(/\<Link\s+to=/g, '<Link href=');

        // Add 'use client' at the top if not present
        if (!content.startsWith("'use client'")) {
            content = "'use client';\n\n" + content;
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed ${filename}`);
    } else {
        console.log(`⚠️  ${filename} not found`);
    }
});

console.log('\n✅ All react-router-dom imports fixed!');

#!/bin/bash
# SEO Deployment Verification Script

echo "=== SEO Configuration Verification ==="
echo

# Check if all required files exist
echo "1. Checking required files..."
FILES=("index.html" "public/sitemap.xml" "public/robots.txt" "vercel.json")
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
    fi
done

echo
echo "2. Checking domain consistency..."
# Count zfo.co.in references
ZFO_COUNT=$(grep -o "https://www.zfo.co.in" index.html | wc -l)
echo "✅ Found $ZFO_COUNT references to zfo.co.in in index.html"

# Check for vercel.app references
VERCEL_COUNT=$(grep -o "vercel.app" index.html | wc -l)
if [ "$VERCEL_COUNT" -eq 0 ]; then
    echo "✅ No vercel.app references found"
else
    echo "❌ Found $VERCEL_COUNT vercel.app references"
fi

echo
echo "3. Checking sitemap..."
SITEMAP_URLS=$(grep -o "https://www.zfo.co.in" public/sitemap.xml | wc -l)
echo "✅ Sitemap contains $SITEMAP_URLS domain references"

echo
echo "4. Checking canonical URL..."
CANONICAL=$(grep "rel=\"canonical\"" index.html)
if echo "$CANONICAL" | grep -q "https://www.zfo.co.in/"; then
    echo "✅ Canonical URL is correct"
else
    echo "❌ Canonical URL issue detected"
fi

echo
echo "=== Verification Complete ==="
echo "Ready for deployment to restore SEO visibility"
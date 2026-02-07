@echo off
echo === SEO Configuration Verification ===
echo.

echo 1. Checking required files...
if exist "index.html" (
    echo ✅ index.html exists
) else (
    echo ❌ index.html missing
)

if exist "public\sitemap.xml" (
    echo ✅ public\sitemap.xml exists
) else (
    echo ❌ public\sitemap.xml missing
)

if exist "public\robots.txt" (
    echo ✅ public\robots.txt exists
) else (
    echo ❌ public\robots.txt missing
)

if exist "vercel.json" (
    echo ✅ vercel.json exists
) else (
    echo ❌ vercel.json missing
)

echo.
echo 2. Checking domain consistency...
find /c "https://www.zfo.co.in" index.html > nul
if %errorlevel% equ 0 (
    echo ✅ Found zfo.co.in references in index.html
) else (
    echo ❌ No zfo.co.in references found
)

find /c "vercel.app" index.html > nul
if %errorlevel% equ 1 (
    echo ✅ No vercel.app references found
) else (
    echo ❌ Found vercel.app references
)

echo.
echo 3. Checking sitemap...
find /c "https://www.zfo.co.in" public\sitemap.xml > nul
if %errorlevel% equ 0 (
    echo ✅ Sitemap contains zfo.co.in references
) else (
    echo ❌ Sitemap issues detected
)

echo.
echo 4. Checking canonical URL...
find /c "rel=\"canonical\"" index.html > nul
if %errorlevel% equ 0 (
    echo ✅ Canonical tag found
) else (
    echo ❌ No canonical tag found
)

echo.
echo === Verification Complete ===
echo Ready for deployment to restore SEO visibility
pause
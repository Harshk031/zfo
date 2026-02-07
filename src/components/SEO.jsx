import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, keywords, image, url, type = 'website', schema }) => {
    const location = useLocation();
    const siteTitle = 'ZfO - Premium Masala Soda in Glass Bottles';
    const siteUrl = 'https://www.zfo.co.in';
    const defaultImage = `${siteUrl}/logo.png`;

    const finalTitle = title ? `${title} | ZfO` : siteTitle;
    const finalDesc = description || "ZfO - India's premium craft soda in glass bottles. Authentic masala flavors, zero artificial ingredients.";
    const finalImage = image || defaultImage;
    const finalUrl = url ? `${siteUrl}${url}` : `${siteUrl}${location.pathname}`;

    useEffect(() => {
        // Update Title
        document.title = finalTitle;

        // Helper to update or create meta tags
        const updateMeta = (name, content, attribute = 'name') => {
            let element = document.querySelector(`meta[${attribute}="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // Standard Meta
        updateMeta('description', finalDesc);
        updateMeta('keywords', keywords || "ZfO, premium soda, craft soda, masala soda, glass bottles, Indian beverages");
        updateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

        // Open Graph
        updateMeta('og:type', type, 'property');
        updateMeta('og:url', finalUrl, 'property');
        updateMeta('og:title', finalTitle, 'property');
        updateMeta('og:description', finalDesc, 'property');
        updateMeta('og:image', finalImage, 'property');

        // Twitter
        updateMeta('twitter:card', 'summary_large_image', 'property');
        updateMeta('twitter:url', finalUrl, 'property');
        updateMeta('twitter:title', finalTitle, 'property');
        updateMeta('twitter:description', finalDesc, 'property');
        updateMeta('twitter:image', finalImage, 'property');

        // Canonical
        let linkCanon = document.querySelector('link[rel="canonical"]');
        if (!linkCanon) {
            linkCanon = document.createElement('link');
            linkCanon.setAttribute('rel', 'canonical');
            document.head.appendChild(linkCanon);
        }
        linkCanon.setAttribute('href', finalUrl);

        // JSON-LD Schema
        if (schema) {
            let scriptSchema = document.querySelector('script[id="schema-json-ld"]');
            if (!scriptSchema) {
                scriptSchema = document.createElement('script');
                scriptSchema.setAttribute('type', 'application/ld+json');
                scriptSchema.setAttribute('id', 'schema-json-ld');
                document.head.appendChild(scriptSchema);
            }
            scriptSchema.textContent = JSON.stringify(schema);
        } else {
            // Cleanup schema if not present on this page (e.g. going from post to home)
            const scriptSchema = document.querySelector('script[id="schema-json-ld"]');
            if (scriptSchema) scriptSchema.remove();
        }

    }, [finalTitle, finalDesc, keywords, finalImage, finalUrl, type, schema, location]);

    return null; // This component renders nothing visually
};

export default SEO;

import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, type = 'website', schema }) => {
    const siteTitle = 'ZfO - Premium Masala Soda in Glass Bottles';
    const siteUrl = 'https://www.zfo.co.in';
    const defaultImage = `${siteUrl}/logo.png`;

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{title ? `${title} | ZfO` : siteTitle}</title>
            <meta name="description" content={description || "ZfO - India's premium craft soda in glass bottles. Authentic masala flavors, zero artificial ingredients."} />
            <meta name="keywords" content={keywords || "ZfO, premium soda, craft soda, masala soda, glass bottles, Indian beverages"} />
            <link rel="canonical" href={url ? `${siteUrl}${url}` : siteUrl} />
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url ? `${siteUrl}${url}` : siteUrl} />
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description || "Reclaiming the soul of soda. ZfO delivers premium masala soda in elegant glass bottles."} />
            <meta property="og:image" content={image || defaultImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url ? `${siteUrl}${url}` : siteUrl} />
            <meta property="twitter:title" content={title || siteTitle} />
            <meta property="twitter:description" content={description || "Crafted soda. Honest flavour. Real refreshment."} />
            <meta property="twitter:image" content={image || defaultImage} />

            {/* Structured Data (JSON-LD) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;

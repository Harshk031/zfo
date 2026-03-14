import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BubbleCursor from '@/components/BubbleCursor';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata = {
    metadataBase: new URL('https://www.zfo.co.in'),
    title: {
        default: 'ZfO - Modern Indian Craft Soda | Buy Masala Soda in Glass Bottles',
        template: '%s | ZfO'
    },
    description: "ZfO is India's best masala soda in glass bottles. Buy craft masala soda online — real spices, no artificial flavours, premium 275ml glass breezer bottles. Order now from Delhi.",
    keywords: [
        'ZfO', 'zfo soda', 'ZFO craft soda', 'masala soda india', 'buy masala soda online',
        'indian craft soda', 'glass bottle soda india', 'masala soda glass bottle',
        'premium masala soda', 'craft soda delhi', 'real spice soda', 'breezer glass bottle',
        'artisan soda india', 'buy soda online india', 'best indian craft soda'
    ].join(', '),
    authors: [{ name: 'ZfO Beverages', url: 'https://www.zfo.co.in' }],
    creator: 'ZfO Beverages',
    publisher: 'ZfO',
    category: 'Food & Beverage',
    alternates: {
        canonical: 'https://www.zfo.co.in',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: 'https://www.zfo.co.in/',
        siteName: 'ZfO - Indian Craft Soda',
        title: 'ZfO - Buy Masala Soda in Glass Bottles | India Craft Soda Brand',
        description: "India's boldest craft masala soda. Real spices. 275ml glass bottles. No artificial ingredients. Order online.",
        images: [
            {
                url: 'https://www.zfo.co.in/logo.png',
                width: 1200,
                height: 630,
                alt: 'ZfO Masala Soda - Premium Indian Craft Soda in Glass Bottles',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@drinkzfo',
        title: 'ZfO - Modern Indian Craft Soda',
        description: 'Real masala. Glass bottles. India\'s boldest craft soda. Order now.',
        images: ['https://www.zfo.co.in/logo.png'],
    },
    verification: {
        google: 'PS7lpRtCNnbYaIZo40fhRnFnz-o7NZ8N0FCNWdM3Npc',
    },
    manifest: '/manifest.json',
    icons: {
        icon: '/logo.png',
        apple: '/logo.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                {/* Space Grotesk — premium geometric font */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet" />
                {/* Structured Data - Organization */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            name: 'ZfO Beverages',
                            brand: 'ZfO',
                            url: 'https://www.zfo.co.in',
                            logo: 'https://www.zfo.co.in/logo.png',
                            description: 'Premium masala soda crafted in glass bottles with balanced fizz and refined flavors',
                            founder: {
                                '@type': 'Person',
                                name: 'Harsh Katiyar',
                                jobTitle: 'Founder & CEO',
                                sameAs: ['https://www.linkedin.com/in/harsh-k-13a5a1340'],
                            },
                            sameAs: [
                                'https://www.instagram.com/drinkzfo',
                                'https://www.linkedin.com/company/zfo-beverages/',
                            ],
                            contactPoint: {
                                '@type': 'ContactPoint',
                                email: 'beverages@zfo.co.in',
                                contactType: 'Customer Service',
                                areaServed: 'IN',
                            },
                        }),
                    }}
                />
                {/* Structured Data - Product */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Product',
                            name: 'ZfO Premium Masala Soda in Glass Bottles',
                            brand: {
                                '@type': 'Brand',
                                name: 'ZfO',
                            },
                            category: 'Beverages > Soda > Craft Soda',
                            description: "India's finest craft soda in glass bottles. Premium beverage with authentic masala flavors, zero artificial ingredients. The best soda in glass bottles.",
                            image: 'https://www.zfo.co.in/bottle3.png',
                            material: 'Glass',
                            offers: {
                                '@type': 'Offer',
                                url: 'https://www.zfo.co.in',
                                priceCurrency: 'INR',
                                price: '50.00',
                                priceValidUntil: '2027-12-31',
                                itemCondition: 'https://schema.org/NewCondition',
                                availability: 'https://schema.org/InStoreOnly',
                                seller: {
                                    '@type': 'Organization',
                                    name: 'ZfO',
                                },
                            },
                        }),
                    }}
                />
            </head>
            <body className="bg-black text-white w-full min-h-screen">
                <ErrorBoundary>
                    <Navbar />
                    <BubbleCursor />
                    {children}
                    <Footer />
                </ErrorBoundary>
            </body>
        </html>
    );
}

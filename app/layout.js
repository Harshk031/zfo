import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BubbleCursor from '@/components/BubbleCursor';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata = {
    metadataBase: new URL('https://www.zfo.co.in'),
    title: {
        default: 'ZfO - Modern Indian Craft Soda | Real Spices. Glass Bottles.',
        template: '%s | ZfO'
    },
    description: "Bold masala soda crafted for the modern Indian palate. Real spices, no artificial nonsense, bottled in glass. A beverage built on honest ingredients and premium taste.",
    keywords: 'ZfO, zfo soda, craft soda, indian masala soda, glass bottle soda, real ingredients, premium beverage india, modern indian craft',
    authors: [{ name: 'Freshozz Beverages' }],
    creator: 'Freshozz Beverages',
    publisher: 'ZfO',
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
        siteName: 'ZfO - Modern Indian Craft',
        title: 'ZfO - Modern Indian Craft Soda | Real Spices. Glass Bottles.',
        description: 'Bold masala soda crafted for the modern Indian palate. Real spices, no artificial nonsense, bottled in glass.',
        images: [
            {
                url: '/logo.png',
                width: 1200,
                height: 630,
                alt: 'ZfO Logo',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ZfO - Modern Indian Craft Soda',
        description: 'Real spices. Glass bottles. No nonsense.',
        images: ['/logo.png'],
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
                {/* Structured Data - Organization */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            name: 'ZfO - Freshozz Beverages',
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
                                'https://www.linkedin.com/company/freshozz-beverages/',
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

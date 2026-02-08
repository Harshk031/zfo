import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BubbleCursor from '@/components/BubbleCursor';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata = {
    metadataBase: new URL('https://www.zfo.co.in'),
    title: {
        default: 'ZfO - Premium Masala Soda in Glass Bottles | Indian Craft Beverages',
        template: '%s | ZfO'
    },
    description: "ZfO - India's premium craft soda in glass bottles. Experience the finest beverage with authentic masala flavors, zero artificial ingredients. The best soda in glass bottles. Shop ZfO now.",
    keywords: 'ZfO, zfo soda, zfo beverage, beverage, soda, glass bottles, premium soda, craft soda, Indian soda, masala soda, glass bottle soda, glass bottled beverages, artisanal soda, craft beverages, fizzy drinks, Indian beverages, soft drinks India, premium beverages, natural soda, handcrafted soda, traditional soda, street soda, fizzy beverages India',
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
        siteName: 'ZfO - The Art of Fizz',
        title: 'ZfO - Premium Masala Soda in Glass Bottles | The Art of Fizz',
        description: 'Reclaiming the soul of soda. ZfO delivers premium masala soda with balanced fizz, refined masala, and honest flavors in elegant glass bottles.',
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
        title: 'ZfO - Premium Masala Soda in Glass Bottles',
        description: 'Crafted soda. Honest flavour. Real refreshment. Experience premium masala soda in glass bottles.',
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

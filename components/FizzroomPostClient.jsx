'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import ProgressiveImage from '@/components/ProgressiveImage';
import { useEffect } from 'react';

export default function FizzroomPostClient({ post }) {
    useEffect(() => {
        // Add Article structured data
        const schema = {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: `https://www.zfo.co.in${post.image}`,
            datePublished: new Date(post.date).toISOString(),
            dateModified: new Date(post.date).toISOString(),
            author: {
                '@type': 'Person',
                name: 'Team ZFO',
            },
            publisher: {
                '@type': 'Organization',
                name: 'ZfO - Freshozz Beverages',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://www.zfo.co.in/logo.png',
                },
            },
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://www.zfo.co.in/fizzroom/${post.id}`,
            },
        };

        // Inject schema into head
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        script.id = 'article-schema';
        document.head.appendChild(script);

        return () => {
            const existingScript = document.getElementById('article-schema');
            if (existingScript) {
                document.head.removeChild(existingScript);
            }
        };
    }, [post]);
    return (
        <article className="min-h-screen bg-black text-white pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <Link href="/fizzroom" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-8 uppercase text-sm tracking-widest">
                    <FaArrowLeft className="mr-2" /> ← EXIT ARTICLE
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 text-white leading-tight">
                        {post.title}
                    </h1>
                    <p className="text-white/60 text-lg mb-8 font-light max-w-2xl">{post.excerpt}</p>

                    <div className="mb-12 rounded-lg overflow-hidden">
                        <ProgressiveImage
                            src={post.image}
                            alt={post.title}
                            className="w-full h-auto"
                        />
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <div className="text-white/80 leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>

                    <div className="mt-16 pt-8 border-t border-white/10">
                        <Link href="/fizzroom" className="text-white/50 hover:text-white transition-colors uppercase text-sm tracking-widest">
                            ← BACK TO FIZZROOM
                        </Link>
                    </div>
                </motion.div>
            </div>
        </article>
    );
}

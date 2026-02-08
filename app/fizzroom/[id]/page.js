import { notFound } from 'next/navigation';
import { fizzPosts } from '@/data/fizzroomData';
import FizzroomPostClient from '@/components/FizzroomPostClient';

export default function FizzroomPost({ params }) {
    const post = fizzPosts.find((p) => p.id === parseInt(params.id));

    if (!post) {
        notFound();
    }

    return <FizzroomPostClient post={post} />;
}

// Generate static params for all blog posts
export function generateStaticParams() {
    return fizzPosts.map((post) => ({
        id: post.id.toString(),
    }));
}

// Generate metadata for each post
export function generateMetadata({ params }) {
    const post = fizzPosts.find((p) => p.id === parseInt(params.id));

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | ZfO Fizzroom`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.image],
            type: 'article',
            publishedTime: new Date(post.date).toISOString(),
            authors: ['Team ZFO'],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        },
        // Article structured data
        other: {
            'article:published_time': new Date(post.date).toISOString(),
            'article:author': 'Team ZFO',
            'article:section': post.category,
        },
    };
}

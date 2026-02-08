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
        },
    };
}

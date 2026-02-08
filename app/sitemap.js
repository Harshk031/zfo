import { fizzPosts } from '@/data/fizzroomData';

export default function sitemap() {
    const posts = fizzPosts.map((post) => ({
        url: `https://www.zfo.co.in/fizzroom/${post.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [
        {
            url: 'https://www.zfo.co.in',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://www.zfo.co.in/fizzroom',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...posts,
    ];
}

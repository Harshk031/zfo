import { fizzPosts } from '@/data/fizzroomData';

export default async function sitemap() {
    const baseUrl = 'https://www.zfo.co.in';
    const now = new Date('2026-03-14');

    // Static pages with real last-modified dates
    const staticPages = [
        {
            url: baseUrl,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/order`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/fizzroom`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date('2026-02-01'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: new Date('2026-02-01'),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    // Individual blog post pages
    const blogPosts = fizzPosts.map((post) => ({
        url: `${baseUrl}/fizzroom/${post.id}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    return [...staticPages, ...blogPosts];
}

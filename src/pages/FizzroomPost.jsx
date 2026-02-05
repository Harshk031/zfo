import { useParams } from "react-router-dom";
import { fizzPosts } from "../data/fizzroomData";
import { motion } from "framer-motion";
import { Breadcrumb } from "../components";
import { useSEO } from "../hooks/useSEO";

const FizzroomPost = () => {
    const { id } = useParams();
    const post = fizzPosts.find((p) => p.id === parseInt(id));

    if (!post) {
        return (
            <div className="min-h-screen bg-black text-white pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
                    <p className="text-white/70">The article you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    // SEO configuration for article page
    useSEO({
        title: post.title + ' | ZfO Fizzroom',
        description: post.excerpt,
        keywords: post.keywords || [post.category, "craft soda", "ZfO"],
        ogType: "article",
        article: {
            publishedTime: post.date,
            author: post.author || "ZfO Team",
            section: post.category,
            tag: post.keywords || [post.category]
        },
        canonicalUrl: 'https://www.zfo.co.in/fizzroom/' + id
    });

    // Breadcrumb items for this article
    const breadcrumbItems = [
        { label: "Home", url: 'https://www.zfo.co.in/' },
        { label: "Fizzroom", url: 'https://www.zfo.co.in/fizzroom' },
        { label: post.title, url: 'https://www.zfo.co.in/fizzroom/' + id }
    ];

    return (
        <article className="min-h-screen bg-black text-white pt-32 pb-20" itemScope itemType="https://schema.org/Article">
            <div className="max-w-4xl mx-auto px-6">
                <Breadcrumb items={breadcrumbItems} />

                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span 
                        className="inline-block px-4 py-1 bg-[#c41e3a] text-white font-bold tracking-[0.3em] uppercase mb-6 text-xs rounded-full"
                        itemProp="articleSection"
                    >
                        {post.category}
                    </span>
                    <h1 
                        className="headline-xl text-distressed mb-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                        style={{backgroundColor: '#fafafa'}}
                        itemProp="headline"
                    >
                        {post.title}
                    </h1>

                    <div className="flex items-center space-x-4 text-[#a0a0a0] text-sm mb-12 border-b border-white/10 pb-8">
                        <time dateTime={post.date} itemProp="datePublished">{post.date}</time>
                        <span className="text-[#c41e3a]">•</span>
                        <span itemProp="timeRequired">2 Min Read</span>
                        <meta itemProp="author" content="ZfO Team" />
                        <meta itemProp="publisher" content="ZfO" />
                    </div>
                </motion.header>

                <motion.figure
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full aspect-video rounded-xl overflow-hidden mb-12 border border-white/10"
                >
                    <img 
                        src={post.image} 
                        alt={`Illustration for: ${post.title}`}
                        className="w-full h-full object-cover"
                        itemProp="image"
                        loading="eager"
                    />
                </motion.figure>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="space-y-8"
                    itemProp="articleBody"
                >
                    <p className="text-3xl md:text-4xl font-bold text-[#c41e3a] leading-tight tracking-tight">
                        {post.excerpt}
                    </p>
                    <div className="text-[#fafafa] text-lg md:text-xl font-medium leading-loose space-y-6 whitespace-pre-line">
                        {post.content.split('\n\n').map((paragraph, index) => (
                            <motion.p 
                                key={index} 
                                className="border-l-2 border-[#c41e3a] pl-6 hover:border-white transition-colors duration-300"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index }}
                            >
                                {paragraph}
                            </motion.p>
                        ))}
                    </div>
                </motion.div>

                {/* Related Articles Section */}
                {post.relatedArticles && post.relatedArticles.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-16 pt-12 border-t border-white/10"
                    >
                        <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {post.relatedArticles.map((relatedId) => {
                                const relatedPost = fizzPosts.find(p => p.id === relatedId);
                                if (!relatedPost) return null;
                                return (
                                    <a 
                                        key={relatedId}
                                        href={`/fizzroom/${relatedId}`}
                                        className="block p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                                    >
                                        <span className="text-[#c41e3a] text-xs font-bold uppercase tracking-wider mb-2 block">
                                            {relatedPost.category}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {relatedPost.title}
                                        </h3>
                                        <p className="text-white/60 text-sm">
                                            {relatedPost.excerpt.substring(0, 100)}...
                                        </p>
                                    </a>
                                );
                            })}
                        </div>
                    </motion.section>
                )}
            </div>
        </article>
    );
};

export default FizzroomPost;

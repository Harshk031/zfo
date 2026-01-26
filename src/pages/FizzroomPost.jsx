import { useParams, Link } from "react-router-dom";
import { fizzPosts } from "../data/fizzroomData";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

const FizzroomPost = () => {
    const { id } = useParams();
    const post = fizzPosts.find((p) => p.id === parseInt(id));

    if (!post) {
        return <div className="text-white text-center pt-40">Fizz not found.</div>;
    }

    return (
        <article className="min-h-screen bg-black text-white pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <Link to="/fizzroom" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-8 uppercase text-sm tracking-widest">
                    <FaArrowLeft className="mr-2" /> Back to The Fizzroom
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-yellow-400 font-bold tracking-[0.2em] uppercase mb-4 block text-sm">{post.category}</span>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 mix-blend-screen drop-shadow-xl">
                        {post.title}
                    </h1>

                    <div className="flex items-center space-x-4 text-white/40 font-mono text-sm mb-12 border-b border-white/10 pb-8">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>5 Min Read</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full aspect-video rounded-xl overflow-hidden mb-12 border border-white/10"
                >
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="prose prose-invert prose-lg max-w-none text-white/80 font-light"
                >
                    <p className="lead text-2xl mb-8 text-white">{post.excerpt}</p>
                    <p className="whitespace-pre-line leading-relaxed">{post.content}</p>
                </motion.div>
            </div>
        </article>
    );
};

export default FizzroomPost;

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
                    <span className="inline-block px-4 py-1 bg-[#c41e3a] text-white font-bold tracking-[0.3em] uppercase mb-6 text-xs rounded-full">{post.category}</span>
                    <h1 className="headline-xl text-distressed mb-6" style={{backgroundColor: '#fafafa'}}>
                        {post.title}
                    </h1>

                    <div className="flex items-center space-x-4 text-[#a0a0a0] text-sm mb-12 border-b border-white/10 pb-8">
                        <span>{post.date}</span>
                        <span className="text-[#c41e3a]">•</span>
                        <span>2 Min Read</span>
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
                    className="space-y-8"
                >
                    <p className="text-3xl md:text-4xl font-bold text-[#c41e3a] leading-tight tracking-tight">
                        {post.excerpt}
                    </p>
                    <div className="text-[#fafafa] text-lg md:text-xl font-medium leading-loose space-y-6 whitespace-pre-line">
                        {post.content.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="border-l-2 border-[#c41e3a] pl-6 hover:border-white transition-colors duration-300">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </motion.div>
            </div>
        </article>
    );
};

export default FizzroomPost;

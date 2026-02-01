import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fizzPosts } from "../data/fizzroomData";
import { FaArrowRight } from "react-icons/fa";

const FizzroomTeaser = () => {
    // Show only first 3 posts
    const recentPosts = fizzPosts.slice(0, 3);

    return (
        <section className="py-24 bg-black text-white relative z-20 border-t border-white/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <h2 className="text-sm font-bold tracking-[0.2em] text-yellow-400 mb-4 uppercase">
                            Reality Check.
                        </h2>
                        <h3 className="text-4xl md:text-6xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">
                            THE FIZZROOM.
                        </h3>
                    </div>

                    <Link to="/fizzroom" className="hidden md:flex items-center space-x-2 text-white/60 hover:text-yellow-400 transition-colors uppercase text-xs tracking-widest border border-white/20 px-6 py-3 rounded-full hover:border-yellow-400/50">
                        <span>ENTER THE VOID ↗</span>
                        <FaArrowRight />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recentPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group block"
                        >
                            <Link to={`/fizzroom/${post.id}`}>
                                <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6 border border-white/10 group-hover:border-yellow-400/30 transition-colors">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    />
                                </div>
                                <div className="flex items-center space-x-2 text-xs text-yellow-400 font-bold uppercase tracking-widest mb-3">
                                    <span>{post.category}</span>
                                    <span className="text-white/20">•</span>
                                    <span className="text-white/40 font-mono">{post.date}</span>
                                </div>
                                <h4 className="text-xl font-bold uppercase leading-tight group-hover:text-yellow-400 transition-colors">
                                    {post.title}
                                </h4>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 md:hidden">
                    <Link to="/fizzroom" className="flex items-center justify-center space-x-2 text-white hover:text-yellow-400 transition-colors uppercase text-sm tracking-widest border border-white/20 py-4 rounded-full w-full">
                        <span>DIVE IN ↗</span>
                        <FaArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FizzroomTeaser;

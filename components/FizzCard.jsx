'use client';

import { motion } from "framer-motion";
import Link from "next/link";

const FizzCard = ({ post, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative block"
        >
            <Link href={`/fizzroom/${post.id}`} className="block h-full">
                <div className="relative overflow-hidden aspect-[4/5] md:aspect-square mb-4 rounded-lg bg-white/5 border border-white/10 group-hover:border-gray-400/50 transition-colors duration-500">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    <div className="absolute top-4 left-4 bg-gray-300 text-black text-xs font-bold px-3 py-1 uppercase tracking-widest transform -skew-x-12">
                        {post.category}
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-white/40 text-xs tracking-widest uppercase font-mono">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>By Team ZFO</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black leading-tight group-hover:text-gray-300 transition-colors uppercase tracking-tighter">
                        {post.title}
                    </h3>
                    <p className="text-white/60 text-sm line-clamp-2 font-light">
                        {post.excerpt}
                    </p>
                    <div className="pt-2">
                        <span className="inline-block border-b border-white/30 text-xs uppercase tracking-widest group-hover:border-gray-400 group-hover:text-gray-300 transition-all pb-0.5">
                            SPILL THE TEA →
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default FizzCard;

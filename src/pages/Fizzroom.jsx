import { motion } from "framer-motion";
import { fizzPosts } from "../data/fizzroomData";
import FizzCard from "../components/FizzCard";

const Fizzroom = () => {
    return (
        <div className="min-h-screen pt-24 pb-20 px-4 md:px-12 bg-black text-white relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-20 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 mix-blend-screen drop-shadow-2xl"
                    >
                        The Fizzroom
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-light"
                    >
                        Culture. Flavors. The ZFO Lifestyle. <br className="hidden md:block" />
                        Dive into what makes us pop.
                    </motion.p>
                </div>

                {/* Featured / Hero Post (Optional 1st item) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {fizzPosts.map((post, index) => (
                        <FizzCard key={post.id} post={post} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Fizzroom;

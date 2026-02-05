import { motion } from "framer-motion";
import { fizzPosts } from "../data/fizzroomData";
import FizzCard from "../components/FizzCard";
import { Breadcrumb } from "../components";
import { useSEO } from "../hooks/useSEO";

const Fizzroom = () => {
    useSEO({
        title: "The Fizzroom | ZfO Craft Soda Blog - Articles on Craft Beverages",
        description: "Explore the ZfO Fizzroom - our craft soda blog featuring articles on sustainable beverages, glass bottle packaging, masala soda history, and craft vs corporate soda. Written by ZfO team.",
        keywords: ["craft soda blog", "sustainable beverages", "glass bottle soda", "masala soda", "craft vs corporate soda", "ZfO articles"],
        ogType: "website",
        canonicalUrl: `${window.location.origin}/fizzroom`
    });
    
    return (
        <div className="min-h-screen pt-24 pb-20 px-4 md:px-12 bg-black text-white relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <Breadcrumb items={[
                    { label: "Home", url: `${window.location.origin}/` },
                    { label: "Fizzroom", url: `${window.location.origin}/fizzroom` }
                ]} />

                {/* Header */}
                <div className="mb-20 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-gray-300 via-gray-500 to-gray-700 mix-blend-screen drop-shadow-2xl"
                    >
                        FIZZROOM.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-light uppercase tracking-wider"
                    >
                        Hot takes. Cold truths.<br className="hidden md:block" />
                        Read at your own risk.
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

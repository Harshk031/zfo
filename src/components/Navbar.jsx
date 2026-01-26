import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Story", href: "/#promosection" },
    { name: "Flavours", href: "/#productdetails" },
    { name: "The Fizzroom", href: "/fizzroom" },
    { name: "Contact", href: "#footer" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Menu overlay variants
    const menuVariants = {
        closed: {
            y: "-100%",
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1], // Custom easing for premium feel
            },
        },
        open: {
            y: "0%",
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
            },
        },
    };

    // Staggered links variants
    const containerVariants = {
        open: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
        closed: {
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    };

    const itemVariants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: 50 },
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-6 right-6 z-50 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white text-xl shadow-lg hover:bg-white/20 transition-colors cursor-pointer"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle Menu"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FaTimes />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FaBars />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Brand Logo (Fixed, visible always) */}
            <div className="fixed top-6 left-6 z-50">
                <span className="text-xl font-extrabold tracking-[0.2em] text-white mix-blend-difference">
                    ZFO
                </span>
            </div>

            {/* Full Screen Menu */}
            <motion.nav
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={menuVariants}
                className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center overflow-hidden"
            >
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <motion.ul
                    variants={containerVariants}
                    className="relative z-10 text-center space-y-4 md:space-y-6"
                >
                    {navLinks.map((link, index) => (
                        <motion.li
                            key={link.name}
                            variants={itemVariants}
                            className="overflow-hidden"
                        >
                            <a
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block text-4xl sm:text-5xl md:text-7xl font-extrabold text-white hover:text-yellow-400 transition-colors tracking-tight uppercase"
                            >
                                <span className="text-xs sm:text-sm md:text-lg font-light text-white/40 align-top mr-2 md:mr-4">
                                    0{index + 1}
                                </span>
                                {link.name}
                            </a>
                        </motion.li>
                    ))}
                </motion.ul>

                {/* Footer Info in Menu */}
                <motion.div
                    variants={itemVariants}
                    className="absolute bottom-12 text-white/30 text-xs sm:text-sm tracking-widest"
                >
                    CRAFTED IN INDIA
                </motion.div>
            </motion.nav>
        </>
    );
};

export default Navbar;

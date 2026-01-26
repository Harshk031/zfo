import { motion } from "framer-motion";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white pt-16 md:pt-20 pb-8 md:pb-10 px-6 overflow-hidden">

      {/* Divider line */}
      <div className="max-w-7xl mx-auto border-t border-white/10 mb-10 md:mb-14" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12"
      >

        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-extrabold tracking-widest text-yellow-400">
            ZFO
          </h2>
          <p className="mt-3 text-sm text-white/60 max-w-xs">
            The Art of Fizz
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-8 text-xl">
          <a
            href="https://www.instagram.com/drinkzfo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-yellow-400 transition"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.linkedin.com/company/freshozz-beverages/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-yellow-400 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>

        {/* Professional presence */}
        <div className="text-center md:text-right">
          <p className="text-sm text-white/50">
            For partnerships & investment
          </p>
          <a
            href="mailto:beverages@zfo.co.in"
            className="mt-2 inline-block text-yellow-400 hover:underline text-xs sm:text-sm tracking-wide"
          >
            beverages@zfo.co.in →
          </a>
        </div>
      </motion.div>

      {/* Bottom */}
      <div className="mt-12 md:mt-16 text-center text-xs text-white/40">
        © {new Date().getFullYear()} ZfO · Crafted in India
      </div>
    </footer>
  );
};

export default Footer;

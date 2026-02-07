import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="relative bg-black text-white pt-20 md:pt-32 pb-10 px-6 overflow-hidden flex flex-col justify-between"
    >
      {/* MASSIVE BACKGROUND BRANDING */}
      <div className="absolute bottom-20 left-0 w-full text-center text-[25vw] font-black text-white/[0.03] select-none pointer-events-none leading-none tracking-tighter">
        ZFO
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          {/* Brand Info */}
          <div>
            <h2 className="text-3xl font-bold tracking-[0.2em] text-white mb-2">
              ZFO
            </h2>
            <p className="text-white/50 text-sm tracking-wide uppercase">
              Est. 2024 · No 🧢
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-8">
            {[
              { icon: <FaInstagram />, href: "https://www.instagram.com/drinkzfo" },
              { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/company/freshozz-beverages/" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-white/40 hover:text-gray-300 transition-colors duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-10" />

        <div className="flex flex-col md:flex-row justify-between text-xs sm:text-sm text-white/30 tracking-widest uppercase gap-4">
          <p>© {new Date().getFullYear()} ZfO Beverages.</p>

          <div className="flex gap-6 items-center">
            <a href="mailto:beverages@zfo.co.in" className="hover:text-white transition-colors">
              Slide into DMs
            </a>
            <span className="text-white/50 text-lg">®</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

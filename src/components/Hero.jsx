import { motion } from "framer-motion";
import CursorBottle from "./CursorBottle";
import { heroLines } from "../data/text";
import { useEffect, useState, useRef } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  // rotating hero lines
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % heroLines.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Try autoplay with audio, fallback to muted
  useEffect(() => {
    const tryAutoplay = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.muted = false;
          await videoRef.current.play();
          setIsMuted(false);
        } catch (err) {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => { });
          }
          setIsMuted(true);
        }
      }
    };
    tryAutoplay();
  }, []);

  const toggleMute = async () => {
    if (videoRef.current) {
      if (isMuted) {
        try {
          videoRef.current.muted = false;
          await videoRef.current.play();
          setIsMuted(false);
        } catch (err) {
          console.log("Could not unmute:", err);
        }
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">

      {/* Background Video - Polar Bear Launch Announcement */}
      <video
        ref={videoRef}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        onCanPlay={() => {
          if (videoRef.current) videoRef.current.style.opacity = 1;
        }}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-0"
      >
        <source src="/polar-bear.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/40" />

      {/* Audio Toggle Button - Modern Styled */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-50 group"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-full blur-md transition-all duration-500 ${isMuted ? 'bg-gray-500/30' : 'bg-white/20'}`} />

        {/* Button container */}
        <div className="relative w-11 h-11 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-lg shadow-black/20 group-hover:border-white/40 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-300">
          {/* Icon */}
          <div className="relative">
            {isMuted ? (
              <FaVolumeMute className="text-white/70 text-base group-hover:text-white transition-colors" />
            ) : (
              <FaVolumeUp className="text-white text-base transition-colors" />
            )}

            {/* Sound wave animation when unmuted */}
            {!isMuted && (
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 flex gap-0.5">
                <span className="w-0.5 h-2 bg-white/60 rounded-full animate-pulse" />
                <span className="w-0.5 h-3 bg-white/60 rounded-full animate-pulse delay-75" />
                <span className="w-0.5 h-1.5 bg-white/60 rounded-full animate-pulse delay-150" />
              </div>
            )}
          </div>
        </div>

        {/* Tooltip */}
        <span className="absolute top-full mt-2 right-0 text-[10px] text-white/50 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {isMuted ? 'Unmute' : 'Mute'}
        </span>
      </button>

      <div className="relative z-20 min-h-screen w-full flex flex-col md:flex-row items-center justify-center md:justify-between py-20 md:py-0">

        {/* TEXT BLOCK */}
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 text-center md:text-left z-10 mb-8 md:mb-0"
        >
          {/* Brand identity */}
          <p className="subtitle-script text-[#c41e3a] mb-3 md:mb-2 uppercase tracking-widest text-xs sm:text-sm font-bold">
            GATEKEEPING FLAVOR.
          </p>

          {/* Hero emotion line - Lagunitas Style with Texture */}
          <h1 className="headline-xl text-distressed drop-shadow-2xl break-words text-white px-4 md:px-0 leading-tight max-w-full overflow-hidden">
            {heroLines[index]}
          </h1>

          {/* SUB-TEXT / DESCRIPTION */}
          {/* SUB-TEXT / DESCRIPTION - Adjusted for readability with new fonts */}
          <p className="mt-6 md:mt-8 text-[#a0a0a0] text-lg sm:text-xl md:text-2xl font-light max-w-md mx-auto md:mx-0 leading-relaxed tracking-wide">
            Masala soda that <span className="text-white font-bold italic">actually</span> <span className="text-[#ffcc00] font-black">SLAPS</span>. <br className="hidden md:block" />
            No <span className="text-red-500 font-bold line-through decoration-2 decoration-red-500">NPCs</span> allowed.
          </p>
        </motion.div>

        {/* CURSOR BOTTLE */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative z-0">
          {/* Mobile glow behind bottle */}
          <div className="absolute inset-0 bg-white/10 blur-[80px] md:hidden rounded-full transform scale-75" />

          <div className="scale-75 sm:scale-85 md:scale-110 md:translate-x-12">
            <CursorBottle />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

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
    }, 2600);
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
            videoRef.current.play().catch(() => {});
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
    <section className="relative h-screen bg-[#0a0a0a] overflow-hidden">

      {/* Background Video - Polar Bear Launch Announcement */}
      <video
        ref={videoRef}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/polar-bear.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Audio Toggle Button */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-50 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-black/70 transition-all"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <FaVolumeMute className="text-white text-lg" />
        ) : (
          <FaVolumeUp className="text-white text-lg" />
        )}
      </button>

      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">

        {/* TEXT BLOCK */}
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 text-left z-10 pt-20 md:pt-0 px-4 sm:px-0 overflow-visible"
        >
          {/* Brand identity */}
          <p className="subtitle-script text-[#c41e3a] mb-2 uppercase tracking-widest text-sm font-bold">
            UNAPOLOGETICALLY BOLD.
          </p>

          {/* Hero emotion line - Lagunitas Style with Texture */}
          <h1 className="headline-xl text-distressed drop-shadow-2xl break-words" style={{backgroundColor: '#fafafa'}}>
            {heroLines[index]}
          </h1>

          {/* SUB-TEXT / DESCRIPTION */}
          <p className="mt-6 text-[#a0a0a0] text-lg md:text-xl font-light max-w-sm leading-relaxed">
            Masala craft soda. <br className="hidden md:block" />
            Zero fake. All bite.
          </p>
        </motion.div>

        {/* CURSOR BOTTLE */}
        <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0 relative z-0">
          {/* Mobile glow behind bottle */}
          <div className="absolute inset-0 bg-white/10 blur-[80px] md:hidden rounded-full transform scale-75" />

          <div className="scale-[0.85] sm:scale-90 md:scale-110 md:translate-x-12 translate-y-4 md:translate-y-0">
            <CursorBottle />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

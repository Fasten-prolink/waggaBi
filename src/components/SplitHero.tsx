"use client";

import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

export default function SplitHero({ dict }: { dict: any }) {
  const [hovered, setHovered] = useState<"left" | "right" | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="accueil" className="relative w-full h-[100dvh] snap-start bg-black overflow-hidden flex flex-col md:flex-row">
      
      {/* LEFT: Vol Découverte */}
      <motion.div 
        className="relative flex-1 h-1/2 md:h-full cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-white/20"
        onMouseEnter={() => setHovered("left")}
        onMouseLeave={() => setHovered(null)}
        onClick={() => scrollTo("decouverte")}
        animate={{ flex: hovered === "left" ? 1.2 : hovered === "right" ? 0.8 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <video
          src="/media/decouverteportrait.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter drop-shadow-xl mb-2"
          >
            {dict.hero.decouverte.title}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl text-white/90 font-light mb-4 md:mb-6 drop-shadow-md"
          >
            {dict.hero.decouverte.price}
          </motion.div>
          <motion.div 
            animate={{ opacity: hovered === "left" ? 1 : 0.6 }}
            className="text-xs md:text-base uppercase tracking-widest text-white/80 font-semibold"
          >
            {dict.hero.decouverte.explore}
          </motion.div>
        </div>
      </motion.div>

      {/* RIGHT: Vol Wagga */}
      <motion.div 
        className="relative flex-1 h-1/2 md:h-full cursor-pointer overflow-hidden"
        onMouseEnter={() => setHovered("right")}
        onMouseLeave={() => setHovered(null)}
        onClick={() => scrollTo("wagga")}
        animate={{ flex: hovered === "right" ? 1.2 : hovered === "left" ? 0.8 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <video
          src="/media/portraitwagga.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter drop-shadow-xl mb-2"
          >
            {dict.hero.wagga.title}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-2xl text-white/90 font-light mb-4 md:mb-6 drop-shadow-md"
          >
            {dict.hero.wagga.price}
          </motion.div>
          <motion.div 
            animate={{ opacity: hovered === "right" ? 1 : 0.6 }}
            className="text-xs md:text-base uppercase tracking-widest text-white/80 font-semibold"
          >
            {dict.hero.wagga.explore}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 cursor-pointer pointer-events-auto group"
        onClick={() => scrollTo("ecole")}
      >
        <span className="text-white/60 text-[10px] md:text-xs uppercase tracking-widest group-hover:text-white transition-colors">
          {dict.hero.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <FaChevronDown className="text-white/60 group-hover:text-white transition-colors w-4 h-4 md:w-5 md:h-5" />
        </motion.div>
      </motion.div>

    </section>
  );
}

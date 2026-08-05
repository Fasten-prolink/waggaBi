"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaChevronRight, FaChevronLeft, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

// État global pour synchroniser le son entre toutes les vidéos
let globalIsMuted = true;
const toggleGlobalMute = (muted: boolean) => {
  globalIsMuted = muted;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('globalMuteChange', { detail: muted }));
  }
};

interface ProjectSlideProps {
  imageSrc?: string;
  videoSrc?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "right" | "center";
  verticalAlign?: "top" | "center" | "bottom";
  showHint?: boolean;
  onHintClick?: () => void;
  showPrevHint?: boolean;
  onPrevClick?: () => void;
  nextHintText?: string;
  prevHintText?: string;
  imagePosition?: string;
  children?: React.ReactNode;
}

export default function ProjectSlide({
  imageSrc,
  videoSrc,
  title,
  subtitle,
  description,
  align = "left",
  verticalAlign = "center",
  showHint = false,
  onHintClick,
  showPrevHint = false,
  onPrevClick,
  nextHintText = "Suivant",
  prevHintText = "Retour",
  imagePosition = "center",
  children
}: ProjectSlideProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Synchronisation de l'état global
  useEffect(() => {
    setIsMuted(globalIsMuted);
    const handleGlobalMute = (e: any) => {
      setIsMuted(e.detail);
    };
    window.addEventListener('globalMuteChange', handleGlobalMute);
    return () => window.removeEventListener('globalMuteChange', handleGlobalMute);
  }, []);

  // Lecture/Pause automatique selon la visibilité
  useEffect(() => {
    if (!videoRef.current || !containerRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {
            // Si la lecture échoue (ex: politique autoplay sans interaction), on remet en muet
            if (videoRef.current && !videoRef.current.muted) {
              videoRef.current.muted = true;
              setIsMuted(true);
              toggleGlobalMute(true);
              videoRef.current.play().catch(() => {});
            }
          });
        } else {
          videoRef.current?.pause();
        }
      });
    }, { threshold: 0.3 }); // 30% visible = on lance la lecture

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMuteToggle = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    toggleGlobalMute(newState);
  };

  return (
    <div ref={containerRef} className={`relative w-screen h-[100dvh] shrink-0 snap-start bg-black flex flex-col md:flex-row ${verticalAlign === 'top' ? 'items-start pt-32 md:pt-40' : verticalAlign === 'bottom' ? 'items-end pb-32' : 'items-center'} justify-center overflow-hidden`}>
      
      {/* Fullscreen Background */}
      {videoSrc ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={(e) => {
              const video = e.currentTarget;
              // Coupe les 6 dernières secondes
              if (video.duration && video.currentTime >= video.duration - 6) {
                video.currentTime = 0;
                video.play();
              }
            }}
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />
        </div>
      ) : imageSrc ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={imageSrc}
            alt={title || "Image de fond"}
            fill
            className={`object-cover opacity-50 object-${imagePosition}`}
            quality={90}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ) : null}

      {/* Content */}
      {title && (
        <div className={`relative z-10 w-full max-w-7xl pr-8 pl-12 md:px-16 pb-24 md:pb-0 flex flex-col ${align === "right" ? "items-end text-right" : align === "center" ? "items-center text-center" : "items-start text-left"} max-h-[85vh] overflow-y-auto hide-scrollbar`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-20%" }}
            className="max-w-2xl mt-auto mb-auto py-8"
          >
            {subtitle && (
              <h4 className="text-sm md:text-base uppercase tracking-widest text-gray-400 font-semibold mb-4 mt-8 md:mt-0">
                {subtitle}
              </h4>
            )}
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-none mb-8 drop-shadow-xl">
              {title}
            </h2>
            {description && (
              <p className="text-base md:text-xl text-gray-200 font-light leading-relaxed mb-8">
                {description}
              </p>
            )}
          </motion.div>
        </div>
      )}

      {/* Audio Toggle */}
      {videoSrc && (
        <div className="absolute bottom-12 left-6 md:bottom-10 md:left-10 z-30">
          <button 
            onClick={handleMuteToggle}
            className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm group"
          >
            {isMuted ? (
              <FaVolumeMute size={18} className="opacity-70 group-hover:opacity-100" />
            ) : (
              <FaVolumeUp size={18} className="opacity-70 group-hover:opacity-100" />
            )}
          </button>
        </div>
      )}

      {/* Arbitrary content if passed */}
      {children && (
        <div className="relative z-10 w-full max-w-7xl pr-8 pl-12 md:px-16 max-h-[85vh] overflow-y-auto hide-scrollbar py-8 md:py-0">
          {children}
        </div>
      )}

      {/* Swipe Hint */}
      {showHint && (
        <motion.div 
          onClick={onHintClick}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
          className="absolute right-4 md:right-16 bottom-24 md:bottom-auto md:top-1/2 translate-y-0 md:-translate-y-1/2 z-20 flex flex-col items-center gap-2 text-white/40 md:text-white/70 cursor-pointer hover:text-white transition-colors drop-shadow-xl"
        >
          <span className="uppercase tracking-widest text-[10px] md:text-xs rotate-90 mb-10 md:mb-12 whitespace-nowrap font-medium md:font-bold">{nextHintText}</span>
          <FaChevronRight className="w-5 h-5 md:w-8 md:h-8" />
        </motion.div>
      )}

      {/* Prev Hint */}
      {showPrevHint && (
        <motion.div 
          onClick={onPrevClick}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
          className="absolute left-4 md:left-16 bottom-24 md:bottom-auto md:top-1/2 translate-y-0 md:-translate-y-1/2 z-20 flex flex-col items-center gap-2 text-white/40 md:text-white/70 cursor-pointer hover:text-white transition-colors drop-shadow-xl"
        >
          <FaChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
          <span className="uppercase tracking-widest text-[10px] md:text-xs -rotate-90 mt-10 md:mt-12 whitespace-nowrap font-medium md:font-bold">{prevHintText}</span>
        </motion.div>
      )}

    </div>
  );
}

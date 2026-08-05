"use client";

import React, { useRef, useState } from "react";
import ProjectSlide from "./ProjectSlide";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

interface ProjectSectionProps {
  id: string;
  imageSrc?: string;
  videoSrc?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "right" | "center";
  verticalAlign?: "top" | "center" | "bottom";
  hasMore?: boolean;
  nextHintText?: string;
  prevHintText?: string;
  showScrollDown?: boolean;
  nextSectionId?: string;
  children?: React.ReactNode;
}

export default function ProjectSection({
  id,
  imageSrc,
  videoSrc,
  title,
  subtitle,
  description,
  align = "left",
  verticalAlign = "center",
  children,
  hasMore = false,
  nextHintText,
  prevHintText,
  showScrollDown = true,
  nextSectionId
}: ProjectSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: window.innerWidth, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -window.innerWidth, behavior: "smooth" });
    }
  };

  const childrenArray = React.Children.toArray(children);
  const hasCover = Boolean(title || imageSrc || videoSrc);
  const totalSlides = (hasCover ? 1 : 0) + childrenArray.length;
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = window.innerWidth;
      const currentIndex = Math.round(scrollLeft / width);
      if (currentIndex !== activeSlide) {
        setActiveSlide(currentIndex);
      }
    }
  };

  const scrollToSlide = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: index * window.innerWidth, behavior: "smooth" });
    }
  };

  return (
    <div id={id} className="relative w-full h-[100dvh] snap-start bg-black">
      <section 
        ref={scrollRef} 
        onScroll={handleScroll}
        className="w-full h-full flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar"
      >
        {/* Couverture Principale */}
        {(title || imageSrc || videoSrc) && (
          <ProjectSlide 
            imageSrc={imageSrc}
            videoSrc={videoSrc}
            title={title}
            subtitle={subtitle}
            description={description}
            align={align}
            verticalAlign={verticalAlign}
            showHint={hasMore || childrenArray.length > 0}
            onHintClick={scrollRight}
            showPrevHint={false}
            nextHintText={nextHintText}
            prevHintText={prevHintText}
          />
        )}
        
        {/* Slides additionnels */}
        {childrenArray.map((child, index) => {
          const isLast = index === childrenArray.length - 1;
          // @ts-ignore - On injecte les props de swipe dynamiquement
          return React.cloneElement(child, {
            showHint: !isLast,
            onHintClick: scrollRight,
            showPrevHint: hasCover ? true : index > 0,
            onPrevClick: scrollLeft
          });
        })}
      </section>

      {/* Horizontal Navigation Dots */}
      {totalSlides > 1 && (
        <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-0">
          {Array.from({ length: totalSlides }).map((_, index) => {
            const isActive = activeSlide === index;
            return (
              <React.Fragment key={index}>
                <button
                  onClick={() => scrollToSlide(index)}
                  className="w-8 h-8 flex items-center justify-center focus:outline-none group"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div 
                    className={`transition-all duration-300 ease-out rounded-full bg-white ${
                      isActive 
                        ? "w-2.5 h-2.5 opacity-100 shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                        : "w-1.5 h-1.5 opacity-40 group-hover:opacity-100 group-hover:w-2 group-hover:h-2"
                    }`}
                  />
                </button>
                {index < totalSlides - 1 && (
                  <div className="w-6 h-[2px] bg-white/20 -mx-1" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Scroll Down Indicator */}
      {showScrollDown && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 ${nextSectionId ? 'cursor-pointer pointer-events-auto group' : 'pointer-events-none group'}`}
          onClick={() => {
            if (nextSectionId) {
              const el = document.getElementById(nextSectionId);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <span className="text-white/60 text-[10px] md:text-xs uppercase tracking-widest group-hover:text-white transition-colors">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <FaChevronDown className="text-white/60 group-hover:text-white transition-colors w-4 h-4 md:w-5 md:h-5" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

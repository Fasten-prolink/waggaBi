"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useEffect } from "react";

interface BookingModalProps {
  url: string;
  onClose: () => void;
}

export default function BookingModal({ url, onClose }: BookingModalProps) {
  // Prevent scrolling on the body when the modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-10"
      >
        <motion.div 
          initial={{ y: 50, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 20, scale: 0.95 }}
          className="relative w-full max-w-5xl h-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header du Modal */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200 bg-gray-50 gap-4">
            <h3 className="text-lg font-bold text-gray-800 uppercase tracking-widest text-center sm:text-left">Réservation Waggas School</h3>
            
            <div className="flex items-center gap-4">
              {/* Fallback button pour Safari / Cookies tiers */}
              <a 
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline flex items-center gap-1 text-center sm:text-left"
              >
                Erreur de cookies ? Ouvrir dans une nouvelle page
              </a>

              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <FaTimes className="text-gray-600 w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Iframe MyRezApp */}
          <div className="flex-1 w-full relative">
            <iframe 
              src={url}
              className="absolute inset-0 w-full h-full border-0"
              title="Réservation en ligne"
              allowFullScreen
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

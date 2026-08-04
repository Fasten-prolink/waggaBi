'use client';

import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-4 md:bottom-10 md:right-10 z-50 flex flex-col gap-4">
      <motion.a 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href="mailto:contact@waggaschool.com"
        className="w-12 h-12 md:w-14 md:h-14 bg-black/40 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/90 hover:bg-white hover:text-black hover:border-white transition-colors shadow-xl group"
        aria-label="Envoyer un email"
      >
        <FaEnvelope className="w-5 h-5 md:w-6 md:h-6" />
      </motion.a>
      
      <motion.a 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href="tel:+33600000000"
        className="w-12 h-12 md:w-14 md:h-14 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.4)] group relative"
        aria-label="Appeler par téléphone"
      >
        <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-30"></div>
        <FaPhone className="w-4 h-4 md:w-5 md:h-5 relative z-10" />
      </motion.a>
    </div>
  );
}

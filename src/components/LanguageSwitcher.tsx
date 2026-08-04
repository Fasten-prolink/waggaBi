'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { i18n } from '@/i18n-config';
import { FaChevronDown } from 'react-icons/fa';

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const switchLang = (locale: string) => {
    setIsOpen(false);
    router.push(redirectedPathName(locale));
  };

  const flags: Record<string, string> = {
    fr: 'https://flagcdn.com/w40/fr.png',
    en: 'https://flagcdn.com/w40/gb.png',
    es: 'https://flagcdn.com/w40/es.png',
    de: 'https://flagcdn.com/w40/de.png',
    nl: 'https://flagcdn.com/w40/nl.png'
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white/90 hover:bg-black/60 transition-all"
      >
        <img src={flags[currentLang] || flags['fr']} alt={currentLang} className="w-5 h-auto rounded-[2px] shadow-sm" />
        <FaChevronDown className={`w-3 h-3 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 right-0 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden flex flex-col z-50 min-w-[120px]"
          >
            {i18n.locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLang(locale)}
                className={`flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors ${locale === currentLang ? 'bg-white/5' : ''}`}
              >
                <img src={flags[locale]} alt={locale} className="w-5 h-auto rounded-[2px] shadow-sm" />
                <span className={`text-sm font-medium uppercase tracking-wider ${locale === currentLang ? 'text-white' : 'text-white/70'}`}>{locale}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

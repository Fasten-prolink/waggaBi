"use client";

import Image from "next/image";
import Link from "next/link";
import SplitHero from "@/components/SplitHero";
import ProjectSection from "@/components/ProjectSection";
import ProjectSlide from "@/components/ProjectSlide";
import { FaStar, FaCar, FaWalking, FaShip, FaBus, FaArrowRight, FaBars } from "react-icons/fa";
import { useState } from "react";
import BookingModal from "@/components/BookingModal";
import SideNavigation from "@/components/SideNavigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeClient({ dict, lang }: { dict: any; lang: string }) {
  const [bookingUrl, setBookingUrl] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFaqDrawerOpen, setIsFaqDrawerOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [drawerFaqOpenIndex, setDrawerFaqOpenIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: "accueil", label: dict.sections.accueil },
    { id: "ecole", label: dict.sections.ecole },
    { id: "decouverte", label: dict.sections.decouverte },
    { id: "wagga", label: dict.sections.wagga },
    { id: "tarifs", label: dict.sections.tarifs },
    { id: "retours", label: dict.sections.retours }
  ];

  const partnersData = [
    { name: "FFVL", src: "/media/partenaires/FFVL_3.png", url: "https://federation.ffvl.fr/" },
    { name: "Ministère des Sports", src: "/media/partenaires/Ministère_des_Sports,_de_la_Jeunesse_et_de_la_Vie_associative.png", url: "https://www.sports.gouv.fr/" },
    { name: "Conservatoire du Littoral", src: "/media/partenaires/conservatoire.png", url: "https://www.conservatoire-du-littoral.fr/" },
    { name: "La Teste-de-Buch", src: "/media/partenaires/Logo-Ville-de-LTDB-copie.png", url: "https://www.latestedebuch.fr/" },
    { name: "Dune du Pilat", src: "/media/partenaires/grandune.svg", url: "https://ladunedupilat.com/", invert: true },
    { name: "Camping de la Dune", src: "/media/partenaires/logo-camping-de-la-dune.jpg", url: "https://www.campingdeladune.fr/" },
    { name: "Supair", src: "/media/partenaires/supaire.png", url: "https://supair.com/", invert: true }
  ];

  return (
    <main className="h-[100dvh] w-full bg-black overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth hide-scrollbar relative">
      <h1 className="sr-only">{dict.seo?.h1 || "Waggas School - Parapente Dune du Pilat"}</h1>
      
      {/* HEADER FIXE */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 pointer-events-none">
        <div className="w-32 md:w-40 pointer-events-auto">
          <Image
            src="/Logo-blanc.svg"
            alt="Waggas School Logo"
            width={160}
            height={64}
            className="w-full h-auto drop-shadow-xl"
            priority
          />
        </div>
        <button 
          className="md:hidden text-white text-2xl pointer-events-auto drop-shadow-lg"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <FaBars />
        </button>
        <nav className="hidden md:flex gap-8 items-center text-white text-sm uppercase tracking-widest font-semibold pointer-events-auto">
          <Link href="#decouverte" className="hover:text-gray-300 transition-colors drop-shadow-md">{dict.nav.decouverte}</Link>
          <Link href="#wagga" className="hover:text-gray-300 transition-colors drop-shadow-md">{dict.nav.wagga}</Link>
          <Link href="#tarifs" className="hover:text-gray-300 transition-colors drop-shadow-md">{dict.nav.tarifs}</Link>
          <button onClick={() => setBookingUrl("https://booking.myrezapp.com/fr/online/booking/minisite/2025/ecole-de-parapente-waggas-school")} className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-colors shadow-lg">
            {dict.nav.reserver}
          </button>
          <LanguageSwitcher currentLang={lang} />
        </nav>
      </header>

      {/* NAVIGATION LATÉRALE */}
      <SideNavigation sections={sections} />

      {/* SECTION 1 : ACCUEIL SPLIT-SCREEN */}
      <SplitHero dict={dict} />

      {/* SECTION 2 : L'ÉCOLE */}
      <ProjectSection id="ecole" nextSectionId="decouverte">
        <ProjectSlide
          imageSrc="/media/chacha.jpeg"
          align="left"
          nextHintText={dict.slide_controls.next}
        >
          <div className="w-full flex flex-col pt-24 md:pt-28 pb-2 md:pb-4 max-w-7xl mx-auto px-4 md:px-8 pointer-events-auto">
            
            <div className="flex-1 flex flex-col md:flex-row items-center justify-start md:justify-center gap-8 md:gap-16">
              {/* Colonne de gauche avec le 20 ans mis en avant */}
              <div className="flex-1">
                <h2 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-none drop-shadow-xl mb-4 md:mb-6">
                  {dict.ecole.title_prefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{dict.ecole.title_highlight}</span>
                </h2>
                <h4 className="text-base md:text-xl uppercase tracking-widest text-gray-300 font-semibold drop-shadow-md">
                  {dict.ecole.subtitle}
                </h4>
              </div>

              {/* Colonne de droite avec le texte descriptif */}
              <div className="flex-1 bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl">
                <p className="text-gray-200 text-base md:text-xl font-light leading-relaxed mb-4 md:mb-6">
                  {dict.ecole.p1}
                </p>
                <div className="h-px w-full bg-white/10 mb-4 md:mb-6"></div>
                <p className="text-gray-300 text-sm md:text-lg leading-relaxed mb-4 md:mb-6">
                  {dict.ecole.p2}
                </p>
                <p className="text-gray-400 text-xs md:text-base italic">
                  {dict.ecole.p3}
                </p>
              </div>
            </div>

            {/* PARTENAIRES FIXES */}
            <div className="w-full mt-8 md:mt-auto pt-4 md:pt-12 flex flex-col items-center">
              <h4 className="text-xs md:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-6 drop-shadow-md">
                {dict.partenaires_section?.title || "Nos partenaires"}
              </h4>
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-12 w-full">
                {partnersData.map((partner, i) => (
                  <a 
                    key={i} 
                    href={partner.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="opacity-70 hover:opacity-100 transition-opacity duration-300 transform hover:scale-110"
                  >
                    <Image 
                      src={partner.src} 
                      alt={`Logo ${partner.name}`}
                      width={300}
                      height={120}
                      className={`max-h-12 md:max-h-24 w-auto object-contain transition-all duration-300 ${partner.invert ? 'brightness-0 invert opacity-70 hover:opacity-100' : 'filter grayscale hover:grayscale-0'}`}
                    />
                  </a>
                ))}
              </div>
            </div>

          </div>

        </ProjectSlide>
      </ProjectSection>

      {/* SECTION 3 : VOL DÉCOUVERTE */}
      <ProjectSection 
        id="decouverte"
        videoSrc="/media/vol-decouverte.mp4"
        title={dict.slides.decouverte.title}
        subtitle={dict.slides?.decouverte?.subtitle || "Formule tous publics"}
        description={dict.slides.decouverte.desc}
        align="left"
        nextHintText={dict.slide_controls.next}
        prevHintText={dict.slide_controls.prev}
        nextSectionId="wagga"
      >
        <ProjectSlide 
          imageSrc="/media/dune.jpeg"
          align="center"
          prevHintText="Retour"
        >
          <div className="max-w-4xl mx-auto text-center mt-8">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Au-dessus de la Dune du Pilat</h3>
            <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed mb-8">
              Déclinée en 10 ou 20 minutes, cette formule découverte vous permettra de voler face au Bassin d’Arcachon au-dessus de la Dune du Pilat. Ce site exceptionnel et fragile offre des conditions extraordinaires, rendant cette activité accessible à tous.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <span className="px-6 py-2 border border-white/40 rounded-full text-white uppercase tracking-widest text-sm">Détente</span>
              <span className="px-6 py-2 border border-white/40 rounded-full text-white uppercase tracking-widest text-sm">Vue</span>
              <span className="px-6 py-2 border border-white/40 rounded-full text-white uppercase tracking-widest text-sm">Contemplation</span>
            </div>
            <button onClick={() => setBookingUrl("https://booking.myrezapp.com/fr/online/booking/minisite/2025/ecole-de-parapente-waggas-school")} className="inline-block px-8 py-4 bg-white text-black text-sm uppercase tracking-widest font-bold hover:bg-gray-200 transition-colors pointer-events-auto rounded-full">
              Réserver en ligne
            </button>
          </div>
        </ProjectSlide>
      </ProjectSection>

      {/* SECTION 4 : VOL WAGGA */}
      <ProjectSection 
        id="wagga"
        videoSrc="/media/vol-wagga.mp4"
        title={dict.slides.wagga.title}
        subtitle={dict.slides?.wagga?.subtitle || "Sensations garanties"}
        description={dict.slides.wagga.desc}
        align="right"
        nextHintText={dict.slide_controls.next}
        prevHintText={dict.slide_controls.prev}
        nextSectionId="tarifs"
      >
        <ProjectSlide 
          imageSrc="/media/steph1.jpeg"
          align="center"
          prevHintText="Retour"
        >
          <div className="max-w-4xl mx-auto text-center mt-8">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Dynamique, ludique et fun</h3>
            <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed mb-8">
              Déclinée en 10 ou 20 min, cette formule dynamique mélange des phases de vol calme avec des manœuvres dynamiques et des passages près du sol qui viennent pimenter le tout. Accessible à tous, habitués ou non !
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <span className="px-6 py-2 border border-white/40 rounded-full text-white uppercase tracking-widest text-sm">Sensations</span>
              <span className="px-6 py-2 border border-white/40 rounded-full text-white uppercase tracking-widest text-sm">Adrénaline</span>
              <span className="px-6 py-2 border border-white/40 rounded-full text-white uppercase tracking-widest text-sm">Wagga</span>
            </div>
            <button onClick={() => setBookingUrl("https://booking.myrezapp.com/fr/online/booking/minisite/2025/ecole-de-parapente-waggas-school")} className="inline-block px-8 py-4 bg-white text-black text-sm uppercase tracking-widest font-bold hover:bg-gray-200 transition-colors pointer-events-auto rounded-full">
              Réserver en ligne
            </button>
          </div>
        </ProjectSlide>
      </ProjectSection>

      {/* SECTION 5 : TARIFS ET FAQ */}
      <ProjectSection id="tarifs" nextSectionId="retours">
        <ProjectSlide
          imageSrc="/media/steph1.jpeg"
          align="center"
          nextHintText={dict.slide_controls.next}
          prevHintText={dict.slide_controls.prev}
        >
          <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-start relative z-10 px-4 md:px-8 mt-12 md:mt-24">
            
            {/* Tableau à droite */}
            <div className="flex-1 w-full max-w-2xl bg-black/60 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl pointer-events-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tighter">{dict.tarifs_section.title}</h2>
              <p className="text-gray-300 mb-6 md:mb-8 uppercase tracking-widest text-xs md:text-sm">{dict.tarifs_section.subtitle}</p>
              <ul className="space-y-4 md:space-y-6">
                {dict.tarifs_section.pricing.map((item: any, i: number) => {
                  const links = [
                    "https://booking.myrezapp.com/fr/online/booking/step1/2025/10543",
                    "https://booking.myrezapp.com/fr/online/booking/step1/2025/10544",
                    "https://booking.myrezapp.com/fr/online/booking/step1/2025/10543",
                    "https://booking.myrezapp.com/fr/online/booking/step1/2025/10544"
                  ];
                  return (
                    <li key={i} className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-white/10 pb-4 gap-4">
                      <span className="text-white text-sm md:text-lg font-light">{item.name}</span>
                      <div className="flex items-center justify-between md:justify-end gap-6">
                        <span className="text-xl md:text-3xl font-bold text-white group-hover:scale-110 transition-transform origin-right">{item.price}</span>
                        <button onClick={() => setBookingUrl(links[i])} className="px-4 py-2 border border-white/40 rounded-full text-white text-[10px] md:text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                          {dict.nav.reserver}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8 md:mt-12">
                <p className="text-gray-400 text-xs md:text-sm mb-4 md:mb-6 font-light">{dict.tarifs_section?.faq_intro || "Vous avez des questions ? Retrouvez toutes les informations sur notre page FAQ ou contactez-nous directement."}</p>
                <button onClick={() => setBookingUrl("https://booking.myrezapp.com/fr/online/booking/minisite/2025/ecole-de-parapente-waggas-school")} className="relative group inline-flex w-full items-center justify-center px-6 md:px-8 py-4 md:py-5 border border-white/20 hover:border-white bg-black/20 overflow-hidden transition-all pointer-events-auto rounded-none">
                  <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                  <span className="relative z-10 text-white group-hover:text-black text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] font-medium transition-colors duration-500">
                    {dict.tarifs_section?.view_all_availabilities || "Voir toutes les disponibilités"}
                  </span>
                </button>
              </div>
            </div>

            {/* Colonne FAQ */}
            <div className="flex-1 w-full mt-8 lg:mt-0 pointer-events-auto">
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-8 drop-shadow-md">{dict.tarifs_section.faq_title}</h3>
              <div className="space-y-6">
                
                {/* Bouton Venir à la Waggas School */}
                <div 
                  onClick={() => setIsDrawerOpen(true)}
                  className="p-6 border border-white/10 shadow-lg hover:border-white/40 bg-black/40 backdrop-blur-md transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div>
                    <h5 className="text-white text-lg font-light tracking-wide mb-1 group-hover:text-gray-200 transition-colors">{dict.tarifs_section?.access_title || "Venir à la Waggas school"}</h5>
                    <p className="text-gray-400 font-light text-xs tracking-wider uppercase">{dict.tarifs_section?.access_subtitle || "Voiture • Bus • Bateau • À pied"}</p>
                  </div>
                  <span className="text-xl text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all"><FaArrowRight /></span>
                </div>

                {dict.tarifs_section.faq.slice(0, 3).map((faq: any, i: number) => (
                  <div 
                    key={i} 
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                    className="border-b border-white/10 py-5 cursor-pointer group"
                  >
                    <div className="flex justify-between items-center gap-4">
                      <h5 className="text-white/80 text-base md:text-lg font-light tracking-wide group-hover:text-white transition-colors">{faq.q}</h5>
                      <span className="text-xl text-white/40 group-hover:text-white transition-colors duration-300">
                        {openFaqIndex === i ? '−' : '+'}
                      </span>
                    </div>
                    {openFaqIndex === i && (
                      <p className="text-gray-400 font-light leading-relaxed mt-4 text-sm md:text-base animate-in fade-in slide-in-from-top-1">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
                
                <div className="text-center pt-8">
                  <button 
                    onClick={() => setIsFaqDrawerOpen(true)} 
                    className="relative group inline-flex items-center justify-center px-8 py-4 border border-white/20 hover:border-white bg-transparent overflow-hidden transition-all rounded-none"
                  >
                    <div className="absolute inset-0 bg-white -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
                    <span className="relative z-10 text-white/80 group-hover:text-black text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-500">
                      {dict.tarifs_section?.view_all_faq || "Voir toutes les questions"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </ProjectSlide>
      </ProjectSection>

      {/* SECTION 6 : VOS RETOURS */}
      <ProjectSection id="retours" showScrollDown={false}>
        <ProjectSlide
          imageSrc="/media/dune.jpeg"
          align="center"
          prevHintText={dict.slide_controls.prev}
        >
          <div className="w-full flex flex-col justify-start md:justify-center pt-24 md:pt-32 pb-8 max-w-7xl mx-auto px-4 pointer-events-none">
            
            <div className="text-center mb-8 pointer-events-auto">
              <h4 className="text-yellow-400 text-sm uppercase tracking-widest font-semibold mb-2">{dict.retours.subtitle}</h4>
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-xl">{dict.retours.title}</h2>
              <a 
                href="https://www.google.com/maps/place/Waggas+school+Parapente+Dune+du+Pyla+(Pilat)/@44.5774858,-1.2203432,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICpqKX8WQ!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgrass-cs%2FACvplmPzxEEJgV29XC-m4M_FxPB5mVVc9K903XpaMoPEvhgemBRFRw2sM0TGmrJ5uT20LTJEUkq3QfNZUoep7kGqcbEdAxI08ZLJwO2TQ_OO2OzCBsljVUY9U5P6yFx1mkGmmmPOYj8T%3Dk-no!7i2896!8i4344!4m8!3m7!1s0xd536283caa401c9:0x972df0e4c1c2684f!8m2!3d44.5774858!4d-1.2203432!9m1!1b1!16s%2Fg%2F11b6_rf6zs!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgwMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group inline-flex items-center justify-center px-8 py-4 border border-white/20 hover:border-white bg-transparent overflow-hidden transition-all rounded-none"
              >
                <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                <span className="relative z-10 text-white group-hover:text-black text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-500">
                  {dict.retours.button}
                </span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-full h-auto md:h-[65vh] overflow-visible md:overflow-y-auto hide-scrollbar pb-12 pointer-events-auto">
              
              {dict.retours.reviews.map((review: any, index: number) => {
                const photos = ["photo9.jpg", "photo2.jpg", "photo3.jpg", "photo4.jpg", "photo5.jpg", "photo6.jpg", "photo7.jpg", "photo8.jpg"];
                return (
                  <div key={index} className="bg-transparent border border-white/10 overflow-hidden flex flex-col pointer-events-auto group cursor-pointer hover:border-white/40 transition-colors rounded-none min-h-[250px] md:min-h-0">
                    <div className="h-32 w-full relative overflow-hidden shrink-0">
                      <Image src={`/media/clients/${photos[index % photos.length]}`} alt={`Client ${index + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-70 group-hover:opacity-100" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col bg-black/40 backdrop-blur-md">
                      <div className="flex text-white mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                        {[...Array(5)].map((_, i) => <FaStar key={i} className="w-3 h-3" />)}
                      </div>
                      <p className="text-gray-400 group-hover:text-gray-200 text-sm font-light flex-1 italic mb-6 transition-colors">
                        "{review.text}"
                      </p>
                      <p className="text-white/50 group-hover:text-white text-[10px] font-semibold uppercase tracking-[0.2em] text-right transition-colors">
                        — {review.author}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </ProjectSlide>
      </ProjectSection>

      {bookingUrl && (
        <BookingModal url={bookingUrl} onClose={() => setBookingUrl(null)} />
      )}

      {/* DRAWER MENU MOBILE */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.6 }}
              className="fixed top-0 right-0 w-full h-[100dvh] bg-black/90 backdrop-blur-3xl border-l border-white/10 z-[101] overflow-y-auto p-8 shadow-2xl flex flex-col pointer-events-auto"
            >
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors text-2xl"
              >
                ✕
              </button>
              
              <div className="w-32 mb-12 mt-4">
                <Image
                  src="/Logo-blanc.svg"
                  alt="Waggas School Logo"
                  width={160}
                  height={64}
                  className="w-full h-auto drop-shadow-xl"
                />
              </div>

              <nav className="flex flex-col gap-6 text-white text-lg uppercase tracking-widest font-semibold flex-1">
                <Link href="#decouverte" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gray-300 transition-colors drop-shadow-md border-b border-white/10 pb-4">{dict.nav.decouverte}</Link>
                <Link href="#wagga" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gray-300 transition-colors drop-shadow-md border-b border-white/10 pb-4">{dict.nav.wagga}</Link>
                <Link href="#tarifs" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gray-300 transition-colors drop-shadow-md border-b border-white/10 pb-4">{dict.nav.tarifs}</Link>
                
                <div className="mt-8 border-b border-white/10 pb-6 flex justify-between items-center">
                  <span className="text-sm text-gray-400 capitalize font-light tracking-normal">Langue</span>
                  <LanguageSwitcher currentLang={lang} />
                </div>
              </nav>

              <div className="mt-auto pt-8 pb-4">
                <button onClick={() => { setBookingUrl("https://booking.myrezapp.com/fr/online/booking/minisite/2025/ecole-de-parapente-waggas-school"); setIsMobileMenuOpen(false); }} className="w-full bg-white text-black px-6 py-4 rounded-full hover:bg-gray-200 transition-colors shadow-lg uppercase font-bold text-sm tracking-widest text-center">
                  {dict.nav.reserver}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* DRAWER D'ACCÈS */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.6 }}
              className="fixed top-0 right-0 w-full md:w-[500px] h-[100dvh] bg-black/70 backdrop-blur-3xl border-l border-white/10 z-[101] overflow-y-auto p-8 shadow-2xl"
            >
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors text-2xl"
              >
                ✕
              </button>
              
              <h2 className="text-3xl font-bold text-white mb-2 mt-4">{dict.drawer_access?.title || "Venir à la Waggas school"}</h2>
              <h3 className="text-yellow-400 uppercase tracking-widest text-sm mb-6">{dict.drawer_access?.subtitle || "Sur RDV"}</h3>
              
              <p className="text-gray-300 font-light leading-relaxed mb-4">
                {dict.drawer_access?.intro1}<br/>
                {dict.drawer_access?.intro2}
              </p>

              <div className="space-y-8 mt-10">
                {/* VOITURE */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2 border-b border-white/20 pb-2 flex items-center gap-3">
                    <FaCar className="text-yellow-400" /> {dict.drawer_access?.car?.title}
                  </h4>
                  <p className="text-yellow-400 text-xs uppercase tracking-widest mb-2 mt-4">{dict.drawer_access?.car?.subtitle}</p>
                  <p className="text-gray-300 font-light text-sm mb-4">
                    <strong>{dict.drawer_access?.car?.parking_name}</strong><br/>
                    • {dict.drawer_access?.car?.parking_desc1}<br/>
                    • {dict.drawer_access?.car?.parking_desc2}
                  </p>
                  <a 
                    href="https://www.google.com/maps/place/44%C2%B034'28.5%22N+1%C2%B012'58.0%22W/@44.5746067,-1.2161476,18.5z/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative group inline-flex items-center justify-center px-6 py-3 border border-white/20 hover:border-white bg-transparent overflow-hidden transition-all rounded-none mt-2"
                  >
                    <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                    <span className="relative z-10 text-white/80 group-hover:text-black text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-500">
                      {dict.drawer_access?.car?.button}
                    </span>
                  </a>
                </div>

                {/* PIED */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2 border-b border-white/20 pb-2 flex items-center gap-3">
                    <FaWalking className="text-yellow-400" /> {dict.drawer_access?.foot?.title}
                  </h4>
                  <p className="text-yellow-400 text-xs uppercase tracking-widest mb-2 mt-4">{dict.drawer_access?.foot?.subtitle}</p>
                  <p className="text-gray-300 font-light text-sm mb-4">
                    • {dict.drawer_access?.foot?.desc1}<br/>
                    • {dict.drawer_access?.foot?.desc2}<br/>
                    • {dict.drawer_access?.foot?.desc3}
                  </p>
                  <a 
                    href="https://maps.google.com/?q=Waggas+School+Dune+du+Pilat" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative group inline-flex items-center justify-center px-6 py-3 border border-white/20 hover:border-white bg-transparent overflow-hidden transition-all rounded-none mt-2"
                  >
                    <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                    <span className="relative z-10 text-white/80 group-hover:text-black text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-500">
                      {dict.drawer_access?.foot?.button}
                    </span>
                  </a>
                </div>

                {/* BATEAU */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2 border-b border-white/20 pb-2 flex items-center gap-3">
                    <FaShip className="text-yellow-400" /> {dict.drawer_access?.boat?.title}
                  </h4>
                  <p className="text-gray-300 font-light text-sm mb-4 mt-4">
                    {dict.drawer_access?.boat?.desc1}
                  </p>
                  <p className="text-yellow-400 text-xs uppercase tracking-widest mb-2">{dict.drawer_access?.boat?.subtitle}</p>
                  <p className="text-gray-300 font-light text-sm">
                    {dict.drawer_access?.boat?.desc2}<br/><br/>
                    {dict.drawer_access?.boat?.desc3}
                  </p>
                </div>

                {/* BUS */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2 border-b border-white/20 pb-2 flex items-center gap-3">
                    <FaBus className="text-yellow-400" /> {dict.drawer_access?.bus?.title}
                  </h4>
                  <p className="text-gray-300 font-light text-sm mb-4 mt-4">
                    {dict.drawer_access?.bus?.desc1}<br/>
                    <span className="text-red-400">{dict.drawer_access?.bus?.warning}</span>
                  </p>
                  <p className="text-yellow-400 text-xs uppercase tracking-widest mb-2">{dict.drawer_access?.bus?.from_arcachon}</p>
                  <p className="text-gray-300 font-light text-sm mb-4">
                    {dict.drawer_access?.bus?.arcachon_desc1}<br/>
                    {dict.drawer_access?.bus?.arcachon_desc2}
                  </p>
                  <p className="text-yellow-400 text-xs uppercase tracking-widest mb-2">{dict.drawer_access?.bus?.from_lateste}</p>
                  <p className="text-gray-300 font-light text-sm">
                    {dict.drawer_access?.bus?.lateste_desc1}<br/>
                    {dict.drawer_access?.bus?.lateste_desc2}<br/>
                    {dict.drawer_access?.bus?.lateste_desc3}
                  </p>
                </div>

              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* DRAWER FAQ COMPLÈTE */}
      <AnimatePresence>
        {isFaqDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFaqDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.6 }}
              className="fixed top-0 right-0 w-full md:w-[600px] h-[100dvh] bg-black/70 backdrop-blur-3xl border-l border-white/10 z-[101] overflow-y-auto p-8 shadow-2xl"
            >
              <button 
                onClick={() => setIsFaqDrawerOpen(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors text-2xl z-10"
              >
                ✕
              </button>
              
              <h2 className="text-3xl font-bold text-white mb-2 mt-4">{dict.tarifs_section.faq_title}</h2>
              <h3 className="text-yellow-400 uppercase tracking-widest text-sm mb-10">{dict.tarifs_section?.all_answers || "Toutes vos réponses"}</h3>
              
              <div className="space-y-4">
                {dict.tarifs_section.faq.map((faq: any, i: number) => (
                  <div 
                    key={i} 
                    onClick={() => setDrawerFaqOpenIndex(drawerFaqOpenIndex === i ? null : i)}
                    className="border-b border-white/10 py-6 cursor-pointer group"
                  >
                    <div className="flex justify-between items-center gap-4">
                      <h3 className="text-white/80 text-lg font-light tracking-wide group-hover:text-white transition-colors">{faq.q}</h3>
                      <span className="text-2xl text-white/40 group-hover:text-white flex-shrink-0 transition-colors duration-300">
                        {drawerFaqOpenIndex === i ? '−' : '+'}
                      </span>
                    </div>
                    {drawerFaqOpenIndex === i && (
                      <p className="text-gray-400 mt-4 leading-relaxed font-light text-sm md:text-base animate-in fade-in slide-in-from-top-1">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

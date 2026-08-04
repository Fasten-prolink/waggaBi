import { getDictionary } from "@/get-dictionary";
import Link from "next/link";
import FaqClient from "./FaqClient";

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <div className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
        <a href={`/${lang}`} className="text-gray-400 hover:text-white mb-8 inline-block transition-colors">
          ← {dict.sections.accueil}
        </a>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">{dict.tarifs_section.faq_title}</h1>
        <p className="text-xl text-gray-400 mb-12">Toutes les réponses à vos questions concernant l'école de parapente Waggas School.</p>
        
        <FaqClient faqData={dict.tarifs_section.faq} />
      </div>
    </div>
  );
}

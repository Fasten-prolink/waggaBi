import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import { i18n } from "@/i18n-config";
import FloatingContact from "@/components/FloatingContact";
import { getDictionary } from "@/get-dictionary";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);
  
  return {
    title: dict.seo?.title || "Waggas School",
    description: dict.seo?.description || "Waggas School Parapente",
    keywords: dict.seo?.keywords || "",
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'fr': '/fr',
        'en': '/en',
        'es': '/es',
        'de': '/de',
        'nl': '/nl',
      },
    },
    openGraph: {
      title: dict.seo?.title,
      description: dict.seo?.description,
      url: `https://waggaschool.com/${lang}`,
      siteName: 'Waggas School',
      locale: lang,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} className={`${inter.variable} ${outfit.variable}`}>
      <body>
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}

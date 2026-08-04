import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import { i18n } from "@/i18n-config";
import FloatingContact from "@/components/FloatingContact";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wagga's School | Vol Biplace Dune du Pilat",
  description: "Découvrez la magie du parapente avec nos vols biplaces au-dessus de la Dune du Pilat. Réservez votre baptême de l'air dès aujourd'hui !",
};

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

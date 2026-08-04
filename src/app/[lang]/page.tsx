import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import HomeClient from './HomeClient';

export default async function Page({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <HomeClient dict={dict} lang={lang} />;
}

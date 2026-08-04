import fs from 'fs/promises';
import path from 'path';

const dir = 'c:/Users/remi-/01-Dev/05-Wagga/waggaweb/src/dictionaries';

const translations = {
  fr: "Toutes les réponses à vos questions concernant l'école de parapente Waggas School.",
  en: "All the answers to your questions about the Waggas School paragliding school.",
  es: "Todas las respuestas a sus preguntas sobre la escuela de parapente Waggas School.",
  de: "Alle Antworten auf Ihre Fragen zur Gleitschirmschule Waggas School.",
  nl: "Alle antwoorden op uw vragen over de paragliding school Waggas School."
};

async function updateDicts() {
  const locales = ['fr', 'en', 'es', 'de', 'nl'];
  for (const locale of locales) {
    const filePath = path.join(dir, `${locale}.json`);
    let data = {};
    try {
      const fileData = await fs.readFile(filePath, 'utf-8');
      data = JSON.parse(fileData);
    } catch (e) {
      console.log(`Could not read ${locale}.json`);
      continue;
    }

    if (!data.tarifs_section) data.tarifs_section = {};
    data.tarifs_section.faq_page_subtitle = translations[locale];

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Updated ${locale}.json`);
  }
}

updateDicts();

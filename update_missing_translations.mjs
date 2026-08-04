import fs from 'fs/promises';
import path from 'path';

const translations = {
  fr: {
    partenaires_title: "Nos partenaires",
    faq_intro: "Vous avez des questions ? Retrouvez toutes les informations sur notre page FAQ ou contactez-nous directement.",
    view_all_availabilities: "Voir toutes les disponibilités",
    access_title: "Venir à la Waggas school",
    access_subtitle: "Voiture • Bus • Bateau • À pied",
    view_all_faq: "Voir toutes les questions",
    all_answers: "Toutes vos réponses",
    decouverte_subtitle: "Formule tous publics",
    wagga_subtitle: "Vol sensation"
  },
  en: {
    partenaires_title: "Our partners",
    faq_intro: "Do you have any questions? Find all the information on our FAQ page or contact us directly.",
    view_all_availabilities: "View all availabilities",
    access_title: "Come to Waggas school",
    access_subtitle: "Car • Bus • Boat • On foot",
    view_all_faq: "View all questions",
    all_answers: "All your answers",
    decouverte_subtitle: "For everyone",
    wagga_subtitle: "Thrill flight"
  },
  es: {
    partenaires_title: "Nuestros socios",
    faq_intro: "¿Tiene alguna pregunta? Encuentre toda la información en nuestra página de preguntas frecuentes o contáctenos directamente.",
    view_all_availabilities: "Ver todas las disponibilidades",
    access_title: "Venir a Waggas school",
    access_subtitle: "Coche • Autobús • Barco • A pie",
    view_all_faq: "Ver todas las preguntas",
    all_answers: "Todas sus respuestas",
    decouverte_subtitle: "Para todos",
    wagga_subtitle: "Vuelo sensacional"
  },
  de: {
    partenaires_title: "Unsere Partner",
    faq_intro: "Haben Sie Fragen? Finden Sie alle Informationen auf unserer FAQ-Seite oder kontaktieren Sie uns direkt.",
    view_all_availabilities: "Alle Verfügbarkeiten ansehen",
    access_title: "Anreise zur Waggas School",
    access_subtitle: "Auto • Bus • Boot • Zu Fuß",
    view_all_faq: "Alle Fragen ansehen",
    all_answers: "Alle Ihre Antworten",
    decouverte_subtitle: "Für alle",
    wagga_subtitle: "Flug für Nervenkitzel"
  },
  nl: {
    partenaires_title: "Onze partners",
    faq_intro: "Heeft u vragen? Vind alle informatie op onze FAQ-pagina of neem direct contact met ons op.",
    view_all_availabilities: "Bekijk alle beschikbaarheid",
    access_title: "Kom naar Waggas school",
    access_subtitle: "Auto • Bus • Boot • Te voet",
    view_all_faq: "Bekijk alle vragen",
    all_answers: "Al uw antwoorden",
    decouverte_subtitle: "Voor iedereen",
    wagga_subtitle: "Sensatievlucht"
  }
};

const dir = 'c:/Users/remi-/01-Dev/05-Wagga/waggaweb/src/dictionaries';

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
    data.tarifs_section.faq_intro = translations[locale].faq_intro;
    data.tarifs_section.view_all_availabilities = translations[locale].view_all_availabilities;
    data.tarifs_section.access_title = translations[locale].access_title;
    data.tarifs_section.access_subtitle = translations[locale].access_subtitle;
    data.tarifs_section.view_all_faq = translations[locale].view_all_faq;
    data.tarifs_section.all_answers = translations[locale].all_answers;
    
    if (!data.partenaires_section) data.partenaires_section = {};
    data.partenaires_section.title = translations[locale].partenaires_title;

    // The subtitles for the ProjectSlide
    if (!data.slides) data.slides = { decouverte: {}, wagga: {} };
    if (!data.slides.decouverte) data.slides.decouverte = {};
    if (!data.slides.wagga) data.slides.wagga = {};
    data.slides.decouverte.subtitle = translations[locale].decouverte_subtitle;
    data.slides.wagga.subtitle = translations[locale].wagga_subtitle;

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Updated ${locale}.json`);
  }
}

updateDicts();

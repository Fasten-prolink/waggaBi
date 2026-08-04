import fs from 'fs/promises';
import path from 'path';

const dir = 'c:/Users/remi-/01-Dev/05-Wagga/waggaweb/src/dictionaries';

const seoTranslations = {
  fr: {
    title: "Waggas School | Baptême de Parapente Dune du Pilat",
    description: "Découvrez la magie du parapente avec nos vols biplaces au-dessus de la Dune du Pilat (Bassin d'Arcachon). Réservez votre baptême de l'air dès aujourd'hui avec Waggas School !",
    keywords: "parapente dune du pilat, vol biplace, baptême parapente, waggas school, pyla, bassin arcachon, vol découverte",
    h1: "Waggas School - École de Parapente à la Dune du Pilat"
  },
  en: {
    title: "Waggas School | Paragliding Tandem Flights Dune du Pilat",
    description: "Discover the magic of paragliding with our tandem flights over the Dune du Pilat (Arcachon Basin). Book your first flight today with Waggas School!",
    keywords: "paragliding dune du pilat, tandem flight, paragliding baptism, waggas school, pyla, arcachon basin, discovery flight",
    h1: "Waggas School - Paragliding School at the Dune du Pilat"
  },
  es: {
    title: "Waggas School | Vuelo en Parapente Biplaza Duna de Pilat",
    description: "Descubre la magia del parapente con nuestros vuelos biplaza sobre la Duna de Pilat (Bahía de Arcachón). ¡Reserva tu primer vuelo hoy con Waggas School!",
    keywords: "parapente duna de pilat, vuelo biplaza, bautismo parapente, waggas school, pyla, bahía arcachon, vuelo descubrimiento",
    h1: "Waggas School - Escuela de Parapente en la Duna de Pilat"
  },
  de: {
    title: "Waggas School | Gleitschirm-Tandemflüge Dune du Pilat",
    description: "Entdecken Sie die Magie des Gleitschirmfliegens mit unseren Tandemflügen über der Dune du Pilat (Becken von Arcachon). Buchen Sie noch heute Ihren ersten Flug mit Waggas School!",
    keywords: "gleitschirmfliegen dune du pilat, tandemflug, gleitschirmtaufe, waggas school, pyla, becken von arcachon, entdeckungsflug",
    h1: "Waggas School - Gleitschirmschule an der Dune du Pilat"
  },
  nl: {
    title: "Waggas School | Paragliding Tandemvluchten Dune du Pilat",
    description: "Ontdek de magie van paragliding met onze tandemvluchten boven de Dune du Pilat (Bassin d'Arcachon). Boek vandaag nog uw eerste vlucht bij Waggas School!",
    keywords: "paragliding dune du pilat, tandemvlucht, paragliding doop, waggas school, pyla, bassin arcachon, ontdekkingsvlucht",
    h1: "Waggas School - Paraglidingschool bij de Dune du Pilat"
  }
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

    data.seo = seoTranslations[locale];

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Updated ${locale}.json with SEO data.`);
  }
}

updateDicts();

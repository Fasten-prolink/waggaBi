import fs from 'fs/promises';
import path from 'path';

const translations = {
  fr: {
    title: "Venir à la Waggas school",
    subtitle: "Sur RDV",
    intro1: "À l’ombre des pins ou sous le doux soleil de la Dune du Pilat, vous pourrez pleinement profiter de la diversité qu’offre ce site.",
    intro2: "Un chemin plat et ombragé assure l’accessibilité pour tous les visiteurs.",
    car: {
      title: "En voiture",
      subtitle: "Stationnement",
      parking_name: "Parking « Le Sabloney »",
      parking_desc1: "Garez-vous sur le parking en gravier",
      parking_desc2: "15 min de marche jusqu’aux drapeaux Waggas School",
      button: "Ouvrir le Parking sur Maps"
    },
    foot: {
      title: "A pied",
      subtitle: "Itinéraire à pied",
      desc1: "Depuis le parking, suivez le chemin en direction de la dune qui longe le Pyla Camping (environ 15 min).",
      desc2: "Prenez-le jusqu’à la dune – repérez les drapeaux Waggas School.",
      desc3: "Arrivez 30 min avant l’horaire de vol.",
      button: "Position exacte de l'école"
    },
    boat: {
      title: "En bateau",
      desc1: "Si vous possédez votre propre embarcation, vous pourrez vous mettre en mouillage au pied de la Dune du Pilat sur la plage « Robinson » et nous rejoindre à pied 50 mètres plus haut au niveau des drapeaux.",
      subtitle: "Navettes bateaux (UBA)",
      desc2: "Vous pouvez également opter pour les navettes UBA.",
      desc3: "Des navettes estivales sont organisées pour vous rendre au pied de la Dune du Pyla « plage Robinson » au départ d’Arcachon, Le Moulleau (Pyla sur Mer), Cap ferret…"
    },
    bus: {
      title: "En bus",
      desc1: "Une fois descendu à l’arrêt « Pyla Camping », vous pourrez nous rejoindre en marchant sur le chemin forestier situé entre le Pyla Camping et le Panorama Camping, afin de vous rendre sur le lieu de décollage (10mn).",
      warning: "Le Pyla Camping étant une propriété privée, sa traversée est interdite.",
      from_arcachon: "Depuis Arcachon",
      arcachon_desc1: "Prendre la Ligne 3 descendre à l’arrêt « Pyla Camping ».",
      arcachon_desc2: "Une fois descendu à l’arrêt « Pyla Camping », vous pourrez librement et gratuitement traverser à pied le Pyla Camping pour vous rendre sur le lieu de décollage (10mn).",
      from_lateste: "Depuis La Teste de Buch",
      lateste_desc1: "Des navettes sont mises en place depuis le Parc des expositions de La teste de Buch jusqu’à la Dune du Pyla. Prendre le bus ligne 3 jusqu’à l’arrêt « Pyla Camping ».",
      lateste_desc2: "Rejoignez nous à la sortie du camping « accès plage » (coté dune).",
      lateste_desc3: "Vous pourrez nous identifier grâce à nos drapeaux Waggas School situés à 200m du camping, sur la Dune du Pilat."
    }
  },
  en: {
    title: "Getting to Waggas school",
    subtitle: "By appointment",
    intro1: "In the shade of the pines or under the gentle sun of the Dune du Pilat, you can fully enjoy the diversity this site offers.",
    intro2: "A flat, shaded path ensures accessibility for all visitors.",
    car: {
      title: "By car",
      subtitle: "Parking",
      parking_name: "Parking \"Le Sabloney\"",
      parking_desc1: "Park in the gravel parking lot",
      parking_desc2: "15 min walk to the Waggas School flags",
      button: "Open Parking on Maps"
    },
    foot: {
      title: "On foot",
      subtitle: "Walking route",
      desc1: "From the parking lot, follow the path towards the dune that runs alongside Pyla Camping (about 15 min).",
      desc2: "Take it to the dune – look for the Waggas School flags.",
      desc3: "Arrive 30 min before flight time.",
      button: "Exact location of the school"
    },
    boat: {
      title: "By boat",
      desc1: "If you have your own boat, you can anchor at the foot of the Dune du Pilat on \"Robinson\" beach and join us on foot 50 meters higher at the flags.",
      subtitle: "Boat shuttles (UBA)",
      desc2: "You can also opt for the UBA shuttles.",
      desc3: "Summer shuttles are organized to take you to the foot of the Dune du Pyla \"Robinson beach\" departing from Arcachon, Le Moulleau (Pyla sur Mer), Cap Ferret…"
    },
    bus: {
      title: "By bus",
      desc1: "Once you get off at the \"Pyla Camping\" stop, you can reach us by walking on the forest path located between Pyla Camping and Panorama Camping, to get to the takeoff site (10min).",
      warning: "As Pyla Camping is private property, crossing it is prohibited.",
      from_arcachon: "From Arcachon",
      arcachon_desc1: "Take Line 3 and get off at the \"Pyla Camping\" stop.",
      arcachon_desc2: "Once you get off at the \"Pyla Camping\" stop, you can freely and cross Pyla Camping on foot for free to get to the takeoff site (10min).",
      from_lateste: "From La Teste de Buch",
      lateste_desc1: "Shuttles are set up from the La Teste de Buch Exhibition Center to the Dune du Pyla. Take bus line 3 to the \"Pyla Camping\" stop.",
      lateste_desc2: "Join us at the campsite exit \"beach access\" (dune side).",
      lateste_desc3: "You will be able to identify us thanks to our Waggas School flags located 200m from the campsite, on the Dune du Pilat."
    }
  },
  es: {
    title: "Llegar a Waggas school",
    subtitle: "Con cita previa",
    intro1: "A la sombra de los pinos o bajo el suave sol de la Duna de Pilat, podrás disfrutar plenamente de la diversidad que ofrece este sitio.",
    intro2: "Un camino llano y sombreado garantiza la accesibilidad para todos los visitantes.",
    car: {
      title: "En coche",
      subtitle: "Aparcamiento",
      parking_name: "Aparcamiento \"Le Sabloney\"",
      parking_desc1: "Aparca en el aparcamiento de grava",
      parking_desc2: "15 minutos a pie hasta las banderas de Waggas School",
      button: "Abrir Aparcamiento en Maps"
    },
    foot: {
      title: "A pie",
      subtitle: "Ruta a pie",
      desc1: "Desde el aparcamiento, sigue el camino hacia la duna que bordea el Pyla Camping (unos 15 min).",
      desc2: "Tómalo hasta la duna – busca las banderas de Waggas School.",
      desc3: "Llega 30 minutos antes de la hora del vuelo.",
      button: "Ubicación exacta de la escuela"
    },
    boat: {
      title: "En barco",
      desc1: "Si tienes tu propia embarcación, puedes fondear al pie de la Duna de Pilat en la playa \"Robinson\" y unirte a nosotros a pie 50 metros más arriba en las banderas.",
      subtitle: "Lanzaderas de barcos (UBA)",
      desc2: "También puedes optar por las lanzaderas UBA.",
      desc3: "Se organizan lanzaderas de verano para llevarte al pie de la Duna de Pyla \"playa Robinson\" con salida desde Arcachon, Le Moulleau (Pyla sur Mer), Cap Ferret…"
    },
    bus: {
      title: "En autobús",
      desc1: "Una vez que te bajes en la parada \"Pyla Camping\", puedes llegar a nosotros caminando por el camino forestal situado entre Pyla Camping y Panorama Camping, para llegar al lugar de despegue (10 min).",
      warning: "Dado que Pyla Camping es propiedad privada, está prohibido cruzarlo.",
      from_arcachon: "Desde Arcachon",
      arcachon_desc1: "Toma la Línea 3 y bájate en la parada \"Pyla Camping\".",
      arcachon_desc2: "Una vez que te bajes en la parada \"Pyla Camping\", puedes cruzar libremente y gratis a pie el Pyla Camping para llegar al lugar de despegue (10 min).",
      from_lateste: "Desde La Teste de Buch",
      lateste_desc1: "Se habilitan lanzaderas desde el Centro de Exposiciones de La Teste de Buch hasta la Duna de Pyla. Toma la línea 3 de autobús hasta la parada \"Pyla Camping\".",
      lateste_desc2: "Únete a nosotros en la salida del camping \"acceso a la playa\" (lado de la duna).",
      lateste_desc3: "Podrás identificarnos gracias a nuestras banderas de Waggas School situadas a 200 m del camping, en la Duna de Pilat."
    }
  },
  de: {
    title: "Anreise zur Waggas School",
    subtitle: "Nach Vereinbarung",
    intro1: "Im Schatten der Pinien oder unter der sanften Sonne der Dune du Pilat können Sie die Vielfalt dieses Ortes in vollen Zügen genießen.",
    intro2: "Ein flacher, schattiger Weg sorgt für Zugänglichkeit für alle Besucher.",
    car: {
      title: "Mit dem Auto",
      subtitle: "Parken",
      parking_name: "Parkplatz \"Le Sabloney\"",
      parking_desc1: "Parken Sie auf dem Schotterparkplatz",
      parking_desc2: "15 Min. Fußweg zu den Flaggen der Waggas School",
      button: "Parkplatz auf Maps öffnen"
    },
    foot: {
      title: "Zu Fuß",
      subtitle: "Fußweg",
      desc1: "Vom Parkplatz aus folgen Sie dem Weg in Richtung Düne, der am Pyla Camping entlangführt (ca. 15 Min.).",
      desc2: "Gehen Sie bis zur Düne – achten Sie auf die Flaggen der Waggas School.",
      desc3: "Kommen Sie 30 Min. vor der Flugzeit an.",
      button: "Genauer Standort der Schule"
    },
    boat: {
      title: "Mit dem Boot",
      desc1: "Wenn Sie ein eigenes Boot haben, können Sie am Fuß der Dune du Pilat am Strand \"Robinson\" ankern und uns zu Fuß 50 Meter weiter oben bei den Flaggen erreichen.",
      subtitle: "Boot-Shuttles (UBA)",
      desc2: "Sie können sich auch für die UBA-Shuttles entscheiden.",
      desc3: "Im Sommer werden Shuttles organisiert, die Sie von Arcachon, Le Moulleau (Pyla sur Mer), Cap Ferret... zum Fuß der Dune du Pyla \"Strand Robinson\" bringen."
    },
    bus: {
      title: "Mit dem Bus",
      desc1: "Wenn Sie an der Haltestelle \"Pyla Camping\" aussteigen, erreichen Sie uns über den Waldweg zwischen Pyla Camping und Panorama Camping zum Startplatz (10 Min.).",
      warning: "Da der Pyla Camping Privatbesitz ist, ist das Überqueren verboten.",
      from_arcachon: "Von Arcachon",
      arcachon_desc1: "Nehmen Sie die Linie 3 und steigen Sie an der Haltestelle \"Pyla Camping\" aus.",
      arcachon_desc2: "Wenn Sie an der Haltestelle \"Pyla Camping\" aussteigen, können Sie den Pyla Camping kostenlos und frei zu Fuß überqueren, um zum Startplatz zu gelangen (10 Min.).",
      from_lateste: "Von La Teste de Buch",
      lateste_desc1: "Vom Messegelände La Teste de Buch bis zur Dune du Pyla werden Shuttles eingesetzt. Nehmen Sie die Buslinie 3 bis zur Haltestelle \"Pyla Camping\".",
      lateste_desc2: "Treffen Sie uns am Ausgang des Campingplatzes \"Strandzugang\" (Dünenseite).",
      lateste_desc3: "Sie erkennen uns an unseren Waggas School-Flaggen, die sich 200 m vom Campingplatz entfernt auf der Dune du Pilat befinden."
    }
  },
  nl: {
    title: "Naar Waggas school komen",
    subtitle: "Op afspraak",
    intro1: "In de schaduw van de dennenbomen of onder de zachte zon van de Dune du Pilat kunt u volop genieten van de diversiteit die deze plek biedt.",
    intro2: "Een vlak en schaduwrijk pad zorgt voor toegankelijkheid voor alle bezoekers.",
    car: {
      title: "Met de auto",
      subtitle: "Parkeren",
      parking_name: "Parkeerplaats \"Le Sabloney\"",
      parking_desc1: "Parkeer op de onverharde parkeerplaats",
      parking_desc2: "15 min lopen naar de Waggas School vlaggen",
      button: "Open parkeren in Maps"
    },
    foot: {
      title: "Te voet",
      subtitle: "Wandelroute",
      desc1: "Volg vanaf de parkeerplaats het pad richting de duin dat langs Pyla Camping loopt (ongeveer 15 min).",
      desc2: "Neem het pad naar de duin – let op de Waggas School vlaggen.",
      desc3: "Zorg dat u 30 min voor de vluchttijd aanwezig bent.",
      button: "Exacte locatie van de school"
    },
    boat: {
      title: "Met de boot",
      desc1: "Als u een eigen boot heeft, kunt u voor anker gaan aan de voet van de Dune du Pilat op het strand \"Robinson\" en ons te voet bereiken op 50 meter hoogte bij de vlaggen.",
      subtitle: "Boot shuttles (UBA)",
      desc2: "U kunt ook kiezen voor de UBA shuttles.",
      desc3: "In de zomer worden er shuttles georganiseerd die u naar de voet van de Dune du Pyla \"strand Robinson\" brengen vanuit Arcachon, Le Moulleau (Pyla sur Mer), Cap Ferret…"
    },
    bus: {
      title: "Met de bus",
      desc1: "Zodra u uitstapt bij de halte \"Pyla Camping\", kunt u ons bereiken door te wandelen over het bospad gelegen tussen Pyla Camping en Panorama Camping, om zo naar de startplaats te gaan (10 min).",
      warning: "Aangezien Pyla Camping privéterrein is, is het verboden dit te doorkruisen.",
      from_arcachon: "Vanuit Arcachon",
      arcachon_desc1: "Neem Lijn 3 en stap uit bij de halte \"Pyla Camping\".",
      arcachon_desc2: "Zodra u uitstapt bij de halte \"Pyla Camping\", kunt u vrij en gratis te voet Pyla Camping doorkruisen om naar de startplaats te gaan (10 min).",
      from_lateste: "Vanuit La Teste de Buch",
      lateste_desc1: "Er rijden shuttles vanaf het expositiecentrum van La Teste de Buch naar de Dune du Pyla. Neem buslijn 3 naar de halte \"Pyla Camping\".",
      lateste_desc2: "Ontmoet ons bij de uitgang van de camping \"toegang strand\" (kant van de duin).",
      lateste_desc3: "U kunt ons herkennen aan onze Waggas School vlaggen, gelegen op 200m van de camping, op de Dune du Pilat."
    }
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

    data.drawer_access = translations[locale];

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Updated ${locale}.json`);
  }
}

updateDicts();

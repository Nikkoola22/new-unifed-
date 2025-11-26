/**
 * Script de test pour valider la pertinence de la recherche unifiée en 2 étapes
 * 
 * Ce script teste 24 questions couvrant les 3 sources de données :
 * - temps.ts (10 questions)
 * - formation.ts (6 questions)
 * - teletravail.ts (8 questions)
 * 
 * Usage: npx tsx src/tests/testUnifiedSearch.ts
 */

import { 
  sommaireUnifie, 
  sommaireParSource, 
  rechercherDansSommaire 
} from '../data/sommaireUnifie';
import { chapitres } from '../data/temps';
import { formation } from '../data/formation';
import { teletravailData } from '../data/teletravail';

// ============================================
// DÉFINITION DES CAS DE TEST (24 questions)
// ============================================

interface TestCase {
  id: number;
  question: string;
  sourceAttendue: 'temps' | 'formation' | 'teletravail';
  sectionsAttendues: string[];
  motsClesAttendus: string[];
  reponseAttendue: string;
}

const testCases: TestCase[] = [
  // ============================================
  // TEMPS DE TRAVAIL (10 questions)
  // ============================================
  {
    id: 1,
    question: "Combien de jours de congé pour mon mariage ?",
    sourceAttendue: 'temps',
    sectionsAttendues: ['temps_ch3_mariage'],
    motsClesAttendus: ['7 jours', 'ouvrés', 'mariage'],
    reponseAttendue: "Agent : 7 jours ouvrés pour son propre mariage"
  },
  {
    id: 2,
    question: "Combien de jours de congés annuels à Gennevilliers ?",
    sourceAttendue: 'temps',
    sectionsAttendues: ['temps_ch2_conges_annuels'],
    motsClesAttendus: ['25 jours', 'congés'],
    reponseAttendue: "25 jours ouvrés"
  },
  {
    id: 3,
    question: "Combien d'heures de travail annuelles ?",
    sourceAttendue: 'temps',
    sectionsAttendues: ['temps_ch1_definition'],
    motsClesAttendus: ['1607', 'heures'],
    reponseAttendue: "1607 heures annuelles"
  },
  {
    id: 4,
    question: "Quelles sont les plages horaires fixes obligatoires ?",
    sourceAttendue: 'temps',
    sectionsAttendues: ['temps_ch1_plages'],
    motsClesAttendus: ['9h30', '16h30'],
    reponseAttendue: "9h30-12h et 14h-16h30"
  },
  {
    id: 5,
    question: "Combien d'heures supplémentaires maximum par mois ?",
    sourceAttendue: 'temps',
    sectionsAttendues: ['temps_ch1_heures_sup'],
    motsClesAttendus: ['25', 'heures'],
    reponseAttendue: "25 heures supplémentaires maximum par mois"
  },
  {
    id: 6,
    question: "Quelle majoration pour les heures supplémentaires ?",
    sourceAttendue: 'temps',
    sectionsAttendues: ['temps_ch1_heures_sup'],
    motsClesAttendus: ['25%', '27%'],
    reponseAttendue: "25% pour les 14 premières, 27% pour les suivantes"
  },
  {
    id: 7,
    question: "Quels sont les cycles de travail hebdomadaires disponibles ?",
    sourceAttendue: 'temps',
    sectionsAttendues: ['temps_ch1_durees'],
    motsClesAttendus: ['37', '38', '39'],
    reponseAttendue: "37h, 37.5h, 38h, 39h par semaine"
  },
  {
    id: 8,
    question: "Combien de repos quotidien minimum ?",
    sourceAttendue: 'temps',
    sectionsAttendues: ['temps_ch1_garanties'],
    motsClesAttendus: ['11', 'heures'],
    reponseAttendue: "11 heures de repos quotidien minimum"
  },
  {
    id: 9,
    question: "Quelles quotités pour le temps partiel ?",
    sourceAttendue: 'temps',
    sectionsAttendues: ['temps_ch1_temps_partiel'],
    motsClesAttendus: ['50%', '80%', '90%'],
    reponseAttendue: "50%, 60%, 70%, 80% ou 90%"
  },
  {
    id: 10,
    question: "Combien dure la journée de solidarité ?",
    sourceAttendue: 'temps',
    sectionsAttendues: ['temps_ch1_solidarite'],
    motsClesAttendus: ['7', 'heures'],
    reponseAttendue: "7 heures supplémentaires"
  },
  
  // ============================================
  // FORMATION (6 questions)
  // ============================================
  {
    id: 11,
    question: "Combien d'heures CPF par an et quel est le plafond ?",
    sourceAttendue: 'formation',
    sectionsAttendues: ['formation_cpf'],
    motsClesAttendus: ['25 heures', '150 heures'],
    reponseAttendue: "25 heures par an, plafond de 150 heures"
  },
  {
    id: 12,
    question: "Combien de jours pour la formation d'intégration catégorie C ?",
    sourceAttendue: 'formation',
    sectionsAttendues: ['formation_integration', 'formation_obligatoire'],
    motsClesAttendus: ['5 jours', 'intégration'],
    reponseAttendue: "5 jours pour catégorie C, 10 jours pour A et B"
  },
  {
    id: 13,
    question: "Combien de jours de formation syndicale par an ?",
    sourceAttendue: 'formation',
    sectionsAttendues: ['formation_syndicale'],
    motsClesAttendus: ['12 jours'],
    reponseAttendue: "12 jours ouvrables par an"
  },
  {
    id: 14,
    question: "Quelle est la durée de la formation de professionnalisation ?",
    sourceAttendue: 'formation',
    sectionsAttendues: ['formation_professionnalisation', 'formation_obligatoire'],
    motsClesAttendus: ['5', '10', 'jours'],
    reponseAttendue: "5 à 10 jours selon la catégorie"
  },
  {
    id: 15,
    question: "Qu'est-ce que la VAE ?",
    sourceAttendue: 'formation',
    sectionsAttendues: ['formation_vae'],
    motsClesAttendus: ['validation', 'acquis'],
    reponseAttendue: "Validation des Acquis de l'Expérience"
  },
  {
    id: 16,
    question: "Quelle prise en charge pour les frais de formation ?",
    sourceAttendue: 'formation',
    sectionsAttendues: ['formation_perfectionnement'],
    motsClesAttendus: ['70%', 'frais'],
    reponseAttendue: "70% des frais pédagogiques si demande de l'agent"
  },
  
  // ============================================
  // TÉLÉTRAVAIL (8 questions)
  // ============================================
  {
    id: 17,
    question: "Combien de jours de forfait télétravail par an ?",
    sourceAttendue: 'teletravail',
    sectionsAttendues: ['teletravail_quotite'],
    motsClesAttendus: ['15 jours', 'forfait'],
    reponseAttendue: "Forfait annuel de 15 jours, max 3 jours par mois"
  },
  {
    id: 18,
    question: "Combien de jours de télétravail par semaine ?",
    sourceAttendue: 'teletravail',
    sectionsAttendues: ['teletravail_quotite'],
    motsClesAttendus: ['1 jour', 'semaine'],
    reponseAttendue: "1 jour fixe par semaine"
  },
  {
    id: 19,
    question: "Combien de jours de présence obligatoire sur site ?",
    sourceAttendue: 'teletravail',
    sectionsAttendues: ['teletravail_quotite'],
    motsClesAttendus: ['3 jours', 'présence'],
    reponseAttendue: "3 jours de présence obligatoire sur site par semaine"
  },
  {
    id: 20,
    question: "Le télétravail est-il un droit ou une autorisation ?",
    sourceAttendue: 'teletravail',
    sectionsAttendues: ['teletravail_principes'],
    motsClesAttendus: ['volontariat'],
    reponseAttendue: "Basé sur le volontariat et soumis à autorisation"
  },
  {
    id: 21,
    question: "Peut-on mettre fin au télétravail ?",
    sourceAttendue: 'teletravail',
    sectionsAttendues: ['teletravail_reversibilite', 'teletravail_principes'],
    motsClesAttendus: ['réversibilité', 'fin'],
    reponseAttendue: "Oui, avec délai de prévenance"
  },
  {
    id: 22,
    question: "Où peut-on télétravailler ?",
    sourceAttendue: 'teletravail',
    sectionsAttendues: ['teletravail_lieu'],
    motsClesAttendus: ['domicile', 'lieu'],
    reponseAttendue: "Domicile principal ou autre lieu déclaré"
  },
  {
    id: 23,
    question: "Quels métiers sont exclus du télétravail ?",
    sourceAttendue: 'teletravail',
    sectionsAttendues: ['teletravail_eligibilite'],
    motsClesAttendus: ['exclus', 'contact'],
    reponseAttendue: "Métiers en contact quotidien avec usagers, voie publique, etc."
  },
  {
    id: 24,
    question: "Quel matériel est fourni pour le télétravail ?",
    sourceAttendue: 'teletravail',
    sectionsAttendues: ['teletravail_materiel'],
    motsClesAttendus: ['matériel', 'fourni'],
    reponseAttendue: "Matériel fourni par la collectivité"
  }
];

// ============================================
// FONCTIONS DE TEST
// ============================================

function testRechercherDansSommaire(testCase: TestCase): { success: boolean; details: string; sectionsFound: string[] } {
  const sections = rechercherDansSommaire(testCase.question, 5);
  const sectionsIds = sections.map(s => s.id);
  
  const sectionsAttenduesTouvees = testCase.sectionsAttendues.filter(id => sectionsIds.includes(id));
  const topSection = sections[0];
  const sourceOK = topSection?.source === testCase.sourceAttendue;
  
  const success = sectionsAttenduesTouvees.length > 0 || sourceOK;
  
  const details = `Sections trouvées: [${sectionsIds.join(', ')}] | Attendues: [${testCase.sectionsAttendues.join(', ')}] | Source top: ${topSection?.source || 'N/A'} (attendue: ${testCase.sourceAttendue})`;
  
  return { success, details, sectionsFound: sectionsIds };
}

function getContentForSection(sectionId: string): string {
  const section = sommaireUnifie.find(s => s.id === sectionId);
  if (!section) return '';
  
  switch (section.source) {
    case 'temps':
      const chapitre = section.chapitre;
      if (chapitre && chapitre >= 1 && chapitre <= 4) {
        return chapitres[chapitre as keyof typeof chapitres];
      }
      return Object.values(chapitres).join('\n');
    case 'formation':
      return formation;
    case 'teletravail':
      return teletravailData;
    default:
      return '';
  }
}

function testMotsClesDansContenu(testCase: TestCase, sectionsFound: string[]): { success: boolean; details: string } {
  if (sectionsFound.length === 0) {
    return { success: false, details: 'Aucune section trouvée' };
  }
  
  const content = sectionsFound
    .slice(0, 2)
    .map(id => getContentForSection(id))
    .join('\n')
    .toLowerCase();
  
  const motsClesTrouves = testCase.motsClesAttendus.filter(mc => 
    content.includes(mc.toLowerCase())
  );
  
  const success = motsClesTrouves.length >= Math.ceil(testCase.motsClesAttendus.length / 2);
  
  const details = `Mots-clés trouvés: [${motsClesTrouves.join(', ')}] / Attendus: [${testCase.motsClesAttendus.join(', ')}]`;
  
  return { success, details };
}

// ============================================
// EXÉCUTION DES TESTS
// ============================================

async function runTests() {
  console.log('\n🧪 ===============================================');
  console.log('   TEST DE PERTINENCE - RECHERCHE UNIFIÉE (24 questions)');
  console.log('   ===============================================\n');
  
  // Validation du sommaire
  console.log('📋 TEST 0: Validation du sommaire unifié');
  const tempsCount = sommaireParSource.temps.length;
  const formationCount = sommaireParSource.formation.length;
  const teletravailCount = sommaireParSource.teletravail.length;
  const totalSections = sommaireUnifie.length;
  const sectionsWithoutKeywords = sommaireUnifie.filter(s => !s.motsCles || s.motsCles.length === 0);
  console.log(`   ✅ Sections: temps=${tempsCount}, formation=${formationCount}, teletravail=${teletravailCount}, total=${totalSections} | Sans mots-clés: ${sectionsWithoutKeywords.length}`);
  
  let totalTests = 0;
  let successTests = 0;
  const failedTests: { id: number; question: string; reason: string }[] = [];
  
  // Grouper par source pour l'affichage
  const testsBySource = {
    temps: testCases.filter(t => t.sourceAttendue === 'temps'),
    formation: testCases.filter(t => t.sourceAttendue === 'formation'),
    teletravail: testCases.filter(t => t.sourceAttendue === 'teletravail')
  };
  
  for (const [source, tests] of Object.entries(testsBySource)) {
    console.log(`\n📂 === ${source.toUpperCase()} (${tests.length} questions) ===`);
    
    for (const testCase of tests) {
      console.log(`\n📝 TEST ${testCase.id}: "${testCase.question}"`);
      console.log(`   Réponse attendue: ${testCase.reponseAttendue}`);
      
      // Test A: Recherche dans le sommaire
      const resultSommaire = testRechercherDansSommaire(testCase);
      totalTests++;
      if (resultSommaire.success) {
        successTests++;
        console.log(`   ✅ A. Recherche sommaire OK`);
      } else {
        console.log(`   ❌ A. Recherche sommaire ÉCHEC`);
        failedTests.push({ id: testCase.id, question: testCase.question, reason: `Sommaire: ${resultSommaire.details}` });
      }
      console.log(`      ${resultSommaire.details}`);
      
      // Test B: Mots-clés dans le contenu
      const resultMotsCles = testMotsClesDansContenu(testCase, resultSommaire.sectionsFound);
      totalTests++;
      if (resultMotsCles.success) {
        successTests++;
        console.log(`   ✅ B. Mots-clés présents OK`);
      } else {
        console.log(`   ❌ B. Mots-clés MANQUANTS`);
        failedTests.push({ id: testCase.id, question: testCase.question, reason: `Mots-clés: ${resultMotsCles.details}` });
      }
      console.log(`      ${resultMotsCles.details}`);
    }
  }
  
  // Résumé
  console.log('\n📊 ===============================================');
  console.log('   RÉSUMÉ DES TESTS');
  console.log('   ===============================================\n');
  
  const successRate = Math.round((successTests / totalTests) * 100);
  console.log(`   Tests réussis: ${successTests}/${totalTests} (${successRate}%)`);
  
  if (failedTests.length > 0) {
    console.log(`\n   ❌ Tests échoués (${failedTests.length}):`);
    failedTests.forEach(f => {
      console.log(`      - Q${f.id}: ${f.question}`);
      console.log(`        → ${f.reason}`);
    });
  } else {
    console.log('\n   🎉 Tous les tests sont passés !');
  }
  
  // Analyse des sections manquantes
  console.log('\n🔍 ===============================================');
  console.log('   ANALYSE DES AMÉLIORATIONS POSSIBLES');
  console.log('   ===============================================\n');
  
  const allExpectedSections = new Set(testCases.flatMap(t => t.sectionsAttendues));
  const existingSections = new Set(sommaireUnifie.map(s => s.id));
  const missingSections = [...allExpectedSections].filter(s => !existingSections.has(s));
  
  if (missingSections.length > 0) {
    console.log('   ⚠️ Sections attendues mais manquantes dans le sommaire:');
    missingSections.forEach(s => console.log(`      - ${s}`));
  } else {
    console.log('   ✅ Toutes les sections attendues existent dans le sommaire');
  }
  
  // Stats par source
  console.log('\n   📈 Statistiques par source:');
  for (const [source, tests] of Object.entries(testsBySource)) {
    const sourceTests = tests.length * 2; // 2 tests par question
    const sourceSuccess = tests.filter(t => {
      const r1 = testRechercherDansSommaire(t);
      const r2 = testMotsClesDansContenu(t, r1.sectionsFound);
      return r1.success && r2.success;
    }).length * 2;
    console.log(`      ${source}: ${sourceSuccess}/${sourceTests} tests OK`);
  }
}

// Exécuter les tests
runTests().catch(console.error);

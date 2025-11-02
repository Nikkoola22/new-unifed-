// Script de test simple pour évaluer la pertinence de la recherche
// Usage: node test-recherche-simple.js
// Note: Ce script nécessite que le serveur soit démarré pour tester les appels API

// Import fetch pour Node.js
import fetch from 'node-fetch';

/**
 * Tests de recherche - 10 questions pour évaluer la pertinence
 */
const tests = [
  {
    question: "Combien de jours de télétravail puis-je faire par an ?",
    chapitreAttendu: "Chapitre 6 : Le protocole télétravail",
    sourceAttendue: "teletravail",
    description: "Devrait trouver le chapitre sur le télétravail et le forfait annuel"
  },
  {
    question: "Combien de jours ai-je pour mon mariage ?",
    chapitreAttendu: "Chapitre 3 : Autorisations spéciales d'absence",
    sourceAttendue: "temps",
    description: "Devrait trouver le chapitre sur les autorisations d'absence avec l'article sur le mariage"
  },
  {
    question: "Que faire si mon enfant est malade et que je dois le garder ?",
    chapitreAttendu: "Chapitre 3 : Autorisations spéciales d'absence",
    sourceAttendue: "temps",
    description: "Devrait trouver l'article sur la garde d'enfant malade"
  },
  {
    question: "Comment fonctionne le forfait annuel en télétravail ?",
    chapitreAttendu: "Chapitre 6 : Le protocole télétravail",
    sourceAttendue: "teletravail",
    description: "Devrait trouver le chapitre télétravail avec les informations sur le forfait"
  },
  {
    question: "Combien d'heures de travail effectif ai-je par an ?",
    chapitreAttendu: "Chapitre 1 : Le temps de travail",
    sourceAttendue: "temps",
    description: "Devrait trouver le chapitre sur le temps de travail avec les 1607h"
  },
  {
    question: "J'ai eu un accident de service, que dois-je faire ?",
    chapitreAttendu: "Chapitre 4 : Les absences pour maladies et accidents",
    sourceAttendue: "temps",
    description: "Devrait trouver le chapitre sur les accidents de service"
  },
  {
    question: "Puis-je prendre un congé pour la rentrée scolaire de mes enfants ?",
    chapitreAttendu: "Chapitre 3 : Autorisations spéciales d'absence",
    sourceAttendue: "temps",
    description: "Devrait trouver l'article sur la rentrée scolaire"
  },
  {
    question: "Comment demander une formation dans le cadre du plan de formation ?",
    chapitreAttendu: "Chapitre 5 : Le règlement formation",
    sourceAttendue: "formation",
    description: "Devrait trouver le chapitre sur la formation"
  },
  {
    question: "Qu'est-ce que le CET et comment l'utiliser ?",
    chapitreAttendu: "Chapitre 2 : Les congés",
    sourceAttendue: "temps",
    description: "Devrait trouver l'article sur le Compte Épargne Temps dans les congés"
  },
  {
    question: "Puis-je être en télétravail 3 jours par semaine ?",
    chapitreAttendu: "Chapitre 6 : Le protocole télétravail",
    sourceAttendue: "teletravail",
    description: "Devrait trouver les informations sur la durée maximale du télétravail (4 jours fixes max)"
  }
];

/**
 * Fonction pour tester une question via l'API
 */
async function testerQuestion(test, index, apiUrl = 'http://localhost:3000/api/completions') {
  const startTime = Date.now();
  
  try {
    // Créer un prompt similaire à celui utilisé dans App.tsx
    const question = test.question;
    
    // Pour ce test, on va simuler ce que fait trouverContextePertinentAvecIA
    // En pratique, vous devriez tester directement avec l'application complète
    
    const prompt = `Tu es un assistant qui aide à sélectionner le contexte le plus pertinent pour répondre à une question.

QUESTION DE L'UTILISATEUR: "${question}"

Analyse cette question et indique quel chapitre serait le plus pertinent parmi:
1. Chapitre 1 : Le temps de travail
2. Chapitre 2 : Les congés
3. Chapitre 3 : Autorisations spéciales d'absence
4. Chapitre 4 : Les absences pour maladies et accidents
5. Chapitre 5 : Le règlement formation
6. Chapitre 6 : Le protocole télétravail

Réponds UNIQUEMENT par le numéro du chapitre (1-6), sans autre texte.`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 10,
        temperature: 0.0,
      }),
    });

    const temps = Date.now() - startTime;
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const reponseIA = data.choices[0]?.message?.content?.trim() || "";
    
    // Mapper les numéros aux chapitres
    const mappingChapitres = {
      1: "Chapitre 1 : Le temps de travail",
      2: "Chapitre 2 : Les congés",
      3: "Chapitre 3 : Autorisations spéciales d'absence",
      4: "Chapitre 4 : Les absences pour maladies et accidents",
      5: "Chapitre 5 : Le règlement formation",
      6: "Chapitre 6 : Le protocole télétravail"
    };
    
    const numeroMatch = reponseIA.match(/^(\d)/);
    const chapitreTrouve = numeroMatch ? mappingChapitres[numeroMatch[1]] : "Aucun";
    const trouve = chapitreTrouve === test.chapitreAttendu;
    
    // Calculer la pertinence
    let pertinence = 0;
    if (trouve) {
      pertinence = 100;
    } else if (chapitreTrouve !== "Aucun") {
      // Même domaine = 50%
      const domaineTrouve = chapitreTrouve.includes("télétravail") ? "teletravail" :
                           chapitreTrouve.includes("formation") ? "formation" : "temps";
      pertinence = domaineTrouve === test.sourceAttendue ? 50 : 25;
    }
    
    return {
      index: index + 1,
      question: test.question,
      trouve,
      chapitreAttendu: test.chapitreAttendu,
      chapitreTrouve,
      pertinence,
      reponseIA: reponseIA.substring(0, 100),
      temps
    };
  } catch (error) {
    return {
      index: index + 1,
      question: test.question,
      trouve: false,
      chapitreAttendu: test.chapitreAttendu,
      chapitreTrouve: "Erreur",
      pertinence: 0,
      reponseIA: `Erreur: ${error.message}`,
      temps: Date.now() - startTime
    };
  }
}

/**
 * Exécuter tous les tests
 */
async function executerTests(apiUrl) {
  console.log("🧪 DÉMARRAGE DES TESTS DE RECHERCHE\n");
  console.log("=".repeat(80));
  
  const resultats = await Promise.all(
    tests.map((test, index) => testerQuestion(test, index, apiUrl))
  );
  
  // Afficher les résultats
  console.log("\n📊 RÉSULTATS DÉTAILLÉS\n");
  console.log("=".repeat(80));
  
  resultats.forEach((resultat, index) => {
    const test = tests[index];
    const emoji = resultat.trouve ? "✅" : "❌";
    
    console.log(`\n${emoji} Test ${resultat.index}: ${resultat.question}`);
    console.log(`   Chapitre attendu: ${resultat.chapitreAttendu}`);
    console.log(`   Chapitre trouvé: ${resultat.chapitreTrouve}`);
    console.log(`   Pertinence: ${resultat.pertinence}%`);
    console.log(`   Temps: ${resultat.temps}ms`);
    console.log(`   Réponse IA: ${resultat.reponseIA}`);
    console.log(`   Description: ${test.description}`);
  });
  
  // Statistiques globales
  const moyenne = resultats.reduce((sum, r) => sum + r.pertinence, 0) / resultats.length;
  const succes = resultats.filter(r => r.trouve).length;
  const tempsMoyen = resultats.reduce((sum, r) => sum + r.temps, 0) / resultats.length;
  
  console.log("\n" + "=".repeat(80));
  console.log("\n📈 STATISTIQUES GLOBALES\n");
  console.log(`   Tests réussis: ${succes}/${tests.length} (${(succes/tests.length*100).toFixed(1)}%)`);
  console.log(`   Pertinence moyenne: ${moyenne.toFixed(1)}%`);
  console.log(`   Temps moyen par requête: ${tempsMoyen.toFixed(1)}ms`);
  
  // Recommandations
  console.log("\n💡 RECOMMANDATIONS\n");
  if (moyenne < 70) {
    console.log("   ⚠️  La pertinence moyenne est faible. Améliorer l'algorithme de recherche.");
  }
  if (succes < tests.length * 0.8) {
    console.log("   ⚠️  Trop de tests échouent. Vérifier les synonymes et mots-clés.");
  }
  if (tempsMoyen > 2000) {
    console.log("   ⚠️  Les temps de réponse sont élevés. Optimiser les performances.");
  }
  if (moyenne >= 80 && succes >= tests.length * 0.9) {
    console.log("   ✅ Les performances sont bonnes !");
  }
  
  console.log("\n" + "=".repeat(80));
  
  return {
    moyenne,
    succes,
    total: tests.length,
    tempsMoyen
  };
}

// Exporter pour utilisation dans d'autres scripts
export { tests, testerQuestion, executerTests };

// Exécuter si lancé directement (ES modules)
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.includes('test-recherche-simple.js')) {
  const apiUrl = process.env.API_URL || 'http://localhost:3001/api/completions';
  console.log(`\n🌐 Utilisation de l'API: ${apiUrl}\n`);
  console.log("Note: Assurez-vous que le serveur est démarré (npm run server)\n");
  
  executerTests(apiUrl).catch(error => {
    console.error("❌ Erreur lors de l'exécution des tests:", error);
    process.exit(1);
  });
}


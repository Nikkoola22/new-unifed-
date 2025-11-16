#!/usr/bin/env node

/**
 * Script de test complet pour évaluer la pertinence du contexte de recherche
 * Test multi-domaines: temps, congés, absences, maladies, formation, télétravail
 */

import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const BACKEND_API_URL = 'http://localhost:3001/api/completions';

// Test cases couvrant tous les chapitres
const testCases = [
  // === CHAPITRE 1: TEMPS DE TRAVAIL ===
  {
    question: "quels sont les horaires de travail ?",
    expectedChapter: 1,
    description: "Durée légale du temps de travail"
  },
  {
    question: "comment fonctionnent les astreintes ?",
    expectedChapter: 1,
    description: "Astreintes et permanences"
  },
  {
    question: "je fais du travail de nuit, quelle est la compensation ?",
    expectedChapter: 1,
    description: "Travail de nuit et garanties"
  },
  
  // === CHAPITRE 2: CONGÉS ===
  {
    question: "combien de jours de congés j'ai droit par an ?",
    expectedChapter: 2,
    description: "Congés annuels"
  },
  {
    question: "c'est quoi le CET ?",
    expectedChapter: 2,
    description: "Compte Épargne Temps"
  },
  {
    question: "comment fonctionnent les RTT ?",
    expectedChapter: 2,
    description: "ARTT et récupération"
  },
  
  // === CHAPITRE 3: ABSENCES ===
  {
    question: "comment avoir une journée libre pour une fête religieuse ?",
    expectedChapter: 3,
    description: "Autorisations d'absence - fêtes religieuses"
  },
  {
    question: "j'ai besoin de garder mon enfant malade",
    expectedChapter: 3,
    description: "Absence pour garde d'enfant malade"
  },
  {
    question: "qu'est-ce que le congé proche aidant ?",
    expectedChapter: 3,
    description: "Proche aidant et fin de vie"
  },
  
  // === CHAPITRE 4: MALADIES ===
  {
    question: "comment fonctionne un arrêt maladie ?",
    expectedChapter: 4,
    description: "Arrêt maladie"
  },
  {
    question: "c'est quoi une maladie professionnelle ?",
    expectedChapter: 4,
    description: "Maladies professionnelles"
  },
  
  // === CHAPITRE 5: FORMATION ===
  {
    question: "comment utiliser mon CPF ?",
    expectedChapter: 5,
    description: "Formation et CPF"
  },
  {
    question: "quelles formations professionnelles sont disponibles ?",
    expectedChapter: 5,
    description: "Formations professionnalisantes"
  },
  
  // === CHAPITRE 6: TÉLÉTRAVAIL ===
  {
    question: "j'ai droit a combien de jours de forfait ?",
    expectedChapter: 6,
    description: "Forfait télétravail (15 jours)"
  },
  {
    question: "comment marche le télétravail ?",
    expectedChapter: 6,
    description: "Protocole télétravail général"
  },
  {
    question: "3 jours maximum par mois de télétravail ?",
    expectedChapter: 6,
    description: "Limites du télétravail"
  },
  {
    question: "peux-je travailler de chez moi ?",
    expectedChapter: 6,
    description: "Télétravail à domicile"
  }
];

// Appel à l'API
async function appelPerplexity(question) {
  try {
    const data = {
      model: 'sonar-pro',
      messages: [
        {
          role: 'user',
          content: question
        }
      ],
      max_tokens: 1,
      temperature: 0.0
    };

    const response = await fetch(BACKEND_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    return result.choices[0].message.content.trim();
  } catch (error) {
    console.error('❌ Erreur API:', error.message);
    return null;
  }
}

// Test principal
async function runTests() {
  console.log('🧪 TESTS DE PERTINENCE DU ROUTAGE GLOBAL\n');
  console.log('='.repeat(80));

  let passed = 0;
  let failed = 0;
  let byChapter = { 1: { pass: 0, fail: 0 }, 2: { pass: 0, fail: 0 }, 3: { pass: 0, fail: 0 }, 4: { pass: 0, fail: 0 }, 5: { pass: 0, fail: 0 }, 6: { pass: 0, fail: 0 } };

  for (const testCase of testCases) {
    console.log(`\n📝 "${testCase.question}"`);
    console.log(`   📋 ${testCase.description}`);
    console.log(`   ✅ Attendu: Chapitre ${testCase.expectedChapter}`);

    const result = await appelPerplexity(testCase.question);

    if (!result) {
      console.log('   ❌ Pas de réponse');
      failed++;
      byChapter[testCase.expectedChapter].fail++;
      continue;
    }

    const chapter = parseInt(result.match(/\d/)?.[0] || '0');
    console.log(`   📍 Reçu: Chapitre ${chapter}`);

    if (chapter === testCase.expectedChapter) {
      console.log('   ✅ PASS');
      passed++;
      byChapter[testCase.expectedChapter].pass++;
    } else {
      console.log(`   ❌ FAIL`);
      failed++;
      byChapter[testCase.expectedChapter].fail++;
    }

    await new Promise(resolve => setTimeout(resolve, 300));
  }

  console.log('\n' + '='.repeat(80));
  console.log(`\n📊 RÉSULTATS GLOBAUX: ${passed}/${testCases.length} tests réussis`);
  console.log(`✅ Pass: ${passed} | ❌ Fail: ${failed}\n`);

  console.log('📈 RÉSULTATS PAR CHAPITRE:');
  for (let i = 1; i <= 6; i++) {
    const stats = byChapter[i];
    const total = stats.pass + stats.fail;
    const percent = total > 0 ? Math.round((stats.pass / total) * 100) : 0;
    console.log(`   Chapitre ${i}: ${stats.pass}/${total} (${percent}%)`);
  }

  if (failed === 0) {
    console.log('\n✅ Tous les tests sont passés !');
  } else {
    console.log(`\n⚠️  ${failed} test(s) ont échoué.`);
  }

  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(error => {
  console.error('💥 Erreur fatale:', error);
  process.exit(1);
});

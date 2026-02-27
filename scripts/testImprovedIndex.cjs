#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load the improved index
const indexPath = path.join(__dirname, '..', 'src', 'data', 'bip-index.json');
const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const allFiches = indexData.index;

console.log('🧪 TEST DE L\'INDEX AMÉLIORÉ - DISTINCTIONS D\'AGENT\n');
console.log('═'.repeat(60));

// Test case: "un agent contractuel peut il avoir une conges de longue maladie ?"
const testQuestion = 'un agent contractuel peut il avoir une conges de longue maladie ?';
const keywords = testQuestion.toLowerCase().split(' ').filter(w => w.length > 3);
const agentStatus = 'contractuel';

console.log(`\n📋 QUESTION: "${testQuestion}"`);
console.log(`🏷️  STATUT DÉTECTÉ: ${agentStatus}`);
console.log(`🔍 MOTS-CLÉS: ${keywords.join(', ')}`);

// Filter by keywords
const matchesByKeyword = allFiches.filter(fiche =>
  keywords.some(kw =>
    fiche.motsCles.some(mk => mk.toLowerCase().includes(kw.toLowerCase()))
  )
);

console.log(`\n📊 RÉSULTATS SANS FILTRAGE DE STATUT: ${matchesByKeyword.length} fiches`);

// Filter by keywords AND status
const matchesByKeywordAndStatus = matchesByKeyword.filter(fiche => {
  // Check if applicable to contractuel
  if (fiche.applicableTo.includes('contractuel')) return true;
  if (fiche.applicableTo.includes('general')) return true;
  
  // Reject rules that only apply to titulaires
  if (fiche.criticalRules.includes('longue_maladie_titulaire')) return false;
  if (fiche.criticalRules.includes('longue_maladie_not_for_contractuel')) return false;
  if (fiche.criticalRules.includes('grave_maladie_contractuel')) return true;
  
  return false;
});

console.log(`✅ RÉSULTATS AVEC FILTRAGE STATUT "${agentStatus}": ${matchesByKeywordAndStatus.length} fiches\n`);

// Show relevant results
console.log('📚 MEILLEURES FICHES PERTINENTES:\n');
const relevantFiches = matchesByKeywordAndStatus.slice(0, 5);
relevantFiches.forEach((fiche, i) => {
  console.log(`${i + 1}. [${fiche.code}] ${fiche.titre}`);
  if (fiche.criticalRules && fiche.criticalRules.length > 0) {
    console.log(`   Règles: ${fiche.criticalRules.join(', ')}`);
  }
});

console.log('\n' + '═'.repeat(60));
console.log('\n✨ ANALYSE:');

// Check for critical distinction
const hasGraveMaladie = matchesByKeywordAndStatus.some(f => 
  f.criticalRules && f.criticalRules.includes('grave_maladie_contractuel')
);
const hasLongueMaladie = matchesByKeywordAndStatus.some(f => 
  f.criticalRules && f.criticalRules.includes('longue_maladie_titulaire')
);

console.log(`\n🏥 DISTINCTION MALADIE:`);
if (hasGraveMaladie) {
  console.log(`  ✓ Grave maladie (contractuel): TROUVÉE`);
}
if (!hasLongueMaladie) {
  console.log(`  ✓ Longue maladie (titulaire): EXCLUE CORRECTEMENT`);
}

console.log('\n💡 RÉPONSE ATTENDUE:');
console.log('❌ NON - Un agent contractuel ne peut PAS avoir de congé de longue maladie.');
console.log('✅ OUI - Un agent contractuel peut avoir un congé de grave maladie.');

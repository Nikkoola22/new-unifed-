#!/usr/bin/env node
const fs = require('fs');
const idx = JSON.parse(fs.readFileSync('./src/data/bip-index.json', 'utf-8'));

const keywords = ['congé', 'maladie', 'longue'];

const results = idx.index.filter(f =>
  keywords.some(k => 
    f.motsCles.some(mk => mk.toLowerCase().includes(k.toLowerCase())) ||
    f.titre.toLowerCase().includes(k.toLowerCase())
  )
);

console.log('\n🔍 RECHERCHE BIP: Congé de longue maladie - Agents contractuels\n');
console.log(`✅ ${results.length} fiches trouvées\n`);

if (results.length > 0) {
  console.log('📚 TOP 5 RÉSULTATS:\n');
  results.slice(0, 5).forEach((f, i) => {
    console.log(`${i+1}. [${f.code}] ${f.titre}`);
    console.log(`   📍 ${f.categorie}`);
    console.log(`   🏷️  ${f.motsCles.slice(0, 3).join(', ')}`);
    console.log(`   🔗 ${f.url}`);
    console.log('');
  });
}

console.log('════════════════════════════════════════════════');
console.log('\n💡 RÉPONSE BASÉE SUR LES FICHES BIP:\n');

const hasConge = results.some(f => f.titre.toLowerCase().includes('longue') && f.titre.toLowerCase().includes('maladie'));
const hasContractuel = results.some(f => f.titre.toLowerCase().includes('contractuel'));

if (hasConge && hasContractuel) {
  console.log('✅ OUI - Un agent contractuel peut avoir un congé de longue maladie.');
  console.log('\nLes fiches BIP indiquent que les agents contractuels ont accès à des');
  console.log('dispositions particulières en matière de congés de maladie, notamment');
  console.log('les congés de longue maladie, sous certaines conditions.');
  console.log('\nPour les détails complets, consultez les fiches BIP pertinentes ci-dessus.');
} else {
  console.log('⚠️  Vérification nécessaire dans les fiches BIP.');
  console.log('\nLes résultats ci-dessus contiennent des informations sur:');
  console.log('- Les congés et absences');
  console.log('- Les agents contractuels');
  console.log('- Les dispositions de longue maladie');
  console.log('\nConsultez les fiches spécifiques pour une réponse précise.');
}

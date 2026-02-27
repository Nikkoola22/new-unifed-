#!/usr/bin/env node
/**
 * Test script for BIP Fiche Index
 * Verifies that the index was generated correctly and search functions work
 */

import { 
  searchFicheByCode, 
  searchFichesByKeywords, 
  searchFichesByCategory,
  getCategories,
  getCategoryIndexMap,
  suggestFiches,
  getFicheDetails,
  getIndexStats,
  buildLLMContext
} from '../src/utils/ficheSearch.ts';

console.log('🧪 BIP Fiche Index Test Suite\n');
console.log('=' .repeat(60));

// Test 1: Get index statistics
console.log('\n📊 Test 1: Index Statistics');
console.log('-'.repeat(60));
try {
  const stats = getIndexStats();
  console.log(`✓ Total fiches: ${stats.totalFiches}`);
  console.log(`✓ Total categories: ${stats.totalCategories}`);
  console.log(`✓ Average fiches per category: ${stats.averageFichesPerCategory}`);
  console.log(`✓ Largest category: ${stats.larggestCategory.name} (${stats.larggestCategory.count} fiches)`);
} catch (error) {
  console.error('✗ Error:', error.message);
}

// Test 2: Get categories
console.log('\n📁 Test 2: Available Categories');
console.log('-'.repeat(60));
try {
  const categories = getCategories();
  console.log(`✓ Found ${categories.length} categories:`);
  categories.forEach((cat) => console.log(`  • ${cat}`));
} catch (error) {
  console.error('✗ Error:', error.message);
}

// Test 3: Search by code
console.log('\n🔍 Test 3: Search by Code');
console.log('-'.repeat(60));
try {
  const categoryIndex = getCategoryIndexMap();
  const firstCategory = Object.keys(categoryIndex)[0];
  const firstFiche = categoryIndex[firstCategory][0];
  
  if (firstFiche) {
    const result = searchFicheByCode(firstFiche.code);
    if (result) {
      console.log(`✓ Found fiche by code: ${firstFiche.code}`);
      console.log(`  Title: ${result.titre}`);
      console.log(`  Category: ${result.categorie}`);
    } else {
      console.log(`✗ Code ${firstFiche.code} not found`);
    }
  }
} catch (error) {
  console.error('✗ Error:', error.message);
}

// Test 4: Search by keywords
console.log('\n🔑 Test 4: Search by Keywords');
console.log('-'.repeat(60));
try {
  const results = searchFichesByKeywords(['congé', 'maternité']);
  console.log(`✓ Found ${results.results.length} fiches matching keywords "congé, maternité"`);
  
  if (results.results.length > 0) {
    console.log(`  First result: [${results.results[0].code}] ${results.results[0].titre}`);
  }
  console.log(`  Execution time: ${results.metadata.executionTimeMs}ms`);
} catch (error) {
  console.error('✗ Error:', error.message);
}

// Test 5: Search by category
console.log('\n📂 Test 5: Search by Category');
console.log('-'.repeat(60));
try {
  const categories = getCategories();
  if (categories.length > 0) {
    const category = categories[0];
    const results = searchFichesByCategory(category);
    console.log(`✓ Found ${results.results.length} fiches in category "${category}"`);
    
    if (results.results.length > 0) {
      console.log(`  First result: [${results.results[0].code}] ${results.results[0].titre}`);
    }
  }
} catch (error) {
  console.error('✗ Error:', error.message);
}

// Test 6: Suggest fiches (autocomplete)
console.log('\n💡 Test 6: Fiche Suggestions');
console.log('-'.repeat(60));
try {
  const suggestions = suggestFiches('congé', 3);
  console.log(`✓ Found ${suggestions.length} suggestions for "congé"`);
  suggestions.forEach((fiche) => {
    console.log(`  • [${fiche.code}] ${fiche.titre}`);
  });
} catch (error) {
  console.error('✗ Error:', error.message);
}

// Test 7: Get fiche details
console.log('\n📋 Test 7: Fiche Details');
console.log('-'.repeat(60));
try {
  const categoryIndex = getCategoryIndexMap();
  const firstCategory = Object.keys(categoryIndex)[0];
  const firstFiche = categoryIndex[firstCategory][0];
  
  if (firstFiche) {
    const details = getFicheDetails(firstFiche.code);
    if (details) {
      console.log(`✓ Got details for fiche: ${firstFiche.code}`);
      console.log(`  Title: ${details.titre}`);
      console.log(`  Keywords: ${details.motsCles.join(', ') || 'None'}`);
      console.log(`  URL: ${details.url}`);
    }
  }
} catch (error) {
  console.error('✗ Error:', error.message);
}

// Test 8: LLM Context Building
console.log('\n🤖 Test 8: LLM Context Building');
console.log('-'.repeat(60));
try {
  const results = searchFichesByKeywords(['congé']).results;
  const context = buildLLMContext(results);
  console.log(`✓ Built LLM context for ${results.length} fiches`);
  console.log(`  Context length: ${context.length} characters`);
  console.log(`\n  Sample:\n${context.substring(0, 300)}...`);
} catch (error) {
  console.error('✗ Error:', error.message);
}

console.log('\n' + '='.repeat(60));
console.log('\n✅ Test suite completed!\n');

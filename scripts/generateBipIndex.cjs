#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

/**
 * Parse JSONL file and return all records
 */
async function parseJsonL(filePath) {
  const records = [];
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (line.trim()) {
      try {
        records.push(JSON.parse(line));
      } catch (e) {
        console.warn(`⚠️  Failed to parse line in ${filePath}:`, line.substring(0, 100));
      }
    }
  }
  return records;
}

/**
 * Detect applicable agent statuses from fiche content
 */
function extractApplicableStatuses(content, title) {
  const statuses = new Set();
  const lowerContent = (content + ' ' + title).toLowerCase();
  
  // Comprehensive detection patterns
  if (lowerContent.includes('titulaire') || lowerContent.includes('fonctionnaire titularisé')) {
    statuses.add('titulaire');
  }
  if (lowerContent.includes('contractuel')) {
    statuses.add('contractuel');
  }
  if (lowerContent.includes('stagiaire')) {
    statuses.add('stagiaire');
  }
  if (lowerContent.includes('agent de droit public')) {
    statuses.add('contractuel');
  }
  
  // If no specific status found, assume general applicability
  if (statuses.size === 0) {
    statuses.add('general');
  }
  
  return Array.from(statuses);
}

/**
 * Extract critical rules and distinctions from content
 */
function extractCriticalRules(content, title) {
  const rules = [];
  const lowerContent = (content + ' ' + title).toLowerCase();
  
  // Sick leave distinctions (CRITICAL)
  if (lowerContent.includes('longue maladie') && lowerContent.includes('titulaire')) {
    rules.push('longue_maladie_titulaire');
  }
  if (lowerContent.includes('grave maladie') && lowerContent.includes('contractuel')) {
    rules.push('grave_maladie_contractuel');
  }
  if (lowerContent.includes('longue maladie') && lowerContent.includes('contractuel')) {
    rules.push('longue_maladie_not_for_contractuel');
  }
  
  // Maternity/paternity distinctions
  if (lowerContent.includes('maternité')) rules.push('maternite_leave');
  if (lowerContent.includes('paternité')) rules.push('paternite_leave');
  
  // Contract-specific rules
  if (lowerContent.includes('durée du contrat')) rules.push('contract_duration');
  if (lowerContent.includes('reconduction')) rules.push('contract_renewal');
  
  // Discipline and sanction
  if (lowerContent.includes('discipline') || lowerContent.includes('sanction')) {
    rules.push('disciplinary_procedure');
  }
  
  // Time-specific rules
  if (lowerContent.includes('temps partiel')) rules.push('part_time');
  if (lowerContent.includes('télétravail')) rules.push('remote_work');
  if (lowerContent.includes('aménagement')) rules.push('work_arrangement');
  
  return rules;
}

/**
 * Extract keywords from fiche content - IMPROVED
 */
function extractKeywords(content, title) {
  const keywords = new Set();

  // Extract article references (L.xxx, R.xxx, D.xxx, etc.)
  const articleMatches = content.match(/(?:article\s+)?[LRDC]\.?\s*\d+[\w-]*/gi);
  if (articleMatches) {
    articleMatches.slice(0, 5).forEach((m) => {
      keywords.add(m.trim().toUpperCase());
    });
  }

  // Enhanced common terms with status-specific terms
  const terms = [
    // Leave types
    'maternité',
    'paternité',
    'adoption',
    'congé',
    'absence',
    'maladie',
    'longue maladie',
    'grave maladie',
    'accident du travail',
    'accident de service',
    'maladie professionnelle',
    'disponibilité',
    // Compensation
    'indemnité',
    'rémunération',
    'salaire',
    'traitement',
    'indemnité de départ',
    // Work arrangements
    'temps partiel',
    'télétravail',
    'formation',
    'mutation',
    'détachement',
    'mise à disposition',
    'mobilité',
    'retraite',
    // Medical/health
    'avis médical',
    'visite médicale',
    'incapacité',
    'inaptitude',
    // Management
    'gestion du personnel',
    'procédure disciplinaire',
    'sanction',
    'droit syndical',
    'représentants',
    'élections',
    'comité téchnique',
    'commission paritaire',
    // Agent statuses
    'stagiaire',
    'contractuel',
    'titulaire',
    'fonctionnaire',
    'agent de droit public',
    'agent de droit privé',
    // Recruitment
    'recrutement',
    'concours',
    'test',
    'sélection',
    'contrat',
    'durée du contrat',
    'reconduction',
    // Specific distinctions (CRITICAL)
    'longue maladie titulaire',
    'grave maladie contractuel',
  ];

  const lowerContent = content.toLowerCase();
  const lowerTitle = title.toLowerCase();
  
  terms.forEach((term) => {
    if (lowerContent.includes(term) || lowerTitle.includes(term)) {
      keywords.add(term);
    }
  });

  // Extract durations/periods
  const durationMatches = content.match(/(\d+\s*(?:jours?|semaines?|mois|années?|ans))/gi);
  if (durationMatches) {
    durationMatches.slice(0, 3).forEach((m) => {
      keywords.add(m.trim());
    });
  }

  // Add critical rules as keywords for searchability
  const criticalRules = extractCriticalRules(content, title);
  criticalRules.forEach((rule) => {
    keywords.add(rule);
  });

  return Array.from(keywords).slice(0, 20); // Increased limit to 20 keywords
}

/**
 * Extract category from filename
 */
function extractCategory(filename) {
  const match = filename.match(/bip_fiches_rag_([^_]+(?:_[^_]+)*)_\d{8}/);
  if (match) {
    return match[1]
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim();
  }
  return 'Général';
}

/**
 * Extract code from content (common patterns in BIP fiches)
 */
function extractFicheCode(content, title = '') {
  // Look for common BIP fiche code patterns
  const codePatterns = [
    /(?:NTICO\d+)/,
    /(?:CONSTA)/,
    /(?:CONSOFA)/,
    /(?:COEPTE)/,
    /(?:AUABSY)/,
    /(?:FC\d+)/,
    /(?:AG\d+)/,
  ];

  for (const pattern of codePatterns) {
    const match = content.match(pattern);
    if (match) return match[0];
    const titleMatch = title.match(pattern);
    if (titleMatch) return titleMatch[0];
  }

  // If no code found, generate one from title
  return `AUTO_${title.substring(0, 20).toUpperCase().replace(/[^A-Z]/g, '')}`;
}

/**
 * Generate index from JSONL files
 */
async function generateIndex() {
  const bipOutputDir = path.join(__dirname, '..', 'src', 'data', 'bip-output');
  const jsonlFiles = fs
    .readdirSync(bipOutputDir)
    .filter((f) => f.endsWith('.jsonl'));

  console.log(`📂 Found ${jsonlFiles.length} JSONL files`);

  const allFiches = [];
  const categories = new Set();

  for (const file of jsonlFiles) {
    const filePath = path.join(bipOutputDir, file);
    console.log(`\n📄 Processing: ${file}`);

    const records = await parseJsonL(filePath);
    console.log(`   → ${records.length} records found`);

    const category = extractCategory(file);
    categories.add(category);

    for (const record of records) {
      const code = extractFicheCode(record.content || '', record.title || '');
      const keywords = extractKeywords(record.content || '', record.title || '');
      const applicableTo = extractApplicableStatuses(record.content || '', record.title || '');
      const criticalRules = extractCriticalRules(record.content || '', record.title || '');

      allFiches.push({
        code,
        titre: record.title || 'Sans titre',
        categorie: category,
        motsCles: keywords,
        applicableTo,
        criticalRules,
        url: record.url || '',
        source: record.source || 'bip.cig929394.fr',
        timestamp: record.timestamp || new Date().toISOString(),
      });
    }
  }

  console.log(`\n✨ Total fiches extracted: ${allFiches.length}`);
  console.log(`📑 Categories found: ${Array.from(categories).join(', ')}`);

  // Build index in TypeScript format
  const tsContent = generateTypeScriptIndex(allFiches, categories);
  const tsPath = path.join(__dirname, '..', 'src', 'data', 'bip-index.ts');
  fs.writeFileSync(tsPath, tsContent);
  console.log(`\n✓ Created: ${path.relative(process.cwd(), tsPath)}`);

  // Build index in JSON format
  const jsonIndex = {
    metadata: {
      version: '1.0',
      generated: new Date().toISOString(),
      totalFiches: allFiches.length,
      categories: Array.from(categories),
    },
    index: allFiches,
  };
  const jsonPath = path.join(__dirname, '..', 'src', 'data', 'bip-index.json');
  fs.writeFileSync(jsonPath, JSON.stringify(jsonIndex, null, 2));
  console.log(`✓ Created: ${path.relative(process.cwd(), jsonPath)}`);

  // Generate category index
  const categoryIndex = {};
  for (const category of categories) {
    categoryIndex[category] = allFiches.filter((f) => f.categorie === category).map((f) => ({
      code: f.code,
      titre: f.titre,
    }));
  }

  console.log('\n📊 Index Summary:');
  for (const [cat, fiches] of Object.entries(categoryIndex)) {
    console.log(`   ${cat}: ${fiches.length} fiches`);
  }
}

/**
 * Generate TypeScript index file
 */
function generateTypeScriptIndex(fiches, categories) {
  const ficheLines = fiches.map((f) => ({
    code: f.code,
    titre: f.titre,
    categorie: f.categorie,
    motsCles: f.motsCles,
    applicableTo: f.applicableTo,
    criticalRules: f.criticalRules,
    url: f.url,
  }));

  const code = `// Auto-generated BIP Fiche Index - ENRICHED
// Generated: ${new Date().toISOString()}
// Total fiches: ${fiches.length}
// VERSION 2.0 - With agent status and critical rules metadata

export interface FicheIndexEntry {
  code: string;
  titre: string;
  categorie: string;
  motsCles: string[];
  applicableTo: string[];
  criticalRules: string[];
  url: string;
}

export const ficheIndex: FicheIndexEntry[] = ${JSON.stringify(ficheLines, null, 2)};

export const categories = ${JSON.stringify(Array.from(categories), null, 2)};

export function searchByCode(code: string): FicheIndexEntry | undefined {
  return ficheIndex.find((f) => f.code.toLowerCase() === code.toLowerCase());
}

export function searchByCategory(category: string): FicheIndexEntry[] {
  return ficheIndex.filter((f) => f.categorie === category);
}

export function searchByKeywords(keywords: string[]): FicheIndexEntry[] {
  return ficheIndex.filter((fiche) =>
    keywords.some((kw) =>
      fiche.motsCles.some((mk) => mk.toLowerCase().includes(kw.toLowerCase()))
    )
  );
}

export function searchByStatus(status: string): FicheIndexEntry[] {
  return ficheIndex.filter((fiche) => fiche.applicableTo.includes(status));
}

export function searchByRule(rule: string): FicheIndexEntry[] {
  return ficheIndex.filter((fiche) => fiche.criticalRules.includes(rule));
}

export function searchByKeywordsAndStatus(keywords: string[], status: string): FicheIndexEntry[] {
  return ficheIndex.filter((fiche) => {
    const hasKeyword = keywords.some((kw) =>
      fiche.motsCles.some((mk) => mk.toLowerCase().includes(kw.toLowerCase()))
    );
    const isApplicable = fiche.applicableTo.includes(status) || fiche.applicableTo.includes('general');
    return hasKeyword && isApplicable;
  });
}

export function getCategoryIndex(): Record<string, Array<{ code: string; titre: string }>> {
  const index: Record<string, Array<{ code: string; titre: string }>> = {};
  
  for (const category of categories) {
    index[category] = ficheIndex
      .filter((f) => f.categorie === category)
      .map((f) => ({ code: f.code, titre: f.titre }));
  }
  
  return index;
}

/**
 * Filter fiches by agent status with intelligent rules
 * Used for domain 4 (BIP) to provide status-appropriate responses
 */
export function filterByAgentStatus(fiches: FicheIndexEntry[], agentStatus: 'titulaire' | 'contractuel' | 'stagiaire' | 'all' = 'all'): FicheIndexEntry[] {
  if (agentStatus === 'all') return fiches;
  
  return fiches.filter((fiche) => {
    // Direct match on applicableTo
    if (fiche.applicableTo.includes(agentStatus)) return true;
    
    // 'general' applies to everyone
    if (fiche.applicableTo.includes('general')) return true;
    
    // Apply critical rules for nuance
    if (agentStatus === 'contractuel') {
      // Contractuals should NOT see titulaire-only rules
      if (fiche.criticalRules.includes('longue_maladie_titulaire')) return false;
      if (fiche.criticalRules.includes('longue_maladie_not_for_contractuel')) return false;
    }
    if (agentStatus === 'titulaire') {
      // Titulaires should NOT see contractuel-only rules  
      if (fiche.criticalRules.includes('grave_maladie_contractuel')) return false;
    }
    
    return false;
  });
}
`;

  return code;
}

// Run the script
generateIndex().catch((err) => {
  console.error('❌ Error generating index:', err);
  process.exit(1);
});

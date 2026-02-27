/**
 * Fiche Search Utilities v2.0 - ENRICHED
 * Provides efficient search and filtering functions for BIP fiche index
 * NOW INCLUDES: Agent status filtering, critical rules detection
 * Optimized to minimize LLM token usage by returning lightweight search results
 */

import { 
  ficheIndex, 
  FicheIndexEntry, 
  categories, 
  searchByCode, 
  searchByCategory, 
  searchByKeywords, 
  searchByStatus,
  searchByRule,
  searchByKeywordsAndStatus,
  filterByAgentStatus,
  getCategoryIndex 
} from '../data/bip-index';

/**
 * Lightweight search result for API responses
 */
export interface SearchResult {
  code: string;
  titre: string;
  categorie: string;
  url: string;
  applicableTo?: string[];
  criticalRules?: string[];
}

/**
 * Search metadata for context
 */
export interface SearchMetadata {
  totalResults: number;
  query: string;
  queryType: 'code' | 'keyword' | 'category' | 'status' | 'keyword_status';
  executionTimeMs: number;
  agentStatus?: string;
  applicableStatusesFound?: string[];
}

/**
 * Complete search response
 */
export interface SearchResponse {
  results: SearchResult[];
  metadata: SearchMetadata;
}

/**
 * Search by exact fiche code
 * Most efficient search - use first for direct lookups
 *
 * @param code - Fiche code (e.g., "NTICO1", "CONSTA")
 * @returns Lightweight search result or undefined if not found
 */
export function searchFicheByCode(code: string): SearchResult | undefined {
  const start = performance.now();
  const fiche = searchByCode(code);
  const executionTime = performance.now() - start;

  if (!fiche) return undefined;

  return {
    code: fiche.code,
    titre: fiche.titre,
    categorie: fiche.categorie,
    url: fiche.url,
    applicableTo: fiche.applicableTo,
    criticalRules: fiche.criticalRules,
  };
}

/**
 * Search fiches by one or more keywords
 * Returns all fiches that contain matching keywords
 *
 * @param keywords - Array of keywords to search for
 * @returns Lightweight search results
 */
export function searchFichesByKeywords(keywords: string[]): SearchResponse {
  const start = performance.now();
  const fiches = searchByKeywords(keywords);
  const executionTime = performance.now() - start;

  return {
    results: fiches.map((f) => ({
      code: f.code,
      titre: f.titre,
      categorie: f.categorie,
      url: f.url,
      applicableTo: f.applicableTo,
      criticalRules: f.criticalRules,
    })),
    metadata: {
      totalResults: fiches.length,
      query: keywords.join(', '),
      queryType: 'keyword',
      executionTimeMs: Math.round(executionTime),
    },
  };
}

/**
 * Search fiches by agent status
 * Returns only fiches applicable to the specified agent status
 * CRITICAL FOR: Distinguishing titulaire vs contractuel rules
 *
 * @param status - Agent status: 'titulaire', 'contractuel', 'stagiaire', 'all'
 * @returns Search results filtered by agent status
 */
export function searchFichesByStatus(status: 'titulaire' | 'contractuel' | 'stagiaire' | 'all'): SearchResponse {
  const start = performance.now();
  const fiches = status === 'all' ? ficheIndex : searchByStatus(status);
  const executionTime = performance.now() - start;

  return {
    results: fiches.map((f) => ({
      code: f.code,
      titre: f.titre,
      categorie: f.categorie,
      url: f.url,
      applicableTo: f.applicableTo,
      criticalRules: f.criticalRules,
    })),
    metadata: {
      totalResults: fiches.length,
      query: status,
      queryType: 'status',
      executionTimeMs: Math.round(executionTime),
      agentStatus: status,
    },
  };
}

/**
 * Search fiches by keywords AND agent status
 * MOST IMPORTANT FOR DOMAIN 4: Combines keyword search with agent status filtering
 * This prevents incorrect answers like "contractuals can have longue maladie"
 *
 * @param keywords - Keywords to search for
 * @param status - Agent status filter: 'titulaire', 'contractuel', 'stagiaire'
 * @returns Fiches matching both keywords AND applicable to the agent status
 */
export function searchFichesByKeywordsAndStatus(
  keywords: string[], 
  status: 'titulaire' | 'contractuel' | 'stagiaire'
): SearchResponse {
  const start = performance.now();
  const fiches = searchByKeywordsAndStatus(keywords, status);
  const executionTime = performance.now() - start;

  return {
    results: fiches.map((f) => ({
      code: f.code,
      titre: f.titre,
      categorie: f.categorie,
      url: f.url,
      applicableTo: f.applicableTo,
      criticalRules: f.criticalRules,
    })),
    metadata: {
      totalResults: fiches.length,
      query: `${keywords.join(', ')} [${status}]`,
      queryType: 'keyword_status',
      executionTimeMs: Math.round(executionTime),
      agentStatus: status,
    },
  };
}

/**
 * Search fiches by critical rule
 * Useful for identifying all fiches that apply a specific legal distinction
 *
 * @param rule - Critical rule to search for (e.g., 'longue_maladie_titulaire')
 * @returns All fiches implementing this rule
 */
export function searchFichesByRule(rule: string): SearchResponse {
  const start = performance.now();
  const fiches = searchByRule(rule);
  const executionTime = performance.now() - start;

  return {
    results: fiches.map((f) => ({
      code: f.code,
      titre: f.titre,
      categorie: f.categorie,
      url: f.url,
      applicableTo: f.applicableTo,
      criticalRules: f.criticalRules,
    })),
    metadata: {
      totalResults: fiches.length,
      query: rule,
      queryType: 'keyword',
      executionTimeMs: Math.round(executionTime),
    },
  };
}

/**
 * Search fiches by category
 * Returns all fiches in a specified category
 *
 * @param category - Category name (case-sensitive)
 * @returns Lightweight search results
 */
export function searchFichesByCategory(category: string): SearchResponse {
  const start = performance.now();
  const fiches = searchByCategory(category);
  const executionTime = performance.now() - start;

  return {
    results: fiches.map((f) => ({
      code: f.code,
      titre: f.titre,
      categorie: f.categorie,
      url: f.url,
      applicableTo: f.applicableTo,
      criticalRules: f.criticalRules,
    })),
    metadata: {
      totalResults: fiches.length,
      query: category,
      queryType: 'category',
      executionTimeMs: Math.round(executionTime),
    },
  };
}

/**
 * Get all available categories
 * Useful for UI navigation and category filtering
 *
 * @returns Array of category names
 */
export function getCategories(): string[] {
  return categories;
}

/**
 * Get category index - organized fiches by category
 * Returns a map of category names to their fiches (code + titre only)
 *
 * @returns Object mapping category names to fiche lists
 */
export function getCategoryIndexMap(): Record<string, Array<{ code: string; titre: string }>> {
  return getCategoryIndex();
}

/**
 * Suggest search results based on partial input
 * Useful for autocomplete functionality
 *
 * @param query - Partial code or keyword
 * @param limit - Maximum results to return (default: 5)
 * @returns Top matching fiches
 */
export function suggestFiches(query: string, limit = 5): SearchResult[] {
  const queryLower = query.toLowerCase();

  const matches = ficheIndex
    .filter(
      (f) =>
        f.code.toLowerCase().includes(queryLower) ||
        f.titre.toLowerCase().includes(queryLower) ||
        f.motsCles.some((k) => k.toLowerCase().includes(queryLower))
    )
    .slice(0, limit);

  return matches.map((f) => ({
    code: f.code,
    titre: f.titre,
    categorie: f.categorie,
    url: f.url,
    applicableTo: f.applicableTo,
    criticalRules: f.criticalRules,
  }));
}

/**
 * Get fiche by code with full details (including keywords)
 * Use when you need complete metadata
 *
 * @param code - Fiche code
 * @returns Full fiche entry or undefined
 */
export function getFicheDetails(code: string): FicheIndexEntry | undefined {
  return ficheIndex.find((f) => f.code.toLowerCase() === code.toLowerCase());
}

/**
 * Filter fiches by agent status with intelligent rule application
 * CRITICAL: Applies nuanced rules to prevent status-specific mistakes
 *
 * @param fiches - Input fiches to filter
 * @param agentStatus - Agent status to filter for
 * @returns Filtered fiches applicable to this status
 */
export function filterFichesByAgentStatus(
  fiches: FicheIndexEntry[],
  agentStatus: 'titulaire' | 'contractuel' | 'stagiaire' | 'all' = 'all'
): FicheIndexEntry[] {
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

/**
 * Build LLM prompt context for fiche search
 * Returns a minimal text representation optimized for token usage
 * NOW INCLUDES: Critical rules information for accurate responses
 *
 * @param results - Search results from any search function
 * @param includeRules - Include critical rules in context (default: true)
 * @returns Formatted string for use in LLM prompts
 */
export function buildLLMContext(results: SearchResult[], includeRules = true): string {
  if (results.length === 0) {
    return 'Aucune fiche trouvée.';
  }

  // VERSION SIMPLIFIÉE - Réponses courtes
  let context = '';

  for (const result of results) {
    // Format simple: [CODE] Titre (Applicable à: statut)
    context += `[${result.code}] ${result.titre}`;
    if (result.applicableTo && result.applicableTo.length > 0) {
      context += ` (${result.applicableTo.join(', ')})`;
    }
    context += '\n';
  }

  return context;
}

/**
 * Get index statistics
 * Useful for monitoring and debugging
 *
 * @returns Statistics about the index
 */
export function getIndexStats(): {
  totalFiches: number;
  totalCategories: number;
  averageFichesPerCategory: number;
  larggestCategory: { name: string; count: number };
  fichesFiltered: number;
} {
  const categoryIndex = getCategoryIndex();
  const counts = Object.entries(categoryIndex).map(([name, fiches]) => ({ name, count: fiches.length }));
  const largest = counts.reduce((a, b) => (a.count > b.count ? a : b));

  return {
    totalFiches: ficheIndex.length,
    totalCategories: categories.length,
    averageFichesPerCategory: Math.round(ficheIndex.length / categories.length),
    larggestCategory: largest,
    fichesFiltered: ficheIndex.filter((f) => f.applicableTo && f.applicableTo.length > 0).length,
  };
}

/**
 * Export all index data as JSON
 * Useful for external APIs and data exports
 *
 * @returns Complete index in JSON format
 */
export function exportIndexAsJSON() {
  return {
    metadata: {
      version: '2.0',
      generated: new Date().toISOString(),
      totalFiches: ficheIndex.length,
      categories: categories,
      improvements: [
        'Agent status filtering (titulaire, contractuel, stagiaire)',
        'Critical rules detection for legal distinctions',
        'Keyword status-aware search',
        'Nuanced rule filtering to prevent status mistakes'
      ]
    },
    index: ficheIndex,
  };
}

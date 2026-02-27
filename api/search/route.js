/**
 * API Route: BIP Fiche Index Search
 * Serverless function for searching the BIP fiche index
 * Optimized for minimal token usage in LLM calls
 */

import fs from 'fs';
import path from 'path';

// Load the JSON index (pre-built during build time)
let indexData = null;

function loadIndex() {
  if (indexData) return indexData;

  try {
    const indexPath = path.join(process.cwd(), 'src', 'data', 'bip-index.json');
    const rawData = fs.readFileSync(indexPath, 'utf-8');
    indexData = JSON.parse(rawData);
    return indexData;
  } catch (error) {
    console.error('Failed to load BIP index:', error);
    throw new Error('BIP index not available');
  }
}

/**
 * Search for fiches by code
 */
function searchByCode(code, index) {
  const fiche = index.index.find((f) => f.code.toLowerCase() === code.toLowerCase());

  if (!fiche) return null;

  return {
    code: fiche.code,
    titre: fiche.titre,
    categorie: fiche.categorie,
    url: fiche.url,
  };
}

/**
 * Search for fiches by keywords
 */
function searchByKeywords(keywords, index) {
  const keywordsLower = keywords.map((k) => k.toLowerCase());

  const results = index.index
    .filter((fiche) =>
      keywordsLower.some((kw) =>
        fiche.motsCles.some((mk) => mk.toLowerCase().includes(kw))
      )
    )
    .map((f) => ({
      code: f.code,
      titre: f.titre,
      categorie: f.categorie,
      url: f.url,
    }))
    .slice(0, 20); // Limit to 20 results

  return results;
}

/**
 * Search for fiches by category
 */
function searchByCategory(category, index) {
  const results = index.index
    .filter((f) => f.categorie === category)
    .map((f) => ({
      code: f.code,
      titre: f.titre,
      categorie: f.categorie,
      url: f.url,
    }));

  return results;
}

/**
 * Get categories list
 */
function getCategories(index) {
  return index.metadata.categories;
}

/**
 * Build formatted text for LLM context
 */
function buildLLMContext(results) {
  if (!results || results.length === 0) {
    return 'Aucune fiche trouvée.';
  }

  let context = `${results.length} fiche(s) trouvée(s):\n\n`;

  for (const result of results) {
    context += `[${result.code}] ${result.titre}\n`;
    context += `  Catégorie: ${result.categorie}\n`;
    context += `  URL: ${result.url}\n\n`;
  }

  return context;
}

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const index = loadIndex();

    // Route: /api/search/code
    if (req.url.includes('/search/code')) {
      const { code, includeLLMContext } = req.query;

      if (!code) {
        return res.status(400).json({ error: 'Parameter "code" is required' });
      }

      const result = searchByCode(code, index);

      if (!result) {
        return res.status(404).json({ error: 'Fiche not found' });
      }

      const response = { result };

      if (includeLLMContext === 'true') {
        response.llmContext = buildLLMContext([result]);
      }

      return res.status(200).json(response);
    }

    // Route: /api/search/keywords
    if (req.url.includes('/search/keywords')) {
      const { keywords, includeLLMContext } = req.query;

      if (!keywords) {
        return res.status(400).json({ error: 'Parameter "keywords" is required (comma-separated)' });
      }

      const keywordArray = keywords.split(',').map((k) => k.trim());
      const results = searchByKeywords(keywordArray, index);

      const response = {
        results,
        metadata: {
          query: keywords,
          totalResults: results.length,
        },
      };

      if (includeLLMContext === 'true') {
        response.llmContext = buildLLMContext(results);
      }

      return res.status(200).json(response);
    }

    // Route: /api/search/category
    if (req.url.includes('/search/category')) {
      const { category } = req.query;

      if (!category) {
        return res.status(400).json({ error: 'Parameter "category" is required' });
      }

      const results = searchByCategory(category, index);

      return res.status(200).json({
        results,
        metadata: {
          query: category,
          totalResults: results.length,
        },
      });
    }

    // Route: /api/search/categories
    if (req.url.includes('/search/categories')) {
      const categories = getCategories(index);

      return res.status(200).json({
        categories,
        metadata: {
          totalCategories: categories.length,
          totalFiches: index.index.length,
        },
      });
    }

    // Route: /api/search/index (full index export)
    if (req.url.includes('/search/index')) {
      const { minimal } = req.query;

      if (minimal === 'true') {
        // Return lightweight version
        return res.status(200).json({
          metadata: index.metadata,
          index: index.index.map((f) => ({
            code: f.code,
            titre: f.titre,
            categorie: f.categorie,
          })),
        });
      }

      // Return full index
      return res.status(200).json(index);
    }

    // Default route: API info
    return res.status(200).json({
      name: 'BIP Fiche Index Search API',
      version: '1.0',
      endpoints: {
        '/api/search/code?code=CODE': 'Search by fiche code',
        '/api/search/keywords?keywords=KEYWORD1,KEYWORD2': 'Search by keywords',
        '/api/search/category?category=CATEGORY': 'Search by category',
        '/api/search/categories': 'List all categories',
        '/api/search/index': 'Get full index (add ?minimal=true for lightweight version)',
      },
      metadata: {
        totalFiches: index.index.length,
        totalCategories: index.metadata.categories.length,
        generated: index.metadata.generated,
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
}

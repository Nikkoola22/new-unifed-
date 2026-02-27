#!/usr/bin/env node

/**
 * 🚀 Serveur de Proxy API Local
 * Fichier: server.js (à la racine)
 * 
 * Démarre un serveur Express qui proxifie les appels API
 * - Perplexity API (/api/perplexity)
 * - RSS feeds (/api/rss)
 * 
 * Usage:
 *   node server.js
 * 
 * Port: 3001 (configurable via PROXY_PORT)
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Charge .env

const app = express();
const PORT = process.env.PROXY_PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
  ],
  credentials: true,
}));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`\n📍 ${req.method} ${req.path}`);
  next();
});

// ====================
// Route: /perplexity
// ====================
app.post('/perplexity', async (req, res) => {
  try {
    const { messages, model = 'sonar-pro' } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: 'Le paramètre "messages" est requis et doit être un tableau.',
      });
    }

    // Récupère la clé API côté serveur (SÉCURISÉ)
    const apiKey = process.env.VITE_API_KEY || process.env.PERPLEXITY_API_KEY;

    if (!apiKey) {
      console.error(
        '❌ ERREUR: Clé API Perplexity non configurée\n' +
        'Configurez VITE_API_KEY dans le fichier .env\n' +
        'Exemple: VITE_API_KEY=ppl_xxxxxxxxxxxxx'
      );
      return res.status(500).json({
        error: 'Clé API non configurée',
        help: 'Créez un fichier .env avec VITE_API_KEY=votre_clé',
      });
    }

    console.log(`  🔄 Forward vers Perplexity: ${messages.length} messages, modèle: ${model}`);

    // Appel à Perplexity API
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
      }),
    });

    // Gestion des erreurs Perplexity
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`  ❌ Erreur Perplexity (${response.status}):`, errorText.substring(0, 200));

      return res.status(response.status).json({
        error: `Erreur Perplexity: ${response.status}`,
        details: errorText.substring(0, 500),
      });
    }

    // Succès
    const data = await response.json();
    console.log(`  ✅ Réponse reçue - Tokens: ${data.usage?.total_tokens || '?'}`);

    return res.status(200).json(data);

  } catch (error) {
    console.error('  ❌ Erreur serveur:', error.message);
    return res.status(500).json({
      error: 'Erreur serveur',
      message: error.message,
    });
  }
});

// ====================
// Route: /rss
// ====================
app.get('/rss', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: 'Le paramètre "url" est requis.' });
    }

    // Valider que c'est bien une URL
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: 'URL invalide.' });
    }

    console.log(`  🔄 Chargement du flux: ${url.substring(0, 50)}...`);

    // Charger le flux RSS
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      console.error(`  ❌ Erreur RSS (${response.status}): ${url}`);
      return res.status(response.status).json({
        error: `Erreur lors du chargement du flux (${response.status})`,
      });
    }

    const xml = await response.text();

    console.log(`  ✅ Flux chargé (${xml.length} bytes)`);

    // Retourner le XML avec les bons headers
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    return res.status(200).send(xml);

  } catch (error) {
    console.error('  ❌ Erreur serveur:', error.message);
    return res.status(500).json({
      error: 'Erreur serveur',
      message: error.message,
    });
  }
});

// ====================
// Health check
// ====================
app.get('/health', (req, res) => {
  const hasApiKey = !!(process.env.VITE_API_KEY || process.env.PERPLEXITY_API_KEY);
  res.json({
    status: 'OK',
    apiKeyConfigured: hasApiKey ? '✅' : '❌',
  });
});

// ====================
// 404 Handler
// ====================
app.use((req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    path: req.path,
    availableRoutes: ['/perplexity', '/rss', '/health'],
  });
});

// ====================
// Démarrage
// ====================
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║    🚀 SERVEUR PROXY API LOCAL DÉMARRÉ  ║
╠════════════════════════════════════════╣
║ Port: ${PORT}                                ║
║ URL: http://localhost:${PORT}          ║
║                                        ║
║ Routes:                                ║
║ - POST /perplexity   (API Perplexity)  ║
║ - GET  /rss          (Flux RSS)        ║
║ - GET  /health       (Santé serveur)   ║
╚════════════════════════════════════════╝

✨ Vite dev server doit pointer vers: http://localhost:${PORT}
  (voir la config dans vite.config.ts)

⚠️  Configuration requise:
  - Fichier .env avec VITE_API_KEY=votre_clé_perplexity
  - npm install express cors dotenv (dépendances du serveur)

  `);
  
  // Vérifier la configuration
  const hasApiKey = !!(process.env.VITE_API_KEY || process.env.PERPLEXITY_API_KEY);
  if (!hasApiKey) {
    console.log('🔴 ATTENTION: Clé API non configurée. Les requêtes Perplexity échoueront.');
    console.log('   Créez un fichier .env avec: VITE_API_KEY=ppl_xxxxxxxxxxxxx\n');
  } else {
    console.log('✅ Clé API configurée correctement\n');
  }
});

// Gestion des signaux pour un arrêt propre
process.on('SIGINT', () => {
  console.log('\n\n👋 Serveur arrêté gracieusement');
  process.exit(0);
});

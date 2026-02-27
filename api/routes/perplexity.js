/**
 * API Proxy pour Perplexity
 * Fichier: /api/routes/perplexity.js
 * 
 * Route locale: /api/perplexity
 * Fonction: Proxifier les requêtes du frontend vers Perplexity
 * Sécurité: Garde la clé API côté serveur
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée. Utilisez POST.' });
  }

  try {
    const { messages, model = 'sonar-pro' } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Le paramètre "messages" est requis et doit être un tableau.' });
    }

    // Récupère la clé API côté serveur (JAMAIS du frontend)
    const apiKey = process.env.VITE_API_KEY || process.env.PERPLEXITY_API_KEY;

    if (!apiKey) {
      console.error('❌ ERREUR: Clé API Perplexity non configurée');
      return res.status(500).json({ 
        error: 'Clé API non configurée. Configurez VITE_API_KEY ou PERPLEXITY_API_KEY en variables d\'environnement.' 
      });
    }

    console.log(`🔄 Proxy Perplexity: Forward requête avec ${messages.length} messages, modèle: ${model}`);

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
      console.error(`❌ Erreur Perplexity (${response.status}):`, errorText.substring(0, 500));
      
      return res.status(response.status).json({
        error: `Erreur Perplexity: ${response.status}`,
        details: errorText,
      });
    }

    // Succès - retourner la réponse
    const data = await response.json();
    console.log(`✅ Réponse Perplexity reçue - Tokens: ${data.usage?.total_tokens || '?'}`);

    return res.status(200).json(data);

  } catch (error) {
    console.error('❌ Erreur serveur dans le proxy Perplexity:', error.message);
    return res.status(500).json({
      error: 'Erreur serveur',
      message: error.message,
    });
  }
}

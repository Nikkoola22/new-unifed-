/**
 * RSS Proxy
 * Fichier: /api/routes/rss.js
 * 
 * Route locale: /api/rss?url=...
 * Fonction: Charger et proxifier les flux RSS/XML
 * Avantage: Évite corsproxy.io et les CORS issues
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée. Utilisez GET.' });
  }

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

    console.log(`🔄 RSS Proxy: Chargement du flux depuis ${url.substring(0, 50)}...`);

    // Charger le flux RSS
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      console.error(`❌ Erreur RSS (${response.status}): ${url}`);
      return res.status(response.status).json({
        error: `Erreur lors du chargement du flux (${response.status})`,
      });
    }

    const xml = await response.text();
    
    console.log(`✅ Flux RSS chargé avec succès (${xml.length} bytes)`);

    // Retourner le XML avec les bons headers
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    return res.status(200).send(xml);

  } catch (error) {
    console.error('❌ Erreur serveur dans RSS proxy:', error.message);
    return res.status(500).json({
      error: 'Erreur serveur',
      message: error.message,
    });
  }
}

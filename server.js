import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger .env.local avec chemin absolu
const envPath = resolve(__dirname, '.env.local');
console.log('📂 Chargement env depuis:', envPath);
dotenv.config({ path: envPath });

const app = express();
app.use(express.json());

// Lire la clé une fois au démarrage
const API_KEY = process.env.PERPLEXITY_API_KEY;
console.log('🔑 Clé API:', API_KEY ? `${API_KEY.substring(0, 10)}...${API_KEY.substring(API_KEY.length - 5)}` : 'NON TROUVÉE');

// Endpoint pour l'API Perplexity
app.post('/api/completions', async (req, res) => {
  try {
    const apiKey = API_KEY;
    
    if (!apiKey) {
      console.error('❌ PERPLEXITY_API_KEY non définie dans .env');
      return res.status(500).json({ error: 'API key not configured' });
    }

    console.log('📤 Appel API Perplexity...');
    
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('❌ Erreur API Perplexity:', response.status, text);
      return res.status(response.status).send(text);
    }

    const data = await response.json();
    console.log('✅ Réponse API reçue');
    res.json(data);

  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Serveur API lancé sur http://localhost:${PORT}`);
  console.log(`   PERPLEXITY_API_KEY: ${API_KEY ? '✅ Configurée' : '❌ Manquante'}`);
});

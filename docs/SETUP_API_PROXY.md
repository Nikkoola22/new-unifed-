# 🔧 GUIDE DE CONFIGURATION - SYSTÈME API & PROXY

**Status**: ✅ Système en place et fonctionnel  
**Date**: 27 février 2026

---

## 🎯 Problème Résolu

### Erreurs AVANT (v1.0)
```
❌ [Error] Origin http://localhost:5173 is not allowed by Access-Control-Allow-Origin
❌ [Error] Failed to load resource: the server responded with a status of 403
❌ [Error] Fetch API cannot load https://api.perplexity.ai/chat/completions due to access control checks
❌ [Error] Failed to load RSS feed, using fallback data
```

**Causes**:
1. **Appels directs à Perplexity API du frontend** - CORS bloqués
2. **Clé API exposée au frontend** - Sécurité compromise
3. **Proxy tiers (corsproxy.io)** - Rate limited et instable
4. **Pas de serveur backend** - Pas de gestion centralisée des appels API

### Solutions APRÈS (v2.0)
✅ **Proxy backend local** - Express serveur qui gatekeep les API  
✅ **Sécurité améliorée** - Clé API gardée côté serveur  
✅ **CORS gérés** - Serveur configure les headers CORS  
✅ **RSS proxy interne** - Plus besoin de corsproxy.io  
✅ **Gestion d'erreurs** - Logging et messages d'erreur clairs  

---

## 📋 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    BROWSER (Frontend)                       │
│  A. Vite dev server (http://localhost:5173)               │
│  B. React App (App.tsx)                                   │
└──────────────────┬──────────────────────────────────────────┘
                   │ fetch(/api/perplexity, /api/rss)
                   ↓
┌─────────────────────────────────────────────────────────────┐
│              VITE PROXY (vite.config.ts)                   │
│  Redirige /api/* → http://localhost:3001                 │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────────┐
│            🚀 EXPRESS PROXY SERVER (server.js)             │
│  - Port 3001                                              │
│  - POST /perplexity → Perplexity API (avec Auth)         │
│  - GET  /rss        → Flux RSS (sans CORS issues)        │
│  - GET  /health     → Vérifier la configuration          │
└──────────────────┬──────────────────────────────────────────┘
                   │
    ┌──────────────┼──────────────────┐
    ↓              ↓                   ↓
[Perplexity]  [Remote RSS] [Monitoring]
 (Chat API)    (Flux Info)
```

---

## 🚀 INSTALLATION & CONFIGURATION

### Étape 1: Cloner ou télécharger

```bash
cd /Users/nikkoolagarnier/Downloads/ATLAS-master
```

### Étape 2: Créer le fichier `.env`

```bash
# Copier le fichier exemple
cp .env.example .env

# Éditer .env et ajouter votre clé API
nano .env
# ou
code .env
```

**Contenu de .env** (EXEMPLE):
```env
# ⚠️ Remplacez par votre véritable clé API
VITE_API_KEY=ppl_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
PROXY_PORT=3001
```

**⚠️ IMPORTANT**: 
- 🔴 **NE JAMAIS commiter .env en production**
- 🟢 .env.example est versionné (c'est le template)
- 🔑 La clé API doit être confidentielle

### Étape 3: Installer les dépendances

```bash
npm install
```

Ce qui installe:
- `express` - Serveur web
- `cors` - Gestion des CORS headers
- `dotenv` - Gestion des variables d'environnement
- `vite`, `react`, ... (déjà présent)

### Étape 4: Vérifier la configuration

```bash
# Démarrer juste le serveur proxy (test)
node server.js
```

**Sortie attendue**:
```
╔════════════════════════════════════════╗
║    🚀 SERVEUR PROXY API LOCAL DÉMARRÉ  ║
╠════════════════════════════════════════╣
║ Port: 3001                             ║
║ URL: http://localhost:3001             ║
║                                        ║
║ Routes:                                ║
║ - POST /perplexity   (API Perplexity)  ║
║ - GET  /rss          (Flux RSS)        ║
║ - GET  /health       (Santé serveur)   ║
╚════════════════════════════════════════╝

✅ Clé API configurée correctement
```

### Étape 5: Démarrer en développement

**Option A: Démarrer tout automatiquement** (RECOMMANDÉ)
```bash
npm run dev
# Lance à la fois:
# - Express serveur (port 3001)
# - Vite dev server (port 5173)
```

**Option B: Démarrer manuellement (2 terminaux)**
```bash
# Terminal 1: Serveur proxy
npm run dev:server
# Attend: Port 3001, Clé API configurée

# Terminal 2: Vite dev
npm run dev:vite
# Attend: Local: http://localhost:5173
```

### Étape 6: Vérifier que tout fonctionne

Visitez: **http://localhost:5173**

**Checklist**:
- ✅ Page se charge sans erreur CORS
- ✅ Boutons de domaine accessibles
- ✅ Chat fonctionne (tester avec "Domaine 4: Fiches BIP")
- ✅ Console (F12) ne montre pas d'erreurs 403/401

**Test la route API directement**:
```bash
# Tester le health check du serveur
curl http://localhost:3001/health

# Réponse attendue:
{
  "status": "OK",
  "apiKeyConfigured": "✅"
}
```

---

## 🔄 FLUX D'UNE REQUÊTE

### Avant (problématique)
```
1. Frontend appelle: fetch("https://api.perplexity.ai/...")
2. CORS BLOCKED ❌ (site tiers ne le permet pas)
3. Erreur 403/401
4. Fallback à données locales (mauvaise UX)
```

### Après (sécurisé)
```
1. Frontend appelle: fetch("/api/perplexity", { messages: [...] })
2. Vite proxy redirige vers: http://localhost:3001/perplexity
3. Express serveur reçoit la requête
4. Express ajoute la clé API (depuis .env)
5. Express appelle: fetch("https://api.perplexity.ai/...", auth headers)
6. Perplexity répond
7. Express retourne la réponse au frontend
8. Frontend utilise la réponse ✅
```

---

## 🧪 TESTS & DEBUGGING

### Test 1: Vérifier le serveur proxy

```bash
# Santé du serveur
curl http://localhost:3001/health

# Attendu: {"status": "OK", "apiKeyConfigured": "✅"}
```

### Test 2: Tester Perplexity API directement

```bash
curl -X POST http://localhost:3001/perplexity \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Bonjour, conte moi une blague"}
    ],
    "model": "sonar-pro"
  }'

# Attendu: Response JSON with "choices[0].message.content"
```

### Test 3: Tester RSS proxy

```bash
curl "http://localhost:3001/rss?url=https://www.franceinfo.fr/politique.rss"

# Attendu: XML content (flux RSS)
```

### Voir les logs

**Serveur proxy** (Terminal):
```
📍 POST /perplexity
  🔄 Forward vers Perplexity: 3 messages, modèle: sonar-pro
  ✅ Réponse reçue - Tokens: 1,250
```

**Frontend** (F12 Console):
```
🔍 traiterQuestion appelé avec: { question: "...", selectedDomain: 4 }
📚 UTILISATION DE L'INDEX BIP AMÉLIORÉ pour le domaine 4
📍 Recherche filtrée: 7 mots-clés + statut contractuel = 102 fiches
```

---

## ⚠️ PROBLÈMES COURANTS

### Erreur: "Clé API non configurée"

**Symptôme**:
```
❌ ERREUR: Clé API Perplexity non configurée
Configurez VITE_API_KEY dans le fichier .env
```

**Solution**:
```bash
# 1. Vérifier que .env existe
ls -la .env

# 2. Vérifier qu'il contient la clé
cat .env | grep VITE_API_KEY

# 3. Si vide, la remplir:
echo "VITE_API_KEY=ppl_votre_clé_ici" >> .env

# 4. Redémarrer le serveur
npm run dev:server
```

### Erreur: "Cannot find module express"

**Symptôme**:
```
❌ Error: Cannot find module 'express'
```

**Solution**:
```bash
# Réinstaller les dépendances
npm install

# ou installer express spécifiquement
npm install express cors dotenv
```

### Erreur: "Port 3001 is already in use"

**Symptôme**:
```
❌ Error: listen EADDRINUSE :::3001
```

**Solution A** - Changer le port:
```bash
PROXY_PORT=3002 npm run dev:server
```

**Solution B** - Tuer le processus existant:
```bash
# Trouver le processus
lsof -i :3001

# Tuer le processus (macOS/Linux)
kill -9 <PID>

# Ou Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess | Stop-Process
```

### Erreur CORS: "Origin not allowed"

**Symptôme**:
```
❌ Access to XMLHttpRequest at 'http://localhost:3001/...' from origin
'http://localhost:3000' has been blocked by CORS policy
```

**Solution**: Vérifier que le frontend est sur le bon port (5173, pas 3000)
```bash
# Vite par défaut: http://localhost:5173
# Vérifier vite.config.ts server proxy target
```

### Erreur RSS: "Failed to load RSS"

**Symptôme**:
```
🟡 RSS Proxy: Erreur lors du chargement du flux (403)
```

**Solution**: 
- L'URL RSS peut être rate-limited
- Vérifier que l'URL est accessible directement: https://www.franceinfo.fr/politique.rss

---

## 📚 VARIABLES D'ENVIRONNEMENT

| Variable | Required | Default | Notes |
|----------|----------|---------|-------|
| `VITE_API_KEY` | ✅ OUI | - | Clé API Perplexity (ppl_...) |
| `PROXY_PORT` | ❌ Non | 3001 | Port du serveur proxy |
| `GITHUB_PAGES` | ❌ Non | false | Si hébergé sur GH Pages |

### Où les configurer?

**Développement local**: `.env` (à la racine)
```env
VITE_API_KEY=ppl_xxxxx
PROXY_PORT=3001
```

**Production (Vercel)**: Variables d'environnement du projet
```
Settings → Environment Variables → Add (VITE_API_KEY, PROXY_PORT)
```

**Production (autre)**: Fichier `.env` sur le serveur

---

## 🔐 SÉCURITÉ

### Bonnes pratiques

✅ **DO**:
- Garder .env hors du git
- Utiliser des clés d'API régulièrement rotées
- Configurer les CORS pour les domaines autorisés seulement
- Logger les erreurs sans exposer les secrets

❌ **DON'T**:
- Commiter .env en production
- Exposer la clé API au frontend
- Faire confiance à des proxies tiers (corsproxy.io)
- Partager la clé API en texte clair

### .gitignore

Vérifier que `.env` est dans `.gitignore`:
```bash
echo ".env" >> .gitignore
```

---

## 🚀 DÉPLOIEMENT

### Localhost (Développement)
```bash
npm run dev
# Démarre Vite + Express sur les ports 5173 & 3001
```

### Vercel (Production)

1. **Créer le fichier `/api/perplexity.js`** (route Vercel serverless)
```javascript
// Vercel détecte automatiquement /api/*.js
// Remplace notre server.js local
```

2. **Configurer les variables d'environnement**:
   - `VITE_API_KEY` = (votre clé Perplexity)

3. **Déployer**:
```bash
vercel deploy
```

---

## ✅ CHECKLIST

- [ ] Fichier `.env` créé avec `VITE_API_KEY=ppl_...`
- [ ] `npm install` exécuté avec succès
- [ ] `npm run dev:server` peut se lancer sans erreur
- [ ] `npm run dev` lance à la fois Vite et Express
- [ ] http://localhost:5173 accessible sans erreurs CORS
- [ ] Test Chat Domain 4 fonctionne
- [ ] Logs serveur montrent "✅ Réponse reçue"
- [ ] `.env` dans `.gitignore`
- [ ] Documentation partagée avec l'équipe

---

**Créé**: 27 février 2026  
**Statut**: Production Ready ✅  
**Support**: Voir notes de déploiement dans le code

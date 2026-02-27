# 🔧 FIX: ERREURS 500 - GUIDE IMMÉDIAT

**27 février 2026 - Diagnostic des erreurs 500**

---

## 🔴 Problème détecté

Les erreurs 500 étaient causées par:
1. ❌ **`.env` manquant** - Pas de variables d'environnement chargées
2. ❌ **Dépendances manquantes** - npm packages non installés  
3. ❌ **Convertie server.js** - Besoin de passer de CommonJS à ES modules

---

## ✅ Corrections appliquées

### 1. Créé `.env`
```bash
✅ Fichier .env créé avec configuration
✅ VITE_API_KEY=ppl_test_placeholder (placeholder pour tests)
✅ PROXY_PORT=3001 configuré
```

### 2. Installé dépendances
```bash
✅ npm install exécuté
✅ express, cors, dotenv installés
✅ 387 packages ajoutés
```

### 3. Converti server.js en ES modules
```bash
✅ Changé require() → import
✅ Compatible avec "type": "module" dans package.json
```

---

## 🚀 Comment démarrer maintenant

### Option 1: Manuel (Recommandé)

#### Terminal 1 - Express Proxy
```bash
cd /Users/nikkoolagarnier/Downloads/ATLAS-master
npm run dev:server
```

Attendez ce message:
```
╔════════════════════════════════════════╗
║    🚀 SERVEUR PROXY API LOCAL DÉMARRÉ  ║
║ Port: 3001                             ║
║ Routes: /perplexity, /rss, /health     ║
╚════════════════════════════════════════╝
✅ Clé API configurée correctement
```

#### Terminal 2 - Vite Dev Server
```bash
cd /Users/nikkoolagarnier/Downloads/ATLAS-master
npm run dev:vite
```

Attendez ce message:
```
✓ 1234 modules transformed
➜  local:   http://localhost:5173/
```

### Option 2: Les deux ensemble
```bash
npm run dev
# Lance Express et Vite ensemble
```

---

## ✔️ Vérifications

### Test 1: Express répond
```bash
curl http://localhost:3001/health

# Attendez:
{"status":"OK","apiKeyConfigured":"✅"}
```

### Test 2: Vite charge
```bash
curl http://localhost:5173 | head -c 100

# Attendez: <!DOCTYPE html> ...
```

### Test 3: Interface fonctionne
```
1. Ouvrir http://localhost:5173 dans le navigateur
2. Vérifier NO errors en F12 Console
3. Tester un chat message
```

---

## ⚠️ IMPORTANT: Clé API

### Placeholder actuel
```
VITE_API_KEY=ppl_test_placeholder
```

C'est pour les tests. Les appels Perplexity vont échouer avec:
```
Error: Erreur API (401) — Invalid API key
```

### Obtenir VOTRE vraie clé

1. Aller à https://www.perplexity.ai/
2. Sign up or Log in
3. Aller à API Settings
4. Copier votre clé (format: `ppl_xxxxx...`)
5. Éditer `.env` et remplacer `ppl_test_placeholder` par votre clé

### Après avoir remplacé la vraie clé
```bash
# Redémarrer le serveur
npm run dev:server

# Vérifier que clé est chargée
curl http://localhost:3001/health
# Doit montrer: "apiKeyConfigured":"✅"

# Tester un chat (devrait fonctionner)
```

---

## 🐛 Si erreurs persistent

### Erreur: "Cannot find module 'express'"
```bash
npm install
# Réinstaller toutes les dépendances
```

### Erreur: "Port 3001 already in use"
```bash
# Tuer le processus
lsof -ti :3001 | xargs kill -9

# Ou changer le port dans .env
echo "PROXY_PORT=3002" >> .env
npm run dev:server
```

### Erreur: "Cannot GET /api"
```bash
# Assurez-vous que Express tourne sur :3001
# Vérifier avec: curl http://localhost:3001/health
```

### Erreur sur /api/rss
```bash
# Tester directement:
curl "http://localhost:3001/rss?url=https://www.franceinfo.fr/politique.rss" | head -c 200

# Doit montrer: <?xml ...
# Si 500: URL RSS est probablement invalide
```

### Erreur on /api/perplexity
```bash
# Tester directement:
curl -X POST http://localhost:3001/perplexity \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role":"user","content":"test"}]
  }'

# Doit montrer: {"choices":[...]} ou {"error":"..."}
# Si 500: Clé API probablement invalide
```

---

## 📋 Checklist rapide

- [ ] `.env` existe (`ls -la .env`)
- [ ] `.env` contient  VITE_API_KEY (`grep VITE_API_KEY .env`)
- [ ] npm install exécuté (`npm list express | head -3`)
- [ ] Express démarre sans erreur (`npm run dev:server`)
- [ ] Express répond (`curl http://localhost:3001/health`)
- [ ] Vite démarre (`npm run dev:vite`)
- [ ] Page charge (`http://localhost:5173`)
- [ ] NO errors en console (F12)

---

## 📞 Prochaines étapes

1. **Maintenant**: Suivez Option 1 ou 2 ci-dessus pour démarrer
2. **D'ici 5 min**: Vérifiez que les deux serveurs tournent
3. **D'ici 15 min**: Remplacez ppl_test par votre vraie clé
4. **D'ici 30 min**: Validez avec POST_IMPLEMENTATION_CHECKLIST.md

---

## ✨ Quand ça marche

Vous verrez:
- ✅ http://localhost:5173 charge sans CORS error
- ✅ Console (F12) propre - zéro erreurs en rouge
- ✅ Chat répond à "Bonjour"
- ✅ Domains 0-6 tous accessibles
- ✅ Actualités charge sans "corsproxy" error

**À ce point, le système fonctionne! 🎉**

---

**Créé**: 27 février 2026  
**Status**: Diagnostique complet et fixes appliquées
**Prêt à**: Démarrage immédiat

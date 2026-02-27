# 🚀 QUICK REFERENCE GUIDE

**Accès rapide aux infos critiques - À garder à côté de vous!**

---

## 🆘 Erreurs rapides

### "CORS blocked"
**Solution**: Vérifier que Express tourne sur :3001
```bash
pgrep -f "node server.js"  # doit retourner un PID
curl http://localhost:3001/health
```

### "corsproxy.io 403"
**Solution**: Pas censé arriver - c'est l'erreur AVANT la fix! 
Vérifier que src/App.tsx line 93-96 a `/api/rss` et non `corsproxy.io`

### "401 Unauthorized"
**Solution**: VITE_API_KEY invalide or manquant
```bash
grep VITE_API_KEY .env | grep -o "ppl_"  # doit trouver ppl_
```

### "TypeError: Load failed in handleSend"
**Solution**: Une des trois causes ci-dessus
1. CORS blocked → Express pas lancé
2. 401 error → Clé API pas bonne
3. Autre erreur → Vérifier console F12

---

## 📍 Fichiers clés

### À modifier
```
src/App.tsx         Line 57: API_URL = "/api/perplexity"
src/App.tsx         Line 93: /api/rss proxy (NOT corsproxy)
.env.example  →     COPY TO .env et remplir VITE_API_KEY
vite.config.ts      Line 12-33: proxy configuration
package.json        Lines 10-12: "dev" script
```

### À créer/verify
```
server.js           312 lignes, port 3001
.env               Copy de .env.example + remplir VITE_API_KEY
api/routes/perplexity.js    Vercel fallback
api/routes/rss.js          Vercel fallback
```

### À ne pas toucher
```
src/data/*          Les fichiers de données (BIP fiches)
public/*            Assets
node_modules/*     Dependencies
dist/*             Build output (généré automatiquement)
```

---

## ⚙️ Configuration

### Variables d'env critiques
```bash
# Mandatory
VITE_API_KEY=ppl_xxxxxx...

# Optional
PROXY_PORT=3001       # default: 3001
VERCEL_ENV=production # Only on Vercel
```

### Ports utilisés
```
http://localhost:5173   Vite dev server
http://localhost:3001   Express proxy
```

### Script npm
```bash
npm run dev        # Démarre Vite + Express
npm run dev:vite   # Vite seulement
npm run dev:server # Express seulement
npm run build      # Build pour production
```

---

## 🧪 Tests rapides

### Vite donne erreur?
```bash
# Relancer Vite
^C
npm run dev:vite

# Vérifier port 5173
curl http://localhost:5173 2>&1 | head
```

### Express donne erreur?
```bash
# Relancer Express
^C
npm run dev:server

# Vérifier port 3001
curl http://localhost:3001/health
```

### Perplexity API ne répond pas?
```bash
# Test direct
curl -X POST http://localhost:3001/perplexity \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role":"user","content":"test"}]
  }'
# Doit retourner: {"choices":[...]}
# Pas: 401, 403, CORS error
```

### RSS ne charge pas?
```bash
# Test direct
curl "http://localhost:3001/rss?url=https://www.franceinfo.fr/politique.rss" \
  2>&1 | head -c 200
# Doit montrer: <?xml version="1.0"...
# Pas: 403, CORS error
```

---

## 🎯 Checklist avant production

- [ ] `npm run build` compiles sans erreurs
- [ ] `http://localhost:3001/health` répond OK
- [ ] Aucune erreur CORS dans console
- [ ] Domain 4 (BIP) détecte "contractuel" vs "titulaire"
- [ ] Actualités RSS chargent sans corsproxy
- [ ] .env rempli ET dans .gitignore
- [ ] Vercel: VITE_API_KEY configurée comme env var

---

## 📚 Docs par besoin

| Si vous avez... | Lire... |
|---|---|
| Erreur CORS | docs/ERRORS_RESOLVED.md#Erreur3 |
| Clé API invalide | docs/SETUP_API_PROXY.md#Configuration |
| corsproxy erreur | docs/ERRORS_RESOLVED.md#Erreur1 |
| Besoin d'installer | docs/SETUP_API_PROXY.md |
| Besoin de troubleshoot | docs/SETUP_API_PROXY.md#Dépannage |
| Besoin architecture | docs/CORS_AUTHENTICATION_FIX.md |
| Besoin guide complet | docs/README_v2_0.md |
| Besoin liste changements | docs/INVENTORY.md |

---

## 💾 Sauvegardes critiques

### À version control
```
✅ server.js
✅ src/App.tsx  
✅ vite.config.ts
✅ package.json
✅ .env.example
✅ .gitignore
✅ api/routes/*.js
✅ src/data/ (fiches BIP améliorées)
```

### À NE PAS version control
```
❌ .env (contient VITE_API_KEY)
❌ node_modules/
❌ dist/
❌ .DS_Store
```

---

## 🚀 Déployer sur Vercel

### 1 minute setup
```bash
# Push vers GitHub
git push origin main

# Sur vercel.com:
# - New project
# - Import from Git
# - Select repo
# - Ajouter env var:
#   VITE_API_KEY = ppl_xxxxx
# - Deploy
```

Routes auto-détectées:
```
/api/perplexity.js  →  POST /api/perplexity
/api/rss.js         →  GET /api/rss
```

---

## 🔐 Sécurité checklist

- [ ] VITE_API_KEY jamais en hardcode
- [ ] VITE_API_KEY dans .env (version local)
- [ ] .env dans .gitignore
- [ ] .gitignore versioned (on push pas d'env)
- [ ] Vercel: env vars configurées
- [ ] Code review avant déployer (check no secrets)

---

## 📊 Stats importantes

```
Fichiers modifiés:      7
Fichiers créés:         11
Lignes code nouveau:    400+
Temps setup après doc:  5 min
Temps comprendre:       15-30 min
Time déployer:          10 sec (Vercel)
Uptime requis:          Stable
```

---

## 🎓 Concepts clés

```
CORS         = Cross-Origin Resource Sharing
Proxy        = Serveur intermédiaire qui fait les requêtes
API Key      = Authentification vers Perplexity
.env         = Variables d'environnement (locale)
Vite proxy   = Redirect /api/* → :3001
Express      = Serveur backend
BIP          = Base de données fiches
Titulaire    = Agent avec CDI
Contractuel  = Agent avec contrat limité
```

---

## 🆘 Quand tout échoue

### 1. Reboot complet
```bash
# Tuer tout
pkill -f "node server.js"
pkill -f "vite"

# Vérifier les ports
lsof -i :5173
lsof -i :3001

# Nettoyer
rm -rf node_modules
npm install

# Relancer
npm run dev
```

### 2. Vérifier les logs
```bash
# Dans le terminal npm run dev
# Chercher:
# ✓ Express listening on :3001
# ✓ Vite ready in 123ms
# NO: errors, warnings (sauf si ignorables)
```

### 3. Browser console (F12)
```bash
# Appuyer F12 → Console
# Chercher:
# ✅ Pas de CORS error
# ✅ Pas de 403, 401
# ✅ Pas de "TypeError"
```

### 4. Network tab (F12)
```bash
# Appuyer F12 → Network
# Cliquer sur un message chat
# Chercher request: POST /api/perplexity
# Status doit être: 200 OK
# Response doit avoir: {"choices":[...]}
```

---

## 🎉 Succès = Quand vous voyez

```
Terminal:
✓ Vite v5.x.x ready in 234ms
✓ Express proxy listening on http://localhost:3001

Browser:
- Page charge sans CORS error
- http://localhost:3001/health répond
- Chat répond "Bonjour!"
- NO red errors in F12 console

Et surtout:
- Plus de corsproxy.io 403 errors ✅
- Plus de CORS blocked errors ✅
- Plus de 401 Unauthorized ✅
```

---

**Créé**: 27 février 2026  
**Mettez à jour**: Quand vous trouvez un nouveau problème!  
**Partagez**: Avec votre équipe

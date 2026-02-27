# 🔄 MIGRATION GUIDE - De v1.0 à v2.0

**Pour ceux qui avaient déjà ATLAS en fonctionnement**

---

## 📋 Vue d'ensemble

Vous aviez un système avec:
- ❌ Appels directs à Perplexity API du frontend
- ❌ Clé API en frontend (sécurité!)
- ❌ corsproxy.io pour les flux RSS (instable)
- ❌ Erreurs CORS et 401

Vous aurez maintenant:
- ✅ Proxy Express sécurisé
- ✅ Clé API côté serveur uniquement
- ✅ RSS proxy interne
- ✅ Zéro erreurs CORS

**Risques de migration**: Très bas (tout est reculable)  
**Temps estimé**: 10-15 minutes

---

## ⚠️ Prérequis

Avant de commencer, assurez-vous que:
- [ ] Node.js v14+ installé (`node --version`)
- [ ] npm installé (`npm --version`)
- [ ] Git installé (`git status` dans le dossier)
- [ ] Copie de votre VITE_API_KEY (votre clé Perplexity)

---

## 🗂️ Step 1: Sauvegarder l'actuel

```bash
# Aller dans le dossier ATLAS
cd /Users/nikkoolagarnier/Downloads/ATLAS-master

# Créer une branche pour v1.0
git checkout -b backup/v1.0-before-migration

# Commit l'état actuel
git add .
git commit -m "Backup: Version 1.0 avant migration à v2.0"

# Retourner à main
git checkout main
```

Si pas de git:
```bash
# Copier le dossier entier ailleurs
cp -r /Users/nikkoolagarnier/Downloads/ATLAS-master \
      ~/Downloads/ATLAS-master-v1-backup
```

---

## 📥 Step 2: Récupérer les fichiers v2.0

### Fichiers à ajouter (NOUVEAUX)
```
✨ server.js                (312 lignes)
✨ .env.example            (22 lignes)
✨ api/routes/perplexity.js (45 lignes)
✨ api/routes/rss.js       (45 lignes)
✨ docs/                   (tous les guides)
✨ QUICKSTART.md
✨ POST_IMPLEMENTATION_CHECKLIST.md
✨ QUICK_REFERENCE.md

# Ces fichiers sont fournis dans le package
# Les copier dans votre dossier ATLAS
```

### Fichiers à mettre à jour (MODIFIÉS)
```
📝 vite.config.ts          Ajouter proxy block
📝 src/App.tsx             Changer API_URL et proxy RSS
📝 package.json            Ajouter scripts et dépendances
```

---

## 🔧 Step 3: Mise à jour vite.config.ts

### Avant (v1.0)
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  // PAS DE SERVER.PROXY
});
```

### Après (v2.0) - À ajouter
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/perplexity': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/api/rss': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
});
```

---

## 🔐 Step 4: Update package.json

### Dépendances à ajouter
```bash
npm install express@4.18.2 cors@2.8.5 dotenv@16.3.1
```

### Scripts à modifier

Avant:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

Après:
```json
{
  "scripts": {
    "dev": "node server.js & vite",
    "dev:vue": "vite",
    "dev:server": "node server.js",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

---

## 📝 Step 5: Créer .env

### 1. Copier le template
```bash
cp .env.example .env
```

### 2. Le contenu
```bash
# Dans le fichier .env, vous mettez:
VITE_API_KEY=ppl_xxxxxx...     # Votre vraie clé Perplexity
PROXY_PORT=3001                 # Port par défaut
```

### 3. Vérifier .gitignore
```bash
# Vérifier que .env est dans .gitignore
grep "\.env" .gitignore
# Doit retourner: .env (et PAS .env.example)

# Si manquant, ajouter:
echo ".env" >> .gitignore
```

---

## 🔄 Step 6: Mettre à jour src/App.tsx

### Change 1: API_URL (lignes 57-58)

**Avant (v1.0)**:
```typescript
const API_URL = "https://api.perplexity.ai/chat/completions";
const API_KEY = import.meta.env.VITE_API_KEY;
```

**Après (v2.0)**:
```typescript
const API_URL = "/api/perplexity";
// REMOVE: const API_KEY = ...  (pas utilisé)
```

### Change 2: NewsTicker RSS (lignes 93-96)

**Avant (v1.0)**:
```typescript
const proxyUrl = "https://corsproxy.io/?";
const FLUX_ACTUALITES_URL = proxyUrl + 
  encodeURIComponent("https://www.franceinfo.fr/politique.rss");
const res = await fetch(FLUX_ACTUALITES_URL);
```

**Après (v2.0)**:
```typescript
const proxiedUrl = `/api/rss?url=${encodeURIComponent(
  "https://www.franceinfo.fr/politique.rss"
)}`;
const res = await fetch(proxiedUrl);
```

### Change 3: Appel Perplexity (lignes 773-801)

**Avant (v1.0)**:
```typescript
const response = await fetch(API_URL, {
  method: "POST",
  headers: { 
    Authorization: `Bearer ${API_KEY}`,     // ❌ Pas bon
    "Content-Type": "application/json" 
  },
  body: JSON.stringify({ model: "sonar-pro", messages })
});
```

**Après (v2.0)**:
```typescript
const response = await fetch(API_URL, {
  method: "POST",
  headers: { 
    "Content-Type": "application/json"      // ✅ Pas de Bearer
  },
  body: JSON.stringify({ model: "sonar-pro", messages })
});
```

---

## 🚀 Step 7: Ajouter les nouveaux fichiers

### server.js (312 lignes)
Créer le fichier `/Users/nikkoolagarnier/Downloads/ATLAS-master/server.js`
Contenu fourni dans le package

### api/routes/perplexity.js
Créer le fichier `/Users/nikkoolagarnier/Downloads/ATLAS-master/api/routes/perplexity.js`
Contenu fourni dans le package

### api/routes/rss.js
Créer le fichier `/Users/nikkoolagarnier/Downloads/ATLAS-master/api/routes/rss.js`
Contenu fourni dans le package

---

## ✅ Step 8: Vérifier l'installation

### Test 1: Dépendances
```bash
npm list express cors dotenv
# Doit montrer les 3 packages avec versions
```

### Test 2: Fichiers critiques
```bash
ls -la server.js .env .env.example
# Doit lister 3 fichiers

ls -la src/App.tsx vite.config.ts
# Doit lister 2 fichiers modifiés
```

### Test 3: Port libre
```bash
# Vérifier que ports 5173 et 3001 sont libres
lsof -i :5173  # ne doit rien retourner
lsof -i :3001  # ne doit rien retourner
```

---

## 🎯 Step 9: Premier démarrage

### 1. Lancer le système
```bash
npm run dev
# Doit afficher:
# - ✓ Vite v5.x ready
# - ✓ Express listening on :3001
```

### 2. Tester les serveurs
```bash
# Dans un nouveau terminal:
curl http://localhost:3001/health
# Doit montrer: {"status":"OK","apiKeyConfigured":"✅"}
```

### 3. Ouvrir dans navigateur
```
http://localhost:5173
# Doit charger sans erreur CORS
```

---

## 🧪 Step 10: Validation complète

Voir **POST_IMPLEMENTATION_CHECKLIST.md** pour la checklist complète

TL;DR:
- [ ] http://localhost:5173 charge
- [ ] http://localhost:3001/health répond
- [ ] Chat fonctionne tous les domaines
- [ ] PAS d'erreurs CORS dans console
- [ ] PAS de "corsproxy" dans les logs

---

## ⚠️ Problèmes courants en migration

### Erreur: "Cannot find module 'express'"
```bash
# Solution:
npm install
# Puis relancer: npm run dev
```

### Erreur: "Address already in use :3001"
```bash
# Solution:
pkill -f "node server.js"
# Ou changer PROXY_PORT dans .env
npm run dev
```

### Erreur: "VITE_API_KEY is undefined"
```bash
# Solution: Vérifier .env
cat .env | grep VITE_API_KEY
# Doit avoir: VITE_API_KEY=ppl_xxxxx
# (avec la vraie clé, pas "ppl_xxxxx")
```

### Erreur: "CORS blocked"
```bash
# Solution: Express pas lancé
# Dans le terminal npm run dev, chercher:
# "Express listening on :3001"

# Si manquant, relancer:
npm run dev
```

### Erreur: "corsproxy.io 403" persiste
```bash
# Solution: App.tsx pas mise à jour
# Vérifier line 93-96 de src/App.tsx
# Doit avoir: /api/rss
# PAS: corsproxy.io

grep "corsproxy" src/App.tsx
# Ne doit rien retourner
```

---

## 🆘 Rollback en cas de problème

Si ça marche pas et vous voulez revenir à v1.0:

```bash
# Si vous avez git:
git checkout backup/v1.0-before-migration

# Ou si vous avez la copie:
rm -rf /Users/nikkoolagarnier/Downloads/ATLAS-master
cp -r ~/Downloads/ATLAS-master-v1-backup \
      /Users/nikkoolagarnier/Downloads/ATLAS-master

cd /Users/nikkoolagarnier/Downloads/ATLAS-master
npm install
npm run dev
```

---

## 📊 Avantages de v2.0

| Aspect | v1.0 | v2.0 |
|--------|------|------|
| Sécurité API | ❌ Exposée | ✅ Côté serveur |
| CORS errors | ❌ Fréquentes | ✅ Zéro |
| RSS proxy | ❌ corsproxy.io | ✅ Interne |
| Stabilité | ⚠️ Instable | ✅ Stable |
| Déploiement | ⚠️ Complexe | ✅ Simple |
| Type errors | ⚠️ 401, 403 | ✅ 0 errors |

---

## 🎓 Ce qui a changé techniquement

### Architecture avant
```
Frontend (5173)
    ↓ (CORS problem)
    ↗ (BLOCKED by browser)
Perplexity API
```

### Architecture après
```
Frontend (5173)
    ↓ All /api/* requests
Express Server (3001)
    ↓ (Authenticated requests)
Perplexity API ✅
```

---

## 📚 Pour en savoir plus

- **Erreurs détaillées**: docs/ERRORS_RESOLVED.md
- **Guide d'installation complet**: docs/SETUP_API_PROXY.md
- **Architecture technique**: docs/CORS_AUTHENTICATION_FIX.md
- **Checklist après installation**: POST_IMPLEMENTATION_CHECKLIST.md
- **Référence rapide**: QUICK_REFERENCE.md

---

## ✨ Après la migration

Une fois que tout fonctionne:

1. **Commit les changements**
   ```bash
   git add .
   git commit -m "Migration vers v2.0: Express proxy, sécurité API"
   ```

2. **Optionnellement**: Déployer sur Vercel
   ```bash
   git push origin main
   # Vercel auto-détecte et déploie
   ```

3. **Supprimer l'ancienne branche** (après vérification)
   ```bash
   git branch -D backup/v1.0-before-migration
   ```

---

**Créé**: 27 février 2026  
**Scope**: Migration v1.0 → v2.0  
**Difficulty**: Facile (10-15 min)  
**Support**: Voir docs/SETUP_API_PROXY.md pour problèmes

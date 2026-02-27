# ✅ POST-IMPLEMENTATION CHECKLIST

**Après avoir suivi QUICKSTART.md, utilisez ce checklist pour vérifier le système**

---

## 🚀 Phase 1: Vérification initiale (2 min)

### ✓ Fichier .env créé
```bash
# Vérifier que .env existe
ls -la .env
# Doit afficher: .env (avec taille > 0)
```

### ✓ Clé API configurée
```bash
# Vérifier que VITE_API_KEY est dans .env
grep VITE_API_KEY .env
# Doit afficher: VITE_API_KEY=ppl_xxxxx
# Les x doivent être remplacés par votre vraie clé
```

### ✓ Dépendances installées
```bash
# Vérifier que node_modules existe
ls -la node_modules/ | head -20
# Doit montrer des dossiers: express, cors, dotenv, etc.
```

### ✓ Serveurs démarrent
```bash
# Lancer les serveurs
npm run dev

# Attendus dans différents terminaux/logs:
# - "Vite v... ready in ... ms"
# - ✓ Express proxy listening on http://localhost:3001
```

---

## 🔍 Phase 2: Vérification serveurs (3 min)

### ✓ Vite en écoute
```bash
curl http://localhost:5173 2>/dev/null | head -c 100
# Doit montrer: <!DOCTYPE html> ou contenu HTML
```

### ✓ Express en écoute
```bash
curl http://localhost:3001/health
# Doit montrer:
# {"status":"OK","apiKeyConfigured":"✅"}
```

### ✓ Proxy /api/perplexity fonctionne
```bash
# Test simple (pas de vraie réponse, just test connexion)
curl -X POST http://localhost:3001/perplexity \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role":"user","content":"test"}]
  }' 2>&1 | head -c 200

# Doit montrer: {"choices":... (pas d'erreur CORS ou 401)
```

### ✓ Proxy /api/rss fonctionne
```bash
curl "http://localhost:3001/rss?url=https://www.franceinfo.fr/politique.rss" 2>&1 | head -c 200
# Doit montrer: <?xml ou contenu RSS (pas d'erreur)
```

---

## 🌐 Phase 3: Interface Web (3 min)

### ✓ Site charge
```
1. Ouvrir http://localhost:5173 dans le navigateur
2. Vérifier que la page charge
3. Vérifier que NO errors dans la console (F12)
```

### ✓ Console limpe
```
Appuyer F12 pour ouvrir Developer Tools
Aller à Console
Chercher:
  ❌ CORS blocked
  ❌ 403 corsproxy
  ❌ 401 Unauthorized
  ❌ TypeError: Load failed
  ❌ Access-Control-Allow-Origin
  
✅ Si zéro ces erreurs: EXCELLENT
```

### ✓ Interface responsive
```
Vérifier que:
  - Menu lateral affiche les 7 domaines
  - Boutons se cliquent
  - Chat input visible
  - RSS section affiche articles (s'il y a du contenu)
```

---

## 💬 Phase 4: Tester les chats (5 min par domain)

### Domain 0: Temps et Congés
```
1. Cliquer sur "Temps et congés"
2. Taper : "En tant que titulaire, combien de jours de congés ai-je?"
3. Attendre réponse (5-10 sec)
4. Vérifier:
   ✅ Pas d'erreur dans console
   ✅ Réponse apparaît
   ✅ Réponse pertinente (parle de jours de congé)
```

### Domain 1: Formation
```
1. Cliquer sur "Formations"
2. Taper : "Quelles formations sont disponibles?"
3. Attendre réponse
4. Vérifier:
   ✅ Pas d'erreur
   ✅ Réponse pertinente
```

### Domain 2: Télétravail
```
1. Cliquer sur "Télétravail"
2. Taper : "Puis-je faire du télétravail?"
3. Attendre réponse
4. Vérifier:
   ✅ Pas d'erreur
   ✅ Réponse pertinente
```

### Domain 3: Podcasts
```
1. Cliquer sur "Podcasts"
2. Vérifier qu'une liste de podcasts apparaît
3. Cliquer sur un podcast
4. Vérifier:
   ✅ Lecteur audio charge (bouton play visible)
```

### Domain 4: Fiches BIP ⭐ IMPORTANT
```
1. Cliquer sur "Fiches BIP"
2. Taper : "un agent contractuel peut il avoir une congé de longue maladie?"
3. Attendre réponse (5-10 sec)
4. Vérifier:
   ✅ Pas d'erreur dans console
   ✅ Réponse mentionne "congé de longue maladie" ou "grave maladie"
   ✅ Réponse mentions status "contractuel"
   ✅ Réponse correcte (oui, les contractuels peuvent)
   
DETAILLES:
- Doit chercher les fiches avec: 
  - Keywords: "congé", "longue maladie", "contractuel"
  - Status: "contractuel"
- Doit trouver la fiche nommée "grave_maladie_contractuel"
- Doit EXCLURE "longue_maladie_titulaire" (c'est pour titulaires)
```

### Domain 4: Fiches BIP - Test Titulaires
```
1. Rester sur "Fiches BIP"
2. Taper : "quels sont les droits des titulaires en cas de maladie?"
3. Attendre réponse
4. Vérifier:
   ✅ Pas d'erreur
   ✅ Réponse parle des titulaires
   ✅ Mentionne les congés de maladie de longue durée
```

### Domain 6: Actualités
```
1. Cliquer sur "Actualités"
2. Vérifier que articles apparaissent
3. Cliquer sur un article
4. Vérifier:
   ✅ Lien s'ouvre dans onglet (ou popup)
   ✅ Lien n'est pas vers corsproxy (URL propre)
   
Dans la console, vérifier:
   ✅ NO 403 corsproxy.io errors
   ✅ NO CORS blocked errors
```

---

## 🐛 Phase 5: Debugging (en cas de problème)

### Si erreur CORS 403
```
1. Aller dans console (F12)
2. Chercher le message d'erreur exact
3. Consulter: docs/ERRORS_RESOLVED.md → Section Erreur #1
4. Vérifier: server.js est bien lancé sur :3001
```

### Si erreur 401 Unauthorized
```
1. Vérifier le .env: grep VITE_API_KEY .env
2. Vérifier que la clé commence par: ppl_
3. Vérifier qu'il n'y a pas d'espaces: VITE_API_KEY=ppl_xxxxx (pas d'espaces)
4. Relancer avec: npm run dev
5. Consulter: docs/CORS_AUTHENTICATION_FIX.md
```

### Si erreur "TypeError: Load failed"
```
1. Vérifier console browser (F12)
2. Vérifier que http://localhost:3001/health répond
3. Vérifier que npm run dev fonctionne (pas d'erreur Node.js)
4. Tuer et relancer: Ctrl+C, puis npm run dev
5. Consulter: docs/SETUP_API_PROXY.md → Troubleshooting
```

### Si corsproxy.io appears
```
1. Ça veut dire code d'App.tsx n'a pas été modifié correctement
2. Vérifier la ligne 93-96 dans src/App.tsx:
   - Doit être: const proxiedUrl = `/api/rss?url=...`
   - Ne doit PAS être: corsproxy.io
3. Relancer: npm run dev
```

### Si Express proxy ne démarre pas
```
Erreur habituelle: "Address already in use :3001"

Solutions:
1. Tuer les processus:
   lsof -ti :3001 | xargs kill -9
   
2. Changer le port dans server.js:
   const PORT = process.env.PROXY_PORT || 3002;  // 3002 au lieu de 3001
   
3. Relancer: npm run dev
```

---

## ✅ Phase 6: Validation finale (2 min)

### Score de Validation

Compter les ✅:

**Serveurs (2 pts)**
- [ ] http://localhost:5173 charge (1 pt)
- [ ] http://localhost:3001/health répond OK (1 pt)

**Zéro Erreurs (3 pts)**
- [ ] Pas de CORS error (1 pt)
- [ ] Pas de 403 corsproxy error (1 pt)
- [ ] Pas de 401 error (1 pt)

**Chats Fonctionnent (3 pts)**
- [ ] Domain 0-3 répondent (1 pt)
- [ ] Domain 4 (BIP) répond (1 pt)
- [ ] Domain 6 (News) charge (1 pt)

**Score**:
```
0-2 pts:  ⚠️  Problème sérieux - Lire troubleshooting
3-5 pts:  ⚡ Presque là - Vérifier console
6-7 pts:  ✅ Excellent - Système fonctionne!
8 pts:    🚀 Parfait - Production ready!
```

---

## 🔧 Configuration avancée (Optionnel)

### Changer le port Express
```bash
# dans .env ajouter:
PROXY_PORT=3002

# Puis relancer: npm run dev
# Express sera sur :3002 au lieu de :3001
```

### Ajouter plus d'origines CORS
```bash
# Dans server.js, chercher:
const corsOptions = {
  origin: ['http://localhost:5173', ...],
}

# Ajouter votre origine:
origin: [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://votresite.com'  // <- Ajouter ici
],
```

### Mode développement vs production
```bash
# Dev (comme maintenant):
npm run dev
# Démarre Vite + Express ensemble

# Build for production:
npm run build
# Crée dist/ avec la version minifiée
```

---

## 📞 Support

### Si vous restez bloqué
1. Relire: docs/QUICKSTART.md (3 étapes simples)
2. Consulter: docs/ERRORS_RESOLVED.md (erreurs connues)
3. Détails: docs/SETUP_API_PROXY.md → Troubleshooting section
4. Architecture: docs/CORS_AUTHENTICATION_FIX.md

### Commandes utiles
```bash
# Voir les processus sur les ports
lsof -i :5173
lsof -i :3001

# Tuer un processus
kill -9 <PID>

# Vérifier npm packages
npm list express cors

# Vérifier Node version
node --version
# (doit être >= 14.0.0)
```

---

## ✨ Quand tout fonctionne

Vous devriez avoir:
- ✅ http://localhost:5173 qui chargeant sans erreurs
- ✅ http://localhost:3001 qui répond au ping
- ✅ Chat qui fonctionne sur tous les domaines
- ✅ Pas d'erreurs CORS/Auth
- ✅ Flux RSS qui chargent
- ✅ Index BIP avec distinction contractuel/titulaire

**Félicitations! 🎉 Le système ATLAS v2.0 est opérationnel!**

---

**Status**: ✅ Checklist prêt  
**Durée estimée**: 15-20 min pour tout valider  
**Créé**: 27 février 2026

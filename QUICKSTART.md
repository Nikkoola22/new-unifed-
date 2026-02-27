# 🚀 QUICKSTART - Lancer le projet

## 3 étapes pour commencer

### 1️⃣ Configuration (.env)
```bash
cp .env.example .env
# Ouvrir .env et ajouter votre clé:
# VITE_API_KEY=ppl_votre_clé_ici
```

### 2️⃣ Installer
```bash
npm install
```

### 3️⃣ Démarrer
```bash
npm run dev
# Attend: 
# - Vite: http://localhost:5173
# - Express: http://localhost:3001
```

✅ **C'est bon!** Ouvrir http://localhost:5173

---

## 🆘 Ça marche pas?

### Erreur: "VITE_API_KEY not found"
```bash
# Éditer .env:
nano .env
# Ajouter une vraie clé Perplexity (commence par ppl_)
```

### Erreur: "Cannot find module 'express'"
```bash
npm install
```

### Erreur: "Port 3001 already in use"
```bash
PROXY_PORT=3002 npm run dev:server
```

---

## 📚 Documentation complète
- **[README_v2_0.md](README_v2_0.md)** - Vue d'ensemble complète
- **[SETUP_API_PROXY.md](SETUP_API_PROXY.md)** - Guide détaillé
- **[CORS_AUTHENTICATION_FIX.md](CORS_AUTHENTICATION_FIX.md)** - Explications techniques

---

## ✅ Vérifier que tout marche
```bash
# Santé serveur
curl http://localhost:3001/health
# Attendu: { "status": "OK", "apiKeyConfigured": "✅" }
```

**C'est prêt! Bonnes requêtes! 🎉**

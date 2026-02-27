# 👋 START HERE

**Bienvenue à ATLAS v2.0 - Par où commencer?**

---

## 🎯 Choisissez votre situation

### 1️⃣ Je suis nouveau
👉 Lire: [QUICKSTART.md](QUICKSTART.md) (5 minutes)
- 3 étapes simples
- npm run dev
- C'est tout!

### 2️⃣ Je viens de v1.0  
👉 Lire: [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) (15 minutes)
- Guide pas à pas
- Sauvegarder avant
- Facile à rollback

### 3️⃣ J'ai une erreur
👉 Lire: [QUICK_REFERENCE.md](QUICK_REFERENCE.md) (2 minutes)
- Erreurs courantes
- Solutions rapides
- Ou chercher la réponse

### 4️⃣ Je veux comprendre
👉 Lire: [FINAL_SUMMARY.md](FINAL_SUMMARY.md) (5 minutes)
- Quelle était le problème
- Comment c'est résolu
- Architecture complète

### 5️⃣ Je veux tous les détails
👉 Lire: [docs/INDEX.md](docs/INDEX.md)
- Navigation complète
- Tous les docs
- Chemins d'apprentissage

---

## ⚡ Ultra-quick (90 secondes)

### Avoir un terminal prêt:
```bash
# Aller au dossier
cd /Users/nikkoolagarnier/Downloads/ATLAS-master

# Copier la config
cp .env.example .env

# ÉDITER .env - Ajouter votre clé:
# VITE_API_KEY=ppl_xxxxxx

# Installer
npm install

# Lancer!
npm run dev
```

### Ouvrir navigateur:
```
http://localhost:5173
```

### Ça marche? ✅
- Pas d'erreur CORS → Succès!
- Une erreur? → Lire QUICK_REFERENCE.md

---

## 📚 Roadmap par objectif

| Objectif | Temps | Lire |
|----------|-------|------|
| Juste faire marcher | 5 min | QUICKSTART.md |
| De v1.0 à v2.0 | 15 min | MIGRATION_GUIDE.md |
| Comprendre la fix | 10 min | ERRORS_RESOLVED.md |
| Caché problèmes | 15 min | CORS_AUTHENTICATION_FIX.md |
| Vérifier tout fonctionne | 15 min | POST_IMPLEMENTATION_CHECKLIST.md |
| Déployer en production | 10 min | docs/SETUP_API_PROXY.md |
| Vue complète du système | 10 min | FINAL_SUMMARY.md |
| Naviguer toute la doc | 5 min | docs/INDEX.md |

---

## 🚨 Aide rapide

### La plus fréquente: "CORS error"
```bash
# Vérifier que server tourne:
curl http://localhost:3001/health

# Doit montrer: {"status":"OK",...}

# Si erreur, relancer:
npm run dev
```

### Seconde: "API key not found"
```bash
# Vérifier .env:
cat .env | grep VITE_API_KEY

# Doit avoir: VITE_API_KEY=ppl_xxxxx

# Si manquant:
cp .env.example .env
# Éditer et ajouter votre vraie clé
```

### Troisième: "Port already in use"
```bash
# Tuer les processus qui utilisent :3001
lsof -ti :3001 | xargs kill -9

# Relancer:
npm run dev
```

**Plus d'aide?** → QUICK_REFERENCE.md

---

## ✅ Checklist 1-minute

- [ ] Node.js v14+ installé (`node -v`)
- [ ] npm installé (`npm -v`) 
- [ ] dossier ATLAS-master trouvé
- [ ] Clé Perplexity API prête (ppl_xxxx)
- [ ] Léger ✅ → Go to QUICKSTART.md

---

## 🎓 Qu'est-ce qu'ATLAS v2.0?

C'est une interface chat pour des questions d'administration française avec:
- 🕐 Congés et temps de travail
- 📚 Formations disponibles
- 🏠 Règles télétravail  
- 🎙️ Podcasts pratiques
- 📄 Fiches BIP (base info personnes)
- 📰 Actualités courantes
- 🤖 LLM (Perplexity AI)

**La v2.0** corrige les erreurs CORS/Auth bloquant le chat.

---

## 📖 Structure doc

```
START_HERE.md          ← Vous êtes ici
├── QUICKSTART.md      ← Par où commencer
├── FINAL_SUMMARY.md   ← Big picture
├── QUICK_REFERENCE.md ← Erreurs rapides
├── MIGRATION_GUIDE.md ← Si vous avez v1.0
├── POST_IMPLEMENTATION_CHECKLIST.md
│
└── docs/
    ├── INDEX.md       ← Navigation complète
    ├── SETUP_API_PROXY.md
    ├── ERRORS_RESOLVED.md
    ├── CORS_AUTHENTICATION_FIX.md
    ├── README_v2_0.md
    ├── IMPROVEMENTS_v2_0.md
    ├── GUIDE_v2_0.md
    └── CHANGELOG_v2_0.md
```

---

## 🟢 Vous êtes prêt!

➡️ **Commencez par**: [QUICKSTART.md](QUICKSTART.md)

**Ça prend 5 minutes.**

Bonne chance! 🚀

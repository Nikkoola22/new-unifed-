# Script de Test de Recherche

Ce document explique comment utiliser le script de test pour évaluer la pertinence de la recherche dans les documents internes.

## 📋 Vue d'ensemble

Le script de test contient **10 questions/réponses** qui couvrent différents domaines :
- Temps de travail
- Congés et absences
- Télétravail
- Formation
- Accidents et maladies

## 🚀 Utilisation

### Prérequis

1. Le serveur Express doit être démarré :
   ```bash
   npm run server
   ```
   Ou avec l'application complète :
   ```bash
   npm run dev:full
   ```

2. La clé API Perplexity doit être configurée dans `.env` :
   ```
   PERPLEXITY_API_KEY=votre_cle_api
   ```

### Exécution du test

**Option 1: Script JavaScript simple (recommandé)**
```bash
node test-recherche-simple.js
```

**Option 2: Script TypeScript**
```bash
# Avec tsx (si installé)
npx tsx test-recherche.ts

# Ou avec ts-node
npx ts-node test-recherche.ts
```

### Configuration

Vous pouvez spécifier une URL d'API différente :
```bash
API_URL=http://localhost:3000/api/completions node test-recherche-simple.js
```

## 📊 Résultats

Le script affiche :

1. **Résultats détaillés** pour chaque test :
   - ✅ ou ❌ selon si le bon chapitre est trouvé
   - Chapitre attendu vs chapitre trouvé
   - Score de pertinence (0-100%)
   - Temps de réponse
   - Réponse de l'IA

2. **Statistiques globales** :
   - Taux de réussite
   - Pertinence moyenne
   - Temps moyen de réponse

3. **Recommandations** pour améliorer les performances

## 🧪 Tests inclus

1. **Télétravail - Forfait annuel** : "Combien de jours de télétravail puis-je faire par an ?"
2. **Mariage** : "Combien de jours ai-je pour mon mariage ?"
3. **Garde d'enfant** : "Que faire si mon enfant est malade et que je dois le garder ?"
4. **Forfait télétravail** : "Comment fonctionne le forfait annuel en télétravail ?"
5. **Temps de travail** : "Combien d'heures de travail effectif ai-je par an ?"
6. **Accident de service** : "J'ai eu un accident de service, que dois-je faire ?"
7. **Rentrée scolaire** : "Puis-je prendre un congé pour la rentrée scolaire de mes enfants ?"
8. **Formation** : "Comment demander une formation dans le cadre du plan de formation ?"
9. **CET** : "Qu'est-ce que le CET et comment l'utiliser ?"
10. **Durée télétravail** : "Puis-je être en télétravail 3 jours par semaine ?"

## 🔧 Améliorations apportées

### 1. Fonction de recherche améliorée avec IA

La fonction `trouverContextePertinentAvecIA` :

1. **Fait une recherche basique** pour trouver les 3 meilleurs candidats de chapitres
2. **Utilise l'IA (Perplexity)** pour analyser la question et sélectionner le meilleur contexte
3. **Fallback intelligent** : Si l'IA échoue, retourne le meilleur candidat basique

### 2. Optimisations

- **Cache des candidats** : Les 3 meilleurs candidats sont pré-calculés avant l'appel IA
- **Optimisation pour cas évidents** : Si un seul candidat avec score très élevé (≥50), retour direct sans appel IA
- **Gestion d'erreurs** : Fallback robuste en cas d'échec de l'IA

### 3. Structure du code

```
trouverContextePertinentBase()     → Recherche basique (synonymes, mots-clés)
           ↓
trouverContextePertinentAvecIA()   → Utilise l'IA pour sélectionner parmi candidats
           ↓
traiterQuestion()                  → Génère la réponse finale avec contexte
```

## 📈 Objectifs de performance

- **Pertinence moyenne** : ≥ 80%
- **Taux de réussite** : ≥ 90%
- **Temps de réponse** : < 2 secondes par requête

## 🔍 Dépannage

### Erreur : "Cannot connect to API"
- Vérifiez que le serveur est démarré
- Vérifiez l'URL de l'API dans la console

### Erreur : "PERPLEXITY_API_KEY not found"
- Créez un fichier `.env` à la racine
- Ajoutez : `PERPLEXITY_API_KEY=votre_cle`

### Tests échouent
- Vérifiez les logs du serveur
- Vérifiez que les données de sommaire sont correctement chargées
- Augmentez les logs dans `App.tsx` pour debugger

## 📝 Notes

- Les tests utilisent l'API réelle pour une évaluation réaliste
- Pour des tests plus rapides sans API, vous pouvez modifier le script pour utiliser uniquement la recherche basique
- Les temps de réponse incluent la latence réseau vers Perplexity

## 🎯 Prochaines améliorations possibles

1. **Cache des réponses IA** pour éviter les appels répétés
2. **Tests unitaires** pour la recherche basique (sans API)
3. **Métriques détaillées** par domaine (temps, formation, télétravail)
4. **Tests de régression** pour détecter les régressions lors des modifications


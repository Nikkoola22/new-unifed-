# 📚 BIP Fiche Index - Documentation

## Overview

Un système d'indexation complet des fiches BIP (Base Informative du Personnel) pour optimiser les recherches et réduire l'utilisation des tokens lors des requêtes au LLM.

**Statistiques:**
- **185 fiches** indexées
- **9 catégories** principales
- **~185 mots-clés** extraits automatiquement
- **Taille légère**: 80KB (TS) + 100KB (JSON)

## 📁 Structure des fichiers

```
src/data/
├── bip-output/               # Copie complète des données JSONL du BIP
│   ├── *.jsonl              # Fichiers JSONL bruts
│   └── bip_fiches_rag*/     # Répertoires organisés par catégorie
├── bip-index.ts             # Index TypeScript généré (compilé avec l'app)
└── bip-index.json           # Index JSON (servi via l'API)

src/utils/
└── ficheSearch.ts           # Utilitaires de recherche

api/search/
└── route.js                 # Endpoint API pour les recherches

scripts/
├── generateBipIndex.cjs     # Générateur d'index (Node.js)
└── testBipIndex.mjs         # Suite de tests
```

## 🔍 Comment utiliser

### 1. **Frontend - TypeScript**

```typescript
import { 
  searchFicheByCode,
  searchFichesByKeywords,
  searchFichesByCategory,
  getCategories,
  buildLLMContext
} from '@/utils/ficheSearch';

// Recherche par code
const result = searchFicheByCode('NTICO1');
// → SearchResult | undefined

// Recherche par mots-clés
const keywords = searchFichesByKeywords(['congé', 'maternité']);
// → SearchResponse avec résultats + métadonnées

// Recherche par catégorie
const byCategory = searchFichesByCategory('Congés Et Absences');
// → SearchResponse

// Construire un contexte pour le LLM
const llmContext = buildLLMContext(results);
// → String formaté, optimisé pour tokens
```

### 2. **API Backend**

#### Recherche par code
```
GET /api/search/code?code=NTICO1&includeLLMContext=true
```

Réponse:
```json
{
  "result": {
    "code": "NTICO1",
    "titre": "Agents contractuels : généralités",
    "categorie": "Agents Contractuels",
    "url": "https://bip.cig929394.fr/fiches/..."
  },
  "llmContext": "[NTICO1] Agents contractuels : généralités\n  Catégorie: Agents Contractuels\n  URL: ..."
}
```

#### Recherche par mots-clés
```
GET /api/search/keywords?keywords=congé,maternité&includeLLMContext=true
```

#### Recherche par catégorie
```
GET /api/search/category?category=Congés Et Absences
```

#### Lister les catégories
```
GET /api/search/categories
```

#### Exporter l'index complet
```
GET /api/search/index          # Index complet
GET /api/search/index?minimal=true  # Version légère (code + titre seulement)
```

## 🧠 Optimisation pour les LLM

L'index est conçu pour minimiser les tokens utilisés:

1. **Recherche d'abord par index** → Retour léger (code + titre)
2. **Contexte formaté pour LLM** → Uniquement les fiches pertinentes
3. **Mots-clés extraits** → Permet au LLM de trouver les bonnes fiches sans lire tout le texte

### Exemple de workflow optimisé

```typescript
// 1. L'utilisateur pose une question sur les congés maternité
const userQuery = "Quels sont mes droits de congé maternité?"

// 2. Extraction des mots-clés (côté client)
const keywords = ['maternité', 'congé', 'absence'];

// 3. Requête API (très légère)
const results = await fetch(
  `/api/search/keywords?keywords=${keywords.join(',')}&includeLLMContext=true`
);

// 4. Contexte LLM (seulement les fiches pertinentes)
const { llmContext } = await results.json();

// 5. Appel au LLM avec contexte (tokens économisés!)
const llmResponse = await llm.chat([
  { role: "system", content: `${llmContext}\n\nBasé sur les fiches BIP ci-dessus, répondez à:` },
  { role: "user", content: userQuery }
]);
```

## 📊 Catégories disponibles

1. **Agents Contractuels** (26 fiches)
2. **Cadres D Emplois Generalites** (7 fiches)
3. **Cadres D Emplois** (45 fiches)
4. **Carriere** (28 fiches)
5. **Conditions D Exercice Des Fonctions Et Duree Du Travail** (25 fiches)
6. **Conges Et Absences** (13 fiches)
7. **Discipline2** (10 fiches)
8. **Indisponibilite Physique Et Securite Sociale** (31 fiches)

## 🔧 Régénérer l'index

Si vous mettez à jour les données JSONL du BIP:

```bash
npm run generate:bip-index
```

Ou manuellement:

```bash
node scripts/generateBipIndex.cjs
```

Cela recrée:
- `src/data/bip-index.ts` (pour le frontend)
- `src/data/bip-index.json` (pour l'API)

## 🧪 Tests

```bash
npm run test:bip-index
```

Exécute:
- Vérification des statistiques d'index
- Test de recherche par code
- Test de recherche par mots-clés
- Test de recherche par catégorie
- Test de suggestions d'autocomplétion
- Test de construction du contexte LLM

## 💾 Consommation de tokens

### Sans index (approche naïve)
- Requête: "Conges maternité" → envoyer le **texte complet** au LLM (150K+ tokens)

### Avec index (approche optimisée)
- Requête: "Conges maternité" → index retourne 2-5 fiches pertinentes (500-2000 tokens)
- **Réduction: 99%** 🎉

## 🚀 Intégration ailleurs

### Exporter comme module NPM
```typescript
// En futur: npm package separate
export * from './src/utils/ficheSearch.ts';
```

### Utiliser dans d'autres projets
```typescript
import { searchFichesByKeywords } from '@atlas/bip-index';

const results = await searchFichesByKeywords(['congé']);
```

---

**Dernière mise à jour**: 27 février 2026  
**Version**: 1.0  
**Maintenu par**: ATLAS Project Team

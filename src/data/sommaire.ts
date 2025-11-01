// sommaire.ts - Structure unifiée pour tous les domaines

export interface ArticleConfig {
  titre: string;
  page: number;
  source: "temps" | "formation" | "teletravail";
  idContenu: number;
  icone?: string;
  mots_cles: string[];
}

export interface ChapitreConfig {
  titre: string;
  page: number;
  source: "temps" | "formation" | "teletravail";
  idContenu: number;
  icone?: string;
  mots_cles: string[];
  articles: ArticleConfig[];
}

export interface SommaireStructure {
  chapitres: ChapitreConfig[];
}

export const sommaire: SommaireStructure = {
  chapitres: [
    // ========== DOMAINE: TEMPS DE TRAVAIL ==========
    {
      titre: "Chapitre 1 : Le temps de travail",
      page: 7,
      source: "temps",
      idContenu: 1,
      icone: "⏰",
      mots_cles: [
        "durée légale", "temps de travail", "plages fixes", "plages souplesse",
        "heures supplémentaires", "astreintes", "travail de nuit", "temps partiel",
        "journée solidarité", "sujétions", "horaires", "amplitude"
      ],
      articles: [
        {
          titre: "Article 1 : Définition",
          page: 7,
          source: "temps",
          idContenu: 1,
          mots_cles: ["travail effectif", "arrêt maladie", "position d'activité", "1607h", "jours travaillés", "jours fériés", "repos hebdo", "solidarité"]
        },
        {
          titre: "Article 2 : Les durées du temps de travail",
          page: 7,
          source: "temps",
          idContenu: 1,
          mots_cles: ["cycles hebdomadaires", "annualisation", "jours non travaillés", "JNT", "temps de travail", "crèches", "37h", "38h"]
        },
        {
          titre: "Article 3 : Les plages fixes et plages de souplesse",
          page: 8,
          source: "temps",
          idContenu: 1,
          mots_cles: ["plages fixes", "plages souplesse", "horaires variables", "présence obligatoire", "planning", "flexibilité", "pause méridienne", "présentiel"]
        },
        {
          titre: "Article 4 : Les garanties minimales",
          page: 9,
          source: "temps",
          idContenu: 1,
          mots_cles: ["repos quotidien", "repos hebdomadaire", "pause", "amplitude", "travail de nuit", "décret 2000-815", "dérogations", "service public"]
        },
        {
          titre: "Article 5 : Heures supplémentaires et complémentaires",
          page: 9,
          source: "temps",
          idContenu: 1,
          mots_cles: ["heures supplémentaires", "majoration", "récupération", "dimanche", "nuit", "formulaire", "agents B et C", "25 heures"]
        },
        {
          titre: "Article 6 : Le temps partiel",
          page: 10,
          source: "temps",
          idContenu: 1,
          mots_cles: ["temps partiel", "quotité", "temps partiel de droit", "temps partiel sur autorisation", "rémunération", "congés", "retraite", "surcotisation"]
        },
        {
          titre: "Article 7 : La journée de solidarité",
          page: 14,
          source: "temps",
          idContenu: 1,
          mots_cles: ["solidarité", "7h", "fractionnement", "RTT", "jour férié", "congés", "modalités", "temps partiel"]
        },
        {
          titre: "Article 8 : Les astreintes et permanences",
          page: 15,
          source: "temps",
          idContenu: 1,
          mots_cles: ["astreinte", "permanence", "intervention", "rémunération", "repos compensateur", "logement", "sécurité", "filière technique"]
        },
        {
          titre: "Article 9 : Les sujétions particulières",
          page: 17,
          source: "temps",
          idContenu: 1,
          mots_cles: ["sujétions", "travail de nuit", "dimanche", "jours fériés", "compensation", "cycles", "barème", "impact santé"]
        }
      ]
    },
    {
      titre: "Chapitre 2 : Les congés",
      page: 19,
      source: "temps",
      idContenu: 2,
      icone: "🏖️",
      mots_cles: [
        "congés annuels", "congé bonifié", "ARTT", "don de jours", "CET",
        "congés naissance", "fractionnement", "jours fériés", "temps partiel", "report",
        "RTT", "vacances"
      ],
      articles: [
        {
          titre: "Article 1 : Les congés annuels",
          page: 19,
          source: "temps",
          idContenu: 2,
          mots_cles: ["jours ouvrés", "planning", "fractionnement", "report", "priorité", "vacances scolaires", "temps partiel", "31 décembre"]
        },
        {
          titre: "Article 2 : Le congé bonifié",
          page: 23,
          source: "temps",
          idContenu: 2,
          mots_cles: ["outre-mer", "fonctionnaires", "Guadeloupe", "Réunion", "conditions", "décret 2020-851", "durée", "transport"]
        },
        {
          titre: "Article 3 : Les jours d'A.R.T.T",
          page: 24,
          source: "temps",
          idContenu: 2,
          mots_cles: ["RTT", "compensation", "quotité", "cycle", "absence", "réduction", "prise", "déduction"]
        },
        {
          titre: "Article 4 : Les dons de jours de repos",
          page: 27,
          source: "temps",
          idContenu: 2,
          mots_cles: ["don jours", "RTT", "congé annuel", "enfant malade", "aide familiale", "justificatif", "congé solidaire", "31 jours"]
        },
        {
          titre: "Article 5 : Le Compte Épargne Temps",
          page: 27,
          source: "temps",
          idContenu: 2,
          mots_cles: ["CET", "alimentation", "jours non pris", "formulaire", "ouverture", "indemnisation", "retraite", "report"]
        },
        {
          titre: "Article 6 : Les congés liés aux naissances",
          page: 29,
          source: "temps",
          idContenu: 2,
          mots_cles: ["congé maternité", "congé paternité", "durée", "hospitalisation", "naissance", "temps partiel", "indemnisation", "certificat"]
        }
      ]
    },
    {
      titre: "Chapitre 3 : Autorisations spéciales d'absence",
      page: 31,
      source: "temps",
      idContenu: 3,
      icone: "📅",
      mots_cles: [
        "autorisation absence", "absence autorisée", "fête religieuse", "garde enfant malade",
        "proche aidant", "décès", "mariage", "PACS", "rentrée scolaire", "consultation médicale",
        "deuil", "permis de conduire", "raison personnelle", "demande autorisation",
        "absence autorisée", "motif", "justification"
      ],
      articles: [
        {
          titre: "Article 1 : Fêtes religieuses",
          page: 31,
          source: "temps",
          idContenu: 3,
          mots_cles: ["religion", "calendrier", "musulmane", "juive", "chrétienne", "orthodoxe", "préfecture", "jours fériés"]
        },
        {
          titre: "Article 2 : Pour garde d'enfant malade",
          page: 31,
          source: "temps",
          idContenu: 3,
          mots_cles: ["garde enfant", "nourrice", "maladie", "école fermée", "grève", "école en grève", "fermée grève", "RTT", "conjoint", "quotité", "âge", "plafond"]
        },
        {
          titre: "Article 3 : Pour prodiguer des soins ou assister un malade",
          page: 33,
          source: "temps",
          idContenu: 3,
          mots_cles: ["soins", "maladie", "ascendants", "enfant", "jours ouvrés", "certificat médical", "temps partiel", "justificatif"]
        },
        {
          titre: "Article 4 : Pour accompagner une personne en fin de vie : Congé proche aidant",
          page: 33,
          source: "temps",
          idContenu: 3,
          mots_cles: ["proche aidant", "AJPA", "pathologie", "fin de vie", "temps partiel", "certificat", "ascendants", "absence non rémunérée", "congé spécifique"]
        },
        {
          titre: "Article 5 : En cas de décès d'un membre de la famille",
          page: 34,
          source: "temps",
          idContenu: 3,
          mots_cles: ["décès", "famille", "jours", "frère", "sœur", "oncle", "conjoint", "enfant"]
        },
        {
          titre: "Article 6 : À l'occasion d'un mariage ou pacs",
          page: 35,
          source: "temps",
          idContenu: 3,
          mots_cles: ["mariage", "pacs", "congé exceptionnel", "durée", "partenaire", "cérémonie", "justificatif", "conjoint"]
        },
        {
          titre: "Article 7 : Absence liée à la maternité",
          page: 35,
          source: "temps",
          idContenu: 3,
          mots_cles: ["absence maternité", "mère", "bébé", "accouchement", "congé spécifique", "temps plein", "certificat médical", "suspension"]
        },
        {
          titre: "Article 8 : Pour une consultation médicale",
          page: 35,
          source: "temps",
          idContenu: 3,
          mots_cles: ["consultation", "médical", "autorisée", "temps partiel", "justificatif", "maternité", "rendez-vous", "absence"]
        },
        {
          titre: "Article 9 : Rentrée Scolaire",
          page: 36,
          source: "temps",
          idContenu: 3,
          mots_cles: ["rentrée scolaire", "enfants", "parents", "congés", "autorisation", "école", "présence", "temps partiel"]
        },
        {
          titre: "Article 10 : Déménagement",
          page: 36,
          source: "temps",
          idContenu: 3,
          mots_cles: ["déménagement", "demenagement", "changement domicile", "autorisation", "jour", "préavis", "mutation", "justificatif", "personnel"]
        },
        {
          titre: "Article 11 : Formation",
          page: 36,
          source: "temps",
          idContenu: 3,
          mots_cles: ["formation", "stage", "autorisation absence", "présence obligatoire", "plan de formation", "inscription", "temps de travail", "congé"]
        }
      ]
    },
    {
      titre: "Chapitre 4 : Les absences pour maladies et accidents",
      page: 38,
      source: "temps",
      idContenu: 4,
      icone: "🏥",
      mots_cles: [
        "maladie", "accident travail", "accident trajet", "rémunération",
        "arrêt", "CLM", "CLD", "prise en charge", "pénibilité", "accident service"
      ],
      articles: [
        {
          titre: "Article 1 : La maladie",
          page: 38,
          source: "temps",
          idContenu: 4,
          mots_cles: ["arrêt maladie", "congé maladie", "rémunération", "justificatif"]
        },
        {
          titre: "Article 2 : Accidents de service et de trajet",
          page: 41,
          source: "temps",
          idContenu: 4,
          mots_cles: ["accident service", "accident trajet", "déclaration"]
        }
      ]
    },

    // ========== DOMAINE: FORMATION ==========
    {
      titre: "Chapitre 5 : Le règlement formation",
      page: 45,
      source: "formation",
      idContenu: 5,
      icone: "🎓",
      mots_cles: [
        "formation", "plan de formation", "CNFPT", "formation obligatoire",
        "formation professionnelle", "compétences", "qualification", "concours",
        "VAE", "CPF", "bilan de compétences", "développement professionnel", "carrière",
        "stage", "apprentissage", "certification", "diplôme"
      ],
      articles: [
        {
          titre: "Section 1 : Droit à la formation",
          page: 45,
          source: "formation",
          idContenu: 5,
          mots_cles: ["droit formation", "agents stagiaires", "agents titulaires", "continuité service"]
        },
        {
          titre: "Section 3 : Formations obligatoires",
          page: 47,
          source: "formation",
          idContenu: 5,
          mots_cles: ["formation intégration", "professionnalisation", "premier emploi", "hygiène sécurité"]
        },
        {
          titre: "Section 4 : Formations non obligatoires",
          page: 48,
          source: "formation",
          idContenu: 5,
          mots_cles: ["préparation concours", "examens professionnels", "REP", "perfectionnement"]
        },
        {
          titre: "Section 5 : Congés formation",
          page: 49,
          source: "formation",
          idContenu: 5,
          mots_cles: ["congé formation professionnelle", "bilan compétences", "VAE", "transition"]
        },
        {
          titre: "Section 6 : Compte Personnel d'Activité",
          page: 50,
          source: "formation",
          idContenu: 5,
          icone: "💳",
          mots_cles: ["CPF", "compte personnel formation", "CEC", "heures formation"]
        }
      ]
    },

    // ========== DOMAINE: TÉLÉTRAVAIL ==========
    {
      titre: "Chapitre 6 : Le protocole télétravail",
      page: 55,
      source: "teletravail",
      idContenu: 6,
      icone: "💻",
      mots_cles: [
        "télétravail", "travail distance", "domicile", "technologies information",
        "conciliation vie privée", "bien être", "management confiance", "empreinte écologique",
        "conditions travail", "flexibilité", "déconnexion", "outils", "internet",
        "forfait annuel", "forfait", "jours télétravail", "3 jours maximum", "4 jours fixes", "15 jours"
      ],
      articles: [
        {
          titre: "Section 1 : Préambule et principes",
          page: 55,
          source: "teletravail",
          idContenu: 6,
          mots_cles: ["définition télétravail", "volontariat", "accord hiérarchique", "réversibilité"]
        },
        {
          titre: "Section 3 : Procédure de demande",
          page: 57,
          source: "teletravail",
          idContenu: 6,
          mots_cles: ["demande écrite", "modalités organisation", "jour semaine", "lieu exercice"]
        },
        {
          titre: "Section 4 : Durée du télétravail",
          page: 58,
          source: "teletravail",
          idContenu: 6,
          mots_cles: ["durée autorisation", "4 jours fixes", "forfait annuel", "3 jours maximum", "forfait", "15 jours", "jours télétravail"]
        },
        {
          titre: "Section 7 : Outils du télétravail",
          page: 61,
          source: "teletravail",
          idContenu: 6,
          icone: "🛠️",
          mots_cles: ["matériel informatique", "internet haut débit", "kit ergonomique"]
        },
        {
          titre: "Section 10 : Prise en charge des coûts",
          page: 64,
          source: "teletravail",
          idContenu: 6,
          mots_cles: ["indemnisation", "frais", "abonnement internet", "transport"]
        }
      ]
    }
  ]
};

// ========== FONCTION DE RECHERCHE UNIFIÉE ==========

export interface ContexteResult {
  contexte: string;
  source: "temps" | "formation" | "teletravail";
  chapitres: Array<{ titre: string; numChapitre: number }>;
}

const nettoyerChaine = (chaine: unknown): string => {
  if (typeof chaine !== "string") return "";
  return chaine
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, "")
    .trim();
};

export function trouverContextePertinent(
  question: string,
  chapitres: { temps: Record<number, string>; formation: Record<number, string>; teletravail: Record<number, string> }
): ContexteResult {
  const qNet = nettoyerChaine(question);
  const mots = qNet.split(/\s+/).filter(Boolean);
  
  const scores = new Map<string, number>();

  sommaire.chapitres.forEach((chap) => {
    let score = 0;
    const keys = [
      ...(chap.mots_cles || []),
      ...(chap.articles?.flatMap((a) => a.mots_cles) || [])
    ];

    keys.forEach((mc: string) => {
      const m = nettoyerChaine(mc);
      if (mots.includes(m)) {
        score += 10;
      } else if (qNet.includes(m)) {
        score += 5;
      }
    });

    if (score) {
      const cle = `${chap.source}_${chap.idContenu}`;
      scores.set(cle, (scores.get(cle) || 0) + score);
    }
  });

  const topScores = Array.from(scores.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  if (topScores.length === 0) {
    return {
      contexte: "Aucun chapitre spécifique trouvé. Domaines disponibles : Temps de travail, Formation, Télétravail",
      source: "temps",
      chapitres: []
    };
  }

  const source = topScores[0][0].split("_")[0] as "temps" | "formation" | "teletravail";
  const contenuChapitre = chapitres[source];
  
  const contexte = topScores
    .map(([cle]) => {
      const [srcType, idStr] = cle.split("_");
      const id = parseInt(idStr);
      const chap = sommaire.chapitres.find((c) => c.source === srcType && c.idContenu === id);
      const contenu = contenuChapitre[id] || "";
      return `Source: ${chap?.titre || `Chapitre ${id}`}\nContenu: ${contenu}`;
    })
    .join("\n\n---\n\n");

  const chapitresResult = topScores.map(([cle]) => {
    const [srcType, idStr] = cle.split("_");
    const id = parseInt(idStr);
    const chap = sommaire.chapitres.find((c) => c.source === srcType && c.idContenu === id);
    return {
      titre: chap?.titre || `Chapitre ${id}`,
      numChapitre: id
    };
  });

  return {
    contexte,
    source,
    chapitres: chapitresResult
  };
}
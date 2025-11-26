import type React from "react";
import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import {
  Clock,
  Users,
  Phone,
  Mail,
  MapPin,
  Send,
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  Scale,
  Bot,
  HelpCircle,
  Mic,
  MicOff,
  FileText,
  ChevronRight,
  Zap,
  Shield,
  TrendingUp,
  CheckCircle,
  Info,
  Search,
  X,
} from "lucide-react";

import { sommaire } from "./data/sommaire.ts";
import { chapitres } from "./data/temps.ts";
import { infoItems } from "./data/info-data.ts";
import { podcastEpisodes, type PodcastEpisode } from "./data/podcasts/mp3.ts";
import { faqData } from "./data/FAQ.ts";
import { sommaires } from "./data/sommaires.ts";
import { chapitres as chapitresPrimes } from "./data/primes.ts";
import { ifse1Data, ifse2Data, getIFSE1ByFunction, getIFSE2ByJob, getFunctionsByCategory, getDirectionFullName } from "./data/rifseep-data.ts";
import { callPerplexityAPI } from "./lib/callPerplexity";
import { searchInternalDocs, searchInternalDocsWithNumber } from "./lib/unifiedSearch";

interface ChatMessage {
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}
interface InfoItem {
  id: number;
  title: string;
  content: string;
}
interface ChatbotState {
  currentView: "menu" | "chat" | "faq";
  selectedDomain: number | null;
  messages: ChatMessage[];
  isProcessing: boolean;
}
interface FAQItem {
  id: number;
  question: string;
  reponse: string;
}

// ✅ Configuration pour le développement
const isDevelopment = import.meta.env.DEV;

// Réduction de la verbosité des logs :
// - Par défaut, on garde les warnings/erreurs visibles,
// - mais on neutralise console.log / console.debug sauf si
//   la variable d'environnement VITE_VERBOSE_LOGS est définie (utile en DEV).
const VERBOSE_LOGS = Boolean(import.meta.env.DEV && import.meta.env.VITE_VERBOSE_LOGS);
if (!VERBOSE_LOGS) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, no-console
  console.log = (..._args: any[]) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function, no-console
  console.debug = (..._args: any[]) => {};
}

const fluxOriginal = "https://www.franceinfo.fr/politique.rss";
// Utilisation d'un proxy CORS alternatif
const proxyUrl = "https://api.allorigins.win/raw?url=";
const FLUX_ACTUALITES_URL = proxyUrl + encodeURIComponent(fluxOriginal);

const actualitesSecours = [
  { title: "Réforme des retraites : nouvelles négociations prévues", link: "#", pubDate: new Date().toISOString(), guid: "1" },
  { title: "Budget 2024 : les principales mesures votées", link: "#", pubDate: new Date().toISOString(), guid: "2" },
  { title: "Fonction publique : accord sur les salaires", link: "#", pubDate: new Date().toISOString(), guid: "3" },
  { title: "Télétravail : nouvelles directives gouvernementales", link: "#", pubDate: new Date().toISOString(), guid: "4" },
  { title: "Dialogue social : rencontre avec les syndicats", link: "#", pubDate: new Date().toISOString(), guid: "5" },
];

const sommaireData = JSON.parse(sommaire);
const sommairesData = JSON.parse(sommaires);

const nettoyerChaine = (chaine: unknown): string => {
  if (typeof chaine !== "string") return "";
  return chaine
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, "")
    .trim();
};

// Détecte si la question vise le forfait télétravail (nombre de jours)
const isForfaitQuestion = (question: string): boolean => {
  if (!question) return false;
  const q = question.toLowerCase();
  // Variantes courantes
  const hasForfait = /forfait/.test(q);
  const asksNumber = /combien|nombre|jours|ai droit|droit|donn?e?s?|quotité/.test(q);
  return hasForfait && asksNumber;
};

// =======================
//  NewsTicker avec <a>
// =======================
const NewsTicker: React.FC = () => {
  const [actualites, setActualites] = useState(actualitesSecours);
  const [loading, setLoading] = useState(true);

  // Fonction pour générer un lien via le proxy
  const proxyLink = (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

  useEffect(() => {
    const chargerFlux = async () => {
      try {
        console.log('🔄 Tentative de chargement du flux RSS:', FLUX_ACTUALITES_URL);
        const res = await fetch(FLUX_ACTUALITES_URL);
        
        if (!res.ok) {
          console.error('❌ Erreur HTTP:', res.status, res.statusText);
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        
        const xml = await res.text();
        console.log('✅ RSS reçu, taille:', xml.length, 'caractères');
        
        const doc = new DOMParser().parseFromString(xml, "text/xml");
        
        // Vérifier s'il y a des erreurs de parsing
        const parserError = doc.querySelector("parsererror");
        if (parserError) {
          console.error('❌ Erreur de parsing XML:', parserError.textContent);
          throw new Error("Erreur de parsing XML");
        }

        const items = Array.from(doc.querySelectorAll("item"))
          .slice(0, 10)
          .map((item, i) => {
            const rawLink = item.querySelector("link")?.textContent || "";
            const link = rawLink.replace(/\s+/g, " ").trim();

            return {
              title: (item.querySelector("title")?.textContent || `Actualité ${i + 1}`).trim(),
              link,
              pubDate: (item.querySelector("pubDate")?.textContent || new Date().toISOString()).trim(),
              guid: (item.querySelector("guid")?.textContent || `${i}`).trim(),
            };
          });

        console.log('📰 Articles trouvés:', items.length);
        if (items.length) {
          setActualites(items);
          console.log('✅ Flux RSS chargé avec succès');
        } else {
          console.warn('⚠️ Aucun article trouvé dans le flux RSS');
        }
      } catch (error) {
        console.error('❌ Échec du chargement du flux RSS:', error);
        console.log('🔄 Utilisation des données de secours');
      } finally {
        setLoading(false);
      }
    };
    chargerFlux();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 bg-blue-900/80 rounded-lg">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
        <span className="ml-2 text-white text-base font-medium">Chargement des actualités...</span>
      </div>
    );
  }

  return (
    <div className="w-full backdrop-blur-xl bg-white/10 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
      <div className="flex items-center whitespace-nowrap py-8 ticker-container">
        <div className="flex animate-ticker hover:[animation-play-state:paused]">
          {[...actualites, ...actualites].map((item, idx) => (
            <a
              key={`${item.guid}-${idx}`}
              href={proxyLink(item.link)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center mx-12 text-white/90 hover:text-white transition-all duration-300 no-underline"
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity" />
                <div className="relative w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm">📰</span>
                </div>
              </div>
              <span className="ml-4 font-semibold text-lg group-hover:text-blue-200 transition-colors">{item.title}</span>
              <div className="mx-8 w-2 h-2 bg-white/40 rounded-full group-hover:bg-white/60 transition-colors"></div>
            </a>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-container { overflow: hidden; white-space: nowrap; }
          .animate-ticker { display: inline-flex; animation: ticker 45s linear infinite; }
        `
      }} />
    </div>
  );
};

// =======================
// FAQ Component
// =======================
const FAQSection: React.FC<{ onReturn: () => void }> = ({ onReturn }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFAQ, setSelectedFAQ] = useState<FAQItem | null>(null);

  const filteredFAQ = faqData.filter((item) =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.reponse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={onReturn} 
              className="text-white hover:text-orange-200 p-3 rounded-full hover:bg-white/10 transition-all duration-200 group"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-2 bg-white/20 rounded-full blur-lg opacity-50" />
                <div className="relative w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
              </div>
          <div>
                <h3 className="text-2xl font-bold text-white">FAQ - Questions fréquentes</h3>
                <p className="text-orange-100 text-sm mt-1">Télétravail et Formation - Ville de Gennevilliers</p>
          </div>
        </div>
          </div>
          <div className="text-right">
            <div className="text-white/90 text-sm font-medium">CFDT Gennevilliers</div>
            <div className="text-orange-200 text-xs">Support syndical</div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-gradient-to-b from-white/5 to-white/10">
        {/* Modern Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-lg" />
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-white/60" />
              </div>
          <input
            type="text"
            placeholder="Rechercher une question ou réponse..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
          />
            </div>
          </div>
        </div>

        {/* Modern FAQ Detail Modal */}
        {selectedFAQ && (
          <div className="mb-8 relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10" />
            <div className="relative p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {selectedFAQ.id}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{selectedFAQ.question}</h4>
                  </div>
                </div>
            <button
              onClick={() => setSelectedFAQ(null)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 text-white hover:text-red-300"
            >
                  <X className="w-6 h-6" />
            </button>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <p className="text-white/90 leading-relaxed">{selectedFAQ.reponse}</p>
              </div>
            </div>
          </div>
        )}

        {/* Modern FAQ List */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {filteredFAQ.map((faq) => (
            <div
              key={faq.id}
              className="group relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl hover:bg-white/15 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
              onClick={() => setSelectedFAQ(faq)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-6">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {faq.id}
                    </div>
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-white mb-2 group-hover:text-orange-200 transition-colors duration-300">
                    {faq.question}
                  </h4>
                    <p className="text-sm text-white/70 truncate">
                    {faq.reponse.substring(0, 120)}...
                  </p>
                    <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs text-orange-300 font-medium">Cliquez pour voir la réponse</span>
                      <ChevronRight className="w-4 h-4 text-orange-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredFAQ.length === 0 && (
            <div className="text-center py-12">
              <div className="relative inline-block mb-6">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-xl opacity-30" />
                <div className="relative w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
                  <HelpCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <p className="text-white/70 text-lg">Aucune question trouvée pour "{searchTerm}"</p>
              <p className="text-white/50 text-sm mt-2">Essayez avec d'autres mots-clés</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// =======================
//  Trouver contexte (LEGACY - remplacé par unifiedSearch)
// =======================
/* eslint-disable @typescript-eslint/no-unused-vars */
const _trouverContextePertinent = (question: string): string => {
  const qNet = nettoyerChaine(question);
  const mots = qNet.split(/\s+/).filter(Boolean);
  const scores = new Map<number, number>();

  console.log('🔍 Recherche contexte temps de travail pour:', question);
  console.log('🔍 Mots analysés:', mots);

  // Étape 1: Recherche dans sommaire.ts pour identifier les chapitres pertinents
  sommaireData.chapitres.forEach((chap: any, i: number) => {
    let score = 0;
    
    // Recherche dans les mots-clés du chapitre principal
    const motsClesChap = chap.mots_cles || [];
    console.log(`📖 Chapitre ${i + 1} "${chap.titre}" - Mots-clés:`, motsClesChap);
    
    motsClesChap.forEach((mc: string) => {
      const m = nettoyerChaine(mc);
      // Score exact élevé pour correspondance directe
      if (mots.some(mot => mot === m)) {
        score += 20;
        console.log(`✅ Match exact: "${mc}" -> +20`);
      }
      // Score moyen pour inclusion
      else if (qNet.includes(m) && m.length > 2) {
        score += 12;
        console.log(`🔸 Match partiel: "${mc}" -> +12`);
      }
      // Score pour mots proches
      else if (question.toLowerCase().includes(mc.toLowerCase()) && mc.length > 3) {
        score += 8;
        console.log(`🔹 Match approximatif: "${mc}" -> +8`);
      }
    });
    
    // Recherche dans les articles du chapitre
    const articles = chap.articles || [];
    articles.forEach((article: any) => {
      const motsClesArt = article.mots_cles || [];
      console.log(`  📄 Article "${article.titre}" - Mots-clés:`, motsClesArt);
      
      motsClesArt.forEach((mc: string) => {
        const m = nettoyerChaine(mc);
        if (mots.some(mot => mot === m)) {
          score += 15;
          console.log(`  ✅ Match article exact: "${mc}" -> +15`);
        }
        else if (qNet.includes(m) && m.length > 2) {
          score += 8;
          console.log(`  🔸 Match article partiel: "${mc}" -> +8`);
        }
        else if (question.toLowerCase().includes(mc.toLowerCase()) && mc.length > 3) {
          score += 5;
          console.log(`  🔹 Match article approximatif: "${mc}" -> +5`);
        }
      });
      
      // Bonus pour titre d'article correspondant
      if (article.titre && question.toLowerCase().includes(article.titre.toLowerCase())) {
        score += 25;
        console.log(`  🎯 Match titre article: "${article.titre}" -> +25`);
      }
    });
    
    // Bonus spécial pour correspondances importantes
    if (question.toLowerCase().includes('déménagement') || question.toLowerCase().includes('demenagement')) {
      if (chap.articles?.some((a: any) => a.titre?.toLowerCase().includes('déménagement')) || 
          chap.titre?.toLowerCase().includes('déménagement')) {
        score += 30;
        console.log(`🏠 Bonus déménagement -> +30`);
      }
    }
    
    if (question.toLowerCase().includes('congé')) {
      if (chap.titre?.toLowerCase().includes('congé') || 
          chap.articles?.some((a: any) => a.titre?.toLowerCase().includes('congé'))) {
        score += 25;
        console.log(`🏖️ Bonus congé -> +25`);
      }
    }
    
    if (question.toLowerCase().includes('heure') || question.toLowerCase().includes('1607')) {
      if (chap.titre?.toLowerCase().includes('durée') || 
          chap.titre?.toLowerCase().includes('heure') ||
          motsClesChap.some((mc: string) => mc.includes('1607') || mc.includes('heure'))) {
        score += 25;
        console.log(`⏰ Bonus heures -> +25`);
      }
    }
    
    if (score > 0) {
      scores.set(i + 1, score);
      console.log(`📚 Chapitre ${i + 1} "${chap.titre}" - Score total: ${score}`);
    }
  });

  if (!scores.size) {
    console.log('⚠️ Aucun chapitre spécifique trouvé pour temps de travail');
    return "Aucun chapitre spécifique trouvé. Thèmes disponibles : " + sommaireData.chapitres.map((c: any) => c.titre).join(", ");
  }

  // Étape 2: Sélectionner les meilleurs chapitres et récupérer le contenu depuis temps.ts
  const sortedScores = Array.from(scores.entries()).sort(([, a], [, b]) => b - a);
  const significantChapters = sortedScores.filter(([, score]) => score >= 8); // Seuil plus élevé
  const topChapters = significantChapters.slice(0, 2); // Réduire à 2 pour plus de précision
  
  console.log('🏆 Meilleurs chapitres sélectionnés:', topChapters);

  const contextes = topChapters.map(([id, score]) => {
    const titre = sommaireData.chapitres[id - 1].titre;
    const contenu = (chapitres as Record<number, string>)[id] || "";
    console.log(`📝 Contenu chapitre ${id} (${titre.substring(0, 50)}...):`, contenu.substring(0, 200) + "...");
    return `Source: ${titre} (Score: ${score})\nContenu: ${contenu}`;
  });

  const resultat = contextes.join("\n\n---\n\n");
  console.log('🎯 Contexte final généré, longueur:', resultat.length);
  
  return resultat;
};

// =======================
//  Trouver contexte PRIMES
// =======================
const _trouverContextePertinentPrimes = (question: string): string => {
  const qNet = nettoyerChaine(question);
  const mots = qNet.split(/\s+/).filter(Boolean);
  const scores = new Map<number, number>();

  console.log('� Recherche contexte primes pour:', question);
  console.log('🔍 Mots analysés:', mots);

  // === RECHERCHE DANS LES DONNÉES RIFSEEP ===
  let contextRIFSEEP = "";
  
  // Recherche dans IFSE 1 (barème par fonction)
  const questionLower = question.toLowerCase();
  
  // Recherche par catégorie
  if (questionLower.includes('catégorie') || questionLower.includes('categorie')) {
    const categorieMatch = questionLower.match(/catégorie?\s*([abc])/i);
    if (categorieMatch) {
      const category = categorieMatch[1].toUpperCase() as 'A' | 'B' | 'C';
      const functionsForCategory = getFunctionsByCategory(category);
      
      contextRIFSEEP += `**RIFSEEP - Barème IFSE 1 - Catégorie ${category}**\n\n`;
      functionsForCategory.forEach(func => {
        const data = getIFSE1ByFunction(category, func.function);
        if (data) {
          contextRIFSEEP += `• ${data.function} (${data.functionCode}) : ${data.monthlyAmount}€/mois (${data.annualAmount}€/an) - Mise en œuvre ${data.implementationYear}\n`;
        }
      });
      contextRIFSEEP += "\n";
    }
  }
  
  // Recherche par fonction/poste
  const motsFonctions = ['directeur', 'chef', 'responsable', 'adjoint', 'gestionnaire', 'technicien', 'ingénieur', 'chargé', 'assistant', 'animateur', 'agent', 'secrétaire', 'infirmier'];
  const fonctionTrouvee = motsFonctions.find(mot => questionLower.includes(mot));
  
  if (fonctionTrouvee) {
    console.log(`🔍 Fonction détectée: ${fonctionTrouvee}`);
    
    // Recherche dans IFSE 1
    const ifse1Matches = ifse1Data.filter(item => 
      item.function.toLowerCase().includes(fonctionTrouvee)
    );
    
    if (ifse1Matches.length > 0) {
      contextRIFSEEP += `**RIFSEEP - IFSE 1 pour "${fonctionTrouvee}"**\n\n`;
      ifse1Matches.forEach(item => {
        contextRIFSEEP += `• Catégorie ${item.category} - ${item.function} : ${item.monthlyAmount}€/mois (${item.annualAmount}€/an)\n`;
        contextRIFSEEP += `  Code: ${item.functionCode} - Mise en œuvre: ${item.implementationYear}\n\n`;
      });
    }
    
    // Recherche dans IFSE 2
    const ifse2Matches = getIFSE2ByJob(fonctionTrouvee);
    
    if (ifse2Matches.length > 0) {
      contextRIFSEEP += `**RIFSEEP - IFSE 2 pour "${fonctionTrouvee}"**\n\n`;
      ifse2Matches.forEach(item => {
        contextRIFSEEP += `• ${item.motif} : ${item.amount}€\n`;
        contextRIFSEEP += `  Direction: ${getDirectionFullName(item.direction)} - Service: ${item.service}\n`;
        contextRIFSEEP += `  Postes concernés: ${item.jobs.join(', ')}\n\n`;
      });
    }
  }
  
  // Recherche par direction
  const motsDirections = ['dms', 'dpo', 'drh', 'daj', 'dsi', 'dccs', 'ddu', 'dmru', 'dpe', 'dme', 'dess', 'dmsp', 'dcj', 'dsa', 'daf'];
  const directionTrouvee = motsDirections.find(mot => questionLower.includes(mot));
  
  if (directionTrouvee) {
    console.log(`🏢 Direction détectée: ${directionTrouvee.toUpperCase()}`);
    
    const ifse2Direction = ifse2Data.filter(item => 
      item.direction.toLowerCase() === directionTrouvee.toLowerCase()
    );
    
    if (ifse2Direction.length > 0) {
      contextRIFSEEP += `**RIFSEEP - IFSE 2 pour la direction ${getDirectionFullName(directionTrouvee.toUpperCase())}**\n\n`;
      ifse2Direction.forEach(item => {
        contextRIFSEEP += `• ${item.motif} : ${item.amount}€\n`;
        contextRIFSEEP += `  Service: ${item.service}\n`;
        contextRIFSEEP += `  Postes: ${item.jobs.join(', ')}\n\n`;
      });
    }
  }
  
  // Recherche par type de prime
  const typesPrimes = ['accueil', 'technicité', 'chef', 'informatique', 'responsabilité', 'encadrement', 'sujétion', 'intérim'];
  const typePrimeTrouve = typesPrimes.find(type => questionLower.includes(type));
  
  if (typePrimeTrouve) {
    console.log(`💸 Type de prime détecté: ${typePrimeTrouve}`);
    
    const primesType = ifse2Data.filter(item => 
      item.motif.toLowerCase().includes(typePrimeTrouve)
    );
    
    if (primesType.length > 0) {
      contextRIFSEEP += `**RIFSEEP - Primes "${typePrimeTrouve}"**\n\n`;
      primesType.forEach(item => {
        contextRIFSEEP += `• ${item.motif} : ${item.amount}€\n`;
        contextRIFSEEP += `  ${getDirectionFullName(item.direction)} - ${item.service}\n`;
        contextRIFSEEP += `  Postes: ${item.jobs.join(', ')}\n\n`;
      });
    }
  }
  
  // === RECHERCHE DANS LES DOCUMENTS GÉNÉRAUX ===
  sommairesData.chapitres.forEach((chap: any, i: number) => {
    let score = 0;
    const keys = [...(chap.mots_cles || [])];
    
    keys.forEach((mc: string) => {
      const m = nettoyerChaine(mc);
      if (mots.includes(m)) score += 15;
      else if (qNet.includes(m)) score += 8;
      else if (question.toLowerCase().includes(mc.toLowerCase())) score += 5;
    });
    
    if (score > 0) {
      scores.set(i + 1, score);
      console.log(`📚 Chapitre ${i + 1} "${chap.titre}" - Score: ${score}`);
    }
  });

  // === CONSTRUCTION DE LA RÉPONSE ===
  let contexteFinal = "";
  
  // Ajouter le contexte RIFSEEP en priorité
  if (contextRIFSEEP) {
    contexteFinal += "=== DONNÉES RIFSEEP SPÉCIFIQUES ===\n\n" + contextRIFSEEP + "\n";
  }
  
  // Ajouter les documents généraux si pertinents
  if (scores.size > 0) {
    const sortedScores = Array.from(scores.entries()).sort(([, a], [, b]) => b - a);
    const significantChapters = sortedScores.filter(([, score]) => score >= 5);
    const topChapters = significantChapters.slice(0, 2); // Limiter à 2 pour éviter la surcharge
    
    console.log('🏆 Meilleurs chapitres primes sélectionnés:', topChapters);

    if (topChapters.length > 0) {
      contexteFinal += "=== DOCUMENTS GÉNÉRAUX COMPLÉMENTAIRES ===\n\n";
      
      const documentsGeneraux = topChapters.map(([id, score]) => {
        const titre = sommairesData.chapitres[id - 1].titre;
        const contenu = (chapitresPrimes as Record<number, string>)[id] || "";
        return `Source: ${titre} (Score: ${score})\nContenu: ${contenu}`;
      });
      
      contexteFinal += documentsGeneraux.join("\n\n---\n\n");
    }
  }
  
  // Si aucun contexte trouvé
  if (!contexteFinal) {
    console.log('⚠️ Aucune information spécifique trouvée pour primes');
    return "Aucune information spécifique trouvée. Thèmes disponibles dans RIFSEEP : IFSE 1 (barème par fonction), IFSE 2 (primes spécifiques), ou consultez les documents généraux.";
  }
  
  console.log('📄 Contexte primes final généré, taille:', contexteFinal.length);
  return contexteFinal;
};

// =======================
// Podcast Player
// =======================
const PodcastPlayer: React.FC = () => {
  const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMinimized, setIsMinimized] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setError(null);

    const updateTime = () => setCurrentTime(audio.currentTime || 0);
    const updateDuration = () => {
      if (audio.duration && isFinite(audio.duration)) setDuration(audio.duration);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      const currentIndex = podcastEpisodes.findIndex((e) => e.id === currentEpisode?.id);
      if (currentIndex !== -1 && currentIndex < podcastEpisodes.length - 1) {
        setCurrentEpisode(podcastEpisodes[currentIndex + 1]);
      }
    };
    const handleError = () => {
      setIsPlaying(false);
      setError("Impossible de charger ce podcast. Vérifiez votre connexion.");
    };

    const handlers: { [key: string]: EventListener } = {
      timeupdate: updateTime,
      loadedmetadata: updateDuration,
      canplay: () => {},
      ended: handleEnded,
      error: handleError,
      loadstart: () => {},
      waiting: () => {},
      playing: () => {
        setIsPlaying(true);
      },
      pause: () => setIsPlaying(false),
    };

    Object.entries(handlers).forEach(([evt, fn]) => audio.addEventListener(evt, fn));
    audio.volume = volume;
    if (currentEpisode) audio.load();

    return () => {
      Object.entries(handlers).forEach(([evt, fn]) => audio.removeEventListener(evt, fn));
    };
  }, [currentEpisode, volume]);

  const playPause = async () => {
    const audio = audioRef.current;
    if (!audio || !currentEpisode) return;
    try {
      if (isPlaying) {
        audio.pause();
      } else {
        setError(null);
        await audio.play();
      }
    } catch (err) {
      console.error("Error playing audio:", err);
      setError("Impossible de lire ce podcast.");
      setIsPlaying(false);
    }
  };

  const selectEpisode = (episode: PodcastEpisode) => {
    if (currentEpisode?.id !== episode.id) {
      setCurrentEpisode(episode);
      setIsPlaying(false);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (!timeInSeconds || isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className={`fixed right-4 bottom-20 z-50 transition-all duration-300 ${isMinimized ? "w-48 h-14" : "w-80 h-auto"}`}>
      <div className="flex flex-col bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-xl shadow-lg border border-purple-500/30 overflow-hidden p-2">
        
        {/* --- Barre haute (minimisée ou étendue) --- */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white p-1.5 hover:bg-white/10 rounded-full"
            >
              {isMinimized ? "🔼" : "🔽"}
            </button>
            {/* vignette + titre toujours visibles */}
            <img
              src="./podcast.jpg"
              alt="Podcast"
              className="w-8 h-8 rounded-full shadow border border-white/20"
            />
            <div className="text-white text-xs font-medium truncate max-w-[7.5rem]">
              {currentEpisode?.title ?? "Podcast CFDT"}
            </div>
          </div>

          {/* bouton play/pause */}
          {currentEpisode && (
            <button
              onClick={playPause}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 shrink-0"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          )}

          {/* volume uniquement en mode étendu */}
          {!isMinimized && (
            <div className="flex-grow flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-gray-300" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={e => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-purple-300 rounded slider appearance-none"
              />
            </div>
          )}
        </div>

        {/* lecteur audio */}
        <audio
          ref={audioRef}
          src={currentEpisode?.url}
          preload="metadata"
          style={{ display: "none" }}
          crossOrigin="anonymous"
        />

        {/* contenu détaillé quand étendu */}
        {!isMinimized && (
          <div className="mt-4">
            <div className="flex flex-col items-center mb-4">
              <img 
                src="./podcast.jpg"
                alt="Illustration Podcast"
                className="w-32 h-32 object-cover rounded-full shadow-md border-2 border-purple-400"
              />
              <h4 className="text-white font-bold text-center mt-2">Épisodes disponibles</h4>
            </div>
            <ul className="max-h-48 overflow-y-auto">
              {podcastEpisodes.map(episode => (
                <li key={episode.id}>
                  <button
                    onClick={() => selectEpisode(episode)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm text-white mb-1 transition-colors ${
                      currentEpisode?.id === episode.id ? "bg-purple-700 font-semibold" : "bg-purple-800/60 hover:bg-purple-700/80"
                    }`}
                  >
                    {episode.title}
                  </button>
                </li>
              ))}
            </ul>
            {currentEpisode && (
              <div className="mt-2 px-2 text-xs text-purple-200">
                <p className="truncate">Lecture : {currentEpisode.title}</p>
                <div>
                  <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>
                {error && <div className="text-red-300 mt-1">{error}</div>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// =======================
// App principale
// =======================
export default function App() {
  const [chatState, setChatState] = useState<ChatbotState>({
    currentView: "menu",
    selectedDomain: null,
    messages: [],
    isProcessing: false,
  });
  const [inputValue, setInputValue] = useState("");
  const [selectedInfo, setSelectedInfo] = useState<InfoItem | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [interimText, setInterimText] = useState("");
  const [internalDocQuestion, setInternalDocQuestion] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatState.messages]);

  // Initialisation de la reconnaissance vocale
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      console.log('SpeechRecognition disponible:', !!SpeechRecognition);
      
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true; // Changé pour true pour voir les résultats intermédiaires
        recognition.lang = 'fr-FR';
        
        recognition.onstart = () => {
          console.log('Reconnaissance vocale démarrée');
          setIsListening(true);
        };
        
        recognition.onresult = (event) => {
          console.log('Résultat de reconnaissance:', event);
          let finalTranscript = '';
          let interimTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }
          
          if (finalTranscript) {
            console.log('Texte final:', finalTranscript);
            setInputValue(finalTranscript);
            setInterimText("");
            // Envoyer automatiquement après un texte final
            setTimeout(() => {
              if (finalTranscript && finalTranscript.trim()) {
                console.log('🎤 ENVOI AUTOMATIQUE TEXTE FINAL:', finalTranscript);
                console.log('🎤 État avant envoi:', { 
                  selectedDomain: chatState.selectedDomain,
                  isProcessing: chatState.isProcessing,
                  messagesCount: chatState.messages.length
                });
                handleSendMessage(String(finalTranscript));
              }
            }, 500); // Petit délai pour laisser le temps à l'utilisateur de voir le texte
            setIsListening(false);
            // Arrêter explicitement la reconnaissance vocale
            if (recognitionRef.current) {
              recognitionRef.current.stop();
            }
          } else if (interimTranscript) {
            console.log('Texte intermédiaire:', interimTranscript);
            setInterimText(interimTranscript);
            setInputValue(interimTranscript);
            
            // Réinitialiser le timer de silence
            if (silenceTimeoutRef.current) {
              clearTimeout(silenceTimeoutRef.current);
            }
            
            // Programmer l'envoi automatique après 3 secondes de silence
            silenceTimeoutRef.current = setTimeout(() => {
              if (interimTranscript && interimTranscript.trim()) {
                console.log('🎤 ENVOI AUTOMATIQUE APRÈS SILENCE:', interimTranscript);
                console.log('🎤 État avant envoi:', { 
                  selectedDomain: chatState.selectedDomain,
                  isProcessing: chatState.isProcessing,
                  messagesCount: chatState.messages.length
                });
                setInputValue(interimTranscript);
                handleSendMessage(String(interimTranscript));
                setIsListening(false);
                // Arrêter explicitement la reconnaissance vocale
                if (recognitionRef.current) {
                  recognitionRef.current.stop();
                }
              }
            }, 3000);
          }
        };
        
        recognition.onerror = (event) => {
          console.error('Erreur de reconnaissance vocale:', event.error, event.message);
          setIsListening(false);
          alert(`Erreur de reconnaissance vocale: ${event.error}`);
        };
        
        recognition.onend = () => {
          console.log('Reconnaissance vocale terminée');
          setIsListening(false);
          // Nettoyer le timeout de silence
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
            silenceTimeoutRef.current = null;
          }
        };
        
        recognitionRef.current = recognition;
      } else {
        console.log('Reconnaissance vocale non supportée');
        setSpeechSupported(false);
      }
    }
  }, []);

  // Nettoyage des timeouts lors du démontage
  useEffect(() => {
    return () => {
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
    };
  }, []);

  const scrollToChat = () => {
    setTimeout(() => {
      chatContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Fonction de détection de contexte pour rediriger vers le bon domaine
  const detectContextAndRedirect = (question: string): number => {
    const questionLower = question.toLowerCase();
    
    // Mots-clés pour le domaine 0 - Temps de travail
    const tempsTravailKeywords = [
      'temps de travail', 'horaires', 'congés', 'artt', 'rtt', 'temps partiel', 'absences',
      'heures supplémentaires', 'astreintes', 'travail de nuit', 'journée solidarité',
      'plages fixes', 'plages souplesse', 'repos', 'pause', 'amplitude', 'quotité',
      'congé annuel', 'congé bonifié', 'don de jours', 'cet', 'congés naissance',
      'fractionnement', 'jours fériés', 'report', 'vacances', 'maladie', 'accident',
      'arrêt', 'clm', 'cld', 'pénibilité', 'invalidité', 'déménagement', 'demenagement',
      'autorisation absence', 'jour absence', 'absence autorisée'
    ];
    
    // Mots-clés pour le domaine 1 - Formation
    const formationKeywords = [
      'formation', 'cours', 'stage', 'apprentissage', 'compétences', 'qualification',
      'cpf', 'vae', 'concours', 'examen professionnel', 'bilan de compétences',
      'cnfpt', 'diplôme', 'certification', 'professionnalisation', 'intégration',
      'perfectionnement', 'syndicale', 'hygiène', 'sécurité', 'caces', 'haccp',
      'congé formation', 'disponibilité', 'études', 'recherches', 'immersion',
      'transition professionnelle', 'reconnaissance expérience', 'illettrisme'
    ];
    
    // Mots-clés pour le domaine 2 - Télétravail
    const teletravailKeywords = [
      'télétravail', 'télétravailler', 'domicile', 'travail à distance', 'forfait',
      'quotité', 'jours autorisés', 'indemnités', 'modalités', 'charte',
      'volontariat', 'réversibilité', 'déconnexion', 'rythme', 'lieu',
      'outils', 'matériel', 'informatique', 'sécurité', 'confidentialité',
      'circonstances exceptionnelles', 'proche aidant', 'handicap', 'grossesse'
    ];
    
    // Mots-clés pour le domaine 9 - Primes
    const primesKeywords = [
      'primes', 'indemnités', 'rémunération', 'rifseep', 'isfe', 'régime indemnitaire',
      'bonification', 'supplément', 'complément', 'prime spéciale', 'installation',
      'travail de nuit', 'dimanche', 'jours fériés', 'astreinte', 'intervention',
      'permanence', 'panier', 'chaussures', 'équipement', 'sujétions horaires',
      'surveillance', 'cantines', 'études surveillées', 'gardiennage', 'responsabilité',
      'ifce', 'outillage personnel', 'grand âge', 'revalorisation', 'médecins'
    ];
    
    // Compter les occurrences de chaque domaine avec scoring pondéré
    const scores = {
      0: tempsTravailKeywords.filter(keyword => questionLower.includes(keyword)).length,
      1: formationKeywords.filter(keyword => questionLower.includes(keyword)).length,
      2: teletravailKeywords.filter(keyword => questionLower.includes(keyword)).length,
      9: primesKeywords.filter(keyword => questionLower.includes(keyword)).length
    };
    
    console.log('🔍 Scores de détection par domaine:', scores);
    console.log('🔍 Question analysée:', questionLower);
    
    // Trouver le domaine avec le score le plus élevé
    let bestDomain = 0;
    let maxScore = 0;
    
    Object.entries(scores).forEach(([domain, score]) => {
      if (score > maxScore) {
        maxScore = score;
        bestDomain = parseInt(domain);
      }
    });
    
    // Si aucun mot-clé trouvé, analyser les termes généraux pour orienter
    if (maxScore === 0) {
      console.log('⚠️ Aucun mot-clé spécifique trouvé, analyse des termes généraux...');
      
      if (questionLower.includes('salaire') || questionLower.includes('paye') || questionLower.includes('argent')) {
        console.log('💰 Orientation vers domaine PRIMES (9) - termes financiers détectés');
        return 9;
      }
      if (questionLower.includes('apprendre') || questionLower.includes('évoluer') || questionLower.includes('carrière')) {
        console.log('🎓 Orientation vers domaine FORMATION (1) - termes d\'évolution détectés');
        return 1;
      }
      if (questionLower.includes('maison') || questionLower.includes('chez moi') || questionLower.includes('distance')) {
        console.log('🏠 Orientation vers domaine TÉLÉTRAVAIL (2) - termes de localisation détectés');
        return 2;
      }
      
      console.log('📅 Orientation par défaut vers domaine TEMPS DE TRAVAIL (0)');
      return 0;
    }
    
    console.log(`✅ Domaine détecté: ${bestDomain} avec score: ${maxScore}`);
    return bestDomain;
  };

  // Nouvelle fonction pour gérer la sélection de documents internes avec détection de contexte
  const handleInternalDocSelection = async (question?: string) => {
    console.log('🚀 handleInternalDocSelection appelé avec:', question);
    let selectedDomain = 0; // Par défaut, domaine temps de travail
    
    if (question) {
      selectedDomain = detectContextAndRedirect(question);
      console.log(`Question: "${question}" -> Domaine détecté: ${selectedDomain}`);
    }
    
    const welcomes: Record<number, string> = {
      0: "Bonjour ! Je peux vous aider avec vos questions sur les horaires, congés, ARTT, temps partiel, heures supplémentaires, absences, etc.\n\nSi ta prochaine question n'est pas dans ce thème, reviens à l'accueil.",
      1: "Bonjour ! Je peux vous renseigner sur le CPF, les congés de formation, la VAE, les concours, les bilans de compétences, etc. Quelle est votre question ?\n\nSi ta prochaine question n'est pas dans ce thème, reviens à l'accueil.",
      2: "Bonjour ! Je suis l'assistant spécialiste du télétravail. Posez-moi vos questions sur la charte, les jours autorisés, les indemnités, etc.\n\nSi ta prochaine question n'est pas dans ce thème, reviens à l'accueil.",
      9: "Bonjour ! Je suis l'assistant spécialiste du régime indemnitaire et des primes. Posez-moi vos questions sur le RIFSEEP, l'ISFE, les primes, indemnités, etc.\n\nSi ta prochaine question n'est pas dans ce thème, reviens à l'accueil.",
    };
    
    // Créer le message utilisateur si une question est fournie
    const userMessage = question ? { type: "user" as const, content: question, timestamp: new Date() } : null;
    
    setChatState({
      currentView: "chat",
      selectedDomain: selectedDomain,
      messages: [
        { type: "assistant", content: welcomes[selectedDomain] ?? "Bonjour, comment puis-je vous aider ?", timestamp: new Date() },
        ...(userMessage ? [userMessage] : [])
      ],
      isProcessing: question ? true : false, // Marquer comme en cours de traitement si une question est posée
    });
    
    scrollToChat();
    
    // Si une question est posée, la traiter automatiquement
    if (question) {
      try {
        console.log('🚀 TRAITEMENT AUTOMATIQUE de la question:', question);
        console.log('🚀 État du chat avant traitement:', {
          selectedDomain: chatState.selectedDomain,
          messagesCount: chatState.messages.length,
          isProcessing: chatState.isProcessing
        });
        
        // Passer le domaine directement à traiterQuestion
        const response = await traiterQuestion(question, selectedDomain);
        console.log('🚀 Réponse reçue:', response.substring(0, 200) + '...');
        const assistantMessage: ChatMessage = { 
          type: "assistant", 
          content: response, 
          timestamp: new Date() 
        };
        
        setChatState(prev => ({
          ...prev,
          messages: [...prev.messages, assistantMessage],
          isProcessing: false
        }));
      } catch (error) {
        console.error('Erreur lors du traitement de la question:', error);
        const errorMessage: ChatMessage = { 
          type: "assistant", 
          content: "Désolé, une erreur s'est produite lors du traitement de votre question. Veuillez réessayer.", 
          timestamp: new Date() 
        };
        
        setChatState(prev => ({
          ...prev,
          messages: [...prev.messages, errorMessage],
          isProcessing: false
        }));
      }
    } else {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  };

  const handleDomainSelection = (domainId: number) => {
    // Si c'est le domaine "Recherche juridique" (ID 3), ouvrir le site externe
    if (domainId === 3) {
      window.open('https://opendata.justice-administrative.fr/recherche', '_blank');
      return;
    }

    // Si c'est le domaine FAQ (ID 5), aller à la vue FAQ
    if (domainId === 5) {
      setChatState(prev => ({ ...prev, currentView: "faq" }));
      return;
    }

    const welcomes: Record<number, string> = {
      0: "Bonjour ! Je peux vous aider avec vos questions sur les horaires, congés, ARTT, temps partiel, heures supplémentaires, absences, etc.\n\nSi ta prochaine question n'est pas dans ce thème, reviens à l'accueil.",
      1: "Bonjour ! Je peux vous renseigner sur le CPF, les congés de formation, la VAE, les concours, les bilans de compétences, etc. Quelle est votre question ?\n\nSi ta prochaine question n'est pas dans ce thème, reviens à l'accueil.",
      2: "Bonjour ! Je suis l'assistant spécialiste du télétravail. Posez-moi vos questions sur la charte, les jours autorisés, les indemnités, etc.\n\nSi ta prochaine question n'est pas dans ce thème, reviens à l'accueil.",
      4: "Bonjour ! Je suis votre juriste IA spécialisé dans la fonction publique. Je réponds exclusivement en me référant au site de Légifrance et au Code général de la fonction publique avec citations précises des textes légaux.\n\nSi ta prochaine question n'est pas dans ce thème, reviens à l'accueil.",
      6: "Bonjour ! Voici les actualités — vous pouvez poser une question ou consulter le fil d'actualité.\n\nSi ta prochaine question n'est pas dans ce thème, reviens à l'accueil.",
      7: "Bonjour ! Je peux vous aider à retrouver un chapitre du sommaire, ou une documentation interne (CET, congés, télétravail...).\n\nSi ta prochaine question n'est pas dans ce thème, reviens à l'accueil.",
      8: "Bonjour ! Espace dialogue social : je peux prendre note d'une demande ou vous orienter vers les contacts syndicaux.\n\nSi ta prochaine question n'est pas dans ce thème, reviens à l'accueil.",
      9: "Bonjour ! Je suis l'assistant spécialiste du régime indemnitaire et des primes. Posez-moi vos questions sur le RIFSEEP, l'ISFE, les primes, indemnités, etc.\n\nSi ta prochaine question n'est pas dans ce thème, reviens à l'accueil.",
    };
    
    setChatState({
      currentView: "chat",
      selectedDomain: domainId,
      messages: [{ type: "assistant", content: welcomes[domainId] ?? "Bonjour, comment puis-je vous aider ?", timestamp: new Date() }],
      isProcessing: false,
    });
    scrollToChat();
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  const returnToMenu = () => {
    setChatState({ currentView: "menu", selectedDomain: null, messages: [], isProcessing: false });
    setInputValue("");
    setSelectedInfo(null);
  };


  const appelPerplexity = async (messages: any[], disableWebSearch: boolean = false): Promise<string> => {
    console.log('🔍 appelPerplexity appelé (wrapper) disableWebSearch=', disableWebSearch);

    // En DEV, si ce n'est pas un appel interne strict, on retourne une simulation
    if (isDevelopment && !disableWebSearch) {
      const userMessage = messages.find((m: any) => m.role === 'user');
      const question = userMessage?.content || '';
      console.log('🔧 MODE DÉVELOPPEMENT - réponse simulée pour:', question);
      return `Réponse simulée en mode développement pour la question : "${question}"\n\nCette réponse serait générée par l'IA en production.`;
    }

    try {
      // Déléguer à l'appel centralisé
      return await callPerplexityAPI(messages, disableWebSearch);
    } catch (err) {
      console.error('❌ Erreur centralisée callPerplexityAPI:', err);
      throw err;
    }
  };

  // === FONCTIONS D'ANALYSE PAR DOMAINE AMÉLIORÉES ===

  const extraireInformationPertinente = (lignesRelevantes: string[], motsClesRecherche: string[]): string => {
    // Trouve la ligne la plus pertinente contenant les mots-clés recherchés
    for (const ligne of lignesRelevantes) {
      const ligneLower = ligne.toLowerCase();
      if (motsClesRecherche.some(mot => ligneLower.includes(mot))) {
        // Nettoyer la ligne
        let texteClean = ligne.trim();
        
        // Supprimer les références d'articles parasites
        texteClean = texteClean.replace(/ARTICLE \d+[^A-Za-z]*-?[^A-Za-z]*/gi, '');
        texteClean = texteClean.replace(/^[^A-Za-z]*/, ''); // Supprimer caractères non alphabétiques au début
        
        // Extraire seulement la partie pertinente
        const phrases = texteClean.split(/[.!]/).filter(phrase => phrase.trim().length > 10);
        const phrasesPertinentes = phrases.filter(phrase => {
          const phraseLower = phrase.toLowerCase();
          return motsClesRecherche.some(mot => phraseLower.includes(mot));
        });
        
        if (phrasesPertinentes.length > 0) {
          return phrasesPertinentes.slice(0, 2).join('. ').trim() + '.';
        }
        
        // Fallback: retourner le texte nettoyé
        return texteClean;
      }
    }
    
    return '';
  };

  /* LEGACY - remplacé par unifiedSearch - toutes les fonctions _analyser* sont conservées en backup */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const _analyserTeletravail = (questionLower: string, contexteParts: string): string => {
    console.log('🏠 Analyse spécialisée TÉLÉTRAVAIL');
    
      // Si la question porte sur le forfait, répondre immédiatement avec la valeur standard
      // (fallback fiable) — évite les analyses erratiques quand le parsing du contexte échoue.
      if (questionLower.includes('forfait')) {
        // Tentative rapide d'extraction depuis le contexte
        try {
          const lignesContexteQuick = String(contexteParts).split('\n').map(l => l.trim()).filter(l => l.length > 5);
          const infoForfait = extraireInformationPertinente(lignesContexteQuick, ['forfait', 'forfait annuel', 'jours', '15']);
          if (infoForfait) {
            return "**📱 Règles du télétravail - Mairie de Gennevilliers**\n\n✅ **Forfait annuel** :\n" + infoForfait + "\n\n*📞 Contact : Service RH - 01 40 85 64 64*";
          }
        } catch (e) {
          // ignore extraction errors and fallback to default
        }

        // Réponse par défaut si aucune info explicite trouvée
        return "**📱 Règles du télétravail - Mairie de Gennevilliers**\n\n✅ **Forfait annuel** : 15 jours de télétravail par an\n\n*📞 Contact : Service RH - 01 40 85 64 64*";
      }

      const lignesContexte = String(contexteParts).split('\n').map(ligne => ligne.trim()).filter(ligne => ligne.length > 5);
    const motsCles = ['forfait', 'jours', 'quotité', 'autorisé', 'maximum', 'semaine', 'mois', 'annuel', 'télétravail'];
    const lignesRelevantes: string[] = [];
    
    // Extraction intelligente des lignes pertinentes
    for (let i = 0; i < lignesContexte.length; i++) {
      const ligne = lignesContexte[i];
      const ligneLower = ligne.toLowerCase();
      
      if (motsCles.some(mot => ligneLower.includes(mot))) {
        // Pour le télétravail, prendre le contexte spécifique
        if (ligneLower.includes('forfait') || ligneLower.includes('télétravail')) {
          let contexteTeletravail = ligne;
          
          // Ajouter les lignes suivantes si elles sont pertinentes
          for (let j = i + 1; j < Math.min(i + 3, lignesContexte.length); j++) {
            const ligneSuivante = lignesContexte[j];
            if (ligneSuivante.toLowerCase().includes('télétravail') || 
                ligneSuivante.toLowerCase().includes('forfait') ||
                ligneSuivante.toLowerCase().includes('jour')) {
              contexteTeletravail += ' ' + ligneSuivante;
            } else {
              break;
            }
          }
          
          lignesRelevantes.push(contexteTeletravail.trim());
        }
      }
    }
    
    if (lignesRelevantes.length > 0) {
      let reponse = "**📱 Règles du télétravail - Mairie de Gennevilliers**\n\n";
      
      if (questionLower.includes('forfait')) {
        const infoForfait = extraireInformationPertinente(lignesRelevantes, ['forfait', '15', 'annuel']);
        if (infoForfait) {
          reponse += "✅ **Forfait annuel** :\n" + infoForfait + "\n\n";
        } else {
          reponse += "✅ **Forfait annuel** : 15 jours de télétravail par an\n\n";
        }
      }
      
      if (questionLower.includes('semaine') || questionLower.includes('régulier')) {
        const infoSemaine = extraireInformationPertinente(lignesRelevantes, ['semaine', 'jour', 'hebdo']);
        if (infoSemaine) {
          reponse += "📅 **Télétravail régulier** :\n" + infoSemaine + "\n\n";
        }
      }
      
      if (questionLower.includes('mois') || questionLower.includes('limite')) {
        const infoMois = extraireInformationPertinente(lignesRelevantes, ['mois', 'maximum', 'limite']);
        if (infoMois) {
          reponse += "⏰ **Limite mensuelle** :\n" + infoMois + "\n\n";
        }
      }
      
      reponse += "**💡 En résumé :** Le forfait s'ajoute au télétravail régulier\n\n";
      reponse += "*📞 Contact : Service RH - 01 40 85 64 64*";
      
      return reponse;
    }
    
    return "Je ne trouve pas d'information spécifique sur le télétravail. Contactez le service RH au 01 40 85 64 64.";
  };

  const _analyserTempsTravail = (questionLower: string, contexteParts: string): string => {
    console.log('⏰ Analyse spécialisée TEMPS DE TRAVAIL');
    
    const lignesContexte = contexteParts.split('\n').map(ligne => ligne.trim()).filter(ligne => ligne.length > 5);
    const motsCles = ['heures', 'horaire', 'congé', 'rtt', 'artt', 'temps partiel', '1607', '35h', '37h', 'annuel', 'déménagement', 'demenagement', 'absence', 'autorisation', 'mariage', 'pacs'];
    const lignesRelevantes: string[] = [];
    
    // Extraction intelligente par sujet
    for (let i = 0; i < lignesContexte.length; i++) {
      const ligne = lignesContexte[i];
      const ligneLower = ligne.toLowerCase();
      
      if (motsCles.some(mot => ligneLower.includes(mot))) {
        // Traitement spécialisé par type de question
        if (ligneLower.includes('mariage') || ligneLower.includes('pacs')) {
          // Pour le mariage, extraction précise
          let contexteMariage = ligne;
          
          for (let j = i + 1; j < Math.min(i + 5, lignesContexte.length); j++) {
            const ligneSuivante = lignesContexte[j];
            if (ligneSuivante.toLowerCase().includes('mariage') || 
                ligneSuivante.toLowerCase().includes('pacs') ||
                ligneSuivante.toLowerCase().includes('agent') ||
                ligneSuivante.toLowerCase().includes('jour') ||
                ligneSuivante.toLowerCase().includes('ouvré') ||
                ligneSuivante.toLowerCase().includes('célébration')) {
              contexteMariage += ' ' + ligneSuivante;
            } else if (ligneSuivante.toLowerCase().includes('article') && !ligneSuivante.toLowerCase().includes('mariage')) {
              break; // Arrêter si on arrive à un nouvel article
            }
          }
          
          lignesRelevantes.push(contexteMariage.trim());
          
        } else if (ligneLower.includes('déménagement') || ligneLower.includes('demenagement')) {
          // Pour le déménagement, extraction précise
          let contexteDemenagement = ligne;
          
          for (let j = i + 1; j < Math.min(i + 3, lignesContexte.length); j++) {
            const ligneSuivante = lignesContexte[j];
            if (ligneSuivante.toLowerCase().includes('déménagement') || 
                ligneSuivante.toLowerCase().includes('journée') ||
                ligneSuivante.toLowerCase().includes('autorisation')) {
              contexteDemenagement += ' ' + ligneSuivante;
            } else {
              break;
            }
          }
          
          lignesRelevantes.push(contexteDemenagement.trim());
          
        } else if (ligneLower.includes('congé') || ligneLower.includes('vacances')) {
          // Pour les congés, extraction ciblée
          let contexteCongé = ligne;
          
          for (let j = i + 1; j < Math.min(i + 2, lignesContexte.length); j++) {
            const ligneSuivante = lignesContexte[j];
            if (ligneSuivante.toLowerCase().includes('congé') || 
                ligneSuivante.toLowerCase().includes('jour')) {
              contexteCongé += ' ' + ligneSuivante;
            } else {
              break;
            }
          }
          
          lignesRelevantes.push(contexteCongé.trim());
          
        } else if (ligneLower.includes('heure') || ligneLower.includes('1607')) {
          // Pour les heures, extraction simple
          lignesRelevantes.push(ligne.trim());
          
        } else {
          // Pour les autres sujets, contexte minimal
          lignesRelevantes.push(ligne.trim());
        }
      }
    }
    
    if (lignesRelevantes.length > 0) {
      let reponse = "**⏰ Temps de travail - Mairie de Gennevilliers**\n\n";
      
      // Prioriser selon la question
      if (questionLower.includes('mariage') || questionLower.includes('pacs')) {
        const infoMariage = extraireInformationPertinente(lignesRelevantes, ['mariage', 'pacs', 'agent', 'jour', 'ouvré', 'célébration']);
        if (infoMariage) {
          reponse += "💒 **Congé de mariage** :\n" + infoMariage + "\n\n";
          reponse += "**💡 En résumé :** Jours d'autorisation d'absence pour mariage selon votre situation familiale\n\n";
        } else {
          reponse += "💒 **Congé de mariage** :\n";
          reponse += "• Agent : 7 jours ouvrés\n";
          reponse += "• Enfant des agents : 3 jours ouvrés\n";
          reponse += "• Famille (ascendant, descendant, frère, sœur, etc.) : 1 jour ouvré\n\n";
          reponse += "**💡 Important :** Jours consécutifs à prendre au moment de la célébration\n\n";
        }
        
      } else if (questionLower.includes('déménagement') || questionLower.includes('demenagement')) {
        const infoDemenagement = extraireInformationPertinente(lignesRelevantes, ['déménagement', 'journée', 'autorisation']);
        if (infoDemenagement) {
          reponse += "🏠 **Congé déménagement** :\n" + infoDemenagement + "\n\n";
          reponse += "**💡 En résumé :** 1 journée d'autorisation d'absence pour déménagement\n\n";
        }
        
      } else if (questionLower.includes('congé') || questionLower.includes('vacances')) {
        const infoCongés = extraireInformationPertinente(lignesRelevantes, ['congé', 'annuel', 'jour']);
        if (infoCongés) {
          reponse += "🏖️ **Congés annuels** :\n" + infoCongés + "\n\n";
        }
        
      } else if (questionLower.includes('heure') || questionLower.includes('temps')) {
        const infoHeures = extraireInformationPertinente(lignesRelevantes, ['1607', '35h', '37h', 'heure']);
        if (infoHeures) {
          reponse += "🕐 **Durée de travail** :\n" + infoHeures + "\n\n";
        } else {
          reponse += "🕐 **Durée légale** : 1607 heures par an (35h/semaine)\n\n";
        }
        
      } else if (questionLower.includes('rtt') || questionLower.includes('artt')) {
        const infoRTT = extraireInformationPertinente(lignesRelevantes, ['rtt', 'artt', 'récupération']);
        if (infoRTT) {
          reponse += "📅 **ARTT/RTT** :\n" + infoRTT + "\n\n";
        }
        
      } else {
        // Réponse générale avec les infos trouvées
        const infoGenerale = lignesRelevantes.slice(0, 2).join('\n\n');
        reponse += "**📋 Information trouvée :**\n" + infoGenerale + "\n\n";
      }
      
      reponse += "*📞 Contact : Service RH - 01 40 85 64 64*";
      return reponse;
    }
    
    return "Je ne trouve pas d'information spécifique sur le temps de travail. Contactez le service RH au 01 40 85 64 64.";
  };

  const _analyserFormation = (questionLower: string, contexteParts: string): string => {
    console.log('🎓 Analyse spécialisée FORMATION');
    
    const lignesContexte = contexteParts.split('\n').map(ligne => ligne.trim()).filter(ligne => ligne.length > 5);
    const motsCles = ['formation', 'cpf', 'cours', 'stage', 'concours', 'vae', 'cnfpt', 'diplôme', 'compétences', 'apprentissage'];
    const lignesRelevantes: string[] = [];
    
    // Extraction intelligente par thème de formation
    for (let i = 0; i < lignesContexte.length; i++) {
      const ligne = lignesContexte[i];
      const ligneLower = ligne.toLowerCase();
      
      if (motsCles.some(mot => ligneLower.includes(mot))) {
        // Traitement spécialisé selon le type de formation
        if (ligneLower.includes('cpf')) {
          // Pour le CPF, prendre contexte élargi
          let contexteCPF = ligne;
          for (let j = i + 1; j < Math.min(i + 3, lignesContexte.length); j++) {
            const ligneSuivante = lignesContexte[j];
            if (ligneSuivante.toLowerCase().includes('formation') || 
                ligneSuivante.toLowerCase().includes('compte') ||
                ligneSuivante.toLowerCase().includes('heure')) {
              contexteCPF += ' ' + ligneSuivante;
            } else {
              break;
            }
          }
          lignesRelevantes.push(contexteCPF.trim());
          
        } else if (ligneLower.includes('concours') || ligneLower.includes('examen')) {
          // Pour les concours, extraction ciblée
          let contexteConcours = ligne;
          for (let j = i + 1; j < Math.min(i + 2, lignesContexte.length); j++) {
            const ligneSuivante = lignesContexte[j];
            if (ligneSuivante.toLowerCase().includes('concours') || 
                ligneSuivante.toLowerCase().includes('préparation') ||
                ligneSuivante.toLowerCase().includes('catégorie')) {
              contexteConcours += ' ' + ligneSuivante;
            } else {
              break;
            }
          }
          lignesRelevantes.push(contexteConcours.trim());
          
        } else if (ligneLower.includes('vae') || ligneLower.includes('validation')) {
          // Pour la VAE, extraction spécifique
          let contexteVAE = ligne;
          for (let j = i + 1; j < Math.min(i + 2, lignesContexte.length); j++) {
            const ligneSuivante = lignesContexte[j];
            if (ligneSuivante.toLowerCase().includes('vae') || 
                ligneSuivante.toLowerCase().includes('expérience') ||
                ligneSuivante.toLowerCase().includes('acquis')) {
              contexteVAE += ' ' + ligneSuivante;
            } else {
              break;
            }
          }
          lignesRelevantes.push(contexteVAE.trim());
          
        } else {
          // Pour les autres formations, contexte simple
          lignesRelevantes.push(ligne.trim());
        }
      }
    }
    
    if (lignesRelevantes.length > 0) {
      let reponse = "**🎓 Formation - Mairie de Gennevilliers**\n\n";
      
      // Prioriser selon la question
      if (questionLower.includes('cpf')) {
        const infoCPF = extraireInformationPertinente(lignesRelevantes, ['cpf', 'compte', 'personnel', 'formation']);
        if (infoCPF) {
          reponse += "💰 **Compte Personnel de Formation (CPF)** :\n" + infoCPF + "\n\n";
        } else {
          reponse += "💰 **CPF** : Droit à la formation tout au long de la carrière\n\n";
        }
        
      } else if (questionLower.includes('concours') || questionLower.includes('examen')) {
        const infoConcours = extraireInformationPertinente(lignesRelevantes, ['concours', 'examen', 'préparation', 'catégorie']);
        if (infoConcours) {
          reponse += "🏆 **Préparation aux concours** :\n" + infoConcours + "\n\n";
        } else {
          reponse += "🏆 **Concours** : Préparation et accompagnement possibles\n\n";
        }
        
      } else if (questionLower.includes('vae') || questionLower.includes('validation')) {
        const infoVAE = extraireInformationPertinente(lignesRelevantes, ['vae', 'validation', 'acquis', 'expérience']);
        if (infoVAE) {
          reponse += "📜 **Validation des Acquis de l'Expérience (VAE)** :\n" + infoVAE + "\n\n";
        } else {
          reponse += "📜 **VAE** : Reconnaissance de vos compétences professionnelles\n\n";
        }
        
      } else if (questionLower.includes('stage') || questionLower.includes('cours')) {
        const infoStage = extraireInformationPertinente(lignesRelevantes, ['stage', 'cours', 'formation', 'apprentissage']);
        if (infoStage) {
          reponse += "📚 **Formations et stages** :\n" + infoStage + "\n\n";
        }
        
      } else {
        // Réponse générale avec les infos trouvées
        const infoGenerale = lignesRelevantes.slice(0, 2).join('\n\n');
        reponse += "**📋 Informations formation :**\n" + infoGenerale + "\n\n";
      }
      
      reponse += "*📞 Contact : Service Formation - 01 40 85 64 64*";
      return reponse;
    }
    
    return "Je ne trouve pas d'information spécifique sur la formation. Contactez le service Formation au 01 40 85 64 64.";
  };

  const _analyserPrimes = (questionLower: string, contexteParts: string): string => {
    console.log('💰 Analyse spécialisée PRIMES');
    
    const lignesContexte = contexteParts.split('\n').map(ligne => ligne.trim()).filter(ligne => ligne.length > 5);
    const motsCles = ['prime', 'indemnité', 'rifseep', 'isfe', 'rémunération', 'supplément', 'bonification', 'sujétion'];
    const lignesRelevantes: string[] = [];
    
    // Extraction intelligente par type de prime
    for (let i = 0; i < lignesContexte.length; i++) {
      const ligne = lignesContexte[i];
      const ligneLower = ligne.toLowerCase();
      
      if (motsCles.some(mot => ligneLower.includes(mot))) {
        // Traitement spécialisé selon le type de prime
        if (ligneLower.includes('rifseep')) {
          // Pour RIFSEEP, prendre contexte élargi
          let contexteRIFSEEP = ligne;
          for (let j = i + 1; j < Math.min(i + 3, lignesContexte.length); j++) {
            const ligneSuivante = lignesContexte[j];
            if (ligneSuivante.toLowerCase().includes('rifseep') || 
                ligneSuivante.toLowerCase().includes('fonction') ||
                ligneSuivante.toLowerCase().includes('résultat') ||
                ligneSuivante.toLowerCase().includes('montant')) {
              contexteRIFSEEP += ' ' + ligneSuivante;
            } else {
              break;
            }
          }
          lignesRelevantes.push(contexteRIFSEEP.trim());
          
        } else if (ligneLower.includes('isfe')) {
          // Pour ISFE, extraction ciblée
          let contexteISFE = ligne;
          for (let j = i + 1; j < Math.min(i + 2, lignesContexte.length); j++) {
            const ligneSuivante = lignesContexte[j];
            if (ligneSuivante.toLowerCase().includes('isfe') || 
                ligneSuivante.toLowerCase().includes('expertise') ||
                ligneSuivante.toLowerCase().includes('technique')) {
              contexteISFE += ' ' + ligneSuivante;
            } else {
              break;
            }
          }
          lignesRelevantes.push(contexteISFE.trim());
          
        } else if (ligneLower.includes('sujétion') || ligneLower.includes('sujetion')) {
          // Pour les primes de sujétion, extraction spécifique
          let contexteSujetion = ligne;
          for (let j = i + 1; j < Math.min(i + 2, lignesContexte.length); j++) {
            const ligneSuivante = lignesContexte[j];
            if (ligneSuivante.toLowerCase().includes('sujétion') || 
                ligneSuivante.toLowerCase().includes('contrainte') ||
                ligneSuivante.toLowerCase().includes('pénibilité')) {
              contexteSujetion += ' ' + ligneSuivante;
            } else {
              break;
            }
          }
          lignesRelevantes.push(contexteSujetion.trim());
          
        } else {
          // Pour les autres primes, contexte simple
          lignesRelevantes.push(ligne.trim());
        }
      }
    }
    
    if (lignesRelevantes.length > 0) {
      let reponse = "**💰 Primes et Indemnités - Mairie de Gennevilliers**\n\n";
      
      // Prioriser selon la question
      if (questionLower.includes('rifseep')) {
        const infoRIFSEEP = extraireInformationPertinente(lignesRelevantes, ['rifseep', 'fonction', 'résultat', 'indemnitaire']);
        if (infoRIFSEEP) {
          reponse += "🎯 **RIFSEEP (Régime Indemnitaire)** :\n" + infoRIFSEEP + "\n\n";
        } else {
          reponse += "🎯 **RIFSEEP** : Régime indemnitaire basé sur la fonction et les résultats\n\n";
        }
        
      } else if (questionLower.includes('isfe')) {
        const infoISFE = extraireInformationPertinente(lignesRelevantes, ['isfe', 'expertise', 'spéciale', 'technique']);
        if (infoISFE) {
          reponse += "📊 **ISFE (Indemnité Spéciale)** :\n" + infoISFE + "\n\n";
        } else {
          reponse += "📊 **ISFE** : Indemnité spéciale de fonction et d'expertise\n\n";
        }
        
      } else if (questionLower.includes('sujétion') || questionLower.includes('sujetion') || questionLower.includes('pénibilité')) {
        const infoSujetion = extraireInformationPertinente(lignesRelevantes, ['sujétion', 'contrainte', 'pénibilité', 'particulière']);
        if (infoSujetion) {
          reponse += "⚠️ **Primes de sujétion** :\n" + infoSujetion + "\n\n";
        } else {
          reponse += "⚠️ **Primes de sujétion** : Compensent les contraintes particulières du poste\n\n";
        }
        
      } else if (questionLower.includes('indemnité')) {
        const infoIndemnite = extraireInformationPertinente(lignesRelevantes, ['indemnité', 'compensation', 'remboursement']);
        if (infoIndemnite) {
          reponse += "💵 **Indemnités** :\n" + infoIndemnite + "\n\n";
        }
        
      } else {
        // Réponse générale avec les infos trouvées
        const infoGenerale = lignesRelevantes.slice(0, 2).join('\n\n');
        reponse += "**📋 Informations sur les primes :**\n" + infoGenerale + "\n\n";
      }
      
      reponse += "*📞 Contact : Service Paie - 01 40 85 64 64*";
      return reponse;
    }
    
    return "Je ne trouve pas d'information spécifique sur les primes. Contactez le service Paie au 01 40 85 64 64.";
  };

  const _analyseGenerale = (questionLower: string, contexteParts: string): string => {
    console.log('🔍 Analyse générale du contexte');
    
    const motsQuestion = questionLower.split(' ').filter(mot => mot.length > 3);
    const phrases = contexteParts.split(/[.!?]/).filter(phrase => phrase.trim().length > 20);
    
    const phrasesRelevantes = phrases.filter(phrase => {
      const phraseLower = phrase.toLowerCase();
      return motsQuestion.some(mot => phraseLower.includes(mot));
    });
    
    if (phrasesRelevantes.length > 0) {
      const reponse = phrasesRelevantes.slice(0, 2).join('. ').trim() + '.';
      
      return `**📄 Information trouvée dans nos documents :**

${reponse}

*📞 Pour plus de précisions : 01 40 85 64 64*`;
    }
    
    return "Je ne trouve pas d'information correspondante dans nos documents. Contactez le 01 40 85 64 64.";
  };
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const traiterQuestion = async (question: string, domain?: number): Promise<string> => {
    const currentDomain = domain !== undefined ? domain : chatState.selectedDomain;
    console.log('🔍 traiterQuestion appelé avec:', { 
      question, 
      selectedDomain: currentDomain,
      domainParam: domain,
      questionLength: question.length,
      questionWords: question.split(' ').length,
      isListening: isListening,
      interimText: interimText,
      inputValue: inputValue
    });
    console.log('🔍 État complet du chat:', chatState);
    
    let systemPrompt = "";

    console.log(`📂 SÉLECTION DU CONTEXTE POUR DOMAINE ${currentDomain}:`);

    // ============================================
    // NOUVELLE STRATÉGIE: RECHERCHE UNIFIÉE EN 2 ÉTAPES
    // Pour économiser les tokens, on cherche d'abord dans le sommaire léger
    // puis on charge uniquement le contenu ciblé pour la réponse
    // ============================================

    // Pour tous les domaines de documents internes (0, 1, 2, 9), utiliser la recherche unifiée
    console.log('🔍 VÉRIFICATION DU DOMAINE:', {
      currentDomain: currentDomain,
      isDomain0: currentDomain === 0,
      isDomain1: currentDomain === 1,
      isDomain2: currentDomain === 2,
      isDomain9: currentDomain === 9,
      isInternalDoc: currentDomain === 0 || currentDomain === 1 || currentDomain === 2 || currentDomain === 9
    });

    if (currentDomain === 0 || currentDomain === 1 || currentDomain === 2 || currentDomain === 9) {
      console.log('🔒 UTILISATION DE LA RECHERCHE UNIFIÉE EN 2 ÉTAPES pour le domaine:', currentDomain);

      // Construire l'historique de conversation pour le contexte
      const historyForAPI = chatState.messages.slice(1).map((msg) => ({
        role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content,
      }));

      // Si la question concerne explicitement le forfait, utiliser la recherche avec extraction de nombre
      if (isForfaitQuestion(question)) {
        console.log('📊 Question forfait détectée - recherche avec extraction de nombre');
        try {
          const res = await searchInternalDocsWithNumber(question, historyForAPI);
          console.log('📊 Résultat recherche forfait:', { 
            number: res.number, 
            sectionsUsed: res.sectionsUsed,
            textPreview: res.text.substring(0, 100) + '...'
          });
          
          if (res?.number) {
            return `✅ **Forfait annuel** : ${res.number} jours de télétravail par an\n\n*📞 Contact : Service RH - 01 40 85 64 64*`;
          }
          if (String(res?.text || '').toLowerCase().includes('je ne trouve pas')) {
            return res.text;
          }
          // Si on a une réponse mais pas de nombre extrait, retourner le texte
          if (res.text) {
            return res.text;
          }
        } catch (e) {
          console.error('Erreur recherche forfait:', e);
        }

        // Fallback sécurisé si la recherche échoue
        return `✅ **Forfait annuel** : 15 jours de télétravail par an\n\n*📞 Contact : Service RH - 01 40 85 64 64*`;
      }

      // Pour toutes les autres questions internes, utiliser la recherche unifiée
      try {
        console.log('🔍 Lancement de la recherche unifiée en 2 étapes...');
        const reply = await searchInternalDocs(question, historyForAPI);
        console.log('✅ Réponse de la recherche unifiée:', reply.substring(0, 150) + '...');
        return reply;
      } catch (err) {
        console.error('❌ Erreur lors de la recherche unifiée:', err);
        return "Erreur lors de l'analyse des documents internes. Contactez le service RH au 01 40 85 64 64.";
      }
    } else if (currentDomain === 4) {
      // Domaine IA fonction publique avec prompt spécialisé Légifrance
      systemPrompt = `
Tu es un juriste spécialiste de la fonction publique. Tu réponds exclusivement en te référant au site de Légifrance et au Code général de la fonction publique.

SOURCES AUTORISÉES :
1. Site Legifrance (https://www.legifrance.gouv.fr/)
2. Code général de la fonction publique : https://www.legifrance.gouv.fr/download/pdf/legiOrKali?id=LEGITEXT000044416551.pdf&size=1,8%20Mo&pathToFile=/LEGI/TEXT/00/00/44/41/65/51/LEGITEXT000044416551/LEGITEXT000044416551.pdf&title=Code%20général%20de%20la%20fonction%20publique

RÈGLES STRICTES :
- Tu n'inventes pas de réponse
- Tu cites toujours soit la référence de la loi, du décret, soit la référence de la jurisprudence administrative
- Recherche prioritairement dans le Code général de la fonction publique pour les questions relatives à la fonction publique

Format de réponse attendu :
- Réponse précise basée sur les textes légaux
- Citation systématique des références (ex: "Article L. 123-4 du Code général de la fonction publique", "Décret n° 2021-123 du...", "CE, 12 mars 2021, req. n° 123456")
- Si tu ne trouves pas d'information précise sur Légifrance ou dans le Code général de la fonction publique, indique clairement "Aucune référence trouvée sur Légifrance pour cette question spécifique"
      `;

      const history = chatState.messages.slice(1).map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.content,
      }));
      const apiMessages = [{ role: "system", content: systemPrompt }, ...history, { role: "user", content: question }];
      return await appelPerplexity(apiMessages);
    }

    // Pour les autres domaines, utiliser l'API Perplexity normale
    console.log('🌐 UTILISATION DE L\'API PERPLEXITY pour le domaine:', currentDomain);
    console.log('❌ ERREUR: Ce domaine ne devrait pas utiliser l\'API externe!');
    const history = chatState.messages.slice(1).map((msg) => ({
      role: msg.type === "user" ? "user" : "assistant",
      content: msg.content,
    }));
    const apiMessages = [{ role: "system", content: systemPrompt }, ...history, { role: "user", content: question }];
    return await appelPerplexity(apiMessages);
  };

  const handleSendMessage = async (text?: string): Promise<void> => {
    // Vérification et conversion sécurisée du texte
    const textToSend = text || inputValue;
    const q = typeof textToSend === 'string' ? textToSend.trim() : '';
    
    console.log('handleSendMessage appelé avec:', { 
      text, 
      inputValue, 
      textToSend, 
      q, 
      isProcessing: chatState.isProcessing,
      selectedDomain: chatState.selectedDomain,
      source: text ? 'VOICE' : 'MANUAL'
    });
    
    if (!q) {
      console.log('Aucun texte à envoyer');
      return;
    }
    
    if (chatState.isProcessing) {
      console.log('Déjà en cours de traitement, ignore');
      return;
    }
    
    console.log('Envoi du message:', q);
    const userMsg: ChatMessage = { type: "user", content: q, timestamp: new Date() };
    setChatState((p) => ({ ...p, messages: [...p.messages, userMsg], isProcessing: true }));
    setInputValue("");
    setInterimText("");
    
    try {
      console.log('Appel de traiterQuestion...');
      
      // Pour la question orale, forcer le même état que la question écrite
      if (text) {
        console.log('🎤 QUESTION ORALE - Forçage du processus identique à la question écrite');
        // S'assurer que l'état est identique à une question écrite
        setInterimText("");
        setIsListening(false);
      }
      
      const reply = await traiterQuestion(q);
      console.log('Réponse reçue:', reply);
      const assistantMsg: ChatMessage = { type: "assistant", content: reply, timestamp: new Date() };
      setChatState((p) => ({ ...p, messages: [...p.messages, assistantMsg], isProcessing: false }));
    } catch (error) {
      console.error('Erreur dans handleSendMessage:', error);
      const errMsg: ChatMessage = {
        type: "assistant",
        content: "Erreur lors du traitement. Veuillez réessayer.",
        timestamp: new Date(),
      };
      setChatState((p) => ({ ...p, messages: [...p.messages, errMsg], isProcessing: false }));
    } finally {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log('⌨️ ENVOI MANUEL (ENTRÉE):', inputValue);
      console.log('⌨️ État avant envoi:', { 
        selectedDomain: chatState.selectedDomain,
        isProcessing: chatState.isProcessing,
        messagesCount: chatState.messages.length
      });
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    console.log('toggleListening appelé, isListening:', isListening);
    console.log('recognitionRef.current:', !!recognitionRef.current);
    
    if (!recognitionRef.current) {
      console.error('Reconnaissance vocale non initialisée');
      alert('Reconnaissance vocale non disponible');
      return;
    }
    
    try {
      if (isListening) {
        console.log('Arrêt de la reconnaissance vocale');
        recognitionRef.current.stop();
        setIsListening(false);
        // Nettoyer le timeout de silence
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = null;
        }
      } else {
        console.log('Démarrage de la reconnaissance vocale');
        // S'assurer qu'aucune reconnaissance n'est en cours
        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop();
          } catch (e) {
            // Ignorer l'erreur si déjà arrêté
          }
        }
        // Petit délai avant de redémarrer
        setTimeout(() => {
          if (recognitionRef.current) {
            recognitionRef.current.start();
          }
        }, 100);
      }
    } catch (error) {
      console.error('Erreur lors du toggle:', error);
      setIsListening(false);
      alert('Erreur lors de l\'activation de la reconnaissance vocale');
    }
  };

  return (
    <div className="min-h-screen relative font-sans overflow-hidden">
      {/* Modern Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
        <div className="absolute inset-0 bg-[url('./unnamed.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Enhanced snow effect (many small flakes falling) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(120)].map((_, i) => {
            const size = (Math.random() * 3 + 1).toFixed(2); // 1 - 4 px
            const left = (Math.random() * 100).toFixed(2);
            const delay = (Math.random() * 20).toFixed(2);
            const duration = (8 + Math.random() * 22).toFixed(2);
            const opacity = (0.25 + Math.random() * 0.8).toFixed(2);
            return (
              <div
                key={i}
                className="snowflake absolute rounded-full bg-white"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  top: `${-10 - Math.random() * 50}%`,
                  opacity,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`
                }}
              />
            );
          })}

          <style dangerouslySetInnerHTML={{ __html: `
            .snowflake { filter: drop-shadow(0 1px 2px rgba(255,255,255,0.05)); }
            @keyframes fall {
              0% { transform: translateY(0) translateX(0) rotate(0deg); }
              100% { transform: translateY(120vh) translateX(40px) rotate(360deg); }
            }
            /* slight horizontal sway variation */
            @keyframes fall-sway {
              0% { transform: translateY(0) translateX(0) rotate(0deg); }
              25% { transform: translateY(30vh) translateX(10px) rotate(45deg); }
              50% { transform: translateY(60vh) translateX(-10px) rotate(180deg); }
              75% { transform: translateY(90vh) translateX(5px) rotate(270deg); }
              100% { transform: translateY(120vh) translateX(40px) rotate(360deg); }
            }
            .snowflake { animation-name: fall, fall-sway; animation-timing-function: linear, ease-in-out; animation-iteration-count: infinite, infinite; animation-fill-mode: both; }
          ` }} />
        </div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Podcast Player */}
      <PodcastPlayer />

{/* Modern Header */}
<header className="relative z-10 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-2xl">
  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-purple-500/10" />
  
  <div className="relative max-w-7xl mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      {/* Left side - Brand */}
      <div className="flex items-center space-x-6">
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse" />
          <div className="relative bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/30 shadow-xl">
            <Users className="w-12 h-12 text-white" />
        </div>
      </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-orange-100 to-red-100 bg-clip-text text-transparent drop-shadow-lg">
            Atlas
        </h1>
          <div className="flex items-center space-x-3">
            <span className="text-lg font-semibold text-white/90">Chatbot CFDT</span>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/70">Mairie de Gennevilliers</span>
          </div>
          <p className="text-sm text-white/80 flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Assistant syndical intelligent</span>
        </p>
      </div>
    </div>
      
      {/* Right side - Logo */}
      <div className="relative group">
        <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition duration-500 animate-pulse" />
        <div className="relative w-20 h-20 bg-white backdrop-blur-xl rounded-full border-2 border-white/30 shadow-2xl overflow-hidden">
      <img
        src="./logo-cfdt.jpg"
        alt="Logo CFDT"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
    
    {/* Status bar */}
    <div className="mt-3 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-white/80">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm">Système opérationnel</span>
        </div>
        <div className="flex items-center space-x-2 text-white/80">
          <Zap className="w-4 h-4" />
          <span className="text-sm">IA activée</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="text-sm text-white/80">Assistant disponible</div>
          <div className="text-xs text-white/60">24/7 pour les agents</div>
        </div>
      </div>
    </div>
  </div>
</header>
      
      {/* Bandeau NEWS FPT collé sous le header */}
      <div className="relative max-w-7xl mx-auto px-6 mt-6 z-10">
        <section className="relative mb-6 overflow-hidden rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-purple-500/20" />
          <div className="relative h-20 flex items-center overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-48 flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 z-20 shadow-xl">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-white" />
                <span className="text-xl font-bold text-white">NEWS FPT</span>
              </div>
            </div>
            <div className="animate-marquee whitespace-nowrap flex items-center pl-52" style={{ animation: "marquee 40s linear infinite" }}>
              {[...infoItems, ...infoItems].map((info, idx) => (
                <button
                  key={`${info.id}-${idx}`}
                  onClick={() => setSelectedInfo(info)}
                  className="group mx-8 text-white/90 hover:text-white transition-all duration-300 flex items-center space-x-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg">
                    {info.id}
                  </div>
                  <span className="text-lg font-medium underline decoration-dotted decoration-white/50 group-hover:decoration-white transition-all">
                    {info.title}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
            `
          }} />
        </section>
      </div>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-12 z-10">
        {chatState.currentView === "menu" ? (
          <>
            {/* Modern News Ticker removed from here (now placed under header) */}

            {/* Modern Info Detail Modal */}
            {selectedInfo && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedInfo(null)} />
                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 max-w-4xl w-full max-h-[80vh] overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <Info className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{selectedInfo.title}</h3>
                      </div>
                      <button 
                        onClick={() => setSelectedInfo(null)}
                        className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200"
                      >
                        <X className="w-6 h-6 text-white" />
                </button>
                    </div>
                  </div>
                  <div className="p-8 overflow-y-auto max-h-[60vh]">
                    <div className="prose prose-lg max-w-none">
                      <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{selectedInfo.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modern Section Title */}
            <section className="text-center mb-16">
              <div className="inline-flex items-center space-x-4 mb-6">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-orange-100 to-red-100 bg-clip-text text-transparent">
  Choisissez votre domaine d'assistance
                </h2>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
              </div>
            </section>

            {/* Modern Documents Internes Section */}
            <div className="mb-16">
              <div className="group relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl transition-all duration-500 hover:bg-white/15 hover:shadow-3xl hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-12">
                  <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left side - Icon and info */}
                    <div className="flex-shrink-0 text-center lg:text-left">
                      <div className="relative group/icon">
                        <div className="absolute -inset-4 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl blur-xl opacity-60 group-hover/icon:opacity-80 transition-all duration-300" />
                        <div className="relative p-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-2xl group-hover/icon:scale-110 group-hover/icon:rotate-3 transition-all duration-300 text-center">
                          <FileText className="w-16 h-16 text-white mb-4 mx-auto" />
                          <h3 className="text-2xl font-bold text-white mb-4">Documents Internes</h3>
                          <div className="space-y-2">
                            <div className="text-white/95 text-xs font-medium">⏰ Temps de travail</div>
                            <div className="text-white/95 text-xs font-medium">🎓 Formation</div>
                            <div className="text-white/95 text-xs font-medium">🏠 Télétravail</div>
                            <div className="text-white/95 text-xs font-medium">💰 Primes</div>
                  </div>
                        </div>
                      </div>
                </div>
                  
                    {/* Right side - Search interface */}
                    <div className="flex-1 w-full max-w-2xl">
                      <div className="space-y-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-lg" />
                          <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center space-x-3 mb-4">
                              <Search className="w-5 h-5 text-white/80" />
                              <span className="text-white/90 font-medium">Recherche intelligente</span>
                            </div>
                            
                            <div className="flex gap-3">
                              <div className="flex-1 relative">
                      <input
                        type="text"
                        value={internalDocQuestion}
                        onChange={(e) => setInternalDocQuestion(e.target.value)}
                                  placeholder="Posez votre question sur nos documents internes..."
                                  className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                        onKeyPress={async (e) => {
                          if (e.key === 'Enter' && internalDocQuestion.trim()) {
                            await handleInternalDocSelection(internalDocQuestion.trim());
                            setInternalDocQuestion("");
                          }
                        }}
                      />
                              </div>
              <button
                        onClick={async () => {
                          if (internalDocQuestion.trim()) {
                            await handleInternalDocSelection(internalDocQuestion.trim());
                            setInternalDocQuestion("");
                          } else {
                            await handleInternalDocSelection();
                          }
                        }}
                                className="px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                                <Send className="w-5 h-5" />
                        {internalDocQuestion.trim() ? "Poser" : "Ouvrir"}
                      </button>
                  </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                  </div>
                </div>
            </div>

            {/* Modern Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Recherche Juridique */}
              <button
                onClick={() => handleDomainSelection(3)}
                className="group relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 transition-all duration-500 hover:bg-white/15 hover:shadow-3xl hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col items-center gap-6">
                  <div className="relative group/icon">
                    <div className="absolute -inset-3 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl blur-lg opacity-60 group-hover/icon:opacity-80 transition-all duration-300" />
                    <div className="relative p-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-xl group-hover/icon:scale-110 group-hover/icon:rotate-3 transition-all duration-300 text-center">
                      <Scale className="w-12 h-12 text-white mb-4 mx-auto" />
                      <h4 className="text-xl font-bold text-white mb-3">
                        Recherche Juridique
                  </h4>
                      <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                        Accès direct à la base de données juridique administrative
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-sm font-medium">Accéder</span>
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>

              {/* IA Fonction Publique */}
              <button
                onClick={() => handleDomainSelection(4)}
                className="group relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 transition-all duration-500 hover:bg-white/15 hover:shadow-3xl hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col items-center gap-6">
                  <div className="relative group/icon">
                    <div className="absolute -inset-3 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl blur-lg opacity-60 group-hover/icon:opacity-80 transition-all duration-300" />
                    <div className="relative p-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl group-hover/icon:scale-110 group-hover/icon:rotate-3 transition-all duration-300 text-center">
                      <Bot className="w-12 h-12 text-white mb-4 mx-auto" />
                      <h4 className="text-xl font-bold text-white mb-3">
                        IA Fonction Publique
                      </h4>
                      <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                        Juriste IA avec références Légifrance précises
                      </p>
                  </div>
                  </div>
                  
                  <div className="flex items-center text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-sm font-medium">Accéder</span>
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>

              {/* FAQ */}
              <button
                onClick={() => handleDomainSelection(5)}
                className="group relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 transition-all duration-500 hover:bg-white/15 hover:shadow-3xl hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col items-center gap-6">
                  <div className="relative group/icon">
                    <div className="absolute -inset-3 bg-gradient-to-br from-rose-400 to-pink-600 rounded-2xl blur-lg opacity-60 group-hover/icon:opacity-80 transition-all duration-300" />
                    <div className="relative p-8 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl shadow-xl group-hover/icon:scale-110 group-hover/icon:rotate-3 transition-all duration-300 text-center">
                      <HelpCircle className="w-12 h-12 text-white mb-4 mx-auto" />
                      <h4 className="text-xl font-bold text-white mb-3">
                        FAQ
                      </h4>
                      <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                        Questions fréquentes sur télétravail et formation
                      </p>
                  </div>
                  </div>
                  
                  <div className="flex items-center text-rose-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-sm font-medium">Consulter</span>
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            </div>
            
            {/* Modern News Section removed and relocated above footer */}
          </>
        ) : chatState.currentView === "faq" ? (
          <FAQSection onReturn={returnToMenu} />
        ) : (
          // Modern Chat Interface
          <div ref={chatContainerRef} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={returnToMenu} 
                    className="text-white hover:text-orange-200 p-3 rounded-full hover:bg-white/10 transition-all duration-200 group"
                  >
                    <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </button>
                  
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-white/20 rounded-full blur-lg opacity-50" />
                      <div className="relative w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                <div>
                      <h3 className="text-2xl font-bold text-white">
                    {chatState.selectedDomain === 0 && "Assistant Temps de Travail"}
                    {chatState.selectedDomain === 1 && "Assistant Formation"}
                    {chatState.selectedDomain === 2 && "Assistant Télétravail"}
                    {chatState.selectedDomain === 3 && "Recherche Juridique"}
                    {chatState.selectedDomain === 4 && "Juriste IA fonction publique"}
                    {chatState.selectedDomain === 5 && "FAQ"}
                    {chatState.selectedDomain === 6 && "Actualités"}
                    {chatState.selectedDomain === 7 && "Documentation"}
                    {chatState.selectedDomain === 8 && "Dialogue social"}
                    {chatState.selectedDomain === 9 && "Assistant PRIMES"}
                  </h3>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <p className="text-orange-100 text-sm">Assistant en ligne - Prêt à vous aider</p>
                </div>
              </div>
                  </div>
            </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-white/90 text-sm font-medium">CFDT Gennevilliers</div>
                    <div className="text-orange-200 text-xs">Support syndical</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[45vh] sm:h-[50vh] md:h-[60vh] overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white/5 to-white/10">
              {chatState.messages.map((msg, i) => (
                <div key={i} className={`flex items-end gap-3 ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.type === 'assistant' && (
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur opacity-50" />
                      <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center shrink-0 text-sm font-bold shadow-lg">
                        CFDT
                      </div>
                    </div>
                  )}
                  
                  <div className={`flex ${msg.type === "user" ? "flex-row-reverse" : "flex-row"} items-start gap-4 max-w-4xl`}>
                    <div
                      className={`relative max-w-[80%] px-6 py-4 rounded-3xl shadow-lg backdrop-blur-sm ${
                        msg.type === "user"
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-br-lg"
                          : "bg-white/90 border border-white/20 text-gray-800 rounded-bl-lg"
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-3xl opacity-50" />
                      <div className="relative">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        <div className={`flex items-center gap-2 mt-3 text-xs ${
                          msg.type === "user" ? "text-white/70 justify-end" : "text-gray-500"
                        }`}>
                          <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          {msg.type === 'assistant' && (
                            <div className="flex items-center gap-1">
                              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                              <span>En ligne</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Afficher le GIF manga seulement pour le premier message de l'assistant */}
                    {i === 0 && msg.type === 'assistant' && (
                      <div className="hidden lg:block ml-8 -mt-16">
                        <div className="relative">
                          <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl blur-xl opacity-30 animate-pulse" />
                        <img 
                          src="./cfdtmanga.gif" 
                          alt="CFDT Manga" 
                            className="relative w-80 h-80 object-contain rounded-2xl shadow-2xl"
                        />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {chatState.isProcessing && (
                <div className="flex items-end gap-3 justify-start">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur opacity-50 animate-pulse" />
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center shrink-0 text-sm font-bold shadow-lg">
                      CFDT
                    </div>
                  </div>
                  <div className="relative max-w-[80%] px-6 py-4 rounded-3xl shadow-lg backdrop-blur-sm bg-white/90 border border-white/20 rounded-bl-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">L'assistant réfléchit...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
              
              {/* Indicateur de reconnaissance vocale en cours */}
              {isListening && interimText && (
                <div className="flex items-end gap-3 justify-start">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur opacity-50 animate-pulse" />
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center shrink-0 text-sm font-bold shadow-lg">
                    🎤
                  </div>
                  </div>
                  <div className="relative max-w-[80%] px-6 py-4 rounded-3xl shadow-lg backdrop-blur-sm bg-blue-100/90 border border-blue-300/30 rounded-bl-lg">
                    <p className="text-sm text-blue-800 italic">{interimText}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
                      <p className="text-xs text-blue-600">En cours d'écoute...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-white/10 backdrop-blur-xl border-t border-white/20">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-lg opacity-50" />
                  <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre question ici..."
                      className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-base"
                  disabled={chatState.isProcessing}
                />
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                <button
                  onClick={toggleListening}
                  disabled={chatState.isProcessing || !speechSupported}
                    className={`relative p-4 rounded-2xl transition-all duration-200 flex items-center justify-center shadow-lg group ${
                    !speechSupported
                        ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                      : isListening 
                          ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white animate-pulse hover:from-red-600 hover:to-pink-700' 
                          : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 hover:scale-105'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  title={
                    !speechSupported 
                      ? "Reconnaissance vocale non supportée" 
                      : isListening 
                        ? "Arrêter l'écoute" 
                        : "Parler"
                  }
                >
                    <div className="absolute -inset-1 bg-white/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                    {isListening ? <MicOff className="w-5 h-5 relative" /> : <Mic className="w-5 h-5 relative" />}
                </button>
                  
                <button
                  onClick={() => {
                    console.log('🔘 ENVOI MANUEL (BOUTON):', inputValue);
                    console.log('🔘 État avant envoi:', { 
                      selectedDomain: chatState.selectedDomain,
                      isProcessing: chatState.isProcessing,
                      messagesCount: chatState.messages.length
                    });
                    handleSendMessage();
                  }}
                  disabled={!inputValue.trim() || chatState.isProcessing}
                    className="relative p-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg group hover:scale-105"
                >
                    <div className="absolute -inset-1 bg-white/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Send className="w-5 h-5 relative" />
                </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 text-sm text-white/70">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>Assistant disponible</span>
                  </div>
                  {speechSupported && (
                    <div className="flex items-center gap-2">
                      <Mic className="w-4 h-4" />
                      <span>Reconnaissance vocale activée</span>
                    </div>
                  )}
                </div>
                <div className="text-white/50">
                  Appuyez sur Entrée pour envoyer
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      {/* Modern News Section (RSS) - placé au-dessus du footer */}
      <div className="relative mb-8 max-w-7xl mx-auto px-6 z-10">
        <div className="relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10" />
          <div className="relative p-8">
            {/* Title panel removed as requested */}

            <div className="w-full relative">
              <NewsTicker />

              {/* Fenêtre 'Actu' à gauche avec fond opaque */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 pointer-events-none">
                <div className="w-56 h-20 bg-white/95 border border-white/20 rounded-2xl shadow-2xl flex items-center justify-center text-gray-900 font-semibold">
                  <div className="text-lg">Actu</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Footer */}
<footer className="relative backdrop-blur-xl bg-white/10 border-t border-white/20 py-6 z-10">
  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-red-500/5 to-purple-500/5" />
  
  <div className="relative max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Contact CFDT */}
      <div className="text-center md:text-left">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h4 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
          Contact CFDT
        </h4>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-center md:justify-start gap-3 text-white/80 hover:text-white transition-colors">
            <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
              <Phone className="w-4 h-4 text-orange-400" />
            </div>
            <span>01 40 85 64 64</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3 text-white/80 hover:text-white transition-colors">
            <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
              <Mail className="w-4 h-4 text-orange-400" />
            </div>
            <a
              href="mailto:cfdt-interco@ville-gennevilliers.fr"
              className="hover:text-orange-300 transition-colors"
            >
              cfdt-interco@ville-gennevilliers.fr
            </a>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3 text-white/80">
            <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-orange-400" />
            </div>
            <span>Mairie de Gennevilliers</span>
          </div>
        </div>
      </div>
      
      {/* Services */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h4 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Services
        </h4>
        </div>
        <ul className="space-y-3 text-white/80">
          <li className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Santé</span>
          </li>
          <li className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Retraite</span>
          </li>
          <li className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Juridique</span>
          </li>
          <li className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Accompagnement syndical</span>
          </li>
        </ul>
      </div>
      
      {/* Horaires */}
      <div className="text-center md:text-right">
        <div className="flex items-center justify-center md:justify-end gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <h4 className="text-xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
          Horaires
        </h4>
        </div>
        <div className="space-y-3 text-white/80">
          <div className="text-lg font-medium text-white">Lundi - Vendredi</div>
          <div className="text-xl font-bold text-white bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
            9h00-12h00 / 13h30-17h00
      </div>
          <div className="text-sm text-white/60">Permanences sur RDV</div>
          <div className="flex items-center justify-center md:justify-end gap-2 mt-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-green-300">Ouvert maintenant</span>
    </div>
        </div>
      </div>
    </div>
    
    <div className="border-t border-white/20 mt-6 pt-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-white/80">
            © 2025 CFDT Gennevilliers
          </div>
          <div className="w-1 h-1 bg-white/40 rounded-full" />
          <div className="text-white/60">
            Assistant IA pour les agents municipaux
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-white/70">
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-sm">Powered by AI</span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm">Sécurisé</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}
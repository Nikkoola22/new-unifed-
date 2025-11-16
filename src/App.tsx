import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Phone, Mail, MapPin, ArrowRight, Send, ArrowLeft, Search, Rss, Calculator, PieChart, PiggyBank, Grid3X3 } from "lucide-react"

// --- IMPORTATIONS DES DONNÉES ---
import { sommaire } from "./data/sommaire.ts"
import { chapitres } from "./data/temps.ts"
import { formation } from "./data/formation.ts"
import { teletravailData } from "./data/teletravail.ts"
import { infoItems } from "./data/info-data.ts"
import { franceInfoRss } from "./data/rss-data.ts"
import AdminPanel from "./components/AdminPanel.tsx"
import CalculateurCIA from "./components/CalculateurCIA.tsx"
import CalculateurPrimes from "./components/CalculateurPrimes.tsx"
import Calculateur13eme from "./components/Calculateur13eme.tsx"
import GrillesIndiciaires from "./components/GrillesIndiciaires.tsx"
import { faqData } from "./data/FAQdata.ts"


// --- CONFIGURATION API PERPLEXITY ---
const BACKEND_API_URL = "/api/completions"

// --- RSS ITEM TYPE ---
interface RssItem {
  title: string
  link: string
  pubDate: string
}

// --- TYPES ---
interface ChatMessage {
  type: "user" | "assistant"
  content: string
  timestamp: Date
}
interface InfoItem {
  id: number
  title: string
  content: string
}
interface ChatbotState {
  currentView: "menu" | "chat" | "calculators" | "faq"
  selectedDomain: number | null
  messages: ChatMessage[]
  isProcessing: boolean
}

// --- PARSING DES DONNÉES ---
const sommaireData = typeof sommaire === 'string' ? JSON.parse(sommaire) : sommaire

// --- OUTILS: Normalisation tolérante aux fautes ---
const normaliserFaute = (s: string): string => {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/(es|s|x)\b/g, "") // pluriels FR simples
    .trim()
}

const distanceEdition = (a: string, b: string): number => {
  const m = a.length, n = b.length
  if (!m) return n
  if (!n) return m
  const dp = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      )
    }
  }
  return dp[m][n]
}

// --- FONCTION DE RECHERCHE AMÉLIORÉE AVEC IA (sans scoring préalable) ---
const trouverContextePertinentAvecIA = async (question: string): Promise<string> => {
  // Index compact de tous les chapitres (titres + mots-clés principaux)
  const indexChapitres = sommaireData.chapitres.map((ch: any) => {
    const keywords = [
      ...(ch.mots_cles || []),
      ...(ch.articles?.flatMap((a: any) => a.mots_cles || []) || [])
    ].slice(0, 12) // limiter pour rester concis
    return `[#${ch.idContenu}] ${ch.titre}\nMots-clés: ${keywords.join(', ').slice(0, 300)}`
  }).join('\n\n')

  const promptIA = `Tu es un assistant et tu DOIS tolérer les fautes d'orthographe/grammaire et les abréviations.
Analyse la question et choisis le chapitre interne le plus pertinent.

QUESTION: "${question}"

LISTE DES CHAPITRES:
${indexChapitres}

Règles:
- Tolérance maximale aux fautes (corrige mentalement les mots)
- Ne fais pas d'inférence externe, base-toi sur les titres/mots-clés
- Réponds UNIQUEMENT par l'identifiant numérique après # (ex: 5), rien d'autre.`

  try {
    const response = await fetch(BACKEND_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [ { role: "user", content: promptIA } ],
        max_tokens: 8,
        temperature: 0.0,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      const txt = (data.choices?.[0]?.message?.content || "").trim()
      const m = txt.match(/(\d{1,3})/)
      if (m) {
        const idChoisi = parseInt(m[1], 10)
        const chapitre = sommaireData.chapitres.find((c: any) => (c.idContenu || 0) === idChoisi)
        if (chapitre) {
          let contenuTexte: string | null = null
          if (chapitre.source === "teletravail") {
            contenuTexte = typeof teletravailData === 'string' ? teletravailData : JSON.stringify(teletravailData)
          } else if (chapitre.source === "formation") {
            contenuTexte = formation || null
          } else {
            contenuTexte = (chapitres as Record<number, string>)[idChoisi] || null
          }
          if (contenuTexte) {
            return `Source: ${chapitre.titre}\nContenu: ${contenuTexte}`
          }
        }
      }
    }
  } catch (e) {
    console.warn("Sélection IA impossible, on passe au fallback tolérant:", e)
  }

  // Fallback tolérant: matching flou question ↔ mots-clés de tous les chapitres
  const q = normaliserFaute(question)
  let meilleur: { id: number; titre: string; score: number } | null = null
  for (const ch of sommaireData.chapitres as any[]) {
    const mots = [
      ...(ch.mots_cles || []),
      ...(ch.articles?.flatMap((a: any) => a.mots_cles || []) || [])
    ]
    let score = 0
    for (const mc of mots) {
      const nmc = normaliserFaute(mc)
      if (!nmc) continue
      const d = distanceEdition(q.slice(0, 24), nmc.slice(0, 24)) // petite fenêtre
      if (q.includes(nmc)) score += 8
      else if (nmc.includes(q)) score += 6
      else if (d <= 2) score += 5
      else if (d <= 3) score += 3
    }
    if (!meilleur || score > meilleur.score) {
      meilleur = { id: ch.idContenu, titre: ch.titre, score }
    }
  }

  if (meilleur && meilleur.score > 0) {
    const chSel = (sommaireData.chapitres as any[]).find(c => c.idContenu === meilleur!.id)
    if (chSel) {
      let contenuTexte: string | null = null
      if (chSel.source === "teletravail") {
        contenuTexte = typeof teletravailData === 'string' ? teletravailData : JSON.stringify(teletravailData)
      } else if (chSel.source === "formation") {
        contenuTexte = formation || null
      } else {
        contenuTexte = (chapitres as Record<number, string>)[meilleur.id] || null
      }
      if (contenuTexte) {
        return `Source: ${chSel.titre}\nContenu: ${contenuTexte}`
      }
    }
  }

  // Dernier recours: message générique
  return "Aucun chapitre spécifique trouvé pour cette question. Voici un aperçu général des thèmes: " +
    (sommaireData.chapitres as any[]).map((s: any) => s.titre).join(", ")
}

// --- LOGIQUE DU CHAT UNIFIÉ ---

function App() {
  // --- ÉTATS & REFS ---
  const [chatState, setChatState] = useState<ChatbotState>({
    currentView: "menu",
    selectedDomain: null,
    messages: [],
    isProcessing: false,
  })
  const [inputValue, setInputValue] = useState("")
  const [selectedInfo, setSelectedInfo] = useState<InfoItem | null>(null)
  const [rssItems, setRssItems] = useState<RssItem[]>([])
  const [rssLoading, setRssLoading] = useState(false)
  const [activeCalculator, setActiveCalculator] = useState<'primes' | 'cia' | '13eme' | 'grilles' | null>(null)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  // Admin toggles for calculator visibility
  const [showIFSE, setShowIFSE] = useState(true)
  const [showCIA, setShowCIA] = useState(true)
  const [show13eme, setShow13eme] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // --- EFFETS ---
  useEffect(() => {
    if (chatState.currentView === "chat" && messagesEndRef.current) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
      })
    }
  }, [chatState.messages, chatState.currentView])

  // --- CHARGER LES ARTICLES RSS ---
  useEffect(() => {
    const fetchRssFeeds = async () => {
      try {
        setRssLoading(true)
        
        // Utiliser le proxy Vite qui redirige vers le serveur Express
        const response = await fetch('/api/rss')
        
        if (!response.ok) {
          console.warn(`Erreur backend: ${response.status}`)
          throw new Error(`Erreur serveur: ${response.status}`)
        }
        
        const data = await response.json()
        const items = data.items || []
        
        if (items.length > 0) {
          // Formater les articles avec le bullet point
          const formattedItems = items.slice(0, 5).map((item: any) => ({
            title: item.title.startsWith('•') ? item.title : `• ${item.title}`,
            link: item.link || '#',
            pubDate: item.pubDate || new Date().toISOString()
          }))
          setRssItems(formattedItems)
        } else {
          throw new Error('Aucun article trouvé')
        }
      } catch (error) {
        console.warn('Impossible de récupérer les flux RSS via le backend, utilisation des données par défaut', error)
        setRssItems(franceInfoRss)
      } finally {
        setRssLoading(false)
      }
    }
    
    fetchRssFeeds()
    
    // Rafraîchir tous les 30 minutes
    const interval = setInterval(fetchRssFeeds, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // --- FONCTIONS DE GESTION ---
  const handleInfoClick = (info: InfoItem) => setSelectedInfo(info)

  const handleDomainSelection = (domainId: number) => {
    setChatState({
      currentView: "chat",
      selectedDomain: domainId,
      messages: [
        {
          type: "assistant",
          content: "Bonjour ! Je suis votre assistant CFDT unifié. Je peux vous aider avec toutes vos questions sur le temps de travail, la formation, le télétravail et bien plus encore. Que souhaitez-vous savoir ?",
          timestamp: new Date(),
        },
      ],
      isProcessing: false,
    })

    setTimeout(() => {
      if (chatContainerRef.current) {
        const headerHeight = 200 // Approximate header height
        const chatPosition = chatContainerRef.current.offsetTop
        const scrollPosition = Math.max(0, chatPosition - headerHeight)

        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        })
      }
      inputRef.current?.focus()
    }, 100)
  }

  const returnToMenu = () => {
    setChatState({ currentView: "menu", selectedDomain: null, messages: [], isProcessing: false })
    setInputValue("")
    setSelectedInfo(null)
  }

  // --- LOGIQUE DU CHAT UNIFIÉ ---
  const appelPerplexity = async (messages: any[]) => {
    try {
      // Utilise sonar-pro : meilleur modèle disponible
      const data = { 
        model: "sonar-pro",
        messages,
        max_tokens: 1000,
        temperature: 0.0,
      }
      const response = await fetch(BACKEND_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        const errorBody = await response.text()
        console.error("Détail de l'erreur API:", errorBody)
        throw new Error(`Erreur API (${response.status}): ${response.statusText}`)
      }
      
      const result = await response.json()
      console.log("✅ Réponse Perplexity reçue:", result)
      
      return result.choices[0].message.content
    } catch (error) {
      console.error("Erreur lors du traitement de la question:", error)
      return "__API_ERROR__"
    }
  }

  // Fallback local: construit une courte réponse à partir du contexte interne
  const construireReponseLocale = (question: string, contexte: string): string => {
    const qn = normaliserFaute(question)
    // Cas spécifiques utiles
    if (qn.includes('formation') && (qn.includes('obligatoir') || qn.includes('obligatoire'))) {
      return "Formations obligatoires: formation d’intégration, professionnalisation (prise de poste, parcours), hygiène et sécurité."
    }
    // Par défaut: extraire les premières lignes de contenu
    const contenuMatch = contexte.split('\nContenu: ')[1] || contexte
    const extrait = contenuMatch.replace(/\n+/g, ' ').slice(0, 240)
    return extrait ? `${extrait}${extrait.length >= 240 ? '…' : ''}` : "Je n'ai pas assez d'éléments dans le contexte interne."
  }

  const traiterQuestion = async (question: string) => {
    // Utiliser la version améliorée avec IA pour une meilleure pertinence
    const contexteInterne = await trouverContextePertinentAvecIA(question)
    
    // Check if internal context was found (not the generic "not found" message)
    const hasInternalContent = !contexteInterne.includes("Je ne trouve pas")

    let systemPrompt = `You are a friendly HR colleague at the City of Gennevilliers helping coworkers with questions about HR policies.

TONE & STYLE:
- Be friendly, conversational, and brief
- Answer like you're talking to a colleague at lunch
- Keep responses SHORT (2-3 sentences max)
- Use simple, everyday French
- Be helpful and warm

PRIORITY - INTERNAL DOCUMENTATION FIRST:
1. Always check internal documentation first
2. If found, answer with ONLY that information - don't add external sources
3. If NOT found, respond with: "Je ne trouve pas cette information dans nos documents internes. Contactez la CFDT au 01 40 85 64 64 pour plus de détails."

INTERNAL DOCUMENTATION:
--- DOCUMENTATION INTERNE DE LA MAIRIE DE GENNEVILLIERS ---
${contexteInterne}
--- FIN DOCUMENTATION INTERNE ---`

    // If no internal content found, switch to legifrance-only search
    if (!hasInternalContent) {
      systemPrompt = `You are a friendly HR colleague at the City of Gennevilliers helping coworkers with questions about French HR policies.

TONE & STYLE:
- Be friendly, conversational, and brief
- Answer like you're talking to a colleague at lunch
- Keep responses SHORT (2-3 sentences max)
- Use simple, everyday French
- Be helpful and warm

SEARCH INSTRUCTIONS:
1. Search ONLY on legifrance.gouv.fr (French law website)
2. Look for relevant employment code articles and regulations
3. Provide the most relevant information from legifrance.gouv.fr
4. If still not found, respond with: "Je ne trouve pas cette information sur legifrance.gouv.fr. Contactez la CFDT au 01 40 85 64 64 pour plus de détails."

Question: ${question}`
    }

    const conversationHistory = chatState.messages.slice(1).map((msg) => ({
      role: msg.type === "user" ? "user" : "assistant",
      content: msg.content,
    }))

    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: question },
    ]

    const reponseIA = await appelPerplexity(apiMessages)
    if (reponseIA === "__API_ERROR__" || reponseIA.includes("Je ne trouve pas cette information")) {
      // Fallback local tolérant aux fautes basé sur le contexte interne
      return construireReponseLocale(question, contexteInterne)
    }
    return reponseIA
  }

  const handleSendMessage = async () => {
    const question = inputValue.trim()
    if (!question || chatState.isProcessing) return
    const userMessage: ChatMessage = { type: "user", content: question, timestamp: new Date() }
    setChatState((prevState) => ({ ...prevState, messages: [...prevState.messages, userMessage], isProcessing: true }))
    setInputValue("")
    try {
      const reponseContent = await traiterQuestion(question)
      const assistantMessage: ChatMessage = { type: "assistant", content: reponseContent, timestamp: new Date() }
      setChatState((prevState) => ({ ...prevState, messages: [...prevState.messages, assistantMessage] }))
    } catch (error) {
      console.error("Erreur lors du traitement de la question:", error)
      const errorMessage: ChatMessage = {
        type: "assistant",
        content:
          "Désolé, une erreur est survenue. Veuillez réessayer ou contacter un représentant si le problème persiste.",
        timestamp: new Date(),
      }
      setChatState((prevState) => ({ ...prevState, messages: [...prevState.messages, errorMessage] }))
    } finally {
      setChatState((prevState) => ({ ...prevState, isProcessing: false }))
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // --- RENDU DU COMPOSANT ---
  return (
    <div className="min-h-screen relative">
      {/* Background image with transparency */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url('/unnamed.jpg')`, opacity: 0.3 }}
      ></div>

      {/* Subtle overlay for better text readability */}
      <div className="fixed inset-0 bg-black/20 z-0"></div>

      {/* HEADER PROFESSIONNEL */}
      <header className="relative bg-gradient-to-r from-slate-900/70 via-purple-900/70 to-slate-900/70 backdrop-blur-md shadow-lg border-b border-purple-500/20 z-10 bg-cover bg-center" style={{ backgroundImage: `url('/mairie.jpeg')`, backgroundBlendMode: 'overlay' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-purple-900/80 to-slate-900/80 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 relative z-10">
          <div className="flex items-center justify-between gap-8">
            {/* Logo et texte à gauche */}
            <div className="flex items-center gap-5 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src="/logo-cfdt.jpg"
                  alt="Logo CFDT"
                  className="w-32 h-32 object-contain relative transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="space-y-1">
                <h1 className="text-5xl font-light tracking-tight text-white">Atlas</h1>
                <p className="text-base text-slate-300 font-light">Assistant syndical CFDT</p>
              </div>
            </div>
            
            {/* Texte centre */}
            <div className="text-center flex-grow">
              <h2 className="text-2xl font-light text-slate-100 tracking-tight">Mairie de Gennevilliers</h2>
              <p className="text-base text-slate-400 mt-2 font-light">Chatbot d'assistance pour les agents municipaux</p>
            </div>
            
            {/* Contact à droite */}
            <div className="flex items-center gap-4 text-right">
            </div>
          </div>
        </div>
      </header>

      {/* Bandeau NEWS FPT - Pleine largeur sous le header */}
      <section className="relative bg-gradient-to-r from-orange-500/60 via-red-500/60 to-pink-500/60 backdrop-blur-md text-white overflow-hidden w-full shadow-lg border-b border-orange-400/30 z-10">
        <div className="relative h-16 flex items-center overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-40 flex items-center justify-center bg-gradient-to-r from-orange-600/80 to-red-600/80 backdrop-blur z-20 shadow-lg">
            <span className="text-lg font-light tracking-wide text-white">NEWS FPT:</span>
          </div>
          <div className="animate-marquee whitespace-nowrap flex items-center pl-44">
            {[...infoItems, ...infoItems].map((info, index) => (
              <button
                key={`${info.id}-${index}`}
                onClick={() => handleInfoClick(info)}
                className="text-lg font-light mx-6 hover:text-amber-200 transition-all duration-200 cursor-pointer hover:scale-105 text-white"
              >
                #{info.id}: {info.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="relative max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 z-10">
        {chatState.currentView === "menu" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
              {/* Colonne principale - pleine largeur */}
              <div className="lg:col-span-1">
                {selectedInfo && (
                  <section className="info-detail bg-gradient-to-br from-slate-800/80 via-purple-900/80 to-slate-800/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-purple-500/30 mb-8 max-w-4xl mx-auto hover:shadow-2xl transition-shadow">
                    <h3 className="text-3xl font-light bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">{selectedInfo.title}</h3>
                    <p className="text-slate-200 leading-relaxed">{selectedInfo.content}</p>
                    <button
                      onClick={() => setSelectedInfo(null)}
                      className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Fermer
                    </button>
                  </section>
                )}

                <div className="flex justify-center mb-1 gap-8">
                  <button
                    onClick={() => handleDomainSelection(0)}
                    className="group relative overflow-hidden bg-gradient-to-br from-slate-800/70 via-purple-900/70 to-slate-800/70 backdrop-blur-md border border-purple-500/30 rounded-2xl p-10 transition-all duration-500 hover:border-pink-500/50 hover:shadow-2xl hover:-translate-y-1 w-80 h-96"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10 flex flex-col items-center gap-6 h-full justify-between">
                      <div className="relative">
                        <span className="absolute -inset-3 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-2xl opacity-0 group-hover:opacity-100 transition blur-lg group-hover:scale-110"></span>
                        <div className="relative p-6 bg-gradient-to-br from-purple-500/80 to-pink-500/80 backdrop-blur rounded-2xl shadow-2xl group-hover:rotate-2 group-hover:scale-110 transition-all">
                          <Search className="w-16 h-16 text-white" />
                        </div>
                      </div>
                      <h4 className="text-2xl font-light tracking-tight text-white group-hover:text-pink-200">
                        Recherche Unifiée
                      </h4>
                      <p className="text-center text-slate-300 font-light text-sm">
                        Temps de travail, formation, télétravail - Recherche dans tous les documents
                      </p>
                      <div className="flex items-center gap-2 text-pink-400 opacity-0 group-hover:opacity-100 transition">
                        <span className="font-light text-sm">Accéder à l&apos;assistant</span>
                        <ArrowRight className="w-4 h-4 animate-pulse" />
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => { setChatState({ ...chatState, currentView: 'calculators' }); setActiveCalculator(null); }}
                    className="group relative overflow-hidden bg-gradient-to-br from-slate-800/70 via-blue-900/70 to-slate-800/70 backdrop-blur-md border border-blue-500/30 rounded-2xl p-10 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-2xl hover:-translate-y-1 w-80 h-96"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10 flex flex-col items-center gap-6 h-full justify-between">
                      <div className="relative">
                        <span className="absolute -inset-3 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-2xl opacity-0 group-hover:opacity-100 transition blur-lg group-hover:scale-110"></span>
                        <div className="relative p-6 bg-gradient-to-br from-blue-500/80 to-cyan-500/80 backdrop-blur rounded-2xl shadow-2xl group-hover:rotate-2 group-hover:scale-110 transition-all">
                          <Calculator className="w-16 h-16 text-white" />
                        </div>
                      </div>
                      <h4 className="text-2xl font-light tracking-tight text-white group-hover:text-cyan-200">
                        Calculateurs
                      </h4>
                      <p className="text-center text-slate-300 font-light text-sm">
                        Primes IFSE - Calcul CIA - Outils de simulation
                      </p>
                      <div className="flex items-center gap-2 text-cyan-400 opacity-0 group-hover:opacity-100 transition">
                        <span className="font-light text-sm">Accéder aux calculateurs</span>
                        <ArrowRight className="w-4 h-4 animate-pulse" />
                      </div>
                    </div>
                  </button>
                </div>
                {/* Petit bouton Questions fréquentes sous les deux icônes */}
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setChatState({ ...chatState, currentView: 'faq' })}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-full text-base font-medium shadow hover:from-amber-600 hover:to-amber-700 transition"
                  >
                    Questions fréquentes
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* --- PAGE FAQ --- */}
      {chatState.currentView === 'faq' && (
        <main className="relative max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 z-10">
          <section className="max-w-4xl mx-auto bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-purple-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-light text-white">Questions fréquentes</h2>
              <button
                onClick={() => setChatState({ ...chatState, currentView: 'menu' })}
                className="px-3 py-1 bg-slate-700/60 text-slate-200 rounded hover:bg-slate-700/80 transition text-sm"
              >
                Retour
              </button>
            </div>

            <div className="space-y-3">
              {/** lazy import data **/}
              {/** We import at top-level to keep it simple */}
              { /* eslint-disable-next-line @typescript-eslint/no-var-requires */ }
              {/** Render FAQ items from faqData */}
              {faqData.map((item: any) => (
                <details
                  key={item.id}
                  className={`group faq-item faq-${item.category} bg-slate-700/30 p-4 rounded-lg border border-slate-600/20 transition-transform duration-200 hover:scale-[1.02] hover:bg-slate-700/50`}
                  data-category={item.category}
                >
                  <summary className="cursor-pointer text-white font-medium flex items-center justify-between gap-4">
                    <span className="truncate">{item.question}</span>
                    <div className="flex items-center gap-3">
                      <span className={`faq-badge text-sm font-medium px-2 py-0.5 rounded-full text-white`}>{item.category.replace('-', ' ')}</span>
                      <span className="faq-arrow text-slate-400 transition-transform duration-200">▾</span>
                    </div>
                  </summary>
                  <div className="mt-2 text-slate-300 whitespace-pre-line">{item.answer}</div>
                </details>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* --- SECTION CALCULATEURS FULL-WIDTH --- */}
      {chatState.currentView === 'calculators' && (
      <section className="relative max-w-full mx-auto bg-gradient-to-br from-slate-900/80 via-blue-950/80 to-slate-900/80 backdrop-blur-md border-y border-blue-500/30 shadow-2xl z-20">
        <div className="px-4 sm:px-6 lg:px-8 py-12">
          {/* Bouton Retour */}
          <button
            aria-label={activeCalculator === null ? 'Retour au menu' : 'Retour aux calculateurs'}
            onClick={() => {
              // If a specific calculator is open, return to the calculators landing (3 icons).
              // If already on the landing, go back to the main menu.
              if (activeCalculator === null) {
                setChatState({ ...chatState, currentView: 'menu' })
              } else {
                setActiveCalculator(null)
              }
            }}
            className="mb-6 inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-2xl shadow-xl ring-1 ring-white/10 hover:scale-105 transform transition-all duration-200 font-semibold"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
            <span className="text-sm md:text-base select-none">
              {activeCalculator === null ? 'Retour au menu' : 'Retour aux calculateurs'}
            </span>
            <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full ${activeCalculator === null ? 'bg-slate-900/20 text-white/90' : 'bg-amber-100 text-amber-900'}`}>
              {activeCalculator === null ? 'Menu' : 'Calculateurs'}
            </span>
          </button>

          {/* If no calculator selected, show 3 icon cards */}
          {activeCalculator === null ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {showIFSE && (
                <button
                  onClick={() => setActiveCalculator('primes')}
                  className="calc-card group bg-gradient-to-br from-slate-800/70 to-blue-900/70 p-8 rounded-2xl border border-blue-500/20 hover:scale-105 transform transition shadow-lg text-left"
                >
                  <div className="flex flex-col items-start gap-4">
                    <div className="p-4 bg-blue-600/20 rounded-lg">
                      <Calculator className="w-12 h-12 text-blue-300" />
                    </div>
                    <h3 className="text-xl font-light text-white">IFSE (Primes)</h3>
                    <p className="text-sm text-slate-300">Calculateur IFSE 1 & IFSE 2</p>
                  </div>
                </button>
              )}

              {showCIA && (
                <button
                  onClick={() => setActiveCalculator('cia')}
                  className="calc-card group bg-gradient-to-br from-slate-800/70 to-orange-900/70 p-8 rounded-2xl border border-orange-500/20 hover:scale-105 transform transition shadow-lg text-left"
                >
                  <div className="flex flex-col items-start gap-4">
                    <div className="p-4 bg-orange-600/20 rounded-lg">
                      <PieChart className="w-12 h-12 text-orange-300" />
                    </div>
                    <h3 className="text-xl font-light text-white">CIA</h3>
                    <p className="text-sm text-slate-300">Calculatrice CIA / Indemnités</p>
                  </div>
                </button>
              )}

              {show13eme && (
                <button
                  onClick={() => setActiveCalculator('13eme')}
                  className="calc-card group bg-gradient-to-br from-slate-800/70 to-green-900/70 p-8 rounded-2xl border border-green-500/20 hover:scale-105 transform transition shadow-lg text-left"
                >
                  <div className="flex flex-col items-start gap-4">
                    <div className="p-4 bg-green-600/20 rounded-lg">
                      <PiggyBank className="w-12 h-12 text-green-300" />
                    </div>
                    <h3 className="text-xl font-light text-white">13ème mois</h3>
                    <p className="text-sm text-slate-300">Simulation du 13ème mois et prorata</p>
                  </div>
                </button>
              )}

              <button
                onClick={() => setActiveCalculator('grilles')}
                className="calc-card group bg-gradient-to-br from-slate-800/70 to-purple-900/70 p-8 rounded-2xl border border-purple-500/20 hover:scale-105 transform transition shadow-lg text-left"
              >
                <div className="flex flex-col items-start gap-4">
                  <div className="p-4 bg-purple-600/20 rounded-lg">
                    <Grid3X3 className="w-12 h-12 text-purple-300" />
                  </div>
                  <h3 className="text-xl font-light text-white">Grilles indiciaires</h3>
                  <p className="text-sm text-slate-300">Grilles de salaires par métier et filière</p>
                </div>
              </button>
            </div>
          ) : (
            <div className="w-full bg-gradient-to-br from-slate-800/95 via-blue-900/95 to-slate-800/95 backdrop-blur-md border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden">
              {/* Compact header for a single calculator (hide other calculator buttons) */}
              <div className="bg-gradient-to-r from-slate-800/95 to-blue-900/95 backdrop-blur-md border-b border-blue-500/30 p-4 z-10">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    {activeCalculator === 'primes' && <Calculator className="w-6 h-6 text-blue-400" />}
                    {activeCalculator === 'cia' && <PieChart className="w-6 h-6 text-orange-400" />}
                    {activeCalculator === '13eme' && <PiggyBank className="w-6 h-6 text-green-400" />}
                    {activeCalculator === 'grilles' && <Grid3X3 className="w-6 h-6 text-purple-400" />}
                    <h3 className="text-lg font-semibold text-white">
                      {activeCalculator === 'primes' ? 'Primes IFSE' : activeCalculator === 'cia' ? 'CIA' : activeCalculator === '13eme' ? '13ème mois' : 'Grilles indiciaires'}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Contenu des calculateurs */}
              <div className="p-8 space-y-4">
                {/* Calculateur PRIMES */}
                {activeCalculator === 'primes' && (
                  <CalculateurPrimes onClose={() => setActiveCalculator(null)} />
                )}

                {/* Calculateur CIA */}
                {activeCalculator === 'cia' && (
                  <CalculateurCIA onClose={() => setActiveCalculator(null)} />
                )}

                {/* 13eme mois */}
                {activeCalculator === '13eme' && (
                  <Calculateur13eme onClose={() => setActiveCalculator(null)} />
                )}

                {/* Grilles indiciaires */}
                {activeCalculator === 'grilles' && (
                  <GrillesIndiciaires onClose={() => setActiveCalculator(null)} />
                )}
              </div>
            </div>
          )}
        </div>
      </section>
      )}

      <main className="relative max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-2 z-10">
        {chatState.currentView === "chat" && (
          <div
            ref={chatContainerRef}
            className="bg-gradient-to-br from-slate-800/80 via-purple-900/80 to-slate-800/80 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            <div className="bg-gradient-to-r from-purple-600/70 via-pink-600/70 to-purple-600/70 backdrop-blur text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Search className="w-7 h-7 text-pink-200" />
                  <div>
                    <h3 className="text-lg font-light tracking-tight">
                      Assistant CFDT Unifié
                    </h3>
                    <p className="text-purple-100 text-xs font-light">CFDT Gennevilliers</p>
                  </div>
                </div>
                <button
                  onClick={returnToMenu}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm font-light"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">Retour</span>
                </button>
              </div>
            </div>
            <div className="min-h-[400px] max-h-[700px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-800/40 to-purple-900/40">
              {chatState.messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl backdrop-blur-sm font-light ${message.type === "user" ? "bg-gradient-to-r from-purple-600/70 to-pink-600/70 text-white shadow-lg" : "bg-slate-700/70 text-slate-100 border border-purple-500/30"}`}
                  >
                    <div className="whitespace-pre-wrap break-words text-sm">{message.content}</div>
                    <div className={`text-xs mt-2 ${message.type === "user" ? "text-purple-100" : "text-slate-400"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}
              {chatState.isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-slate-700/70 backdrop-blur-sm border border-purple-500/30 px-4 py-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <span className="text-slate-200 ml-2 text-sm font-light">L&apos;assistant réfléchit...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="border-t border-purple-500/30 bg-gradient-to-r from-slate-800/80 to-purple-900/80 backdrop-blur-md p-4">
              <div className="flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ex: Combien de jours de congés ? Comment utiliser mon CPF ? Télétravail possible ?"
                  className="flex-1 px-4 py-3 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-200 bg-slate-700/70 backdrop-blur-sm text-sm font-light text-slate-100 placeholder-slate-400"
                  disabled={chatState.isProcessing}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || chatState.isProcessing}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600/70 to-pink-600/70 backdrop-blur-sm text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl font-light"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">Envoyer</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* --- BANDEAU RSS DÉFILANT --- */}
      <section className="relative bg-gradient-to-r from-blue-600/60 via-indigo-600/60 to-blue-600/60 backdrop-blur-md text-white overflow-hidden w-full shadow-lg border-b border-blue-500/30 z-50 -mt-0">
        <div className="relative h-16 flex items-center overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-56 flex items-center justify-center bg-gradient-to-r from-indigo-700/80 to-blue-700/80 backdrop-blur z-20 shadow-lg">
            <div className="flex items-center gap-3">
              <Rss className="w-5 h-5 text-cyan-300 animate-pulse" />
              <span className="text-lg font-light tracking-wide text-white">FRANCE INFO:</span>
            </div>
          </div>
          <div className="animate-marquee-rss whitespace-nowrap flex items-center pl-60">
            {rssItems.length > 0 ? (
              [...rssItems, ...rssItems, ...rssItems].map((item, index) => (
                <a
                  key={`${index}-${item.title}`}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-light mx-6 hover:text-cyan-300 transition-all duration-200 cursor-pointer hover:drop-shadow-lg text-white"
                >
                  • {item.title}
                </a>
              ))
            ) : (
              <span className="text-base mx-8 font-light text-slate-100">
                {rssLoading ? "Chargement des articles..." : "Aucun article disponible"}
              </span>
            )}
          </div>
        </div>
      </section>

      <footer 
        className="relative text-slate-400 text-center py-4 mt-0 z-10 border-t border-purple-500/20"
        style={{
          backgroundImage: `
            linear-gradient(to right, 
              rgba(15, 23, 42, 0.85), 
              rgba(88, 28, 135, 0.85), 
              rgba(15, 23, 42, 0.85)
            ),
            url('/mairie.jpeg')
          `,
          backgroundPosition: 'center bottom',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-3 mb-8">
            <span className="text-pink-400 font-light text-base tracking-wide">CFDT Gennevilliers</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-6">
            <a
              href="tel:0140856464"
              className="flex items-center gap-2 text-pink-400/90 hover:text-pink-300 transition-all duration-200 hover:scale-110 font-light text-sm"
            >
              <Phone className="w-5 h-5" />
              <span>01 40 85 64 64</span>
            </a>
            <a
              href="mailto:cfdt-interco@ville-gennevilliers.fr"
              className="flex items-center gap-2 text-pink-400/90 hover:text-pink-300 transition-all duration-200 hover:scale-110 font-light text-sm"
            >
              <Mail className="w-5 h-5" />
              <span>cfdt-interco@ville-gennevilliers.fr</span>
            </a>
            <div className="flex items-center gap-2 text-pink-400/90 font-light text-sm">
              <MapPin className="w-5 h-5" />
              <span>177 av. Gabriel-Péri</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-light">
            92237 Gennevilliers Cedex
          </p>
          
          {/* Bouton Admin */}
          <div className="mt-8 pt-8 border-t border-purple-500/20">
            <button
              onClick={() => setShowAdminPanel(true)}
              className="px-4 py-2 bg-purple-600/50 border border-purple-500/50 text-purple-300 rounded-lg hover:bg-purple-600/70 transition-all duration-200 font-light text-xs"
            >
              Accès Administrateur
            </button>
          </div>
        </div>
      </footer>

      {/* Admin Panel Modal */}
      {showAdminPanel && <AdminPanel onClose={() => setShowAdminPanel(false)} showIFSE={showIFSE} setShowIFSE={setShowIFSE} showCIA={showCIA} setShowCIA={setShowCIA} show13eme={show13eme} setShow13eme={setShow13eme} />}
    </div>
  );
}


export default App;

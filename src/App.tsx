import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Phone, Mail, MapPin, ArrowRight, Send, ArrowLeft, Search, Rss, Calculator, PieChart, PiggyBank } from "lucide-react"

// --- IMPORTATIONS DES DONNÉES ---
import { sommaire } from "./data/sommaire.ts"
import { chapitres } from "./data/temps.ts"
import { formation } from "./data/formation.ts"
import { teletravailData } from "./data/teletravail.ts"
import { infoItems } from "./data/info-data.ts"
import { ifse1Data, ifse2Data, getAllDirections, getIFSE2ByDirection, getDirectionFullName } from "./data/rifseep-data.ts"
import { franceInfoRss } from "./data/rss-data.ts"
import AdminPanel from "./components/AdminPanel.tsx"
import CalculateurCIA from "./components/CalculateurCIA.tsx"
import { faqData } from "./data/FAQdata.ts"


// --- CONFIGURATION API PERPLEXITY ---
const BACKEND_API_URL = "http://localhost:3001/api/completions"

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

// --- FONCTION DE NETTOYAGE ---
const nettoyerChaine = (chaine: string): string => {
  if (typeof chaine !== "string") return ""
  return chaine
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, "")
    .trim()
}

// --- DICTIONNAIRE DE SYNONYMES ---
const synonymes: Record<string, string[]> = {
  "forfait": ["forfait annuel", "jours forfait", "15 jours", "quota annuel"],
  "teletravail": ["télétravail", "travail distance", "domicile", "remote"],
  "conge": ["congés", "vacances", "absence", "cp", "autorisation absence"],
  "formation": ["stage", "cours", "cpf", "qualification"],
  "horaire": ["horaires", "temps travail", "planning", "heures"],
  "mariage": ["mariage", "pacs", "wedding", "union", "époux", "épouse"],
  "naissance": ["naissance", "accouchement", "enfant", "bébé", "nouveau né"],
  "deuil": ["deuil", "décès", "enterrement", "obsèques", "funérailles"],
  "rtt": ["RTT", "artt", "temps repo", "jours repos"],
  "astreinte": ["astreinte", "permanence", "garde", "nuit"],
  "maladie": ["maladie", "arrêt maladie", "CLM", "CLD"],
  "cet": ["cet", "compte épargne temps", "épargne", "compte repos"],
  "journee_solidarite": ["journée solidarité", "jour solidarité", "jour supplémentaire"],
  "temps partiel": ["temps partiel", "quotité", "pourcentage"]
}

// --- FONCTION D'EXPANSION DES SYNONYMES ---
const expandirAvecSynonymes = (terme: string): string[] => {
  const termeNettoye = nettoyerChaine(terme)
  const resultats = [termeNettoye]
  
  for (const [motCle, syns] of Object.entries(synonymes)) {
    if (termeNettoye.includes(motCle) || syns.some(syn => termeNettoye.includes(nettoyerChaine(syn)))) {
      resultats.push(motCle, ...syns.map(nettoyerChaine))
    }
  }
  
  return [...new Set(resultats)]
}

// --- FONCTION DE RECHERCHE ---
const trouverContextePertinent = (question: string): string => {
  const questionNettoyee = nettoyerChaine(question)
  const motsQuestionNettoyes = questionNettoyee.split(/\s+/).filter((mot) => mot.length > 0)
  
  // Expansion avec synonymes
  const motsFinalAvecSynonymes = new Set<string>()
  motsQuestionNettoyes.forEach(mot => {
    const syns = expandirAvecSynonymes(mot)
    syns.forEach(syn => motsFinalAvecSynonymes.add(syn))
  })
  
  
  const chapitresTrouves = new Map<number, { score: number }>()

  sommaireData.chapitres.forEach((chapitreItem: any, index: number) => {
    let score = 0
    
    // Utiliser idContenu au lieu de l'index pour la correspondance
    const chapitreId = chapitreItem.idContenu || (index + 1)

    const motsClesChapitre = chapitreItem.mots_cles || []
    const motsClesArticles = (chapitreItem.articles || []).flatMap((article: any) => article.mots_cles || [])
    const tousLesMotsCles = [...motsClesChapitre, ...motsClesArticles]

    tousLesMotsCles.forEach((motCle: string) => {
      const motCleNettoye = nettoyerChaine(motCle)
      if (!motCleNettoye) return

      // Recherche exacte (priorité absolue)
      if (motsFinalAvecSynonymes.has(motCleNettoye)) {
        score += 10
      } 
      // Recherche si mot clé contient un mot de la question
      else if (questionNettoyee.includes(motCleNettoye)) {
        score += 5
      } 
      // Recherche partielle seulement si pas de match exact
      else {
        for (const motQuestion of motsFinalAvecSynonymes) {
          if (motCleNettoye.includes(motQuestion) || motQuestion.includes(motCleNettoye)) {
            score += 2  // Score plus faible pour les matches partiels
            break  // Compter une seule fois par motCle
          }
        }
      }
    })

    if (score > 0) {
      const chapitreExistant = chapitresTrouves.get(chapitreId) || { score: 0 }
      chapitreExistant.score += score
      chapitresTrouves.set(chapitreId, chapitreExistant)
    }
  })

  if (chapitresTrouves.size === 0) {
    return (
      "Aucun chapitre spécifique trouvé pour cette question. Voici un aperçu général des thèmes: " +
      sommaireData.chapitres.map((s: any) => s.titre).join(", ")
    )
  }

  const resultatsTries = Array.from(chapitresTrouves.entries())
    .sort(([idA, a], [idB, b]) => {
      // Trier d'abord par score (décroissant)
      if (b.score !== a.score) {
        return b.score - a.score
      }
      // Si scores égaux, favoriser les chapitres qui contiennent "mariage" ou "forfait" exactement
      const chapitreA = sommaireData.chapitres.find((ch: any) => (ch.idContenu || 0) === idA)
      const chapitreB = sommaireData.chapitres.find((ch: any) => (ch.idContenu || 0) === idB)
      const motsDesArticlesA = (chapitreA?.articles || []).map((a: any) => a.titre).join(" ").toLowerCase()
      const motsDesArticlesB = (chapitreB?.articles || []).map((a: any) => a.titre).join(" ").toLowerCase()
      const questionLow = questionNettoyee.toLowerCase()
      
      const scoreArticlesA = motsDesArticlesA.includes(questionLow) ? 1 : 0
      const scoreArticlesB = motsDesArticlesB.includes(questionLow) ? 1 : 0
      
      return scoreArticlesB - scoreArticlesA
    })
    .slice(0, 1)  // Limiter à 1 seul chapitre au lieu de 3 pour éviter le mélange
    .map(([id]) => {
      // Trouver le chapitre correspondant dans le sommaire
      const chapitreData = sommaireData.chapitres.find((ch: any) => (ch.idContenu || 0) === id)
      if (!chapitreData) return null
      
      let contenuTexte = null

      // Gérer les différentes sources selon le sommaire
      if (chapitreData.source === "teletravail") {
        contenuTexte = typeof teletravailData === 'string' ? teletravailData : JSON.stringify(teletravailData)
      } else if (chapitreData.source === "formation") {
        contenuTexte = formation || null
      } else {
        // Par défaut, utiliser les données de temps (chapitres)
        contenuTexte = (chapitres as Record<number, string>)[id] || null
      }

      if (!contenuTexte) {
        return null
      }
      return `Source: ${chapitreData.titre}\nContenu: ${contenuTexte}`
    })
    .filter(Boolean)

  if (resultatsTries.length === 0) {
    return "Aucun contenu textuel trouvé pour les chapitres pertinents."
  }

  return resultatsTries.join("\n\n---\n\n")
}

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
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedFunction, setSelectedFunction] = useState<string>("")
  const [selectedDirection, setSelectedDirection] = useState<string>("")
  const [selectedJob, setSelectedJob] = useState<string>("")
  const [matchedJobDirections, setMatchedJobDirections] = useState<string[]>([])
  const [calculatedPrime, setCalculatedPrime] = useState<{ annual: number; monthly: number }>({ annual: 0, monthly: 0 })
  const [selectedIFSE2, setSelectedIFSE2] = useState<Set<number>>(new Set())
  const [activeCalculator, setActiveCalculator] = useState<'primes' | 'cia' | '13eme' | null>(null)
  // IFSE3 weekend primes state
  const [weekendSaturdays, setWeekendSaturdays] = useState<number>(0)
  const [weekendSundays, setWeekendSundays] = useState<number>(0)
  const [weekendRateSat, setWeekendRateSat] = useState<number>(40)
  const [weekendRateSun, setWeekendRateSun] = useState<number>(40)
  // 13ème mois calculator state
  const [thirteenSalary, setThirteenSalary] = useState<string>("")
  const [thirteenMonthsWorked, setThirteenMonthsWorked] = useState<number>(12)
  const [thirteenthResult, setThirteenthResult] = useState<any>(null)
  const [thirteenWeeklyHours, setThirteenWeeklyHours] = useState<string>("")
  const [thirteenAnnualHours, setThirteenAnnualHours] = useState<string>("")
  const [thirteenContractType, setThirteenContractType] = useState<'fonc' | 'contractuel'>('fonc')
  const [thirteenProfession, setThirteenProfession] = useState<'standard' | 'medecin'>('standard')
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
    if (chatState.currentView === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
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

  // --- LOGIQUE DU CALCULATEUR DE PRIMES ---
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSelectedFunction("")
    setSelectedDirection("")
    setCalculatedPrime({ annual: 0, monthly: 0 })
  }

  const handleFunctionChange = (functionName: string) => {
    setSelectedFunction(functionName)
    
    // Trouver le montant de la prime basé sur la fonction sélectionnée
    const selectedItem = ifse1Data.find(item => 
      item.category === selectedCategory && item.function === functionName
    )
    
    if (selectedItem) {
      setCalculatedPrime({
        annual: selectedItem.annualAmount,
        monthly: Math.round(selectedItem.monthlyAmount * 100) / 100
      })
    } else {
      setCalculatedPrime({ annual: 0, monthly: 0 })
    }
  }

  const handleJobChange = (jobTitle: string) => {
    setSelectedJob(jobTitle)
    setMatchedJobDirections([])

    if (!jobTitle) {
      // clear selection if no job
      setSelectedIFSE2(new Set())
      setSelectedDirection("")
      return
    }

    // If a direction is already selected, only toggle IFSE2 entries in that direction
    if (selectedDirection) {
      const list = getIFSE2ByDirection(selectedDirection)
      const newSet = new Set<number>()
      list.forEach((p, idx) => {
        if (p.jobs.some(j => j.toLowerCase().includes(jobTitle.toLowerCase()))) {
          newSet.add(idx)
        }
      })
      setSelectedIFSE2(newSet)
      return
    }

    // Find all directions that contain this job
    const matches = ifse2Data
      .filter(item => item.jobs.some(j => j.toLowerCase().includes(jobTitle.toLowerCase())))
      .map(m => m.direction)
      .filter((v, i, a) => a.indexOf(v) === i) // unique

    if (matches.length === 0) {
      // no match — clear
      setSelectedDirection("")
      setSelectedIFSE2(new Set())
      return
    }

    if (matches.length === 1) {
      // single match — set direction and select matching IFSE2 entries
      const dir = matches[0]
      setSelectedDirection(dir)
      const list = getIFSE2ByDirection(dir)
      const newSet = new Set<number>()
      list.forEach((p, idx) => {
        if (p.jobs.some(j => j.toLowerCase().includes(jobTitle.toLowerCase()))) {
          newSet.add(idx)
        }
      })
      setSelectedIFSE2(newSet)
      return
    }

    // Multiple possible directions — ask the user to choose
    setMatchedJobDirections(matches)
    setSelectedIFSE2(new Set())
  }

  const handleChooseJobDirection = (direction: string) => {
    setSelectedDirection(direction)
    // compute indices for that direction matching the selectedJob
    const list = getIFSE2ByDirection(direction)
    const newSet = new Set<number>()
    list.forEach((p, idx) => {
      if (selectedJob && p.jobs.some(j => j.toLowerCase().includes(selectedJob.toLowerCase()))) {
        newSet.add(idx)
      }
    })
    setSelectedIFSE2(newSet)
    setMatchedJobDirections([])
  }

  const handleDirectionChange = (direction: string) => {
    setSelectedDirection(direction)
    setSelectedIFSE2(new Set()) // Reset IFSE 2 selections when changing direction
  }

  const handleToggleIFSE2 = (index: number) => {
    const newSelected = new Set(selectedIFSE2)
    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }
    setSelectedIFSE2(newSelected)
  }

  // Calculer le total mensuel (IFSE 1 + IFSE 2 sélectionnées)
  const calculateTotalMonthly = () => {
    let total = calculatedPrime.monthly
    if (selectedDirection) {
      const ifse2List = getIFSE2ByDirection(selectedDirection)
      selectedIFSE2.forEach(idx => {
        if (ifse2List[idx]) {
          total += ifse2List[idx].amount
        }
      })
    }
    // IFSE3: weekend primes (Saturdays and Sundays per month * selected rate)
    const satCount = Number.isFinite(Number(weekendSaturdays)) ? Number(weekendSaturdays) : 0
    const sunCount = Number.isFinite(Number(weekendSundays)) ? Number(weekendSundays) : 0
    const satTotal = satCount * (Number(weekendRateSat) || 0)
    const sunTotal = sunCount * (Number(weekendRateSun) || 0)
    total += satTotal + sunTotal
    return total
  }

  // Precompute IFSE2 and IFSE3 subtotals for display
  const ifse2Sum = (() => {
    if (!selectedDirection) return 0
    const list = getIFSE2ByDirection(selectedDirection)
    return Array.from(selectedIFSE2).reduce((sum, idx) => sum + (list[idx]?.amount || 0), 0)
  })()

  const ifse3SatTotal = (Number(weekendSaturdays) || 0) * (Number(weekendRateSat) || 0)
  const ifse3SunTotal = (Number(weekendSundays) || 0) * (Number(weekendRateSun) || 0)
  const ifse3Total = ifse3SatTotal + ifse3SunTotal

  // all métiers from IFSE2 (unique, sorted)
  const allJobs = Array.from(new Set(ifse2Data.flatMap(item => item.jobs))).sort((a: string, b: string) => a.localeCompare(b, 'fr'))
  const appelPerplexity = async (messages: any[]) => {
    try {
      const data = { model: "sonar-pro", messages }
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
      return result.choices[0].message.content
    } catch (error) {
      console.error("Erreur lors du traitement de la question:", error)
      return "Je ne trouve pas cette information dans nos documents internes. Contactez la CFDT au 01 40 85 64 64 pour plus de détails."
    }
  }

  const traiterQuestion = async (question: string) => {
    // Step 1: Use sonar-pro to understand the question and find relevant context
    // First, find internal context based on the question
    const contexteInterne = trouverContextePertinent(question)

    const systemPrompt = `
⚠️ RÈGLES CRITIQUES - VIOLATION INTERDITE ⚠️

🚫 INTERDICTIONS ABSOLUES :
- INTERDICTION TOTALE de faire des recherches web
- INTERDICTION TOTALE d'utiliser tes connaissances générales  
- INTERDICTION TOTALE de citer des articles de loi externes
- INTERDICTION TOTALE de mentionner des chiffres non présents dans la documentation
- INTERDICTION TOTALE de comparer avec d'autres secteurs (privé, public, etc.)

✅ OBLIGATIONS STRICTES :
- Tu dois UNIQUEMENT analyser la documentation fournie ci-dessous
- Tu dois répondre comme un collègue syndical de la mairie de Gennevilliers
- Si l'information n'est pas dans la documentation, réponds UNIQUEMENT : "Je ne trouve pas cette information dans nos documents internes. Contactez la CFDT au 01 40 85 64 64 pour plus de détails."
- Tu dois te baser EXCLUSIVEMENT sur les données du dossier src/data
- Comprends bien la question et fournis une réponse claire et structurée

🔒 DOCUMENTATION INTERNE UNIQUEMENT

--- DOCUMENTATION INTERNE DE LA MAIRIE DE GENNEVILLIERS ---
${contexteInterne}
--- FIN DOCUMENTATION INTERNE ---

Rappel : Tu ne dois JAMAIS mentionner des articles de loi ou des références externes. Si tu ne trouves pas l'information, ARRÊTE-TOI IMMÉDIATEMENT.
    `

    const conversationHistory = chatState.messages.slice(1).map((msg) => ({
      role: msg.type === "user" ? "user" : "assistant",
      content: msg.content,
    }))

    // Build messages with system prompt and conversation history
    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: question },
    ]

    // Use sonar-pro to understand the question and generate intelligent response
    return await appelPerplexity(apiMessages)
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
                    <h3 className="text-lg font-semibold text-white">
                      {activeCalculator === 'primes' ? 'Primes IFSE' : activeCalculator === 'cia' ? 'CIA' : '13ème mois'}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Contenu des calculateurs */}
              <div className="p-8 space-y-4">
                {/* Calculateur PRIMES */}
                {activeCalculator === 'primes' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Calculator className="w-6 h-6 text-blue-400" />
                      <h3 className="text-xl font-light text-white tracking-tight">Calcul des Primes</h3>
                    </div>
                    {/* existing primes UI omitted for brevity; kept as before */}
                    {/* Sélection de la catégorie */}
                    <div>
                      <p className="text-xs text-slate-400 mb-2 italic">Commencez par sélectionner votre catégorie d'emploi (A, B ou C) selon votre grille indiciaire.</p>
                      <label className="block text-base font-light text-slate-300 mb-2">Catégorie</label>
                      <select 
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700/50 border border-blue-500/30 rounded-lg text-white text-base focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition-all cursor-pointer"
                      >
                        <option value="">Sélectionner une catégorie</option>
                        <option value="A">Catégorie A</option>
                        <option value="B">Catégorie B</option>
                        <option value="C">Catégorie C</option>
                      </select>
                    </div>

                    {/* Sélection de la fonction (IFSE 1) */}
                    <div>
                      <p className="text-xs text-slate-400 mb-2 italic">Sélectionnez votre fonction pour calculer la prime IFSE 1 (prime de fonction). La catégorie doit d'abord être choisie.</p>
                      <label className="block text-base font-light text-slate-300 mb-2">Fonction (IFSE 1)</label>
                      <select 
                        value={selectedFunction}
                        onChange={(e) => handleFunctionChange(e.target.value)}
                        disabled={!selectedCategory}
                        className="w-full px-3 py-2 bg-slate-700/50 border border-blue-500/30 rounded-lg text-white text-base focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">Sélectionner une fonction</option>
                        {selectedCategory && ifse1Data.filter(item => item.category === selectedCategory).map((item) => (
                          <option key={item.functionCode} value={item.function}>
                            {item.function}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Sélection métier (nouveau) */}
                    <div className="mt-3">
                      <p className="text-xs text-slate-400 mb-2 italic">Sélectionnez votre métier pour auto-compléter les primes IFSE 2 correspondantes. Le métier est optionnel.</p>
                      <label className="block text-sm font-light text-slate-300 mb-2">Métier (optionnel)</label>
                      <select
                        value={selectedJob}
                        onChange={(e) => handleJobChange(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700/50 border border-blue-500/30 rounded-lg text-white text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition-all cursor-pointer"
                      >
                        <option value="">Sélectionner un métier</option>
                        {allJobs.map((job) => (
                          <option key={job} value={job}>{job}</option>
                        ))}
                      </select>

                      {/* If a métier matches multiple directions, let the user choose which direction applies */}
                      {matchedJobDirections.length > 0 && (
                        <div className="mt-2">
                          <label className="block text-xs text-slate-300 mb-1">Choisissez la direction correspondant au métier</label>
                          <select
                            value={selectedDirection}
                            onChange={(e) => handleChooseJobDirection(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-700/60 border border-blue-500/20 rounded-lg text-white text-sm"
                          >
                            <option value="">Sélectionner une direction</option>
                            {matchedJobDirections.map((dir) => (
                              <option key={dir} value={dir}>{getDirectionFullName(dir)}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Remaining primes UI preserved unchanged... */}
                    {calculatedPrime.annual > 0 && (
                      <div className="mt-4 pt-4 border-t border-blue-500/20">
                        <p className="text-sm font-light text-slate-400 mb-1">IFSE 1 - Prime de fonction</p>
                        <p className="text-5xl font-light text-blue-300">{calculatedPrime.monthly.toLocaleString('fr-FR')} €/mois</p>
                        <p className="text-sm text-slate-400 mt-2">Soit {calculatedPrime.annual.toLocaleString('fr-FR')} €/an</p>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-blue-500/20">
                      <p className="text-xs text-slate-400 mb-2 italic">Sélectionnez votre direction pour voir les primes complémentaires (IFSE 2) applicables à votre service.</p>
                      <label className="block text-base font-light text-slate-300 mb-2">Direction (IFSE 2)</label>
                      <select 
                        value={selectedDirection}
                        onChange={(e) => handleDirectionChange(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700/50 border border-blue-500/30 rounded-lg text-white text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition-all cursor-pointer"
                      >
                        <option value="">Sélectionner une direction</option>
                        {getAllDirections().map((dir) => (
                          <option key={dir} value={dir}>
                            {getDirectionFullName(dir)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedDirection && (
                      <div className="mt-4 pt-4 border-t border-blue-500/20">
                        <p className="text-xs text-slate-400 mb-3 italic">Cochez les primes complémentaires (IFSE 2) applicables à votre situation. Chaque prime correspond à une sujétion ou indemnité spécifique. Les services concernés et métiers sont indiqués pour chaque ligne.</p>
                        <p className="text-sm font-light text-slate-400 mb-3">IFSE 2 - Primes complémentaires (cocher pour inclure)</p>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {getIFSE2ByDirection(selectedDirection).map((prime, idx) => (
                            <div key={idx} className="bg-slate-700/30 rounded-lg p-2 border border-blue-500/20 cursor-pointer hover:bg-slate-700/50 transition" onClick={() => handleToggleIFSE2(idx)}>
                              <div className="flex items-start gap-2">
                                <input
                                  type="checkbox"
                                  checked={selectedIFSE2.has(idx)}
                                  onChange={() => handleToggleIFSE2(idx)}
                                  className="mt-0.5 cursor-pointer accent-green-400"
                                />
                                <div className="flex-1">
                                  <p className="text-sm font-light text-slate-300">{prime.motif}</p>
                                  <p className="text-green-400 font-light text-base">{prime.amount.toLocaleString('fr-FR')} €/mois</p>
                                  {prime.service && prime.service !== 'Tous services' && (
                                    <p className="text-xs text-slate-400 mt-1">
                                      <span className="font-light">Service:</span> {prime.service}
                                    </p>
                                  )}
                                  {prime.jobs && prime.jobs.length > 0 && (
                                    <div className="mt-1">
                                      <p className="text-xs text-slate-400 font-light">Métier(s):</p>
                                      <ul className="text-xs text-slate-300 ml-2 mt-0.5 space-y-0.5">
                                        {prime.jobs.map((job, jIdx) => (
                                          <li key={jIdx} className="truncate">
                                            • {job}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* IFSE3 - Primes week-end */}
                    <div className="mt-4 pt-4 border-t border-blue-500/10">
                      <p className="text-xs text-slate-400 mb-2 italic">Entrez le nombre moyen de samedis et dimanches travaillés par mois, puis sélectionnez le taux applicable selon le nombre d'heures. Ces primes sont ajoutées au montant mensuel.</p>
                      <label className="block text-base font-light text-slate-300 mb-2">IFSE 3 — Primes week-end</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-sm text-slate-300">Samedis / mois</label>
                          <select value={weekendSaturdays} onChange={(e) => setWeekendSaturdays(Number(e.target.value))} className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/20 rounded-lg text-white text-sm">
                            {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-sm text-slate-300">Dimanches / mois</label>
                          <select value={weekendSundays} onChange={(e) => setWeekendSundays(Number(e.target.value))} className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/20 rounded-lg text-white text-sm">
                            {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-sm text-slate-300">Taux Samedi / Dimanche</label>
                          <div className="grid grid-cols-2 gap-2">
                            <select value={weekendRateSat} onChange={(e) => setWeekendRateSat(Number(e.target.value))} className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/20 rounded-lg text-white text-sm">
                              <option value={40}>40 € — jusqu'à 3h13</option>
                              <option value={60}>60 € — entre 3h16 et 7h12</option>
                              <option value={80}>80 € — plus de 7h12</option>
                            </select>
                            <select value={weekendRateSun} onChange={(e) => setWeekendRateSun(Number(e.target.value))} className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/20 rounded-lg text-white text-sm">
                              <option value={40}>40 € — jusqu'à 3h13</option>
                              <option value={60}>60 € — entre 3h16 et 7h12</option>
                              <option value={80}>80 € — plus de 7h12</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">Choisissez le nombre moyen de samedis et dimanches travaillés par mois, et le taux applicable pour chaque type de jour. Le total IFSE3 sera ajouté au montant mensuel.</p>
                    </div>

                    {(calculatedPrime.monthly > 0 || selectedIFSE2.size > 0 || ifse3Total > 0) && (
                      <div className="mt-4 pt-4 border-t-2 border-green-500/50 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-lg p-3">
                        <p className="text-sm font-light text-slate-400 mb-2">Montant total mensuel</p>
                        <p className="text-4xl font-light text-green-400">{calculateTotalMonthly().toLocaleString('fr-FR')} €</p>
                        <div className="text-sm text-slate-300 mt-2 space-y-0.5">
                          <p>IFSE 1: {calculatedPrime.monthly.toLocaleString('fr-FR')} €</p>
                          <p>IFSE 2: {Array.from(selectedIFSE2).reduce((sum, idx) => {
                            const ifse2List = getIFSE2ByDirection(selectedDirection)
                            return sum + (ifse2List[idx]?.amount || 0)
                          }, 0).toLocaleString('fr-FR')} €</p>
                          {ifse3SatTotal > 0 && <p>IFSE 3 (Samedis): {ifse3SatTotal.toLocaleString('fr-FR')} €</p>}
                          {ifse3SunTotal > 0 && <p>IFSE 3 (Dimanches): {ifse3SunTotal.toLocaleString('fr-FR')} €</p>}
                          {ifse3Total > 0 && <p className="font-medium">IFSE 3 - Total: {ifse3Total.toLocaleString('fr-FR')} €</p>}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <p className="text-sm text-slate-300 font-light">
                        ℹ️ IFSE 1 : Prime de fonction • IFSE 2 : Sélectionnez les primes applicables
                      </p>
                    </div>
                  </div>
                )}

                {/* Calculateur CIA */}
                {activeCalculator === 'cia' && (
                  <CalculateurCIA onClose={() => setActiveCalculator(null)} />
                )}

                {/* 13eme mois simple placeholder */}
                {activeCalculator === '13eme' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <PiggyBank className="w-6 h-6 text-green-400" />
                      <h3 className="text-xl font-light text-white tracking-tight">Simulation 13ème mois</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-slate-300 mb-1">Type de contrat</label>
                        <select value={thirteenContractType} onChange={(e) => setThirteenContractType(e.target.value as any)} className="w-full px-3 py-2 rounded-lg bg-slate-700/50 text-white">
                          <option value="fonc">Fonctionnaire / Titulaire</option>
                          <option value="contractuel">Contractuel</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm text-slate-300 mb-1">Profession</label>
                        <select value={thirteenProfession} onChange={(e) => setThirteenProfession(e.target.value as any)} className="w-full px-3 py-2 rounded-lg bg-slate-700/50 text-white">
                          <option value="standard">Standard</option>
                          <option value="medecin">Médecin</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm text-slate-300 mb-1">Salaire brut mensuel (€)</label>
                        <input
                          type="text"
                          inputMode="decimal"
                          value={thirteenSalary}
                          onChange={(e) => setThirteenSalary(e.target.value)}
                          placeholder="ex: 2500"
                          className="w-full px-3 py-2 bg-slate-700/50 border border-green-500/30 rounded-lg text-white text-sm focus:border-green-400 focus:ring-2 focus:ring-green-400/20 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-slate-300 mb-1">Mois travaillés (0-12)</label>
                        <input
                          type="number"
                          min={0}
                          max={12}
                          value={thirteenMonthsWorked}
                          onChange={(e) => setThirteenMonthsWorked(Math.max(0, Math.min(12, Number(e.target.value || 0))))}
                          className="w-full px-3 py-2 bg-slate-700/50 border border-green-500/30 rounded-lg text-white text-sm focus:border-green-400 focus:ring-2 focus:ring-green-400/20 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-slate-300 mb-1">Heures hebdo (pour titulaires)</label>
                        <input value={thirteenWeeklyHours} onChange={(e) => setThirteenWeeklyHours(e.target.value)} type="number" step="0.25" className="w-full px-3 py-2 rounded-lg bg-slate-700/50 text-white" placeholder="ex: 35" />
                      </div>

                      <div>
                        <label className="block text-sm text-slate-300 mb-1">Heures annuelles (pour contractuels)</label>
                        <input value={thirteenAnnualHours} onChange={(e) => setThirteenAnnualHours(e.target.value)} type="number" step="1" className="w-full px-3 py-2 rounded-lg bg-slate-700/50 text-white" placeholder="ex: 600" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          const sal = parseFloat(thirteenSalary.toString().replace(',', '.')) || 0
                          const months = Math.max(0, Math.min(12, Number(thirteenMonthsWorked || 0)))
                          const weekly = parseFloat(thirteenWeeklyHours || '0')
                          const annualH = parseFloat(thirteenAnnualHours || '0')

                          const isContractuel = thirteenContractType === 'contractuel'
                          const eligible = isContractuel ? (annualH >= 550) : (weekly > 17.5)

                          if (!eligible) {
                            setThirteenthResult({ eligible: false })
                            return
                          }

                          const base = sal // 1 mois
                          let schedule: { month: string; pct: number }[] = []
                          if (thirteenProfession === 'medecin') {
                            schedule = [ { month: 'Juin', pct: 0.5 }, { month: 'Novembre', pct: 0.5 }, { month: 'Décembre', pct: 0 } ]
                          } else {
                            schedule = [ { month: 'Juin', pct: 0.5 }, { month: 'Novembre', pct: 0.4 }, { month: 'Décembre', pct: 0.1 } ]
                          }

                          const prorata = months / 12
                          const breakdown = schedule.map(s => ({ month: s.month, pct: s.pct, amount: +(base * s.pct * prorata).toFixed(2) }))
                          const total = breakdown.reduce((sum, b) => sum + b.amount, 0)

                          setThirteenthResult({ eligible: true, breakdown, total, prorata })
                        }}
                        className="px-4 py-2 bg-green-600/70 hover:bg-green-700 text-white rounded-lg shadow transition"
                      >
                        Calculer
                      </button>
                      <button
                        onClick={() => { setThirteenSalary(''); setThirteenMonthsWorked(12); setThirteenthResult(null); setThirteenWeeklyHours(''); setThirteenAnnualHours(''); setThirteenContractType('fonc'); setThirteenProfession('standard') }}
                        className="px-3 py-2 bg-slate-700/40 text-slate-200 rounded-lg hover:bg-slate-700/60 transition"
                      >
                        Réinitialiser
                      </button>
                    </div>

                    {thirteenthResult && thirteenthResult.eligible === false && (
                      <div className="mt-2 p-3 bg-amber-900/20 rounded-lg border border-amber-500/20 text-amber-200">Non éligible au 13ème mois selon les règles saisies (hebdo &gt; 17h30 ou contractuels ≥ 550h).</div>
                    )}

                    {thirteenthResult && thirteenthResult.eligible === true && (
                      <div className="mt-2 p-4 bg-green-900/20 rounded-lg border border-green-500/20">
                        <p className="text-sm text-slate-300 mb-2">Prorata appliqué: <span className="font-medium">{(thirteenthResult.prorata * 100).toFixed(0)}%</span></p>
                        <div className="space-y-2">
                          {thirteenthResult.breakdown.map((b: any, idx: number) => (
                            <div key={idx} className="flex justify-between text-slate-200">
                              <div>{b.month} ({(b.pct*100).toFixed(0)}%)</div>
                              <div className="font-mono">{b.amount.toFixed(2)} €</div>
                            </div>
                          ))}
                          <div className="border-t border-slate-600/20 pt-2 flex justify-between text-white font-medium">
                            <div>Total estimé</div>
                            <div className="font-mono">{thirteenthResult.total.toFixed(2)} €</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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

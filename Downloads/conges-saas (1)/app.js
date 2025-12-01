// Global State Management (In-Memory)
let currentUser = null;

// Types d'absences disponibles (basé sur le modèle CSV)
const TYPES_ABSENCES = {
  CA: { label: "Congés Annuels", code: "CA", color: "#3b82f6" },
  HS: { label: "Heures Supplémentaires", code: "HS", color: "#22c55e" },
  CF: { label: "Congés Formation", code: "CF", color: "#a855f7" },
  AM: { label: "Absence Maladie", code: "AM", color: "#ef4444" },
  EM: { label: "Événement Familial", code: "EM", color: "#f97316" },
  RTT: { label: "RTT", code: "RTT", color: "#06b6d4" },
  CET: { label: "Compte Épargne Temps", code: "CET", color: "#84cc16" },
  ASA: { label: "Autorisation Spéciale Absence", code: "ASA", color: "#ec4899" }
};

// Jours fériés 2025
const JOURS_FERIES_2025 = [
  { date: "2025-01-01", label: "Jour de l'an" },
  { date: "2025-04-21", label: "Lundi de Pâques" },
  { date: "2025-05-01", label: "Fête du travail" },
  { date: "2025-05-08", label: "Armistice 39/45" },
  { date: "2025-05-29", label: "Ascension" },
  { date: "2025-06-09", label: "Lundi de Pentecôte" },
  { date: "2025-07-14", label: "Fête nationale" },
  { date: "2025-08-15", label: "Assomption" },
  { date: "2025-11-01", label: "Toussaint" },
  { date: "2025-11-11", label: "Armistice 14/18" },
  { date: "2025-12-25", label: "Noël" }
];

// Mock Users - LDAP Integration to come
const mockUsers = [
  { id: "user1", username: "marie.dupont", password: "password123", fullname: "Marie Dupont", email: "marie.dupont@collectivite.local", role: "AGENT", manager: "jean.manager" },
  { id: "user2", username: "pierre.martin", password: "password123", fullname: "Pierre Martin", email: "pierre.martin@collectivite.local", role: "AGENT", manager: "jean.manager" },
  { id: "user3", username: "sarra.labidi", password: "password123", fullname: "LABIDI Sarra", email: "sarra.labidi@collectivite.local", role: "AGENT", manager: "jean.manager" },
  { id: "user4", username: "jean.manager", password: "password123", fullname: "Jean Manager", email: "jean.manager@collectivite.local", role: "RESPONSABLE" },
  { id: "user5", username: "claire.manager", password: "password123", fullname: "Claire Manager", email: "claire.manager@collectivite.local", role: "RESPONSABLE" }
];

// Agent Data (structure enrichie basée sur le modèle CSV)
const agentData = {
  user1: { 
    fullname: "Marie Dupont", 
    nom: "Dupont",
    prenom: "Marie",
    email: "marie.dupont@collectivite.local", 
    manager: "jean.manager", 
    annee: 2025,
    dateEntreeFP: "2020-01-01",
    dateDebutContrat: "2020-01-01",
    dateFinContrat: null,
    quotiteTravail: 35,
    nbHeuresMG: "35:00",
    // Soldes en heures (format HH:MM converti)
    congesAnnuels: { total: "175:00", restant: "126:00", utilise: "49:00" },
    bonifications: { total: "9:20", restant: "9:20" },
    anciennete: { total: "0:00", restant: "0:00" },
    rtt: { total: "0:00", restant: "0:00" },
    congesFormation: { total: "37:20", restant: "37:20" },
    cet: { total: 0, restant: 0 },
    // Compteurs jours (pour affichage simplifié)
    joursTotal: 25, 
    joursRestants: 18, 
    joursUtilises: 7,
    planning: {
      lundi: { matin: "8:30-12:30", apresMidi: "13:30-16:30", heures: 7 },
      mardi: { matin: "8:30-12:30", apresMidi: "13:30-16:30", heures: 7 },
      mercredi: { matin: "8:30-12:30", apresMidi: "13:30-16:30", heures: 7 },
      jeudi: { matin: "8:30-12:30", apresMidi: "13:30-16:30", heures: 7 },
      vendredi: { matin: "8:30-12:30", apresMidi: "13:30-16:30", heures: 7 }
    }
  },
  user2: { 
    fullname: "Pierre Martin", 
    nom: "Martin",
    prenom: "Pierre",
    email: "pierre.martin@collectivite.local", 
    manager: "jean.manager",
    annee: 2025,
    dateEntreeFP: "2018-06-01",
    dateDebutContrat: "2018-06-01",
    dateFinContrat: null,
    quotiteTravail: 35,
    nbHeuresMG: "35:00",
    congesAnnuels: { total: "175:00", restant: "154:00", utilise: "21:00" },
    bonifications: { total: "9:20", restant: "9:20" },
    anciennete: { total: "7:00", restant: "7:00" },
    rtt: { total: "0:00", restant: "0:00" },
    congesFormation: { total: "0:00", restant: "0:00" },
    cet: { total: 0, restant: 0 },
    joursTotal: 25, 
    joursRestants: 22, 
    joursUtilises: 3,
    planning: {
      lundi: { matin: "8:30-12:30", apresMidi: "13:30-17:30", heures: 8 },
      mardi: { matin: "8:30-12:30", apresMidi: "13:30-17:30", heures: 8 },
      mercredi: { matin: "8:30-12:30", apresMidi: "13:30-17:30", heures: 8 },
      jeudi: { matin: "8:30-12:30", apresMidi: "13:30-17:30", heures: 8 },
      vendredi: { matin: "8:30-12:30", apresMidi: null, heures: 4 }
    }
  },
  user3: { 
    fullname: "LABIDI Sarra", 
    nom: "LABIDI",
    prenom: "Sarra",
    email: "sarra.labidi@collectivite.local", 
    manager: "jean.manager",
    annee: 2025,
    dateEntreeFP: "2025-03-03",
    dateDebutContrat: "2025-03-03",
    dateFinContrat: "2025-12-31",
    quotiteTravail: 28,
    nbHeuresMG: "28:00",
    congesAnnuels: { total: "116:40", restant: "35:00", utilise: "81:40" },
    bonifications: { total: "9:20", restant: "9:20" },
    anciennete: { total: "0:00", restant: "0:00" },
    rtt: { total: "0:00", restant: "0:00" },
    congesFormation: { total: "37:20", restant: "37:20" },
    cet: { total: 0, restant: 0 },
    joursTotal: 17,
    joursRestants: 5,
    joursUtilises: 12,
    planning: {
      lundi: { matin: null, apresMidi: null, heures: 0 },
      mardi: { matin: "8:30-12:30", apresMidi: "13:30-16:30", heures: 7 },
      mercredi: { matin: "8:30-12:30", apresMidi: "13:30-16:30", heures: 7 },
      jeudi: { matin: "8:30-12:30", apresMidi: "13:30-16:30", heures: 7 },
      vendredi: { matin: "8:30-12:30", apresMidi: "13:30-16:30", heures: 7 }
    }
  }
};

// Demandes de congés (structure enrichie)
const demandes = [
  { id: "req1", agentId: "user1", agentName: "Marie Dupont", dateDebut: "2025-12-01", dateFin: "2025-12-05", type: "CA", typeLabel: "Congés Annuels", demiJournee: null, motif: "Vacances familiales", statut: "pending", dateCreation: "2025-11-25", heures: "35:00", jours: 5 },
  { id: "req2", agentId: "user2", agentName: "Pierre Martin", dateDebut: "2025-12-15", dateFin: "2025-12-19", type: "RTT", typeLabel: "RTT", demiJournee: null, motif: "Récupération heures", statut: "pending", dateCreation: "2025-11-28", heures: "28:00", jours: 4 }
];

// Absences enregistrées (basé sur le modèle CSV - historique complet)
const absencesHistorique = {
  user3: [
    { type: "HS", dateDebut: "2025-05-30", dateFin: "2025-05-30", demiJournee: null, motif: "journée offerte par le maire", heuresSup: "7:00", statut: "approved" },
    { type: "AM", dateDebut: "2025-06-03", dateFin: "2025-06-04", demiJournee: null, motif: "", heures: null, statut: "approved" },
    { type: "EM", dateDebut: "2025-06-17", dateFin: "2025-06-18", demiJournee: null, motif: "", heures: null, statut: "approved" },
    { type: "AM", dateDebut: "2025-07-03", dateFin: "2025-07-04", demiJournee: null, motif: "", heures: null, statut: "approved" },
    { type: "CA", dateDebut: "2025-07-07", dateFin: "2025-07-13", demiJournee: null, motif: "", heures: "28:00", statut: "approved" },
    { type: "CA", dateDebut: "2025-08-04", dateFin: "2025-08-10", demiJournee: null, motif: "", heures: "28:00", statut: "approved" },
    { type: "CA", dateDebut: "2025-10-06", dateFin: "2025-10-12", demiJournee: null, motif: "", heures: "28:00", statut: "approved" },
    { type: "EM", dateDebut: "2025-10-15", dateFin: "2025-10-15", demiJournee: "matin", motif: "", heures: null, statut: "approved" },
    { type: "CA", dateDebut: "2025-12-26", dateFin: "2025-12-26", demiJournee: null, motif: "", heures: "7:00", statut: "approved" },
    { type: "CA", dateDebut: "2026-01-02", dateFin: "2026-01-02", demiJournee: null, motif: "", heures: "7:00", statut: "approved" }
  ],
  user1: [
    { type: "CA", dateDebut: "2025-01-10", dateFin: "2025-01-15", demiJournee: null, motif: "Vacances", heures: "35:00", statut: "approved" },
    { type: "CA", dateDebut: "2025-03-02", dateFin: "2025-03-07", demiJournee: null, motif: "Congés", heures: "14:00", statut: "approved" }
  ],
  user2: [
    { type: "RTT", dateDebut: "2025-02-17", dateFin: "2025-02-21", demiJournee: null, motif: "Récupération", heures: "21:00", statut: "approved" }
  ]
};

// Excel Data per agent (format enrichi pour export CSV)
const excelData = {
  user1: {
    annee: 2025,
    donnees: [
      ["Type", "Date début", "Date fin", "Demi-journée", "Motif", "Heures Sup", "Heures Moins", "Solde CA", "Solde CF", "Statut"],
      ["CA", "10/01/2025", "15/01/2025", "", "Vacances", "", "35:00", "140:00", "37:20", "Approuvé"],
      ["CA", "02/03/2025", "07/03/2025", "", "Congés", "", "14:00", "126:00", "37:20", "Approuvé"]
    ],
    modifications: []
  },
  user2: {
    annee: 2025,
    donnees: [
      ["Type", "Date début", "Date fin", "Demi-journée", "Motif", "Heures Sup", "Heures Moins", "Solde CA", "Solde CF", "Statut"],
      ["RTT", "17/02/2025", "21/02/2025", "", "Récupération", "", "21:00", "154:00", "0:00", "Approuvé"]
    ],
    modifications: []
  },
  user3: {
    annee: 2025,
    donnees: [
      ["Type", "Date début", "Date fin", "Demi-journée", "Motif", "Heures Sup", "Heures Moins", "Solde CA", "Solde CF", "Statut"],
      ["HS", "30/05/2025", "", "", "journée offerte par le maire", "7:00", "", "133:00", "37:20", "Approuvé"],
      ["AM", "03/06/2025", "04/06/2025", "", "", "", "", "133:00", "37:20", "Approuvé"],
      ["EM", "17/06/2025", "18/06/2025", "", "", "", "", "133:00", "37:20", "Approuvé"],
      ["AM", "03/07/2025", "04/07/2025", "", "", "", "", "133:00", "37:20", "Approuvé"],
      ["CA", "07/07/2025", "13/07/2025", "", "", "", "28:00", "105:00", "37:20", "Approuvé"],
      ["CA", "04/08/2025", "10/08/2025", "", "", "", "28:00", "77:00", "37:20", "Approuvé"],
      ["CA", "06/10/2025", "12/10/2025", "", "", "", "28:00", "49:00", "37:20", "Approuvé"],
      ["EM", "15/10/2025", "15/10/2025", "matin", "", "", "", "49:00", "37:20", "Approuvé"],
      ["CA", "26/12/2025", "", "", "", "", "7:00", "42:00", "37:20", "Approuvé"],
      ["CA", "02/01/2026", "", "", "", "", "7:00", "35:00", "37:20", "Approuvé"]
    ],
    modifications: []
  }
};

// Notifications
const notifications = [];

let requestIdCounter = 3;
let agentIdCounter = 5;

// ========================================
// FONCTIONS D'IMPORT/EXPORT CSV
// ========================================

// Parse le fichier CSV au format de la collectivité
function parseCSVFile(csvContent) {
  const lines = csvContent.split('\n');
  const agentInfo = {
    annee: null,
    nom: null,
    prenom: null,
    dateEntreeFP: null,
    dateDebutContrat: null,
    dateFinContrat: null,
    quotiteTravail: null,
    nbHeuresMG: null,
    congesAnnuels: { total: "0:00", restant: "0:00" },
    bonifications: { total: "0:00", restant: "0:00" },
    anciennete: { total: "0:00", restant: "0:00" },
    rtt: { total: "0:00", restant: "0:00" },
    congesFormation: { total: "0:00", restant: "0:00" },
    cet: { total: 0, restant: 0 },
    absences: [],
    planning: {}
  };
  
  // Parse l'en-tête et les infos agent
  for (let i = 0; i < Math.min(20, lines.length); i++) {
    const cells = lines[i].split(';');
    
    // Année
    if (cells[1] && cells[1].includes('Année')) {
      agentInfo.annee = parseInt(cells[2]) || 2025;
    }
    // Nom
    if (cells[1] && cells[1].includes('Nom')) {
      agentInfo.nom = cells[2]?.trim() || '';
    }
    // Prénom
    if (cells[1] && cells[1].includes('Prénom') || cells[1]?.includes('Prenom')) {
      agentInfo.prenom = cells[2]?.trim() || '';
    }
    // Année d'entrée FP
    if (cells[1] && cells[1].includes("entrée dans la FP")) {
      agentInfo.dateEntreeFP = cells[2]?.trim();
    }
    // Date début contrat
    if (cells[1] && cells[1].includes('Date début contrat') || cells[1]?.includes('Date debut contrat')) {
      agentInfo.dateDebutContrat = parseCSVDate(cells[2]?.trim());
    }
    // Date fin contrat
    if (cells[1] && cells[1].includes('Date de fin')) {
      agentInfo.dateFinContrat = parseCSVDate(cells[2]?.trim());
    }
    // Quotité de travail
    if (cells[1] && cells[1].includes('Quotité de travail') || cells[1]?.includes('Quotite de travail')) {
      agentInfo.quotiteTravail = parseFloat(cells[2]?.replace(',', '.')) || 35;
    }
    // Nb heures MG
    if (cells[1] && cells[1].includes('heures de MG')) {
      agentInfo.nbHeuresMG = cells[2]?.trim() || "35:00";
    }
    // Congés annuels
    if (cells[2] && cells[2].includes('Congés annuels') || cells[2]?.includes('Conges annuels')) {
      agentInfo.congesAnnuels.total = cells[5]?.trim() || "0:00";
    }
    // Bonifications
    if (cells[2] && cells[2].includes('Bonifications')) {
      agentInfo.bonifications.total = cells[5]?.trim() || "0:00";
    }
    // RTT
    if (cells[2] && cells[2] === 'RTT') {
      agentInfo.rtt.total = cells[5]?.trim() || "0:00";
    }
    // Congés formation
    if (cells[2] && cells[2].includes('Congés formations') || cells[2]?.includes('Conges formations')) {
      agentInfo.congesFormation.total = cells[5]?.trim() || "0:00";
    }
    // CET
    if (cells[2] && cells[2] === 'CET') {
      agentInfo.cet.total = parseInt(cells[3]) || 0;
    }
    // Soldes restants CA
    if (cells[2] && cells[2] === 'CA' && cells[1]?.includes('contrat')) {
      agentInfo.congesAnnuels.restant = cells[5]?.trim() || "0:00";
    }
    // Soldes restants CF
    if (cells[2] && cells[2] === 'CF' && cells[1]?.includes('contrat')) {
      agentInfo.congesFormation.restant = cells[5]?.trim() || "0:00";
    }
  }
  
  // Parse les absences (chercher la section DATE D'ABSENCE)
  let absenceSection = false;
  for (let i = 0; i < lines.length; i++) {
    const cells = lines[i].split(';');
    
    if (cells[0] && cells[0].includes("DATE D'ABSENCE")) {
      absenceSection = true;
      continue;
    }
    
    if (absenceSection && cells[0] && TYPES_ABSENCES[cells[0]]) {
      const absence = {
        type: cells[0],
        dateDebut: parseCSVDate(cells[1]),
        dateFin: parseCSVDate(cells[2]) || parseCSVDate(cells[1]),
        demiJournee: cells[3]?.toLowerCase().includes('matin') ? 'matin' : 
                     cells[3]?.toLowerCase().includes('après-midi') || cells[3]?.toLowerCase().includes('apres-midi') ? 'après-midi' : null,
        motif: cells[4] || '',
        heuresSup: cells[5] || '',
        heuresMoins: cells[6] || '',
        statut: 'approved'
      };
      
      if (absence.dateDebut) {
        agentInfo.absences.push(absence);
      }
    }
  }
  
  return agentInfo;
}

// Parse une date au format CSV (ex: "vendredi 30 mai 2025" ou "03/03/2025")
function parseCSVDate(dateStr) {
  if (!dateStr) return null;
  
  // Format DD/MM/YYYY
  const slashMatch = dateStr.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (slashMatch) {
    return `${slashMatch[3]}-${slashMatch[2]}-${slashMatch[1]}`;
  }
  
  // Format "jour DD mois YYYY"
  const mois = {
    'janvier': '01', 'février': '02', 'fevrier': '02', 'mars': '03', 'avril': '04',
    'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08', 'aout': '08',
    'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12', 'decembre': '12'
  };
  
  const textMatch = dateStr.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/i);
  if (textMatch) {
    const day = textMatch[1].padStart(2, '0');
    const month = mois[textMatch[2].toLowerCase()];
    const year = textMatch[3];
    if (month) {
      return `${year}-${month}-${day}`;
    }
  }
  
  return null;
}

// Génère un fichier CSV au format de la collectivité
function generateCSVExport(agentId) {
  const agent = agentData[agentId];
  const excel = excelData[agentId];
  const absences = absencesHistorique[agentId] || [];
  const now = new Date();
  
  let csv = '';
  
  // En-tête
  csv += `;Le;${now.toLocaleDateString('fr-FR')};RECAPITULATIF CONGES ACQUIS;;;Ouverture droit aux journées de bonification ;;;PLANNING PRATICIENS;;;;\n`;
  csv += `;Année;${agent.annee};Congés annuels;;${agent.congesAnnuels.total};Ouverture droit aux journées de bonification ;;Nb de jours posés;Jours;Horaires;;\n`;
  csv += `;Nom;${agent.nom};Bonifications;;${agent.bonifications.total};;;;lundi;;;;;\n`;
  csv += `;Prénom;${agent.prenom};Ancienneté suite 1607h ;;${agent.anciennete.total};;;;mardi;${agent.planning?.mardi?.matin || ''};${agent.planning?.mardi?.apresMidi || ''};;;\n`;
  csv += `;Année d'entrée dans la FP;${agent.dateEntreeFP || ''};RTT;Déduits après arrêts;${agent.rtt.total};;;;mercredi;${agent.planning?.mercredi?.matin || ''};${agent.planning?.mercredi?.apresMidi || ''};;;\n`;
  csv += `;Date début contrat;${formatDateCSV(agent.dateDebutContrat)};Jours de sujétions;;0:00:00;;;;jeudi;${agent.planning?.jeudi?.matin || ''};${agent.planning?.jeudi?.apresMidi || ''};;;\n`;
  csv += `;Date de fin;${agent.dateFinContrat ? formatDateCSV(agent.dateFinContrat) : ''};Congés formations;;${agent.congesFormation.total};;;;vendredi;${agent.planning?.vendredi?.matin || ''};${agent.planning?.vendredi?.apresMidi || ''};;;\n`;
  csv += `;Quotité de travail;${agent.quotiteTravail?.toFixed(2).replace('.', ',')};CET;${agent.cet.total};;;;sam;;;;;\n`;
  csv += `;Nb d'heures de MG;${agent.nbHeuresMG};;;;;;Total;;${agent.nbHeuresMG};;;\n`;
  csv += `;;;;;;;;;;;;;;;\n`;
  csv += `${agent.nom} ${agent.prenom} ${agent.annee};;;;;;;;;;;;;;;\n`;
  csv += `;;;;;;;;;;;;;;CA;${agent.congesAnnuels.total};;;\n`;
  csv += `DATE D'ABSENCE ET MOTIF;;;;;;;CA-HS;CF;AM;EM;;CET / MEDAILLES;;ASA;;CF;${agent.congesFormation.total};;;\n`;
  csv += `Types d'absence;Date de début;Date de fin;Demi-journées;motif;Heures supplémentaires;Heures en moins;Solde;Solde;nb de jours;nb de jours;Jours;nb de jours;Solde;Nb de jours;;;;;;\n`;
  csv += `;;;;;;;${agent.congesAnnuels.total};${agent.congesFormation.total};;;;;;;;;;;\n`;
  
  // Absences
  absences.forEach((absence, index) => {
    const dateDebutFr = formatDateCSVLong(absence.dateDebut);
    const dateFinFr = absence.dateFin !== absence.dateDebut ? formatDateCSVLong(absence.dateFin) : '';
    csv += `${absence.type};${dateDebutFr};${dateFinFr};${absence.demiJournee || ''};${absence.motif || ''};${absence.heuresSup || ''};${absence.heures || ''};;;;;;;;;${index + 1};;;;;\n`;
  });
  
  return csv;
}

// Formate une date pour CSV (DD/MM/YYYY)
function formatDateCSV(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-FR');
}

// Formate une date pour CSV format long (ex: "vendredi 30 mai 2025")
function formatDateCSVLong(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
}

// Import un agent depuis un fichier CSV
function importAgentFromCSV(csvContent) {
  const parsedData = parseCSVFile(csvContent);
  
  if (!parsedData.nom || !parsedData.prenom) {
    throw new Error("Impossible de lire le nom et prénom de l'agent dans le fichier CSV");
  }
  
  const newAgentId = `user${++agentIdCounter}`;
  const fullname = `${parsedData.nom} ${parsedData.prenom}`;
  const username = `${parsedData.prenom.toLowerCase()}.${parsedData.nom.toLowerCase()}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // Créer l'utilisateur
  mockUsers.push({
    id: newAgentId,
    username: username,
    password: "password123",
    fullname: fullname,
    email: `${username}@collectivite.local`,
    role: "AGENT",
    manager: currentUser?.username || "jean.manager"
  });
  
  // Calculer les jours
  const heuresRestantes = parseHeures(parsedData.congesAnnuels.restant);
  const heuresTotal = parseHeures(parsedData.congesAnnuels.total);
  const joursRestants = Math.floor(heuresRestantes / 7);
  const joursTotal = Math.floor(heuresTotal / 7);
  
  // Créer les données agent
  agentData[newAgentId] = {
    fullname: fullname,
    nom: parsedData.nom,
    prenom: parsedData.prenom,
    email: `${username}@collectivite.local`,
    manager: currentUser?.username || "jean.manager",
    annee: parsedData.annee || 2025,
    dateEntreeFP: parsedData.dateEntreeFP,
    dateDebutContrat: parsedData.dateDebutContrat,
    dateFinContrat: parsedData.dateFinContrat,
    quotiteTravail: parsedData.quotiteTravail || 35,
    nbHeuresMG: parsedData.nbHeuresMG || "35:00",
    congesAnnuels: parsedData.congesAnnuels,
    bonifications: parsedData.bonifications,
    anciennete: parsedData.anciennete,
    rtt: parsedData.rtt,
    congesFormation: parsedData.congesFormation,
    cet: parsedData.cet,
    joursTotal: joursTotal,
    joursRestants: joursRestants,
    joursUtilises: joursTotal - joursRestants,
    planning: parsedData.planning || {}
  };
  
  // Créer l'historique des absences
  absencesHistorique[newAgentId] = parsedData.absences;
  
  // Créer les données Excel
  excelData[newAgentId] = {
    annee: parsedData.annee || 2025,
    donnees: [
      ["Type", "Date début", "Date fin", "Demi-journée", "Motif", "Heures Sup", "Heures Moins", "Solde CA", "Solde CF", "Statut"]
    ],
    modifications: [{
      date: new Date().toISOString(),
      modifiePar: currentUser?.fullname || "Système",
      action: "Import CSV",
      details: `Import du fichier de ${fullname}`
    }]
  };
  
  // Ajouter les absences au tableau Excel
  parsedData.absences.forEach(absence => {
    excelData[newAgentId].donnees.push([
      absence.type,
      formatDate(absence.dateDebut),
      absence.dateFin ? formatDate(absence.dateFin) : '',
      absence.demiJournee || '',
      absence.motif || '',
      absence.heuresSup || '',
      absence.heures || '',
      '',
      '',
      'Approuvé'
    ]);
  });
  
  return { agentId: newAgentId, fullname: fullname };
}

// Parse les heures au format HH:MM en nombre décimal
function parseHeures(heuresStr) {
  if (!heuresStr) return 0;
  const match = heuresStr.match(/(\d+):(\d+)/);
  if (match) {
    return parseInt(match[1]) + parseInt(match[2]) / 60;
  }
  return parseFloat(heuresStr) || 0;
}

// Convertit des heures décimales en format HH:MM
function formatHeures(heuresDecimal) {
  const hours = Math.floor(heuresDecimal);
  const minutes = Math.round((heuresDecimal - hours) * 60);
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
}

// Utility Functions
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

function showModal(title, content) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalContent').innerHTML = content;
  document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
}

function calculateDays(dateDebut, dateFin) {
  const start = new Date(dateDebut);
  const end = new Date(dateFin);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
}

function getBadgeClass(statut) {
  switch(statut) {
    case 'pending': return 'badge-pending';
    case 'approved': return 'badge-approved';
    case 'rejected': return 'badge-rejected';
    default: return 'badge-pending';
  }
}

function getStatutText(statut) {
  switch(statut) {
    case 'pending': return 'En attente';
    case 'approved': return 'Approuvé';
    case 'rejected': return 'Rejeté';
    default: return statut;
  }
}

// Authentication
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const user = mockUsers.find(u => u.username === username && u.password === password);
  
  if (user) {
    currentUser = user;
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    showToast(`Bienvenue ${user.fullname} !`, 'success');
    initializeApp();
  } else {
    document.getElementById('loginError').textContent = 'Identifiants incorrects. Veuillez réessayer.';
    document.getElementById('loginError').style.display = 'block';
  }
});

function logout() {
  currentUser = null;
  document.getElementById('loginPage').classList.remove('hidden');
  document.getElementById('mainApp').classList.add('hidden');
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  showToast('Déconnexion réussie', 'info');
}

// Initialize App
function initializeApp() {
  document.getElementById('sidebarUser').textContent = `${currentUser.fullname} (${currentUser.role})`;
  
  const navMenu = document.getElementById('navMenu');
  navMenu.innerHTML = '';
  
  if (currentUser.role === 'AGENT') {
    navMenu.innerHTML = `
      <li class="nav-item"><a class="nav-link active" onclick="navigateTo('dashboard')">Tableau de bord</a></li>
      <li class="nav-item"><a class="nav-link" onclick="navigateTo('nouvelle-demande')">Nouvelle demande</a></li>
      <li class="nav-item"><a class="nav-link" onclick="navigateTo('mes-demandes')">Mes demandes</a></li>
    `;
    navigateTo('dashboard');
  } else {
    navMenu.innerHTML = `
      <li class="nav-item"><a class="nav-link active" onclick="navigateTo('dashboard-manager')">Tableau de bord</a></li>
      <li class="nav-item"><a class="nav-link" onclick="navigateTo('demandes-attente')">Demandes à traiter</a></li>
      <li class="nav-item"><a class="nav-link" onclick="navigateTo('historique-manager')">Historique</a></li>
      <li class="nav-item"><a class="nav-link" onclick="navigateTo('gestion-agents')">Gestion des agents</a></li>
    `;
    navigateTo('dashboard-manager');
  }
}

function navigateTo(page) {
  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  event.target.classList.add('active');
  
  const mainContent = document.getElementById('mainContent');
  
  switch(page) {
    case 'dashboard':
      renderAgentDashboard();
      break;
    case 'nouvelle-demande':
      renderNewRequest();
      break;
    case 'mes-demandes':
      renderMyRequests();
      break;
    case 'dashboard-manager':
      renderManagerDashboard();
      break;
    case 'demandes-attente':
      renderPendingRequests();
      break;
    case 'historique-manager':
      renderManagerHistory();
      break;
    case 'gestion-agents':
      renderAgentManagement();
      break;
  }
}

// Agent Dashboard
function renderAgentDashboard() {
  const agent = agentData[currentUser.id];
  const userDemandes = demandes.filter(d => d.agentId === currentUser.id);
  const approvedCount = userDemandes.filter(d => d.statut === 'approved').length;
  const pendingCount = userDemandes.filter(d => d.statut === 'pending').length;
  const userNotifications = notifications.filter(n => n.userId === currentUser.id);
  const userAbsences = absencesHistorique[currentUser.id] || [];
  
  let content = `
    <div class="page-header">
      <h1 class="page-title">Bonjour ${currentUser.fullname} 👋</h1>
      <p style="color: var(--color-text-secondary);">Année ${agent.annee || 2025}</p>
    </div>
  `;
  
  // Notifications
  if (userNotifications.length > 0) {
    content += `
      <div class="notifications-section">
        <h3 style="margin-bottom: var(--space-16);">Notifications <span class="notification-badge">${userNotifications.length}</span></h3>
    `;
    userNotifications.forEach(notif => {
      content += `
        <div class="notification-item ${notif.type}">
          <div>
            <strong>${notif.title}</strong><br>
            <span style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">${notif.message}</span>
          </div>
          ${notif.downloadable ? `<button class="btn btn-sm btn-secondary" onclick="downloadAgentCSV('${currentUser.id}')">📥 Télécharger</button>` : ''}
        </div>
      `;
    });
    content += `</div>`;
  }
  
  // Soldes détaillés
  content += `
    <div style="margin-bottom: var(--space-32);">
      <h3 style="margin-bottom: var(--space-16);">💼 Mes soldes</h3>
      <div class="stats-grid" style="grid-template-columns: repeat(4, 1fr);">
        <div class="stat-card">
          <div class="stat-label">Congés annuels (CA)</div>
          <div class="stat-value" style="color: var(--color-primary);">${agent.congesAnnuels?.restant || agent.joursRestants + 'j'}</div>
          <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">sur ${agent.congesAnnuels?.total || agent.joursTotal + 'j'}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">RTT</div>
          <div class="stat-value">${agent.rtt?.restant || '0:00'}</div>
          <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">sur ${agent.rtt?.total || '0:00'}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Congés formation (CF)</div>
          <div class="stat-value">${agent.congesFormation?.restant || '0:00'}</div>
          <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">sur ${agent.congesFormation?.total || '0:00'}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Bonifications</div>
          <div class="stat-value">${agent.bonifications?.restant || '0:00'}</div>
          <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">sur ${agent.bonifications?.total || '0:00'}</div>
        </div>
      </div>
    </div>
    
    <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: var(--space-32);">
      <div class="stat-card">
        <div class="stat-label">Demandes en attente</div>
        <div class="stat-value" style="color: var(--color-warning);">${pendingCount}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Demandes approuvées</div>
        <div class="stat-value" style="color: var(--color-success);">${approvedCount}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Absences cette année</div>
        <div class="stat-value">${userAbsences.length}</div>
      </div>
    </div>
  `;
  
  // Prochains jours fériés
  const today = new Date();
  const prochainsFeries = JOURS_FERIES_2025.filter(f => new Date(f.date) >= today).slice(0, 3);
  
  if (prochainsFeries.length > 0) {
    content += `
      <div class="table-container" style="margin-bottom: var(--space-32);">
        <div style="padding: var(--space-20);">
          <h3 style="margin-bottom: var(--space-16);">📅 Prochains jours fériés</h3>
          <div style="display: flex; gap: var(--space-16);">
            ${prochainsFeries.map(f => `
              <div style="background: var(--color-bg-2); padding: var(--space-12); border-radius: var(--radius-base); flex: 1;">
                <div style="font-weight: var(--font-weight-semibold);">${f.label}</div>
                <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">${formatDate(f.date)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  
  // Actions rapides
  content += `
    <div style="display: flex; gap: var(--space-12);">
      <button class="btn btn-primary" onclick="document.querySelectorAll('.nav-link')[1].click()" style="width: auto;">✚ Nouvelle demande de congés</button>
      <button class="btn btn-secondary" onclick="downloadAgentCSV('${currentUser.id}')" style="width: auto;">📥 Exporter mon fichier CSV</button>
    </div>
  `;
  
  document.getElementById('mainContent').innerHTML = content;
}

// New Request Form
function renderNewRequest() {
  const agent = agentData[currentUser.id];
  
  // Générer les options de types d'absences
  let typeOptions = '';
  Object.keys(TYPES_ABSENCES).forEach(code => {
    const type = TYPES_ABSENCES[code];
    typeOptions += `<option value="${code}">${type.label} (${code})</option>`;
  });
  
  const content = `
    <div class="page-header">
      <h1 class="page-title">Nouvelle demande de congés</h1>
    </div>
    
    <div class="table-container" style="max-width: 700px;">
      <div style="padding: var(--space-24);">
        <div class="soldes-recap" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-12); margin-bottom: var(--space-24); padding: var(--space-16); background: var(--color-bg-1); border-radius: var(--radius-base);">
          <div>
            <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">Congés annuels restants</div>
            <div style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--color-primary);">${agent.congesAnnuels?.restant || agent.joursRestants + ' jours'}</div>
          </div>
          <div>
            <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">RTT restants</div>
            <div style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold);">${agent.rtt?.restant || '0:00'}</div>
          </div>
          <div>
            <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">Formation restant</div>
            <div style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold);">${agent.congesFormation?.restant || '0:00'}</div>
          </div>
        </div>
        
        <form id="newRequestForm">
          <div class="form-group">
            <label class="form-label">Type d'absence</label>
            <select class="form-control" id="typeConges" required>
              ${typeOptions}
            </select>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-16);">
            <div class="form-group">
              <label class="form-label">Date de début</label>
              <input type="date" class="form-control" id="dateDebut" required>
            </div>
            
            <div class="form-group">
              <label class="form-label">Date de fin</label>
              <input type="date" class="form-control" id="dateFin" required>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Demi-journée (optionnel)</label>
            <select class="form-control" id="demiJournee">
              <option value="">Journée complète</option>
              <option value="matin">Matin uniquement</option>
              <option value="après-midi">Après-midi uniquement</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Motif (optionnel)</label>
            <textarea class="form-control" id="motif" rows="3" placeholder="Ex: Vacances, événement familial..."></textarea>
          </div>
          
          <div id="joursCalcules" style="padding: var(--space-12); background-color: var(--color-bg-3); border-radius: var(--radius-base); margin-bottom: var(--space-16); display: none;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span><strong>Calcul:</strong></span>
              <span><strong id="nombreJours">0</strong> jour(s) - <strong id="nombreHeures">0:00</strong> heures</span>
            </div>
          </div>
          
          <div id="alerteFerie" style="padding: var(--space-12); background-color: var(--color-bg-2); border-radius: var(--radius-base); margin-bottom: var(--space-16); display: none;">
            <span style="color: var(--color-warning);">⚠️ Attention: Cette période inclut des jours fériés</span>
            <div id="listeFeries" style="font-size: var(--font-size-sm); margin-top: var(--space-8);"></div>
          </div>
          
          <div class="error-message" id="requestError" style="display: none;"></div>
          <div class="success-message" id="requestSuccess" style="display: none;"></div>
          
          <button type="submit" class="btn btn-primary" style="width: 100%;">Soumettre la demande</button>
        </form>
      </div>
    </div>
  `;
  
  document.getElementById('mainContent').innerHTML = content;
  
  // Auto-calculate days
  document.getElementById('dateDebut').addEventListener('change', calculateRequestDays);
  document.getElementById('dateFin').addEventListener('change', calculateRequestDays);
  document.getElementById('demiJournee').addEventListener('change', calculateRequestDays);
  
  document.getElementById('newRequestForm').addEventListener('submit', submitRequest);
}

function calculateRequestDays() {
  const dateDebut = document.getElementById('dateDebut').value;
  const dateFin = document.getElementById('dateFin').value;
  const demiJournee = document.getElementById('demiJournee').value;
  
  if (dateDebut && dateFin) {
    const agent = agentData[currentUser.id];
    const result = calculateWorkingDaysAndHours(dateDebut, dateFin, demiJournee, agent);
    
    document.getElementById('nombreJours').textContent = result.jours;
    document.getElementById('nombreHeures').textContent = result.heures;
    document.getElementById('joursCalcules').style.display = 'block';
    
    // Vérifier les jours fériés
    const feries = checkJoursFeries(dateDebut, dateFin);
    if (feries.length > 0) {
      document.getElementById('alerteFerie').style.display = 'block';
      document.getElementById('listeFeries').innerHTML = feries.map(f => `• ${f.label} (${formatDate(f.date)})`).join('<br>');
    } else {
      document.getElementById('alerteFerie').style.display = 'none';
    }
  }
}

// Calcule les jours ouvrés et heures en fonction du planning de l'agent
function calculateWorkingDaysAndHours(dateDebut, dateFin, demiJournee, agent) {
  const start = new Date(dateDebut);
  const end = new Date(dateFin);
  let jours = 0;
  let heures = 0;
  
  const joursSemaine = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const jourNom = joursSemaine[d.getDay()];
    const planning = agent.planning?.[jourNom];
    
    // Ignorer weekends si pas dans le planning
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    
    // Vérifier si c'est un jour férié
    const dateStr = d.toISOString().split('T')[0];
    const isFerie = JOURS_FERIES_2025.some(f => f.date === dateStr);
    if (isFerie) continue;
    
    if (planning && planning.heures > 0) {
      if (demiJournee && start.getTime() === end.getTime()) {
        // Une seule journée en demi-journée
        jours += 0.5;
        heures += planning.heures / 2;
      } else {
        jours += 1;
        heures += planning.heures;
      }
    } else {
      // Planning par défaut: 7h/jour
      if (demiJournee && start.getTime() === end.getTime()) {
        jours += 0.5;
        heures += 3.5;
      } else {
        jours += 1;
        heures += 7;
      }
    }
  }
  
  return {
    jours: jours,
    heures: formatHeures(heures)
  };
}

// Vérifie les jours fériés dans une période
function checkJoursFeries(dateDebut, dateFin) {
  const start = new Date(dateDebut);
  const end = new Date(dateFin);
  
  return JOURS_FERIES_2025.filter(ferie => {
    const ferieDate = new Date(ferie.date);
    return ferieDate >= start && ferieDate <= end;
  });
}

function submitRequest(e) {
  e.preventDefault();
  
  const dateDebut = document.getElementById('dateDebut').value;
  const dateFin = document.getElementById('dateFin').value;
  const type = document.getElementById('typeConges').value;
  const demiJournee = document.getElementById('demiJournee').value;
  const motif = document.getElementById('motif').value;
  
  // Validation
  if (new Date(dateFin) < new Date(dateDebut)) {
    document.getElementById('requestError').textContent = 'La date de fin doit être après la date de début.';
    document.getElementById('requestError').style.display = 'block';
    document.getElementById('requestSuccess').style.display = 'none';
    return;
  }
  
  const agent = agentData[currentUser.id];
  const result = calculateWorkingDaysAndHours(dateDebut, dateFin, demiJournee, agent);
  const heuresRequises = parseHeures(result.heures);
  
  // Vérifier le solde selon le type
  if (type === 'CA') {
    const soldeCA = parseHeures(agent.congesAnnuels?.restant || '0:00');
    if (heuresRequises > soldeCA) {
      document.getElementById('requestError').textContent = `Solde insuffisant. Vous avez ${agent.congesAnnuels?.restant || '0:00'} heures de CA restantes.`;
      document.getElementById('requestError').style.display = 'block';
      document.getElementById('requestSuccess').style.display = 'none';
      return;
    }
  } else if (type === 'RTT') {
    const soldeRTT = parseHeures(agent.rtt?.restant || '0:00');
    if (heuresRequises > soldeRTT) {
      document.getElementById('requestError').textContent = `Solde insuffisant. Vous avez ${agent.rtt?.restant || '0:00'} heures de RTT restantes.`;
      document.getElementById('requestError').style.display = 'block';
      document.getElementById('requestSuccess').style.display = 'none';
      return;
    }
  } else if (type === 'CF') {
    const soldeCF = parseHeures(agent.congesFormation?.restant || '0:00');
    if (heuresRequises > soldeCF) {
      document.getElementById('requestError').textContent = `Solde insuffisant. Vous avez ${agent.congesFormation?.restant || '0:00'} heures de CF restantes.`;
      document.getElementById('requestError').style.display = 'block';
      document.getElementById('requestSuccess').style.display = 'none';
      return;
    }
  }
  
  // Check overlaps
  const overlap = demandes.some(d => 
    d.agentId === currentUser.id && 
    d.statut !== 'rejected' &&
    ((new Date(dateDebut) >= new Date(d.dateDebut) && new Date(dateDebut) <= new Date(d.dateFin)) ||
     (new Date(dateFin) >= new Date(d.dateDebut) && new Date(dateFin) <= new Date(d.dateFin)))
  );
  
  if (overlap) {
    document.getElementById('requestError').textContent = 'Chevauchement avec une demande existante.';
    document.getElementById('requestError').style.display = 'block';
    document.getElementById('requestSuccess').style.display = 'none';
    return;
  }
  
  // Create request
  const typeInfo = TYPES_ABSENCES[type];
  const newRequest = {
    id: `req${++requestIdCounter}`,
    agentId: currentUser.id,
    agentName: currentUser.fullname,
    dateDebut,
    dateFin,
    type,
    typeLabel: typeInfo?.label || type,
    demiJournee: demiJournee || null,
    motif,
    statut: 'pending',
    dateCreation: new Date().toISOString().split('T')[0],
    heures: result.heures,
    jours: result.jours
  };
  
  demandes.push(newRequest);
  
  document.getElementById('requestError').style.display = 'none';
  document.getElementById('requestSuccess').textContent = `Demande de ${typeInfo?.label || type} soumise avec succès - En attente de validation`;
  document.getElementById('requestSuccess').style.display = 'block';
  
  showToast('Demande soumise avec succès !', 'success');
  
  setTimeout(() => {
    navigateTo('mes-demandes');
  }, 1500);
}

// My Requests
function renderMyRequests() {
  const userDemandes = demandes.filter(d => d.agentId === currentUser.id);
  const userAbsences = absencesHistorique[currentUser.id] || [];
  
  let content = `
    <div class="page-header">
      <h1 class="page-title">Mes demandes et absences</h1>
    </div>
    
    <div class="tabs">
      <button class="tab active" onclick="showTab('demandes')">Demandes en cours</button>
      <button class="tab" onclick="showTab('historique')">Historique des absences</button>
    </div>
    
    <div id="tab-demandes" class="tab-content">
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Demi-journée</th>
              <th>Heures</th>
              <th>Motif</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  `;
  
  if (userDemandes.length === 0) {
    content += `<tr><td colspan="8" style="text-align: center; color: var(--color-text-secondary);">Aucune demande en cours</td></tr>`;
  } else {
    [...userDemandes].reverse().forEach(demande => {
      const typeInfo = TYPES_ABSENCES[demande.type] || { label: demande.type, code: demande.type };
      content += `
        <tr>
          <td><span class="type-badge" style="background-color: ${typeInfo.color || '#888'}20; color: ${typeInfo.color || '#888'}; padding: 4px 8px; border-radius: 4px; font-weight: 500;">${typeInfo.code}</span></td>
          <td>${formatDate(demande.dateDebut)}</td>
          <td>${formatDate(demande.dateFin)}</td>
          <td>${demande.demiJournee || '-'}</td>
          <td>${demande.heures || demande.jours + 'j'}</td>
          <td>${demande.motif || '-'}</td>
          <td><span class="badge ${getBadgeClass(demande.statut)}">${getStatutText(demande.statut)}</span></td>
          <td>
            ${demande.statut === 'approved' ? `<button class="btn btn-sm btn-secondary" onclick="downloadAgentCSV('${currentUser.id}')">📄 Export</button>` : 
              demande.statut === 'pending' ? `<button class="btn btn-sm btn-secondary" onclick="cancelRequest('${demande.id}')">❌ Annuler</button>` : '-'}
          </td>
        </tr>
      `;
    });
  }
  
  content += `
          </tbody>
        </table>
      </div>
    </div>
    
    <div id="tab-historique" class="tab-content hidden">
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Demi-journée</th>
              <th>Motif</th>
              <th>Heures</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
  `;
  
  if (userAbsences.length === 0) {
    content += `<tr><td colspan="7" style="text-align: center; color: var(--color-text-secondary);">Aucune absence enregistrée</td></tr>`;
  } else {
    [...userAbsences].reverse().forEach(absence => {
      const typeInfo = TYPES_ABSENCES[absence.type] || { label: absence.type, code: absence.type, color: '#888' };
      content += `
        <tr>
          <td><span class="type-badge" style="background-color: ${typeInfo.color}20; color: ${typeInfo.color}; padding: 4px 8px; border-radius: 4px; font-weight: 500;">${typeInfo.code}</span> ${typeInfo.label}</td>
          <td>${formatDate(absence.dateDebut)}</td>
          <td>${absence.dateFin ? formatDate(absence.dateFin) : '-'}</td>
          <td>${absence.demiJournee || '-'}</td>
          <td>${absence.motif || '-'}</td>
          <td>${absence.heures || absence.heuresSup || '-'}</td>
          <td><span class="badge badge-approved">Validé</span></td>
        </tr>
      `;
    });
  }
  
  content += `
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  document.getElementById('mainContent').innerHTML = content;
}

// Fonction pour changer d'onglet
function showTab(tabName) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
  
  event.target.classList.add('active');
  document.getElementById(`tab-${tabName}`).classList.remove('hidden');
}

// Fonction pour annuler une demande
function cancelRequest(requestId) {
  const demande = demandes.find(d => d.id === requestId);
  if (demande && demande.statut === 'pending') {
    const index = demandes.indexOf(demande);
    demandes.splice(index, 1);
    showToast('Demande annulée', 'info');
    renderMyRequests();
  }
}

// Export CSV pour un agent
function downloadAgentCSV(agentId) {
  const csvContent = generateCSVExport(agentId);
  const agent = agentData[agentId];
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${agent.nom}_${agent.prenom}(${agent.annee}).csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showToast('Fichier CSV exporté avec succès !', 'success');
}

// Manager Dashboard
function renderManagerDashboard() {
  const managedAgents = Object.keys(agentData).filter(id => agentData[id].manager === currentUser.username);
  const pendingRequests = demandes.filter(d => managedAgents.includes(d.agentId) && d.statut === 'pending');
  const approvedThisMonth = demandes.filter(d => managedAgents.includes(d.agentId) && d.statut === 'approved').length;
  const rejectedThisMonth = demandes.filter(d => managedAgents.includes(d.agentId) && d.statut === 'rejected').length;
  
  const content = `
    <div class="page-header">
      <h1 class="page-title">Tableau de bord Responsable</h1>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Agents sous responsabilité</div>
        <div class="stat-value">${managedAgents.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Demandes en attente</div>
        <div class="stat-value">${pendingRequests.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Demandes approuvées</div>
        <div class="stat-value">${approvedThisMonth}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Demandes rejetées</div>
        <div class="stat-value">${rejectedThisMonth}</div>
      </div>
    </div>
    
    <div style="margin-top: var(--space-32);">
      <button class="btn btn-primary" onclick="navigateTo('demandes-attente')" style="width: auto;">📋 Voir les demandes en attente</button>
    </div>
  `;
  
  document.getElementById('mainContent').innerHTML = content;
}

// Pending Requests (Manager)
function renderPendingRequests() {
  const managedAgents = Object.keys(agentData).filter(id => agentData[id].manager === currentUser.username);
  const pendingRequests = demandes.filter(d => managedAgents.includes(d.agentId) && d.statut === 'pending');
  
  let content = `
    <div class="page-header">
      <h1 class="page-title">Demandes en attente</h1>
    </div>
    
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Agent</th>
            <th>Date début</th>
            <th>Date fin</th>
            <th>Type</th>
            <th>Jours</th>
            <th>Motif</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  `;
  
  if (pendingRequests.length === 0) {
    content += `<tr><td colspan="7" style="text-align: center; color: var(--color-text-secondary);">Aucune demande en attente</td></tr>`;
  } else {
    pendingRequests.forEach(demande => {
      content += `
        <tr>
          <td><strong>${demande.agentName}</strong></td>
          <td>${formatDate(demande.dateDebut)}</td>
          <td>${formatDate(demande.dateFin)}</td>
          <td>${demande.type}</td>
          <td>${demande.jours}</td>
          <td>${demande.motif || '-'}</td>
          <td>
            <div class="btn-group">
              <button class="btn btn-sm btn-primary" onclick="approveRequest('${demande.id}')">✓ Approuver</button>
              <button class="btn btn-sm btn-secondary" onclick="rejectRequest('${demande.id}')">✗ Refuser</button>
            </div>
          </td>
        </tr>
      `;
    });
  }
  
  content += `
        </tbody>
      </table>
    </div>
  `;
  
  document.getElementById('mainContent').innerHTML = content;
}

function approveRequest(requestId) {
  const demande = demandes.find(d => d.id === requestId);
  
  const modalContent = `
    <p>Êtes-vous sûr de vouloir approuver la demande de <strong>${demande.agentName}</strong> du ${formatDate(demande.dateDebut)} au ${formatDate(demande.dateFin)} ?</p>
    <div class="modal-actions">
      <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="confirmApprove('${requestId}')">Approuver</button>
    </div>
  `;
  
  showModal('Approuver la demande', modalContent);
}

function confirmApprove(requestId) {
  const demande = demandes.find(d => d.id === requestId);
  demande.statut = 'approved';
  demande.dateDecision = new Date().toISOString().split('T')[0];
  demande.responsableDecision = currentUser.username;
  
  // Ajouter l'absence à l'historique
  if (!absencesHistorique[demande.agentId]) {
    absencesHistorique[demande.agentId] = [];
  }
  absencesHistorique[demande.agentId].push({
    type: demande.type,
    dateDebut: demande.dateDebut,
    dateFin: demande.dateFin,
    demiJournee: demande.demiJournee,
    motif: demande.motif,
    heures: demande.heures,
    statut: 'approved'
  });
  
  // Add to Excel data
  const agentExcel = excelData[demande.agentId];
  agentExcel.donnees.push([
    demande.type,
    formatDate(demande.dateDebut),
    formatDate(demande.dateFin),
    demande.demiJournee || '',
    demande.motif || '',
    '',
    demande.heures || '',
    '',
    '',
    "Approuvé"
  ]);
  
  // Add modification history
  agentExcel.modifications.push({
    date: new Date().toISOString(),
    modifiePar: currentUser.fullname,
    action: "Approbation demande",
    details: `${TYPES_ABSENCES[demande.type]?.label || demande.type} du ${formatDate(demande.dateDebut)} au ${formatDate(demande.dateFin)}`
  });
  
  // Mettre à jour les soldes de l'agent
  const agent = agentData[demande.agentId];
  const heuresDeduites = parseHeures(demande.heures || '0:00');
  
  if (demande.type === 'CA' && agent.congesAnnuels) {
    const soldeActuel = parseHeures(agent.congesAnnuels.restant);
    agent.congesAnnuels.restant = formatHeures(Math.max(0, soldeActuel - heuresDeduites));
    agent.congesAnnuels.utilise = formatHeures(parseHeures(agent.congesAnnuels.utilise || '0:00') + heuresDeduites);
  } else if (demande.type === 'RTT' && agent.rtt) {
    const soldeActuel = parseHeures(agent.rtt.restant);
    agent.rtt.restant = formatHeures(Math.max(0, soldeActuel - heuresDeduites));
  } else if (demande.type === 'CF' && agent.congesFormation) {
    const soldeActuel = parseHeures(agent.congesFormation.restant);
    agent.congesFormation.restant = formatHeures(Math.max(0, soldeActuel - heuresDeduites));
  }
  
  // Mettre à jour le compteur de jours
  agent.joursRestants = Math.max(0, agent.joursRestants - demande.jours);
  agent.joursUtilises = agent.joursUtilises + demande.jours;
  
  // Add notification for agent
  notifications.push({
    userId: demande.agentId,
    type: 'success',
    title: 'Demande approuvée',
    message: `${TYPES_ABSENCES[demande.type]?.label || demande.type} approuvé(e) le ${formatDate(demande.dateDecision)} - Exportez votre fichier CSV mis à jour`,
    downloadable: true
  });
  
  closeModal();
  showToast(`✓ Demande approuvée - Notification envoyée à ${agentData[demande.agentId].email}`, 'success');
  renderPendingRequests();
}

function rejectRequest(requestId) {
  const demande = demandes.find(d => d.id === requestId);
  
  const modalContent = `
    <p>Refuser la demande de <strong>${demande.agentName}</strong> du ${formatDate(demande.dateDebut)} au ${formatDate(demande.dateFin)}</p>
    <div class="form-group">
      <label class="form-label">Motif du rejet (obligatoire)</label>
      <textarea class="form-control" id="motifRejet" required></textarea>
    </div>
    <div class="modal-actions">
      <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="confirmReject('${requestId}')">Refuser</button>
    </div>
  `;
  
  showModal('Refuser la demande', modalContent);
}

function confirmReject(requestId) {
  const motif = document.getElementById('motifRejet').value;
  
  if (!motif.trim()) {
    showToast('Le motif du rejet est obligatoire', 'error');
    return;
  }
  
  const demande = demandes.find(d => d.id === requestId);
  demande.statut = 'rejected';
  demande.dateDecision = new Date().toISOString().split('T')[0];
  demande.responsableDecision = currentUser.username;
  demande.motifRejet = motif;
  
  // Add notification for agent
  notifications.push({
    userId: demande.agentId,
    type: 'error',
    title: 'Demande rejetée',
    message: `Demande rejetée le ${formatDate(demande.dateDecision)} - Motif: ${motif}`,
    downloadable: false
  });
  
  closeModal();
  showToast(`✓ Demande rejetée - Notification envoyée à l'agent`, 'info');
  renderPendingRequests();
}

// Manager History
function renderManagerHistory() {
  const managedAgents = Object.keys(agentData).filter(id => agentData[id].manager === currentUser.username);
  const allRequests = demandes.filter(d => managedAgents.includes(d.agentId));
  
  let content = `
    <div class="page-header">
      <h1 class="page-title">Historique des demandes</h1>
    </div>
    
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Agent</th>
            <th>Date début</th>
            <th>Date fin</th>
            <th>Type</th>
            <th>Jours</th>
            <th>Statut</th>
            <th>Date décision</th>
            <th>Motif rejet</th>
          </tr>
        </thead>
        <tbody>
  `;
  
  if (allRequests.length === 0) {
    content += `<tr><td colspan="8" style="text-align: center; color: var(--color-text-secondary);">Aucune demande</td></tr>`;
  } else {
    allRequests.reverse().forEach(demande => {
      content += `
        <tr>
          <td><strong>${demande.agentName}</strong></td>
          <td>${formatDate(demande.dateDebut)}</td>
          <td>${formatDate(demande.dateFin)}</td>
          <td>${demande.type}</td>
          <td>${demande.jours}</td>
          <td><span class="badge ${getBadgeClass(demande.statut)}">${getStatutText(demande.statut)}</span></td>
          <td>${demande.dateDecision ? formatDate(demande.dateDecision) : '-'}</td>
          <td>${demande.motifRejet || '-'}</td>
        </tr>
      `;
    });
  }
  
  content += `
        </tbody>
      </table>
    </div>
  `;
  
  document.getElementById('mainContent').innerHTML = content;
}

// Agent Management
function renderAgentManagement() {
  const managedAgents = Object.keys(agentData).filter(id => agentData[id].manager === currentUser.username);
  
  let content = `
    <div class="page-header">
      <h1 class="page-title">Gestion des agents</h1>
    </div>
    
    <div style="display: flex; gap: var(--space-12); margin-bottom: var(--space-24);">
      <button class="btn btn-primary" onclick="showImportCSVModal()" style="width: auto;">📥 Importer un agent (CSV)</button>
      <button class="btn btn-secondary" onclick="showAddAgentModal()" style="width: auto;">➕ Ajouter un agent</button>
    </div>
    
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Agent</th>
            <th>Email</th>
            <th>Contrat</th>
            <th>Quotité</th>
            <th>CA restant</th>
            <th>RTT restant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  `;
  
  if (managedAgents.length === 0) {
    content += `<tr><td colspan="7" style="text-align: center; color: var(--color-text-secondary);">Aucun agent sous votre responsabilité</td></tr>`;
  } else {
    managedAgents.forEach(agentId => {
      const agent = agentData[agentId];
      const contratInfo = agent.dateFinContrat ? 
        `CDD jusqu'au ${formatDate(agent.dateFinContrat)}` : 
        'CDI';
      
      content += `
        <tr>
          <td><strong>${agent.fullname}</strong></td>
          <td>${agent.email}</td>
          <td><span style="font-size: var(--font-size-sm);">${contratInfo}</span></td>
          <td>${agent.quotiteTravail || 35}h</td>
          <td><strong style="color: var(--color-primary);">${agent.congesAnnuels?.restant || agent.joursRestants + 'j'}</strong></td>
          <td>${agent.rtt?.restant || '0:00'}</td>
          <td>
            <div class="btn-group">
              <button class="btn btn-sm btn-primary" onclick="viewAgentFile('${agentId}')">📋 Dossier</button>
              <button class="btn btn-sm btn-secondary" onclick="downloadAgentCSV('${agentId}')">📥 CSV</button>
            </div>
          </td>
        </tr>
      `;
    });
  }
  
  content += `
        </tbody>
      </table>
    </div>
    
    <input type="file" id="csvFileInput" accept=".csv" style="display: none;" onchange="handleCSVImport(event)">
  `;
  
  document.getElementById('mainContent').innerHTML = content;
}

// Modal d'import CSV
function showImportCSVModal() {
  const modalContent = `
    <div style="text-align: center; padding: var(--space-16);">
      <div style="font-size: 48px; margin-bottom: var(--space-16);">📄</div>
      <h3 style="margin-bottom: var(--space-16);">Importer un fichier CSV</h3>
      <p style="color: var(--color-text-secondary); margin-bottom: var(--space-24);">
        Sélectionnez un fichier CSV au format de la collectivité pour importer les données d'un agent.<br>
        <small>Format attendu: NOM Prénom(Année).csv</small>
      </p>
      
      <div id="dropZone" style="border: 2px dashed var(--color-border); border-radius: var(--radius-lg); padding: var(--space-32); margin-bottom: var(--space-16); cursor: pointer; transition: all 0.2s;"
           ondragover="event.preventDefault(); this.style.borderColor='var(--color-primary)'; this.style.background='var(--color-bg-1)';"
           ondragleave="this.style.borderColor='var(--color-border)'; this.style.background='transparent';"
           ondrop="handleDrop(event)"
           onclick="document.getElementById('csvFileInput').click();">
        <p style="color: var(--color-text-secondary);">
          Glissez-déposez votre fichier CSV ici<br>
          ou cliquez pour sélectionner
        </p>
      </div>
      
      <div id="importResult" style="display: none; margin-top: var(--space-16);"></div>
      
      <div class="modal-actions" style="justify-content: center;">
        <button class="btn btn-secondary" onclick="closeModal()">Fermer</button>
      </div>
    </div>
  `;
  
  showModal('Import CSV', modalContent);
}

// Gérer le drag & drop
function handleDrop(event) {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (file && file.name.endsWith('.csv')) {
    processCSVFile(file);
  } else {
    showToast('Veuillez sélectionner un fichier CSV', 'error');
  }
}

// Gérer la sélection de fichier
function handleCSVImport(event) {
  const file = event.target.files[0];
  if (file) {
    processCSVFile(file);
  }
}

// Traiter le fichier CSV
function processCSVFile(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const result = importAgentFromCSV(e.target.result);
      
      document.getElementById('importResult').innerHTML = `
        <div style="background: var(--color-bg-3); padding: var(--space-16); border-radius: var(--radius-base); text-align: left;">
          <p style="color: var(--color-success); font-weight: bold; margin-bottom: var(--space-8);">✓ Import réussi !</p>
          <p><strong>Agent:</strong> ${result.fullname}</p>
          <p style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-top: var(--space-8);">
            L'agent a été ajouté à votre équipe. Vous pouvez consulter son dossier dans la liste.
          </p>
        </div>
      `;
      document.getElementById('importResult').style.display = 'block';
      
      showToast(`Agent ${result.fullname} importé avec succès !`, 'success');
      
      setTimeout(() => {
        closeModal();
        renderAgentManagement();
      }, 2000);
      
    } catch (error) {
      document.getElementById('importResult').innerHTML = `
        <div style="background: var(--color-bg-4); padding: var(--space-16); border-radius: var(--radius-base);">
          <p style="color: var(--color-error); font-weight: bold;">❌ Erreur d'import</p>
          <p style="font-size: var(--font-size-sm);">${error.message}</p>
        </div>
      `;
      document.getElementById('importResult').style.display = 'block';
      showToast('Erreur lors de l\'import du fichier', 'error');
    }
  };
  reader.readAsText(file, 'ISO-8859-1'); // Encoding pour les accents français
}

// Modal d'ajout manuel d'agent
function showAddAgentModal() {
  let typeOptions = '';
  Object.keys(TYPES_ABSENCES).forEach(code => {
    typeOptions += `<option value="${code}">${TYPES_ABSENCES[code].label}</option>`;
  });
  
  const modalContent = `
    <form id="addAgentForm" onsubmit="handleAddAgent(event)">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-16);">
        <div class="form-group">
          <label class="form-label">Nom *</label>
          <input type="text" class="form-control" id="newAgentNom" required>
        </div>
        <div class="form-group">
          <label class="form-label">Prénom *</label>
          <input type="text" class="form-control" id="newAgentPrenom" required>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label">Email *</label>
        <input type="email" class="form-control" id="newAgentEmail" required>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-16);">
        <div class="form-group">
          <label class="form-label">Date début contrat *</label>
          <input type="date" class="form-control" id="newAgentDateDebut" required>
        </div>
        <div class="form-group">
          <label class="form-label">Date fin contrat</label>
          <input type="date" class="form-control" id="newAgentDateFin">
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-16);">
        <div class="form-group">
          <label class="form-label">Quotité de travail (h/semaine) *</label>
          <input type="number" class="form-control" id="newAgentQuotite" value="35" min="1" max="40" required>
        </div>
        <div class="form-group">
          <label class="form-label">Congés annuels (heures) *</label>
          <input type="text" class="form-control" id="newAgentCA" value="175:00" placeholder="175:00" required>
        </div>
      </div>
      
      <div class="modal-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Annuler</button>
        <button type="submit" class="btn btn-primary">Ajouter l'agent</button>
      </div>
    </form>
  `;
  
  showModal('Ajouter un agent', modalContent);
}

// Gérer l'ajout manuel d'agent
function handleAddAgent(event) {
  event.preventDefault();
  
  const nom = document.getElementById('newAgentNom').value.toUpperCase();
  const prenom = document.getElementById('newAgentPrenom').value;
  const email = document.getElementById('newAgentEmail').value;
  const dateDebut = document.getElementById('newAgentDateDebut').value;
  const dateFin = document.getElementById('newAgentDateFin').value || null;
  const quotite = parseFloat(document.getElementById('newAgentQuotite').value);
  const ca = document.getElementById('newAgentCA').value;
  
  const newAgentId = `user${++agentIdCounter}`;
  const fullname = `${nom} ${prenom}`;
  const username = `${prenom.toLowerCase()}.${nom.toLowerCase()}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // Créer l'utilisateur
  mockUsers.push({
    id: newAgentId,
    username: username,
    password: "password123",
    fullname: fullname,
    email: email,
    role: "AGENT",
    manager: currentUser.username
  });
  
  // Créer les données agent
  agentData[newAgentId] = {
    fullname: fullname,
    nom: nom,
    prenom: prenom,
    email: email,
    manager: currentUser.username,
    annee: new Date().getFullYear(),
    dateEntreeFP: dateDebut,
    dateDebutContrat: dateDebut,
    dateFinContrat: dateFin,
    quotiteTravail: quotite,
    nbHeuresMG: `${quotite}:00`,
    congesAnnuels: { total: ca, restant: ca, utilise: "0:00" },
    bonifications: { total: "0:00", restant: "0:00" },
    anciennete: { total: "0:00", restant: "0:00" },
    rtt: { total: "0:00", restant: "0:00" },
    congesFormation: { total: "0:00", restant: "0:00" },
    cet: { total: 0, restant: 0 },
    joursTotal: Math.floor(parseHeures(ca) / 7),
    joursRestants: Math.floor(parseHeures(ca) / 7),
    joursUtilises: 0,
    planning: {
      lundi: { matin: "8:30-12:30", apresMidi: "13:30-17:30", heures: 8 },
      mardi: { matin: "8:30-12:30", apresMidi: "13:30-17:30", heures: 8 },
      mercredi: { matin: "8:30-12:30", apresMidi: "13:30-17:30", heures: 8 },
      jeudi: { matin: "8:30-12:30", apresMidi: "13:30-17:30", heures: 8 },
      vendredi: { matin: "8:30-12:30", apresMidi: null, heures: 4 }
    }
  };
  
  // Créer l'historique vide
  absencesHistorique[newAgentId] = [];
  
  // Créer les données Excel
  excelData[newAgentId] = {
    annee: new Date().getFullYear(),
    donnees: [
      ["Type", "Date début", "Date fin", "Demi-journée", "Motif", "Heures Sup", "Heures Moins", "Solde CA", "Solde CF", "Statut"]
    ],
    modifications: [{
      date: new Date().toISOString(),
      modifiePar: currentUser.fullname,
      action: "Création",
      details: `Nouvel agent créé: ${fullname}`
    }]
  };
  
  closeModal();
  showToast(`Agent ${fullname} ajouté avec succès !`, 'success');
  renderAgentManagement();
}

function viewAgentFile(agentId) {
  const agent = agentData[agentId];
  const excel = excelData[agentId];
  const absences = absencesHistorique[agentId] || [];
  
  let content = `
    <div class="page-header" style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h1 class="page-title">Dossier de ${agent.fullname}</h1>
        <p style="color: var(--color-text-secondary);">${agent.email}</p>
      </div>
      <div class="btn-group">
        <button class="btn btn-secondary" onclick="renderAgentManagement()" style="width: auto;">← Retour</button>
        <button class="btn btn-primary" onclick="downloadAgentCSV('${agentId}')" style="width: auto;">📥 Exporter CSV</button>
      </div>
    </div>
    
    <!-- Informations générales -->
    <div class="table-container" style="margin-bottom: var(--space-24);">
      <div style="padding: var(--space-20);">
        <h3 style="margin-bottom: var(--space-16);">📋 Informations générales</h3>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-16);">
          <div>
            <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">Année</div>
            <div style="font-weight: var(--font-weight-semibold);">${agent.annee}</div>
          </div>
          <div>
            <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">Date début contrat</div>
            <div style="font-weight: var(--font-weight-semibold);">${agent.dateDebutContrat ? formatDate(agent.dateDebutContrat) : '-'}</div>
          </div>
          <div>
            <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">Date fin contrat</div>
            <div style="font-weight: var(--font-weight-semibold);">${agent.dateFinContrat ? formatDate(agent.dateFinContrat) : 'CDI'}</div>
          </div>
          <div>
            <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">Quotité travail</div>
            <div style="font-weight: var(--font-weight-semibold);">${agent.quotiteTravail || 35}h/semaine</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Soldes -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-16); margin-bottom: var(--space-24);">
      <div class="stat-card">
        <div class="stat-label">Congés annuels (CA)</div>
        <div class="stat-value" style="font-size: var(--font-size-2xl); color: var(--color-primary);">${agent.congesAnnuels?.restant || agent.joursRestants + 'j'}</div>
        <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">sur ${agent.congesAnnuels?.total || agent.joursTotal + 'j'}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">RTT</div>
        <div class="stat-value" style="font-size: var(--font-size-2xl);">${agent.rtt?.restant || '0:00'}</div>
        <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">sur ${agent.rtt?.total || '0:00'}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Congés formation (CF)</div>
        <div class="stat-value" style="font-size: var(--font-size-2xl);">${agent.congesFormation?.restant || '0:00'}</div>
        <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">sur ${agent.congesFormation?.total || '0:00'}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Bonifications</div>
        <div class="stat-value" style="font-size: var(--font-size-2xl);">${agent.bonifications?.restant || '0:00'}</div>
        <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">sur ${agent.bonifications?.total || '0:00'}</div>
      </div>
    </div>
    
    <!-- Planning hebdomadaire -->
    <div class="table-container" style="margin-bottom: var(--space-24);">
      <div style="padding: var(--space-20);">
        <h3 style="margin-bottom: var(--space-16);">🗓️ Planning hebdomadaire</h3>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: var(--space-12);">
          ${['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'].map(jour => {
            const planning = agent.planning?.[jour];
            return `
              <div style="background: var(--color-bg-1); padding: var(--space-12); border-radius: var(--radius-base); text-align: center;">
                <div style="font-weight: var(--font-weight-semibold); text-transform: capitalize; margin-bottom: var(--space-8);">${jour}</div>
                <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                  ${planning?.heures ? `${planning.heures}h` : '-'}
                </div>
                <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-top: var(--space-4);">
                  ${planning?.matin || '-'}<br>
                  ${planning?.apresMidi || '-'}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
    
    <!-- Historique des absences -->
    <div class="table-container" style="margin-bottom: var(--space-24);">
      <div style="padding: var(--space-20);">
        <h3 style="margin-bottom: var(--space-16);">📅 Historique des absences - Année ${excel.annee}</h3>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Date début</th>
            <th>Date fin</th>
            <th>Demi-journée</th>
            <th>Motif</th>
            <th>Heures</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
  `;
  
  if (absences.length === 0) {
    content += `<tr><td colspan="7" style="text-align: center; color: var(--color-text-secondary);">Aucune absence enregistrée</td></tr>`;
  } else {
    absences.forEach(absence => {
      const typeInfo = TYPES_ABSENCES[absence.type] || { label: absence.type, code: absence.type, color: '#888' };
      content += `
        <tr>
          <td><span style="background-color: ${typeInfo.color}20; color: ${typeInfo.color}; padding: 4px 8px; border-radius: 4px; font-weight: 500;">${typeInfo.code}</span></td>
          <td>${formatDate(absence.dateDebut)}</td>
          <td>${absence.dateFin && absence.dateFin !== absence.dateDebut ? formatDate(absence.dateFin) : '-'}</td>
          <td>${absence.demiJournee || '-'}</td>
          <td>${absence.motif || '-'}</td>
          <td>${absence.heures || absence.heuresSup || '-'}</td>
          <td><span class="badge badge-approved">Validé</span></td>
        </tr>
      `;
    });
  }
  
  content += `
        </tbody>
      </table>
    </div>
    
    <!-- Historique des modifications -->
    <div class="table-container">
      <div style="padding: var(--space-20);">
        <h3 style="margin-bottom: var(--space-16);">📝 Historique des modifications</h3>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Modifié par</th>
            <th>Action</th>
            <th>Détails</th>
          </tr>
        </thead>
        <tbody>
  `;
  
  if (excel.modifications.length === 0) {
    content += `<tr><td colspan="4" style="text-align: center; color: var(--color-text-secondary);">Aucune modification</td></tr>`;
  } else {
    excel.modifications.slice(-10).reverse().forEach(modif => {
      content += `
        <tr>
          <td>${new Date(modif.date).toLocaleString('fr-FR')}</td>
          <td>${modif.modifiePar}</td>
          <td>${modif.action}</td>
          <td>${modif.details}</td>
        </tr>
      `;
    });
  }
  
  content += `
        </tbody>
      </table>
    </div>
  `;
  
  document.getElementById('mainContent').innerHTML = content;
}

// Download PDF
function downloadPDF(agentId) {
  const agent = agentData[agentId];
  const excel = excelData[agentId];
  
  let pdfContent = `╔════════════════════════════════════════════════════════╗
║        FICHIER DE GESTION DES CONGÉS                   ║
║                                                         ║
║  Agent: ${agent.fullname.padEnd(43)}║
║  Email: ${agent.email.padEnd(43)}║
║  Année: ${excel.annee}                                           ║
║  Date de génération: ${new Date().toLocaleDateString('fr-FR').padEnd(28)}║
╚════════════════════════════════════════════════════════╝

┌────────────────────────────────────────────────────────┐
│ RÉSUMÉ                                                 │
├────────────────────────────────────────────────────────┤
│ Jours de congés total      : ${agent.joursTotal} jours${' '.repeat(17)}│
│ Jours utilisés             : ${agent.joursUtilises} jours${' '.repeat(18)}│
│ Jours restants             : ${agent.joursRestants} jours${' '.repeat(17)}│
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ HISTORIQUE DES CONGÉS - ANNÉE ${excel.annee}                    │
├──────────┬──────────┬────────┬──────┬──────────┬───────┤
│ Début    │ Fin      │ Type   │ Jours│ Motif    │ Status│
├──────────┼──────────┼────────┼──────┼──────────┼───────┤
`;

  for (let i = 1; i < excel.donnees.length; i++) {
    const row = excel.donnees[i];
    pdfContent += `│ ${row[0].padEnd(8)} │ ${row[1].padEnd(8)} │ ${row[2].padEnd(6)} │ ${row[3].padEnd(4)} │ ${(row[4] || '-').padEnd(8)} │  ${row[5] === 'Approuvé' ? '✓' : '?'}   │\n`;
  }

  pdfContent += `└──────────┴──────────┴────────┴──────┴──────────┴───────┘

Généré par le Système de Gestion des Congés
Collectivité Locale - Fonction Publique Territoriale
`;

  // Create blob and download
  const blob = new Blob([pdfContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Fichier_Conges_${agent.fullname.replace(' ', '_')}_${excel.annee}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showToast('PDF téléchargé avec succès !', 'success');
}

// Close modal on overlay click
document.getElementById('modalOverlay').addEventListener('click', function(e) {
  if (e.target === this) {
    closeModal();
  }
});
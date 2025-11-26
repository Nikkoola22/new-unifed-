/**
 * TEST DE PERTINENCE - 200 QUESTIONS
 * 
 * Ce fichier teste la recherche unifiée avec 200 questions couvrant
 * tous les aspects de temps.ts, formation.ts et teletravail.ts
 */

import { rechercherDansSommaire, sommaireUnifie } from '../data/sommaireUnifie';
import { chapitres } from '../data/temps';
import { formation } from '../data/formation';
import { teletravailData } from '../data/teletravail';

// ============================================
// DÉFINITION DES TYPES
// ============================================

interface TestCase {
  id: number;
  question: string;
  sourceAttendue: 'temps' | 'formation' | 'teletravail';
  motsClesAttendus: string[];
}

// ============================================
// 200 QUESTIONS DE TEST
// ============================================

const testCases: TestCase[] = [
  // ============================================
  // TEMPS - CHAPITRE 1 : TEMPS DE TRAVAIL (30 questions)
  // ============================================
  { id: 1, question: "Combien d'heures de travail annuelles ?", sourceAttendue: 'temps', motsClesAttendus: ['1607'] },
  { id: 2, question: "Quelle est la durée légale du temps de travail ?", sourceAttendue: 'temps', motsClesAttendus: ['1607', 'heures'] },
  { id: 3, question: "Comment calcule-t-on les 1607 heures ?", sourceAttendue: 'temps', motsClesAttendus: ['1607', '365', '228'] },
  { id: 4, question: "Quels sont les cycles de travail hebdomadaires ?", sourceAttendue: 'temps', motsClesAttendus: ['37', '38', '39'] },
  { id: 5, question: "Combien d'heures travaillent les agents des crèches ?", sourceAttendue: 'temps', motsClesAttendus: ['39', 'crèches'] },
  { id: 6, question: "Qu'est-ce que l'annualisation du temps de travail ?", sourceAttendue: 'temps', motsClesAttendus: ['annualisation'] },
  { id: 7, question: "Qu'est-ce qu'une JNT ?", sourceAttendue: 'temps', motsClesAttendus: ['JNT', 'non travaillé'] },
  { id: 8, question: "Quelles sont les plages horaires fixes obligatoires ?", sourceAttendue: 'temps', motsClesAttendus: ['9h30', '12h', '14h', '16h30'] },
  { id: 9, question: "Quelles sont les plages de souplesse ?", sourceAttendue: 'temps', motsClesAttendus: ['7h30', '19h', 'souplesse'] },
  { id: 10, question: "Quelle est la durée de la pause déjeuner ?", sourceAttendue: 'temps', motsClesAttendus: ['45 min', 'déjeuner'] },
  { id: 11, question: "Quelle est la durée maximale de travail hebdomadaire ?", sourceAttendue: 'temps', motsClesAttendus: ['48 heures'] },
  { id: 12, question: "Quelle est la durée maximale quotidienne ?", sourceAttendue: 'temps', motsClesAttendus: ['10 heures'] },
  { id: 13, question: "Quelle est l'amplitude maximale d'une journée ?", sourceAttendue: 'temps', motsClesAttendus: ['12 heures'] },
  { id: 14, question: "Combien d'heures de repos quotidien minimum ?", sourceAttendue: 'temps', motsClesAttendus: ['11 heures'] },
  { id: 15, question: "Combien d'heures de repos hebdomadaire minimum ?", sourceAttendue: 'temps', motsClesAttendus: ['35 heures'] },
  { id: 16, question: "Qu'est-ce que le travail de nuit ?", sourceAttendue: 'temps', motsClesAttendus: ['22 heures', '5 heures', 'nuit'] },
  { id: 17, question: "Combien d'heures supplémentaires maximum par mois ?", sourceAttendue: 'temps', motsClesAttendus: ['25 heures'] },
  { id: 18, question: "Quelle majoration pour les heures supplémentaires ?", sourceAttendue: 'temps', motsClesAttendus: ['25%', '27%'] },
  { id: 19, question: "Majoration des heures supplémentaires de nuit ?", sourceAttendue: 'temps', motsClesAttendus: ['100%', 'nuit'] },
  { id: 20, question: "Majoration des heures du dimanche ?", sourceAttendue: 'temps', motsClesAttendus: ['66%', 'dimanche'] },
  { id: 21, question: "Quelles quotités pour le temps partiel ?", sourceAttendue: 'temps', motsClesAttendus: ['50%', '60%', '70%', '80%', '90%'] },
  { id: 22, question: "Qu'est-ce que le temps partiel de droit ?", sourceAttendue: 'temps', motsClesAttendus: ['droit', 'enfant', 'handicap'] },
  { id: 23, question: "Jusqu'à quel âge le temps partiel de droit pour enfant ?", sourceAttendue: 'temps', motsClesAttendus: ['3ème anniversaire', '3 ans'] },
  { id: 24, question: "Comment est rémunéré le temps partiel à 80% ?", sourceAttendue: 'temps', motsClesAttendus: ['85,72%', '80%'] },
  { id: 25, question: "Comment est rémunéré le temps partiel à 90% ?", sourceAttendue: 'temps', motsClesAttendus: ['91,42%', '90%'] },
  { id: 26, question: "Peut-on surcotiser à la retraite en temps partiel ?", sourceAttendue: 'temps', motsClesAttendus: ['surcotis', '4 trimestres'] },
  { id: 27, question: "Combien dure la journée de solidarité ?", sourceAttendue: 'temps', motsClesAttendus: ['7 heures'] },
  { id: 28, question: "Comment est fractionnée la journée de solidarité ?", sourceAttendue: 'temps', motsClesAttendus: ['2 min', 'jour'] },
  { id: 29, question: "Qu'est-ce qu'une astreinte ?", sourceAttendue: 'temps', motsClesAttendus: ['astreinte', 'domicile', 'intervention'] },
  { id: 30, question: "Combien de semaines d'astreinte maximum par an ?", sourceAttendue: 'temps', motsClesAttendus: ['14 semaines'] },

  // ============================================
  // TEMPS - CHAPITRE 2 : CONGÉS (40 questions)
  // ============================================
  { id: 31, question: "Combien de jours de congés annuels ?", sourceAttendue: 'temps', motsClesAttendus: ['25 jours'] },
  { id: 32, question: "Comment sont calculés les congés annuels ?", sourceAttendue: 'temps', motsClesAttendus: ['5 jours', 'hebdomadaire'] },
  { id: 33, question: "Congés annuels pour un agent travaillant 4 jours ?", sourceAttendue: 'temps', motsClesAttendus: ['20', 'C.A'] },
  { id: 34, question: "Date limite pour les congés estivaux ?", sourceAttendue: 'temps', motsClesAttendus: ['1er mars'] },
  { id: 35, question: "Délai pour poser 5 à 10 jours de congés ?", sourceAttendue: 'temps', motsClesAttendus: ['1 mois', '30 jours'] },
  { id: 36, question: "Délai pour poser 1 journée de congé ?", sourceAttendue: 'temps', motsClesAttendus: ['5 jours'] },
  { id: 37, question: "Quelle durée maximum de congés consécutifs ?", sourceAttendue: 'temps', motsClesAttendus: ['31 jours'] },
  { id: 38, question: "Peut-on reporter les congés non pris ?", sourceAttendue: 'temps', motsClesAttendus: ['report', '31 décembre'] },
  { id: 39, question: "Report des congés après maladie longue ?", sourceAttendue: 'temps', motsClesAttendus: ['15 mois', '4 semaines'] },
  { id: 40, question: "Jours de fractionnement pour 5-7 jours ?", sourceAttendue: 'temps', motsClesAttendus: ['1 jour'] },
  { id: 41, question: "Jours de fractionnement pour 8 jours et plus ?", sourceAttendue: 'temps', motsClesAttendus: ['2 jours'] },
  { id: 42, question: "Qu'est-ce que le congé bonifié ?", sourceAttendue: 'temps', motsClesAttendus: ['bonifié', 'outre-mer'] },
  { id: 43, question: "Qui peut bénéficier du congé bonifié ?", sourceAttendue: 'temps', motsClesAttendus: ['Guadeloupe', 'Martinique', 'Guyane', 'Réunion'] },
  { id: 44, question: "Fréquence du congé bonifié ?", sourceAttendue: 'temps', motsClesAttendus: ['2 ans'] },
  { id: 45, question: "Combien de RTT pour un cycle de 37h ?", sourceAttendue: 'temps', motsClesAttendus: ['12 jours', 'RTT'] },
  { id: 46, question: "Combien de RTT pour un cycle de 38h ?", sourceAttendue: 'temps', motsClesAttendus: ['18 jours', 'RTT'] },
  { id: 47, question: "Combien de RTT pour un cycle de 39h ?", sourceAttendue: 'temps', motsClesAttendus: ['23 jours', 'RTT'] },
  { id: 48, question: "Date limite pour prendre les RTT ?", sourceAttendue: 'temps', motsClesAttendus: ['31 décembre', 'RTT'] },
  { id: 49, question: "50% des RTT doivent être pris avant quelle date ?", sourceAttendue: 'temps', motsClesAttendus: ['15/09', '15 septembre'] },
  { id: 50, question: "Impact des congés maladie sur les RTT ?", sourceAttendue: 'temps', motsClesAttendus: ['réduisent', 'maladie'] },
  { id: 51, question: "Qu'est-ce que le don de jours de repos ?", sourceAttendue: 'temps', motsClesAttendus: ['don', 'jours', 'enfant malade'] },
  { id: 52, question: "Combien de jours peut-on donner par an ?", sourceAttendue: 'temps', motsClesAttendus: ['5 jours', 'don'] },
  { id: 53, question: "Qu'est-ce que le CET ?", sourceAttendue: 'temps', motsClesAttendus: ['CET', 'compte épargne'] },
  { id: 54, question: "Qui peut ouvrir un CET ?", sourceAttendue: 'temps', motsClesAttendus: ['1 an', 'service'] },
  { id: 55, question: "Combien de congés annuels peut-on épargner ?", sourceAttendue: 'temps', motsClesAttendus: ['5', 'congés'] },
  { id: 56, question: "Durée du congé maternité simple ?", sourceAttendue: 'temps', motsClesAttendus: ['16 semaines', 'maternité'] },
  { id: 57, question: "Durée du congé maternité 3ème enfant ?", sourceAttendue: 'temps', motsClesAttendus: ['26', '3ème'] },
  { id: 58, question: "Durée du congé maternité jumeaux ?", sourceAttendue: 'temps', motsClesAttendus: ['34', 'jumeaux'] },
  { id: 59, question: "Durée du congé maternité triplés ?", sourceAttendue: 'temps', motsClesAttendus: ['36', 'triplés'] },
  { id: 60, question: "Congé grossesse pathologique ?", sourceAttendue: 'temps', motsClesAttendus: ['2 semaines', 'pathologique'] },
  { id: 61, question: "Durée du congé paternité ?", sourceAttendue: 'temps', motsClesAttendus: ['25 jours', 'paternité'] },
  { id: 62, question: "Congé paternité naissances multiples ?", sourceAttendue: 'temps', motsClesAttendus: ['32 jours'] },
  { id: 63, question: "Jours obligatoires après naissance ?", sourceAttendue: 'temps', motsClesAttendus: ['4', 'consécutif'] },
  { id: 64, question: "Délai pour prendre le reste du congé paternité ?", sourceAttendue: 'temps', motsClesAttendus: ['6 mois'] },
  { id: 65, question: "Congé si hospitalisation du bébé ?", sourceAttendue: 'temps', motsClesAttendus: ['30 jours', 'hospitalisation'] },
  { id: 66, question: "Combien de RTT à temps partiel 80% cycle 38h ?", sourceAttendue: 'temps', motsClesAttendus: ['14,5'] },
  { id: 67, question: "Les stagiaires peuvent ouvrir un CET ?", sourceAttendue: 'temps', motsClesAttendus: ['stagiaires', 'exclus'] },
  { id: 68, question: "Peut-on indemniser les RTT non pris ?", sourceAttendue: 'temps', motsClesAttendus: ['indemnisé', 'CET'] },
  { id: 69, question: "Calcul des RTT pour temps partiel 50% ?", sourceAttendue: 'temps', motsClesAttendus: ['proratisé', '50%'] },
  { id: 70, question: "Combien de jours de fractionnement maximum ?", sourceAttendue: 'temps', motsClesAttendus: ['2 jours', 'fractionnement'] },

  // ============================================
  // TEMPS - CHAPITRE 3 : AUTORISATIONS D'ABSENCE (40 questions)
  // ============================================
  { id: 71, question: "Jours de congé pour mon mariage ?", sourceAttendue: 'temps', motsClesAttendus: ['7 jours', 'mariage'] },
  { id: 72, question: "Jours de congé pour le mariage de mon enfant ?", sourceAttendue: 'temps', motsClesAttendus: ['3 jours', 'enfant'] },
  { id: 73, question: "Jours de congé pour un PACS ?", sourceAttendue: 'temps', motsClesAttendus: ['7 jours', 'PACS'] },
  { id: 74, question: "Jours pour décès d'un conjoint ?", sourceAttendue: 'temps', motsClesAttendus: ['5 jours', 'conjoint'] },
  { id: 75, question: "Jours pour décès d'un parent ?", sourceAttendue: 'temps', motsClesAttendus: ['5 jours', 'parent'] },
  { id: 76, question: "Jours pour décès d'un enfant moins de 25 ans ?", sourceAttendue: 'temps', motsClesAttendus: ['14 jours', '8 jours'] },
  { id: 77, question: "Jours pour décès d'un frère ou sœur ?", sourceAttendue: 'temps', motsClesAttendus: ['3 jours'] },
  { id: 78, question: "Jours pour décès d'un beau-parent ?", sourceAttendue: 'temps', motsClesAttendus: ['3 jours', 'beau'] },
  { id: 79, question: "Jours pour décès oncle ou tante ?", sourceAttendue: 'temps', motsClesAttendus: ['1 jour', 'oncle'] },
  { id: 80, question: "Jours pour garde d'enfant malade ?", sourceAttendue: 'temps', motsClesAttendus: ['6 jours', 'garde'] },
  { id: 81, question: "Jusqu'à quel âge pour garde enfant malade ?", sourceAttendue: 'temps', motsClesAttendus: ['16 ans'] },
  { id: 82, question: "Doublement garde enfant si parent seul ?", sourceAttendue: 'temps', motsClesAttendus: ['doublement', 'seul'] },
  { id: 83, question: "Jours pour soigner un conjoint malade ?", sourceAttendue: 'temps', motsClesAttendus: ['5 jours', 'conjoint'] },
  { id: 84, question: "Jours pour soigner un ascendant ?", sourceAttendue: 'temps', motsClesAttendus: ['3 jours', 'ascendant'] },
  { id: 85, question: "Qu'est-ce que le congé proche aidant ?", sourceAttendue: 'temps', motsClesAttendus: ['proche aidant', 'fin de vie'] },
  { id: 86, question: "Durée du congé proche aidant ?", sourceAttendue: 'temps', motsClesAttendus: ['3 mois', '1 an'] },
  { id: 87, question: "Le congé proche aidant est-il rémunéré ?", sourceAttendue: 'temps', motsClesAttendus: ['non rémunéré', 'AJPA'] },
  { id: 88, question: "Autorisation pour fêtes religieuses ?", sourceAttendue: 'temps', motsClesAttendus: ['religieuse', 'juive', 'musulmane'] },
  { id: 89, question: "Autorisation pour rentrée scolaire ?", sourceAttendue: 'temps', motsClesAttendus: ['1 heure', 'rentrée'] },
  { id: 90, question: "Autorisation pour déménagement ?", sourceAttendue: 'temps', motsClesAttendus: ['1 jour', 'déménagement'] },
  { id: 91, question: "Heure d'aménagement grossesse ?", sourceAttendue: 'temps', motsClesAttendus: ['1 heure', 'grossesse', '3ème mois'] },
  { id: 92, question: "Autorisation pour don du sang ?", sourceAttendue: 'temps', motsClesAttendus: ['don du sang', 'plaquettes'] },
  { id: 93, question: "Jours pour concours ou examen ?", sourceAttendue: 'temps', motsClesAttendus: ['1 jour', '2 jours', 'concours'] },
  { id: 94, question: "Jours pour jury de concours ?", sourceAttendue: 'temps', motsClesAttendus: ['5 jours', 'jury'] },
  { id: 95, question: "Jours pour formateur externe ?", sourceAttendue: 'temps', motsClesAttendus: ['5 jours', 'formateur'] },
  { id: 96, question: "Congé de représentation associative ?", sourceAttendue: 'temps', motsClesAttendus: ['9 jours', '12 jours', 'représentation'] },
  { id: 97, question: "Consultation médicale sur temps de travail ?", sourceAttendue: 'temps', motsClesAttendus: ['récupération', 'consultation'] },
  { id: 98, question: "Jours suivi médical handicap RQTH ?", sourceAttendue: 'temps', motsClesAttendus: ['4 jours', 'RQTH', 'handicap'] },
  { id: 99, question: "Autorisations absence examens prénataux ?", sourceAttendue: 'temps', motsClesAttendus: ['demi-journée', 'prénatal'] },
  { id: 100, question: "Jours mariage d'un frère ou sœur ?", sourceAttendue: 'temps', motsClesAttendus: ['1 jour', 'frère'] },

  // ============================================
  // TEMPS - CHAPITRE 4 : MALADIE (20 questions)
  // ============================================
  { id: 101, question: "Délai pour transmettre un arrêt maladie ?", sourceAttendue: 'temps', motsClesAttendus: ['48 heures'] },
  { id: 102, question: "Combien de jours de carence maladie ?", sourceAttendue: 'temps', motsClesAttendus: ['1', 'carence'] },
  { id: 103, question: "Durée du congé maladie ordinaire ?", sourceAttendue: 'temps', motsClesAttendus: ['1 an', '3 mois', '9 mois'] },
  { id: 104, question: "Durée du congé longue maladie ?", sourceAttendue: 'temps', motsClesAttendus: ['3 ans'] },
  { id: 105, question: "Durée du congé longue durée ?", sourceAttendue: 'temps', motsClesAttendus: ['5 ans'] },
  { id: 106, question: "Peut-on faire une contre-visite médicale ?", sourceAttendue: 'temps', motsClesAttendus: ['contre visite', 'contrôle'] },
  { id: 107, question: "Délai pour déclarer un accident de service ?", sourceAttendue: 'temps', motsClesAttendus: ['48 heures', '15 jours'] },
  { id: 108, question: "Qu'est-ce qu'un accident de trajet ?", sourceAttendue: 'temps', motsClesAttendus: ['trajet', 'domicile', 'travail'] },
  { id: 109, question: "Rémunération pendant accident de service ?", sourceAttendue: 'temps', motsClesAttendus: ['plein traitement'] },
  { id: 110, question: "La carence s'applique-t-elle aux accidents ?", sourceAttendue: 'temps', motsClesAttendus: ['carence', 'accident'] },
  { id: 111, question: "Plein traitement maladie ordinaire ?", sourceAttendue: 'temps', motsClesAttendus: ['3 mois'] },
  { id: 112, question: "Demi-traitement maladie ordinaire ?", sourceAttendue: 'temps', motsClesAttendus: ['9 mois'] },
  { id: 113, question: "Plein traitement longue maladie ?", sourceAttendue: 'temps', motsClesAttendus: ['1 an'] },
  { id: 114, question: "Carence pour agents de moins de 4 mois ?", sourceAttendue: 'temps', motsClesAttendus: ['3 jours', '4 mois'] },
  { id: 115, question: "Volets d'arrêt à envoyer à la DRH ?", sourceAttendue: 'temps', motsClesAttendus: ['volet', '2', '3'] },
  { id: 116, question: "Maladie pendant congé annuel ?", sourceAttendue: 'temps', motsClesAttendus: ['récupérer', 'report'] },
  { id: 117, question: "Que se passe-t-il si absence injustifiée ?", sourceAttendue: 'temps', motsClesAttendus: ['retenue', 'injustifiée'] },
  { id: 118, question: "La carence s'applique-t-elle aux grossesses ?", sourceAttendue: 'temps', motsClesAttendus: ['grossesse', 'carence'] },
  { id: 119, question: "Peut-on refuser une contre-visite ?", sourceAttendue: 'temps', motsClesAttendus: ['refuser', 'suspendu'] },
  { id: 120, question: "Adresse pour envoyer les arrêts maladie ?", sourceAttendue: 'temps', motsClesAttendus: ['GCR', 'Gabriel-Péri'] },

  // ============================================
  // FORMATION (40 questions)
  // ============================================
  { id: 121, question: "Combien d'heures CPF par an ?", sourceAttendue: 'formation', motsClesAttendus: ['25 heures'] },
  { id: 122, question: "Plafond du CPF ?", sourceAttendue: 'formation', motsClesAttendus: ['150 heures'] },
  { id: 123, question: "CPF pour agents catégorie C bas niveau ?", sourceAttendue: 'formation', motsClesAttendus: ['50 heures', '400 heures'] },
  { id: 124, question: "Formation d'intégration catégorie A et B ?", sourceAttendue: 'formation', motsClesAttendus: ['10 jours'] },
  { id: 125, question: "Formation d'intégration catégorie C ?", sourceAttendue: 'formation', motsClesAttendus: ['5 jours'] },
  { id: 126, question: "Délai pour formation d'intégration ?", sourceAttendue: 'formation', motsClesAttendus: ['1 an', 'année'] },
  { id: 127, question: "Durée formation professionnalisation 1er emploi ?", sourceAttendue: 'formation', motsClesAttendus: ['5', '10 jours'] },
  { id: 128, question: "Périodicité professionnalisation carrière ?", sourceAttendue: 'formation', motsClesAttendus: ['5 ans'] },
  { id: 129, question: "Délai professionnalisation nouveau poste ?", sourceAttendue: 'formation', motsClesAttendus: ['6 mois'] },
  { id: 130, question: "Qu'est-ce que la VAE ?", sourceAttendue: 'formation', motsClesAttendus: ['validation', 'acquis', 'expérience'] },
  { id: 131, question: "Durée congé VAE ?", sourceAttendue: 'formation', motsClesAttendus: ['24 heures'] },
  { id: 132, question: "Durée VAE pour catégorie C ou handicap ?", sourceAttendue: 'formation', motsClesAttendus: ['72 heures'] },
  { id: 133, question: "Durée bilan de compétences ?", sourceAttendue: 'formation', motsClesAttendus: ['24 heures'] },
  { id: 134, question: "Fréquence bilan de compétences ?", sourceAttendue: 'formation', motsClesAttendus: ['5 ans'] },
  { id: 135, question: "Jours formation syndicale par an ?", sourceAttendue: 'formation', motsClesAttendus: ['12 jours'] },
  { id: 136, question: "Qui prend en charge la formation syndicale ?", sourceAttendue: 'formation', motsClesAttendus: ['syndicat', 'organisation'] },
  { id: 137, question: "Durée congé formation professionnelle ?", sourceAttendue: 'formation', motsClesAttendus: ['3 ans'] },
  { id: 138, question: "CFP pour catégorie C sans bac ?", sourceAttendue: 'formation', motsClesAttendus: ['5 ans'] },
  { id: 139, question: "Rémunération pendant congé formation ?", sourceAttendue: 'formation', motsClesAttendus: ['85%'] },
  { id: 140, question: "Plafond indemnité congé formation ?", sourceAttendue: 'formation', motsClesAttendus: ['2 778', 'brut'] },
  { id: 141, question: "Qu'est-ce que le congé transition professionnelle ?", sourceAttendue: 'formation', motsClesAttendus: ['transition', 'nouveau métier'] },
  { id: 142, question: "Durée formation transition professionnelle ?", sourceAttendue: 'formation', motsClesAttendus: ['120 heures'] },
  { id: 143, question: "Plafond frais transition professionnelle ?", sourceAttendue: 'formation', motsClesAttendus: ['6000', '6 000'] },
  { id: 144, question: "Durée période d'immersion professionnelle ?", sourceAttendue: 'formation', motsClesAttendus: ['2', '10 jours'] },
  { id: 145, question: "Maximum jours immersion sur 3 ans ?", sourceAttendue: 'formation', motsClesAttendus: ['20 jours'] },
  { id: 146, question: "Qu'est-ce que la REP ?", sourceAttendue: 'formation', motsClesAttendus: ['reconnaissance', 'expérience', 'concours'] },
  { id: 147, question: "Jours préparation concours admissibilité ?", sourceAttendue: 'formation', motsClesAttendus: ['1 jour'] },
  { id: 148, question: "Jours préparation concours admission ?", sourceAttendue: 'formation', motsClesAttendus: ['2 jours'] },
  { id: 149, question: "Délai entre deux formations similaires ?", sourceAttendue: 'formation', motsClesAttendus: ['12 mois'] },
  { id: 150, question: "Prise en charge formation demandée par agent ?", sourceAttendue: 'formation', motsClesAttendus: ['70%', 'frais'] },
  { id: 151, question: "Qui verse la cotisation CNFPT ?", sourceAttendue: 'formation', motsClesAttendus: ['0,9%', 'CNFPT'] },
  { id: 152, question: "Délai demande congé formation pro ?", sourceAttendue: 'formation', motsClesAttendus: ['90 jours'] },
  { id: 153, question: "Délai réponse employeur congé formation ?", sourceAttendue: 'formation', motsClesAttendus: ['30 jours'] },
  { id: 154, question: "Formation membres CST ?", sourceAttendue: 'formation', motsClesAttendus: ['3', '5 jours', 'CST'] },
  { id: 155, question: "Durée disponibilité pour études ?", sourceAttendue: 'formation', motsClesAttendus: ['3 ans', 'disponibilité'] },
  { id: 156, question: "Qu'est-ce que le compte engagement citoyen ?", sourceAttendue: 'formation', motsClesAttendus: ['CEC', 'bénévol'] },
  { id: 157, question: "Heures CEC par activité ?", sourceAttendue: 'formation', motsClesAttendus: ['20 heures', '240'] },
  { id: 158, question: "Plafond heures CEC ?", sourceAttendue: 'formation', motsClesAttendus: ['60 heures', '720'] },
  { id: 159, question: "Qui peut être formateur interne ?", sourceAttendue: 'formation', motsClesAttendus: ['formateur', 'expertise'] },
  { id: 160, question: "Formations en distanciel possibles ?", sourceAttendue: 'formation', motsClesAttendus: ['distanciel', 'ligne'] },

  // ============================================
  // TÉLÉTRAVAIL (40 questions)
  // ============================================
  { id: 161, question: "Combien de jours de télétravail par semaine ?", sourceAttendue: 'teletravail', motsClesAttendus: ['1 jour', 'semaine'] },
  { id: 162, question: "Forfait annuel télétravail ?", sourceAttendue: 'teletravail', motsClesAttendus: ['15 jours'] },
  { id: 163, question: "Maximum jours forfait par mois ?", sourceAttendue: 'teletravail', motsClesAttendus: ['3 jours'] },
  { id: 164, question: "Jours de présence obligatoire sur site ?", sourceAttendue: 'teletravail', motsClesAttendus: ['3 jours', 'présence'] },
  { id: 165, question: "Le télétravail est-il un droit ?", sourceAttendue: 'teletravail', motsClesAttendus: ['volontariat', 'autorisation'] },
  { id: 166, question: "Qu'est-ce que la réversibilité ?", sourceAttendue: 'teletravail', motsClesAttendus: ['réversibilité', 'interrompu'] },
  { id: 167, question: "Délai de prévenance fin télétravail adaptation ?", sourceAttendue: 'teletravail', motsClesAttendus: ['1 mois', 'adaptation'] },
  { id: 168, question: "Délai de prévenance fin télétravail normal ?", sourceAttendue: 'teletravail', motsClesAttendus: ['deux mois', 'délai'] },
  { id: 169, question: "Qu'est-ce que le droit à la déconnexion ?", sourceAttendue: 'teletravail', motsClesAttendus: ['déconnexion', 'connecté'] },
  { id: 170, question: "Où peut-on télétravailler ?", sourceAttendue: 'teletravail', motsClesAttendus: ['domicile', 'lieu'] },
  { id: 171, question: "Métiers exclus du télétravail ?", sourceAttendue: 'teletravail', motsClesAttendus: ['exclus', 'contact', 'usagers'] },
  { id: 172, question: "Animateurs éligibles au télétravail ?", sourceAttendue: 'teletravail', motsClesAttendus: ['animateurs', 'exclus'] },
  { id: 173, question: "Personnel crèches éligible télétravail ?", sourceAttendue: 'teletravail', motsClesAttendus: ['crèches', 'exclus'] },
  { id: 174, question: "Durée autorisation télétravail ?", sourceAttendue: 'teletravail', motsClesAttendus: ['1 an', 'un an'] },
  { id: 175, question: "Délai demande jour forfait ?", sourceAttendue: 'teletravail', motsClesAttendus: ['5 jours'] },
  { id: 176, question: "Report jour télétravail si absence ?", sourceAttendue: 'teletravail', motsClesAttendus: ['report', 'pas'] },
  { id: 177, question: "Report forfait non utilisé ?", sourceAttendue: 'teletravail', motsClesAttendus: ['report', 'pas possible'] },
  { id: 178, question: "Télétravail pour garde d'enfants ?", sourceAttendue: 'teletravail', motsClesAttendus: ['garder', 'enfants', 'pas'] },
  { id: 179, question: "Horaires en télétravail ?", sourceAttendue: 'teletravail', motsClesAttendus: ['même', 'plages fixes'] },
  { id: 180, question: "Heures supplémentaires en télétravail ?", sourceAttendue: 'teletravail', motsClesAttendus: ['heures sup', 'pas'] },
  { id: 181, question: "Matériel fourni pour télétravail ?", sourceAttendue: 'teletravail', motsClesAttendus: ['matériel', 'fourni'] },
  { id: 182, question: "Kit ergonomique télétravail ?", sourceAttendue: 'teletravail', motsClesAttendus: ['ergonomique', 'kit'] },
  { id: 183, question: "Internet obligatoire pour télétravail ?", sourceAttendue: 'teletravail', motsClesAttendus: ['internet', 'haut débit'] },
  { id: 184, question: "Prise en charge frais télétravail ?", sourceAttendue: 'teletravail', motsClesAttendus: ['frais', 'aucune'] },
  { id: 185, question: "Prise en charge transports télétravail ?", sourceAttendue: 'teletravail', motsClesAttendus: ['50%', 'transport'] },
  { id: 186, question: "Télétravail femmes enceintes ?", sourceAttendue: 'teletravail', motsClesAttendus: ['enceinte', 'dérogation'] },
  { id: 187, question: "Télétravail proche aidant ?", sourceAttendue: 'teletravail', motsClesAttendus: ['proche aidant', 'dérogation'] },
  { id: 188, question: "Télétravail exceptionnel pandémie ?", sourceAttendue: 'teletravail', motsClesAttendus: ['pandémie', 'exceptionnel'] },
  { id: 189, question: "Entretien préalable télétravail ?", sourceAttendue: 'teletravail', motsClesAttendus: ['entretien', 'préalable'] },
  { id: 190, question: "Refus télétravail contestable ?", sourceAttendue: 'teletravail', motsClesAttendus: ['refus', 'CAP', 'CCP'] },
  { id: 191, question: "Télétravail demi-journée possible ?", sourceAttendue: 'teletravail', motsClesAttendus: ['demi-journée', 'pas'] },
  { id: 192, question: "Télétravail temps partiel 80% ?", sourceAttendue: 'teletravail', motsClesAttendus: ['80%', 'même'] },
  { id: 193, question: "Forfait temps partiel moins de 80% ?", sourceAttendue: 'teletravail', motsClesAttendus: ['proratisé', 'moins de 80%'] },
  { id: 194, question: "Télétravail en bibliothèque possible ?", sourceAttendue: 'teletravail', motsClesAttendus: ['bibliothèque', 'espace'] },
  { id: 195, question: "Problème technique en télétravail ?", sourceAttendue: 'teletravail', motsClesAttendus: ['dysfonctionnement', 'présentiel'] },
  { id: 196, question: "Date mise en place télétravail ?", sourceAttendue: 'teletravail', motsClesAttendus: ['juin 2023', '31 mai 2023'] },
  { id: 197, question: "Objectifs du télétravail ?", sourceAttendue: 'teletravail', motsClesAttendus: ['bien être', 'conciliation'] },
  { id: 198, question: "Impact écologique télétravail ?", sourceAttendue: 'teletravail', motsClesAttendus: ['écologique', 'carbone', 'gaz'] },
  { id: 199, question: "Journée non télétravaillable ?", sourceAttendue: 'teletravail', motsClesAttendus: ['réunion', 'service'] },
  { id: 200, question: "Suspension temporaire télétravail ?", sourceAttendue: 'teletravail', motsClesAttendus: ['suspension', '24h'] }
];

// ============================================
// FONCTIONS DE TEST
// ============================================

function getContentForSource(source: 'temps' | 'formation' | 'teletravail'): string {
  switch (source) {
    case 'temps':
      return Object.values(chapitres).join('\n');
    case 'formation':
      return formation;
    case 'teletravail':
      return teletravailData;
  }
}

function testRechercherDansSommaire(testCase: TestCase): { 
  success: boolean; 
  sourceCorrect: boolean;
  details: string 
} {
  const sections = rechercherDansSommaire(testCase.question, 5);
  const topSection = sections[0];
  const sourceCorrect = sections.some(s => s.source === testCase.sourceAttendue) || 
                       topSection?.source === testCase.sourceAttendue;
  
  return { 
    success: sourceCorrect, 
    sourceCorrect,
    details: `Top source: ${topSection?.source || 'N/A'} (attendue: ${testCase.sourceAttendue})`
  };
}

function testMotsClesDansContenu(testCase: TestCase): { 
  success: boolean; 
  found: string[];
  missing: string[];
} {
  const content = getContentForSource(testCase.sourceAttendue).toLowerCase();
  const found: string[] = [];
  const missing: string[] = [];
  
  for (const keyword of testCase.motsClesAttendus) {
    if (content.includes(keyword.toLowerCase())) {
      found.push(keyword);
    } else {
      missing.push(keyword);
    }
  }
  
  // Succès si au moins 50% des mots-clés sont trouvés
  const success = found.length >= Math.ceil(testCase.motsClesAttendus.length / 2);
  
  return { success, found, missing };
}

// ============================================
// EXÉCUTION DES TESTS
// ============================================

async function runTests() {
  console.log('🧪 ==========================================================');
  console.log('   TEST DE PERTINENCE - RECHERCHE UNIFIÉE (200 questions)');
  console.log('==========================================================\n');

  // Validation du sommaire
  const tempsCount = sommaireUnifie.filter(s => s.source === 'temps').length;
  const formationCount = sommaireUnifie.filter(s => s.source === 'formation').length;
  const teletravailCount = sommaireUnifie.filter(s => s.source === 'teletravail').length;
  console.log(`📋 Sommaire: temps=${tempsCount}, formation=${formationCount}, teletravail=${teletravailCount}, total=${sommaireUnifie.length}\n`);

  let totalSommaireOK = 0;
  let totalMotsClesOK = 0;
  const failedTests: { id: number; question: string; reason: string }[] = [];

  const categories = [
    { name: 'TEMPS - Chapitre 1 (Temps de travail)', start: 1, end: 30 },
    { name: 'TEMPS - Chapitre 2 (Congés)', start: 31, end: 70 },
    { name: 'TEMPS - Chapitre 3 (Autorisations absence)', start: 71, end: 100 },
    { name: 'TEMPS - Chapitre 4 (Maladie)', start: 101, end: 120 },
    { name: 'FORMATION', start: 121, end: 160 },
    { name: 'TÉLÉTRAVAIL', start: 161, end: 200 }
  ];

  for (const category of categories) {
    console.log(`📂 === ${category.name} ===\n`);
    
    let categoryOK = 0;
    const categoryTests = testCases.filter(t => t.id >= category.start && t.id <= category.end);
    
    for (const testCase of categoryTests) {
      const sommaireResult = testRechercherDansSommaire(testCase);
      const motsClesResult = testMotsClesDansContenu(testCase);
      
      const testOK = sommaireResult.success && motsClesResult.success;
      
      if (testOK) {
        categoryOK++;
        totalSommaireOK++;
        totalMotsClesOK++;
        // Affichage simplifié pour les tests réussis
        process.stdout.write(`✅ Q${testCase.id} `);
        if (testCase.id % 10 === 0) console.log('');
      } else {
        failedTests.push({
          id: testCase.id,
          question: testCase.question,
          reason: !sommaireResult.success 
            ? `Source incorrecte: ${sommaireResult.details}` 
            : `Mots-clés manquants: [${motsClesResult.missing.join(', ')}]`
        });
        process.stdout.write(`❌ Q${testCase.id} `);
        if (testCase.id % 10 === 0) console.log('');
      }
    }
    
    console.log(`\n   → ${categoryOK}/${categoryTests.length} tests réussis\n`);
  }

  // Résumé final
  const totalTests = testCases.length * 2; // sommaire + mots-clés
  const totalOK = totalSommaireOK + totalMotsClesOK;
  const percentage = ((totalOK / totalTests) * 100).toFixed(1);
  
  console.log('\n📊 ==========================================================');
  console.log('   RÉSUMÉ DES TESTS');
  console.log('==========================================================\n');
  console.log(`   Tests réussis: ${totalOK}/${totalTests} (${percentage}%)`);
  console.log(`   - Recherche sommaire: ${totalSommaireOK}/200`);
  console.log(`   - Mots-clés présents: ${totalMotsClesOK}/200`);
  
  if (failedTests.length > 0) {
    console.log(`\n   ❌ Tests échoués (${failedTests.length}):`);
    for (const failed of failedTests.slice(0, 20)) {
      console.log(`      - Q${failed.id}: ${failed.question.substring(0, 40)}...`);
      console.log(`        → ${failed.reason}`);
    }
    if (failedTests.length > 20) {
      console.log(`      ... et ${failedTests.length - 20} autres`);
    }
  } else {
    console.log('\n   🎉 Tous les tests sont passés !');
  }

  // Statistiques par source
  console.log('\n📈 Statistiques par source:');
  const sources = ['temps', 'formation', 'teletravail'] as const;
  for (const source of sources) {
    const sourceTests = testCases.filter(t => t.sourceAttendue === source);
    const sourceOK = sourceTests.filter(t => {
      const r = testRechercherDansSommaire(t);
      const m = testMotsClesDansContenu(t);
      return r.success && m.success;
    }).length;
    console.log(`   ${source}: ${sourceOK}/${sourceTests.length} tests OK`);
  }
}

runTests().catch(console.error);

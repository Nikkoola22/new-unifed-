import { useState } from 'react';
import { Euro, ArrowLeft, CheckCircle, ChevronRight } from 'lucide-react';

interface CalculateurCIAProps {
  onClose: () => void;
}

export default function CalculateurCIA({ onClose }: CalculateurCIAProps) {
  const [ifseMensuel, setIfseMensuel] = useState<number>(0);
  const [tauxEvaluation, setTauxEvaluation] = useState<number>(100);
  const [joursAbsenceN1, setJoursAbsenceN1] = useState<number>(0);
  const [etapeActive, setEtapeActive] = useState<number>(1); // Suivi de l'étape active
  
  // Calcul du CIA
  const calculerCIA = () => {
    if (ifseMensuel <= 0) {
      return {
        ifseAnnuel: 0,
        base10Pourcent: 0,
        tauxAbsence: 0,
        ciaEvaluation: 0,
        ciaAbsence: 0,
        ciaFinal: 0,
        detailCalcul: ""
      };
    }
    
    // ÉTAPE 1: Calcul de la base CIA
    // CIA = (IFSE mensuel × 10% × 12)
    const ifseAnnuel = ifseMensuel * 12;
    const base10Pourcent = ifseAnnuel * 0.10; // 10% de l'IFSE annuel
    
    // ÉTAPE 2: Calcul de la première moitié (Taux d'évaluation)
    // La première moitié dépend du taux d'évaluation annuelle
    const ciaEvaluation = (base10Pourcent / 2) * (tauxEvaluation / 100);
    
    // ÉTAPE 3: Calcul de la deuxième moitié (Jours d'absence N-1)
    // Déterminer le taux selon les jours d'absence
    let tauxAbsence = 0;
    if (joursAbsenceN1 < 5) {
      tauxAbsence = 100; // < 5 jours: 100%
    } else if (joursAbsenceN1 <= 10) {
      tauxAbsence = 50;  // 5-10 jours: 50%
    } else {
      tauxAbsence = 0;   // > 10 jours: 0%
    }
    
    const ciaAbsence = (base10Pourcent / 2) * (tauxAbsence / 100);
    
    // ÉTAPE 4: CIA Final
    const ciaFinal = ciaEvaluation + ciaAbsence;
    
    // Détail du calcul
    const detailCalcul = `
Calcul détaillé du CIA:
1️⃣ IFSE annuel = ${ifseMensuel}€ × 12 = ${ifseAnnuel}€
2️⃣ Base CIA (10% de l'IFSE annuel) = ${ifseAnnuel}€ × 10% = ${base10Pourcent.toFixed(2)}€

📊 Répartition sur 2 moitiés (chaque moitié = 50%):

1️⃣ PREMIÈRE MOITIÉ (Évaluation annuelle):
   • Montant de la moitié = ${base10Pourcent.toFixed(2)}€ ÷ 2 = ${(base10Pourcent / 2).toFixed(2)}€
   • Taux d'évaluation = ${tauxEvaluation}%
   • CIA Évaluation = ${(base10Pourcent / 2).toFixed(2)}€ × ${tauxEvaluation}% = ${ciaEvaluation.toFixed(2)}€

2️⃣ DEUXIÈME MOITIÉ (Jours d'absence N-1):
   • Montant de la moitié = ${base10Pourcent.toFixed(2)}€ ÷ 2 = ${(base10Pourcent / 2).toFixed(2)}€
   • Jours d'absence en N-1 = ${joursAbsenceN1} jours
   • Taux appliqué = ${tauxAbsence}%
     (< 5 jours = 100% | 5-10 jours = 50% | > 10 jours = 0%)
   • CIA Absence = ${(base10Pourcent / 2).toFixed(2)}€ × ${tauxAbsence}% = ${ciaAbsence.toFixed(2)}€

✅ CIA ANNUEL TOTAL = ${ciaEvaluation.toFixed(2)}€ + ${ciaAbsence.toFixed(2)}€ = ${ciaFinal.toFixed(2)}€
💰 CIA MENSUEL = ${(ciaFinal / 12).toFixed(2)}€
    `.trim();
    
    return {
      ifseAnnuel,
      base10Pourcent,
      tauxAbsence,
      ciaEvaluation,
      ciaAbsence,
      ciaFinal,
      detailCalcul
    };
  };
  
  const resultat = calculerCIA();
  const ciaMensuel = resultat.ciaFinal / 12;

  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="text-amber-600 hover:text-amber-700 p-2 rounded-full hover:bg-amber-50 bg-white border-2 border-amber-300 transition-all shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative p-4 bg-white/20 rounded-full">
                <Euro className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Calculateur CIA</h3>
                <p className="text-amber-100">Complément Indemnitaire Annuel - Calcul pas à pas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 bg-slate-50">
        {/* PROGRESS TRACKER - Suivi des étapes */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <h4 className="font-bold text-gray-800 mb-4 text-center">Votre parcours de calcul</h4>
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: "IFSE mensuel", icon: "💰" },
              { num: 2, label: "Évaluation", icon: "📊" },
              { num: 3, label: "Absences", icon: "📅" },
              { num: 4, label: "Résultat", icon: "✅" }
            ].map((etape, idx) => (
              <div key={etape.num} className="flex flex-col items-center flex-1">
                <button
                  onClick={() => setEtapeActive(etape.num)}
                  className={`w-12 h-12 rounded-full font-bold text-lg mb-2 transition-all transform hover:scale-110 ${
                    etapeActive >= etape.num
                      ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg'
                      : 'bg-slate-200 text-gray-600'
                  } flex items-center justify-center`}
                >
                  {etape.num}
                </button>
                <span className="text-xs font-medium text-gray-700 text-center">{etape.label}</span>
                {idx < 3 && (
                  <div className={`h-1 w-full mx-1 mt-2 ${etapeActive > etape.num ? 'bg-orange-500' : 'bg-slate-300'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ÉTAPE 1: IFSE Mensuel */}
        <div className={`rounded-xl shadow-md overflow-hidden transition-all ${etapeActive >= 1 ? 'ring-2 ring-orange-400' : ''}`}>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">💰</div>
              <div>
                <h4 className="font-bold text-lg">Étape 1: Votre IFSE mensuel</h4>
                <p className="text-blue-100 text-sm">La base de votre calcul</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Montant IFSE que vous percevez mensuellement
              </label>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-blue-600">€</span>
                <input
                  type="number"
                  value={ifseMensuel || ''}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setIfseMensuel(val);
                    if (val > 0 && etapeActive === 1) setEtapeActive(2);
                  }}
                  placeholder="Ex: 250"
                  className="flex-1 px-4 py-3 text-lg border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {ifseMensuel > 0 && (
                <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded-lg">
                  <p className="text-green-800 font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    IFSE annuel: {(ifseMensuel * 12).toFixed(2)}€
                  </p>
                  <p className="text-xs text-green-700 mt-1">({ifseMensuel}€ × 12 mois)</p>
                </div>
              )}

              <div className="mt-3 p-3 bg-slate-100 rounded-lg text-xs text-slate-700">
                <strong>💡 Conseil:</strong> Trouvez ce montant sur votre bulletin de paie ou demandez à la RH
              </div>
            </div>
          </div>
        </div>

        {/* ÉTAPE 2: Taux d'Évaluation */}
        {ifseMensuel > 0 && (
          <div className={`rounded-xl shadow-md overflow-hidden transition-all ${etapeActive >= 2 ? 'ring-2 ring-purple-400' : ''}`}>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">📊</div>
                <div>
                  <h4 className="font-bold text-lg">Étape 2: Votre taux d'évaluation annuelle</h4>
                  <p className="text-purple-100 text-sm">Première moitié de votre CIA (50%)</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-4">Sélectionnez le taux de votre dernière évaluation annuelle:</p>
                
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { value: 0, label: "0%", desc: "Insuffisant", color: "red" },
                    { value: 50, label: "50%", desc: "Satisfaisant", color: "yellow" },
                    { value: 70, label: "70%", desc: "Bien", color: "blue" },
                    { value: 100, label: "100%", desc: "Très bien", color: "green" }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setTauxEvaluation(option.value);
                        if (etapeActive === 2) setEtapeActive(3);
                      }}
                      className={`p-4 rounded-lg font-bold transition-all transform hover:scale-105 text-center ${
                        tauxEvaluation === option.value
                          ? `bg-${option.color}-500 text-white border-3 border-${option.color}-700 shadow-lg`
                          : `bg-slate-100 text-gray-700 border-2 border-gray-300 hover:border-purple-400`
                      }`}
                    >
                      <div className="text-xl">{option.label}</div>
                      <div className="text-xs mt-1 font-medium">{option.desc}</div>
                    </button>
                  ))}
                </div>

                {tauxEvaluation !== 100 && (
                  <div className="mt-4 p-3 bg-amber-100 border border-amber-400 rounded-lg text-sm text-amber-800">
                    ⚠️ <strong>Attention:</strong> Cette évaluation impacte directement votre CIA (50% de la base)
                  </div>
                )}

                <div className="mt-4 p-3 bg-slate-100 rounded-lg text-xs text-slate-700">
                  <strong>💡 Conseil:</strong> Consultez votre dossier personnel ou demandez votre dernier avis d'évaluation
                </div>
              </div>

              {tauxEvaluation > 0 && (
                <div className="p-3 bg-purple-100 border border-purple-400 rounded-lg">
                  <p className="text-purple-800 font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    CIA Évaluation: {((ifseMensuel * 12 * 0.10) / 2 * (tauxEvaluation / 100)).toFixed(2)}€/an
                  </p>
                  <p className="text-xs text-purple-700 mt-1">Base (50%): {((ifseMensuel * 12 * 0.10) / 2).toFixed(2)}€ × {tauxEvaluation}%</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ÉTAPE 3: Jours d'Absence N-1 */}
        {ifseMensuel > 0 && tauxEvaluation >= 0 && (
          <div className={`rounded-xl shadow-md overflow-hidden transition-all ${etapeActive >= 3 ? 'ring-2 ring-red-400' : ''}`}>
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">📅</div>
                <div>
                  <h4 className="font-bold text-lg">Étape 3: Vos jours d'absence en N-1</h4>
                  <p className="text-red-100 text-sm">Deuxième moitié de votre CIA (50%)</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Combien de jours d'absence aviez-vous en N-1?
                </label>
                
                <div className="flex items-center gap-4 mb-4">
                  <input
                    type="number"
                    min="0"
                    value={joursAbsenceN1}
                    onChange={(e) => setJoursAbsenceN1(Math.max(0, Number(e.target.value)))}
                    placeholder="Ex: 3"
                    className="w-24 px-4 py-3 text-2xl font-bold border-2 border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-center"
                  />
                  <span className="text-lg font-semibold text-gray-600">jours</span>
                </div>

                {/* Indicateur de seuil */}
                <div className="space-y-2 mb-4">
                  <div className={`p-3 rounded-lg ${joursAbsenceN1 < 5 ? 'bg-green-100 border border-green-400' : 'bg-slate-100'}`}>
                    <p className={`text-sm font-semibold ${joursAbsenceN1 < 5 ? 'text-green-800' : 'text-gray-600'}`}>
                      {joursAbsenceN1 < 5 ? '✅' : '🔘'} Moins de 5 jours = <span className="text-lg">100%</span>
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${joursAbsenceN1 >= 5 && joursAbsenceN1 <= 10 ? 'bg-yellow-100 border border-yellow-400' : 'bg-slate-100'}`}>
                    <p className={`text-sm font-semibold ${joursAbsenceN1 >= 5 && joursAbsenceN1 <= 10 ? 'text-yellow-800' : 'text-gray-600'}`}>
                      {joursAbsenceN1 >= 5 && joursAbsenceN1 <= 10 ? '⚠️' : '🔘'} Entre 5 et 10 jours = <span className="text-lg">50%</span>
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${joursAbsenceN1 > 10 ? 'bg-red-100 border border-red-400' : 'bg-slate-100'}`}>
                    <p className={`text-sm font-semibold ${joursAbsenceN1 > 10 ? 'text-red-800' : 'text-gray-600'}`}>
                      {joursAbsenceN1 > 10 ? '❌' : '🔘'} Plus de 10 jours = <span className="text-lg">0%</span>
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-100 rounded-lg text-xs text-slate-700 mb-4">
                  <strong>📝 Note:</strong> Les arrêts se comptent en jours calendaires. Un arrêt couvrant un week-end compte tous les jours inclus.
                </div>

                {joursAbsenceN1 >= 0 && (
                  <div className="p-3 bg-red-100 border border-red-400 rounded-lg">
                    <p className="text-red-800 font-semibold flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      CIA Absence: {joursAbsenceN1 < 5 ? ((ifseMensuel * 12 * 0.10) / 2).toFixed(2) : joursAbsenceN1 <= 10 ? ((ifseMensuel * 12 * 0.10) / 2 * 0.5).toFixed(2) : '0.00'}€/an
                    </p>
                    <p className="text-xs text-red-700 mt-1">
                      Base (50%): {((ifseMensuel * 12 * 0.10) / 2).toFixed(2)}€ × {joursAbsenceN1 < 5 ? '100%' : joursAbsenceN1 <= 10 ? '50%' : '0%'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ÉTAPE 4: RÉSULTAT FINAL */}
        {ifseMensuel > 0 && (
          <div className={`rounded-xl shadow-xl overflow-hidden transition-all ${etapeActive >= 4 ? 'ring-3 ring-orange-400' : ''}`}>
            <div className="bg-gradient-to-r from-orange-500 via-orange-500 to-red-600 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">✅</div>
                <div>
                  <h4 className="font-bold text-lg">Étape 4: Votre CIA Final</h4>
                  <p className="text-orange-100 text-sm">Récapitulatif complet de votre calcul</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-b from-orange-50 via-white to-amber-50 p-6 space-y-4">
              {/* Affichage du résultat */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-5 border-3 border-purple-300 shadow-md">
                  <div className="text-sm font-medium text-gray-600 mb-2">📊 CIA Évaluation</div>
                  <div className="text-3xl font-bold text-purple-700">
                    {resultat.ciaEvaluation.toFixed(2)}€
                  </div>
                  <div className="text-xs text-gray-500 mt-2 font-semibold">{tauxEvaluation}% × Base/2</div>
                </div>
                
                <div className="bg-white rounded-xl p-5 border-3 border-red-300 shadow-md">
                  <div className="text-sm font-medium text-gray-600 mb-2">📅 CIA Absences</div>
                  <div className="text-3xl font-bold text-red-700">
                    {resultat.ciaAbsence.toFixed(2)}€
                  </div>
                  <div className="text-xs text-gray-500 mt-2 font-semibold">{resultat.tauxAbsence}% × Base/2</div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl p-5 border-3 border-orange-600 shadow-lg">
                  <div className="text-sm font-medium text-white mb-2">💰 CIA TOTAL ANNUEL</div>
                  <div className="text-3xl font-bold text-white">
                    {resultat.ciaFinal.toFixed(2)}€
                  </div>
                  <div className="text-sm text-orange-100 mt-2 font-bold">{ciaMensuel.toFixed(2)}€/mois</div>
                </div>
              </div>

              {/* Détail du calcul pédagogique */}
              <div className="bg-white rounded-xl p-5 border-2 border-slate-300 space-y-3">
                <h5 className="font-bold text-gray-800 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-orange-600" />
                  Détail du calcul
                </h5>
                
                <div className="space-y-2 text-sm font-mono text-gray-700 bg-slate-50 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span>IFSE Mensuel</span>
                    <span className="font-bold">{ifseMensuel}€</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span>IFSE Annuel (× 12 mois)</span>
                    <span className="font-bold text-blue-600">{resultat.ifseAnnuel}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Base CIA (10% × IFSE Annuel)</span>
                    <span className="font-bold text-orange-600">{resultat.base10Pourcent.toFixed(2)}€</span>
                  </div>
                  
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-purple-700">
                      <span>50% Évaluation ({tauxEvaluation}%)</span>
                      <span className="font-bold">{resultat.ciaEvaluation.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between text-red-700">
                      <span>50% Absences ({resultat.tauxAbsence}%)</span>
                      <span className="font-bold">{resultat.ciaAbsence.toFixed(2)}€</span>
                    </div>
                  </div>
                  
                  <div className="border-t-2 border-b-2 py-2 mt-2 flex justify-between text-orange-700">
                    <span>CIA ANNUEL TOTAL</span>
                    <span className="font-bold text-lg">{resultat.ciaFinal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-green-700">
                    <span>CIA MENSUEL</span>
                    <span className="font-bold text-lg">{ciaMensuel.toFixed(2)}€</span>
                  </div>
                </div>
              </div>

              {/* Info additionnelle */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <strong>💡 Important:</strong> Ce calcul est fourni à titre informatif. Pour une vérification officielle, consultez votre dossier personnel ou la Direction des Ressources Humaines.
              </div>
            </div>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="flex justify-end gap-3 pt-4 border-t bg-white rounded-lg p-4">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors font-medium"
          >
            Fermer
          </button>
          <button
            onClick={() => {
              setIfseMensuel(0);
              setTauxEvaluation(100);
              setJoursAbsenceN1(0);
              setEtapeActive(1);
            }}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            Recommencer
          </button>
        </div>
      </div>
    </div>
  );
}
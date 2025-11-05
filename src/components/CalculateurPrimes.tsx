import React, { useState, useMemo } from 'react'
import { ChevronRight, CheckCircle2, AlertCircle, TrendingUp, Calculator } from 'lucide-react'
import { ifse1Data, ifse2Data, getAllDirections, getIFSE2ByDirection, getDirectionFullName } from '../data/rifseep-data'

interface CalculateurPrimesProps {
  onClose?: () => void
}

export default function CalculateurPrimes({ onClose }: CalculateurPrimesProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedFunction, setSelectedFunction] = useState('')
  const [selectedJob, setSelectedJob] = useState('')
  const [selectedDirection, setSelectedDirection] = useState('')
  const [selectedIFSE2, setSelectedIFSE2] = useState<Set<number>>(new Set())
  const [weekendSaturdays, setWeekendSaturdays] = useState(0)
  const [weekendSundays, setWeekendSundays] = useState(0)
  const [weekendRateSat, setWeekendRateSat] = useState(40)
  const [weekendRateSun, setWeekendRateSun] = useState(40)

  // Get all unique jobs from IFSE2 data, sorted
  const allJobs = useMemo(() => {
    return Array.from(new Set(ifse2Data.flatMap(item => item.jobs))).sort((a, b) => a.localeCompare(b, 'fr'))
  }, [])

  const matchedJobDirections = useMemo(() => {
    if (!selectedJob) return []
    // Find all directions that contain this job
    const matches = ifse2Data
      .filter(item => item.jobs.some(j => j.toLowerCase().includes(selectedJob.toLowerCase())))
      .map(m => m.direction)
      .filter((v, i, a) => a.indexOf(v) === i) // unique
    return matches
  }, [selectedJob])

  // Calculs
  const ifse1Amount = useMemo(() => {
    if (!selectedFunction) return 0
    const item = ifse1Data.find(i => i.function === selectedFunction)
    return item?.monthlyAmount || 0
  }, [selectedFunction])

  const ifse2Amount = useMemo(() => {
    if (!selectedDirection || selectedIFSE2.size === 0) return 0
    const ifse2List = getIFSE2ByDirection(selectedDirection)
    return Array.from(selectedIFSE2).reduce((sum, idx) => {
      return sum + (ifse2List[idx]?.amount || 0)
    }, 0)
  }, [selectedDirection, selectedIFSE2])

  const ifse3SatTotal = weekendSaturdays * weekendRateSat
  const ifse3SunTotal = weekendSundays * weekendRateSun
  const ifse3Total = ifse3SatTotal + ifse3SunTotal

  const totalMonthly = ifse1Amount + ifse2Amount + ifse3Total

  const stepDescriptions = [
    { num: 1, label: 'Catégorie', desc: 'Votre grille indiciaire' },
    { num: 2, label: 'Fonction', desc: 'IFSE 1 - Prime de base' },
    { num: 3, label: 'Primes complément.', desc: 'IFSE 2 & IFSE 3' },
    { num: 4, label: 'Résultat', desc: 'Total mensuel' },
  ]

  const isStepComplete = (step: number) => {
    if (step === 1) return selectedCategory !== ''
    if (step === 2) return selectedFunction !== ''
    if (step === 3) return selectedDirection !== ''
    if (step === 4) return true
    return false
  }

  const handleJobChange = (value: string) => {
    setSelectedJob(value)
    setSelectedDirection('')
  }

  const handleDirectionSelect = (dir: string) => {
    setSelectedDirection(dir)
    setSelectedIFSE2(new Set())
  }

  const handleToggleIFSE2 = (idx: number) => {
    const newSet = new Set(selectedIFSE2)
    if (newSet.has(idx)) {
      newSet.delete(idx)
    } else {
      newSet.add(idx)
    }
    setSelectedIFSE2(newSet)
  }

  const progressPercent = Math.round(
    (Object.values({
      category: selectedCategory ? 1 : 0,
      function: selectedFunction ? 1 : 0,
      direction: selectedDirection ? 1 : 0,
      weekend: ifse3Total > 0 ? 1 : 0,
    }).reduce((a, b) => a + b, 0) / 4) * 100
  )

  return (
    <div className="space-y-6">
      {/* PROGRESS TRACKER */}
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-slate-300">Progression du calcul</h3>
          <span className="text-xs font-medium text-slate-400">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* ÉTAPE 1: CATÉGORIE */}
      <div className={`transition-all duration-300 ${currentStep === 1 ? 'ring-2 ring-blue-400/50' : ''} bg-gradient-to-br from-slate-800/60 to-slate-800/40 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
              1
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Catégorie d'emploi</h4>
              <p className="text-xs text-slate-400">Sélectionnez votre grille indiciaire (A, B ou C)</p>
            </div>
          </div>
          {selectedCategory && <CheckCircle2 className="w-5 h-5 text-green-400" />}
        </div>

        <div className="space-y-2">
          {['A', 'B', 'C'].map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat)
                setCurrentStep(2)
              }}
              className={`w-full p-3 rounded-lg text-left transition-all font-medium ${ selectedCategory === cat
                ? 'bg-blue-500/80 border border-blue-400 text-white shadow-lg'
                : 'bg-slate-700/40 border border-slate-600/30 text-slate-300 hover:bg-slate-700/60 hover:border-slate-500/50'
              }`}
            >
              Catégorie {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ÉTAPE 2: FONCTION (IFSE 1) */}
      {selectedCategory && (
        <div className={`transition-all duration-300 ${currentStep === 2 ? 'ring-2 ring-cyan-400/50' : ''} bg-gradient-to-br from-slate-800/60 to-slate-800/40 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Fonction & IFSE 1</h4>
                <p className="text-xs text-slate-400">Prime de base selon votre poste</p>
              </div>
            </div>
            {selectedFunction && <CheckCircle2 className="w-5 h-5 text-green-400" />}
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {ifse1Data
              .filter(item => item.category === selectedCategory)
              .map((item, idx) => (
                <button
                  key={`${selectedCategory}-${idx}-${item.functionCode}`}
                  onClick={() => {
                    setSelectedFunction(item.function)
                    setCurrentStep(3)
                  }}
                  className={`w-full p-4 rounded-lg text-left transition-all border ${ selectedFunction === item.function
                    ? 'bg-cyan-500/80 border-cyan-400 shadow-lg ring-2 ring-cyan-300'
                    : 'bg-slate-700/40 border-slate-600/30 hover:bg-slate-700/60 hover:border-slate-500/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className={`font-semibold text-base ${selectedFunction === item.function ? 'text-white' : 'text-slate-200'}`}>
                        {item.function}
                      </p>
                      <p className={`text-xs mt-1 ${selectedFunction === item.function ? 'text-cyan-100' : 'text-slate-400'}`}>
                        Code: {item.functionCode}
                      </p>
                    </div>
                    <div className={`text-right px-3 py-2 rounded-lg ${selectedFunction === item.function ? 'bg-white/20' : 'bg-slate-600/30'}`}>
                      <p className={`text-2xl font-bold ${selectedFunction === item.function ? 'text-white' : 'text-cyan-400'}`}>
                        {item.monthlyAmount}€
                      </p>
                      <p className={`text-xs ${selectedFunction === item.function ? 'text-cyan-100' : 'text-slate-400'}`}>
                        par mois
                      </p>
                    </div>
                  </div>
                </button>
              ))}
          </div>

          {selectedFunction && (
            <div className="mt-4 space-y-2">
              <div className="p-4 bg-cyan-500/20 border border-cyan-500/40 rounded-lg">
                <p className="text-xs text-cyan-300 mb-1">✓ Fonction sélectionnée</p>
                <p className="text-sm text-slate-200 font-medium">{selectedFunction}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-teal-500/30 border border-cyan-500/50 rounded-lg shadow-lg">
                <p className="text-xs text-cyan-200 mb-1">📊 Montant IFSE 1 mensuel</p>
                <p className="text-3xl font-bold text-cyan-300">{ifse1Amount}€</p>
                <p className="text-xs text-cyan-200 mt-1">Soit <span className="font-semibold">{(ifse1Amount * 12).toLocaleString('fr-FR')}€</span> par an</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ÉTAPE 2B: MÉTIER (OPTIONNEL) */}
      {selectedFunction && (
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-800/30 rounded-xl p-5 border border-slate-700/40">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400/60 to-pink-400/60 flex items-center justify-center text-white text-xs font-bold">
              ⚡
            </div>
            <div>
              <h5 className="text-sm font-semibold text-slate-200">Sélectionner un métier (optionnel)</h5>
              <p className="text-xs text-slate-500">Pré-remplit les IFSE 2 applicables à votre service</p>
            </div>
          </div>

          <select
            value={selectedJob}
            onChange={(e) => handleJobChange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/30 rounded-lg text-white text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 outline-none transition"
          >
            <option value="">Choisir un métier...</option>
            {allJobs.map(job => (
              <option key={job} value={job}>
                {job}
              </option>
            ))}
          </select>

          {matchedJobDirections.length > 0 && selectedJob && (
            <div className="mt-3 space-y-2">
              <p className="text-xs text-slate-400">Directions correspondantes:</p>
              <div className="space-y-1">
                {matchedJobDirections.map(dir => (
                  <button
                    key={dir}
                    onClick={() => handleDirectionSelect(dir)}
                    className={`w-full p-2 rounded text-sm text-left transition-all ${
                      selectedDirection === dir
                        ? 'bg-purple-500/70 text-white font-medium'
                        : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    {getDirectionFullName(dir)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ÉTAPE 3: PRIMES COMPLÉMENTAIRES (IFSE 2 & 3) */}
      {selectedFunction && (
        <div className={`transition-all duration-300 ${currentStep === 3 ? 'ring-2 ring-teal-400/50' : ''} bg-gradient-to-br from-slate-800/60 to-slate-800/40 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Primes complémentaires</h4>
                <p className="text-xs text-slate-400">IFSE 2 (sujétions) et IFSE 3 (week-end)</p>
              </div>
            </div>
            {(selectedDirection || ifse3Total > 0) && <CheckCircle2 className="w-5 h-5 text-green-400" />}
          </div>

          {/* IFSE 2 */}
          <div className="mb-6">
            <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-400" />
              IFSE 2 — Primes de sujétion
            </h5>

            <div className="mb-3">
              <label className="text-xs text-slate-400 mb-2 block">Sélectionnez votre direction:</label>
              <select
                value={selectedDirection}
                onChange={(e) => handleDirectionSelect(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/30 rounded-lg text-white text-sm focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 outline-none transition"
              >
                <option value="">Choisir une direction...</option>
                {getAllDirections().map(dir => (
                  <option key={dir} value={dir}>
                    {getDirectionFullName(dir)}
                  </option>
                ))}
              </select>
            </div>

            {selectedDirection && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {getIFSE2ByDirection(selectedDirection).map((prime, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleToggleIFSE2(idx)}
                    className={`w-full p-3 rounded-lg text-left transition-all border ${
                      selectedIFSE2.has(idx)
                        ? 'bg-teal-500/30 border-teal-400/60 shadow-md'
                        : 'bg-slate-700/30 border-slate-600/20 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded border-2 mt-0.5 flex items-center justify-center transition ${
                        selectedIFSE2.has(idx)
                          ? 'bg-green-500 border-green-400'
                          : 'border-slate-500'
                      }`}>
                        {selectedIFSE2.has(idx) && <span className="text-white text-xs">✓</span>}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-200">{prime.motif}</p>
                        <p className="text-xs text-slate-400 mt-0.5">Service: {prime.service || 'Tous'}</p>
                        {prime.jobs && prime.jobs.length > 0 && (
                          <p className="text-xs text-slate-400">Métier(s): {prime.jobs.slice(0, 2).join(', ')}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-400">{prime.amount}€</p>
                        <p className="text-xs text-slate-500">/mois</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {ifse2Amount > 0 && (
              <div className="mt-3 p-2 bg-teal-500/10 border border-teal-500/30 rounded text-sm text-teal-200">
                Primes sélectionnées: <span className="font-bold">{ifse2Amount}€/mois</span>
              </div>
            )}
          </div>

          {/* IFSE 3 */}
          <div>
            <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-purple-400" />
              IFSE 3 — Primes week-end
            </h5>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Samedis/mois</label>
                <select
                  value={weekendSaturdays}
                  onChange={(e) => setWeekendSaturdays(Number(e.target.value))}
                  className="w-full px-2 py-1 bg-slate-700/50 border border-slate-600/30 rounded text-white text-sm"
                >
                  {[0, 1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Dimanches/mois</label>
                <select
                  value={weekendSundays}
                  onChange={(e) => setWeekendSundays(Number(e.target.value))}
                  className="w-full px-2 py-1 bg-slate-700/50 border border-slate-600/30 rounded text-white text-sm"
                >
                  {[0, 1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Taux Samedi</label>
                <select
                  value={weekendRateSat}
                  onChange={(e) => setWeekendRateSat(Number(e.target.value))}
                  className="w-full px-2 py-1 bg-slate-700/50 border border-slate-600/30 rounded text-white text-sm"
                >
                  <option value={40}>40€ (jusqu'à 3h13)</option>
                  <option value={60}>60€ (3h16 - 7h12)</option>
                  <option value={80}>80€ (plus 7h12)</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Taux Dimanche</label>
                <select
                  value={weekendRateSun}
                  onChange={(e) => setWeekendRateSun(Number(e.target.value))}
                  className="w-full px-2 py-1 bg-slate-700/50 border border-slate-600/30 rounded text-white text-sm"
                >
                  <option value={40}>40€ (jusqu'à 3h13)</option>
                  <option value={60}>60€ (3h16 - 7h12)</option>
                  <option value={80}>80€ (plus 7h12)</option>
                </select>
              </div>
            </div>

            {ifse3Total > 0 && (
              <div className="mt-3 p-2 bg-purple-500/10 border border-purple-500/30 rounded text-sm text-purple-200">
                <p>Primes week-end calculées:</p>
                <p className="font-bold mt-1">
                  Samedi: {ifse3SatTotal}€ | Dimanche: {ifse3SunTotal}€ | Total: <span className="text-purple-300">{ifse3Total}€</span>/mois
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ÉTAPE 4: RÉSULTAT FINAL */}
      {selectedFunction && (
        <div className={`transition-all duration-300 ${currentStep === 4 ? 'ring-2 ring-green-400/50' : ''} bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 rounded-xl p-6 border border-green-500/40 shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                ✓
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Montant total</h4>
                <p className="text-xs text-slate-300">Somme de toutes vos primes</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-green-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-1">IFSE 1</p>
              <p className="text-2xl font-bold text-blue-300">{ifse1Amount}€</p>
              <p className="text-xs text-slate-400 mt-1">Prime de fonction</p>
            </div>

            <div className="bg-teal-500/20 border border-teal-500/40 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-1">IFSE 2</p>
              <p className="text-2xl font-bold text-teal-300">{ifse2Amount}€</p>
              <p className="text-xs text-slate-400 mt-1">Primes sélectionnées</p>
            </div>

            <div className="bg-purple-500/20 border border-purple-500/40 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-1">IFSE 3</p>
              <p className="text-2xl font-bold text-purple-300">{ifse3Total}€</p>
              <p className="text-xs text-slate-400 mt-1">Primes week-end</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/30 via-emerald-500/30 to-teal-500/30 border border-green-500/60 rounded-lg p-6 shadow-lg">
            <p className="text-sm text-slate-300 mb-2 font-medium">Revenu mensuel additionnel</p>
            <p className="text-5xl font-bold text-green-300">{totalMonthly}€</p>
            <p className="text-sm text-slate-300 mt-3 font-light">
              Soit <span className="font-bold text-green-200">{(totalMonthly * 12).toLocaleString('fr-FR')}€</span> par an
            </p>
          </div>

          <div className="mt-4 p-3 bg-slate-700/50 border border-slate-600/30 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-slate-400">
              ℹ️ Ces montants sont calculés selon vos sélections. Consultez la RH pour confirmation avant demande de régularisation.
            </p>
          </div>
        </div>
      )}

      {/* Bouton Retour */}
      {onClose && (
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-slate-700/50 hover:bg-slate-700/70 text-slate-300 rounded-lg transition-all font-light text-sm"
        >
          ← Retour aux calculateurs
        </button>
      )}
    </div>
  )
}

import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function SnackPilotBuilder() {
  const [step, setStep] = useState(1)
  const root = useRef(null)

  const [selection, setSelection] = useState({
    base: null,
    protein: null,
    veggies: null,
    sauce: null,
    topping: null,
    snack: null
  })

  // Dummy blocks
  const blocks = {
    base: ['Riz citronné', 'Pâtes complètes', 'Quinoa', 'Semoule', 'Lentilles', 'Pommes de terre'],
    protein: ['Œufs marinés', 'Poulet paprika', 'Tofu grillé', 'Pois chiches', 'Thon', 'Feta'],
    veggies: ['Carottes rôties', 'Concombre', 'Brocoli', 'Tomates cerises', 'Courgettes', 'Maïs'],
    sauce: ['Yaourt citron', 'Soja-miel', 'Pesto léger', 'Harissa douce', 'Tahini', 'Vinaigrette'],
    topping: ['Graines courge', 'Cacahuètes', 'Oignons frits', 'Herbes', 'Parmesan', 'Sésame'],
    snack: ['Pomme', 'Yaourt', 'Carré chocolat', 'Galette riz', 'Noix', 'Compote']
  }

  const handleSelect = (category, item) => {
    setSelection(prev => ({ ...prev, [category]: item }))
  }

  const allSelected = Object.values(selection).every(Boolean)

  useGSAP(() => {
    gsap.from('.builder-reveal', {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out'
    })
  }, { scope: root })

  return (
    <div ref={root} className="min-h-screen bg-[#fffdfa] font-sans text-[#1a1614] selection:bg-[#ff8d4d] selection:text-white">
      {/* Nav */}
      <nav className="border-b border-[#1a1614]/5 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <Link to="/snackpilot" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
            <div className="grid grid-cols-2 gap-0.5">
              <span className="h-2 w-2 rounded-sm bg-[#ff8d4d]" />
              <span className="h-2 w-2 rounded-sm bg-[#ffb088]" />
              <span className="h-2 w-2 rounded-sm bg-[#ffd4bf]" />
              <span className="h-2 w-2 rounded-sm bg-[#1a1614]" />
            </div>
            SnackPilot
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-[#1a1614]/40">Module Builder</span>
            <Link to="/snackpilot" className="rounded-full bg-gray-100 px-4 py-2 text-xs font-bold transition-colors hover:bg-gray-200">
              Retour
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-[1440px] px-6 py-12">
        {/* Header */}
        <div className="builder-reveal mb-12">
          <h1 className="font-display text-4xl font-black md:text-5xl">Construis ton midi comme un <span className="text-[#ff8d4d]">jeu de blocs.</span></h1>
          <p className="mt-4 max-w-2xl text-lg font-medium text-[#1a1614]/60">Choisis tes ingrédients, ajuste ton budget, garde l'équilibre et repars avec une lunchbox prête à préparer.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left panel - Config */}
          <div className="builder-reveal lg:col-span-3 space-y-6">
            <div className="rounded-[2rem] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#1a1614]/5 relative overflow-hidden">
              <div className="absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#fff7f0] blur-2xl" />
              <h3 className="font-display text-xl font-bold mb-6 relative">Préférences</h3>
              
              <div className="space-y-6 relative">
                <div>
                  <label className="text-xs font-bold text-[#1a1614]/50 uppercase tracking-wide">Repas / sem</label>
                  <div className="mt-2 flex gap-2">
                    {[1, 3, 5].map(n => (
                      <button key={n} className="flex-1 rounded-xl border-2 border-gray-100 py-3 font-bold transition-all hover:border-gray-200 focus:border-[#ff8d4d] focus:bg-[#fff7f0] focus:text-[#ff8d4d]">{n}</button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-bold text-[#1a1614]/50 uppercase tracking-wide">Budget max</label>
                  <div className="relative">
                    <select className="mt-2 w-full appearance-none rounded-xl border-2 border-gray-100 bg-white p-3 font-bold text-[#1a1614] outline-none transition-colors hover:border-gray-200 focus:border-[#ff8d4d]">
                      <option value="4">4,00 € / repas</option>
                      <option value="5">5,00 € / repas</option>
                      <option value="8">8,00 € / repas</option>
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-gray-400">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1a1614]/50 uppercase tracking-wide">Objectif</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button className="rounded-full bg-[#ff8d4d]/10 px-4 py-2 text-xs font-bold text-[#ff8d4d] transition-colors hover:bg-[#ff8d4d]/20">Protéiné</button>
                    <button className="rounded-full bg-gray-100 px-4 py-2 text-xs font-bold text-[#1a1614]/60 transition-colors hover:bg-gray-200 hover:text-[#1a1614]">Végétarien</button>
                    <button className="rounded-full bg-gray-100 px-4 py-2 text-xs font-bold text-[#1a1614]/60 transition-colors hover:bg-gray-200 hover:text-[#1a1614]">Anti-gaspi</button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial */}
            <div className="rounded-[2rem] bg-[#fff7f0] p-8 border-2 border-[#fff0e5]">
              <p className="text-sm font-medium italic text-[#1a1614]/80 leading-relaxed">"J'ai arrêté d'acheter des wraps à 8€ tous les midis. Maintenant j'ai mes box."</p>
              <div className="mt-4 font-bold text-sm text-[#ff8d4d] flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-[#ff8d4d]/20 flex items-center justify-center text-[10px]">L</span>
                Lina
              </div>
            </div>
          </div>

          {/* Center - Builder */}
          <div className="builder-reveal lg:col-span-6 space-y-6">
            {/* The 6 blocks */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Object.entries(blocks).map(([category, items]) => (
                <div key={category} className="rounded-[1.5rem] border-2 border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{category}</span>
                    <span className={`h-2 w-2 rounded-full transition-colors ${selection[category] ? 'bg-[#ff8d4d]' : 'bg-gray-200'}`} />
                  </div>
                  {/* Added data-lenis-prevent="true" so the scroll wheel isn't captured by the main Lenis instance */}
                  <div className="space-y-2 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar" data-lenis-prevent="true">
                    {items.map(item => (
                      <button
                        key={item}
                        onClick={() => handleSelect(category, item)}
                        className={`w-full rounded-xl p-3 text-left text-sm font-bold transition-all ${
                          selection[category] === item 
                            ? 'bg-[#1a1614] text-white shadow-lg translate-x-1' 
                            : 'bg-gray-50 text-[#1a1614]/70 hover:bg-gray-100 hover:text-[#1a1614]'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Live Result */}
          <div className="builder-reveal lg:col-span-3 space-y-6">
            <div className="rounded-3xl bg-[#1a1614] p-6 text-white shadow-2xl">
              <h3 className="font-display text-xl font-bold mb-2">
                {allSelected ? "La Box Méditerranée" : "Ta lunchbox"}
              </h3>
              <p className="text-sm font-medium text-white/60 mb-6">
                {allSelected ? "Fraîche, prête en 15 min." : "Sélectionne tes blocs pour voir le résultat."}
              </p>

              {/* Status */}
              <div className="mb-6 space-y-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-white/60">Équilibre</span>
                  <span className={allSelected ? "text-[#28c840]" : "text-white/20"}>{allSelected ? "86/100" : "--/100"}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-white/60">Budget calc.</span>
                  <span>{allSelected ? "4,20 €" : "-- €"}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-white/60">Temps prép.</span>
                  <span>{allSelected ? "15 min" : "--"}</span>
                </div>
              </div>

              {/* Smart Sub */}
              {allSelected && selection.base === 'Quinoa' && (
                <div className="mb-6 rounded-xl border border-[#ff8d4d]/30 bg-[#ff8d4d]/10 p-4">
                  <div className="text-xs font-bold text-[#ff8d4d] mb-1">Astuce Budget</div>
                  <div className="text-sm font-medium text-white/90">Remplacer Quinoa par Semoule. Gain : -0,70€</div>
                  <button className="mt-2 w-full rounded-lg bg-[#ff8d4d] py-1.5 text-xs font-bold text-white hover:bg-[#ffa06b]">Économiser sans pleurer</button>
                </div>
              )}

              <button 
                className={`w-full rounded-xl py-3 font-bold transition-colors ${
                  allSelected ? 'bg-[#28c840] text-white hover:bg-[#23b339]' : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                Valider cette lunchbox
              </button>
            </div>

            {/* Shopping List Mock */}
            {allSelected && (
              <div className="rounded-3xl border border-gray-200 bg-white p-6">
                <h3 className="font-bold mb-4">Liste générée</h3>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span>{selection.base}</span> <span className="text-gray-400">300g</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span>{selection.protein}</span> <span className="text-gray-400">2 btes</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span>{selection.veggies}</span> <span className="text-gray-400">3 pcs</span>
                  </div>
                  <div className="pt-2">
                    <button className="text-[#ff8d4d] text-xs font-bold underline">Copier la liste</button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Prep Plan */}
            {allSelected && (
              <div className="rounded-3xl border border-gray-200 bg-white p-6">
                <h3 className="font-bold mb-4 text-[#ff8d4d]">Préparation 15 min</h3>
                <div className="space-y-2 text-sm font-medium text-gray-600">
                  <p>1. Cuire {selection.base}.</p>
                  <p>2. Couper {selection.veggies}.</p>
                  <p>3. Mélanger {selection.sauce}.</p>
                  <p className="text-xs mt-4 italic">Sauce à part. Midi sauvé.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer nav */}
        <div className="builder-reveal mt-20 border-t border-gray-200 pt-8 flex flex-wrap gap-4 text-sm font-bold text-gray-500">
          <Link to="/snackpilot" className="hover:text-[#ff8d4d]">Retour à SnackPilot</Link>
          <span>/</span>
          <Link to="/snackpilot#offres" className="hover:text-[#ff8d4d]">Voir les offres</Link>
          <span>/</span>
          <Link to="/snackpilot#personas" className="hover:text-[#ff8d4d]">Découvrir les scénarios</Link>
        </div>
      </div>
    </div>
  )
}
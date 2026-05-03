import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function SnackPilotVitrine() {
  const root = useRef(null)

  useGSAP(
    () => {
      const reveals = root.current.querySelectorAll('.sp-reveal')
      
      reveals.forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        })
      })

      gsap.to('.sp-marquee-content', {
        xPercent: -50,
        ease: 'none',
        duration: 15,
        repeat: -1,
      })
    },
    { scope: root }
  )

  return (
    <div ref={root} className="min-h-screen bg-[#fffdfa] font-sans text-[#1a1614] selection:bg-[#ff8d4d] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-[#1a1614]/5 bg-[#fffdfa]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/snackpilot" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
            <div className="grid grid-cols-2 gap-0.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#ff8d4d]" />
              <span className="h-2.5 w-2.5 rounded-sm bg-[#ffb088]" />
              <span className="h-2.5 w-2.5 rounded-sm bg-[#ffd4bf]" />
              <span className="h-2.5 w-2.5 rounded-sm bg-[#1a1614]" />
            </div>
            SnackPilot
          </Link>
          <div className="flex items-center gap-6">
            <a href="#how-it-works" className="text-sm font-medium text-[#1a1614]/60 hover:text-[#1a1614]">Comment ça marche</a>
            <a href="#offres" className="text-sm font-medium text-[#1a1614]/60 hover:text-[#1a1614]">Offres</a>
            <Link
              to="/snackpilot/lunchbox-builder"
              className="rounded-full bg-[#ff8d4d] px-5 py-2 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-[#ffa06b]"
            >
              Créer ma box
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-40 md:pt-48">
        <div className="absolute -right-64 -top-64 -z-10 h-[800px] w-[800px] rounded-full bg-[#ff8d4d]/10 blur-3xl" />
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="sp-reveal max-w-2xl">
              <span className="mb-6 inline-block rounded-full bg-[#ff8d4d]/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[#ff8d4d]">
                App + Box + Routine
              </span>
              <h1 className="mb-6 font-display text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                Ton midi vient de <span className="text-[#ff8d4d]">trouver son pilote.</span>
              </h1>
              <p className="mb-8 text-xl font-medium leading-relaxed text-[#1a1614]/70">
                Planifie, compose et prépare tes lunchbox de la semaine sans calcul mental, sans gaspillage et sans sandwich de secours.
              </p>
              <div className="mb-10 flex flex-wrap gap-4 font-mono text-xs font-semibold uppercase tracking-wider text-[#1a1614]/50">
                <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#ff8d4d]" /> 5 repas en 3 min</span>
                <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#ff8d4d]" /> Liste auto</span>
                <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#ff8d4d]" /> 3,80 € / repas</span>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/snackpilot/lunchbox-builder"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#1a1614] px-8 py-4 text-sm font-bold text-white transition-transform hover:scale-105"
                >
                  Composer ma première lunchbox
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <a
                  href="#how-it-works"
                  className="flex items-center justify-center gap-2 rounded-full border-2 border-[#1a1614]/10 bg-white px-8 py-4 text-sm font-bold text-[#1a1614] transition-colors hover:border-[#1a1614]/20 hover:bg-gray-50"
                >
                  Voir comment ça marche
                </a>
              </div>
              <p className="mt-6 text-sm font-medium text-[#1a1614]/40">
                SnackPilot t'aide à passer de "j'ai rien prévu" à "c'est déjà prêt".
              </p>
            </div>
            <div className="sp-reveal relative hidden lg:block">
              {/* Decorative 3D-ish blocks */}
              <div className="relative h-[600px] w-full">
                <div className="absolute right-0 top-10 h-64 w-64 rounded-3xl bg-[#ff8d4d] shadow-2xl shadow-[#ff8d4d]/30 rotate-12 transition-transform duration-700 hover:rotate-6" />
                <div className="absolute bottom-20 left-10 h-56 w-56 rounded-3xl bg-[#1a1614] shadow-2xl -rotate-6 transition-transform duration-700 hover:rotate-0" />
                <div className="absolute right-20 bottom-40 h-48 w-48 rounded-3xl bg-[#fff7f0] border-4 border-[#ff8d4d]/20 shadow-xl rotate-45" />
                
                {/* App UI mockup */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[320px] rounded-[2.5rem] border-[8px] border-[#1a1614] bg-white p-4 shadow-2xl rotate-3 transition-transform hover:rotate-0">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-lg font-bold">Ma semaine</div>
                      <div className="h-8 w-8 rounded-full bg-[#ff8d4d]/20 flex items-center justify-center text-[#ff8d4d] font-bold">3</div>
                    </div>
                    <div className="space-y-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="flex items-center gap-4 rounded-2xl bg-[#fff7f0] p-3">
                          <div className="h-12 w-12 rounded-xl bg-[#ff8d4d] flex items-center justify-center text-white font-bold">M</div>
                          <div>
                            <div className="font-bold text-sm">Poulet Paprika</div>
                            <div className="text-xs font-medium text-[#1a1614]/50">15 min • 4,20€</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-[#1a1614] px-6 py-32 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="sp-reveal mb-8 font-display text-4xl font-black md:text-6xl text-balance">
            Le vrai problème, ce n'est pas de cuisiner. <span className="text-[#ff8d4d]">C'est de décider.</span>
          </h2>
          <p className="sp-reveal mb-16 text-xl font-medium leading-relaxed text-white/70 text-balance">
            La plupart des gens ne ratent pas leur repas du midi parce qu'ils ne savent pas cuisiner. Ils le ratent parce qu'ils décident trop tard, achètent au hasard, ou se retrouvent avec trois ingrédients qui ne vont pas ensemble.
          </p>
          
          <div className="sp-reveal grid gap-6 sm:grid-cols-2 md:grid-cols-4 text-left">
            <div className="rounded-3xl bg-white/5 p-6 border border-white/10">
              <div className="mb-4 text-3xl">🤔</div>
              <div className="font-bold">Moins de décisions</div>
              <div className="mt-2 text-sm text-white/50">Plus besoin de se demander quoi faire à 7h du matin.</div>
            </div>
            <div className="rounded-3xl bg-white/5 p-6 border border-white/10">
              <div className="mb-4 text-3xl">💸</div>
              <div className="font-bold">Moins de livraison</div>
              <div className="mt-2 text-sm text-white/50">Fini les commandes à 18€ pour une salade triste.</div>
            </div>
            <div className="rounded-3xl bg-white/5 p-6 border border-white/10">
              <div className="mb-4 text-3xl">🗑️</div>
              <div className="font-bold">Moins de gaspillage</div>
              <div className="mt-2 text-sm text-white/50">Tu achètes exactement ce dont tu as besoin.</div>
            </div>
            <div className="rounded-3xl bg-white/5 p-6 border border-white/10">
              <div className="mb-4 text-3xl">🎯</div>
              <div className="font-bold">Routine facile</div>
              <div className="mt-2 text-sm text-white/50">Un système simple qui tient sur la durée.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Strip */}
      <div className="overflow-hidden border-y-4 border-[#1a1614] bg-[#ff8d4d] py-4">
        <div className="sp-marquee flex w-[200%]">
          <div className="sp-marquee-content flex w-1/2 items-center justify-around font-display text-2xl font-black uppercase tracking-widest text-[#1a1614]">
            <span>Stop au sandwich panique</span>
            <span>•</span>
            <span>Ton frigo sait faire mieux</span>
            <span>•</span>
            <span>Midi sans drama</span>
            <span>•</span>
            <span>Prévu hier. Mangé tranquille.</span>
            <span>•</span>
            <span>La sauce à part, la vie en ordre</span>
            <span>•</span>
          </div>
          <div className="sp-marquee-content flex w-1/2 items-center justify-around font-display text-2xl font-black uppercase tracking-widest text-[#1a1614]">
            <span>Stop au sandwich panique</span>
            <span>•</span>
            <span>Ton frigo sait faire mieux</span>
            <span>•</span>
            <span>Midi sans drama</span>
            <span>•</span>
            <span>Prévu hier. Mangé tranquille.</span>
            <span>•</span>
            <span>La sauce à part, la vie en ordre</span>
            <span>•</span>
          </div>
        </div>
      </div>

      {/* How it works */}
      <section id="how-it-works" className="px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 md:text-center">
            <h2 className="font-display text-4xl font-black md:text-6xl">Un système en <span className="text-[#ff8d4d]">4 blocs</span>.</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Step 1 */}
            <div className="sp-reveal flex flex-col justify-between rounded-[2.5rem] bg-[#fff7f0] p-8 md:p-12">
              <div>
                <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff8d4d] font-display text-xl font-bold text-white">1</span>
                <h3 className="mb-4 font-display text-2xl font-bold">Choisis ton rythme</h3>
                <p className="font-medium text-[#1a1614]/60">Dis combien de repas tu veux préparer, ton budget, tes préférences et le temps que tu as vraiment.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="rounded-full border border-[#1a1614]/10 bg-white px-3 py-1.5 text-xs font-bold">3 repas cette semaine</span>
                <span className="rounded-full border border-[#1a1614]/10 bg-white px-3 py-1.5 text-xs font-bold">budget serré</span>
                <span className="rounded-full border border-[#1a1614]/10 bg-white px-3 py-1.5 text-xs font-bold">&lt; 15 min</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="sp-reveal flex flex-col justify-between rounded-[2.5rem] bg-[#1a1614] p-8 md:p-12 text-white">
              <div>
                <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 font-display text-xl font-bold text-white">2</span>
                <h3 className="mb-4 font-display text-2xl font-bold">Compose ta lunchbox</h3>
                <p className="font-medium text-white/60">SnackPilot assemble une base, une protéine, des légumes, une sauce et un extra pour créer un repas cohérent.</p>
              </div>
              <div className="mt-8 flex gap-2 overflow-hidden">
                <div className="flex-1 rounded-xl bg-[#ff8d4d] p-3 text-center text-xs font-bold">Base</div>
                <div className="flex-1 rounded-xl bg-[#ffb088] p-3 text-center text-xs font-bold text-[#1a1614]">Protéine</div>
                <div className="flex-1 rounded-xl bg-[#ffd4bf] p-3 text-center text-xs font-bold text-[#1a1614]">Légumes</div>
                <div className="flex-1 rounded-xl bg-white/20 p-3 text-center text-xs font-bold">Sauce</div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="sp-reveal flex flex-col justify-between rounded-[2.5rem] border-2 border-[#1a1614]/5 p-8 md:p-12">
              <div>
                <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1a1614] font-display text-xl font-bold text-white">3</span>
                <h3 className="mb-4 font-display text-2xl font-bold">Génère ta liste</h3>
                <p className="font-medium text-[#1a1614]/60">L'app regroupe automatiquement les ingrédients, évite les doublons et adapte les quantités.</p>
              </div>
              <div className="mt-8 rounded-2xl bg-gray-50 p-4 font-mono text-sm font-medium">
                <div className="mb-2 flex items-center gap-3 border-b border-gray-200 pb-2"><input type="checkbox" checked readOnly className="accent-[#ff8d4d]" /> Quinoa - 300g</div>
                <div className="mb-2 flex items-center gap-3 border-b border-gray-200 pb-2"><input type="checkbox" checked readOnly className="accent-[#ff8d4d]" /> Pois chiches - 2 boîtes</div>
                <div className="flex items-center gap-3"><input type="checkbox" className="accent-[#ff8d4d]" /> Feta - 150g</div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="sp-reveal flex flex-col justify-between rounded-[2.5rem] bg-[#ff8d4d] p-8 md:p-12 text-white">
              <div>
                <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 font-display text-xl font-bold text-white">4</span>
                <h3 className="mb-4 font-display text-2xl font-bold">Prépare sans improviser</h3>
                <p className="font-medium text-white/90">Tu suis une mini-feuille de route : quoi cuire, quoi couper, quoi assembler et quoi garder séparé.</p>
              </div>
              <div className="mt-8 rounded-2xl bg-white/10 p-4">
                <div className="font-bold text-white">1. Rincer le quinoa</div>
                <div className="mt-2 font-bold text-white/60">2. Couper les courgettes</div>
                <div className="mt-2 font-bold text-white/40">3. Mélanger la sauce</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Module CTA */}
      <section className="px-6 py-16">
        <div className="sp-reveal mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-[#1a1614] text-white">
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center p-12 lg:p-20">
              <span className="mb-4 font-mono text-sm font-bold uppercase tracking-widest text-[#ff8d4d]">Module Principal</span>
              <h2 className="mb-6 font-display text-4xl font-black md:text-5xl">Lunchbox Builder</h2>
              <p className="mb-10 text-lg font-medium text-white/60">
                Le module qui transforme tes envies floues en repas concret. 
                Compose une box équilibrée en sélectionnant des blocs. Le système vérifie la cohérence, le budget, et le temps.
              </p>
              <ul className="mb-10 space-y-4 font-medium text-white/80">
                <li className="flex items-center gap-3"><span className="text-[#ff8d4d]">✓</span> Score d'équilibre & Budget</li>
                <li className="flex items-center gap-3"><span className="text-[#ff8d4d]">✓</span> Remplacement intelligent</li>
                <li className="flex items-center gap-3"><span className="text-[#ff8d4d]">✓</span> Liste de courses générée</li>
              </ul>
              <div>
                <Link
                  to="/snackpilot/lunchbox-builder"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ff8d4d] px-8 py-4 font-bold text-white transition-transform hover:scale-105 hover:bg-[#ffa06b]"
                >
                  Explorer le Lunchbox Builder
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>
            <div className="relative min-h-[400px] bg-[#fff7f0] p-12">
               {/* Mock Builder visual */}
               <div className="absolute right-0 top-1/2 w-[120%] -translate-y-1/2 translate-x-12 rounded-[2rem] border-[6px] border-[#1a1614] bg-white p-6 shadow-2xl">
                 <div className="mb-6 flex gap-2">
                   <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                   <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                   <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                 </div>
                 <div className="grid grid-cols-3 gap-4">
                   <div className="rounded-xl bg-[#fff7f0] p-4">
                     <div className="text-xs font-bold text-[#ff8d4d]">BASE</div>
                     <div className="mt-1 font-bold text-[#1a1614]">Quinoa</div>
                   </div>
                   <div className="rounded-xl border-2 border-[#1a1614] bg-[#ff8d4d] p-4 text-white">
                     <div className="text-xs font-bold text-white/80">PROTÉINE</div>
                     <div className="mt-1 font-bold">Pois chiches</div>
                   </div>
                   <div className="rounded-xl bg-gray-50 p-4">
                     <div className="text-xs font-bold text-gray-400">LÉGUMES</div>
                     <div className="mt-1 font-bold text-[#1a1614]">Courgettes</div>
                   </div>
                 </div>
                 <div className="mt-6 rounded-xl border border-gray-100 p-4">
                   <div className="flex justify-between items-center font-bold">
                     <span>Score Équilibre</span>
                     <span className="text-[#28c840]">86/100</span>
                   </div>
                   <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                     <div className="h-full w-[86%] bg-[#28c840]" />
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personas / Scenarios */}
      <section id="personas" className="px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 md:text-center">
            <h2 className="font-display text-4xl font-black md:text-5xl">La vraie vie.</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="sp-reveal flex flex-col rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#1a1614]/5">
              <div className="mb-4 text-[#ff8d4d] font-bold text-lg">Lina, 21 ans</div>
              <div className="mb-6 font-medium text-[#1a1614]/60 flex-1">Étudiante. Veut manger mieux sans exploser son budget.</div>
              <div className="rounded-xl bg-[#fff7f0] p-4 mb-4">
                <div className="font-bold text-sm mb-1">Riz, œufs marinés, concombre...</div>
              </div>
              <div className="font-bold text-sm text-[#1a1614]">Bénéfice : 4 repas pour moins de 16 €.</div>
            </div>
            
            <div className="sp-reveal flex flex-col rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#1a1614]/5">
              <div className="mb-4 text-[#ff8d4d] font-bold text-lg">Thomas, 34 ans</div>
              <div className="mb-6 font-medium text-[#1a1614]/60 flex-1">Salarié pressé. Éviter la livraison au bureau.</div>
              <div className="rounded-xl bg-[#fff7f0] p-4 mb-4">
                <div className="font-bold text-sm mb-1">Pâtes, poulet froid, pesto...</div>
              </div>
              <div className="font-bold text-sm text-[#1a1614]">Bénéfice : Repas prêts en 12 min le matin.</div>
            </div>

            <div className="sp-reveal flex flex-col rounded-3xl bg-[#1a1614] text-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="mb-4 text-[#ff8d4d] font-bold text-lg">Inès, 28 ans</div>
              <div className="mb-6 font-medium text-white/60 flex-1">Sportive régulière. Assez de protéines sans manger toujours pareil.</div>
              <div className="rounded-xl bg-white/10 p-4 mb-4">
                <div className="font-bold text-sm mb-1">Quinoa, saumon, brocoli...</div>
              </div>
              <div className="font-bold text-sm text-white">Bénéfice : Repas stables sur la semaine.</div>
            </div>

            <div className="sp-reveal flex flex-col rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#1a1614]/5">
              <div className="mb-4 text-[#ff8d4d] font-bold text-lg">Max, 30 ans</div>
              <div className="mb-6 font-medium text-[#1a1614]/60 flex-1">Freelance désorganisé. Arrêter de déjeuner à 15h.</div>
              <div className="rounded-xl bg-[#fff7f0] p-4 mb-4">
                <div className="font-bold text-sm mb-1">Semoule, pois chiches, harissa...</div>
              </div>
              <div className="font-bold text-sm text-[#1a1614]">Bénéfice : Une routine sans planning militaire.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-[#fff7f0] px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="font-display text-4xl font-black md:text-5xl">Le kit complet.</h2>
            <p className="mt-4 font-medium text-[#1a1614]/60 text-lg">Pas juste mignon. Vraiment utile.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="sp-reveal col-span-1 md:col-span-2 rounded-3xl bg-[#ff8d4d] p-8 text-white min-h-[300px] relative overflow-hidden">
              <h3 className="font-display text-2xl font-bold mb-2">Lunchbox 2 compartiments</h3>
              <p className="font-medium text-white/80 max-w-sm">Le séparateur pour garder le croquant en vie.</p>
              {/* Abstract box representation */}
              <div className="absolute right-10 bottom-[-50px] w-64 h-64 bg-white/20 rounded-3xl rotate-12" />
              <div className="absolute right-20 bottom-10 w-48 h-32 bg-white/30 rounded-2xl rotate-12" />
            </div>
            
            <div className="sp-reveal rounded-3xl bg-white border border-[#1a1614]/10 p-8 min-h-[300px]">
              <h3 className="font-display text-2xl font-bold mb-2">Le pot à sauce</h3>
              <p className="font-medium text-[#1a1614]/60">Celui qui évite le drame humide.</p>
              <div className="mt-10 mx-auto w-24 h-24 rounded-full bg-[#1a1614]" />
            </div>

            <div className="sp-reveal rounded-3xl bg-[#1a1614] p-8 text-white min-h-[300px]">
              <h3 className="font-display text-2xl font-bold mb-2">La checklist</h3>
              <p className="font-medium text-white/60">Celle qui pense avant toi.</p>
              <div className="mt-10 space-y-3">
                <div className="h-4 w-3/4 bg-white/20 rounded" />
                <div className="h-4 w-1/2 bg-white/20 rounded" />
                <div className="h-4 w-5/6 bg-white/20 rounded" />
              </div>
            </div>

            <div className="sp-reveal col-span-1 md:col-span-2 rounded-3xl bg-white border border-[#1a1614]/10 p-8 min-h-[300px] relative">
              <h3 className="font-display text-2xl font-bold mb-2">Liste de courses</h3>
              <p className="font-medium text-[#1a1614]/60 max-w-sm">Qui ne te fait pas acheter trois citrons pour rien.</p>
              <div className="absolute right-10 top-1/2 -translate-y-1/2 w-48 bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-lg rotate-[-6deg]">
                <div className="h-3 w-1/2 bg-gray-300 rounded mb-4" />
                <div className="h-3 w-full bg-gray-200 rounded mb-2" />
                <div className="h-3 w-3/4 bg-gray-200 rounded mb-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers */}
      <section id="offres" className="px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 md:text-center">
            <h2 className="font-display text-4xl font-black md:text-5xl">Choisis ton plan de vol.</h2>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {/* Free */}
            <div className="sp-reveal rounded-3xl border border-[#1a1614]/10 bg-white p-8">
              <div className="mb-6 font-display text-2xl font-bold">Free</div>
              <div className="mb-8 font-medium text-[#1a1614]/60 h-12">Pour tester sans engagement.</div>
              <ul className="mb-8 space-y-4 font-medium text-[#1a1614]/80">
                <li>• 3 lunchbox par semaine</li>
                <li>• Liste de courses simple</li>
                <li>• Accès web</li>
              </ul>
              <button className="w-full rounded-full border-2 border-[#1a1614]/10 py-4 font-bold transition-colors hover:bg-gray-50">
                Je teste mon midi
              </button>
            </div>

            {/* Plus */}
            <div className="sp-reveal rounded-3xl border-4 border-[#ff8d4d] bg-white p-8 relative shadow-2xl">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#ff8d4d] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Le plus choisi</div>
              <div className="mb-6 font-display text-2xl font-bold">Plus</div>
              <div className="mb-8 font-medium text-[#1a1614]/60 h-12">Pour s'organiser toute la semaine.</div>
              <ul className="mb-8 space-y-4 font-medium text-[#1a1614]/80">
                <li>• Lunchbox illimitées</li>
                <li>• Contraintes alimentaires</li>
                <li>• Mode budget & anti-gaspi</li>
                <li>• Export mobile</li>
              </ul>
              <button className="w-full rounded-full bg-[#ff8d4d] py-4 font-bold text-white transition-colors hover:bg-[#ffa06b]">
                Je pilote ma semaine
              </button>
            </div>

            {/* Team */}
            <div className="sp-reveal rounded-3xl bg-[#1a1614] text-white p-8">
              <div className="mb-6 font-display text-2xl font-bold">Team</div>
              <div className="mb-8 font-medium text-white/60 h-12">Pour entreprises ou écoles.</div>
              <ul className="mb-8 space-y-4 font-medium text-white/80">
                <li>• Défis repas d'équipe</li>
                <li>• Préférences collectives</li>
                <li>• Reporting anonymisé</li>
                <li>• Kits lunchbox inclus</li>
              </ul>
              <button className="w-full rounded-full bg-white/10 py-4 font-bold text-white transition-colors hover:bg-white/20">
                Organiser l'équipe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-[#1a1614] px-6 py-32 text-center text-white">
        <div className="sp-reveal mx-auto max-w-3xl">
          <h2 className="mb-6 font-display text-4xl font-black md:text-5xl">Teste le cœur du produit.</h2>
          <p className="mb-10 text-lg font-medium text-white/60">
            Le Lunchbox Builder est la démo détaillée de SnackPilot. Il montre comment l'identité de marque s'applique à une vraie interface produit.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/snackpilot/lunchbox-builder"
              className="flex items-center justify-center gap-2 rounded-full bg-[#ff8d4d] px-8 py-4 text-sm font-bold text-white transition-transform hover:scale-105"
            >
              Ouvrir le Lunchbox Builder
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-white/20"
            >
              Revenir en haut
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

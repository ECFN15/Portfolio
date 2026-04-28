import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const tiers = [
  {
    name: 'Landing',
    price: '2 400€',
    timeline: '2 semaines',
    description:
      'Une page conçue comme une affiche : une seule promesse, un seul rythme, un seul objectif.',
    features: [
      'Design sur-mesure (1 page)',
      'Animations GSAP de base',
      'Responsive parfait',
      'Mise en ligne incluse',
      '1 cycle de retours',
    ],
    cta: 'Commencer',
    featured: false,
  },
  {
    name: 'Site complet',
    price: '6 800€',
    timeline: '4 à 6 semaines',
    description:
      'Un site éditorial multi-pages avec une scénographie de scroll cinématique, à l’image des plus belles pièces d’Awwwards.',
    features: [
      'Jusqu’à 6 pages sur-mesure',
      'Scénographie GSAP avancée',
      'Système de design réutilisable',
      'CMS léger (Sanity / Notion)',
      'SEO technique + perfs',
      '3 cycles de retours',
    ],
    cta: 'Choisir cette formule',
    featured: true,
  },
  {
    name: 'Plateforme',
    price: 'Sur devis',
    timeline: '8 semaines+',
    description:
      'Pour les projets complexes : e-commerce premium, SaaS, plateforme éditoriale. Direction technique de bout en bout.',
    features: [
      'Architecture full-stack',
      'WebGL / Three.js si pertinent',
      'CMS structuré',
      'Intégrations API & paiement',
      'Accompagnement post-lancement',
      'Cycles de retours illimités',
    ],
    cta: 'Discuter du projet',
    featured: false,
  },
]

export default function Pricing() {
  const root = useRef(null)

  useGSAP(
    () => {
      const cards = root.current.querySelectorAll('.tier-card')
      gsap.from(cards, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
        },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="pricing" className="relative px-4 py-32 md:px-8 md:py-48">
      {/* Header */}
      <div className="mx-auto mb-20 max-w-7xl md:mb-28">
        <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-bone-50/50">
          <span className="h-px w-8 bg-bone-50/30" />
          <span>Tarifs</span>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <h2 className="font-display text-balance col-span-1 text-5xl font-medium leading-[0.95] tracking-tight md:col-span-7 md:text-7xl">
            Trois formules — <span className="italic text-bone-50/70">une même exigence.</span>
          </h2>
          <p className="font-display col-span-1 max-w-md text-base text-bone-50/60 md:col-span-5 md:ml-auto md:text-lg">
            Des tarifs clairs, sans surprises. Tout est inclus : design, développement, mise en ligne, accompagnement.
          </p>
        </div>
      </div>

      {/* Tier cards — Double-Bezel architecture */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {tiers.map((t) => (
          <Tier key={t.name} {...t} />
        ))}
      </div>

      {/* Footnote */}
      <p className="mx-auto mt-12 max-w-3xl text-center font-mono text-[11px] uppercase tracking-[0.2em] text-bone-50/40">
        Tous les prix sont indicatifs · TVA non applicable, art. 293B du CGI
      </p>
    </section>
  )
}

function Tier({ name, price, timeline, description, features, cta, featured }) {
  return (
    <div
      className={`tier-card rounded-[2rem] border p-1.5 transition-colors duration-700 ease-soft-spring ${
        featured ? 'border-bone-50/30 bg-bone-50/10' : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.07]'
      }`}
    >
      <div
        className={`relative flex h-full flex-col rounded-[calc(2rem-0.375rem)] p-7 inset-highlight md:p-9 ${
          featured ? 'bg-bone-50 text-ink-950' : 'bg-ink-900 text-bone-50'
        }`}
      >
        {/* Tier label */}
        <div className="flex items-center justify-between">
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
              featured ? 'text-ink-950/60' : 'text-bone-50/60'
            }`}
          >
            {name}
          </span>
          {featured && (
            <span className="rounded-full bg-ink-950 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50">
              Recommandé
            </span>
          )}
        </div>

        {/* Price + timeline */}
        <div className="mt-12">
          <div className="font-display text-5xl font-medium leading-none tracking-tight md:text-6xl">
            {price}
          </div>
          <div
            className={`mt-3 font-mono text-[11px] uppercase tracking-[0.2em] ${
              featured ? 'text-ink-950/50' : 'text-bone-50/50'
            }`}
          >
            Délai · {timeline}
          </div>
        </div>

        {/* Description */}
        <p
          className={`mt-8 max-w-sm text-pretty font-display text-base ${
            featured ? 'text-ink-950/75' : 'text-bone-50/70'
          }`}
        >
          {description}
        </p>

        {/* Divider */}
        <div className={`my-8 h-px w-full ${featured ? 'bg-ink-950/15' : 'bg-white/10'}`} />

        {/* Features */}
        <ul className="flex flex-1 flex-col gap-3">
          {features.map((f) => (
            <li
              key={f}
              className={`flex items-start gap-3 font-display text-sm md:text-base ${
                featured ? 'text-ink-950/85' : 'text-bone-50/85'
              }`}
            >
              <span
                className={`mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${
                  featured ? 'bg-ink-950 text-bone-50' : 'bg-bone-50/15 text-bone-50'
                }`}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                  <path d="M1.5 4L3.5 6L7 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="mailto:hello@atelier.studio"
          className={`group mt-10 flex items-center justify-between rounded-full py-3 pl-6 pr-2 transition-transform duration-500 ease-soft-spring active:scale-[0.98] ${
            featured ? 'bg-ink-950 text-bone-50' : 'bg-bone-50 text-ink-950'
          }`}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-medium">{cta}</span>
          <span
            className={`grid h-9 w-9 place-items-center rounded-full transition-all duration-500 ease-soft-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
              featured ? 'bg-bone-50 text-ink-950' : 'bg-ink-950 text-bone-50'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  )
}

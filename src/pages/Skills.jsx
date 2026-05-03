import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { findSkill, skills } from '../data/skills.js'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const layout = [
  { span: 'md:col-span-6 xl:col-span-5', ratio: 'min-h-[360px]' },
  { span: 'md:col-span-6 xl:col-span-4', ratio: 'min-h-[360px]' },
  { span: 'md:col-span-12 xl:col-span-3', ratio: 'min-h-[360px]' },
  { span: 'md:col-span-5 xl:col-span-4', ratio: 'min-h-[320px]' },
  { span: 'md:col-span-7 xl:col-span-5', ratio: 'min-h-[320px]' },
  { span: 'md:col-span-12 xl:col-span-3', ratio: 'min-h-[320px]' },
]

export default function Skills() {
  const root = useRef(null)
  const overviewSkill = findSkill('high-end-visual-design') ?? skills[0]

  useGSAP(
    () => {
      gsap.from(root.current.querySelectorAll('.skills-reveal'), {
        y: 44,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.06,
      })

      root.current.querySelectorAll('.skill-card').forEach((card) => {
        gsap.from(card, {
          y: 72,
          opacity: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative isolate min-h-[100dvh] overflow-hidden px-4 pb-28 pt-36 md:px-8 md:pb-40 md:pt-44">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh-ember opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-white/[0.035] blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="skills-reveal mb-12 flex flex-col items-start justify-between gap-8 md:mb-16 md:flex-row md:items-end">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/60">
              <span className="h-1.5 w-1.5 rounded-full bg-bone-50" />
              Skills library
            </div>
            <h1 className="font-display text-balance text-6xl font-medium leading-[0.88] tracking-tight text-bone-50 md:text-8xl">
              Les skills deviennent des studios de demo.
            </h1>
          </div>

          <div className="max-w-sm">
            <p className="font-display text-pretty text-base leading-relaxed text-bone-50/60 md:text-lg">
              Une architecture de cartes inspiree de Travaux, pensee pour selectionner un skill puis y injecter sa demo interactive.
            </p>
            <div className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-50/50">
              <span>{String(skills.length).padStart(2, '0')} skills actifs</span>
              <span className="h-px w-8 bg-white/20" />
              <span>demo-ready</span>
            </div>
          </div>
        </div>

        <div className="skills-reveal mb-16 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          <SkillDemoPanel skill={overviewSkill} />
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-1.5 lg:col-span-4">
            <div className="flex h-full min-h-[360px] flex-col justify-between overflow-hidden rounded-[calc(2rem-0.375rem)] bg-ink-900 p-6 inset-highlight md:p-7">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/50">Mode galerie</span>
                <h2 className="mt-4 font-display text-3xl font-medium leading-none tracking-tight text-bone-50">
                  Chaque carte ouvre sa propre page.
                </h2>
              </div>
              <div className="space-y-4 text-sm leading-relaxed text-bone-50/60">
                <p>
                  La galerie reste propre : elle presente les skills sans garder une demo ouverte au-dessus des cartes.
                </p>
                <p>
                  Clique une carte pour entrer dans sa scene dediee, puis reviens ici avec le bouton retour.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {skills.map((skill, index) => {
            const config = layout[index % layout.length]
            return (
              <SkillCard
                key={skill.slug}
                skill={skill}
                index={index}
                selected={false}
                {...config}
              />
            )
          })}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-50/50">
            Index complet - {String(skills.length).padStart(2, '0')} / {String(skills.length).padStart(2, '0')}
          </span>
          <Link
            to="/"
            className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.045] py-2.5 pl-5 pr-1.5 text-bone-50 transition-all duration-700 ease-soft-spring hover:bg-white/[0.08] active:scale-[0.98]"
          >
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em]">Retour aux travaux</span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-bone-50 text-ink-950 transition-all duration-700 ease-soft-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
              <ArrowUpRight />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function SkillDemoPage() {
  const root = useRef(null)
  const { slug } = useParams()
  const skill = findSkill(slug)

  useGSAP(
    () => {
      gsap.from(root.current.querySelectorAll('.demo-reveal'), {
        y: 36,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 1,
        ease: 'expo.out',
        stagger: 0.08,
      })
    },
    { scope: root },
  )

  if (!skill) {
    return (
      <section ref={root} className="relative isolate min-h-[100dvh] px-4 py-36 md:px-8 md:py-44">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-1.5">
          <div className="rounded-[calc(2rem-0.375rem)] bg-ink-900 p-8 inset-highlight md:p-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/50">Skill introuvable</span>
            <h1 className="mt-5 font-display text-5xl font-medium leading-none tracking-tight text-bone-50">Cette demo n'existe pas encore.</h1>
            <Link
              to="/skills"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-bone-50 py-2.5 pl-5 pr-1.5 text-ink-950 transition-transform duration-500 ease-soft-spring active:scale-[0.98]"
            >
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]">Retour aux skills</span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink-950 text-bone-50 transition-all duration-500 ease-soft-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight />
              </span>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={root} className="relative isolate min-h-[100dvh] overflow-hidden px-4 pb-28 pt-36 md:px-8 md:pb-40 md:pt-44">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh-ember opacity-50" />
      <div className="mx-auto max-w-7xl">
        <div className="demo-reveal mb-10 flex flex-col items-start justify-between gap-6 md:mb-12 md:flex-row md:items-end">
          <div>
            <Link
              to="/skills"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.045] py-2 pl-2 pr-4 text-bone-50 transition-all duration-500 ease-soft-spring hover:bg-white/[0.08] active:scale-[0.98]"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-bone-50 text-ink-950 transition-all duration-500 ease-soft-spring group-hover:-translate-x-0.5">
                <ArrowLeft />
              </span>
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]">Retour aux skills</span>
            </Link>
            <h1 className="mt-8 max-w-4xl font-display text-6xl font-medium leading-[0.88] tracking-tight text-bone-50 md:text-8xl">
              {skill.title}
            </h1>
          </div>
          <div className="max-w-md">
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-50/60">
              {skill.family}
            </span>
            <p className="mt-5 text-pretty font-display text-base leading-relaxed text-bone-50/60 md:text-lg">
              {skill.description}
            </p>
            {skill.slug === 'clean-saas' && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/skills/clean-saas/vitrine"
                  className="group inline-flex items-center gap-2 rounded-full bg-bone-50 py-2.5 pl-5 pr-1.5 text-ink-950 transition-all duration-700 ease-soft-spring hover:bg-white active:scale-[0.98]"
                >
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]">Voir le site</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-ink-950 text-bone-50 transition-all duration-700 ease-soft-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
                    <ArrowUpRight />
                  </span>
                </Link>
                <Link
                  to="/skills/clean-saas/dashboard"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] py-2.5 pl-5 pr-1.5 text-bone-50 transition-all duration-700 ease-soft-spring hover:bg-white/[0.12] active:scale-[0.98]"
                >
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]">Dashboard</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-bone-50 transition-all duration-700 ease-soft-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight />
                  </span>
                </Link>
              </div>
            )}
            {skill.slug === 'cyber-neon' && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/skills/cyber-neon/landing"
                  className="group inline-flex items-center gap-2 rounded-full bg-bone-50 py-2.5 pl-5 pr-1.5 text-ink-950 transition-all duration-700 ease-soft-spring hover:bg-white active:scale-[0.98]"
                >
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]">Voir la landing</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-ink-950 text-bone-50 transition-all duration-700 ease-soft-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
                    <ArrowUpRight />
                  </span>
                </Link>
                <Link
                  to="/skills/cyber-neon/map"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] py-2.5 pl-5 pr-1.5 text-bone-50 transition-all duration-700 ease-soft-spring hover:bg-white/[0.12] active:scale-[0.98]"
                >
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]">Live Map</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-bone-50 transition-all duration-700 ease-soft-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight />
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="demo-reveal grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          <SkillDemoPanel skill={skill} />
          {!['clean-saas', 'cyber-neon', 'dark-ui'].includes(skill.slug) && (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-1.5 lg:col-span-4">
              <div className="flex h-full min-h-[360px] flex-col justify-between overflow-hidden rounded-[calc(2rem-0.375rem)] bg-ink-900 p-6 inset-highlight md:p-7">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/50">Demo a creer</span>
                  <h2 className="mt-4 font-display text-3xl font-medium leading-none tracking-tight text-bone-50">
                    Cette page est prete pour son interface.
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-bone-50/60">
                  Le prochain passage pourra remplir cette scene avec le plein potentiel du skill {skill.slug}.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function SkillDemoPanel({ skill }) {
  if (skill.slug === 'clean-saas') {
    return <CleanSaasDemo skill={skill} />
  }

  if (skill.slug === 'cyber-neon') {
    return <CyberNeonDemo skill={skill} />
  }

  if (skill.slug === 'dark-ui') {
    return <DarkUIDemo skill={skill} />
  }

  return (
    <div className="rounded-[2.4rem] border border-white/10 bg-white/[0.045] p-1.5 lg:col-span-8">
      <div className="relative min-h-[460px] overflow-hidden rounded-[calc(2.4rem-0.375rem)] bg-ink-900 inset-highlight">
        <div
          className="absolute -right-28 -top-28 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ backgroundColor: skill.accent }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.10),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.06),transparent_45%)]" />

        <div className="relative flex min-h-[460px] flex-col justify-between p-6 md:p-9">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-50/50">Skill selectionne</span>
              <h2 className="mt-5 max-w-2xl font-display text-5xl font-medium leading-[0.92] tracking-tight text-bone-50 md:text-7xl">
                {skill.title}
              </h2>
              <p className="mt-5 max-w-xl font-display text-lg leading-relaxed text-bone-50/60">
                {skill.description}
              </p>
            </div>
            <div className="flex shrink-0 items-start gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-50/60">
                {skill.family}
              </span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-50/40">Demo bay</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: skill.accent }} />
                </span>
              </div>
              <div className="grid min-h-[138px] place-items-center rounded-[1rem] border border-dashed border-white/12 bg-white/[0.03] p-6 text-center">
                <p className="max-w-sm font-display text-xl leading-tight text-bone-50/70">
                  Slot pret pour generer une interface demo avec le skill <span className="text-bone-50">{skill.slug}</span>.
                </p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-50/40">Prompt de depart</span>
              <p className="mt-4 font-mono text-xs leading-relaxed text-bone-50/60">
                Utilise le skill {skill.slug} pour creer une demo interactive qui montre sa puissance dans cette page.
              </p>
              <div className="mt-6 h-px bg-white/10" />
              <p className="mt-5 font-display text-sm leading-relaxed text-bone-50/50">{skill.tone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CleanSaasDemo({ skill }) {
  return (
    <div className="rounded-[2.4rem] border border-white/10 bg-white/[0.045] p-1.5 lg:col-span-12">
      {/* Browser chrome */}
      <div className="overflow-hidden rounded-[calc(2.4rem-0.375rem)] bg-[#f7f6f5] shadow-[0_32px_90px_rgba(0,0,0,0.28)]">
        {/* Chrome bar */}
        <div className="flex items-center gap-3 border-b border-[#e7e5e4] bg-[#f3f2f0] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-lg bg-white/80 px-3 py-1.5 ring-1 ring-[#e7e5e4]">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="shrink-0 text-[#a8a29e]"><path d="M11 11L8.2 8.2M9.5 5.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            <span className="font-mono text-[11px] text-[#79716b]">localhost:5174/skills/clean-saas/dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/skills/clean-saas/vitrine"
              className="flex items-center gap-1.5 rounded-full border border-[#e7e5e4] bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#79716b] transition-colors hover:text-[#615fff]"
            >
              Vitrine
            </Link>
            <Link
              to="/skills/clean-saas/dashboard"
              className="flex items-center gap-1.5 rounded-full bg-[#615fff] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] font-semibold text-white shadow-[0_4px_12px_rgba(97,95,255,0.3)] transition-colors hover:bg-[#4f39f6]"
            >
              Ouvrir ↗
            </Link>
          </div>
        </div>

        {/* iframe preview — scaled to fit */}
        <div className="relative w-full overflow-hidden" style={{ height: '68vh' }}>
          <iframe
            src="/skills/clean-saas/dashboard"
            title="Bâtiflow Dashboard Preview"
            className="absolute left-0 top-0 origin-top-left"
            style={{
              width: '1440px',
              height: '900px',
              transform: 'scale(var(--dash-scale, 0.72))',
              transformOrigin: 'top left',
              border: 'none',
              pointerEvents: 'none',
            }}
            onLoad={(e) => {
              const container = e.target.parentElement
              const scale = container.offsetWidth / 1440
              e.target.style.setProperty('--dash-scale', scale)
              e.target.style.transform = `scale(${scale})`
              container.style.height = `${900 * scale}px`
            }}
          />
        </div>
      </div>
    </div>
  )
}

function CyberNeonDemo() {
  return (
    <div className="rounded-[2.4rem] border border-white/10 bg-white/[0.045] p-1.5 lg:col-span-12">
      {/* Dark browser chrome */}
      <div className="overflow-hidden rounded-[calc(2.4rem-0.375rem)] bg-[#000000] shadow-[0_32px_90px_rgba(155,92,255,0.22)]">
        {/* Chrome bar */}
        <div className="flex items-center gap-3 border-b border-[rgba(174,133,255,0.18)] bg-[#090911] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-[rgba(174,133,255,0.2)] bg-[rgba(255,255,255,0.04)] px-3 py-1.5">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="shrink-0 text-[#a9a3c7]">
              <path d="M11 11L8.2 8.2M9.5 5.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span className="font-mono text-[11px] text-[#a9a3c7]">localhost:5173/skills/cyber-neon/landing</span>
          </div>
          <Link
            to="/skills/cyber-neon/landing"
            className="flex items-center gap-1.5 rounded-full bg-[#9b5cff] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_0_12px_rgba(155,92,255,0.45)] transition-all hover:shadow-[0_0_22px_rgba(155,92,255,0.65)]"
          >
            Ouvrir ↗
          </Link>
        </div>

        {/* iframe preview */}
        <div className="relative w-full overflow-hidden" style={{ height: '68vh' }}>
          <iframe
            src="/skills/cyber-neon/landing"
            title="NIGHTGRID Landing Page Preview"
            className="absolute left-0 top-0 origin-top-left"
            style={{
              width: '1440px',
              height: '900px',
              transform: 'scale(var(--ng-scale, 0.72))',
              transformOrigin: 'top left',
              border: 'none',
              pointerEvents: 'none',
            }}
            onLoad={(e) => {
              const container = e.target.parentElement
              const scale = container.offsetWidth / 1440
              e.target.style.setProperty('--ng-scale', scale)
              e.target.style.transform = `scale(${scale})`
              container.style.height = `${900 * scale}px`
            }}
          />
        </div>
      </div>
    </div>
  )
}

function DarkUIDemo({ skill }) {
  const incidentRows = [
    { node: 'Vision model', event: 'Latency drift', priority: 'P1', owner: 'Rhea', age: '04m', state: 'Investigating', color: '#ffa16c' },
    { node: 'Policy router', event: 'Prompt variance', priority: 'P2', owner: 'Mael', age: '18m', state: 'Contained', color: '#479ffa' },
    { node: 'Vector cache', event: 'Index cooling', priority: 'P3', owner: 'Iris', age: '42m', state: 'Watching', color: '#4ebe96' },
  ]

  const telemetry = [
    { label: 'Inference health', value: '99.74%', change: '+0.08', color: '#4ebe96' },
    { label: 'Median response', value: '184ms', change: '-12ms', color: '#479ffa' },
    { label: 'Unreviewed flags', value: '07', change: '2 critical', color: '#ffa16c' },
  ]

  const sequence = [
    ['01', 'Collect traces', 'Complete'],
    ['02', 'Cluster anomalies', 'Active'],
    ['03', 'Route owner', 'Ready'],
    ['04', 'Write incident memo', 'Queued'],
  ]

  return (
    <div className="rounded-[2.4rem] border border-white/10 bg-white/[0.045] p-1.5 lg:col-span-12">
      <div className="relative overflow-hidden rounded-[calc(2.4rem-0.375rem)] bg-[#0b0b0b] text-[#e6e6e6]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(71,159,250,0.22),transparent_31%),radial-gradient(circle_at_86%_18%,rgba(255,161,108,0.14),transparent_29%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_46%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:56px_56px]" />

        <div className="relative border-b border-[#23262b] bg-[#0b0b0b]/90 px-5 py-4 md:px-7">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-[#30343a] bg-[#131313] font-mono text-xs font-semibold text-white">
                OS
              </span>
              <div>
                <p className="font-display text-sm font-semibold leading-none text-white">Orion Sentinel</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[#868f97]">AI reliability observatory</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {['Overview', 'Incidents', 'Models', 'Audit'].map((item, index) => (
                <button
                  key={item}
                  type="button"
                  className={`rounded-full border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-200 ease-soft-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#479ffa] ${
                    index === 0
                      ? 'border-[#479ffa] bg-[#479ffa] text-[#050608]'
                      : 'border-white/10 bg-white/[0.035] text-[#a3a3a4] hover:border-white/20 hover:bg-white/[0.07] hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b0b0b] transition-transform duration-200 ease-soft-spring hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#479ffa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0b]"
            >
              Start review
              <ArrowUpRight />
            </button>
          </div>
        </div>

        <div className="relative grid gap-5 p-5 md:p-7 xl:grid-cols-[0.88fr_1.42fr]">
          <div className="flex min-h-[460px] flex-col justify-between overflow-hidden rounded-2xl border border-[#23262b] bg-[#101114] p-6 md:p-8">
            <div>
              <span className="inline-flex rounded-full border border-[rgba(71,159,250,0.35)] bg-[#479ffa]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#9ccfff]">
                {skill.slug} demo
              </span>
              <h2 className="mt-6 max-w-xl font-display text-5xl font-semibold leading-[0.9] text-white md:text-7xl">
                Calm command for unstable systems.
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-[#a3a3a4]">
                A premium dark control room for AI teams that need layered surfaces, legible states, and one unmistakable action path.
              </p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
              {telemetry.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-[#191919] p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="text-xs leading-5 text-[#868f97]">{item.label}</p>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  </div>
                  <p className="font-mono text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: item.color }}>
                    {item.change}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#23262b] bg-[#131313] p-4 md:p-5">
            <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-display text-2xl font-semibold text-white">Incident board</p>
                <p className="mt-1 text-sm leading-6 text-[#868f97]">Readable operations evidence on separated near-black surfaces.</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0b0b0b] p-1">
                <span className="rounded-full bg-[#0c2a20] px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#72d8ad]">Stable</span>
                <span className="px-3 py-1.5 font-mono text-[11px] text-[#868f97]">3 open</span>
              </div>
            </div>

            <div className="grid gap-3">
              {incidentRows.map((row) => (
                <div key={row.node} className="grid gap-3 rounded-2xl border border-white/10 bg-[#0f1012] p-4 transition-colors duration-200 ease-soft-spring hover:border-[rgba(71,159,250,0.45)] hover:bg-[#15171b] md:grid-cols-[1.05fr_1fr_0.45fr_0.55fr_0.72fr] md:items-center">
                  <div>
                    <p className="font-display text-sm font-semibold text-white">{row.node}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[#6f7884]">trace verified</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#868f97]">Event</p>
                    <p className="mt-1 text-sm font-semibold text-[#e6e6e6]">{row.event}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#868f97]">Age</p>
                    <p className="mt-1 font-mono text-sm font-semibold text-white">{row.age}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#868f97]">Owner</p>
                    <p className="mt-1 text-sm font-semibold text-white">{row.owner}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 md:justify-end">
                    <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-[#cccccc]">{row.state}</span>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: row.color }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-3 lg:grid-cols-[0.95fr_1fr]">
              <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-display text-base font-semibold text-white">Response curve</p>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#479ffa]">Live</span>
                </div>
                <div className="flex h-32 items-end gap-2 rounded-xl border border-white/10 bg-[#111216] p-3">
                  {['46%', '62%', '38%', '72%', '58%', '86%', '68%', '92%'].map((height, index) => (
                    <span
                      key={`${height}-${index}`}
                      className="w-full rounded-sm bg-[#479ffa]/75"
                      style={{ height }}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-display text-base font-semibold text-white">Review sequence</p>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#868f97]">ETA 08m</span>
                </div>
                <div className="grid gap-2">
                  {sequence.map(([number, label, state], index) => (
                    <div key={label} className="flex items-center gap-3 rounded-xl bg-[#151515] px-3 py-3 ring-1 ring-white/10">
                      <span className={`grid h-7 w-7 place-items-center rounded-full font-mono text-[11px] ${index === 1 ? 'bg-[#479ffa] text-[#050608]' : 'bg-white/[0.06] text-[#999999]'}`}>
                        {number}
                      </span>
                      <span className="min-w-0 flex-1 text-sm font-medium text-[#cccccc]">{label}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#868f97]">{state}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative grid gap-5 px-5 pb-5 md:px-7 md:pb-7 xl:grid-cols-[0.8fr_1.1fr_1fr]">
          <div className="rounded-2xl border border-[#23262b] bg-[#101114] p-5">
            <p className="font-display text-lg font-semibold text-white">Accent contract</p>
            <div className="mt-5 grid gap-3">
              {[
                ['Action', 'Blue is only for active selection, progress, and focus.', '#479ffa'],
                ['Attention', 'Amber marks risk and handoff friction.', '#ffa16c'],
                ['Success', 'Green confirms completed stabilization.', '#4ebe96'],
              ].map(([label, copy, color]) => (
                <div key={label} className="flex gap-3 rounded-xl border border-white/10 bg-[#191919] p-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                  <div>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white">{label}</p>
                    <p className="mt-1 text-xs leading-5 text-[#868f97]">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#23262b] bg-[#101114] p-5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-display text-lg font-semibold text-white">Control states</p>
                <p className="mt-1 text-sm text-[#868f97]">Default, selected, disabled, loading, error, empty.</p>
              </div>
              <span className="rounded-full border border-[rgba(71,159,250,0.35)] bg-[#479ffa]/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[#9ccfff]">AA ready</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button type="button" className="rounded-full bg-[#479ffa] px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#050608] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Selected route
              </button>
              <button type="button" className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#cccccc] hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#479ffa]">
                Ghost control
              </button>
              <button type="button" disabled className="rounded-full border border-white/5 bg-white/[0.025] px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5b626b]">
                Disabled
              </button>
              <div className="rounded-full border border-[#ffa16c]/30 bg-[#ffa16c]/10 px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#ffc49f]">
                Error pending
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#23262b] bg-[#101114] p-5">
            <p className="font-display text-lg font-semibold text-white">Empty state</p>
            <div className="mt-5 grid min-h-48 place-items-center rounded-2xl border border-dashed border-white/12 bg-[#0b0b0b] p-5 text-center">
              <div>
                <span className="mx-auto block h-2 w-16 rounded-full bg-[#4ebe96]" />
                <p className="mt-5 font-display text-xl font-semibold text-white">No silent failures</p>
                <p className="mt-2 text-sm leading-6 text-[#868f97]">The system keeps the calm surface even when there is nothing urgent to inspect.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-[#23262b] bg-[#0b0b0b]/95 px-5 py-4 md:px-7">
          <div className="flex flex-col gap-3 text-sm text-[#868f97] md:flex-row md:items-center md:justify-between">
            <span>Surface contract: #0b0b0b canvas, #101114 panels, #191919 data cards, blue action, amber risk.</span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#479ffa]">{skill.slug} / observatory demo</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function SkillCard({ skill, index, span, ratio, selected }) {
  return (
    <Link
      to={`/skills/${skill.slug}`}
      className={`skill-card group col-span-1 ${span} block text-left focus:outline-none focus-visible:outline-none`}
      style={{ '--skill-accent': skill.accent }}
    >
      <div
        className={`h-full rounded-[2rem] border p-1.5 transition-all duration-700 ease-soft-spring ${
          selected ? 'border-white/10 bg-white/[0.08]' : 'border-white/10 bg-white/[0.035] hover:bg-white/[0.06]'
        }`}
      >
        <div className={`relative flex h-full ${ratio} overflow-hidden rounded-[calc(2rem-0.375rem)] bg-ink-900 p-6 inset-highlight md:p-7`}>
          <div className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-soft-spring group-hover:opacity-100">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[var(--skill-accent)] opacity-20 blur-3xl" />
          </div>

          <div className="relative flex w-full flex-col justify-between">
            <div className="flex items-start justify-between gap-5">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-50/40">
                  {String(index + 1).padStart(2, '0')} - {skill.family}
                </span>
                <h3 className="mt-5 font-display text-4xl font-medium leading-[0.92] tracking-tight text-bone-50 md:text-5xl">
                  {skill.title}
                </h3>
              </div>
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink-950 transition-all duration-700 ease-soft-spring group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-105"
                style={{ backgroundColor: skill.accent }}
              >
                <ArrowUpRight />
              </span>
            </div>

            <div>
              <p className="max-w-xl text-pretty font-display text-base leading-relaxed text-bone-50/60">{skill.description}</p>
              <div className="mt-7 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-50/40">{skill.tone}</span>
                <span
                  className={`h-2 w-2 shrink-0 rounded-full transition-transform duration-700 ease-soft-spring ${
                    selected ? 'scale-125' : 'scale-100'
                  }`}
                  style={{ backgroundColor: skill.accent }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9.5 3.5L6 7L9.5 10.5M6.5 7H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

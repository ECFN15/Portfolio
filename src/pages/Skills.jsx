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
            {skill.slug === 'dark-ui' && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/skills/dark-ui/triage"
                  className="group inline-flex items-center gap-2 rounded-full bg-bone-50 py-2.5 pl-5 pr-1.5 text-ink-950 transition-all duration-700 ease-soft-spring hover:bg-white active:scale-[0.98]"
                >
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]">AI Triage Panel</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-ink-950 text-bone-50 transition-all duration-700 ease-soft-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
                    <ArrowUpRight />
                  </span>
                </Link>
                <Link
                  to="/skills/dark-ui/incident"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] py-2.5 pl-5 pr-1.5 text-bone-50 transition-all duration-700 ease-soft-spring hover:bg-white/[0.12] active:scale-[0.98]"
                >
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]">Incident Workspace</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-bone-50 transition-all duration-700 ease-soft-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight />
                  </span>
                </Link>
              </div>
            )}
            {skill.slug === 'editorial-minimal' && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/skills/editorial-minimal/index"
                  className="group inline-flex items-center gap-2 rounded-full bg-bone-50 py-2.5 pl-5 pr-1.5 text-ink-950 transition-all duration-700 ease-soft-spring hover:bg-white active:scale-[0.98]"
                >
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]">The Quiet City Index</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-ink-950 text-bone-50 transition-all duration-700 ease-soft-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
                    <ArrowUpRight />
                  </span>
                </Link>
                <Link
                  to="/skills/editorial-minimal/chapter"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] py-2.5 pl-5 pr-1.5 text-bone-50 transition-all duration-700 ease-soft-spring hover:bg-white/[0.12] active:scale-[0.98]"
                >
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]">Read Chapter</span>
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
          {!['clean-saas', 'cyber-neon', 'dark-ui', 'editorial-minimal'].includes(skill.slug) && (
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

  if (skill.slug === 'editorial-minimal') {
    return <EditorialMinimalDemo skill={skill} />
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
            <span className="font-mono text-[11px] text-[#a9a3c7]">localhost:5173/skills/cyber-neon/map</span>
          </div>
          <Link
            to="/skills/cyber-neon/map"
            className="flex items-center gap-1.5 rounded-full bg-[#9b5cff] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_0_12px_rgba(155,92,255,0.45)] transition-all hover:shadow-[0_0_22px_rgba(155,92,255,0.65)]"
          >
            Ouvrir ↗
          </Link>
        </div>

        {/* iframe preview */}
        <div className="relative w-full overflow-hidden" style={{ height: '68vh' }}>
          <iframe
            src="/skills/cyber-neon/map"
            title="NIGHTGRID Live Map Preview"
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

function DarkUIDemo() {
  return (
    <div className="rounded-[2.4rem] border border-white/10 bg-white/[0.045] p-1.5 lg:col-span-12">
      {/* Dark browser chrome */}
      <div className="overflow-hidden rounded-[calc(2.4rem-0.375rem)] bg-[#0a0a0b] shadow-[0_32px_90px_rgba(106,167,255,0.22)]">
        {/* Chrome bar */}
        <div className="flex items-center gap-3 border-b border-[#23262b] bg-[#111113] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-[#23262b] bg-[#1a1a1c] px-3 py-1.5">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="shrink-0 text-[#868f97]">
              <path d="M11 11L8.2 8.2M9.5 5.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span className="font-mono text-[11px] text-[#868f97]">localhost:5173/skills/dark-ui/triage</span>
          </div>
          <Link
            to="/skills/dark-ui/triage"
            className="flex items-center gap-1.5 rounded-full bg-[#6aa7ff] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#0a0a0b] shadow-[0_0_12px_rgba(106,167,255,0.45)] transition-all hover:shadow-[0_0_22px_rgba(106,167,255,0.65)]"
          >
            Ouvrir ↗
          </Link>
        </div>

        {/* iframe preview */}
        <div className="relative w-full overflow-hidden" style={{ height: '68vh' }}>
          <iframe
            src="/skills/dark-ui/triage"
            title="CALDERA AI Triage Panel"
            className="absolute left-0 top-0 origin-top-left"
            style={{
              width: '1440px',
              height: '900px',
              transform: 'scale(var(--caldera-scale, 0.72))',
              transformOrigin: 'top left',
              border: 'none',
              pointerEvents: 'none',
            }}
            onLoad={(e) => {
              const container = e.target.parentElement
              const scale = container.offsetWidth / 1440
              e.target.style.setProperty('--caldera-scale', scale)
              e.target.style.transform = `scale(${scale})`
              container.style.height = `${900 * scale}px`
            }}
          />
        </div>
      </div>
    </div>
  )
}

function EditorialMinimalDemo() {
  return (
    <div className="rounded-[2.4rem] border border-white/10 bg-white/[0.045] p-1.5 lg:col-span-12">
      {/* Light browser chrome for editorial */}
      <div className="overflow-hidden rounded-[calc(2.4rem-0.375rem)] bg-[#faf9f5] shadow-[0_32px_90px_rgba(0,0,0,0.12)]">
        {/* Chrome bar */}
        <div className="flex items-center gap-3 border-b border-[#d1cfc5] bg-[#f0eee6] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-[#d1cfc5] bg-[#faf9f5] px-3 py-1.5">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="shrink-0 text-[#87867f]">
              <path d="M11 11L8.2 8.2M9.5 5.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span className="font-mono text-[11px] text-[#87867f]">localhost:5173/skills/editorial-minimal</span>
          </div>
          <Link
            to="/skills/editorial-minimal/index"
            className="flex items-center gap-1.5 rounded-full bg-[#141413] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#e8e6dc] shadow-[0_0_12px_rgba(0,0,0,0.15)] transition-all hover:shadow-[0_0_22px_rgba(0,0,0,0.25)]"
          >
            Ouvrir ↗
          </Link>
        </div>

        {/* iframe preview */}
        <div className="relative w-full overflow-hidden" style={{ height: '68vh' }}>
          <iframe
            src="/skills/editorial-minimal/chapter"
            title="FIELDWORK — Rooms Without Doors"
            className="absolute left-0 top-0 origin-top-left"
            style={{
              width: '1440px',
              height: '900px',
              transform: 'scale(var(--editorial-scale, 0.72))',
              transformOrigin: 'top left',
              border: 'none',
              pointerEvents: 'none',
            }}
            onLoad={(e) => {
              const container = e.target.parentElement
              const scale = container.offsetWidth / 1440
              e.target.style.setProperty('--editorial-scale', scale)
              e.target.style.transform = `scale(${scale})`
              container.style.height = `${900 * scale}px`
            }}
          />
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

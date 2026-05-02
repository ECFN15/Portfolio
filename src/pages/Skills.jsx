import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills } from '../data/skills.js'

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
  const [selectedSlug, setSelectedSlug] = useState('high-end-visual-design')
  const selected = useMemo(
    () => skills.find((skill) => skill.slug === selectedSlug) ?? skills[0],
    [selectedSlug],
  )

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
            <p className="font-display text-pretty text-base leading-relaxed text-bone-50/62 md:text-lg">
              Une architecture de cartes inspiree de Travaux, pensee pour selectionner un skill puis y injecter sa demo interactive.
            </p>
            <div className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-50/45">
              <span>{String(skills.length).padStart(2, '0')} skills actifs</span>
              <span className="h-px w-8 bg-white/20" />
              <span>demo-ready</span>
            </div>
          </div>
        </div>

        <div className="skills-reveal mb-16 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          <SkillDemoPanel skill={selected} />
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-1.5 lg:col-span-4">
            <div className="flex h-full min-h-[360px] flex-col justify-between overflow-hidden rounded-[calc(2rem-0.375rem)] bg-ink-900 p-6 inset-highlight md:p-7">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/45">Prochain geste</span>
                <h2 className="mt-4 font-display text-3xl font-medium leading-none tracking-tight text-bone-50">
                  Chaque carte est une future scene.
                </h2>
              </div>
              <div className="space-y-4 text-sm leading-relaxed text-bone-50/58">
                <p>
                  Le clic ne lance pas encore de generation automatique : il prepare le contexte visuel et le slot de demo pour le skill choisi.
                </p>
                <p>
                  Plus tard, tu pourras demander au chat de remplir ce slot avec une interface propre a chaque skill.
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
                selected={skill.slug === selected.slug}
                onSelect={() => setSelectedSlug(skill.slug)}
                {...config}
              />
            )
          })}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-50/45">
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

function SkillDemoPanel({ skill }) {
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
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-50/48">Skill selectionne</span>
              <h2 className="mt-5 max-w-2xl font-display text-5xl font-medium leading-[0.92] tracking-tight text-bone-50 md:text-7xl">
                {skill.title}
              </h2>
              <p className="mt-5 max-w-xl font-display text-lg leading-relaxed text-bone-50/62">
                {skill.description}
              </p>
            </div>
            <div className="flex shrink-0 items-start gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-50/58">
                {skill.family}
              </span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-50/42">Demo bay</span>
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
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-50/42">Prompt de depart</span>
              <p className="mt-4 font-mono text-xs leading-relaxed text-bone-50/62">
                Utilise le skill {skill.slug} pour creer une demo interactive qui montre sa puissance dans cette page.
              </p>
              <div className="mt-6 h-px bg-white/10" />
              <p className="mt-5 font-display text-sm leading-relaxed text-bone-50/52">{skill.tone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SkillCard({ skill, index, span, ratio, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`skill-card group col-span-1 ${span} text-left focus:outline-none focus-visible:outline-none`}
      style={{ '--skill-accent': skill.accent }}
    >
      <div
        className={`h-full rounded-[2rem] border p-1.5 transition-all duration-700 ease-soft-spring ${
          selected ? 'border-white/10 bg-white/[0.08]' : 'border-white/10 bg-white/[0.035] hover:bg-white/[0.06]'
        }`}
      >
        <div className={`relative flex h-full ${ratio} overflow-hidden rounded-[calc(2rem-0.375rem)] bg-ink-900 p-6 inset-highlight md:p-7`}>
          <div className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-soft-spring group-hover:opacity-100">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[var(--skill-accent)] opacity-22 blur-3xl" />
          </div>

          <div className="relative flex w-full flex-col justify-between">
            <div className="flex items-start justify-between gap-5">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-50/42">
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
              <p className="max-w-xl text-pretty font-display text-base leading-relaxed text-bone-50/58">{skill.description}</p>
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
    </button>
  )
}

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

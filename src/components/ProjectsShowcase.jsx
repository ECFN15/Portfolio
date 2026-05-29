import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects.js'
import { useProjectImageOverrides } from '../data/projectImageOverrides.js'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function ProjectsShowcase() {
  const root = useRef(null)
  const imageOverrides = useProjectImageOverrides()

  useGSAP(
    () => {
      const cards = root.current.querySelectorAll('.proj-card')
      cards.forEach((card) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
        })
      })

      const titleWords = root.current.querySelectorAll('.title-word')
      gsap.from(titleWords, {
        opacity: 0.15,
        y: 12,
        duration: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: root.current.querySelector('.section-title'),
          start: 'top 80%',
          end: 'top 40%',
          scrub: true,
        },
      })
    },
    { scope: root },
  )

  const layout = [
    { span: 'md:col-span-12', ratio: 'aspect-[16/9]', size: 'massive' },
    { span: 'md:col-span-6', ratio: 'aspect-[4/5]', size: 'tall' },
    { span: 'md:col-span-6', ratio: 'aspect-[4/5]', size: 'tall' },
    { span: 'md:col-span-12', ratio: 'aspect-[16/9]', size: 'massive' },
  ]

  return (
    <section ref={root} id="projects" className="relative px-4 py-32 md:px-8 md:py-48">
      <div className="mx-auto mb-20 flex max-w-7xl flex-col items-start justify-between gap-8 md:mb-28 md:flex-row md:items-end">
        <div>
          <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-bone-50/50">
            <span className="h-px w-8 bg-bone-50/30" />
            <span>Travaux</span>
          </div>
          <h2 className="section-title font-display text-balance max-w-3xl text-5xl font-medium leading-[0.95] tracking-tight md:text-7xl">
            {'Quatre projets réels, '
              .split(' ')
              .map((w, i) => (
                <span key={i} className="title-word inline-block pr-2 will-change-transform">
                  {w}
                </span>
              ))}
            <span className="title-word inline-block pr-2 italic text-bone-50/70 will-change-transform">un même</span>{' '}
            <span className="title-word inline-block pr-2 italic text-bone-50/70 will-change-transform">niveau d’exigence.</span>
          </h2>
        </div>
        <p className="max-w-md text-pretty font-display text-base text-bone-50/60 md:text-lg">
          Des sites et plateformes pensés pour vendre, rassurer, administrer et durer. Chaque cas combine design, code, contenu et logique business.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl auto-rows-auto grid-cols-1 gap-4 grid-flow-dense md:grid-cols-12 md:gap-6">
        {projects.map((p, i) => {
          const conf = layout[i % layout.length]
          const project = { ...p, cover: imageOverrides[p.slug]?.travauxCover || p.cover }
          return <ProjectCard key={p.slug} project={project} index={i} {...conf} />
        })}
      </div>

      <div className="mx-auto mt-20 flex max-w-7xl items-center justify-between border-t border-white/10 pt-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-50/50">
          Sélection client - 04 / 04
        </span>
        <Link
          to="/featured"
          className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-2.5 pl-5 pr-1.5 text-bone-50 transition-colors duration-500 ease-soft-spring hover:bg-white/10"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-medium">Voir la mise en avant</span>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-bone-50 text-ink-950 transition-all duration-500 ease-soft-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight />
          </span>
        </Link>
      </div>
    </section>
  )
}

function ProjectCard({ project, span, ratio, size, index }) {
  const big = size === 'massive' || size === 'wide'

  return (
    <Link to={`/projects/${project.slug}`} className={`proj-card group relative col-span-1 ${span} block`}>
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-1.5 transition-colors duration-700 ease-soft-spring hover:bg-white/[0.07]">
        <div className={`relative ${ratio} w-full overflow-hidden rounded-[calc(2rem-0.375rem)] bg-ink-900 inset-highlight`}>
          <img
            src={project.cover}
            alt={project.title}
            loading={index < 2 ? 'eager' : 'lazy'}
            className="absolute inset-0 h-full w-full object-cover opacity-90 contrast-110 transition-transform duration-[1400ms] ease-soft-spring group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />

          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-5 md:px-7 md:py-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/80">
              {project.discipline}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/80">
              {project.year}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 px-5 pb-6 pt-12 md:px-7 md:pb-8">
            <div>
              <h3
                className={`font-display font-medium leading-[0.95] tracking-tight text-bone-50 ${
                  big ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'
                }`}
              >
                {project.title}
              </h3>
              <p className="mt-2 max-w-md font-display text-sm text-bone-50/65 md:text-base">{project.role}</p>
            </div>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-bone-50 text-ink-950 transition-all duration-700 ease-soft-spring group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-105 md:h-12 md:w-12">
              <ArrowUpRight />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

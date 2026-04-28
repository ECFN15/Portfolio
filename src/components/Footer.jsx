import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Footer() {
  const root = useRef(null)

  useGSAP(
    () => {
      const words = root.current.querySelectorAll('.cta-word')
      gsap.from(words, {
        yPercent: 110,
        rotate: 4,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
        },
      })
    },
    { scope: root },
  )

  const year = new Date().getFullYear()

  return (
    <footer ref={root} className="relative px-4 pb-10 pt-32 md:px-8 md:pt-48">
      {/* Massive CTA */}
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-bone-50/50">
          <span className="h-px w-8 bg-bone-50/30" />
          <span>Travaillons ensemble</span>
        </div>

        <h2 className="font-display text-balance max-w-6xl font-display font-medium tracking-tight">
          <span className="block overflow-hidden pb-[0.18em] text-[clamp(3rem,11vw,11rem)] leading-[0.88]">
            <span className="cta-word inline-block will-change-transform">Démarrons</span>{' '}
            <span className="cta-word inline-block will-change-transform">votre</span>
          </span>
          <span className="block overflow-hidden pb-[0.22em] text-[clamp(3rem,11vw,11rem)] leading-[0.88] italic text-bone-50/70">
            <span className="cta-word inline-block will-change-transform">prochaine</span>{' '}
            <span className="cta-word inline-block will-change-transform">page.</span>
          </span>
        </h2>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href="mailto:hello@atelier.studio"
            className="group flex items-center gap-2 rounded-full bg-bone-50 py-3 pl-6 pr-2 text-ink-950 transition-transform duration-500 ease-soft-spring active:scale-[0.98]"
          >
            <span className="font-mono text-[12px] uppercase tracking-[0.2em] font-medium">Écrire un email</span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-950 text-bone-50 transition-all duration-500 ease-soft-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight />
            </span>
          </a>
          <a
            href="https://cal.com"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-3 pl-6 pr-2 text-bone-50 transition-colors duration-500 ease-soft-spring hover:bg-white/10"
          >
            <span className="font-mono text-[12px] uppercase tracking-[0.2em] font-medium">Réserver un appel</span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-bone-50 text-ink-950 transition-all duration-500 ease-soft-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight />
            </span>
          </a>
        </div>
      </div>

      {/* Footer columns */}
      <div className="mx-auto mt-32 grid max-w-7xl grid-cols-2 gap-y-12 border-t border-white/10 pt-12 md:mt-40 md:grid-cols-4">
        <FooterCol
          title="Atelier"
          links={[
            { label: 'Approche', href: '#' },
            { label: 'Travaux', href: '/#projects' },
            { label: 'Tarifs', href: '/#pricing' },
            { label: 'Journal', href: '#' },
          ]}
        />
        <FooterCol
          title="Disciplines"
          links={[
            { label: 'Direction artistique', href: '#' },
            { label: 'Identité', href: '#' },
            { label: 'Sites éditoriaux', href: '#' },
            { label: 'Motion · GSAP', href: '#' },
          ]}
        />
        <FooterCol
          title="Contact"
          links={[
            { label: 'hello@atelier.studio', href: 'mailto:hello@atelier.studio' },
            { label: '+33 6 00 00 00 00', href: 'tel:+33600000000' },
            { label: 'Paris · Lyon', href: '#' },
          ]}
        />
        <FooterCol
          title="Réseaux"
          links={[
            { label: 'Are.na', href: '#' },
            { label: 'Read.cv', href: '#' },
            { label: 'Instagram', href: '#' },
            { label: 'X · Twitter', href: '#' },
          ]}
        />
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-50/40 md:flex-row md:items-center">
        <span>© {year} · Atelier — Tous droits réservés</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 [animation:fade-up_2s_infinite_alternate]" />
          Disponible pour Q3 2025
        </span>
        <span>Conçu et développé à la main</span>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/40">{title}</div>
      <ul className="flex flex-col gap-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="group inline-flex items-center gap-2 font-display text-base text-bone-50/85 transition-colors duration-500 ease-soft-spring hover:text-bone-50"
            >
              <span className="h-px w-3 bg-bone-50/30 transition-all duration-500 ease-soft-spring group-hover:w-6 group-hover:bg-bone-50" />
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Hero() {
  const root = useRef(null)

  useGSAP(
    () => {
      // Staggered word reveal on load
      const words = root.current.querySelectorAll('.hero-word')
      gsap.from(words, {
        yPercent: 110,
        rotate: 4,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.05,
        delay: 0.1,
      })

      // Sub-lines and meta
      gsap.from(root.current.querySelectorAll('.hero-fade'), {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.6,
      })

      // Background image — slow ken-burns
      const bg = root.current.querySelector('.hero-bg')
      if (bg) {
        gsap.fromTo(
          bg,
          { scale: 1.18, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2.4, ease: 'expo.out' },
        )
        gsap.to(bg, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      className="relative isolate flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-6 pb-32 pt-40 md:pb-48 md:pt-44"
    >
      {/* Background image full-bleed with dark radial wash */}
      <div className="hero-bg absolute inset-0 -z-10">
        <img
          src="https://picsum.photos/seed/atelier-hero/2400/1600"
          alt=""
          className="h-full w-full object-cover opacity-50 contrast-110 grayscale"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_75%)]" />
        <div className="absolute inset-0 bg-mesh-aurora opacity-60" />
      </div>

      {/* Eyebrow */}
      <div className="hero-fade mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-bone-50/60">
        <span className="h-px w-8 bg-bone-50/40" />
        <span>Travaux sélectionnés — 2024 / 2025</span>
        <span className="h-px w-8 bg-bone-50/40" />
      </div>

      {/* H1 */}
      <h1 className="h-display font-display text-balance mx-auto max-w-6xl text-center font-display text-bone-50">
        <span className="block overflow-hidden">
          <span className="hero-word inline-block will-change-transform">Des</span>{' '}
          <span className="hero-word inline-block will-change-transform">interfaces</span>{' '}
          <span className="hero-word inline-block will-change-transform">qui</span>{' '}
          <span className="hero-word inline-block will-change-transform">respirent,</span>
        </span>
        <span className="block overflow-hidden italic text-bone-50/80">
          <span className="hero-word inline-block will-change-transform">scrollées</span>{' '}
          <span className="hero-word inline-block will-change-transform">comme</span>{' '}
          <span className="hero-word inline-block will-change-transform">un</span>{' '}
          <span className="hero-word inline-block will-change-transform">magazine.</span>
        </span>
      </h1>

      {/* CTA pair */}
      <div className="hero-fade mt-12 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#projects"
          className="group flex items-center gap-2 rounded-full bg-bone-50 py-3 pl-6 pr-2 text-ink-950 transition-transform duration-500 ease-soft-spring active:scale-[0.98]"
        >
          <span className="font-mono text-[12px] uppercase tracking-[0.2em] font-medium">Voir les travaux</span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-950 text-bone-50 transition-all duration-500 ease-soft-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight />
          </span>
        </a>
        <a
          href="mailto:hello@atelier.studio"
          className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-3 pl-6 pr-2 text-bone-50 transition-colors duration-500 ease-soft-spring hover:bg-white/10"
        >
          <span className="font-mono text-[12px] uppercase tracking-[0.2em] font-medium">Démarrer un projet</span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-bone-50 text-ink-950 transition-all duration-500 ease-soft-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight />
          </span>
        </a>
      </div>

      {/* Bottom meta — scroll cue + counter */}
      <div className="hero-fade absolute bottom-10 left-1/2 flex w-full max-w-6xl -translate-x-1/2 items-end justify-between px-6 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-50/50">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15">
            <span className="h-2 w-px bg-bone-50/70 [animation:fade-up_2s_infinite_alternate]" />
          </span>
          <span>Faites défiler</span>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <span>06 projets</span>
          <span className="h-px w-8 bg-bone-50/30" />
          <span>Disponible · Q3 2025</span>
        </div>
      </div>
    </section>
  )
}

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

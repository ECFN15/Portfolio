import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const slides = [
  { src: '/hero.png', alt: 'Paysage brumeux' },
  { src: '/hero2.png', alt: 'Atmosphère cinématique' },
  { src: '/hero3.png', alt: 'Ambiance crépusculaire' },
]

const SLIDE_DURATION = 5000

export default function Hero() {
  const root = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const slidesRef = useRef([])
  const progressRef = useRef(null)
  const progressTweenRef = useRef(null)

  // Slide transition + auto-advance — triggers on every activeIndex change
  useEffect(() => {
    // Animate every slide: active one fades in & scales down, others fade out & scale up
    slides.forEach((_, i) => {
      const el = slidesRef.current[i]
      if (!el) return
      if (i === activeIndex) {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out' }
        )
      } else {
        gsap.to(el, {
          opacity: 0,
          scale: 1.12,
          duration: 1.2,
          ease: 'power3.inOut',
        })
      }
    })

    // Reset and animate progress bar fill
    if (progressRef.current) {
      if (progressTweenRef.current) progressTweenRef.current.kill()
      gsap.set(progressRef.current, { scaleX: 0 })
      progressTweenRef.current = gsap.to(progressRef.current, {
        scaleX: 1,
        duration: SLIDE_DURATION / 1000,
        ease: 'none',
      })
    }

    // Auto-advance
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, SLIDE_DURATION)

    return () => clearTimeout(timer)
  }, [activeIndex])

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

      // Parallax on scroll for the entire slider container
      const sliderContainer = root.current.querySelector('.slider-container')
      if (sliderContainer) {
        gsap.to(sliderContainer, {
          yPercent: 8,
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
    { scope: root }
  )

  const goToSlide = (index) => {
    if (index === activeIndex) return
    setActiveIndex(index)
  }

  return (
    <section
      ref={root}
      className="relative isolate flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-6 pb-32 pt-40 md:pb-48 md:pt-44"
    >
      {/* Slider container with parallax */}
      <div className="slider-container absolute inset-0 -z-10">
        {/* Slide images with crossfade */}
        {slides.map((slide, index) => (
          <div
            key={index}
            ref={(el) => (slidesRef.current[index] = el)}
            className="absolute inset-0 will-change-transform"
            style={{ opacity: index === 0 ? 1 : 0 }}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="h-full w-full object-cover contrast-110"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Overlays for text legibility */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_75%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950/70" />
        <div className="absolute inset-0 bg-mesh-aurora opacity-40" />
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

      {/* Bottom HUD — unified row: scroll cue | progress bar + dots | meta */}
      <div className="hero-fade absolute inset-x-0 bottom-8 z-20 px-6 md:bottom-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
          {/* Left: scroll cue */}
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-50/50">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15">
              <span className="h-2 w-px bg-bone-50/70 [animation:fade-up_2s_infinite_alternate]" />
            </span>
            <span>Faites défiler</span>
          </div>

          {/* Center: progress bar with slide counter and dots */}
          <div className="flex w-full max-w-sm items-center gap-4 md:w-auto md:min-w-[320px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-50/50">
              {String(activeIndex + 1).padStart(2, '0')}/{String(slides.length).padStart(2, '0')}
            </span>

            {/* Progress track */}
            <div className="relative h-px flex-1 overflow-hidden rounded-full bg-white/15">
              <div
                ref={progressRef}
                className="absolute inset-y-0 left-0 w-full origin-left bg-bone-50"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>

            {/* Navigation dots */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group relative h-5 w-5 rounded-full transition-all duration-500 ease-soft-spring hover:scale-110"
                  aria-label={`Aller au slide ${index + 1}`}
                >
                  <span
                    className={`absolute inset-0 rounded-full border transition-colors duration-500 ${
                      index === activeIndex
                        ? 'border-bone-50'
                        : 'border-white/25 group-hover:border-white/50'
                    }`}
                  />
                  <span
                    className={`absolute inset-1 rounded-full bg-bone-50 transition-all duration-500 ease-soft-spring ${
                      index === activeIndex ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: availability meta */}
          <div className="hidden items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-50/50 md:flex">
            <span>06 projets</span>
            <span className="h-px w-6 bg-bone-50/30" />
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 [animation:fade-up_2s_infinite_alternate]" />
              Disponible · Q3 2025
            </span>
          </div>
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

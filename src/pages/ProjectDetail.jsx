import { useRef, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { findProject, projects } from '../data/projects.js'
import Footer from '../components/Footer.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = findProject(slug)
  const root = useRef(null)

  useEffect(() => {
    // Refresh ScrollTrigger on slug change to recalculate positions
    ScrollTrigger.refresh()
  }, [slug])

  useGSAP(
    () => {
      if (!project) return

      // 1. Hero title — staggered word reveal
      const titleWords = root.current.querySelectorAll('.detail-word')
      gsap.from(titleWords, {
        yPercent: 110,
        rotate: 4,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.06,
        delay: 0.1,
      })

      // 2. Hero meta fade
      gsap.from(root.current.querySelectorAll('.detail-fade'), {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.07,
        delay: 0.5,
      })

      // 3. Cover ken burns + parallax
      const cover = root.current.querySelector('.cover-img')
      if (cover) {
        gsap.fromTo(
          cover,
          { scale: 1.18, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2.4, ease: 'expo.out' },
        )
        gsap.to(cover, {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: cover,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // 4. Scrubbing paragraph word-by-word reveal
      root.current.querySelectorAll('.scrub-paragraph').forEach((para) => {
        const words = para.querySelectorAll('.scrub-word')
        gsap.fromTo(
          words,
          { opacity: 0.15 },
          {
            opacity: 1,
            duration: 1,
            stagger: 0.04,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: para,
              start: 'top 78%',
              end: 'bottom 50%',
              scrub: true,
            },
          },
        )
      })

      // 5. Pinned scrollytelling — title pins while gallery scrolls
      const pinSection = root.current.querySelector('.pin-section')
      if (pinSection && window.innerWidth >= 768) {
        const pinTitle = pinSection.querySelector('.pin-title')
        ScrollTrigger.create({
          trigger: pinSection,
          start: 'top top+=80',
          end: 'bottom bottom-=80',
          pin: pinTitle,
          pinSpacing: false,
        })

        // Each gallery item: cinematic clip-path reveal + continuous inner parallax
        pinSection.querySelectorAll('.gallery-item').forEach((item, i) => {
          const inner = item.querySelector('.gallery-inner')
          const img = item.querySelector('img')
          const direction = i % 2 === 0 ? 1 : -1

          // Initial state: image is masked from bottom + slightly enlarged within
          gsap.set(inner, { clipPath: 'inset(0% 0% 100% 0%)' })
          gsap.set(img, { scale: 1.18, yPercent: -4 })

          // Reveal: clip-path slides upward like a page turning
          gsap.to(inner, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          })

          // Continuous parallax on the inner <img>: scale down + slow upward drift
          gsap.to(img, {
            scale: 1,
            yPercent: -14,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          })

          // Subtle lateral nudge — alternates left/right for editorial rhythm
          gsap.fromTo(
            item,
            { xPercent: direction * 2 },
            {
              xPercent: direction * -2,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            },
          )
        })
      }

      // 6. Z-axis cascade — credits cards
      gsap.from(root.current.querySelectorAll('.credit-card'), {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: root.current.querySelector('.credits-section'),
          start: 'top 80%',
        },
      })

      // 7. Marquee accent quote — slow horizontal drift
      const quote = root.current.querySelector('.quote-track')
      if (quote) {
        gsap.to(quote, {
          xPercent: -50,
          ease: 'none',
          duration: 30,
          repeat: -1,
        })
      }
    },
    { scope: root, dependencies: [slug] },
  )

  if (!project) return <Navigate to="/" replace />

  const next = projects.find((p) => p.slug === project.nextSlug) || projects[0]

  return (
    <article ref={root} className="relative">
      {/* ============ HERO ============ */}
      <section className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden px-6 pb-16 pt-40 md:pb-24 md:pt-44">
        {/* Cover image */}
        <div className="absolute inset-0 -z-10">
          <img
            src={project.cover}
            alt={project.title}
            className="cover-img h-full w-full object-cover opacity-80 contrast-110"
            loading="eager"
          />
          {/* Gradient: transparent at top, dark towards bottom (where text sits) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/30 to-ink-950" />
          {/* Subtle navbar legibility gradient — only top 96px */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink-950/35 to-transparent" />
        </div>

        {/* Crumb */}
        <div className="detail-fade mx-auto mb-12 flex w-full max-w-7xl items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-50/60">
          <Link to="/" className="hover:text-bone-50">Index</Link>
          <span className="text-bone-50/30">/</span>
          <span className="text-bone-50/80">{project.discipline}</span>
          <span className="ml-auto hidden md:inline">{project.year}</span>
        </div>

        {/* Big title */}
        <h1 className="font-display mx-auto w-full max-w-7xl font-medium tracking-tight text-bone-50 h-detail">
          <span className="block overflow-hidden pb-[0.2em]">
            {project.title.split(' ').map((w, i) => (
              <span key={i} className="detail-word inline-block pr-4 will-change-transform">
                {w}
              </span>
            ))}
          </span>
        </h1>

        {/* Sub meta line */}
        <div className="mx-auto mt-12 grid w-full max-w-7xl grid-cols-2 gap-8 border-t border-white/15 pt-8 md:grid-cols-4">
          <Meta label="Studio" value={project.studio} />
          <Meta label="Année" value={project.year} />
          <Meta label="Rôle" value={project.role} />
          <Meta label="Discipline" value={project.discipline} />
        </div>
      </section>

      {/* ============ INTRO PARAGRAPH (scrubbing) ============ */}
      <section className="relative px-6 py-32 md:py-48">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-50/50">
            <span className="h-px w-8 bg-bone-50/30" />
            <span>L’intention</span>
          </div>
          <p className="scrub-paragraph font-display text-balance text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl">
            {project.summary.split(' ').map((w, i) => (
              <span key={i} className="scrub-word inline-block pr-2">
                {w}
              </span>
            ))}
          </p>

          {/* Inline typography image */}
          <p className="mt-16 max-w-3xl font-display text-base leading-relaxed text-bone-50/70 md:text-lg">
            Le projet se construit autour d’une idée simple : faire de la page une mise en scène
            <span
              className="mx-2 inline-block h-7 w-14 translate-y-1 rounded-full bg-cover bg-center align-middle md:h-9 md:w-20"
              style={{ backgroundImage: `url(${project.accent})` }}
              aria-hidden="true"
            />
            où chaque scroll est une transition cinématique. Pas de transition gratuite — chaque mouvement sert un propos.
          </p>
        </div>
      </section>

      {/* ============ PINNED GALLERY (detroit-paris style) ============ */}
      <section className="pin-section relative px-4 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Pinned title */}
          <div className="pin-title col-span-1 flex h-fit flex-col gap-6 md:col-span-4 md:py-32">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-50/50">
              <span className="h-px w-8 bg-bone-50/30" />
              <span>Galerie</span>
            </div>
            <h2 className="font-display text-balance text-4xl font-medium leading-[0.95] tracking-tight md:text-6xl">
              Les images <span className="italic text-bone-50/65">se lisent</span> dans l’ordre du scroll.
            </h2>
            <p className="max-w-sm font-display text-base text-bone-50/65">
              Chaque visuel apparaît, respire, puis s’efface — comme une page tournée.
            </p>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-50/40">
              {project.gallery.length.toString().padStart(2, '0')} planches
            </div>
          </div>

          {/* Scrolling gallery */}
          <div className="col-span-1 flex flex-col gap-8 md:col-span-7 md:col-start-6 md:gap-16 md:py-32">
            {project.gallery.map((src, i) => {
              const isWide = i % 3 === 1
              return (
                <div
                  key={src}
                  className={`gallery-item relative w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-1 inset-highlight ${
                    isWide ? 'md:-mx-12' : ''
                  }`}
                  style={{ willChange: 'transform' }}
                >
                  <div className="gallery-inner relative w-full overflow-hidden rounded-[calc(1.5rem-0.25rem)]">
                    <img
                      src={src}
                      alt={`${project.title} — planche ${i + 1}`}
                      loading="lazy"
                      className="block h-auto w-full object-cover will-change-transform"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between px-3 pb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/40">
                    <span>Planche {(i + 1).toString().padStart(2, '0')}</span>
                    <span>{project.title}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ QUOTE MARQUEE ============ */}
      <section className="relative overflow-hidden border-y border-white/10 py-16 md:py-24">
        <div className="quote-track flex shrink-0 whitespace-nowrap">
          {[0, 1].map((k) => (
            <div key={k} className="flex items-center gap-12 pr-12">
              <span className="font-display text-4xl font-medium italic tracking-tight text-bone-50/80 md:text-7xl">
                « {project.quote} »
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-50/40">
                {project.studio}
              </span>
              <span className="text-bone-50/20">—</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CREDITS / TECH (Z-axis cascade) ============ */}
      <section className="credits-section relative px-4 py-32 md:px-8 md:py-48">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-50/50">
            <span className="h-px w-8 bg-bone-50/30" />
            <span>Crédits</span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <CreditCard title="Services" items={project.services} />
            <CreditCard title="Stack technique" items={project.tech} />
            <CreditCard title="Récompenses" items={project.awards} highlight />
          </div>
        </div>
      </section>

      {/* ============ NEXT PROJECT ============ */}
      <section className="relative px-4 pb-32 md:px-8 md:pb-48">
        <Link
          to={`/projects/${next.slug}`}
          className="group mx-auto block max-w-7xl"
        >
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-1.5 transition-colors duration-700 ease-soft-spring hover:bg-white/[0.07]">
            <div className="relative aspect-[16/8] overflow-hidden rounded-[calc(2rem-0.375rem)] bg-ink-900 inset-highlight">
              <img
                src={next.cover}
                alt={next.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-70 contrast-110 transition-transform duration-[1400ms] ease-soft-spring group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/30 to-transparent" />
              <div className="absolute inset-x-0 top-0 px-6 pt-7 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-50/70 md:px-10 md:pt-10">
                Projet suivant
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 px-6 pb-7 pt-12 md:px-10 md:pb-10">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-50/60">
                    {next.discipline}
                  </div>
                  <h3 className="mt-2 font-display text-5xl font-medium leading-[0.95] tracking-tight md:text-7xl">
                    {next.title}
                  </h3>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-bone-50 text-ink-950 transition-all duration-700 ease-soft-spring group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-105 md:h-14 md:w-14">
                  <ArrowUpRight />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </section>

      <Footer />
    </article>
  )
}

function Meta({ label, value }) {
  return (
    <div className="detail-fade flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/45">{label}</span>
      <span className="font-display text-base text-bone-50/95 md:text-lg">{value}</span>
    </div>
  )
}

function CreditCard({ title, items, highlight = false }) {
  return (
    <div
      className={`credit-card rounded-[2rem] border p-1.5 ${
        highlight ? 'border-bone-50/25 bg-bone-50/10' : 'border-white/10 bg-white/[0.04]'
      }`}
    >
      <div
        className={`flex h-full flex-col gap-6 rounded-[calc(2rem-0.375rem)] p-7 inset-highlight md:p-9 ${
          highlight ? 'bg-bone-50 text-ink-950' : 'bg-ink-900 text-bone-50'
        }`}
      >
        <div
          className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
            highlight ? 'text-ink-950/60' : 'text-bone-50/50'
          }`}
        >
          {title}
        </div>
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-baseline gap-3 font-display text-lg md:text-xl"
            >
              <span
                className={`font-mono text-[10px] ${highlight ? 'text-ink-950/40' : 'text-bone-50/40'}`}
              >
                ·
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

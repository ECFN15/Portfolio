import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const links = [
    { label: 'Travaux', to: '/#projects' },
    { label: 'Tarifs', to: '/#pricing' },
    { label: 'Contact', to: 'mailto:hello@atelier.studio', external: true },
  ]

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 flex justify-center px-4 transition-all duration-700 ease-soft-spring ${
          scrolled ? 'pt-3' : 'pt-6'
        }`}
      >
        <nav
          className={`pointer-events-auto flex w-full max-w-3xl items-center justify-between rounded-full border border-white/10 bg-ink-950/60 backdrop-blur-2xl transition-all duration-700 ease-soft-spring ${
            scrolled ? 'py-2 pl-4 pr-2' : 'py-2.5 pl-5 pr-2.5'
          }`}
        >
          <Link to="/" className="group flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-bone-50 text-ink-950 font-display font-semibold text-sm transition-transform duration-700 ease-soft-spring group-hover:rotate-180">
              A
            </span>
            <span className="font-display text-sm font-medium tracking-tight">Atelier</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.to}
                  className="rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-50/70 transition-colors duration-500 ease-soft-spring hover:text-bone-50"
                >
                  {l.label}
                </a>
              ) : (
                <a
                  key={l.label}
                  href={l.to}
                  className="rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-50/70 transition-colors duration-500 ease-soft-spring hover:text-bone-50"
                >
                  {l.label}
                </a>
              ),
            )}
          </div>

          <a
            href="mailto:hello@atelier.studio"
            className="group hidden items-center gap-2 rounded-full bg-bone-50 py-1.5 pl-4 pr-1.5 text-ink-950 transition-transform duration-500 ease-soft-spring active:scale-[0.98] md:flex"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] font-medium">Démarrer</span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-ink-950 text-bone-50 transition-all duration-500 ease-soft-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight />
            </span>
          </a>

          <button
            aria-label="Menu"
            onClick={() => setOpen((s) => !s)}
            className="relative grid h-9 w-9 place-items-center rounded-full bg-white/5 md:hidden"
          >
            <span
              className={`absolute h-px w-4 bg-bone-50 transition-transform duration-500 ease-soft-spring ${
                open ? 'rotate-45' : '-translate-y-1'
              }`}
            />
            <span
              className={`absolute h-px w-4 bg-bone-50 transition-transform duration-500 ease-soft-spring ${
                open ? '-rotate-45' : 'translate-y-1'
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile glass overlay */}
      <div
        className={`fixed inset-0 z-30 flex flex-col items-center justify-center gap-6 bg-ink-950/85 backdrop-blur-3xl transition-all duration-700 ease-soft-spring md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {links.map((l, i) => (
          <a
            key={l.label}
            href={l.to}
            className={`font-display text-4xl font-medium tracking-tight transition-all duration-700 ease-soft-spring ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: open ? `${120 + i * 80}ms` : '0ms' }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  )
}

function ArrowUpRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

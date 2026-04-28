export default function Marquee() {
  const items = [
    'Direction artistique',
    'Identité',
    'Sites éditoriaux',
    'Motion · GSAP',
    'WebGL · Three.js',
    'E-commerce',
    'Design système',
    'Type · spécimens',
  ]
  const row = [...items, ...items]

  return (
    <section className="border-y border-white/10 bg-ink-950/80 py-10 overflow-hidden">
      <div className="flex items-center">
        <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12">
          {row.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-12 font-display text-3xl font-medium tracking-tight text-bone-50/70 md:text-5xl"
            >
              <Asterisk />
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Asterisk() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="shrink-0 text-bone-50/40">
      <path d="M10 2V18M3.5 5L16.5 15M3.5 15L16.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

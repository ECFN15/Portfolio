import { useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const submissions = [
  { id: 'MS-18', title: 'Gardens after rain', author: 'Elise Morand', section: 'Essay', state: 'Accepted', role: 'success' },
  { id: 'MS-21', title: 'The quiet archive', author: 'Noam Vidal', section: 'Portfolio', state: 'In review', role: 'info' },
  { id: 'MS-24', title: 'Paper rooms', author: 'June Aoki', section: 'Fiction', state: 'Needs edit', role: 'warning' },
  { id: 'MS-27', title: 'Blue proofs', author: 'Mara Voss', section: 'Print note', state: 'Draft', role: 'neutral' },
]

export default function SerifDisplayExperience() {
  const { view = 'vitrine' } = useParams()
  return view === 'dashboard' ? <AsterPressDesk /> : <AsterVitrine />
}

function AsterVitrine() {
  const root = useSerifReveal()

  return (
    <main ref={root} className="sdx-page" data-skill="serif-display" data-archetype="risographic-print-workshop">
      <SerifNav active="vitrine" />
      <section className="sdx-hero sdx-reveal">
        <div className="sdx-copy">
          <span className="sdx-kicker">Maison Aster / cultural press</span>
          <h1>A journal for rooms, rituals, and printed quiet.</h1>
          <p>
            Maison Aster publishes small-run essays, image chapters, and printed objects. The serif voice carries the pace while
            editorial data stays usable: issue, price, stock, manuscripts, and proof state.
          </p>
          <div className="sdx-actions">
            <Link className="sdx-button" to="/skills/serif-display/dashboard">Open press desk</Link>
            <a className="sdx-link" href="#current-issue">View issue</a>
          </div>
        </div>
        <IssueSpread />
      </section>

      <section id="current-issue" className="sdx-section sdx-reveal">
        <div>
          <span className="sdx-kicker">Current issue</span>
          <h2>Type, price, paper, and chapter rhythm are the product proof.</h2>
          <p>Every item has a visible edition, section, price, and state. Elegance does not hide commerce or editorial workflow.</p>
        </div>
        <div className="sdx-index">
          {['Room notes', 'Garden essay', 'Archive portfolio', 'Print object'].map((title, index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{title}</strong>
              <em>{index === 3 ? 'EUR 38 / 140 copies' : 'Issue 04 / Spring'}</em>
            </article>
          ))}
        </div>
      </section>

      <section className="sdx-preview sdx-reveal">
        <div>
          <span className="sdx-kicker">Specialized desk</span>
          <h2>The dashboard is an editorial production desk.</h2>
          <p>Select manuscripts, inspect author, section, state, issue budget, and print queue without breaking the serif system.</p>
          <Link className="sdx-button" to="/skills/serif-display/dashboard">Manage issue 04</Link>
        </div>
        <DeskMini />
      </section>
    </main>
  )
}

function AsterPressDesk() {
  const [selectedId, setSelectedId] = useState('MS-21')
  const root = useSerifReveal()
  const selected = useMemo(() => submissions.find((item) => item.id === selectedId) ?? submissions[0], [selectedId])

  return (
    <main ref={root} className="sdx-page sdx-page--desk" data-skill="serif-display" data-archetype="press-desk">
      <SerifNav active="dashboard" />
      <section className="sdx-desk sdx-reveal">
        <aside className="sdx-side">
          <span className="sdx-kicker">Issue 04</span>
          <h1>Press desk.</h1>
          <p>Manuscripts, print state, stock, price, and editorial sections for a small-run cultural journal.</p>
        </aside>

        <section className="sdx-main">
          <header className="sdx-head">
            <div>
              <span className="sdx-kicker">Selected manuscript</span>
              <h2>{selected.title}</h2>
            </div>
            <StatusPill role={selected.role}>{selected.state}</StatusPill>
          </header>

          <div className="sdx-grid">
            <section className="sdx-metric">
              <span className="sdx-kicker">Edition stock</span>
              <strong>140</strong>
              <p>copies, linen paper, blue risograph insert.</p>
            </section>

            <section className="sdx-selected">
              <span className="sdx-kicker">Author record</span>
              <h3>{selected.author}</h3>
              <dl>
                <div><dt>ID</dt><dd>{selected.id}</dd></div>
                <div><dt>Section</dt><dd>{selected.section}</dd></div>
                <div><dt>State</dt><dd>{selected.state}</dd></div>
              </dl>
            </section>

            <section className="sdx-submissions">
              {submissions.map((item) => (
                <button type="button" data-active={selectedId === item.id ? 'true' : undefined} onClick={() => setSelectedId(item.id)} key={item.id}>
                  <span>{item.id}</span>
                  <strong>{item.title}</strong>
                  <em>{item.author}</em>
                  <StatusPill role={item.role}>{item.state}</StatusPill>
                </button>
              ))}
            </section>

            <section className="sdx-print-note">
              <span className="sdx-kicker">Print note</span>
              <h3>Blue proof due Friday.</h3>
              <p>Two image captions need author approval before the insert can move to final plate.</p>
              <button type="button" className="sdx-button">Send proof note</button>
            </section>
          </div>
        </section>
      </section>
    </main>
  )
}

function SerifNav({ active }) {
  return (
    <header className="sdx-nav">
      <Link to="/skills/serif-display" className="sdx-logo">Maison Aster</Link>
      <nav aria-label="Maison Aster pages">
        <Link data-active={active === 'vitrine' ? 'true' : undefined} to="/skills/serif-display/vitrine">Vitrine</Link>
        <Link data-active={active === 'dashboard' ? 'true' : undefined} to="/skills/serif-display/dashboard">Press desk</Link>
        <Link to="/skills">Skills</Link>
      </nav>
    </header>
  )
}

function IssueSpread() {
  return (
    <div className="sdx-spread" aria-label="Maison Aster issue spread">
      <article>
        <span>Issue 04</span>
        <strong>Rooms for rain</strong>
        <em>EUR 38 / 140 copies</em>
      </article>
      <div>
        {submissions.slice(0, 3).map((item) => (
          <p key={item.id}><span>{item.section}</span><strong>{item.title}</strong></p>
        ))}
      </div>
    </div>
  )
}

function DeskMini() {
  return (
    <div className="sdx-mini" aria-label="Press desk preview">
      <IssueSpread />
    </div>
  )
}

function StatusPill({ role = 'neutral', children }) {
  return <span className="sdx-status" data-role={role}>{children}</span>
}

function useSerifReveal() {
  const scope = useRef(null)
  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.from('.sdx-reveal', { opacity: 0, y: 22, duration: 0.75, ease: 'power3.out', stagger: 0.07 })
      gsap.from('.sdx-spread article strong', { yPercent: 110, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.08 })
    },
    { scope },
  )
  return scope
}

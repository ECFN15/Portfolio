import { useMemo, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const issues = [
  { no: '05', title: 'Hotels off season', category: 'Hospitality', status: 'Pending', city: 'Nice', year: '2026' },
  { no: '04', title: 'Stations without departure', category: 'Rail', status: 'Current', city: 'Lille', year: '2026' },
  { no: '03', title: 'Workshops without machines', category: 'Industry', status: 'Archived', city: 'Arles', year: '2025' },
  { no: '02', title: 'Cinemas without projection', category: 'Culture', status: 'Sold out', city: 'Nantes', year: '2025' },
  { no: '01', title: 'Facades that remain', category: 'Street', status: 'Archived', city: 'Paris', year: '2025' },
]

const places = [
  { id: 'L-021', title: 'Gare Saint-Sauveur', city: 'Lille', year: '1865', status: 'Reused', dossier: 'Rail', role: 'success' },
  { id: 'L-022', title: 'Cinema Le Bretagne', city: 'Nantes', year: '1954', status: 'Closed', dossier: 'Culture', role: 'neutral' },
  { id: 'L-023', title: 'Imprimerie Chaix', city: 'Paris', year: '1881', status: 'Fragmented', dossier: 'Industry', role: 'warning' },
  { id: 'L-024', title: 'Hotel des Voyageurs', city: 'Marseille', year: '1927', status: 'Critical', dossier: 'Hospitality', role: 'danger' },
  { id: 'L-025', title: 'Passage du Caire', city: 'Paris', year: '1798', status: 'Active', dossier: 'Street', role: 'info' },
]

const details = [
  ['Original use', 'Freight station'],
  ['Current use', 'Cultural venue'],
  ['Visible memory', 'Platforms, partial rail marks, brick spans'],
  ['Transformation level', 'High'],
  ['Editorial note', 'The building still thinks like an infrastructure.'],
]

const spreadPlates = [
  {
    no: '01',
    title: 'Platform edge',
    word: 'WAIT',
    caption: 'The former platform is edited as a long pause rather than a photographic crop.',
  },
  {
    no: '02',
    title: 'Ticket hall',
    word: 'HALL',
    caption: 'Public circulation becomes the typographic measure for the spread.',
  },
  {
    no: '03',
    title: 'Signal wall',
    word: 'SIGN',
    caption: 'Labels and remaining paint are treated as evidence, not decoration.',
  },
  {
    no: '04',
    title: 'Brick span',
    word: 'SPAN',
    caption: 'Architecture is translated into a captioned editorial rhythm.',
  },
]

export default function EditorialTypeExperience() {
  const { view = 'vitrine' } = useParams()
  const { pathname } = useLocation()
  const activeView = pathname.endsWith('/article') ? 'dashboard' : view
  return activeView === 'dashboard' ? <EditorialTypeDesk /> : <EditorialTypeVitrine />
}

function EditorialTypeVitrine() {
  const root = useTypeReveal()

  return (
    <main ref={root} className="etx-page" data-skill="editorial-type" data-archetype="high-contrast-editorial-archive">
      <TypeNav active="vitrine" />
      <section className="etx-poster etx-reveal">
        <div className="etx-poster-meta">
          <span>La Revue des Lieux Oublies</span>
          <span>Issue 04 / Spring 2026</span>
          <span>12 places / 6 cities</span>
        </div>
        <h1>
          <span>Stations</span>
          <span>without</span>
          <span>departure</span>
        </h1>
        <div className="etx-poster-bottom">
          <p>
            A high-contrast editorial archive about buildings that lose their function but keep their typographic,
            spatial, and civic memory.
          </p>
          <Link className="etx-button" to="/skills/editorial-type/dashboard">Open issue desk</Link>
        </div>
      </section>

      <section className="etx-index-section etx-reveal">
        <header className="etx-section-head">
          <span>Issue index</span>
          <h2>Rows are the design system.</h2>
          <p>
            The magazine is navigated through issue number, category, place, year, status, and action. No soft cards,
            no decorative icon stack, no extra color.
          </p>
        </header>
        <IssueIndex rows={issues} mode="issues" />
      </section>

      <section className="etx-spread etx-reveal">
        <div className="etx-spread-copy">
          <span>Type-led spread</span>
          <h2>Function ended before the walls stopped speaking.</h2>
          <p>
            Each place is edited like a magazine spread: a giant type statement, a factual row system, captioned
            inventory plates, and a colophon that makes the archive navigable.
          </p>
        </div>
        <div className="etx-caption-grid">
          {spreadPlates.map((plate) => (
            <figure className="etx-type-plate" key={plate.no}>
              <div className="etx-type-plate-main">
                <span>{plate.no}</span>
                <strong>{plate.word}</strong>
              </div>
              <figcaption>
                <span>{plate.title}</span>
                <p>{plate.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="etx-inverse-quote etx-reveal">
        <blockquote>
          <p>Type carries the archive before images explain it.</p>
          <footer>Claire Montval / editor in chief</footer>
        </blockquote>
      </section>

      <section className="etx-place-section etx-reveal">
        <header className="etx-section-head">
          <span>Corpus table</span>
          <h2>Five places from the current dossier.</h2>
        </header>
        <IssueIndex rows={places} mode="places" />
      </section>

      <footer className="etx-colophon etx-reveal">
        <div>
          <h2>La Revue des Lieux Oublies</h2>
          <p>Digital issue prototype, typographic archive, and editorial commerce surface.</p>
        </div>
        <Link className="etx-button" to="/skills/editorial-type/dashboard">Read the feature</Link>
      </footer>
    </main>
  )
}

function EditorialTypeDesk() {
  const [filter, setFilter] = useState('Rail')
  const [selectedId, setSelectedId] = useState('L-021')
  const selected = useMemo(() => places.find((place) => place.id === selectedId) ?? places[0], [selectedId])
  const filtered = filter === 'All' ? places : places.filter((place) => place.dossier === filter || place.id === selectedId)
  const root = useTypeReveal()

  return (
    <main ref={root} className="etx-page etx-desk-page" data-skill="editorial-type" data-archetype="issue-index-desk">
      <TypeNav active="dashboard" />
      <section className="etx-desk-shell etx-reveal">
        <aside className="etx-desk-rail">
          <span>Feature / L-021</span>
          <h1>Gare Saint-Sauveur</h1>
          <p>The station that waits for nobody, but still organizes movement.</p>
          <div className="etx-filter" aria-label="Dossier filters">
            {['Rail', 'Culture', 'Industry', 'Hospitality', 'All'].map((item) => (
              <button type="button" data-active={filter === item ? 'true' : undefined} onClick={() => setFilter(item)} key={item}>
                {item}
              </button>
            ))}
          </div>
        </aside>

        <article className="etx-feature">
          <header>
            <span>Longform archive / Spring 2026 / 11 min</span>
            <h2>The building after its function.</h2>
            <p>
              Saint-Sauveur no longer organizes departures. Yet its architecture still behaves like a station:
              long spans, readable circulation, many thresholds, and the memory of bodies in movement.
            </p>
          </header>
          <div className="etx-fact-table">
            {details.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <Pullquote />
          <div className="etx-reading-grid">
            <p>
              Railway buildings carry a particular memory because they were designed to choreograph waiting.
              When trains disappear, that choreography remains. Visitors still enter, pause, cross, and align
              themselves with a rhythm that belongs to an older program.
            </p>
            <p>
              The editorial question is not only what the renovation preserved. It is what the page chooses to make
              legible: a platform edge, a missing timetable, a brick span, or the typographic label that now acts as proof.
            </p>
          </div>
        </article>

        <aside className="etx-source-panel">
          <StatusPill role={selected.role}>{selected.status}</StatusPill>
          <h3>{selected.title}</h3>
          <p>{selected.city} / {selected.year} / {selected.dossier}</p>
          <div className="etx-mini-cover">
            <span>{selected.id}</span>
            <strong>{selected.title}</strong>
            <em>{selected.dossier} / current issue</em>
          </div>
        </aside>
      </section>

      <section className="etx-desk-index etx-reveal">
        <header className="etx-section-head">
          <span>Selected archive rows</span>
          <h2>Filter state, selected row, empty frame, and recovery note.</h2>
        </header>
        <IssueIndex rows={filtered} mode="places" selectedId={selectedId} onSelect={setSelectedId} />
        {filtered.length === 0 && (
          <div className="etx-empty-row">
            <strong>No rows in this dossier.</strong>
            <p>Choose All to restore the corpus table.</p>
          </div>
        )}
      </section>
    </main>
  )
}

function IssueIndex({ rows, mode, selectedId, onSelect }) {
  return (
    <div className="etx-issue-index" data-mode={mode}>
      <div className="etx-index-head">
        <span>{mode === 'issues' ? 'No' : 'ID'}</span>
        <span>Title</span>
        <span>{mode === 'issues' ? 'Category' : 'City'}</span>
        <span>Year</span>
        <span>Status</span>
      </div>
      {rows.map((row) => {
        const id = row.id ?? row.no
        const active = selectedId === id || row.no === '04'
        const content = (
          <>
            <span>{id}</span>
            <strong>{row.title}</strong>
            <em>{row.category ?? row.city}</em>
            <i>{row.year}</i>
            <StatusPill role={row.role ?? (row.status === 'Current' ? 'danger' : 'neutral')}>{row.status}</StatusPill>
          </>
        )

        return onSelect ? (
          <button type="button" className="etx-index-row" data-active={active ? 'true' : undefined} onClick={() => onSelect(id)} key={id}>
            {content}
          </button>
        ) : (
          <Link className="etx-index-row" data-active={active ? 'true' : undefined} to="/skills/editorial-type/dashboard" key={id}>
            {content}
          </Link>
        )
      })}
    </div>
  )
}

function Pullquote() {
  return (
    <blockquote className="etx-pullquote">
      <p>The station is no longer a timetable. It is a long sentence crossed by visitors.</p>
      <footer>Visit notebook / March 2026</footer>
    </blockquote>
  )
}

function StatusPill({ role = 'neutral', children }) {
  return <span className="etx-status-pill" data-role={role}>{children}</span>
}

function TypeNav({ active }) {
  return (
    <header className="etx-nav">
      <Link to="/skills/editorial-type" className="etx-logo">LA REVUE</Link>
      <nav>
        <Link data-active={active === 'vitrine' ? 'true' : undefined} to="/skills/editorial-type/vitrine">Vitrine</Link>
        <Link data-active={active === 'dashboard' ? 'true' : undefined} to="/skills/editorial-type/dashboard">Issue desk</Link>
        <Link to="/skills">Skills</Link>
      </nav>
    </header>
  )
}

function useTypeReveal() {
  const scope = useRef(null)
  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.from('.etx-reveal', {
        y: 22,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.07,
      })
    },
    { scope },
  )
  return scope
}

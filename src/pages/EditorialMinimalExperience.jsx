import { useMemo, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const chapters = [
  { no: '01', title: 'Thresholds before commerce', type: 'Essay', status: 'Current', page: 'p. 12' },
  { no: '02', title: 'Rooms without doors', type: 'Chapter', status: 'Selected', page: 'p. 28' },
  { no: '03', title: 'The hour before opening', type: 'Photo note', status: 'Draft', page: 'p. 46' },
  { no: '04', title: 'Furniture left behind', type: 'Archive', status: 'Ready', page: 'p. 62' },
  { no: '05', title: 'How silence is maintained', type: 'Method', status: 'Indexed', page: 'p. 78' },
]

const fieldNotes = [
  { id: 'FW-031', place: 'Passage Sainte-Avoye', city: 'Paris', time: '11:40', method: '12 min watch', signal: 'Four crossings, no stops' },
  { id: 'FW-044', place: 'Cais do Sodre station edge', city: 'Lisbon', time: '06:20', method: 'Wind interval', signal: 'Traffic softened by river air' },
  { id: 'FW-057', place: 'Norrebro library court', city: 'Copenhagen', time: '14:05', method: 'After rain', signal: 'Furniture defined the room' },
  { id: 'FW-063', place: 'Rue des Gravilliers', city: 'Paris', time: '07:12', method: 'Before delivery', signal: 'Keys, truck, empty court' },
]

const deskNotes = [
  ['Margin note', 'Temporary room means a public place that briefly supports stillness without enclosure.'],
  ['Source note', 'Observation windows lasted between twelve and thirty minutes depending on site activity.'],
  ['Editorial note', 'The issue treats quiet as a civic condition, not a mood.'],
]

export default function EditorialMinimalExperience() {
  const { view = 'vitrine' } = useParams()
  const { pathname } = useLocation()
  const activeView = pathname.endsWith('/chapter') ? 'dashboard' : pathname.endsWith('/index') ? 'vitrine' : view
  return activeView === 'dashboard' ? <FieldworkDesk /> : <FieldworkVitrine />
}

function FieldworkVitrine() {
  const root = useEditorialReveal()

  return (
    <main ref={root} className="em-page" data-skill="editorial-minimal" data-archetype="research-journal-warm-stone">
      <EditorialNav active="vitrine" />
      <section className="em-hero em-reveal">
        <div className="em-hero-copy">
          <span className="em-kicker">Issue 03 / Urban silence</span>
          <h1><span>The Quiet City Index</span></h1>
          <p>
            FIELDWORK publishes slow city research for architects, curators, and civic teams. Issue 03 follows the rooms,
            thresholds, benches, platforms, and pauses where public life becomes briefly quiet.
          </p>
          <div className="em-actions">
            <Link className="em-button em-button-primary" to="/skills/editorial-minimal/dashboard">Open reading desk</Link>
            <a className="em-button em-button-secondary" href="#issue-index">Read the index</a>
          </div>
        </div>
        <CaptionedPlate />
      </section>

      <section className="em-note-row em-reveal" aria-label="Fieldwork proof">
        <MarginNote index="42" label="Field notes">Paris, Lisbon, and Copenhagen observed between March and June.</MarginNote>
        <MarginNote index="18" label="Photo plates">Crops are catalogued by threshold, pause, public edge, and morning light.</MarginNote>
        <MarginNote index="07" label="Essays">Every essay is tied to a concrete site note, not an abstract city mood.</MarginNote>
      </section>

      <section id="issue-index" className="em-section em-reveal">
        <header className="em-section-head">
          <span className="em-kicker">Edited index</span>
          <h2>The issue is navigated like an archive, not a feature grid.</h2>
          <p>
            Rows use number, type, title, state, and page as the structure. Hover reveals editorial intent through underline
            and rule weight, not through color blocks.
          </p>
        </header>
        <div className="em-index-table">
          {chapters.map((chapter) => (
            <Link to="/skills/editorial-minimal/dashboard" className="em-index-row" data-selected={chapter.no === '02' ? 'true' : undefined} key={chapter.no}>
              <span>{chapter.no}</span>
              <em>{chapter.type}</em>
              <strong>{chapter.title}</strong>
              <i>{chapter.status}</i>
              <small>{chapter.page}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="em-media-chapter em-reveal">
        <div className="em-media-copy">
          <span className="em-kicker">Captioned media</span>
          <h2>Proof arrives as plates, notes, and editorial context.</h2>
          <p>
            The visual system avoids stock photography. Each plate is a composed observation artifact: measured margins,
            site coordinates, a quiet crop, and a caption that explains what the reader should inspect.
          </p>
        </div>
        <div className="em-plate-grid">
          <ObservationPlate title="Before chairs" meta="Lisbon / 06:20" variant="cafe" />
          <ObservationPlate title="After rain" meta="Copenhagen / 14:05" variant="library" />
        </div>
      </section>

      <section className="em-method em-reveal">
        <div>
          <span className="em-kicker">Method ledger</span>
          <h2>Restraint still needs evidence.</h2>
        </div>
        <div className="em-method-table">
          {fieldNotes.map((note) => (
            <article key={note.id}>
              <span>{note.id}</span>
              <strong>{note.place}</strong>
              <em>{note.city} / {note.time}</em>
              <p>{note.signal}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="em-reader-preview em-reveal">
        <div>
          <span className="em-kicker">Specialized page</span>
          <h2>The reading desk combines long-form text, source notes, and archive controls.</h2>
          <p>
            It is deliberately more functional than the vitrine: progress, chapter rail, margin notes, active field note,
            footnote state, saved state, related archive rows, and a stable mobile reading order.
          </p>
          <Link className="em-button em-button-primary" to="/skills/editorial-minimal/dashboard">Open chapter desk</Link>
        </div>
        <DeskMiniature />
      </section>

      <footer className="em-footer em-reveal">
        <h2>Published slowly, edited carefully.</h2>
        <div className="em-actions">
          <Link className="em-button em-button-primary" to="/skills/editorial-minimal/dashboard">Read Issue 03</Link>
          <Link className="em-button em-button-secondary" to="/skills/editorial-minimal">Back to skill</Link>
        </div>
      </footer>
    </main>
  )
}

function FieldworkDesk() {
  const [activeNote, setActiveNote] = useState(fieldNotes[1].id)
  const [saved, setSaved] = useState(false)
  const active = useMemo(() => fieldNotes.find((note) => note.id === activeNote) ?? fieldNotes[0], [activeNote])
  const root = useEditorialReveal()

  return (
    <main ref={root} className="em-page em-desk-page" data-skill="editorial-minimal" data-archetype="research-reading-desk">
      <div className="em-progress" aria-hidden="true"><span style={{ width: saved ? '78%' : '62%' }} /></div>
      <EditorialNav active="dashboard" />
      <section className="em-desk-shell em-reveal">
        <aside className="em-chapter-rail">
          <span className="em-kicker">Issue 03</span>
          <h1>Rooms without doors</h1>
          <p>How small urban pauses become temporary interiors.</p>
          <nav aria-label="Chapters">
            {chapters.map((chapter) => (
              <Link to="/skills/editorial-minimal/dashboard" data-active={chapter.no === '02' ? 'true' : undefined} key={chapter.no}>
                <span>{chapter.no}</span>
                <strong>{chapter.title}</strong>
              </Link>
            ))}
          </nav>
        </aside>

        <article className="em-reading-column">
          <header className="em-article-head">
            <span className="em-kicker">Chapter 02 / Elise Moreau / 9 min</span>
            <h2>A room does not always need a door.</h2>
            <p>
              In the city, rooms often appear as pauses: a bench beneath a wall, the sheltered end of a platform,
              a narrow passage where footsteps briefly soften.
            </p>
            <div className="em-meta-rule">
              <span>Field notes: 11</span>
              <span>Photographs: 5</span>
              <span>Status: edited</span>
              <button type="button" data-saved={saved ? 'true' : undefined} onClick={() => setSaved((value) => !value)}>
                {saved ? 'Saved' : 'Save chapter'}
              </button>
            </div>
          </header>

          <section className="em-article-body">
            <p>
              The most convincing temporary rooms are not designed as rooms at all. They are produced by rhythm.
              A cafe terrace before opening. A station platform between departures. A courtyard after rain.
              The city continues around them, but for a few minutes the demand to move is suspended.
            </p>
            <PullQuote>Quiet places are not empty places. They are places where the city has briefly stopped asking for something.</PullQuote>
            <p>
              In Paris, the passage near Rue Sainte-Avoye held this quality for twelve minutes. Four people crossed it,
              each at a different speed. None stayed, yet the passage did not feel empty. Its quiet came from repetition,
              not absence.
            </p>
            <ObservationPlate title={active.place} meta={`${active.city} / ${active.time}`} variant="passage" wide />
            <p>
              Lisbon offered a different version. Near Cais do Sodre, the edge of the station became still only when
              the river wind covered the sound of traffic. The space did not become silent. It became legible.
            </p>
          </section>

          <section className="em-footnotes">
            <h3>Footnotes and states</h3>
            {deskNotes.map(([label, text], index) => (
              <button type="button" data-state={index === 1 ? 'selected' : undefined} key={label}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{label}</strong>
                <em>{text}</em>
              </button>
            ))}
            <div className="em-empty-state">
              <strong>No unresolved source conflicts.</strong>
              <p>The frame stays visible so empty states do not become empty silence.</p>
            </div>
          </section>
        </article>

        <aside className="em-source-rail">
          <div className="em-source-card">
            <span className="em-kicker">Active field note</span>
            <strong>{active.place}</strong>
            <p>{active.signal}</p>
          </div>
          <div className="em-source-list">
            {fieldNotes.map((note) => (
              <button type="button" data-active={activeNote === note.id ? 'true' : undefined} onClick={() => setActiveNote(note.id)} key={note.id}>
                <span>{note.id}</span>
                <strong>{note.city}</strong>
                <em>{note.method}</em>
              </button>
            ))}
          </div>
          <div className="em-error-note">
            <span>Error state</span>
            <p>One transcript marker is missing; the article remains readable and links to recovery.</p>
          </div>
        </aside>
      </section>
    </main>
  )
}

function EditorialNav({ active }) {
  return (
    <header className="em-nav">
      <Link to="/skills/editorial-minimal" className="em-logo">FIELDWORK</Link>
      <nav>
        <Link data-active={active === 'vitrine' ? 'true' : undefined} to="/skills/editorial-minimal/vitrine">Vitrine</Link>
        <Link data-active={active === 'dashboard' ? 'true' : undefined} to="/skills/editorial-minimal/dashboard">Reading desk</Link>
        <Link to="/skills">Skills</Link>
      </nav>
    </header>
  )
}

function CaptionedPlate() {
  return (
    <figure className="em-captioned-plate">
      <ObservationPlate title="Rue des Gravilliers" meta="Paris / 07:12 / Courtyard watch" variant="courtyard" wide />
      <figcaption>
        <span>Plate 03.01</span>
        <strong>Morning courtyard with one delivery truck, two crossings, and eleven minutes of shared stillness.</strong>
      </figcaption>
    </figure>
  )
}

function ObservationPlate({ title, meta, variant, wide = false }) {
  return (
    <figure className="em-observation-plate" data-variant={variant} data-wide={wide ? 'true' : undefined}>
      <div className="em-plate-image">
        <div className="em-field-sheet">
          <span className="em-plate-caption-mark">FIELD NOTE</span>
          <strong>{title}</strong>
          <p>{meta}</p>
          <dl>
            <div><dt>Signal</dt><dd>Pause observed</dd></div>
            <div><dt>Method</dt><dd>Slow watch</dd></div>
            <div><dt>Frame</dt><dd>Public edge</dd></div>
          </dl>
        </div>
      </div>
      <figcaption>
        <span>{meta}</span>
        <strong>{title}</strong>
      </figcaption>
    </figure>
  )
}

function MarginNote({ index, label, children }) {
  return (
    <article className="em-margin-note">
      <span>{index}</span>
      <strong>{label}</strong>
      <p>{children}</p>
    </article>
  )
}

function PullQuote({ children }) {
  return <blockquote className="em-pullquote"><p>{children}</p></blockquote>
}

function DeskMiniature() {
  return (
    <div className="em-desk-miniature" aria-label="Reading desk preview">
      <div className="em-mini-left">
        {chapters.slice(0, 4).map((chapter) => <span data-active={chapter.no === '02' ? 'true' : undefined} key={chapter.no}>{chapter.no}</span>)}
      </div>
      <div className="em-mini-page">
        <span />
        <strong />
        <p />
        <p />
        <div />
      </div>
      <div className="em-mini-notes">
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

function useEditorialReveal() {
  const scope = useRef(null)
  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.from('.em-reveal', {
        clipPath: 'inset(0 0 14% 0)',
        y: 18,
        opacity: 0,
        duration: 0.72,
        ease: 'power3.out',
        stagger: 0.08,
      })
    },
    { scope },
  )
  return scope
}

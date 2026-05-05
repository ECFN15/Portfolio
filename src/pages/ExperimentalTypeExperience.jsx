import { useMemo, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const program = [
  { no: '01', title: 'Variable posters under pressure', stage: 'Main hall', time: '10:30', status: 'Live', role: 'success' },
  { no: '02', title: 'Compression as public identity', stage: 'Studio B', time: '12:00', status: 'Current', role: 'info' },
  { no: '03', title: 'Ticket systems without images', stage: 'Print room', time: '14:45', status: 'Needs review', role: 'warning' },
  { no: '04', title: 'Archive of extreme display faces', stage: 'Cinema', time: '18:15', status: 'Ready', role: 'neutral' },
]

const releases = [
  { name: 'Poster engine', owner: 'Festival team', state: 'Approved', role: 'success' },
  { name: 'Venue wayfinding', owner: 'Spatial crew', state: 'In review', role: 'info' },
  { name: 'Ticket counter', owner: 'Front desk', state: 'Slow', role: 'warning' },
  { name: 'Sponsor lockup', owner: 'Brand desk', state: 'Blocked', role: 'danger' },
]

const specimens = ['NO STATIC', 'WIDTH WINS', 'POSTER MODE', 'TYPE IS STAGE']

export default function ExperimentalTypeExperience() {
  const { view = 'vitrine' } = useParams()
  const { pathname } = useLocation()
  const activeView = pathname.endsWith('/article') ? 'dashboard' : view
  return activeView === 'dashboard' ? <TypeLab /> : <TypeFestVitrine />
}

function TypeFestVitrine() {
  const root = useExperimentalReveal()

  return (
    <main ref={root} className="ext-page" data-skill="experimental-type" data-archetype="red-black-editorial-display">
      <TypeNav active="vitrine" />
      <section className="ext-hero ext-reveal">
        <div className="ext-hero-meta">
          <span>TYPE//FEST 2026</span>
          <span>Paris / Variable identity lab</span>
          <span>4 stages / 18 sessions</span>
        </div>
        <h1 aria-label="No static type">
          <span>NO</span>
          <span>STATIC</span>
          <span>TYPE</span>
        </h1>
        <div className="ext-hero-bottom">
          <p>
            A severe campaign system for a typography festival where every poster, ticket, schedule row, and
            control panel is built from one compressed display behavior.
          </p>
          <Link className="ext-pill ext-pill-light" to="/skills/experimental-type/dashboard">Open specimen lab</Link>
        </div>
      </section>

      <section className="ext-red-scene ext-reveal">
        <div>
          <span>Statement field</span>
          <h2>One red scene. One typographic behavior.</h2>
        </div>
        <p>
          The visual identity uses black for utility, white for reading, and red only when the campaign needs a
          full-volume public signal.
        </p>
      </section>

      <KineticMarquee />

      <section className="ext-section ext-reveal">
        <header className="ext-section-head">
          <span>Program index</span>
          <h2>Sessions are rows, not generic event cards.</h2>
          <p>
            The public site behaves like a printed schedule: number, title, room, time, and state. Hover compresses
            the display title without hiding the functional data.
          </p>
        </header>
        <TypeIndex rows={program} />
      </section>

      <section className="ext-product-preview ext-reveal">
        <div className="ext-preview-copy">
          <span>Specialized product</span>
          <h2>The lab turns the campaign into a working poster system.</h2>
          <p>
            Editors can set sample text, weight, width, status, and output state. The interface is dense because the
            job is real: produce visible festival material without leaving the typographic system.
          </p>
          <Link className="ext-pill ext-pill-dark" to="/skills/experimental-type/dashboard">Launch lab</Link>
        </div>
        <LabMiniature />
      </section>
    </main>
  )
}

function TypeLab() {
  const [sample, setSample] = useState('NO STATIC')
  const [weight, setWeight] = useState(780)
  const [width, setWidth] = useState(76)
  const [stage, setStage] = useState('Main hall')
  const root = useExperimentalReveal()
  const status = useMemo(() => {
    if (sample.trim().length < 4) return { role: 'danger', label: 'Error' }
    if (width < 62 || weight > 880) return { role: 'warning', label: 'Watch' }
    return { role: 'success', label: 'Stable' }
  }, [sample, width, weight])

  return (
    <main ref={root} className="ext-page ext-lab-page" data-skill="experimental-type" data-archetype="specimen-tester">
      <TypeNav active="dashboard" />
      <section className="ext-lab-shell ext-reveal">
        <aside className="ext-lab-rail">
          <span>Specimen lab</span>
          <h1>Poster pressure console.</h1>
          <p>Live type controls for the TYPE//FEST public campaign.</p>
          <div className="ext-specimen-list" aria-label="Specimen presets">
            {specimens.map((item) => (
              <button type="button" data-active={sample === item ? 'true' : undefined} onClick={() => setSample(item)} key={item}>
                {item}
              </button>
            ))}
          </div>
        </aside>

        <article className="ext-specimen-stage">
          <div className="ext-stage-meta">
            <StatusPill role={status.role}>{status.label}</StatusPill>
            <span>Weight {weight}</span>
            <span>Width {width}</span>
            <span>{stage}</span>
          </div>
          <h2>
            <span style={{ '--ext-weight': weight, '--ext-width': width }}>{sample || 'EMPTY'}</span>
          </h2>
          <div className="ext-axis-panel">
            <label>
              <span>Sample</span>
              <input value={sample} onChange={(event) => setSample(event.target.value.toUpperCase())} maxLength={18} />
            </label>
            <label>
              <span>Weight <strong>{weight}</strong></span>
              <input type="range" min="520" max="920" step="10" value={weight} onChange={(event) => setWeight(Number(event.target.value))} />
            </label>
            <label>
              <span>Width <strong>{width}</strong></span>
              <input type="range" min="54" max="112" step="2" value={width} onChange={(event) => setWidth(Number(event.target.value))} />
            </label>
            <label>
              <span>Stage</span>
              <select value={stage} onChange={(event) => setStage(event.target.value)}>
                <option>Main hall</option>
                <option>Studio B</option>
                <option>Print room</option>
                <option>Cinema</option>
              </select>
            </label>
          </div>
        </article>

        <aside className="ext-output-panel">
          <div className="ext-poster-output">
            <span>TYPE//FEST</span>
            <strong style={{ '--ext-weight': weight, '--ext-width': width }}>{sample || 'EMPTY'}</strong>
            <em>{stage} / exported poster proof</em>
          </div>
          <div className="ext-release-stack">
            {releases.map((release) => (
              <article data-role={release.role} key={release.name}>
                <StatusPill role={release.role}>{release.state}</StatusPill>
                <strong>{release.name}</strong>
                <span>{release.owner}</span>
              </article>
            ))}
          </div>
        </aside>
      </section>
    </main>
  )
}

function TypeNav({ active }) {
  return (
    <header className="ext-nav">
      <Link to="/skills/experimental-type" className="ext-logo">TYPE//FEST</Link>
      <nav>
        <Link data-active={active === 'vitrine' ? 'true' : undefined} to="/skills/experimental-type/vitrine">Vitrine</Link>
        <Link data-active={active === 'dashboard' ? 'true' : undefined} to="/skills/experimental-type/dashboard">Specimen lab</Link>
        <Link to="/skills">Skills</Link>
      </nav>
    </header>
  )
}

function TypeIndex({ rows }) {
  return (
    <div className="ext-index">
      {rows.map((row) => (
        <Link className="ext-index-row" to="/skills/experimental-type/dashboard" key={row.no}>
          <span>{row.no}</span>
          <strong>{row.title}</strong>
          <em>{row.stage}</em>
          <i>{row.time}</i>
          <StatusPill role={row.role}>{row.status}</StatusPill>
        </Link>
      ))}
    </div>
  )
}

function KineticMarquee() {
  const lane = ['WIDTH', 'WEIGHT', 'RHYTHM', 'PRESSURE', 'DISPLAY']
  return (
    <section className="ext-marquee ext-reveal" aria-label="Campaign vocabulary">
      <div className="ext-marquee-track">
        {[...lane, ...lane].map((item, index) => <span aria-hidden={index >= lane.length ? 'true' : undefined} key={`${item}-${index}`}>{item}</span>)}
      </div>
    </section>
  )
}

function LabMiniature() {
  return (
    <div className="ext-lab-miniature" aria-label="Specimen lab preview">
      <div className="ext-mini-top">
        <span>STABLE</span>
        <span>W780</span>
        <span>WD76</span>
      </div>
      <strong>WIDTH WINS</strong>
      <div className="ext-mini-controls">
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

function StatusPill({ role = 'neutral', children }) {
  return <span className="ext-status-pill" data-role={role}>{children}</span>
}

function useExperimentalReveal() {
  const scope = useRef(null)
  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.from('.ext-reveal', {
        y: 28,
        opacity: 0,
        duration: 0.76,
        ease: 'power3.out',
        stagger: 0.06,
      })
    },
    { scope },
  )
  return scope
}

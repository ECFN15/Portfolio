import { useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const shots = [
  { id: 'S01', name: 'Open on product', duration: '00:06', state: 'Synced', role: 'success', progress: 92 },
  { id: 'S02', name: 'Gesture capture', duration: '00:08', state: 'Active', role: 'info', progress: 68 },
  { id: 'S03', name: 'UI overlay', duration: '00:05', state: 'Needs review', role: 'warning', progress: 44 },
  { id: 'S04', name: 'End card', duration: '00:04', state: 'Draft', role: 'neutral', progress: 28 },
]

const renderQueue = [
  ['Social 9:16', 'Rendering', '68%'],
  ['Hero 16:9', 'Queued', '00:18'],
  ['Store loop', 'Ready', '00:12'],
]

export default function MotionExperience() {
  const { view = 'vitrine' } = useParams()
  return view === 'dashboard' ? <FrameRunStudio /> : <FrameRunVitrine />
}

function FrameRunVitrine() {
  const root = useMotionReveal()

  return (
    <main ref={root} className="mox-page" data-skill="motion" data-archetype="geometric-soft-cards">
      <MotionNav active="vitrine" />
      <section className="mox-hero mox-reveal">
        <div className="mox-copy">
          <span className="mox-kicker">FrameRun / kinetic launch system</span>
          <h1>Motion shows the launch arc before the film renders.</h1>
          <p>
            A product page for creative teams shipping video launches. The first screen is a moving storyboard: frames, playhead,
            status, queue, and timing all explain the workflow.
          </p>
          <div className="mox-actions">
            <Link className="mox-button mox-button--primary" to="/skills/motion/dashboard">Open sequence studio</Link>
            <a className="mox-button mox-button--ghost" href="#storyboard">Watch storyboard</a>
          </div>
        </div>
        <StoryboardStage />
      </section>

      <MarqueeStrip items={['Brief', 'Capture', 'Cut', 'Overlay', 'Render', 'Publish']} />

      <section id="storyboard" className="mox-section mox-reveal">
        <div>
          <span className="mox-kicker">Choreography map</span>
          <h2>Every movement has a job: reveal, state, sequence, or feedback.</h2>
          <p>
            FrameRun avoids animation spam. The playhead explains time, cards show shot state, marquee shows pipeline continuity,
            and the studio page lets editors scrub decisions directly.
          </p>
        </div>
        <div className="mox-proof-grid">
          {shots.map((shot) => (
            <article key={shot.id}>
              <span>{shot.id}</span>
              <strong>{shot.name}</strong>
              <i><b style={{ width: `${shot.progress}%` }} /></i>
              <StatusPill role={shot.role}>{shot.state}</StatusPill>
            </article>
          ))}
        </div>
      </section>

      <section className="mox-preview mox-reveal">
        <div>
          <span className="mox-kicker">Specialized interface</span>
          <h2>The dashboard is a sequencer, not a static mockup.</h2>
          <p>Select shots, read duration, inspect queue state, and watch the playhead keep context inside a technical motion tool.</p>
          <Link className="mox-button mox-button--primary" to="/skills/motion/dashboard">Open studio</Link>
        </div>
        <StudioMini />
      </section>
    </main>
  )
}

function FrameRunStudio() {
  const [selectedId, setSelectedId] = useState('S02')
  const root = useMotionReveal()
  const selected = useMemo(() => shots.find((shot) => shot.id === selectedId) ?? shots[0], [selectedId])

  return (
    <main ref={root} className="mox-page mox-page--studio" data-skill="motion" data-archetype="sequence-studio">
      <MotionNav active="dashboard" />
      <section className="mox-studio mox-reveal">
        <aside className="mox-side">
          <span className="mox-kicker">Sequence studio</span>
          <h1>Launch cut 04.</h1>
          <p>Timeline, shots, render queue, and state feedback in one kinetic editor surface.</p>
          <div className="mox-playhead-card">
            <span>Playhead</span>
            <strong>00:18</strong>
            <i><b /></i>
          </div>
        </aside>

        <section className="mox-main">
          <header className="mox-head">
            <div>
              <span className="mox-kicker">Campaign film / 23 seconds</span>
              <h2>Motion timeline</h2>
            </div>
            <StatusPill role={selected.role}>{selected.state}</StatusPill>
          </header>

          <div className="mox-studio-grid">
            <section className="mox-timeline">
              {shots.map((shot) => (
                <button type="button" data-active={selectedId === shot.id ? 'true' : undefined} onClick={() => setSelectedId(shot.id)} key={shot.id}>
                  <span>{shot.id}</span>
                  <strong>{shot.name}</strong>
                  <i><b style={{ width: `${shot.progress}%` }} /></i>
                  <em>{shot.duration}</em>
                </button>
              ))}
            </section>

            <section className="mox-inspector">
              <span className="mox-kicker">Selected shot</span>
              <h3>{selected.name}</h3>
              <dl>
                <div><dt>ID</dt><dd>{selected.id}</dd></div>
                <div><dt>Duration</dt><dd>{selected.duration}</dd></div>
                <div><dt>Progress</dt><dd>{selected.progress}%</dd></div>
              </dl>
            </section>

            <section className="mox-render">
              <div className="mox-panel-head">
                <span className="mox-kicker">Render queue</span>
                <strong>3 outputs</strong>
              </div>
              {renderQueue.map(([name, state, time]) => (
                <article key={name}>
                  <strong>{name}</strong>
                  <span>{state}</span>
                  <em>{time}</em>
                </article>
              ))}
            </section>

            <section className="mox-stage-panel">
              <StoryboardStage compact />
            </section>
          </div>
        </section>
      </section>
    </main>
  )
}

function MotionNav({ active }) {
  return (
    <header className="mox-nav">
      <Link to="/skills/motion" className="mox-logo">FrameRun</Link>
      <nav aria-label="FrameRun pages">
        <Link data-active={active === 'vitrine' ? 'true' : undefined} to="/skills/motion/vitrine">Vitrine</Link>
        <Link data-active={active === 'dashboard' ? 'true' : undefined} to="/skills/motion/dashboard">Studio</Link>
        <Link to="/skills">Skills</Link>
      </nav>
    </header>
  )
}

function StoryboardStage({ compact = false }) {
  return (
    <div className="mox-stage" data-compact={compact ? 'true' : undefined} aria-label="Animated FrameRun storyboard">
      <div className="mox-orbit" aria-hidden="true" />
      <div className="mox-frame-stack">
        {shots.map((shot, index) => (
          <article style={{ '--i': index }} key={shot.id}>
            <span>{shot.id}</span>
            <strong>{shot.name}</strong>
            <em>{shot.duration}</em>
          </article>
        ))}
      </div>
      <div className="mox-playhead" aria-hidden="true" />
    </div>
  )
}

function MarqueeStrip({ items }) {
  const loop = [...items, ...items]
  return (
    <div className="mox-marquee" aria-label={items.join(', ')}>
      <div aria-hidden="true">
        {loop.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
      </div>
    </div>
  )
}

function StudioMini() {
  return (
    <div className="mox-mini" aria-label="FrameRun studio preview">
      <StoryboardStage compact />
    </div>
  )
}

function StatusPill({ role = 'neutral', children }) {
  return <span className="mox-status" data-role={role}>{children}</span>
}

function useMotionReveal() {
  const scope = useRef(null)
  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.from('.mox-reveal', { opacity: 0, y: 34, duration: 0.8, ease: 'power3.out', stagger: 0.07 })
      gsap.from('.mox-frame-stack article', { opacity: 0, y: 30, rotate: -3, duration: 0.75, ease: 'back.out(1.4)', stagger: 0.08, delay: 0.1 })
    },
    { scope },
  )
  return scope
}

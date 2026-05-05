import { useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const missions = [
  { id: 'M1', title: 'Draw a planet', level: 'Starter', progress: 100, state: 'Complete', role: 'success' },
  { id: 'M2', title: 'Match the orbit', level: 'Practice', progress: 62, state: 'Current', role: 'info' },
  { id: 'M3', title: 'Record a launch note', level: 'Creative', progress: 20, state: 'Locked', role: 'neutral' },
  { id: 'M4', title: 'Share the badge', level: 'Reward', progress: 0, state: 'Locked', role: 'warning' },
]

export default function PlayfulDesignExperience() {
  const { view = 'vitrine' } = useParams()
  return view === 'dashboard' ? <OrbitMissionBuilder /> : <OrbitVitrine />
}

function OrbitVitrine() {
  const root = usePlayReveal()

  return (
    <main ref={root} className="plx-page" data-skill="playful-design" data-archetype="gamified-learning-starter-kit">
      <PlayNav active="vitrine" />
      <section className="plx-hero plx-reveal">
        <div className="plx-copy">
          <span className="plx-sticker">New mission path</span>
          <h1>Creative practice that feels worth finishing.</h1>
          <p>
            OrbitKids helps families turn drawing, reading, and tiny science prompts into short missions with visible progress,
            reward feedback, and controls that feel physical without becoming noisy.
          </p>
          <div className="plx-actions">
            <Link className="plx-button plx-button--primary" to="/skills/playful-design/dashboard">Start mission</Link>
            <a className="plx-button plx-button--ghost" href="#path">See progress path</a>
          </div>
        </div>
        <MissionHeroCard />
      </section>

      <section id="path" className="plx-section plx-reveal">
        <div>
          <span className="plx-kicker">Progress with purpose</span>
          <h2>Rewards appear after effort, not after random clicks.</h2>
          <p>Each mission step has a label, state, progress value, and recovery path. Playfulness helps comprehension.</p>
        </div>
        <ProgressPath />
      </section>

      <section className="plx-preview plx-reveal">
        <div>
          <span className="plx-kicker">Specialized builder</span>
          <h2>The dashboard configures a real learning mission.</h2>
          <p>Select a mission, tune difficulty, inspect reward progress, and save the next activity with tactile states.</p>
          <Link className="plx-button plx-button--primary" to="/skills/playful-design/dashboard">Open builder</Link>
        </div>
        <BuilderMini />
      </section>
    </main>
  )
}

function OrbitMissionBuilder() {
  const [selectedId, setSelectedId] = useState('M2')
  const [difficulty, setDifficulty] = useState('Warm-up')
  const root = usePlayReveal()
  const selected = useMemo(() => missions.find((mission) => mission.id === selectedId) ?? missions[0], [selectedId])

  return (
    <main ref={root} className="plx-page plx-page--builder" data-skill="playful-design" data-archetype="mission-builder">
      <PlayNav active="dashboard" />
      <section className="plx-builder plx-reveal">
        <aside className="plx-side">
          <span className="plx-kicker">Mission builder</span>
          <h1>Orbit path.</h1>
          <p>Choose the next creative mission, set challenge level, and keep progress visible.</p>
          <div className="plx-difficulty" role="tablist" aria-label="Difficulty">
            {['Warm-up', 'Focus', 'Challenge'].map((item) => (
              <button type="button" role="tab" aria-selected={difficulty === item} data-active={difficulty === item ? 'true' : undefined} onClick={() => setDifficulty(item)} key={item}>
                {item}
              </button>
            ))}
          </div>
        </aside>

        <section className="plx-main">
          <header className="plx-head">
            <div>
              <span className="plx-kicker">{difficulty} / selected mission</span>
              <h2>{selected.title}</h2>
            </div>
            <StatusPill role={selected.role}>{selected.state}</StatusPill>
          </header>

          <div className="plx-grid">
            <section className="plx-score">
              <span className="plx-kicker">Progress</span>
              <strong>{selected.progress}%</strong>
              <i><b style={{ width: `${selected.progress}%` }} /></i>
            </section>

            <section className="plx-roster">
              {missions.map((mission) => (
                <button type="button" data-active={selectedId === mission.id ? 'true' : undefined} onClick={() => setSelectedId(mission.id)} key={mission.id}>
                  <span>{mission.id}</span>
                  <strong>{mission.title}</strong>
                  <em>{mission.level}</em>
                  <StatusPill role={mission.role}>{mission.state}</StatusPill>
                </button>
              ))}
            </section>

            <section className="plx-reward">
              <span className="plx-sticker">+20 sparks</span>
              <h3>Reward preview</h3>
              <p>Unlocks only when the orbit match reaches 80 percent and the launch note is recorded.</p>
              <button type="button" className="plx-button plx-button--primary">Save mission</button>
            </section>

            <section className="plx-form">
              <span className="plx-kicker">Activity note</span>
              <label>
                Prompt
                <textarea defaultValue="Draw the planet first, then drag the moon to match the orbit path." />
              </label>
              <label>
                Recovery hint
                <input defaultValue="Try a wider circle before checking the answer." />
              </label>
            </section>
          </div>
        </section>
      </section>
    </main>
  )
}

function PlayNav({ active }) {
  return (
    <header className="plx-nav">
      <Link to="/skills/playful-design" className="plx-logo">OrbitKids</Link>
      <nav aria-label="OrbitKids pages">
        <Link data-active={active === 'vitrine' ? 'true' : undefined} to="/skills/playful-design/vitrine">Vitrine</Link>
        <Link data-active={active === 'dashboard' ? 'true' : undefined} to="/skills/playful-design/dashboard">Builder</Link>
        <Link to="/skills">Skills</Link>
      </nav>
    </header>
  )
}

function MissionHeroCard() {
  return (
    <div className="plx-mission-card" aria-label="OrbitKids mission preview">
      <span className="plx-sticker">Step 2 of 4</span>
      <h2>Match the orbit</h2>
      <p>Drag the moon until the path feels smooth. Then record one sentence about what changed.</p>
      <div className="plx-orbit" aria-hidden="true"><i /></div>
      <button type="button" className="plx-button plx-button--primary">Continue</button>
    </div>
  )
}

function ProgressPath() {
  return (
    <ol className="plx-path" aria-label="Mission progress">
      {missions.map((mission, index) => (
        <li data-state={mission.role} key={mission.id}>
          <span>{index + 1}</span>
          <strong>{mission.title}</strong>
          <em>{mission.state}</em>
        </li>
      ))}
    </ol>
  )
}

function BuilderMini() {
  return (
    <div className="plx-mini" aria-label="Mission builder preview">
      <MissionHeroCard />
    </div>
  )
}

function StatusPill({ role = 'neutral', children }) {
  return <span className="plx-status" data-role={role}>{children}</span>
}

function usePlayReveal() {
  const scope = useRef(null)
  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.from('.plx-reveal', { opacity: 0, y: 24, duration: 0.62, ease: 'back.out(1.25)', stagger: 0.07 })
      gsap.from('.plx-sticker', { scale: 0.88, rotate: -4, duration: 0.45, ease: 'back.out(2)', stagger: 0.06 })
    },
    { scope },
  )
  return scope
}

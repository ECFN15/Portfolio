import { useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const tasks = [
  { title: 'Homepage experiment', owner: 'Nora', day: 'Mon', status: 'Active', role: 'info', load: 4 },
  { title: 'Billing empty state', owner: 'Eli', day: 'Tue', status: 'Needs review', role: 'warning', load: 2 },
  { title: 'API docs refresh', owner: 'Maya', day: 'Wed', status: 'Synced', role: 'success', load: 3 },
  { title: 'Q2 roadmap memo', owner: 'Jon', day: 'Thu', status: 'Draft', role: 'neutral', load: 2 },
  { title: 'Mobile nav QA', owner: 'Iris', day: 'Fri', status: 'Blocked', role: 'danger', load: 1 },
]

const capacity = [
  ['Design', '28h', 72, 'info'],
  ['Engineering', '34h', 84, 'warning'],
  ['Research', '16h', 46, 'success'],
]

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

export default function LightUiExperience() {
  const { view = 'vitrine' } = useParams()
  return view === 'dashboard' ? <DaylineWorkspace /> : <DaylineVitrine />
}

function DaylineVitrine() {
  const root = useLightReveal()

  return (
    <main ref={root} className="lux-page" data-skill="light-ui" data-archetype="productivity-surface">
      <DaylineNav active="vitrine" />
      <section className="lux-hero lux-reveal">
        <div className="lux-hero-copy">
          <span className="lux-kicker">Dayline / weekly planning surface</span>
          <h1>Plan the week in a bright workspace that does not disappear into white.</h1>
          <p>
            Dayline gives product teams one calm surface for goals, capacity, meetings, blockers, and owner decisions. Every white
            panel has a job, a border, and a visible state.
          </p>
          <div className="lux-actions">
            <Link className="lux-button lux-button--primary" to="/skills/light-ui/dashboard">Open planning workspace</Link>
            <a className="lux-button lux-button--secondary" href="#surface-proof">Inspect surface system</a>
          </div>
        </div>
        <DaylineShell compact />
      </section>

      <section className="lux-stat-strip lux-reveal" aria-label="Dayline product metrics">
        {[
          ['36 tasks', 'scheduled with owner and day'],
          ['84%', 'engineering load warning visible'],
          ['5 blockers', 'surfaced before Monday standup'],
        ].map(([value, label]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      <section id="surface-proof" className="lux-section lux-reveal">
        <div className="lux-section-copy">
          <span className="lux-kicker">White chrome</span>
          <h2>Brightness is organized with rails, rows, borders, and labeled states.</h2>
          <p>
            The interface avoids blank white cards by showing real planning evidence: tasks, owners, capacity bars, blockers,
            weekly goals, and selected filters inside a stable app shell.
          </p>
        </div>
        <div className="lux-feature-grid">
          {[
            ['Focused rail', 'Team, week, backlog, and blocker navigation stay compact and scan-friendly.'],
            ['Visible states', 'Selected tabs, blocked rows, success chips, and focus rings work on white.'],
            ['Light data', 'Rows keep owner, day, load, and status readable without becoming a dark dashboard.'],
          ].map(([title, body]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lux-preview lux-reveal">
        <div>
          <span className="lux-kicker">Specialized workspace</span>
          <h2>The dashboard is a real planner, not a static preview.</h2>
          <p>Filter by team, inspect load, assign owners, and see day-by-day work inside the full Dayline workspace.</p>
          <Link className="lux-button lux-button--primary" to="/skills/light-ui/dashboard">Plan this week</Link>
        </div>
        <WorkspaceMini />
      </section>
    </main>
  )
}

function DaylineWorkspace() {
  const [team, setTeam] = useState('Product')
  const [selectedDay, setSelectedDay] = useState('Mon')
  const root = useLightReveal()
  const dayTasks = useMemo(() => tasks.filter((task) => task.day === selectedDay), [selectedDay])

  return (
    <main ref={root} className="lux-page lux-page--workspace" data-skill="light-ui" data-archetype="bright-app-shell">
      <DaylineNav active="dashboard" />
      <section className="lux-workspace lux-reveal">
        <aside className="lux-rail">
          <div>
            <span className="lux-kicker">Workspace</span>
            <h1>Week 19</h1>
          </div>
          <nav aria-label="Workspace sections">
            {['Overview', 'Capacity', 'Backlog', 'Blockers'].map((item, index) => (
              <button type="button" data-active={index === 0 ? 'true' : undefined} key={item}>{item}</button>
            ))}
          </nav>
          <div className="lux-empty-note">
            <strong>No unassigned work</strong>
            <span>All active tasks have owners for this week.</span>
          </div>
        </aside>

        <section className="lux-main">
          <header className="lux-toolbar">
            <label>
              <span>Search</span>
              <input defaultValue="billing, docs, launch" />
            </label>
            <div className="lux-team-switch" role="tablist" aria-label="Team">
              {['Product', 'Design', 'Engineering'].map((item) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={team === item}
                  data-active={team === item ? 'true' : undefined}
                  onClick={() => setTeam(item)}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
            <button type="button" className="lux-button lux-button--primary">Create task</button>
          </header>

          <div className="lux-work-grid">
            <section className="lux-week-card">
              <div className="lux-card-head">
                <div>
                  <span className="lux-kicker">{team} plan</span>
                  <h2>Day board</h2>
                </div>
                <StatusPill role="info">Current week</StatusPill>
              </div>
              <div className="lux-day-tabs" role="tablist" aria-label="Week days">
                {days.map((day) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selectedDay === day}
                    data-active={selectedDay === day ? 'true' : undefined}
                    onClick={() => setSelectedDay(day)}
                    key={day}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <TaskTable rows={dayTasks.length ? dayTasks : tasks.slice(0, 2)} />
            </section>

            <section className="lux-capacity">
              <div className="lux-card-head">
                <div>
                  <span className="lux-kicker">Capacity</span>
                  <h2>Load</h2>
                </div>
              </div>
              {capacity.map(([label, value, percent, role]) => (
                <article data-role={role} key={label}>
                  <div>
                    <strong>{label}</strong>
                    <span>{value}</span>
                  </div>
                  <i><b style={{ width: `${percent}%` }} /></i>
                  <StatusPill role={role}>{percent}%</StatusPill>
                </article>
              ))}
            </section>

            <section className="lux-blockers">
              <div className="lux-card-head">
                <div>
                  <span className="lux-kicker">Blockers</span>
                  <h2>Needs decision</h2>
                </div>
              </div>
              {tasks.filter((task) => task.role === 'danger' || task.role === 'warning').map((task) => (
                <article key={task.title}>
                  <strong>{task.title}</strong>
                  <span>{task.owner} / {task.day}</span>
                  <StatusPill role={task.role}>{task.status}</StatusPill>
                </article>
              ))}
            </section>
          </div>
        </section>
      </section>
    </main>
  )
}

function DaylineNav({ active }) {
  return (
    <header className="lux-nav">
      <Link to="/skills/light-ui" className="lux-logo">Dayline</Link>
      <nav aria-label="Dayline pages">
        <Link data-active={active === 'vitrine' ? 'true' : undefined} to="/skills/light-ui/vitrine">Vitrine</Link>
        <Link data-active={active === 'dashboard' ? 'true' : undefined} to="/skills/light-ui/dashboard">Workspace</Link>
        <Link to="/skills">Skills</Link>
      </nav>
    </header>
  )
}

function DaylineShell({ compact = false }) {
  return (
    <div className="lux-shell" data-compact={compact ? 'true' : undefined} aria-label="Dayline app shell preview">
      <aside>
        <strong>Dayline</strong>
        {['Plan', 'Tasks', 'Capacity'].map((item, index) => <span data-active={index === 0 ? 'true' : undefined} key={item}>{item}</span>)}
      </aside>
      <div className="lux-shell-main">
        <div className="lux-shell-bar">
          <span>Week 19</span>
          <button type="button">New task</button>
        </div>
        <div className="lux-shell-grid">
          <TaskTable rows={tasks.slice(0, compact ? 4 : tasks.length)} />
          <div className="lux-shell-side">
            {capacity.map(([label, value, percent, role]) => (
              <article data-role={role} key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <i><b style={{ width: `${percent}%` }} /></i>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TaskTable({ rows }) {
  return (
    <div className="lux-table-wrap">
      <table className="lux-table">
        <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Owner</th>
            <th scope="col">Day</th>
            <th scope="col">Load</th>
            <th scope="col">State</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((task) => (
            <tr data-role={task.role} key={`${task.title}-${task.day}`}>
              <td>{task.title}</td>
              <td>{task.owner}</td>
              <td>{task.day}</td>
              <td>{task.load}h</td>
              <td><StatusPill role={task.role}>{task.status}</StatusPill></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function WorkspaceMini() {
  return (
    <div className="lux-mini" aria-label="Dayline workspace preview">
      <DaylineShell compact />
    </div>
  )
}

function StatusPill({ role = 'neutral', children }) {
  return <span className="lux-status" data-role={role}>{children}</span>
}

function useLightReveal() {
  const scope = useRef(null)
  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return

      gsap.from('.lux-reveal', {
        y: 24,
        opacity: 0,
        duration: 0.72,
        ease: 'power3.out',
        stagger: 0.07,
      })

      gsap.from('.lux-table tbody tr, .lux-capacity article', {
        backgroundColor: '#eef4ff',
        duration: 0.55,
        ease: 'power2.out',
        stagger: 0.04,
        delay: 0.1,
      })
    },
    { scope },
  )
  return scope
}

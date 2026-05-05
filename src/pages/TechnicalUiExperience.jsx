import { Link, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const incidents = [
  { id: 'INC-1842', source: 'Billing sync', owner: 'Nora', state: 'Failed', role: 'danger', updated: '4m ago', next: 'Retry job' },
  { id: 'INC-1843', source: 'Webhook queue', owner: 'Idris', state: 'Running', role: 'info', updated: '9m ago', next: 'Watch lag' },
  { id: 'INC-1844', source: 'CRM import', owner: 'Maya', state: 'Stale', role: 'warning', updated: '41m ago', next: 'Assign legal' },
  { id: 'INC-1845', source: 'Model eval', owner: 'Sam', state: 'Stable', role: 'success', updated: '1h ago', next: 'Close' },
]

const logs = [
  ['10:44:12', 'error', 'stripe.worker', 'Token expired for tenant atlas-17'],
  ['10:44:29', 'warn', 'queue.replay', 'Retry scheduled with backoff 120s'],
  ['10:45:02', 'info', 'owner.route', 'Assigned to Nora via policy P-03'],
]

export default function TechnicalUiExperience() {
  const { view } = useParams()
  return view === 'dashboard' ? <OpsMatrixDesk /> : <OpsMatrixVitrine />
}

function OpsMatrixVitrine() {
  useUiReveal()

  return (
    <main className="tui-page">
      <TuiNav active="vitrine" />
      <section className="tui-landing tui-reveal">
        <div className="tui-copy">
          <span className="tui-kicker">OpsMatrix workstation</span>
          <h1>Resolve operational incidents with every control in reach.</h1>
          <p>
            OpsMatrix rassemble files d'attente, imports, owners, runbooks et logs dans une interface faite pour
            des actions repetees sans perte de contexte.
          </p>
          <div className="tui-actions">
            <Link className="tui-button" to="/skills/technical-ui/dashboard">Ouvrir le poste</Link>
            <Link className="tui-link" to="/skills/technical-ui">Retour au skill</Link>
          </div>
        </div>
        <WorkstationMini />
      </section>

      <section className="tui-section tui-reveal">
        <header>
          <span className="tui-kicker">Ergonomie operationnelle</span>
          <h2>Filtres, etats et recuperation visibles au meme endroit.</h2>
          <p>Chaque record expose son etat, son owner, son horodatage et la prochaine action possible.</p>
        </header>
        <div className="tui-feature-grid">
          {['Filter builder', 'Inspector dirty state', 'Paused live logs', 'Recovery action'].map((item, index) => (
            <article data-state={index === 1 ? 'selected' : 'default'} key={item}>
              <span>0{index + 1}</span>
              <strong>{item}</strong>
              <p>{index === 2 ? 'Le flux peut etre pause sans perdre la trace courante.' : 'Controle proche du contenu affecte, sans panneau decoratif.'}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function OpsMatrixDesk() {
  const selected = incidents[0]
  useUiReveal()

  return (
    <main className="tui-page tui-page--desk">
      <TuiNav active="dashboard" />
      <section className="tui-workstation tui-reveal">
        <aside className="tui-side">
          <span className="tui-kicker">Workspace</span>
          {['Queue', 'Records', 'Automations', 'Reports', 'Settings'].map((item, index) => (
            <button type="button" data-active={index === 0} key={item}>{item}</button>
          ))}
        </aside>

        <div className="tui-main">
          <header className="tui-toolbar">
            <label>
              <span>Search</span>
              <input defaultValue="state:failed owner:nora" />
            </label>
            <button type="button">Filter</button>
            <button type="button">Export</button>
            <button className="tui-button" type="button">New runbook</button>
          </header>

          <section className="tui-grid">
            <div className="tui-table">
              <div className="tui-filterbar">
                {['state is failed', 'owner is Nora', 'updated before 10m'].map((chip) => (
                  <button type="button" key={chip}>{chip}</button>
                ))}
                <span>3 selected filters</span>
              </div>
              <table>
                <thead>
                  <tr><th>ID</th><th>Source</th><th>Owner</th><th>State</th><th>Updated</th><th>Next</th></tr>
                </thead>
                <tbody>
                  {incidents.map((item, index) => (
                    <tr data-selected={index === 0} data-role={item.role} key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.source}</td>
                      <td>{item.owner}</td>
                      <td><StatusPill role={item.role}>{item.state}</StatusPill></td>
                      <td>{item.updated}</td>
                      <td>{item.next}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <aside className="tui-inspector">
              <header>
                <span className="tui-kicker">Inspector</span>
                <StatusPill role={selected.role}>{selected.state}</StatusPill>
              </header>
              <h2>{selected.id}</h2>
              <dl>
                <div><dt>Reason</dt><dd>OAuth token expired during billing delta import.</dd></div>
                <div><dt>Owner</dt><dd>{selected.owner}</dd></div>
                <div><dt>Permission</dt><dd>Write enabled, destructive retry requires confirm.</dd></div>
              </dl>
              <footer>
                <button type="button">Open runbook</button>
                <button type="button">Retry job</button>
              </footer>
            </aside>

            <article className="tui-logs">
              <header>
                <span className="tui-kicker">Live paused</span>
                <StatusPill role="warning">Stale</StatusPill>
              </header>
              {logs.map(([time, level, service, message]) => (
                <p data-level={level} key={time}>
                  <span>{time}</span>
                  <em>{level}</em>
                  <strong>{service}</strong>
                  <small>{message}</small>
                </p>
              ))}
            </article>
          </section>
        </div>
      </section>
    </main>
  )
}

function TuiNav({ active }) {
  return (
    <header className="tui-nav">
      <Link className="tui-logo" to="/skills/technical-ui">OpsMatrix</Link>
      <nav aria-label="Navigation OpsMatrix">
        <Link data-active={active === 'vitrine'} to="/skills/technical-ui/vitrine">Vitrine</Link>
        <Link data-active={active === 'dashboard'} to="/skills/technical-ui/dashboard">Poste</Link>
        <Link to="/skills">Skills</Link>
      </nav>
    </header>
  )
}

function WorkstationMini() {
  return (
    <div className="tui-mini">
      <div className="tui-table">
        <div className="tui-filterbar">
          <button type="button">state is failed</button>
          <button type="button">owner is Nora</button>
          <span>saved view</span>
        </div>
        <table>
          <tbody>
            {incidents.slice(0, 3).map((item, index) => (
              <tr data-selected={index === 0} data-role={item.role} key={item.id}>
                <td>{item.id}</td>
                <td>{item.source}</td>
                <td><StatusPill role={item.role}>{item.state}</StatusPill></td>
                <td>{item.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <article className="tui-logs">
        {logs.slice(0, 2).map(([time, level, service, message]) => (
          <p data-level={level} key={time}>
            <span>{time}</span>
            <em>{level}</em>
            <strong>{service}</strong>
            <small>{message}</small>
          </p>
        ))}
      </article>
    </div>
  )
}

function StatusPill({ role, children }) {
  return <span className="tui-status" data-role={role}>{children}</span>
}

function useUiReveal() {
  useGSAP(() => {
    gsap.from('.tui-reveal', {
      y: 12,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.06,
    })
  }, [])
}

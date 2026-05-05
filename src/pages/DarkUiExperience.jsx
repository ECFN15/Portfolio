import { useMemo, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const services = [
  { id: 'checkout', name: 'Checkout API', status: 'Degraded', role: 'warning', owner: 'Payments', latency: '1240 ms' },
  { id: 'redis', name: 'Redis Cache', status: 'Critical', role: 'danger', owner: 'Platform', latency: '890 ms' },
  { id: 'fraud', name: 'Fraud Engine', status: 'Stable', role: 'success', owner: 'Risk', latency: '210 ms' },
  { id: 'gateway', name: 'Gateway Edge', status: 'Active', role: 'info', owner: 'Infra', latency: '82 ms' },
]

const timeline = [
  ['02:04', 'Release v4.18.2 started', 'Deploy queued across EU-West.'],
  ['02:11', 'Redis wait time increased', 'Connection pool wait crossed 800 ms.'],
  ['02:14', 'Incident opened automatically', 'P1 assigned to checkout reliability.'],
  ['02:24', 'AI triage completed', '76% correlation with release and cache pool saturation.'],
  ['02:31', 'Rollback plan ready', 'No schema migration detected.'],
]

const logs = [
  ['02:28:15', 'ai-triage', 'analysis complete, rollback path generated', 'success'],
  ['02:28:09', 'checkout-api', 'cache_pool_wait above threshold', 'warning'],
  ['02:27:52', 'deploy-core', 'schema migration check returned none', 'success'],
  ['02:26:48', 'redis', 'connection_pool saturation detected', 'danger'],
  ['02:25:11', 'status', 'customer impact estimate updated', 'info'],
]

const thread = [
  ['Caldera Agent', 'Release v4.18.2 and Redis saturation share a six minute window.', 'assistant'],
  ['Maya Chen', 'Check whether EU-Central is starting to drift.', 'user'],
  ['Caldera Agent', 'EU-West is primary. EU-Central shows early warning only.', 'assistant'],
  ['Theo Martin', 'Rollback is safe. No database migration in this deploy.', 'user'],
]

export default function DarkUiExperience() {
  const { view = 'vitrine' } = useParams()
  const { pathname } = useLocation()
  const activeView = pathname.endsWith('/incident') ? 'dashboard' : pathname.endsWith('/triage') ? 'vitrine' : view
  return activeView === 'dashboard' ? <DarkDashboard /> : <DarkVitrine />
}

function DarkVitrine() {
  const root = useDarkReveal()

  return (
    <main ref={root} className="du-page" data-skill="dark-ui" data-archetype="superwhisper-command-center">
      <DarkNav active="vitrine" />
      <section className="du-hero du-reveal">
        <div className="du-hero-copy">
          <span className="du-kicker">AI security operations</span>
          <h1>Caldera turns incident noise into a calm command surface.</h1>
          <p>
            A dark monitoring console for security and SRE teams that need readable severity, trace evidence, rollback confidence,
            operator notes, and AI recommendations during production incidents.
          </p>
          <div className="du-actions">
            <Link className="du-button du-button-primary" to="/skills/dark-ui/dashboard">Open incident workspace</Link>
            <a className="du-button du-button-secondary" href="#proof">Review product proof</a>
          </div>
        </div>
        <ProductConsolePreview />
      </section>

      <section className="du-proof-grid du-reveal" id="proof" aria-label="Caldera proof metrics">
        {[
          ['18 min', 'Mean time to diagnosis during checkout incidents.'],
          ['76%', 'AI confidence with evidence and counter-signals visible.'],
          ['4 sources', 'Metrics, logs, deploy events, traces, and team notes unified.'],
        ].map(([value, label]) => (
          <article className="du-metric-card" key={value}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>

      <section className="du-section du-reveal">
        <div className="du-section-copy">
          <span className="du-kicker">Surface ladder</span>
          <h2>Darkness is a system, not a background color.</h2>
          <p>
            Caldera separates page, shell, raised panels, interactive rows, selected states, overlays, and focus rings.
            The accent is reserved for action, selection, progress, and status.
          </p>
        </div>
        <div className="du-ladder">
          {['Page', 'Base shell', 'Raised panel', 'Interactive row', 'Selected', 'Overlay'].map((item, index) => (
            <div className="du-ladder-step" style={{ '--du-step': index }} key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="du-product-story du-reveal">
        <div>
          <span className="du-kicker">Specialized workspace</span>
          <h2>The incident view keeps action, evidence, and recovery in one frame.</h2>
          <p>
            The specialized page is not a decorative screenshot. It is a dense command center with selected service state,
            semantic status pills, command input, live logs, an AI thread, loading and error surfaces, and a rollback path.
          </p>
          <Link className="du-button du-button-primary" to="/skills/dark-ui/dashboard">Inspect dashboard</Link>
        </div>
        <ProductConsolePreview compact />
      </section>

      <section className="du-component-strip du-reveal">
        {['DarkCommandInput', 'StatusSidebar', 'StackedInsightPanel', 'LogConsole', 'AgentThread'].map((item) => (
          <article key={item}>
            <span>Component</span>
            <strong>{item}</strong>
          </article>
        ))}
      </section>
    </main>
  )
}

function DarkDashboard() {
  const [selectedService, setSelectedService] = useState('redis')
  const [command, setCommand] = useState('')
  const selected = useMemo(() => services.find((item) => item.id === selectedService) ?? services[0], [selectedService])
  const root = useDarkReveal()

  function submitCommand(event) {
    event.preventDefault()
    if (!command.trim()) return
    setCommand('')
  }

  return (
    <main ref={root} className="du-page du-dashboard-page" data-skill="dark-ui" data-archetype="ops-command">
      <DarkNav active="dashboard" />
      <section className="du-app-shell du-reveal">
        <aside className="du-sidebar" aria-label="Systems">
          <div className="du-sidebar-head">
            <span className="du-kicker">CALDERA OS</span>
            <h1>Incident INC-4721</h1>
            <p>Checkout latency spike / production EU-West / P1 investigating.</p>
          </div>
          <div className="du-service-list">
            {services.map((service) => (
              <button
                type="button"
                key={service.id}
                data-selected={selectedService === service.id ? 'true' : undefined}
                onClick={() => setSelectedService(service.id)}
              >
                <span className="du-status-dot" data-role={service.role} />
                <strong>{service.name}</strong>
                <em>{service.status}</em>
              </button>
            ))}
          </div>
          <div className="du-state-card" data-state="empty">
            <span>Empty state</span>
            <strong>No unresolved runbook blockers.</strong>
          </div>
        </aside>

        <section className="du-workspace">
          <header className="du-topbar">
            <div>
              <span className="du-kicker">Selected service</span>
              <h2>{selected.name}</h2>
            </div>
            <div className="du-topbar-actions">
              <StatusPill role={selected.role}>{selected.status}</StatusPill>
              <button type="button" className="du-button du-button-secondary">Pause rollout</button>
              <button type="button" className="du-button du-button-primary">Rollback</button>
            </div>
          </header>

          <div className="du-kpi-band">
            {[
              ['p95 latency', selected.latency, selected.role],
              ['impacted users', '8,420', 'warning'],
              ['revenue risk', 'EUR 12.4k/h', 'danger'],
              ['last sync', '2s ago', 'success'],
            ].map(([label, value, role]) => (
              <article className="du-kpi" data-role={role} key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </article>
            ))}
          </div>

          <div className="du-dashboard-grid">
            <section className="du-insight-panel" data-state="success">
              <div className="du-panel-head">
                <span>AI diagnosis</span>
                <StatusPill role="info">Processing</StatusPill>
              </div>
              <h3>Redis pool saturation is the most likely cause.</h3>
              <p>Confidence is based on release timing, cache wait growth, retry queue expansion, and provider counter-signals.</p>
              <div className="du-confidence">
                <i style={{ width: '76%' }} />
              </div>
              <div className="du-evidence-list">
                <span>Evidence: cache wait, retry queue, deploy diff</span>
                <span>Counter-signal: payment gateway API stable</span>
              </div>
            </section>

            <section className="du-timeline-panel">
              <div className="du-panel-head">
                <span>Deploy timeline</span>
                <StatusPill role="warning">Watch</StatusPill>
              </div>
              {timeline.map(([time, title, body], index) => (
                <button type="button" data-active={index === 3 ? 'true' : undefined} key={title}>
                  <span>{time}</span>
                  <strong>{title}</strong>
                  <em>{body}</em>
                </button>
              ))}
            </section>

            <section className="du-log-console">
              <div className="du-panel-head">
                <span>Live logs</span>
                <StatusPill role="success">Streaming</StatusPill>
              </div>
              <div className="du-log-body">
                {logs.map(([time, source, message, role]) => (
                  <div className="du-log-row" data-role={role} key={`${time}-${source}`}>
                    <span>{time}</span>
                    <strong>{source}</strong>
                    <em>{message}</em>
                  </div>
                ))}
              </div>
            </section>

            <section className="du-agent-thread">
              <div className="du-panel-head">
                <span>Agent thread</span>
                <StatusPill role="neutral">4 messages</StatusPill>
              </div>
              {thread.map(([sender, message, type]) => (
                <article data-type={type} key={`${sender}-${message}`}>
                  <strong>{sender}</strong>
                  <p>{message}</p>
                </article>
              ))}
              <form className="du-command" data-state={command ? 'typing' : 'idle'} onSubmit={submitCommand}>
                <label htmlFor="du-command-input">Command</label>
                <div>
                  <span>/</span>
                  <input
                    id="du-command-input"
                    value={command}
                    onChange={(event) => setCommand(event.target.value)}
                  />
                  <button type="submit">Run</button>
                </div>
                <p>{command ? 'Typing command. Press Run to submit.' : 'Suggested: verify rollback impact before execution.'}</p>
              </form>
            </section>

            <section className="du-recovery-panel" data-state="error">
              <div className="du-panel-head">
                <span>Recovery path</span>
                <StatusPill role="danger">P1</StatusPill>
              </div>
              <h3>Rollback Checkout API to v4.17.9.</h3>
              <p>Estimated recovery: 6 to 9 minutes. Approval required from incident lead. Customer status page draft is ready.</p>
              <button type="button" className="du-button du-button-primary">Execute with approval</button>
            </section>
          </div>
        </section>
      </section>
    </main>
  )
}

function ProductConsolePreview({ compact = false }) {
  return (
    <div className="du-product-console" data-compact={compact ? 'true' : undefined} aria-label="Caldera product preview">
      <div className="du-console-rail">
        {['C', 'I', 'L', 'R'].map((item, index) => <span data-active={index === 1 ? 'true' : undefined} key={item}>{item}</span>)}
      </div>
      <div className="du-console-main">
        <div className="du-console-header">
          <div>
            <span>INC-4721</span>
            <strong>Checkout latency spike</strong>
          </div>
          <StatusPill role="danger">P1</StatusPill>
        </div>
        <div className="du-console-grid">
          <div className="du-console-chart">
            {[36, 44, 52, 76, 88, 72, 66].map((height, index) => <i style={{ height: `${height}%` }} key={index} />)}
          </div>
          <div className="du-console-stack">
            {services.slice(0, 3).map((service) => (
              <div key={service.id}>
                <span className="du-status-dot" data-role={service.role} />
                <strong>{service.name}</strong>
                <em>{service.status}</em>
              </div>
            ))}
          </div>
        </div>
        <div className="du-console-command">
          <span>/rollback</span>
          <strong>checkout-api v4.17.9</strong>
        </div>
      </div>
    </div>
  )
}

function StatusPill({ role = 'neutral', children }) {
  return <span className="du-status-pill" data-role={role}>{children}</span>
}

function DarkNav({ active }) {
  return (
    <header className="du-nav">
      <Link to="/skills/dark-ui" className="du-logo">Caldera</Link>
      <nav>
        <Link data-active={active === 'vitrine' ? 'true' : undefined} to="/skills/dark-ui/vitrine">Vitrine</Link>
        <Link data-active={active === 'dashboard' ? 'true' : undefined} to="/skills/dark-ui/dashboard">Dashboard</Link>
        <Link to="/skills">Skills</Link>
      </nav>
    </header>
  )
}

function useDarkReveal() {
  const scope = useRef(null)
  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.from('.du-reveal', {
        y: 18,
        opacity: 0,
        duration: 0.64,
        ease: 'power3.out',
        stagger: 0.07,
      })
    },
    { scope },
  )
  return scope
}

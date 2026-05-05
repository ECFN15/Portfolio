import { Link, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const deploySteps = [
  { step: 'Commit', detail: 'main@9f12c4a', time: '00:04', state: 'Passed', role: 'success' },
  { step: 'Build', detail: 'edge worker + sdk', time: '01:18', state: 'Passed', role: 'success' },
  { step: 'Schema', detail: 'trace_events v4', time: '00:21', state: 'Running', role: 'info' },
  { step: 'Verify', detail: 'latency budget', time: 'queued', state: 'Ready', role: 'neutral' },
]

const endpoints = [
  { method: 'POST', path: '/v1/traces', p95: '112ms', status: 'Live', role: 'success' },
  { method: 'GET', path: '/v1/workflows/{id}', p95: '86ms', status: 'Active', role: 'info' },
  { method: 'POST', path: '/v1/webhooks/replay', p95: '240ms', status: 'Watch', role: 'warning' },
]

export default function TechnicalSansExperience() {
  const { view } = useParams()
  return view === 'dashboard' ? <TraceDockConsole /> : <TraceDockVitrine />
}

function TraceDockVitrine() {
  useTechReveal()

  return (
    <main className="tns-page">
      <TechNav active="vitrine" />
      <section className="tns-hero tns-reveal">
        <div className="tns-copy">
          <span className="tns-kicker">TraceDock SDK v2.4</span>
          <h1>Trace every AI workflow from prompt to deploy.</h1>
          <p>
            TraceDock donne aux equipes platform une couche d'observabilite inspectable pour agents IA,
            webhooks, queues et migrations de schema.
          </p>
          <div className="tns-actions">
            <Link className="tns-button" to="/skills/technical-sans/dashboard">Ouvrir la console</Link>
            <Link className="tns-link" to="/skills/technical-sans">Retour au skill</Link>
          </div>
        </div>
        <CodeHero status="copied" />
      </section>

      <section className="tns-section tns-reveal">
        <header>
          <span className="tns-kicker">Architecture</span>
          <h2>Une preuve technique avant le discours produit.</h2>
          <p>Les flux restent lisibles: client, edge, worker, queue, database et analytics sont visibles des le hero.</p>
        </header>
        <ArchitectureDiagram />
      </section>

      <section className="tns-preview tns-reveal">
        <header>
          <span className="tns-kicker">Console specialisee</span>
          <h2>La page principale peut previsualiser un vrai poste API.</h2>
          <p>Timeline de deploy, endpoints, erreurs et copie de commande gardent la direction technique du skill.</p>
        </header>
        <ConsoleMini />
      </section>
    </main>
  )
}

function TraceDockConsole() {
  useTechReveal()

  return (
    <main className="tns-page tns-page--console">
      <TechNav active="dashboard" />
      <section className="tns-console">
        <aside className="tns-docs tns-reveal">
          <span className="tns-kicker">Docs</span>
          {['Start', 'Authenticate', 'Send traces', 'Webhooks', 'Errors', 'SDKs'].map((item, index) => (
            <button type="button" data-active={index === 2} key={item}>{item}</button>
          ))}
        </aside>

        <div className="tns-workbench tns-reveal">
          <header className="tns-head">
            <div>
              <span className="tns-kicker">Production eu-west-3</span>
              <h1>Trace ingest is active.</h1>
            </div>
            <button className="tns-button" type="button">Run verify</button>
          </header>

          <section className="tns-console-grid">
            <CodeHero status="ready" />
            <ApiResponse />
            <DeployTimeline />
            <EndpointTable />
          </section>
        </div>
      </section>
    </main>
  )
}

function TechNav({ active }) {
  return (
    <header className="tns-nav">
      <Link className="tns-logo" to="/skills/technical-sans">TraceDock</Link>
      <nav aria-label="Navigation TraceDock">
        <Link data-active={active === 'vitrine'} to="/skills/technical-sans/vitrine">Vitrine</Link>
        <Link data-active={active === 'dashboard'} to="/skills/technical-sans/dashboard">Console</Link>
        <Link to="/skills">Skills</Link>
      </nav>
    </header>
  )
}

function CodeHero({ status }) {
  return (
    <article className="tns-code" data-status={status}>
      <div className="tns-tabs" role="tablist" aria-label="Install method">
        {['npm', 'curl', 'python'].map((tab, index) => (
          <button type="button" role="tab" aria-selected={index === 0} key={tab}>{tab}</button>
        ))}
      </div>
      <pre><code>{`npm install @tracedock/sdk
tracedock auth --token $TRACEDOCK_TOKEN
tracedock deploy --project ai-intake --region eu-west-3`}</code></pre>
      <footer>
        <span>request_id=req_7x91 | v2.4.0</span>
        <button type="button">{status === 'copied' ? 'Copied' : 'Copy command'}</button>
      </footer>
    </article>
  )
}

function ApiResponse() {
  return (
    <article className="tns-api">
      <header>
        <span className="tns-method">200 POST /v1/traces</span>
        <StatusPill role="success">Synced</StatusPill>
      </header>
      <pre><code>{`{
  "trace_id": "trc_8Jk92",
  "workflow": "ai-intake",
  "latency_ms": 112,
  "events": 1842,
  "region": "eu-west-3"
}`}</code></pre>
    </article>
  )
}

function ArchitectureDiagram() {
  const nodes = ['Client', 'Edge', 'Worker', 'Queue', 'DB', 'Analytics']
  return (
    <div className="tns-diagram" aria-label="Architecture TraceDock">
      {nodes.map((node, index) => (
        <article data-active={index === 2} key={node}>
          <span>0{index + 1}</span>
          <strong>{node}</strong>
          <em>{index < 3 ? 'stream' : 'batch'}</em>
        </article>
      ))}
    </div>
  )
}

function DeployTimeline() {
  return (
    <article className="tns-timeline">
      <header>
        <span className="tns-kicker">Deploy timeline</span>
        <StatusPill role="info">Processing</StatusPill>
      </header>
      {deploySteps.map((item) => (
        <div className="tns-step" data-role={item.role} key={item.step}>
          <span>{item.time}</span>
          <strong>{item.step}</strong>
          <em>{item.detail}</em>
          <StatusPill role={item.role}>{item.state}</StatusPill>
        </div>
      ))}
    </article>
  )
}

function EndpointTable() {
  return (
    <article className="tns-endpoints">
      <header>
        <span className="tns-kicker">Endpoints</span>
        <StatusPill role="warning">Watch</StatusPill>
      </header>
      {endpoints.map((item) => (
        <div key={item.path}>
          <span>{item.method}</span>
          <strong>{item.path}</strong>
          <em>{item.p95}</em>
          <StatusPill role={item.role}>{item.status}</StatusPill>
        </div>
      ))}
    </article>
  )
}

function ConsoleMini() {
  return (
    <div className="tns-mini">
      <DeployTimeline />
      <ApiResponse />
    </div>
  )
}

function StatusPill({ role, children }) {
  return <span className="tns-status" data-role={role}>{children}</span>
}

function useTechReveal() {
  useGSAP(() => {
    gsap.from('.tns-reveal', {
      y: 14,
      opacity: 0,
      duration: 0.55,
      ease: 'power2.out',
      stagger: 0.06,
    })
  }, [])
}

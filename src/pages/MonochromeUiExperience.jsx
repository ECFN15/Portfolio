import { useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const cashRows = [
  { id: 'TX-401', name: 'Enterprise invoice', account: 'ARR', amount: '+48,000', state: 'Cleared', role: 'success' },
  { id: 'TX-402', name: 'Cloud reserve', account: 'Infra', amount: '-12,800', state: 'Watch', role: 'warning' },
  { id: 'TX-403', name: 'Payroll batch', account: 'People', amount: '-86,200', state: 'Scheduled', role: 'info' },
  { id: 'TX-404', name: 'Late receivable', account: 'AR', amount: '+18,400', state: 'Escalate', role: 'danger' },
  { id: 'TX-405', name: 'Tax provision', account: 'Ops', amount: '-9,300', state: 'Ready', role: 'neutral' },
]

const invoices = [
  ['ACME Holdings', 'EUR 24,000', 'Due in 3 days'],
  ['Northwind Labs', 'EUR 18,400', 'Past due'],
  ['Studio Atlas', 'EUR 7,800', 'Draft'],
]

export default function MonochromeUiExperience() {
  const { view = 'vitrine' } = useParams()
  return view === 'dashboard' ? <LedgerlineDesk /> : <LedgerlineVitrine />
}

function LedgerlineVitrine() {
  const root = useMonoReveal()

  return (
    <main ref={root} className="mux-page" data-skill="monochrome-ui" data-archetype="component-blueprint-system">
      <MonoNav active="vitrine" />
      <section className="mux-hero mux-reveal">
        <div className="mux-hero-copy">
          <span className="mux-kicker">Ledgerline / monochrome cash control</span>
          <h1>Financial clarity without color dependency.</h1>
          <p>
            Ledgerline gives founders a black, white, and gray operating surface for runway, invoices, transactions, and risk states.
            Hierarchy comes from inversion, row density, borders, and readable labels.
          </p>
          <div className="mux-actions">
            <Link className="mux-button mux-button--primary" to="/skills/monochrome-ui/dashboard">Open cash desk</Link>
            <a className="mux-button mux-button--ghost" href="#gray-system">Inspect gray system</a>
          </div>
        </div>
        <LedgerShell compact />
      </section>

      <section id="gray-system" className="mux-section mux-reveal">
        <div>
          <span className="mux-kicker">Gray jobs</span>
          <h2>Every shade has a role before a component is drawn.</h2>
          <p>
            Canvas, surface, hover, selected, disabled, muted, hairline, and strong rule are separated. The result is not a wireframe;
            it is an operational monochrome system.
          </p>
        </div>
        <div className="mux-gray-table">
          {[
            ['Canvas', '#ffffff', 'page and low priority space'],
            ['Surface', '#f7f7f7', 'grouped financial modules'],
            ['Selected', '#000000', 'active row and primary action'],
            ['Muted', '#5f5f5f', 'metadata only, never core controls'],
          ].map(([name, value, use]) => (
            <article key={name}>
              <span>{name}</span>
              <strong>{value}</strong>
              <p>{use}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mux-preview mux-reveal">
        <div>
          <span className="mux-kicker">Specialized desk</span>
          <h2>The dashboard is dense, selected, and fully achromatic.</h2>
          <p>Filter transactions, inspect the selected cash event, review invoices, and read runway without relying on hue.</p>
          <Link className="mux-button mux-button--primary" to="/skills/monochrome-ui/dashboard">Review runway</Link>
        </div>
        <LedgerMini />
      </section>
    </main>
  )
}

function LedgerlineDesk() {
  const [filter, setFilter] = useState('All')
  const [selectedId, setSelectedId] = useState('TX-404')
  const root = useMonoReveal()
  const rows = useMemo(() => filter === 'All' ? cashRows : cashRows.filter((row) => row.state === filter), [filter])
  const selected = useMemo(() => cashRows.find((row) => row.id === selectedId) ?? cashRows[0], [selectedId])

  return (
    <main ref={root} className="mux-page mux-page--desk" data-skill="monochrome-ui" data-archetype="monochrome-dashboard">
      <MonoNav active="dashboard" />
      <section className="mux-desk mux-reveal">
        <aside className="mux-rail">
          <span className="mux-kicker">Ledgerline OS</span>
          <h1>Cash desk.</h1>
          <div className="mux-filter" role="tablist" aria-label="Cash filters">
            {['All', 'Cleared', 'Watch', 'Scheduled', 'Escalate'].map((item) => (
              <button
                type="button"
                role="tab"
                aria-selected={filter === item}
                data-active={filter === item ? 'true' : undefined}
                onClick={() => setFilter(item)}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
        </aside>

        <section className="mux-main">
          <header className="mux-head">
            <div>
              <span className="mux-kicker">May 2026 / operating runway</span>
              <h2>Runway register</h2>
            </div>
            <StatusPill role={selected.role}>{selected.state}</StatusPill>
          </header>

          <div className="mux-grid">
            <section className="mux-runway">
              <span className="mux-kicker">Net runway</span>
              <strong>14.8</strong>
              <p>months after scheduled payroll and cloud reserve.</p>
            </section>

            <section className="mux-inspector">
              <span className="mux-kicker">Selected transaction</span>
              <h3>{selected.name}</h3>
              <dl>
                <div><dt>ID</dt><dd>{selected.id}</dd></div>
                <div><dt>Account</dt><dd>{selected.account}</dd></div>
                <div><dt>Amount</dt><dd>{selected.amount}</dd></div>
              </dl>
            </section>

            <section className="mux-table-panel">
              <div className="mux-panel-head">
                <span className="mux-kicker">Cash movement</span>
                <strong>{rows.length} rows</strong>
              </div>
              <MonoTable rows={rows} selectedId={selectedId} onSelect={setSelectedId} />
            </section>

            <section className="mux-invoices">
              <div className="mux-panel-head">
                <span className="mux-kicker">Invoice queue</span>
                <strong>3 items</strong>
              </div>
              {invoices.map(([client, amount, due]) => (
                <article key={client}>
                  <strong>{client}</strong>
                  <span>{amount}</span>
                  <em>{due}</em>
                </article>
              ))}
            </section>
          </div>
        </section>
      </section>
    </main>
  )
}

function MonoNav({ active }) {
  return (
    <header className="mux-nav">
      <Link to="/skills/monochrome-ui" className="mux-logo">Ledgerline</Link>
      <nav aria-label="Ledgerline pages">
        <Link data-active={active === 'vitrine' ? 'true' : undefined} to="/skills/monochrome-ui/vitrine">Vitrine</Link>
        <Link data-active={active === 'dashboard' ? 'true' : undefined} to="/skills/monochrome-ui/dashboard">Cash desk</Link>
        <Link to="/skills">Skills</Link>
      </nav>
    </header>
  )
}

function LedgerShell({ compact = false }) {
  return (
    <div className="mux-shell" data-compact={compact ? 'true' : undefined} aria-label="Ledgerline shell preview">
      <div className="mux-shell-bar">
        <span>Runway register</span>
        <strong>14.8 mo</strong>
      </div>
      <MonoTable rows={cashRows.slice(0, compact ? 4 : cashRows.length)} selectedId="TX-404" />
    </div>
  )
}

function LedgerMini() {
  return (
    <div className="mux-mini" aria-label="Cash desk preview">
      <LedgerShell compact />
    </div>
  )
}

function MonoTable({ rows, selectedId, onSelect }) {
  return (
    <div className="mux-table-wrap">
      <table className="mux-table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Movement</th>
            <th scope="col">Account</th>
            <th scope="col">Amount</th>
            <th scope="col">State</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr data-selected={selectedId === row.id ? 'true' : undefined} onClick={onSelect ? () => onSelect(row.id) : undefined} key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.account}</td>
              <td>{row.amount}</td>
              <td><StatusPill role={row.role}>{row.state}</StatusPill></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatusPill({ role = 'neutral', children }) {
  return <span className="mux-status" data-role={role}>{children}</span>
}

function useMonoReveal() {
  const scope = useRef(null)
  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.from('.mux-reveal', { opacity: 0, y: 20, duration: 0.55, ease: 'power2.out', stagger: 0.06 })
      gsap.from('.mux-table tbody tr, .mux-invoices article', { opacity: 0, y: 6, duration: 0.28, ease: 'power2.out', stagger: 0.035, delay: 0.08 })
    },
    { scope },
  )
  return scope
}

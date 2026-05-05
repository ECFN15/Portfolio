import { useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const decisions = [
  { id: 'D-01', title: 'Pricing page claim', owner: 'Mara', impact: 'High', status: 'Open', role: 'warning' },
  { id: 'D-02', title: 'Trial activation metric', owner: 'Idris', impact: 'Medium', status: 'Approved', role: 'success' },
  { id: 'D-03', title: 'Enterprise proof block', owner: 'Lena', impact: 'High', status: 'Draft', role: 'neutral' },
  { id: 'D-04', title: 'Migration objection', owner: 'Noe', impact: 'Low', status: 'Ready', role: 'info' },
]

const risks = [
  ['Weak proof', 'Demo evidence is stronger than customer quote', 'Open'],
  ['Long form', 'Seven fields can become four', 'Ready'],
  ['Support load', 'Migration copy needs owner and SLA', 'Draft'],
]

export default function MinimalDesignExperience() {
  const { view = 'vitrine' } = useParams()
  return view === 'dashboard' ? <NorthlineBrief /> : <NorthlineVitrine />
}

function NorthlineVitrine() {
  const root = useMinimalReveal()

  return (
    <main ref={root} className="mdx-page" data-skill="minimal-design" data-archetype="quiet-index-tool">
      <MinimalNav active="vitrine" />
      <section className="mdx-hero mdx-reveal">
        <div className="mdx-hero-copy">
          <span className="mdx-kicker">Northline / product decision studio</span>
          <h1>Launch strategy reduced to the decisions that matter.</h1>
          <p>
            Northline helps founders turn noisy launch plans into a brief with evidence, owners, risks, and next actions. No
            decoration hides the work: every row answers a question.
          </p>
          <div className="mdx-actions">
            <Link className="mdx-button mdx-button--primary" to="/skills/minimal-design/dashboard">Open brief desk</Link>
            <a className="mdx-link" href="#method">Read the method</a>
          </div>
        </div>
        <BriefObject />
      </section>

      <section id="method" className="mdx-section mdx-reveal">
        <div>
          <span className="mdx-kicker">Method</span>
          <h2>Minimal structure, not minimal information.</h2>
          <p>
            The visual system is intentionally spare, but the content is complete: claims, proof, decisions, status, owner, and
            consequence all sit in the open.
          </p>
        </div>
        <div className="mdx-feature-lines">
          {[
            ['One proof object', 'The brief is visible in the first viewport with score, owner, and decision rows.'],
            ['Rows before cards', 'Repeated information uses index rows and tables instead of decorative card grids.'],
            ['Quiet conversion', 'The next action is always visible, but never louder than the work.'],
          ].map(([title, body]) => (
            <article key={title}>
              <strong>{title}</strong>
              <span>{body}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="mdx-preview mdx-reveal">
        <div>
          <span className="mdx-kicker">Specialized desk</span>
          <h2>The dashboard is a working brief, not a mood board.</h2>
          <p>Filter decisions, inspect risk, assign an owner, and write the final launch decision in a restrained tool surface.</p>
          <Link className="mdx-button mdx-button--primary" to="/skills/minimal-design/dashboard">Open launch brief</Link>
        </div>
        <BriefMini />
      </section>
    </main>
  )
}

function NorthlineBrief() {
  const [filter, setFilter] = useState('All')
  const [selectedId, setSelectedId] = useState('D-01')
  const root = useMinimalReveal()
  const rows = useMemo(() => filter === 'All' ? decisions : decisions.filter((item) => item.status === filter), [filter])
  const selected = useMemo(() => decisions.find((item) => item.id === selectedId) ?? decisions[0], [selectedId])

  return (
    <main ref={root} className="mdx-page mdx-page--desk" data-skill="minimal-design" data-archetype="minimal-brief-desk">
      <MinimalNav active="dashboard" />
      <section className="mdx-desk mdx-reveal">
        <aside className="mdx-desk-side">
          <div>
            <span className="mdx-kicker">Launch brief</span>
            <h1>Northline OS.</h1>
            <p>One workspace for decisions, proof gaps, launch risks, and founder sign-off.</p>
          </div>
          <div className="mdx-control-bar" role="tablist" aria-label="Decision filters">
            {['All', 'Open', 'Approved', 'Draft', 'Ready'].map((item) => (
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

        <section className="mdx-desk-main">
          <header className="mdx-desk-head">
            <div>
              <span className="mdx-kicker">Q2 activation launch</span>
              <h2>Decision brief</h2>
            </div>
            <StatusPill role={selected.role}>{selected.status}</StatusPill>
          </header>

          <div className="mdx-desk-grid">
            <section className="mdx-score">
              <span className="mdx-kicker">Brief score</span>
              <strong>82</strong>
              <p>Two proof gaps remain before this page should move into production.</p>
            </section>

            <section className="mdx-selected">
              <span className="mdx-kicker">Selected decision</span>
              <h3>{selected.title}</h3>
              <dl>
                <div><dt>ID</dt><dd>{selected.id}</dd></div>
                <div><dt>Owner</dt><dd>{selected.owner}</dd></div>
                <div><dt>Impact</dt><dd>{selected.impact}</dd></div>
              </dl>
            </section>

            <section className="mdx-decision-table">
              <div className="mdx-panel-head">
                <span className="mdx-kicker">Decision index</span>
                <strong>{rows.length} rows</strong>
              </div>
              <div className="mdx-index">
                {rows.map((item) => (
                  <button
                    type="button"
                    data-active={selectedId === item.id ? 'true' : undefined}
                    onClick={() => setSelectedId(item.id)}
                    key={item.id}
                  >
                    <span>{item.id}</span>
                    <strong>{item.title}</strong>
                    <em>{item.owner}</em>
                    <StatusPill role={item.role}>{item.status}</StatusPill>
                  </button>
                ))}
              </div>
            </section>

            <section className="mdx-risk-table">
              <div className="mdx-panel-head">
                <span className="mdx-kicker">Risk register</span>
                <strong>3 open checks</strong>
              </div>
              {risks.map(([title, body, status]) => (
                <article key={title}>
                  <strong>{title}</strong>
                  <p>{body}</p>
                  <span>{status}</span>
                </article>
              ))}
            </section>

            <section className="mdx-decision-form">
              <span className="mdx-kicker">Founder sign-off</span>
              <h3>Write the final decision.</h3>
              <label>
                Decision summary
                <textarea defaultValue="Ship the activation page after replacing the pricing claim with demo evidence." />
              </label>
              <label>
                Next owner
                <input defaultValue={selected.owner} />
              </label>
              <button type="button">Save decision</button>
            </section>
          </div>
        </section>
      </section>
    </main>
  )
}

function MinimalNav({ active }) {
  return (
    <header className="mdx-nav">
      <Link to="/skills/minimal-design" className="mdx-logo">Northline</Link>
      <nav aria-label="Northline pages">
        <Link data-active={active === 'vitrine' ? 'true' : undefined} to="/skills/minimal-design/vitrine">Vitrine</Link>
        <Link data-active={active === 'dashboard' ? 'true' : undefined} to="/skills/minimal-design/dashboard">Brief desk</Link>
        <Link to="/skills">Skills</Link>
      </nav>
    </header>
  )
}

function BriefObject() {
  return (
    <div className="mdx-brief-object" aria-label="Northline launch brief preview">
      <div className="mdx-brief-head">
        <span>Launch brief</span>
        <strong>82 / 100</strong>
      </div>
      <div className="mdx-brief-body">
        {decisions.slice(0, 4).map((item) => (
          <div data-role={item.role} key={item.id}>
            <span>{item.id}</span>
            <strong>{item.title}</strong>
            <em>{item.status}</em>
          </div>
        ))}
      </div>
    </div>
  )
}

function BriefMini() {
  return (
    <div className="mdx-mini" aria-label="Brief desk preview">
      <BriefObject />
    </div>
  )
}

function StatusPill({ role = 'neutral', children }) {
  return <span className="mdx-status" data-role={role}>{children}</span>
}

function useMinimalReveal() {
  const scope = useRef(null)
  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return

      gsap.from('.mdx-reveal', {
        y: 18,
        opacity: 0,
        duration: 0.58,
        ease: 'power2.out',
        stagger: 0.06,
      })

      gsap.from('.mdx-index button, .mdx-brief-body div, .mdx-risk-table article', {
        opacity: 0,
        y: 8,
        duration: 0.32,
        ease: 'power2.out',
        stagger: 0.035,
        delay: 0.08,
      })
    },
    { scope },
  )
  return scope
}

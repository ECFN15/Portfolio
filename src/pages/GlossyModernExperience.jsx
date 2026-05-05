import { useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const transactions = [
  { vendor: 'Runway ML', category: 'AI video', amount: '$2,480', card: 'Creative Ops', status: 'Approved', risk: 'Low', trend: 76 },
  { vendor: 'Vercel', category: 'Infrastructure', amount: '$8,940', card: 'Platform', status: 'Watch', risk: 'Medium', trend: 58 },
  { vendor: 'Notion', category: 'Workspace', amount: '$1,248', card: 'People', status: 'Synced', risk: 'Low', trend: 42 },
  { vendor: 'Figma', category: 'Design', amount: '$720', card: 'Creative Ops', status: 'Approved', risk: 'Low', trend: 64 },
  { vendor: 'OpenAI', category: 'Research', amount: '$4,880', card: 'AI Lab', status: 'Needs review', risk: 'High', trend: 89 },
]

const cards = [
  { name: 'Founder Prism', limit: '$24,000', spend: '$18,420', type: 'Titanium physical', state: 'selected' },
  { name: 'Creative Ops', limit: '$12,400', spend: '$7,128', type: 'Virtual merchant-lock', state: 'active' },
  { name: 'AI Lab', limit: '$18,000', spend: '$15,920', type: 'Model providers', state: 'watch' },
]

const subscriptions = [
  ['Duplicate seats', '$1,842/mo', 'warning'],
  ['Renewals this week', '$6,210', 'info'],
  ['Cashback routed', '$4,032', 'success'],
]

export default function GlossyModernExperience() {
  const { view = 'vitrine' } = useParams()
  return view === 'dashboard' ? <GlossyDashboard /> : <GlossyVitrine />
}

function GlossyVitrine() {
  const root = useGlossyReveal()

  return (
    <main ref={root} className="gm-page" data-skill="glossy-modern" data-archetype="dia-prism-operating-system">
      <GlossyNav active="vitrine" />
      <section className="gm-hero gm-reveal">
        <div className="gm-ambient" aria-hidden="true" />
        <div className="gm-hero-copy">
          <h1>LuxeCard turns founder spend into a polished control layer.</h1>
          <p>
            A premium banking product for teams moving fast across software, travel, and AI vendors. Physical card, virtual limits,
            subscription intelligence, cashback routing, and treasury goals live inside one luminous workspace.
          </p>
          <div className="gm-actions">
            <Link className="gm-sweep-button" to="/skills/glossy-modern/dashboard"><span>Open spend cockpit</span></Link>
            <a className="gm-quiet-button" href="#material-system">Inspect material system</a>
          </div>
        </div>
        <GlassHeroPanel />
      </section>

      <section className="gm-proof-row gm-reveal" aria-label="LuxeCard product proof">
        {[
          ['18 active cards', 'Physical, virtual, merchant-locked, and temporary limits.'],
          ['$84.2k monthly spend', 'Grouped by vendor family, team, runway impact, and approval state.'],
          ['4.8% blended rewards', 'Cashback can route to runway goals or card-specific budgets.'],
        ].map(([title, body]) => (
          <SpecularCard title={title} meta={body} key={title} />
        ))}
      </section>

      <section id="material-system" className="gm-section gm-reveal">
        <div className="gm-section-copy">
          <span>Material stack</span>
          <h2>Glass is the shell. The decisions sit on protected slabs.</h2>
          <p>
            LuxeCard uses ambient prism light to create desire, but every financial decision stays on a solid, readable layer.
            The glossy system is physical: back plate, glass shell, specular edge, content slab, then action light.
          </p>
        </div>
        <div className="gm-material-grid">
          {[
            ['Ambient field', 'Large soft prism gradients establish light direction without carrying body text.'],
            ['Glass shell', 'Used around the card and product frame only, with isolated blur budget.'],
            ['Specular edge', 'One-pixel highlight on selected cards, toolbar, and the primary product frame.'],
            ['Action light', 'Sweep appears on high-value actions and selected controls, never on every element.'],
          ].map(([title, body], index) => (
            <article className="gm-material-card" data-selected={index === 2 ? 'true' : undefined} key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="gm-product-story gm-reveal">
        <div className="gm-story-frame">
          <FloatingToolbar />
          <DashboardMiniature />
        </div>
        <div className="gm-story-copy">
          <h2>The Friday ritual is one prism frame, not five exports.</h2>
          <p>
            The founder reviews spend by vendor, team, limit drift, subscription duplication, and reward routing. Risk states are named,
            not color-only. Loading, watch, approved, and review states preserve the same dimensional system.
          </p>
          <Link className="gm-sweep-button" to="/skills/glossy-modern/dashboard"><span>Review cockpit</span></Link>
        </div>
      </section>

      <section className="gm-reflection-gallery gm-reveal" aria-label="LuxeCard product states">
        {cards.map((card) => (
          <article className="gm-reflection-tile" data-state={card.state} key={card.name}>
            <div className="gm-mini-card">
              <span>{card.type}</span>
              <strong>{card.name}</strong>
              <i>{card.spend} / {card.limit}</i>
            </div>
            <p>{card.state === 'watch' ? 'Limit drift requires review' : card.state === 'selected' ? 'Primary founder card' : 'Vendor locked and active'}</p>
          </article>
        ))}
      </section>

      <section className="gm-close gm-reveal">
        <h2>Premium surface, practical finance.</h2>
        <p>Reserve an invite, inspect the cockpit, or return to the skill page to compare the visual system.</p>
        <div className="gm-actions">
          <Link className="gm-sweep-button" to="/skills/glossy-modern/dashboard"><span>Open dashboard</span></Link>
          <Link className="gm-quiet-button" to="/skills/glossy-modern">Back to skill</Link>
        </div>
      </section>
    </main>
  )
}

function GlossyDashboard() {
  const [period, setPeriod] = useState('May')
  const [selectedCard, setSelectedCard] = useState(cards[0].name)
  const selected = useMemo(() => cards.find((card) => card.name === selectedCard) ?? cards[0], [selectedCard])
  const root = useGlossyReveal()

  return (
    <main ref={root} className="gm-page gm-dashboard-page" data-skill="glossy-modern" data-archetype="premium-tool-surface">
      <GlossyNav active="dashboard" />
      <section className="gm-dashboard-shell gm-reveal">
        <aside className="gm-dashboard-rail">
          <div>
            <span className="gm-mono-label">LuxeCard OS</span>
            <h1>Spend cockpit</h1>
            <p>Live founder finance, virtual cards, cashback routing, subscription intelligence, and limits.</p>
          </div>
          <div className="gm-period-switch" role="tablist" aria-label="Period">
            {['Apr', 'May', 'Q2'].map((item) => (
              <button type="button" role="tab" aria-selected={period === item} onClick={() => setPeriod(item)} key={item}>
                {item}
              </button>
            ))}
          </div>
          <div className="gm-card-switch" aria-label="Card selector">
            {cards.map((card) => (
              <button type="button" data-active={selectedCard === card.name ? 'true' : undefined} onClick={() => setSelectedCard(card.name)} key={card.name}>
                <span>{card.type}</span>
                <strong>{card.name}</strong>
              </button>
            ))}
          </div>
        </aside>

        <section className="gm-dashboard-main">
          <header className="gm-dashboard-header">
            <div>
              <span className="gm-mono-label">{period} 2026 / {selected.type}</span>
              <h2>{selected.name}</h2>
            </div>
            <div className="gm-dashboard-actions">
              <button type="button" className="gm-quiet-control">Export</button>
              <button type="button" className="gm-sweep-control">Issue card</button>
            </div>
          </header>

          <div className="gm-dashboard-grid">
            <section className="gm-hero-metric gm-specular-edge">
              <span>Net spend</span>
              <strong>{selected.spend}</strong>
              <p>{selected.limit} limit / {period} review window / runway impact -3.2 weeks</p>
              <div className="gm-sparkline" aria-hidden="true">
                {[34, 48, 42, 65, 54, 82, 74].map((height, index) => <i style={{ height: `${height}%` }} key={index} />)}
              </div>
            </section>

            <section className="gm-card-stage gm-specular-edge">
              <div className="gm-dashboard-card">
                <span>LUXECARD</span>
                <strong>{selected.name}</strong>
                <i>4829 0088 7114</i>
              </div>
              <div className="gm-limit-panel">
                <span>Limit health</span>
                <strong>{selected.state === 'watch' ? 'Needs review' : 'Stable'}</strong>
                <p>Merchant locks active. Travel category temporarily raised until Friday.</p>
              </div>
            </section>

            <section className="gm-subscription-panel">
              <div className="gm-panel-head">
                <span>Subscription lens</span>
                <strong>Duplication and renewal pressure</strong>
              </div>
              {subscriptions.map(([label, value, role]) => (
                <div className="gm-status-row" data-role={role} key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </section>

            <section className="gm-transaction-panel">
              <div className="gm-panel-head">
                <span>Transaction stream</span>
                <strong>Vendor, card, risk, and approval state</strong>
              </div>
              {transactions.map((item) => (
                <div className="gm-transaction-row" data-risk={item.risk.toLowerCase()} key={item.vendor}>
                  <div>
                    <strong>{item.vendor}</strong>
                    <span>{item.category} / {item.card}</span>
                  </div>
                  <div className="gm-row-bar"><i style={{ width: `${item.trend}%` }} /></div>
                  <span>{item.amount}</span>
                  <em>{item.status}</em>
                </div>
              ))}
            </section>
          </div>
        </section>
      </section>
    </main>
  )
}

function GlassHeroPanel() {
  return (
    <div className="gm-glass-hero-panel gm-lens-reveal">
      <div className="gm-card-object" aria-label="LuxeCard titanium product render">
        <span>LUXECARD</span>
        <strong>Founder Prism</strong>
        <i>4829 0088 7114</i>
      </div>
      <div className="gm-product-frame">
        <FloatingToolbar />
        <DashboardMiniature />
      </div>
    </div>
  )
}

function FloatingToolbar() {
  return (
    <div className="gm-floating-toolbar" aria-label="LuxeCard modes">
      {['Spend', 'Cards', 'Subs', 'Runway'].map((item, index) => (
        <button type="button" data-active={index === 0 ? 'true' : undefined} key={item}>{item}</button>
      ))}
    </div>
  )
}

function DashboardMiniature() {
  return (
    <div className="gm-dashboard-miniature">
      <div className="gm-mini-sidebar">
        <span />
        <span />
        <span data-active="true" />
      </div>
      <div className="gm-mini-body">
        <div className="gm-mini-chart">
          {[38, 58, 44, 72, 66, 88].map((height, index) => <i style={{ height: `${height}%` }} key={index} />)}
        </div>
        <div className="gm-mini-list">
          {transactions.slice(0, 4).map((item) => (
            <div key={item.vendor}>
              <span>{item.vendor}</span>
              <strong>{item.amount}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SpecularCard({ title, meta }) {
  return (
    <article className="gm-specular-card">
      <span className="gm-shine" aria-hidden="true" />
      <h3>{title}</h3>
      <p>{meta}</p>
    </article>
  )
}

function GlossyNav({ active }) {
  return (
    <header className="gm-nav">
      <Link to="/skills/glossy-modern" className="gm-logo">LuxeCard</Link>
      <nav>
        <Link data-active={active === 'vitrine' ? 'true' : undefined} to="/skills/glossy-modern/vitrine">Vitrine</Link>
        <Link data-active={active === 'dashboard' ? 'true' : undefined} to="/skills/glossy-modern/dashboard">Dashboard</Link>
        <Link to="/skills">Skills</Link>
      </nav>
    </header>
  )
}

function useGlossyReveal() {
  const scope = useRef(null)
  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.from('.gm-reveal', {
        y: 34,
        opacity: 0,
        filter: 'saturate(.88)',
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
      })
    },
    { scope },
  )
  return scope
}

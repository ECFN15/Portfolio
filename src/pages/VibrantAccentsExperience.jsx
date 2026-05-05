import { Link, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const accounts = [
  { name: 'Revenue', value: '482k EUR', delta: '+18%', role: 'success', accent: 'green' },
  { name: 'Risk holds', value: '14', delta: 'Watch', role: 'warning', accent: 'orange' },
  { name: 'Payouts', value: '93%', delta: 'Synced', role: 'info', accent: 'violet' },
]

const transfers = [
  { id: 'TR-9021', merchant: 'Studio Nova', amount: '8 420 EUR', status: 'Paid', role: 'success' },
  { id: 'TR-9022', merchant: 'Atlas Retail', amount: '3 180 EUR', status: 'In review', role: 'info' },
  { id: 'TR-9023', merchant: 'Northline', amount: '1 040 EUR', status: 'Needs review', role: 'warning' },
]

export default function VibrantAccentsExperience() {
  const { view } = useParams()
  return view === 'dashboard' ? <FlowMintDashboard /> : <FlowMintVitrine />
}

function FlowMintVitrine() {
  useVibrantReveal()

  return (
    <main className="vax-page">
      <VaxNav active="vitrine" />
      <section className="vax-hero vax-reveal">
        <div className="vax-copy">
          <span className="vax-kicker">FlowMint finance OS</span>
          <h1>Revenue operations with one vivid signal.</h1>
          <p>
            FlowMint aide les equipes finance a suivre revenus, payouts et alertes de risque dans une interface
            neutre ou chaque couleur a un role strict.
          </p>
          <div className="vax-actions">
            <Link className="vax-button" to="/skills/vibrant-accents/dashboard">Ouvrir le dashboard</Link>
            <Link className="vax-link" to="/skills/vibrant-accents">Retour au skill</Link>
          </div>
        </div>
        <FinanceProof />
      </section>

      <section className="vax-section vax-reveal">
        <header>
          <span className="vax-kicker">Accent budget</span>
          <h2>Violet pour agir, micro-accents pour classifier.</h2>
          <p>Le vert et l'orange restent limites aux statuts, edges et points de chart. Le CTA ne partage pas son role.</p>
        </header>
        <div className="vax-card-grid">
          {accounts.map((item) => (
            <article data-accent={item.accent} key={item.name}>
              <span>{item.name}</span>
              <strong>{item.value}</strong>
              <StatusPill role={item.role}>{item.delta}</StatusPill>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function FlowMintDashboard() {
  useVibrantReveal()

  return (
    <main className="vax-page vax-page--dashboard">
      <VaxNav active="dashboard" />
      <section className="vax-dashboard vax-reveal">
        <aside className="vax-side">
          <span className="vax-kicker">FlowMint</span>
          {['Overview', 'Cards', 'Transfers', 'Risk', 'Reports'].map((item, index) => (
            <button type="button" data-active={index === 0} key={item}>{item}</button>
          ))}
        </aside>

        <div className="vax-main">
          <header className="vax-head">
            <div>
              <span className="vax-kicker">May revenue cycle</span>
              <h1>482k EUR captured, 14 holds need review.</h1>
            </div>
            <button className="vax-button" type="button">Create payout</button>
          </header>

          <section className="vax-dash-grid">
            <FinanceProof />
            <article className="vax-risk">
              <span className="vax-kicker">Risk queue</span>
              <h2>Orange is only a review edge.</h2>
              <p>Risk attention never competes with the violet payout action.</p>
              <button type="button">Review holds</button>
            </article>
            <div className="vax-table">
              {transfers.map((item) => (
                <p key={item.id}>
                  <span>{item.id}</span>
                  <strong>{item.merchant}</strong>
                  <em>{item.amount}</em>
                  <StatusPill role={item.role}>{item.status}</StatusPill>
                </p>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

function VaxNav({ active }) {
  return (
    <header className="vax-nav">
      <Link className="vax-logo" to="/skills/vibrant-accents">FlowMint</Link>
      <nav aria-label="Navigation FlowMint">
        <Link data-active={active === 'vitrine'} to="/skills/vibrant-accents/vitrine">Vitrine</Link>
        <Link data-active={active === 'dashboard'} to="/skills/vibrant-accents/dashboard">Dashboard</Link>
        <Link to="/skills">Skills</Link>
      </nav>
    </header>
  )
}

function FinanceProof() {
  return (
    <article className="vax-proof">
      <header>
        <span className="vax-kicker">Revenue cockpit</span>
        <StatusPill role="success">Live</StatusPill>
      </header>
      <div className="vax-chart" aria-label="Revenue chart">
        <span style={{ height: '42%' }} />
        <span style={{ height: '58%' }} />
        <span style={{ height: '51%' }} />
        <span style={{ height: '76%' }} data-active="true" />
        <span style={{ height: '68%' }} />
      </div>
      <div className="vax-metrics">
        {accounts.map((item) => (
          <p data-accent={item.accent} key={item.name}>
            <span>{item.name}</span>
            <strong>{item.value}</strong>
          </p>
        ))}
      </div>
    </article>
  )
}

function StatusPill({ role, children }) {
  return <span className="vax-status" data-role={role}>{children}</span>
}

function useVibrantReveal() {
  useGSAP(() => {
    gsap.from('.vax-reveal', {
      y: 16,
      opacity: 0,
      duration: 0.58,
      ease: 'power2.out',
      stagger: 0.06,
    })
  }, [])
}

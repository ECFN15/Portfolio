import { useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const assets = [
  { id: 'BF-018-A3', name: 'Hero still A3', channel: 'Lookbook', owner: 'Mae', status: 'Approved', role: 'success', deadline: '21:00', score: 98 },
  { id: 'BF-018-TK09', name: 'TikTok cut 09', channel: 'Social', owner: 'Ivo', status: 'Blocked', role: 'danger', deadline: '18:40', score: 42 },
  { id: 'BF-018-LG2', name: 'Legal claim sheet', channel: 'Site', owner: 'Noor', status: 'Needs review', role: 'warning', deadline: '19:10', score: 64 },
  { id: 'BF-018-ML4', name: 'Email hero module', channel: 'CRM', owner: 'June', status: 'Approved', role: 'success', deadline: '20:15', score: 91 },
  { id: 'BF-018-PR7', name: 'Price lock banner', channel: 'Commerce', owner: 'Ash', status: 'Active', role: 'info', deadline: '20:45', score: 86 },
  { id: 'BF-018-RC1', name: 'Retouch crop 1:1', channel: 'Paid', owner: 'Mae', status: 'Ready', role: 'neutral', deadline: '19:55', score: 72 },
]

const checks = [
  ['Legal approval', 'Blocked by ingredient claim wording', 'danger'],
  ['Price lock', 'Live in storefront and email module', 'success'],
  ['Social export', 'Cut 09 missing product safe zone', 'warning'],
  ['Traffic split', '80/20 against archive audience', 'info'],
]

const campaignStats = [
  ['96%', 'visual system match', 'success'],
  ['2', 'critical blockers', 'danger'],
  ['18:40', 'next owner deadline', 'warning'],
  ['41', 'assets in drop', 'neutral'],
]

export default function HighContrastExperience() {
  const { view = 'vitrine' } = useParams()
  return view === 'dashboard' ? <CampaignBoard /> : <BlackframeVitrine />
}

function BlackframeVitrine() {
  const root = useHighContrastReveal()

  return (
    <main ref={root} className="hcx-page hcx-page--vitrine" data-skill="high-contrast" data-archetype="black-launch-slab">
      <HighContrastNav active="vitrine" />

      <section className="hcx-hero hcx-reveal">
        <div className="hcx-hero-copy">
          <span className="hcx-kicker">Campaign command / Drop 018</span>
          <h1>BLACKFRAME ships brutal launches without soft approvals.</h1>
          <p>
            A hard-edge campaign system for fashion teams that need creative proof, legal blockers, price locks, social exports,
            and commerce readiness visible before the drop window closes.
          </p>
          <div className="hcx-actions">
            <Link className="hcx-button hcx-button--inverse" to="/skills/high-contrast/dashboard">Open campaign board</Link>
            <a className="hcx-button hcx-button--ghost" href="#proof-system">Inspect proof system</a>
          </div>
        </div>

        <PosterProof />
      </section>

      <section className="hcx-stat-band hcx-reveal" aria-label="BLACKFRAME launch metrics">
        {campaignStats.map(([value, label, role]) => (
          <article className="hcx-stat" data-role={role} key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      <section id="proof-system" className="hcx-section hcx-section--split hcx-reveal">
        <div>
          <span className="hcx-kicker">Proof object</span>
          <h2>Every dramatic frame has an owner, deadline, and state.</h2>
          <p>
            The brand can stay stark because the product evidence is not decorative. Asset rows, blocked claims, crop rules, channel
            labels, and live scores give the launch team a shared command surface.
          </p>
        </div>
        <AssetTable compact />
      </section>

      <section className="hcx-poster-grid hcx-reveal" aria-label="Campaign material">
        {[
          ['01', 'Poster authority', 'Huge type, severe crop, and direct product claim.'],
          ['02', 'Commerce proof', 'Price lock, availability, SKU state, and CTA stay readable.'],
          ['03', 'Legal hold', 'Red is reserved for blockers only, never decoration.'],
          ['04', 'Launch room', 'Rows beat moodboards when the team needs a decision.'],
        ].map(([num, title, body], index) => (
          <article className="hcx-poster-card" data-invert={index === 1 ? 'true' : undefined} key={title}>
            <span>{num}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="hcx-product-preview hcx-reveal">
        <div>
          <span className="hcx-kicker">Specialized interface</span>
          <h2>The campaign board is the product, not a fake screenshot.</h2>
          <p>
            Review the live board with asset filters, legal blockers, owner deadlines, launch checklist, and selected asset detail.
          </p>
          <Link className="hcx-button hcx-button--inverse" to="/skills/high-contrast/dashboard">Review drop 018</Link>
        </div>
        <CampaignMini />
      </section>
    </main>
  )
}

function CampaignBoard() {
  const [filter, setFilter] = useState('All')
  const [selectedId, setSelectedId] = useState(assets[1].id)
  const root = useHighContrastReveal()

  const filteredAssets = useMemo(() => {
    if (filter === 'All') return assets
    return assets.filter((asset) => asset.status === filter || asset.role === filter.toLowerCase())
  }, [filter])

  const selectedAsset = useMemo(() => assets.find((asset) => asset.id === selectedId) ?? assets[0], [selectedId])

  return (
    <main ref={root} className="hcx-page hcx-page--dashboard" data-skill="high-contrast" data-archetype="data-console-contrast">
      <HighContrastNav active="dashboard" />

      <section className="hcx-board hcx-reveal">
        <aside className="hcx-board-rail">
          <div>
            <span className="hcx-kicker">BLACKFRAME OS</span>
            <h1>Drop 018 command board.</h1>
            <p>Asset approvals, legal blockers, launch readiness, owners, and hard deadlines for a midnight campaign.</p>
          </div>

          <div className="hcx-filter-bar" role="tablist" aria-label="Campaign asset filters">
            {['All', 'Approved', 'Blocked', 'Needs review', 'Active'].map((item) => (
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

          <section className="hcx-checks" aria-label="Launch checks">
            {checks.map(([title, body, role]) => (
              <article className="hcx-status-row" data-role={role} key={title}>
                <div>
                  <strong>{title}</strong>
                  <span>{body}</span>
                </div>
                <StatusPill role={role}>{role}</StatusPill>
              </article>
            ))}
          </section>
        </aside>

        <section className="hcx-board-main">
          <header className="hcx-board-head">
            <div>
              <span className="hcx-kicker">May 05 / launch window 22:00 CET</span>
              <h2>Campaign readiness</h2>
            </div>
            <div className="hcx-board-actions">
              <button type="button" className="hcx-button hcx-button--ghost">Export brief</button>
              <button type="button" className="hcx-button hcx-button--accent">Escalate blockers</button>
            </div>
          </header>

          <div className="hcx-board-grid">
            <section className="hcx-readiness">
              <div>
                <span className="hcx-kicker">Readiness score</span>
                <strong>74</strong>
                <p>Critical blockers must clear before paid and email can publish.</p>
              </div>
              <div className="hcx-bars" aria-label="Readiness by channel">
                {[
                  ['Site', 91],
                  ['CRM', 88],
                  ['Paid', 72],
                  ['Social', 43],
                ].map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <i><b style={{ width: `${value}%` }} /></i>
                    <em>{value}%</em>
                  </div>
                ))}
              </div>
            </section>

            <section className="hcx-selected-asset" data-role={selectedAsset.role}>
              <span className="hcx-kicker">Selected asset</span>
              <h3>{selectedAsset.name}</h3>
              <dl>
                <div><dt>ID</dt><dd>{selectedAsset.id}</dd></div>
                <div><dt>Owner</dt><dd>{selectedAsset.owner}</dd></div>
                <div><dt>Channel</dt><dd>{selectedAsset.channel}</dd></div>
                <div><dt>Deadline</dt><dd>{selectedAsset.deadline}</dd></div>
              </dl>
              <StatusPill role={selectedAsset.role}>{selectedAsset.status}</StatusPill>
            </section>

            <section className="hcx-asset-panel">
              <div className="hcx-panel-title">
                <span className="hcx-kicker">Asset register</span>
                <strong>{filteredAssets.length} visible rows</strong>
              </div>
              <AssetTable rows={filteredAssets} selectedId={selectedId} onSelect={setSelectedId} />
            </section>

            <section className="hcx-command-block">
              <span className="hcx-kicker">Accent job: blockers</span>
              <h3>Red appears only when the launch is at risk.</h3>
              <p>
                Legal copy and social export hold the drop. Use inversion for selection, black/white for hierarchy, and red only for
                unblockable campaign risk.
              </p>
              <div className="hcx-command-actions">
                <button type="button">Assign legal owner</button>
                <button type="button">Open export note</button>
              </div>
            </section>
          </div>
        </section>
      </section>
    </main>
  )
}

function HighContrastNav({ active }) {
  return (
    <header className="hcx-nav">
      <Link to="/skills/high-contrast" className="hcx-logo">BLACKFRAME</Link>
      <nav aria-label="BLACKFRAME pages">
        <Link data-active={active === 'vitrine' ? 'true' : undefined} to="/skills/high-contrast/vitrine">Vitrine</Link>
        <Link data-active={active === 'dashboard' ? 'true' : undefined} to="/skills/high-contrast/dashboard">Campaign board</Link>
        <Link to="/skills">Skills</Link>
      </nav>
    </header>
  )
}

function PosterProof() {
  return (
    <div className="hcx-proof" aria-label="BLACKFRAME campaign proof wall">
      <div className="hcx-proof-poster">
        <span>DROP 018</span>
        <strong>NO SOFT DEFAULTS</strong>
        <em>Midnight / 22:00 CET / 41 assets</em>
      </div>
      <div className="hcx-proof-list">
        {assets.slice(0, 4).map((asset) => (
          <div className="hcx-proof-row" data-role={asset.role} key={asset.id}>
            <span>{asset.id}</span>
            <strong>{asset.name}</strong>
            <em>{asset.status}</em>
          </div>
        ))}
      </div>
    </div>
  )
}

function CampaignMini() {
  return (
    <div className="hcx-mini" aria-label="Campaign board preview">
      <div className="hcx-mini-head">
        <span>Drop 018</span>
        <strong>74 READY</strong>
      </div>
      <div className="hcx-mini-body">
        <div className="hcx-mini-bars">
          {[91, 88, 72, 43].map((value, index) => <i style={{ height: `${value}%` }} key={index} />)}
        </div>
        <div className="hcx-mini-rows">
          {assets.slice(0, 5).map((asset) => (
            <div data-role={asset.role} key={asset.id}>
              <span>{asset.id}</span>
              <strong>{asset.status}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AssetTable({ rows = assets, selectedId, onSelect, compact = false }) {
  return (
    <div className="hcx-table-wrap" data-compact={compact ? 'true' : undefined}>
      <table className="hcx-table">
        <thead>
          <tr>
            <th scope="col">Asset</th>
            <th scope="col">Channel</th>
            <th scope="col">Owner</th>
            <th scope="col">State</th>
            {!compact && <th scope="col">Score</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((asset) => (
            <tr
              data-selected={selectedId === asset.id ? 'true' : undefined}
              data-role={asset.role}
              onClick={onSelect ? () => onSelect(asset.id) : undefined}
              key={asset.id}
            >
              <td>
                <span>{asset.id}</span>
                <strong>{asset.name}</strong>
              </td>
              <td>{asset.channel}</td>
              <td>{asset.owner}</td>
              <td><StatusPill role={asset.role}>{asset.status}</StatusPill></td>
              {!compact && <td>{asset.score}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatusPill({ role, children }) {
  return <span className="hcx-status" data-role={role}>{children}</span>
}

function useHighContrastReveal() {
  const scope = useRef(null)
  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return

      gsap.from('.hcx-reveal', {
        y: 28,
        opacity: 0,
        duration: 0.72,
        ease: 'power3.out',
        stagger: 0.07,
      })

      gsap.from('.hcx-proof-poster, .hcx-table tbody tr, .hcx-status-row', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.035,
        delay: 0.12,
      })
    },
    { scope },
  )
  return scope
}

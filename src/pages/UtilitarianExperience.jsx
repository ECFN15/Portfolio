import { Link, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const requests = [
  { id: 'REQ-2108', name: 'Road closure permit', owner: 'Maya', status: 'Pending', role: 'warning', date: '2026-05-06' },
  { id: 'REQ-2107', name: 'Vendor access badge', owner: 'Sam', status: 'Failed', role: 'danger', date: '2026-05-05' },
  { id: 'REQ-2106', name: 'Night delivery slot', owner: 'Jules', status: 'Approved', role: 'success', date: '2026-05-04' },
  { id: 'REQ-2105', name: 'Archive policy update', owner: 'Read only', status: 'Locked', role: 'neutral', date: '2026-05-03' },
]

const audit = [
  ['09:12', 'Maya', 'edited field', 'street_address'],
  ['09:18', 'System', 'validation failed', 'insurance_pdf missing'],
  ['09:21', 'Sam', 'exported record', 'REQ-2107'],
]

export default function UtilitarianExperience() {
  const { view } = useParams()
  return view === 'dashboard' ? <PermitDeskAdmin /> : <PermitDeskVitrine />
}

function PermitDeskVitrine() {
  useUtilityReveal()

  return (
    <main className="utx-page">
      <UtilityNav active="vitrine" />
      <section className="utx-hero utx-reveal">
        <div className="utx-copy">
          <span className="utx-kicker">PermitDesk internal system</span>
          <h1>Process field requests without hiding the controls.</h1>
          <p>
            PermitDesk aide les equipes operations a approuver, rejeter, exporter et auditer des demandes terrain
            depuis une surface directe et lisible.
          </p>
          <div className="utx-actions">
            <Link className="utx-button" to="/skills/utilitarian/dashboard">Ouvrir l'admin</Link>
            <Link className="utx-link" to="/skills/utilitarian">Retour au skill</Link>
          </div>
        </div>
        <AdminPreview />
      </section>

      <section className="utx-section utx-reveal">
        <header>
          <span className="utx-kicker">Workflow</span>
          <h2>La preuve est dans la surface de travail.</h2>
          <p>Recherche, filtres, selection, drawer, validation et audit restent visibles sans animation inutile.</p>
        </header>
        <div className="utx-rules">
          {['Controls visible', 'Exact state labels', 'Bulk actions', 'Audit trail'].map((item) => (
            <article key={item}><strong>{item}</strong><span>Ready</span></article>
          ))}
        </div>
      </section>
    </main>
  )
}

function PermitDeskAdmin() {
  useUtilityReveal()
  const selected = requests[0]

  return (
    <main className="utx-page">
      <UtilityNav active="dashboard" />
      <section className="utx-admin utx-reveal">
        <header className="utx-toolbar">
          <label>
            <span>Search</span>
            <input defaultValue="owner:maya status:pending" />
          </label>
          <button type="button">Filter</button>
          <button type="button">Export</button>
          <button type="button">Clear</button>
          <button className="utx-button" type="button">Add request</button>
        </header>

        <div className="utx-body">
          <main className="utx-table-wrap">
            <div className="utx-bulk">
              <strong>1 selected</strong>
              <button type="button">Approve</button>
              <button type="button">Reject</button>
              <button type="button">Archive</button>
              <span>Cannot archive locked rows.</span>
            </div>
            <table className="utx-table">
              <thead>
                <tr><th><input type="checkbox" aria-label="Select all" /></th><th>ID</th><th>Name</th><th>Owner</th><th>Status</th><th>Date</th></tr>
              </thead>
              <tbody>
                {requests.map((request, index) => (
                  <tr data-selected={index === 0} data-role={request.role} key={request.id}>
                    <td><input type="checkbox" aria-label={`Select ${request.id}`} defaultChecked={index === 0} /></td>
                    <td>{request.id}</td>
                    <td>{request.name}</td>
                    <td>{request.owner}</td>
                    <td><StatusPill role={request.role}>{request.status}</StatusPill></td>
                    <td>{request.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>

          <aside className="utx-drawer">
            <header>
              <span className="utx-kicker">Detail drawer</span>
              <StatusPill role={selected.role}>{selected.status}</StatusPill>
            </header>
            <h2>{selected.id}</h2>
            <label data-invalid="true">
              <span>Insurance PDF</span>
              <input defaultValue="" aria-invalid="true" />
              <small>Upload a valid PDF before approving.</small>
            </label>
            <label>
              <span>Assigned owner</span>
              <input defaultValue={selected.owner} />
            </label>
            <footer>
              <button type="button">Cancel</button>
              <button type="button">Save changes</button>
            </footer>
          </aside>

          <article className="utx-audit">
            <header>
              <span className="utx-kicker">Audit log</span>
              <StatusPill role="info">Active</StatusPill>
            </header>
            {audit.map(([time, actor, action, object]) => (
              <p key={`${time}-${object}`}>
                <span>{time}</span>
                <strong>{actor}</strong>
                <em>{action}</em>
                <small>{object}</small>
              </p>
            ))}
          </article>
        </div>
      </section>
    </main>
  )
}

function UtilityNav({ active }) {
  return (
    <header className="utx-nav">
      <Link className="utx-logo" to="/skills/utilitarian">PermitDesk</Link>
      <nav aria-label="Navigation PermitDesk">
        <Link data-active={active === 'vitrine'} to="/skills/utilitarian/vitrine">Vitrine</Link>
        <Link data-active={active === 'dashboard'} to="/skills/utilitarian/dashboard">Admin</Link>
        <Link to="/skills">Skills</Link>
      </nav>
    </header>
  )
}

function AdminPreview() {
  return (
    <div className="utx-preview">
      <div className="utx-bulk"><strong>1 selected</strong><button type="button">Approve</button><button type="button">Export</button></div>
      <table className="utx-table">
        <tbody>
          {requests.slice(0, 3).map((request, index) => (
            <tr data-selected={index === 0} data-role={request.role} key={request.id}>
              <td>{request.id}</td>
              <td>{request.name}</td>
              <td><StatusPill role={request.role}>{request.status}</StatusPill></td>
              <td>{request.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatusPill({ role, children }) {
  return <span className="utx-status" data-role={role}>{children}</span>
}

function useUtilityReveal() {
  useGSAP(() => {
    gsap.from('.utx-reveal', {
      opacity: 0,
      duration: 0.35,
      ease: 'power1.out',
      stagger: 0.04,
    })
  }, [])
}

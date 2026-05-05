import { useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const materials = [
  { name: 'Neroli absolute', origin: 'Tunisia', role: 'Heart', state: 'Selected', detail: 'Steam distilled, 2026 lot' },
  { name: 'Bergamot peel', origin: 'Calabria', role: 'Top', state: 'Stable', detail: 'Low furocoumarin fraction' },
  { name: 'Birch tar', origin: 'Spain', role: 'Smoke', state: 'Watch', detail: 'Micro-dose under IFRA review' },
  { name: 'Orris butter', origin: 'Tuscany', role: 'Fixative', state: 'Reserved', detail: '36 month aged root' },
]

const appointments = [
  { time: '09:30', client: 'A. Laurent', format: 'Studio', focus: 'Neroli smoke', state: 'Confirmed' },
  { time: '11:00', client: 'M. Chen', format: 'Remote', focus: 'Leather tea', state: 'Preparing' },
  { time: '14:30', client: 'S. Roche', format: 'Studio', focus: 'Paper iris', state: 'Deposit paid' },
]

const accordOptions = [
  { name: 'Citrus lift', value: 22 },
  { name: 'White floral', value: 34 },
  { name: 'Smoke trace', value: 8 },
  { name: 'Dry paper', value: 18 },
  { name: 'Soft musk', value: 18 },
]

export default function HighEndDesignExperience() {
  const { view = 'vitrine' } = useParams()
  return view === 'dashboard' ? <SolenneAtelier /> : <SolenneVitrine />
}

function SolenneVitrine() {
  const root = useHighEndReveal()

  return (
    <main ref={root} className="hedx-page" data-skill="high-end-design" data-archetype="precision-object-gallery">
      <SolenneNav active="vitrine" />

      <section className="hedx-hero hedx-reveal">
        <div className="hedx-hero-copy">
          <span className="hedx-kicker">Maison Solenne / private extrait commissions</span>
          <h1>No. 04 Neroli Smoke is commissioned by material, not mythology.</h1>
          <p>
            A private fragrance house where clients inspect the bottle, paper, note structure, concentration, lead time, and
            appointment path before a scent is made to order.
          </p>
          <div className="hedx-actions">
            <Link className="hedx-button hedx-button--dark" to="/skills/high-end-design/dashboard">Reserve a studio appointment</Link>
            <a className="hedx-text-link" href="#materials">Inspect materials</a>
          </div>
        </div>
        <FragranceObject />
      </section>

      <section id="materials" className="hedx-material-section hedx-reveal">
        <div className="hedx-section-copy">
          <span className="hedx-kicker">Material ledger</span>
          <h2>The luxury signal is proof of origin, dosage, paper, and lead time.</h2>
          <p>
            Solenne avoids vague romance. Every accord is anchored by a material row, a bottle finish, a paper stock, and an
            appointment record the client can understand.
          </p>
        </div>
        <MaterialRows />
      </section>

      <section className="hedx-gallery hedx-reveal" aria-label="Maison Solenne craft chapters">
        {[
          ['01', 'Flacon', '75 ml clear glass, hand-filled, waxed paper seal, brushed steel cap.'],
          ['02', 'Formula', 'Extrait concentration, 18 percent aromatic load, four week maceration.'],
          ['03', 'Paper', 'Fabriano wrap, blind deboss, batch note and client initials.'],
        ].map(([num, title, body]) => (
          <article className="hedx-chapter" key={title}>
            <span>{num}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="hedx-preview hedx-reveal">
        <div>
          <span className="hedx-kicker">Concierge atelier</span>
          <h2>A quiet technical workspace sits behind the commission.</h2>
          <p>
            The atelier page handles appointments, accord balance, material states, deposit status, and next-step confirmation
            without breaking the calm product language.
          </p>
          <Link className="hedx-button hedx-button--dark" to="/skills/high-end-design/dashboard">Open concierge atelier</Link>
        </div>
        <AtelierMini />
      </section>

      <section className="hedx-purchase-bar hedx-reveal" aria-label="Reservation bar">
        <div>
          <span>No. 04 Neroli Smoke</span>
          <strong>75 ml extrait / made to order / 14 day lead time</strong>
        </div>
        <Link className="hedx-button hedx-button--light" to="/skills/high-end-design/dashboard">Reserve viewing</Link>
      </section>
    </main>
  )
}

function SolenneAtelier() {
  const [selectedNote, setSelectedNote] = useState('White floral')
  const [selectedSlot, setSelectedSlot] = useState(appointments[0].time)
  const root = useHighEndReveal()
  const selectedAppointment = useMemo(() => appointments.find((item) => item.time === selectedSlot) ?? appointments[0], [selectedSlot])

  return (
    <main ref={root} className="hedx-page hedx-page--atelier" data-skill="high-end-design" data-archetype="concierge-atelier">
      <SolenneNav active="dashboard" />

      <section className="hedx-atelier hedx-reveal">
        <aside className="hedx-atelier-side">
          <div>
            <span className="hedx-kicker">Private atelier</span>
            <h1>Commission desk.</h1>
            <p>Appointments, accord balance, material origin, deposit status, and bottle finish for made-to-order extrait.</p>
          </div>

          <div className="hedx-purchase-card">
            <span>No. 04 Neroli Smoke</span>
            <strong>EUR 420</strong>
            <p>75 ml extrait. Deposit EUR 120. Current lead time 14 days.</p>
            <button type="button">Confirm reservation</button>
          </div>
        </aside>

        <section className="hedx-atelier-main">
          <header className="hedx-atelier-head">
            <div>
              <span className="hedx-kicker">Selected appointment</span>
              <h2>{selectedAppointment.client} / {selectedAppointment.time}</h2>
            </div>
            <StatusPill>{selectedAppointment.state}</StatusPill>
          </header>

          <div className="hedx-atelier-grid">
            <section className="hedx-accord-panel">
              <div className="hedx-panel-title">
                <span className="hedx-kicker">Accord balance</span>
                <strong>{selectedNote}</strong>
              </div>
              <div className="hedx-accord-bars" aria-label="Accord percentages">
                {accordOptions.map((item) => (
                  <button
                    type="button"
                    data-active={selectedNote === item.name ? 'true' : undefined}
                    onClick={() => setSelectedNote(item.name)}
                    key={item.name}
                  >
                    <span>{item.name}</span>
                    <i><b style={{ width: `${item.value}%` }} /></i>
                    <em>{item.value}%</em>
                  </button>
                ))}
              </div>
            </section>

            <section className="hedx-object-panel">
              <FragranceObject compact />
            </section>

            <section className="hedx-appointment-panel">
              <div className="hedx-panel-title">
                <span className="hedx-kicker">Appointment ledger</span>
                <strong>May 2026</strong>
              </div>
              {appointments.map((item) => (
                <button
                  type="button"
                  data-active={selectedSlot === item.time ? 'true' : undefined}
                  onClick={() => setSelectedSlot(item.time)}
                  key={item.time}
                >
                  <span>{item.time}</span>
                  <strong>{item.client}</strong>
                  <em>{item.format} / {item.focus}</em>
                  <StatusPill>{item.state}</StatusPill>
                </button>
              ))}
            </section>

            <section className="hedx-material-panel">
              <div className="hedx-panel-title">
                <span className="hedx-kicker">Material status</span>
                <strong>Formula No. 04</strong>
              </div>
              <MaterialRows />
            </section>

            <section className="hedx-concierge-form">
              <span className="hedx-kicker">Concierge note</span>
              <h3>Prepare the viewing without noise.</h3>
              <label>
                Client intent
                <select defaultValue="private-gift">
                  <option value="private-gift">Private gift</option>
                  <option value="signature">Personal signature</option>
                  <option value="archive">Archive reorder</option>
                </select>
              </label>
              <label>
                Material sample
                <select defaultValue="paper-iris">
                  <option value="paper-iris">Paper iris strip</option>
                  <option value="neroli-smoke">Neroli smoke blotter</option>
                  <option value="leather-tea">Leather tea accord</option>
                </select>
              </label>
              <button type="button">Save appointment note</button>
            </section>
          </div>
        </section>
      </section>
    </main>
  )
}

function SolenneNav({ active }) {
  return (
    <header className="hedx-nav">
      <Link to="/skills/high-end-design" className="hedx-logo">Maison Solenne</Link>
      <nav aria-label="Maison Solenne pages">
        <Link data-active={active === 'vitrine' ? 'true' : undefined} to="/skills/high-end-design/vitrine">Vitrine</Link>
        <Link data-active={active === 'dashboard' ? 'true' : undefined} to="/skills/high-end-design/dashboard">Atelier</Link>
        <Link to="/skills">Skills</Link>
      </nav>
    </header>
  )
}

function FragranceObject({ compact = false }) {
  return (
    <figure className="hedx-object" data-compact={compact ? 'true' : undefined} aria-label="No. 04 Neroli Smoke bottle">
      <div className="hedx-object-stage">
        <div className="hedx-bottle">
          <span>04</span>
          <strong>Neroli Smoke</strong>
          <em>Extrait / 75 ml</em>
        </div>
        <div className="hedx-cap" aria-hidden="true" />
        <div className="hedx-note-card">
          <span>Lead time</span>
          <strong>14 days</strong>
        </div>
      </div>
      <figcaption>Clear glass, brushed steel cap, Fabriano wrap, hand-filled in Paris.</figcaption>
    </figure>
  )
}

function MaterialRows() {
  return (
    <div className="hedx-material-rows">
      {materials.map((item) => (
        <article className="hedx-material-row" data-state={item.state.toLowerCase().replace(' ', '-')} key={item.name}>
          <span>{item.role}</span>
          <strong>{item.name}</strong>
          <em>{item.origin}</em>
          <p>{item.detail}</p>
          <StatusPill>{item.state}</StatusPill>
        </article>
      ))}
    </div>
  )
}

function AtelierMini() {
  return (
    <div className="hedx-mini" aria-label="Concierge atelier preview">
      <div className="hedx-mini-head">
        <span>Atelier</span>
        <strong>04</strong>
      </div>
      <div className="hedx-mini-body">
        <div className="hedx-mini-bars">
          {accordOptions.map((item) => (
            <div key={item.name}>
              <span>{item.name}</span>
              <i><b style={{ width: `${item.value}%` }} /></i>
            </div>
          ))}
        </div>
        <div className="hedx-mini-ledger">
          {appointments.map((item) => (
            <div key={item.time}>
              <span>{item.time}</span>
              <strong>{item.state}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatusPill({ children }) {
  return <span className="hedx-status">{children}</span>
}

function useHighEndReveal() {
  const scope = useRef(null)
  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return

      gsap.from('.hedx-reveal', {
        y: 24,
        opacity: 0,
        duration: 0.84,
        ease: 'power3.out',
        stagger: 0.08,
      })

      gsap.from('.hedx-object-stage, .hedx-chapter, .hedx-material-row', {
        clipPath: 'inset(8% 4% 8% 4%)',
        opacity: 0,
        duration: 0.68,
        ease: 'power2.out',
        stagger: 0.05,
        delay: 0.08,
      })
    },
    { scope },
  )
  return scope
}

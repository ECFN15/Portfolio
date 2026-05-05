import { Link, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const sessions = [
  { time: '08:20', title: 'Reset respiratoire', owner: 'Mila', state: 'Complete', role: 'success', score: '+18%' },
  { time: '12:10', title: 'Pause focus', owner: 'Equipe produit', state: 'Active', role: 'info', score: '14 min' },
  { time: '17:45', title: 'Journal du soir', owner: 'Mila', state: 'Pending', role: 'warning', score: '3 notes' },
  { time: '21:00', title: 'Sommeil guide', owner: 'Mode calme', state: 'Ready', role: 'neutral', score: '28 min' },
]

const plans = [
  ['Stress', 'Routine courte ajustee par meteo, agenda et humeur.'],
  ['Sommeil', 'Analyse douce des signaux et recommandations sans surcharge.'],
  ['Equipe', 'Rituels collectifs pour managers et remote teams.'],
]

export default function SoftGradientsExperience() {
  const { view } = useParams()
  return view === 'dashboard' ? <LumaCalmDesk /> : <LumaCalmVitrine />
}

function LumaCalmVitrine() {
  useSoftReveal()

  return (
    <main className="sgx-page sgx-page--vitrine">
      <SoftNav active="vitrine" />

      <section className="sgx-hero sgx-reveal">
        <div className="sgx-copy">
          <span className="sgx-kicker">LumaCalm IA wellness</span>
          <h1>Planifier le calme sans quitter son agenda.</h1>
          <p>
            LumaCalm transforme signaux faibles, charge mentale et rythmes d'equipe en micro routines lisibles,
            avec une IA qui propose sans envahir.
          </p>
          <div className="sgx-actions">
            <Link className="sgx-button" to="/skills/soft-gradients/dashboard">Ouvrir le cockpit</Link>
            <Link className="sgx-link" to="/skills/soft-gradients">Retour au skill</Link>
          </div>
        </div>
        <WellnessFrame />
      </section>

      <section className="sgx-band sgx-reveal">
        <div>
          <span className="sgx-kicker">Produit</span>
          <h2>Des gradients qui cadrent l'emotion, pas la lecture.</h2>
        </div>
        <div className="sgx-card-grid">
          {plans.map(([title, text], index) => (
            <article className="sgx-card" data-state={index === 0 ? 'selected' : 'default'} key={title}>
              <span>0{index + 1}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sgx-preview sgx-reveal">
        <div>
          <span className="sgx-kicker">Cockpit integre</span>
          <h2>Le dashboard reste protege dans une surface claire.</h2>
          <p>
            La vitrine montre la vraie interface: etats de session, journal, progression et controles d'ambiance.
          </p>
          <Link className="sgx-link" to="/skills/soft-gradients/dashboard">Voir l'interface complete</Link>
        </div>
        <DeskMini />
      </section>
    </main>
  )
}

function LumaCalmDesk() {
  const active = sessions[1]
  useSoftReveal()

  return (
    <main className="sgx-page sgx-page--desk">
      <SoftNav active="dashboard" />
      <section className="sgx-desk">
        <aside className="sgx-rail sgx-reveal">
          <span className="sgx-kicker">Cockpit LumaCalm</span>
          <h1>Journee douce</h1>
          <p>Recommandations IA, routines et signaux d'equipe dans une interface apaisee.</p>
          <div className="sgx-poles" aria-label="Modes de gradient">
            <button data-active="true"><span /> Prism</button>
            <button><span /> Sunrise</button>
            <button><span /> Dusk</button>
          </div>
        </aside>

        <div className="sgx-workspace sgx-reveal">
          <header className="sgx-head">
            <div>
              <span className="sgx-kicker">Mardi 5 mai</span>
              <h2>Charge stable, sommeil a renforcer.</h2>
            </div>
            <button className="sgx-button" type="button">Generer une routine</button>
          </header>

          <section className="sgx-desk-grid">
            <article className="sgx-insight" data-state="success">
              <span>Score calme</span>
              <strong>82</strong>
              <p>Le niveau de tension baisse depuis trois jours. Prochaine action: pause focus courte.</p>
            </article>

            <article className="sgx-journal" data-state="loading">
              <span className="sgx-kicker">Journal IA</span>
              <h3>{active.title}</h3>
              <p>
                Analyse en cours: deux reunions denses detectees, une fenetre de recuperation disponible avant 14h.
              </p>
              <div className="sgx-progress"><span /></div>
            </article>

            <div className="sgx-table">
              {sessions.map((item) => (
                <button type="button" data-active={item.title === active.title} key={item.title}>
                  <span>{item.time}</span>
                  <strong>{item.title}</strong>
                  <em>{item.owner}</em>
                  <StatusPill role={item.role}>{item.state}</StatusPill>
                  <small>{item.score}</small>
                </button>
              ))}
            </div>

            <article className="sgx-note" data-state="error">
              <span className="sgx-kicker">Attention douce</span>
              <h3>Synchronisation bague incomplete.</h3>
              <p>Les recommandations restent disponibles, mais la mesure de recuperation nocturne attend une reconnexion.</p>
              <button type="button">Reconnecter</button>
            </article>
          </section>
        </div>
      </section>
    </main>
  )
}

function SoftNav({ active }) {
  return (
    <header className="sgx-nav">
      <Link className="sgx-logo" to="/skills/soft-gradients">LumaCalm</Link>
      <nav aria-label="Navigation LumaCalm">
        <Link data-active={active === 'vitrine'} to="/skills/soft-gradients/vitrine">Vitrine</Link>
        <Link data-active={active === 'dashboard'} to="/skills/soft-gradients/dashboard">Cockpit</Link>
        <Link to="/skills">Skills</Link>
      </nav>
    </header>
  )
}

function WellnessFrame() {
  return (
    <article className="sgx-frame" aria-label="Apercu produit LumaCalm">
      <div className="sgx-chrome">
        <span />
        <span />
        <span />
        <strong>Routine builder</strong>
      </div>
      <div className="sgx-frame-body">
        <aside>
          {['Respirer', 'Focus', 'Sommeil'].map((item, index) => (
            <button data-active={index === 0} type="button" key={item}>{item}</button>
          ))}
        </aside>
        <div>
          <div className="sgx-orbit">
            <strong>12 min</strong>
            <span>Reset guide</span>
          </div>
          <div className="sgx-frame-cards">
            <p><span>Signal</span><strong>Agenda dense</strong></p>
            <p><span>Action</span><strong>Pause avant demo</strong></p>
            <p><span>Etat</span><strong>Calme actif</strong></p>
          </div>
        </div>
      </div>
    </article>
  )
}

function DeskMini() {
  return (
    <div className="sgx-mini">
      <WellnessFrame />
      <div className="sgx-mini-strip">
        {sessions.slice(0, 3).map((item) => (
          <p key={item.title}>
            <span>{item.time}</span>
            <strong>{item.title}</strong>
            <StatusPill role={item.role}>{item.state}</StatusPill>
          </p>
        ))}
      </div>
    </div>
  )
}

function StatusPill({ role, children }) {
  return <span className="sgx-status" data-role={role}>{children}</span>
}

function useSoftReveal() {
  useGSAP(() => {
    gsap.from('.sgx-reveal', {
      y: 18,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.08,
    })
  }, [])
}

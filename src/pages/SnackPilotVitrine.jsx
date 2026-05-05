import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const routines = [
  { mark: '01', title: 'Plan clair', body: 'Trois repas cohérents au lieu de dix onglets ouverts le dimanche soir.' },
  { mark: '02', title: 'Budget lisible', body: 'Chaque box affiche coût, temps de préparation et reste au frigo.' },
  { mark: '03', title: 'Courses utiles', body: 'La liste se regroupe automatiquement pour éviter les achats doublons.' },
]

const menu = [
  ['Base', 'Quinoa citron'],
  ['Proteine', 'Pois chiches'],
  ['Legumes', 'Courgettes'],
  ['Sauce', 'Yaourt citron'],
]

const scenarios = [
  ['Lina', 'Etudiante', '4 repas pour moins de 16 euros.'],
  ['Thomas', 'Bureau presse', 'Repas prets en 12 minutes le matin.'],
  ['Ines', 'Sport regulier', 'Proteines stables sans manger toujours pareil.'],
]

export default function SnackPilotVitrine() {
  const root = useRef(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return

      gsap.from('.spx-reveal', {
        y: 28,
        opacity: 0,
        duration: 0.82,
        ease: 'power3.out',
        stagger: 0.07,
      })

      gsap.to('.spx-orbit-token', {
        y: -10,
        rotate: 2,
        duration: 2.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.16,
      })
    },
    { scope: root },
  )

  return (
    <main ref={root} className="spx-page" data-skill="expressive-brand" data-archetype="consumer-food-routine">
      <SnackNav active="vitrine" />

      <section className="spx-hero spx-reveal">
        <div className="spx-hero-copy">
          <span className="spx-kicker">App + routine + liste de courses</span>
          <h1>Ton midi vient de trouver son pilote.</h1>
          <p>
            SnackPilot transforme les envies floues en lunchbox concretes : repas, budget, temps de preparation
            et liste de courses restent dans la meme interface.
          </p>
          <div className="spx-actions">
            <Link className="spx-button spx-button-dark" to="/skills/expressive-brand/dashboard">Composer ma box</Link>
            <a className="spx-button spx-button-light" href="#builder-preview">Voir le produit</a>
          </div>
        </div>

        <div className="spx-hero-stage" aria-label="SnackPilot product preview">
          <span className="spx-orbit-token spx-token-a">Base</span>
          <span className="spx-orbit-token spx-token-b">Sauce a part</span>
          <span className="spx-orbit-token spx-token-c">4,20 euros</span>
          <LunchboxProof />
        </div>
      </section>

      <section className="spx-problem spx-reveal">
        <h2>Le probleme n'est pas de cuisiner. C'est de decider trop tard.</h2>
        <p>
          La marque garde un ton chaleureux, mais chaque section montre une preuve produit : moins d'improvisation,
          moins de livraison, moins de gaspillage.
        </p>
      </section>

      <section className="spx-routine-section spx-reveal">
        <header className="spx-section-head">
          <span className="spx-kicker">Routine system</span>
          <h2>Le motif de marque devient une logique d'interface.</h2>
          <p>
            Les pastilles representent les compartiments d'une box. Elles reviennent dans la navigation, les cartes,
            les etats selectionnes et la page builder.
          </p>
        </header>
        <div className="spx-routine-grid">
          {routines.map((item) => (
            <article className="spx-routine-card" key={item.mark}>
              <span>{item.mark}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="builder-preview" className="spx-builder-band spx-reveal">
        <div>
          <span className="spx-kicker">Specialized product</span>
          <h2>Le Lunchbox Builder applique la marque a une vraie interface.</h2>
          <p>
            Selection, score, budget, astuce de remplacement, liste generee et plan de preparation : la page
            specialisee est plus dense, mais reste lisible et brandee.
          </p>
          <Link className="spx-button spx-button-dark" to="/skills/expressive-brand/dashboard">Ouvrir le builder</Link>
        </div>
        <BuilderMiniature />
      </section>

      <section className="spx-scenarios spx-reveal">
        <header className="spx-section-head">
          <span className="spx-kicker">Use cases</span>
          <h2>Des scenarios concrets, pas des promesses abstraites.</h2>
        </header>
        <div className="spx-scenario-grid">
          {scenarios.map(([name, role, result]) => (
            <article key={name}>
              <span>{role}</span>
              <h3>{name}</h3>
              <p>{result}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="spx-footer spx-reveal">
        <div>
          <span className="spx-kicker">SnackPilot</span>
          <h2>Prevu hier. Mange tranquille.</h2>
        </div>
        <Link className="spx-button spx-button-light" to="/skills/expressive-brand/dashboard">Tester le coeur produit</Link>
      </footer>
    </main>
  )
}

function SnackNav({ active }) {
  return (
    <header className="spx-nav">
      <Link className="spx-logo" to="/skills/expressive-brand">
        <span aria-hidden="true" />
        SnackPilot
      </Link>
      <nav>
        <Link data-active={active === 'vitrine' ? 'true' : undefined} to="/skills/expressive-brand/vitrine">Vitrine</Link>
        <Link data-active={active === 'dashboard' ? 'true' : undefined} to="/skills/expressive-brand/dashboard">Builder</Link>
        <Link to={{ pathname: '/skills', hash: '#skill-expressive-brand' }}>Skills</Link>
      </nav>
    </header>
  )
}

function LunchboxProof() {
  return (
    <div className="spx-lunchbox-proof">
      <div className="spx-proof-head">
        <span>Ma semaine</span>
        <strong>3 box</strong>
      </div>
      <div className="spx-tray">
        {menu.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="spx-proof-stats">
        <span>86/100 equilibre</span>
        <span>15 min prep</span>
        <span>4,20 euros</span>
      </div>
    </div>
  )
}

function BuilderMiniature() {
  return (
    <div className="spx-builder-miniature" aria-label="Lunchbox Builder preview">
      <div className="spx-mini-rail">
        <span data-active="true">Base</span>
        <span>Proteine</span>
        <span>Legumes</span>
        <span>Sauce</span>
      </div>
      <div className="spx-mini-result">
        <strong>Box mediterranee</strong>
        <p>Quinoa, pois chiches, courgettes, yaourt citron.</p>
        <div>
          <span>Budget OK</span>
          <span>Liste prete</span>
        </div>
      </div>
    </div>
  )
}

import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const categories = [
  {
    key: 'base',
    label: 'Base',
    items: [
      { name: 'Quinoa citron', price: 0.92, time: 8, score: 18 },
      { name: 'Riz complet', price: 0.54, time: 10, score: 15 },
      { name: 'Semoule minute', price: 0.38, time: 4, score: 12 },
      { name: 'Lentilles vertes', price: 0.66, time: 12, score: 20 },
    ],
  },
  {
    key: 'protein',
    label: 'Proteine',
    items: [
      { name: 'Pois chiches', price: 0.84, time: 2, score: 18 },
      { name: 'Poulet paprika', price: 1.55, time: 9, score: 22 },
      { name: 'Oeufs marines', price: 1.1, time: 6, score: 20 },
      { name: 'Tofu grille', price: 1.28, time: 8, score: 19 },
    ],
  },
  {
    key: 'veggies',
    label: 'Legumes',
    items: [
      { name: 'Courgettes roties', price: 0.72, time: 6, score: 16 },
      { name: 'Concombre', price: 0.48, time: 2, score: 13 },
      { name: 'Brocoli vapeur', price: 0.88, time: 7, score: 19 },
      { name: 'Tomates cerises', price: 0.76, time: 1, score: 12 },
    ],
  },
  {
    key: 'sauce',
    label: 'Sauce',
    items: [
      { name: 'Yaourt citron', price: 0.36, time: 2, score: 10 },
      { name: 'Soja miel', price: 0.42, time: 2, score: 8 },
      { name: 'Pesto leger', price: 0.74, time: 1, score: 8 },
      { name: 'Tahini doux', price: 0.58, time: 2, score: 11 },
    ],
  },
  {
    key: 'topping',
    label: 'Extra',
    items: [
      { name: 'Graines courge', price: 0.34, time: 0, score: 8 },
      { name: 'Herbes fraiches', price: 0.22, time: 1, score: 7 },
      { name: 'Parmesan', price: 0.52, time: 0, score: 6 },
      { name: 'Sesame grille', price: 0.18, time: 0, score: 6 },
    ],
  },
]

const initialSelection = {
  base: categories[0].items[0],
  protein: categories[1].items[0],
  veggies: categories[2].items[0],
  sauce: categories[3].items[0],
  topping: categories[4].items[0],
}

const constraints = [
  { label: 'Repas', value: '3', meta: 'semaine' },
  { label: 'Budget max', value: '4.50', meta: 'EUR / repas' },
  { label: 'Temps', value: '18', meta: 'min max' },
]

export default function SnackPilotBuilder() {
  const root = useRef(null)
  const [selection, setSelection] = useState(initialSelection)
  const [mode, setMode] = useState('Anti-gaspi')
  const [locked, setLocked] = useState(false)

  const metrics = useMemo(() => {
    const selected = Object.values(selection)
    const price = selected.reduce((sum, item) => sum + item.price, 0)
    const time = selected.reduce((sum, item) => sum + item.time, 0)
    const score = Math.min(100, selected.reduce((sum, item) => sum + item.score, 0) + (mode === 'Proteine' ? 7 : 4))
    return { price, time, score, ready: selected.every(Boolean) }
  }, [mode, selection])

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.from('.spx-builder-reveal', {
        y: 18,
        opacity: 0,
        stagger: 0.055,
        duration: 0.62,
        ease: 'power3.out',
      })
    },
    { scope: root },
  )

  return (
    <main ref={root} className="spx-page spx-builder-page" data-skill="expressive-brand" data-archetype="lunchbox-builder">
      <SnackBuilderNav />

      <section className="spx-builder-shell">
        <aside className="spx-builder-side spx-builder-reveal">
          <span className="spx-kicker">Lunchbox Builder</span>
          <h1>Composer, verifier, preparer.</h1>
          <p>
            Une interface produit plus technique que la vitrine : contraintes, selection, score, substitution,
            liste de courses et plan de preparation.
          </p>

          <div className="spx-constraint-stack">
            {constraints.map((item) => (
              <article key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <em>{item.meta}</em>
              </article>
            ))}
          </div>

          <div className="spx-mode-switch" aria-label="Objectif de preparation">
            {['Anti-gaspi', 'Proteine', 'Rapide'].map((item) => (
              <button type="button" data-active={mode === item ? 'true' : undefined} onClick={() => setMode(item)} key={item}>
                {item}
              </button>
            ))}
          </div>
        </aside>

        <section className="spx-builder-workbench spx-builder-reveal" aria-label="Ingredient compartments">
          {categories.map((category) => (
            <article className="spx-compartment" data-selected={selection[category.key]?.name ? 'true' : undefined} key={category.key}>
              <header>
                <span>{category.label}</span>
                <strong>{selection[category.key]?.name ?? 'A choisir'}</strong>
              </header>
              <div className="spx-option-list" data-lenis-prevent="true">
                {category.items.map((item) => (
                  <button
                    type="button"
                    data-active={selection[category.key]?.name === item.name ? 'true' : undefined}
                    onClick={() => setSelection((current) => ({ ...current, [category.key]: item }))}
                    key={item.name}
                  >
                    <span>{item.name}</span>
                    <em>{item.price.toFixed(2)} EUR</em>
                  </button>
                ))}
              </div>
            </article>
          ))}
        </section>

        <aside className="spx-result-panel spx-builder-reveal">
          <div className="spx-box-output">
            <span>Box active</span>
            <h2>{mode === 'Proteine' ? 'Box energie' : 'Box mediterranee'}</h2>
            <p>
              {selection.base.name}, {selection.protein.name}, {selection.veggies.name}, {selection.sauce.name},
              {` ${selection.topping.name.toLowerCase()}.`}
            </p>
            <div className="spx-metric-ring" style={{ '--score': `${metrics.score}%` }}>
              <strong>{metrics.score}</strong>
              <span>score</span>
            </div>
          </div>

          <div className="spx-metric-list">
            <article data-state={metrics.price <= 4.5 ? 'success' : 'warning'}>
              <span>Budget</span>
              <strong>{metrics.price.toFixed(2)} EUR</strong>
              <em>{metrics.price <= 4.5 ? 'Stable' : 'Watch'}</em>
            </article>
            <article data-state={metrics.time <= 18 ? 'success' : 'warning'}>
              <span>Prep.</span>
              <strong>{metrics.time} min</strong>
              <em>{metrics.time <= 18 ? 'Ready' : 'Slow'}</em>
            </article>
          </div>

          <div className="spx-substitution-card" data-state={metrics.price > 4.1 ? 'warning' : 'success'}>
            <span>{metrics.price > 4.1 ? 'Suggestion budget' : 'Suggestion texture'}</span>
            <strong>{metrics.price > 4.1 ? 'Remplacer quinoa par semoule' : 'Garder la sauce a part'}</strong>
            <p>{metrics.price > 4.1 ? 'Gain estime : 0.54 EUR sans casser le repas.' : 'Le croquant reste lisible jusqu au midi.'}</p>
          </div>

          <button type="button" className="spx-validate-button" data-locked={locked ? 'true' : undefined} onClick={() => setLocked((value) => !value)}>
            {locked ? 'Box verrouillee' : 'Valider cette lunchbox'}
          </button>
        </aside>
      </section>

      <section className="spx-builder-bottom spx-builder-reveal">
        <ShoppingList selection={selection} />
        <PrepPlan selection={selection} />
      </section>
    </main>
  )
}

function SnackBuilderNav() {
  return (
    <header className="spx-nav">
      <Link className="spx-logo" to="/skills/expressive-brand">
        <span aria-hidden="true" />
        SnackPilot
      </Link>
      <nav>
        <Link to="/skills/expressive-brand/vitrine">Vitrine</Link>
        <Link data-active="true" to="/skills/expressive-brand/dashboard">Builder</Link>
        <Link to={{ pathname: '/skills', hash: '#skill-expressive-brand' }}>Skills</Link>
      </nav>
    </header>
  )
}

function ShoppingList({ selection }) {
  const rows = [
    [selection.base.name, '300 g', 'Placard'],
    [selection.protein.name, '180 g', 'Frais'],
    [selection.veggies.name, '2 portions', 'Frais'],
    [selection.sauce.name, '1 pot', 'Sauce'],
    [selection.topping.name, '30 g', 'Extra'],
  ]

  return (
    <article className="spx-shopping-card">
      <header>
        <span className="spx-kicker">Liste generee</span>
        <h2>Courses sans doublon.</h2>
      </header>
      <div>
        {rows.map(([name, qty, aisle]) => (
          <div className="spx-shopping-row" key={name}>
            <strong>{name}</strong>
            <span>{qty}</span>
            <em>{aisle}</em>
          </div>
        ))}
      </div>
    </article>
  )
}

function PrepPlan({ selection }) {
  const steps = [
    `Cuire ${selection.base.name.toLowerCase()} et laisser tiedir.`,
    `Preparer ${selection.veggies.name.toLowerCase()} pendant la cuisson.`,
    `Ajouter ${selection.protein.name.toLowerCase()} puis fermer la box.`,
    `Garder ${selection.sauce.name.toLowerCase()} separee jusqu au service.`,
  ]

  return (
    <article className="spx-prep-card">
      <header>
        <span className="spx-kicker">Plan prep.</span>
        <h2>15 minutes, ordre clair.</h2>
      </header>
      <ol>
        {steps.map((step) => <li key={step}>{step}</li>)}
      </ol>
    </article>
  )
}

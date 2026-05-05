import { useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const meals = [
  { day: 'Mon', meal: 'Citrus grain bowl', mood: 'Light', prep: '18 min', state: 'Planned', role: 'success' },
  { day: 'Tue', meal: 'Ginger lentil soup', mood: 'Warm', prep: '28 min', state: 'Shop', role: 'warning' },
  { day: 'Wed', meal: 'Peach yogurt oats', mood: 'Soft', prep: '08 min', state: 'Ready', role: 'info' },
  { day: 'Thu', meal: 'Herb rice plate', mood: 'Grounded', prep: '22 min', state: 'Draft', role: 'neutral' },
]

const groceries = ['lentils', 'citrus', 'oats', 'fresh herbs', 'yogurt', 'peaches']

export default function PastelExperience() {
  const { view = 'vitrine' } = useParams()
  return view === 'dashboard' ? <LumaLeafPlanner /> : <LumaLeafVitrine />
}

function LumaLeafVitrine() {
  const root = usePastelReveal()

  return (
    <main ref={root} className="ptx-page" data-skill="pastel" data-archetype="wellness-flow">
      <PastelNav active="vitrine" />
      <section className="ptx-hero ptx-reveal">
        <div className="ptx-copy">
          <span className="ptx-kicker">LumaLeaf / gentle weekly care</span>
          <h1>A softer way to plan meals, mood, and tiny routines.</h1>
          <p>
            LumaLeaf turns food planning into a calm weekly flow for busy households: meals, grocery needs, prep time, and care notes
            stay readable on warm pastel surfaces.
          </p>
          <div className="ptx-actions">
            <Link className="ptx-button ptx-button--primary" to="/skills/pastel/dashboard">Build this week</Link>
            <a className="ptx-button ptx-button--ghost" href="#care-flow">See care flow</a>
          </div>
        </div>
        <CarePlanCard />
      </section>

      <section id="care-flow" className="ptx-section ptx-reveal">
        <div>
          <span className="ptx-kicker">Soft pathways</span>
          <h2>Pastel color guides steps, not body text.</h2>
          <p>
            Buttermilk, peach, sage, and citrus surfaces create warmth while near-black green text keeps the interface adult,
            practical, and accessible.
          </p>
        </div>
        <div className="ptx-step-grid">
          {[
            ['01', 'Choose meals', 'Pick days, prep time, and energy level.'],
            ['02', 'Check groceries', 'Merge ingredients into one calm list.'],
            ['03', 'Protect routines', 'Add hydration, rest, and care notes.'],
          ].map(([num, title, body]) => (
            <article key={title}>
              <span>{num}</span>
              <strong>{title}</strong>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ptx-preview ptx-reveal">
        <div>
          <span className="ptx-kicker">Specialized planner</span>
          <h2>The dashboard builds an actual week.</h2>
          <p>Select meal moods, inspect prep load, check groceries, and save a care note from a focused planner interface.</p>
          <Link className="ptx-button ptx-button--primary" to="/skills/pastel/dashboard">Open planner</Link>
        </div>
        <PlannerMini />
      </section>
    </main>
  )
}

function LumaLeafPlanner() {
  const [selectedDay, setSelectedDay] = useState('Tue')
  const root = usePastelReveal()
  const selected = useMemo(() => meals.find((meal) => meal.day === selectedDay) ?? meals[0], [selectedDay])

  return (
    <main ref={root} className="ptx-page ptx-page--planner" data-skill="pastel" data-archetype="gentle-planner">
      <PastelNav active="dashboard" />
      <section className="ptx-planner ptx-reveal">
        <aside className="ptx-side">
          <span className="ptx-kicker">Weekly planner</span>
          <h1>Care week.</h1>
          <p>Meals, prep, groceries, and small routines for a softer household rhythm.</p>
          <div className="ptx-day-tabs" role="tablist" aria-label="Meal days">
            {meals.map((meal) => (
              <button type="button" role="tab" aria-selected={selectedDay === meal.day} data-active={selectedDay === meal.day ? 'true' : undefined} onClick={() => setSelectedDay(meal.day)} key={meal.day}>
                {meal.day}
              </button>
            ))}
          </div>
        </aside>

        <section className="ptx-main">
          <header className="ptx-head">
            <div>
              <span className="ptx-kicker">Selected day</span>
              <h2>{selected.meal}</h2>
            </div>
            <StatusPill role={selected.role}>{selected.state}</StatusPill>
          </header>

          <div className="ptx-grid">
            <section className="ptx-meal-card">
              <span className="ptx-kicker">{selected.day} / {selected.mood}</span>
              <strong>{selected.prep}</strong>
              <p>Prep estimate with a calm energy profile and no more than two active cooking steps.</p>
            </section>

            <section className="ptx-meal-list">
              {meals.map((meal) => (
                <article data-active={meal.day === selectedDay ? 'true' : undefined} key={meal.day}>
                  <span>{meal.day}</span>
                  <strong>{meal.meal}</strong>
                  <em>{meal.prep}</em>
                  <StatusPill role={meal.role}>{meal.state}</StatusPill>
                </article>
              ))}
            </section>

            <section className="ptx-groceries">
              <div className="ptx-panel-head">
                <span className="ptx-kicker">Grocery merge</span>
                <strong>{groceries.length} items</strong>
              </div>
              <div>
                {groceries.map((item, index) => <button type="button" data-active={index < 3 ? 'true' : undefined} key={item}>{item}</button>)}
              </div>
            </section>

            <section className="ptx-care-form">
              <span className="ptx-kicker">Care note</span>
              <h3>Keep the plan gentle.</h3>
              <label>
                Household energy
                <select defaultValue="low">
                  <option value="low">Low, keep meals simple</option>
                  <option value="steady">Steady, batch prep is okay</option>
                  <option value="social">Social, add a shared meal</option>
                </select>
              </label>
              <label>
                Note
                <textarea defaultValue="Use leftovers for Thursday lunch. Keep Tuesday soup mild." />
              </label>
              <button type="button">Save care week</button>
            </section>
          </div>
        </section>
      </section>
    </main>
  )
}

function PastelNav({ active }) {
  return (
    <header className="ptx-nav">
      <Link to="/skills/pastel" className="ptx-logo">LumaLeaf</Link>
      <nav aria-label="LumaLeaf pages">
        <Link data-active={active === 'vitrine' ? 'true' : undefined} to="/skills/pastel/vitrine">Vitrine</Link>
        <Link data-active={active === 'dashboard' ? 'true' : undefined} to="/skills/pastel/dashboard">Planner</Link>
        <Link to="/skills">Skills</Link>
      </nav>
    </header>
  )
}

function CarePlanCard() {
  return (
    <div className="ptx-care-card" aria-label="LumaLeaf weekly plan preview">
      <div className="ptx-care-head">
        <span>Weekly care</span>
        <strong>4 days</strong>
      </div>
      {meals.map((meal) => (
        <div className="ptx-care-row" data-role={meal.role} key={meal.day}>
          <span>{meal.day}</span>
          <strong>{meal.meal}</strong>
          <em>{meal.prep}</em>
        </div>
      ))}
    </div>
  )
}

function PlannerMini() {
  return (
    <div className="ptx-mini" aria-label="LumaLeaf planner preview">
      <CarePlanCard />
    </div>
  )
}

function StatusPill({ role = 'neutral', children }) {
  return <span className="ptx-status" data-role={role}>{children}</span>
}

function usePastelReveal() {
  const scope = useRef(null)
  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.from('.ptx-reveal', { opacity: 0, y: 22, duration: 0.72, ease: 'power3.out', stagger: 0.07 })
      gsap.from('.ptx-care-card', { y: -10, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    },
    { scope },
  )
  return scope
}

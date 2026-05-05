import { Link, useParams } from 'react-router-dom'
import { getSkillExperience } from '../data/skillExperiences.js'

export default function SkillExperience() {
  const { slug, view } = useParams()
  const experience = getSkillExperience(slug)

  if (!experience || !['vitrine', 'dashboard'].includes(view)) {
    return (
      <main className="grid min-h-screen place-items-center bg-ink-950 px-6 text-bone-50">
        <div className="max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-50/50">Experience indisponible</p>
          <h1 className="mt-4 font-display text-4xl leading-none">Cette route de skill n'existe pas encore.</h1>
          <Link className="mt-7 inline-flex rounded-full bg-bone-50 px-5 py-3 text-sm font-semibold text-ink-950" to="/skills">
            Retour aux skills
          </Link>
        </div>
      </main>
    )
  }

  return view === 'dashboard' ? <SkillDashboard experience={experience} slug={slug} /> : <SkillVitrine experience={experience} slug={slug} />
}

function SkillVitrine({ experience, slug }) {
  return (
    <main className="skill-exp" data-style={experience.style} data-layout={experience.layout} style={cssVars(experience)}>
      <SkillNav experience={experience} slug={slug} active="vitrine" />

      <section className="skill-exp-hero">
        <div className="skill-exp-copy">
          <span className="skill-exp-kicker">{experience.category}</span>
          <h1>{experience.headline}</h1>
          <p>{experience.subhead}</p>
          <div className="skill-exp-actions">
            <a className="skill-exp-button skill-exp-button-primary" href="#contact">{experience.primaryCta}</a>
            <Link className="skill-exp-button skill-exp-button-secondary" to={`/skills/${slug}/dashboard`}>{experience.secondaryCta}</Link>
          </div>
        </div>
        <ProductProof experience={experience} mode="vitrine" />
      </section>

      <section className="skill-exp-strip" aria-label="Product metrics">
        {experience.stats.map(([label, value]) => (
          <div className="skill-exp-stat" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>

      <section className="skill-exp-section">
        <div className="skill-exp-section-head">
          <span>{experience.archetype}</span>
          <h2>{experience.story?.place ?? 'A concrete client story drives the composition.'}</h2>
          {experience.story && (
            <p>
              {experience.story.tension}. {experience.story.turn}.
            </p>
          )}
        </div>
        <div className="skill-exp-feature-grid">
          {(experience.sections ?? experience.features).map(([title, body], index) => (
            <article className="skill-exp-feature" data-index={index + 1} key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="skill-exp-product-preview">
        <div>
          <span className="skill-exp-kicker">Specialized product</span>
          <h2>{experience.dashboardLabel}</h2>
          <p>{experience.story?.turn ?? 'The specialized page turns the story into a working product surface.'}</p>
          <Link className="skill-exp-button skill-exp-button-primary" to={`/skills/${slug}/dashboard`}>
            Open specialized page
          </Link>
        </div>
        <ProductProof experience={experience} mode="dashboard" compact />
      </section>

      <section className="skill-exp-section skill-exp-section-tight">
        <div className="skill-exp-section-head">
          <span>Workflow</span>
          <h2>{experience.proofTitle}</h2>
        </div>
        <div className="skill-exp-timeline">
          {experience.workflow.map((item, index) => (
            <div className="skill-exp-step" key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="skill-exp-close">
        <span>{experience.brand}</span>
        <h2>Ready state for the portfolio skill page.</h2>
        <Link className="skill-exp-button skill-exp-button-primary" to={`/skills/${slug}`}>
          Back to skill page
        </Link>
      </section>
    </main>
  )
}

function SkillDashboard({ experience, slug }) {
  return (
    <main className="skill-exp skill-exp-dashboard" data-style={experience.style} data-layout={experience.layout} style={cssVars(experience)}>
      <SkillNav experience={experience} slug={slug} active="dashboard" />
      <section className="skill-dash-shell">
        <aside className="skill-dash-side">
          <div>
            <span className="skill-exp-kicker">{experience.brand}</span>
            <h1>{experience.dashboardLabel}</h1>
          </div>
          <nav aria-label="Dashboard sections">
            {experience.workflow.map((item, index) => (
              <button type="button" data-active={index === 0 ? 'true' : undefined} key={item}>
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <section className="skill-dash-main">
          <header className="skill-dash-header">
            <div>
              <span className="skill-exp-kicker">{experience.proofMeta}</span>
              <h2>{experience.proofTitle}</h2>
            </div>
            <div className="skill-dash-controls">
              <button type="button">Filter</button>
              <button type="button">Export</button>
              <button type="button" data-primary="true">Create</button>
            </div>
          </header>

          <div className="skill-dash-stats">
            {experience.stats.map(([label, value]) => (
              <article className="skill-exp-stat" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </article>
            ))}
          </div>

          <SpecializedPanel experience={experience} />
        </section>
      </section>
    </main>
  )
}

function SpecializedPanel({ experience }) {
  if (['bankCard', 'revenueChart'].includes(experience.artifact)) {
    return (
      <section className="specialized specialized-finance">
        <ProductProof experience={experience} mode="dashboard" compact />
        <div className="finance-cards">
          {experience.table.map((row, index) => (
            <article key={row.join('-')} data-active={index === 0 ? 'true' : undefined}>
              <span>{row[1]}</span>
              <strong>{row[2]}</strong>
              <p>{row[0]} / {row[3]}</p>
            </article>
          ))}
        </div>
      </section>
    )
  }

  if (['posterWall', 'aidaBento'].includes(experience.artifact)) {
    return (
      <section className="specialized specialized-wall">
        {experience.table.map((row, index) => (
          <article key={row.join('-')} data-hot={index === 1 ? 'true' : undefined}>
            <strong>{row[0]}</strong>
            <span>{row[1]}</span>
            <i>{row[2]}</i>
            <p>{row[3]}</p>
          </article>
        ))}
      </section>
    )
  }

  if (experience.artifact === 'fragranceBottle') {
    return (
      <section className="specialized specialized-atelier">
        <ProductProof experience={experience} mode="dashboard" compact />
        <div className="atelier-specs">
          {experience.table.map((row) => (
            <div key={row.join('-')}>
              <span>{row[0]}</span>
              <strong>{row[1]}</strong>
              <p>{row[2]} / {row[3]}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (['weeklyPlanner', 'marseilleMap'].includes(experience.artifact)) {
    return (
      <section className="specialized specialized-planner">
        <ProductProof experience={experience} mode="dashboard" compact />
        <div className="planner-days">
          {experience.table.map((row, index) => (
            <article key={row.join('-')}>
              <span>Day {index + 1}</span>
              <strong>{row[0]}</strong>
              <p>{row[1]} / {row[2]}</p>
              <i>{row[3]}</i>
            </article>
          ))}
        </div>
      </section>
    )
  }

  if (['briefSheet', 'ledgerSheet'].includes(experience.artifact)) {
    return (
      <section className="specialized specialized-document">
        <article className="document-page">
          <h3>{experience.proofTitle}</h3>
          {experience.table.map((row) => (
            <div key={row.join('-')}>
              <span>{row[0]}</span>
              <strong>{row[2]}</strong>
              <p>{row[1]} / {row[3]}</p>
            </div>
          ))}
        </article>
        <ProductProof experience={experience} mode="dashboard" compact />
      </section>
    )
  }

  if (['storyboard'].includes(experience.artifact)) {
    return (
      <section className="specialized specialized-timeline">
        <div className="timeline-track">
          {experience.table.map((row, index) => (
            <article key={row.join('-')} style={{ '--offset': `${index * 3}rem` }}>
              <span>{row[1]}</span>
              <strong>{row[0]}</strong>
              <p>{row[2]} / {row[3]}</p>
            </article>
          ))}
        </div>
      </section>
    )
  }

  if (experience.artifact === 'lessonGame') {
    return (
      <section className="specialized specialized-game">
        <ProductProof experience={experience} mode="dashboard" compact />
        <div className="game-roster">
          {experience.table.map((row) => (
            <button type="button" key={row.join('-')}>
              <strong>{row[0]}</strong>
              <span>{row[1]} / {row[3]}</span>
            </button>
          ))}
        </div>
      </section>
    )
  }

  if (experience.artifact === 'bookSpread') {
    return (
      <section className="specialized specialized-editorial">
        <ProductProof experience={experience} mode="dashboard" compact />
        <div className="editorial-index">
          {experience.table.map((row, index) => (
            <article key={row.join('-')}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{row[0]}</strong>
              <p>{row[1]} / {row[2]} / {row[3]}</p>
            </article>
          ))}
        </div>
      </section>
    )
  }

  if (experience.artifact === 'wellnessGradient') {
    return (
      <section className="specialized specialized-wellness">
        <ProductProof experience={experience} mode="dashboard" compact />
        <div className="wellness-plan">
          {experience.table.map((row) => (
            <article key={row.join('-')}>
              <strong>{row[0]}</strong>
              <span>{row[1]}</span>
              <p>{row[2]} / {row[3]}</p>
            </article>
          ))}
        </div>
      </section>
    )
  }

  if (['codeTerminal', 'serviceTopology'].includes(experience.artifact)) {
    return (
      <section className="specialized specialized-technical">
        <ProductProof experience={experience} mode="dashboard" compact />
        <article className="technical-log">
          {experience.table.map((row) => (
            <div key={row.join('-')}>
              <code>{row[0]}</code>
              <span>{row[1]}</span>
              <strong>{row[2]}</strong>
              <i>{row[3]}</i>
            </div>
          ))}
        </article>
      </section>
    )
  }

  if (experience.artifact === 'dispatchBoard') {
    return (
      <section className="specialized specialized-dispatch">
        {experience.table.map((row) => (
          <article key={row.join('-')}>
            <strong>{row[0]}</strong>
            <span>{row[1]}</span>
            <span>{row[2]}</span>
            <button type="button">{row[3]}</button>
          </article>
        ))}
      </section>
    )
  }

  return <ProductProof experience={experience} mode="dashboard" compact />
}

function SkillNav({ experience, slug, active }) {
  return (
    <header className="skill-exp-nav">
      <Link to={`/skills/${slug}`} className="skill-exp-brand">{experience.brand}</Link>
      <nav>
        <Link data-active={active === 'vitrine' ? 'true' : undefined} to={`/skills/${slug}/vitrine`}>Vitrine</Link>
        <Link data-active={active === 'dashboard' ? 'true' : undefined} to={`/skills/${slug}/dashboard`}>Specialized</Link>
        <Link to="/skills">Skills</Link>
      </nav>
    </header>
  )
}

function ProductProof({ experience, mode, compact = false }) {
  const rows = compact ? experience.table.slice(0, 3) : experience.table

  return (
    <div className={`skill-proof ${compact ? 'skill-proof-compact' : ''}`} aria-label={`${experience.brand} product preview`}>
      <div className="skill-proof-chrome">
        <span />
        <span />
        <span />
        <strong>{mode === 'dashboard' ? experience.dashboardLabel : experience.proofTitle}</strong>
      </div>
      <div className="skill-proof-body">
        <StoryArtifact experience={experience} />
        <div className="skill-proof-content">
          <div className="skill-proof-metrics">
            {experience.stats.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="skill-proof-list">
            {rows.map((row) => (
              <div key={row.join('-')}>
                <span>{row[0]}</span>
                <strong>{row[3]}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StoryArtifact({ experience }) {
  switch (experience.artifact) {
    case 'bankCard':
      return (
        <div className="skill-proof-visual artifact-bank">
          <div className="bank-card">
            <span>LUXECARD</span>
            <strong>4829  0088  7114</strong>
            <i>Founder Prism</i>
          </div>
          <div className="bank-card bank-card-back">
            <span>Virtual</span>
            <strong>$12,400</strong>
            <i>Vendor limit</i>
          </div>
        </div>
      )
    case 'posterWall':
      return (
        <div className="skill-proof-visual artifact-poster">
          <div className="poster-tile poster-main">DROP<br />18</div>
          <div className="poster-tile">LEGAL<br />HOLD</div>
          <div className="poster-tile poster-red">CUT<br />09</div>
          <div className="poster-tile">PRICE<br />LIVE</div>
        </div>
      )
    case 'fragranceBottle':
      return (
        <div className="skill-proof-visual artifact-fragrance">
          <div className="bottle-cap" />
          <div className="bottle">
            <span>NO.04</span>
            <strong>NEROLI SMOKE</strong>
          </div>
          <div className="note-card">bergamot / neroli / birch tar</div>
        </div>
      )
    case 'weeklyPlanner':
      return (
        <div className="skill-proof-visual artifact-planner">
          {['MON', 'TUE', 'WED', 'THU'].map((day, index) => (
            <div className="planner-column" key={day}>
              <strong>{day}</strong>
              <span style={{ height: `${58 + index * 24}px` }} />
              <i>{index === 2 ? 'Risk' : 'Focus'}</i>
            </div>
          ))}
        </div>
      )
    case 'briefSheet':
      return (
        <div className="skill-proof-visual artifact-brief">
          <div className="brief-line brief-title" />
          <div className="brief-line" />
          <div className="brief-line brief-short" />
          <div className="brief-rule" />
          <p>01 / Claim reduced</p>
          <p>02 / Proof missing</p>
          <p>03 / CTA clarified</p>
        </div>
      )
    case 'ledgerSheet':
      return (
        <div className="skill-proof-visual artifact-ledger">
          {['BASE', 'DOWN', 'EXP'].map((label, index) => (
            <div className="ledger-block" data-active={index === 0 ? 'true' : undefined} key={label}>
              <span>{label}</span>
              <strong>{index === 0 ? '19.4m' : index === 1 ? '11.2m' : '27.8m'}</strong>
            </div>
          ))}
        </div>
      )
    case 'storyboard':
      return (
        <div className="skill-proof-visual artifact-storyboard">
          {[0, 1, 2, 3].map((frame) => (
            <div className="story-frame" key={frame}>
              <span style={{ width: `${42 + frame * 16}%` }} />
              <i>00:{String(frame * 8).padStart(2, '0')}</i>
            </div>
          ))}
        </div>
      )
    case 'marseilleMap':
      return (
        <div className="skill-proof-visual artifact-map">
          <div className="sea" />
          <div className="coastline" />
          <span className="pin pin-a">Noailles</span>
          <span className="pin pin-b">Endoume</span>
          <span className="pin pin-c">Sormiou</span>
        </div>
      )
    case 'lessonGame':
      return (
        <div className="skill-proof-visual artifact-game">
          <div className="quest-path">
            {['1', '2', '3', '★'].map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="reward-card">Fractions Quest</div>
        </div>
      )
    case 'bookSpread':
      return (
        <div className="skill-proof-visual artifact-book">
          <div className="book-page">
            <strong>Night Gardens</strong>
            <span />
            <span />
          </div>
          <div className="book-page book-page-dark">
            <strong>Issue 12</strong>
            <i>9 essays</i>
          </div>
        </div>
      )
    case 'wellnessGradient':
      return (
        <div className="skill-proof-visual artifact-wellness">
          <div className="energy-ring">82</div>
          <div className="calm-card">Recovery block / 15:00</div>
        </div>
      )
    case 'codeTerminal':
      return (
        <div className="skill-proof-visual artifact-code">
          <pre>{`npm i @relaykit/sdk\nrelay.listen("payment.created")\n{ status: 200, p95: "78ms" }`}</pre>
        </div>
      )
    case 'serviceTopology':
      return (
        <div className="skill-proof-visual artifact-topology">
          {['AUTH', 'API', 'DB', 'QUEUE', 'WEB'].map((node, index) => (
            <span className={`topology-node node-${index}`} key={node}>{node}</span>
          ))}
        </div>
      )
    case 'dispatchBoard':
      return (
        <div className="skill-proof-visual artifact-dispatch">
          {['WO-1842', 'Crew 7', 'Depot B', 'Overdue'].map((item) => <div key={item}>{item}</div>)}
        </div>
      )
    case 'revenueChart':
      return (
        <div className="skill-proof-visual artifact-revenue">
          {[44, 62, 54, 78, 92].map((height, index) => (
            <span style={{ height: `${height}%` }} key={index} />
          ))}
          <strong>+18.4%</strong>
        </div>
      )
    case 'aidaBento':
      return (
        <div className="skill-proof-visual artifact-aida">
          <div className="aida-cell aida-hero">ATTENTION</div>
          <div className="aida-cell">BENTO</div>
          <div className="aida-cell aida-accent">PIN</div>
          <div className="aida-cell">MARQUEE</div>
          <div className="aida-cell aida-wide">ACTION / 240 SEATS</div>
        </div>
      )
    default:
      return (
        <div className="skill-proof-visual artifact-brief">
          <div className="brief-line brief-title" />
          <div className="brief-line" />
          <div className="brief-line brief-short" />
        </div>
      )
  }
}

function cssVars(experience) {
  const t = experience.tokens
  const darkActionTextStyles = ['highContrast', 'motion', 'pastel', 'playful', 'technicalUI']
  return {
    '--sx-bg': t.bg,
    '--sx-surface': t.surface,
    '--sx-surface-2': t.surface2,
    '--sx-text': t.text,
    '--sx-muted': t.muted,
    '--sx-line': t.line,
    '--sx-action': t.action,
    '--sx-action-text': t.actionText ?? (darkActionTextStyles.includes(experience.style) ? '#0a0a0a' : '#ffffff'),
    '--sx-accent': t.accent,
    '--sx-accent-2': t.accent2,
    '--sx-radius': t.radius,
    '--sx-card-radius': t.cardRadius,
    '--sx-shadow': t.shadow,
    '--sx-font': t.font,
    '--sx-display': t.display,
  }
}

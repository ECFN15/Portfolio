import React from 'react'
import { Link } from 'react-router-dom'

{/*
<design_plan>
1. Use case: Magazine homepage demo showing typographic architecture, large scale, and index grids.
2. Style direction: Black/White Poster Publication / High-Contrast Editorial Archive.
3. Operating mode: Medium density, deliberate pacing, high contrast, zero radius frames.
4. First viewport: Poster hero with massive display type, minimal metadata grid at the bottom.
5. System contracts: Explicit token block per the skill, mapping canvas to white, ink to black.
6. Component plan: PosterTitleHeroContract, IssueIndexTableContract, PullquotePanelContract, Caption Grid.
7. Motion plan: Line mask reveals for the poster type, rule draw for links, row inversion for hover states.
8. Anti-slop sweep: No generic card drop shadows, no standard rounded corners, strict adherence to --s-* spacing tokens.
</design_plan>
*/}

const ET_TOKENS = `
:root {
  --canvas: #ffffff;
  --surface: #ffffff;
  --surface-muted: #f4f2ef;
  --text: #272727;
  --text-muted: #717171;
  --line: #d9d5cf;
  --action: #c52910;
  --action-strong: #962921;
  --radius-control: 0px;
  --radius-card: 0px;
  --radius-panel: 0px;
  --font-sans: Geist, Inter, system-ui, sans-serif;
  --font-display: "Messina Sans", "ABC Diatype", Georgia, serif;
  --font-mono: "Geist Mono", "JetBrains Mono", ui-monospace, monospace;
  --type-mono-xs: 500 10px/1.4 var(--font-mono);
  --type-mono-sm: 500 11px/1.4 var(--font-mono);
  --type-meta: 500 12px/1.45 var(--font-sans);
  --type-body-sm: 400 13px/1.55 var(--font-sans);
  --type-body: 400 15px/1.62 var(--font-sans);
  --type-ui: 600 14px/1.4 var(--font-sans);
  --type-card: 600 20px/1.18 var(--font-sans);
  --type-section-sm: 600 28px/1.08 var(--font-display);
  --type-section: 600 42px/1.02 var(--font-display);
  --type-display: 600 clamp(46px, 8vw, 82px)/.92 var(--font-display);
  --track-mono-xs: .16em;
  --track-mono-sm: .10em;
  --track-section: -.025em;
  --track-display: -.04em;
  --s-1: 4px;
  --s-2: 8px;
  --s-3: 12px;
  --s-4: 16px;
  --s-5: 20px;
  --s-6: 24px;
  --s-7: 32px;
  --s-8: 48px;
  --s-9: 64px;
  --s-10: 80px;
  --s-11: 96px;
  --shadow-flat: none;
  --shadow-card: inset 0 -1px 0 var(--line);
  --shadow-panel: inset 0 0 0 1px var(--line);
  --shadow-hero: none;
  --shadow-modal: 0 24px 80px rgba(15,23,42,.16);
  --shadow-action: 0 6px 18px color-mix(in srgb, var(--action), transparent 72%);
  --status-success-bg: #ecfdf5;
  --status-success-fg: #047857;
  --status-info-bg: #eef4ff;
  --status-info-fg: #3152d4;
  --status-warning-bg: #fffbeb;
  --status-warning-fg: #b45309;
  --status-danger-bg: #fff1f2;
  --status-danger-fg: #b91c1c;
  --status-neutral-bg: #f3f4f6;
  --status-neutral-fg: #717171;
  --state-hover-bg: color-mix(in srgb, var(--action), var(--surface) 90%);
  --state-selected-bg: color-mix(in srgb, var(--action), var(--surface) 84%);
  --state-focus-ring: 0 0 0 3px color-mix(in srgb, var(--action), transparent 72%);
  --ease-product: cubic-bezier(.2,.8,.2,1);

  /* Local overrides for black/white poster publication archetype */
  --canvas: #ffffff;
  --surface: #ffffff;
  --surface-inverse: #000000;
  --text: #272727;
  --text-inverse: #ffffff;
  --line: #000000;
  --font-display: "Playfair Display", Georgia, serif;
}

/* Core Component Kit CSS */
.editorial-type-status-pill {
  display: inline-flex;
  width: max-content;
  align-items: center;
  padding: var(--s-1) 10px;
  border-radius: var(--radius-pill);
  font: var(--type-mono-sm);
  letter-spacing: var(--track-mono-sm);
  background: var(--status-neutral-bg);
  color: var(--status-neutral-fg);
}
.editorial-type-status-pill[data-role="success"] { background: var(--status-success-bg); color: var(--status-success-fg); }
.editorial-type-status-pill[data-role="info"] { background: var(--status-info-bg); color: var(--status-info-fg); }
.editorial-type-status-pill[data-role="warning"] { background: var(--status-warning-bg); color: var(--status-warning-fg); }
.editorial-type-status-pill[data-role="danger"] { background: var(--status-danger-bg); color: var(--status-danger-fg); }

.editorial-type-hero-object {
  min-height: clamp(320px, 48vw, 620px);
  border: 1px solid var(--line);
  border-radius: var(--radius-panel);
  background: var(--surface);
  box-shadow: var(--shadow-hero);
  overflow: hidden;
}

.editorial-type-card {
  display: grid;
  gap: var(--s-2);
  padding: var(--s-6);
  border: 1px solid var(--line);
  border-radius: var(--radius-card);
  background: var(--surface);
  box-shadow: var(--shadow-card);
  transition: background 180ms var(--ease-product), box-shadow 180ms var(--ease-product), transform 180ms var(--ease-product);
}
.editorial-type-card[data-state="selected"] { background: var(--state-selected-bg); box-shadow: var(--shadow-panel); }
.editorial-type-card[data-state="loading"] { opacity: .62; pointer-events: none; }
.editorial-type-card[data-state="error"] { border-color: var(--status-danger-fg); }
.editorial-type-card > span { font: var(--type-meta); color: var(--text-muted); }
.editorial-type-card > strong { font: var(--type-card); color: var(--text); }

.editorial-type-rail { display: flex; flex-wrap: wrap; gap: var(--s-2); }
.editorial-type-rail button { padding: var(--s-2) var(--s-4); border: 1px solid var(--line); border-radius: var(--radius-control); background: var(--surface); font: var(--type-ui); color: var(--text-muted); }
.editorial-type-rail button[data-active="true"] { background: var(--state-selected-bg); color: var(--text); box-shadow: var(--state-focus-ring); }

.editorial-type-section-head { display: grid; gap: var(--s-3); max-width: 760px; }
.editorial-type-section-head > span { font: var(--type-mono-xs); letter-spacing: var(--track-mono-xs); text-transform: uppercase; color: var(--text-muted); }
.editorial-type-section-head h2 { margin: 0; font: var(--type-section); letter-spacing: var(--track-section); text-wrap: balance; color: var(--text); }
.editorial-type-section-head p { margin: 0; font: var(--type-body); color: var(--text-muted); }

/* Layout Patterns CSS */
.poster-hero {
  min-block-size: 92svh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background: var(--surface-inverse);
  color: var(--text-inverse);
  padding-inline: var(--s-6);
  padding-block: var(--s-6);
}
.poster-hero__title {
  align-self: center;
  font-family: var(--font-display);
  font-size: clamp(64px, 16vw, 220px);
  line-height: .85;
  letter-spacing: -.035em;
  max-inline-size: 12ch;
  text-transform: uppercase;
}
.poster-hero__meta {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  border-top: 1px solid currentColor;
  padding-block: 16px;
  font: var(--type-meta);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.issue-index {
  border-top: 1px solid var(--line);
  font: var(--type-body);
}
.issue-index__head,
.issue-index__row {
  display: grid;
  grid-template-columns: 80px 200px 120px 120px 140px minmax(0, 1fr);
  gap: 16px;
  align-items: baseline;
}
.issue-index__head {
  min-block-size: 40px;
  color: var(--text-muted);
  font: var(--type-mono-sm);
  letter-spacing: var(--track-mono-sm);
  text-transform: uppercase;
}
.issue-index__row {
  min-block-size: 78px;
  border-top: 1px solid var(--line);
  color: var(--text);
  transition: background 160ms ease, color 160ms ease;
  cursor: pointer;
  text-decoration: none;
}
.issue-index__row:hover,
.issue-index__row:focus-visible {
  background: var(--surface-inverse);
  color: var(--text-inverse);
}
.issue-index__row:hover .issue-index__title {
  text-decoration: underline;
  text-underline-offset: .2em;
}
.issue-index__title {
  font-family: var(--font-display);
  font-size: clamp(20px, 2.5vw, 32px);
  line-height: 1;
}

@media (max-width: 1024px) {
  .issue-index__head { display: none; }
  .issue-index__row {
    grid-template-columns: 1fr;
    gap: 6px;
    padding-block: 18px;
  }
  .poster-hero__meta {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Motion Rules */
.et-reveal-line {
  display: block;
  overflow: hidden;
}
.et-reveal-line > span {
  display: inline-block;
  transform: translateY(108%);
  animation: et-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes et-slide-up {
  from { transform: translateY(108%); }
  to { transform: translateY(0); }
}

.et-rule-draw {
  text-decoration: none;
}
.et-rule-draw::after {
  content: "";
  display: block;
  block-size: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 220ms ease;
}
.et-rule-draw:hover::after,
.et-rule-draw:focus-visible::after {
  transform: scaleX(1);
}

@media (prefers-reduced-motion: reduce) {
  .et-reveal-line > span,
  .et-rule-draw::after {
    transform: none !important;
    transition-duration: .01ms !important;
  }
}

/* Layout Utilities */
.et-container {
  background: var(--canvas);
  color: var(--text);
  font-family: var(--font-sans);
}
.et-section-padding {
  padding-block: var(--s-11);
  padding-inline: var(--s-6);
}
.et-nav {
  display: flex;
  justify-content: space-between;
  padding: var(--s-4) var(--s-6);
  font: var(--type-mono-sm);
  letter-spacing: var(--track-mono-sm);
  text-transform: uppercase;
  border-bottom: 1px solid var(--line);
}
`

export default function RevueVitrine() {
  return (
    <div className="et-container">
      <style dangerouslySetInnerHTML={{ __html: ET_TOKENS }} />

      <nav className="et-nav">
        <div style={{ display: 'flex', gap: 'var(--s-6)' }}>
          <Link to="/skills" className="et-rule-draw">← Retour portfolio</Link>
          <span style={{ color: 'var(--text-muted)' }}>La Revue des Lieux Oubliés</span>
        </div>
        <div>
          <Link to="/skills/editorial-type/article" className="et-rule-draw">Voir Article Phare →</Link>
        </div>
      </nav>

      {/* 1. Poster Hero */}
      <header className="poster-hero">
        <div style={{ font: 'var(--type-mono-sm)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          La Revue des Lieux Oubliés — Édition Numérique
        </div>
        <h1 className="poster-hero__title">
          <span className="et-reveal-line"><span style={{ animationDelay: '0ms' }}>Les bâtiments</span></span>
          <span className="et-reveal-line"><span style={{ animationDelay: '100ms' }}>ne disparaissent</span></span>
          <span className="et-reveal-line"><span style={{ animationDelay: '200ms' }}>pas. Ils changent</span></span>
          <span className="et-reveal-line"><span style={{ animationDelay: '300ms' }}>de silence.</span></span>
        </h1>
        <div className="poster-hero__meta">
          <div><span style={{ opacity: 0.6, display: 'block' }}>Saison</span> Printemps 2026</div>
          <div><span style={{ opacity: 0.6, display: 'block' }}>Numéro</span> 04</div>
          <div><span style={{ opacity: 0.6, display: 'block' }}>Dossier</span> Anciennes gares</div>
          <div><span style={{ opacity: 0.6, display: 'block' }}>Corpus</span> 12 lieux / 6 villes</div>
        </div>
      </header>

      {/* 2. Dossier Principal (Magazine Grid) */}
      <section className="et-section-padding" style={{ borderBottom: '1px solid var(--line)' }}>
        <header className="editorial-type-section-head" style={{ marginBottom: 'var(--s-9)' }}>
          <span>Dossier 04</span>
          <h2>Gares sans départ</h2>
          <p>Un dossier sur les anciennes gares désaffectées ou transformées. L'architecture de l'attente survit à la fonction.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--s-6)' }}>
          <article className="editorial-type-card" style={{ boxShadow: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: 'var(--s-2)' }}>
              <span>C. Montval</span>
              <span>Lille</span>
            </div>
            <strong style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontFamily: 'var(--font-display)', marginTop: 'var(--s-4)' }}>La gare qui n'attend plus personne</strong>
            <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)' }}>Les quais n’organisent plus les départs, mais ils continuent de structurer la manière dont on traverse le lieu.</p>
            <Link to="/skills/editorial-type/article" className="et-rule-draw" style={{ font: 'var(--type-ui)', alignSelf: 'end', marginTop: 'var(--s-4)' }}>Lire l'article →</Link>
          </article>
          
          <article className="editorial-type-card" style={{ boxShadow: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: 'var(--s-2)' }}>
              <span>A. Dubois</span>
              <span>Lyon</span>
            </div>
            <strong style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontFamily: 'var(--font-display)', marginTop: 'var(--s-4)' }}>Horaires effacés, quais conservés</strong>
            <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)' }}>Quand la signalétique perd son utilité mais devient une archive à ciel ouvert de nos mobilités.</p>
            <span className="et-rule-draw" style={{ font: 'var(--type-ui)', alignSelf: 'end', marginTop: 'var(--s-4)', cursor: 'pointer' }}>Extrait →</span>
          </article>

          <article className="editorial-type-card" style={{ boxShadow: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: 'var(--s-2)' }}>
              <span>M. Lefevre</span>
              <span>Paris</span>
            </div>
            <strong style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontFamily: 'var(--font-display)', marginTop: 'var(--s-4)' }}>Le mobilier ferroviaire comme archive silencieuse</strong>
            <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)' }}>Bancs, horloges, guichets : ce qui reste quand le mouvement continuel s'arrête brutalement.</p>
            <span className="et-rule-draw" style={{ font: 'var(--type-ui)', alignSelf: 'end', marginTop: 'var(--s-4)', cursor: 'pointer' }}>Extrait →</span>
          </article>
        </div>
      </section>

      {/* 3. Index des lieux */}
      <section className="et-section-padding">
        <header className="editorial-type-section-head" style={{ marginBottom: 'var(--s-8)' }}>
          <span>Archive</span>
          <h2>Index des lieux documentés</h2>
        </header>

        <div className="issue-index">
          <div className="issue-index__head">
            <div>ID</div>
            <div>Lieu</div>
            <div>Ville</div>
            <div>Année</div>
            <div>Statut</div>
            <div>Dossier</div>
          </div>

          {[
            { id: "L-021", title: "Gare Saint-Sauveur", city: "Lille", year: "1865", status: "reconvertie", folder: "Gares", statusRole: "info" },
            { id: "L-022", title: "Cinéma Le Bretagne", city: "Nantes", year: "1954", status: "fermé", folder: "Salles", statusRole: "neutral" },
            { id: "L-023", title: "Imprimerie Chaix", city: "Paris", year: "1881", status: "fragmentée", folder: "Ateliers", statusRole: "warning" },
            { id: "L-024", title: "Hôtel des Voyageurs", city: "Marseille", year: "1927", status: "abandonné", folder: "Hôtels", statusRole: "danger" },
            { id: "L-025", title: "Passage du Caire", city: "Paris", year: "1798", status: "actif", folder: "Passages", statusRole: "success" },
          ].map((item, i) => (
            <Link to={item.id === "L-021" ? "/skills/editorial-type/article" : "#"} className="issue-index__row" key={i}>
              <div style={{ font: 'var(--type-mono-sm)' }}>{item.id}</div>
              <div className="issue-index__title">{item.title}</div>
              <div>{item.city}</div>
              <div style={{ color: 'var(--text-muted)' }}>{item.year}</div>
              <div><span className="editorial-type-status-pill" data-role={item.statusRole}>{item.status}</span></div>
              <div style={{ font: 'var(--type-meta)', textTransform: 'uppercase' }}>{item.folder}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Citation centrale */}
      <section className="et-section-padding" style={{ background: 'var(--surface-muted)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <blockquote style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ font: 'var(--type-display)', fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: '1.1', marginBottom: 'var(--s-6)' }}>
            "Un lieu oublié n’est pas un lieu vide. C’est un lieu dont la fonction a cessé de parler avant les murs."
          </p>
          <footer style={{ font: 'var(--type-mono-sm)', textTransform: 'uppercase', letterSpacing: 'var(--track-mono-sm)', color: 'var(--text-muted)' }}>
            — Claire Montval, éditrice
          </footer>
        </blockquote>
      </section>

      {/* 5. Galerie légendée */}
      <section className="et-section-padding" style={{ borderBottom: '1px solid var(--line)' }}>
        <header className="editorial-type-section-head" style={{ marginBottom: 'var(--s-8)' }}>
          <span>Corpus Visuel</span>
          <h2>Photographies d'inventaire</h2>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--s-8) var(--s-6)' }}>
          {[
            { title: "Gare Saint-Sauveur, Lille, 2026", desc: "Ancien espace ferroviaire reconverti, photographié à l’heure où la lumière coupe encore les quais en lignes parallèles." },
            { title: "Cinéma Le Bretagne, Nantes, 2026", desc: "Façade de cinéma dont les lettres manquent, attendant une programmation qui ne viendra plus." },
            { title: "Imprimerie Chaix, Paris, 2026", desc: "Atelier d’imprimerie, les traces des rotatives sont encore visibles sur le sol en béton." },
            { title: "Hôtel des Voyageurs, Marseille, 2025", desc: "Escalier central où la tapisserie se décolle, exposant les strates du siècle dernier." },
            { title: "Passage du Caire, Paris, 2026", desc: "Enseigne effacée sous la verrière, la typographie peinte à la main résiste au temps." },
            { title: "Ateliers SNCF, Arles, 2025", desc: "Salle vide monumentale. L'échelle de l'espace dépasse de loin l'échelle humaine." }
          ].map((img, i) => (
            <figure key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
              <div style={{ width: '100%', aspectRatio: '4/3', backgroundColor: 'var(--line)', borderRadius: 'var(--radius-media, 0px)' }} />
              <figcaption style={{ paddingTop: 'var(--s-2)', borderTop: '1px solid var(--line)' }}>
                <strong style={{ display: 'block', font: 'var(--type-card)', marginBottom: 'var(--s-1)' }}>{img.title}</strong>
                <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)' }}>{img.desc}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 6. Numéros de la revue */}
      <section className="et-section-padding" style={{ borderBottom: '1px solid var(--line)' }}>
        <header className="editorial-type-section-head" style={{ marginBottom: 'var(--s-8)' }}>
          <span>Publication</span>
          <h2>Anciens numéros</h2>
        </header>

        <div className="issue-index">
          {[
            { num: "05", title: "Hôtels hors saison", date: "Été 2026", count: "8 lieux", status: "À paraître", statusRole: "info" },
            { num: "04", title: "Gares sans départ", date: "Printemps 2026", count: "12 lieux", status: "Actuel", statusRole: "success" },
            { num: "03", title: "Ateliers sans machines", date: "Hiver 2025", count: "15 lieux", status: "Archive", statusRole: "neutral" },
            { num: "02", title: "Cinémas fermés", date: "Automne 2025", count: "9 lieux", status: "Archive", statusRole: "neutral" },
            { num: "01", title: "Façades qui restent", date: "Été 2025", count: "21 lieux", status: "Épuisé", statusRole: "danger" },
          ].map((issue, idx) => (
            <div className="issue-index__row" key={idx} style={{ gridTemplateColumns: '80px minmax(0, 1fr) 120px 120px 120px' }}>
              <div style={{ font: 'var(--type-mono-sm)' }}>No. {issue.num}</div>
              <div className="issue-index__title">{issue.title}</div>
              <div>{issue.date}</div>
              <div style={{ color: 'var(--text-muted)' }}>{issue.count}</div>
              <div><span className="editorial-type-status-pill" data-role={issue.statusRole}>{issue.status}</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Footer bibliographique */}
      <footer style={{ paddingBlock: 'var(--s-10)', paddingInline: 'var(--s-6)', background: 'var(--surface-inverse)', color: 'var(--text-inverse)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--s-8)', marginBottom: 'var(--s-10)' }}>
          <div>
            <h3 style={{ font: 'var(--type-section-sm)', marginBottom: 'var(--s-4)' }}>La Revue des Lieux Oubliés</h3>
            <p style={{ font: 'var(--type-body)', opacity: 0.7, maxWidth: '30ch' }}>
              Une archive numérique documentant les architectures en transition, les usages obsolètes et la mémoire des murs.
            </p>
          </div>
          <div>
            <h4 style={{ font: 'var(--type-mono-sm)', letterSpacing: 'var(--track-mono-sm)', textTransform: 'uppercase', marginBottom: 'var(--s-4)', opacity: 0.5 }}>Index</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)', font: 'var(--type-ui)' }}>
              <span className="et-rule-draw" style={{ width: 'fit-content', cursor: 'pointer' }}>À propos de la revue</span>
              <span className="et-rule-draw" style={{ width: 'fit-content', cursor: 'pointer' }}>Index des lieux</span>
              <span className="et-rule-draw" style={{ width: 'fit-content', cursor: 'pointer' }}>Dossiers</span>
              <span className="et-rule-draw" style={{ width: 'fit-content', cursor: 'pointer' }}>Archives</span>
            </nav>
          </div>
          <div>
            <h4 style={{ font: 'var(--type-mono-sm)', letterSpacing: 'var(--track-mono-sm)', textTransform: 'uppercase', marginBottom: 'var(--s-4)', opacity: 0.5 }}>Légal & Contact</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)', font: 'var(--type-ui)' }}>
              <span className="et-rule-draw" style={{ width: 'fit-content', cursor: 'pointer' }}>Crédits photo</span>
              <span className="et-rule-draw" style={{ width: 'fit-content', cursor: 'pointer' }}>Méthode de classement</span>
              <span className="et-rule-draw" style={{ width: 'fit-content', cursor: 'pointer' }}>Newsletter</span>
            </nav>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 'var(--s-4)', font: 'var(--type-mono-xs)', textTransform: 'uppercase', letterSpacing: 'var(--track-mono-xs)', opacity: 0.5 }}>
          <span>© 2026 Éditions Fictives</span>
          <span>Démo Editorial Type Skill</span>
        </div>
      </footer>
    </div>
  )
}

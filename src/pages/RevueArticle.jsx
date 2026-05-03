import React from 'react'
import { Link } from 'react-router-dom'

{/*
<design_plan>
1. Use case: Detailed longform editorial essay and documentary archive.
2. Style direction: High-Contrast Editorial Archive with strong serif headings.
3. Operating mode: High reading density, chronological layout, precise metadata grids.
4. First viewport: Article Hero with specific title, meta, and strong introductory paragraph.
5. System contracts: Execution tokens, high contrast monochrome with status pills.
6. Component plan: PosterTitleHeroContract (adapted), IssueIndexTableContract (for documents).
7. Motion plan: Line mask reveals for title, standard link draws.
8. Anti-slop sweep: Keep line lengths for reading at 60-70ch (max-w-2xl), preserve spacing tokens.
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

  --canvas: #ffffff;
  --surface: #ffffff;
  --surface-inverse: #000000;
  --text: #272727;
  --text-inverse: #ffffff;
  --line: #000000;
  --font-display: "Playfair Display", Georgia, serif;
}

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

.editorial-type-card {
  display: grid;
  gap: var(--s-2);
  padding: var(--s-6);
  border: 1px solid var(--line);
  background: var(--surface);
}

.editorial-type-section-head { display: grid; gap: var(--s-3); max-width: 760px; }
.editorial-type-section-head > span { font: var(--type-mono-xs); letter-spacing: var(--track-mono-xs); text-transform: uppercase; color: var(--text-muted); }
.editorial-type-section-head h2 { margin: 0; font: var(--type-section); letter-spacing: var(--track-section); text-wrap: balance; color: var(--text); }

.issue-index {
  border-top: 1px solid var(--line);
  font: var(--type-body);
}
.issue-index__head,
.issue-index__row {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr) 120px 100px 200px;
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
  min-block-size: 64px;
  border-top: 1px solid var(--line);
  color: var(--text);
  transition: background 160ms ease, color 160ms ease;
  cursor: pointer;
}
.issue-index__row:hover {
  background: var(--surface-inverse);
  color: var(--text-inverse);
}

.et-reveal-line { display: block; overflow: hidden; }
.et-reveal-line > span {
  display: inline-block;
  transform: translateY(108%);
  animation: et-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes et-slide-up {
  from { transform: translateY(108%); }
  to { transform: translateY(0); }
}

.et-rule-draw { text-decoration: none; }
.et-rule-draw::after {
  content: "";
  display: block;
  block-size: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 220ms ease;
}
.et-rule-draw:hover::after { transform: scaleX(1); }

.et-container { background: var(--canvas); color: var(--text); font-family: var(--font-sans); }
.et-section-padding { padding-block: var(--s-11); padding-inline: var(--s-6); }
.et-nav {
  display: flex; justify-content: space-between; padding: var(--s-4) var(--s-6);
  font: var(--type-mono-sm); letter-spacing: var(--track-mono-sm); text-transform: uppercase;
  border-bottom: 1px solid var(--line);
  position: sticky; top: 0; background: var(--canvas); z-index: 50;
}
.et-reading {
  max-width: 65ch;
  margin-inline: auto;
  font: var(--type-body);
  font-size: 1.125rem;
  line-height: 1.7;
}

@media (max-width: 1024px) {
  .issue-index__head { display: none; }
  .issue-index__row { grid-template-columns: 1fr; gap: 6px; padding-block: 18px; }
}
`

export default function RevueArticle() {
  return (
    <div className="et-container">
      <style dangerouslySetInnerHTML={{ __html: ET_TOKENS }} />

      <nav className="et-nav">
        <div style={{ display: 'flex', gap: 'var(--s-6)' }}>
          <Link to="/skills/editorial-type/vitrine" className="et-rule-draw">← Retour au dossier</Link>
          <span style={{ color: 'var(--text-muted)' }}>Gare Saint-Sauveur</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className="editorial-type-status-pill" data-role="info" style={{ background: 'var(--text)', color: 'var(--canvas)' }}>Lecture: 11 min</span>
        </div>
      </nav>

      {/* 1. Article Hero */}
      <header className="et-section-padding" style={{ borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ font: 'var(--type-display)', fontSize: 'clamp(48px, 8vw, 120px)', lineHeight: '0.9', marginBottom: 'var(--s-4)' }}>
            <span className="et-reveal-line"><span style={{ animationDelay: '0ms' }}>Gare Saint-Sauveur</span></span>
          </h1>
          <h2 style={{ font: 'var(--type-section-sm)', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 'var(--s-10)' }}>
            La gare qui n'attend plus personne
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--s-6)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', paddingBlock: 'var(--s-6)', marginBottom: 'var(--s-10)', font: 'var(--type-meta)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <div><strong style={{ display: 'block', color: 'var(--text)', marginBottom: '4px' }}>Lieu</strong><span style={{ color: 'var(--text-muted)' }}>Lille</span></div>
            <div><strong style={{ display: 'block', color: 'var(--text)', marginBottom: '4px' }}>Ouverture</strong><span style={{ color: 'var(--text-muted)' }}>1865</span></div>
            <div><strong style={{ display: 'block', color: 'var(--text)', marginBottom: '4px' }}>Statut</strong><span style={{ color: 'var(--text-muted)' }}>Reconvertie</span></div>
            <div><strong style={{ display: 'block', color: 'var(--text)', marginBottom: '4px' }}>Auteur</strong><span style={{ color: 'var(--text-muted)' }}>Claire Montval</span></div>
          </div>
          
          <p className="et-reading" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: '1.5' }}>
            Ancienne gare de marchandises devenue lieu culturel, Saint-Sauveur conserve une mémoire ferroviaire sans trains. Les quais n'organisent plus les départs, mais ils continuent de structurer la manière dont on traverse le lieu.
          </p>
        </div>
      </header>

      {/* 2. Bloc "fiche archive" */}
      <section className="et-section-padding" style={{ background: 'var(--surface-muted)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <header className="editorial-type-section-head" style={{ marginBottom: 'var(--s-8)' }}>
            <span>Fiche Documentaire — L-021</span>
          </header>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0 var(--s-10)', font: 'var(--type-body)' }}>
            {[
              { label: "Nom", value: "Gare Saint-Sauveur" },
              { label: "Ville", value: "Lille" },
              { label: "Pays", value: "France" },
              { label: "Première mise en service", value: "1865" },
              { label: "Usage initial", value: "Gare de marchandises" },
              { label: "Usage actuel", value: "Espace culturel" },
              { label: "Typologie", value: "Infrastructure ferroviaire reconvertie" },
              { label: "État", value: "Actif" },
              { label: "Matériaux visibles", value: "Brique, métal, béton, verre" },
              { label: "Traces conservées", value: "Quais, volumes, rails partiels, signalétique" },
              { label: "Niveau de transformation", value: "Élevé" },
              { label: "Niveau de mémoire visible", value: "Moyen" },
              { label: "Dernière visite fictive", value: "Mars 2026" },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', paddingBlock: 'var(--s-3)', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                <span style={{ fontWeight: '500', textAlign: 'right', maxWidth: '60%' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Récit long format */}
      <article className="et-section-padding" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="et-reading">
          <h3 style={{ font: 'var(--type-section)', marginBottom: 'var(--s-8)' }}>Le bâtiment après sa fonction</h3>
          <p style={{ marginBottom: 'var(--s-6)' }}>
            La gare Saint-Sauveur n'est plus un lieu de départ. Pourtant, son architecture continue de penser comme une gare. Les volumes sont longs, les circulations lisibles, les seuils nombreux. Même transformé, le bâtiment garde une logique d'attente, d'orientation et de passage.
          </p>
          <p style={{ marginBottom: 'var(--s-6)' }}>
            Les lieux ferroviaires possèdent une mémoire particulière : ils ont été conçus pour organiser des corps en mouvement. Quand le train disparaît, il reste cette chorégraphie invisible. On ne vient plus prendre une correspondance, mais on continue d'entrer, longer, attendre, traverser.
          </p>
          <p style={{ marginBottom: 'var(--s-6)' }}>
            Dans cette reconversion, la question n'est pas seulement architecturale. Elle est éditoriale : que choisit-on de rendre lisible ? Que laisse-t-on dans le silence ? Quels signes anciens deviennent décor, preuve ou récit ?
          </p>
        </div>
      </article>

      {/* 4. Citation centrale */}
      <section className="et-section-padding" style={{ background: 'var(--surface-inverse)', color: 'var(--text-inverse)' }}>
        <blockquote style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ font: 'var(--type-display)', fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: '1.2', marginBottom: 'var(--s-8)' }}>
            "La gare n'est plus un horaire. Elle est devenue une phrase longue, traversée par des visiteurs."
          </p>
          <footer style={{ font: 'var(--type-mono-sm)', textTransform: 'uppercase', letterSpacing: 'var(--track-mono-sm)', opacity: 0.6 }}>
            — Carnet de visite, Mars 2026
          </footer>
        </blockquote>
      </section>

      {/* 5. Galerie de détails */}
      <section className="et-section-padding" style={{ borderBottom: '1px solid var(--line)' }}>
        <header className="editorial-type-section-head" style={{ marginBottom: 'var(--s-8)', marginInline: 'auto', textAlign: 'center' }}>
          <span>Inventaire Visuel</span>
        </header>

        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--s-10) var(--s-8)' }}>
          {[
            { img: "rgba(0,0,0,0.1)", title: "Ancien quai latéral", desc: "Le quai ne sert plus à séparer les flux, mais il continue d’organiser la profondeur du lieu." },
            { img: "rgba(0,0,0,0.15)", title: "Signalétique conservée", desc: "Les anciens signes ferroviaires deviennent des repères patrimoniaux." },
            { img: "rgba(0,0,0,0.2)", title: "Volume principal", desc: "La longueur du bâtiment rappelle son usage initial : stocker, faire circuler, déplacer." },
            { img: "rgba(0,0,0,0.05)", title: "Façade en brique", desc: "La matière garde une présence industrielle, même dans un usage culturel." },
            { img: "rgba(0,0,0,0.12)", title: "Plan de circulation actuel", desc: "La reconversion remplace l’horaire par le programme." },
            { img: "rgba(0,0,0,0.18)", title: "Trace de rail partielle", desc: "Fragment minuscule, mais suffisant pour réactiver tout l’imaginaire du lieu." },
          ].map((item, idx) => (
            <figure key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
              <div style={{ width: '100%', aspectRatio: '3/4', backgroundColor: item.img }} />
              <figcaption style={{ borderTop: '1px solid var(--line)', paddingTop: 'var(--s-3)' }}>
                <strong style={{ display: 'block', font: 'var(--type-card)', marginBottom: 'var(--s-2)' }}>{item.title}</strong>
                <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)' }}>{item.desc}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 6. Chronologie */}
      <section className="et-section-padding" style={{ background: 'var(--surface-muted)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <header className="editorial-type-section-head" style={{ marginBottom: 'var(--s-10)', textAlign: 'center', marginInline: 'auto' }}>
            <span>Chronologie Opératoire</span>
          </header>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-6)' }}>
            {[
              { year: "1865", text: "Mise en service de la gare de marchandises." },
              { year: "XXe", text: "Activité logistique et ferroviaire au cœur de l'industrie lilloise." },
              { year: "2003", text: "Fermeture progressive de certains usages face au déclin du fret en centre-ville." },
              { year: "2009", text: "Réouverture comme espace culturel dans le cadre de Lille 3000." },
              { year: "2015", text: "Stabilisation de la programmation publique et transformation pérenne." },
              { year: "2026", text: "Entrée dans le dossier \"Gares sans départ\" de la Revue." },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: 'var(--s-8)', alignItems: 'baseline', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: 'var(--s-6)' }}>
                <span style={{ font: 'var(--type-display)', fontSize: 'clamp(32px, 4vw, 48px)', color: 'var(--text-muted)', minWidth: '100px' }}>{item.year}</span>
                <p style={{ font: 'var(--type-card)' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Documents associés */}
      <section className="et-section-padding" style={{ borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <header className="editorial-type-section-head" style={{ marginBottom: 'var(--s-8)' }}>
            <span>Pièces jointes</span>
          </header>
          
          <div className="issue-index">
            <div className="issue-index__head">
              <div>Réf</div>
              <div>Document</div>
              <div>Type</div>
              <div>Année</div>
              <div>Note</div>
            </div>
            {[
              { ref: "DOC-01", doc: "Plan de circulation intérieur", type: "Plan", year: "2026", note: "usage actuel" },
              { ref: "DOC-02", doc: "Ancienne photo de quai", type: "Photo", year: "1978", note: "archive fictive" },
              { ref: "DOC-03", doc: "Programme culturel saisonnier", type: "Programme", year: "2026", note: "reconversion" },
              { ref: "DOC-04", doc: "Relevé de signalétique", type: "Inventaire", year: "2026", note: "traces visibles" },
              { ref: "DOC-05", doc: "Carte des accès", type: "Carte", year: "2026", note: "lecture du site" },
            ].map((item, idx) => (
              <div className="issue-index__row" key={idx}>
                <div style={{ font: 'var(--type-mono-sm)', color: 'var(--text-muted)' }}>{item.ref}</div>
                <div style={{ fontWeight: '500' }}>{item.doc}</div>
                <div>{item.type}</div>
                <div style={{ color: 'var(--text-muted)' }}>{item.year}</div>
                <div style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Section comparative */}
      <section className="et-section-padding" style={{ background: 'var(--surface-muted)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header className="editorial-type-section-head" style={{ marginBottom: 'var(--s-10)', textAlign: 'center', marginInline: 'auto' }}>
            <span>Analyses Comparatives</span>
          </header>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--s-8)' }}>
            {[
              { title: "Gare maritime de Cherbourg", meta: "Cherbourg • Monument classé", initial: "Gare transatlantique", current: "Cité de la Mer", point: "Volumes monumentaux", diff: "Mémoire monumentale vs urbaine" },
              { title: "Ancienne gare de Reuilly", meta: "Paris • Reconvertie", initial: "Gare de voyageurs", current: "Logements & jardin", point: "Tracé des rails conservé", diff: "Transformation urbaine lourde" },
              { title: "Ateliers SNCF d'Arles", meta: "Arles • Pôle culturel", initial: "Ateliers de réparation", current: "Fondation LUMA", point: "Friche ferroviaire", diff: "Patrimoine industriel vs logistique" },
            ].map((item, idx) => (
              <div key={idx} className="editorial-type-card" style={{ padding: 'var(--s-6)', background: 'var(--canvas)' }}>
                <h4 style={{ font: 'var(--type-section-sm)' }}>{item.title}</h4>
                <span style={{ font: 'var(--type-mono-xs)', letterSpacing: 'var(--track-mono-xs)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{item.meta}</span>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)', marginTop: 'var(--s-4)', font: 'var(--type-body)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: 'var(--s-2)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Usage initial</span><span style={{ textAlign: 'right' }}>{item.initial}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: 'var(--s-2)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Usage actuel</span><span style={{ textAlign: 'right' }}>{item.current}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: 'var(--s-2)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Point commun</span><span style={{ textAlign: 'right' }}>{item.point}</span>
                  </div>
                  <div style={{ fontStyle: 'italic', color: 'var(--text-muted)', marginTop: 'var(--s-2)' }}>
                    Différence : {item.diff}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Fin de page */}
      <nav className="et-section-padding" style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--s-10)' }}>
        <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span style={{ display: 'block', font: 'var(--type-mono-xs)', letterSpacing: 'var(--track-mono-xs)', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--s-3)' }}>← Article précédent</span>
          <h4 style={{ font: 'var(--type-section)', marginBottom: 'var(--s-2)' }}>Cinéma Le Bretagne</h4>
          <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)' }}>La salle sans projection</p>
        </Link>
        
        <Link to="#" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'right' }}>
          <span style={{ display: 'block', font: 'var(--type-mono-xs)', letterSpacing: 'var(--track-mono-xs)', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--s-3)' }}>Article suivant →</span>
          <h4 style={{ font: 'var(--type-section)', marginBottom: 'var(--s-2)' }}>Imprimerie Chaix</h4>
          <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)' }}>Les machines absentes</p>
        </Link>

        <div style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--line)', paddingTop: 'var(--s-8)', display: 'flex', justifyContent: 'space-around', font: 'var(--type-mono-sm)', textTransform: 'uppercase', letterSpacing: 'var(--track-mono-sm)' }}>
          <Link to="/skills/editorial-type/vitrine" className="et-rule-draw">Retour au dossier : Gares sans départ</Link>
          <Link to="/skills/editorial-type/vitrine" className="et-rule-draw">Retour à l'index : Tous les lieux</Link>
        </div>
      </nav>

      {/* Footer bibliographique */}
      <footer style={{ paddingBlock: 'var(--s-8)', paddingInline: 'var(--s-6)', background: 'var(--surface-inverse)', color: 'var(--text-inverse)', font: 'var(--type-mono-xs)', textTransform: 'uppercase', letterSpacing: 'var(--track-mono-xs)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 'var(--s-6)' }}>
          <div style={{ display: 'flex', gap: 'var(--s-6)', opacity: 0.6 }}>
            <span>Dossier : Gares sans départ</span>
            <span>Revue : La Revue des Lieux Oubliés</span>
            <span>Numéro : 04</span>
            <span>Saison : Printemps 2026</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)', textAlign: 'right', opacity: 0.4 }}>
            <span>Corpus : lieux fictifs et réels librement éditorialisés pour démonstration</span>
            <span>Usage : démo portfolio</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

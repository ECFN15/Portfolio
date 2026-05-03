import { Link } from 'react-router-dom'

export const NOVAHAUS_CSS = `
:root {
  --nh-canvas: #f6f4ed;
  --nh-surface: #fffdf7;
  --nh-surface-muted: #e8e2d6;
  --nh-ink: #111111;
  --nh-muted: #625e55;
  --nh-line: #111111;
  --nh-action: #2f4a38;
  --nh-clay: #d6926b;
  --nh-blue: #38506c;
  --nh-radius-control: 0px;
  --nh-radius-card: 0px;
  --nh-font-sans: "Inter", "Geist", system-ui, sans-serif;
  --nh-font-display: "Space Grotesk", "Inter", system-ui, sans-serif;
  --nh-font-mono: "JetBrains Mono", "Geist Mono", ui-monospace, monospace;
  --nh-type-mono-xs: 600 10px/1.4 var(--nh-font-mono);
  --nh-type-mono-sm: 600 11px/1.4 var(--nh-font-mono);
  --nh-type-body-sm: 400 13px/1.55 var(--nh-font-sans);
  --nh-type-body: 400 15px/1.62 var(--nh-font-sans);
  --nh-type-ui: 700 13px/1.2 var(--nh-font-sans);
  --nh-type-card: 650 20px/1.14 var(--nh-font-display);
  --nh-type-section: 650 clamp(34px, 5vw, 58px)/.98 var(--nh-font-display);
  --nh-type-display: 700 clamp(48px, 8vw, 104px)/.9 var(--nh-font-display);
  --nh-s-1: 4px;
  --nh-s-2: 8px;
  --nh-s-3: 12px;
  --nh-s-4: 16px;
  --nh-s-5: 20px;
  --nh-s-6: 24px;
  --nh-s-7: 32px;
  --nh-s-8: 48px;
  --nh-s-9: 64px;
  --nh-s-10: 80px;
}

.nh-page {
  min-height: 100vh;
  background: var(--nh-canvas);
  color: var(--nh-ink);
  font-family: var(--nh-font-sans);
}

.nh-nav {
  position: sticky;
  top: 0;
  z-index: 30;
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr) auto;
  gap: var(--nh-s-4);
  align-items: center;
  min-height: 72px;
  padding: 0 clamp(16px, 4vw, 56px);
  border-bottom: 1px solid var(--nh-line);
  background: color-mix(in srgb, var(--nh-canvas), transparent 8%);
  backdrop-filter: blur(14px);
}

.nh-mark {
  color: var(--nh-ink);
  font: 800 20px/1 var(--nh-font-display);
  letter-spacing: -.04em;
  text-decoration: none;
}

.nh-nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--nh-s-4);
  font: var(--nh-type-mono-xs);
  letter-spacing: .14em;
  text-transform: uppercase;
}

.nh-nav-links a,
.nh-text-link {
  color: var(--nh-muted);
  text-decoration: none;
}

.nh-nav-links a:hover,
.nh-text-link:hover {
  color: var(--nh-ink);
}

.nh-button {
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  gap: var(--nh-s-2);
  border: 1px solid var(--nh-line);
  border-radius: var(--nh-radius-control);
  background: var(--nh-ink);
  color: var(--nh-surface);
  font: var(--nh-type-ui);
  letter-spacing: .06em;
  padding: 0 var(--nh-s-5);
  text-decoration: none;
  text-transform: uppercase;
  transition: background 180ms ease, color 180ms ease, transform 180ms ease;
}

.nh-button:hover {
  background: var(--nh-action);
  transform: translateY(-2px);
}

.nh-button.secondary {
  background: transparent;
  color: var(--nh-ink);
}

.nh-button.secondary:hover {
  background: var(--nh-ink);
  color: var(--nh-surface);
}

.nh-shell {
  width: min(100%, 1440px);
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 56px);
}

.nh-hero {
  min-height: calc(100svh - 72px);
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-auto-rows: minmax(82px, auto);
  gap: var(--nh-s-4);
  padding-top: var(--nh-s-6);
  padding-bottom: var(--nh-s-8);
}

.nh-hero-copy {
  grid-column: 1 / span 6;
  grid-row: 1 / span 5;
  display: flex;
  flex-direction: column;
  justify-content: end;
  border: 1px solid var(--nh-line);
  background: var(--nh-surface);
  padding: clamp(24px, 4vw, 56px);
}

.nh-coordinate {
  display: inline-grid;
  grid-auto-flow: column;
  gap: var(--nh-s-2);
  align-items: center;
  width: max-content;
  color: var(--nh-muted);
  font: var(--nh-type-mono-xs);
  letter-spacing: .16em;
  text-transform: uppercase;
}

.nh-coordinate::before {
  content: "";
  width: 28px;
  height: 1px;
  background: currentColor;
}

.nh-hero h1,
.nh-display-title {
  max-width: 12ch;
  margin: var(--nh-s-5) 0;
  font: var(--nh-type-display);
  letter-spacing: -.045em;
  text-wrap: balance;
}

.nh-lead {
  max-width: 52ch;
  color: var(--nh-muted);
  font: 450 clamp(16px, 2vw, 20px)/1.55 var(--nh-font-sans);
}

.nh-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--nh-s-3);
  margin-top: var(--nh-s-7);
}

.nh-hero-visual {
  grid-column: 7 / span 6;
  grid-row: 1 / span 5;
  position: relative;
  min-height: 560px;
  overflow: hidden;
  border: 1px solid var(--nh-line);
  background: var(--nh-ink);
}

.nh-hero-visual img,
.nh-gallery-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(.86) contrast(1.05);
}

.nh-hero-visual img {
  clip-path: polygon(0 0, 100% 0, 100% 78%, 78% 100%, 0 100%);
  opacity: .9;
}

.nh-plan-overlay {
  position: absolute;
  inset: var(--nh-s-5);
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(3, 1fr);
  border: 1px solid rgba(255, 253, 247, .8);
  color: var(--nh-surface);
  pointer-events: none;
}

.nh-plan-overlay span {
  border-right: 1px solid rgba(255, 253, 247, .35);
  border-bottom: 1px solid rgba(255, 253, 247, .35);
  padding: var(--nh-s-2);
  font: var(--nh-type-mono-xs);
  letter-spacing: .12em;
}

.nh-meta-grid {
  grid-column: 1 / span 12;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  border: 1px solid var(--nh-line);
  background: var(--nh-surface);
}

.nh-meta-cell,
.nh-stat,
.nh-module-card,
.nh-option-card,
.nh-step,
.nh-scenario,
.nh-variant {
  border: 1px solid var(--nh-line);
  background: var(--nh-surface);
}

.nh-meta-cell {
  min-height: 112px;
  padding: var(--nh-s-4);
  border-width: 0 1px 0 0;
}

.nh-meta-cell:last-child {
  border-right: 0;
}

.nh-meta-cell span,
.nh-kicker {
  display: block;
  color: var(--nh-muted);
  font: var(--nh-type-mono-xs);
  letter-spacing: .14em;
  text-transform: uppercase;
}

.nh-meta-cell strong {
  display: block;
  margin-top: var(--nh-s-4);
  font: var(--nh-type-card);
}

.nh-section {
  padding: var(--nh-s-10) 0;
  border-top: 1px solid rgba(17, 17, 17, .22);
}

.nh-section-head {
  display: grid;
  grid-template-columns: 3fr 5fr;
  gap: var(--nh-s-8);
  margin-bottom: var(--nh-s-8);
}

.nh-section-head h2 {
  max-width: 16ch;
  margin: var(--nh-s-3) 0 0;
  font: var(--nh-type-section);
  letter-spacing: -.03em;
}

.nh-section-head p {
  max-width: 68ch;
  margin: 0;
  color: var(--nh-muted);
  font: var(--nh-type-body);
}

.nh-problem-grid {
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  gap: var(--nh-s-4);
}

.nh-problem-text {
  border: 1px solid var(--nh-line);
  background: var(--nh-surface);
  padding: clamp(24px, 4vw, 48px);
}

.nh-problem-text p {
  color: var(--nh-muted);
  font: 450 18px/1.65 var(--nh-font-sans);
}

.nh-check-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--nh-s-3);
}

.nh-check {
  min-height: 96px;
  display: flex;
  align-items: end;
  border: 1px solid var(--nh-line);
  background: var(--nh-surface-muted);
  padding: var(--nh-s-4);
  font: var(--nh-type-ui);
}

.nh-modules-grid,
.nh-scenarios-grid,
.nh-gallery-grid,
.nh-stats-grid,
.nh-options-grid,
.nh-variants-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--nh-s-4);
}

.nh-module-card {
  grid-column: span 3;
  min-height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--nh-s-5);
  transition: background 180ms ease, color 180ms ease, transform 180ms ease;
}

.nh-module-card:hover,
.nh-module-card[data-selected="true"] {
  background: var(--nh-ink);
  color: var(--nh-surface);
  transform: translateY(-3px);
}

.nh-module-card p {
  color: inherit;
  opacity: .72;
}

.nh-module-shape {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  height: 112px;
  border: 1px solid currentColor;
}

.nh-module-shape span {
  border-right: 1px solid currentColor;
  border-bottom: 1px solid currentColor;
  opacity: .45;
}

.nh-card-title {
  margin: var(--nh-s-4) 0 var(--nh-s-2);
  font: 700 34px/.95 var(--nh-font-display);
  letter-spacing: -.03em;
}

.nh-signature {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--nh-s-4);
}

.nh-signature-plan {
  min-height: 520px;
  border: 1px solid var(--nh-line);
  background:
    linear-gradient(to right, rgba(17,17,17,.16) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(17,17,17,.16) 1px, transparent 1px),
    var(--nh-surface-muted);
  background-size: 48px 48px;
  padding: var(--nh-s-5);
  display: grid;
  grid-template-columns: 1.2fr 4.8fr 2fr;
  grid-template-rows: 1fr;
  gap: var(--nh-s-2);
}

.nh-plan-zone {
  border: 2px solid var(--nh-line);
  background: color-mix(in srgb, var(--nh-surface), transparent 16%);
  padding: var(--nh-s-3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.nh-signature-info {
  border: 1px solid var(--nh-line);
  background: var(--nh-ink);
  color: var(--nh-surface);
  padding: clamp(24px, 4vw, 48px);
}

.nh-spec-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  margin: var(--nh-s-7) 0;
  background: rgba(255,255,255,.32);
}

.nh-spec-grid div {
  background: var(--nh-ink);
  padding: var(--nh-s-4);
}

.nh-process-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: var(--nh-s-3);
}

.nh-step {
  min-height: 260px;
  padding: var(--nh-s-4);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.nh-step strong,
.nh-scenario strong,
.nh-option-card strong,
.nh-variant strong {
  font: var(--nh-type-card);
}

.nh-gallery-card {
  grid-column: span 4;
  border: 1px solid var(--nh-line);
  background: var(--nh-surface);
}

.nh-gallery-media {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--nh-surface-muted);
}

.nh-gallery-card:nth-child(2n) .nh-gallery-media {
  clip-path: polygon(0 0, 100% 0, 100% 86%, 86% 100%, 0 100%);
}

.nh-gallery-card figcaption {
  padding: var(--nh-s-4);
}

.nh-stat {
  grid-column: span 2;
  min-height: 190px;
  padding: var(--nh-s-4);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.nh-stat strong {
  font: 750 clamp(30px, 4vw, 52px)/.9 var(--nh-font-display);
  letter-spacing: -.04em;
}

.nh-cta {
  border: 1px solid var(--nh-line);
  background: var(--nh-clay);
  padding: clamp(28px, 6vw, 72px);
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--nh-s-6);
  align-items: end;
}

.nh-footer {
  border-top: 1px solid var(--nh-line);
  padding: var(--nh-s-8) 0;
}

.nh-footer-grid {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: var(--nh-s-4);
}

.nh-footer a {
  color: var(--nh-muted);
  text-decoration: none;
}

.nh-footer a:hover {
  color: var(--nh-ink);
}

.nh-scenario {
  grid-column: span 4;
  min-height: 220px;
  padding: var(--nh-s-5);
}

@media (prefers-reduced-motion: reduce) {
  .nh-button,
  .nh-module-card {
    transition-duration: .01ms;
    transform: none !important;
  }
}

@media (max-width: 920px) {
  .nh-nav {
    grid-template-columns: 1fr;
    padding-block: var(--nh-s-4);
  }

  .nh-nav-links {
    overflow-x: auto;
    flex-wrap: nowrap;
  }

  .nh-hero,
  .nh-section-head,
  .nh-problem-grid,
  .nh-signature,
  .nh-cta,
  .nh-footer-grid {
    grid-template-columns: 1fr;
  }

  .nh-hero-copy,
  .nh-hero-visual,
  .nh-meta-grid {
    grid-column: 1;
    grid-row: auto;
  }

  .nh-hero-visual {
    min-height: 420px;
  }

  .nh-meta-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .nh-module-card,
  .nh-gallery-card,
  .nh-stat,
  .nh-scenario {
    grid-column: span 12;
  }

  .nh-process-grid {
    grid-template-columns: 1fr;
  }

  .nh-signature-plan {
    min-height: 360px;
    grid-template-columns: 1.2fr 4.8fr 2fr;
    overflow-x: auto;
  }
}
`

const moduleMeta = [
  ['Surface', '12 a 38 m2'],
  ['Structure', 'Fabrication bois'],
  ['Confort', 'Isolation 4 saisons'],
  ['Installation', 'A partir de 6 semaines'],
  ['Plans', 'Personnalisables'],
  ['Usages', 'Bureau, studio, atelier'],
]

const modules = [
  {
    name: 'Module N-12',
    usage: 'Bureau individuel, atelier calme, piece de teletravail.',
    surface: '12 m2',
    promise: 'Le minimum bien proportionne pour travailler hors de la maison.',
  },
  {
    name: 'Module N-18',
    usage: 'Bureau double, studio creatif, salle de soin.',
    surface: '18 m2',
    promise: 'Un volume compact avec assez de largeur pour recevoir ou creer.',
  },
  {
    name: 'Module N-24',
    usage: 'Studio invite, bureau premium, micro-logement temporaire.',
    surface: '24 m2',
    promise: 'Le module signature : assez grand pour vivre, assez compact pour rester simple.',
    link: '/novahaus/module-n24',
  },
  {
    name: 'Module N-38',
    usage: 'Extension familiale, showroom, atelier partage.',
    surface: '38 m2',
    promise: 'Une vraie piece de vie independante, pensee comme une petite architecture.',
  },
]

const scenarios = [
  ['Bureau de jardin', 'Consultant independant', 'Travailler au calme sans louer un bureau exterieur.', 'N-12 ou N-18'],
  ['Studio invite', 'Famille avec terrain disponible', 'Accueillir parents, amis ou enfant etudiant.', 'N-24'],
  ['Atelier creatif', 'Photographe, designer, artisan', 'Separer espace personnel et espace de production.', 'N-18 ou N-24'],
  ['Salle de soin', 'Praticien independant', 'Recevoir dans un espace professionnel a domicile.', 'N-18'],
  ['Micro-showroom', 'Marque locale ou studio produit', 'Presenter une collection dans un espace autonome.', 'N-24 ou N-38'],
]

const projects = [
  ['Bureau Nord', 'Rouen', 'N-12', 'teletravail', 'Une facade courte, une grande ouverture, un espace reduit mais net.', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80'],
  ['Atelier Ligne Claire', 'Nantes', 'N-18', 'atelier design', 'Un module etroit pense autour d un long plan de travail.', 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80'],
  ['Studio Jardin Sud', 'Montpellier', 'N-24', 'studio invite', 'Le module signature ouvert sur une terrasse basse.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80'],
  ['Cabinet Patio', 'Lyon', 'N-18', 'salle de soin', 'Un espace professionnel separe de la maison par une cour.', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80'],
  ['Showroom Compact', 'Bordeaux', 'N-24', 'presentation produit', 'Une petite architecture utilisee comme espace de marque.', 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=900&q=80'],
  ['Extension Familiale', 'Rennes', 'N-38', 'piece de vie', 'Le plus grand module, pense comme une continuite de la maison.', 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80'],
]

const stats = [
  ['12-38 m2', 'surfaces disponibles'],
  ['6 semaines', 'delai minimum d installation'],
  ['4 saisons', 'isolation prevue pour usage annuel'],
  ['8 m x 3 m', 'dimensions du N-24'],
  ['3 niveaux', 'essentielle, confort, premium'],
  ['5 usages', 'bureau, studio, atelier, soin, showroom'],
]

export default function NovahausVitrine() {
  return (
    <div className="nh-page">
      <style dangerouslySetInnerHTML={{ __html: NOVAHAUS_CSS }} />

      <nav className="nh-nav">
        <Link to="/novahaus" className="nh-mark">NOVAHAUS</Link>
        <div className="nh-nav-links" aria-label="Navigation NOVAHAUS">
          <a href="#modules">Modules</a>
          <a href="#usages">Usages</a>
          <a href="#process">Process</a>
          <a href="#realisations">Realisations</a>
        </div>
        <Link to="/novahaus/module-n24" className="nh-button">Module N-24</Link>
      </nav>

      <header className="nh-shell nh-hero">
        <div className="nh-hero-copy">
          <span className="nh-coordinate">A01 / Grille habitable</span>
          <h1>Des mètres carrés qui tombent juste.</h1>
          <p className="nh-lead">Studios de jardin, bureaux exterieurs et modules habitables dessines autour de la lumiere, des usages et des dimensions reelles.</p>
          <p className="nh-coordinate" style={{ marginTop: 'var(--nh-s-5)' }}>Chaque module part d une grille. Chaque grille devient un espace.</p>
          <div className="nh-actions">
            <Link to="/novahaus/module-n24" className="nh-button">Explorer le Module N-24</Link>
            <a href="#usages" className="nh-button secondary">Voir les usages</a>
          </div>
        </div>

        <div className="nh-hero-visual" aria-label="Module architectural NOVAHAUS">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1300&q=82" alt="Maison modulaire contemporaine ouverte sur une terrasse" />
          <div className="nh-plan-overlay" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, index) => (
              <span key={index}>{index === 0 ? 'X0' : index === 7 ? '8M' : index === 16 ? '3M' : ''}</span>
            ))}
          </div>
        </div>

        <div className="nh-meta-grid" aria-label="Metadonnees produit">
          {moduleMeta.map(([label, value]) => (
            <div className="nh-meta-cell" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </header>

      <main>
        <section className="nh-shell nh-section">
          <div className="nh-problem-grid">
            <div className="nh-problem-text">
              <span className="nh-coordinate">B02 / Probleme client</span>
              <h2 className="nh-display-title" style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}>Ajouter une pièce ne devrait pas ajouter du flou.</h2>
              <p>Quand un client cherche a creer un bureau de jardin ou une extension legere, le probleme n est pas seulement le prix. C est l incertitude : dimensions, demarches, isolation, usage reel, emplacement, delais, options, luminosite, raccordements.</p>
              <p>NOVAHAUS simplifie le projet en decoupant chaque decision en modules clairs : surface, usage, orientation, ouverture, rangement, finition et niveau d equipement.</p>
            </div>
            <div className="nh-check-grid">
              {['dimensions lisibles', 'options structurees', 'plans comprehensibles', 'delais cadres', 'estimation progressive', 'usages concrets'].map((item) => (
                <div className="nh-check" key={item}>{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section id="modules" className="nh-shell nh-section">
          <SectionHeader index="C03" title="Un systeme de modules, pas une collection floue.">
            Les bases N-12, N-18, N-24 et N-38 partagent la meme logique rectangulaire : une surface lisible, une proportion stable, un usage clair.
          </SectionHeader>
          <div className="nh-modules-grid">
            {modules.map((module) => (
              <article className="nh-module-card" data-selected={module.name === 'Module N-24'} key={module.name}>
                <div>
                  <span className="nh-coordinate">{module.surface}</span>
                  <h3 className="nh-card-title">{module.name}</h3>
                  <p>{module.usage}</p>
                </div>
                <div>
                  <div className="nh-module-shape" aria-hidden="true">
                    {Array.from({ length: 12 }).map((_, index) => <span key={index} />)}
                  </div>
                  <p>{module.promise}</p>
                  {module.link && <Link to={module.link} className="nh-text-link">Voir le Module N-24 en detail</Link>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="usages" className="nh-shell nh-section">
          <SectionHeader index="D04" title="Cinq scenarios proches de vrais briefs client.">
            Le module n est pas vendu comme une forme abstraite. Il correspond a des besoins concrets : travailler, recevoir, produire, soigner, exposer.
          </SectionHeader>
          <div className="nh-scenarios-grid">
            {scenarios.map(([title, client, need, module]) => (
              <article className="nh-scenario" key={title}>
                <span className="nh-coordinate">{module}</span>
                <h3 className="nh-card-title" style={{ fontSize: 28 }}>{title}</h3>
                <p><strong>Client :</strong> {client}</p>
                <p><strong>Besoin :</strong> {need}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="nh-shell nh-section">
          <SectionHeader index="E05" title="Module signature">
            Le format le plus demande : 24 m2 habitables, un plan clair, plusieurs vies possibles.
          </SectionHeader>
          <div className="nh-signature">
            <div className="nh-signature-plan" aria-label="Plan simplifie du Module N-24">
              <div className="nh-plan-zone"><strong>A</strong><span>Entree / rangement</span><small>1,2 m x 3 m</small></div>
              <div className="nh-plan-zone"><strong>B</strong><span>Espace principal</span><small>4,8 m x 3 m</small></div>
              <div className="nh-plan-zone"><strong>C</strong><span>Zone technique</span><small>2 m x 3 m</small></div>
            </div>
            <div className="nh-signature-info">
              <span className="nh-coordinate" style={{ color: 'rgba(255,255,255,.72)' }}>N-24 / 8 m x 3 m</span>
              <h3 className="nh-display-title" style={{ color: 'var(--nh-surface)', fontSize: 'clamp(42px, 6vw, 78px)' }}>Module N-24</h3>
              <p>Le N-24 est pense comme un rectangle habitable simple a comprendre : une zone jour, une zone technique, une grande ouverture et une circulation courte. Il peut devenir un bureau premium, un studio invite, une salle de soin ou un atelier de creation.</p>
              <div className="nh-spec-grid">
                {['surface 24 m2', 'dimensions 8 m x 3 m', 'hauteur 2,45 m', 'ossature bois', 'isolation 4 saisons', 'delai 6 a 10 semaines', 'bureau, studio, atelier', 'kitchenette, salle d eau, terrasse'].map((spec) => (
                  <div key={spec}>{spec}</div>
                ))}
              </div>
              <Link to="/novahaus/module-n24" className="nh-button" style={{ background: 'var(--nh-surface)', color: 'var(--nh-ink)' }}>Ouvrir la fiche detaillee du Module N-24</Link>
            </div>
          </div>
        </section>

        <section id="process" className="nh-shell nh-section">
          <SectionHeader index="F06" title="Un process en grille.">
            Chaque etape transforme une inconnue en decision mesuree, de la surface disponible jusqu a la livraison de l espace pret a utiliser.
          </SectionHeader>
          <div className="nh-process-grid">
            {[
              ['01', 'Mesurer', 'Relever la surface disponible, les acces et l orientation.'],
              ['02', 'Choisir le module', 'Selectionner une base N-12, N-18, N-24 ou N-38.'],
              ['03', 'Adapter le plan', 'Positionner ouvertures, rangements, zones techniques et terrasse.'],
              ['04', 'Chiffrer', 'Obtenir une estimation selon options, finitions et raccordements.'],
              ['05', 'Preparer', 'Valider demarches, acces chantier, livraison et calendrier.'],
              ['06', 'Installer', 'Assembler le module, raccorder, verifier et livrer l espace.'],
            ].map(([num, title, text]) => (
              <article className="nh-step" key={num}>
                <span className="nh-coordinate">{num}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="realisations" className="nh-shell nh-section">
          <SectionHeader index="G07" title="Realisations decoupees par le systeme.">
            La galerie garde le meme langage : rectangles, cadrages nets, modules nommes, surfaces et usages lisibles.
          </SectionHeader>
          <div className="nh-gallery-grid">
            {projects.map(([name, place, module, usage, caption, image]) => (
              <figure className="nh-gallery-card" key={name}>
                <div className="nh-gallery-media">
                  <img src={image} alt={`${name}, module ${module} a ${place}`} />
                </div>
                <figcaption>
                  <span className="nh-coordinate">{place} / {module}</span>
                  <h3 className="nh-card-title" style={{ fontSize: 26 }}>{name}</h3>
                  <p><strong>{usage}</strong> - {caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="nh-shell nh-section">
          <SectionHeader index="H08" title="Statistiques traitees comme des modules.">
            Les chiffres structurent la preuve au lieu de flotter sur la page.
          </SectionHeader>
          <div className="nh-stats-grid">
            {stats.map(([value, label]) => (
              <div className="nh-stat" key={value}>
                <span className="nh-coordinate">data</span>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="nh-shell nh-section">
          <div className="nh-cta">
            <div>
              <span className="nh-coordinate">I09 / Module le plus demande</span>
              <h2 className="nh-display-title" style={{ fontSize: 'clamp(38px, 6vw, 76px)' }}>Voir le module le plus demandé</h2>
              <p className="nh-lead" style={{ color: 'rgba(17,17,17,.78)' }}>Le Module N-24 est la meilleure demo du systeme NOVAHAUS : plan, dimensions, options, usages, estimation, variantes et galerie de configuration.</p>
            </div>
            <div className="nh-actions">
              <Link to="/novahaus/module-n24" className="nh-button">Explorer le Module N-24</Link>
              <a href="#modules" className="nh-button secondary">Comparer les modules</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export function SectionHeader({ index, title, children }) {
  return (
    <header className="nh-section-head">
      <div>
        <span className="nh-coordinate">{index}</span>
        <h2>{title}</h2>
      </div>
      <p>{children}</p>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="nh-footer">
      <div className="nh-shell nh-footer-grid">
        <div>
          <Link to="/novahaus" className="nh-mark">NOVAHAUS</Link>
          <p className="nh-lead" style={{ fontSize: 15 }}>Modules d habitation compacts, precis et personnalisables.</p>
        </div>
        <div>
          <span className="nh-kicker">Pages</span>
          <p><Link to="/novahaus">Vitrine</Link></p>
          <p><Link to="/novahaus/module-n24">Module N-24</Link></p>
        </div>
        <div>
          <span className="nh-kicker">Explorer</span>
          <p><a href="/novahaus#modules">Modules</a></p>
          <p><a href="/novahaus#realisations">Realisations</a></p>
        </div>
        <div>
          <span className="nh-kicker">Systeme</span>
          <p>Grille 8 x 3</p>
          <p>Ossature bois</p>
        </div>
      </div>
    </footer>
  )
}

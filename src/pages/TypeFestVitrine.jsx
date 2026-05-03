import React from 'react'
import { Link } from 'react-router-dom'

{/*
<design_plan>
1. Use case: Microsite for TYPE//FEST, an experimental typography festival.
2. Archetype: Experimental Type (High-contrast, industrial, kinetic).
3. Type job: Letters as structure, texture, and poster-level display.
4. First viewport: Huge dynamic-looking typographic hero with dense metadata. CTA to the lab.
5. System contracts: Black background, white/neon orange accents, strict --s-* spacing, 0px radius.
6. Components: Poster hero, concept block, highlight index, specimen zone, glyph grid, posters.
7. Motion: Mask reveals, subtle kinetic interactions on hover.
8. Risk sweep: Mobile overflow (prevented with text-wrap:balance and clamps), illegibility (body text uses functional font), generic layout (using strict grid and typography constraints).
</design_plan>
*/}

const ET_TOKENS = `
:root {
  --canvas: #0a0a0a;
  --surface: #111111;
  --surface-muted: #1a1a1a;
  --text: #ffffff;
  --text-muted: #888888;
  --line: #333333;
  --action: #ff4d00;
  --action-strong: #ff3300;
  --radius-control: 0px;
  --radius-card: 0px;
  --radius-panel: 0px;
  --font-sans: "Geist", "Inter", system-ui, sans-serif;
  --font-display: "Clash Display", "Impact", "Helvetica Neue", sans-serif;
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
  --type-display: 800 clamp(46px, 12vw, 160px)/.85 var(--font-display);
  --track-mono-xs: .16em;
  --track-mono-sm: .10em;
  --track-section: -.02em;
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
}

.exp-container {
  background: var(--canvas);
  color: var(--text);
  font-family: var(--font-sans);
  min-height: 100vh;
}

.exp-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--s-4) var(--s-6);
  border-bottom: 1px solid var(--line);
  font: var(--type-mono-sm);
  text-transform: uppercase;
  letter-spacing: var(--track-mono-sm);
  position: sticky;
  top: 0;
  background: var(--canvas);
  z-index: 50;
}

.exp-nav a {
  color: var(--text);
  text-decoration: none;
}

.exp-nav a:hover {
  color: var(--action);
}

.exp-hero {
  padding: var(--s-11) var(--s-6);
  border-bottom: 1px solid var(--line);
  display: grid;
  gap: var(--s-8);
}

.exp-hero-title {
  font: var(--type-display);
  text-transform: uppercase;
  letter-spacing: var(--track-display);
  margin: 0;
  word-break: break-word;
  hyphens: auto;
}

.exp-hero-subtitle {
  font: var(--type-section-sm);
  color: var(--action);
  max-width: 28ch;
}

.exp-hero-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--s-4);
  border-top: 1px solid var(--line);
  padding-top: var(--s-6);
  font: var(--type-mono-xs);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: var(--track-mono-xs);
}

.exp-hero-meta strong {
  display: block;
  color: var(--text);
  font-size: 14px;
  margin-top: 4px;
}

.exp-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--s-6);
  height: 48px;
  background: var(--action);
  color: #000;
  font: var(--type-ui);
  text-transform: uppercase;
  text-decoration: none;
  border-radius: var(--radius-control);
  transition: transform 0.2s ease, background 0.2s ease;
}

.exp-button:hover {
  transform: translateY(-2px);
  background: var(--action-strong);
}

.exp-button-outline {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--line);
}

.exp-button-outline:hover {
  background: var(--surface);
  color: var(--text);
  border-color: var(--text);
}

.exp-section {
  padding: var(--s-11) var(--s-6);
  border-bottom: 1px solid var(--line);
}

.exp-section-header {
  margin-bottom: var(--s-9);
}

.exp-section-eyebrow {
  display: block;
  font: var(--type-mono-sm);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: var(--track-mono-sm);
  margin-bottom: var(--s-3);
}

.exp-section-title {
  font: var(--type-section);
  letter-spacing: var(--track-section);
  text-transform: uppercase;
  margin: 0;
  max-width: 24ch;
}

.exp-grid-highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--s-6);
}

.exp-card {
  border: 1px solid var(--line);
  padding: var(--s-6);
  background: var(--surface);
  display: flex;
  flex-direction: column;
  transition: border-color 0.2s ease;
}

.exp-card:hover {
  border-color: var(--text-muted);
}

.exp-card-type {
  font: var(--type-mono-xs);
  color: var(--action);
  text-transform: uppercase;
  margin-bottom: var(--s-4);
  letter-spacing: var(--track-mono-xs);
}

.exp-card-title {
  font: var(--type-section-sm);
  text-transform: uppercase;
  margin: 0 0 var(--s-3) 0;
}

.exp-card-desc {
  font: var(--type-body);
  color: var(--text-muted);
  margin: 0 0 var(--s-6) 0;
  flex-grow: 1;
}

.exp-index-row {
  display: grid;
  grid-template-columns: 80px 60px minmax(200px, 1fr) 120px 140px;
  gap: var(--s-4);
  padding: var(--s-4) 0;
  border-bottom: 1px solid var(--line);
  align-items: baseline;
  font: var(--type-ui);
}

.exp-index-row:hover {
  background: var(--surface);
}

@media (max-width: 768px) {
  .exp-index-row {
    grid-template-columns: 1fr;
    gap: var(--s-2);
    padding: var(--s-6) 0;
  }
}

.exp-glyph-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}

.exp-glyph-cell {
  background: var(--canvas);
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--s-3);
  transition: background 0.2s ease, color 0.2s ease;
}

.exp-glyph-cell:hover {
  background: var(--action);
  color: #000;
}

.exp-glyph-char {
  font: var(--type-display);
  font-size: clamp(40px, 5vw, 64px);
  line-height: 1;
  text-align: center;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.exp-glyph-label {
  font: var(--type-mono-xs);
  text-transform: uppercase;
  opacity: 0.5;
}

.exp-poster-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--s-6);
}

.exp-poster {
  aspect-ratio: 3/4;
  background: var(--surface);
  border: 1px solid var(--line);
  padding: var(--s-6);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
}

.exp-poster-bg {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.1;
  pointer-events: none;
}

.exp-poster-bg span {
  font: var(--type-display);
  font-size: 200px;
  line-height: 0.8;
  word-break: break-all;
  text-align: center;
  color: var(--action);
}

.exp-specimen {
  background: var(--surface);
  border: 1px solid var(--line);
  padding: var(--s-8);
  overflow: hidden;
}

.exp-specimen-word {
  font: var(--type-display);
  font-size: clamp(40px, 8vw, 120px);
  line-height: 0.9;
  text-transform: uppercase;
  word-break: break-all;
  transition: font-variation-settings 0.2s ease;
}

.exp-specimen-word:hover {
  color: var(--action);
  transform: scaleY(1.2) scaleX(0.9);
}

.exp-footer {
  padding: var(--s-10) var(--s-6);
  display: flex;
  justify-content: space-between;
  font: var(--type-mono-sm);
  text-transform: uppercase;
  color: var(--text-muted);
}
`

export default function TypeFestVitrine() {
  return (
    <div className="exp-container">
      <style dangerouslySetInnerHTML={{ __html: ET_TOKENS }} />

      <nav className="exp-nav">
        <div>
          <Link to="/skills">← Retour Portfolio</Link>
        </div>
        <div style={{ display: 'flex', gap: 'var(--s-6)' }}>
          <span>Paris 17-19 OCT 2026</span>
          <Link to="/skills/experimental-type/article" style={{ color: 'var(--action)' }}>Access Lab →</Link>
        </div>
      </nav>

      {/* 1. Hero */}
      <header className="exp-hero">
        <h1 className="exp-hero-title">TYPE//FEST</h1>
        <p className="exp-hero-subtitle">Letters are not quiet anymore.</p>
        <p style={{ font: 'var(--type-body)', maxWidth: '50ch', color: 'var(--text-muted)' }}>
          Festival fictif de typographie expérimentale, performances graphiques et interfaces variables.
        </p>

        <div style={{ display: 'flex', gap: 'var(--s-4)', marginTop: 'var(--s-4)', flexWrap: 'wrap' }}>
          <Link to="/skills/experimental-type/article" className="exp-button">Explorer l'installation principale</Link>
          <a href="#programme" className="exp-button exp-button-outline">Voir le programme</a>
        </div>

        <div className="exp-hero-meta">
          <div>Lieu <strong>Paris</strong></div>
          <div>Dates <strong>17–19 octobre 2026</strong></div>
          <div>Durée <strong>3 jours</strong></div>
          <div>Performances <strong>24 sessions</strong></div>
          <div>Studios <strong>12 invités</strong></div>
          <div>Lab ouvert <strong>Glyph Lab</strong></div>
        </div>
      </header>

      {/* 2. Bloc concept */}
      <section className="exp-section">
        <div style={{ maxWidth: '800px' }}>
          <span className="exp-section-eyebrow">Manifesto</span>
          <h2 className="exp-section-title" style={{ marginBottom: 'var(--s-6)' }}>Une lettre peut crier sans devenir illisible</h2>
          <p style={{ font: 'var(--type-body)', fontSize: '1.25rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
            TYPE//FEST explore les limites de la typographie expressive : lettres étirées, compressées, découpées, répétées, animées ou transformées par interaction. Chaque expérience repose sur une règle claire : une seule manipulation typographique dominante, puis une interface assez stable pour garder le contenu utilisable.
          </p>
        </div>
      </section>

      {/* 3. Temps forts */}
      <section className="exp-section">
        <header className="exp-section-header">
          <span className="exp-section-eyebrow">Highlights</span>
          <h2 className="exp-section-title">Temps forts du festival</h2>
        </header>

        <div className="exp-grid-highlights">
          <div className="exp-card" style={{ borderColor: 'var(--action)' }}>
            <span className="exp-card-type" style={{ color: 'var(--text)' }}>Installation interactive</span>
            <h3 className="exp-card-title" style={{ color: 'var(--action)' }}>Variable Noise Lab</h3>
            <p className="exp-card-desc">Un laboratoire où les visiteurs modifient une famille typographique variable à travers le bruit, la vitesse et la densité.</p>
            <Link to="/skills/experimental-type/article" style={{ font: 'var(--type-ui)', color: 'var(--action)', textTransform: 'uppercase', textDecoration: 'none' }}>Voir l'installation →</Link>
          </div>
          
          <div className="exp-card">
            <span className="exp-card-type">Campagne affiche</span>
            <h3 className="exp-card-title">Poster Collapse</h3>
            <p className="exp-card-desc">Une série de posters web où le titre se compresse jusqu'à devenir presque architectural.</p>
          </div>

          <div className="exp-card">
            <span className="exp-card-type">Grille de glyphes</span>
            <h3 className="exp-card-title">Glyph Arena</h3>
            <p className="exp-card-desc">Une collection de formes typographiques isolées, utilisées comme matière visuelle.</p>
          </div>

          <div className="exp-card">
            <span className="exp-card-type">Lecture performative</span>
            <h3 className="exp-card-title">Kinetic Reading Room</h3>
            <p className="exp-card-desc">Une salle où les textes bougent lentement, mais les informations principales restent fixes.</p>
          </div>
        </div>
      </section>

      {/* 4. Programme */}
      <section className="exp-section" id="programme">
        <header className="exp-section-header">
          <span className="exp-section-eyebrow">Schedule</span>
          <h2 className="exp-section-title">Programme typographique</h2>
        </header>

        <div style={{ borderTop: '1px solid var(--line)' }}>
          {[
            { date: "17 OCT", time: "10:00", title: "Opening Specimen", type: "conférence", by: "Studio Varnish" },
            { date: "17 OCT", time: "14:30", title: "Poster Collapse", type: "performance", by: "Léa Morvan" },
            { date: "17 OCT", time: "18:00", title: "Letters Under Pressure", type: "talk", by: "Omar Kline" },
            { date: "18 OCT", time: "11:00", title: "Glyph Arena", type: "workshop", by: "Bureau Silex" },
            { date: "18 OCT", time: "15:00", title: "Variable Noise Lab", type: "installation", by: "Collectif Axis", highlight: true },
            { date: "18 OCT", time: "20:30", title: "Kinetic Reading Room", type: "performance", by: "Noura Delmas" },
            { date: "19 OCT", time: "10:30", title: "Distorted Navigation", type: "atelier", by: "Studio Rasp" },
            { date: "19 OCT", time: "16:00", title: "Closing Poster Session", type: "exposition", by: "invités multiples" },
          ].map((item, i) => (
            <div className="exp-index-row" key={i} style={item.highlight ? { color: 'var(--action)' } : {}}>
              <div style={{ font: 'var(--type-mono-sm)' }}>{item.date}</div>
              <div style={{ font: 'var(--type-mono-sm)', color: 'var(--text-muted)' }}>{item.time}</div>
              <div style={{ font: 'var(--type-card)', textTransform: 'uppercase' }}>{item.title}</div>
              <div style={{ color: 'var(--text-muted)' }}>{item.type}</div>
              <div>{item.by}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Specimen */}
      <section className="exp-section">
        <header className="exp-section-header">
          <span className="exp-section-eyebrow">Specimen</span>
          <h2 className="exp-section-title">Base system</h2>
        </header>

        <div className="exp-specimen">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-4)', font: 'var(--type-ui)', color: 'var(--text-muted)', marginBottom: 'var(--s-8)' }}>
            <span>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</span>
            <span>0 1 2 3 4 5 6 7 8 9</span>
            <span>! @ # $ % & * ? //</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)', marginBottom: 'var(--s-8)' }}>
            {['NOISE', 'GLYPH', 'AXIS', 'POSTER', 'SIGNAL', 'VARIABLE'].map(word => (
              <div key={word} className="exp-specimen-word">{word}</div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--line)', paddingTop: 'var(--s-4)', font: 'var(--type-section-sm)', textTransform: 'uppercase' }}>
            A letter becomes a machine when its shape starts to answer back.
          </div>
        </div>
      </section>

      {/* 6. Grille de glyphes */}
      <section className="exp-section" style={{ background: 'var(--surface-muted)' }}>
        <header className="exp-section-header">
          <span className="exp-section-eyebrow">Isolations</span>
          <h2 className="exp-section-title">Glyph Grid</h2>
        </header>

        <div className="exp-glyph-grid">
          {[
            { char: "A", label: "stretch" },
            { char: "G", label: "slice" },
            { char: "R", label: "outline" },
            { char: "%", label: "repeat" },
            { char: "&", label: "compress" },
            { char: "?", label: "overlap" },
            { char: "//", label: "mask" },
            { char: "404", label: "rotate" },
            { char: "→", label: "stretch" },
            { char: "[ ]", label: "slice" },
            { char: "{ }", label: "outline" },
            { char: "00", label: "compress" }
          ].map((item, i) => (
            <div className="exp-glyph-cell" key={i}>
              <span className="exp-glyph-label">{item.label}</span>
              <span className="exp-glyph-char" style={{ transform: item.label === 'rotate' ? 'rotate(90deg)' : 'none', fontWeight: item.label === 'compress' ? '900' : 'normal', WebkitTextStroke: item.label === 'outline' ? '1px var(--text)' : 'none', color: item.label === 'outline' ? 'transparent' : 'inherit' }}>{item.char}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Posters */}
      <section className="exp-section">
        <header className="exp-section-header">
          <span className="exp-section-eyebrow">Visuals</span>
          <h2 className="exp-section-title">Posters du festival</h2>
        </header>

        <div className="exp-poster-grid">
          <div className="exp-poster">
            <div className="exp-poster-bg"><span>PRESSURE</span></div>
            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ font: 'var(--type-mono-xs)', color: 'var(--text-muted)', marginBottom: 'var(--s-2)' }}>17 OCT — POSTER WEB</div>
              <h3 style={{ font: 'var(--type-section)', textTransform: 'uppercase', margin: 0 }}>Letters under pressure</h3>
            </div>
            <div style={{ position: 'relative', zIndex: 10, font: 'var(--type-body)', color: 'var(--text-muted)' }}>
              Une composition où le texte devient bloc de tension.
            </div>
          </div>

          <div className="exp-poster" style={{ borderColor: 'var(--action)' }}>
            <div className="exp-poster-bg"><span style={{ color: 'var(--action)' }}>NOISE</span></div>
            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ font: 'var(--type-mono-xs)', color: 'var(--action)', marginBottom: 'var(--s-2)' }}>18 OCT — INSTALLATION</div>
              <h3 style={{ font: 'var(--type-section)', textTransform: 'uppercase', margin: 0, color: 'var(--action)' }}>Variable Noise Lab</h3>
            </div>
            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ font: 'var(--type-body)', color: 'var(--text-muted)', marginBottom: 'var(--s-4)' }}>
                Une affiche qui annonce l'installation principale du festival.
              </div>
              <Link to="/skills/experimental-type/article" className="exp-button" style={{ width: '100%' }}>Ouvrir le Lab</Link>
            </div>
          </div>

          <div className="exp-poster">
            <div className="exp-poster-bg"><span>GLYPH</span></div>
            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ font: 'var(--type-mono-xs)', color: 'var(--text-muted)', marginBottom: 'var(--s-2)' }}>18 OCT — WORKSHOP</div>
              <h3 style={{ font: 'var(--type-section)', textTransform: 'uppercase', margin: 0 }}>Glyph Arena</h3>
            </div>
            <div style={{ position: 'relative', zIndex: 10, font: 'var(--type-body)', color: 'var(--text-muted)' }}>
              Une affiche construite autour de caractères isolés.
            </div>
          </div>
        </div>
      </section>

      {/* 8. Studios invités */}
      <section className="exp-section">
        <header className="exp-section-header">
          <span className="exp-section-eyebrow">Guests</span>
          <h2 className="exp-section-title">Studios invités</h2>
        </header>

        <div style={{ borderTop: '1px solid var(--line)' }}>
          {[
            { name: "Studio Varnish", city: "Paris", spec: "type specimen", task: "identité culturelle" },
            { name: "Bureau Silex", city: "Bruxelles", spec: "signalétique exp.", task: "workshop" },
            { name: "Collectif Axis", city: "Montréal", spec: "typographie variable", task: "installation" },
            { name: "Studio Rasp", city: "Berlin", spec: "interfaces radicales", task: "atelier interface" },
            { name: "Form Unit", city: "Lausanne", spec: "posters génératifs", task: "exposition" },
            { name: "Atelier Oblique", city: "Lyon", spec: "édition indépendante", task: "talk" },
          ].map((item, i) => (
            <div className="exp-index-row" key={i}>
              <div style={{ font: 'var(--type-card)', textTransform: 'uppercase' }}>{item.name}</div>
              <div style={{ color: 'var(--text-muted)' }}>{item.city}</div>
              <div style={{ font: 'var(--type-mono-sm)' }}>{item.spec}</div>
              <div style={{ font: 'var(--type-mono-sm)', color: 'var(--text-muted)' }}>{item.task}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. CTA */}
      <section className="exp-section" style={{ background: 'var(--action)', color: '#000', textAlign: 'center', paddingBlock: 'var(--s-11)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <span style={{ display: 'block', font: 'var(--type-mono-sm)', textTransform: 'uppercase', marginBottom: 'var(--s-4)', opacity: 0.8 }}>
            Installation principale
          </span>
          <h2 style={{ font: 'var(--type-display)', fontSize: 'clamp(40px, 8vw, 80px)', lineHeight: '0.9', textTransform: 'uppercase', marginBottom: 'var(--s-6)' }}>
            Variable Noise Lab
          </h2>
          <p style={{ font: 'var(--type-body)', fontSize: '1.125rem', marginBottom: 'var(--s-8)', opacity: 0.9 }}>
            Une page dédiée présente le module interactif central du festival : un laboratoire typographique où l'utilisateur manipule les axes d'une lettre variable, teste des mots, observe une grille de glyphes et génère des posters.
          </p>
          <Link to="/skills/experimental-type/article" style={{ display: 'inline-flex', alignItems: 'center', height: '56px', padding: '0 var(--s-8)', background: '#000', color: '#fff', font: 'var(--type-ui)', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 'var(--radius-control)' }}>
            Explorer Variable Noise Lab
          </Link>
        </div>
      </section>

      <footer className="exp-footer">
        <div>© 2026 TYPE//FEST</div>
        <div>Experimental Type Skill Demo</div>
      </footer>
    </div>
  )
}

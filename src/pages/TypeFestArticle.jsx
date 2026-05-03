import React from 'react'
import { Link } from 'react-router-dom'

{/*
<design_plan>
1. Use case: Specialized interactive installation page for TYPE//FEST.
2. Archetype: Experimental Type (Specimen logic + Control Panel).
3. Type job: Interactive variable font showcase, testing limits of legibility.
4. First viewport: Bold hero introducing the lab, metadata grid, return link to festival.
5. System contracts: Heavy use of monospace for controls, distinct accent color for active states.
6. Components: Control panel, dynamic specimen zone, advanced glyph grid, poster generator, data table.
7. Motion: Axis-shifts simulated with font-variation-settings logic, hover effects on glyphs.
8. Risk sweep: The page becoming totally unreadable (kept functional UI elements strict and separate from specimen areas).
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
  --action: #00e5ff;
  --action-strong: #00b3cc;
  --status-critical: #ff3300;
  --status-warning: #ffcc00;
  --status-safe: #00cc66;
  --radius-control: 0px;
  --radius-card: 0px;
  --radius-panel: 0px;
  --font-sans: "Geist", "Inter", system-ui, sans-serif;
  --font-display: "Clash Display", "Space Grotesk", sans-serif;
  --font-mono: "Geist Mono", "JetBrains Mono", monospace;
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

.lab-container {
  background: var(--canvas);
  color: var(--text);
  font-family: var(--font-sans);
  min-height: 100vh;
}

.lab-nav {
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

.lab-nav a {
  color: var(--text);
  text-decoration: none;
}

.lab-nav a:hover {
  color: var(--action);
}

.lab-hero {
  padding: var(--s-11) var(--s-6);
  border-bottom: 1px solid var(--line);
  display: grid;
  gap: var(--s-6);
}

.lab-hero-title {
  font: var(--type-display);
  text-transform: uppercase;
  letter-spacing: var(--track-display);
  margin: 0;
  word-break: break-word;
  hyphens: auto;
}

.lab-hero-subtitle {
  font: var(--type-section-sm);
  color: var(--action);
  max-width: 28ch;
  margin-bottom: var(--s-4);
}

.lab-hero-desc {
  font: var(--type-body);
  max-width: 50ch;
  color: var(--text-muted);
  font-size: 1.125rem;
  line-height: 1.6;
}

.lab-hero-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: var(--s-6);
  border-top: 1px solid var(--line);
  padding-top: var(--s-6);
  margin-top: var(--s-6);
  font: var(--type-mono-xs);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: var(--track-mono-xs);
}

.lab-hero-meta strong {
  display: block;
  color: var(--text);
  font-size: 14px;
  margin-top: 4px;
}

.lab-section {
  padding: var(--s-11) var(--s-6);
  border-bottom: 1px solid var(--line);
}

.lab-section-header {
  margin-bottom: var(--s-9);
}

.lab-section-eyebrow {
  display: block;
  font: var(--type-mono-sm);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: var(--track-mono-sm);
  margin-bottom: var(--s-3);
}

.lab-section-title {
  font: var(--type-section);
  letter-spacing: var(--track-section);
  text-transform: uppercase;
  margin: 0;
  max-width: 24ch;
}

.lab-grid-2 {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--s-8);
}

@media (min-width: 1024px) {
  .lab-grid-2 {
    grid-template-columns: 320px 1fr;
  }
}

.lab-control-panel {
  background: var(--surface);
  border: 1px solid var(--line);
  padding: var(--s-6);
  display: flex;
  flex-direction: column;
  gap: var(--s-6);
}

.lab-control-group {
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
}

.lab-control-label {
  display: flex;
  justify-content: space-between;
  font: var(--type-mono-xs);
  text-transform: uppercase;
  letter-spacing: var(--track-mono-xs);
}

.lab-control-value {
  color: var(--action);
}

.lab-slider {
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  height: 24px;
}

.lab-slider::-webkit-slider-runnable-track {
  width: 100%;
  height: 2px;
  background: var(--line);
}

.lab-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 8px;
  background: var(--action);
  margin-top: -7px;
  cursor: ew-resize;
}

.lab-select-group {
  display: flex;
  gap: 2px;
}

.lab-select-btn {
  flex: 1;
  background: var(--surface-muted);
  border: 1px solid var(--line);
  color: var(--text-muted);
  font: var(--type-mono-xs);
  padding: var(--s-2) 0;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lab-select-btn.active {
  background: var(--action);
  color: #000;
  border-color: var(--action);
}

.lab-specimen-zone {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--line);
  background: var(--surface-muted);
  padding: var(--s-8);
  min-height: 400px;
  overflow: hidden;
  text-align: center;
}

.lab-main-word {
  font: var(--type-display);
  font-size: clamp(60px, 12vw, 240px);
  line-height: 0.85;
  text-transform: uppercase;
  margin: 0 0 var(--s-4) 0;
  transition: transform 0.3s ease, letter-spacing 0.3s ease, font-weight 0.3s ease;
}

.lab-secondary-word {
  font: var(--type-section-sm);
  color: var(--text-muted);
  text-transform: uppercase;
}

.lab-glyph-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}

.lab-glyph-cell {
  background: var(--canvas);
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--s-4);
  transition: background 0.2s ease, color 0.2s ease;
  position: relative;
  overflow: hidden;
}

.lab-glyph-cell:hover {
  background: var(--surface-muted);
}

.lab-glyph-cell:hover .lab-glyph-char {
  transform: scale(1.1) rotate(2deg);
  color: var(--action);
}

.lab-glyph-char {
  font: var(--type-display);
  font-size: clamp(48px, 6vw, 80px);
  line-height: 1;
  text-align: center;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.lab-glyph-status {
  font: var(--type-mono-xs);
  text-transform: uppercase;
  padding: 2px 6px;
  display: inline-block;
  align-self: flex-start;
}

.lab-poster-gen {
  background: var(--surface);
  border: 1px solid var(--line);
  padding: var(--s-8);
  display: grid;
  gap: var(--s-8);
}

@media (min-width: 1024px) {
  .lab-poster-gen {
    grid-template-columns: 1fr 1fr;
  }
}

.lab-input {
  width: 100%;
  background: var(--canvas);
  border: 1px solid var(--line);
  color: var(--text);
  font: var(--type-body);
  padding: var(--s-3) var(--s-4);
  border-radius: var(--radius-control);
  margin-top: var(--s-2);
}

.lab-input:focus {
  outline: none;
  border-color: var(--action);
}

.lab-button {
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
  border: none;
  cursor: pointer;
  border-radius: var(--radius-control);
  transition: transform 0.2s ease, background 0.2s ease;
  width: 100%;
  margin-top: var(--s-4);
}

.lab-button:hover {
  transform: translateY(-2px);
  background: var(--action-strong);
}

.lab-poster-preview {
  background: var(--text);
  color: var(--canvas);
  aspect-ratio: 3/4;
  padding: var(--s-6);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.lab-poster-preview.square {
  aspect-ratio: 1/1;
}

.lab-poster-preview.wide {
  aspect-ratio: 16/9;
}

.lab-table {
  width: 100%;
  border-collapse: collapse;
  font: var(--type-mono-sm);
  text-transform: uppercase;
  letter-spacing: var(--track-mono-sm);
}

.lab-table th {
  text-align: left;
  padding: var(--s-3);
  color: var(--text-muted);
  border-bottom: 1px solid var(--line);
}

.lab-table td {
  padding: var(--s-4) var(--s-3);
  border-bottom: 1px solid var(--line);
  color: var(--text);
}

.lab-table tr:hover td {
  background: var(--surface);
}

.lab-rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--s-6);
}

.lab-rule-card {
  border-top: 1px solid var(--action);
  padding-top: var(--s-4);
}

.lab-rule-num {
  font: var(--type-display);
  font-size: 32px;
  color: var(--action);
  margin-bottom: var(--s-2);
}

.lab-footer {
  padding: var(--s-10) var(--s-6);
  display: flex;
  justify-content: space-between;
  font: var(--type-mono-sm);
  text-transform: uppercase;
  color: var(--text-muted);
}
`

export default function TypeFestArticle() {
  const [controls, setControls] = React.useState({
    width: 100,
    weight: 700,
    noise: 20,
    compression: 0,
    speed: 'static',
    case: 'uppercase',
    posterText: 'VARIABLE NOISE LAB',
    posterFormat: 'vertical'
  })

  const handleSlider = (e) => {
    setControls({ ...controls, [e.target.name]: parseInt(e.target.value) })
  }

  // Calculate dynamic styles based on controls
  const dynamicStyle = {
    fontWeight: controls.weight,
    letterSpacing: `${(controls.width - 100) * 0.1}px`,
    transform: `scaleY(${1 + (controls.compression / 100)}) scaleX(${controls.width / 100})`,
    textTransform: controls.case === 'lowercase' ? 'lowercase' : controls.case === 'uppercase' ? 'uppercase' : 'none',
    filter: controls.noise > 0 ? `blur(${controls.noise / 20}px) contrast(1.5)` : 'none'
  }

  return (
    <div className="lab-container">
      <style dangerouslySetInnerHTML={{ __html: ET_TOKENS }} />

      <nav className="lab-nav">
        <div>
          <Link to="/skills/experimental-type/vitrine">← Retour TYPE//FEST</Link>
        </div>
        <div style={{ display: 'flex', gap: 'var(--s-6)', color: 'var(--action)' }}>
          <span>Lab_Active</span>
          <span>Axis: 07</span>
        </div>
      </nav>

      {/* 1. Hero expérimental */}
      <header className="lab-hero">
        <h1 className="lab-hero-title">
          <span style={{ display: 'block', color: 'var(--action)' }}>VARIABLE</span>
          <span style={{ display: 'block' }}>NOISE LAB</span>
        </h1>
        <p className="lab-hero-subtitle">A playground for unstable letters.</p>
        <p className="lab-hero-desc">
          Une installation interactive où les lettres réagissent aux axes, aux gestes et aux variations de densité. Le visiteur ne regarde pas seulement une typographie : il la pousse, la contraint, la déforme et observe ce qui reste lisible.
        </p>

        <div style={{ display: 'flex', gap: 'var(--s-4)', marginTop: 'var(--s-4)', flexWrap: 'wrap' }}>
          <a href="#lab" className="lab-button" style={{ background: '#fff', color: '#000' }}>Tester les axes ↓</a>
          <a href="#poster" className="lab-button" style={{ background: 'transparent', color: 'var(--text)', border: '1px solid var(--line)' }}>Générer un poster</a>
        </div>

        <div className="lab-hero-meta">
          <div>Contexte <strong>Installation principale</strong></div>
          <div>Date <strong>18 octobre 2026</strong></div>
          <div>Par <strong>Collectif Axis</strong></div>
          <div>Format <strong>Lab interactif</strong></div>
          <div>Lieu <strong>Salle / Module B</strong></div>
        </div>
      </header>

      {/* 2. Panneau & Specimen */}
      <section className="lab-section" id="lab">
        <header className="lab-section-header">
          <span className="lab-section-eyebrow">Interactive Space</span>
          <h2 className="lab-section-title">Axis Controls</h2>
        </header>

        <div className="lab-grid-2">
          {/* Panneau de contrôles */}
          <div className="lab-control-panel">
            <div className="lab-control-group">
              <div className="lab-control-label">
                <span>Width / Largeur</span>
                <span className="lab-control-value">{controls.width}</span>
              </div>
              <input type="range" name="width" min="25" max="150" value={controls.width} onChange={handleSlider} className="lab-slider" />
              <span style={{ font: 'var(--type-mono-xs)', color: 'var(--text-muted)' }}>Contrôle l'extension horizontale</span>
            </div>

            <div className="lab-control-group">
              <div className="lab-control-label">
                <span>Weight / Graisse</span>
                <span className="lab-control-value">{controls.weight}</span>
              </div>
              <input type="range" name="weight" min="100" max="900" step="100" value={controls.weight} onChange={handleSlider} className="lab-slider" />
              <span style={{ font: 'var(--type-mono-xs)', color: 'var(--text-muted)' }}>Densité du fût typographique</span>
            </div>

            <div className="lab-control-group">
              <div className="lab-control-label">
                <span>Noise / Bruit</span>
                <span className="lab-control-value">{controls.noise}</span>
              </div>
              <input type="range" name="noise" min="0" max="100" value={controls.noise} onChange={handleSlider} className="lab-slider" />
              <span style={{ font: 'var(--type-mono-xs)', color: 'var(--text-muted)' }}>Dégradation du signal visuel</span>
            </div>

            <div className="lab-control-group">
              <div className="lab-control-label">
                <span>Compression</span>
                <span className="lab-control-value">{controls.compression}</span>
              </div>
              <input type="range" name="compression" min="0" max="100" value={controls.compression} onChange={handleSlider} className="lab-slider" />
              <span style={{ font: 'var(--type-mono-xs)', color: 'var(--text-muted)' }}>Tension verticale de la lettre</span>
            </div>

            <div className="lab-control-group" style={{ marginTop: 'var(--s-4)' }}>
              <div className="lab-control-label" style={{ marginBottom: 'var(--s-2)' }}>Speed</div>
              <div className="lab-select-group">
                {['static', 'slow', 'fast'].map(val => (
                  <button key={val} className={`lab-select-btn ${controls.speed === val ? 'active' : ''}`} onClick={() => setControls({ ...controls, speed: val })}>
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="lab-control-group">
              <div className="lab-control-label" style={{ marginBottom: 'var(--s-2)' }}>Case</div>
              <div className="lab-select-group">
                {['lowercase', 'mixed', 'uppercase'].map(val => (
                  <button key={val} className={`lab-select-btn ${controls.case === val ? 'active' : ''}`} onClick={() => setControls({ ...controls, case: val })}>
                    {val.substring(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Zone specimen interactive */}
          <div className="lab-specimen-zone">
            <h2 className="lab-main-word" style={dynamicStyle}>DISTORT</h2>
            <p className="lab-secondary-word">The shape changes, the signal remains.</p>
            <div style={{ marginTop: 'var(--s-8)', display: 'flex', gap: 'var(--s-6)', font: 'var(--type-mono-xs)', color: 'var(--text-muted)' }}>
              <span>Signal 024</span>
              <span>Axis 76</span>
              <span>Read before it breaks</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Grille de glyphes */}
      <section className="lab-section">
        <header className="lab-section-header">
          <span className="lab-section-eyebrow">Isolations</span>
          <h2 className="lab-section-title">Glyph Analysis</h2>
        </header>

        <div className="lab-glyph-grid">
          {[
            { char: "A", status: "stable", color: "var(--status-safe)" },
            { char: "B", status: "compressed", color: "var(--status-warning)" },
            { char: "C", status: "stable", color: "var(--status-safe)" },
            { char: "G", status: "noisy", color: "var(--status-critical)" },
            { char: "M", status: "readable", color: "var(--action)" },
            { char: "R", status: "compressed", color: "var(--status-warning)" },
            { char: "S", status: "stable", color: "var(--status-safe)" },
            { char: "X", status: "critical", color: "var(--status-critical)" },
            { char: "0", status: "stable", color: "var(--status-safe)" },
            { char: "1", status: "stable", color: "var(--status-safe)" },
            { char: "2", status: "over-limit", color: "var(--status-critical)" },
            { char: "7", status: "compressed", color: "var(--status-warning)" },
            { char: "%", status: "noisy", color: "var(--status-critical)" },
            { char: "&", status: "readable", color: "var(--action)" },
            { char: "?", status: "stable", color: "var(--status-safe)" },
            { char: "!", status: "stable", color: "var(--status-safe)" },
            { char: "→", status: "compressed", color: "var(--status-warning)" },
            { char: "←", status: "compressed", color: "var(--status-warning)" },
            { char: "/", status: "stable", color: "var(--status-safe)" },
            { char: "[]", status: "noisy", color: "var(--status-critical)" },
            { char: "{}", status: "stable", color: "var(--status-safe)" },
            { char: "404", status: "critical", color: "var(--status-critical)" },
            { char: "202", status: "over-limit", color: "var(--status-critical)" },
            { char: "6", status: "stable", color: "var(--status-safe)" },
          ].map((item, i) => (
            <div className="lab-glyph-cell" key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span style={{ font: 'var(--type-mono-xs)', color: 'var(--text-muted)' }}>ID.{String(i).padStart(3, '0')}</span>
                <span className="lab-glyph-status" style={{ color: item.color, border: `1px solid ${item.color}40` }}>{item.status}</span>
              </div>
              <span className="lab-glyph-char" style={{ 
                fontWeight: item.status === 'compressed' ? 900 : item.status === 'stable' ? 400 : 700,
                transform: item.status === 'compressed' ? 'scaleY(1.5)' : 'none',
                filter: item.status === 'noisy' || item.status === 'critical' ? 'blur(2px)' : 'none',
                opacity: item.status === 'over-limit' ? 0.3 : 1
              }}>{item.char}</span>
              <span style={{ font: 'var(--type-mono-xs)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>val:{Math.floor(Math.random() * 100)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Générateur de poster */}
      <section className="lab-section" id="poster">
        <header className="lab-section-header">
          <span className="lab-section-eyebrow">Generator</span>
          <h2 className="lab-section-title">Poster Factory</h2>
        </header>

        <div className="lab-poster-gen">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
            <div>
              <label style={{ font: 'var(--type-mono-xs)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Texte du poster</label>
              <input type="text" className="lab-input" value={controls.posterText} onChange={(e) => setControls({ ...controls, posterText: e.target.value })} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s-4)' }}>
              <div>
                <label style={{ font: 'var(--type-mono-xs)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Date</label>
                <input type="text" className="lab-input" defaultValue="18 OCT 2026" />
              </div>
              <div>
                <label style={{ font: 'var(--type-mono-xs)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Salle</label>
                <input type="text" className="lab-input" defaultValue="Module B" />
              </div>
            </div>

            <div>
              <label style={{ font: 'var(--type-mono-xs)', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--s-2)', display: 'block' }}>Format</label>
              <div className="lab-select-group">
                {['square', 'vertical', 'wide'].map(val => (
                  <button key={val} className={`lab-select-btn ${controls.posterFormat === val ? 'active' : ''}`} onClick={() => setControls({ ...controls, posterFormat: val })}>
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <button className="lab-button">Generate Poster</button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--surface-muted)', padding: 'var(--s-6)' }}>
            <div className={`lab-poster-preview ${controls.posterFormat}`} style={{ width: controls.posterFormat === 'vertical' ? '60%' : controls.posterFormat === 'square' ? '80%' : '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', font: 'var(--type-mono-xs)' }}>
                <span>18 OCT 2026</span>
                <span>MODULE B</span>
              </div>
              <div style={{ font: 'var(--type-display)', fontSize: controls.posterText.length > 20 ? 'clamp(32px, 4vw, 64px)' : 'clamp(48px, 6vw, 100px)', lineHeight: 0.9, textTransform: 'uppercase', wordBreak: 'break-word', color: 'var(--action)' }}>
                {controls.posterText}
              </div>
              <div style={{ font: 'var(--type-mono-xs)', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 'var(--s-2)' }}>
                TYPE//FEST VOL.04
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Index des variations */}
      <section className="lab-section">
        <header className="lab-section-header">
          <span className="lab-section-eyebrow">Data</span>
          <h2 className="lab-section-title">Index des variations</h2>
        </header>

        <div style={{ overflowX: 'auto' }}>
          <table className="lab-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Variation</th>
                <th>Width</th>
                <th>Weight</th>
                <th>Noise</th>
                <th>Statut</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "AX-01", var: "Stable Reader", w: 100, wght: 400, n: 0, status: "readable", color: "var(--status-safe)", use: "texte" },
                { id: "AX-02", var: "Soft Pressure", w: 80, wght: 600, n: 12, status: "readable", color: "var(--status-safe)", use: "sous-titre" },
                { id: "AX-03", var: "Poster Block", w: 120, wght: 900, n: 20, status: "expressive", color: "var(--action)", use: "hero" },
                { id: "AX-04", var: "Compressed Signal", w: 45, wght: 700, n: 18, status: "critical", color: "var(--status-critical)", use: "affiche" },
                { id: "AX-05", var: "Noise Cut", w: 90, wght: 500, n: 64, status: "unstable", color: "var(--status-warning)", use: "expérimentation" },
                { id: "AX-06", var: "Overload", w: 35, wght: 900, n: 92, status: "over-limit", color: "var(--status-critical)", use: "non recommandé" },
                { id: "AX-07", var: "Wide Echo", w: 150, wght: 300, n: 24, status: "expressive", color: "var(--action)", use: "bannière" },
                { id: "AX-08", var: "Dense Caption", w: 70, wght: 400, n: 8, status: "readable", color: "var(--status-safe)", use: "légende" },
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--text-muted)' }}>{row.id}</td>
                  <td>{row.var}</td>
                  <td>{row.w}</td>
                  <td>{row.wght}</td>
                  <td>{row.n}</td>
                  <td style={{ color: row.color }}>{row.status}</td>
                  <td>{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Règles de lisibilité */}
      <section className="lab-section" style={{ background: 'var(--surface-muted)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <header className="lab-section-header" style={{ textAlign: 'center' }}>
            <span className="lab-section-eyebrow">Guidelines</span>
            <h2 className="lab-section-title" style={{ margin: '0 auto' }}>How far can a letter break before it stops working?</h2>
            <p style={{ font: 'var(--type-body)', marginTop: 'var(--s-4)', color: 'var(--text-muted)' }}>
              L'installation ne cherche pas seulement à déformer les lettres, mais à trouver la limite entre expression et compréhension.
            </p>
          </header>

          <div className="lab-rules-grid">
            <div className="lab-rule-card">
              <div className="lab-rule-num">01</div>
              <h4 style={{ font: 'var(--type-card)', marginBottom: 'var(--s-2)' }}>Lisibilité essentielle</h4>
              <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)' }}>Le texte essentiel reste toujours lisible. Les effets extrêmes sont réservés aux titres, glyphes ou posters.</p>
            </div>
            <div className="lab-rule-card">
              <div className="lab-rule-num">02</div>
              <h4 style={{ font: 'var(--type-card)', marginBottom: 'var(--s-2)' }}>Simplicité UI</h4>
              <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)' }}>Les CTAs et informations pratiques restent simples. Une seule règle expérimentale domine l'écran.</p>
            </div>
            <div className="lab-rule-card">
              <div className="lab-rule-num">03</div>
              <h4 style={{ font: 'var(--type-card)', marginBottom: 'var(--s-2)' }}>Retours alternatifs</h4>
              <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)' }}>Les longues chaînes utilisent des retours alternatifs et une largeur contrôlée pour éviter l'overflow.</p>
            </div>
            <div className="lab-rule-card">
              <div className="lab-rule-num">04</div>
              <h4 style={{ font: 'var(--type-card)', marginBottom: 'var(--s-2)' }}>États critiques</h4>
              <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)' }}>Les états critiques préviennent quand une variation devient trop instable pour l'œil humain.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Exemples d'usage */}
      <section className="lab-section">
        <header className="lab-section-header">
          <span className="lab-section-eyebrow">Applications</span>
          <h2 className="lab-section-title">Exemples d'usage</h2>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--s-6)' }}>
          {[
            { title: "Campaign title", desc: "Pour créer un titre de campagne culturel très mémorable." },
            { title: "Studio identity", desc: "Pour donner à un studio créatif une présence radicale sans perdre sa navigation." },
            { title: "Interactive poster", desc: "Pour générer une affiche web qui réagit à l'utilisateur." },
            { title: "Type specimen", desc: "Pour présenter une police variable, ses axes, ses limites et ses glyphes." },
          ].map((item, i) => (
            <div key={i} style={{ border: '1px solid var(--line)', padding: 'var(--s-6)' }}>
              <h3 style={{ font: 'var(--type-section-sm)', marginBottom: 'var(--s-3)', color: 'var(--action)' }}>{item.title}</h3>
              <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)', margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Navigation de fin */}
      <nav className="lab-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--s-4)', borderBottom: 'none' }}>
        <Link to="/skills/experimental-type/vitrine" className="lab-button" style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--line)' }}>Retour à TYPE//FEST</Link>
        <Link to="/skills/experimental-type/vitrine#programme" className="lab-button" style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--line)' }}>Voir le programme</Link>
        <Link to="/skills/experimental-type/vitrine" className="lab-button" style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--line)' }}>Explorer Glyph Arena</Link>
        <a href="#poster" className="lab-button">Générer un poster ↑</a>
      </nav>

      <footer className="lab-footer" style={{ borderTop: '1px solid var(--line)' }}>
        <div>© 2026 TYPE//FEST MODULE</div>
        <div>Experimental Type Skill Demo</div>
      </footer>
    </div>
  )
}

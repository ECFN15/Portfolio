import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Footer, NOVAHAUS_CSS, SectionHeader } from './NovahausVitrine.jsx'

const useCases = [
  {
    name: 'Bureau premium',
    priorities: ['acoustique', 'lumiere', 'rangements', 'connexion reseau'],
    recommendation: ['grande baie', 'bureau lineaire', 'rangement pleine hauteur', 'chauffage integre'],
  },
  {
    name: 'Studio invite',
    priorities: ['couchage', 'salle d eau', 'kitchenette', 'intimite'],
    recommendation: ['zone technique complete', 'lit escamotable', 'rideau occultant', 'terrasse basse'],
  },
  {
    name: 'Atelier creatif',
    priorities: ['plan de travail', 'lumiere naturelle', 'sol resistant', 'mur d accrochage'],
    recommendation: ['ouverture laterale', 'table centrale', 'rangements bas', 'eclairage renforce'],
  },
  {
    name: 'Salle de soin',
    priorities: ['calme', 'acces independant', 'hygiene', 'attente courte'],
    recommendation: ['entree directe', 'point d eau', 'sol facile a nettoyer', 'rangement discret'],
  },
  {
    name: 'Micro-showroom',
    priorities: ['mise en scene produit', 'circulation', 'eclairage', 'facade visible'],
    recommendation: ['vitrine pleine largeur', 'rails lumineux', 'mur d exposition', 'stockage arriere'],
  },
]

const options = [
  { id: 'kitchenette', name: 'Kitchenette', price: 3800, state: 'recommended', impact: 'Transforme le module en studio autonome.' },
  { id: 'bathroom', name: 'Salle d eau', price: 6900, state: 'premium', impact: 'Permet un usage invite ou professionnel prolonge.' },
  { id: 'terrace', name: 'Terrasse basse', price: 2400, state: 'selected', impact: 'Prolonge le rectangle habitable vers l exterieur.' },
  { id: 'wide-window', name: 'Baie vitree pleine largeur', price: 4200, state: 'selected', impact: 'Augmente la lumiere et l effet d ouverture.' },
  { id: 'storage', name: 'Rangements integres', price: 1900, state: 'selected', impact: 'Garde le volume principal libre.' },
  { id: 'insulation', name: 'Isolation renforcee', price: 3200, state: 'included', impact: 'Ameliore le confort annuel et l acoustique.' },
]

const variants = [
  ['N-24 Work', 'Bureau premium', 'grande baie, rangements, isolation renforcee, reseau integre', 'a partir de 62 000 EUR'],
  ['N-24 Guest', 'Studio invite', 'kitchenette, salle d eau, couchage, terrasse', 'a partir de 74 000 EUR'],
  ['N-24 Studio', 'Atelier creatif', 'plan de travail, sol renforce, eclairage, mur d accrochage', 'a partir de 65 000 EUR'],
]

const details = [
  ['Facade sud', 'La facade principale concentre lumiere, acces et prolongement vers la terrasse.', 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80'],
  ['Structure bois', 'L ossature bois permet un chantier plus court et une lecture constructive claire.', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80'],
  ['Zone technique', 'La zone technique regroupe les fonctions humides pour preserver le volume principal.', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80'],
  ['Rangement pleine hauteur', 'Les rangements utilisent la hauteur plutot que la surface au sol.', 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80'],
  ['Terrasse basse', 'Une extension exterieure simple qui respecte le ratio du module.', 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=900&q=80'],
  ['Detail d angle', 'Les angles et raccords rendent visible la precision du systeme.', 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=80'],
]

const MODULE_CSS = `
.nh-product-hero {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--nh-s-4);
  min-height: calc(100svh - 72px);
  padding-top: var(--nh-s-6);
  padding-bottom: var(--nh-s-8);
}

.nh-product-copy {
  grid-column: 1 / span 5;
  display: flex;
  flex-direction: column;
  justify-content: end;
  border: 1px solid var(--nh-line);
  background: var(--nh-ink);
  color: var(--nh-surface);
  padding: clamp(24px, 4vw, 56px);
}

.nh-product-copy .nh-lead {
  color: rgba(255,253,247,.72);
}

.nh-product-board {
  grid-column: 6 / span 7;
  min-height: 620px;
  display: grid;
  grid-template-columns: 1.2fr 4.8fr 2fr;
  grid-template-rows: 1fr 90px;
  gap: var(--nh-s-3);
  border: 1px solid var(--nh-line);
  background:
    linear-gradient(to right, rgba(17,17,17,.12) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(17,17,17,.12) 1px, transparent 1px),
    var(--nh-surface-muted);
  background-size: 44px 44px;
  padding: var(--nh-s-5);
}

.nh-board-zone {
  border: 2px solid var(--nh-line);
  background: rgba(255,253,247,.74);
  padding: var(--nh-s-4);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.nh-board-terrace {
  grid-column: 1 / -1;
  border: 2px dashed var(--nh-action);
  background: color-mix(in srgb, var(--nh-clay), transparent 45%);
  padding: var(--nh-s-3);
  font: var(--nh-type-mono-sm);
  letter-spacing: .12em;
  text-transform: uppercase;
}

.nh-axis {
  position: absolute;
  color: var(--nh-muted);
  font: var(--nh-type-mono-xs);
  letter-spacing: .14em;
  text-transform: uppercase;
}

.nh-config-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: var(--nh-s-4);
}

.nh-use-tabs {
  display: grid;
  gap: var(--nh-s-2);
}

.nh-use-tab,
.nh-option-card button {
  width: 100%;
  min-height: 54px;
  border: 1px solid var(--nh-line);
  border-radius: 0;
  background: var(--nh-surface);
  color: var(--nh-ink);
  cursor: pointer;
  font: var(--nh-type-ui);
  letter-spacing: .06em;
  padding: var(--nh-s-3) var(--nh-s-4);
  text-align: left;
  text-transform: uppercase;
}

.nh-use-tab[data-active="true"],
.nh-option-card[data-selected="true"] {
  background: var(--nh-ink);
  color: var(--nh-surface);
}

.nh-config-panel {
  border: 1px solid var(--nh-line);
  background: var(--nh-surface);
  padding: clamp(24px, 4vw, 44px);
}

.nh-list-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--nh-s-3);
  margin-top: var(--nh-s-5);
}

.nh-list-grid span {
  border: 1px solid var(--nh-line);
  background: var(--nh-surface-muted);
  padding: var(--nh-s-3);
  font: var(--nh-type-body-sm);
}

.nh-option-card {
  grid-column: span 4;
  min-height: 250px;
  padding: var(--nh-s-5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.nh-status {
  display: inline-flex;
  width: max-content;
  border: 1px solid currentColor;
  padding: var(--nh-s-1) var(--nh-s-2);
  font: var(--nh-type-mono-xs);
  letter-spacing: .12em;
  text-transform: uppercase;
}

.nh-status[data-state="recommended"] { color: var(--nh-action); background: #ecfdf5; }
.nh-status[data-state="premium"] { color: var(--nh-blue); background: #eef4ff; }
.nh-status[data-state="included"] { color: #047857; background: #ecfdf5; }
.nh-status[data-state="incompatible"] { color: #b91c1c; background: #fff1f2; }
.nh-status[data-state="selected"] { color: var(--nh-ink); background: var(--nh-clay); }

.nh-estimation {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: var(--nh-s-4);
}

.nh-estimation-panel {
  border: 1px solid var(--nh-line);
  background: var(--nh-ink);
  color: var(--nh-surface);
  padding: clamp(24px, 4vw, 48px);
}

.nh-price-line {
  display: flex;
  justify-content: space-between;
  gap: var(--nh-s-4);
  border-bottom: 1px solid rgba(255,255,255,.18);
  padding: var(--nh-s-3) 0;
}

.nh-total {
  margin: var(--nh-s-7) 0;
  font: 760 clamp(42px, 6vw, 74px)/.9 var(--nh-font-display);
  letter-spacing: -.04em;
}

.nh-state-board {
  border: 1px solid var(--nh-line);
  background: var(--nh-surface);
  padding: var(--nh-s-5);
}

.nh-state-board ul {
  columns: 2;
  margin: var(--nh-s-5) 0 0;
  padding-left: var(--nh-s-5);
  color: var(--nh-muted);
  font: var(--nh-type-body-sm);
}

.nh-variant {
  grid-column: span 4;
  min-height: 300px;
  padding: var(--nh-s-5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.nh-variant[data-active="true"] {
  background: var(--nh-clay);
}

.nh-constraints {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: var(--nh-s-2);
}

.nh-constraint {
  min-height: 170px;
  border: 1px solid var(--nh-line);
  background: var(--nh-surface);
  padding: var(--nh-s-3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.nh-bottom-nav {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--nh-s-3);
}

.nh-bottom-nav a {
  min-height: 130px;
  display: flex;
  align-items: end;
  border: 1px solid var(--nh-line);
  background: var(--nh-surface);
  color: var(--nh-ink);
  font: var(--nh-type-card);
  padding: var(--nh-s-4);
  text-decoration: none;
}

.nh-bottom-nav a:hover {
  background: var(--nh-ink);
  color: var(--nh-surface);
}

@media (max-width: 920px) {
  .nh-product-hero,
  .nh-config-grid,
  .nh-estimation,
  .nh-bottom-nav {
    grid-template-columns: 1fr;
  }

  .nh-product-copy,
  .nh-product-board {
    grid-column: 1;
  }

  .nh-product-board {
    min-height: 440px;
    overflow-x: auto;
  }

  .nh-option-card,
  .nh-variant {
    grid-column: span 12;
  }

  .nh-constraints {
    grid-template-columns: 1fr;
  }

  .nh-state-board ul {
    columns: 1;
  }
}
`

export default function NovahausModule() {
  const [activeUse, setActiveUse] = useState(useCases[0])
  const [selectedOptions, setSelectedOptions] = useState(['terrace', 'storage', 'wide-window'])
  const [saved, setSaved] = useState(false)

  const selected = options.filter((option) => selectedOptions.includes(option.id))
  const total = useMemo(() => 58000 + selected.reduce((sum, option) => sum + option.price, 0), [selected])

  const toggleOption = (id) => {
    if (id === 'insulation') return
    setSelectedOptions((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const formattedTotal = new Intl.NumberFormat('fr-FR').format(total)

  return (
    <div className="nh-page">
      <style dangerouslySetInnerHTML={{ __html: NOVAHAUS_CSS + MODULE_CSS }} />

      <nav className="nh-nav">
        <Link to="/novahaus" className="nh-mark">NOVAHAUS / N-24</Link>
        <div className="nh-nav-links" aria-label="Navigation Module N-24">
          <a href="#plan">Plan</a>
          <a href="#configurer">Configurer</a>
          <a href="#estimation">Estimation</a>
          <a href="#comparatif">Variantes</a>
        </div>
        <Link to="/novahaus" className="nh-button secondary">Retour à NOVAHAUS</Link>
      </nav>

      <header className="nh-shell nh-product-hero">
        <div className="nh-product-copy">
          <span className="nh-coordinate" style={{ color: 'rgba(255,255,255,.68)' }}>Produit / Module signature</span>
          <h1 className="nh-display-title" style={{ color: 'var(--nh-surface)' }}>Module N-24</h1>
          <p className="nh-lead">24 m2. Un rectangle simple. Plusieurs vies possibles.</p>
          <p>Le N-24 est le module signature de NOVAHAUS : assez compact pour rester maitrisable, assez genereux pour accueillir un vrai usage quotidien.</p>
          <div className="nh-actions">
            <a href="#configurer" className="nh-button" style={{ background: 'var(--nh-surface)', color: 'var(--nh-ink)' }}>Configurer le module</a>
            <a href="#plan" className="nh-button secondary" style={{ color: 'var(--nh-surface)', borderColor: 'var(--nh-surface)' }}>Voir le plan</a>
            <a href="#estimation" className="nh-button secondary" style={{ color: 'var(--nh-surface)', borderColor: 'var(--nh-surface)' }}>Demander une estimation</a>
          </div>
        </div>

        <div className="nh-product-board" id="plan" aria-label="Plan de base du module N-24">
          <div className="nh-board-zone">
            <span className="nh-coordinate">Zone A</span>
            <strong>Entree / rangement</strong>
            <span>1,2 m x 3 m</span>
          </div>
          <div className="nh-board-zone">
            <span className="nh-coordinate">Zone B</span>
            <strong>Espace principal</strong>
            <span>4,8 m x 3 m</span>
          </div>
          <div className="nh-board-zone">
            <span className="nh-coordinate">Zone C</span>
            <strong>Zone technique</strong>
            <span>2 m x 3 m</span>
          </div>
          <div className="nh-board-terrace">Option terrasse : 8 m x 1,8 m / facade principale sud / baie vitree 2,4 m</div>
        </div>
      </header>

      <main>
        <section className="nh-shell nh-section">
          <SectionHeader index="A01" title="Plan de base">
            Le module est presente comme un rectangle de 8 m x 3 m. Axe X : longueur 8 m. Axe Y : largeur 3 m. Orientation : facade principale sud.
          </SectionHeader>
          <div className="nh-meta-grid">
            {[
              ['Surface', '24 m2'],
              ['Dimensions', '8 m x 3 m'],
              ['Hauteur', '2,45 m'],
              ['Structure', 'Ossature bois'],
              ['Isolation', '4 saisons'],
              ['Installation', '6 a 10 semaines'],
            ].map(([label, value]) => (
              <div className="nh-meta-cell" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section id="configurer" className="nh-shell nh-section">
          <SectionHeader index="B02" title="Configurateur d usage">
            La grille devient un outil de decision : chaque usage active des priorites et une configuration recommandee.
          </SectionHeader>
          <div className="nh-config-grid">
            <div className="nh-use-tabs" role="tablist" aria-label="Choisir un usage">
              {useCases.map((useCase) => (
                <button
                  className="nh-use-tab"
                  data-active={activeUse.name === useCase.name}
                  key={useCase.name}
                  onClick={() => setActiveUse(useCase)}
                  type="button"
                >
                  {useCase.name}
                </button>
              ))}
            </div>
            <div className="nh-config-panel">
              <span className="nh-coordinate">usage actif</span>
              <h3 className="nh-display-title" style={{ fontSize: 'clamp(34px, 5vw, 62px)' }}>{activeUse.name}</h3>
              <div className="nh-list-grid">
                {activeUse.priorities.map((priority) => <span key={priority}>Priorite / {priority}</span>)}
                {activeUse.recommendation.map((item) => <span key={item}>Reco / {item}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="nh-shell nh-section">
          <SectionHeader index="C03" title="Options modulaires">
            Les options conservent des etats visibles : selectionnee, recommandee, premium ou incluse. Le clic met a jour l estimation.
          </SectionHeader>
          <div className="nh-options-grid">
            {options.map((option) => {
              const isSelected = selectedOptions.includes(option.id) || option.state === 'included'
              const state = option.state === 'selected' && !selectedOptions.includes(option.id) ? 'neutral' : option.state
              return (
                <article className="nh-option-card" data-selected={isSelected} key={option.id}>
                  <div>
                    <span className="nh-status" data-state={isSelected && option.state !== 'included' ? 'selected' : state}>{option.state}</span>
                    <h3 className="nh-card-title" style={{ fontSize: 28 }}>{option.name}</h3>
                    <p>{option.impact}</p>
                  </div>
                  <div>
                    <strong>a partir de {new Intl.NumberFormat('fr-FR').format(option.price)} EUR</strong>
                    <button type="button" onClick={() => toggleOption(option.id)} disabled={option.id === 'insulation'}>
                      {option.id === 'insulation' ? 'Incluse' : isSelected ? 'Retirer l option' : 'Ajouter l option'}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="estimation" className="nh-shell nh-section">
          <SectionHeader index="D04" title="Estimation en direct">
            Le chiffrage reste volontairement visible : base, options, total, delai et niveau de complexite.
          </SectionHeader>
          <div className="nh-estimation">
            <div className="nh-estimation-panel">
              <span className="nh-coordinate" style={{ color: 'rgba(255,255,255,.68)' }}>Base Module N-24</span>
              <div className="nh-price-line"><span>Base Module N-24</span><strong>58 000 EUR</strong></div>
              {selected.map((option) => (
                <div className="nh-price-line" key={option.id}>
                  <span>{option.name}</span>
                  <strong>+{new Intl.NumberFormat('fr-FR').format(option.price)} EUR</strong>
                </div>
              ))}
              <div className="nh-total">{formattedTotal} EUR</div>
              <div className="nh-price-line"><span>Delai estime</span><strong>8 semaines</strong></div>
              <div className="nh-price-line"><span>Niveau de complexite</span><strong>moyen</strong></div>
              <p style={{ color: 'rgba(255,255,255,.64)' }}>Les raccordements, fondations et demarches administratives peuvent modifier l estimation.</p>
              <div className="nh-actions">
                <button className="nh-button" style={{ background: 'var(--nh-surface)', color: 'var(--nh-ink)' }} type="button">Demander un devis detaille</button>
                <button className="nh-button secondary" style={{ color: 'var(--nh-surface)', borderColor: 'var(--nh-surface)' }} type="button">Telecharger la fiche PDF</button>
                <button className="nh-button secondary" style={{ color: 'var(--nh-surface)', borderColor: 'var(--nh-surface)' }} onClick={() => setSaved(true)} type="button">
                  {saved ? 'Configuration sauvegardee' : 'Sauvegarder cette configuration'}
                </button>
              </div>
            </div>
            <div className="nh-state-board">
              <span className="nh-coordinate">Etats anticipes</span>
              <h3 className="nh-card-title">Interface robuste</h3>
              <ul>
                <li>aucune option selectionnee</li>
                <li>option selectionnee</li>
                <li>option incompatible</li>
                <li>budget depasse</li>
                <li>configuration sauvegardee</li>
                <li>estimation non disponible</li>
                <li>demande de devis envoyee</li>
                <li>plan affiche ou masque</li>
                <li>comparaison active</li>
                <li>vue mobile du plan</li>
                <li>galerie sans image</li>
                <li>formulaire incomplet</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="comparatif" className="nh-shell nh-section">
          <SectionHeader index="E05" title="Comparatif de variantes">
            Trois variantes du N-24, construites avec la meme base mais des priorites differentes.
          </SectionHeader>
          <div className="nh-variants-grid">
            {variants.map(([name, usage, includes, price], index) => (
              <article className="nh-variant" data-active={index === 1} key={name}>
                <span className="nh-coordinate">{usage}</span>
                <h3 className="nh-card-title">{name}</h3>
                <p>{includes}</p>
                <strong>{price}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="nh-shell nh-section">
          <SectionHeader index="F06" title="Galerie technique">
            Les images servent a comprendre le produit : facade, structure, zone technique, rangement, terrasse et precision d angle.
          </SectionHeader>
          <div className="nh-gallery-grid">
            {details.map(([title, caption, image]) => (
              <figure className="nh-gallery-card" key={title}>
                <div className="nh-gallery-media">
                  <img src={image} alt={title} />
                </div>
                <figcaption>
                  <span className="nh-coordinate">detail</span>
                  <h3 className="nh-card-title" style={{ fontSize: 26 }}>{title}</h3>
                  <p>{caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="nh-shell nh-section">
          <SectionHeader index="G07" title="Contraintes et demarches">
            Une page produit credible explique aussi ce qui peut ralentir, modifier ou cadrer le projet avant le devis final.
          </SectionHeader>
          <div className="nh-constraints">
            {[
              'etude d acces au terrain',
              'verification des regles locales d urbanisme',
              'choix du type de fondations',
              'raccordements electriques et eau si necessaire',
              'preparation du sol',
              'livraison et grutage selon acces',
              'validation du calendrier',
            ].map((item, index) => (
              <div className="nh-constraint" key={item}>
                <span className="nh-coordinate">{String(index + 1).padStart(2, '0')}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="nh-shell nh-section">
          <div className="nh-bottom-nav">
            <Link to="/novahaus">Retour à NOVAHAUS</Link>
            <Link to="/novahaus#modules">Comparer les modules</Link>
            <Link to="/novahaus#realisations">Voir les realisations</Link>
            <a href="#estimation">Demander une estimation</a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

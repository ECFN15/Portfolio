# Atelier — Portfolio

Portfolio personnel inspiré d'Awwwards (style Detroit/Paris). Sites projets cinématiques avec scroll storytelling, animations GSAP, layout bento asymétrique et typographie éditoriale.

## Stack

- **Vite** + **React 18** + **React Router 6**
- **Tailwind CSS** (configuration sur-mesure : couleurs ink/bone, easing custom, mesh gradients)
- **GSAP** + `@gsap/react` + `ScrollTrigger`
- Police **Geist** (Google Fonts)
- Hébergement **Firebase Hosting** (config incluse)

## Démarrage

```bash
npm install
npm run dev
```

Ouvre <http://localhost:5173>.

## Structure

```
src/
├── main.jsx                 # Entry point + Router
├── App.jsx                  # Routes (/ et /projects/:slug)
├── index.css                # Tailwind + utilitaires (grain, mesh, h-display)
├── data/projects.js         # Catalogue des projets (à remplacer par tes vrais projets)
├── components/
│   ├── Navbar.jsx           # Floating glass pill, hamburger morphing
│   ├── Hero.jsx             # Cinematic Center + scroll parallax
│   ├── Marquee.jsx          # Bandeau infini disciplines
│   ├── ProjectsShowcase.jsx # Bento gapless 12 colonnes
│   ├── Pricing.jsx          # 3 paliers, Double-Bezel
│   └── Footer.jsx           # CTA massif + colonnes liens
└── pages/
    ├── Home.jsx             # AIDA : Hero → Marquee → Showcase → Pricing → Footer
    └── ProjectDetail.jsx    # Style Detroit/Paris : pinned scroll, scrubbing, gallery
```

## Personnalisation

### Remplacer les projets

Édite `src/data/projects.js`. Chaque projet contient :

- `slug` — utilisé dans l'URL `/projects/:slug`
- `title`, `studio`, `year`, `role`, `discipline`, `summary`, `quote`
- `cover` — image principale (1920×1200 conseillé)
- `accent` — image inline dans la typo (900×1200 conseillé)
- `gallery` — 6 images pour la galerie pinned (1600×2000+ conseillé)
- `services`, `awards`, `tech` — listes pour la section crédits
- `nextSlug` — slug du projet "suivant" en bas de page

### Couleurs / typographie

- Couleurs : `tailwind.config.js` (palette `ink` / `bone`)
- Polices : import dans `index.html` + `tailwind.config.js`
- Spacing & easing : `tailwind.config.js` extensions

## Build & déploiement Firebase

```bash
# Build de prod
npm run build

# Première fois — installe Firebase CLI globalement
npm install -g firebase-tools

# Login + initialisation (génère .firebaserc)
firebase login
firebase use --add   # sélectionne ton projet Firebase

# Déploiement
firebase deploy --only hosting
```

`firebase.json` est déjà configuré :

- `public: dist` — le dossier de build de Vite
- Rewrite SPA : toutes les routes redirigent vers `/index.html`
- Cache long pour assets statiques

## Notes design

Les choix de design suivent deux skills internes :

- **gpt-taste** — architecture AIDA, bento gapless `grid-flow-dense`, GSAP avancé (pinning, scrubbing), typographie éditoriale, anti-Inter
- **high-end-visual-design** — Double-Bezel (carte enveloppe + cœur), boutons "button-in-button", easing `cubic-bezier(0.32, 0.72, 0, 1)`, grain overlay fixe

Les images viennent de `picsum.photos` avec des seeds — remplace-les par tes vrais screenshots quand tes sites seront prêts.

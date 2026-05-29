import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProjectImageOverrides } from '../data/projectImageOverrides.js'
import './Featured.css'

const projects = [
  {
    slug: 'secondvie',
    grade: 'gold',
    year: '2026',
    label: 'ECOMMERCE SSR',
    labelSub: 'NEXT.JS + FIREBASE',
    category: 'MARKETPLACE · MOBILIER RESTAURÉ',
    title: ['Second', 'Vie'],
    director: 'Architecture Next.js, SEO, performance',
    type: 'E-commerce complet',
    bg: '/featured/secondvie-gallery.webp',
    captures: ['/featured/secondvie-hero.webp', '/featured/secondvie-product.png', '/featured/secondvie-gallery.webp'],
    proofs: [
      { stat: 'SSR', label: 'Pages produit indexables', quote: 'Catalogue, catégorie, détail' },
      { stat: 'Mobile', label: 'Scroll critique testé', quote: 'Galerie + fiche produit' },
      { stat: 'Ops', label: 'Backoffice complet', quote: 'Commandes, SEO, analytics' },
    ],
    desc:
      'Marketplace pour meubles restaurés avec galerie immersive, pages produit SSR, devis, wishlist, checkout Stripe, espace client et backoffice exploitable.',
    features: [
      'Pages catégorie et produit côté serveur avec canonical, sitemap et JSON-LD.',
      'Galerie marketplace optimisée mobile avec reveal progressif et préchauffe image.',
      'Backoffice pour catalogue, commandes, analytics, SEO, utilisateurs et maintenance.',
      'Tunnel panier, devis, paiement Stripe et espace client connecté à Firebase.',
    ],
    stats: { front: 'Next.js', data: 'Firebase', pay: 'Stripe', seo: 'SSR + JSON-LD', admin: 'Dashboard', media: 'GSAP' },
  },
  {
    slug: 'tous-a-table',
    grade: 'amber',
    year: '2026',
    label: 'COMMERCE LOCAL',
    labelSub: 'VITE + FIREBASE',
    category: 'MEUBLES · PLANCHES · COMPTOIR',
    title: ['Tous', 'à Table'],
    director: 'Frontend React, SEO, catalogue, paiement',
    type: 'Marketplace bois',
    bg: '/featured/tousatable-buffet.webp',
    captures: ['/featured/tousatable-buffet.webp', '/featured/tousatable-planches.webp', '/featured/tousatable-admin.png'],
    proofs: [
      { stat: 'SEO', label: 'Routes et contenus locaux', quote: 'Ifs, Caen, Normandie' },
      { stat: 'Shop', label: 'Marketplace + Comptoir', quote: 'Meubles, planches, produits' },
      { stat: 'Data', label: 'Analytics admin bornés', quote: 'Suivi sans exploser Firebase' },
    ],
    desc:
      'Plateforme commerciale pour meubles anciens, planches et produits de comptoir, avec catalogue public caché, SEO local, checkout et administration.',
    features: [
      'Catalogue public caché via Functions pour limiter les lectures Firestore.',
      'SEO structuré avec routes propres, sitemap, canonicals et schémas JSON-LD.',
      'Backoffice admin produits, commandes, analytics, SEO, paiements et contenu.',
      'Parcours client avec panier, fiche détail, checkout Stripe et suivi commande.',
    ],
    stats: { front: 'React', data: 'Firebase', pay: 'Stripe', seo: 'SEO local', admin: 'Analytics', media: 'Framer' },
  },
  {
    slug: 'vibefx',
    grade: 'violet',
    year: '2026',
    label: 'SOCIAL STUDIO',
    labelSub: 'META OAUTH',
    category: 'SAAS · CRÉATION VISUELLE',
    title: ['Vibe', 'FX'],
    director: 'Produit SaaS, canvas, OAuth sécurisé',
    type: 'Studio publication',
    bg: '/featured/vibefx-pipeline.png',
    captures: ['/featured/vibefx-studio.png', '/featured/vibefx-pipeline.png', '/featured/vibefx-astronaut.png'],
    proofs: [
      { stat: 'Canvas', label: 'Formats sociaux', quote: '4:5, 9:16, previews' },
      { stat: 'Meta', label: 'OAuth côté serveur', quote: 'Instagram + Facebook' },
      { stat: 'SEO', label: 'Pages publiques', quote: 'Landing, templates, ressources' },
    ],
    desc:
      'Application SaaS pour créer des visuels sociaux, préparer captions et brouillons, puis publier vers Instagram et Facebook avec un pipeline Meta OAuth.',
    features: [
      'Éditeur d’images avec formats post, story, textes, arrière-plans et filtres.',
      'Brouillons de publication liés à un utilisateur Firebase avec statut et hashtags.',
      'Connexion Meta OAuth côté serveur avec tokens chiffrés dans Firebase Functions.',
      'Pages SEO indexables pour landing, templates, ressources Meta et tarifs.',
    ],
    stats: { front: 'Next.js', data: 'Firebase', pay: 'Billing', seo: 'App Router', admin: 'Backoffice', media: 'Canvas' },
  },
  {
    slug: 'jardin-de-chawi',
    grade: 'green',
    year: '2026',
    label: 'SITE MÉTIER',
    labelSub: 'PAYSAGISME + MARCHÉ',
    category: 'LOCAL · DEVIS · BACKOFFICE',
    title: ['Jardin', 'de Chawi'],
    director: 'Produit, front React, contenu, admin',
    type: 'Site pro local',
    bg: '/featured/chawi-hero.jpg',
    captures: ['/featured/chawi-hero.jpg', '/featured/chawi-market.png', '/featured/chawi-prestations.png'],
    proofs: [
      { stat: 'Local', label: 'Pages métier', quote: 'Prestations, réalisations' },
      { stat: 'Admin', label: 'Gestion opérationnelle', quote: 'Contenus, marché, retraits' },
      { stat: 'Media', label: 'Assets et vidéos', quote: 'Images, publications, Remotion' },
    ],
    desc:
      'Site professionnel pour activité paysagiste avec prestations, réalisations, ateliers, marché, devis, publications et backoffice interne.',
    features: [
      'Pages image-led pour prestations, réalisations, ateliers pédagogiques et articles.',
      'Demande de devis et commandes avec Firebase Functions, Firestore, Auth et Storage.',
      'Backoffice pour contenus, marché, planning retraits, publications et droits admin.',
      'Bibliothèque visuelle riche avec assets générés, SEO géographique et supports vidéo.',
    ],
    stats: { front: 'Vite', data: 'Firebase', pay: 'Devis', seo: 'Local', admin: 'Backoffice', media: 'Remotion' },
  },
]

const Laurel = () => (
  <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth=".7" aria-hidden="true">
    <path d="M10 25c0-9 4-16 11-19M40 25c0-9-4-16-11-19M10 25c0 9 4 16 11 19M40 25c0 9-4 16-11 19" />
    <circle cx="25" cy="25" r="1" />
  </svg>
)

const ArrowRight = () => (
  <svg viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
    <path d="M0 5h17M13 1l4 4-4 4" />
  </svg>
)

function Scene({ project, idx }) {
  return (
    <section className="scene" data-i={idx}>
      <div className="card" data-grade={project.grade}>
        <div className="bg" style={{ backgroundImage: `url(${project.bg})` }} />
        <div className="vignette" />
        <div className="grain" />

        <div className="meta-top">
          <div className="year">{project.year}</div>
          <div className="fest">
            {project.label}
            <br />
            — {project.labelSub}
          </div>
          <div className="laurel">
            <Laurel />
            <div className="t">
              <b>Projet client complet</b>
              <span>DESIGN · CODE · OPS · SEO</span>
            </div>
          </div>
        </div>

        <div className="discover-stage">
          <Link
            className="discover-site"
            to={`/projects/${project.slug}`}
            aria-label={`Découvrir le site ${project.title.join(' ')}`}
          >
            <span>Découvrir le site</span>
            <ArrowRight />
          </Link>
        </div>

        <div className="meta-bottom">
          <div className="cat">{project.category}</div>
          <h1 className="title">
            {project.title.map((word, i) => (
              <span key={word}>
                {word}
                {i < project.title.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <div className="credit">
            <div>
              <b>RÔLE</b>
              <em>{project.director}</em>
            </div>
            <div>
              <b>TYPE</b>
              <em>{project.type}</em>
            </div>
          </div>
        </div>

        <div className="reviews">
          {project.proofs.map((proof) => (
            <div key={proof.stat} className="review">
              <div className="stars">{proof.stat}</div>
              <div className="award">{proof.label}</div>
              <div className="quote">{proof.quote}</div>
            </div>
          ))}
        </div>

        {idx === 0 && <div className="scrollhint">SCROLL POUR CONTINUER</div>}
      </div>
    </section>
  )
}

function Modal({ project, onClose }) {
  if (!project) return null

  return (
    <div
      className="modal open"
      onClick={(event) => {
        if (event.target.classList.contains('modal')) onClose()
      }}
    >
      <div className="card-modal">
        <button className="close" onClick={onClose} aria-label="Fermer">
          ×
        </button>
        <div className="preview" style={{ backgroundImage: `url(${project.captures[0]})` }} />
        <div className="fest">
          {project.label} — {project.labelSub}
        </div>
        <div className="ttl">{project.title.join(' ')}</div>
        <div className="sub">
          <div>
            RÔLE <b>{project.director}</b>
          </div>
          <div>{project.year}</div>
          <div>{project.type}</div>
        </div>
        <div className="desc">{project.desc}</div>

        <div className="modal-captures">
          {project.captures.slice(1).map((capture) => (
            <img key={capture} src={capture} alt="" loading="eager" decoding="async" />
          ))}
        </div>

        <div className="feature-list">
          {project.features.map((feature) => (
            <p key={feature}>{feature}</p>
          ))}
        </div>

        <div className="stats">
          {Object.entries(project.stats).map(([label, value]) => (
            <div className="stat" key={label}>
              <div className="lbl">{label}</div>
              <div className="val">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Featured() {
  const [active, setActive] = useState(0)
  const [openProject, setOpenProject] = useState(null)
  const imageOverrides = useProjectImageOverrides()
  const scrollerRef = useRef(null)
  const stripRef = useRef(null)
  const cursorRef = useRef(null)
  const featuredProjects = projects.map((project) => {
    const overrides = imageOverrides[project.slug] ?? {}
    return {
      ...project,
      bg: overrides.featuredBg || project.bg,
      captures: project.captures.map((capture, index) => overrides[`featuredCapture${index}`] || capture),
    }
  })

  useEffect(() => {
    document.body.classList.add('cinema-active')
    window.__lenis?.stop?.()
    return () => {
      document.body.classList.remove('cinema-active')
      window.__lenis?.start?.()
    }
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor || window.matchMedia('(pointer: coarse)').matches) return undefined

    const arrow = cursor.querySelector('.cursor-arrow')
    const ring = cursor.querySelector('.cursor-ring')
    let rx = 0
    let ry = 0
    let tx = 0
    let ty = 0
    let raf = 0

    const onMove = (event) => {
      tx = event.clientX
      ty = event.clientY
      cursor.classList.remove('is-hidden')
      arrow.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
    }
    const onLeave = () => cursor.classList.add('is-hidden')
    const onEnter = () => cursor.classList.remove('is-hidden')

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    const tick = () => {
      rx += (tx - rx) * 0.14
      ry += (ty - ry) * 0.14
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }
    tick()

    const hoverConfig = [
      { sel: '.discover-site', label: 'SITE' },
      { sel: '.dot', label: 'JUMP' },
      { sel: '.close', label: 'CLOSE' },
      { sel: '.card-modal .preview', label: 'VIEW' },
    ]
    const listeners = []
    hoverConfig.forEach(({ sel, label }) => {
      document.querySelectorAll(`.cinema-stage ${sel}`).forEach((element) => {
        const enter = () => {
          cursor.classList.add('is-link')
          cursor.dataset.label = label
        }
        const leave = () => {
          cursor.classList.remove('is-link')
          delete cursor.dataset.label
        }
        element.addEventListener('mouseenter', enter)
        element.addEventListener('mouseleave', leave)
        listeners.push({ element, enter, leave })
      })
    })

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      listeners.forEach(({ element, enter, leave }) => {
        element.removeEventListener('mouseenter', enter)
        element.removeEventListener('mouseleave', leave)
      })
    }
  }, [openProject])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return undefined

    const scenes = scroller.querySelectorAll('.scene')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.dataset.i)
          if (entry.isIntersecting && entry.intersectionRatio > 0.55) {
            entry.target.classList.add('in-view')
            entry.target.classList.remove('is-past')
            setActive(idx)
            scenes.forEach((scene, i) => {
              if (i < idx) {
                scene.classList.add('is-past')
                scene.classList.remove('in-view')
              } else if (i > idx) {
                scene.classList.remove('is-past')
                scene.classList.remove('in-view')
              }
            })
            if (stripRef.current) {
              stripRef.current.style.transform = `translate(calc(-50% - ${idx * 30}px), -60%)`
            }
          }
        })
      },
      { root: scroller, threshold: [0, 0.55, 0.9] },
    )

    scenes.forEach((scene) => observer.observe(scene))
    scenes[0]?.classList.add('in-view')
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current
    const cursor = cursorRef.current
    if (!scroller) return undefined

    let lock = false
    let restTimer = 0
    const onWheel = (event) => {
      if (lock) {
        event.preventDefault()
        return
      }
      if (Math.abs(event.deltaY) < 12) return
      lock = true
      cursor?.classList.add('is-scrolling')
      const direction = event.deltaY > 0 ? 1 : -1
      cursor?.classList.toggle('is-scrolling-up', direction === -1)
      const next = Math.max(0, Math.min(featuredProjects.length - 1, active + direction))
      scroller.querySelectorAll('.scene')[next].scrollIntoView({ behavior: 'smooth' })
      event.preventDefault()
      setTimeout(() => {
        lock = false
      }, 750)
      clearTimeout(restTimer)
      restTimer = setTimeout(() => {
        cursor?.classList.remove('is-scrolling')
        cursor?.classList.remove('is-scrolling-up')
      }, 900)
    }

    scroller.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      scroller.removeEventListener('wheel', onWheel)
      clearTimeout(restTimer)
    }
  }, [active, featuredProjects.length])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpenProject(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const goTo = (index) => {
    scrollerRef.current?.querySelectorAll('.scene')[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="cinema-stage">
      <div className="screen">
        <div className="topbar">
          <div className="nav">
            <Link className="logo" to="/">Atelier</Link>
            <a href="#gallery">Featured</a>
            <Link to="/backoffice">Admin</Link>
            <a href="mailto:hello@atelier.studio">Contact</a>
          </div>
        </div>

        <div className="theme-cluster">
          <svg className="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
          <span className="theme-toggle" aria-hidden="true" />
        </div>

        <div className="filmstrip" ref={stripRef}>
          {featuredProjects.map((project, i) => (
            <div
              key={project.title.join(' ')}
              className={`thumb${i === active ? ' active' : ''}`}
              style={{ backgroundImage: `url(${project.captures[0]})` }}
            />
          ))}
        </div>

        <div className="dotnav">
          <span className="num">01</span>
          {featuredProjects.map((project, i) => (
            <button
              type="button"
              key={project.title.join(' ')}
              className={`dot${i === active ? ' active' : ''}`}
              data-label={project.title.join(' ').toUpperCase()}
              onClick={() => goTo(i)}
              aria-label={`Aller à ${project.title.join(' ')}`}
            />
          ))}
          <span className="num">{String(featuredProjects.length).padStart(2, '0')}</span>
        </div>

        <div id="gallery" className="scroller" ref={scrollerRef}>
          {featuredProjects.map((project, i) => (
            <Scene key={project.title.join(' ')} project={project} idx={i} />
          ))}
        </div>

        <Modal project={openProject} onClose={() => setOpenProject(null)} />
      </div>

      <div className="cursor is-hidden" ref={cursorRef} aria-hidden="true">
        <span className="cursor-ring">
          <span className="cursor-label" />
          <span className="cursor-dir" />
        </span>
        <svg className="cursor-arrow" viewBox="0 0 24 24" width="22" height="22" fill="none">
          <path
            d="M5 3 L5 19 L9.2 15.2 L11.7 21 L14.2 19.9 L11.7 14.1 L17.2 14.1 Z"
            fill="#fff"
            stroke="#0a0a0c"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

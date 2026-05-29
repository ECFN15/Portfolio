export const projects = [
  {
    slug: 'secondvie',
    title: 'SecondVie',
    studio: 'Marketplace mobilier restauré',
    year: '2026',
    role: 'Architecture Next.js, UX marketplace, backoffice, SEO, performance',
    discipline: 'E-commerce SSR - Mobilier restauré',
    summary:
      'Une marketplace complète pour vendre des meubles restaurés : galerie immersive, pages produit SSR, devis, wishlist, checkout Stripe, espace client et backoffice opérationnel.',
    color: '#d4b06a',
    cover: '/featured/secondvie-hero.webp',
    accent: '/featured/secondvie-gallery.webp',
    gallery: [
      '/featured/secondvie-hero.webp',
      '/featured/secondvie-gallery.webp',
      '/featured/secondvie-product.png',
    ],
    services: ['Next.js SSR', 'Marketplace', 'Backoffice', 'SEO technique', 'Performance mobile'],
    awards: ['Pages produit indexables', 'Contrats mobile testés', 'Dashboard de déploiement sandbox'],
    tech: ['Next.js App Router', 'React 19', 'Firebase', 'Stripe', 'GSAP'],
    quote:
      'Un projet e-commerce pensé comme un produit complet : acquisition, vente, administration et stabilité mobile.',
    nextSlug: 'tous-a-table',
  },
  {
    slug: 'tous-a-table',
    title: 'Tous à Table',
    studio: 'Meubles anciens, planches et comptoir',
    year: '2026',
    role: 'Frontend React, Firebase, SEO, catalogue, admin, paiement',
    discipline: 'Marketplace - Mobilier et objets bois',
    summary:
      'Une plateforme commerciale avec marketplace, fiches produit, Comptoir, contenus SEO locaux, paiement Stripe, commandes et analytics admin bornés pour tenir en production.',
    color: '#c96d3b',
    cover: '/featured/tousatable-buffet.webp',
    accent: '/featured/tousatable-planches.webp',
    gallery: [
      '/featured/tousatable-buffet.webp',
      '/featured/tousatable-planches.webp',
      '/featured/tousatable-admin.png',
    ],
    services: ['Catalogue public', 'Backoffice', 'SEO local', 'Checkout', 'Analytics'],
    awards: ['Roadmap SEO', 'Catalogue public caché', 'Optimisation coûts Firebase'],
    tech: ['Vite', 'React 18', 'Firebase', 'Stripe', 'Framer Motion'],
    quote:
      'Une vitrine commerciale qui relie image de marque, catalogue, vente et administration sans perdre la précision SEO.',
    nextSlug: 'vibefx',
  },
  {
    slug: 'vibefx',
    title: 'VibeFX',
    studio: 'Studio de publication sociale',
    year: '2026',
    role: 'Produit SaaS, Next.js, editor canvas, Firebase Functions, sécurité OAuth',
    discipline: 'SaaS - Création visuelle et publication Meta',
    summary:
      'Un outil SaaS pour créer des visuels sociaux, préparer captions et brouillons, puis publier vers Instagram et Facebook via un pipeline Meta OAuth sécurisé.',
    color: '#8c7cff',
    cover: '/featured/vibefx-studio.png',
    accent: '/featured/vibefx-astronaut.png',
    gallery: [
      '/featured/vibefx-studio.png',
      '/featured/vibefx-pipeline.png',
      '/featured/vibefx-astronaut.png',
    ],
    services: ['Studio canvas', 'Publication Meta', 'Pages SEO', 'Backoffice', 'Workflow brouillons'],
    awards: ['OAuth serveur', 'Formats 4:5 et 9:16', 'Pages publiques indexables'],
    tech: ['Next.js 16', 'React 19', 'Firebase', 'Meta OAuth', 'Zustand'],
    quote:
      'Un produit SaaS qui transforme un rendu image en brouillon social prêt à vérifier et publier.',
    nextSlug: 'jardin-de-chawi',
  },
  {
    slug: 'jardin-de-chawi',
    title: 'Jardin de Chawi',
    studio: 'Paysagisme, ateliers et marché local',
    year: '2026',
    role: 'Direction produit, front React, Firebase, contenu, admin',
    discipline: 'Site métier - Paysagisme et services locaux',
    summary:
      'Un site professionnel avec pages prestations, réalisations, ateliers, marché, devis, publications et backoffice pour transformer une activité locale en outil digital complet.',
    color: '#8bb66b',
    cover: '/featured/chawi-hero.jpg',
    accent: '/featured/chawi-market.png',
    gallery: [
      '/featured/chawi-hero.jpg',
      '/featured/chawi-prestations.png',
      '/featured/chawi-market.png',
    ],
    services: ['Site public', 'Devis', 'Marché local', 'Backoffice', 'Contenu SEO'],
    awards: ['Pages métier locales', 'Gestion opérationnelle', 'Assets visuels et vidéo'],
    tech: ['Vite', 'React 19', 'Firebase', 'React Router', 'Remotion'],
    quote:
      'Un site métier qui sert autant l’image de marque que les demandes entrantes et l’administration quotidienne.',
    nextSlug: 'secondvie',
  },
]

export const findProject = (slug) => projects.find((p) => p.slug === slug)

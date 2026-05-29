import { useEffect, useState } from 'react'
import { projects } from './projects.js'

export const PROJECT_IMAGE_OVERRIDES_KEY = 'portfolio.projectImageOverrides.v1'
export const PROJECT_IMAGE_OVERRIDES_EVENT = 'portfolio-project-images-updated'

const featuredDefaults = {
  secondvie: {
    featuredBg: '/featured/secondvie-gallery.webp',
    featuredCapture0: '/featured/secondvie-hero.webp',
    featuredCapture1: '/featured/secondvie-product.png',
    featuredCapture2: '/featured/secondvie-gallery.webp',
  },
  'tous-a-table': {
    featuredBg: '/featured/tousatable-buffet.webp',
    featuredCapture0: '/featured/tousatable-buffet.webp',
    featuredCapture1: '/featured/tousatable-planches.webp',
    featuredCapture2: '/featured/tousatable-admin.png',
  },
  vibefx: {
    featuredBg: '/featured/vibefx-pipeline.png',
    featuredCapture0: '/featured/vibefx-studio.png',
    featuredCapture1: '/featured/vibefx-pipeline.png',
    featuredCapture2: '/featured/vibefx-astronaut.png',
  },
  'jardin-de-chawi': {
    featuredBg: '/featured/chawi-hero.jpg',
    featuredCapture0: '/featured/chawi-hero.jpg',
    featuredCapture1: '/featured/chawi-market.png',
    featuredCapture2: '/featured/chawi-prestations.png',
  },
}

export const imageSlots = [
  {
    key: 'travauxCover',
    group: 'Travaux',
    label: 'Carte projet',
    description: 'Image principale dans la grille Travaux de la home.',
  },
  {
    key: 'featuredBg',
    group: 'Featured',
    label: 'Fond cinema',
    description: 'Grande image de fond de la scene Featured.',
  },
  {
    key: 'featuredCapture0',
    group: 'Featured',
    label: 'Capture principale',
    description: 'Grande capture dans la pile, le filmstrip et la modale.',
  },
  {
    key: 'featuredCapture1',
    group: 'Featured',
    label: 'Capture secondaire',
    description: 'Capture detail affichee dans la pile et la modale.',
  },
  {
    key: 'featuredCapture2',
    group: 'Featured',
    label: 'Capture tertiaire',
    description: 'Capture additionnelle affichee dans la pile.',
  },
]

export const editableProjectImages = projects.map((project) => ({
  slug: project.slug,
  title: project.title,
  discipline: project.discipline,
  defaults: {
    travauxCover: project.cover,
    ...featuredDefaults[project.slug],
  },
}))

export function readProjectImageOverrides() {
  if (typeof window === 'undefined') return {}

  try {
    const stored = window.localStorage.getItem(PROJECT_IMAGE_OVERRIDES_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export function writeProjectImageOverrides(nextOverrides) {
  if (typeof window === 'undefined') return

  window.localStorage.setItem(PROJECT_IMAGE_OVERRIDES_KEY, JSON.stringify(nextOverrides))
  window.dispatchEvent(new CustomEvent(PROJECT_IMAGE_OVERRIDES_EVENT, { detail: nextOverrides }))
}

export function setProjectImageOverride(slug, slotKey, value) {
  const cleanValue = value.trim()
  const current = readProjectImageOverrides()
  const nextProject = { ...(current[slug] ?? {}) }

  if (cleanValue) {
    nextProject[slotKey] = cleanValue
  } else {
    delete nextProject[slotKey]
  }

  const next = { ...current }
  if (Object.keys(nextProject).length) {
    next[slug] = nextProject
  } else {
    delete next[slug]
  }

  writeProjectImageOverrides(next)
  return next
}

export function resetProjectImageOverrides(slug) {
  const current = readProjectImageOverrides()
  const next = { ...current }
  delete next[slug]
  writeProjectImageOverrides(next)
  return next
}

export function resetAllProjectImageOverrides() {
  writeProjectImageOverrides({})
  return {}
}

export function getProjectImageValue(project, slotKey, overrides) {
  return overrides?.[project.slug]?.[slotKey] || project.defaults[slotKey] || ''
}

export function useProjectImageOverrides() {
  const [overrides, setOverrides] = useState(() => readProjectImageOverrides())

  useEffect(() => {
    const sync = () => setOverrides(readProjectImageOverrides())
    const syncFromEvent = (event) => setOverrides(event.detail ?? readProjectImageOverrides())

    window.addEventListener('storage', sync)
    window.addEventListener(PROJECT_IMAGE_OVERRIDES_EVENT, syncFromEvent)

    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener(PROJECT_IMAGE_OVERRIDES_EVENT, syncFromEvent)
    }
  }, [])

  return overrides
}

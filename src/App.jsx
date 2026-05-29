import { Routes, Route, useLocation, useNavigate, useNavigationType } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Skills, { SkillDemoPage } from './pages/Skills.jsx'
import BTPSaasVitrine from './pages/BTPSaasVitrine.jsx'
import BTPDashboard from './pages/BTPDashboard.jsx'
import NightgridLanding from './pages/NightgridLanding.jsx'
import NightgridMap from './pages/NightgridMap.jsx'
import FieldworkIndex from './pages/FieldworkIndex.jsx'
import FieldworkChapter from './pages/FieldworkChapter.jsx'
import EditorialTypeExperience from './pages/EditorialTypeExperience.jsx'
import ExperimentalTypeExperience from './pages/ExperimentalTypeExperience.jsx'
import SnackPilotVitrine from './pages/SnackPilotVitrine.jsx'
import SnackPilotBuilder from './pages/SnackPilotBuilder.jsx'
import NovahausVitrine from './pages/NovahausVitrine.jsx'
import NovahausModule from './pages/NovahausModule.jsx'
import SkillExperience from './pages/SkillExperience.jsx'
import GlossyModernExperience from './pages/GlossyModernExperience.jsx'
import DarkUiExperience from './pages/DarkUiExperience.jsx'
import HighContrastExperience from './pages/HighContrastExperience.jsx'
import HighEndDesignExperience from './pages/HighEndDesignExperience.jsx'
import LightUiExperience from './pages/LightUiExperience.jsx'
import MinimalDesignExperience from './pages/MinimalDesignExperience.jsx'
import MonochromeUiExperience from './pages/MonochromeUiExperience.jsx'
import MotionExperience from './pages/MotionExperience.jsx'
import PastelExperience from './pages/PastelExperience.jsx'
import PlayfulDesignExperience from './pages/PlayfulDesignExperience.jsx'
import SerifDisplayExperience from './pages/SerifDisplayExperience.jsx'
import SoftGradientsExperience from './pages/SoftGradientsExperience.jsx'
import TechnicalSansExperience from './pages/TechnicalSansExperience.jsx'
import TechnicalUiExperience from './pages/TechnicalUiExperience.jsx'
import UtilitarianExperience from './pages/UtilitarianExperience.jsx'
import VibrantAccentsExperience from './pages/VibrantAccentsExperience.jsx'
import Featured from './pages/Featured.jsx'
import Backoffice from './pages/Backoffice.jsx'
import Navbar from './components/Navbar.jsx'
import useLenis from './hooks/useLenis.js'

function ScrollToTop() {
  const { hash, pathname } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === 'POP') return
    const hasSkillReturnTarget =
      pathname === '/skills' &&
      (hash.startsWith('#skill-') || sessionStorage.getItem('portfolio.skills.restorePending') === '1')

    if (hasSkillReturnTarget) return

    // Use Lenis if available, fallback to native
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [hash, navigationType, pathname])
  return null
}

function SkillReturnMemory() {
  const { pathname } = useLocation()

  useEffect(() => {
    const skillMatch = pathname.match(/^\/skills\/([^/]+)/)
    const aliasSlug = pathname.startsWith('/snackpilot')
      ? 'expressive-brand'
      : pathname.startsWith('/novahaus')
        ? 'geometric-modern'
        : null
    const slug = skillMatch?.[1] ?? aliasSlug

    if (!slug) {
      if (pathname !== '/skills') {
        sessionStorage.removeItem('portfolio.skills.restorePending')
      }
      return
    }

    sessionStorage.setItem('portfolio.skills.returnSlug', slug)
    sessionStorage.setItem('portfolio.skills.restorePending', '1')
  }, [pathname])

  return null
}

function SkillsReturnLinkGuard() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const skillMatch = pathname.match(/^\/skills\/([^/]+)/)
    const aliasSlug = pathname.startsWith('/snackpilot')
      ? 'expressive-brand'
      : pathname.startsWith('/novahaus')
        ? 'geometric-modern'
        : null
    const slug = skillMatch?.[1] ?? aliasSlug

    if (!slug) return undefined

    const prepareReturn = (event) => {
      const anchor = event.target.closest('a[href]')
      if (!anchor) return

      const url = new URL(anchor.href, window.location.origin)
      const isSkillsIndex = url.origin === window.location.origin && url.pathname === '/skills'
      if (!isSkillsIndex) return

      sessionStorage.setItem('portfolio.skills.returnSlug', slug)
      sessionStorage.setItem('portfolio.skills.restorePending', '1')
      window.__lenis?.stop?.()

      if (!url.hash.startsWith('#skill-')) {
        event.preventDefault()
        event.stopPropagation()
        navigate(
          { pathname: '/skills', hash: `#skill-${slug}` },
          { state: { returnToSkill: slug } },
        )
      }
    }

    document.addEventListener('click', prepareReturn, true)

    return () => {
      document.removeEventListener('click', prepareReturn, true)
    }
  }, [navigate, pathname])

  return null
}

export default function App() {
  useLenis()
  const location = useLocation()
  const isGenericSkillExperience = /^\/skills\/[^/]+\/(vitrine|dashboard)$/.test(location.pathname)
  const hideNav = isGenericSkillExperience || location.pathname === '/featured' || location.pathname === '/backoffice' || location.pathname.startsWith('/skills/clean-saas') || location.pathname === '/skills/cyber-neon/landing' || location.pathname === '/skills/cyber-neon/map' || location.pathname === '/skills/dark-ui/incident' || location.pathname === '/skills/dark-ui/triage' || location.pathname === '/skills/editorial-minimal/index' || location.pathname === '/skills/editorial-minimal/chapter' || location.pathname.startsWith('/skills/editorial-type') || location.pathname.startsWith('/skills/experimental-type') || location.pathname.startsWith('/skills/geometric-modern') || location.pathname.startsWith('/snackpilot') || location.pathname.startsWith('/novahaus')

  return (
    <main className="relative w-full max-w-full overflow-x-hidden bg-ink-950 text-bone-50 grain-overlay">
      <ScrollToTop />
      <SkillReturnMemory />
      <SkillsReturnLinkGuard />
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/skills/clean-saas/vitrine" element={<BTPSaasVitrine />} />
        <Route path="/skills/clean-saas/dashboard" element={<BTPDashboard />} />
        <Route path="/skills/cyber-neon/vitrine" element={<NightgridLanding />} />
        <Route path="/skills/cyber-neon/dashboard" element={<NightgridMap />} />
        <Route path="/skills/cyber-neon/landing" element={<NightgridLanding />} />
        <Route path="/skills/cyber-neon/map" element={<NightgridMap />} />
        <Route path="/skills/dark-ui/vitrine" element={<DarkUiExperience />} />
        <Route path="/skills/dark-ui/dashboard" element={<DarkUiExperience />} />
        <Route path="/skills/dark-ui/incident" element={<DarkUiExperience />} />
        <Route path="/skills/dark-ui/triage" element={<DarkUiExperience />} />
        <Route path="/skills/editorial-minimal/vitrine" element={<FieldworkIndex />} />
        <Route path="/skills/editorial-minimal/dashboard" element={<FieldworkChapter />} />
        <Route path="/skills/editorial-minimal/index" element={<FieldworkIndex />} />
        <Route path="/skills/editorial-minimal/chapter" element={<FieldworkChapter />} />
        <Route path="/skills/editorial-type/dashboard" element={<EditorialTypeExperience />} />
        <Route path="/skills/editorial-type/vitrine" element={<EditorialTypeExperience />} />
        <Route path="/skills/editorial-type/article" element={<EditorialTypeExperience />} />
        <Route path="/skills/experimental-type/dashboard" element={<ExperimentalTypeExperience />} />
        <Route path="/skills/experimental-type/vitrine" element={<ExperimentalTypeExperience />} />
        <Route path="/skills/experimental-type/article" element={<ExperimentalTypeExperience />} />
        <Route path="/skills/expressive-brand/vitrine" element={<SnackPilotVitrine />} />
        <Route path="/skills/expressive-brand/dashboard" element={<SnackPilotBuilder />} />
        <Route path="/skills/geometric-modern/dashboard" element={<NovahausModule />} />
        <Route path="/skills/geometric-modern/vitrine" element={<NovahausVitrine />} />
        <Route path="/skills/geometric-modern/module-n24" element={<NovahausModule />} />
        <Route path="/skills/glossy-modern/:view" element={<GlossyModernExperience />} />
        <Route path="/skills/high-contrast/:view" element={<HighContrastExperience />} />
        <Route path="/skills/high-end-design/:view" element={<HighEndDesignExperience />} />
        <Route path="/skills/light-ui/:view" element={<LightUiExperience />} />
        <Route path="/skills/minimal-design/:view" element={<MinimalDesignExperience />} />
        <Route path="/skills/monochrome-ui/:view" element={<MonochromeUiExperience />} />
        <Route path="/skills/motion/:view" element={<MotionExperience />} />
        <Route path="/skills/pastel/:view" element={<PastelExperience />} />
        <Route path="/skills/playful-design/:view" element={<PlayfulDesignExperience />} />
        <Route path="/skills/serif-display/:view" element={<SerifDisplayExperience />} />
        <Route path="/skills/soft-gradients/:view" element={<SoftGradientsExperience />} />
        <Route path="/skills/technical-sans/:view" element={<TechnicalSansExperience />} />
        <Route path="/skills/technical-ui/:view" element={<TechnicalUiExperience />} />
        <Route path="/skills/utilitarian/:view" element={<UtilitarianExperience />} />
        <Route path="/skills/vibrant-accents/:view" element={<VibrantAccentsExperience />} />
        <Route path="/novahaus" element={<NovahausVitrine />} />
        <Route path="/novahaus/module-n24" element={<NovahausModule />} />
        <Route path="/snackpilot" element={<SnackPilotVitrine />} />
        <Route path="/snackpilot/lunchbox-builder" element={<SnackPilotBuilder />} />
        <Route path="/skills/:slug/:view" element={<SkillExperience />} />
        <Route path="/skills/:slug" element={<SkillDemoPage />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </main>
  )
}

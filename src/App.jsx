import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Skills, { SkillDemoPage } from './pages/Skills.jsx'
import BTPSaasVitrine from './pages/BTPSaasVitrine.jsx'
import BTPDashboard from './pages/BTPDashboard.jsx'
import NightgridLanding from './pages/NightgridLanding.jsx'
import NightgridMap from './pages/NightgridMap.jsx'
import EditorialMinimalExperience from './pages/EditorialMinimalExperience.jsx'
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
import Navbar from './components/Navbar.jsx'
import useLenis from './hooks/useLenis.js'

function ScrollToTop() {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === 'POP') return

    // Use Lenis if available, fallback to native
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [navigationType, pathname])
  return null
}

export default function App() {
  useLenis()
  const location = useLocation()
  const isGenericSkillExperience = /^\/skills\/[^/]+\/(vitrine|dashboard)$/.test(location.pathname)
  const hideNav = isGenericSkillExperience || location.pathname.startsWith('/skills/clean-saas') || location.pathname === '/skills/cyber-neon/landing' || location.pathname === '/skills/cyber-neon/map' || location.pathname === '/skills/dark-ui/incident' || location.pathname === '/skills/dark-ui/triage' || location.pathname === '/skills/editorial-minimal/index' || location.pathname === '/skills/editorial-minimal/chapter' || location.pathname.startsWith('/skills/editorial-type') || location.pathname.startsWith('/skills/experimental-type') || location.pathname.startsWith('/skills/geometric-modern') || location.pathname.startsWith('/snackpilot') || location.pathname.startsWith('/novahaus')

  return (
    <main className="relative w-full max-w-full overflow-x-hidden bg-ink-950 text-bone-50 grain-overlay">
      <ScrollToTop />
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
        <Route path="/skills/editorial-minimal/vitrine" element={<EditorialMinimalExperience />} />
        <Route path="/skills/editorial-minimal/dashboard" element={<EditorialMinimalExperience />} />
        <Route path="/skills/editorial-minimal/index" element={<EditorialMinimalExperience />} />
        <Route path="/skills/editorial-minimal/chapter" element={<EditorialMinimalExperience />} />
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
        <Route path="/novahaus" element={<NovahausVitrine />} />
        <Route path="/novahaus/module-n24" element={<NovahausModule />} />
        <Route path="/snackpilot" element={<SnackPilotVitrine />} />
        <Route path="/snackpilot/lunchbox-builder" element={<SnackPilotBuilder />} />
        <Route path="/skills/:slug/:view" element={<SkillExperience />} />
        <Route path="/skills/:slug" element={<SkillDemoPage />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </main>
  )
}

import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Skills, { SkillDemoPage } from './pages/Skills.jsx'
import BTPSaasVitrine from './pages/BTPSaasVitrine.jsx'
import BTPDashboard from './pages/BTPDashboard.jsx'
import NightgridLanding from './pages/NightgridLanding.jsx'
import NightgridMap from './pages/NightgridMap.jsx'
import CalderaIncident from './pages/CalderaIncident.jsx'
import CalderaTriage from './pages/CalderaTriage.jsx'
import FieldworkIndex from './pages/FieldworkIndex.jsx'
import FieldworkChapter from './pages/FieldworkChapter.jsx'
import RevueVitrine from './pages/RevueVitrine.jsx'
import RevueArticle from './pages/RevueArticle.jsx'
import TypeFestVitrine from './pages/TypeFestVitrine.jsx'
import TypeFestArticle from './pages/TypeFestArticle.jsx'
import SnackPilotVitrine from './pages/SnackPilotVitrine.jsx'
import SnackPilotBuilder from './pages/SnackPilotBuilder.jsx'
import NovahausVitrine from './pages/NovahausVitrine.jsx'
import NovahausModule from './pages/NovahausModule.jsx'
import Navbar from './components/Navbar.jsx'
import useLenis from './hooks/useLenis.js'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Use Lenis if available, fallback to native
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname])
  return null
}

export default function App() {
  useLenis()
  const location = useLocation()
  const hideNav = location.pathname.startsWith('/skills/clean-saas') || location.pathname === '/skills/cyber-neon/landing' || location.pathname === '/skills/cyber-neon/map' || location.pathname === '/skills/dark-ui/incident' || location.pathname === '/skills/dark-ui/triage' || location.pathname === '/skills/editorial-minimal/index' || location.pathname === '/skills/editorial-minimal/chapter' || location.pathname.startsWith('/skills/editorial-type') || location.pathname.startsWith('/skills/experimental-type') || location.pathname.startsWith('/skills/geometric-modern') || location.pathname.startsWith('/snackpilot') || location.pathname.startsWith('/novahaus')

  return (
    <main className="relative w-full max-w-full overflow-x-hidden bg-ink-950 text-bone-50 grain-overlay">
      <ScrollToTop />
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/skills/clean-saas/vitrine" element={<BTPSaasVitrine />} />
        <Route path="/skills/clean-saas/dashboard" element={<BTPDashboard />} />
        <Route path="/skills/cyber-neon/landing" element={<NightgridLanding />} />
        <Route path="/skills/cyber-neon/map" element={<NightgridMap />} />
        <Route path="/skills/dark-ui/incident" element={<CalderaIncident />} />
        <Route path="/skills/dark-ui/triage" element={<CalderaTriage />} />
        <Route path="/skills/editorial-minimal/index" element={<FieldworkIndex />} />
        <Route path="/skills/editorial-minimal/chapter" element={<FieldworkChapter />} />
        <Route path="/skills/editorial-type/vitrine" element={<RevueVitrine />} />
        <Route path="/skills/editorial-type/article" element={<RevueArticle />} />
        <Route path="/skills/experimental-type/vitrine" element={<TypeFestVitrine />} />
        <Route path="/skills/experimental-type/article" element={<TypeFestArticle />} />
        <Route path="/skills/geometric-modern/vitrine" element={<NovahausVitrine />} />
        <Route path="/skills/geometric-modern/module-n24" element={<NovahausModule />} />
        <Route path="/novahaus" element={<NovahausVitrine />} />
        <Route path="/novahaus/module-n24" element={<NovahausModule />} />
        <Route path="/snackpilot" element={<SnackPilotVitrine />} />
        <Route path="/snackpilot/lunchbox-builder" element={<SnackPilotBuilder />} />
        <Route path="/skills/:slug" element={<SkillDemoPage />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </main>
  )
}

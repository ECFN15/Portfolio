import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Skills, { SkillDemoPage } from './pages/Skills.jsx'
import BTPSaasVitrine from './pages/BTPSaasVitrine.jsx'
import BTPDashboard from './pages/BTPDashboard.jsx'
import NightgridLanding from './pages/NightgridLanding.jsx'
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
  const hideNav = location.pathname.startsWith('/skills/clean-saas') || location.pathname === '/skills/cyber-neon/landing'

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
        <Route path="/skills/:slug" element={<SkillDemoPage />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </main>
  )
}

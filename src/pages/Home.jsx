import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import ProjectsShowcase from '../components/ProjectsShowcase.jsx'
import Pricing from '../components/Pricing.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ProjectsShowcase />
      <Pricing />
      <Footer />
    </>
  )
}

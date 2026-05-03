import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

// Using Research Journal On Warm Stone archetype
// Canvas: #faf9f5, Ink: #141413, Warm surfaces, Serif for editorial moments

export default function FieldworkIndex() {
  const [hoveredEntry, setHoveredEntry] = useState(null)
  const [savedFragment, setSavedFragment] = useState(null)

  useGSAP(() => {
    gsap.from('.fw-reveal', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    })

    gsap.from('.fw-image-reveal', {
      scale: 1.05,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.fw-image-reveal',
        start: 'top 80%',
      }
    })
  })

  const chapters = [
    { num: '01', title: 'Thresholds', page: 12 },
    { num: '02', title: 'Rooms Without Doors', page: 28 },
    { num: '03', title: 'The Hour Before Opening', page: 46 },
    { num: '04', title: 'Furniture Left Behind', page: 62 },
    { num: '05', title: 'How Silence Is Maintained', page: 78 },
    { num: '06', title: 'Notes on Public Stillness', page: 94 },
  ]

  const fieldNotes = [
    { location: 'Rue des Gravilliers', city: 'Paris', type: 'Courtyard', time: '07:12', excerpt: 'A delivery truck passed twice; no one looked up.' },
    { location: 'Cais do Sodré', city: 'Lisbon', type: 'Station edge', time: '06:20', excerpt: 'The chairs were outside before the café was open.' },
    { location: 'Nørrebro Library', city: 'Copenhagen', type: 'Reading room', time: '14:05', excerpt: 'Three people used the passage without slowing down.' },
    { location: 'Passage Sainte-Avoye', city: 'Paris', type: 'Threshold', time: '11:40', excerpt: 'The quiet was broken every seven minutes by the same train signal.' },
    { location: 'Rua do Alecrim', city: 'Lisbon', type: 'Café before opening', time: '08:03', excerpt: 'A courtyard remained empty for eleven minutes.' },
    { location: 'Assistens Cemetery', city: 'Copenhagen', type: 'Pathway', time: '16:30', excerpt: 'The bench was used as a temporary room.' },
  ]

  const fragments = [
    { title: 'Before opening', text: 'A café before opening is not closed. It is preparing to become public.' },
    { title: 'Shared stillness', text: 'Libraries do not create silence by removing people. They choreograph attention.' },
    { title: 'Temporary rooms', text: 'A bench, a wall and a delay are sometimes enough to make a room.' },
  ]

  const archiveEntries = [
    { id: '03.01', title: 'The bakery before chairs', category: 'Cafés' },
    { id: '03.02', title: 'Platform between departures', category: 'Platforms' },
    { id: '03.03', title: 'Library courtyard after rain', category: 'Courtyards' },
    { id: '03.04', title: 'Passage with four doors', category: 'Passages' },
    { id: '03.05', title: 'Bench beside a service entrance', category: 'Edges' },
  ]

  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#141413] font-sans selection:bg-[#d97757]/20">
      {/* Navigation */}
      <nav className="fw-reveal fixed top-0 left-0 right-0 z-50 bg-[#faf9f5]/95 backdrop-blur-sm border-b border-[#d1cfc5]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-8">
              <Link 
                to="/skills/editorial-minimal/index"
                className="font-editorial text-xl md:text-2xl font-medium tracking-tight text-[#141413]"
              >
                FIELDWORK
              </Link>
              <div className="hidden md:flex items-center gap-6 text-sm">
                <Link to="#essays" className="text-[#3d3d3a] hover:text-[#141413] transition-colors underline-offset-4 hover:underline">Essays</Link>
                <Link to="#index" className="text-[#3d3d3a] hover:text-[#141413] transition-colors underline-offset-4 hover:underline">Index</Link>
                <Link to="#archive" className="text-[#3d3d3a] hover:text-[#141413] transition-colors underline-offset-4 hover:underline">Walks</Link>
                <Link to="#archive" className="text-[#3d3d3a] hover:text-[#141413] transition-colors underline-offset-4 hover:underline">Archive</Link>
                <Link to="#about" className="text-[#3d3d3a] hover:text-[#141413] transition-colors underline-offset-4 hover:underline">About</Link>
              </div>
            </div>
            <Link 
              to="/skills/editorial-minimal/chapter"
              className="px-5 py-2.5 rounded-full bg-[#141413] text-[#e8e6dc] text-sm font-medium hover:bg-[#3d3d3a] transition-colors"
            >
              Read the Essay
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Editorial */}
      <header className="fw-reveal pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full border border-[#d1cfc5] text-xs font-mono uppercase tracking-wider text-[#87867f]">
                Issue 03
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#87867f]">
                Urban Silence
              </span>
            </div>
            
            <h1 className="font-editorial text-5xl md:text-7xl lg:text-[91px] font-medium leading-[0.95] tracking-tight text-[#141413] mb-6">
              The Quiet<br />City Index
            </h1>
            
            <p className="font-editorial text-xl md:text-2xl text-[#3d3d3a] leading-relaxed max-w-2xl mb-8">
              A field guide to the rooms, thresholds and pauses a city leaves behind.
            </p>
            
            <p className="text-base md:text-lg text-[#87867f] leading-relaxed max-w-xl mb-10">
              Between cafés before opening, library courtyards, station platforms and residential passages, silence is rarely empty. It is maintained, interrupted, negotiated and sometimes designed.
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-mono text-[#87867f] border-t border-[#d1cfc5] pt-6">
              <span>Cities: <span className="text-[#141413]">Paris, Lisbon, Copenhagen</span></span>
              <span>Field notes: <span className="text-[#141413]">42</span></span>
              <span>Photographs: <span className="text-[#141413]">18</span></span>
              <span>Essays: <span className="text-[#141413]">7</span></span>
              <span>Edited by: <span className="text-[#141413]">Elise Moreau</span></span>
              <span>Reading time: <span className="text-[#141413]">18 min</span></span>
            </div>
          </div>
        </div>
      </header>

      {/* Index du numéro */}
      <section id="index" className="fw-reveal py-16 md:py-24 bg-[#f0eee6]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-editorial text-2xl md:text-3xl font-medium text-[#141413]">Index</h2>
            <span className="text-sm font-mono text-[#87867f]">6 chapters</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chapters.map((chapter, i) => (
              <Link 
                key={i}
                to={chapter.num === '02' ? '/skills/editorial-minimal/chapter' : '/skills/editorial-minimal/chapter'}
                className="group p-6 rounded-2xl bg-[#faf9f5] border border-[#d1cfc5] hover:border-[#b0aea5] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-sm text-[#87867f]">{chapter.num}</span>
                  <span className="font-mono text-xs text-[#87867f]">p. {chapter.page}</span>
                </div>
                <h3 className="font-editorial text-xl md:text-2xl font-medium text-[#141413] group-hover:underline underline-offset-4">
                  {chapter.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ouverture d'essai */}
      <section className="fw-reveal py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-8">
              <h2 className="font-editorial text-3xl md:text-4xl font-medium text-[#141413] mb-8">
                Silence is not the absence of the city.
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-[#3d3d3a] leading-[1.8] mb-6 text-lg">
                  In most cities, quiet does not arrive naturally. It is produced by distance, routine, architecture, weather, policy and habit. A courtyard becomes quiet because no one crosses it at noon. A train platform becomes quiet between departures. A café becomes quiet before the chairs are set outside.
                </p>
                <p className="text-[#3d3d3a] leading-[1.8] mb-6 text-lg">
                  This issue follows small pockets of urban stillness across Paris, Lisbon and Copenhagen. The notes are not about escape. They are about attention: where the city lowers its voice, and what becomes visible when it does.
                </p>
              </div>

              {/* Citation */}
              <blockquote className="my-12 py-8 border-t border-b border-[#d1cfc5]">
                <p className="font-editorial text-2xl md:text-3xl text-[#141413] leading-snug">
                  Quiet places are not empty places. They are places where the city has briefly stopped asking for something.
                </p>
              </blockquote>
            </div>

            {/* Notes de marge */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-6">
                <div className="p-4 rounded-xl bg-[#f0eee6] border-l-2 border-[#d97757]">
                  <p className="text-sm text-[#3d3d3a] leading-relaxed">
                    The project treats silence as a civic condition, not a mood.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#f0eee6]">
                  <p className="text-sm text-[#3d3d3a] leading-relaxed">
                    Field notes were collected between March and June.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#f0eee6]">
                  <p className="text-sm text-[#3d3d3a] leading-relaxed">
                    Each location was observed for at least fifteen minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Images légendées */}
      <section className="fw-image-reveal py-16 md:py-24 bg-[#141413] text-[#e8e6dc]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Image 1 */}
            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-2xl bg-[#2a2a28] overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[#3a3a38] to-[#1a1a18] flex items-center justify-center">
                  <span className="text-[#87867f] font-mono text-sm">Courtyard, morning light</span>
                </div>
              </div>
              <div className="space-y-2">
                <figcaption className="font-editorial text-base text-[#141413] mb-2">
                  Rue des Gravilliers, 07:12
                </figcaption>
                <p className="text-sm text-[#87867f] leading-relaxed">
                  The courtyard remained empty for eleven minutes except for one resident crossing with keys in hand.
                </p>
              </div>
            </div>

            {/* Image 2 */}
            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-2xl bg-[#2a2a28] overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[#4a4a48] to-[#2a2a28] flex items-center justify-center">
                  <span className="text-[#87867f] font-mono text-sm">Station platform, cold light</span>
                </div>
              </div>
              <div className="space-y-2">
                <figcaption className="font-editorial text-base text-[#141413] mb-2">
                  Platform 4, Copenhagen, 06:48
                </figcaption>
                <p className="text-sm text-[#87867f] leading-relaxed">
                  A pause between two departures becomes a temporary room.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#d1cfc5] py-12">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-editorial text-xl font-medium text-[#141413] mb-2">FIELDWORK</h3>
              <p className="text-sm text-[#87867f]">Published slowly, edited carefully.</p>
            </div>
            <div>
              <h4 className="font-medium text-[#141413] mb-3">Navigate</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="text-[#3d3d3a] hover:text-[#141413]">Newsletter</Link></li>
                <li><Link to="#" className="text-[#3d3d3a] hover:text-[#141413]">Archive</Link></li>
                <li><Link to="#" className="text-[#3d3d3a] hover:text-[#141413]">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-[#141413] mb-3">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="text-[#3d3d3a] hover:text-[#141413]">Instagram</Link></li>
                <li><Link to="#" className="text-[#3d3d3a] hover:text-[#141413]">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-[#141413] mb-3">Current Issue</h4>
              <p className="text-sm text-[#3d3d3a]">Issue 03: The Quiet City Index</p>
              <p className="text-xs text-[#87867f] mt-1">Urban Silence</p>
            </div>
          </div>
          <div className="pt-8 border-t border-[#d1cfc5] flex items-center justify-between text-xs font-mono text-[#87867f]">
            <span>© 2024 FIELDWORK</span>
            <span>editorial-minimal / research-journal</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

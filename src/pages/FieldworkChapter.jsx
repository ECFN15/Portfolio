import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FieldworkChapter() {
  const [activeNote, setActiveNote] = useState(null)
  const [activeFootnote, setActiveFootnote] = useState(null)
  const [saved, setSaved] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const contentRef = useRef(null)
  const mainRef = useRef(null)

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return
      const scrollTop = window.scrollY
      const docHeight = contentRef.current.offsetHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadingProgress(Math.min(progress, 100))
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useGSAP(() => {
    gsap.from('.chapter-reveal', {
      y: 25,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power2.out'
    })

    // Images reveal on scroll
    gsap.utils.toArray('.chapter-image').forEach((img) => {
      gsap.from(img, {
        scale: 1.03,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 85%',
        }
      })
    })

    // Paragraphs reveal
    gsap.utils.toArray('.chapter-para').forEach((para, i) => {
      gsap.from(para, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: para,
          start: 'top 85%',
        }
      })
    })
  }, { scope: mainRef })

  const chapters = [
    { num: '01', title: 'Thresholds', active: false },
    { num: '02', title: 'Rooms Without Doors', active: true },
    { num: '03', title: 'The Hour Before Opening', active: false },
    { num: '04', title: 'Furniture Left Behind', active: false },
    { num: '05', title: 'How Silence Is Maintained', active: false },
  ]

  const marginNotes = [
    { id: 1, text: 'The project defines a temporary room as a public space that briefly supports stillness without formal enclosure.', para: 0 },
    { id: 2, text: 'Observation windows lasted between fifteen and thirty minutes depending on site activity.', para: 1 },
    { id: 3, text: 'Silence is recorded here as a behavioral condition, not only an acoustic one.', para: 2 },
    { id: 4, text: 'Repeated movement can make a place feel calmer than complete emptiness.', para: 3 },
  ]

  const footnotes = [
    { id: 1, text: 'The term "temporary room" is used internally by FIELDWORK to classify public spaces that support short-duration stillness.' },
    { id: 2, text: 'Sound levels were not measured technically; observations focused on perceived interruption, movement and behavior.' },
    { id: 3, text: 'The Copenhagen notes were collected after rainfall, which affected both movement and occupancy.' },
  ]

  const relatedNotes = [
    { location: 'Passage Sainte-Avoye', city: 'Paris', type: 'Threshold', time: '11:40' },
    { location: 'Cais do Sodré', city: 'Lisbon', type: 'Station edge', time: '06:20' },
    { location: 'Nørrebro Library', city: 'Copenhagen', type: 'Courtyard', time: '14:05' },
    { location: 'Rue des Gravilliers', city: 'Paris', type: 'Courtyard', time: '07:12' },
  ]

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleFootnoteClick = (id) => {
    setActiveFootnote(activeFootnote === id ? null : id)
  }

  return (
    <div ref={mainRef} className="min-h-screen bg-[#faf9f5] text-[#141413] font-sans selection:bg-[#d97757]/20">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-[#d1cfc5] z-50">
        <div 
          className="h-full bg-[#d97757] transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="chapter-reveal fixed top-0.5 left-0 right-0 z-40 bg-[#faf9f5]/95 backdrop-blur-sm border-b border-[#d1cfc5]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-6">
              <Link to="/skills/editorial-minimal/index" className="font-editorial text-lg md:text-xl font-medium tracking-tight text-[#141413]">
                FIELDWORK
              </Link>
              <span className="hidden md:inline text-[#d1cfc5]">/</span>
              <span className="hidden md:inline font-mono text-xs text-[#87867f]">Issue 03</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={handleSave}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  saved 
                    ? 'bg-[#4a9b7f] text-white' 
                    : 'border border-[#d1cfc5] text-[#3d3d3a] hover:border-[#b0aea5]'
                }`}
              >
                {saved ? 'Saved' : 'Save chapter'}
              </button>
              <button className="p-2 rounded-full hover:bg-[#f0eee6] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Chapter Navigation */}
      <div className="chapter-reveal fixed left-0 top-32 bottom-0 w-64 hidden xl:block pl-8">
        <div className="sticky top-32 space-y-1">
          <p className="font-mono text-xs uppercase tracking-wider text-[#87867f] mb-4">Chapters</p>
          {chapters.map((ch) => (
            <Link
              key={ch.num}
              to={ch.active ? '#' : '/skills/editorial-minimal'}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                ch.active 
                  ? 'bg-[#f0eee6] text-[#141413] font-medium' 
                  : 'text-[#87867f] hover:text-[#141413]'
              }`}
            >
              <span className="font-mono text-xs">{ch.num}</span>
              <span className="truncate">{ch.title}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Right Sidebar - Mini TOC */}
      <div className="fixed right-0 top-32 bottom-0 w-72 hidden 2xl:block pr-8">
        <div className="sticky top-32 space-y-8">
          {/* On this page */}
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-[#87867f] mb-4">On this page</p>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-[#3d3d3a] hover:text-[#141413] transition-colors leading-snug block">
                  A room does not always need a door
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#3d3d3a] hover:text-[#141413] transition-colors leading-snug block">
                  Produced by rhythm
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#3d3d3a] hover:text-[#141413] transition-colors leading-snug block">
                  Paris, Rue Sainte-Avoye
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#3d3d3a] hover:text-[#141413] transition-colors leading-snug block">
                  Lisbon, Cais do Sodré
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#3d3d3a] hover:text-[#141413] transition-colors leading-snug block">
                  Copenhagen's library courtyards
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#141413] font-medium transition-colors leading-snug block border-l-2 border-[#d97757] pl-3">
                  Temporary rooms do not remove us
                </a>
              </li>
            </ul>
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-[#d1cfc5]">
            <p className="font-mono text-xs uppercase tracking-wider text-[#87867f] mb-3">Tags</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 rounded-md bg-[#f0eee6] text-xs text-[#3d3d3a]">Urban silence</span>
              <span className="px-2 py-1 rounded-md bg-[#f0eee6] text-xs text-[#3d3d3a]">Architecture</span>
              <span className="px-2 py-1 rounded-md bg-[#f0eee6] text-xs text-[#3d3d3a]">Field notes</span>
            </div>
          </div>

          {/* Related excerpt */}
          <div className="pt-6 border-t border-[#d1cfc5]">
            <p className="font-mono text-xs uppercase tracking-wider text-[#87867f] mb-3">From Issue 03</p>
            <a href="#" className="group block">
              <p className="font-editorial text-sm text-[#141413] leading-snug mb-2 group-hover:underline underline-offset-2">
                "The Hour Before Opening"
              </p>
              <p className="text-xs text-[#87867f]">Elise Moreau</p>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main ref={contentRef} className="pt-32 md:pt-40 pb-24 2xl:pr-72">
        <div className="max-w-[800px] mx-auto px-6 md:px-8 xl:ml-[24rem] xl:mr-auto">
          
          {/* Header */}
          <header className="chapter-reveal mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full border border-[#d1cfc5] text-xs font-mono uppercase tracking-wider text-[#87867f]">
                From Issue 03
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#87867f]">
                The Quiet City Index
              </span>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-4xl md:text-5xl text-[#d1cfc5]">02</span>
            </div>

            <h1 className="font-editorial text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] text-[#141413] mb-6">
              Rooms Without Doors
            </h1>

            <p className="font-editorial text-xl md:text-2xl text-[#3d3d3a] leading-relaxed mb-8">
              How small urban pauses become temporary interiors.
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-mono text-[#87867f] border-t border-b border-[#d1cfc5] py-4">
              <span>Author: <span className="text-[#141413]">Elise Moreau</span></span>
              <span>Cities: <span className="text-[#141413]">Paris, Lisbon, Copenhagen</span></span>
              <span>Reading time: <span className="text-[#141413]">9 min</span></span>
              <span>Field notes: <span className="text-[#141413]">11</span></span>
              <span>Photographs: <span className="text-[#141413]">5</span></span>
            </div>
          </header>

          {/* Main text with margin notes */}
          <article className="relative">
            {/* Paragraph 1 */}
            <div className="chapter-para mb-10">
              <p className="text-xl md:text-[22px] text-[#3d3d3a] leading-[1.7]">
                A room does not always need a door. In the city, rooms often appear as pauses: a bench beneath a wall, the sheltered end of a platform, a narrow passage where footsteps briefly soften. These places are not private, but they interrupt the public condition.
              </p>
            </div>

            {/* Paragraph 2 */}
            <div className="chapter-para mb-10">
              <p className="text-xl md:text-[22px] text-[#3d3d3a] leading-[1.7]">
                The most convincing temporary rooms are not designed as rooms at all. They are produced by rhythm. A café terrace before opening. A station platform between departures. A courtyard after rain. The city continues around them, but for a few minutes the demand to move is suspended.
                <sup 
                  className="text-[#d97757] cursor-pointer hover:underline"
                  onClick={() => handleFootnoteClick(1)}
                >
                  [1]
                </sup>
              </p>
            </div>

            {/* Paragraph 3 */}
            <div className="chapter-para mb-10">
              <p className="text-xl md:text-[22px] text-[#3d3d3a] leading-[1.7]">
                In Paris, the passage near Rue Sainte-Avoye held this quality for twelve minutes. Four people crossed it, each at a different speed. None stayed, yet the passage did not feel empty. Its quiet came from repetition, not absence.
                <sup 
                  className="text-[#d97757] cursor-pointer hover:underline"
                  onClick={() => handleFootnoteClick(2)}
                >
                  [2]
                </sup>
              </p>
            </div>

            {/* Image 1 */}
            <figure className="chapter-image my-12">
              <div className="aspect-[16/10] rounded-2xl bg-[#e3dacc] overflow-hidden mb-4">
                <div className="w-full h-full bg-gradient-to-br from-[#d1cfc5] to-[#b0aea5] flex items-center justify-center">
                  <span className="text-[#3d3d3a] font-mono text-sm">Passage Sainte-Avoye, morning</span>
                </div>
              </div>
              <figcaption className="font-editorial text-base text-[#141413] mb-2">
                Passage Sainte-Avoye, 11:40
              </figcaption>
              <p className="text-sm text-[#87867f] leading-relaxed">
                Four crossings in twelve minutes. No one stopped, but every footstep slowed.
              </p>
            </figure>

            {/* Paragraph 4 */}
            <div className="chapter-para mb-10">
              <p className="text-xl md:text-[22px] text-[#3d3d3a] leading-[1.7]">
                Lisbon offered a different version. Near Cais do Sodré, the edge of the station became still only when the river wind covered the sound of traffic. The space did not become silent. It became legible.
              </p>
            </div>

            {/* Image 2 */}
            <figure className="chapter-image my-12">
              <div className="aspect-[16/10] rounded-2xl bg-[#e3dacc] overflow-hidden mb-4">
                <div className="w-full h-full bg-gradient-to-br from-[#c5d1cf] to-[#a5b0ae] flex items-center justify-center">
                  <span className="text-[#3d3d3a] font-mono text-sm">Cais do Sodré, station edge</span>
                </div>
              </div>
              <figcaption className="font-editorial text-base text-[#141413] mb-2">
                Cais do Sodré, 06:20
              </figcaption>
              <p className="text-sm text-[#87867f] leading-relaxed">
                The wind made the traffic feel farther away than it was.
              </p>
            </figure>

            {/* Paragraph 5 */}
            <div className="chapter-para mb-10">
              <p className="text-xl md:text-[22px] text-[#3d3d3a] leading-[1.7]">
                Copenhagen's library courtyards were the most deliberate. Their quiet was maintained by furniture, planting, signage and the social agreement that reading changes how bodies move.
                <sup 
                  className="text-[#d97757] cursor-pointer hover:underline"
                  onClick={() => handleFootnoteClick(3)}
                >
                  [3]
                </sup>
              </p>
            </div>

            {/* Image 3 */}
            <figure className="chapter-image my-12">
              <div className="aspect-[16/10] rounded-2xl bg-[#e3dacc] overflow-hidden mb-4">
                <div className="w-full h-full bg-gradient-to-br from-[#e6f0ee] to-[#cce3dc] flex items-center justify-center">
                  <span className="text-[#3d3d3a] font-mono text-sm">Nørrebro Library, after rain</span>
                </div>
              </div>
              <figcaption className="font-editorial text-base text-[#141413] mb-2">
                Nørrebro Library, 14:05
              </figcaption>
              <p className="text-sm text-[#87867f] leading-relaxed">
                The chairs were unused, but they defined the room.
              </p>
            </figure>

            {/* Citation centrale */}
            <blockquote className="my-16 py-10 border-t border-b border-[#d1cfc5]">
              <p className="font-editorial text-2xl md:text-[32px] text-[#141413] leading-[1.3] mb-4">
                Temporary rooms do not remove us from the city. They give us a smaller version of it.
              </p>
            </blockquote>
          </article>

          {/* Footnotes */}
          <section className="mt-16 pt-8 border-t border-[#d1cfc5]">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#87867f] mb-6">Footnotes</h3>
            <div className="space-y-4">
              {footnotes.map((fn) => (
                <div 
                  key={fn.id}
                  className={`flex gap-4 p-4 rounded-xl transition-all cursor-pointer ${
                    activeFootnote === fn.id ? 'bg-[#f0eee6]' : 'hover:bg-[#f0eee6]/50'
                  }`}
                  onClick={() => handleFootnoteClick(fn.id)}
                >
                  <span className="font-mono text-sm text-[#d97757]">[{fn.id}]</span>
                  <p className="text-sm text-[#3d3d3a] leading-relaxed">{fn.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Field Notes */}
          <section className="mt-16 pt-8 border-t border-[#d1cfc5]">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#87867f] mb-6">Related Field Notes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {relatedNotes.map((note, i) => (
                <div key={i} className="p-4 rounded-xl border border-[#d1cfc5] hover:border-[#b0aea5] transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[#87867f]">{note.city}</span>
                    <span className="font-mono text-xs text-[#87867f]">{note.time}</span>
                  </div>
                  <p className="font-editorial text-base text-[#141413]">{note.location}</p>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#87867f] mt-1">{note.type}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Reader Actions */}
          <section className="mt-16 pt-8 border-t border-[#d1cfc5]">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#87867f] mb-6">Reader Actions</h3>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={handleSave}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  saved 
                    ? 'bg-[#4a9b7f] text-white' 
                    : 'border border-[#d1cfc5] text-[#3d3d3a] hover:border-[#b0aea5]'
                }`}
              >
                {saved ? 'Saved' : 'Save chapter'}
              </button>
              <button className="px-5 py-2.5 rounded-full border border-[#d1cfc5] text-sm font-medium text-[#3d3d3a] hover:border-[#b0aea5] transition-colors">
                Copy citation
              </button>
              <button className="px-5 py-2.5 rounded-full border border-[#d1cfc5] text-sm font-medium text-[#3d3d3a] hover:border-[#b0aea5] transition-colors">
                View all field notes
              </button>
              <Link 
                to="/skills/editorial-minimal"
                className="px-5 py-2.5 rounded-full bg-[#141413] text-[#e8e6dc] text-sm font-medium hover:bg-[#3d3d3a] transition-colors"
              >
                Order Issue 03
              </Link>
            </div>
          </section>

          {/* Chapter Navigation */}
          <section className="mt-16 pt-8 border-t border-[#d1cfc5]">
            <div className="flex items-center justify-between">
              <Link to="#" className="group flex items-center gap-3 text-[#87867f] hover:text-[#141413] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <div className="text-left">
                  <span className="font-mono text-xs block">Previous</span>
                  <span className="font-editorial text-lg">01 Thresholds</span>
                </div>
              </Link>
              <Link to="#" className="group flex items-center gap-3 text-[#87867f] hover:text-[#141413] transition-colors">
                <div className="text-right">
                  <span className="font-mono text-xs block">Next</span>
                  <span className="font-editorial text-lg">03 The Hour Before Opening</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#d1cfc5] py-12 mt-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/skills/editorial-minimal/index" className="font-editorial text-xl font-medium text-[#141413]">
              FIELDWORK
            </Link>
            <p className="text-sm text-[#87867f]">Published slowly, edited carefully.</p>
            <div className="flex items-center gap-4 text-sm">
              <Link to="#" className="text-[#3d3d3a] hover:text-[#141413]">Newsletter</Link>
              <Link to="#" className="text-[#3d3d3a] hover:text-[#141413]">Archive</Link>
              <Link to="#" className="text-[#3d3d3a] hover:text-[#141413]">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

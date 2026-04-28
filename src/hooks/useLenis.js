import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Smooth-scroll hook (Lenis) synced with GSAP ScrollTrigger.
 * Mount it once at the root of the app (App.jsx).
 * Respects prefers-reduced-motion.
 */
export default function useLenis() {
  useEffect(() => {
    // Respect reduced-motion users
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.15,
      // Apple-like easing curve (same family as our CSS transitions)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      infinite: false,
    })

    // Keep ScrollTrigger in sync on every Lenis scroll event
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's ticker (single requestAnimationFrame loop)
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerUpdate)
    gsap.ticker.lagSmoothing(0)

    // Handle hash links + programmatic scrolls
    const onAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"], a[href^="/#"]')
      if (!target) return
      const href = target.getAttribute('href')
      const id = href.replace(/^\/?#/, '')
      if (!id) return
      const el = document.getElementById(id)
      if (el) {
        e.preventDefault()
        lenis.scrollTo(el, { offset: -40, duration: 1.4 })
      }
    }
    document.addEventListener('click', onAnchorClick)

    // Expose for debugging / programmatic use if needed
    window.__lenis = lenis

    return () => {
      document.removeEventListener('click', onAnchorClick)
      gsap.ticker.remove(tickerUpdate)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])
}

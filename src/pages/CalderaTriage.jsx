import { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

// Icons
const IconAlert = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)
const IconClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
)
const IconUsers = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)
const IconGlobe = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)
const IconBrain = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
)
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const IconX = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const IconTerminal = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
  </svg>
)
const IconGitCommit = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" /><line x1="1.05" y1="12" x2="7" y2="12" /><line x1="17.01" y1="12" x2="22.96" y2="12" />
  </svg>
)
const IconBook = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
)
const IconShield = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)
const IconMessage = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)
const IconPlay = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)
const IconPause = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
  </svg>
)
const IconSend = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)
const IconChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

export default function CalderaTriage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [incidentDuration, setIncidentDuration] = useState(18)
  const [selectedHypothesis, setSelectedHypothesis] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState(3)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [rollbackStatus, setRollbackStatus] = useState('idle') // idle, executing, completed
  const [commandInput, setCommandInput] = useState('')
  const [logs, setLogs] = useState([
    { time: '02:28:15', message: 'AI triage analysis completed', type: 'ai' },
    { time: '02:28:14', message: 'Correlation found: release v4.18.2 → Redis saturation', type: 'info' },
    { time: '02:27:52', message: 'Schema migration check: none detected', type: 'success' },
    { time: '02:27:31', message: 'cache_pool_wait exceeded 800ms', type: 'warn' },
    { time: '02:26:48', message: 'connection_pool saturation detected', type: 'error' },
  ])
  const mainRef = useRef(null)

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      setIncidentDuration(prev => prev + 1/60)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Simulate incoming logs
  useEffect(() => {
    const logTimer = setInterval(() => {
      const messages = [
        { message: 'Retry queue monitoring: stable', type: 'info' },
        { message: 'EU-Central latency: 340ms (warning threshold)', type: 'warn' },
        { message: 'Payment Gateway health check: OK', type: 'success' },
        { message: 'Cache hit ratio: 94.2%', type: 'info' },
      ]
      const randomLog = messages[Math.floor(Math.random() * messages.length)]
      setLogs(prev => [{
        time: currentTime.toTimeString().slice(0, 8),
        ...randomLog
      }, ...prev.slice(0, 6)])
    }, 6000)
    return () => clearInterval(logTimer)
  }, [currentTime])

  // GSAP reveal
  useGSAP(() => {
    gsap.from('.triage-reveal', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: 'power2.out'
    })
  }, { scope: mainRef })

  const formatDuration = (minutes) => {
    const mins = Math.floor(minutes)
    const secs = Math.floor((minutes - mins) * 60)
    return `${mins}m ${secs.toString().padStart(2, '0')}s`
  }

  const hypotheses = [
    {
      id: 0,
      title: 'Redis connection pool saturation',
      confidence: 76,
      risk: 'high',
      evidence: [
        'cache_pool_wait exceeded threshold after release v4.18.2',
        'retry queue increased from 24 to 184',
        'p95 latency rose within 6 minutes of deploy',
      ],
      counterSignals: ['Payment Gateway remains stable'],
      recommendedCheck: 'Compare Redis pool usage before and after release v4.18.2',
    },
    {
      id: 1,
      title: 'Payment provider timeout',
      confidence: 42,
      risk: 'medium',
      evidence: [
        'payment_intent_create delayed in 12% of requests',
        'Timeout errors increased in EU-West region',
      ],
      counterSignals: ['Payment Gateway API responding normally', 'No provider status page alerts'],
      recommendedCheck: 'Verify payment provider status page and API health',
    },
    {
      id: 2,
      title: 'Frontend checkout regression',
      confidence: 18,
      risk: 'low',
      evidence: ['Checkout form submission rate decreased 3%'],
      counterSignals: ['Backend latency is the primary issue', 'No frontend error spikes detected'],
      recommendedCheck: 'Monitor frontend error rates and user session recordings',
    },
  ]

  const evidenceStream = [
    { time: '02:04', event: 'Release v4.18.2 started', type: 'deploy' },
    { time: '02:07', event: 'EU-West deployment completed', type: 'deploy' },
    { time: '02:11', event: 'Redis wait time increased', type: 'warning' },
    { time: '02:14', event: 'Incident automatically opened', type: 'incident' },
    { time: '02:18', event: 'Error rate passed 3%', type: 'error' },
    { time: '02:24', event: 'AI triage completed', type: 'ai' },
    { time: '02:28', event: 'Rollback recommended', type: 'action' },
  ]

  const operatorNotes = [
    { author: 'Maya Chen', note: 'Support team notified.', time: '02:25' },
    { author: 'Theo Martin', note: 'Backend on-call confirms rollback is safe.', time: '02:27' },
    { author: 'Caldera Agent', note: 'No database migration tied to release.', time: '02:27' },
  ]

  const handleRollback = () => {
    setShowConfirmation(true)
  }

  const confirmRollback = () => {
    setShowConfirmation(false)
    setRollbackStatus('executing')
    setTimeout(() => {
      setRollbackStatus('completed')
      setLogs(prev => [{
        time: currentTime.toTimeString().slice(0, 8),
        message: 'Rollback to v4.17.9 completed successfully',
        type: 'success'
      }, ...prev])
    }, 3000)
  }

  const handleCommandSubmit = (e) => {
    e.preventDefault()
    if (!commandInput.trim()) return
    setLogs(prev => [{
      time: currentTime.toTimeString().slice(0, 8),
      message: `Command executed: ${commandInput}`,
      type: 'info'
    }, ...prev])
    setCommandInput('')
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'deploy': return 'bg-[#6aa7ff]'
      case 'warning': return 'bg-[#ffa16c]'
      case 'incident': return 'bg-[#ff6b6b]'
      case 'error': return 'bg-[#ff6b6b]'
      case 'ai': return 'bg-[#9b5cff]'
      case 'action': return 'bg-[#4ebe96]'
      case 'success': return 'text-[#4ebe96]'
      case 'warn': return 'text-[#ffa16c]'
      default: return 'text-[#868f97]'
    }
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-[#ff6b6b]'
      case 'medium': return 'text-[#ffa16c]'
      case 'low': return 'text-[#4ebe96]'
      default: return 'text-[#868f97]'
    }
  }

  return (
    <div ref={mainRef} className="min-h-screen bg-[#0a0a0b] text-[#e8e8e8] font-sans antialiased selection:bg-[#6aa7ff]/30">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#6aa7ff]/8 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="triage-reveal relative z-10 border-b border-[#23262b] bg-[#0a0a0b]/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#6aa7ff] to-[#479ffa] flex items-center justify-center">
                <span className="font-bold text-[#0a0a0b] text-sm">C</span>
              </div>
              <span className="font-semibold text-white tracking-tight">CALDERA</span>
            </div>
            <div className="hidden md:flex items-center gap-3 text-xs border-l border-[#23262b] pl-4">
              <span className="px-2 py-0.5 rounded bg-[#23262b] text-[#a8a8a8] font-mono">AI Triage Panel</span>
              <span className="text-[#868f97]">INC-4721</span>
              <span className="text-[#ff6b6b]">● P1</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2 text-[#868f97]">
              <IconClock />
              <span className="font-mono">{currentTime.toLocaleTimeString('en-US', { hour12: false })}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#868f97]">Duration:</span>
              <span className="font-mono text-[#ffa16c]">{formatDuration(incidentDuration)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="triage-reveal relative z-10 p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Left Column - Incident Summary & AI Diagnosis */}
          <div className="lg:col-span-5 space-y-4">
            {/* Incident Summary */}
            <div className="rounded-xl border border-[#23262b] bg-[#111113] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#23262b] bg-[#0d0d0e] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconAlert />
                  <span className="text-sm font-semibold">Incident Summary</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#ff6b6b]/10 text-[#ff6b6b] text-xs font-mono font-semibold">P1</span>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-lg font-semibold text-white">Checkout latency spike</h1>
                    <p className="text-xs text-[#868f97] mt-1">INC-4721 • Checkout API • Production</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#ffa16c]/10 text-[#ffa16c] text-xs font-medium">Investigating</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-[#a8a8a8]">
                    <IconClock />
                    <span>Started: <span className="text-white font-mono">02:14</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-[#a8a8a8]">
                    <IconUsers />
                    <span>Impact: <span className="text-white font-mono">8,420 users</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-[#a8a8a8]">
                    <IconGlobe />
                    <span>Primary: <span className="text-[#ff6b6b]">EU-West</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-[#a8a8a8]">
                    <IconGlobe />
                    <span>Secondary: <span className="text-[#ffa16c]">EU-Central</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Diagnosis */}
            <div className="rounded-xl border border-[#23262b] bg-[#111113]">
              <div className="px-4 py-3 border-b border-[#23262b] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconBrain />
                  <span className="text-sm font-semibold">AI Diagnosis</span>
                </div>
                <span className="text-xs text-[#868f97]">3 hypotheses analyzed</span>
              </div>
              <div className="p-2">
                {hypotheses.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setSelectedHypothesis(h.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all mb-1 ${
                      selectedHypothesis === h.id 
                        ? 'bg-[#6aa7ff]/10 border border-[#6aa7ff]/30' 
                        : 'hover:bg-[#1a1a1c]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${selectedHypothesis === h.id ? 'text-white' : 'text-[#a8a8a8]'}`}>
                        {h.title}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#868f97]">{h.confidence}%</span>
                        <div className="w-16 h-1.5 bg-[#1a1a1c] rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              h.confidence > 70 ? 'bg-[#ff6b6b]' : h.confidence > 40 ? 'bg-[#ffa16c]' : 'bg-[#4ebe96]'
                            }`}
                            style={{ width: `${h.confidence}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className={getRiskColor(h.risk)}>Risk: {h.risk}</span>
                      <span className="text-[#868f97]">{h.evidence.length} evidence points</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Hypothesis Detail */}
              <div className="px-4 py-3 border-t border-[#23262b] bg-[#0d0d0e]">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[#6aa7ff] uppercase tracking-wider mb-2">Supporting Evidence</p>
                    <ul className="space-y-1.5">
                      {hypotheses[selectedHypothesis].evidence.map((e, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#a8a8a8]">
                          <span className="mt-0.5 text-[#4ebe96]"><IconCheck /></span>
                          <span>{e}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {hypotheses[selectedHypothesis].counterSignals.length > 0 && (
                    <div>
                      <p className="text-xs text-[#ffa16c] uppercase tracking-wider mb-2">Counter-signals</p>
                      <ul className="space-y-1.5">
                        {hypotheses[selectedHypothesis].counterSignals.map((c, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#a8a8a8]">
                            <span className="mt-0.5 text-[#868f97]"><IconX /></span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="pt-2 border-t border-[#23262b]">
                    <p className="text-xs text-[#868f97] mb-1">Recommended Check</p>
                    <p className="text-sm text-white">{hypotheses[selectedHypothesis].recommendedCheck}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operator Notes */}
            <div className="rounded-xl border border-[#23262b] bg-[#111113]">
              <div className="px-4 py-3 border-b border-[#23262b]">
                <div className="flex items-center gap-2">
                  <IconMessage />
                  <span className="text-sm font-semibold">Operator Notes</span>
                </div>
              </div>
              <div className="p-3 space-y-2">
                {operatorNotes.map((note, i) => (
                  <div key={i} className="flex gap-3 p-2 rounded-lg bg-[#0d0d0e]">
                    <div className="h-6 w-6 rounded-full bg-[#23262b] flex items-center justify-center text-xs text-[#6aa7ff] shrink-0">
                      {note.author[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-white">{note.author}</span>
                        <span className="text-xs text-[#868f97]">{note.time}</span>
                      </div>
                      <p className="text-sm text-[#a8a8a8]">{note.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Recommended Action & Evidence Stream */}
          <div className="lg:col-span-4 space-y-4">
            {/* Recommended Action */}
            <div className="rounded-xl border border-[#23262b] bg-[#111113] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#23262b] bg-[#0d0d0e] flex items-center gap-2">
                <IconShield />
                <span className="text-sm font-semibold">Recommended Action</span>
              </div>
              <div className="p-4 space-y-4">
                <div className="p-3 rounded-lg bg-[#6aa7ff]/5 border border-[#6aa7ff]/20">
                  <p className="text-sm text-white font-medium">Rollback Checkout API to v4.17.9</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-2.5 rounded-lg bg-[#0d0d0e]">
                    <p className="text-xs text-[#868f97] mb-1">Est. Recovery</p>
                    <p className="text-white font-mono">6–9 minutes</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0d0d0e]">
                    <p className="text-xs text-[#868f97] mb-1">Risk Level</p>
                    <p className="text-[#4ebe96] font-medium">Low</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0d0d0e]">
                    <p className="text-xs text-[#868f97] mb-1">Schema Migration</p>
                    <p className="text-[#4ebe96] font-medium">None detected</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0d0d0e]">
                    <p className="text-xs text-[#868f97] mb-1">Approval Required</p>
                    <p className="text-white">Incident Lead</p>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-[#ff6b6b] mb-3">Customer impact if delayed: <span className="font-semibold">High</span></p>
                  
                  {rollbackStatus === 'idle' && (
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={handleRollback}
                        className="px-4 py-2.5 rounded-lg bg-[#ff6b6b] text-[#0a0a0b] text-sm font-semibold hover:bg-[#ff5252] transition-colors flex items-center justify-center gap-2"
                      >
                        <IconPlay />
                        Execute Rollback
                      </button>
                      <button className="px-4 py-2.5 rounded-lg border border-[#23262b] text-sm text-[#a8a8a8] hover:border-[#6aa7ff]/50 transition-colors flex items-center justify-center gap-2">
                        <IconPause />
                        Pause Rollout
                      </button>
                    </div>
                  )}
                  
                  {rollbackStatus === 'executing' && (
                    <div className="px-4 py-2.5 rounded-lg bg-[#ffa16c]/20 border border-[#ffa16c]/30 text-center">
                      <span className="text-sm text-[#ffa16c]">Executing rollback...</span>
                    </div>
                  )}
                  
                  {rollbackStatus === 'completed' && (
                    <div className="px-4 py-2.5 rounded-lg bg-[#4ebe96]/20 border border-[#4ebe96]/30 text-center">
                      <span className="text-sm text-[#4ebe96] flex items-center justify-center gap-2">
                        <IconCheck />
                        Rollback completed
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button className="px-3 py-2 rounded-lg border border-[#23262b] text-xs text-[#868f97] hover:text-white hover:border-[#6aa7ff]/30 transition-colors">
                      Ask agent to verify
                    </button>
                    <button className="px-3 py-2 rounded-lg border border-[#23262b] text-xs text-[#868f97] hover:text-white hover:border-[#6aa7ff]/30 transition-colors flex items-center justify-center gap-1.5">
                      <IconBook />
                      Open runbook
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence Stream */}
            <div className="rounded-xl border border-[#23262b] bg-[#111113]">
              <div className="px-4 py-3 border-b border-[#23262b] flex items-center gap-2">
                <IconGitCommit />
                <span className="text-sm font-semibold">Evidence Stream</span>
              </div>
              <div className="p-3">
                <div className="relative">
                  <div className="absolute left-2.5 top-2 bottom-2 w-px bg-[#23262b]" />
                  {evidenceStream.map((ev, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedEvent(i)}
                      className={`relative flex items-start gap-3 w-full p-2 rounded-lg transition-all text-left ${
                        selectedEvent === i ? 'bg-[#1a1a1c]' : 'hover:bg-[#1a1a1c]/50'
                      }`}
                    >
                      <div className={`relative z-10 mt-1 h-2 w-2 rounded-full ${getTypeColor(ev.type)} ring-4 ring-[#111113]`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-[#868f97]">{ev.time}</span>
                          {selectedEvent === i && <span className="text-[#6aa7ff]"><IconChevronDown /></span>}
                        </div>
                        <p className={`text-sm truncate ${selectedEvent === i ? 'text-white' : 'text-[#a8a8a8]'}`}>
                          {ev.event}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Logs */}
            <div className="rounded-xl border border-[#23262b] bg-[#111113]">
              <div className="px-4 py-3 border-b border-[#23262b] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconTerminal />
                  <span className="text-sm font-semibold">Related Logs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#4ebe96] animate-pulse" />
                  <span className="text-xs text-[#868f97]">Live</span>
                </div>
              </div>
              <div className="p-3 font-mono text-xs space-y-1.5 max-h-48 overflow-y-auto">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-3 hover:bg-[#1a1a1c] p-1.5 rounded">
                    <span className="text-[#868f97] w-16 shrink-0">{log.time}</span>
                    <span className={getTypeColor(log.type)}>{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Command & Quick Actions */}
          <div className="lg:col-span-3 space-y-4">
            {/* Command Input */}
            <div className="rounded-xl border border-[#23262b] bg-[#111113]">
              <div className="px-4 py-3 border-b border-[#23262b]">
                <div className="flex items-center gap-2">
                  <IconTerminal />
                  <span className="text-sm font-semibold">Command</span>
                </div>
              </div>
              <div className="p-3">
                <form onSubmit={handleCommandSubmit} className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6aa7ff] font-mono text-sm">/</span>
                  <input
                    type="text"
                    value={commandInput}
                    onChange={(e) => setCommandInput(e.target.value)}
                    placeholder="rollback checkout-api..."
                    className="w-full pl-6 pr-10 py-2.5 bg-[#0d0d0e] border border-[#23262b] rounded-lg text-sm text-white placeholder-[#868f97] focus:outline-none focus:border-[#6aa7ff] font-mono"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#868f97] hover:text-[#6aa7ff] transition-colors"
                  >
                    <IconSend />
                  </button>
                </form>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {['/rollback', '/compare', '/open', '/notify', '/assign'].map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => setCommandInput(cmd + ' ')}
                      className="px-2 py-1 rounded bg-[#1a1a1c] text-xs text-[#868f97] hover:text-white hover:bg-[#23262b] transition-colors font-mono"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
                <div className="mt-3 p-2 rounded bg-[#0d0d0e] border border-[#23262b]">
                  <p className="text-xs text-[#868f97]">Suggested:</p>
                  <p className="text-xs text-[#6aa7ff] font-mono mt-1">/rollback checkout-api v4.17.9 --region eu-west</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="rounded-xl border border-[#23262b] bg-[#111113] p-4 space-y-3">
              <p className="text-sm font-semibold">Impact Overview</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#868f97]">Revenue at risk</span>
                  <span className="text-[#ff6b6b] font-mono">€12.4k/h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#868f97]">Error rate</span>
                  <span className="text-[#ffa16c] font-mono">3.8%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#868f97]">p95 Latency</span>
                  <span className="text-[#ffa16c] font-mono">1240ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#868f97]">Success rate</span>
                  <span className="text-[#4ebe96] font-mono">96.2%</span>
                </div>
              </div>
            </div>

            {/* Triage Status */}
            <div className="rounded-xl border border-[#23262b] bg-[#111113] p-4">
              <p className="text-sm font-semibold mb-3">Triage Status</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-[#4ebe96]" />
                  <span className="text-[#a8a8a8]">Initial detection</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-[#4ebe96]" />
                  <span className="text-[#a8a8a8]">AI analysis complete</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-[#6aa7ff] animate-pulse" />
                  <span className="text-white">Awaiting action</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-[#23262b]" />
                  <span className="text-[#868f97]">Resolution verification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-[#23262b] bg-[#111113] p-5 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-[#ff6b6b]/10 flex items-center justify-center text-[#ff6b6b]">
                <IconAlert />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Confirm Rollback</h3>
                <p className="text-sm text-[#868f97]">This action will revert Checkout API to v4.17.9</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-[#0d0d0e] border border-[#23262b] mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#868f97]">Target version</span>
                <span className="text-white font-mono">v4.17.9</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#868f97]">Region</span>
                <span className="text-white">EU-West</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#868f97]">Estimated recovery</span>
                <span className="text-[#4ebe96]">6–9 minutes</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={confirmRollback}
                className="flex-1 px-4 py-2.5 rounded-lg bg-[#ff6b6b] text-[#0a0a0b] font-semibold hover:bg-[#ff5252] transition-colors"
              >
                Confirm Rollback
              </button>
              <button 
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-[#23262b] text-[#a8a8a8] hover:text-white hover:border-[#6aa7ff]/50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="triage-reveal relative z-10 border-t border-[#23262b] bg-[#0d0d0e] px-4 py-3 md:px-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#868f97]">
          <span>Build: <span className="font-mono text-[#a8a8a8]">v4.18.2</span></span>
          <span>Commit: <span className="font-mono text-[#a8a8a8]">8f42ac9</span></span>
          <span>Cluster: <span className="font-mono text-[#a8a8a8]">prod-eu-west-03</span></span>
          <span>AI Model: <span className="font-mono text-[#6aa7ff]">caldera-triage-v2.1</span></span>
          <span className="hidden md:inline">Last sync: <span className="text-[#4ebe96]">2s ago</span></span>
        </div>
      </footer>
    </div>
  )
}

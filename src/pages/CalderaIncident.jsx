import { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

// Icons as simple SVG components
const IconTerminal = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
  </svg>
)
const IconAlert = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)
const IconClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
)
const IconArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)
const IconServer = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
)
const IconDatabase = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
)
const IconShield = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)
const IconActivity = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
)
const IconGitCommit = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" /><line x1="1.05" y1="12" x2="7" y2="12" /><line x1="17.01" y1="12" x2="22.96" y2="12" />
  </svg>
)
const IconMessage = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)
const IconBook = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
)
const IconUser = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
)
const IconBot = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" />
  </svg>
)
const IconChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)
const IconSend = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

export default function CalderaIncident() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [incidentDuration, setIncidentDuration] = useState(18)
  const [selectedService, setSelectedService] = useState('redis')
  const [selectedTimelineEvent, setSelectedTimelineEvent] = useState(3)
  const [commandInput, setCommandInput] = useState('')
  const [logs, setLogs] = useState([
    { time: '02:22:41', service: 'checkout-api', message: 'cache_pool_wait exceeded 800ms', level: 'warn' },
    { time: '02:22:44', service: 'checkout-api', message: 'payment_intent_create delayed', level: 'warn' },
    { time: '02:22:49', service: 'redis', message: 'connection_pool saturation detected', level: 'error' },
    { time: '02:23:02', service: 'checkout-api', message: 'retry queue increased to 184', level: 'warn' },
    { time: '02:23:17', service: 'fraud-engine', message: 'response stable', level: 'info' },
    { time: '02:23:29', service: 'checkout-api', message: 'p95 latency 1240ms', level: 'error' },
  ])
  const [metrics, setMetrics] = useState({
    p95Latency: 1240,
    errorRate: 3.8,
    impactedUsers: 8420,
    revenueRisk: 12.4,
  })
  const logsEndRef = useRef(null)
  const mainRef = useRef(null)

  // Live clock and incident duration
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
      const newLog = generateRandomLog()
      setLogs(prev => [...prev.slice(-8), newLog])
    }, 4500)
    return () => clearInterval(logTimer)
  }, [])

  // Simulate metric fluctuations
  useEffect(() => {
    const metricTimer = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        p95Latency: Math.max(1100, prev.p95Latency + (Math.random() - 0.5) * 50),
        errorRate: Math.max(3.2, Math.min(4.5, prev.errorRate + (Math.random() - 0.5) * 0.2)),
      }))
    }, 3000)
    return () => clearInterval(metricTimer)
  }, [])

  // Auto-scroll logs (removed - was causing unwanted page scroll)
  // useEffect(() => {
  //   logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  // }, [logs])

  // GSAP reveal animation
  useGSAP(() => {
    gsap.from('.caldera-reveal', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out'
    })
  }, { scope: mainRef })

  const generateRandomLog = () => {
    const services = ['checkout-api', 'redis', 'payment-gateway', 'fraud-engine']
    const messages = [
      'health check passing',
      'connection established',
      'cache hit ratio 94%',
      'request timeout detected',
      'retry attempt 3/5',
      'circuit breaker opened',
    ]
    const levels = ['info', 'warn', 'error']
    return {
      time: currentTime.toTimeString().slice(0, 8),
      service: services[Math.floor(Math.random() * services.length)],
      message: messages[Math.floor(Math.random() * messages.length)],
      level: levels[Math.floor(Math.random() * levels.length)],
    }
  }

  const handleCommandSubmit = (e) => {
    e.preventDefault()
    if (!commandInput.trim()) return
    // Simulate command execution
    setLogs(prev => [...prev, {
      time: currentTime.toTimeString().slice(0, 8),
      service: 'system',
      message: `Command executed: ${commandInput}`,
      level: 'info'
    }])
    setCommandInput('')
  }

  const formatDuration = (minutes) => {
    const mins = Math.floor(minutes)
    const secs = Math.floor((minutes - mins) * 60)
    return `${mins}m ${secs.toString().padStart(2, '0')}s`
  }

  const services = [
    { id: 'checkout', name: 'Checkout API', status: 'degraded', icon: IconServer },
    { id: 'payment', name: 'Payment Gateway', status: 'stable', icon: IconShield },
    { id: 'redis', name: 'Redis Cache', status: 'warning', icon: IconDatabase },
    { id: 'fraud', name: 'Fraud Engine', status: 'stable', icon: IconShield },
    { id: 'inventory', name: 'Inventory Sync', status: 'stable', icon: IconActivity },
    { id: 'notify', name: 'Notification Worker', status: 'delayed', icon: IconActivity },
  ]

  const timeline = [
    { time: '02:04', event: 'Release v4.18.2 started', type: 'deploy' },
    { time: '02:07', event: 'Checkout API deployed to EU-West', type: 'deploy' },
    { time: '02:11', event: 'Latency warning triggered', type: 'warning' },
    { time: '02:14', event: 'Incident opened automatically', type: 'incident' },
    { time: '02:18', event: 'Error rate crossed threshold', type: 'error' },
    { time: '02:24', event: 'AI triage completed', type: 'ai' },
    { time: '02:28', event: 'Rollback suggested', type: 'action' },
  ]

  const agentThread = [
    { sender: 'Caldera Agent', message: 'I found a correlation between release v4.18.2 and Redis pool saturation.', time: '02:24', type: 'agent' },
    { sender: 'Maya Chen', message: 'Check whether the issue is isolated to EU-West.', time: '02:25', type: 'human' },
    { sender: 'Caldera Agent', message: 'EU-West is primary. EU-Central shows early warning signals.', time: '02:26', type: 'agent' },
    { sender: 'Backend On-call', message: 'Rollback is safe. No schema migration detected.', time: '02:27', type: 'human' },
    { sender: 'Caldera Agent', message: 'Recommended action: pause rollout and rollback Checkout API to v4.17.9.', time: '02:28', type: 'agent' },
  ]

  const runbooks = [
    'Checkout rollback procedure',
    'Redis pool saturation response',
    'Payment provider degradation',
    'Customer status update',
    'Postmortem template',
  ]

  const team = [
    { name: 'Maya Chen', role: 'Incident Lead', status: 'active' },
    { name: 'Theo Martin', role: 'Backend On-call', status: 'active' },
    { name: 'Ana Ruiz', role: 'Support Comms', status: 'active' },
    { name: 'Caldera Agent', role: 'Active triage', status: 'ai' },
    { name: 'Payments Team', role: 'Watching', status: 'watching' },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'stable': return 'bg-[#4ebe96]'
      case 'degraded': return 'bg-[#ffa16c]'
      case 'warning': return 'bg-[#ffc93d]'
      case 'delayed': return 'bg-[#479ffa]'
      case 'error': return 'bg-[#ff6b6b]'
      default: return 'bg-[#868f97]'
    }
  }

  const getLogLevelColor = (level) => {
    switch (level) {
      case 'error': return 'text-[#ff6b6b]'
      case 'warn': return 'text-[#ffa16c]'
      case 'info': return 'text-[#4ebe96]'
      default: return 'text-[#868f97]'
    }
  }

  return (
    <div ref={mainRef} className="min-h-screen bg-[#0a0a0b] text-[#e8e8e8] font-sans antialiased selection:bg-[#6aa7ff]/30">
      {/* Subtle grid background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      
      {/* Top gradient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6aa7ff]/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-[#ff6b6b]/5 rounded-full blur-[100px]" />
      </div>

      {/* Header Operationnel */}
      <header className="caldera-reveal relative z-10 border-b border-[#23262b] bg-[#0a0a0b]/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#6aa7ff] to-[#479ffa] flex items-center justify-center">
                <span className="font-bold text-[#0a0a0b] text-sm">C</span>
              </div>
              <span className="font-semibold text-white tracking-tight">CALDERA</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-[#868f97] border-l border-[#23262b] pl-4">
              <span className="font-mono">INC-4721</span>
              <span className="text-[#ffa16c]">●</span>
              <span className="text-[#ffa16c]">Investigating</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2 text-[#868f97]">
                <IconClock />
                <span className="font-mono">{currentTime.toLocaleTimeString('en-US', { hour12: false })}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#868f97]">Duration:</span>
                <span className="font-mono text-[#ffa16c]">{formatDuration(incidentDuration)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-full border border-[#ff6b6b]/30 bg-[#ff6b6b]/10 text-xs font-medium text-[#ff6b6b] hover:bg-[#ff6b6b]/20 transition-colors">
                Escalate
              </button>
              <button className="px-3 py-1.5 rounded-full bg-[#6aa7ff] text-xs font-medium text-[#0a0a0b] hover:bg-[#479ffa] transition-colors">
                Rollback
              </button>
              <button className="px-3 py-1.5 rounded-full border border-[#23262b] bg-[#141416] text-xs font-medium text-[#e8e8e8] hover:border-[#6aa7ff]/50 transition-colors">
                War Room
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Bande de KPIs */}
      <div className="caldera-reveal relative z-10 border-b border-[#23262b] bg-[#0d0d0e] px-4 py-3 md:px-6">
        <div className="flex flex-wrap items-center gap-6 md:gap-10">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#868f97]">p95 latency</span>
            <span className="font-mono text-sm font-semibold text-[#ffa16c]">{Math.round(metrics.p95Latency)} ms</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#868f97]">Error rate</span>
            <span className="font-mono text-sm font-semibold text-[#ffa16c]">{metrics.errorRate.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#868f97]">Impacted users</span>
            <span className="font-mono text-sm font-semibold text-white">{metrics.impactedUsers.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#868f97]">Revenue risk</span>
            <span className="font-mono text-sm font-semibold text-[#ff6b6b]">€{metrics.revenueRisk}k/h</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#868f97]">Active regions</span>
            <span className="font-mono text-sm font-semibold text-[#4ebe96]">3</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#868f97]">Last deploy</span>
            <span className="font-mono text-sm font-medium text-[#868f97]">v4.18.2</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <main className="caldera-reveal relative z-10 p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Left Column - Panneau principal + Service Health */}
          <div className="lg:col-span-4 space-y-4">
            {/* Panneau central principal - Résumé incident */}
            <div className="rounded-xl border border-[#23262b] bg-[#111113] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#23262b] bg-[#0d0d0e] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconAlert />
                  <span className="text-sm font-semibold">Incident Summary</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#ff6b6b]/10 text-[#ff6b6b] text-xs font-mono">P1</span>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <h1 className="text-lg font-semibold text-white">Checkout latency spike</h1>
                  <p className="text-xs text-[#868f97] mt-1">ID: INC-4721 • Checkout API • Production • EU-West</p>
                </div>
                
                <p className="text-sm text-[#a8a8a8] leading-relaxed">
                  Latency increased after release v4.18.2. Checkout API response time is above threshold in EU-West and EU-Central. Initial correlation points to a cache connection pool saturation introduced during the latest deploy.
                </p>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-[#868f97] uppercase tracking-wider">AI Hypotheses</p>
                  {[
                    { label: 'Cache connection pool saturation', confidence: 76 },
                    { label: 'Payment provider timeout', confidence: 42 },
                    { label: 'Frontend checkout regression', confidence: 18 },
                  ].map((h, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-[#1a1a1c] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#6aa7ff] to-[#479ffa] rounded-full"
                          style={{ width: `${h.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs text-[#868f97] w-20 truncate">{h.label}</span>
                      <span className="text-xs font-mono text-[#6aa7ff]">{h.confidence}%</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#23262b]">
                  <p className="text-xs text-[#868f97] mb-2">Recommended action</p>
                  <p className="text-sm text-white">Pause rollout and rollback Checkout API to v4.17.9</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button className="px-3 py-2 rounded-lg bg-[#6aa7ff] text-[#0a0a0b] text-xs font-semibold hover:bg-[#479ffa] transition-colors">
                    Pause rollout
                  </button>
                  <button className="px-3 py-2 rounded-lg border border-[#ff6b6b]/30 bg-[#ff6b6b]/10 text-[#ff6b6b] text-xs font-semibold hover:bg-[#ff6b6b]/20 transition-colors">
                    Rollback release
                  </button>
                  <button className="px-3 py-2 rounded-lg border border-[#23262b] text-xs text-[#a8a8a8] hover:border-[#6aa7ff]/50 transition-colors">
                    Notify status page
                  </button>
                  <button className="px-3 py-2 rounded-lg border border-[#23262b] text-xs text-[#a8a8a8] hover:border-[#6aa7ff]/50 transition-colors">
                    Assign owner
                  </button>
                </div>
              </div>
            </div>

            {/* Service Health */}
            <div className="rounded-xl border border-[#23262b] bg-[#111113]">
              <div className="px-4 py-3 border-b border-[#23262b]">
                <div className="flex items-center gap-2">
                  <IconActivity />
                  <span className="text-sm font-semibold">Service Health</span>
                </div>
              </div>
              <div className="p-2">
                {services.map((service) => {
                  const Icon = service.icon
                  const isSelected = selectedService === service.id
                  return (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                        isSelected 
                          ? 'bg-[#6aa7ff]/10 border border-[#6aa7ff]/30' 
                          : 'hover:bg-[#1a1a1c]'
                      }`}
                    >
                      <Icon />
                      <span className={`text-sm flex-1 text-left ${isSelected ? 'text-white' : 'text-[#a8a8a8]'}`}>
                        {service.name}
                      </span>
                      <span className={`h-2 w-2 rounded-full ${getStatusColor(service.status)}`} />
                      <span className={`text-xs capitalize ${
                        service.status === 'stable' ? 'text-[#4ebe96]' : 
                        service.status === 'degraded' ? 'text-[#ffa16c]' : 
                        service.status === 'warning' ? 'text-[#ffc93d]' : 'text-[#868f97]'
                      }`}>
                        {service.status}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Middle Column - Timeline + Logs */}
          <div className="lg:col-span-5 space-y-4">
            {/* Deploy Timeline */}
            <div className="rounded-xl border border-[#23262b] bg-[#111113]">
              <div className="px-4 py-3 border-b border-[#23262b]">
                <div className="flex items-center gap-2">
                  <IconGitCommit />
                  <span className="text-sm font-semibold">Deploy Timeline</span>
                </div>
              </div>
              <div className="p-4">
                <div className="relative">
                  <div className="absolute left-3 top-2 bottom-2 w-px bg-[#23262b]" />
                  {timeline.map((item, index) => {
                    const isSelected = selectedTimelineEvent === index
                    const typeColors = {
                      deploy: 'bg-[#6aa7ff]',
                      warning: 'bg-[#ffa16c]',
                      incident: 'bg-[#ff6b6b]',
                      error: 'bg-[#ff6b6b]',
                      ai: 'bg-[#9b5cff]',
                      action: 'bg-[#4ebe96]',
                    }
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedTimelineEvent(index)}
                        className={`relative flex items-start gap-3 w-full p-2 rounded-lg transition-all text-left ${
                          isSelected ? 'bg-[#1a1a1c]' : 'hover:bg-[#1a1a1c]/50'
                        }`}
                      >
                        <div className={`relative z-10 mt-1 h-2 w-2 rounded-full ${typeColors[item.type]} ring-4 ring-[#111113]`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-[#868f97]">{item.time}</span>
                            {isSelected && <IconChevronRight />}
                          </div>
                          <p className={`text-sm ${isSelected ? 'text-white' : 'text-[#a8a8a8]'}`}>{item.event}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Live Logs */}
            <div className="rounded-xl border border-[#23262b] bg-[#111113] flex flex-col">
              <div className="px-4 py-3 border-b border-[#23262b] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconTerminal />
                  <span className="text-sm font-semibold">Live Logs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#4ebe96] animate-pulse" />
                  <span className="text-xs text-[#868f97]">Live</span>
                </div>
              </div>
              <div className="p-3 font-mono text-xs space-y-1.5 max-h-64 overflow-y-auto">
                {logs.map((log, index) => (
                  <div key={index} className="flex gap-3 hover:bg-[#1a1a1c] p-1 rounded">
                    <span className="text-[#868f97] w-20 shrink-0">{log.time}</span>
                    <span className="text-[#6aa7ff] w-28 shrink-0">{log.service}</span>
                    <span className={`${getLogLevelColor(log.level)} flex-1`}>{log.message}</span>
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>
            </div>

            {/* Agent Thread */}
            <div className="rounded-xl border border-[#23262b] bg-[#111113]">
              <div className="px-4 py-3 border-b border-[#23262b]">
                <div className="flex items-center gap-2">
                  <IconMessage />
                  <span className="text-sm font-semibold">Agent Thread</span>
                </div>
              </div>
              <div className="p-3 space-y-2">
                {agentThread.map((msg, index) => (
                  <div key={index} className={`flex gap-3 p-2 rounded-lg ${
                    msg.type === 'agent' ? 'bg-[#6aa7ff]/5' : 'bg-[#1a1a1c]'
                  }`}>
                    <div className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${
                      msg.type === 'agent' ? 'bg-[#6aa7ff]/20 text-[#6aa7ff]' : 'bg-[#23262b] text-[#a8a8a8]'
                    }`}>
                      {msg.type === 'agent' ? <IconBot /> : <IconUser />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-medium ${
                          msg.type === 'agent' ? 'text-[#6aa7ff]' : 'text-white'
                        }`}>{msg.sender}</span>
                        <span className="text-xs text-[#868f97]">{msg.time}</span>
                      </div>
                      <p className="text-sm text-[#a8a8a8]">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Runbooks + Team + Command */}
          <div className="lg:col-span-3 space-y-4">
            {/* Runbooks */}
            <div className="rounded-xl border border-[#23262b] bg-[#111113]">
              <div className="px-4 py-3 border-b border-[#23262b]">
                <div className="flex items-center gap-2">
                  <IconBook />
                  <span className="text-sm font-semibold">Runbooks</span>
                </div>
              </div>
              <div className="p-2">
                {runbooks.map((book, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#a8a8a8] hover:bg-[#1a1a1c] hover:text-white transition-colors text-left"
                  >
                    <span className="truncate">{book}</span>
                    <IconArrowRight />
                  </button>
                ))}
              </div>
            </div>

            {/* Team Status */}
            <div className="rounded-xl border border-[#23262b] bg-[#111113]">
              <div className="px-4 py-3 border-b border-[#23262b]">
                <div className="flex items-center gap-2">
                  <IconUser />
                  <span className="text-sm font-semibold">Team Status</span>
                </div>
              </div>
              <div className="p-3 space-y-2">
                {team.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${
                      member.status === 'active' ? 'bg-[#4ebe96]' :
                      member.status === 'ai' ? 'bg-[#6aa7ff]' :
                      'bg-[#868f97]'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{member.name}</p>
                      <p className="text-xs text-[#868f97]">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
                    placeholder="rollback checkout-api v4.17.9..."
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
                  {['/rollback', '/assign', '/notify', '/open', '/summarize'].map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => setCommandInput(cmd + ' ')}
                      className="px-2 py-1 rounded bg-[#1a1a1c] text-xs text-[#868f97] hover:text-white hover:bg-[#23262b] transition-colors font-mono"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Metadata */}
      <footer className="caldera-reveal relative z-10 border-t border-[#23262b] bg-[#0d0d0e] px-4 py-3 md:px-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#868f97]">
          <span>Build: <span className="font-mono text-[#a8a8a8]">v4.18.2</span></span>
          <span>Commit: <span className="font-mono text-[#a8a8a8]">8f42ac9</span></span>
          <span>Cluster: <span className="font-mono text-[#a8a8a8]">prod-eu-west-03</span></span>
          <span>Trace sampling: <span className="font-mono text-[#a8a8a8]">12%</span></span>
          <span>Last sync: <span className="font-mono text-[#4ebe96]">4s ago</span></span>
          <span className="hidden md:inline">Data source: Metrics, logs, deploy events, traces</span>
        </div>
      </footer>
    </div>
  )
}

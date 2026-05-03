import { useNavigate } from 'react-router-dom'

// ── Violet Control Room token system ─────────────────────────────────────────
const C = {
  canvas:       '#000000',
  surface:      '#090911',
  surfaceMuted: '#121225',
  surfaceUp:    '#1c1b35',
  text:         '#f8f7ff',
  textMuted:    '#a9a3c7',
  line:         'rgba(174,133,255,.22)',
  action:       '#9b5cff',
  signal:       '#00e5ff',
  danger:       '#ff4f81',
  warning:      '#fbbf24',
  success:      '#34d399',
}

const STATUS = {
  Online:   { bg: 'rgba(52,211,153,.13)',  fg: '#34d399' },
  Active:   { bg: 'rgba(0,229,255,.13)',   fg: '#00e5ff' },
  Watching: { bg: 'rgba(251,191,36,.14)',  fg: '#fbbf24' },
  Alert:    { bg: 'rgba(255,79,129,.14)',  fg: '#ff4f81' },
  Neutral:  { bg: 'rgba(255,255,255,.05)', fg: '#a9a3c7' },
}

// ── Data ──────────────────────────────────────────────────────────────────────
const HERO_ZONES = [
  { id: 'main-stage', label: 'Main Stage',   sub: 'Cap. 4,200',  status: 'Active'   },
  { id: 'vip',        label: 'VIP Zone',     sub: '210 in',      status: 'Online'   },
  { id: 'entrance',   label: 'Entrance',     sub: 'Flow rising', status: 'Watching' },
  { id: 'floor',      label: 'Floor Zone',   sub: 'Zone A–C',    status: 'Online'   },
  { id: 'bar-e',      label: 'Bar East',     sub: '3 staff',     status: 'Online'   },
  { id: 'gate-a',     label: 'Gate A',       sub: 'Open',        status: 'Online'   },
  { id: 'backstage',  label: 'Backstage',    sub: 'Crew only',   status: 'Neutral'  },
  { id: 'security',   label: 'Security',     sub: 'Unit 3',      status: 'Online'   },
  { id: 'gate-b',     label: 'Gate B',       sub: 'Delay — 4m',  status: 'Alert'    },
]

const SIGNALS = [
  { time: '22:14', zone: 'Main Stage',   event: 'Density rising',   state: 'Watching' },
  { time: '22:18', zone: 'Gate B',       event: 'Access delay',     state: 'Alert'    },
  { time: '22:21', zone: 'VIP Corridor', event: 'Corridor stable',  state: 'Online'   },
  { time: '22:26', zone: 'Audio Relay',  event: 'Sync issue',       state: 'Watching' },
]

const QUEUE = [
  { id: 'Q-004', type: 'Crowd density check', zone: 'Main Stage', assigned: 'Unit 3', state: 'Watching' },
  { id: 'Q-005', type: 'Gate access delay',   zone: 'Gate B',     assigned: 'Unit 7', state: 'Alert'    },
  { id: 'Q-006', type: 'Perimeter check',     zone: 'East Fence', assigned: 'Unit 1', state: 'Online'   },
]

const MAP_ROWS = [
  [
    { label: 'Main Stage',  sub: 'Cap. 4,200',  status: 'Active',   fr: 2 },
    { label: 'VIP Area',    sub: '210 in',      status: 'Online',   fr: 1 },
  ],
  [
    { label: 'Floor Zone',  sub: 'Zone A–C',    status: 'Online',   fr: 1 },
    { label: 'Bar East',    sub: '3 staff',     status: 'Online',   fr: 1 },
    { label: 'Bar West',    sub: '2 staff',     status: 'Online',   fr: 1 },
  ],
  [
    { label: 'Entrance',    sub: 'Flow normal', status: 'Online',   fr: 1 },
    { label: 'Gate A',      sub: 'Open',        status: 'Online',   fr: 1 },
    { label: 'Gate B',      sub: 'Delay — 4m',  status: 'Alert',    fr: 1 },
    { label: 'Backstage',   sub: 'Crew only',   status: 'Neutral',  fr: 1 },
  ],
]

const FEATURES = [
  {
    id: 'crowd',  num: '01', color: C.signal,
    title: 'Crowd flow monitoring',
    body: 'Real-time density tracking across all zones with automatic alerts when crowd thresholds approach unsafe levels.',
    stat: '42 zones tracked',
  },
  {
    id: 'alerts', num: '02', color: C.action,
    title: 'Real-time incident alerts',
    body: 'Every signal is timestamped, categorized, and routed to the right operator within seconds of detection.',
    stat: '1.2M signals / event',
  },
  {
    id: 'sync',   num: '03', color: '#a78bfa',
    title: 'Venue system synchronization',
    body: 'Access control, audio, lighting and security cameras connected into one coherent operational layer.',
    stat: '18 venues synced',
  },
  {
    id: 'tl',     num: '04', color: C.success,
    title: 'Operator event timeline',
    body: 'A single timeline across crew shifts, security rotations, stage cues and live signal history.',
    stat: '99.9% uptime',
  },
]

const USE_CASES = [
  {
    id: 'clubs',   tag: 'Permanent install',
    title: 'Clubs & nightlife venues',
    body: 'Permanent installs with rolling shift coverage, access log archives and crowd pattern learning across seasons.',
  },
  {
    id: 'festiv',  tag: 'Multi-stage ops',
    title: 'Music festivals',
    body: 'Multi-stage, multi-gate, multi-crew operations with a unified command layer and real-time zone status.',
  },
  {
    id: 'imm',     tag: 'Brand activation',
    title: 'Immersive brand events',
    body: 'Activations where experience flow and safety monitoring run in parallel without friction.',
  },
]

const PLANS = [
  {
    id: 'pulse', name: 'Pulse', price: '€29', period: '/month', featured: false,
    target: 'Small venues and club nights',
    features: ['Up to 8 zones', '1 operator seat', 'Signal feed', 'Email alerts', '30-day log archive'],
    cta: 'Start free trial',
  },
  {
    id: 'grid', name: 'Grid', price: '€99', period: '/month', featured: true,
    target: 'Live events and regular programming',
    features: ['Up to 42 zones', '5 operator seats', 'Live signal feed', 'SMS + push alerts', 'Security queue', 'API access'],
    cta: 'Get started',
  },
  {
    id: 'blackout', name: 'Blackout', price: 'Custom', period: '', featured: false,
    target: 'Festivals and large accounts',
    features: ['Unlimited zones', 'Unlimited seats', 'Dedicated engineer', 'SLA guarantee', 'Custom integrations', 'White-label option'],
    cta: 'Contact sales',
  },
]

// ── Injected CSS ──────────────────────────────────────────────────────────────
const NG_CSS = `
  .ng-root {
    background: #000000;
    color: #f8f7ff;
    font-family: 'Geist', system-ui, -apple-system, sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }
  .ng-mono { font-family: 'Geist Mono', ui-monospace, monospace; }
  .ng-atm {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(circle at 72% 8%, rgba(155,92,255,.15) 0%, transparent 38%),
      radial-gradient(circle at 10% 65%, rgba(0,229,255,.08) 0%, transparent 34%);
  }
  .ng-scan {
    position: fixed; inset: 0; pointer-events: none; z-index: 1;
    background-image: repeating-linear-gradient(0deg, rgba(255,255,255,.028) 0 1px, transparent 1px 5px);
    opacity: .22; mix-blend-mode: screen;
  }
  @keyframes ng-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(.78)} }
  @keyframes ng-glow  { 0%,100%{box-shadow:0 0 20px rgba(155,92,255,.42)} 50%{box-shadow:0 0 42px rgba(155,92,255,.72)} }
  .ng-dot  { animation: ng-pulse 2s ease-in-out infinite; }
  .ng-cta  { animation: ng-glow  3s ease-in-out infinite; }
  .ng-cta:hover  { transform: translateY(-2px) !important; }
  .ng-ghost:hover { background: rgba(174,133,255,.1) !important; border-color: rgba(174,133,255,.5) !important; }
  .ng-card:hover  { border-color: rgba(155,92,255,.5) !important; transform: translateY(-2px); }
  .ng-zone:hover  { border-color: rgba(155,92,255,.5) !important; }
  .ng-sig:hover   { background: rgba(155,92,255,.05) !important; border-color: rgba(155,92,255,.4) !important; }
  .ng-plan:hover  { transform: translateY(-2px); }
  @media (prefers-reduced-motion: reduce) {
    .ng-dot,.ng-cta { animation: none !important; }
    .ng-cta:hover,.ng-card:hover,.ng-plan:hover { transform: none !important; }
  }
`

// ── Root ──────────────────────────────────────────────────────────────────────
export default function NightgridLanding() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: NG_CSS }} />
      <div className="ng-root">
        <div className="ng-atm" aria-hidden="true" />
        <div className="ng-scan" aria-hidden="true" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <NgNav />
          <NgHero />
          <NgDashboard />
          <NgFeatures />
          <NgUseCases />
          <NgPricing />
          <NgCTA />
          <NgFooter />
        </div>
      </div>
    </>
  )
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function NgNav() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(0,0,0,.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(174,133,255,.15)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 6,
              background: C.action, flexShrink: 0,
              boxShadow: '0 0 14px rgba(155,92,255,.55)',
              display: 'grid', placeItems: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="4" height="4" rx=".8" fill="white" />
                <rect x="8" y="2" width="4" height="4" rx=".8" fill="white" opacity=".5" />
                <rect x="2" y="8" width="4" height="4" rx=".8" fill="white" opacity=".5" />
                <rect x="8" y="8" width="4" height="4" rx=".8" fill="white" />
              </svg>
            </div>
            <span className="ng-mono" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em' }}>NIGHTGRID</span>
          </div>

          {/* Links */}
          <nav className="hidden md:flex" style={{ gap: 28, display: 'flex', alignItems: 'center' }}>
            {['Overview', 'Live Map', 'Signals', 'Pricing'].map(l => (
              <a key={l} href={`#ng-${l.toLowerCase().replace(' ', '-')}`} className="ng-mono" style={{
                fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: C.textMuted, textDecoration: 'none',
              }}>{l}</a>
            ))}
          </nav>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '5px 12px', borderRadius: 999,
              background: 'rgba(52,211,153,.1)', border: '1px solid rgba(52,211,153,.28)',
            }}>
              <span className="ng-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: C.success, flexShrink: 0 }} />
              <span className="ng-mono" style={{ fontSize: 9, letterSpacing: '0.16em', color: C.success, textTransform: 'uppercase' }}>
                Live System
              </span>
            </div>
            <button className="ng-cta ng-mono hidden md:block" style={{
              padding: '9px 20px', borderRadius: 999, background: C.action, color: '#000',
              border: 'none', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'transform 180ms ease',
            }}>
              Request Access
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function NgHero() {
  const navigate = useNavigate()
  return (
    <section id="ng-overview" style={{ padding: 'clamp(60px,8vw,100px) 24px 56px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'grid', gap: 48, alignItems: 'center' }} className="lg:grid-cols-[1.1fr_0.9fr]">

        {/* Copy */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.signal }} />
            <span className="ng-mono" style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.signal }}>
              Live Event Intelligence
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(3rem,7vw,5.6rem)',
            fontWeight: 600, lineHeight: .88,
            letterSpacing: '-0.03em', color: C.text,
            marginBottom: 22, textWrap: 'balance',
          }}>
            Control the night<br />before it breaks.
          </h1>

          <p style={{ fontSize: 16, lineHeight: 1.7, color: C.textMuted, maxWidth: 460, marginBottom: 36 }}>
            NIGHTGRID connects crowd signals, venue systems and security alerts into one real-time command layer.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 52 }}>
            <button className="ng-cta ng-mono" style={{
              padding: '13px 28px', borderRadius: 999, background: C.action, color: '#000',
              border: 'none', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', cursor: 'pointer', transition: 'transform 180ms ease',
            }}>
              Launch Preview
            </button>
            <button className="ng-ghost ng-mono" onClick={() => navigate('/skills/cyber-neon/map')} style={{
              padding: '13px 28px', borderRadius: 999,
              background: 'transparent', color: C.text,
              border: `1px solid ${C.line}`,
              fontSize: 12, fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', cursor: 'pointer', transition: 'all 180ms ease',
            }}>
              View Live Map
            </button>
          </div>

          {/* Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }} className="sm:grid-cols-4">
            {[['42','Active zones'],['18','Synced venues'],['1.2M','Signals processed'],['99.9%','Uptime']].map(([v,l]) => (
              <div key={l} style={{ padding: '13px 14px', background: C.surface, border: `1px solid ${C.line}`, borderRadius: 6 }}>
                <p className="ng-mono" style={{ fontSize: 20, fontWeight: 700, color: C.action, letterSpacing: '-0.02em', marginBottom: 4 }}>{v}</p>
                <p className="ng-mono" style={{ fontSize: 9, letterSpacing: '0.16em', color: C.textMuted, textTransform: 'uppercase' }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Zone map preview */}
        <div style={{
          background: C.surface, border: `1px solid ${C.line}`, borderRadius: 12,
          overflow: 'hidden', boxShadow: '0 0 80px rgba(155,92,255,.22)', position: 'relative',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${C.action},transparent)` }} />

          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="ng-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: C.success }} />
              <span className="ng-mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: C.textMuted, textTransform: 'uppercase' }}>Live Zone Map</span>
            </div>
            <span className="ng-mono" style={{ fontSize: 9, color: C.signal }}>
              {HERO_ZONES.filter(z => ['Online','Active'].includes(z.status)).length} zones online
            </span>
          </div>

          <div style={{ padding: 12, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7 }}>
            {HERO_ZONES.map(zone => {
              const s = STATUS[zone.status]
              return (
                <div key={zone.id} className="ng-zone" style={{ padding: '10px 12px', background: s.bg, border: `1px solid ${s.fg}35`, borderRadius: 5, transition: 'all 180ms ease', cursor: 'default' }}>
                  <p className="ng-mono" style={{ fontSize: 7, letterSpacing: '0.16em', color: s.fg, textTransform: 'uppercase', marginBottom: 5 }}>{zone.status}</p>
                  <p style={{ fontSize: 11, fontWeight: 600, color: C.text, lineHeight: 1.2, marginBottom: 3 }}>{zone.label}</p>
                  <p className="ng-mono" style={{ fontSize: 9, color: C.textMuted }}>{zone.sub}</p>
                </div>
              )
            })}
          </div>

          <div style={{ padding: '10px 16px', borderTop: `1px solid ${C.line}`, background: 'rgba(0,0,0,.7)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="ng-mono" style={{ fontSize: 9, color: C.warning }}>22:18 — Gate B access delay — Alert</span>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.warning, animation: 'ng-pulse 1.8s ease-in-out infinite' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function NgDashboard() {
  return (
    <section id="ng-live-map" style={{ padding: '56px 24px', maxWidth: 1280, margin: '0 auto' }}>
      <SectionHead eyebrow="Interface Layer" title="One surface. Every signal." body="A command layer built for operators who need to act, not search." />

      <div style={{ display: 'grid', gap: 14 }} className="lg:grid-cols-[1.3fr_1fr]">
        {/* Zone map */}
        <NgZoneMap />

        {/* Right stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <NgSignals />
          <div style={{ display: 'grid', gap: 14 }} className="md:grid-cols-2">
            <NgSecurityQueue />
            <NgSystemHealth />
          </div>
        </div>
      </div>
    </section>
  )
}

function NgZoneMap() {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="ng-mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: C.textMuted, textTransform: 'uppercase' }}>
          Live Zone Map — Festival Ground
        </span>
        <div style={{ display: 'flex', gap: 5 }}>
          {['Online','Alert','Watching'].map(k => {
            const s = STATUS[k]
            return (
              <span key={k} className="ng-mono" style={{ padding: '2px 7px', borderRadius: 999, background: s.bg, border: `1px solid ${s.fg}40`, color: s.fg, fontSize: 7, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {k}
              </span>
            )
          })}
        </div>
      </div>
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 7 }}>
        {MAP_ROWS.map((row, ri) => (
          <div key={ri} style={{ display: 'grid', gridTemplateColumns: row.map(z => `${z.fr}fr`).join(' '), gap: 7 }}>
            {row.map(zone => {
              const s = STATUS[zone.status]
              return (
                <div key={zone.label} className="ng-zone" style={{ padding: '12px 13px', background: s.bg, border: `1px solid ${s.fg}30`, borderRadius: 5, transition: 'all 180ms ease', cursor: 'default' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: C.text }}>{zone.label}</p>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.fg, flexShrink: 0, marginTop: 3 }} />
                  </div>
                  <p className="ng-mono" style={{ fontSize: 9, color: C.textMuted }}>{zone.sub}</p>
                  <p className="ng-mono" style={{ fontSize: 7, color: s.fg, textTransform: 'uppercase', letterSpacing: '0.14em', marginTop: 5 }}>{zone.status}</p>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

function NgSignals() {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="ng-mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: C.textMuted, textTransform: 'uppercase' }}>Active Signals</span>
        <span className="ng-mono" style={{ padding: '3px 9px', borderRadius: 999, background: 'rgba(52,211,153,.1)', border: '1px solid rgba(52,211,153,.28)', color: C.success, fontSize: 8, letterSpacing: '0.12em' }}>
          4 live
        </span>
      </div>
      <div>
        {SIGNALS.map((sig, i) => {
          const s = STATUS[sig.state]
          return (
            <div key={i} className="ng-sig" style={{ padding: '10px 16px', display: 'grid', gridTemplateColumns: '44px 1fr auto', gap: 10, alignItems: 'center', borderBottom: i < SIGNALS.length - 1 ? `1px solid rgba(174,133,255,.1)` : 'none', transition: 'all 180ms ease' }}>
              <span className="ng-mono" style={{ fontSize: 9, color: C.textMuted }}>{sig.time}</span>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 2 }}>{sig.zone}</p>
                <p className="ng-mono" style={{ fontSize: 9, color: C.textMuted }}>{sig.event}</p>
              </div>
              <span className="ng-mono" style={{ padding: '3px 8px', borderRadius: 999, background: s.bg, color: s.fg, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                {sig.state}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function NgSecurityQueue() {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '11px 14px', borderBottom: `1px solid ${C.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="ng-mono" style={{ fontSize: 9, letterSpacing: '0.18em', color: C.textMuted, textTransform: 'uppercase' }}>Security Queue</span>
        <span className="ng-mono" style={{ fontSize: 9, color: C.warning }}>3 open</span>
      </div>
      <div>
        {QUEUE.map((item, i) => {
          const s = STATUS[item.state]
          return (
            <div key={item.id} style={{ padding: '9px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i < QUEUE.length - 1 ? `1px solid rgba(174,133,255,.1)` : 'none' }}>
              <div>
                <p className="ng-mono" style={{ fontSize: 8, color: C.textMuted, marginBottom: 3 }}>{item.id}</p>
                <p style={{ fontSize: 11, fontWeight: 600, color: C.text, marginBottom: 2 }}>{item.type}</p>
                <p className="ng-mono" style={{ fontSize: 8, color: C.textMuted }}>{item.zone} · {item.assigned}</p>
              </div>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: s.fg, flexShrink: 0 }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function NgSystemHealth() {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '11px 14px', borderBottom: `1px solid ${C.line}` }}>
        <span className="ng-mono" style={{ fontSize: 9, letterSpacing: '0.18em', color: C.textMuted, textTransform: 'uppercase' }}>System Health</span>
      </div>
      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 11 }}>
        {[
          { label: 'Signal relay',   value: 99.9, color: C.success },
          { label: 'Zone sync',      value: 97.2, color: C.signal  },
          { label: 'Alert pipeline', value: 84.0, color: C.warning },
        ].map(({ label, value, color }) => (
          <div key={label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span className="ng-mono" style={{ fontSize: 9, color: C.textMuted }}>{label}</span>
              <span className="ng-mono" style={{ fontSize: 9, color }}>{value}%</span>
            </div>
            <div style={{ height: 3, background: 'rgba(255,255,255,.07)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: 999 }} />
            </div>
          </div>
        ))}
        <div style={{ height: 1, background: `rgba(174,133,255,.15)`, margin: '3px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="ng-mono" style={{ fontSize: 9, color: C.textMuted }}>Overall uptime</span>
          <span className="ng-mono" style={{ fontSize: 13, fontWeight: 700, color: C.success }}>99.9%</span>
        </div>
      </div>
    </div>
  )
}

// ── Features ──────────────────────────────────────────────────────────────────
function NgFeatures() {
  return (
    <section id="ng-signals" style={{ padding: '56px 24px', maxWidth: 1280, margin: '0 auto' }}>
      <SectionHead eyebrow="Core Capabilities" title="Every layer of a live event, connected." />
      <div style={{ display: 'grid', gap: 14 }} className="md:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(f => (
          <div key={f.id} className="ng-card" style={{ padding: 22, background: C.surface, border: `1px solid ${C.line}`, borderRadius: 8, transition: 'all 200ms ease' }}>
            <div style={{ width: 34, height: 34, borderRadius: 7, background: `${f.color}18`, border: `1px solid ${f.color}35`, display: 'grid', placeItems: 'center', marginBottom: 16 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: f.color }} />
            </div>
            <span className="ng-mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: C.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>{f.num}</span>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: C.text, lineHeight: 1.2, marginBottom: 10 }}>{f.title}</h3>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: C.textMuted, marginBottom: 16 }}>{f.body}</p>
            <span className="ng-mono" style={{ display: 'inline-flex', padding: '4px 10px', borderRadius: 999, background: `${f.color}14`, border: `1px solid ${f.color}30`, color: f.color, fontSize: 9, letterSpacing: '0.1em' }}>
              {f.stat}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Use Cases ─────────────────────────────────────────────────────────────────
function NgUseCases() {
  return (
    <section style={{ padding: '56px 24px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ padding: 'clamp(36px,5vw,60px)', background: C.surface, border: `1px solid ${C.line}`, borderTop: `1px solid ${C.action}`, borderRadius: 12, boxShadow: '0 0 60px rgba(155,92,255,.1)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 85% 0%, rgba(155,92,255,.1) 0%, transparent 48%)' }} />

        <div style={{ position: 'relative', marginBottom: 44 }}>
          <span className="ng-mono" style={{ fontSize: 9, letterSpacing: '0.22em', color: C.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>Use Cases</span>
          <h2 style={{ fontSize: 'clamp(2rem,4.5vw,3.4rem)', fontWeight: 600, lineHeight: .95, letterSpacing: '-0.03em', color: C.text, maxWidth: 560 }}>
            Built for teams<br />operating after dark.
          </h2>
        </div>

        <div style={{ display: 'grid', gap: 14, position: 'relative' }} className="md:grid-cols-3">
          {USE_CASES.map((uc, i) => (
            <div key={uc.id} style={{ padding: 24, background: 'rgba(255,255,255,.025)', border: `1px solid rgba(174,133,255,.16)`, borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <span className="ng-mono" style={{ fontSize: 9, color: C.textMuted, letterSpacing: '0.1em' }}>{String(i + 1).padStart(2, '0')}</span>
                <span className="ng-mono" style={{ padding: '3px 9px', borderRadius: 999, background: 'rgba(155,92,255,.14)', border: '1px solid rgba(155,92,255,.3)', color: C.action, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {uc.tag}
                </span>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: C.text, lineHeight: 1.2, marginBottom: 10 }}>{uc.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: C.textMuted }}>{uc.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Pricing ───────────────────────────────────────────────────────────────────
function NgPricing() {
  return (
    <section id="ng-pricing" style={{ padding: '56px 24px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ marginBottom: 36, textAlign: 'center' }}>
        <span className="ng-mono" style={{ fontSize: 9, letterSpacing: '0.22em', color: C.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>Pricing</span>
        <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, lineHeight: 1.0, letterSpacing: '-0.025em', color: C.text }}>One system, three scales.</h2>
      </div>

      <div style={{ display: 'grid', gap: 14, alignItems: 'stretch' }} className="md:grid-cols-3">
        {PLANS.map(plan => (
          <div key={plan.id} className="ng-plan" style={{ background: plan.featured ? C.surfaceMuted : C.surface, border: plan.featured ? `1px solid ${C.action}` : `1px solid ${C.line}`, borderRadius: 10, padding: 26, boxShadow: plan.featured ? '0 0 40px rgba(155,92,255,.2)' : 'none', position: 'relative', overflow: 'hidden', transition: 'all 200ms ease' }}>
            {plan.featured && (
              <>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${C.action},transparent)` }} />
                <span className="ng-mono" style={{ position: 'absolute', top: 14, right: 14, padding: '3px 9px', borderRadius: 999, background: 'rgba(155,92,255,.16)', border: '1px solid rgba(155,92,255,.38)', color: C.action, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Popular
                </span>
              </>
            )}

            <div style={{ marginBottom: 18 }}>
              <h3 style={{ fontSize: 19, fontWeight: 700, color: C.text, marginBottom: 4 }}>{plan.name}</h3>
              <p className="ng-mono" style={{ fontSize: 9, color: C.textMuted }}>{plan.target}</p>
            </div>

            <div style={{ marginBottom: 22 }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: plan.featured ? C.action : C.text }}>{plan.price}</span>
              {plan.period && <span className="ng-mono" style={{ fontSize: 11, color: C.textMuted, marginLeft: 4 }}>{plan.period}</span>}
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {plan.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: plan.featured ? C.action : C.textMuted, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: C.textMuted }}>{f}</span>
                </li>
              ))}
            </ul>

            <button className="ng-mono" style={{ width: '100%', padding: '12px 20px', borderRadius: 999, background: plan.featured ? C.action : 'transparent', color: plan.featured ? '#000' : C.text, border: plan.featured ? 'none' : `1px solid ${C.line}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: plan.featured ? '0 0 18px rgba(155,92,255,.3)' : 'none' }}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Final CTA ─────────────────────────────────────────────────────────────────
function NgCTA() {
  return (
    <section style={{ padding: '56px 24px 80px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', padding: 'clamp(44px,6vw,76px) clamp(24px,5vw,80px)', background: C.surface, border: `1px solid ${C.line}`, borderRadius: 12, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 50% 50%, rgba(155,92,255,.13) 0%, transparent 58%)' }} />
        <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: `linear-gradient(90deg,transparent,${C.action},transparent)` }} />

        <div style={{ position: 'relative' }}>
          <span className="ng-mono" style={{ fontSize: 9, letterSpacing: '0.22em', color: C.signal, textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>Get Started</span>
          <h2 style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 600, lineHeight: .95, letterSpacing: '-0.03em', color: C.text, maxWidth: 500, margin: '0 auto 16px' }}>
            Bring your venue online.
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: C.textMuted, maxWidth: 420, margin: '0 auto 34px' }}>
            Turn scattered signals into one live command surface.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <button className="ng-cta ng-mono" style={{ padding: '14px 32px', borderRadius: 999, background: C.action, color: '#000', border: 'none', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', transition: 'transform 180ms ease' }}>
              Request Access
            </button>
            <button className="ng-ghost ng-mono" style={{ padding: '14px 32px', borderRadius: 999, background: 'transparent', color: C.text, border: `1px solid ${C.line}`, fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 180ms ease' }}>
              Open Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function NgFooter() {
  return (
    <footer style={{ maxWidth: 1280, margin: '0 auto', padding: '18px 24px 32px', borderTop: `1px solid rgba(174,133,255,.13)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
      <span className="ng-mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: C.text }}>
        NIGHTGRID <span style={{ fontWeight: 400, color: C.textMuted }}>— Real-time event intelligence</span>
      </span>
      <div style={{ display: 'flex', gap: 18 }}>
        {['Privacy','Terms','Status','Docs'].map(l => (
          <a key={l} href="#" className="ng-mono" style={{ fontSize: 9, letterSpacing: '0.12em', color: C.textMuted, textDecoration: 'none', textTransform: 'uppercase' }}>{l}</a>
        ))}
      </div>
    </footer>
  )
}

// ── Shared ────────────────────────────────────────────────────────────────────
function SectionHead({ eyebrow, title, body }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <span className="ng-mono" style={{ fontSize: 9, letterSpacing: '0.22em', color: C.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>{eyebrow}</span>
      <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 600, lineHeight: 1.0, letterSpacing: '-0.025em', color: C.text, maxWidth: 520, marginBottom: body ? 10 : 0 }}>{title}</h2>
      {body && <p style={{ fontSize: 14, lineHeight: 1.65, color: C.textMuted, maxWidth: 460 }}>{body}</p>}
    </div>
  )
}

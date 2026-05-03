import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ── Token system ──────────────────────────────────────────────────────────────
const C = {
  canvas:       '#000000',
  surface:      '#090911',
  surfaceMuted: '#121225',
  text:         '#f8f7ff',
  textMuted:    '#a9a3c7',
  line:         'rgba(174,133,255,.20)',
  action:       '#9b5cff',
  signal:       '#00e5ff',
  danger:       '#ff4f81',
  warning:      '#fbbf24',
  success:      '#34d399',
}

const STATUS = {
  Online:   { bg: 'rgba(52,211,153,.1)',   fg: '#34d399' },
  Active:   { bg: 'rgba(0,229,255,.1)',    fg: '#00e5ff' },
  Watching: { bg: 'rgba(155,92,255,.12)',  fg: '#9b5cff' },
  Warning:  { bg: 'rgba(251,191,36,.13)',  fg: '#fbbf24' },
  Alert:    { bg: 'rgba(255,79,129,.13)',  fg: '#ff4f81' },
  Neutral:  { bg: 'rgba(255,255,255,.04)', fg: '#a9a3c7' },
}

// ── Static data ───────────────────────────────────────────────────────────────
const MAP_ZONES = [
  { id: 'north-gate',   label: 'North Gate',       type: 'GATE',    status: 'Online',   density: 45, col: '1/2', row: '1/2', units: 2 },
  { id: 'staff-zone',   label: 'Staff Zone',        type: 'STAFF',   status: 'Neutral',  density: 20, col: '2/3', row: '1/2', units: 0 },
  { id: 'backstage',    label: 'Backstage Access',  type: 'STAFF',   status: 'Online',   density: 30, col: '3/4', row: '1/2', units: 1 },
  { id: 'power-core',   label: 'Power Core',        type: 'TECH',    status: 'Online',   density: 0,  col: '4/5', row: '1/2', units: 0 },
  { id: 'main-stage',   label: 'Main Stage',        type: 'STAGE',   status: 'Alert',    density: 92, col: '1/3', row: '2/4', units: 4 },
  { id: 'vip-terrace',  label: 'VIP Terrace',       type: 'VIP',     status: 'Warning',  density: 78, col: '3/4', row: '2/3', units: 1 },
  { id: 'security-hub', label: 'Security Hub',      type: 'SEC',     status: 'Active',   density: 0,  col: '4/5', row: '2/3', units: 3 },
  { id: 'warehouse',    label: 'Warehouse Stage',   type: 'STAGE',   status: 'Active',   density: 65, col: '3/5', row: '3/4', units: 2 },
  { id: 'medical',      label: 'Medical Point',     type: 'MED',     status: 'Alert',    density: 0,  col: '1/2', row: '4/5', units: 2 },
  { id: 'food-court',   label: 'Food Court',        type: 'AREA',    status: 'Active',   density: 55, col: '2/3', row: '4/5', units: 1 },
  { id: 'riverside',    label: 'Riverside Stage',   type: 'STAGE',   status: 'Online',   density: 48, col: '1/2', row: '5/6', units: 1 },
  { id: 'south-gate',   label: 'South Gate',        type: 'GATE',    status: 'Warning',  density: 60, col: '2/3', row: '5/6', units: 2 },
  { id: 'parking-east', label: 'Parking East',      type: 'PARK',    status: 'Online',   density: 35, col: '3/4', row: '4/6', units: 0 },
  { id: 'parking-west', label: 'Parking West',      type: 'PARK',    status: 'Online',   density: 40, col: '4/5', row: '4/6', units: 0 },
]

const INCIDENTS = [
  { id: 'INC-041', time: '23:14', zone: 'Main Stage',   event: 'Density spike',          state: 'Watching' },
  { id: 'INC-042', time: '23:18', zone: 'South Gate',   event: 'Queue delay',            state: 'Warning'  },
  { id: 'INC-043', time: '23:21', zone: 'VIP Terrace',  event: 'Access restricted',      state: 'Alert'    },
  { id: 'INC-044', time: '23:26', zone: 'Audio Relay',  event: 'Relay instability',      state: 'Warning'  },
  { id: 'INC-045', time: '23:31', zone: 'Food Court',   event: 'Medical intervention',   state: 'Active'   },
]

const TEAMS = [
  { id: 'U03',   label: 'Unit 03',       zone: 'South Gate', state: 'Deployed',   color: C.signal  },
  { id: 'U07',   label: 'Unit 07',       zone: 'Food Court', state: 'En route',   color: C.warning },
  { id: 'MED02', label: 'Med 02',        zone: 'Food Court', state: 'Active',     color: C.danger  },
  { id: 'CTB',   label: 'Control B',     zone: 'Main Stage', state: 'Monitoring', color: C.action  },
  { id: 'TT01',  label: 'Tech Team 01',  zone: 'Warehouse',  state: 'Checking',   color: C.textMuted },
]

const ZONE_DETAILS = {
  'main-stage':   { capacity: '92%',  density: 'High',     entryFlow: 'Stable',    exitFlow: 'Moderate', risk: 'Medium',  cameras: 12, units: 4, lastEvent: 'Density spike — 23:14', note: 'Monitor west-side pressure and keep corridor open' },
  'north-gate':   { capacity: '45%',  density: 'Low',      entryFlow: 'Normal',    exitFlow: 'Normal',   risk: 'Low',     cameras: 4,  units: 2, lastEvent: 'Gate open — 21:00',      note: 'North gate nominal, no action required' },
  'staff-zone':   { capacity: '20%',  density: 'Low',      entryFlow: 'Restricted',exitFlow: 'Normal',   risk: 'None',    cameras: 2,  units: 0, lastEvent: 'None',                   note: 'Staff-only access, ID check active' },
  'backstage':    { capacity: '30%',  density: 'Low',      entryFlow: 'Restricted',exitFlow: 'Normal',   risk: 'Low',     cameras: 3,  units: 1, lastEvent: 'None',                   note: 'Artist access active for headliner set' },
  'power-core':   { capacity: '—',    density: 'None',     entryFlow: 'Locked',    exitFlow: 'Locked',   risk: 'None',    cameras: 4,  units: 0, lastEvent: 'Relay check — 22:10',    note: 'All power feeds stable, backup on standby' },
  'vip-terrace':  { capacity: '78%',  density: 'High',     entryFlow: 'Restricted',exitFlow: 'Moderate', risk: 'Medium',  cameras: 6,  units: 1, lastEvent: 'Access restricted — 23:21', note: 'VIP cap near limit. Hold entry until exit flow improves' },
  'security-hub': { capacity: '—',    density: 'None',     entryFlow: 'Internal',  exitFlow: 'Internal', risk: 'None',    cameras: 8,  units: 3, lastEvent: 'Dispatch U07 — 23:31',   note: 'All radio channels clear. Dispatch queue: 1 pending' },
  'warehouse':    { capacity: '65%',  density: 'Medium',   entryFlow: 'Stable',    exitFlow: 'Stable',   risk: 'Low',     cameras: 8,  units: 2, lastEvent: 'Set start — 23:00',      note: 'Second stage running well. Watch east corridor density' },
  'medical':      { capacity: '—',    density: 'None',     entryFlow: 'Open',      exitFlow: 'Open',     risk: 'Active',  cameras: 2,  units: 2, lastEvent: 'Intervention — 23:31',   note: 'Med 02 active on-site. Ambulance on standby at east perimeter' },
  'food-court':   { capacity: '55%',  density: 'Medium',   entryFlow: 'Normal',    exitFlow: 'Normal',   risk: 'Low',     cameras: 5,  units: 1, lastEvent: 'Med intervention — 23:31', note: 'Med 02 en route. Area clear. Crowd calm' },
  'riverside':    { capacity: '48%',  density: 'Medium',   entryFlow: 'Stable',    exitFlow: 'Stable',   risk: 'Low',     cameras: 6,  units: 1, lastEvent: 'None',                   note: 'Third stage nominal. River perimeter sealed' },
  'south-gate':   { capacity: '60%',  density: 'High',     entryFlow: 'Delayed',   exitFlow: 'Normal',   risk: 'Medium',  cameras: 4,  units: 2, lastEvent: 'Queue delay — 23:18',    note: 'Unit 03 on site. Open lane 3 to ease queue. ETA clear: 6m' },
  'parking-east': { capacity: '35%',  density: 'Low',      entryFlow: 'Open',      exitFlow: 'Open',     risk: 'None',    cameras: 3,  units: 0, lastEvent: 'None',                   note: 'East parking at one-third capacity. No action required' },
  'parking-west': { capacity: '40%',  density: 'Low',      entryFlow: 'Open',      exitFlow: 'Open',     risk: 'None',    cameras: 3,  units: 0, lastEvent: 'None',                   note: 'West parking nominal. Overflow gates available' },
}

const KPIS = [
  { label: 'Attendance',      value: '14,280', color: C.text    },
  { label: 'Active alerts',   value: '4',      color: C.danger  },
  { label: 'Resolved',        value: '18',     color: C.success },
  { label: 'Access points',   value: '6 / 8',  color: C.signal  },
  { label: 'Security units',  value: '11',     color: C.action  },
  { label: 'Avg response',    value: '01:42',  color: C.warning },
]

const LAYER_DEFS = [
  { id: 'crowd',    label: 'Crowd Density',    color: C.warning,   default: true  },
  { id: 'security', label: 'Security Units',   color: C.signal,    default: true  },
  { id: 'flow',     label: 'Access Flow',      color: C.action,    default: true  },
  { id: 'medical',  label: 'Medical Activity', color: C.danger,    default: true  },
  { id: 'tech',     label: 'Tech Systems',     color: C.textMuted, default: false },
  { id: 'evac',     label: 'Evacuation Routes',color: C.success,   default: false },
  { id: 'cameras',  label: 'Camera Coverage',  color: '#a78bfa',   default: false },
]

// ── Injected CSS ──────────────────────────────────────────────────────────────
const MAP_CSS = `
  .nm-root {
    display: flex; flex-direction: column;
    height: 100vh; overflow: hidden;
    background: #000000; color: #f8f7ff;
    font-family: 'Geist', system-ui, -apple-system, sans-serif;
  }
  .nm-mono { font-family: 'Geist Mono', ui-monospace, monospace; }

  .nm-header {
    display: flex; align-items: center; gap: 12px;
    height: 52px; padding: 0 14px; flex-shrink: 0;
    background: rgba(0,0,0,.92);
    border-bottom: 1px solid rgba(174,133,255,.2);
    backdrop-filter: blur(20px);
  }
  .nm-header-div { width: 1px; height: 20px; background: rgba(174,133,255,.22); flex-shrink: 0; }

  .nm-kpi-bar {
    display: flex; align-items: stretch;
    height: 44px; flex-shrink: 0;
    background: #090911;
    border-bottom: 1px solid rgba(174,133,255,.18);
    overflow-x: auto;
  }
  .nm-kpi-item {
    display: flex; align-items: center; gap: 8px;
    padding: 0 18px; flex-shrink: 0;
    border-right: 1px solid rgba(174,133,255,.12);
  }

  .nm-body {
    flex: 1;
    display: grid;
    grid-template-columns: 252px 1fr 260px;
    overflow: hidden;
  }

  .nm-panel-left {
    background: #090911;
    border-right: 1px solid rgba(174,133,255,.18);
    overflow-y: auto; overflow-x: hidden;
    display: flex; flex-direction: column;
  }
  .nm-panel-right {
    background: #090911;
    border-left: 1px solid rgba(174,133,255,.18);
    overflow-y: auto; overflow-x: hidden;
    display: flex; flex-direction: column;
  }
  .nm-section-head {
    padding: 10px 12px;
    border-bottom: 1px solid rgba(174,133,255,.15);
    display: flex; justify-content: space-between; align-items: center;
    position: sticky; top: 0;
    background: #090911; z-index: 2;
  }

  .nm-center {
    display: flex; flex-direction: column;
    overflow: hidden; background: #000000;
    position: relative;
  }
  .nm-map-wrap {
    flex: 1; padding: 10px; overflow: hidden;
    background-image:
      linear-gradient(rgba(174,133,255,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(174,133,255,.04) 1px, transparent 1px);
    background-size: 36px 36px;
    position: relative;
  }
  .nm-map-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 7px;
    height: 100%; width: 100%;
  }

  .nm-zone {
    position: relative; overflow: hidden;
    border-radius: 4px; padding: 9px 10px;
    cursor: pointer;
    border: 1px solid rgba(255,255,255,.07);
    transition: border-color 180ms ease, box-shadow 180ms ease;
  }
  .nm-zone:hover { border-color: rgba(155,92,255,.5) !important; }
  .nm-zone-selected {
    border-color: #9b5cff !important;
    box-shadow: 0 0 0 1px rgba(155,92,255,.5), inset 0 0 20px rgba(155,92,255,.07);
  }

  @keyframes nm-alert-pulse  { 0%,100%{box-shadow:0 0 0 0 rgba(255,79,129,.5)}  60%{box-shadow:0 0 0 3px rgba(255,79,129,.0)} }
  @keyframes nm-warn-pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(251,191,36,.4)}  60%{box-shadow:0 0 0 3px rgba(251,191,36,.0)} }
  @keyframes nm-dot-blink    { 0%,49%{opacity:1} 50%,100%{opacity:.25} }
  @keyframes nm-dot-slow     { 0%,100%{opacity:1} 50%{opacity:.45} }
  @keyframes nm-kpi-count    { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }

  .nm-zone-alert  { animation: nm-alert-pulse 1.8s ease-out infinite; }
  .nm-zone-warn   { animation: nm-warn-pulse  2.4s ease-out infinite; }
  .nm-dot-blink   { animation: nm-dot-blink   1.1s step-end  infinite; }
  .nm-dot-slow    { animation: nm-dot-slow    2.6s ease-in-out infinite; }

  .nm-density-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: rgba(255,255,255,.06); }
  .nm-density-fill { height: 100%; transition: width 600ms ease; }

  .nm-scanline {
    position: absolute; inset: 0; pointer-events: none;
    background-image: repeating-linear-gradient(0deg, rgba(255,255,255,.028) 0 1px, transparent 1px 4px);
    opacity: .18;
  }

  .nm-layer-bar {
    padding: 7px 10px;
    border-top: 1px solid rgba(174,133,255,.15);
    display: flex; align-items: center; gap: 6px;
    overflow-x: auto; flex-shrink: 0;
    background: rgba(9,9,17,.95);
  }
  .nm-layer-btn {
    display: flex; align-items: center; gap: 5px;
    padding: 4px 10px; border-radius: 999px;
    border: 1px solid rgba(174,133,255,.2);
    background: transparent; color: #a9a3c7;
    font-family: 'Geist Mono', ui-monospace, monospace;
    font-size: 9px; letter-spacing: .1em; text-transform: uppercase;
    cursor: pointer; transition: all 140ms ease; flex-shrink: 0;
  }
  .nm-layer-btn.active { background: rgba(255,255,255,.06); color: #f8f7ff; }

  .nm-incident-row {
    padding: 9px 12px;
    display: grid; grid-template-columns: 38px 1fr auto;
    gap: 8px; align-items: start;
    border-bottom: 1px solid rgba(174,133,255,.1);
    transition: background 140ms ease; cursor: pointer;
  }
  .nm-incident-row:hover { background: rgba(155,92,255,.05); }

  .nm-team-row {
    padding: 8px 12px;
    display: flex; justify-content: space-between; align-items: center;
    border-bottom: 1px solid rgba(174,133,255,.08);
  }

  .nm-detail-row {
    padding: 8px 12px;
    display: flex; justify-content: space-between; align-items: center;
    border-bottom: 1px solid rgba(174,133,255,.08);
  }

  .nm-status-pill {
    display: inline-flex; align-items: center;
    padding: 2px 7px; border-radius: 999px;
    font-family: 'Geist Mono', ui-monospace, monospace;
    font-size: 8px; letter-spacing: .12em; text-transform: uppercase;
    white-space: nowrap;
  }

  @media (prefers-reduced-motion: reduce) {
    .nm-zone-alert, .nm-zone-warn, .nm-dot-blink, .nm-dot-slow { animation: none !important; }
  }
`

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmtTime() {
  return new Date().toTimeString().slice(0, 8)
}

function initLayers() {
  return LAYER_DEFS.reduce((acc, l) => ({ ...acc, [l.id]: l.default }), {})
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function NightgridMap() {
  const [time, setTime]         = useState(fmtTime)
  const [selected, setSelected] = useState('main-stage')
  const [layers, setLayers]     = useState(initLayers)

  useEffect(() => {
    const id = setInterval(() => setTime(fmtTime()), 1000)
    return () => clearInterval(id)
  }, [])

  const toggleLayer = (id) => setLayers(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MAP_CSS }} />
      <div className="nm-root">
        <MapHeader time={time} />
        <KPIBar />
        <div className="nm-body">
          <LeftPanel incidents={INCIDENTS} teams={TEAMS} onSelectZone={setSelected} />
          <MapCenter zones={MAP_ZONES} selected={selected} onSelect={setSelected} layers={layers} onToggle={toggleLayer} />
          <RightPanel zoneId={selected} />
        </div>
      </div>
    </>
  )
}

// ── Header ────────────────────────────────────────────────────────────────────
function MapHeader({ time }) {
  const navigate = useNavigate()
  return (
    <header className="nm-header">
      {/* Back */}
      <button
        onClick={() => navigate('/skills')}
        className="nm-mono"
        style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '4px 12px', borderRadius: 999, flexShrink: 0,
          background: 'transparent',
          border: '1px solid rgba(174,133,255,.28)',
          color: '#a9a3c7', fontSize: 9,
          fontWeight: 600, letterSpacing: '0.14em',
          textTransform: 'uppercase', cursor: 'pointer',
          transition: 'all 180ms ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(174,133,255,.65)'; e.currentTarget.style.color = '#f8f7ff' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(174,133,255,.28)'; e.currentTarget.style.color = '#a9a3c7' }}
      >
        <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M6.5 1.5 L2.5 5 L6.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </button>

      <div className="nm-header-div" />

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{ width: 24, height: 24, borderRadius: 5, background: C.action, boxShadow: '0 0 12px rgba(155,92,255,.5)', display: 'grid', placeItems: 'center' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="4" height="4" rx=".6" fill="white" />
            <rect x="7" y="1" width="4" height="4" rx=".6" fill="white" opacity=".5" />
            <rect x="1" y="7" width="4" height="4" rx=".6" fill="white" opacity=".5" />
            <rect x="7" y="7" width="4" height="4" rx=".6" fill="white" />
          </svg>
        </div>
        <span className="nm-mono" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.05em' }}>NIGHTGRID</span>
      </div>

      <div className="nm-header-div" />

      <span style={{ fontSize: 13, fontWeight: 600, color: C.text, flexShrink: 0 }}>Live Operations Map</span>

      <div className="nm-header-div" />

      {/* Sub info */}
      <span className="nm-mono" style={{ fontSize: 10, color: C.textMuted, flexShrink: 0 }}>Noctis Pulse Festival</span>

      <div style={{ flex: 1 }} />

      {/* Live clock */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        <span className="nm-dot-slow" style={{ width: 5, height: 5, borderRadius: '50%', background: C.success }} />
        <span className="nm-mono" style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.08em', color: C.text, fontVariantNumeric: 'tabular-nums', minWidth: 60 }}>
          {time}
        </span>
      </div>

      <div className="nm-header-div" />

      {/* System status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 999, background: 'rgba(52,211,153,.1)', border: '1px solid rgba(52,211,153,.28)', flexShrink: 0 }}>
        <span className="nm-dot-slow" style={{ width: 4, height: 4, borderRadius: '50%', background: C.success }} />
        <span className="nm-mono" style={{ fontSize: 8, letterSpacing: '.16em', color: C.success, textTransform: 'uppercase' }}>System Synced</span>
      </div>

      <div className="nm-header-div" />

      {/* Buttons */}
      <button className="nm-mono" style={{ padding: '5px 12px', borderRadius: 999, background: 'rgba(255,79,129,.1)', border: '1px solid rgba(255,79,129,.3)', color: C.danger, fontSize: 9, letterSpacing: '.12em', textTransform: 'uppercase', cursor: 'pointer', flexShrink: 0 }}>
        Incident Mode
      </button>
      <button className="nm-mono" style={{ padding: '5px 12px', borderRadius: 999, background: 'rgba(174,133,255,.08)', border: '1px solid rgba(174,133,255,.25)', color: C.textMuted, fontSize: 9, letterSpacing: '.12em', textTransform: 'uppercase', cursor: 'pointer', flexShrink: 0 }}>
        Layer Controls
      </button>
    </header>
  )
}

// ── KPI bar ───────────────────────────────────────────────────────────────────
function KPIBar() {
  return (
    <div className="nm-kpi-bar">
      {KPIS.map(k => (
        <div key={k.label} className="nm-kpi-item">
          <span className="nm-mono" style={{ fontSize: 9, letterSpacing: '.14em', color: C.textMuted, textTransform: 'uppercase', flexShrink: 0 }}>{k.label}</span>
          <span className="nm-mono" style={{ fontSize: 14, fontWeight: 700, color: k.color, letterSpacing: '-.01em', fontVariantNumeric: 'tabular-nums' }}>{k.value}</span>
        </div>
      ))}
    </div>
  )
}

// ── Left Panel ────────────────────────────────────────────────────────────────
function LeftPanel({ incidents, teams, onSelectZone }) {
  return (
    <aside className="nm-panel-left">
      <div className="nm-scanline" />

      {/* Incidents */}
      <div className="nm-section-head">
        <span className="nm-mono" style={{ fontSize: 9, letterSpacing: '.18em', color: C.textMuted, textTransform: 'uppercase' }}>Live Incidents</span>
        <span className="nm-mono" style={{ padding: '2px 7px', borderRadius: 999, background: 'rgba(255,79,129,.1)', border: '1px solid rgba(255,79,129,.28)', color: C.danger, fontSize: 8 }}>
          {incidents.length} open
        </span>
      </div>

      <div style={{ flex: 0 }}>
        {incidents.map((inc, i) => {
          const s = STATUS[inc.state] ?? STATUS.Neutral
          const isCrit = inc.state === 'Alert'
          return (
            <div key={inc.id} className="nm-incident-row" onClick={() => {
              const zone = MAP_ZONES.find(z => inc.zone.toLowerCase().includes(z.label.toLowerCase().split(' ')[0].toLowerCase()))
              if (zone) onSelectZone(zone.id)
            }}>
              <span className="nm-mono" style={{ fontSize: 8, color: C.textMuted, paddingTop: 1 }}>{inc.time}</span>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: C.text, lineHeight: 1.2, marginBottom: 3 }}>{inc.zone}</p>
                <p className="nm-mono" style={{ fontSize: 9, color: C.textMuted }}>{inc.event}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span className="nm-status-pill" style={{ background: s.bg, color: s.fg }}>{inc.state}</span>
                {isCrit && <span className="nm-dot-blink" style={{ width: 5, height: 5, borderRadius: '50%', background: C.danger }} />}
              </div>
            </div>
          )
        })}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(174,133,255,.15)', margin: '4px 0', flexShrink: 0 }} />

      {/* Team Dispatch */}
      <div className="nm-section-head">
        <span className="nm-mono" style={{ fontSize: 9, letterSpacing: '.18em', color: C.textMuted, textTransform: 'uppercase' }}>Team Dispatch</span>
        <span className="nm-mono" style={{ fontSize: 9, color: C.signal }}>5 units</span>
      </div>

      <div>
        {teams.map(team => (
          <div key={team.id} className="nm-team-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: 4, background: `${team.color}18`, border: `1px solid ${team.color}40`, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <span className="nm-mono" style={{ fontSize: 7, fontWeight: 700, color: team.color }}>{team.id.slice(0,2)}</span>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: C.text }}>{team.label}</p>
                <p className="nm-mono" style={{ fontSize: 8, color: C.textMuted }}>{team.zone}</p>
              </div>
            </div>
            <span className="nm-status-pill" style={{ background: `${team.color}14`, color: team.color }}>{team.state}</span>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />
    </aside>
  )
}

// ── Map Center ────────────────────────────────────────────────────────────────
function MapCenter({ zones, selected, onSelect, layers, onToggle }) {
  return (
    <main className="nm-center">
      <div className="nm-map-wrap">
        <div className="nm-map-grid">
          {zones.map(zone => <MapZone key={zone.id} zone={zone} selected={selected === zone.id} onSelect={onSelect} layers={layers} />)}
        </div>
      </div>

      {/* Layer controls */}
      <div className="nm-layer-bar">
        <span className="nm-mono" style={{ fontSize: 8, letterSpacing: '.16em', color: C.textMuted, textTransform: 'uppercase', flexShrink: 0, marginRight: 4 }}>Layers:</span>
        {LAYER_DEFS.map(l => (
          <button
            key={l.id}
            className={`nm-layer-btn${layers[l.id] ? ' active' : ''}`}
            onClick={() => onToggle(l.id)}
          >
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: layers[l.id] ? l.color : 'rgba(255,255,255,.25)', flexShrink: 0 }} />
            {l.label}
          </button>
        ))}
      </div>
    </main>
  )
}

function MapZone({ zone, selected, onSelect, layers }) {
  const s = STATUS[zone.status]
  const isAlert   = zone.status === 'Alert'
  const isWarning = zone.status === 'Warning'
  const isLarge   = zone.col.includes('/3') && zone.row.includes('/4') // Main Stage

  const animClass = isAlert ? 'nm-zone-alert' : isWarning ? 'nm-zone-warn' : ''
  const selectedClass = selected ? 'nm-zone-selected' : ''

  const showDensity = layers.crowd && zone.density > 0
  const showUnits   = layers.security && zone.units > 0

  return (
    <div
      className={`nm-zone ${animClass} ${selectedClass}`}
      onClick={() => onSelect(zone.id)}
      style={{
        gridColumn: zone.col,
        gridRow: zone.row,
        background: s.bg,
        borderColor: selected ? C.action : `${s.fg}30`,
      }}
    >
      {/* Scanline on alert zones */}
      {isAlert && <div className="nm-scanline" />}

      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: isLarge ? 8 : 4, gap: 4 }}>
        <span className="nm-mono" style={{ fontSize: isLarge ? 8 : 7, letterSpacing: '.14em', color: s.fg, textTransform: 'uppercase' }}>{zone.type}</span>
        <span className={isAlert ? 'nm-dot-blink' : isWarning ? 'nm-dot-slow' : ''} style={{ width: 5, height: 5, borderRadius: '50%', background: s.fg, flexShrink: 0, marginTop: 2 }} />
      </div>

      {/* Zone name */}
      <p style={{ fontSize: isLarge ? 14 : 11, fontWeight: 600, color: C.text, lineHeight: 1.15, marginBottom: isLarge ? 10 : 4 }}>
        {zone.label}
      </p>

      {/* Large zone: extra data */}
      {isLarge && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 8 }}>
          {showDensity && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span className="nm-mono" style={{ fontSize: 8, color: C.textMuted }}>Density</span>
                <span className="nm-mono" style={{ fontSize: 8, color: s.fg }}>{zone.density}%</span>
              </div>
              <div style={{ height: 2, background: 'rgba(255,255,255,.06)', borderRadius: 999 }}>
                <div style={{ width: `${zone.density}%`, height: '100%', background: s.fg, borderRadius: 999, transition: 'width 600ms ease' }} />
              </div>
            </div>
          )}
          {showUnits && (
            <span className="nm-mono" style={{ fontSize: 7, color: C.signal }}>● {zone.units} unit{zone.units > 1 ? 's' : ''} on-site</span>
          )}
        </div>
      )}

      {/* Small zone density indicator */}
      {!isLarge && showDensity && (
        <div className="nm-density-bar">
          <div className="nm-density-fill" style={{ width: `${zone.density}%`, background: s.fg }} />
        </div>
      )}

      {/* Units badge (small zones) */}
      {!isLarge && showUnits && (
        <span className="nm-mono" style={{ position: 'absolute', bottom: 5, right: 6, fontSize: 7, color: C.signal }}>
          ● {zone.units}
        </span>
      )}
    </div>
  )
}

// ── Right Panel ───────────────────────────────────────────────────────────────
function RightPanel({ zoneId }) {
  const zone   = MAP_ZONES.find(z => z.id === zoneId) ?? MAP_ZONES[4]
  const detail = ZONE_DETAILS[zoneId] ?? ZONE_DETAILS['main-stage']
  const s      = STATUS[zone.status]

  const rows = [
    { label: 'Capacity',       value: detail.capacity   },
    { label: 'Crowd density',  value: detail.density    },
    { label: 'Entry flow',     value: detail.entryFlow  },
    { label: 'Exit flow',      value: detail.exitFlow   },
    { label: 'Risk score',     value: detail.risk       },
    { label: 'Cameras active', value: detail.cameras    },
    { label: 'Security units', value: detail.units      },
  ]

  return (
    <aside className="nm-panel-right">
      <div className="nm-scanline" />

      {/* Zone header */}
      <div className="nm-section-head" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 5, padding: '10px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <span className="nm-mono" style={{ fontSize: 9, letterSpacing: '.18em', color: C.textMuted, textTransform: 'uppercase' }}>Selected Zone</span>
          <span className="nm-status-pill" style={{ background: s.bg, color: s.fg }}>{zone.status}</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 700, color: C.text, lineHeight: 1.1 }}>{zone.label}</p>
        <span className="nm-mono" style={{ fontSize: 8, color: C.textMuted, letterSpacing: '.12em', textTransform: 'uppercase' }}>{zone.type} ZONE</span>
      </div>

      {/* Data rows */}
      <div>
        {rows.map(r => (
          <div key={r.label} className="nm-detail-row">
            <span className="nm-mono" style={{ fontSize: 9, color: C.textMuted }}>{r.label}</span>
            <span className="nm-mono" style={{ fontSize: 10, fontWeight: 600, color: C.text }}>{r.value}</span>
          </div>
        ))}
      </div>

      {/* Last event */}
      <div style={{ padding: '10px 12px', borderBottom: 'none', borderTop: '1px solid rgba(174,133,255,.12)', marginTop: 4 }}>
        <span className="nm-mono" style={{ fontSize: 8, letterSpacing: '.14em', color: C.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>Last event</span>
        <p className="nm-mono" style={{ fontSize: 9, color: s.fg }}>{detail.lastEvent}</p>
      </div>

      {/* Recommended action */}
      <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(174,133,255,.12)', flex: 1 }}>
        <span className="nm-mono" style={{ fontSize: 8, letterSpacing: '.14em', color: C.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: 7 }}>Recommended action</span>
        <p style={{ fontSize: 12, lineHeight: 1.6, color: C.text }}>{detail.note}</p>
      </div>

      {/* Dispatch button */}
      <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(174,133,255,.15)' }}>
        <button className="nm-mono" style={{
          width: '100%', padding: '9px 14px',
          borderRadius: 999, background: C.action, color: '#000',
          border: 'none', fontSize: 10, fontWeight: 700, letterSpacing: '.1em',
          textTransform: 'uppercase', cursor: 'pointer',
          boxShadow: '0 0 16px rgba(155,92,255,.35)',
        }}>
          Dispatch to {zone.label}
        </button>
      </div>
    </aside>
  )
}

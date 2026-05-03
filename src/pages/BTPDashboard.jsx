import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'

// ── Data ──────────────────────────────────────────────────────────────────────

const caMonthly = [
  { mois: 'Jan', ca: 142, objectif: 150 },
  { mois: 'Fév', ca: 158, objectif: 155 },
  { mois: 'Mar', ca: 175, objectif: 160 },
  { mois: 'Avr', ca: 163, objectif: 165 },
  { mois: 'Mai', ca: 189, objectif: 170 },
  { mois: 'Jun', ca: 204, objectif: 180 },
  { mois: 'Jul', ca: 198, objectif: 185 },
  { mois: 'Aoû', ca: 172, objectif: 190 },
  { mois: 'Sep', ca: 221, objectif: 195 },
  { mois: 'Oct', ca: 241, objectif: 200 },
  { mois: 'Nov', ca: null, objectif: 210 },
  { mois: 'Déc', ca: null, objectif: 215 },
]

const depensesData = [
  { name: "Main d'œuvre", value: 55, color: '#615fff' },
  { name: 'Matériaux', value: 28, color: '#22b8cd' },
  { name: 'Sous-traitance', value: 12, color: '#10b981' },
  { name: 'Frais fixes', value: 5, color: '#e7e5e4' },
]

const margeData = [
  { chantier: 'Rés. Horizon', reel: 38.4, prev: 35 },
  { chantier: 'Bureaux Park', reel: 31.2, prev: 33 },
  { chantier: 'Rénov. Mairie', reel: 29.8, prev: 32 },
  { chantier: 'Appt. Lyon', reel: 42.1, prev: 40 },
]

const tresoData = [
  { mois: 'Avr', entrees: 180, sorties: 142 },
  { mois: 'Mai', entrees: 195, sorties: 158 },
  { mois: 'Jun', entrees: 210, sorties: 163 },
  { mois: 'Jul', entrees: 188, sorties: 171 },
  { mois: 'Aoû', entrees: 172, sorties: 148 },
  { mois: 'Sep', entrees: 235, sorties: 175 },
  { mois: 'Oct', entrees: 248, sorties: 182 },
]

const alertes = [
  { type: 'danger', title: 'Dépassement budget', desc: 'Extension ossature — +50%', time: 'il y a 2h' },
  { type: 'warning', title: 'Budget à surveiller', desc: 'Charpente bois maille — 40%', time: 'il y a 4h' },
  { type: 'info', title: 'Facture non rattachée', desc: '2 factures fournisseur en attente', time: 'il y a 9h' },
]

const echeances = [
  { jour: '22', mois: 'Nov', label: 'Réunion de chantier', sub: 'Maison Dupont', time: '09:00' },
  { jour: '23', mois: 'Nov', label: 'Livraison matériaux', sub: 'Villa des Pins', time: '10:30' },
  { jour: '24', mois: 'Nov', label: 'Point planning', sub: 'Équipe 1', time: '14:00' },
  { jour: '27', mois: 'Nov', label: 'Signature devis', sub: 'Copropriété Var', time: '11:00' },
]

const chantiers = [
  { id: 'C-041', name: 'Résidence Horizon', client: 'Promo Loire', avancement: 67, budget: '480 000 €', status: 'En cours', risk: null },
  { id: 'C-042', name: 'Bureaux Park Ouest', client: 'SCI Andromède', avancement: 28, budget: '1 200 000 €', status: 'Démarrage', risk: 'Risque élevé' },
  { id: 'C-043', name: 'Rénovation Mairie', client: 'Ville de Rouen', avancement: 91, budget: '320 000 €', status: 'Réception', risk: null },
  { id: 'C-044', name: 'Appartements Lyon', client: 'Nexity Rhône', avancement: 45, budget: '890 000 €', status: 'En cours', risk: 'Risque moyen' },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function KpiCard({ label, value, change, changeOk, sub, accent }) {
  return (
    <div className={`rounded-2xl border p-4 ${accent ? 'border-[#615fff]/20 bg-[#edeaff]/30' : 'border-[#e7e5e4] bg-white'}`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#79716b]">{label}</p>
      <p className={`mt-2 font-mono text-[22px] font-medium tabular-nums tracking-tight ${accent ? 'text-[#4f46e5]' : 'text-[#292524]'}`}>{value}</p>
      {change && (
        <p className={`mt-1.5 font-mono text-[11px] ${changeOk ? 'text-[#047857]' : 'text-[#b91c1c]'}`}>{change}</p>
      )}
      {sub && <p className="mt-1 font-mono text-[11px] text-[#79716b]">{sub}</p>}
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-[#e7e5e4] bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[#79716b]">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="font-mono text-[12px]" style={{ color: p.color }}>
          {p.name}: <span className="font-medium">{p.value}{typeof p.value === 'number' && p.value > 10 ? 'k €' : ' %'}</span>
        </p>
      ))}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function BTPDashboard() {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [activeChantier, setActiveChantier] = useState(null)
  const [activePeriod, setActivePeriod] = useState('12M')

  const navItems = [
    { label: 'Dashboard', icon: '▦' },
    { label: 'Chantiers', icon: '◫' },
    { label: 'Clients', icon: '◎' },
    { label: 'Factures', icon: '▤' },
    { label: 'Devis', icon: '◱' },
    { label: 'Équipes', icon: '◉' },
    { label: 'Planning', icon: '▦' },
    { label: 'Analytics', icon: '▲' },
  ]

  const mainRef = useRef(null)

  useEffect(() => {
    const wrapper = mainRef.current
    if (!wrapper) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // Stop the global Lenis so it doesn't fight with ours
    if (window.__lenis) window.__lenis.stop()

    // Dynamically import Lenis to get the class
    import('lenis').then(({ default: LenisClass }) => {
      const lenis = new LenisClass({
        wrapper,
        content: wrapper.firstElementChild,
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
      })

      let rafId
      const raf = (time) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)

      wrapper.__dashLenis = lenis

      return () => {
        cancelAnimationFrame(rafId)
        lenis.destroy()
        if (window.__lenis) window.__lenis.start()
      }
    })

    return () => {
      if (wrapper.__dashLenis) {
        wrapper.__dashLenis.destroy()
        delete wrapper.__dashLenis
      }
      if (window.__lenis) window.__lenis.start()
    }
  }, [])

  return (
    <>
    <style>{`
      .dash-scroll::-webkit-scrollbar { width: 6px; }
      .dash-scroll::-webkit-scrollbar-track { background: #f3f2f0; }
      .dash-scroll::-webkit-scrollbar-thumb { background: #d6d3d1; border-radius: 999px; }
      .dash-scroll::-webkit-scrollbar-thumb:hover { background: #a8a29e; }
    `}</style>
    <div className="flex h-screen overflow-hidden bg-[#f7f6f5] font-sans text-[#292524]">

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside className="flex w-[220px] shrink-0 flex-col border-r border-[#e7e5e4] bg-white">
        {/* Logo */}
        <div className="flex items-center gap-2.5 border-b border-[#e7e5e4] px-5 py-4">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#615fff] font-mono text-sm font-bold text-white shadow-[0_2px_8px_rgba(97,95,255,0.35)]">B</span>
          <span className="text-[15px] font-semibold tracking-[-0.02em]">Bâtiflow</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 pt-4">
          {navItems.map(({ label, icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => setActiveNav(label)}
              className={`mb-0.5 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 ${
                activeNav === label
                  ? 'bg-[#edeaff] font-semibold text-[#615fff]'
                  : 'text-[#79716b] hover:bg-[#f3f2f0] hover:text-[#292524]'
              }`}
            >
              <span className="text-[14px] opacity-70">{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="border-t border-[#e7e5e4] p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#615fff] font-mono text-xs font-bold text-white">MP</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Martin Pelletier</p>
              <p className="truncate font-mono text-[10px] text-[#79716b]">Gérant · BTP Sarl</p>
            </div>
          </div>
          <Link
            to="/skills/clean-saas/vitrine"
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#e7e5e4] bg-[#f7f6f5] py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#79716b] transition-colors hover:text-[#615fff]"
          >
            ← Retour vitrine
          </Link>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-[#e7e5e4] bg-white px-6 py-3.5">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Bonjour, Martin 👋</h1>
            <p className="font-mono text-[11px] text-[#79716b]">Situation au dimanche 3 novembre 2024 · 4 chantiers actifs</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-[#e7e5e4] bg-[#f7f6f5] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
              <span className="font-mono text-[11px] text-[#79716b]">Sync actif</span>
            </div>
            <button type="button" className="relative rounded-xl border border-[#e7e5e4] bg-white p-2 transition-colors hover:bg-[#f3f2f0]">
              <span className="text-[16px]">🔔</span>
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-[#b91c1c] font-mono text-[9px] font-bold text-white">3</span>
            </button>
            <button type="button" className="flex items-center gap-2 rounded-xl bg-[#615fff] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-white shadow-[0_4px_14px_rgba(97,95,255,0.3)] transition-all hover:bg-[#4f39f6] active:scale-[0.97]">
              + Nouveau
            </button>
          </div>
        </header>

        {/* Scrollable body */}
        <main ref={mainRef} className="dash-scroll flex-1 overflow-hidden">
        <div className="p-6 pb-12">

          {/* KPI Strip */}
          <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
            <KpiCard label="CA octobre" value="€ 241k" change="+12.3 % vs mois dernier" changeOk={true} accent={true} />
            <KpiCard label="Marge prévisionnelle" value="34.2 %" change="+1.8 pts" changeOk={true} />
            <KpiCard label="Dépenses engagées" value="€ 40.5k" change="−8.3 % vs mois dernier" changeOk={false} />
            <KpiCard label="Chantiers en cours" value="4" sub="+1 ce mois-ci" />
            <KpiCard label="Factures en attente" value="3" sub="€ 72.8k total" />
          </div>

          {/* Row 1: CA chart + Dépenses donut + Alertes */}
          <div className="mb-4 grid gap-4 lg:grid-cols-[1.8fr_1fr_1fr]">

            {/* CA Area chart */}
            <div className="rounded-2xl border border-[#e7e5e4] bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold tracking-tight">Chiffre d'affaires mensuel</p>
                  <p className="mt-0.5 font-mono text-[11px] text-[#79716b]">Réel vs objectif — 2024</p>
                </div>
                <div className="flex gap-1">
                  {['3M', '6M', '12M'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setActivePeriod(p)}
                      className={`rounded-lg px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors ${
                        activePeriod === p ? 'bg-[#edeaff] text-[#615fff]' : 'text-[#79716b] hover:bg-[#f3f2f0]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-3 flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#79716b]">
                  <span className="h-2.5 w-4 rounded-sm bg-[#615fff]" /> Réel
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#79716b]">
                  <span className="h-2.5 w-4 rounded-sm bg-[#e7e5e4]" /> Objectif
                </span>
              </div>
              <ResponsiveContainer width="100%" height={170}>
                <AreaChart data={activePeriod === '3M' ? caMonthly.slice(9) : activePeriod === '6M' ? caMonthly.slice(6) : caMonthly} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradCA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#615fff" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#615fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0efed" vertical={false} />
                  <XAxis dataKey="mois" tick={{ fontSize: 10, fontFamily: 'monospace', fill: '#a8a29e' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fontFamily: 'monospace', fill: '#a8a29e' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="objectif" name="Objectif" stroke="#e7e5e4" strokeWidth={2} fill="none" strokeDasharray="4 3" dot={false} />
                  <Area type="monotone" dataKey="ca" name="CA réel" stroke="#615fff" strokeWidth={2.5} fill="url(#gradCA)" dot={{ r: 3, fill: '#615fff', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Donut dépenses */}
            <div className="rounded-2xl border border-[#e7e5e4] bg-white p-5">
              <p className="mb-1 text-sm font-semibold tracking-tight">Répartition dépenses</p>
              <p className="mb-3 font-mono text-[11px] text-[#79716b]">Novembre 2024</p>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={depensesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {depensesData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `${v} %`} contentStyle={{ fontSize: 11, fontFamily: 'monospace', borderRadius: 12, border: '1px solid #e7e5e4' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 space-y-1.5">
                {depensesData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#79716b]">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
                      {d.name}
                    </span>
                    <span className="font-mono text-[11px] font-medium text-[#292524]">{d.value} %</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alertes */}
            <div className="rounded-2xl border border-[#e7e5e4] bg-white p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold tracking-tight">Alertes importantes</p>
                <span className="rounded-full bg-[#fff1f2] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#b91c1c]">3</span>
              </div>
              <div className="space-y-3">
                {alertes.map((a) => (
                  <div key={a.title} className={`flex gap-3 rounded-xl p-3 ${
                    a.type === 'danger' ? 'bg-[#fff1f2]' : a.type === 'warning' ? 'bg-[#fffbeb]' : 'bg-[#edeaff]/40'
                  }`}>
                    <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                      a.type === 'danger' ? 'bg-[#b91c1c]' : a.type === 'warning' ? 'bg-[#b45309]' : 'bg-[#615fff]'
                    }`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{a.title}</p>
                      <p className="mt-0.5 truncate font-mono text-[10px] text-[#79716b]">{a.desc}</p>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] text-[#a8a29e]">{a.time}</span>
                  </div>
                ))}
              </div>
              <button type="button" className="mt-3 w-full rounded-xl border border-[#e7e5e4] bg-[#f7f6f5] py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[#79716b] transition-colors hover:bg-[#edeaff] hover:text-[#615fff]">
                Voir toutes les alertes →
              </button>
            </div>
          </div>

          {/* Row 2: Marge bar + Tréso + Chantiers risque + Échéances */}
          <div className="mb-4 grid gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr]" style={{ gridAutoRows: '320px' }}>

            {/* Marge par chantier */}
            <div className="flex flex-col rounded-2xl border border-[#e7e5e4] bg-white p-5">
              <p className="mb-1 text-sm font-semibold tracking-tight">Marge par chantier</p>
              <p className="mb-4 font-mono text-[11px] text-[#79716b]">Réel vs prévisionnel</p>
              <ResponsiveContainer width="100%" height="100%" className="flex-1 min-h-0">
                <BarChart data={margeData} margin={{ top: 0, right: 0, left: -24, bottom: 0 }} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0efed" vertical={false} />
                  <XAxis dataKey="chantier" tick={{ fontSize: 9, fontFamily: 'monospace', fill: '#a8a29e' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fontFamily: 'monospace', fill: '#a8a29e' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(v) => `${v} %`} contentStyle={{ fontSize: 11, fontFamily: 'monospace', borderRadius: 12, border: '1px solid #e7e5e4' }} />
                  <Bar dataKey="prev" name="Prévu" fill="#e7e5e4" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="reel" name="Réel" fill="#615fff" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Trésorerie */}
            <div className="flex flex-col rounded-2xl border border-[#e7e5e4] bg-white p-5">
              <p className="mb-1 text-sm font-semibold tracking-tight">Trésorerie prévisionnelle</p>
              <p className="mb-4 font-mono text-[11px] text-[#79716b]">Entrées vs sorties (k€)</p>
              <ResponsiveContainer width="100%" height="100%" className="flex-1 min-h-0">
                <LineChart data={tresoData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0efed" vertical={false} />
                  <XAxis dataKey="mois" tick={{ fontSize: 9, fontFamily: 'monospace', fill: '#a8a29e' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fontFamily: 'monospace', fill: '#a8a29e' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}k`} />
                  <Tooltip contentStyle={{ fontSize: 11, fontFamily: 'monospace', borderRadius: 12, border: '1px solid #e7e5e4' }} formatter={(v) => `${v}k €`} />
                  <Line type="monotone" dataKey="entrees" name="Entrées" stroke="#615fff" strokeWidth={2.5} dot={{ r: 3, fill: '#615fff', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="sorties" name="Sorties" stroke="#22b8cd" strokeWidth={2} strokeDasharray="4 3" dot={{ r: 3, fill: '#22b8cd', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Chantiers à risque */}
            <div className="rounded-2xl border border-[#e7e5e4] bg-white p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold tracking-tight">Chantiers à risque</p>
                <span className="rounded-full bg-[#fffbeb] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#b45309]">2</span>
              </div>
              <div className="space-y-2.5">
                {chantiers.filter(c => c.risk).map((c) => (
                  <div key={c.id} className={`rounded-xl p-3 ${c.risk === 'Risque élevé' ? 'bg-[#fff1f2]' : 'bg-[#fffbeb]'}`}>
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold">{c.name}</p>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.06em] ${
                        c.risk === 'Risque élevé' ? 'bg-[#b91c1c] text-white' : 'bg-[#b45309] text-white'
                      }`}>{c.risk}</span>
                    </div>
                    <p className="mt-1 font-mono text-[10px] text-[#79716b]">{c.client} · {c.avancement}% avancement</p>
                  </div>
                ))}
              </div>
              <button type="button" className="mt-3 w-full rounded-xl border border-[#e7e5e4] bg-[#f7f6f5] py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[#79716b] transition-colors hover:bg-[#fffbeb] hover:text-[#b45309]">
                Tous les chantiers →
              </button>
            </div>

            {/* Prochaines échéances */}
            <div className="rounded-2xl border border-[#e7e5e4] bg-white p-5">
              <p className="mb-3 text-sm font-semibold tracking-tight">Prochaines échéances</p>
              <div className="space-y-2.5">
                {echeances.map((e) => (
                  <div key={e.label} className="flex items-center gap-3 rounded-xl border border-[#e7e5e4] bg-[#f7f6f5] px-3 py-2.5 transition-colors hover:bg-[#edeaff]/40">
                    <div className="shrink-0 text-center">
                      <p className="font-mono text-[18px] font-medium tabular-nums leading-none text-[#615fff]">{e.jour}</p>
                      <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#a8a29e]">{e.mois}</p>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{e.label}</p>
                      <p className="font-mono text-[10px] text-[#79716b]">{e.sub}</p>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] tabular-nums text-[#a8a29e]">{e.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Chantiers table + mini stats */}
          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">

            {/* Chantiers table */}
            <div className="rounded-2xl border border-[#e7e5e4] bg-white">
              <div className="flex items-center justify-between border-b border-[#e7e5e4] px-5 py-3.5">
                <p className="text-sm font-semibold tracking-tight">Chantiers actifs</p>
                <span className="rounded-full bg-[#f3f2f0] px-2.5 py-1 font-mono text-[10px] text-[#79716b]">4 chantiers</span>
              </div>
              {chantiers.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setActiveChantier(c.id === activeChantier ? null : c.id)}
                  className={`grid cursor-pointer grid-cols-[3rem_1fr_8rem_6.5rem_5.5rem] items-center gap-3 border-b border-[#e7e5e4] px-5 py-3.5 transition-colors last:border-0 ${
                    activeChantier === c.id
                      ? 'bg-[#edeaff]/40 shadow-[inset_3px_0_0_#615fff]'
                      : 'hover:bg-[#f7f6f5]'
                  }`}
                >
                  <span className="font-mono text-[10px] tracking-[0.06em] text-[#a8a29e]">{c.id}</span>
                  <div>
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p className="font-mono text-[11px] text-[#79716b]">{c.client}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 overflow-hidden rounded-full bg-[#e7e5e4]" style={{ height: '3px' }}>
                      <div className="h-full rounded-full bg-[#615fff] transition-all" style={{ width: `${c.avancement}%` }} />
                    </div>
                    <span className="w-8 shrink-0 font-mono text-[10px] tabular-nums text-[#a8a29e]">{c.avancement}%</span>
                  </div>
                  <span className="font-mono text-[12px] tabular-nums text-[#79716b]">{c.budget}</span>
                  <span className={`rounded-full px-2.5 py-1 text-center font-mono text-[10px] uppercase tracking-[0.08em] font-semibold ${
                    c.status === 'Réception' ? 'bg-[#ecfdf5] text-[#047857]'
                    : c.status === 'En cours' ? 'bg-[#edeaff] text-[#4f46e5]'
                    : 'bg-[#fffbeb] text-[#b45309]'
                  }`}>{c.status}</span>
                </div>
              ))}
            </div>

            {/* Bottom-right mini stats */}
            <div className="flex flex-col gap-4">
              {/* Dépenses 6M sparkline */}
              <div className="rounded-2xl border border-[#e7e5e4] bg-white p-5">
                <div className="mb-1 flex items-end justify-between">
                  <p className="text-sm font-semibold tracking-tight">Dépenses totales</p>
                  <span className="font-mono text-[11px] font-medium text-[#b91c1c]">−8.3 %</span>
                </div>
                <p className="mb-3 font-mono text-[28px] font-medium tabular-nums tracking-tight text-[#292524]">€ 40.5k</p>
                <ResponsiveContainer width="100%" height={60}>
                  <AreaChart data={tresoData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                    <defs>
                      <linearGradient id="gradDep" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22b8cd" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#22b8cd" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="sorties" stroke="#22b8cd" strokeWidth={2} fill="url(#gradDep)" dot={false} />
                    <Tooltip contentStyle={{ fontSize: 10, fontFamily: 'monospace', borderRadius: 8, border: '1px solid #e7e5e4' }} formatter={(v) => `${v}k €`} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Productivité + Documents */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-[#e7e5e4] bg-white p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#79716b]">Productivité</p>
                  <p className="mt-2 font-mono text-[28px] font-medium tabular-nums tracking-tight text-[#047857]">89 %</p>
                  <p className="mt-1 font-mono text-[10px] text-[#79716b]">vs objectif 85 %</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#e7e5e4]">
                    <div className="h-full rounded-full bg-[#10b981] transition-all" style={{ width: '89%' }} />
                  </div>
                </div>
                <div className="rounded-2xl border border-[#e7e5e4] bg-white p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#79716b]">Documents</p>
                  <p className="mt-2 font-mono text-[28px] font-medium tabular-nums tracking-tight text-[#292524]">126</p>
                  <p className="mt-1 font-mono text-[10px] text-[#047857]">+23 % vs mois dernier</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#e7e5e4]">
                    <div className="h-full rounded-full bg-[#615fff]" style={{ width: '75%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>{/* end content wrapper for Lenis */}
        </main>
      </div>
    </div>
    </>
  )
}

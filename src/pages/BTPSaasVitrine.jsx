import { useState } from 'react'
import { Link } from 'react-router-dom'

// ─── mock data ─────────────────────────────────────────────────────────────

const chantiers = [
  { id: 'C-041', name: 'Résidence Horizon', client: 'Promo Loire', budget: '480 000 €', avancement: 67, status: 'En cours', chef: 'L. Petit' },
  { id: 'C-042', name: 'Bureaux Park Ouest', client: 'SCI Andromède', budget: '1 200 000 €', avancement: 28, status: 'Démarrage', chef: 'M. Renard' },
  { id: 'C-043', name: 'Rénovation Mairie', client: 'Ville de Rouen', budget: '320 000 €', avancement: 91, status: 'Réception', chef: 'S. Blanc' },
]

const facturesData = [
  { ref: 'FA-2024-187', client: 'Promo Loire', montant: '48 200 €', echeance: '30 nov.', status: 'En attente', statusColor: '#f59e0b', bg: '#fffbeb' },
  { ref: 'FA-2024-186', client: 'SCI Andromède', montant: '82 000 €', echeance: '15 nov.', status: 'Payée', statusColor: '#10b981', bg: '#ecfdf5' },
  { ref: 'FA-2024-185', client: 'Ville de Rouen', montant: '24 600 €', echeance: '01 nov.', status: 'En retard', statusColor: '#ef4444', bg: '#fff1f2' },
]

const devisData = [
  { ref: 'DV-2024-094', client: 'Habitat Nord', montant: '156 000 €', envoi: '18 oct.', status: 'En lecture', color: '#22b8cd' },
  { ref: 'DV-2024-093', client: 'Copropriété Var', montant: '38 500 €', envoi: '14 oct.', status: 'Signé', color: '#10b981' },
  { ref: 'DV-2024-092', client: 'Industriel GSB', montant: '210 000 €', envoi: '09 oct.', status: 'En cours', color: '#615fff' },
]

const mailsData = [
  { from: 'Maître Dupont', subject: 'Mise en demeure — Chantier C-041', preview: 'Nous vous mettons en demeure de régulariser...', tag: 'URGENT', tagColor: '#b91c1c', tagBg: '#fff1f2', time: '09:14', unread: true },
  { from: 'SCI Andromède', subject: "Demande d'avenant — Lot électricité", preview: 'Suite à notre réunion de chantier du 28 oct...', tag: 'À traiter', tagColor: '#b45309', tagBg: '#fffbeb', time: '08:47', unread: true },
  { from: 'Matériaux PRO', subject: 'Livraison confirmée — commande #4482', preview: 'Votre commande sera livrée vendredi 1er nov...', tag: 'Info', tagColor: '#79716b', tagBg: '#f3f2f0', time: '08:02', unread: false },
  { from: 'Ville de Rouen', subject: 'PV de réception signé', preview: 'Veuillez trouver ci-joint le procès-verbal...', tag: 'Info', tagColor: '#79716b', tagBg: '#f3f2f0', time: 'Hier', unread: false },
]

const equipeData = [
  { name: 'Lucas Petit', role: 'Chef de chantier', chantier: 'Résidence Horizon', taches: 4, avatar: 'LP', color: '#615fff' },
  { name: 'Marc Renard', role: 'Conducteur travaux', chantier: 'Bureaux Park Ouest', taches: 7, avatar: 'MR', color: '#22b8cd' },
  { name: 'Sophie Blanc', role: 'Chef de chantier', chantier: 'Rénovation Mairie', taches: 2, avatar: 'SB', color: '#10b981' },
  { name: 'Ali Mansour', role: 'Ouvrier qualifié', chantier: 'Résidence Horizon', taches: 3, avatar: 'AM', color: '#f59e0b' },
]

const caData = [
  { mois: 'Jul', reel: 68, prev: 72 },
  { mois: 'Aoû', reel: 82, prev: 76 },
  { mois: 'Sep', reel: 91, prev: 85 },
  { mois: 'Oct', reel: 74, prev: 90 },
  { mois: 'Nov', reel: null, prev: 95 },
  { mois: 'Déc', reel: null, prev: 88 },
]

const pricingPlans = [
  {
    name: 'Solo',
    price: '9.99',
    description: "Pour les artisans et TPE jusqu'à 3 utilisateurs.",
    features: ['Devis & factures illimités', '5 chantiers simultanés', 'Mailing basique', 'Support email'],
    cta: 'Démarrer',
    accent: false,
  },
  {
    name: 'Pro',
    price: '30',
    description: 'Pour les PME du bâtiment en croissance.',
    features: ['Tout Solo +', 'Chantiers illimités', 'Planning équipes', 'Analytics avancé', 'Mailing IA priorité', 'Support prioritaire'],
    cta: 'Démarrer en Pro',
    accent: true,
  },
  {
    name: 'Entreprise',
    price: 'Sur devis',
    description: 'Multi-sites, audit, SSO et intégrations sur mesure.',
    features: ['Tout Pro +', 'SSO & LDAP', 'API access', 'Audit trail complet', 'SLA 99.9 %', 'Onboarding dédié'],
    cta: 'Nous contacter',
    accent: false,
  },
]

const maxCA = 95

// ─── helpers ───────────────────────────────────────────────────────────────

function CheckIcon({ accent }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="8" cy="8" r="7" fill={accent ? '#edeaff' : '#f3f2f0'} />
      <path d="M5 8l2 2 4-4" stroke={accent ? '#615fff' : '#79716b'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── component ─────────────────────────────────────────────────────────────

export default function BTPSaasVitrine() {
  const [activeSidebarItem, setActiveSidebarItem] = useState('Dashboard')
  const [activeNavItem, setActiveNavItem] = useState(null)
  const [activePlan, setActivePlan] = useState('Pro')
  const [activeGanttView, setActiveGanttView] = useState('Mois')
  const [activeMailRow, setActiveMailRow] = useState(null)
  const [activeChantierRow, setActiveChantierRow] = useState(null)
  const [activeDevisRow, setActiveDevisRow] = useState(null)
  const [activeFactureRow, setActiveFactureRow] = useState(null)
  const [activeEquipe, setActiveEquipe] = useState(null)

  return (
    <div className="bg-[#fafaf9] text-[#292524]">

      {/* ── Sticky product nav ────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-30 border-b border-[#e7e5e4] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 py-3 md:px-8">
          {/* Logo — left col */}
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#615fff] font-display text-sm font-bold text-white shadow-[0_2px_8px_rgba(97,95,255,0.35)]">B</span>
            <span className="font-display text-[15px] font-semibold tracking-[-0.02em] text-[#292524]">Bâtiflow</span>
          </div>

          {/* Centre nav — pill container, always centered */}
          <div className="hidden items-center gap-0.5 rounded-full border border-[#e7e5e4] bg-[#f7f6f5] px-1.5 py-1 md:flex">
            {['Fonctions', 'Factures', 'Analytics', 'Équipes', 'Tarifs'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setActiveNavItem(item === activeNavItem ? null : item)}
                className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] font-medium transition-all duration-150 ${
                  activeNavItem === item
                    ? 'bg-white text-[#615fff] shadow-[0_1px_4px_rgba(0,0,0,0.08)]'
                    : 'text-[#79716b] hover:text-[#292524]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right actions — right col, pushed to end */}
          <div className="flex items-center justify-end gap-2">
            <Link
              to="/skills/clean-saas"
              className="hidden items-center gap-1.5 rounded-full border border-[#e7e5e4] bg-white px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] font-medium text-[#79716b] transition-colors duration-150 hover:border-[#615fff]/30 hover:text-[#615fff] md:flex"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Retour
            </Link>
            <button
              type="button"
              className="rounded-full bg-[#615fff] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-white shadow-[0_4px_14px_rgba(97,95,255,0.35)] transition-all duration-150 hover:bg-[#4f39f6] active:scale-[0.97]"
            >
              Demander une démo
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#e7e5e4] bg-[#fafaf9] px-5 pb-0 pt-16 md:px-8 md:pt-20">
        <div className="pointer-events-none absolute -right-72 -top-72 h-[700px] w-[700px] rounded-full bg-[#615fff] opacity-[0.05] blur-3xl" />
        <div className="pointer-events-none absolute -left-40 top-1/2 h-[400px] w-[400px] rounded-full bg-[#22b8cd] opacity-[0.04] blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e7e5e4] bg-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#79716b]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#615fff]" />
              Plateforme BTP tout-en-un
            </span>
            <h1 className="font-display text-5xl font-semibold leading-[1.0] tracking-[-0.03em] text-[#292524] md:text-[64px]" style={{ textWrap: 'balance', maxWidth: '22ch' }}>
              Tous vos chantiers.<br />Une seule plateforme.
            </h1>
            <p className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed text-[#79716b]">
              Centralisez devis, factures et infos clients. Suivez coûts et CA en temps réel. Pilotez vos équipes et plannings sans tableur.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                className="rounded-lg bg-[#615fff] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(97,95,255,0.40)] transition-all duration-200 hover:bg-[#4f39f6] active:scale-[0.98]"
              >
                Démarrer gratuitement
              </button>
              <Link
                to="/skills/clean-saas/dashboard"
                className="flex items-center gap-2 rounded-lg border border-[#e7e5e4] bg-white px-6 py-3.5 text-sm font-semibold text-[#292524] transition-all duration-200 hover:bg-[#f3f2f0] active:scale-[0.98]"
              >
                Voir la démo live
                <ArrowUpRight />
              </Link>
            </div>
            <p className="mt-4 text-sm text-[#79716b]">Essai 14 jours — sans carte bancaire</p>
          </div>

          {/* Dashboard frame */}
          <div className="relative mx-auto mt-14 max-w-6xl">
            <div className="overflow-hidden rounded-t-2xl border border-[#e7e5e4] border-b-0 bg-white shadow-[0_32px_80px_rgba(0,0,0,0.10)]">
              {/* Frame chrome bar */}
              <div className="flex items-center justify-between border-b border-[#e7e5e4] bg-[#fbfaf7] px-5 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ef4444]/50" />
                  <span className="h-3 w-3 rounded-full bg-[#f59e0b]/50" />
                  <span className="h-3 w-3 rounded-full bg-[#10b981]/50" />
                </div>
                <span className="rounded-full border border-[#e7e5e4] bg-white px-4 py-1 font-mono text-xs text-[#79716b]">
                  app.batiflow.fr/dashboard
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#10b981]" />
                  <span className="font-mono text-[11px] text-[#79716b]">Sync actif</span>
                </div>
              </div>

              {/* App layout */}
              <div className="grid min-h-[460px] grid-cols-[200px_1fr] md:grid-cols-[220px_1fr]">
                {/* Sidebar */}
                <div className="border-r border-[#e7e5e4] bg-[#fbfaf7] p-3">
                  <div className="mb-4 flex items-center gap-2 px-2 pt-2">
                    <span className="grid h-7 w-7 place-items-center rounded-md bg-[#615fff] text-xs font-bold text-white">B</span>
                    <span className="font-display text-sm font-semibold">Bâtiflow</span>
                  </div>
                  {[
                    { label: 'Dashboard' },
                    { label: 'Chantiers' },
                    { label: 'Devis' },
                    { label: 'Factures' },
                    { label: 'Clients' },
                    { label: 'Équipes' },
                    { label: 'Planning' },
                    { label: 'Mails', badge: '3' },
                  ].map(({ label, badge }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setActiveSidebarItem(label)}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-sm transition-colors duration-150 ${
                        activeSidebarItem === label
                          ? 'bg-[#edeaff] font-semibold text-[#615fff]'
                          : 'text-[#79716b] hover:bg-[#f3f2f0] hover:text-[#292524]'
                      }`}
                    >
                      <span>{label}</span>
                      {badge && (
                        <span className="rounded-full bg-[#615fff] px-1.5 py-0.5 text-[10px] font-semibold text-white">{badge}</span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Main content */}
                <div className="overflow-hidden p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-xl font-semibold">Vue d'ensemble</h2>
                      <p className="text-sm text-[#79716b]">Octobre 2024 — 3 chantiers actifs</p>
                    </div>
                    <button
                      type="button"
                      className="rounded-lg bg-[#615fff] px-3.5 py-2 text-xs font-semibold text-white shadow-[0_4px_12px_rgba(97,95,255,0.28)] transition-all duration-150 hover:bg-[#4f39f6] active:scale-[0.97]"
                    >
                      Nouveau devis
                    </button>
                  </div>

                  {/* KPI strip */}
                  <div className="mb-5 grid gap-3 grid-cols-2 sm:grid-cols-4">
                    {[
                      { label: 'CA octobre', value: '€ 154k', change: '+12 %', ok: true },
                      { label: 'Factures en att.', value: '3', change: '€ 72.8k', ok: null },
                      { label: 'Devis signés', value: '5', change: 'ce mois', ok: null },
                      { label: 'Équipe terrain', value: '12', change: '3 chantiers', ok: null },
                    ].map(({ label, value, change, ok }) => (
                      <div key={label} className="rounded-2xl border border-[#e7e5e4] bg-white p-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#79716b]">{label}</p>
                        <p className="mt-2 font-mono text-[22px] font-medium tracking-tight text-[#292524]">{value}</p>
                        <p className={`mt-1 font-mono text-[11px] ${ok ? 'font-semibold text-[#047857]' : 'font-normal text-[#79716b]'}`}>{change}</p>
                      </div>
                    ))}
                  </div>

                  {/* Chantiers table */}
                  <div className="overflow-hidden rounded-xl border border-[#e7e5e4]">
                    <div className="border-b border-[#e7e5e4] bg-[#fbfaf7] px-4 py-2.5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#79716b]">Chantiers actifs</p>
                    </div>
                    {chantiers.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => setActiveChantierRow(c.id === activeChantierRow ? null : c.id)}
                        className={`grid cursor-pointer grid-cols-[3rem_1fr_8rem_6rem_5.5rem] items-center gap-3 border-b border-[#e7e5e4] px-4 py-3 transition-colors duration-150 last:border-0 ${
                          activeChantierRow === c.id
                            ? 'bg-[#edeaff]/50 shadow-[inset_3px_0_0_#615fff]'
                            : 'hover:bg-[#f5f4f2]'
                        }`}
                      >
                        <span className="font-mono text-[10px] tracking-[0.06em] text-[#a8a29e]">{c.id}</span>
                        <div>
                          <p className="text-sm font-semibold">{c.name}</p>
                          <p className="text-xs text-[#79716b]">{c.client}</p>
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                          <div className="flex-1 overflow-hidden rounded-full bg-[#e7e5e4]" style={{ height: '3px' }}>
                            <div className="h-full rounded-full bg-[#615fff] transition-all duration-300" style={{ width: `${c.avancement}%` }} />
                          </div>
                          <span className="w-8 shrink-0 font-mono text-[10px] tabular-nums text-[#a8a29e]">{c.avancement}%</span>
                        </div>
                        <span className="text-right font-mono text-[12px] tabular-nums text-[#79716b]">{c.budget}</span>
                        <span
                          className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] font-semibold ${
                            c.status === 'Réception'
                              ? 'bg-[#ecfdf5] text-[#047857]'
                              : c.status === 'En cours'
                              ? 'bg-[#edeaff] text-[#4f46e5]'
                              : 'bg-[#fffbeb] text-[#b45309]'
                          }`}
                        >
                          {c.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Metric strip ──────────────────────────────────────────────────── */}
      <section className="border-b border-[#e7e5e4] bg-white px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: '€ 2.4M', label: 'chantiers gérés / mois', source: 'agrégé · oct. 2024' },
              { value: '12 min', label: 'économisées par devis', source: 'vs. méthode tableur' },
              { value: '94 %', label: 'taux de recouvrement', source: 'délai moyen −18 j.' },
              { value: '4.8 / 5', label: 'satisfaction client', source: '127 avis vérifiés' },
            ].map(({ value, label, source }) => (
              <div key={label} className="border-l border-[#e7e5e4] pl-6 first:border-l-0 first:pl-0">
                <p className="font-mono text-[36px] font-medium tabular-nums tracking-tight text-[#292524]">{value}</p>
                <p className="mt-1.5 text-sm text-[#292524]">{label}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#a8a29e]">{source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Devis & Factures ──────────────────────────────────────────────── */}
      <section className="border-b border-[#e7e5e4] bg-[#fafaf9] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#615fff]">Devis & Factures</span>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl" style={{ textWrap: 'balance' }}>
                Du devis signé à la facture encaissée.
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-[#79716b]">
                Créez vos devis en 5 minutes, suivez leur statut, générez la facture d'un clic. Plus aucune relance oubliée.
              </p>
            </div>
            <div className="flex items-end">
              <button type="button" className="rounded-lg border border-[#e7e5e4] bg-white px-5 py-2.5 text-sm font-semibold text-[#292524] transition-all duration-200 hover:bg-[#f3f2f0]">
                Voir la démo
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Pipeline devis */}
            <div className="rounded-2xl border border-[#e7e5e4] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold tracking-tight text-[#292524]">Pipeline devis</p>
                  <p className="mt-1 text-sm text-[#79716b]">3 devis actifs · € 404.5k</p>
                </div>
                <span className="rounded-full bg-[#ecfdf5] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] font-semibold text-[#047857]">Actif</span>
              </div>

              {/* Stage pipeline */}
              <div className="mb-5 flex items-center gap-1 overflow-x-auto pb-1">
                {['Créé', 'Envoyé', 'En lecture', 'Signé', 'Facturé'].map((s, i) => (
                  <div key={s} className="flex shrink-0 items-center gap-1">
                    <span
                      className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] font-semibold ${
                        i === 2 ? 'bg-[#615fff] text-white' : i < 2 ? 'bg-[#edeaff] text-[#4f46e5]' : 'bg-[#f3f2f0] text-[#79716b]'
                      }`}
                    >
                      {s}
                    </span>
                    {i < 4 && <span className="text-[#d4d2d0] text-xs">›</span>}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {devisData.map((d) => (
                  <div
                    key={d.ref}
                    onClick={() => setActiveDevisRow(d.ref === activeDevisRow ? null : d.ref)}
                    className={`grid cursor-pointer grid-cols-[auto_1fr_auto_auto] items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors duration-150 ${
                      activeDevisRow === d.ref
                        ? 'border-[#615fff]/30 bg-[#edeaff]/40 shadow-[inset_3px_0_0_#615fff]'
                        : 'border-[#e7e5e4] bg-[#fbfaf7] hover:bg-[#f5f4f2]'
                    }`}
                  >
                    <span className="font-mono text-[10px] tracking-[0.06em] text-[#a8a29e]">{d.ref}</span>
                    <div>
                      <p className="text-sm font-semibold text-[#292524]">{d.client}</p>
                      <p className="text-xs text-[#79716b]">Envoyé le {d.envoi}</p>
                    </div>
                    <span className="font-mono text-[12px] tabular-nums text-[#79716b]">{d.montant}</span>
                    <span
                      className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] font-semibold ${
                        d.status === 'Signé'
                          ? 'bg-[#ecfdf5] text-[#047857]'
                          : d.status === 'En lecture'
                          ? 'bg-[#edeaff] text-[#4f46e5]'
                          : 'bg-[#fffbeb] text-[#b45309]'
                      }`}
                    >
                      {d.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Factures */}
            <div className="rounded-2xl border border-[#e7e5e4] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold tracking-tight text-[#292524]">Suivi factures</p>
                  <p className="mt-1 text-sm text-[#79716b]">Relances automatiques activées</p>
                </div>
                <div className="flex items-center gap-1 rounded-full border border-[#e7e5e4] bg-[#fbfaf7] p-1">
                  <span className="rounded-full bg-[#ecfdf5] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] font-semibold text-[#047857]">1 payée</span>
                  <span className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] font-medium text-[#79716b]">2 att.</span>
                </div>
              </div>

              <div className="space-y-2">
                {facturesData.map((f) => (
                  <div
                    key={f.ref}
                    onClick={() => setActiveFactureRow(f.ref === activeFactureRow ? null : f.ref)}
                    className={`grid cursor-pointer grid-cols-[auto_1fr_auto_auto] items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors duration-150 ${
                      activeFactureRow === f.ref
                        ? 'border-[#615fff]/30 bg-[#edeaff]/40 shadow-[inset_3px_0_0_#615fff]'
                        : 'border-[#e7e5e4] bg-[#fbfaf7] hover:bg-[#f5f4f2]'
                    }`}
                  >
                    <span className="font-mono text-[10px] tracking-[0.06em] text-[#a8a29e]">{f.ref}</span>
                    <div>
                      <p className="text-sm font-semibold text-[#292524]">{f.client}</p>
                      <p className="text-xs text-[#79716b]">Éch. {f.echeance}</p>
                    </div>
                    <span className="font-mono text-[12px] tabular-nums text-[#79716b]">{f.montant}</span>
                    <span
                      className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] font-semibold ${
                        f.status === 'Payée'
                          ? 'bg-[#ecfdf5] text-[#047857]'
                          : f.status === 'En retard'
                          ? 'bg-[#fff1f2] text-[#b91c1c]'
                          : 'bg-[#fffbeb] text-[#b45309]'
                      }`}
                    >
                      {f.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#fffbeb] bg-[#fffbeb] p-3.5">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#f59e0b]" />
                <p className="text-sm text-[#79716b]">
                  Relance automatique envoyée à{' '}
                  <span className="font-semibold text-[#292524]">Promo Loire</span> — FA-2024-187
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Analytics ─────────────────────────────────────────────────────── */}
      <section className="border-b border-[#e7e5e4] bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#615fff]">Analytics</span>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl" style={{ textWrap: 'balance' }}>
              Vos chiffres, sans les tableurs.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[#79716b]">
              CA prévisionnel, marges par chantier, coûts en temps réel. Toutes vos données financières consolidées et lisibles.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            {/* CA chart */}
            <div className="rounded-2xl border border-[#e7e5e4] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-base font-semibold tracking-tight text-[#292524]">Chiffre d'affaires prévisionnel</p>
                  <p className="mt-1 text-sm text-[#79716b]">Réel vs prévision — Jul à Déc 2024</p>
                </div>
                <span className="shrink-0 rounded-full bg-[#f3f2f0] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] font-semibold text-[#79716b]">T3–T4</span>
              </div>
              <div className="mb-5 flex items-center gap-5 text-xs text-[#79716b]">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-5 rounded-sm bg-[#615fff]" />
                  Réel
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-5 rounded-sm bg-[#e7e5e4]" />
                  Prévision
                </span>
              </div>

              {/* Bar chart */}
              <div className="flex h-36 items-end gap-1.5">
                {caData.map(({ mois, reel, prev }) => (
                  <div key={mois} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="flex w-full items-end gap-0.5" style={{ height: '120px' }}>
                      <div
                        className="w-1/2 rounded-t bg-[#e7e5e4]"
                        style={{ height: `${(prev / maxCA) * 120}px` }}
                      />
                      <div
                        className={`w-1/2 rounded-t ${reel ? 'bg-[#615fff]' : 'bg-[#e7e5e4]/40'}`}
                        style={{ height: `${reel ? (reel / maxCA) * 120 : (prev / maxCA) * 60}px` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-[#79716b]">{mois}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-4 border-t border-[#e7e5e4] pt-5">
                {[
                  { label: 'CA réel T3', value: '€ 241k' },
                  { label: 'CA prévu T4', value: '€ 273k' },
                  { label: 'Marge brute moy.', value: '34.2 %' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#79716b]">{label}</p>
                    <p className="mt-1.5 font-mono text-[18px] font-medium tracking-tight text-[#292524]">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5">
              {/* Coûts prévisionnels */}
              <div className="rounded-2xl border border-[#e7e5e4] bg-[#fbfaf7] p-5">
                <p className="text-base font-semibold tracking-tight text-[#292524]">Coûts prévisionnels</p>
                <p className="mt-1 text-sm text-[#79716b]">Répartition nov. 2024</p>
                <div className="mt-5 space-y-3.5">
                  {[
                    { cat: "Main d'œuvre", pct: 55, value: '€ 85k', color: '#615fff' },
                    { cat: 'Matériaux', pct: 28, value: '€ 43k', color: '#22b8cd' },
                    { cat: 'Sous-traitance', pct: 12, value: '€ 18.5k', color: '#10b981' },
                    { cat: 'Frais fixes', pct: 5, value: '€ 7.7k', color: '#e7e5e4' },
                  ].map(({ cat, pct, value, color }) => (
                    <div key={cat}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="font-medium">{cat}</span>
                        <span className="font-mono text-[#79716b]">{value}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[#e7e5e4]">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Marge par chantier */}
              <div className="rounded-2xl border border-[#e7e5e4] bg-[#fbfaf7] p-5">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold tracking-tight text-[#292524]">Marge par chantier</p>
                  <span className="rounded-full bg-[#ecfdf5] px-2.5 py-1 font-mono text-[11px] font-semibold text-[#047857]">Live</span>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    { name: 'Résidence Horizon', marge: 38.4 },
                    { name: 'Bureaux Park Ouest', marge: 31.2 },
                    { name: 'Rénovation Mairie', marge: 29.8 },
                  ].map(({ name, marge }) => (
                    <div key={name} className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 ring-1 ring-[#e7e5e4]">
                      <p className="text-sm font-medium">{name}</p>
                      <span className="font-mono text-[12px] tabular-nums text-[#615fff]">{marge} %</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mailing automatisé ────────────────────────────────────────────── */}
      <section className="border-b border-[#e7e5e4] bg-[#fafaf9] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#615fff]">Mailing automatisé</span>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl" style={{ textWrap: 'balance' }}>
                Plus aucun mail urgent perdu.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#79716b]">
                L'IA classe automatiquement vos mails par priorité. Les urgences remontent, les relances se planifient, les infos se trient.
              </p>
              <div className="mt-8 space-y-5">
                {[
                  ['Triage intelligent', 'Urgences, demandes, infos — classifiés automatiquement à chaque réception.'],
                  ['Relances auto', 'Factures impayées et devis sans réponse relancés sans effort manuel.'],
                  ['Modèles BTP', '40+ modèles prêts : avenants, PV de réception, situations de travaux.'],
                ].map(([title, desc]) => (
                  <div key={title} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#615fff]" />
                    <div>
                      <p className="font-semibold text-[#292524]">{title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#79716b]">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inbox mockup */}
            <div className="overflow-hidden rounded-2xl border border-[#e7e5e4] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between border-b border-[#e7e5e4] bg-[#fbfaf7] px-5 py-3.5">
                <p className="font-display text-base font-semibold">Boîte de réception</p>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                  <span className="font-mono text-[11px] text-[#79716b]">Tri IA actif</span>
                  <span className="ml-2 rounded-full bg-[#615fff] px-2.5 py-1 text-xs font-semibold text-white">2 urgences</span>
                </div>
              </div>
              <div className="divide-y divide-[#e7e5e4]">
                {mailsData.map((mail) => (
                  <div
                    key={mail.subject}
                    onClick={() => setActiveMailRow(mail.subject === activeMailRow ? null : mail.subject)}
                    className={`flex cursor-pointer items-start gap-4 px-5 py-4 transition-colors duration-150 ${
                      activeMailRow === mail.subject
                        ? 'bg-[#edeaff]/40 shadow-[inset_3px_0_0_#615fff]'
                        : 'hover:bg-[#fbfaf7]'
                    } ${mail.unread ? '' : 'opacity-70'}`}
                  >
                    <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f3f2f0] font-mono text-xs font-semibold text-[#79716b]">
                      {mail.from.slice(0, 1)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`truncate text-sm ${mail.unread ? 'font-semibold' : 'font-medium text-[#79716b]'}`}>{mail.from}</p>
                        <span className="shrink-0 font-mono text-xs text-[#79716b]">{mail.time}</span>
                      </div>
                      <p className={`truncate text-sm ${mail.unread ? 'text-[#292524]' : 'text-[#79716b]'}`}>{mail.subject}</p>
                      <p className="truncate text-xs text-[#79716b]">{mail.preview}</p>
                    </div>
                    <span
                      className={`mt-1 shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] font-semibold ${
                        mail.tag === 'URGENT'
                          ? 'bg-[#fff1f2] text-[#b91c1c]'
                          : mail.tag === 'À traiter'
                          ? 'bg-[#fffbeb] text-[#b45309]'
                          : 'bg-[#f3f2f0] text-[#79716b]'
                      }`}
                    >
                      {mail.tag}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#e7e5e4] bg-[#fbfaf7] px-5 py-3">
                <p className="text-xs text-[#79716b]">
                  Dernier tri IA :{' '}
                  <span className="font-semibold text-[#292524]">il y a 3 minutes</span> · 12 mails traités aujourd'hui
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Équipes & Chantiers ───────────────────────────────────────────── */}
      <section className="border-b border-[#e7e5e4] bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#615fff]">Équipes & Chantiers</span>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl" style={{ textWrap: 'balance' }}>
              Chaque chantier, chaque équipe, tout en ordre.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[#79716b]">
              Affectez vos équipes aux chantiers, suivez les tâches et accédez à toutes les informations depuis le terrain.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {equipeData.map((m) => (
              <div
                key={m.name}
                onClick={() => setActiveEquipe(m.name === activeEquipe ? null : m.name)}
                className={`cursor-pointer rounded-2xl border p-5 transition-colors duration-150 ${
                  activeEquipe === m.name
                    ? 'border-[#615fff]/30 bg-[#edeaff]/40 shadow-[inset_3px_0_0_#615fff]'
                    : 'border-[#e7e5e4] bg-[#fbfaf7] hover:bg-[#f5f4f2]'
                }`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-xl font-mono text-sm font-bold text-white"
                    style={{ backgroundColor: m.color }}
                  >
                    {m.avatar}
                  </div>
                  <span className="rounded-full border border-[#e7e5e4] bg-white px-2.5 py-1 text-[11px] font-medium text-[#79716b]">
                    {m.taches} tâches
                  </span>
                </div>
                <p className="font-display font-semibold">{m.name}</p>
                <p className="mt-1 text-sm text-[#79716b]">{m.role}</p>
                <div className="mt-3.5 rounded-xl border border-[#e7e5e4] bg-white px-3.5 py-2.5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#79716b]">Chantier actif</p>
                  <p className="mt-0.5 text-sm font-semibold">{m.chantier}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#e7e5e4] bg-[#fbfaf7] p-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#22b8cd]" />
              <p className="text-sm text-[#79716b]">
                <span className="font-semibold text-[#292524]">Bâtiflow Mobile</span> — Vos équipes terrain accèdent à leurs missions, photos et rapports directement depuis leur téléphone.
              </p>
            </div>
            <button type="button" className="shrink-0 rounded-lg border border-[#e7e5e4] bg-white px-4 py-2 text-sm font-semibold text-[#292524] transition-all duration-150 hover:bg-[#f3f2f0] active:scale-[0.97]">
              iOS & Android →
            </button>
          </div>
        </div>
      </section>

      {/* ── Planning ──────────────────────────────────────────────────────── */}
      <section className="border-b border-[#e7e5e4] bg-[#fafaf9] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:items-center">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#615fff]">Planning</span>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl" style={{ textWrap: 'balance' }}>
                Planifiez. Ajustez. Avancez.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#79716b]">
                Vue Gantt, calendrier équipes et jalons partagés. Glissez-déposez pour réajuster, exportez en PDF pour vos clients.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button type="button" className="rounded-lg bg-[#615fff] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(97,95,255,0.28)] transition-all duration-150 hover:bg-[#4f39f6] active:scale-[0.97]">
                  Créer un planning
                </button>
                <button type="button" className="rounded-lg border border-[#e7e5e4] bg-white px-5 py-2.5 text-sm font-semibold text-[#292524] transition-all duration-150 hover:bg-[#f3f2f0] active:scale-[0.97]">
                  Voir la démo
                </button>
              </div>
            </div>

            {/* Gantt mockup */}
            <div className="overflow-hidden rounded-2xl border border-[#e7e5e4] bg-white p-5 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-display font-semibold">Planning novembre 2024</p>
                <div className="flex gap-1.5">
                  {['Semaine', 'Mois'].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setActiveGanttView(v)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                        activeGanttView === v
                          ? 'bg-[#edeaff] text-[#615fff]'
                          : 'border border-[#e7e5e4] text-[#79716b] hover:bg-[#f3f2f0]'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gantt header */}
              <div className="mb-2 grid grid-cols-[150px_1fr]">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#79716b]">Chantier</span>
                <div className="grid grid-cols-4 text-center">
                  {['S44', 'S45', 'S46', 'S47'].map((s) => (
                    <span key={s} className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#79716b]">{s}</span>
                  ))}
                </div>
              </div>

              {/* Gantt rows */}
              <div className="space-y-2.5">
                {[
                  { name: 'Résidence Horizon', start: 0, span: 3, color: '#615fff', phase: 'Gros œuvre' },
                  { name: 'Bureaux Park Ouest', start: 1, span: 2, color: '#22b8cd', phase: 'Fondations' },
                  { name: 'Rénovation Mairie', start: 2, span: 2, color: '#10b981', phase: 'Finitions' },
                ].map(({ name, start, span, color, phase }) => (
                  <div key={name} className="grid grid-cols-[150px_1fr] items-center gap-2">
                    <div>
                      <p className="truncate text-sm font-semibold">{name}</p>
                      <p className="truncate text-[11px] text-[#79716b]">{phase}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-0.5">
                      {[0, 1, 2, 3].map((col) => (
                        <div key={col} className="h-8 border-l border-[#e7e5e4] first:border-l-0 px-0.5">
                          {col >= start && col < start + span && (
                            <div className="h-full rounded-md" style={{ backgroundColor: color, opacity: 0.8 }} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Milestones */}
              <div className="mt-5 border-t border-[#e7e5e4] pt-4">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#79716b]">Jalons</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    { label: 'Livraison gros œuvre', date: '15 nov.', color: '#615fff' },
                    { label: 'Réception Mairie', date: '28 nov.', color: '#10b981' },
                  ].map(({ label, date, color }) => (
                    <div key={label} className="rounded-xl border border-[#e7e5e4] bg-[#fbfaf7] px-3.5 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                        <span className="font-mono text-[11px] text-[#79716b]">{date}</span>
                      </div>
                      <p className="mt-1 text-sm font-semibold">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust rail ────────────────────────────────────────────────────── */}
      <section className="border-b border-[#e7e5e4] bg-white px-5 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-[#79716b]">
            Confiance & conformité
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { stat: 'RGPD', label: 'Données hébergées en France', mono: 'Certifié', accent: false },
              { stat: '99.8 %', label: 'Uptime garanti', mono: 'SLA Enterprise', accent: true },
              { stat: 'ISO 9001', label: 'Qualité certifiée', mono: 'Audit 2024', accent: false },
              { stat: '127', label: 'Entreprises BTP clientes', mono: 'Clients actifs', accent: false },
            ].map(({ stat, label, mono, accent }) => (
              <div key={stat} className={`rounded-2xl border p-5 ${accent ? 'border-[#615fff]/20 bg-[#edeaff]/40' : 'border-[#e7e5e4] bg-[#fbfaf7]'}`}>
                <p className={`font-mono text-[28px] font-medium tabular-nums tracking-tight ${accent ? 'text-[#4f46e5]' : 'text-[#292524]'}`}>{stat}</p>
                <p className="mt-1.5 text-sm text-[#292524]">{label}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#a8a29e]">{mono}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <section className="border-b border-[#e7e5e4] bg-[#fafaf9] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#615fff]">Tarifs</span>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Simple. Prévisible. Sans surprise.
            </h2>
            <p className="mt-4 text-base text-[#79716b]">14 jours d'essai gratuit — pas de carte bancaire requise.</p>
          </div>

          <div className="grid items-stretch gap-4 md:grid-cols-3">
            {pricingPlans.map((plan) => {
              const isSelected = activePlan === plan.name
              const isAccent = plan.accent || isSelected
              return (
                <div
                  key={plan.name}
                  onClick={() => setActivePlan(plan.name)}
                  className={`relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border p-7 transition-all duration-200 ${
                    isSelected
                      ? 'border-[#615fff] bg-white shadow-[0_16px_48px_rgba(97,95,255,0.14)]'
                      : 'border-[#e7e5e4] bg-white hover:border-[#c5c2f8] hover:shadow-[0_4px_16px_rgba(97,95,255,0.07)]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute inset-y-0 left-0 w-[3px] rounded-l-2xl bg-[#615fff]" />
                  )}
                  {plan.accent && (
                    <div className="absolute right-5 top-5 inline-flex rounded-full bg-[#edeaff] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] font-semibold text-[#4f46e5]">
                      Recommandé
                    </div>
                  )}
                  <p className="text-base font-semibold tracking-tight text-[#292524]">{plan.name}</p>
                  <div className="mt-3 flex items-end gap-1">
                    {plan.price === 'Sur devis' ? (
                      <p className="font-mono text-[28px] font-medium tracking-tight text-[#292524]">Sur devis</p>
                    ) : (
                      <>
                        <p className="font-mono text-[36px] font-medium tabular-nums tracking-tight text-[#292524]">€ {plan.price}</p>
                        <p className="mb-1.5 font-mono text-[12px] text-[#a8a29e]">/mois</p>
                      </>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#79716b]">{plan.description}</p>
                  <div className="my-6 h-px bg-[#e7e5e4]" />
                  <ul className="flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckIcon accent={isAccent} />
                        <span className="text-[#292524]">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    className={`mt-8 w-full rounded-lg py-3 text-sm font-semibold transition-all duration-200 ${
                      isAccent
                        ? 'bg-[#615fff] text-white shadow-[0_4px_16px_rgba(97,95,255,0.28)] hover:bg-[#4f39f6] active:scale-[0.98]'
                        : 'border border-[#e7e5e4] bg-[#f3f2f0] text-[#292524] hover:bg-[#e7e5e4] active:scale-[0.98]'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA final ─────────────────────────────────────────────────────── */}
      <section className="border-b border-[#e7e5e4] bg-[#111827] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl" style={{ textWrap: 'balance' }}>
            Prêt à piloter vos chantiers autrement ?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/60">
            Rejoignez les 127 entreprises du bâtiment qui gèrent leur activité depuis Bâtiflow. Démarrez en 5 minutes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              className="rounded-lg bg-[#615fff] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(97,95,255,0.40)] transition-all duration-150 hover:bg-[#4f39f6] active:scale-[0.98]"
            >
              Démarrer gratuitement
            </button>
            <button
              type="button"
              className="rounded-lg border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-white/15 active:scale-[0.98]"
            >
              Demander une démo
            </button>
          </div>
          <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.16em] text-white/40">Essai 14 jours · Sans carte bancaire · Annulation libre</p>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="bg-[#fbfaf7] px-5 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-8 border-b border-[#e7e5e4] pb-8 md:flex-row md:items-center">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#615fff] font-display text-sm font-bold text-white">B</span>
              <div>
                <p className="font-display font-semibold">Bâtiflow</p>
                <p className="text-xs text-[#79716b]">La plateforme des pros du bâtiment</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-[#79716b]">
              {['Fonctionnalités', 'Tarifs', 'Blog BTP', 'Support', 'CGU', 'RGPD'].map((item) => (
                <button key={item} type="button" className="transition-colors hover:text-[#292524]">{item}</button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#79716b]">
              © 2024 Bâtiflow — Démo portfolio Clean SaaS
            </p>
            <Link
              to="/skills/clean-saas"
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#79716b] transition-colors hover:text-[#615fff]"
            >
              ← Retour au skill Clean SaaS
            </Link>
          </div>
        </div>
      </footer>

      {/* Reduced motion */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  )
}

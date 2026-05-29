import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  editableProjectImages,
  getProjectImageValue,
  imageSlots,
  resetAllProjectImageOverrides,
  resetProjectImageOverrides,
  setProjectImageOverride,
  useProjectImageOverrides,
} from '../data/projectImageOverrides.js'
import './Backoffice.css'

const statusLabels = {
  saved: 'Sauvegarde locale',
  ready: 'Pret',
  error: 'Erreur',
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M6 3H3v10h10v-3M9 3h4v4M8 8l5-5" />
    </svg>
  )
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 11V3M5 6l3-3 3 3M3 13h10" />
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4.2 4.8A5 5 0 1 1 3 8M3 4v4h4" />
    </svg>
  )
}

function optimizeImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onerror = () => reject(new Error('Lecture image impossible.'))
    reader.onload = () => {
      const raw = String(reader.result)

      if (!file.type.startsWith('image/') || file.type === 'image/svg+xml' || file.type === 'image/gif') {
        resolve(raw)
        return
      }

      const image = new Image()
      image.onload = () => {
        const maxSize = 1800
        const ratio = Math.min(1, maxSize / image.width, maxSize / image.height)
        const width = Math.max(1, Math.round(image.width * ratio))
        const height = Math.max(1, Math.round(image.height * ratio))
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, width, height)
        resolve(canvas.toDataURL('image/webp', 0.88))
      }
      image.onerror = () => resolve(raw)
      image.src = raw
    }

    reader.readAsDataURL(file)
  })
}

function StatusPill({ type, children }) {
  return (
    <span className="bo-status" data-status={type}>
      {children}
    </span>
  )
}

function ProjectRow({ project, active, overrideCount, onSelect }) {
  return (
    <button className="bo-project-row" data-active={active} type="button" onClick={onSelect}>
      <span>
        <strong>{project.title}</strong>
        <em>{project.slug}</em>
      </span>
      <StatusPill type={overrideCount ? 'saved' : 'ready'}>
        {overrideCount ? `${overrideCount} override${overrideCount > 1 ? 's' : ''}` : 'Defaut'}
      </StatusPill>
    </button>
  )
}

function ImageSlotEditor({ project, slot, value, defaultValue, hasOverride, onSave, onReset }) {
  const [draft, setDraft] = useState(value)
  const [busy, setBusy] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    setDraft(value)
  }, [value])

  const handleUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setBusy(true)
    try {
      const dataUrl = await optimizeImageFile(file)
      onSave(slot.key, dataUrl, `${slot.label} mis a jour`)
    } catch (error) {
      onSave(slot.key, '', error.message || 'Upload impossible', true)
    } finally {
      setBusy(false)
      event.target.value = ''
    }
  }

  return (
    <article className="bo-slot" data-override={hasOverride}>
      <div className="bo-slot-preview">
        <img src={value} alt="" loading="eager" decoding="async" />
      </div>

      <div className="bo-slot-body">
        <div className="bo-slot-head">
          <span>
            <small>{slot.group}</small>
            <strong>{slot.label}</strong>
          </span>
          <StatusPill type={hasOverride ? 'saved' : 'ready'}>{hasOverride ? 'Custom' : 'Defaut'}</StatusPill>
        </div>

        <p>{slot.description}</p>

        <label className="bo-field">
          <span>URL ou data image</span>
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') onSave(slot.key, draft, `${slot.label} mis a jour`)
            }}
          />
        </label>

        <div className="bo-actions">
          <button type="button" className="bo-button primary" onClick={() => onSave(slot.key, draft, `${slot.label} mis a jour`)}>
            Appliquer URL
          </button>
          <button type="button" className="bo-button" disabled={busy} onClick={() => inputRef.current?.click()}>
            <UploadIcon />
            {busy ? 'Import...' : 'Uploader'}
          </button>
          <button type="button" className="bo-button danger" disabled={!hasOverride} onClick={() => onReset(slot.key, slot.label)}>
            <ResetIcon />
            Reset
          </button>
        </div>

        <input ref={inputRef} className="bo-file" type="file" accept="image/*" onChange={handleUpload} />
        <code className="bo-default">{project.slug} / {slot.key}: {defaultValue}</code>
      </div>
    </article>
  )
}

export default function Backoffice() {
  const overrides = useProjectImageOverrides()
  const [selectedSlug, setSelectedSlug] = useState(editableProjectImages[0]?.slug ?? '')
  const [status, setStatus] = useState({ type: 'ready', text: 'Sauvegarde locale dans ce navigateur' })
  const statusTimerRef = useRef(0)
  const selectedProject = useMemo(
    () => editableProjectImages.find((project) => project.slug === selectedSlug) ?? editableProjectImages[0],
    [selectedSlug],
  )

  const notify = (type, text) => {
    setStatus({ type, text })
    window.clearTimeout(statusTimerRef.current)
    statusTimerRef.current = window.setTimeout(() => {
      setStatus({ type: 'ready', text: 'Sauvegarde locale dans ce navigateur' })
    }, 2200)
  }

  useEffect(() => () => window.clearTimeout(statusTimerRef.current), [])

  const handleSave = (slotKey, value, message, isError = false) => {
    if (isError) {
      notify('error', message)
      return
    }

    try {
      setProjectImageOverride(selectedProject.slug, slotKey, value)
      notify('saved', message)
    } catch {
      notify('error', 'Image trop lourde pour la sauvegarde locale.')
    }
  }

  const handleResetSlot = (slotKey, label) => {
    try {
      setProjectImageOverride(selectedProject.slug, slotKey, '')
      notify('saved', `${label} remis par defaut`)
    } catch {
      notify('error', 'Reset impossible.')
    }
  }

  const handleResetProject = () => {
    resetProjectImageOverrides(selectedProject.slug)
    notify('saved', `${selectedProject.title} remis par defaut`)
  }

  const handleResetAll = () => {
    resetAllProjectImageOverrides()
    notify('saved', 'Tous les visuels sont revenus par defaut')
  }

  const totalOverrides = Object.values(overrides).reduce((count, projectOverrides) => count + Object.keys(projectOverrides).length, 0)

  return (
    <main className="backoffice-page" data-skill="utilitarian" data-archetype="settings-console">
      <header className="bo-topbar">
        <div>
          <span className="bo-kicker">Portfolio admin</span>
          <h1>Backoffice images</h1>
        </div>
        <div className="bo-top-actions">
          <StatusPill type={status.type}>{statusLabels[status.type] || status.type}</StatusPill>
          <span className="bo-status-text">{status.text}</span>
          <Link className="bo-button" to="/#projects">
            Travaux <ExternalLinkIcon />
          </Link>
          <Link className="bo-button" to="/featured">
            Featured <ExternalLinkIcon />
          </Link>
        </div>
      </header>

      <section className="bo-shell">
        <aside className="bo-sidebar" aria-label="Projets">
          <div className="bo-sidebar-head">
            <strong>Projets</strong>
            <span>{totalOverrides} modifications</span>
          </div>
          <div className="bo-project-list">
            {editableProjectImages.map((project) => (
              <ProjectRow
                key={project.slug}
                project={project}
                active={project.slug === selectedProject.slug}
                overrideCount={Object.keys(overrides[project.slug] ?? {}).length}
                onSelect={() => setSelectedSlug(project.slug)}
              />
            ))}
          </div>
          <button type="button" className="bo-button danger wide" disabled={!totalOverrides} onClick={handleResetAll}>
            <ResetIcon />
            Tout reinitialiser
          </button>
        </aside>

        <section className="bo-workspace" aria-label={`Images ${selectedProject.title}`}>
          <div className="bo-workspace-head">
            <div>
              <span className="bo-kicker">{selectedProject.slug}</span>
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.discipline}</p>
            </div>
            <button
              type="button"
              className="bo-button danger"
              disabled={!overrides[selectedProject.slug]}
              onClick={handleResetProject}
            >
              <ResetIcon />
              Reset projet
            </button>
          </div>

          <div className="bo-slot-grid">
            {imageSlots.map((slot) => {
              const value = getProjectImageValue(selectedProject, slot.key, overrides)
              const defaultValue = selectedProject.defaults[slot.key]
              const hasOverride = Boolean(overrides[selectedProject.slug]?.[slot.key])

              return (
                <ImageSlotEditor
                  key={`${selectedProject.slug}-${slot.key}`}
                  project={selectedProject}
                  slot={slot}
                  value={value}
                  defaultValue={defaultValue}
                  hasOverride={hasOverride}
                  onSave={handleSave}
                  onReset={handleResetSlot}
                />
              )
            })}
          </div>
        </section>
      </section>
    </main>
  )
}

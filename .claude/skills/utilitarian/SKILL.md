---
name: utilitarian
description: "Use this skill to create utilitarian interfaces that prioritize function, speed, legibility, controls, repeated action, information density, and operational trust without decorative noise. USE FOR: admin tools, internal systems, data entry, operational dashboards, documentation utilities, productivity workflows. DO NOT USE FOR: unrelated backend work, non-visual tasks, or when an existing product design system must be followed exactly."
---

# Utilitarian

## Core Directive

You are designing in the Utilitarian style. The output must feel plain, efficient, robust, direct, legible, work-focused. Do not merely apply a color theme; build a coherent visual system across layout, typography, color, component geometry, imagery, motion, and interaction states.

Use this skill when the user asks for admin tools, internal systems, data entry, operational dashboards, documentation utilities, productivity workflows.

## Mandatory Workflow

Before writing UI code or final visual instructions:

1. Identify the product type, audience, primary action, and emotional target.
2. Choose one layout archetype from the reference database.
3. Choose one typography strategy, one color strategy, one component geometry rule, and one motion rule.
4. State the anti-slop risks for this style.
5. Build the interface with real sections, real states, and responsive behavior.
6. Run the pre-output checklist at the end.

If the task is substantial, load [references/refero-style-database.md](references/refero-style-database.md) before designing. If the user asks for source-specific inspiration, inspect [references/sources/](references/sources/).

## Non-Negotiable Style Rules

- Optimize for task completion, repeated action, and information retrieval.
- Keep controls visible and close to the content they affect.
- Use semantic state color and plain language.

## Absolute Bans

- Do not add hero theatrics to a work surface.
- Do not hide controls to make the page look clean.
- Do not use decorative illustrations where data or controls are needed.

## Reference Database

The detailed Refero-derived analysis lives outside this main skill file to keep runtime context lean:

- Full consolidated database: [references/refero-style-database.md](references/refero-style-database.md)
- Raw source notes: [references/sources/](references/sources/)

Primary sources used:

- Office Chair Finder - Utilitarian Source Notes: https://styles.refero.design/style/756dd3c1-6ccf-4824-bad3-96027cd0faf0 (https://findmy.vitra.com/en-en)
- MAKR - Utilitarian Source Notes: https://styles.refero.design/style/f2bf6db7-37b6-4394-be97-6bbb2c45c268 (https://makr.com)
- Norm - Utilitarian Source Notes: https://styles.refero.design/style/8d66df35-a06c-4ea9-ae8b-ab3e1c01f797 (https://norm.store)
- Superpower - Utilitarian Source Notes: https://styles.refero.design/style/5d34568d-4bdc-445d-a527-c6f5249fa8fb (https://superpower.com)
- Ordinal - Utilitarian Source Notes: https://styles.refero.design/style/4657db98-0c6c-4848-91e9-c339f3bb7815 (https://www.meetassembly.com)

## Source Direction Matrix

Use this matrix to choose a source direction quickly, then load the full reference only if the task needs deeper specificity.

| Source | What To Extract | Use It For |
| --- | --- | --- |
| Office Chair Finder - Utilitarian Source Notes | Monochrome utility with active red accents. | light expression, layout rhythm, component behavior |
| MAKR - Utilitarian Source Notes | Workshop-crafted monochrome utility. | light expression, layout rhythm, component behavior |
| Norm - Utilitarian Source Notes | Architectural blueprint on white marble. Precision, clean lines, and stark mono-palette highlight a single, functional object. | light expression, layout rhythm, component behavior |
| Superpower - Utilitarian Source Notes | Clinical precision, vibrant pulse. A highly legible monochrome foundation with a single, sharp burst of color highlighting interaction. | light expression, layout rhythm, component behavior |
| Ordinal - Utilitarian Source Notes | Midnight Command Center – A focused, dark interface illuminated by a singular, bright green operational light. | dark expression, layout rhythm, component behavior |

## Design Engine

### Direction Selection

When using this skill, choose one clear direction before designing. Do not average all references into a bland middle. The direction should be described in one sentence using this shape:

`This interface is a Utilitarian system for [audience] that feels plain, efficient, robust, direct, legible, work-focused and uses [layout move], [type move], [color move], and [component move] to make [primary action] obvious.`

If you cannot fill that sentence, stop and inspect the reference database before producing UI.

### Required Design Plan

Before code, include a compact design plan with:

1. Product type and audience.
2. Chosen Utilitarian sub-direction.
3. First viewport composition.
4. Typography strategy.
5. Color and accent policy.
6. Component geometry rule.
7. Motion rule.
8. Anti-slop risks specific to this style.

The plan should be short but decisive. It should prevent generic defaults before they appear.

### Visual System Contract

The final design must define these contracts:

- **Surface contract:** what backgrounds, panels, cards, overlays, and modals look like.
- **Type contract:** how hero, section, body, label, metadata, and CTA typography differ.
- **Color contract:** what each accent means and where it is forbidden.
- **Geometry contract:** radius, border, shadow, spacing, and alignment rules.
- **Evidence contract:** what proves the product, brand, object, or workflow is real.
- **Interaction contract:** hover, focus, active, loading, empty, error, and success behavior.

### Quality Bar

The output should feel intentionally art-directed but production-aware. It must not be a moodboard, a generic landing page, or a style pasted on top of default components.

## Pattern Arsenal

Use these patterns as starting points. Pick only the ones that match the user request.

### Pattern A: Signature Hero

Purpose: make the style visible immediately.

Rules:

- The H1 must carry a clear product or brand promise.
- The hero visual must show a real object, interface, workflow, scene, or material cue.
- The primary CTA must be readable and visually dominant.
- Avoid small decorative badges unless they support trust, status, or category.
- On mobile, preserve the style but reduce typographic risk.

### Pattern B: Evidence Section

Purpose: prevent the design from becoming pure mood.

Use one of:

- product screenshot
- workflow sequence
- feature grid with concrete examples
- material/product gallery
- customer proof
- data readout
- case-study index

Rules:

- Evidence should be inspectable.
- Do not blur, darken, crop, or decorate evidence until it stops being useful.
- Pair evidence with concise explanatory copy.

### Pattern C: System Section

Purpose: show that the visual identity can repeat.

Include:

- 3 to 5 reusable modules
- consistent spacing
- consistent component geometry
- real headings and body text
- visible interaction affordances

Rules:

- Do not use cards if rows, bands, or split sections are more appropriate.
- Do not vary every card color or radius.
- Let the style repeat through rules, not randomness.

### Pattern D: Conversion Or Action Section

Purpose: make the page usable.

Rules:

- Repeat the primary action language.
- Keep forms, pricing, checkout, booking, or signup calmer than decorative sections.
- Maintain strong contrast and clear focus states.
- Do not hide commitment details in tiny text.

### Pattern E: Final Closure

Purpose: end the page with brand confidence.

Use:

- strong footer typography
- compact navigation
- repeated visual motif
- final CTA
- source-aware color or material cue

Avoid a generic footer dump. The ending should feel designed.

## Implementation Guardrails

### Layout Guardrails

- Use stable responsive constraints: max-widths, aspect ratios, grid tracks, and spacing tokens.
- Do not let hover states resize cards or shift adjacent content.
- Avoid nested card-in-card layouts unless the inner card is a true control or modal.
- Prefer full-width sections or unframed layouts for major page bands.
- Keep text within containers on mobile; reduce scale before allowing awkward wrapping.

### Typography Guardrails

- Do not default to Inter unless the existing project already uses it and the style still needs it.
- Use display type for identity, not for long reading.
- Keep body copy readable on the actual background.
- Avoid all-caps paragraphs.
- Do not use tiny text to imitate sophistication.

### Color Guardrails

- Assign every color a role before using it.
- Do not use accent color for body text.
- Keep disabled, placeholder, and metadata text accessible.
- Ensure semantic colors are not confused with brand decoration.
- Test light, dark, image, and gradient surfaces separately.

### Motion Guardrails

- Use transform and opacity for motion.
- Respect reduced motion.
- Avoid constant decorative loops.
- Keep hover feedback fast and clear.
- Use scroll motion only when it explains sequence or creates real narrative.

### Asset Guardrails

- Use real or generated visual assets that reveal the product, place, object, state, or gameplay.
- Avoid purely atmospheric stock imagery when users need to inspect the subject.
- Do not use SVG hero illustrations when a real/generated bitmap image would better carry the category.
- Keep image crops intentional across desktop and mobile.

## Execution Protocol

### 1. Select A Direction

Pick one dominant direction. Do not blend every source at once. The chosen direction should answer:

- What should the first viewport feel like?
- What should the user understand first?
- What should be visually repeated across the page or app?
- What should be deliberately avoided?

### 2. Build The System

Define:

- color tokens and semantic roles
- typography scale and pairings
- section rhythm and page density
- component radius, border, shadow, and surface rules
- imagery style and crop logic
- hover, focus, loading, empty, error, and success states

### 3. Create Real Screens

Do not stop at moodboards or generic sections. Create complete screens with:

- navigation
- hero or primary task area
- proof or product evidence
- reusable feature/workflow modules
- conversion/action area
- footer or closure
- responsive behavior

### 4. Apply Motion Carefully

Use motion only for:

- reveal
- transition
- feedback
- continuity
- attention routing

Avoid motion that delays comprehension, hides controls, harms accessibility, or exists only as decoration.

## Pre-Output Checklist

Before delivering, verify:

- The first viewport clearly expresses Utilitarian.
- The primary action is obvious.
- Typography is readable and intentionally scaled.
- Color roles are semantic and consistent.
- Components share a coherent geometry.
- The design avoids every ban listed above.
- Mobile layout preserves the style without overflow or cramped text.
- Focus, hover, active, disabled, loading, empty, error, and success states are accounted for.
- Any referenced imagery is concrete and useful.
- The final result would not be mistaken for a generic template.

## Last-Mile Correction Rules

If the result feels generic, strengthen typography, section rhythm, and source-specific visual decisions. If it feels noisy, remove colors, effects, and components until the primary hierarchy becomes obvious. If it feels pretty but unusable, make controls, states, and content structure more conventional while preserving the style's identity.

## Prompt Pack

### General Prompt

Design a Utilitarian interface that feels plain, efficient, robust, direct, legible, work-focused. Build a coherent system, not a skin: define layout, type, color, component geometry, imagery, motion, states, and responsive behavior. Use the reference database only to extract transferable rules, not to clone a source.

### Website Prompt

Create a complete Utilitarian website with navigation, a first viewport that states the product clearly, product or brand evidence, reusable sections, a clear conversion path, and a designed footer. The style must be visible in the first viewport and must remain usable on mobile.

### App Prompt

Create a Utilitarian app interface for repeated use. Prioritize the main workflow, control placement, information density, readable state design, and keyboard-accessible interactions. Preserve the style through surfaces, typography, spacing, and component behavior rather than decorative effects.

### Redesign Prompt

Redesign the existing interface in a Utilitarian direction. Preserve functionality and information architecture unless the user asks otherwise. Remove generic AI design patterns, assign tokens, improve hierarchy, define states, and make the first screen feel specific.

### Critique Prompt

Audit this design against Utilitarian. Identify generic defaults, weak hierarchy, misuse of color, bad typography, missing states, poor mobile behavior, and places where the style is decorative instead of structural.

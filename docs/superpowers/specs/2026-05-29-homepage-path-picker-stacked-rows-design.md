# Homepage Path-Picker — Guided Stacked Rows — Design Spec

**Date:** 2026-05-29
**Status:** Approved (pending written-spec review)
**Scope:** Homepage path picker only (`src/components/HomePathPicker.jsx`). Replaces the 2×2 gradient tile grid with a stacked-row layout. No routing, header, footer, or assessment-flow changes.

## Background

The homepage (`/`) renders `HomePathPicker`: an intro band ("What brought you here today?") followed by a 2×2 grid of four full-bleed gradient tiles. Each tile is a path into a condition-specific assessment flow. The "Here's How It Works" section was removed in a prior change, so the picker is now the whole page.

The current tiles place white text directly on colored gradients and carry only a title plus a one-sentence description. Two issues motivated this redesign:

1. White-on-gradient text has borderline contrast.
2. The tiles do not clearly state *who* each path is for.

This is the chosen direction ("Direction 2") from a three-option visual brainstorm. The other two (a persona card grid and a step-indicator wizard) were set aside.

## Goal

Replace the 2×2 tile grid with a vertical list of four **full-width guided rows**. Each row states who the path is for (a persona label), gives a one-line scenario for context, and routes to the same assessment flow as today. Keep the intro band and all routing unchanged.

## Non-Goals

- No changes to routes, `App.jsx`, `CDCHeader`, `CDCFooter`, or the chatbot.
- No changes to the downstream assessment flows (`/get-started/*`).
- No new dependencies. USWDS 3.8.1 compiled CSS is already loaded via CDN in `index.html`; this design uses USWDS-aligned patterns expressed through the component's existing inline `<style>` approach (no new USWDS class wiring required).
- No final photography or illustration; simple inline line-icon SVGs are used.

## Design

### Data model

Replace the `TILES` array with a `PATHS` array. Each entry:

| Field | Purpose |
|---|---|
| `title` | Path name / the "who" headline (e.g., "For Myself") |
| `who` | Short uppercase persona label (the "who" indicator) |
| `scenario` | One-line context describing that person |
| `path` | Route to navigate to |
| `color` | Badge background and left-accent border color |
| `labelColor` | `who` label text color (darker variant tuned for AA on white) |
| `icon` | Inline SVG node (stroke line icon, `currentColor`) |

Content (locked):

| # | title | who | scenario | path | color | labelColor |
|---|---|---|---|---|---|---|
| 1 | For Myself | Managing my own health | You've been diagnosed with a chronic condition, or you want to understand your risk for diabetes, heart disease, or stroke. | `/get-started/for-myself` | `#005ea2` | `#005ea2` |
| 2 | For Someone I Care About | Caring for someone else | You're a family member, friend, or caregiver helping someone navigate their health and risks. | `/get-started/for-someone` | `#d83933` | `#a23737` |
| 3 | Just Curious | Exploring prevention | You feel healthy and want to learn what chronic disease prevention is all about. | `/get-started/just-curious` | `#0081a1` | `#0081a1` |
| 4 | For My Child | Supporting my child | You're a parent or guardian building healthy habits to lower your child's long-term risk. | `/get-started/for-child` | `#c05600` | `#c05600` |

> `labelColor` differs from `color` only for path 2, where the row's red (`#d83933`) is too light for AA text on white; the darker `#a23737` is used for the label text. Badge/border keep the brighter `#d83933` (icon is a graphic, 3:1 suffices).

### Layout

- The intro band is unchanged: `<h1>` "What brought you here today?" and the existing full paragraph ("Perhaps you're wondering what lifestyle changes might look like...").
- Below it, a single-column flex list (`gap: 1rem`) of four rows, inside the existing `maxWidth: 1200` centered container with `0 15px` horizontal padding (aligned with the header and intro).
- Each row is a horizontal flexbox: **[badge] [text block] [chevron]**.
  - **Badge:** 60px circle, background = path `color`, white line-icon SVG (~30px). Mobile (<768px): 48px circle, ~24px icon.
  - **Text block** (flex: 1): persona label (`who`, ~0.75rem, uppercase, `letter-spacing`, `labelColor`), title (`<h2>`-equivalent, ~1.35rem, bold, ink `#1b1b1b`), scenario line (~1rem, `#565c65`).
  - **Chevron:** "›" glyph, ~2rem, muted; hidden on mobile.
- Row chrome: `1px` border `#dfe1e2`, **`6px` left border in the path `color`**, `0.25rem` radius, white background, padding ~`1.4rem 1.6rem` (tighter on mobile).

### Interaction & accessibility

- Whole row is the click target. Carry over the existing tile pattern exactly: `role="button"`, `tabIndex={0}`, `onClick={() => goTo(path)}`, and `onKeyDown` activating on Enter/Space (with `preventDefault`).
- Each row has an accessible name combining title + scenario (via `aria-label`, matching the current tile approach).
- Hover/focus: row shifts right (`translateX(5px)`) with a soft shadow. Focus-visible shows a `3px solid #005ea2` outline, `3px` offset (USWDS-aligned, matches the current focus style).
- `@media (prefers-reduced-motion: reduce)`: drop the translate; keep only the shadow (or a 1–2px shift).
- The list container keeps `aria-label="Choose a path"`.
- Text sits on white throughout, fixing the prior white-on-gradient contrast concern.

### Responsive (<768px)

- Rows continue to stack (already single-column).
- `align-items: flex-start`, reduced gap and padding, smaller badge, chevron hidden.
- Reuse the component's existing `isMobile` state (`window.innerWidth <= 768` with the resize listener already present).

## File changes

**Edited (only one file):** `src/components/HomePathPicker.jsx`

1. Replace the `TILES` constant with the `PATHS` constant described above (including inline SVG icons).
2. In the `<style>` block: remove the `.path-tile*` rules; add `.path-row`, `.path-row:hover`, `.path-row:focus-visible`, badge, label, chevron, and the `prefers-reduced-motion` rule.
3. Keep `useNavigate`, the `isMobile` state + resize effect, and the `goTo` helper as-is.
4. Keep the intro band section unchanged.
5. Replace the 2×2 grid `<section>` with the stacked-rows `<section aria-label="Choose a path">` rendering `PATHS.map(...)`.

No other files change. Routes, header, footer, and assessment flows are untouched.

## Verification

- `npm run dev`; load `/`. Confirm four rows render in order with correct colors, labels, scenarios, and icons.
- Click each row → routes to the correct `/get-started/*` path.
- Keyboard: Tab to each row, Enter and Space both navigate; focus ring visible.
- Resize to <768px: rows stack cleanly, chevron hidden, no overflow.
- No new console errors.

## Out of scope (future)

- Porting the rest of the site to USWDS components.
- Real "For My Child" assessment flow (still a placeholder route).
- Final imagery/illustration in place of line icons.

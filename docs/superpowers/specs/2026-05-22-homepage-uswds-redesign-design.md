# Homepage USWDS Redesign — Design Spec

**Date:** 2026-05-22
**Status:** Approved (pending written-spec review)
**Scope:** Homepage only. First page in a phased port of the site to USWDS.

## Background

The current homepage (`/`) opens with a marketing hero ("Start Your Path2Prevention") containing a heading, descriptive paragraph, "Get Started" button, and a "Why CDC: Path2Prevention?" card with imagery. Below the hero sits a "Here's How It Works" section with three feature cards.

The site already uses USWDS color tokens (e.g., `#005ea2`) and the Public Sans font, but it does not consume the official `@uswds/uswds` package, classes, or components. All styling is inline.

A separate `/get-started` page (`RiskAssessment.jsx`) duplicates this entry-point function: it shows an intro, then three "path picker" cards ("For Myself", "For Someone I Care About", "Just Curious") that route into condition-specific assessments under `/get-started/for-*`.

## Goals

1. Replace the homepage hero **in its entirety** — the "Start Your Path2Prevention" heading, description, "Get Started" button, full-flush food image, and adjacent "Why CDC: Path2Prevention?" card all go — with a **bold 2x2 tile picker** that asks visitors to choose a path on landing.
2. Adopt **USWDS classes** on this page as the first step of a site-wide port. Use the official compiled CSS via CDN — no Sass build, no npm install.
3. Consolidate the path-picking function in one place. The homepage *is* the picker; the standalone `/get-started` page is removed.
4. Add a fourth path: **"For My Child (I am a guardian or parent)"**, routing to a new placeholder page.

## Non-Goals

- Porting other pages (Learn, Action, About, ForPractitioners, assessment sub-pages, etc.) to USWDS. Those are scheduled for future rounds.
- Building the actual "For My Child" assessment flow. The new route is a placeholder stub.
- Replacing tile imagery with finalized photography. Final imagery is TBD; this round uses colored gradient blocks as placeholders.
- Changing the CDC header logo/nav structure, the footer, or the chatbot.

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| USWDS depth | Compiled CSS via CDN `<link>` in `index.html`, pinned version. Use USWDS class names; no Sass. | No build pipeline changes. Lowest blast radius. Acceptable token-level fidelity. |
| Homepage composition | Intro band + 2x2 tile grid + "Here's How It Works" below | Combines bold path-picker landing with retained explainer content. |
| Tile size | Big — 2x2 fills the viewport (~50vh per tile, ~100vh total) | Matches "tiles take up the whole page". Picker-first feel. |
| Tile imagery | Colored gradient blocks (no photos, no icons) | Final imagery TBD. Most minimal placeholder; easy to swap to photo later. |
| "For My Child" target | New placeholder page at `/get-started/for-child` | Real assessment flow comes later. |
| `/get-started` page fate | Remove entirely (delete `RiskAssessment.jsx`, drop the route). Remove the "Get Started" button from the header. | Homepage absorbs the picker function. One front door. |

## Architecture

### Page structure (route `/`)

Three vertically stacked sections inside the existing `CDCHeader` + `CDCFooter`:

1. **Intro band** — light background, constrained to USWDS `.grid-container` (max ~1140px).
   - `<h1>` "What brought you here today?"
   - Body paragraph (verbatim from the old `/get-started` page):
     > "Perhaps you're wondering what lifestyle changes might look like as someone with a newly diagnosed chronic condition. Or maybe you're a friend, family member or caregiver of someone with one or more chronic conditions. Let us know so we can tailor next questions and recommendations."

2. **2x2 tile grid** — full-bleed, fills viewport. On desktop ≥768px: two columns × two rows, each tile ~50vh tall. On mobile <768px: stack to one column, each tile auto-height (no forced ~50vh per tile to avoid 4x viewport scroll).
   - Tile interaction: the whole tile is the click target. `role="button"`, `tabIndex={0}`, Enter/Space activates. Hover/focus: slight overlay darken + 6px lift via `translateY`. Focus ring uses USWDS focus outline (3px solid `#005ea2`, 3px offset). Respects `prefers-reduced-motion`.
   - Tiles:

| # | Title | Gradient | Description (verbatim) | Route |
|---|---|---|---|---|
| 1 | **For Myself** | Primary blue (`#005ea2` → `#1a4480`) | "I'm concerned about my own health and want to understand my risk factors for chronic diseases like diabetes, heart disease, or stroke." | `/get-started/for-myself` |
| 2 | **For Someone I Care About** | Secondary red (`#d83933` → `#a23737`) | "I'm a caregiver, family member, or friend who is concerned about someone else's health and want to help them understand their risks." | `/get-started/for-someone` |
| 3 | **Just Curious** | Accent cool (`#00bde3` → `#0081a1`) | "I'm generally interested in learning about chronic disease prevention. I feel pretty healthy but want to see what this is all about." | `/get-started/just-curious` |
| 4 | **For My Child (I am a guardian or parent)** | Accent warm gold (`#c05600` → `#8c4700`) | *(new copy, not verbatim from existing)* "I'm a parent or guardian and want to understand how to support healthy habits for my child and reduce their long-term risk of chronic conditions." | `/get-started/for-child` |

> **Copy note:** Tiles 1–3 use the existing descriptions from `RiskAssessment.jsx` verbatim. Tile 4's description is newly authored — user should adjust during spec review if it doesn't fit the voice.

3. **"Here's How It Works"** — port the existing 3-column section ("What is The Path?", "Get the Facts", "Start Your Journey") to USWDS markup: `.grid-container` wrapping `.grid-row` with three `.grid-col-12 tablet:grid-col-4` columns. Content and SVG icons unchanged.

### File map

**New files**

- `src/components/HomePathPicker.jsx` — implements all three sections above. Receives no props for now (uses `react-router-dom`'s `useNavigate` directly). Sized in JSX with USWDS classes plus a small `<style>` block for the gradient tiles, hover animation, and 2x2 responsive grid.
- `src/components/ChildPathPlaceholder.jsx` — stub page. Title "For My Child", short copy ("We're building this part of the site — check back soon."), and a `<Link to="/">` back to home. Uses USWDS classes (`.grid-container`, `.usa-prose`).

**Edited files**

- `index.html` — add one `<link rel="stylesheet" href="https://unpkg.com/@uswds/uswds@3.8.1/dist/css/uswds.min.css">` in `<head>`, pinned to v3.8.1 (latest stable as of this spec).
- `src/App.jsx`:
  - Add `import HomePathPicker from './components/HomePathPicker'` and `import ChildPathPlaceholder from './components/ChildPathPlaceholder'`.
  - Remove `import RiskAssessment from './components/RiskAssessment'`.
  - Replace the entire inline JSX for the `/` route with `<main style={{ minHeight: '80vh' }}><HomePathPicker /></main>`.
  - Remove the `<Route path="/get-started" element={<RiskAssessment …/>} />` line.
  - Add `<Route path="/get-started/for-child" element={<ChildPathPlaceholder />} />`.
  - Change `onBack={() => onNavigate('risk-assessment')}` to `onBack={() => navigate('/')}` on each of the three existing assessment routes.
  - Remove `'risk-assessment'` from the two whitelist arrays in `handleChatbotNavigate` and `navigateTo`.
  - Remove the `'risk-assessment': '/get-started'` entry from `PAGE_TO_PATH`.
- `src/components/CDCHeader.jsx` — remove the "Get Started" button. (The header's other nav links remain.)

**Deleted files**

- `src/components/RiskAssessment.jsx`.

### Routing impact summary

| URL | Before | After |
|---|---|---|
| `/` | Hero + How It Works | Intro + 2x2 tiles + How It Works |
| `/get-started` | Renders `RiskAssessment` | **404 (route removed)** |
| `/get-started/for-myself` | Renders `AssessmentChronicConditions` (back → `/get-started`) | Unchanged page; back → `/` |
| `/get-started/for-someone` | Renders `AssessmentCaregiver` (back → `/get-started`) | Unchanged page; back → `/` |
| `/get-started/just-curious` | Renders `AssessmentJustCurious` (back → `/get-started`) | Unchanged page; back → `/` |
| `/get-started/for-child` | (did not exist) | Renders `ChildPathPlaceholder` |

## Accessibility

- Tiles use `role="button"`, `tabIndex={0}`, and Enter/Space key handlers in addition to the click handler.
- Focus ring: 3px solid `#005ea2`, 3px offset (matches existing site pattern, which is USWDS-aligned).
- Tile text colors meet WCAG AA contrast against gradient mid-tones (white text on the darker half of each gradient; check ratios when implementing).
- `prefers-reduced-motion: reduce` disables the hover-lift animation; replace with a 2px static translateY only.
- Each tile has a descriptive accessible name combining its title and description (use `aria-label` or rely on inner text — implementation decides).

## Open considerations (implementer's discretion)

- Whether to add a redirect from `/get-started` → `/` (current spec: hard remove, return 404). If user-feedback prefers a soft redirect later, this is a 2-line addition.
- The USWDS CDN URL exposes the site to a third-party CDN. Acceptable for now (the chosen approach was explicit). If CDN risk becomes a concern, swap to a self-hosted copy of the CSS in `public/`.

## Out of scope (future rounds)

- Other pages port to USWDS.
- Real "For My Child" assessment.
- Final tile imagery.
- USWDS-flavored chatbot trigger.

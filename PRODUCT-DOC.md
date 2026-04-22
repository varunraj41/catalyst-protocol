# Catalyst Protocol — Versioned Product Document

**Product:** Catalyst Protocol · Behavioral Simulation for "Drive for Results"
**Version:** v1.8 · 2026-04-22
**Status:** POC · stable
**Maintainer:** Hyreo Labs

---

## Contents

1. [Product Requirements Document (PRD)](#1-product-requirements-document-prd)
2. [Versioned Change Log](#2-versioned-change-log)
3. [System Design Reference](#3-system-design-reference)

---

# 1. Product Requirements Document (PRD)

## 1.1 Problem Statement

Traditional behavioral assessments (SJTs, self-report inventories, structured interviews) suffer from three well-documented issues when measuring workplace competencies like **Drive for Results**:

- **Social-desirability bias** — candidates pick answers they believe evaluators want to hear, not answers reflecting their actual behavior.
- **Aspirational self-concept drift** — candidates describe how they *want* to behave, not how they *do* behave under pressure.
- **Low candidate engagement** — form-style assessments feel like homework; drop-off and signal quality degrade.

The Catalyst Protocol addresses these by embedding the assessment inside an immersive, game-like simulation that mixes tactical (real-time) and reflective (self-concept) measurement, with anti-faking validation baked into the scoring engine.

## 1.2 Product Vision

> A gamified, game-feel behavioral simulation platform that detects the gap between **what a candidate believes about themselves** and **what they actually do under simulated pressure**, then surfaces that signal cleanly to evaluators.

**Core conviction:** this is not a quiz. It's a mission-journey experience for candidates and a precision analytics surface for managers, sharing the same scoring engine.

## 1.3 Target Users

| User | Role | Primary Need | Experience |
|------|------|--------------|------------|
| **Candidate** | Junior Software Engineer (Band 01) | Feel invited and engaged; show up as themselves | Game-like, encouraging, positive-only feedback |
| **Manager / Evaluator** | Hiring manager or L&D lead | Quickly scan scores, flags, and development areas across many candidates | Clean analytics dashboard in Inter typography |

## 1.4 Competency Framework

The protocol measures **Drive for Results** broken into three weighted dimensions:

| Dimension | Weight | What it captures |
|-----------|--------|------------------|
| Ownership / Accountability | **0.40** | Does the candidate close the loop themselves? |
| Action Orientation | **0.35** | Do they convert ambiguity into forward motion? |
| Perseverance | **0.25** | Do they stay with hard problems past the first ceiling? |

Each candidate response is mapped to a **BARS** (Behaviorally Anchored Rating Scale) level:

| BARS | Label |
|------|-------|
| 1 | Ineffective |
| 2 | Developing |
| 3 | Effective |
| 4 | Advanced |

## 1.5 Functional Requirements

### 1.5.1 Four-Level Game Structure

| Level | Name | Modality | Measures | Scenarios | Timer |
|-------|------|----------|----------|-----------|-------|
| **L1** | Explorer | SJT — pick one of 4 options | Tactical behavior across all 3 dimensions | 6 (2 × 3 dims) | 15 s each |
| **L2** | Observer | Avatar + Success Basket drop | Behavioral instinct · decision clarity | 1 | 30 s |
| **L3** | Strategist | Inline rank 1st / 2nd / 3rd | Trade-off reasoning · accountability | 1 | 25 s |
| **L4** | Mastermind | Why / self-concept · pick one of 3 | Ownership mindset · motivation source | 3 | untimed |

### 1.5.2 Dual UI Implementations

| Theme | Aesthetic | Entry | Audience |
|-------|-----------|-------|----------|
| **Adventure** (default) | Bright pastel · treasure-hunt journey map · Fredoka display font | `adventure.html` | Warm, inviting candidate experience |
| **Mission Control** | Dark cyberpunk · matrix rain · glass panels · Orbitron font · neon glow | `mission.html` | High-focus developer persona |

Both consume the identical shared logic engine. Switching themes does not change the scenarios, scoring, or validation logic.

### 1.5.3 Role-Based Experience

**Candidate** sees:
- Themed intro + named entry
- 4 gamified levels with encouraging micro-copy
- Level-complete celebrations (confetti, badge unlock, encouraging toast)
- **Final reveal:** 4 badges earned + "Your Signature" paragraph + 3 positive bullets
- **Never exposed to:** numeric scores, dimension values, BARS levels, validation flags

**Manager** sees (professional Inter dashboard, regardless of active theme):
- Candidate list table with sortable score / level / date / status
- KPI row: total candidates · avg score · L4 count · flagged count
- Individual report: final score + level badge + dimension bars + validation signals + flags + strengths + development area + behavioral summary
- Export (print) report

## 1.6 UX Principles

| Principle | Why | How it's expressed |
|-----------|-----|--------------------|
| **Instant content load** | Candidates lose momentum reading typed-out text | No typewriter effects; prompts render atomically |
| **No correct/incorrect labels** | Keeps candidates from gaming and preserves authentic signal | System-style feedback only (`Move logged`, `Response locked in`, `Reflection saved`) |
| **Smooth over snappy** | Game-feel requires weighted transitions | 0.5s scene-enter, staggered option cards, spring bounce on pick |
| **One decision at a time** | Cognitive load spikes under time pressure | Clear single prompt in a prominent chip above each level |
| **Timer as urgency, not punishment** | Expiry should not feel like failure | Full-screen "TIME UP · SCENARIO SKIPPED" overlay auto-logs lowest option; candidate proceeds unaware of mechanics |
| **Celebrate every level** | Reinforces forward momentum | Confetti + badge reveal between each level |

## 1.7 Scoring & Validation

### 1.7.1 Final Score

```
FinalScore = (Accountability × 0.40)
           + (ActionOrientation × 0.35)
           + (Perseverance × 0.25)
```

### 1.7.2 Level Mapping

| Final Score | Level | Label |
|-------------|-------|-------|
| 1.00 – 1.74 | **L1** | Ineffective |
| 1.75 – 2.49 | **L2** | Developing |
| 2.50 – 3.24 | **L3** | Effective |
| 3.25 – 4.00 | **L4** | Advanced |

### 1.7.3 Anti-Faking Validation Flags

| Flag | Trigger | Signal |
|------|---------|--------|
| **Aspirational Bias** (Mirror Match) | L4 self-concept avg ≥ 3.5 AND L1 tactical avg ≤ 2.25 | Self-perception exceeds revealed behavior |
| **Consistency Gap** | L3 rank deprioritizes a BARS-4 option while L1 tactical behavior in same dimension was strong (≥3) | Stated vs. revealed preference diverge |
| **Always-Highest Pattern** | All 6 L1 picks are BARS-4 | Possible social-desirability gaming |

Additional instrumentation (not flags; shown as signals):
- **Average response time** across all answered questions
- **Fast-response count** (<3 s) — possible snap decisions
- **Pattern classification** — Snap · Balanced · Deliberate (derived from avg latency)

## 1.8 Out of Scope (POC)

- Authentication / SSO
- Persistent storage (current implementation uses in-memory state + mock seed candidates)
- Multi-competency support (currently Drive for Results only)
- Multi-language / localisation
- Backend grading or server-side scoring
- Interview integration / ATS handoff

---

# 2. Versioned Change Log

Each version below corresponds to a material design or functionality shift. File sizes approximate.

### v1.8 — 2026-04-22 · **Scene-Change Pill + Stronger Question Transitions**
- **Scene-change pill** — when the question / card / scenario index advances inside any level, a large centered banner pops in with a spring bounce ("SCENARIO 2/6", "CARD 3/9", "PUZZLE 2/3", "REFLECTION 2/3"), holds ~400 ms, then fades out. Anchored at `top: 28%`, `z-index: 55`, `pointer-events: none` so it never blocks clicks. New `useScenePill(idx)` hook + `SceneChangePill` component in both theme files (Adventure = gradient card, Mission = neon glass).
- **Stronger scene entry** — the main content now uses `scene-slide-in` (slide-in from right + blur-release) on question/card changes, replacing the subtler `scene-enter`. Each level screen is re-keyed on scenario/question id to force a clean re-mount.
- **Per-level treatment:**
  - L1 Explorer: pill on scenario advance (`idx > 0`)
  - L2 Observer: pill on card advance (`cardIdx > 0`, re-keyed via `cardKey`)
  - L3 Strategist: pill on scenario advance (now accepts `idx` + `total` props)
  - L4 Mastermind: pill on question advance (`idx > 0`)
  - L1 briefing phase (Mission) is exempt — it's the entry point, not a transition
- Prevents the subtle "did the content just change?" confusion that was reported after v1.7.

### v1.7 — 2026-04-22 · **Execution Lab Scenarios · 9-Card Mirror · Shuffle + Anti-Faking**
- **Level 1 rebuilt as The Execution Lab** — six fresh narrative scenarios (titled: The Vanishing Stakeholder, The Resource Crunch, The Empty Brief, The Critical Data Gap, The Impossible Target, The Recurring Obstacle) with 4 options each, BARS 1–4. Scenarios carry a `title` field now; Level Intro ships a full participant briefing + 3 guidelines (rendered as numbered chips in Adventure; as a mono/neon card stack in Mission). **Options are shuffled per user** via `shuffleArray`, so BARS-4 is not always button D.
- **Level 2 expanded to 9 cards with dual avatar** — choose **Alex** (🧑‍💼) or **Avantika** (👩‍💼) before briefing; card texts auto-fill via `{NAME}/{he}/{his}/{him}/{refl}` placeholders and the `fillAvatar()` helper. The deck is shuffled via `shuffleBalanced()` which rejects any arrangement with 3 same-dimension cards in a row (max-run = 2). Candidates mark **each** card as More Like Me / Less Like Me / skip — there's no basket cap anymore; the section simply plays through all 9 decisions.
- **New anti-faking flags:**
  - **Social Desirability Bias** — if the candidate marks BOTH the BARS-2 and BARS-4 cards of the *same* dimension as More Like Me, the positions are contradictory (cautious vs. bold) and flag-worthy.
  - **Low Urgency Signal** — if the candidate spends >12 s on an Action-Orientation L1 scenario (threshold exported as `LOW_URGENCY_THRESHOLD_MS`), the Manager report surfaces a calibration note.
- **Scoring adjustments:** L2 per-card decisions contribute to dimension averages (`most` → push BARS level; `least` at BARS-2 → bonus +0.2; `least` at BARS-4 → penalty -0.3). Mirror Match, Consistency Gap, Always-Highest, Social Desirability, Low Urgency all land in the same `flags[]` list on the result, rendered as amber detail cards on the Manager report.
- **Shared helpers exposed:** `shuffleArray`, `shuffleBalanced`, `fillAvatar` on `window.CatalystCore` so theme files stay declarative.

### v1.6 — 2026-04-22 · **Adventure UI Trims + Go-Home Exit**
- **Level subtitles removed** from Adventure intro cards and Level Intro splashes — the labels `Tactical Response`, `Behavioral Monitoring`, `Decision & Prioritization`, and `Self-Concept & Motivation` are no longer rendered. Titles, tags (EXPLORER / OBSERVER / STRATEGIST / MASTERMIND), and narrative blurbs remain.
- **Status column removed** from the Adventure Manager dashboard — both the list table (`Name · Date · Score · Level`, 5 columns) and the individual Candidate Report header (no more "Status: X" line). The mobile fallback summary now reads `{date} · L{level}`. Search predicate no longer matches on status; placeholder updated to "Search candidate name".
- **Candidate report buttons consolidated** — removed `Play Again` (ghost) and `Evaluator View` (primary) from the end-of-game screen. Replaced with a single **`🗺 Go Home →`** button that navigates back to `index.html`. Closing line updated to "Thanks for playing. Your responses have been saved." — no more evaluator-handoff wording.
- Mission Control theme left untouched for this revision (subtitles and status column preserved there by design — Mission presents itself as an internal-dev console where those signals matter).

### v1.5 — 2026-04-22 · **BARS Narrative + localStorage Persistence**
- **Three-line BARS narrative** on the candidate final report — replaces the single-line "Your Signature" blurb with a 3-step growth-oriented paragraph tailored to the candidate's banded level (L1 Ineffective → L2 Developing → L3 Effective → L4 Advanced). Each line gets a numbered gradient badge and staggered pop-in. Always-positive tone, no references to score or band name.
- **localStorage persistence** for completed candidate runs — key `catalyst:candidates` stores a JSON array of `{ id, name, date, score, level, status, dims, meta }` records. On manager view load, stored records merge ahead of the built-in mock seeds (dedupe by id). New `saveCandidate()`, `loadSavedCandidates()`, `clearSavedCandidates()`, and `mergeCandidates()` helpers exposed on `window.CatalystCore`.
- Candidate records persist across page reloads and survive theme switches (same-origin localStorage is shared between `adventure.html` and `mission.html` when served via HTTP; `file://` origin is browser-dependent — Chrome isolates per file, Firefox shares).
- A repeat run by the same name now **overwrites** the previous entry (keyed by `self-<name>-` prefix) so demo replays don't pile up.

### v1.4 — 2026-04-22 · **Character Mirror · L3 Triples · L4 Timer**
- **L2 rebuilt as The Character Mirror (Identity Projection)** — the Success-Basket module is replaced by an avatar-driven identity-mapping exercise. Briefing phase introduces **Alex** (high-performing lead) with animated avatar and instruction chip. Playing phase shows **6 behavior cards one at a time** (2 per dimension · BARS 2 and BARS 4 each), **15 s timer per card**. Candidate drops each card into **"More Like Me"** or **"Less Like Me"** basket, skips it, or lets the timer auto-skip. Section ends as soon as both baskets are full — or after all 6 cards. Done phase shows a brief "Mirror Complete" confirmation.
- **Scoring adjustment:** L2 `mostLikely.level` contributes to that dimension's average; `leastLikely` applies a dimension-level bonus (+0.3 if BARS-2) or penalty (-0.5 if BARS-4), capturing the "distancing" signal.
- **L3 Strategist expanded to 3 scenarios** — accountability (existing), action orientation (ship-now vs defer), perseverance (flaky test). Each still ranked 1st / 2nd / 3rd with the v1.3 inline UI.
- **L4 Mastermind now timed** — 20 s per question (3 questions total); skip overlay fires on timeout, lowest option auto-logs.
- Mission theme keeps matching visual language: dark glass panels, Orbitron headings, mono system-text basket labels (`MORE_LIKE_ME` / `LESS_LIKE_ME`), neon-glow outlines on the two buttons, `pulse-ring` on Alex's avatar.

### v1.3 — 2026-04-22 · **Strategist UX Polish + Product Doc**
- **L3 Strategist redesign** — replaced the "slots + options" split UI (Adventure) and the drag-and-drop reorder (Mission) with a single inline list where each option card becomes a direct rank target. Tapping assigns the next rank (1st → 2nd → 3rd); tapping a ranked card offers a **Change** affordance that un-ranks it and anything after.
- **Progress nodes** above the option list show rank medals (🥇🥈🥉) as they fill, with a glowing "next" indicator.
- Mission theme keeps the neon medallion vocabulary but loses the drag interaction for clarity.
- Added `PRODUCT-DOC.md` (this file).

### v1.2 — 2026-04-22 · **L1 Simplified · L4 Expanded · Skip Animation**
- Reverted L1 to **simple pick-one** with 4 options per scenario (dropped the MOST + LEAST dual-selection introduced in v1.1 — usability feedback prioritized clarity over anti-faking depth at L1).
- L4 **expanded to 3 questions** (accountability, action, perseverance) each with 3 options — gives the Mirror Match comparison more statistical weight.
- New **Skip Overlay** — full-screen animated reveal when timer hits 0. Adventure uses warm amber gradient with bouncing ⏱️; Mission uses radial red-to-black with a scanning beam, glowing `TIME_UP` in Orbitron, mono `// SCENARIO · SKIPPED` sub-heading.
- L2 Observer got **animated entrance** — avatar pops in with spring bounce + continuous gentle float, talking-dots beside name, situation text releases from blur, speech bubble slides in from left, basket drops in from above.

### v1.1 — 2026-04-21 · **Four-Level Architecture**
- Added **Level 2 Behavioral Monitoring (Observer)** — avatar character presents situation + their own (weak) verbal response, candidate drags the best response from 6 options into a **Success Basket** drop zone (with keyboard fallback on mobile).
- Introduced **MOST + LEAST** dual-selection for L1 (later rolled back in v1.2).
- Added **Aspirational Bias / Mirror Match** flag (L4 vs L1 gap).
- Added **Always-Highest Pattern** detection.
- Level colors: L1 emerald, L2 blue/indigo, L3 amber/orange, L4 purple/pink.

### v1.0 — 2026-04-21 · **Dual-UI Split**
- Split the monolithic file into `adventure.html`, `mission.html`, and a shared `catalyst-shared.js` engine.
- Added `index.html` hub as entry point with theme selection and manager deep-link.
- Legacy `catalyst-protocol.html` repurposed as a redirect stub.
- Manager Portal rendered in both files via a shared `.manager-scope` wrapper that forces Inter typography and light background regardless of theme.

### v0.6 — Configurable theme system (single file)
- CSS-variable-driven theme switching (`?theme=adventure` / `?theme=mission-control`).
- Live theme toggle in header.
- Body class application via `useEffect`; manager forced to light scope.

### v0.5 — UX refinements
- Removed typewriter from all prompts.
- Replaced L2 drag-and-drop with click-to-rank slot-fill.
- Scoped Manager dashboard to Inter with tighter letter-spacing.

### v0.4 — Adventure / Treasure Hunt theme
- Bright pastel palette · Fredoka display font.
- Journey-map SVG with 3 level nodes (later 4 in v1.1).
- Level badges (Explorer / Strategist / Mastermind).
- Positive-only candidate final view.
- Introduced Manager Dashboard (candidate list + individual report).

### v0.3 — Mission Control cyberpunk variant
- Matrix rain canvas · animated grid · scanlines.
- Glass-morphism panels · Orbitron display · JetBrains Mono system text.
- Glitch title · phase stepper · circular countdown timer with critical-flash.

### v0.2 — Animation-rich dark UI upgrade
- Tilt cards · ripple on click · staggered entrance.
- Radar chart · conic halo badges · confetti on results.

### v0.1 — Initial Catalyst Protocol
- Single-file React POC.
- 3 phases (SJT, Rank, Why), Band 01 BARS scenarios.
- Weighted scoring (0.40 / 0.35 / 0.25) and Level banding (L1–L4).

---

# 3. System Design Reference

## 3.1 File Architecture

```
d:\BAT\
├── catalyst-shared.js    · Shared logic engine (plain JS, no JSX)
├── index.html            · Entry hub — theme choice + manager deep-link
├── adventure.html        · Theme 1 UI — Treasure Hunt (Fredoka + light)
├── mission.html          · Theme 2 UI — Mission Control (Orbitron + dark)
├── catalyst-protocol.html· Legacy redirect → index.html
└── PRODUCT-DOC.md        · This document
```

### 3.1.1 Load order (per theme file)

```
React 18 (CDN)
  → ReactDOM 18 (CDN)
    → Babel Standalone (CDN)
      → Tailwind CDN
        → Google Fonts
          → catalyst-shared.js  (exposes window.CatalystCore)
            → <script type="text/babel"> UI components + root
```

Runs from `file://` — no HTTP server required. The shared engine is plain ES5/ES6 JS (no JSX), loaded via regular `<script src>`, so CORS never bites.

## 3.2 Shared Engine · `window.CatalystCore`

```js
window.CatalystCore = {
  // Scenario data
  L1, L2, L3, L4,

  // Constants (timers, transition durations)
  CONSTANTS,

  // Display metadata
  DIMENSION_LABEL,
  LEVEL_META,          // Explorer / Observer / Strategist / Mastermind
  FINAL_LEVEL_META,    // Ineffective / Developing / Effective / Advanced
  LEVEL_SUMMARY,       // Behavioral summary per final level
  DEV_TIP,             // Per-dimension development tip
  STRENGTH_NOTE,       // Per-dimension strength narrative
  POS_SUMMARY,         // Per-dimension positive candidate-facing summary
  POSITIVE_BULLETS,    // Generic encouraging statements

  // Mock data for manager dashboard seed
  mockCandidates,

  // Scoring engine
  computeResults,

  // Shared React hooks
  useCountUp
};
```

## 3.3 Data Model

### 3.3.1 Level data shapes

```js
// L1 scenario
{
  id: "L1a1",
  dimension: "accountability" | "actionOrientation" | "perseverance",
  prompt: "scenario text",
  options: [
    { id: "a" | "b" | ..., text: "...", level: 1 | 2 | 3 | 4 }
  ]   // exactly 4 options per L1 scenario, BARS 1–4 spread
}

// L2 scenario (Observer · Basket)
{
  id: "L2b1",
  dimension: "accountability",
  avatar: { name, role, emoji },
  situation: "...",
  avatarLine: "verbal response shown in speech bubble",
  prompt: "Drop the BEST next action into the Success Basket.",
  options: [ { id, text, level } × 6 ]    // one BARS-4 "best" answer
}

// L3 scenario (Strategist · Rank)
{
  id: "L3r1",
  dimension: "accountability",
  situation: "...",
  options: [ { id, text, level } × 3 ]
}

// L4 question (Mastermind · Why)
{
  id: "L4w1",
  dimension: "accountability",
  question: "...",
  options: [ { id, text, level } × 3 ]
}
```

### 3.3.2 Answer shapes (captured during gameplay)

```js
// L1 answer
{ id, dimension, level, choiceId, auto, responseMs }

// L2 answer (basket drop)
{ id, dimension, level, choiceId, auto, responseMs }

// L3 answer (rank-order)
{ id, dimension, rankings: [opt, opt, opt], auto, responseMs }

// L4 answer
{ id, dimension, level, choiceId, responseMs }
```

### 3.3.3 Result shape (from `computeResults`)

```js
{
  dimScores: { accountability, actionOrientation, perseverance },
  finalScore: number,     // 0–4
  level: 1 | 2 | 3 | 4,
  flags: [ { key, label, severity, detail } ],
  strongest: "accountability" | "actionOrientation" | "perseverance",
  weakest:   "accountability" | "actionOrientation" | "perseverance",
  meta: {
    avgResponseMs,
    fastCount,
    consistencyFlag,     // legacy bool; prefer `flags` list
    flags                // copy of top-level flags, for mock data compatibility
  }
}
```

## 3.4 State Machine (per theme file)

```
intro
  └→ journey / level1-intro
        └→ level1  (×6 iterations — l1Idx 0→5)
              └→ level1-complete
                    └→ level2-intro
                          └→ level2  (1 scenario)
                                └→ level2-complete
                                      └→ level3-intro
                                            └→ level3  (1 scenario)
                                                  └→ level3-complete
                                                        └→ level4-intro
                                                              └→ level4  (×3 iterations)
                                                                    └→ level4-complete
                                                                          └→ candidate-results

[role toggle] → manager-list ⇄ manager-report
```

Both `adventure.html` and `mission.html` implement this state machine identically. Mission additionally goes through `loading` transitions between levels with rotating status messages.

## 3.5 Theming System

Themes are **physically separated** (two HTML files) rather than runtime-switched via CSS variables. This was a deliberate choice in v1.0 — each theme's visual depth (matrix rain vs. pastel orbs, Orbitron vs. Fredoka, glass panels vs. soft shadows) became hard to maintain cleanly in a single stylesheet. Physical split allows each file to go deep into its aesthetic without compromise.

**Shared primitives** (to keep parity):
- Color semantics (`--success: #10b981`, `--danger: red`, etc.) exist in both themes with adjusted hues.
- Component classes (`.opt`, `.card`, `.btn-primary`, `.chip`) exist in both but are skinned to theme.
- The `.manager-scope` class in both files collapses to the same Inter light dashboard styling.

**Extension point for a 3rd theme:** duplicate `adventure.html` → `newtheme.html`, replace CSS + component JSX, reuse `<script src="catalyst-shared.js">` without modification. Add a card to `index.html`.

## 3.6 Scoring Engine — flow

```
L1 answers (6)
L2 answers (1)  ─┐
L3 answers (1)   ├→ aggregate per dimension
L4 answers (3)  ─┘
                    │
                    ├→ avg per dimension (clamped [1,4])
                    │
                    ├→ weighted sum (0.40 / 0.35 / 0.25) → finalScore
                    │
                    └→ band → Level 1 / 2 / 3 / 4

Latency tracking ──→ avg, fast count, pattern

Validation rules ──→ flags[]:
   • Mirror Match (L4 high · L1 low)
   • Consistency Gap (L3 deprioritized L4 · L1 strong in same dim)
   • Always-Highest (all L1 picks = BARS 4)
```

## 3.7 Anti-Faking Logic — details

```js
// Mirror Match / Aspirational Bias
const l4Avg = mean(l4.map(a => a.level));
const l1Avg = mean(l1.map(a => a.level));
if (l4Avg >= 3.5 && l1Avg <= 2.25) flag("aspirationalBias");

// Consistency Gap (per L3 scenario)
for (const p2a of l3) {
  const last = p2a.rankings[p2a.rankings.length - 1];
  if (last.level === 4) {
    const p1Match = l1.find(x => x.dimension === p2a.dimension);
    if (p1Match && p1Match.level >= 3) flag("consistencyGap");
  }
}

// Always-Highest
if (l1.length >= 4 && l1.every(a => a.level === 4)) flag("alwaysHighest");
```

Flags surface **only** in the Manager report — never in the candidate view.

## 3.8 Candidate vs. Manager Output Surface

| Surface | Candidate sees | Manager sees |
|---------|----------------|--------------|
| Numeric score | ❌ | ✅ (5xl Inter black) |
| Proficiency level (L1-L4) | ❌ | ✅ (badge + name) |
| Dimension bars | ❌ | ✅ (animated, weighted) |
| Validation flags | ❌ | ✅ (per-flag detail cards) |
| Response time / pattern | ❌ | ✅ |
| Level badges earned | ✅ (4 of 4) | ✅ (implicit in level) |
| Positive signature paragraph | ✅ | ✅ (as "behavioral summary") |
| Dev tip / growth edge | ❌ | ✅ |

## 3.9 Tech Stack

| Concern | Choice | Reason |
|---------|--------|--------|
| UI library | React 18 (CDN) | No build step; widely understood |
| Compilation | Babel Standalone | Keeps files runnable from `file://` |
| Styling | Tailwind CDN + CSS custom properties | Fast iteration; theme-scoped vars |
| Fonts | Google Fonts (Fredoka, Orbitron, Inter, JetBrains Mono) | Free, reliable, theme-appropriate |
| State | React hooks (`useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`) | No state library needed at POC scale |
| Persistence | In-memory only | POC — no backend |
| Drag-and-drop (L2 basket) | HTML5 DnD API | Native browser support; no library dependency |

## 3.10 Known Limitations & Future Work

**Known limitations (POC):**
- All state is in-memory; reload = lose progress.
- Single-session — no saved profile or return-visit.
- Manager dashboard is client-side only; anyone can toggle role via the header button.
- Mock candidate seeds are hard-coded in `catalyst-shared.js`.

**Natural next steps:**
1. **Backend** — persist candidate runs; add SSO for evaluators; expose a REST API.
2. **Question bank** — move scenarios to a CMS with BARS tagging; support randomized selection per dimension.
3. **More competencies** — extend the dimension+weight pattern to Collaboration, Learning Agility, etc. (same engine shape).
4. **Live co-watch mode** — manager observes candidate play in real time for interview debrief.
5. **Norm-referenced scoring** — compare candidate to cohort percentile rather than absolute BARS.
6. **Response-time Bayesian model** — use latency distributions rather than hard <3 s threshold for "fast" classification.
7. **A/B testing different L2 scenarios** to learn which provoke the cleanest behavioral signal.
8. **Accessibility audit** — keyboard-only traversal of the L2 basket is covered via fallback buttons but needs ARIA role verification; the glitch title and scanlines may need a reduced-motion alternative.

---

## Appendix A · Extension Points (for future contributors)

| I want to... | Touch this |
|--------------|------------|
| Add / edit scenarios | `catalyst-shared.js` → `L1 / L2 / L3 / L4` arrays |
| Change scoring weights | `catalyst-shared.js` → `computeResults()` (lines marked with `0.40 / 0.35 / 0.25`) |
| Add a new validation flag | `catalyst-shared.js` → `computeResults()` → `flags.push(...)` |
| Change dimension banding thresholds | `catalyst-shared.js` → level assignment inside `computeResults()` |
| Add a 3rd theme | New `<theme>.html` file + entry card in `index.html` |
| Add / edit mock manager candidates | `catalyst-shared.js` → `mockCandidates` array |
| Change positive-summary copy | `catalyst-shared.js` → `POS_SUMMARY`, `POSITIVE_BULLETS` |
| Change level narratives | `catalyst-shared.js` → `LEVEL_META`, `LEVEL_SUMMARY` |

--- --

*End of document.*

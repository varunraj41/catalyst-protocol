# Signature Sprint — Versioned Product Document

**Product:** Signature Sprint · Behavioral Simulation for "Drive for Results"
**Version:** v2.7 · 2026-04-24
**Status:** POC · stable
**Maintainer:** Hyreo Labs

> **Brand note (v2.7):** Product previously named *Catalyst Protocol / Catalyst Quest*. Internal code identifiers (`window.CatalystCore`, `CatalystAdventure`, `CatalystMission`, storage key `catalyst:candidates`) retain the original names for compatibility; user-facing text is now **Signature Sprint** everywhere.

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

The Signature Sprint addresses these by embedding the assessment inside an immersive, game-like simulation that mixes tactical (real-time) and reflective (self-concept) measurement, with anti-faking validation baked into the scoring engine.

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
| **L1** | The Execution Lab | SJT — pick one of 4 options | Tactical behavior across all 3 dimensions | 6 (2 × 3 dims) | 20 s each |
| **L2** | The Character Mirror | Avatar + per-card More / Less Like Me | Identity projection · self-recognition | 9 (3 per dim) | 15 s per card |
| **L3** | The Priority Lens | Inline rank 1st / 2nd / 3rd | Trade-off reasoning · accountability | 3 | 25 s each |
| **L4** | The Core Narrative | Why / self-concept · pick one of 3 | Ownership mindset · motivation source | 3 | 20 s each |

**Per-level pre-start screen (v2.7)** — before entering each level the candidate sees a shared "level-intro" card in both themes containing the headline (`Level 0N: <Name>`), sub-headline, `The Script:` paragraph, `Your Task:` call-out, 3 guidelines (No "Correct" Answers · Authenticity Over Strategy · Trust Your Gut), a closing tagline, and a level-colored CTA button (`START THE SPRINT` / `OPEN THE MIRROR` / `START RANKING` / `FINISH THE SPRINT`).

### 1.5.2 Dual UI Implementations

| Theme | Aesthetic | Entry | Audience |
|-------|-----------|-------|----------|
| **Adventure** (default) | Bright pastel · treasure-hunt journey map · Fredoka display font | `adventure.html` | Warm, inviting candidate experience |
| **Mission Control** | Dark cyberpunk · matrix rain · glass panels · Orbitron font · neon glow | `mission.html` | High-focus developer persona |

Both consume the identical shared logic engine. Switching themes does not change the scenarios, scoring, or validation logic.

### 1.5.3 Role-Based Experience

**Candidate** sees:
- Themed intro + named entry (with new Ground Rules block in the Intro)
- 4 gamified levels, each preceded by a rich "level-intro" briefing card
- Level-complete celebrations (confetti, level title, encouraging toast) — no "BADGE EARNED" labels as of v2.7
- **Final reveal:** 4-icon visual summary (badge grid, unlabeled) + "Your Signature" paragraph + 3 positive bullets + **Export Report** button (print/save-as-PDF) + Go Home
- **Never exposed to:** numeric scores, dimension values, BARS levels, validation flags

**Manager** sees (professional Inter dashboard, regardless of active theme; **both themes now render an identical manager dashboard as of v2.7** — Mission no longer shows the Status column in the list or the Status line in the header):
- Candidate list table with sortable score / level / date
- KPI row: total candidates · avg score · L4 count · flagged count
- Individual report: final score + level badge + dimension bars + validation signals + flags + **Skipped Questions by Level** (per-level card grid, v2.7) + strengths + development area + behavioral summary
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

### v2.7 — 2026-04-24 · **Signature Sprint Rebrand · Level Renames · Unified Pre-Start Screens · Skipped-Question Tracking · Manager Sync**
- **Brand rename (user-facing only)** — `Catalyst Protocol` / `Catalyst Quest` → **Signature Sprint** across every visible surface. Page titles, hero headlines, buttons (`INITIALIZE_PROTOCOL` → `INITIALIZE_SPRINT`), mission header glitch title (`CATALYST / PROTOCOL` → `SIGNATURE / SPRINT`), header brand mark (Mission `CATALYST://PROTOCOL` → `SIGNATURE://SPRINT`), footers, and all doc copy. Internal JS identifiers (`window.CatalystCore`, `CatalystAdventure`, `CatalystMission`) and the localStorage key (`catalyst:candidates`) are deliberately retained so previous candidate data keeps loading.
- **Level renames:**
  - L3 **The Strategist** → **The Priority Lens** (`sub: "Complexity meets Choice."`)
  - L4 **The Mastermind** → **The Reflection** → (within the same release) **The Core Narrative** (`sub: "The \"Why\" Behind the Signature."`)
  - L1 / L2 names unchanged (`The Execution Lab` / `The Character Mirror`).
- **New `LEVEL_META` fields driving pre-start screens** — `headline`, `subheadline`, `script`, `taskLabel`, `closing`, `buttonLabel` on every level in `catalyst-shared.js`. Copy for L3 and L4 comes verbatim from the stakeholder spec (Complex situations often present us… / You've navigated the scenarios…). L1 and L2 were written to match the same structure.
- **Unified rich pre-start screen in both themes** — replaces the old minimal "chip + narrative + guidelines" `LevelIntro` and the bespoke Mission L1 welcome phase:
  - Adventure `LevelIntro` now renders: `SECTION 0N · {tag}` chip → headline → subheadline → `The Script:` paragraph → `Your Task:` boxed callout (accent icon bubble + header + body) → numbered 3-point Guidelines list → closing tagline in level-accent color → CTA button that uses `buttonLabel`.
  - Mission `MissionLevelIntro` mirrors the structure in cyber language: Module/entry ribbon, `SECTION 0N · {TAG}` chip, Orbitron uppercase headline, mono `// subheadline` line, `The Script:` body, dark task card with uppercase heading, `GUIDELINES` (mono badges `01 / 02 / 03`), neon closing line, themed CTA + mono subtitle with counts. Placed between `levelN-complete` and `levelN` — Mission previously jumped straight from L1-complete into L2 / L3 / L4.
  - L1 in both themes now also goes through the unified intro. Adventure's old `Level1WelcomeView` is bypassed (route `level1-intro` forwards to `LevelIntro levelNum={1}`); Mission's `Level1Screen` `welcome` phase delegates to `MissionLevelIntro levelNum={1}`.
- **Intro (landing) copy rewritten** — both themes:
  - Adventure `Intro` — "Welcome to the Signature Sprint / Your Professional Signature Awaits" kept; body replaced with the new shorter copy (3-bullet "It's a chance to…" list, then a `The Ground Rules` callout box: No Right or Wrong · Stay Authentic · Trust Your Gut).
  - Mission `IntroView` — glitch title switched to `SIGNATURE / SPRINT`; added a matching "MISSION BRIEF" + "THE GROUND RULES" glass panel before the Identify Operator block so Mission has content parity.
- **L2 Character Mirror briefing (`briefingTpl` in `catalyst-shared.js`) rewritten** to the new spec ("Meet {NAME}. {NAME} is a professional navigating the same types of daily challenges you face… Your Task: As each snapshot appears, simply ask yourself: 'Is this how I naturally operate?'…"). Rendered with `whitespace-pre-line` so the paragraph breaks survive.
- **Index page refresh** — hub title → `Signature <Sprint>` gradient, tile labels switched from `EXPLORER / OBSERVER / STRATEGIST / MASTERMIND` to `L0N` + two-line level name (`Execution/Lab`, `Character/Mirror`, `Priority/Lens`, `Core/Narrative`) with icons refreshed to ⚡ / 🪞 / 🎯 / 📖 on the Adventure card. Mission hub tiles mirror the change in mono caps (`EXEC LAB`, `CHAR MIRROR`, `PRIORITY LENS`, `CORE NARR`).
- **Candidate report cleanup** — removed the `Badges Earned` header and `4 of 4` / `4 / 4` counter chip from both themes. The 4-badge visual grid (icons with green check marks) remains — only the label + counter are gone. Added an **Export Report** button next to Go Home in both themes (`window.print()` — mission-themed uppercase `EXPORT_REPORT` / `GO_HOME`).
- **Manager dashboard synced across themes** — Mission previously had an extra Status column in the list and a "Status: X" line in the report header. Both removed; Mission list now uses Adventure's 5-column grid (`Name · Date · Score · Level`) and the Mission report header shows only `{date}`. Search placeholder reverted to `Search candidate name`.
- **Skipped-question tracking surfaced in Manager Report** — `computeResults()` now returns `meta.skippedByLevel: { 1, 2, 3, 4 }` and `meta.skippedTotal`. L1 / L3 / L4 count answers with `auto: true`; L2 counts decisions with `decision === null` (skipped cards). Both themes' ManagerReport now render a new "Skipped Questions by Level" card with 4 per-level tiles (icon + `L0N` + count) that turn amber when `> 0`, plus a total-count chip in the card header. Mock candidates updated with sample skipped data for the demo.
- **Container widths experiment reverted** — temporary `lg:max-w-5xl` / `lg:max-w-6xl` bumps added mid-session were rolled back; every scene container is back to its previous `max-w-3xl / 4xl / 5xl / 6xl` so big monitors show the earlier proportions.
- **Removed "BADGE EARNED" gamified label** from all Level Complete screens. Adventure shows the level title under the badge (e.g. "The Character Mirror · Next challenge unlocked"); Mission shows the uppercase level title (`THE PRIORITY LENS` / `THE CORE NARRATIVE` / etc.).

### v2.6 — 2026-04-22 · **3D Option Cards · Timepiece Timer · Slower Stagger · Bigger Text (Both Themes)**
- **Longer option stagger** — `.stagger > *:nth-child(N)` delays moved from 100 ms steps to **300 ms steps** (`0.30s · 0.60s · 0.90s · 1.20s · 1.50s · 1.80s`). Each option is clearly revealed one-by-one, not as a single cascade. Animation duration bumped from 0.45 s → 0.55 s for a more deliberate entrance. Same values in both themes.
- **Timer start delay** raised from **950 ms → 1800 ms** across L1 / L3 / L4 effects in both themes, so the countdown only begins once the last option has fully entered.
- **3D elevated option cards** — all `.opt` buttons now use a **layered box-shadow stack** that creates a true "card stacked above the page" feel:
  - Inset top highlight + inset bottom shadow (simulated light source)
  - A **hard 2 px offset shadow** (`0 2px 0 …`) for the stacked-card edge
  - A soft ambient blur shadow beneath
  - A larger atmospheric drop shadow
  - Hover raises the card 4 px, the hard shadow grows to 3 px with a colored tint (indigo in Adventure, electric-blue in Mission), and the drop shadows deepen
  - Active press settles back to 1 px with a tighter shadow — feels like depressing a physical key
  - Active/selected state swaps the hard shadow to the success color (green) for an unmistakable "locked-in" read
  - Adventure uses a subtle `linear-gradient(180deg, #fff → #f8fafc)` face; Mission uses `linear-gradient(180deg, rgba(18,25,48,0.72) → rgba(10,15,28,0.82))` with neon glow
- **Option text bumped** from `14-15 px` → **`15 px / 17 px` (mobile / desktop)** with `font-medium` weight for improved readability. Applies to L1, L3, L4 in both themes.
- **Timer redesigned as a timepiece**:
  - Adventure: larger white/pearl face (`78 px`), `linear-gradient(145deg, #ffffff, #eef2fa)` with multi-layer shadows (outer ambient + inset light + inset shadow) for a genuine 3D watch-crystal look
  - **12 tick marks** around the outer edge (majors at 12/3/6/9 are thicker and slightly longer)
  - 3 px-wide progress arc with a live color gradient (theme-colored → warn amber → crit red) and a soft drop-shadow glow matching the current color
  - Big centered digit + tiny `SEC` micro-caption in mono
  - Mission: near-black timepiece (`82 px`) with a neon glow halo ring, white tick marks (semi-transparent), neon progress arc with a `drop-shadow(0 0 8px)` halo, digit + SEC in the active color

### v2.5 — 2026-04-22 · **Welcome Moved Back to Adventure Intro**
- **`index.html` reverted** to the theme-chooser hub (Adventure + Mission cards side by side, footer, no countdown). The briefing content moved off the hub.
- **Adventure Intro now carries the full Execution Lab welcome** — "Welcome to the Execution Lab · Your Professional Signature Awaits" tagline, two intro paragraphs, `The Objective` box with three outcome bullets, `A Note on Authenticity`, the "Trust your first instinct. Be yourself." sign-off, and the name-entry card with a **Start My Discovery →** button.
- **3·2·1 GO countdown** now fires inside the Adventure Intro after the candidate enters their name and clicks Start. The `CountdownView` (defined earlier) is rendered when `Intro` transitions to its `countdown` phase. Once `GO` completes, `onStart(name)` is called, the parent stores the candidate name, and the flow continues to the journey map or directly to Level 1.
- Removed the second countdown from the Level 1 "Action Phase" briefing — there's now a single countdown per run, positioned at the clearest moment of commitment (right after name entry).
- Mission Control intro/flow unchanged by this revision.

### v2.4 — 2026-04-22 · **Index Welcome · Action Phase Briefing · Sticky Timer · Delayed Start**
- **index.html rewritten** as the initiation surface. Displays the full *"Welcome to the Execution Lab · Your Professional Signature Awaits"* briefing — two intro paragraphs, **The Objective** block with three bulleted outcomes, **A Note on Authenticity**, and the tagline "Trust your first instinct. Be yourself." A compact theme pill (🗺️ Adventure · 🛰️ Mission) sits in the header; default is Adventure. CTA: **▶ Start My Discovery →**. Pure vanilla HTML/JS — no React, no build step.
- **3·2·1 GO countdown** moved to `index.html`. On CTA click, a full-screen overlay fires (`LOADING SIMULATION…` sub-header + big pop-in digits + gradient progress bar). After ~2.9 s it redirects to `adventure.html` or `mission.html` based on the selected theme.
- **Level 1 welcome in both themes rewritten as *The Action Phase*** briefing — replaces the previous "Welcome to the Execution Lab" (now on index) with content focused on the immediate task ahead:
  - *"You are now stepping into a simulated work arena…"* intro
  - **The 20-Second Rule** callout with `Trust Your Gut` + `Be Decisive` sub-bullets and a clock icon
  - **Guidelines** section with 3 numbered items (No "Correct" Answers · Authenticity Over Strategy · Keep Moving)
  - CTA: **Trust your instinct. Start now →** (Adventure) / **TRUST_YOUR_INSTINCT · START_NOW →** (Mission)
  - No second countdown here — the countdown already happened on index.
- **Timer starts *after* options finish appearing** — each L1/L3/L4 timer effect in both themes now waits **950 ms** after scenario mount before starting the countdown. This lets the staggered option entrance finish before the timer pressure begins. Implementation uses a delayed `start = Date.now()` set via `setTimeout` inside the timer effect.
- **Sticky HUD bar** — the `card-soft` (Adventure) and equivalent Mission HUD bar are now `sticky top-2 z-30` so the circular countdown timer stays anchored to the top of the viewport even when the candidate scrolls down through longer option lists. Padding also tightened from `p-4 mb-5` → `p-3 mb-3` to reclaim vertical space.

### v2.3 — 2026-04-22 · **Execution Lab Welcome + 3·2·1 Countdown**
- **New Level 1 welcome screen** with the full participant briefing: "Welcome to the Execution Lab · Your Professional Signature Awaits." + 2 introductory paragraphs (behavioral styles, why we're here), a highlighted **The Objective** block with a 3-point bulleted outcome list, an **A Note on Authenticity** paragraph, and a centered "Trust your first instinct. Be yourself." line. Replaces the previous short narrative + guidelines splash.
  - **Adventure** — new `Level1WelcomeView` component wired into the `level1-intro` route. Soft emerald/cyan gradient accents, `card` container with dual `orb` backdrops. CTA: **Start My Discovery →**.
  - **Mission** — Level1Screen's internal phase state expanded to `"welcome" | "countdown" | "playing"`. Briefing panel uses `glass-strong` + neon blue/purple accents, mono `// YOUR PROFESSIONAL SIGNATURE AWAITS.` sub-header, `THE OBJECTIVE` in Orbitron with electric-blue glow. CTA: **START_MY_DISCOVERY →**.
- **3·2·1 GO countdown transition** between the CTA and the first scenario — prevents the jarring immediate jump into play.
  - `CountdownView` / `MissionCountdownView` component, full-screen fixed overlay with backdrop blur
  - Stages: `3 → 2 → 1 → GO`, 820 ms for numbers + 550 ms hold on "GO" (~2.9 s total)
  - Each tick re-triggers a spring-pop via the `.countdown-number` keyframes (`countdownPop`: scale 0.35 → 1.14 → 1, letter-spacing release)
  - Below the number: `LOADING SIMULATION…` sub-caption in mono + a horizontal gradient progress bar that fills to 100 % over the four ticks
  - Adventure uses indigo/purple gradient for counting digits, emerald-to-cyan for the final "GO"; Mission uses neon electric-blue and green with heavy `text-shadow` glow
- Same welcome copy in both themes — just differently dressed.

### v2.2 — 2026-04-22 · **Mirrored Arrow Directions (Pull vs. Push)**
- **More Like Me** — arrow-pill moved to the **right** side of the button, icon flipped (`transform: scaleX(-1)`) so the arrow points **← toward the text**. On hover the pill translates **-6 px** (inward) instead of outward — a "pulls the text closer" affordance for inclusion. Text is now left-aligned with `flex-1` and sits on the left.
- **Less Like Me** unchanged structurally — arrow-pill on the left pointing right (→), text pushed to the far right with `justify-between` + `gap-6`. On hover the pill translates **+6 px** outward — a "pushes the text away" affordance for distancing.
- New modifier classes `.mirror-btn--pull` and `.mirror-btn--push` drive the directional hover/active translations from a single shared `.arrow-pill` primitive. Net effect: the two buttons become mirror-opposite directional metaphors (← pull · → push) while keeping identical pill geometry, identical lift on hover, and identical press feedback on active.

### v2.1 — 2026-04-22 · **Directional Mirror Buttons (Arrow-Pill Affordance)**
- **L2 More/Less Like Me buttons** redesigned with explicit directional affordance. Emoji replaced with a **circular arrow-pill** on the left of each button — the arrow (→) visually triggers the action and points toward the text. New `.mirror-btn` + `.arrow-pill` CSS classes in both themes.
  - **More Like Me (positive)** — arrow + text tightly grouped (`gap-3`). Arrow-pill is green in Adventure (`#10b981→#059669` gradient) and neon green in Mission (filled with dark `#04060e` arrow icon on green). Text sits close to the arrow.
  - **Less Like Me (negative)** — arrow + text pushed apart (`justify-between`, `gap-6`) for a "distancing" effect. Text right-aligned, slammed to the right edge of the button. Arrow-pill is orange in Adventure (`#f97316→#ea580c`) and neon amber in Mission.
- **Arrow pill as an interactive control:**
  - Circular 48×48 px pill with colored background + inset highlight + soft glow shadow (neon glow in Mission)
  - Consistent size/shape across both buttons
  - Feels like a button within a button, not just an icon
- **Interaction feel:**
  - Hover on the outer button → arrow-pill translates **+6 px** toward the text + scales **1.06** (cubic-bezier `.2,1.3,.2,1` for spring)
  - Hover also lifts the whole button `translateY(-2px)`
  - Click → outer button presses down (`translateY(0) scale(0.99)`), arrow-pill snaps with a slight inward motion (`translateX(3px) scale(0.96)`)
  - Disabled state mutes the whole button to 55 % opacity, no-cursor
- Semantically opposite, visually balanced — both kept at 46–48 px pill diameter, same corner radius, mirror-symmetric padding, same press feedback.

### v2.0 — 2026-04-22 · **Title-First Cards + Square-Box Rank UI**
- **Adventure intro cards re-stacked** — the title (`The Execution Lab`, `The Character Mirror`, `The Strategist`, `The Mastermind`) is now the **first element** in each card, rendered in 18/20 px Fredoka extrabold with a reserved `min-height: 3rem` so titles that wrap to two lines keep card heights aligned. Below the title: the `[icon] + LEVEL 0N / TAG` row, then the blurb. Visual hierarchy now reads title → category → blurb, matching how users scan the grid.
- **L3 Strategist — simplest rank UI yet (both themes)** — the "three rank buttons on every card" pattern was still noisy. Replaced with a single **square rank indicator** on the left of each option and the option text on the right. Empty state shows a muted `—`; ranked state shows the number (`1` / `2` / `3`) with a colored glow + text-shadow + inset halo (gold/slate/bronze in Adventure, green/blue/purple in Mission). Interaction is a single click per option:
  - Unranked option clicked → receives the lowest available rank (1 → 2 → 3)
  - Ranked option clicked → un-ranks itself (others keep their ranks; the freed slot becomes the next rank for the subsequent click)
- One hint chip at top of L3 explains exactly what the next click will do (`"Tap options in priority order — next click becomes 2nd"`), flipping to `"✓ All three priorities set — lock it in"` when the set is complete.

### v1.9 — 2026-04-22 · **UX Polish · Focus Mode · 24h TTL · Explicit Rank Buttons**
- **Adventure intro cards normalized** — all 4 level cards (`L1 Execution Lab`, `L2 Character Mirror`, `L3 Strategist`, `L4 Mastermind`) now use a short equal-length `blurb` (~85 characters each) instead of the full level narrative. Header rearranged: icon and `LEVEL 0N · TAG` text stack sit side-by-side on one row, then a bold title, then the blurb. Equal visual weight across all 4.
- **Focus Mode during active play** — once a candidate starts the quest (`progressPct != null`), the header no longer shows the theme-switch link or the Manager Portal toggle. Both return once they hit the final results screen or when viewed as Manager. Prevents candidates accidentally jumping out mid-session. Applied to both `adventure.html` and `mission.html`.
- **L1 timer raised to 20 s** — Execution Lab scenarios now give 20 seconds per decision (was 15 s). Low-urgency threshold shifted to 16 s accordingly so the flag still only fires when candidates linger close to the ceiling. Level intro copy updated to "6 scenarios · 20 seconds each".
- **L3 Strategist redesigned (clearer mental model)** — the inline "tap the card, get the next rank" pattern was confusing per user feedback. Replaced with **three explicit rank buttons on each option card**: `🥇 1st` / `🥈 2nd` / `🥉 3rd`. Tap one to assign; tapping a rank already owned by another option swaps it onto the new option. Each option card shows the big medal + "1ST PRIORITY" label once ranked, and the 3 rank buttons become filled-state chips. Tooltip explains the swap behavior. Both themes.
- **localStorage 24-hour TTL** — completed candidate runs are stamped with `savedAt: Date.now()` on write. On load, any entry older than 24 hours is filtered out and the cleaned list is persisted back immediately. Prevents stale demo data from polluting the Manager dashboard after a day. New `STORAGE_TTL_MS` constant.
- **Index hub simplified** — removed the "Shared Logic Engine · 4-Level Architecture" technical-detail card from `index.html`. Focus stays on the two theme entry points. Footer now reads `v1.9`.

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

### v0.1 — Initial Signature Sprint (legacy name: Catalyst Protocol)
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
  LEVEL_META,          // The Execution Lab / The Character Mirror / The Priority Lens / The Core Narrative
                       // Each entry carries: title, tag, sub, headline, subheadline,
                       // script, taskLabel, closing, buttonLabel, blurb, narrative, guidelines (L1 only)
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
    consistencyFlag,                              // legacy bool; prefer `flags` list
    flags,                                        // copy of top-level flags, for mock data compatibility
    skippedByLevel: { 1: n, 2: n, 3: n, 4: n },   // v2.7 — per-level skip count
    skippedTotal: n                               // v2.7 — sum across all levels
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
| Level badges (4-icon visual, v2.7 unlabeled) | ✅ | ✅ (implicit in level) |
| Skipped Questions by Level | ❌ | ✅ (v2.7 · per-level tiles + total chip) |
| Positive signature paragraph | ✅ | ✅ (as "behavioral summary") |
| Dev tip / growth edge | ❌ | ✅ |
| Export (print) report | ✅ (v2.7) | ✅ |

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

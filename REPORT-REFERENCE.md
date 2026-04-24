# Signature Sprint — Report Reference

**Audience:** L&D teams, evaluators, developers, and anyone who needs to understand *why* the system says what it says.

This document explains how the simulation scores a candidate, what every phrase and message in the report means, and what triggers each validation flag. It covers both the candidate-facing **Signature** reveal and the manager-facing **Analytics Report**.

---

## 1 · How the simulation scores

### Dimensions & weights

"Drive for Results" is broken into three weighted sub-dimensions. Weights were chosen to reflect empirical research on which drivers most predict delivery outcomes in engineering-band roles.

| Dimension | Weight | What it captures |
|-----------|--------|------------------|
| Ownership & Accountability | **0.40** | Does the candidate close the loop themselves? |
| Action Orientation | **0.35** | Do they convert ambiguity into forward motion? |
| Perseverance | **0.25** | Do they stay with hard problems past the first ceiling? |

### BARS scale (Behaviorally Anchored Rating Scale)

Every option in the simulation maps to a BARS level. BARS is an industry-standard anchor for behavioral observation.

| BARS | Label | Behavior |
|------|-------|----------|
| 1 | Ineffective | Passive · defers decisions · needs prompting |
| 2 | Developing | Emerging awareness · leans on team structure |
| 3 | Effective | Completes what they start · reasonable initiative |
| 4 | Advanced | Owns outcomes · removes ambiguity · accelerates team |

### Per-level contribution to scoring

**Level 1 — The Execution Lab (6 SJT scenarios × 4 options)**
- Candidate picks one option per scenario.
- The option's `level` is pushed into that dimension's running list.
- Option order is shuffled per user so BARS-4 isn't always button D.

**Level 2 — The Character Mirror (9 cards)**
- Each "More Like Me" tap → push that BARS level to the dimension's list.
- Each "Less Like Me" tap at BARS-2 → **+0.2 bonus** to the dimension (healthy distancing from weak behavior).
- Each "Less Like Me" tap at BARS-4 → **-0.3 penalty** (concerning distancing from strong behavior).
- Skips don't contribute.

**Level 3 — The Priority Lens (3 rank-order puzzles)**
- The option ranked **1st** contributes its `level` to the dimension's list.
- The 2nd and 3rd placements aren't scored directly — but the full ordering is used to detect the **Consistency Gap** flag.

**Level 4 — The Core Narrative (3 Why questions)**
- Each pick contributes `level` directly to the dimension's list.
- Per-question 20 s timer; expiry auto-logs the lowest BARS option.

### Final score

```
dimAvg[dim] = mean(all levels contributed to dim) + bonus − penalty
              (clamped to [1, 4])

FinalScore  = dimAvg[accountability]    × 0.40
            + dimAvg[actionOrientation] × 0.35
            + dimAvg[perseverance]      × 0.25
```

### Level band (proficiency mapping)

| FinalScore | Band | Label |
|------------|------|-------|
| 1.00 – 1.74 | **L1** | Ineffective |
| 1.75 – 2.49 | **L2** | Developing |
| 2.50 – 3.24 | **L3** | Effective |
| 3.25 – 4.00 | **L4** | Advanced |

---

## 2 · Candidate Report — what they see and why

The candidate-facing screen deliberately hides numbers and never uses the word "ineffective" or "weak". The purpose is to close the experience on a warm, growth-oriented note while preserving the honest signal for the evaluator.

### "MISSION COMPLETE" header
Fires once all 4 levels are finished. Pure completion confirmation — no evaluation implied.

### Badge wall (visual only · v2.7)
Shows all 4 level icons (The Execution Lab · The Character Mirror · The Priority Lens · The Core Narrative) with a green check on each. Every candidate sees all 4 — they're **participation tokens**, not achievement grades. As of v2.7 the `Badges Earned` header and the `4 of 4` / `4 / 4` counter chip are removed — only the visual grid remains.

### "Your Signature" — 3-line BARS narrative
Three growth-oriented lines tailored to the candidate's banded level:

| Band | Shape of the 3 lines |
|------|----------------------|
| **L1 · Ineffective** | Structure-thrives → Growth edge → "Every senior operator started here…" |
| **L2 · Developing** | Reliable execution → Growth signal → "A few courageous calls away…" |
| **L3 · Effective** | "Teams can trust you…" → Next signature move → "Already an operator others want to pair with." |
| **L4 · Advanced** | "Own outcomes end-to-end" → Grit + bias-for-action → "Ready for stretch scope and mentorship." |

**Why this shape:** opens with what the candidate does well, pivots to their growth edge, closes with a forward-looking encouragement. Never surfaces the band name. Candidates always hear *what's strong about them first*.

### Positive bullets (3 cards, constant)
Three statements shown to every candidate regardless of score:
1. "You demonstrated strong problem-solving persistence throughout the mission."
2. "Your approach shows initiative and a focus on steady progress."
3. "You made choices with care — not in a hurry, not in a freeze."

**Why constant:** at POC scale, candidates should feel credited for participating. These aren't score-derived; they're there to ensure the post-run experience is warm regardless of outcome.

### Toast messages during play

| Toast | Trigger |
|-------|---------|
| "Move logged" / `ACTION LOGGED` | Candidate picks an L1 option |
| "Response locked in" / `SIGNATURE CAPTURED` | L2 Character Mirror complete |
| "Priority locked in" / `RANK_VECTOR STORED` | L3 rank confirmed |
| "Reflection saved" / `MOTIVE.SIGNAL PARSED` | L4 pick saved |
| "Time up — auto-logged" / `TIMEOUT · AUTO-LOGGED` | Timer expired |

All feedback is **system-style** — never "correct" or "wrong". That phrasing would tempt candidates to game future picks.

### Things the candidate never sees
- Numeric final score
- Dimension averages
- BARS labels on their specific picks
- Any validation flag
- The words *Ineffective · Developing · Effective · Advanced*

---

## 3 · Manager Report — what evaluators see and why

### Final Score (giant number)
Weighted sum of dimension averages, displayed in 5xl font-black with tabular numerals. Color matches the level band:

| Band | Color |
|------|-------|
| L1 | `#ef4444` red |
| L2 | `#f59e0b` amber |
| L3 | `#3b82f6` blue |
| L4 | `#10b981` green |

### Level badge (L1–L4)
Same color as the score. Label appears underneath: `Ineffective / Developing / Effective / Advanced`.

### Dimension Breakdown (3 animated bars)
Each dimension shown as a labeled horizontal bar with shimmer sweep during reveal. Bar color follows health-band rules:

| Dim score | Color | Meaning |
|-----------|-------|---------|
| ≥ 3.0 | green | healthy |
| 2.0 – 2.99 | amber | developing |
| < 2.0 | red | weak |

Numeric value shown to the right (e.g., `3.67 / 4.00`).

### Validation Signals panel

| Signal | Formula | What it tells you |
|--------|---------|-------------------|
| **Avg response time** | mean(responseMs) / 1000 | Seconds per decision. Very low = snap, very high = over-deliberation |
| **Fast responses (<3s)** | count(responseMs < 3000) | How many decisions were sub-3-second snaps |
| **Validity flags** | flags[].length | 0 = Clean · 1+ = Flagged |
| **Pattern** | avg < 4500 → Snap · 4500–8000 → Balanced · > 8000 → Deliberate | Temperament class |

### Skipped Questions by Level (v2.7)
A dedicated card above Strengths / Development Area that surfaces exactly how many questions the candidate let the timer run out on. One tile per level:

| Level | What's counted as "skipped" |
|-------|-----------------------------|
| **L1 Execution Lab** | Any L1 answer where `auto: true` (candidate didn't pick before the 20 s timer expired — system auto-logged the lowest BARS option) |
| **L2 Character Mirror** | Any card decision where `decision === null` (candidate tapped "Skip card" or let the 15 s per-card timer run out) |
| **L3 Priority Lens** | Any L3 answer where `auto: true` (timer expired before the rank was locked in — the engine auto-submits the options in their displayed order) |
| **L4 Core Narrative** | Any L4 answer where `auto: true` (20 s timer expired before a choice — lowest BARS option auto-logged) |

Each tile shows the level icon, the `L0N` code, and the skip count. Tiles with `> 0` turn amber with a warm orange background to make non-zero values instantly visible. A `{N} total` chip in the card header sums across all four levels.

**How to use:** a few skips (1–2) is normal reading fatigue; 3+ across multiple levels usually means the candidate was overwhelmed or didn't engage deeply. Combine with the Fast-responses signal — lots of skips plus lots of sub-3-second picks points to low engagement; lots of skips with average pacing on remaining picks hints at decision paralysis on hard items specifically.

The counts are derived in `computeResults()` (`meta.skippedByLevel` and `meta.skippedTotal`) and surfaced identically in both Adventure and Mission manager reports.

### Validation flags

Flags are **conversation starters, not verdicts.** A flagged candidate isn't disqualified — the flag tells you where to probe in an interview.

#### ⚠ Aspirational Bias (Mirror Match)
**Trigger:** L4 self-concept average ≥ 3.5 AND L1 tactical average ≤ 2.25
**What it means:** The candidate described themselves in reflective terms as highly accountable/action-oriented, but their tactical L1 picks trended low. Self-perception exceeds revealed behavior.
**How to use:** In the interview, ask for a specific past example where they owned a blocker end-to-end. Use BEI (Behavioral Event Interviewing) style — time, place, action, outcome.

#### ⚠ Consistency Gap
**Trigger:** In L3, the candidate deprioritized a BARS-4 option (ranked it 3rd) for a dimension where their L1 tactical behavior was strong (level ≥ 3).
**What it means:** Stated ranking conflicts with revealed tactical behavior.
**How to use:** Ask the candidate to walk through their ranking logic out loud. Often surfaces a nuance worth recording.

#### ⚠ Always-Highest Pattern
**Trigger:** All 6 L1 picks were BARS 4.
**What it means:** May indicate social-desirability gaming — picking "the obvious best" rather than what they'd actually do.
**How to use:** Follow up with ambiguous scenarios that don't have an obvious "good" answer. Does the candidate still default to the high-stakes move?

#### ⚠ Social Desirability Bias
**Trigger:** In L2 Character Mirror, the candidate marked BOTH the BARS-2 and BARS-4 cards of the **same dimension** as "More Like Me".
**What it means:** BARS-2 (cautious/wait) and BARS-4 (fast/launch) are contradictory stances. Identifying with both suggests the candidate optimized for sounding good over being authentic.
**How to use:** Revisit the specific cards in debrief — "You said you identify with both the cautious and the bold version. When have you been each?"

#### ⓘ Low Urgency Signal
**Trigger:** The candidate took more than **16 seconds** on a Level 1 Action-Orientation scenario (L1_TIMER is 20 s).
**What it means:** Action Orientation rewards speed. Lingering near the timer ceiling — regardless of the eventual pick — suggests the candidate's stated urgency may exceed their observed urgency.
**How to use:** Check if it's systemic or isolated. One slow item in six isn't a pattern.

### Insights cards

#### Strengths
Shows the candidate's **highest-scoring dimension** + a note tailored to it:
- Accountability → "Likely to own outcomes end-to-end without prompting."
- Action Orientation → "Converts ambiguity into forward motion quickly."
- Perseverance → "Stays with hard problems and surfaces workarounds."

#### Development Area
Shows the **lowest-scoring dimension** + a concrete tip:
- Accountability → "Treat self-discovered issues as yours to close before handoff…"
- Action Orientation → "When blocked, scaffold what you can, isolate unknowns…"
- Perseverance → "Before escalating, switch approach — binary-search, new hypothesis…"

These are written in **direct evaluator-facing language**, unlike the candidate's softened "Your Signature".

### Behavioral Summary (one paragraph)
One paragraph tied directly to the candidate's band:

- **L1:** "Hesitates under pressure; defers decisions…"
- **L2:** "Emerging awareness of accountability…"
- **L3:** "Completes what they start…"
- **L4:** "Drives outcomes end-to-end…"

No softening. Intended for an evaluator who needs an at-a-glance interpretation.

---

## 4 · Data retention

Completed candidate runs are persisted to the browser's **localStorage** under the key `catalyst:candidates`. Each record carries a `savedAt: timestamp` millisecond value.

On every Manager dashboard load, `loadSavedCandidates()` filters out entries older than **24 hours** (`STORAGE_TTL_MS = 24 × 60 × 60 × 1000`) and writes the cleaned list back. This keeps demo data fresh and prevents stale runs from accumulating.

Records **never leave the browser** — there is no backend in the POC. Moving to production would swap this layer for an authenticated API, keeping the same record shape.

---

## 5 · Worked example — why a flag fires

A candidate finishes the quest. Their raw data:

```
L1 picks (BARS levels):      [2, 2, 3, 2, 2, 1]   → avg 2.00
L4 picks (BARS levels):      [4, 4, 4]             → avg 4.00
L2 decisions (accountability · "More Like Me"):
   - BARS-2 card: "Alex focuses strictly on own tasks"   ✓ more-like
   - BARS-4 card: "Alex stays late to fix a teammate's"  ✓ more-like
```

The scoring engine computes:

```
dimAvg[accountability] = mean([2, 2, 4, 2]) + 0 − 0        = 2.50
FinalScore ≈ 2.50 × 0.40 + 2.00 × 0.35 + 2.00 × 0.25        = 1.00 + 0.70 + 0.50 = 2.20
Band → L2 (Developing)

Flag 1: Aspirational Bias
   L4 avg (4.00) ≥ 3.5 ✓ AND L1 avg (2.00) ≤ 2.25 ✓
   → flag fires

Flag 2: Social Desirability Bias
   accountability dim has both BARS-2 and BARS-4 as "More Like Me"
   → flag fires
```

Manager report shows:
- Score **2.20** · Band **L2 Developing** · Level badge amber
- Two amber flag cards with reason text
- Dimension bars: accountability 2.50 amber, action 2.00 amber, perseverance 2.00 amber
- Behavioral summary: *"Emerging awareness of accountability…"*

Without the flags, the 2.20 score would read as "developing" full stop. With the flags, the evaluator knows the *real picture* is murkier — the candidate's self-concept is inflated relative to their revealed behavior, and they identify with contradictory stances.

The flags turn a single-number verdict into a diagnostic conversation starter.

---

## 6 · Export Report

Both the candidate-facing final view and the manager-facing individual report now carry an **Export Report** button (v2.7 for the candidate view; always present on the manager view). It opens the browser's native print dialog. Users can select **Save as PDF** to archive a copy of the report offline.

Because the export uses `window.print()`, the report is rendered with the same layout and colors as on-screen. For cleaner PDFs, evaluators can set the print margins to "minimum" and enable "Background graphics" in the print dialog.

---

*Version 2.7 · April 2026*

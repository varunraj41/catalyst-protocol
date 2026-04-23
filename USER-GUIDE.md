# Catalyst Quest — User Guide

Welcome. This is a quick, practical guide to using the Catalyst Quest POC — for both candidates taking the simulation and evaluators reviewing reports.

The full quest takes about **5 minutes**.

---

## Part 1 — For Candidates

### Getting started

1. Open `index.html` (or your hosted URL).
2. Choose your **theme**:
   - **🗺️ Adventure Quest** — bright, game-like, journey-map style
   - **🛰️ Mission Control** — dark developer-console aesthetic
   - Both use the same levels and scoring — pick whichever feels more comfortable.
3. Click **Enter Adventure** or **Enter Mission Control**.

### The home screen

You'll see:
- 4 level preview cards — Execution Lab, Character Mirror, Strategist, Mastermind
- A name field — enter your preferred name or callsign
- A **Start the Quest** / **INITIALIZE_PROTOCOL** button

Responses are saved to your browser's local storage only and automatically clear after 24 hours. Nothing leaves your device.

### Level 1 — The Execution Lab 🧭

- **6 scenarios**, **20 seconds each**
- Each scenario: a realistic workplace situation + **4 possible moves**
- **Pick the move most like what you would actually do.** Not what sounds best — what feels natural.
- A **participant briefing** appears once before the first scenario (three short guidelines to read).

**Tip:** Trust your first instinct. Options are shuffled per user so there's no "obvious best slot".

### Level 2 — The Character Mirror 👁️

- First, **choose a character** — Alex (🧑‍💼) or Avantika (👩‍💼). Both have the exact same cards; choose whichever you'd rather watch.
- A briefing introduces your character.
- Then you'll see **9 cards**, one at a time. Each shows something your character did and why.
- Decide per card:
  - **← More Like Me** (green · arrow pulls inward) — "this is part of how I work"
  - **Less Like Me →** (amber · arrow pushes away) — "this isn't me"
  - **Skip card** — a small button if you can't decide
- **15-second timer per card** — if you don't decide, it silently skips and moves on.

**Tip:** Be honest, not strategic. The system detects when someone identifies with contradictory stances.

### Level 3 — The Strategist ♟️

- **3 puzzles**, **25 seconds each**
- Each puzzle shows a situation + 3 options
- **Tap options in priority order**:
  - 1st tap → becomes 🥇 1st priority
  - 2nd tap on another option → 🥈 2nd
  - 3rd tap → 🥉 3rd
- A little chip at the top tells you what your next click will do
- Tap a ranked option again to **un-rank it**
- When all 3 are ranked, hit **Lock In Priority**

### Level 4 — The Mastermind 🔑

- **3 reflection questions**, **20 seconds each**
- Each question has 3 options — pick the one that best describes your "why"
- No right answer. Your authentic motivation tells the system more than the "correct-sounding" choice.

### What happens between levels

- A **confetti celebration** + level badge reveal
- A brief **SYSTEM LOADING NEXT MODULE** transition (about 1.5 s)
- Your **Journey progress** stays visible in the header bar (hidden theme-switch + manager buttons during active play so you can't accidentally jump out)

### After completing the quest

You'll see:
- **4 level badges** — one for each level completed
- **"Your Signature"** — a 3-line description tailored to how you played (positive · growth-oriented)
- **3 reinforcing insight cards**
- A **🗺 Go Home** button that returns to the hub

Your responses are now saved for your evaluator to review.

### What you won't see (and why)

- Your numeric score
- Which BARS level each of your picks mapped to
- Any validation flags the system surfaced

This is intentional. Candidates who see their scores often start gaming future picks to optimize the number. Keeping the experience score-free preserves the authentic behavioral signal your evaluator needs.

---

## Part 2 — For Evaluators / Managers

### Opening the Manager dashboard

**From the hub:**
On `index.html`, click **👔 Manager Portal** on either the Adventure or Mission card.

**From inside a theme (while on the intro page only):**
Click the **Manager Portal** button in the header.

**Direct link:**
- Adventure → `adventure.html?role=manager`
- Mission → `mission.html?role=manager`

### The candidate list

A searchable, sortable table of everyone who has completed the quest:

| Column | Notes |
|--------|-------|
| **Name** | Includes a ⚠ icon if any validation flag fired |
| **Date** | When the candidate completed |
| **Score** | Final weighted score, 0–4, color-coded by band |
| **Level** | L1–L4 band + label (Ineffective / Developing / Effective / Advanced) |

**KPI row** at the top shows aggregates: total candidates · average score · count at Level 4 · flagged count.

**Search** by candidate name. **Sort** by date (default), score, or name.

### Individual candidate report

Click any row to open the full report:

- **Header** — avatar + name + date + completion status, plus the giant final score and the L1–L4 level badge
- **Validation Flags** (amber cards — only shown if triggered) — see the [Report Reference](REPORT-REFERENCE.md) for each flag's meaning
- **Dimension Breakdown** — 3 animated horizontal bars (Accountability · Action Orientation · Perseverance) with numeric values
- **Validation Signals** — avg response time, fast-response count, consistency check, temperament pattern (Snap / Balanced / Deliberate)
- **Strengths** — the candidate's highest dimension + a note
- **Development Area** — the weakest dimension + a concrete tip
- **Behavioral Summary** — one paragraph interpretation tied to their band
- **Export Report** button — opens the browser's print dialog (layout is print-optimized)

### Reading a report — the two-minute version

1. **Look at the score first.** L1 red · L2 amber · L3 blue · L4 green.
2. **Scan for flags.** Amber cards at the top = something to probe in the interview.
3. **Look at the dimension bars.** Which of the three is weakest? That's where the candidate has the most room to grow.
4. **Skim the behavioral summary.** It's the one-paragraph verdict.
5. **Export** and bring the PDF into your interview prep.

### What to do with flags

Flags are **conversation starters, not verdicts.** A flagged candidate isn't disqualified — the flag tells you where to probe in the interview. See the full [Report Reference](REPORT-REFERENCE.md) for each flag's trigger logic and suggested follow-up questions.

### Data retention

Completed runs persist in the browser's localStorage for **24 hours**. After that they roll off automatically. Seed mock candidates (Ananya, Rohan, Priya, Kabir, Meera) are always present for demos.

---

## Part 3 — Switching themes

Both themes implement the same levels, scoring, and validation logic. The UI differs:

| Theme | Feel | Best for |
|-------|------|----------|
| **Adventure Quest** | Warm · bright · game-like · journey map | Most candidates — inviting |
| **Mission Control** | Dark cyberpunk · matrix rain · neon · glass | Developer persona · high-focus vibe |

During a candidate session the theme switcher is **hidden** (to prevent mid-session jumps that would break the flow). You can change theme from the home hub or when viewing the Manager Portal.

---

## Part 4 — Running locally

### Open directly (quickest)
Double-click `index.html`. Works in any modern browser (Chrome, Firefox, Edge, Safari).

> **Caveat:** on a `file://` origin, Chrome isolates localStorage **per file**, so candidate runs completed in Adventure won't show up in Mission's Manager view and vice versa. Firefox shares them; Safari may block. For consistent cross-theme behavior, serve over HTTP.

### Serve over HTTP

```bash
cd d:\BAT
# Python 3
python -m http.server 8000

# or Node
npx serve .
```

Open `http://localhost:8000/` — both themes now share the same origin and the same localStorage.

### Deploy to Vercel

Three paths — all covered by the project's `vercel.json`:

1. **Vercel CLI**
   ```bash
   npm i -g vercel
   cd d:\BAT
   vercel
   vercel --prod
   ```
2. **GitHub integration** — push the folder to a GitHub repo, click **Add New Project** on vercel.com, import the repo.
3. **Drag-and-drop** — zip the folder's contents (not the folder itself), drop the zip on `vercel.com/new`.

No build step needed. The app runs on Babel Standalone in the browser.

---

## FAQ

**Q: I clicked the wrong option — can I go back?**
No. The Quest is one-way to preserve honest first-instinct signal. If you want to replay, start a new session from the home hub.

**Q: What if the timer runs out?**
A brief "TIME UP · SCENARIO SKIPPED" banner appears and the system auto-logs the most cautious option. Nothing is heavily penalized — time-outs are a behavioral signal, not a failure.

**Q: Who sees my answers?**
Only your evaluator, via the Manager Portal. At POC scale, data stays in your browser for 24 hours.

**Q: Why don't I see my score as a candidate?**
Candidates who see their scores often modify future answers to optimize the number. Hiding the score preserves the authentic behavioral signal your evaluator needs.

**Q: Alex or Avantika — does it matter which I pick?**
No. Both characters have the same 9 cards with the same scenarios. The choice is purely for whichever character you'd rather watch. You can go back from the briefing screen and change.

**Q: My Manager dashboard shows 5 unfamiliar names.**
Those are seed mock candidates (Ananya, Rohan, Priya, Kabir, Meera) for demo purposes. Real completed runs appear above them after the first quest finishes.

**Q: I completed the quest yesterday but the Manager doesn't see me.**
The 24-hour TTL rolled your run off. Complete a fresh quest — it'll persist for another 24 hours.

**Q: Can I add more scenarios / edit the questions?**
Yes. Open `catalyst-shared.js` and edit the `L1`, `L2`, `L3`, or `L4` arrays. Both themes consume the same source, so changes flow to both immediately on reload. See [Report Reference](REPORT-REFERENCE.md) for the data shapes.

**Q: Can I change the theme colors?**
Yes. Each theme file (`adventure.html` / `mission.html`) has its own CSS custom properties at the top of `<style>`. Edit the color tokens (`--primary`, `--lvl1-a`, etc.) and reload.

**Q: I want to host this for my whole team. What's the minimum setup?**
Vercel free tier is enough for a POC. Upload these files, point a domain at it, and you're live. For actual production use (persistent storage, auth, multi-evaluator review), you'll need a backend — swap the localStorage layer in `catalyst-shared.js` for a REST API and keep everything else intact.

---

## Related documents

- **`REPORT-REFERENCE.md`** — how the scoring engine works, what every message means, and how each validation flag fires
- **`PRODUCT-DOC.md`** — full PRD, versioned change log, and system design reference
- **`index.html`** — the entry hub
- **`adventure.html`** / **`mission.html`** — the two UI implementations
- **`catalyst-shared.js`** — shared scoring and data engine

---

*Version 2.2 · April 2026*

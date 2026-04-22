/* =====================================================================
   CATALYST CORE · Shared Logic Engine (v2 — 4-level architecture)
   ---------------------------------------------------------------------
   Plain JavaScript (no JSX). Loaded via <script src="catalyst-shared.js">.
   Exposes window.CatalystCore consumed by BOTH adventure.html and
   mission.html. 4 levels:
     L1 · Explorer          — 6 SJT scenarios (most + least)
     L2 · Behavioral Monitor — Avatar + Success Basket drop
     L3 · Strategist        — 1 rank-order (3 options)
     L4 · Mastermind        — 1 Why reflection (3 options)
===================================================================== */
(function (global) {
  "use strict";

  /* ---------- LEVEL 1 — 6 SJT Scenarios (dimension × 2 each) ---------- */

  var L1 = [
    /* Accountability ×2 */
    {
      id: "L1a1", dimension: "accountability",
      prompt: "You spot a bug in your own code after it's merged to Staging. QA hasn't flagged it yet.",
      options: [
        { id: "a", text: "Wait for QA to catch it — if they miss it, it's probably minor.",   level: 1 },
        { id: "b", text: "Mention it in tomorrow's standup so the team knows.",               level: 2 },
        { id: "c", text: "Create a ticket and inform the lead; fix next sub-sprint.",         level: 3 },
        { id: "d", text: "Fix it now, push a patch, and verify on Staging yourself.",         level: 4 }
      ]
    },
    {
      id: "L1a2", dimension: "accountability",
      prompt: "Your latest commit may have broken smoke tests. QA wants to rollback immediately.",
      options: [
        { id: "a", text: "Let QA rollback; I'll investigate tomorrow.",                       level: 1 },
        { id: "b", text: "Let QA rollback; review logs after the env stabilizes.",            level: 2 },
        { id: "c", text: "Ask QA to hold 5 minutes while I check locally.",                   level: 3 },
        { id: "d", text: "Reproduce locally, push a targeted hotfix, verify before rollback.",level: 4 }
      ]
    },
    /* Action Orientation ×2 */
    {
      id: "L1b1", dimension: "actionOrientation",
      prompt: "API docs for your next ticket won't be ready for 4 hours. Team Lead says wait or start early.",
      options: [
        { id: "a", text: "Wait — coding without docs wastes effort.",                          level: 1 },
        { id: "b", text: "Read adjacent code for context while waiting.",                      level: 2 },
        { id: "c", text: "Set up boilerplate and mock interfaces so I'm ready.",               level: 3 },
        { id: "d", text: "Scaffold the module; draft clarification questions for the API owner.", level: 4 }
      ]
    },
    {
      id: "L1b2", dimension: "actionOrientation",
      prompt: "A critical feature lands on your plate mid-sprint. Quality bar is tight.",
      options: [
        { id: "a", text: "Defer entirely until next sprint — quality first.",                   level: 1 },
        { id: "b", text: "Push back on scope until something is dropped from this sprint.",     level: 2 },
        { id: "c", text: "Ship a minimal viable version with known risks; plan a follow-up.",   level: 3 },
        { id: "d", text: "Pause non-critical work, reallocate focus, deliver with full tests.", level: 4 }
      ]
    },
    /* Perseverance ×2 */
    {
      id: "L1c1", dimension: "perseverance",
      prompt: "You've been debugging a logic error for 3 hours. Sprint deadline is in 2 hours.",
      options: [
        { id: "a", text: "Drop the ticket — mark it blocked.",                                  level: 1 },
        { id: "b", text: "Escalate to senior dev immediately.",                                 level: 2 },
        { id: "c", text: "Take a 5-min break, then try a completely different approach.",       level: 3 },
        { id: "d", text: "Fix it, then document the gotcha in the team wiki.",                  level: 4 }
      ]
    },
    {
      id: "L1c2", dimension: "perseverance",
      prompt: "A flaky test keeps failing your CI. The team thinks it's a nuisance.",
      options: [
        { id: "a", text: "Disable it — not worth the time.",                                     level: 1 },
        { id: "b", text: "Retry the pipeline and hope for green.",                               level: 2 },
        { id: "c", text: "Open a ticket with repro steps so someone picks it up later.",         level: 3 },
        { id: "d", text: "Investigate the race, fix the root cause, add a regression test.",    level: 4 }
      ]
    }
  ];

  /* ---------- LEVEL 2 — Behavioral Monitoring (Avatar + Basket) ---------- */

  // LEVEL 2 — The Character Mirror (Identity Projection)
  // A single module containing an avatar (Alex) and 6 behavior cards.
  // Player sees cards one-by-one and drops each into "More Like Me" or
  // "Less Like Me" basket (or lets the 15s timer skip). Section ends
  // as soon as BOTH baskets have one card, or after all 6 are seen.
  var L2 = [
    {
      id: "L2-mirror",
      avatar: { name: "Alex", role: "High-performing Lead", emoji: "🧑‍💼" },
      briefing: "Meet Alex, a high-performing lead. You'll see how Alex handles various work situations and the logic behind each action. Your task: decide if each is 'More Like Me' or 'Less Like Me'. There are no right or wrong styles — we're building your unique execution signature.",
      instruction: "You'll see 6 cards. Pick one that's MOST like you and one that's LEAST like you. The section ends when both baskets are full — or after all 6 cards.",
      cards: [
        { id: "a2", dimension: "actionOrientation", level: 2,
          text: "Alex prefers to wait for a finalized project brief from the manager before starting, as he believes executing without a clear plan is a waste of resources." },
        { id: "a4", dimension: "actionOrientation", level: 4,
          text: "Alex launches projects with a 'rough draft' because he believes real-world feedback is more valuable than a perfect initial plan." },
        { id: "b2", dimension: "accountability", level: 2,
          text: "Alex focuses strictly on his own assigned tasks, believing that if everyone does their individual part perfectly, the team will succeed." },
        { id: "b4", dimension: "accountability", level: 4,
          text: "Alex stays late to fix a teammate's error because he feels the final client outcome is his personal responsibility, regardless of who made the mistake." },
        { id: "c2", dimension: "perseverance", level: 2,
          text: "Alex likes to move on to new, exciting projects once the initial 'logic' is solved, believing his best value is in fresh problem-solving rather than routine execution." },
        { id: "c4", dimension: "perseverance", level: 4,
          text: "Alex prefers to stay on a complex, repetitive task for months because he finds deep satisfaction in seeing a difficult problem through to the end." }
      ]
    }
  ];

  /* ---------- LEVEL 3 — Strategist (Rank 1–3) ---------- */

  var L3 = [
    {
      id: "L3r1", dimension: "accountability",
      situation: "Three hours before release a tiny edge-case bug surfaces in your module. Rank your moves 1st → 3rd.",
      options: [
        { id: "a", text: "Wait for QA to decide if it blocks the release.",              level: 1 },
        { id: "b", text: "Create a follow-up ticket; ship the release as-is.",           level: 2 },
        { id: "c", text: "Fix it now and push a patch — keep the release clean.",        level: 4 }
      ]
    },
    {
      id: "L3r2", dimension: "actionOrientation",
      situation: "A critical feature must ship today; two components are only half-done. Rank your next moves.",
      options: [
        { id: "a", text: "Ask for the deadline to move — quality must come first.",       level: 2 },
        { id: "b", text: "Ship part A with known gaps; circle back tomorrow.",            level: 3 },
        { id: "c", text: "Reallocate focus, pair up, and finish both parts tonight.",     level: 4 }
      ]
    },
    {
      id: "L3r3", dimension: "perseverance",
      situation: "A flaky test has blocked your team for 3 sprints. Rank your next moves.",
      options: [
        { id: "a", text: "Disable the test and note it in a backlog ticket.",             level: 1 },
        { id: "b", text: "Ask a teammate to take a look — fresh eyes might spot it.",     level: 3 },
        { id: "c", text: "Dig into the race condition yourself; fix the root cause.",     level: 4 }
      ]
    }
  ];

  /* ---------- LEVEL 4 — Mastermind (Why / Self-Concept) ---------- */

  var L4 = [
    {
      id: "L4w1", dimension: "accountability",
      question: "Which statement best describes your drive for results?",
      options: [
        { id: "a", text: "I do what's asked of me and escalate if something falls outside my scope.",                              level: 2 },
        { id: "b", text: "I deliver what's on my plate and trust the team to cover the rest.",                                     level: 3 },
        { id: "c", text: "I take full ownership of outcomes — even when the failure isn't mine, closing the loop is my job.",      level: 4 }
      ]
    },
    {
      id: "L4w2", dimension: "actionOrientation",
      question: "When specs are missing, what drives you most?",
      options: [
        { id: "a", text: "I wait until everything is clear before moving forward.",                                                level: 2 },
        { id: "b", text: "I start on whatever is clear and adjust as inputs arrive.",                                              level: 3 },
        { id: "c", text: "I identify critical unknowns, scaffold what I can, and surface questions to unblock the team.",          level: 4 }
      ]
    },
    {
      id: "L4w3", dimension: "perseverance",
      question: "Why do you push past 2 hours on a hard bug rather than escalate?",
      options: [
        { id: "a", text: "I don't want to look like I give up easily in front of the team.",                                       level: 2 },
        { id: "b", text: "I feel personally responsible for the ticket.",                                                          level: 3 },
        { id: "c", text: "It's not done until it's done — finishing is part of how I work.",                                       level: 4 }
      ]
    }
  ];

  /* ---------- CONSTANTS ---------- */

  var CONSTANTS = {
    L1_TIMER: 15,            // 15s per L1 scenario
    L2_CARD_TIMER: 15,       // 15s per Character-Mirror card
    L3_TIMER: 25,            // 25s for ranking
    L4_TIMER: 20,            // 20s per Mastermind question
    TRANSITION_MS: 1500,
    LOG_MS: 650,
    MIRROR_LEAST_BONUS: 0.3, // Bonus if BARS-2 card dropped into "Less Like Me"
    MIRROR_LEAST_PENALTY: 0.5// Penalty if BARS-4 card dropped into "Less Like Me"
  };

  /* ---------- META ---------- */

  var DIMENSION_LABEL = {
    accountability:    "Ownership & Accountability",
    actionOrientation: "Action Orientation",
    perseverance:      "Perseverance"
  };

  var LEVEL_META = {
    1: { key: "explorer",   title: "The Explorer",   tag: "EXPLORER",   sub: "Tactical Response",         narrative: "You have entered a system under stress. Respond quickly to stabilize it." },
    2: { key: "observer",   title: "The Observer",   tag: "OBSERVER",   sub: "Behavioral Monitoring",     narrative: "Watch how others act. Pick the BEST move and drop it into the Success Basket." },
    3: { key: "strategist", title: "The Strategist", tag: "STRATEGIST", sub: "Decision & Prioritization", narrative: "Resources are limited. Rank your priorities from highest to lowest." },
    4: { key: "mastermind", title: "The Mastermind", tag: "MASTERMIND", sub: "Self-Concept & Motivation", narrative: "Look inward. Which statement truly describes your drive?" }
  };

  var FINAL_LEVEL_META = {
    1: { name: "Ineffective", accent: "#ef4444" },
    2: { name: "Developing",  accent: "#f59e0b" },
    3: { name: "Effective",   accent: "#3b82f6" },
    4: { name: "Advanced",    accent: "#10b981" }
  };

  var LEVEL_SUMMARY = {
    1: "Hesitates under pressure; defers decisions. Foundational coaching on initiative recommended.",
    2: "Emerging awareness of accountability. Developing but not yet consistently proactive.",
    3: "Completes what they start; takes reasonable initiative. Next edge: anticipate blockers proactively.",
    4: "Drives outcomes end-to-end; removes ambiguity, owns edge cases. Ready for stretch scope."
  };

  var DEV_TIP = {
    accountability:    "Treat self-discovered issues as yours to close before handoff. Don't wait for QA to surface the issue.",
    actionOrientation: "When blocked, scaffold what you can, isolate unknowns, draft clarification questions. No idle sprint time.",
    perseverance:      "Before escalating, switch approach — binary-search, new hypothesis, fresh logs. Document recovered defects."
  };

  var STRENGTH_NOTE = {
    accountability:    "Highest signal on ownership. Likely to own outcomes end-to-end without prompting.",
    actionOrientation: "Highest signal on bias-for-action. Converts ambiguity into forward motion.",
    perseverance:      "Highest signal on grit. Stays with hard problems and surfaces workarounds."
  };

  var POS_SUMMARY = {
    accountability:    "You consistently took ownership of outcomes and closed the loop rather than waiting for others.",
    actionOrientation: "You showed a clear bias for action, converting ambiguity into forward motion.",
    perseverance:      "You stayed with hard problems and found paths through — a reliable signal of grit."
  };

  var POSITIVE_BULLETS = [
    "You demonstrated strong problem-solving persistence throughout the mission.",
    "Your approach shows initiative and a focus on steady progress.",
    "You made choices with care — not in a hurry, not in a freeze."
  ];

  // Three-line candidate narrative per BARS band (L1–L4).
  // Shown on the candidate's final report. Tone is always positive + growth-oriented.
  var BARS_DESCRIPTION = {
    1: [
      "You thrive when the path is clear and the plan is set — structure gives you confidence.",
      "Your next growth edge: taking the first step before someone else maps it for you.",
      "Every senior operator started here — this is where your momentum begins."
    ],
    2: [
      "You're building reliable execution — taking initiative where the path is visible, asking for help when it isn't.",
      "Your growth signal: turning 'I did my part' into 'I owned the outcome'.",
      "A few courageous calls away from the next tier of operators."
    ],
    3: [
      "You complete what you start — teams can trust you to see tickets through to done.",
      "Your next signature move: anticipate blockers before they land, close loops without being asked.",
      "You're already an operator others want to pair with."
    ],
    4: [
      "You own outcomes end-to-end, removing ambiguity and lifting the team with you.",
      "Your instinct is to turn uncertainty into motion, and you stay with hard problems longer than most.",
      "Ready for stretch scope, cross-functional ownership, and mentorship."
    ]
  };

  /* ---------- MOCK CANDIDATES ---------- */

  var mockCandidates = [
    { id: "c-1", name: "Ananya Sharma", date: "2026-04-18", score: 3.52, level: 4, status: "Shortlisted",
      dims: { accountability: 3.67, actionOrientation: 3.50, perseverance: 3.25 },
      meta: { avgResponseMs: 5400, fastCount: 1, consistencyFlag: false, flags: [] } },
    { id: "c-2", name: "Rohan Mehta",   date: "2026-04-19", score: 2.92, level: 3, status: "Reviewed",
      dims: { accountability: 3.00, actionOrientation: 3.00, perseverance: 2.50 },
      meta: { avgResponseMs: 6200, fastCount: 0, consistencyFlag: false, flags: [] } },
    { id: "c-3", name: "Priya Nair",    date: "2026-04-20", score: 2.18, level: 2, status: "Pending",
      dims: { accountability: 2.33, actionOrientation: 2.00, perseverance: 2.00 },
      meta: { avgResponseMs: 7800, fastCount: 0, consistencyFlag: true,
              flags: [{ key:"aspirationalBias", label:"Aspirational Bias", severity:"amber",
                        detail:"Level 4 self-concept rated high while Level 1 tactical behavior trended low." }] } },
    { id: "c-4", name: "Kabir Shah",    date: "2026-04-21", score: 3.78, level: 4, status: "Shortlisted",
      dims: { accountability: 4.00, actionOrientation: 3.67, perseverance: 3.50 },
      meta: { avgResponseMs: 4100, fastCount: 2, consistencyFlag: false,
              flags: [{ key:"alwaysHighest", label:"Always-Highest Pattern", severity:"amber",
                        detail:"Every Level 1 choice was the top-scoring option. Probe for social-desirability bias." }] } },
    { id: "c-5", name: "Meera Iyer",    date: "2026-04-21", score: 1.88, level: 2, status: "Pending",
      dims: { accountability: 2.00, actionOrientation: 2.00, perseverance: 1.50 },
      meta: { avgResponseMs: 9100, fastCount: 0, consistencyFlag: false, flags: [] } }
  ];

  /* ---------- SCORING ENGINE ---------- */

  function computeResults(l1, l2, l3, l4) {
    // Collect dimension levels (primary "most" picks)
    var byDim = { accountability: [], actionOrientation: [], perseverance: [] };
    var bonus   = { accountability: 0, actionOrientation: 0, perseverance: 0 };
    var penalty = { accountability: 0, actionOrientation: 0, perseverance: 0 };

    l1.forEach(function (a) {
      if (!byDim[a.dimension]) return;
      byDim[a.dimension].push(a.level);
    });
    // L2 Character Mirror — mostLikely contributes, leastLikely adjusts bonus/penalty
    l2.forEach(function (a) {
      if (a.mostLikely && byDim[a.mostLikely.dimension]) {
        byDim[a.mostLikely.dimension].push(a.mostLikely.level);
      }
      if (a.leastLikely && byDim[a.leastLikely.dimension]) {
        if (a.leastLikely.level === 2) bonus[a.leastLikely.dimension]   += CONSTANTS.MIRROR_LEAST_BONUS;
        if (a.leastLikely.level === 4) penalty[a.leastLikely.dimension] += CONSTANTS.MIRROR_LEAST_PENALTY;
      }
    });
    l3.forEach(function (a) { if (byDim[a.dimension]) byDim[a.dimension].push(a.rankings[0].level); });
    l4.forEach(function (a) { if (byDim[a.dimension]) byDim[a.dimension].push(a.level); });

    var dimScores = {};
    Object.keys(byDim).forEach(function (k) {
      var arr = byDim[k];
      if (!arr.length) { dimScores[k] = 0; return; }
      var base = arr.reduce(function (s, n) { return s + n; }, 0) / arr.length;
      dimScores[k] = Math.max(1, Math.min(4, base + bonus[k] - penalty[k]));
    });

    var finalScore =
      dimScores.accountability * 0.40 +
      dimScores.actionOrientation * 0.35 +
      dimScores.perseverance * 0.25;

    var level;
    if      (finalScore >= 3.25) level = 4;
    else if (finalScore >= 2.50) level = 3;
    else if (finalScore >= 1.75) level = 2;
    else                          level = 1;

    /* ---------- VALIDATION FLAGS ---------- */
    var flags = [];

    // Mirror Match / Aspirational Bias
    if (l4.length && l1.length) {
      var l4Avg = l4.reduce(function (s, a) { return s + a.level; }, 0) / l4.length;
      var l1Avg = l1.reduce(function (s, a) { return s + a.level; }, 0) / l1.length;
      if (l4Avg >= 3.5 && l1Avg <= 2.25) {
        flags.push({
          key: "aspirationalBias",
          label: "Aspirational Bias",
          severity: "amber",
          detail: "Level 4 self-concept rated high while Level 1 tactical behavior trended low. Self-perception exceeds observed behavior."
        });
      }
    }

    // Consistency Gap (rank-order deprioritizes L4 while L1 was strong)
    l3.forEach(function (a) {
      var last = a.rankings[a.rankings.length - 1];
      if (last.level === 4) {
        var match = l1.find(function (x) { return x.dimension === a.dimension; });
        if (match && match.level >= 3) {
          flags.push({
            key: "consistencyGap",
            label: "Consistency Gap",
            severity: "amber",
            detail: "Phase 3 ranking deprioritized a Level 4 behavior while Phase 1 tactical behavior in the same dimension was strong."
          });
        }
      }
    });

    // Always-Highest pattern
    if (l1.length >= 4 && l1.every(function (a) { return a.level === 4; })) {
      flags.push({
        key: "alwaysHighest",
        label: "Always-Highest Pattern",
        severity: "amber",
        detail: "Every Level 1 choice was the top-scoring option. May indicate social-desirability bias or gaming the test."
      });
    }

    // Strongest / weakest
    var entries = Object.keys(dimScores).map(function (k) { return [k, dimScores[k]]; }).filter(function (e) { return e[1] > 0; });
    var strongest = entries.slice().sort(function (a, b) { return b[1] - a[1]; })[0][0];
    var weakest   = entries.slice().sort(function (a, b) { return a[1] - b[1]; })[0][0];

    // Latency signals
    var times = [];
    [l1, l2, l3, l4].forEach(function (arr) { arr.forEach(function (a) { if (a.responseMs) times.push(a.responseMs); }); });
    var avgResponseMs = times.length ? Math.round(times.reduce(function (s, n) { return s + n; }, 0) / times.length) : 0;
    var fastCount     = times.filter(function (t) { return t > 0 && t < 3000; }).length;

    return {
      dimScores: dimScores,
      finalScore: finalScore,
      level: level,
      flags: flags,
      strongest: strongest,
      weakest: weakest,
      meta: {
        avgResponseMs: avgResponseMs,
        fastCount: fastCount,
        consistencyFlag: flags.some(function (f) { return f.key === "consistencyGap" || f.key === "aspirationalBias"; }),
        flags: flags
      }
    };
  }

  /* ---------- PERSISTENCE (localStorage) ---------- */

  var STORAGE_KEY = "catalyst:candidates";

  function loadSavedCandidates() {
    try {
      var raw = window.localStorage && window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) { return []; }
  }

  function saveCandidate(candidate) {
    try {
      if (!window.localStorage) return;
      var existing = loadSavedCandidates();
      var filtered = existing.filter(function (c) { return c.id !== candidate.id; });
      filtered.unshift(candidate);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (_) {}
  }

  function clearSavedCandidates() {
    try { if (window.localStorage) window.localStorage.removeItem(STORAGE_KEY); } catch (_) {}
  }

  // Merge stored candidates ahead of built-in mocks (dedupe by id).
  function mergeCandidates(stored, mocks) {
    var storedIds = {};
    (stored || []).forEach(function (c) { storedIds[c.id] = true; });
    var fromMocks = (mocks || []).filter(function (c) { return !storedIds[c.id]; });
    return (stored || []).concat(fromMocks);
  }

  /* ---------- HOOKS ---------- */

  function useCountUp(target, duration, start) {
    var st = React.useState(0);
    var v = st[0], setV = st[1];
    React.useEffect(function () {
      if (start === false) return;
      var t0 = performance.now();
      var raf;
      var step = function (now) {
        var p = Math.min(1, (now - t0) / (duration || 1400));
        var eased = 1 - Math.pow(1 - p, 3);
        setV(target * eased);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      return function () { cancelAnimationFrame(raf); };
    }, [target, duration, start]);
    return v;
  }

  /* ---------- EXPORT ---------- */

  global.CatalystCore = {
    L1: L1, L2: L2, L3: L3, L4: L4,
    CONSTANTS: CONSTANTS,
    DIMENSION_LABEL: DIMENSION_LABEL,
    LEVEL_META: LEVEL_META,
    FINAL_LEVEL_META: FINAL_LEVEL_META,
    LEVEL_SUMMARY: LEVEL_SUMMARY,
    DEV_TIP: DEV_TIP,
    STRENGTH_NOTE: STRENGTH_NOTE,
    POS_SUMMARY: POS_SUMMARY,
    POSITIVE_BULLETS: POSITIVE_BULLETS,
    mockCandidates: mockCandidates,
    BARS_DESCRIPTION: BARS_DESCRIPTION,
    computeResults: computeResults,
    useCountUp: useCountUp,
    loadSavedCandidates: loadSavedCandidates,
    saveCandidate: saveCandidate,
    clearSavedCandidates: clearSavedCandidates,
    mergeCandidates: mergeCandidates
  };
})(window);

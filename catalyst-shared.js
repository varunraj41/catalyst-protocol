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

  // LEVEL 1 · Execution Lab — 6 SJT scenarios, 4 options each (BARS 1–4 spread).
  // Options are shuffled per-scenario at render time (see shuffleOptions helper).
  var L1 = [
    {
      id: "L1-1", dimension: "accountability",
      title: "The Vanishing Stakeholder",
      prompt: "It is 4:00 PM. A critical project release is set for 5:00 PM. You need a final sign-off from a stakeholder who has suddenly gone offline and isn't answering calls.",
      options: [
        { id: "a", text: "I will not put much pressure — I'll wait for them to come back online. We cannot risk an unapproved release.", level: 1 },
        { id: "b", text: "I'll send a final 'Urgent' email to the stakeholder and alert my manager that the delay is due to the stakeholder's absence.", level: 2 },
        { id: "c", text: "I'll review their previous requirements, proceed with the release, and send a summary of why I moved forward.", level: 3 },
        { id: "d", text: "I'll get a verbal 'go' from their deputy or a peer with authority, document the risk, and ensure the release happens by 5:00 PM.", level: 4 }
      ]
    },
    {
      id: "L1-2", dimension: "actionOrientation",
      title: "The Resource Crunch",
      prompt: "Your lead developer's system just crashed. 20% of the project is locked in that machine, and the client is expecting delivery in two hours.",
      options: [
        { id: "a", text: "I'll inform the client that we have a technical failure and will resume as soon as the system is fixed.", level: 1 },
        { id: "b", text: "I'll tell the developer to let me know the moment the laptop is fixed so we can start work immediately.", level: 2 },
        { id: "c", text: "I'll ask the developer to work on manual documentation while I look for a spare laptop in the office.", level: 3 },
        { id: "d", text: "I'll take the lead to re-assign the remaining 20% of the tasks to other team members to ensure we hit the target today.", level: 4 }
      ]
    },
    {
      id: "L1-3", dimension: "actionOrientation",
      title: "The Empty Brief",
      prompt: "You are tasked with launching a new initiative, but the project brief is extremely vague and your manager is too busy to provide a detailed walkthrough.",
      options: [
        { id: "a", text: "I usually wait for a formal briefing or more detailed instructions to avoid making any costly mistakes.", level: 1 },
        { id: "b", text: "I spend time researching past projects to find a template or guide before I feel comfortable starting.", level: 2 },
        { id: "c", text: "I schedule short 5-minute stand-ups with team members to piece together the requirements and build a roadmap.", level: 3 },
        { id: "d", text: "I create a rough 'Version 1.0' draft immediately and present it to stakeholders to force a reaction and gain clarity through iteration.", level: 4 }
      ]
    },
    {
      id: "L1-4", dimension: "accountability",
      title: "The Critical Data Gap",
      prompt: "You realize a colleague made a significant error in a report sent to a client an hour ago. Your colleague has just left for a week-long vacation.",
      options: [
        { id: "a", text: "I'll wait for the colleague to return — they're the one who can explain the logic, and it doesn't look nice to intervene on their work while they're away.", level: 1 },
        { id: "b", text: "I'll alert my supervisor to the error so they know it wasn't my mistake, and wait for their guidance.", level: 2 },
        { id: "c", text: "I'll send a polite update to the client acknowledging the error and promising a corrected version with a timeline.", level: 3 },
        { id: "d", text: "I'll re-calculate the data myself immediately, send the corrected report to the client with an apology, and brief my colleague later.", level: 4 }
      ]
    },
    {
      id: "L1-5", dimension: "perseverance",
      title: "The Impossible Target",
      prompt: "Think of a time you were given a target the rest of the team felt was impossible within the timeframe. If you haven't faced this exact situation, imagine it — and respond with your natural instinct.",
      options: [
        { id: "a", text: "I focused on doing my specific part reliably but prepared stakeholders for a likely 'near-miss' on the final goal.", level: 1 },
        { id: "b", text: "I worked hard during office hours but suggested to the lead that the target be reassessed to a more realistic level.", level: 2 },
        { id: "c", text: "I identified the biggest bottlenecks and put in extra hours to clear them, ensuring we got as close to the target as possible.", level: 3 },
        { id: "d", text: "I looked for unconventional process hacks to bypass obstacles and kept the team energized until the 'impossible' goal was met.", level: 4 }
      ]
    },
    {
      id: "L1-6", dimension: "perseverance",
      title: "The Recurring Obstacle",
      prompt: "You are working on a complex technical task that has failed three times already due to minor, unpredictable bugs. Your energy is dipping.",
      options: [
        { id: "a", text: "I'll ask for the task to be re-assigned to someone with a fresh set of eyes to avoid further delays.", level: 1 },
        { id: "b", text: "I'll document the three failures and ask for a technical consult before trying a fourth time.", level: 2 },
        { id: "c", text: "I'll take a short break to reset, then methodically re-check the entire logic from scratch before attempting it again.", level: 3 },
        { id: "d", text: "I'll analyze the failure patterns, create a new quality checklist, and stay with the task until it is successfully completed.", level: 4 }
      ]
    }
  ];

  /* ---------- LEVEL 2 — Behavioral Monitoring (Avatar + Basket) ---------- */

  // LEVEL 2 — The Character Mirror (Identity Projection)
  // 9 cards: 3 per dimension (BARS 2 / 3 / 4). Candidate marks each card as
  // "More Like Me" or "Less Like Me" (or skips). Deck is shuffled with a
  // balance constraint: no 3 same-dimension cards in a row.
  // Avatar is chosen before the briefing — Alex or Avantika — and the card
  // texts are filled via {NAME}/{he}/{his}/... placeholders.
  var L2 = [
    {
      id: "L2-mirror",
      avatars: [
        { id: "alex",     name: "Alex",     emoji: "🧑‍💼", role: "High-performing Lead", subj: "he",  obj: "him", poss: "his", refl: "himself" },
        { id: "avantika", name: "Avantika", emoji: "👩‍💼", role: "High-performing Lead", subj: "she", obj: "her", poss: "her", refl: "herself" }
      ],
      briefingTpl: "Meet {NAME}, a high-performing lead. In this section, you will see how {NAME} handles various work situations and the logic behind those actions. Your task is to decide: is this 'More Like Me' or 'Less Like Me'? There are no right or wrong styles — we're building a map of your unique execution signature.",
      instruction: "You'll see 9 cards (3 per dimension). For each, tap More Like Me or Less Like Me. Skips are allowed.",
      cards: [
        // Action Orientation × 3
        { id: "a2", dimension: "actionOrientation", level: 2,
          text: "{NAME} prefers to wait for a finalized project brief from the manager before starting, as {he} believes executing without a clear plan is a waste of resources." },
        { id: "a3", dimension: "actionOrientation", level: 3,
          text: "{NAME} spends significant time in the planning phase to anticipate risks, believing that a cautious start leads to a smoother finish." },
        { id: "a4", dimension: "actionOrientation", level: 4,
          text: "{NAME} launches projects with a 'rough draft' because {he} believes real-world feedback is more valuable than a perfect initial plan." },
        // Accountability × 3
        { id: "b2", dimension: "accountability", level: 2,
          text: "{NAME} focuses strictly on {his} own assigned tasks, believing that if everyone does their individual part perfectly, the team will succeed." },
        { id: "b3", dimension: "accountability", level: 3,
          text: "{NAME} takes full responsibility for {his} own errors and fixes them immediately, ensuring {his} work never delays the rest of the team." },
        { id: "b4", dimension: "accountability", level: 4,
          text: "{NAME} stays late to fix a teammate's error because {he} feels the final client outcome is {his} personal responsibility, regardless of who made the mistake." },
        // Perseverance × 3
        { id: "c2", dimension: "perseverance", level: 2,
          text: "{NAME} likes to move on to new, exciting projects once the initial 'logic' is solved, believing {his} best value is in fresh problem-solving rather than routine execution." },
        { id: "c3", dimension: "perseverance", level: 3,
          text: "{NAME} sets personal weekly milestones to keep {refl} motivated while working on long-term, repetitive projects." },
        { id: "c4", dimension: "perseverance", level: 4,
          text: "{NAME} prefers to stay on a complex, repetitive task for months because {he} finds deep satisfaction in seeing a difficult problem through to the end." }
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
    L1_TIMER: 20,                  // 20s per L1 scenario
    L2_CARD_TIMER: 15,             // 15s per Character-Mirror card
    L3_TIMER: 25,                  // 25s for ranking
    L4_TIMER: 20,                  // 20s per Mastermind question
    TRANSITION_MS: 1500,
    LOG_MS: 650,
    MIRROR_LEAST_BONUS: 0.2,       // Bonus if BARS-2 card marked Less Like Me
    MIRROR_LEAST_PENALTY: 0.3,     // Penalty if BARS-4 card marked Less Like Me
    LOW_URGENCY_THRESHOLD_MS: 16000, // Flag low urgency if Action-Orientation L1 response > 16s
    STORAGE_TTL_MS: 24 * 60 * 60 * 1000 // Candidate localStorage entries expire after 24 hours
  };

  /* ---------- META ---------- */

  var DIMENSION_LABEL = {
    accountability:    "Ownership & Accountability",
    actionOrientation: "Action Orientation",
    perseverance:      "Perseverance"
  };

  var LEVEL_META = {
    1: { key: "explorer",   title: "The Execution Lab",    tag: "EXPLORER",   sub: "Tactical Response",
         blurb: "React under pressure. Six scenarios probe your tactical instincts across the three drivers.",
         narrative: "You are about to enter a high-fidelity simulation of real-world professional challenges. Each scenario comes with four distinct actions — each one valid, each one mapped to a different behavioral attribute. Trust your first instinct.",
         guidelines: [
           "No right or wrong answers — every option is evaluated through multiple lenses.",
           "Authenticity over strategy — pick what you'd actually do in the moment.",
           "Decisiveness matters — your selections build a high-precision map of your execution signature."
         ]
       },
    2: { key: "observer",   title: "The Character Mirror", tag: "OBSERVER",   sub: "Behavioral Monitoring",
         blurb: "Meet Alex or Avantika. Nine cards reveal whether each move is More or Less Like You.",
         narrative: "Meet your character. Watch how they handle various work situations. Decide whether each move is More Like You or Less Like You." },
    3: { key: "strategist", title: "The Strategist",       tag: "STRATEGIST", sub: "Decision & Prioritization",
         blurb: "Resources are scarce. Rank three priorities from top to bottom across three puzzles.",
         narrative: "Resources are limited. Rank your priorities from highest to lowest." },
    4: { key: "mastermind", title: "The Mastermind",       tag: "MASTERMIND", sub: "Self-Concept & Motivation",
         blurb: "Look inward. Three reflections map what really drives your focus and follow-through.",
         narrative: "Look inward. Which statement truly describes your drive?" }
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
    // L2 Character Mirror — per-card "more" / "less" decisions across 9 cards
    l2.forEach(function (a) {
      (a.decisions || []).forEach(function (d) {
        if (!d || !byDim[d.dimension]) return;
        if (d.decision === "most") {
          byDim[d.dimension].push(d.level);
        } else if (d.decision === "least") {
          if (d.level === 2) bonus[d.dimension]   += CONSTANTS.MIRROR_LEAST_BONUS;
          if (d.level === 4) penalty[d.dimension] += CONSTANTS.MIRROR_LEAST_PENALTY;
        }
      });
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

    // Social Desirability Bias (L2 Character Mirror):
    // If the user marked BOTH the BARS-2 and BARS-4 cards of the SAME dimension
    // as "More Like Me", these positions are contradictory (cautious vs. bold)
    // and signal aspirational/socially-desirable responding.
    l2.forEach(function (a) {
      var mostLevelsByDim = {};
      (a.decisions || []).forEach(function (d) {
        if (!d || d.decision !== "most") return;
        (mostLevelsByDim[d.dimension] = mostLevelsByDim[d.dimension] || {})[d.level] = true;
      });
      var contradictoryDims = Object.keys(mostLevelsByDim).filter(function (k) {
        return mostLevelsByDim[k][2] && mostLevelsByDim[k][4];
      });
      if (contradictoryDims.length > 0) {
        flags.push({
          key: "socialDesirability",
          label: "Social Desirability Bias",
          severity: "amber",
          detail: "In the Character Mirror the candidate identified with BOTH the cautious (BARS-2) and bold (BARS-4) positions in the same dimension(s): " + contradictoryDims.join(", ") + ". These stances are contradictory; responses may favour desirability over authenticity."
        });
      }
    });

    // Low Urgency (Level 1 Action-Orientation items):
    // If the candidate spent more than LOW_URGENCY_THRESHOLD_MS on an
    // Action-Orientation scenario, flag regardless of the eventual pick.
    var slowActionItems = l1.filter(function (a) {
      return a.dimension === "actionOrientation" && a.responseMs && a.responseMs > CONSTANTS.LOW_URGENCY_THRESHOLD_MS && !a.auto;
    });
    if (slowActionItems.length > 0) {
      flags.push({
        key: "lowUrgency",
        label: "Low Urgency Signal",
        severity: "info",
        detail: "Candidate spent >" + (CONSTANTS.LOW_URGENCY_THRESHOLD_MS / 1000) + "s on " + slowActionItems.length + " Action-Orientation scenario(s). Stated urgency may exceed observed urgency."
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

  /* ---------- SHUFFLE + TEMPLATE HELPERS ---------- */

  function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  // Fisher-Yates shuffle with rejection: re-shuffle if >maxRun cards share
  // the same dimension consecutively. Used for the 9-card Character Mirror deck.
  function shuffleBalanced(cards, maxRun) {
    maxRun = maxRun || 2;
    var attempts = 0;
    while (attempts < 30) {
      var a = shuffleArray(cards);
      var run = 1, ok = true;
      for (var i = 1; i < a.length; i++) {
        if (a[i].dimension === a[i-1].dimension) {
          run++;
          if (run > maxRun) { ok = false; break; }
        } else run = 1;
      }
      if (ok) return a;
      attempts++;
    }
    return cards.slice();
  }

  // Fill {NAME}/{he}/{his}/{him}/{refl} placeholders from the avatar object.
  function fillAvatar(tpl, avatar) {
    if (!tpl || !avatar) return tpl || "";
    var sub = {
      NAME: avatar.name,
      he:   avatar.subj,
      him:  avatar.obj,
      his:  avatar.poss,
      refl: avatar.refl
    };
    return String(tpl).replace(/\{(\w+)\}/g, function (_, k) {
      return (sub[k] !== undefined) ? sub[k] : "";
    });
  }

  /* ---------- PERSISTENCE (localStorage) ---------- */

  var STORAGE_KEY = "catalyst:candidates";

  function loadSavedCandidates() {
    try {
      var raw = window.localStorage && window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      // 24-hour TTL — drop stale entries and persist the cleaned list back.
      var cutoff = Date.now() - CONSTANTS.STORAGE_TTL_MS;
      var fresh = parsed.filter(function (c) { return !c.savedAt || c.savedAt > cutoff; });
      if (fresh.length !== parsed.length && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      }
      return fresh;
    } catch (_) { return []; }
  }

  function saveCandidate(candidate) {
    try {
      if (!window.localStorage) return;
      var entry = Object.assign({}, candidate, { savedAt: Date.now() });
      var existing = loadSavedCandidates();
      var filtered = existing.filter(function (c) { return c.id !== entry.id; });
      filtered.unshift(entry);
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
    mergeCandidates: mergeCandidates,
    shuffleArray: shuffleArray,
    shuffleBalanced: shuffleBalanced,
    fillAvatar: fillAvatar
  };
})(window);

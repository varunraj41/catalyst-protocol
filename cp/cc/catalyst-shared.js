/* =====================================================================
   CATALYST CORE · Shared Logic Engine
   ---------------------------------------------------------------------
   Plain JavaScript (no JSX). Loaded as <script src="catalyst-shared.js">.
   Exposes window.CatalystCore with all data, scoring, constants, and
   hooks consumed by BOTH UI implementations (adventure.html, mission.html).
   The Manager dashboard is also data-shared but each UI renders it with
   the same professional Inter styling.
===================================================================== */
(function (global) {
  "use strict";

  /* ---------- LEVEL DATA ---------- */

  var L1 = [
    {
      id: "p1s1", dimension: "accountability",
      bot: "The deployment alarms are sounding — your last commit may have broken smoke tests. QA is ready to rollback immediately. Choose your move.",
      options: [
        { text: "Tell QA to rollback. I'll review logs after the environment stabilizes.", level: 2 },
        { text: "Hold the rollback. I'm checking my local env now — update in 5 mins.", level: 3 },
        { text: "I'll reproduce it locally, push a hotfix, and run targeted tests before deciding on rollback.", level: 4 }
      ]
    },
    {
      id: "p1s2", dimension: "actionOrientation",
      bot: "API docs for your next quest won't be ready for 4 hours. Your Team Lead says you can wait — or start early.",
      options: [
        { text: "I'll wait — coding without docs wastes effort.", level: 1 },
        { text: "I'll set up boilerplate and mock interfaces so I'm ready when docs land.", level: 3 },
        { text: "I'll scaffold the module, identify critical unknowns, and draft clarification questions to speed things up.", level: 4 }
      ]
    },
    {
      id: "p1s3", dimension: "perseverance",
      bot: "You've been battling a logic bug for 3 hours. Sprint deadline in 2 hours. The system needs you.",
      options: [
        { text: "Escalate to senior dev immediately to avoid missing sprint.", level: 2 },
        { text: "Take a 5-min break, then try a completely different debugging approach.", level: 3 },
        { text: "Fix it, then add a Wiki note so the team avoids this specific error in future.", level: 4 }
      ]
    }
  ];

  var L2 = [
    {
      id: "p2s1", dimension: "accountability",
      situation: "You spot a minor edge-case flaw in your code after it's already merged to Staging. Arrange your next moves from highest to lowest priority.",
      options: [
        { text: "Wait for QA to flag it — if they miss it, it's probably not critical.", level: 1 },
        { text: "Create a follow-up ticket and inform the lead; fix it next sub-sprint.", level: 2 },
        { text: "Fix it now and push a patch immediately — keep Staging pristine.", level: 4 }
      ]
    },
    {
      id: "p2s2", dimension: "actionOrientation",
      situation: "A critical feature is needed urgently. Order your approach from highest to lowest priority.",
      options: [
        { text: "Defer until quality can be guaranteed, even if deadline slips.", level: 2 },
        { text: "Ship a minimal viable version with known risks; plan a follow-up patch.", level: 3 },
        { text: "Pause non-critical work, reallocate focus, and deliver with full tests.", level: 4 }
      ]
    }
  ];

  var L3 = [
    {
      id: "p3q1", dimension: "accountability",
      question: "Why would you fix a self-discovered bug immediately rather than waiting for QA?",
      options: [
        { text: "I own the outcome. An open bug in Staging is my responsibility.", level: 4 },
        { text: "Team process requires it — open bugs on Staging get flagged.", level: 2 }
      ]
    },
    {
      id: "p3q2", dimension: "actionOrientation",
      question: "Why do you start boilerplate work while waiting for missing docs?",
      options: [
        { text: "I don't want to waste sprint time — I'll adjust details when specs arrive.", level: 3 },
        { text: "I want the lead to see I'm proactive and not blocked.", level: 2 }
      ]
    },
    {
      id: "p3q3", dimension: "perseverance",
      question: "What drives you to stay with a bug past 2 hours instead of escalating?",
      options: [
        { text: "I feel personally responsible for the ticket — it's not done until it's done.", level: 4 },
        { text: "I don't want to look like I give up easily in front of the team.", level: 2 }
      ]
    }
  ];

  /* ---------- CONSTANTS ---------- */

  var CONSTANTS = {
    L1_TIMER: 12,
    L2_TIMER: 20,
    TRANSITION_MS: 1500,
    LOG_MS: 700
  };

  /* ---------- META ---------- */

  var DIMENSION_LABEL = {
    accountability:    "Ownership & Accountability",
    actionOrientation: "Action Orientation",
    perseverance:      "Perseverance"
  };

  var LEVEL_META = {
    1: { key: "explorer",   title: "The Explorer",   tag: "EXPLORER",   sub: "Action · Perseverance",        narrative: "You have entered a system under stress. Respond quickly to stabilize it." },
    2: { key: "strategist", title: "The Strategist", tag: "STRATEGIST", sub: "Decision · Accountability",    narrative: "Resources are limited. Prioritize the right actions to succeed." },
    3: { key: "mastermind", title: "The Mastermind", tag: "MASTERMIND", sub: "Ownership · Motivation",       narrative: "Reflect on your decisions and explain your strategy." }
  };

  var FINAL_LEVEL_META = {
    1: { name: "Emerging",    accent: "#ef4444" },
    2: { name: "Developing",  accent: "#f59e0b" },
    3: { name: "Effective",   accent: "#3b82f6" },
    4: { name: "Exceptional", accent: "#10b981" }
  };

  var LEVEL_SUMMARY = {
    1: "Hesitates under pressure; defers decisions and minimizes personal exposure. Foundational coaching on initiative recommended.",
    2: "Emerging awareness of accountability; still leans on team structure. Developing but not yet consistently proactive.",
    3: "Completes what they start; takes reasonable initiative and drives tickets to done. Next edge: anticipate blockers.",
    4: "Drives outcomes end-to-end; removes ambiguity, owns edge cases, accelerates the team. Ready for stretch scope."
  };

  var DEV_TIP = {
    accountability:    "Treat self-discovered issues as yours to resolve before handoff. Close the loop proactively rather than waiting for QA.",
    actionOrientation: "When blocked, scaffold what you can, isolate unknowns, draft clarification questions. Never let sprint time go idle.",
    perseverance:      "Before escalating, switch approach — binary-search, new hypothesis, fresh logs. Document recovered defects."
  };

  var STRENGTH_NOTE = {
    accountability:    "Highest signal on ownership. Likely to own outcomes end-to-end without prompting.",
    actionOrientation: "Highest signal on bias-for-action. Converts ambiguity into forward motion quickly.",
    perseverance:      "Highest signal on grit. Stays with problems longer than peers and surfaces workarounds."
  };

  var POS_SUMMARY = {
    accountability:    "You consistently took ownership of outcomes and closed the loop rather than waiting for others to surface issues.",
    actionOrientation: "You showed a clear bias for action, converting ambiguity into forward motion even when inputs were incomplete.",
    perseverance:      "You stayed with hard problems and found paths through — a reliable signal of grit and follow-through."
  };

  var POSITIVE_BULLETS = [
    "You demonstrated strong problem-solving persistence throughout the mission.",
    "Your approach shows initiative and a focus on steady progress.",
    "You made choices with care — not in a hurry, not in a freeze."
  ];

  /* ---------- MOCK CANDIDATES (manager dashboard seed) ---------- */

  var mockCandidates = [
    { id: "c-1", name: "Ananya Sharma", date: "2026-04-18", score: 3.52, level: 4, status: "Shortlisted",
      dims: { accountability: 3.67, actionOrientation: 3.50, perseverance: 3.25 },
      meta: { avgResponseMs: 5400, fastCount: 1, consistencyFlag: false } },
    { id: "c-2", name: "Rohan Mehta",   date: "2026-04-19", score: 2.92, level: 3, status: "Reviewed",
      dims: { accountability: 3.00, actionOrientation: 3.00, perseverance: 2.50 },
      meta: { avgResponseMs: 6200, fastCount: 0, consistencyFlag: false } },
    { id: "c-3", name: "Priya Nair",    date: "2026-04-20", score: 2.18, level: 2, status: "Pending",
      dims: { accountability: 2.33, actionOrientation: 2.00, perseverance: 2.00 },
      meta: { avgResponseMs: 7800, fastCount: 0, consistencyFlag: true  } },
    { id: "c-4", name: "Kabir Shah",    date: "2026-04-21", score: 3.78, level: 4, status: "Shortlisted",
      dims: { accountability: 4.00, actionOrientation: 3.67, perseverance: 3.50 },
      meta: { avgResponseMs: 4100, fastCount: 2, consistencyFlag: false } },
    { id: "c-5", name: "Meera Iyer",    date: "2026-04-21", score: 1.88, level: 2, status: "Pending",
      dims: { accountability: 2.00, actionOrientation: 2.00, perseverance: 1.50 },
      meta: { avgResponseMs: 9100, fastCount: 0, consistencyFlag: false } }
  ];

  /* ---------- SCORING ENGINE ---------- */

  function computeResults(p1, p2, p3) {
    var p2Scored = p2.map(function (a) {
      return { id: a.id, dimension: a.dimension, level: a.rankings[0].level, rankings: a.rankings };
    });
    var all = p1.concat(p2Scored).concat(p3);

    var byDim = {};
    all.forEach(function (a) { (byDim[a.dimension] = byDim[a.dimension] || []).push(a.level); });
    function avg(arr) { return arr.reduce(function (s, n) { return s + n; }, 0) / arr.length; }

    var dimScores = {
      accountability:    byDim.accountability    ? avg(byDim.accountability)    : 0,
      actionOrientation: byDim.actionOrientation ? avg(byDim.actionOrientation) : 0,
      perseverance:      byDim.perseverance      ? avg(byDim.perseverance)      : 0
    };

    var finalScore =
      dimScores.accountability    * 0.40 +
      dimScores.actionOrientation * 0.35 +
      dimScores.perseverance      * 0.25;

    var level;
    if      (finalScore >= 3.25) level = 4;
    else if (finalScore >= 2.50) level = 3;
    else if (finalScore >= 1.75) level = 2;
    else                          level = 1;

    var consistencyFlag = false;
    for (var i = 0; i < p2.length; i++) {
      var p2a = p2[i];
      var last = p2a.rankings[p2a.rankings.length - 1];
      if (last.level === 4) {
        var p1m = p1.find(function (x) { return x.dimension === p2a.dimension; });
        if (p1m && p1m.level >= 3) { consistencyFlag = true; break; }
      }
    }

    var entries = Object.keys(dimScores).map(function (k) { return [k, dimScores[k]]; }).filter(function (e) { return e[1] > 0; });
    var strongest = entries.slice().sort(function (a, b) { return b[1] - a[1]; })[0][0];
    var weakest   = entries.slice().sort(function (a, b) { return a[1] - b[1]; })[0][0];

    var allAnswered = p1.concat(p2Scored).concat(p3);
    var times = allAnswered.map(function (a) { return a.responseMs || 0; }).filter(Boolean);
    var avgResponseMs = times.length ? Math.round(times.reduce(function (s, n) { return s + n; }, 0) / times.length) : 0;
    var fastCount     = times.filter(function (t) { return t > 0 && t < 3000; }).length;

    return {
      dimScores: dimScores,
      finalScore: finalScore,
      level: level,
      consistencyFlag: consistencyFlag,
      strongest: strongest,
      weakest: weakest,
      meta: { avgResponseMs: avgResponseMs, fastCount: fastCount }
    };
  }

  /* ---------- HOOKS (requires React global) ---------- */

  function useCountUp(target, duration, start) {
    var useState  = React.useState;
    var useEffect = React.useEffect;
    var state = useState(0);
    var v = state[0], setV = state[1];
    useEffect(function () {
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

  /* ---------- HELPERS ---------- */

  function getInitialTheme(defaultTheme) {
    try {
      var params = new URLSearchParams(window.location.search);
      var t = (params.get("theme") || "").toLowerCase();
      if (t === "mission" || t === "mission-control") return "mission";
      if (t === "adventure" || t === "treasure" || t === "hunt") return "adventure";
    } catch (_) {}
    return defaultTheme || "adventure";
  }

  /* ---------- EXPORT ---------- */

  global.CatalystCore = {
    L1: L1, L2: L2, L3: L3,
    CONSTANTS: CONSTANTS,
    LEVEL_META: LEVEL_META,
    DIMENSION_LABEL: DIMENSION_LABEL,
    FINAL_LEVEL_META: FINAL_LEVEL_META,
    LEVEL_SUMMARY: LEVEL_SUMMARY,
    DEV_TIP: DEV_TIP,
    STRENGTH_NOTE: STRENGTH_NOTE,
    POS_SUMMARY: POS_SUMMARY,
    POSITIVE_BULLETS: POSITIVE_BULLETS,
    mockCandidates: mockCandidates,
    computeResults: computeResults,
    useCountUp: useCountUp,
    getInitialTheme: getInitialTheme
  };
})(window);

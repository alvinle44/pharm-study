# Exam 1 content spec (PHAR 131, PharmD) — read fully before writing

You are building study content for a pharmacy student's Exam 1. The exam is 50–60 questions, **NAPLEX and CPJE style, no reverse navigation**, covering weeks 1–7. Topic weights: Vaccines ≈ 40%; the rest split across BP, Adherence & health-care forms, PPCP (Collect & Assess + readings), Insulin/diabetes.

Instructor's stated scope:
- Vaccines: know "the big 7" inside and out, vaccine science, which ones are live, screening questions and what a YES means, how to read the CDC pediatric schedule (the schedule is given as an attachment on the exam), vaccine administration.
- BP: all info from lecture and lab.
- Dr. Patel's lecture on adherence and health-care forms.
- PPCP: lecture material from COLLECT and ASSESS, AND the assigned readings.
- Dr. Sharma's first lecture on insulin/diabetes and the insulin lab.

## How to read the sources
- Text extracts already exist in `/tmp/claude-0/-home-claude/2a13746e-cdeb-593e-a8d3-fcfccb20ebca/scratchpad/e1/*.txt`, but many slides are images, tables or have **handwritten/typed student annotations** — you MUST also look at the actual pages with the Read tool (`pages:` param, ≤20 pages per call) so you catch tables, figures, circled/highlighted items and handwritten notes. Original files are in `/root/.claude/uploads/2a13746e-cdeb-593e-a8d3-fcfccb20ebca/`.
- Use ONLY facts from the provided files. Do not add outside facts, except to fix an obvious typo (say so in `note`). If the source is ambiguous, keep the source's wording.
- Mark anything the slides emphasize (bold/red/"know this"/"exam"/boxed key points) or the student annotated with `s:1`; put the student's handwritten note text in `note`.

## Output: ONE JavaScript file you write at the path given in your task, containing exactly:
```js
E1_DATA.push({
  id: "<topic id>", name: "<tab name>", weight: <approx % of exam>,
  sources: ["<file name>", ...],
  guide: [ { t: "Section title", src: "file p.X–Y", pts: [ { x: "Point text, **bold** allowed", s: 0|1, note: "optional student note" } ] } ],
  cards: [ ["front question", "back answer (**bold** ok)", 0|1 /*star*/] ],
  mcq: [ {
     type: "single" | "multi" | "order" | "fill",
     q: "question stem (patient-case style where possible)",
     o: ["option", ...],     // single/multi: 4–6 options; order: items listed in the CORRECT order (app shuffles); fill: omit
     a: [indices],           // single: [i]; multi: all correct indices; order: omit; fill: omit
     n: 0.0, tol: 0.0,       // fill only: numeric answer and allowed +/- tolerance; also give "unit"
     w: "explanation: why the answer is right AND why the tempting wrong options are wrong",
     src: "file p.X"         // where the fact comes from
  } ]
});
```
Rules for questions:
- Write them like NAPLEX/CPJE: mostly patient-case vignettes ("A 67-year-old woman presents to the pharmacy…"), one best answer, plausible distractors, some "select all that apply" (multi), a few "order the steps" (order) for procedures, and calculations (fill) where the material has numbers (doses, units, BP categories, etc.).
- Vary which option is correct (don't cluster answers in one position).
- No "all of the above" / "none of the above".
- Every question must be answerable from the source material and the explanation must cite the reasoning.
- Strings must be valid JS (escape quotes; no raw line breaks inside strings). Use plain unicode (≥, ≤, °, µ) not HTML entities.
- After writing, run `node --check <yourfile>` and fix any error. Also run a quick node script that loads the file with `globalThis.E1_DATA=[]` and verifies: every single has exactly 1 answer, every multi has ≥2, indices in range, order has ≥3 items, fill has numeric n.

Your final message: a short summary — counts (guide sections, points, cards, questions by type), the main topics covered, anything in the sources you couldn't read or that seemed ambiguous, and any handwritten annotations you found.

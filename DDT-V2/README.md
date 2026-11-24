# DDT-V2

A small branching Q&A ("survey") prototype. Each answer determines the next
question; after ~20 questions the user lands on a results screen tailored to
their answers.

## Key properties

- **No persistence.** Answers live only in React state (`src/context/SurveyContext.jsx`).
  Nothing is written to a database, localStorage, or cookies — leaving or
  refreshing the page wipes everything.
- **Answers are reusable mid-survey.** Any stored answer (e.g. the user's
  name) can be interpolated into later question text with `{questionId}`
  placeholders, or used in branching logic.
- **USWDS.** All colors, fonts, spacing, and components come from
  [USWDS 3](https://designsystem.digital.gov/) via the `@uswds/uswds` package
  (precompiled CSS — no Sass pipeline).

## Running

```bash
npm install
npm run dev     # http://localhost:3004
```

## Editing the survey

The whole flow lives in `src/survey/questions.js`:

- `QUESTIONS` — a map of question id → question. `choice` questions branch
  via each option's `next`; `text` questions have a single `next`.
  `next: null` ends the survey.
- `getResults(answers)` — decides what the final screen shows.

The two questions currently in the file are placeholders demonstrating the
engine; replace them with the real flow.

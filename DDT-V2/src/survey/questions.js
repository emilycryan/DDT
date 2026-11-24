/**
 * Branching survey definition.
 *
 * Each question:
 *   id       unique key; the user's answer is stored under this key
 *   type     'text' (free input) or 'choice' (radio-style options)
 *   question text shown to the user; "{name}" is replaced with the
 *            answer stored under the 'name' question id
 *   next     (text questions) id of the next question, or null to finish
 *   options  (choice questions) [{ label, value, next }] — each answer
 *            decides the next question; next: null ends the survey
 *
 * The real ~20-question flow goes here. The two entries below are
 * placeholders so the engine is wired end to end.
 */

export const FIRST_QUESTION_ID = 'name'

export const QUESTIONS = {
  name: {
    id: 'name',
    type: 'text',
    question: 'First, what should we call you?',
    next: 'looking_for',
  },
  looking_for: {
    id: 'looking_for',
    type: 'choice',
    question: 'Nice to meet you, {name}. Who are you exploring support for today?',
    options: [
      { label: 'Myself', value: 'self', next: null },
      { label: 'Someone I care about', value: 'other', next: null },
      { label: 'Just curious', value: 'curious', next: null },
    ],
  },
}

/**
 * Decide what the results screen shows, based on the collected answers.
 * Placeholder logic for now — replace with the real recommendation rules.
 */
export function getResults(answers) {
  return {
    heading: answers.name ? `Thanks, ${answers.name}!` : 'Thanks!',
    body: 'Recommendation logic goes here, driven by the answers collected during the survey.',
    answers,
  }
}

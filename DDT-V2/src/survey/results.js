import { buildCtx } from './questions.js'

/**
 * Placeholder program inventory, from the deck's "Key Lifestyle Change
 * Interventions Supported" slide. Condition tags drive the filtering;
 * the real inventory and tag set come later.
 */
export const PROGRAMS = [
  {
    id: 'national_dpp',
    name: 'National Diabetes Prevention Program (National DPP)',
    division: 'Division of Diabetes Translation',
    conditions: ['prediabetes'],
    description:
      'A year-long lifestyle change program proven to prevent or delay type 2 diabetes.',
  },
  {
    id: 'dsmes',
    name: 'Diabetes Self-Management Education and Support (DSMES)',
    division: 'Division of Diabetes Translation',
    conditions: ['diabetes'],
    description:
      'Helps people with diabetes learn the skills to manage their condition day to day.',
  },
  {
    id: 'cardiac_rehab',
    name: 'Cardiac Rehabilitation',
    division: 'Division for Heart Disease and Stroke Prevention',
    conditions: ['heart_disease'],
    description:
      'A medically supervised program to improve cardiovascular health after a heart event.',
  },
  {
    id: 'hha_bpsm',
    name: 'Healthy Heart Ambassador Blood Pressure Self-Monitoring Program',
    division: 'Division for Heart Disease and Stroke Prevention',
    conditions: ['high_bp', 'heart_disease'],
    description:
      'Builds self-monitoring skills and habits that help lower and manage blood pressure.',
  },
  {
    id: 'fhwp',
    name: 'Family Healthy Weight Programs',
    division: 'Division of Nutrition, Physical Activity, and Obesity',
    conditions: [],
    description:
      'Family-centered programs that support healthy eating, activity, and weight for children and teens.',
  },
  {
    id: 'set',
    name: 'Supervised Exercise Therapy (SET)',
    division: 'Division of Nutrition, Physical Activity, and Obesity',
    conditions: ['heart_disease', 'pain'],
    description:
      'Structured, supervised exercise sessions that improve mobility and reduce symptoms.',
  },
  {
    id: 'arthritis',
    name: 'Physical Activity and Self-Management Education Programs for Arthritis',
    division: 'Division of Population Health',
    conditions: ['arthritis', 'pain'],
    description:
      'Proven programs that reduce arthritis pain and improve function and confidence.',
  },
]

const READINESS_MESSAGES = {
  self: {
    ready_now:
      'You’re ready to get started — that’s a great place to be. The programs below match what you told us, so you can take the next step today.',
    few_months:
      'Starting in the next few months gives you time to find the right fit. Here are programs that match what you shared — explore them at your own pace.',
    interested_unsure:
      'There’s no deadline here. These programs match what you shared, and they’ll be here whenever the timing feels right.',
    exploring:
      'Exploring your options is a great first step. Here’s what we found based on what you shared — no commitment needed.',
    not_interested:
      'That’s completely okay. Here’s some information to keep for whenever the time feels right — at your own pace.',
  },
  caregiver: {
    ready_now:
      'They’re ready to get started — that’s a great place to be. The programs below match what you told us about them.',
    few_months:
      'Starting in the next few months gives you both time to find the right fit. Here are programs that match what you shared.',
    interested_unsure:
      'There’s no deadline here. These programs match what you shared, and they’ll be here whenever the timing feels right.',
    exploring:
      'Exploring the options is a great first step. Here’s what we found based on what you shared — no commitment needed.',
    not_interested:
      'That’s completely okay. Here’s some information to keep for whenever the time feels right.',
    not_sure:
      'That’s okay — you don’t need to be certain. Here’s information you can explore together whenever it feels right.',
  },
}

/** Compute everything the end screen shows, from the in-memory answers. */
export function getResults(answers) {
  const ctx = buildCtx(answers)
  const { stream, isCaregiver, rName, pName } = ctx

  // "Just browsing" → generic locator, no tailoring, no filters
  if (stream === 'browse') {
    return {
      browsing: true,
      heading: 'Browse all programs',
      message:
        'No problem — here’s the full list of health and wellness programs. Explore anything that looks interesting, and come back anytime.',
      programs: PROGRAMS,
      filters: [],
    }
  }

  /* --- tailored message --- */
  const heading = rName ? `Thanks, ${rName}!` : 'Thank you!'

  const parts = []
  const readinessSet = isCaregiver
    ? READINESS_MESSAGES.caregiver
    : READINESS_MESSAGES.self
  parts.push(readinessSet[answers.readiness] || readinessSet.exploring)

  const conditions = answers.health_condition || []
  const definedConditions = conditions.filter((c) => c !== 'not_sure')
  if (definedConditions.length === 0) {
    // per deck: reflect the lack of a defined health condition
    parts.push(
      isCaregiver
        ? 'You don’t need a specific diagnosis to get started — the programs below support overall health and well-being, and many welcome anyone who wants support.'
        : 'You don’t need a specific diagnosis to get started — these programs support overall health and well-being, and many welcome anyone who wants support.',
    )
  }

  /* --- locator filters (from the Logistics/Access answers) --- */
  const conditionLabels = {
    prediabetes: 'Prediabetes / type 2 diabetes risk',
    diabetes: 'Diabetes',
    heart_disease: 'Heart disease',
    high_bp: 'High blood pressure',
    arthritis: 'Arthritis',
    pain: 'Long-term pain',
  }
  const filters = []
  if (answers.age) {
    filters.push({ label: 'Age', value: String(answers.age) })
  }
  if (definedConditions.length > 0) {
    filters.push({
      label: 'Health focus',
      value: definedConditions.map((c) => conditionLabels[c]).join(', '),
    })
  }
  const formatLabels = {
    in_person: 'In-person',
    virtual: 'Virtual (scheduled)',
    online: 'Online (on demand)',
  }
  const formats = (answers.format || []).filter((f) => formatLabels[f])
  if (formats.length > 0) {
    filters.push({
      label: 'Format',
      value: formats.map((f) => formatLabels[f]).join(', '),
    })
  }
  const loc = answers.location
  if (loc) {
    if (loc.zip) {
      filters.push({ label: 'Location', value: `Near ZIP ${loc.zip}` })
    } else if (loc.preference === 'state' && loc.state) {
      filters.push({ label: 'Location', value: loc.state })
    } else if (loc.preference === 'online_only') {
      filters.push({ label: 'Location', value: 'Online / virtual only' })
    } else if (loc.preference === 'current_location') {
      filters.push({ label: 'Location', value: 'Current location (one time)' })
    }
  }
  const langs = (answers.language || []).filter(
    (l) => l && l !== 'No preference',
  )
  if (langs.length > 0) {
    filters.push({ label: 'Language', value: langs.join(', ') })
  }
  if (answers.support === 'yes') {
    filters.push({ label: 'Companion', value: 'Family or friend can join' })
  }

  /* --- program filtering ---
     Filter by condition only when conditions are defined (per deck:
     "Not sure" must not filter the locator). Everything else is shown
     as applied filters; real inventory filtering comes later. */
  let programs = PROGRAMS
  if (definedConditions.length > 0) {
    const matched = PROGRAMS.filter((p) =>
      p.conditions.some((c) => definedConditions.includes(c)),
    )
    if (matched.length > 0) programs = matched
  }

  return {
    browsing: false,
    heading,
    message: parts.join(' '),
    pName: isCaregiver ? pName : null,
    programs,
    filters,
  }
}

/**
 * Branching survey definition — built from "Screener & Pathway Questions v4".
 *
 * Streams (set by Q02 role):
 *   self   — answering for themselves
 *   adult  — caregiver of another adult
 *   minor  — caregiver of a child/teen (identical to adult except Q16 skipped)
 *   browse — "just browsing" → straight to the end screen, untailored
 *
 * Confirmed routing rules:
 *   - Q07 "I'm ready to start now" (only that option) skips Q08–Q12 → Q13a
 *   - Q07 is single-select (radio), per stakeholder correction
 *   - "Not interested right now" continues through all questions
 *   - Q16 is skipped for minor caregivers
 *
 * Each question:
 *   id      answer is stored under this key (answers[id])
 *   type    'name' | 'radio' | 'checkbox' | 'age' | 'zip' | 'language'
 *   text(ctx)    → { intro?, question, hint? } — stream/name-aware wording
 *   options(ctx) → [{ value, label, other? }] (radio/checkbox)
 *   next(answers) → next question id, or END
 */

export const END = 'END'
export const FIRST_QUESTION_ID = 'respondent_name'

/* ---------- context helpers ---------- */

export function getStream(answers) {
  return answers.role || 'self'
}

export function buildCtx(answers) {
  const stream = getStream(answers)
  const isCaregiver = stream === 'adult' || stream === 'minor'
  const rName = answers.respondent_name || null
  const pName = answers.participant_name || null
  return {
    stream,
    isCaregiver,
    rName,
    pName,
    // "[P Name]" with a graceful fallback when the name was not shared
    p: pName || 'the person you care for',
    // possessive-ish subject for mid-sentence reuse
    pThey: pName || 'they',
  }
}

/* ---------- questions ---------- */

export const QUESTIONS = {
  /* Q01 */
  respondent_name: {
    id: 'respondent_name',
    type: 'name',
    section: 'About you',
    text: () => ({
      question: 'Before we start, what would you like us to call you?',
      hint: 'This is optional. We’ll only use it to personalize this session, and it won’t be saved.',
    }),
    skipLabel: 'I’d rather not share my name',
    next: () => 'role',
  },

  /* Q02 */
  role: {
    id: 'role',
    type: 'radio',
    section: 'About you',
    text: ({ rName }) => ({
      question: rName
        ? `Welcome ${rName}, are you looking for a health program for yourself or someone you care for, like a child or another adult?`
        : 'Welcome! Are you looking for a health and wellness program for yourself or someone you care for, like a child or another adult?',
    }),
    options: () => [
      { value: 'self', label: 'Myself' },
      { value: 'adult', label: 'Another adult I care for' },
      { value: 'minor', label: 'For a child or teen I care for' },
      { value: 'browse', label: 'I am just browsing programs' },
    ],
    next: (answers) => {
      const role = answers.role
      if (role === 'browse') return END
      if (role === 'self') return 'age'
      return 'participant_name'
    },
  },

  /* Q03 — caregivers only */
  participant_name: {
    id: 'participant_name',
    type: 'name',
    section: 'About you',
    text: () => ({
      question:
        'In that case, what would you like us to call the person you are caring for?',
      hint: 'Again, this is optional and this information won’t be saved.',
    }),
    skipLabel: 'I’d rather not share their name',
    next: () => 'age',
  },

  /* Q04 */
  age: {
    id: 'age',
    type: 'age',
    section: 'About you',
    text: ({ isCaregiver, rName, p }) => {
      const prefix = rName ? `${rName}, some` : 'Some'
      return isCaregiver
        ? {
            intro: `${prefix} health and wellness programs are designed for specific age groups.`,
            question: `Can you tell me the age of ${p} so I can find programs suitable for them?`,
          }
        : {
            intro: `${prefix} health and wellness programs are designed for specific age groups.`,
            question: 'Can you tell me your age so I can find programs suitable for you?',
          }
    },
    next: () => 'health_goals',
  },

  /* Q05 */
  health_goals: {
    id: 'health_goals',
    type: 'checkbox',
    section: 'Health',
    text: ({ isCaregiver, p, pThey }) =>
      isCaregiver
        ? {
            intro: `Let’s start with what matters most to ${p}, so we can help you find a program that fits their life.`,
            question: `What would ${pThey} like support with when it comes to their health?`,
            hint: 'Select all that apply.',
          }
        : {
            intro:
              'Let’s start with what matters most to you, so we can help you find a program that fits your life.',
            question:
              'What would you like support with when it comes to your health?',
            hint: 'Select all that apply.',
          },
    options: ({ isCaregiver }) => [
      { value: 'eat_healthier', label: 'Eat healthier' },
      { value: 'physical_activity', label: 'Be more physically active' },
      { value: 'healthy_weight', label: 'Reach or stay at a healthy weight' },
      { value: 'prevent', label: 'Prevent health problems in the future' },
      {
        value: 'manage_skills',
        label: isCaregiver
          ? 'Learn skills to manage their health day to day'
          : 'Learn skills to manage my health day to day',
      },
      { value: 'stress', label: 'Handle stress better' },
      { value: 'pain_symptoms', label: 'Ease pain or other symptoms' },
      { value: 'independent', label: 'Stay independent in daily life' },
      { value: 'not_sure', label: 'I’m not sure yet', exclusive: true },
    ],
    next: () => 'health_condition',
  },

  /* Q06 */
  health_condition: {
    id: 'health_condition',
    type: 'checkbox',
    section: 'Health',
    text: (ctx, answers) => {
      const goals = answers.health_goals || []
      const hasDefinedGoals = goals.some((g) => g !== 'not_sure')
      const { isCaregiver, p, pThey } = ctx
      if (hasDefinedGoals) {
        return isCaregiver
          ? {
              intro: `Thank you for sharing what matters to ${p}. Let’s learn a little more so we can find programs that fit their needs.`,
              question: `What health conditions or concerns would ${pThey} like support with?`,
              hint: 'Select all that apply. If you’re not sure, that’s okay too.',
            }
          : {
              intro:
                'Thank you for sharing what matters to you. Let’s learn a little more so we can find programs that fit your needs.',
              question:
                'What health conditions or concerns would you like support with?',
              hint: 'Select all that apply. If you’re not sure, that’s okay too.',
            }
      }
      return isCaregiver
        ? {
            intro: `That’s not a problem. You do not need to define health goals for ${p} to find a program.`,
            question: `What health conditions or concerns would ${pThey} like support with?`,
            hint: 'Select all that apply. If you’re not sure, that’s okay too.',
          }
        : {
            intro:
              'That’s not a problem. You do not need to have defined health goals to find a program.',
            question:
              'What health conditions or concerns would you like support with?',
            hint: 'Select all that apply. If you’re not sure, that’s okay too.',
          }
    },
    options: () => [
      { value: 'prediabetes', label: 'Prediabetes or risk of type 2 diabetes' },
      { value: 'diabetes', label: 'Diabetes' },
      { value: 'heart_disease', label: 'Heart disease' },
      { value: 'high_bp', label: 'High blood pressure' },
      { value: 'arthritis', label: 'Arthritis' },
      { value: 'pain', label: 'Long-term pain' },
      { value: 'not_sure', label: 'Not sure', exclusive: true },
    ],
    next: () => 'readiness',
  },

  /* Q07 — radio (single-select per stakeholder correction); "ready now" skips to Q13a */
  readiness: {
    id: 'readiness',
    type: 'radio',
    section: 'Readiness',
    text: ({ isCaregiver, rName, p }) =>
      isCaregiver
        ? {
            question: `${p.charAt(0).toUpperCase() + p.slice(1)} can take this at their own pace. How do you feel about them starting a health and wellness program?`,
          }
        : {
            question: `${rName ? `${rName}, you` : 'You'} can take this at your own pace. How do you feel about starting a health and wellness program?`,
          },
    options: ({ isCaregiver }) =>
      isCaregiver
        ? [
            { value: 'ready_now', label: 'They’re ready to start now.' },
            { value: 'few_months', label: 'They’d like to start in the next few months.' },
            { value: 'interested_unsure', label: 'They’re interested, but they’re not sure when they’d like to start.' },
            { value: 'exploring', label: 'They’re just exploring and learning about their options.' },
            { value: 'not_interested', label: 'They’re not interested in starting a program right now.' },
            { value: 'not_sure', label: 'I’m not sure how they feel about starting a program.' },
          ]
        : [
            { value: 'ready_now', label: 'I’m ready to start now.' },
            { value: 'few_months', label: 'I’d like to start in the next few months.' },
            { value: 'interested_unsure', label: 'I’m interested, but I’m not sure when I’d like to start.' },
            { value: 'exploring', label: 'I’m just exploring and learning about my options.' },
            { value: 'not_interested', label: 'I’m not interested in starting a program right now.' },
          ],
    next: (answers) =>
      answers.readiness === 'ready_now' ? 'format' : 'motivation',
  },

  /* Q08 */
  motivation: {
    id: 'motivation',
    type: 'checkbox',
    section: 'Readiness',
    text: ({ isCaregiver, p }) =>
      isCaregiver
        ? {
            intro: 'People look for health support for many different reasons.',
            question: `Based on what ${p} has shared with you, what has motivated them to explore ways to improve their health at this time?`,
            hint: 'Select all that apply.',
          }
        : {
            intro: 'People look for health support for many different reasons.',
            question:
              'What has motivated you to explore ways to improve your health at this time?',
            hint: 'Select all that apply.',
          },
    options: ({ isCaregiver }) =>
      isCaregiver
        ? [
            { value: 'provider', label: 'A doctor or another health care provider recommended it.' },
            { value: 'diagnosis', label: 'A recent diagnosis or test result got them thinking about their health.' },
            { value: 'changes', label: 'They’ve noticed changes in how they feel.' },
            { value: 'feel_better', label: 'They want to feel better or have more energy.' },
            { value: 'activities', label: 'They want to keep doing the everyday activities they enjoy.' },
            { value: 'lower_risk', label: 'They want to lower their chances of health problems in the future.' },
            { value: 'be_there', label: 'They want to be there for the people who matter to them.' },
            { value: 'someone_close', label: 'Someone close to them experienced a health problem.' },
            { value: 'encouraged', label: 'A friend or family member encouraged them.' },
            { value: 'support_changes', label: 'They’d like support with health changes they’ve been trying to make.' },
            { value: 'other', label: 'Something else:', other: true },
            { value: 'not_sure', label: 'I’m not sure what has prompted their interest.', exclusive: true },
            { value: 'prefer_not', label: 'I prefer not to answer.', exclusive: true },
          ]
        : [
            { value: 'provider', label: 'A doctor or another health care provider recommended it.' },
            { value: 'diagnosis', label: 'A recent diagnosis or test result got me thinking about my health.' },
            { value: 'changes', label: 'I’ve noticed changes in how I feel.' },
            { value: 'feel_better', label: 'I want to feel better or have more energy.' },
            { value: 'activities', label: 'I want to keep doing the everyday activities I enjoy.' },
            { value: 'lower_risk', label: 'I want to lower my chances of health problems in the future.' },
            { value: 'be_there', label: 'I want to be there for the people who matter to me.' },
            { value: 'someone_close', label: 'Someone close to me experienced a health problem.' },
            { value: 'encouraged', label: 'A friend or family member encouraged me.' },
            { value: 'support_changes', label: 'I’d like support with health changes I’ve been trying to make.' },
            { value: 'other', label: 'Something else:', other: true },
            { value: 'not_sure', label: 'I’m not sure.', exclusive: true },
            { value: 'prefer_not', label: 'I prefer not to answer.', exclusive: true },
          ],
    next: () => 'importance',
  },

  /* Q09 */
  importance: {
    id: 'importance',
    type: 'radio',
    section: 'Readiness',
    text: ({ isCaregiver, p }) =>
      isCaregiver
        ? {
            intro: `Let’s talk about what feels important to ${p} at this time.`,
            question:
              'Based on what they’ve shared with you, how important is making changes to support their health right now?',
          }
        : {
            intro: 'Let’s talk about what feels important to you at this time.',
            question:
              'How important is making changes to support your health right now?',
          },
    options: () => [
      { value: 'very', label: 'Very important' },
      { value: 'somewhat', label: 'Somewhat important' },
      { value: 'not_so', label: 'Not so important' },
      { value: 'not_at_all', label: 'Not at all important' },
      { value: 'not_sure', label: 'I am not sure at this time' },
    ],
    next: () => 'confidence',
  },

  /* Q10 */
  confidence: {
    id: 'confidence',
    type: 'radio',
    section: 'Readiness',
    text: ({ isCaregiver, p }) =>
      isCaregiver
        ? {
            question: `How confident does ${p} feel about taking part in a health program right now?`,
          }
        : {
            question:
              'Thinking about your daily life and the support you have, how confident do you feel about taking part in a health and wellness program right now?',
          },
    options: () => [
      { value: 'completely', label: 'Completely confident' },
      { value: 'mostly', label: 'Mostly confident' },
      { value: 'slightly', label: 'Slightly confident' },
      { value: 'not_at_all', label: 'Not at all confident' },
    ],
    next: () => 'past_experience',
  },

  /* Q11 */
  past_experience: {
    id: 'past_experience',
    type: 'radio',
    section: 'Readiness',
    text: ({ isCaregiver, p }) =>
      isCaregiver
        ? {
            question: `Has ${p} ever taken part in a health and wellness program, such as classes, coaching, or group support to help them manage their health?`,
          }
        : {
            question:
              'Have you ever taken part in a health and wellness program, such as classes, coaching, or group support to help you manage your health?',
          },
    options: ({ isCaregiver }) =>
      isCaregiver
        ? [
            { value: 'current', label: 'Yes, they are taking part in a program now.' },
            { value: 'past', label: 'Yes, they’ve taken part in a program in the past, but not currently.' },
            { value: 'never', label: 'No, they haven’t taken part in a program before.' },
            { value: 'not_sure', label: 'I’m not sure.' },
            { value: 'prefer_not', label: 'I prefer not to answer.' },
          ]
        : [
            { value: 'current', label: 'Yes, I’m taking part in a program now.' },
            { value: 'past', label: 'Yes, I’ve taken part in a program in the past, but not currently.' },
            { value: 'never', label: 'No, I haven’t taken part in a program before.' },
            { value: 'not_sure', label: 'I’m not sure.' },
            { value: 'prefer_not', label: 'I prefer not to answer.' },
          ],
    next: () => 'barriers',
  },

  /* Q12 */
  barriers: {
    id: 'barriers',
    type: 'checkbox',
    section: 'Readiness',
    text: ({ isCaregiver, p }) =>
      isCaregiver
        ? {
            question: `Thinking about ${p}’s daily life, what, if anything, might make it difficult for them to take part in a health and wellness program?`,
            hint: 'Select all that apply.',
          }
        : {
            question:
              'Thinking about your daily life, what, if anything, might make it difficult for you to take part in a health and wellness program?',
            hint: 'Select all that apply.',
          },
    options: () => [
      { value: 'fees', label: 'Program fees' },
      { value: 'expenses', label: 'Other expenses' },
      { value: 'time', label: 'Finding time' },
      { value: 'transportation', label: 'Arranging transportation' },
      { value: 'caregiving', label: 'Caregiving responsibilities' },
      { value: 'work', label: 'Work responsibilities' },
      { value: 'symptoms', label: 'Health symptoms' },
      { value: 'energy', label: 'Limited energy' },
      { value: 'stress', label: 'Stress' },
      { value: 'life', label: 'Other things happening in life' },
      { value: 'online_tools', label: 'Using online tools' },
      { value: 'expectations', label: 'Not knowing what to expect' },
      { value: 'usefulness', label: 'Not sure the program would be useful' },
      { value: 'independent', label: 'Would rather work on health goals independently' },
      { value: 'lack_support', label: 'Lack of support from others' },
      { value: 'groups', label: 'Do not like group activities' },
      { value: 'nothing', label: 'Nothing right now', exclusive: true },
      { value: 'not_sure', label: 'Not sure', exclusive: true },
      { value: 'prefer_not', label: 'Prefer not to answer', exclusive: true },
    ],
    next: () => 'format',
  },

  /* Q13a */
  format: {
    id: 'format',
    type: 'checkbox',
    section: 'Logistics',
    text: ({ isCaregiver, p }) =>
      isCaregiver
        ? {
            intro: `Some programs meet in person, while others offer online sessions or activities ${p} can do on their own schedule.`,
            question: `How would ${p} want to participate?`,
            hint: 'Select all that apply.',
          }
        : {
            intro:
              'Some programs meet in person, others meet virtually at scheduled times, and some offer on-demand online sessions you can do on your own schedule.',
            question: 'How do you want to participate?',
            hint: 'Select all that apply.',
          },
    options: () => [
      { value: 'in_person', label: 'In-person' },
      { value: 'virtual', label: 'Virtual — scheduled sessions on platforms like Zoom or Teams' },
      { value: 'online', label: 'Online (on demand)' },
      { value: 'no_pref', label: 'No preference', exclusive: true },
      { value: 'not_sure', label: 'Not sure', exclusive: true },
    ],
    next: () => 'participation',
  },

  /* Q13b */
  participation: {
    id: 'participation',
    type: 'checkbox',
    section: 'Logistics',
    text: ({ isCaregiver, p }) =>
      isCaregiver
        ? {
            intro: 'People have different preferences for learning and getting support.',
            question: `What type of program sessions would ${p} prefer?`,
            hint: 'Select all that apply.',
          }
        : {
            intro: 'People have different preferences for learning and getting support.',
            question: 'What type of program sessions would you prefer?',
            hint: 'Select all that apply.',
          },
    options: () => [
      { value: 'group', label: 'Group sessions with other participants.' },
      { value: 'one_on_one', label: 'One-on-one sessions with a coach or health professional.' },
      { value: 'solo', label: 'Activities I can complete on my own, without attending sessions.' },
      { value: 'no_pref', label: 'I have no preference.', exclusive: true },
      { value: 'not_sure', label: 'I’m not sure yet.', exclusive: true },
    ],
    next: () => 'location',
  },

  /* Q14 — ZIP with opt-out follow-up */
  location: {
    id: 'location',
    type: 'zip',
    section: 'Logistics',
    text: ({ isCaregiver }) =>
      isCaregiver
        ? {
            question: 'To help locate programs available to them, please enter their ZIP code.',
            hint: 'We use the ZIP code only to show in-person programs nearby. It isn’t stored with any name.',
          }
        : {
            question: 'To help locate programs closer to you, please enter your ZIP code.',
            hint: 'We use your ZIP code only to show in-person programs near you. It isn’t stored with your name.',
          },
    optOutLabel: 'I’d prefer not to share my ZIP code',
    optOutQuestion: 'How would you like us to find programs for you?',
    optOutOptions: [
      { value: 'state', label: 'Show programs in my state' },
      { value: 'current_location', label: 'Use my current location (one time only)' },
      { value: 'online_only', label: 'Show only online or virtual programs (no location needed)' },
      { value: 'show_all', label: 'Show all programs. I’ll search on my own.' },
    ],
    next: () => 'language',
  },

  /* Q15 */
  language: {
    id: 'language',
    type: 'language',
    section: 'Logistics',
    text: ({ isCaregiver }) =>
      isCaregiver
        ? {
            intro: 'Some programs may be offered in languages other than English.',
            question: 'What language(s) would they prefer to participate in?',
            hint: 'List up to 3, starting with your top choice.',
          }
        : {
            intro:
              'Some programs may be offered in languages other than English. Although programs may not be available in all languages, we can help identify those that best fit your preference.',
            question: 'What language(s) would you prefer to participate in?',
            hint: 'List up to 3, starting with your top choice.',
          },
    languageOptions: [
      'English',
      'Spanish',
      'Chinese / Simplified Mandarin',
      'Tagalog / Filipino',
      'Vietnamese',
      'Arabic',
      'French',
      'Korean',
      'Portuguese',
      'Hindi',
      'Another language',
      'No preference',
    ],
    // Q16 is skipped for caregivers of children/teens
    next: (answers) => (getStream(answers) === 'minor' ? END : 'support'),
  },

  /* Q16 — skipped for minor caregivers */
  support: {
    id: 'support',
    type: 'radio',
    section: 'Logistics',
    text: ({ isCaregiver, p }) =>
      isCaregiver
        ? {
            intro: 'Some programs offer the option to bring a family member or friend to sessions.',
            question: `Does ${p} want a family member or friend to join them in the program?`,
          }
        : {
            intro: 'Some programs offer the option to bring a family member or friend to sessions.',
            question: 'Would you like a family member or friend to join you?',
          },
    options: () => [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'not_sure', label: 'Not sure' },
      { value: 'no_pref', label: 'No preference' },
    ],
    next: () => END,
  },
}

/** Resolve the next question id (or END) after answering questionId. */
export function resolveNext(questionId, answers) {
  const q = QUESTIONS[questionId]
  if (!q) return END
  return q.next(answers)
}

/** The four survey sections, for the progress indicator. */
export const SECTIONS = ['About you', 'Health', 'Readiness', 'Logistics']

/** Labels for plan summary (must match step components’ ids). */

export const MOTIVATOR_LABELS = {
  'lose-weight': 'Lose weight',
  family: 'Stay healthy for my family',
  energy: 'Feel more energized',
  active: 'Be more active',
  'less-medicine': 'Take less medicine (such as high blood pressure medicine)',
  'avoid-diabetes': "Avoid type 2 diabetes because I've seen what it can do",
  'medical-bills': 'Reduce my chances of higher medical bills',
  'avoid-conditions': 'Avoid serious medical conditions',
  prioritize: 'Prioritize my health',
};

export const BARRIER_LABELS = {
  caregiver: 'Caregiver duties (childcare or other)',
  'family-meals': 'Family meals',
  schedule: 'Schedule changes',
  travel: 'Travel plans',
  transportation: 'Transportation',
  pet: 'Pet care',
  'prior-commitments': 'Prior commitments',
};

/** Display order matches class preference step */
export const PARTICIPATION_ORDER = ['in-person', 'online', 'distance'];
export const TIME_ORDER = ['morning', 'afternoon', 'evening', 'weekend'];

/** Lines as shown on completed plan (with punctuation per design) */
export const PARTICIPATION_SUMMARY = {
  'in-person': 'In person,',
  online: 'Online,',
  distance: 'Distance Learning,',
};

export const TIME_SUMMARY = {
  morning: 'In the morning,',
  afternoon: 'In the afternoon,',
  evening: 'In the evening,',
  weekend: 'On the weekend.',
};

export function formatIsoDateUs(iso) {
  if (!iso || typeof iso !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return '—';
  const [y, m, d] = iso.split('-');
  return `${m}/${d}/${y}`;
}

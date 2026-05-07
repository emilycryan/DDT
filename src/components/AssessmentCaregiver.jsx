import React, { useState, useEffect } from 'react';

// Caregiver / "Someone I care about" assessment — scored 0–10 to match the
// For Myself flow. Looks at how well their conditions are being managed,
// how much support the caregiver has, and how stress is shaping the picture.
const CAREGIVER_QUESTIONS = [
  {
    id: 'conditions',
    question: 'Which chronic condition(s) does the person you care about have?',
    subtext: 'Select all that apply. Living with multiple conditions makes the caregiving load heavier.',
    type: 'checkbox',
    options: [
      { label: 'Diabetes (type 1 or 2)', value: 'diabetes' },
      { label: 'Heart disease or hypertension', value: 'heart' },
      { label: 'COPD or asthma', value: 'respiratory' },
      { label: 'Obesity (BMI 30+)', value: 'obesity' },
      { label: 'Depression or anxiety', value: 'mental_health' },
      { label: 'Other chronic condition', value: 'other' },
    ],
  },
  {
    id: 'years_supporting',
    question: 'How long have you been supporting them with their health?',
    type: 'radio',
    options: [
      { label: 'Less than 1 year', value: 'under_1', score: 1 },
      { label: '1 to 5 years', value: '1_5', score: 0 },
      { label: '5 to 10 years', value: '5_10', score: 0 },
      { label: 'More than 10 years', value: '10_plus', score: 0 },
    ],
  },
  {
    id: 'their_medication',
    question: 'Are they currently taking medication as prescribed?',
    type: 'radio',
    options: [
      { label: 'Yes, as prescribed', value: 'yes', score: 0 },
      { label: 'Yes, but they sometimes miss doses', value: 'sometimes', score: 1 },
      { label: 'No', value: 'no', score: 2 },
    ],
  },
  {
    id: 'their_adherence',
    question: "How would you rate their adherence to their treatment plan (nutrition, physical activity, follow-up appointments)?",
    type: 'radio',
    options: [
      { label: 'Always follows it', value: 'always', score: 0 },
      { label: 'Usually follows it', value: 'usually', score: 0 },
      { label: 'Sometimes follows it', value: 'sometimes', score: 1 },
      { label: 'Rarely or never', value: 'rarely', score: 2 },
    ],
  },
  {
    id: 'your_support',
    question: 'How much support do you have in your caregiving role?',
    subtext: 'Caregiver burnout is one of the strongest predictors of worse outcomes for the person being cared for.',
    type: 'radio',
    options: [
      { label: 'A lot — family, friends, or respite', value: 'a_lot', score: 0 },
      { label: 'Some support', value: 'some', score: 0 },
      { label: 'A little support', value: 'a_little', score: 1 },
      { label: "No support — I'm on my own", value: 'none', score: 2 },
    ],
  },
  {
    id: 'stress',
    question: 'How often does stress (yours or theirs) get in the way of managing their health?',
    type: 'radio',
    options: [
      { label: 'Rarely or never', value: 'rarely', score: 0 },
      { label: 'Sometimes', value: 'sometimes', score: 0 },
      { label: 'Often', value: 'often', score: 1 },
      { label: 'Almost always', value: 'always', score: 1 },
    ],
  },
];

// Conditions question is scored by count, capped at 2 — multimorbidity raises risk
// regardless of which specific conditions are involved.
function getConditionsScore(selected) {
  if (!Array.isArray(selected)) return 0;
  if (selected.length === 0) return 0;
  if (selected.length === 1) return 1;
  return 2;
}

const MAX_SCORE = 10;

function getRiskTier(score) {
  if (score >= 7) {
    return {
      level: 'higher',
      label: 'Higher risk',
      color: '#b21d38',
      bg: 'rgba(216, 57, 51, 0.12)',
      headline: "There's real opportunity to lighten the load — for them and for you.",
      summary:
        "Your answers suggest the person you care for has multiple risk factors that are not being fully managed, and you may be carrying a lot of that weight on your own. The good news: structured support exists for both of you, and small changes in the next few weeks can meaningfully improve their long-term outlook.",
      nextSteps: [
        {
          title: 'Talk with their doctor soon',
          body: "Bring these results to their next visit. Ask about medication adherence supports, current screening results (blood pressure, cholesterol, A1C), and whether anything in the treatment plan can be simplified.",
        },
        {
          title: 'Build a plan together',
          body: "Pick one or two areas — medication routine, food, activity, or appointments — and turn them into specific weekly habits you can both stick to.",
          cta: { label: 'Make a plan', href: '/action/plan-my-path' },
        },
        {
          title: 'Find a Lifestyle Change Program',
          body: 'CDC-recognized programs offer a coach, a small group, and a year of structured support. Many welcome a caregiver alongside the person enrolled — you do not have to navigate this alone.',
          cta: { label: 'Find a program', href: '/lifestyle-programs' },
        },
      ],
    };
  }
  if (score >= 4) {
    return {
      level: 'moderate',
      label: 'Moderate risk',
      color: '#946400',
      bg: 'rgba(245, 158, 11, 0.12)',
      headline: "A few areas could use attention — and small changes go a long way.",
      summary:
        "Some parts of their care are working well, and others are slipping. This is a common pattern, and it is exactly the moment when a clearer plan and a little outside support pay off the most.",
      nextSteps: [
        {
          title: 'Build a plan together',
          body: "Sit down with the person you care for and choose one or two changes — a medication routine, a weekly walk, a regular check-in — to focus on first.",
          cta: { label: 'Make a plan', href: '/action/plan-my-path' },
        },
        {
          title: 'Share with their doctor',
          body: "Bring these results to their next appointment. Ask whether routine bloodwork (A1C, cholesterol, blood pressure) is up to date and whether any meds can be simplified.",
        },
        {
          title: 'Consider a Lifestyle Change Program',
          body: "If you want guided support — a coach and a small group over a year — a CDC-recognized program can take some of the planning off your plate.",
          cta: { label: 'See programs in their area', href: '/lifestyle-programs' },
        },
      ],
    };
  }
  return {
    level: 'lower',
    label: 'Lower risk',
    color: '#1a6b3d',
    bg: 'rgba(0, 120, 51, 0.12)',
    headline: "You and the person you care for are in a good place — keep it going.",
    summary:
      "Based on your answers, their conditions are being well managed and you have the support you need to stay on top of it. The biggest risk now is drift — make sure routine appointments and habits do not slip.",
    nextSteps: [
      {
        title: 'Lock in what is working',
        body: 'Use a simple shared plan to keep medications, appointments, and healthy habits from drifting over time.',
        cta: { label: 'Make a plan', href: '/action/plan-my-path' },
      },
      {
        title: 'Stay on top of routine screenings',
        body: 'Annual blood pressure, cholesterol, and blood sugar checks catch changes early — when they are easiest to reverse.',
      },
    ],
  };
}

function AssessmentCaregiver({ onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex, isComplete]);

  const totalQuestions = CAREGIVER_QUESTIONS.length;
  const currentQuestion = CAREGIVER_QUESTIONS[currentIndex];
  const progress = ((currentIndex + (isComplete ? 1 : 0)) / totalQuestions) * 100;

  const getScoreForQuestion = (question, value) => {
    if (question.id === 'conditions') {
      return getConditionsScore(value);
    }
    if (question.type === 'radio') {
      const opt = question.options.find((o) => o.value === value);
      return opt ? (opt.score ?? 0) : 0;
    }
    return 0;
  };

  const totalScore = CAREGIVER_QUESTIONS.reduce((sum, q) => {
    const val = answers[q.id];
    if (val === undefined || val === null) return sum;
    return sum + getScoreForQuestion(q, val);
  }, 0);

  const handleNext = () => {
    const val = answers[currentQuestion.id];
    const hasAnswer =
      val !== undefined &&
      val !== null &&
      val !== '' &&
      (currentQuestion.type !== 'checkbox' || (Array.isArray(val) && val.length > 0));
    if (!hasAnswer) return;

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleCheckboxChange = (questionId, optionValue, checked) => {
    setAnswers((prev) => {
      const current = prev[questionId] || [];
      const arr = Array.isArray(current) ? [...current] : [];
      if (checked) {
        if (!arr.includes(optionValue)) arr.push(optionValue);
      } else {
        return { ...prev, [questionId]: arr.filter((v) => v !== optionValue) };
      }
      return { ...prev, [questionId]: arr };
    });
  };

  const canProceed = () => {
    const val = answers[currentQuestion.id];
    if (currentQuestion.type === 'checkbox') {
      return Array.isArray(val) && val.length > 0;
    }
    return val !== undefined && val !== null && val !== '';
  };

  if (isComplete) {
    const tier = getRiskTier(totalScore);

    return (
      <main
        style={{
          backgroundColor: '#ffffff',
          minHeight: '80vh',
          padding: '2rem 1rem',
        }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h1
            style={{
              fontFamily: 'var(--font-header)',
              fontWeight: 700,
              color: '#1b1b1b',
              marginBottom: '0.5rem',
              fontSize: '1.75rem',
            }}
          >
            Their care snapshot
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: '#323a45',
              marginBottom: '1.5rem',
              lineHeight: 1.6,
            }}
          >
            This is a starting point, not a diagnosis. It looks at how well the person you care for is managing their chronic conditions and how much support you have in the caregiving role — and gives you one number to help you decide what to do next, together.
          </p>

          <div
            style={{
              padding: '1.5rem',
              marginBottom: '1.5rem',
              backgroundColor: '#f0f4f8',
              border: '1px solid #e0e0e0',
              borderRadius: '0.25rem',
            }}
          >
            <div
              style={{
                fontSize: '0.875rem',
                fontFamily: 'var(--font-body)',
                color: '#5c5c5c',
                marginBottom: '0.25rem',
              }}
            >
              Your assessment score
            </div>
            <div
              style={{
                fontSize: '2.25rem',
                fontFamily: 'var(--font-header)',
                fontWeight: 700,
                color: '#005ea2',
                lineHeight: 1.1,
              }}
            >
              {totalScore} <span style={{ fontWeight: 400, color: '#323a45', fontSize: '1.25rem' }}>/ {MAX_SCORE}</span>
            </div>
            <div
              style={{
                marginTop: '0.75rem',
                padding: '0.5rem 0.75rem',
                backgroundColor: tier.bg,
                borderRadius: '0.25rem',
                fontSize: '0.9375rem',
                fontFamily: 'var(--font-body)',
                color: '#1b1b1b',
                display: 'inline-block',
              }}
            >
              Risk level: <strong style={{ color: tier.color }}>{tier.label}</strong>
            </div>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-header)',
              fontWeight: 700,
              color: '#1b1b1b',
              marginBottom: '0.5rem',
              fontSize: '1.25rem',
            }}
          >
            {tier.headline}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: '#323a45',
              fontSize: '1rem',
              lineHeight: 1.6,
              marginBottom: '1.75rem',
            }}
          >
            {tier.summary}
          </p>

          <h3
            style={{
              fontFamily: 'var(--font-header)',
              fontWeight: 700,
              color: '#1b1b1b',
              marginBottom: '1rem',
              fontSize: '1.0625rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            What to do next
          </h3>
          <ol
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 2rem 0',
              counterReset: 'next-step',
            }}
          >
            {tier.nextSteps.map((step, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  gap: '0.875rem',
                  padding: '1rem 1.25rem',
                  marginBottom: '0.75rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '0.25rem',
                  backgroundColor: '#ffffff',
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    backgroundColor: '#005ea2',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-header)',
                    fontWeight: 700,
                    fontSize: '0.9375rem',
                  }}
                >
                  {idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-header)',
                      fontWeight: 700,
                      color: '#1b1b1b',
                      fontSize: '1rem',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {step.title}
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: '#323a45',
                      fontSize: '0.9375rem',
                      lineHeight: 1.55,
                      margin: step.cta ? '0 0 0.5rem 0' : 0,
                    }}
                  >
                    {step.body}
                  </p>
                  {step.cta && (
                    <a
                      href={step.cta.href}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                        color: '#005ea2',
                        fontSize: '0.9375rem',
                      }}
                    >
                      {step.cta.label} →
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => { setCurrentIndex(0); setIsComplete(false); setAnswers({}); }}
              style={{
                padding: '0.75rem 1.25rem',
                backgroundColor: 'transparent',
                color: '#005ea2',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '1rem',
                border: '2px solid #005ea2',
                borderRadius: '0.25rem',
                cursor: 'pointer',
              }}
            >
              Retake assessment
            </button>
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                style={{
                  padding: '0.75rem 1.25rem',
                  backgroundColor: 'transparent',
                  color: '#5c5c5c',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                }}
              >
                Back to assessments
              </button>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        backgroundColor: '#ffffff',
        minHeight: '80vh',
        padding: '2rem 1rem',
      }}
    >
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div
          style={{
            height: 4,
            backgroundColor: '#e0e0e0',
            borderRadius: 2,
            marginBottom: '2rem',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              backgroundColor: '#005ea2',
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        <p
          style={{
            fontSize: '0.875rem',
            fontFamily: 'var(--font-body)',
            color: '#5c5c5c',
            marginBottom: '0.5rem',
          }}
        >
          Question {currentIndex + 1} of {totalQuestions}
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-header)',
            fontWeight: 700,
            color: '#1b1b1b',
            marginBottom: currentQuestion.subtext ? '0.5rem' : '1.5rem',
            fontSize: '1.5rem',
            lineHeight: 1.3,
          }}
        >
          {currentQuestion.question}
        </h2>
        {currentQuestion.subtext && (
          <p
            style={{
              fontSize: '0.9rem',
              fontFamily: 'var(--font-body)',
              color: '#5c5c5c',
              marginBottom: '1rem',
            }}
          >
            {currentQuestion.subtext}
          </p>
        )}

        <div style={{ marginBottom: '2rem' }}>
          {currentQuestion.type === 'radio' && (
            <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
              {currentQuestion.options.map((opt) => (
                <label
                  key={opt.value}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem 1.25rem',
                    marginBottom: '0.75rem',
                    cursor: 'pointer',
                    border:
                      answers[currentQuestion.id] === opt.value
                        ? '2px solid #005ea2'
                        : '2px solid #e0e0e0',
                    backgroundColor: '#ffffff',
                    borderRadius: '0.25rem',
                  }}
                >
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={opt.value}
                    checked={answers[currentQuestion.id] === opt.value}
                    onChange={() => handleChange(currentQuestion.id, opt.value)}
                    style={{ marginRight: '0.75rem', accentColor: '#005ea2' }}
                  />
                  <span style={{ fontFamily: 'var(--font-body)', color: '#1b1b1b' }}>{opt.label}</span>
                </label>
              ))}
            </fieldset>
          )}

          {currentQuestion.type === 'checkbox' && (
            <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
              {currentQuestion.options.map((opt) => {
                const selected = Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].includes(opt.value);
                return (
                  <label
                    key={opt.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '1rem 1.25rem',
                      marginBottom: '0.75rem',
                      cursor: 'pointer',
                      border: selected ? '2px solid #005ea2' : '2px solid #e0e0e0',
                      backgroundColor: '#ffffff',
                      borderRadius: '0.25rem',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={(e) => handleCheckboxChange(currentQuestion.id, opt.value, e.target.checked)}
                      style={{ marginRight: '0.75rem', accentColor: '#005ea2' }}
                    />
                    <span style={{ fontFamily: 'var(--font-body)', color: '#1b1b1b' }}>{opt.label}</span>
                  </label>
                );
              })}
            </fieldset>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            {currentIndex > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                style={{
                  padding: '0.75rem 1.25rem',
                  backgroundColor: 'transparent',
                  color: '#005ea2',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  border: '2px solid #005ea2',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                }}
              >
                Back
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed()}
            style={{
              padding: '0.75rem 1.25rem',
              backgroundColor: '#005ea2',
              color: 'white',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '1rem',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: canProceed() ? 'pointer' : 'not-allowed',
              opacity: canProceed() ? 1 : 0.6,
            }}
          >
            {currentIndex < totalQuestions - 1 ? 'Next' : 'See results'}
          </button>
        </div>

        {onBack && currentIndex === 0 && (
          <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button
              type="button"
              onClick={onBack}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-body)',
                color: '#5c5c5c',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '0.9375rem',
              }}
            >
              ← Back to assessment options
            </button>
          </p>
        )}
      </div>
    </main>
  );
}

export default AssessmentCaregiver;

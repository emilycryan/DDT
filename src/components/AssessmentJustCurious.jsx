import React, { useState, useEffect } from 'react';

// "Just Curious" — indirect, denial-friendly. No direct health labels; daily life & reflection.
// Folks here may be in denial, don't understand impact of choices, or scare easily. Soft framing only.
// Scoring matches the For Myself / Caregiver flows: 0–10 max, three soft tiers.
const JUST_CURIOUS_QUESTIONS = [
  {
    id: 'end_of_day',
    question: 'By the end of a typical day, how do you usually feel?',
    type: 'radio',
    theme: 'energy',
    options: [
      { label: 'Still have some gas in the tank', value: 'good', score: 0 },
      { label: 'Okay—ready to wind down', value: 'okay', score: 0 },
      { label: 'Really depends on the day', value: 'depends', score: 1 },
      { label: 'Pretty wiped', value: 'wiped', score: 2 },
    ],
  },
  {
    id: 'morning',
    question: 'When you wake up on a typical morning, how do you usually feel?',
    type: 'radio',
    theme: 'sleep',
    options: [
      { label: 'Rested and ready', value: 'rested', score: 0 },
      { label: 'Mostly okay', value: 'okay', score: 0 },
      { label: 'Could use more sleep', value: 'could_use_more', score: 1 },
      { label: "I don't sleep well most nights", value: 'poor', score: 2 },
    ],
  },
  {
    id: 'eating',
    question: 'When you think about what you eat in a typical week, what comes to mind?',
    type: 'radio',
    theme: 'eating',
    options: [
      { label: "I try to keep it balanced", value: 'balanced', score: 0 },
      { label: "I don't really think about it", value: 'dont_think', score: 1 },
      { label: "I know I could do better", value: 'could_do_better', score: 1 },
      { label: "I'm not sure where to start", value: 'not_sure', score: 2 },
    ],
  },
  {
    id: 'movement',
    question: 'How does movement or activity fit into your week?',
    type: 'radio',
    theme: 'movement',
    options: [
      { label: "It's a regular part of my routine", value: 'regular', score: 0 },
      { label: 'I fit it in when I can', value: 'when_can', score: 0 },
      { label: "I know I could do more", value: 'could_do_more', score: 1 },
      { label: "I've never been one to move much day to day", value: 'rarely', score: 2 },
    ],
  },
  {
    id: 'stress',
    question: 'How would you describe your stress level most of the time?',
    type: 'radio',
    theme: 'stress',
    options: [
      { label: 'Manageable', value: 'manageable', score: 0 },
      { label: 'Some days are tough', value: 'some_days', score: 0 },
      { label: 'Pretty high', value: 'high', score: 1 },
      { label: "I try not to think about it", value: 'avoid', score: 1 },
    ],
  },
  {
    id: 'family',
    question: 'Has anyone in your family had heart disease, diabetes, or similar conditions?',
    type: 'radio',
    theme: 'family',
    options: [
      { label: 'No', value: 'no', score: 0 },
      { label: 'Not that I know of', value: 'dont_know', score: 0 },
      { label: 'Yes, a few relatives', value: 'few', score: 1 },
      { label: 'Yes, quite a few', value: 'many', score: 1 },
    ],
  },
];

const MAX_SCORE = 10;

function getRiskTier(score) {
  if (score >= 7) {
    return {
      level: 'higher',
      label: 'Worth a closer look',
      color: '#b21d38',
      bg: 'rgba(216, 57, 51, 0.12)',
      headline: "A few signals here are worth paying attention to.",
      summary:
        "Nothing on this page is a diagnosis — just patterns from your answers that tend to add up over time. The good news is that small, doable changes really do move the needle, and you do not have to figure it out alone.",
      nextSteps: [
        {
          title: 'Bring this up at your next checkup',
          body: "Your doctor can put a few simple numbers behind what you are noticing — blood pressure, cholesterol, blood sugar. That makes the path forward a lot clearer.",
        },
        {
          title: 'Try one small plan',
          body: "Pick one area — sleep, food, movement, stress — and turn it into a simple weekly habit. Small wins compound faster than people expect.",
          cta: { label: 'Make a plan', href: '/action/plan-my-path' },
        },
        {
          title: 'See what structured support looks like',
          body: "Lifestyle change programs offer a coach and a small group over a year. Many people find it is the easiest way to actually stick with new habits.",
          cta: { label: 'Find a program', href: '/lifestyle-programs' },
        },
      ],
    };
  }
  if (score >= 4) {
    return {
      level: 'moderate',
      label: 'A few areas to explore',
      color: '#946400',
      bg: 'rgba(245, 158, 11, 0.12)',
      headline: "A couple of things from your answers are worth a second look.",
      summary:
        "Not everything has to change at once. Most people find that picking one or two areas — and giving them a real shot for a few weeks — feels both manageable and surprisingly worthwhile.",
      nextSteps: [
        {
          title: 'Try a small plan',
          body: "Choose one area — sleep, food, movement, stress — and turn it into a specific weekly routine you can actually keep up with.",
          cta: { label: 'Make a plan', href: '/action/plan-my-path' },
        },
        {
          title: 'Mention this at your next checkup',
          body: "Routine bloodwork (blood pressure, cholesterol, blood sugar) gives you a clear baseline so you know what is and is not actually worth worrying about.",
        },
        {
          title: 'Explore at your own pace',
          body: "Lifestyle change programs are an option if you want guided support. There is no rush — they are there when you are ready.",
          cta: { label: 'See programs near you', href: '/lifestyle-programs' },
        },
      ],
    };
  }
  return {
    level: 'lower',
    label: 'You are in a good rhythm',
    color: '#1a6b3d',
    bg: 'rgba(0, 120, 51, 0.12)',
    headline: "Whatever you are doing, a lot of it is working.",
    summary:
      "Your answers paint a picture of someone who is mostly in a good rhythm. The thing that usually trips people up is drift — habits slipping a little at a time without anyone noticing. A simple plan and a yearly checkup keep that from happening.",
    nextSteps: [
      {
        title: 'Lock in what is working',
        body: "A simple plan helps the habits that are protecting your health stay on track even when life gets busy.",
        cta: { label: 'Make a plan', href: '/action/plan-my-path' },
      },
      {
        title: 'Stay on top of routine checkups',
        body: 'Annual blood pressure, cholesterol, and blood sugar checks catch any quiet changes early — when they are easiest to do something about.',
      },
    ],
  };
}

function AssessmentJustCurious({ onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalQuestions = JUST_CURIOUS_QUESTIONS.length;
  const currentQuestion = JUST_CURIOUS_QUESTIONS[currentIndex];
  const progress = ((currentIndex + (isComplete ? 1 : 0)) / totalQuestions) * 100;

  const getScoreForAnswer = (question, value) => {
    const option = question.options.find((o) => o.value === value);
    return option ? (option.score ?? 0) : 0;
  };

  const totalScore = JUST_CURIOUS_QUESTIONS.reduce((sum, q) => {
    const val = answers[q.id];
    if (val === undefined || val === null) return sum;
    return sum + getScoreForAnswer(q, val);
  }, 0);

  const handleNext = () => {
    const hasAnswer = answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== null && answers[currentQuestion.id] !== '';
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

  const canProceed = () => {
    const val = answers[currentQuestion.id];
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
            A snapshot from your answers
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: '#323a45',
              marginBottom: '1.5rem',
              lineHeight: 1.6,
            }}
          >
            This is just a starting point — no test to pass, no judgment. It looks at the everyday patterns from your answers and gives you one number to help decide what, if anything, is worth exploring next.
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
              Your snapshot score
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
              <strong style={{ color: tier.color }}>{tier.label}</strong>
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
              Answer again
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
            marginBottom: '1.5rem',
            fontSize: '1.5rem',
            lineHeight: 1.3,
          }}
        >
          {currentQuestion.question}
        </h2>

        <div style={{ marginBottom: '2rem' }}>
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
            {currentIndex < totalQuestions - 1 ? 'Next' : 'See what might be useful'}
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

export default AssessmentJustCurious;

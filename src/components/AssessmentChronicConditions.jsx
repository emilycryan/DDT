import React, { useState, useEffect, useMemo } from 'react';

// Chronic Condition Risk Assessment — 8 steps, max score 10
// Modeled on CDC/WHO chronic disease prevention guidance: focuses on the
// non-modifiable risk factors (age, family history) and the key modifiable
// drivers (weight, activity, diet, tobacco, alcohol, sleep/stress) that
// underlie type 2 diabetes, heart disease, stroke, COPD, and several cancers.

const AGE_QUESTION = {
  id: 'age',
  question: 'How old are you?',
  subtext: 'Risk for most chronic conditions rises with age.',
  type: 'radio',
  options: [
    { label: 'Under 40 years', value: 'under40', score: 0 },
    { label: '40–54 years', value: '40_54', score: 1 },
    { label: '55–64 years', value: '55_64', score: 2 },
    { label: '65 years or older', value: '65_plus', score: 2 },
  ],
};

const FAMILY_HISTORY_QUESTION = {
  id: 'familyHistory',
  question: 'Has a parent or sibling been diagnosed with a chronic condition?',
  subtext: 'Examples: type 2 diabetes, heart disease, stroke, high blood pressure, COPD, or certain cancers.',
  type: 'radio',
  options: [
    { label: 'No, or not that I know of', value: 'no', score: 0 },
    { label: 'Yes, one or more', value: 'yes', score: 1 },
  ],
};

const PHYSICAL_ACTIVITY_QUESTION = {
  id: 'physicalActivity',
  question: 'In a typical week, how often do you get at least 30 minutes of moderate activity?',
  subtext: 'Brisk walking, cycling, swimming, dancing, yard work — anything that raises your heart rate.',
  type: 'radio',
  options: [
    { label: '5 or more days a week', value: '5_plus', score: 0 },
    { label: '3–4 days a week', value: '3_4', score: 0 },
    { label: '1–2 days a week', value: '1_2', score: 1 },
    { label: 'Rarely or never', value: 'rarely', score: 1 },
  ],
};

const DIET_QUESTION = {
  id: 'diet',
  question: 'Which best describes how you typically eat?',
  type: 'radio',
  options: [
    {
      label: 'Mostly fruits, vegetables, whole grains, and lean protein',
      value: 'whole_foods',
      score: 0,
    },
    {
      label: 'A balanced mix, with some processed or fast food',
      value: 'balanced',
      score: 0,
    },
    {
      label: 'Processed or fast food more days than not',
      value: 'mostly_processed',
      score: 1,
    },
    {
      label: 'Heavy in sugary drinks, fried food, or red/processed meat',
      value: 'high_risk',
      score: 1,
    },
  ],
};

const TOBACCO_QUESTION = {
  id: 'tobacco',
  question: 'Do you use tobacco or vape products?',
  type: 'radio',
  options: [
    { label: 'I have never used them', value: 'never', score: 0 },
    { label: 'I quit more than 5 years ago', value: 'former_long', score: 0 },
    { label: 'I quit within the last 5 years', value: 'former_recent', score: 1 },
    { label: 'I currently use them', value: 'current', score: 1 },
  ],
};

const ALCOHOL_QUESTION = {
  id: 'alcohol',
  question: 'How often do you drink alcohol?',
  subtext: 'One drink = 12 oz beer, 5 oz wine, or 1.5 oz liquor.',
  type: 'radio',
  options: [
    { label: "I don't drink, or only rarely", value: 'none', score: 0 },
    { label: 'Up to 7 drinks per week', value: 'light', score: 0 },
    { label: '8–14 drinks per week', value: 'moderate', score: 1 },
    {
      label: '15+ drinks per week, or 4+ in a single day most weeks',
      value: 'heavy',
      score: 1,
    },
  ],
};

const SLEEP_STRESS_QUESTION = {
  id: 'sleepStress',
  question: 'How would you rate your sleep and stress?',
  subtext: 'Poor sleep and ongoing stress are linked to higher blood pressure, blood sugar, and inflammation.',
  type: 'radio',
  options: [
    {
      label: 'I sleep 7+ hours most nights and manage stress well',
      value: 'good',
      score: 0,
    },
    {
      label: 'Sleep or stress is sometimes an issue, but I cope',
      value: 'okay',
      score: 0,
    },
    {
      label: 'I often sleep less than 7 hours or feel overwhelmed',
      value: 'poor',
      score: 1,
    },
    {
      label: 'My sleep is consistently poor and stress feels unmanageable',
      value: 'very_poor',
      score: 1,
    },
  ],
};

// Height/weight — BMI-based scoring: <25 (0), 25–29.9 (1), 30+ (2)
const HEIGHT_OPTIONS = (() => {
  const opts = [];
  for (let ft = 4; ft <= 6; ft++) {
    const minIn = ft === 4 ? 10 : 0;
    const maxIn = ft === 6 ? 10 : 11;
    for (let in_ = minIn; in_ <= maxIn; in_++) {
      const totalIn = ft * 12 + in_;
      opts.push({
        label: `${ft}'${in_}"`,
        value: String(totalIn),
        inches: totalIn,
      });
    }
  }
  return opts;
})();

const WEIGHT_OPTIONS = (() => {
  const opts = [];
  for (let w = 100; w <= 400; w += 5) {
    opts.push({ label: `${w} lbs`, value: String(w), pounds: w });
  }
  return opts;
})();

function getBmiScore(heightInches, weightLbs) {
  if (!heightInches || !weightLbs) return 0;
  const bmi = (Number(weightLbs) * 703) / (Number(heightInches) * Number(heightInches));
  if (bmi < 25) return 0;
  if (bmi < 30) return 1;
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
      headline: "Several factors are raising your risk — but most of them can change.",
      summary:
        "Your answers point to multiple factors that increase the chance of developing a chronic condition like type 2 diabetes, heart disease, or stroke. The good news: lifestyle changes have been shown to cut this risk substantially, and structured support makes those changes stick.",
      nextSteps: [
        {
          title: 'Talk with your doctor soon',
          body: "Bring these results to your next visit. Ask about screening for blood pressure, cholesterol, and A1C so you have a clear baseline.",
        },
        {
          title: 'Build your plan',
          body: "Identify the one or two changes most likely to move the needle for you and turn them into a weekly routine.",
          cta: { label: 'Make my plan', href: '/action/plan-my-path' },
        },
        {
          title: 'Find a Lifestyle Change Program',
          body: 'CDC-recognized programs are proven to lower the risk of type 2 diabetes by more than half for people at higher risk. A program near you can give you a coach, a small group, and a year of structured support.',
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
      headline: "You have some risk factors worth paying attention to.",
      summary:
        "A few of your answers point to areas where small, consistent changes can meaningfully lower your long-term risk for chronic conditions. This is a great time to get ahead of it.",
      nextSteps: [
        {
          title: 'Build your plan',
          body: "Pick one or two areas — activity, food, sleep, or stress — and turn them into specific weekly habits.",
          cta: { label: 'Make my plan', href: '/action/plan-my-path' },
        },
        {
          title: 'Share with your doctor',
          body: "Bring these results to your next checkup. Ask whether routine bloodwork (A1C, cholesterol) is up to date.",
        },
        {
          title: 'Consider a Lifestyle Change Program',
          body: 'If you want guided support — a coach and a small group over a year — a CDC-recognized program may be a good fit.',
          cta: { label: 'See programs in my area', href: '/lifestyle-programs' },
        },
      ],
    };
  }
  return {
    level: 'lower',
    label: 'Lower risk',
    color: '#1a6b3d',
    bg: 'rgba(0, 120, 51, 0.12)',
    headline: "Your habits are working in your favor — keep it up.",
    summary:
      "Based on your answers, your day-to-day choices are supporting good long-term health. Risk can shift over time, so it's still worth checking in with your doctor each year and reinforcing the habits that are working.",
    nextSteps: [
      {
        title: 'Lock in what is working',
        body: 'Use a simple plan to keep the habits that are protecting your health from drifting.',
        cta: { label: 'Make my plan', href: '/action/plan-my-path' },
      },
      {
        title: 'Stay on top of routine screenings',
        body: 'Annual blood pressure, cholesterol, and blood sugar checks catch changes early — when they are easiest to reverse.',
      },
    ],
  };
}

function AssessmentChronicConditions({ onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex, isComplete]);

  const steps = useMemo(
    () => [
      AGE_QUESTION,
      FAMILY_HISTORY_QUESTION,
      'heightWeight',
      PHYSICAL_ACTIVITY_QUESTION,
      DIET_QUESTION,
      TOBACCO_QUESTION,
      ALCOHOL_QUESTION,
      SLEEP_STRESS_QUESTION,
    ],
    []
  );

  const totalSteps = steps.length;
  const currentStep = steps[currentIndex];
  const isHeightWeightStep = currentStep === 'heightWeight';
  const progress = ((currentIndex + (isComplete ? 1 : 0)) / totalSteps) * 100;

  const getScoreForAnswer = (question, value) => {
    if (!question || question === 'heightWeight') return 0;
    if (question.type === 'radio') {
      const opt = question.options.find((o) => o.value === value);
      return opt ? (opt.score ?? 0) : 0;
    }
    return 0;
  };

  const totalScore = useMemo(() => {
    let score = 0;
    steps.forEach((step) => {
      if (step === 'heightWeight') {
        score += getBmiScore(answers.heightInches, answers.weightLbs);
      } else if (step && step.id) {
        const val = answers[step.id];
        if (val !== undefined && val !== null) score += getScoreForAnswer(step, val);
      }
    });
    return score;
  }, [answers, steps]);

  const handleNext = () => {
    if (isHeightWeightStep) {
      if (!answers.heightInches || !answers.weightLbs) return;
      if (currentIndex < totalSteps - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setIsComplete(true);
      }
      return;
    }

    const val = answers[currentStep?.id];
    const hasAnswer = val !== undefined && val !== null && val !== '';
    if (!hasAnswer) return;

    if (currentIndex < totalSteps - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const canProceed = () => {
    if (isHeightWeightStep) {
      return !!answers.heightInches && !!answers.weightLbs;
    }
    const val = answers[currentStep?.id];
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
            Your chronic condition risk snapshot
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: '#323a45',
              marginBottom: '1.5rem',
              lineHeight: 1.6,
            }}
          >
            This is a starting point, not a diagnosis. It looks across the lifestyle and family-history factors that drive most chronic conditions — type 2 diabetes, heart disease, stroke, COPD, and certain cancers — and gives you one number to help you decide what to do next.
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
              Your risk score
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
              onClick={() => {
                setCurrentIndex(0);
                setIsComplete(false);
                setAnswers({});
              }}
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
          Question {currentIndex + 1} of {totalSteps}
        </p>

        {isHeightWeightStep ? (
          <>
            <h2
              style={{
                fontFamily: 'var(--font-header)',
                fontWeight: 700,
                color: '#1b1b1b',
                marginBottom: '0.5rem',
                fontSize: '1.5rem',
                lineHeight: 1.3,
              }}
            >
              What is your height and weight?
            </h2>
            <p
              style={{
                fontSize: '0.9rem',
                fontFamily: 'var(--font-body)',
                color: '#5c5c5c',
                marginBottom: '1rem',
              }}
            >
              We use this to estimate body mass index (BMI), one of the strongest predictors of chronic disease risk.
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  color: '#1b1b1b',
                  marginBottom: '0.5rem',
                }}
              >
                Height
              </label>
              <select
                value={answers.heightInches ?? ''}
                onChange={(e) => handleChange('heightInches', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '0.25rem',
                  backgroundColor: '#ffffff',
                  color: '#1b1b1b',
                  marginBottom: '1rem',
                }}
              >
                <option value="">Choose height...</option>
                {HEIGHT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  color: '#1b1b1b',
                  marginBottom: '0.5rem',
                }}
              >
                Weight (lbs)
              </label>
              <select
                value={answers.weightLbs ?? ''}
                onChange={(e) => handleChange('weightLbs', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '0.25rem',
                  backgroundColor: '#ffffff',
                  color: '#1b1b1b',
                }}
              >
                <option value="">Choose weight...</option>
                {WEIGHT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            <h2
              style={{
                fontFamily: 'var(--font-header)',
                fontWeight: 700,
                color: '#1b1b1b',
                marginBottom: currentStep.subtext ? '0.5rem' : '1.5rem',
                fontSize: '1.5rem',
                lineHeight: 1.3,
              }}
            >
              {currentStep.question}
            </h2>
            {currentStep.subtext && (
              <p
                style={{
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-body)',
                  color: '#5c5c5c',
                  marginBottom: '1rem',
                }}
              >
                {currentStep.subtext}
              </p>
            )}

            <div style={{ marginBottom: '2rem' }}>
              <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
                {currentStep.options.map((opt) => (
                  <label
                    key={opt.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '1rem 1.25rem',
                      marginBottom: '0.75rem',
                      cursor: 'pointer',
                      border:
                        answers[currentStep.id] === opt.value
                          ? '2px solid #005ea2'
                          : '2px solid #e0e0e0',
                      backgroundColor: '#ffffff',
                      borderRadius: '0.25rem',
                    }}
                  >
                    <input
                      type="radio"
                      name={currentStep.id}
                      value={opt.value}
                      checked={answers[currentStep.id] === opt.value}
                      onChange={() => handleChange(currentStep.id, opt.value)}
                      style={{ marginRight: '0.75rem', accentColor: '#005ea2' }}
                    />
                    <span style={{ fontFamily: 'var(--font-body)', color: '#1b1b1b' }}>{opt.label}</span>
                  </label>
                ))}
              </fieldset>
            </div>
          </>
        )}

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
            {currentIndex < totalSteps - 1 ? 'Next' : 'See results'}
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

export default AssessmentChronicConditions;

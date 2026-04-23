import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanPathStepProgress from './planMyPath/PlanPathStepProgress';
import PlanPathBackLink from './planMyPath/PlanPathBackLink';
import { TOTAL_STEPS, TEAL, TEAL_DARK, BANNER_BG } from './planMyPath/planPathConstants';

const PARTICIPATION_KEY = 'planMyPathParticipation';
const TIME_KEY = 'planMyPathTimePreferences';

const PARTICIPATION = [
  {
    id: 'in-person',
    title: 'In person',
    body: 'In person, so I can see my coach and fellow participants directly.',
  },
  {
    id: 'online',
    title: 'Online',
    body: 'Online, so I can participate on my own schedule.',
  },
  {
    id: 'distance',
    title: 'Distance Learning',
    body: 'Distance Learning, so I can participate in scheduled classes from the comfort of my home.',
  },
];

const TIME_PREFS = [
  {
    id: 'morning',
    label: 'Morning',
    body: "In the morning. I'm a morning person!",
    iconColor: '#ca8a04',
  },
  {
    id: 'afternoon',
    label: 'Afternoon',
    body: "In the afternoon. That's when I have the most free time!",
    iconColor: '#5b9bd5',
  },
  {
    id: 'evening',
    label: 'Evening',
    body: 'In the evening. I have more flexibility at the end of the day.',
    iconColor: '#1e3a5f',
  },
  {
    id: 'weekend',
    label: 'Weekend',
    body: "On the weekend. I know I'll have time.",
    iconColor: TEAL,
  },
];

function IllustrationInPerson() {
  return (
    <svg width="120" height="100" viewBox="0 0 120 100" aria-hidden style={{ display: 'block', margin: '0 auto' }}>
      <rect x="20" y="35" width="80" height="50" rx="4" fill="#e7f2f5" stroke="#005ea2" strokeWidth="1.5" />
      <path d="M28 45h64M28 55h48" stroke="#005ea2" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="60" cy="22" r="8" fill="#1b1b1b" />
      <path d="M52 32 L52 38 L68 38 L68 32 Q60 28 52 32" fill="#00687d" />
      <path d="M48 38 L48 62 L72 62 L72 38" fill="#00687d" />
    </svg>
  );
}

function IllustrationOnline() {
  return (
    <svg width="120" height="100" viewBox="0 0 120 100" aria-hidden style={{ display: 'block', margin: '0 auto' }}>
      <ellipse cx="60" cy="78" rx="35" ry="8" fill="#e0e0e0" />
      <rect x="38" y="48" width="44" height="28" rx="3" fill="#e7f2f5" stroke="#005ea2" strokeWidth="1.5" />
      <circle cx="60" cy="28" r="9" fill="#1b1b1b" />
      <path d="M52 38 L52 45 L68 45 L68 38" fill="#b8b8d4" />
      <path d="M54 45 L54 58 L66 58 L66 45" fill="#323a45" />
    </svg>
  );
}

function IllustrationDistance() {
  return (
    <svg width="120" height="100" viewBox="0 0 120 100" aria-hidden style={{ display: 'block', margin: '0 auto' }}>
      <rect x="42" y="18" width="36" height="58" rx="6" fill="#e7f2f5" stroke="#005ea2" strokeWidth="2" />
      <rect x="48" y="26" width="24" height="32" rx="2" fill="#ffffff" stroke="#c9c9c9" />
      <circle cx="54" cy="34" r="3" fill="#00687d" />
      <path d="M52 44h16M52 50h12" stroke="#c9c9c9" strokeWidth="1" />
      <circle cx="60" cy="12" r="7" fill="#1b1b1b" />
      <path d="M54 20 L54 28 L66 28 L66 20" fill="#008480" />
    </svg>
  );
}

function TimeIcon({ id, color }) {
  const common = { width: 48, height: 48, viewBox: '0 0 48 48', fill: 'none', 'aria-hidden': true };
  switch (id) {
    case 'morning':
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="12" stroke={color} strokeWidth="2" />
          <path d="M24 12v4M24 32v4M12 24h4M32 24h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'afternoon':
      return (
        <svg {...common}>
          <path d="M14 28c2-8 10-14 20-14 8 0 14 4 16 10" stroke={color} strokeWidth="2" fill="none" />
          <circle cx="30" cy="18" r="6" stroke={color} strokeWidth="2" />
        </svg>
      );
    case 'evening':
      return (
        <svg {...common}>
          <path d="M12 28c4-6 12-10 20-10s16 4 20 10" stroke={color} strokeWidth="2" fill="none" />
          <path d="M32 14l2 2M36 18l2 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'weekend':
      return (
        <svg {...common}>
          <rect x="12" y="14" width="24" height="24" rx="3" stroke={color} strokeWidth="2" />
          <path d="M12 20h24M18 12v4M30 12v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function participationIllustration(id) {
  switch (id) {
    case 'in-person':
      return <IllustrationInPerson />;
    case 'online':
      return <IllustrationOnline />;
    case 'distance':
      return <IllustrationDistance />;
    default:
      return null;
  }
}

const PlanMyPathClassPreferences = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [participation, setParticipation] = useState(() => {
    try {
      const raw = sessionStorage.getItem(PARTICIPATION_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [timePrefs, setTimePrefs] = useState(() => {
    try {
      const raw = sessionStorage.getItem(TIME_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const togglePart = useCallback((id) => {
    setParticipation((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleTime = useCallback((id) => {
    setTimePrefs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const continueNext = () => {
    try {
      sessionStorage.setItem(PARTICIPATION_KEY, JSON.stringify([...participation]));
      sessionStorage.setItem(TIME_KEY, JSON.stringify([...timePrefs]));
    } catch {
      /* ignore */
    }
    navigate('/action/plan-my-path/select-date');
  };

  const pad = isMobile ? '1.75rem 1.25rem 3rem' : '3rem 2rem 4rem';

  const cardBase = (isOn) => ({
    cursor: 'pointer',
    backgroundColor: isOn ? 'rgba(0, 104, 125, 0.08)' : '#ffffff',
    border: `2px solid ${isOn ? TEAL : '#e0e0e0'}`,
    borderRadius: '0.5rem',
    boxShadow: isOn ? '0 2px 10px rgba(0, 104, 125, 0.15)' : '0 2px 6px rgba(0,0,0,0.06)',
    fontFamily: 'var(--font-body)',
  });

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '80vh' }}>
      <section
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          padding: pad,
          fontFamily: 'var(--font-body)',
        }}
      >
        <PlanPathBackLink to="/action/plan-my-path/barriers" isMobile={isMobile}>
          ← Back to previous step
        </PlanPathBackLink>

        <PlanPathStepProgress currentStep={5} totalSteps={TOTAL_STEPS} />

        <h1
          style={{
            textAlign: 'center',
            fontSize: isMobile ? '1.625rem' : '1.875rem',
            fontFamily: 'var(--font-header)',
            fontWeight: 700,
            color: '#1b1b1b',
            margin: '0 0 1.75rem 0',
            lineHeight: 1.25,
          }}
        >
          Class Preferences
        </h1>

        <div
          style={{
            backgroundColor: BANNER_BG,
            borderRadius: '0.5rem',
            padding: isMobile ? '1.125rem 1.25rem' : '1.375rem 1.5rem',
            marginBottom: '2rem',
            border: '1px solid #e0e0e0',
            boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
          }}
        >
          <p
            style={{
              margin: '0 0 1rem 0',
              fontSize: '1.0625rem',
              lineHeight: 1.65,
              color: '#323a45',
              textAlign: 'left',
            }}
          >
            Great work. Just a few more questions and your plan will be finished! Let&apos;s look at how the program
            and class schedule could fit into your life.
          </p>
          <p style={{ margin: 0, fontSize: '1.0625rem', lineHeight: 1.65, color: '#323a45', textAlign: 'left' }}>
            Many providers offer the program, so you can find a class that works best for you. These providers must meet
            CDC standards for recognition and use CDC-approved materials for classes.
          </p>
        </div>

        <p
          style={{
            fontSize: '1.0625rem',
            fontWeight: 700,
            color: '#1b1b1b',
            margin: '0 0 0.35rem 0',
            textAlign: 'left',
          }}
        >
          I would prefer to participate in classes:
        </p>
        <p
          style={{
            fontSize: '0.9375rem',
            fontStyle: 'italic',
            color: '#323a45',
            margin: '0 0 1.25rem 0',
            textAlign: 'left',
          }}
        >
          Click all the boxes that are right for you.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}
        >
          {PARTICIPATION.map((p) => {
            const isOn = participation.has(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => togglePart(p.id)}
                aria-pressed={isOn}
                style={{
                  ...cardBase(isOn),
                  padding: '1.25rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  textAlign: 'center',
                }}
              >
                <div style={{ marginBottom: '0.75rem' }}>{participationIllustration(p.id)}</div>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#1b1b1b', marginBottom: '0.5rem' }}>
                  {p.title}
                </span>
                <span style={{ fontSize: '0.875rem', lineHeight: 1.5, color: '#323a45' }}>{p.body}</span>
              </button>
            );
          })}
        </div>

        <p
          style={{
            fontSize: '1.0625rem',
            fontWeight: 700,
            color: '#1b1b1b',
            margin: '0 0 0.35rem 0',
            textAlign: 'left',
          }}
        >
          I would want to go to a class:
        </p>
        <p
          style={{
            fontSize: '0.9375rem',
            fontStyle: 'italic',
            color: '#323a45',
            margin: '0 0 1.25rem 0',
            textAlign: 'left',
          }}
        >
          Click all the boxes that are right for you.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))',
            gap: '0.75rem',
            marginBottom: '2rem',
          }}
        >
          {TIME_PREFS.map((t) => {
            const isOn = timePrefs.has(t.id);
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => toggleTime(t.id)}
                aria-pressed={isOn}
                style={{
                  ...cardBase(isOn),
                  padding: '1rem 0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  minHeight: 160,
                }}
              >
                <TimeIcon id={t.id} color={t.iconColor} />
                <span
                  style={{
                    fontSize: '0.9375rem',
                    fontWeight: 700,
                    color: '#1b1b1b',
                    margin: '0.5rem 0 0.35rem',
                  }}
                >
                  {t.label}
                </span>
                <span style={{ fontSize: '0.8125rem', lineHeight: 1.4, color: '#323a45' }}>{t.body}</span>
              </button>
            );
          })}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={continueNext}
            style={{
              padding: '1rem 2.25rem',
              backgroundColor: TEAL,
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '1.0625rem',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              minWidth: 260,
              boxShadow: '0 2px 4px rgba(0, 104, 125, 0.25)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = TEAL_DARK;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = TEAL;
            }}
          >
            Select a Date
          </button>
        </div>
      </section>
    </div>
  );
};

export default PlanMyPathClassPreferences;

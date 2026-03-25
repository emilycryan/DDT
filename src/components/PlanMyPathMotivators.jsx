import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanPathStepProgress from './planMyPath/PlanPathStepProgress';
import PlanPathBackLink from './planMyPath/PlanPathBackLink';
import { TOTAL_STEPS, TEAL, TEAL_DARK, BANNER_BG } from './planMyPath/planPathConstants';

const STORAGE_KEY = 'planMyPathMotivators';
const OTHER_KEY = 'planMyPathMotivatorsOther';

const MOTIVATORS = [
  { id: 'lose-weight', label: 'Lose weight' },
  { id: 'family', label: 'Stay healthy for my family' },
  { id: 'energy', label: 'Feel more energized' },
  { id: 'active', label: 'Be more active' },
  { id: 'less-medicine', label: 'Take less medicine (such as high blood pressure medicine)' },
  { id: 'avoid-diabetes', label: "Avoid type 2 diabetes because I've seen what it can do" },
  { id: 'medical-bills', label: 'Reduce my chances of higher medical bills' },
  { id: 'avoid-conditions', label: 'Avoid serious medical conditions' },
  { id: 'prioritize', label: 'Prioritize my health' },
];

function MotivatorIcon({ id }) {
  const c = TEAL;
  const common = { width: 44, height: 44, viewBox: '0 0 48 48', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': true };
  switch (id) {
    case 'lose-weight':
      return (
        <svg {...common}>
          <rect x="12" y="28" width="24" height="8" rx="2" stroke={c} strokeWidth="2" />
          <path d="M16 28V22a8 8 0 0116 0v6" stroke={c} strokeWidth="2" />
          <path d="M20 18h8" stroke={c} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'family':
      return (
        <svg {...common}>
          <path d="M10 38V22l6-4 6 4v16" stroke={c} strokeWidth="2" strokeLinejoin="round" />
          <path d="M22 18c0-3 2-5 5-5h6c3 0 5 2 5 5v20H22V18z" stroke={c} strokeWidth="2" />
          <path d="M28 14l4-2 4 2" fill={c} opacity="0.35" />
        </svg>
      );
    case 'energy':
      return (
        <svg {...common}>
          <circle cx="18" cy="20" r="5" stroke={c} strokeWidth="2" />
          <circle cx="30" cy="20" r="5" stroke={c} strokeWidth="2" />
          <path d="M24 12v4M24 8l-2 2M24 8l2 2" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 28c2 4 6 6 10 6s8-2 10-6" stroke={c} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'active':
      return (
        <svg {...common}>
          <path d="M14 34h20M18 18h12v4H18v-4zM20 22v12M28 22v12M16 34h16" stroke={c} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'less-medicine':
      return (
        <svg {...common}>
          <rect x="16" y="14" width="16" height="22" rx="8" stroke={c} strokeWidth="2" />
          <path d="M24 18v14" stroke={c} strokeWidth="2" />
        </svg>
      );
    case 'avoid-diabetes':
      return (
        <svg {...common}>
          <path d="M18 18c-4 4-4 10 0 14l-4 6h12l-4-6c4-4 4-10 0-14" stroke={c} strokeWidth="2" strokeLinejoin="round" />
          <path d="M22 18c2 0 4-2 4-4" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="30" cy="20" r="3" fill={c} opacity="0.4" />
        </svg>
      );
    case 'medical-bills':
      return (
        <svg {...common}>
          <rect x="14" y="16" width="20" height="18" rx="2" stroke={c} strokeWidth="2" />
          <path d="M16 22h16M24 14v16" stroke={c} strokeWidth="2" />
          <circle cx="32" cy="12" r="4" fill={c} />
        </svg>
      );
    case 'avoid-conditions':
      return (
        <svg {...common}>
          <path d="M16 38V18l8-6 8 6v20" stroke={c} strokeWidth="2" strokeLinejoin="round" />
          <path d="M22 26h8M22 30h8" stroke={c} strokeWidth="2" strokeLinecap="round" />
          <rect x="20" y="10" width="12" height="6" rx="1" stroke={c} strokeWidth="2" />
        </svg>
      );
    case 'prioritize':
      return (
        <svg {...common}>
          <rect x="14" y="14" width="20" height="20" rx="3" stroke={c} strokeWidth="2" />
          <path d="M24 20v12M18 26h12" stroke={c} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

const PlanMyPathMotivators = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selected, setSelected] = useState(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [other, setOther] = useState(() => {
    try {
      return sessionStorage.getItem(OTHER_KEY) || '';
    } catch {
      return '';
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggle = useCallback((id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const persistAndContinue = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...selected]));
      sessionStorage.setItem(OTHER_KEY, other.trim());
    } catch {
      /* ignore */
    }
    navigate('/support/plan-my-path/dpp-info');
  };

  const pad = isMobile ? '1.75rem 1.25rem 3rem' : '3rem 2rem 4rem';

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '80vh' }}>
      <section
        style={{
          maxWidth: 920,
          margin: '0 auto',
          padding: pad,
          fontFamily: 'var(--font-body)',
        }}
      >
        <PlanPathBackLink to="/support/plan-my-path" isMobile={isMobile}>
          ← Back to previous step
        </PlanPathBackLink>

        <PlanPathStepProgress currentStep={2} totalSteps={TOTAL_STEPS} />

        <h1
          style={{
            textAlign: 'center',
            fontSize: isMobile ? '1.625rem' : '1.875rem',
            fontFamily: 'var(--font-header)',
            fontWeight: 700,
            color: '#1b1b1b',
            margin: '0 0 1.75rem 0',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
          }}
        >
          Identifying Motivators
        </h1>

        <div
          style={{
            backgroundColor: BANNER_BG,
            borderRadius: '0.5rem',
            padding: isMobile ? '1.125rem 1.25rem' : '1.375rem 1.5rem',
            marginBottom: '1.75rem',
            border: '1px solid #e0e0e0',
            boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '1.0625rem',
              lineHeight: 1.65,
              color: '#323a45',
              textAlign: 'center',
            }}
          >
            Congratulations on taking this step toward a healthier life! What is motivating you to take this step?
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
          I want to create a healthier life because I want to:
        </p>
        <p
          style={{
            fontSize: '0.9375rem',
            fontStyle: 'italic',
            color: '#323a45',
            margin: '0 0 1.5rem 0',
            textAlign: 'left',
          }}
        >
          Click on all the boxes that relate to you or write in your own reason.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(5, minmax(0, 1fr))',
            gap: '0.75rem',
            marginBottom: '1.5rem',
          }}
        >
          {MOTIVATORS.map((m) => {
            const isOn = selected.has(m.id);
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => toggle(m.id)}
                aria-pressed={isOn}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '0.75rem',
                  minHeight: 140,
                  padding: '1rem 0.75rem',
                  backgroundColor: isOn ? 'rgba(0, 104, 125, 0.08)' : '#ffffff',
                  border: `2px solid ${isOn ? TEAL : '#e0e0e0'}`,
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  boxShadow: isOn ? '0 2px 8px rgba(0, 104, 125, 0.15)' : '0 1px 3px rgba(0,0,0,0.08)',
                  fontFamily: 'var(--font-body)',
                  textAlign: 'center',
                }}
              >
                <MotivatorIcon id={m.id} />
                <span
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    lineHeight: 1.35,
                    color: '#1b1b1b',
                  }}
                >
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label
            htmlFor="motivators-other"
            style={{
              display: 'block',
              fontSize: '1rem',
              fontWeight: 700,
              color: '#1b1b1b',
              marginBottom: '0.5rem',
            }}
          >
            Other:
          </label>
          <textarea
            id="motivators-other"
            value={other}
            onChange={(e) => setOther(e.target.value)}
            rows={4}
            placeholder="Add your own reason…"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '0.875rem 1rem',
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              color: '#1b1b1b',
              border: '1px solid #c9c9c9',
              borderRadius: '0.375rem',
              resize: 'vertical',
              minHeight: 100,
              outline: 'none',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = TEAL;
              e.target.style.boxShadow = `0 0 0 3px rgba(0, 104, 125, 0.2)`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#c9c9c9';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={persistAndContinue}
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
              minWidth: 280,
              boxShadow: '0 2px 4px rgba(0, 104, 125, 0.25)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = TEAL_DARK;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = TEAL;
            }}
          >
            Learn About the Program
          </button>
        </div>
      </section>
    </div>
  );
};

export default PlanMyPathMotivators;

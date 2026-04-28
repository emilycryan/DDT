import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanPathStepProgress from './planMyPath/PlanPathStepProgress';
import PlanPathBackLink from './planMyPath/PlanPathBackLink';
import { TOTAL_STEPS, TEAL, TEAL_DARK, BANNER_BG } from './planMyPath/planPathConstants';

const STORAGE_KEY = 'planMyPathBarriers';
const OTHER_KEY = 'planMyPathBarriersOther';

const BARRIERS = [
  { id: 'caregiver', label: 'Caregiver duties (childcare or other)' },
  { id: 'family-meals', label: 'Family meals' },
  { id: 'schedule', label: 'Schedule changes' },
  { id: 'travel', label: 'Travel plans' },
  { id: 'transportation', label: 'Transportation' },
  { id: 'pet', label: 'Pet care' },
  { id: 'prior-commitments', label: 'Prior commitments' },
];

function BarrierIcon({ id }) {
  const c = TEAL;
  const common = { width: 44, height: 44, viewBox: '0 0 48 48', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': true };
  switch (id) {
    case 'caregiver':
      return (
        <svg {...common}>
          <circle cx="18" cy="16" r="5" stroke={c} strokeWidth="2" />
          <path d="M12 38v-6a6 6 0 0112 0v6M28 22h8v16M32 18v4" stroke={c} strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="34" cy="14" rx="4" ry="5" stroke={c} strokeWidth="2" />
        </svg>
      );
    case 'family-meals':
      return (
        <svg {...common}>
          <path d="M18 14h8v20H18V14zM22 10v4" stroke={c} strokeWidth="2" />
          <ellipse cx="28" cy="30" rx="10" ry="4" stroke={c} strokeWidth="2" />
          <path d="M14 34h20" stroke={c} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'schedule':
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="14" stroke={c} strokeWidth="2" />
          <path d="M24 16v10l6 4" stroke={c} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'travel':
      return (
        <svg {...common}>
          <rect x="14" y="18" width="20" height="18" rx="2" stroke={c} strokeWidth="2" />
          <path d="M14 24h20M20 14v4M28 14v4" stroke={c} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'transportation':
      return (
        <svg {...common}>
          <rect x="10" y="22" width="12" height="14" stroke={c} strokeWidth="2" />
          <rect x="26" y="26" width="14" height="10" rx="1" stroke={c} strokeWidth="2" />
          <circle cx="16" cy="38" r="3" stroke={c} strokeWidth="2" />
          <circle cx="32" cy="38" r="3" stroke={c} strokeWidth="2" />
          <path d="M22 28h8" stroke={c} strokeWidth="2" />
        </svg>
      );
    case 'pet':
      return (
        <svg {...common}>
          <ellipse cx="24" cy="26" rx="12" ry="10" stroke={c} strokeWidth="2" />
          <path d="M14 20l-4-4M34 20l4-4M18 14l-2-6M30 14l2-6" stroke={c} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'prior-commitments':
      return (
        <svg {...common}>
          <rect x="14" y="16" width="20" height="20" rx="2" stroke={c} strokeWidth="2" />
          <path d="M14 22h20M20 14v-4h8v4" stroke={c} strokeWidth="2" />
          <path d="M30 12l4-2 2 4" stroke={c} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

const PlanMyPathBarriers = () => {
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
    navigate('/action/plan-my-path/class-preferences');
  };

  const pad = isMobile ? '1.75rem 1.25rem 3rem' : '3rem 2rem 4rem';

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '80vh' }}>
      <section
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: pad,
          fontFamily: 'var(--font-body)',
        }}
      >
        <PlanPathBackLink to="/action/plan-my-path/dpp-info" isMobile={isMobile}>
          ← Back to previous step
        </PlanPathBackLink>

        <PlanPathStepProgress currentStep={4} totalSteps={TOTAL_STEPS} />

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
          Identifying Barriers
        </h1>

        <div
          style={{
            backgroundColor: BANNER_BG,
            borderRadius: '0.5rem',
            padding: isMobile ? '1.125rem 1.25rem' : '1.375rem 1.5rem',
            marginBottom: '1.75rem',
            border: '1px solid var(--primary-darker)',
            boxShadow: '0 8px 18px rgba(26, 68, 128, 0.18)',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '1.0625rem',
              lineHeight: 1.65,
              color: '#ffffff',
              textAlign: 'center',
            }}
          >
            The path to change is not always simple. Take some time to think about the challenges you may be facing
            along the way. Planning for them now can make facing them in real life much easier.
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
          To be able to enroll in the program and attend classes, I need to plan for:
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
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))',
            gap: '0.75rem',
            marginBottom: '1.5rem',
          }}
        >
          {BARRIERS.map((b, index) => {
            const isOn = selected.has(b.id);
            const spanLast = !isMobile && index === 6;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => toggle(b.id)}
                aria-pressed={isOn}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '0.875rem',
                  minHeight: 88,
                  padding: '0.875rem 1rem',
                  backgroundColor: isOn ? 'rgba(0, 94, 162, 0.08)' : '#ffffff',
                  border: `2px solid ${isOn ? TEAL : '#e0e0e0'}`,
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  boxShadow: isOn ? 'inset 0 4px 0 var(--primary-dark), 0 8px 18px rgba(0, 94, 162, 0.14)' : '0 1px 3px rgba(0,0,0,0.08)',
                  fontFamily: 'var(--font-body)',
                  textAlign: 'left',
                  gridColumn: spanLast ? '1 / -1' : undefined,
                  justifySelf: spanLast ? 'center' : undefined,
                  width: spanLast ? '100%' : undefined,
                  maxWidth: spanLast ? 420 : undefined,
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <BarrierIcon id={b.id} />
                </div>
                <span
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    lineHeight: 1.4,
                    color: '#1b1b1b',
                  }}
                >
                  {b.label}
                </span>
              </button>
            );
          })}
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label
            htmlFor="barriers-other"
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
            id="barriers-other"
            value={other}
            onChange={(e) => setOther(e.target.value)}
            rows={4}
            placeholder="Add your own barrier…"
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
              e.target.style.boxShadow = `0 0 0 3px rgba(0, 94, 162, 0.22)`;
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
              boxShadow: '0 2px 4px rgba(0, 94, 162, 0.25)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = TEAL_DARK;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = TEAL;
            }}
          >
            Select a Class
          </button>
        </div>
      </section>
    </div>
  );
};

export default PlanMyPathBarriers;

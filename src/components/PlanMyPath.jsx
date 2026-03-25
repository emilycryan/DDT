import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanPathStepProgress from './planMyPath/PlanPathStepProgress';
import PlanPathBackLink from './planMyPath/PlanPathBackLink';
import { TOTAL_STEPS, TEAL, TEAL_DARK, BANNER_BG } from './planMyPath/planPathConstants';

const CURRENT_STEP = 1;

/** Decorative flat illustration — not a photo asset */
function PlanPathPeopleIllustration() {
  return (
    <svg
      width="100%"
      height="auto"
      viewBox="0 0 400 220"
      aria-hidden
      style={{ maxWidth: 360, display: 'block', margin: '0 auto' }}
    >
      <rect x="40" y="140" width="80" height="60" rx="8" fill="#e0e0e0" opacity="0.6" />
      <circle cx="320" cy="50" r="36" fill="#e0e0e0" opacity="0.45" />
      <path d="M280 180 L360 180 L340 200 L300 200 Z" fill="#e0e0e0" opacity="0.35" />
      <circle cx="70" cy="45" r="3" fill="#c9c9c9" />
      <circle cx="95" cy="55" r="2" fill="#c9c9c9" />
      <circle cx="85" cy="72" r="2.5" fill="#c9c9c9" />
      <path d="M300 30 L340 30" stroke="#c9c9c9" strokeWidth="1" strokeDasharray="4 6" />
      <path d="M305 40 L350 40" stroke="#c9c9c9" strokeWidth="1" strokeDasharray="4 6" />

      <ellipse cx="155" cy="118" rx="22" ry="26" fill="#1b1b1b" />
      <path
        d="M130 155 Q125 195 120 210 L190 210 Q185 175 180 155 Q168 140 155 135 Q142 140 130 155"
        fill="#008480"
      />
      <path d="M125 175 L115 210 L135 210 Z" fill="#1b1b1b" />
      <path d="M185 175 L195 210 L175 210 Z" fill="#1b1b1b" />

      <ellipse cx="248" cy="112" rx="20" ry="24" fill="#4a3728" />
      <path
        d="M225 148 Q218 188 212 210 L288 210 Q278 178 272 148 Q262 128 248 125 Q234 128 225 148"
        fill="#b8b8d4"
      />
      <path d="M218 172 L208 210 L228 210 Z" fill="#1b1b1b" />
      <path d="M278 172 L288 210 L268 210 Z" fill="#1b1b1b" />
    </svg>
  );
}

/**
 * Step 1 of the Plan my Path Action Plan questionnaire.
 */
const PlanMyPath = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [firstName, setFirstName] = useState(() => {
    try {
      return sessionStorage.getItem('planMyPathFirstName') || '';
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

  const handleContinue = () => {
    try {
      sessionStorage.setItem('planMyPathFirstName', firstName.trim());
    } catch {
      /* ignore */
    }
    navigate('/support/plan-my-path/motivators');
  };

  const pad = isMobile ? '1.75rem 1.25rem 3rem' : '3rem 2rem 4rem';

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '80vh' }}>
      <section
        style={{
          maxWidth: 640,
          margin: '0 auto',
          padding: pad,
          fontFamily: 'var(--font-body)',
        }}
      >
        <PlanPathBackLink to="/support" isMobile={isMobile}>
          ← Back to Support
        </PlanPathBackLink>

        <PlanPathStepProgress currentStep={CURRENT_STEP} totalSteps={TOTAL_STEPS} />

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
          General information
        </h1>

        <div
          style={{
            backgroundColor: BANNER_BG,
            borderRadius: '0.5rem',
            padding: isMobile ? '1.125rem 1.25rem' : '1.375rem 1.5rem',
            marginBottom: '2.5rem',
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
            Welcome to your personalized Action Plan. After you answer a few more questions, your plan will be
            finished. Let&apos;s start with the basics.
          </p>
        </div>

        <div style={{ marginBottom: '2.5rem' }}>
          <label
            htmlFor="plan-first-name"
            style={{
              display: 'block',
              fontSize: '1.0625rem',
              fontWeight: 700,
              color: '#1b1b1b',
              marginBottom: '0.75rem',
              textAlign: 'center',
            }}
          >
            What is your first name?
          </label>
          <input
            id="plan-first-name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Emily"
            style={{
              display: 'block',
              width: '100%',
              maxWidth: 400,
              margin: '0 auto',
              boxSizing: 'border-box',
              padding: '0.875rem 1.125rem',
              fontSize: '1.0625rem',
              fontFamily: 'var(--font-body)',
              color: '#1b1b1b',
              border: '1px solid #c9c9c9',
              borderRadius: '0.375rem',
              backgroundColor: '#ffffff',
              textAlign: 'center',
              outline: 'none',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = TEAL;
              e.target.style.boxShadow = `inset 0 1px 2px rgba(0,0,0,0.04), 0 0 0 3px rgba(0, 104, 125, 0.2)`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#c9c9c9';
              e.target.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.04)';
            }}
          />
        </div>

        <div style={{ marginBottom: '2.75rem' }}>
          <PlanPathPeopleIllustration />
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={handleContinue}
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
            Identify Motivators
          </button>
        </div>
      </section>
    </div>
  );
};

export default PlanMyPath;

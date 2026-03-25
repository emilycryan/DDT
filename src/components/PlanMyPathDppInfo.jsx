import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanPathStepProgress from './planMyPath/PlanPathStepProgress';
import PlanPathBackLink from './planMyPath/PlanPathBackLink';
import { TOTAL_STEPS, TEAL, TEAL_DARK, BANNER_BG, SUCCESS_GREEN, SUCCESS_BG } from './planMyPath/planPathConstants';

const iconWrap = {
  width: 48,
  height: 48,
  borderRadius: '0.5rem',
  backgroundColor: '#e7f2f5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '1rem',
  flexShrink: 0,
};

function IconBook() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#005ea2" strokeWidth="2" aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <path d="M8 7h8M8 11h6" strokeLinecap="round" />
    </svg>
  );
}

function IconDollar() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#005ea2" strokeWidth="2" aria-hidden>
      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTip() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={SUCCESS_GREEN} strokeWidth="2" aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}

const PlanMyPathDppInfo = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        <PlanPathBackLink to="/support/plan-my-path/motivators" isMobile={isMobile}>
          ← Back to previous step
        </PlanPathBackLink>

        <PlanPathStepProgress currentStep={3} totalSteps={TOTAL_STEPS} />

        <h1
          style={{
            textAlign: 'center',
            fontSize: isMobile ? '1.5rem' : '1.75rem',
            fontFamily: 'var(--font-header)',
            fontWeight: 700,
            color: '#1b1b1b',
            margin: '0 0 1.75rem 0',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
          }}
        >
          National DPP Information &amp; Cost
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
              margin: 0,
              fontSize: '1.0625rem',
              lineHeight: 1.65,
              color: '#323a45',
              textAlign: 'center',
            }}
          >
            Awesome work! Now let&apos;s set your plan up for success. This program was built for people who are ready
            to create positive change and improve their health.
          </p>
        </div>

        {/* Two sections always visible — side by side on wide screens */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '1.25rem',
            marginBottom: '1.75rem',
            alignItems: 'stretch',
          }}
        >
          <article
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0e0',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ ...iconWrap }}>
              <IconBook />
            </div>
            <h2
              style={{
                fontSize: '1.125rem',
                fontFamily: 'var(--font-header)',
                fontWeight: 700,
                color: '#1b1b1b',
                margin: '0 0 0.75rem 0',
                lineHeight: 1.3,
              }}
            >
              What does the program look like?
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                color: '#323a45',
              }}
            >
              The National Diabetes Prevention Program offers a full year of support for healthy lifestyle change and is
              backed by the CDC. Expect weekly group sessions with a trained coach for the first six months, then monthly
              or twice-monthly meetings. You can join in person or online—providers follow CDC guidance while tailoring
              the experience to your schedule.
            </p>
          </article>

          <article
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0e0',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ ...iconWrap }}>
              <IconDollar />
            </div>
            <h2
              style={{
                fontSize: '1.125rem',
                fontFamily: 'var(--font-header)',
                fontWeight: 700,
                color: '#1b1b1b',
                margin: '0 0 0.75rem 0',
                lineHeight: 1.3,
              }}
            >
              What does the program cost?
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                color: '#323a45',
              }}
            >
              Many plans—including Medicare and some Medicaid programs—cover the program. Some are free or low-cost, and
              employers may cover it as well. Contact the program you&apos;re interested in for specific pricing.
            </p>
          </article>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '0.875rem',
            alignItems: 'flex-start',
            padding: '1rem 1.25rem',
            backgroundColor: SUCCESS_BG,
            border: `1px solid ${SUCCESS_GREEN}`,
            borderRadius: '0.5rem',
            marginBottom: '2rem',
          }}
        >
          <div style={{ flexShrink: 0, marginTop: 2 }}>
            <IconTip />
          </div>
          <p style={{ margin: 0, fontSize: '0.9375rem', lineHeight: 1.55, color: '#1b1b1b' }}>
            <strong style={{ color: SUCCESS_GREEN }}>Tip:</strong> Have your health insurance information ready when you
            contact a program provider.
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => navigate('/support/plan-my-path/barriers')}
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
            Identify Barriers
          </button>
        </div>
      </section>
    </div>
  );
};

export default PlanMyPathDppInfo;

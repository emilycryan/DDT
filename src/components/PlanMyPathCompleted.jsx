import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PlanPathStepProgress from './planMyPath/PlanPathStepProgress';
import { TOTAL_STEPS, TEAL, TEAL_DARK, BANNER_BG } from './planMyPath/planPathConstants';
import {
  MOTIVATOR_LABELS,
  BARRIER_LABELS,
  PARTICIPATION_ORDER,
  TIME_ORDER,
  PARTICIPATION_SUMMARY,
  TIME_SUMMARY,
  formatIsoDateUs,
} from './planMyPath/planPathSummaryHelpers';

function loadSessionJson(key, fallback) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function SummaryCard({ title, children, note }) {
  return (
    <article
      style={{
        border: '1px solid #dfe1e2',
        borderTop: '4px solid var(--primary-dark)',
        borderRadius: '0.5rem',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.25rem',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <h2
        style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-header)',
          fontWeight: 700,
          color: '#1b1b1b',
          margin: '0 0 0.75rem 0',
          lineHeight: 1.35,
        }}
      >
        {title}
      </h2>
      {children}
      {note != null ? (
        <div
          style={{
            margin: '1rem 0 0 0',
            fontSize: '0.875rem',
            fontStyle: 'italic',
            color: '#5c5c5c',
            lineHeight: 1.5,
          }}
        >
          {note}
        </div>
      ) : null}
    </article>
  );
}

const PlanMyPathCompleted = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const data = useMemo(() => {
    let firstName = '';
    try {
      firstName = sessionStorage.getItem('planMyPathFirstName') || '';
    } catch {
      /* ignore */
    }
    const displayName = firstName.trim() || 'you';
    const motivatorIds = loadSessionJson('planMyPathMotivators', []);
    const motivatorOther = (() => {
      try {
        return sessionStorage.getItem('planMyPathMotivatorsOther') || '';
      } catch {
        return '';
      }
    })();
    const barrierIds = loadSessionJson('planMyPathBarriers', []);
    const participationIds = loadSessionJson('planMyPathParticipation', []);
    const timeIds = loadSessionJson('planMyPathTimePreferences', []);
    let contactIso = '';
    try {
      contactIso = sessionStorage.getItem('planMyPathContactDate') || '';
    } catch {
      /* ignore */
    }

    const goalItems = motivatorIds.map((id) => MOTIVATOR_LABELS[id]).filter(Boolean);
    if (motivatorOther.trim()) goalItems.push(motivatorOther.trim());

    const logisticsItems = barrierIds.map((id) => BARRIER_LABELS[id]).filter(Boolean);
    try {
      const bo = sessionStorage.getItem('planMyPathBarriersOther') || '';
      if (bo.trim()) logisticsItems.push(bo.trim());
    } catch {
      /* ignore */
    }

    const prefLines = [];
    PARTICIPATION_ORDER.forEach((id) => {
      if (participationIds.includes(id) && PARTICIPATION_SUMMARY[id]) prefLines.push(PARTICIPATION_SUMMARY[id]);
    });
    TIME_ORDER.forEach((id) => {
      if (timeIds.includes(id) && TIME_SUMMARY[id]) prefLines.push(TIME_SUMMARY[id]);
    });

    return {
      displayName,
      goalItems,
      logisticsItems,
      prefLines,
      contactDisplay: formatIsoDateUs(contactIso),
    };
  }, []);

  const handlePrint = () => window.print();

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media print {
            .plan-print-hide { display: none !important; }
            .plan-completed-root { background: #fff !important; }
          }
        `,
        }}
      />
      <div className="plan-completed-root" style={{ backgroundColor: '#ffffff', minHeight: '80vh' }}>
        <section
          style={{
            maxWidth: 720,
            margin: '0 auto',
            padding: isMobile ? '1.75rem 1.25rem 3rem' : '3rem 2rem 4rem',
            fontFamily: 'var(--font-body)',
          }}
        >
          <div className="plan-print-hide">
            <div style={{ marginBottom: '1.5rem', textAlign: isMobile ? 'center' : 'left' }}>
              <Link
                to="/action"
                style={{
                  fontSize: '0.875rem',
                  color: '#005ea2',
                  textDecoration: 'underline',
                  fontWeight: 500,
                }}
              >
                ← Back to Take Action
              </Link>
            </div>
            <PlanPathStepProgress currentStep={7} totalSteps={TOTAL_STEPS} />
          </div>

          <h1
            style={{
              textAlign: 'center',
              fontSize: isMobile ? '1.625rem' : '1.875rem',
              fontFamily: 'var(--font-header)',
              fontWeight: 700,
              color: '#1b1b1b',
              margin: '0 0 1.5rem 0',
              lineHeight: 1.25,
            }}
          >
            {data.displayName === 'you' ? 'Your' : `${data.displayName}'s`} Completed Action Plan
          </h1>

          <div
            style={{
              backgroundColor: BANNER_BG,
              borderRadius: '0.5rem',
              padding: isMobile ? '1.125rem 1.25rem' : '1.375rem 1.5rem',
              marginBottom: '2rem',
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
              You have completed your Path 2 Prevention Action Plan! Review your plan below, print a copy, then move
              forward.
            </p>
          </div>

          <SummaryCard title="I am taking this step towards a healthier life because I want to:">
            {data.goalItems.length ? (
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#323a45', lineHeight: 1.6, fontSize: '0.9375rem' }}>
                {data.goalItems.map((line, i) => (
                  <li key={i} style={{ marginBottom: '0.35rem' }}>
                    {line}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ margin: 0, color: '#5c5c5c', fontSize: '0.9375rem' }}>No goals recorded yet.</p>
            )}
          </SummaryCard>

          <SummaryCard title="Before enrolling in the program and attending classes for a year, I need to plan for:">
            {data.logisticsItems.length ? (
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#323a45', lineHeight: 1.6, fontSize: '0.9375rem' }}>
                {data.logisticsItems.map((line, i) => (
                  <li key={i} style={{ marginBottom: '0.35rem' }}>
                    {line}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ margin: 0, color: '#5c5c5c', fontSize: '0.9375rem' }}>No items recorded yet.</p>
            )}
          </SummaryCard>

          <SummaryCard
            title="My preferred Program Provider will offer classes that take place:"
            note={
              <>
                Don&apos;t forget to use our{' '}
                <Link to="/lifestyle-programs" style={{ color: TEAL, fontWeight: 700, fontStyle: 'normal' }}>
                  Find a Program
                </Link>{' '}
                tool to find a program provider that meets your preferences and contact them!
              </>
            }
          >
            {data.prefLines.length ? (
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#323a45', lineHeight: 1.6, fontSize: '0.9375rem' }}>
                {data.prefLines.map((line, i) => (
                  <li key={i} style={{ marginBottom: '0.35rem' }}>
                    {line}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ margin: 0, color: '#5c5c5c', fontSize: '0.9375rem' }}>No preferences recorded yet.</p>
            )}
          </SummaryCard>

          <SummaryCard title="Once I find a Program Provider, I will contact them by:">
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#323a45', lineHeight: 1.6, fontSize: '0.9375rem' }}>
              <li>{data.contactDisplay}</li>
            </ul>
          </SummaryCard>

          <p
            style={{
              textAlign: 'center',
              fontSize: '1.0625rem',
              fontWeight: 600,
              color: '#1b1b1b',
              margin: '2rem 0 1.75rem',
              lineHeight: 1.5,
            }}
          >
            {data.displayName === 'you' ? (
              <>I am ready to begin my Path to Prevention.</>
            ) : (
              <>
                I, {data.displayName}, am ready to begin my Path to Prevention.
              </>
            )}
          </p>

          <div
            className="plan-print-hide"
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'stretch' : 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center', gap: '0.75rem' }}>
              <Link
                to="/action/plan-my-path"
                className="btn btn-secondary"
                style={{ gap: '0.5rem', textDecoration: 'none', minHeight: 44, padding: '0.65rem 1rem' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Edit My Plan
              </Link>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handlePrint}
                style={{ gap: '0.5rem', minHeight: 44, padding: '0.65rem 1rem' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z" />
                </svg>
                Print My Plan
              </button>
            </div>

            <button
              type="button"
              onClick={() => navigate('/lifestyle-programs')}
              style={{
                padding: '1rem 2rem',
                backgroundColor: TEAL,
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '1rem',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                minWidth: 200,
                boxShadow: '0 2px 4px rgba(0, 94, 162, 0.25)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = TEAL_DARK;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = TEAL;
              }}
            >
              Move Forward
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default PlanMyPathCompleted;

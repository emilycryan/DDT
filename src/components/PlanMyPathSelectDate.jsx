import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanPathStepProgress from './planMyPath/PlanPathStepProgress';
import PlanPathBackLink from './planMyPath/PlanPathBackLink';
import { TOTAL_STEPS, TEAL, TEAL_DARK, BANNER_BG } from './planMyPath/planPathConstants';

const CONTACT_DATE_KEY = 'planMyPathContactDate';

const PlanMyPathSelectDate = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [contactDate, setContactDate] = useState(() => {
    try {
      return sessionStorage.getItem(CONTACT_DATE_KEY) || '';
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

  const handleReview = () => {
    try {
      if (contactDate) sessionStorage.setItem(CONTACT_DATE_KEY, contactDate);
      else sessionStorage.removeItem(CONTACT_DATE_KEY);
    } catch {
      /* ignore */
    }
    navigate('/action/plan-my-path/completed');
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
        <div className="plan-print-hide">
          <PlanPathBackLink to="/action/plan-my-path/class-preferences" isMobile={isMobile}>
            ← Back to previous step
          </PlanPathBackLink>
        </div>

        <PlanPathStepProgress currentStep={6} totalSteps={TOTAL_STEPS} />

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
          Select a Date
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
            Last step! So far you have identified your motivation, your obstacles, and the type of class for you. Now,
            pick a date to contact a program provider.
          </p>
        </div>

        <label
          htmlFor="plan-contact-date"
          style={{
            display: 'block',
            fontSize: '1.0625rem',
            fontWeight: 700,
            color: '#1b1b1b',
            marginBottom: '0.75rem',
            textAlign: 'center',
          }}
        >
          I will contact a program provider by:
        </label>

        <div style={{ maxWidth: 400, margin: '0 auto 1.25rem' }}>
          <input
            id="plan-contact-date"
            type="date"
            value={contactDate}
            onChange={(e) => setContactDate(e.target.value)}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '0.875rem 1rem',
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              color: '#1b1b1b',
              border: '1px solid #c9c9c9',
              borderRadius: '0.375rem',
              backgroundColor: '#ffffff',
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

        <div style={{ position: 'relative', marginTop: '1.5rem' }}>
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: '50%',
              top: -9,
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderBottom: '10px solid #d0d0d0',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: -8,
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '9px solid transparent',
              borderRight: '9px solid transparent',
              borderBottom: '9px solid #f5f5f5',
            }}
          />
          <div
            style={{
              backgroundColor: '#f5f5f5',
              border: '1px solid #d0d0d0',
              borderRadius: '0.5rem',
              padding: '1.125rem 1.25rem',
            }}
          >
            <p style={{ margin: 0, fontSize: '0.9375rem', lineHeight: 1.6, color: '#323a45', textAlign: 'center' }}>
              Pick a date that works for your schedule, then add it to your calendar, write yourself a reminder, or even
              tell your family and friends about your plans!
            </p>
          </div>
        </div>

        <div className="plan-print-hide" style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button
            type="button"
            onClick={handleReview}
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
            Review Plan
          </button>
        </div>
      </section>
    </div>
  );
};

export default PlanMyPathSelectDate;

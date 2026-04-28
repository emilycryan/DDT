import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanPathStepProgress from './planMyPath/PlanPathStepProgress';
import PlanPathBackLink from './planMyPath/PlanPathBackLink';
import { TOTAL_STEPS, TEAL, TEAL_DARK, BANNER_BG } from './planMyPath/planPathConstants';

const CONTACT_DATE_KEY = 'planMyPathContactDate';
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function fromIsoDate(value) {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function formatDisplayDate(value) {
  const date = fromIsoDate(value);
  if (!date) return '';
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function buildCalendarDays(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

const PlanMyPathSelectDate = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [contactDate, setContactDate] = useState(() => {
    try {
      return sessionStorage.getItem(CONTACT_DATE_KEY) || '';
    } catch {
      return '';
    }
  });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => fromIsoDate(contactDate) || new Date());
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
  const calendarDays = useMemo(() => buildCalendarDays(visibleMonth), [visibleMonth]);
  const monthLabel = visibleMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const shiftMonth = (delta) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));
  };

  const selectDate = (date) => {
    setContactDate(toIsoDate(date));
    setVisibleMonth(date);
    setCalendarOpen(false);
  };

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

        <div style={{ maxWidth: 400, margin: '0 auto 1.25rem', position: 'relative' }}>
          <button
            id="plan-contact-date"
            type="button"
            aria-haspopup="dialog"
            aria-expanded={calendarOpen}
            onClick={() => setCalendarOpen((open) => !open)}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '0.875rem 3.35rem 0.875rem 1rem',
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              color: '#1b1b1b',
              border: '1px solid #c9c9c9',
              borderRadius: '0.375rem',
              backgroundColor: '#ffffff',
              outline: 'none',
              cursor: 'pointer',
              minHeight: 52,
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {contactDate ? formatDisplayDate(contactDate) : 'Select a date'}
          </button>

          <button
            type="button"
            aria-label="Open calendar"
            onClick={() => setCalendarOpen((open) => !open)}
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              width: 40,
              height: 40,
              border: 'none',
              borderRadius: '0.375rem',
              backgroundColor: TEAL,
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 10h18" strokeLinecap="round" />
            </svg>
          </button>

          {calendarOpen && (
            <div
              role="dialog"
              aria-label="Choose contact date"
              style={{
                position: 'absolute',
                top: 'calc(100% + 0.5rem)',
                right: 0,
                zIndex: 20,
                width: isMobile ? 'min(100%, 320px)' : 320,
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid #dfe1e2',
                borderTop: '4px solid var(--primary-dark)',
                backgroundColor: '#ffffff',
                boxShadow: '0 18px 36px rgba(26, 68, 128, 0.2)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <button type="button" onClick={() => shiftMonth(-1)} aria-label="Previous month" style={calendarNavButtonStyle}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.95rem', color: '#1b1b1b' }}>
                  {monthLabel}
                </div>
                <button type="button" onClick={() => shiftMonth(1)} aria-label="Next month" style={calendarNavButtonStyle}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
                {WEEKDAYS.map((day, index) => (
                  <div key={`${day}-${index}`} style={{ textAlign: 'center', fontSize: '0.72rem', fontWeight: 700, color: '#5c5c5c' }}>
                    {day}
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                {calendarDays.map((date) => {
                  const iso = toIsoDate(date);
                  const inMonth = date.getMonth() === visibleMonth.getMonth();
                  const isSelected = iso === contactDate;
                  return (
                    <button
                      key={iso}
                      type="button"
                      onClick={() => selectDate(date)}
                      style={{
                        height: 36,
                        border: `1px solid ${isSelected ? TEAL : 'transparent'}`,
                        borderRadius: '0.375rem',
                        backgroundColor: isSelected ? TEAL : 'transparent',
                        color: isSelected ? '#ffffff' : inMonth ? '#1b1b1b' : 'rgba(27, 27, 27, 0.35)',
                        fontFamily: 'var(--font-body)',
                        fontWeight: isSelected ? 700 : 600,
                        cursor: 'pointer',
                      }}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
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
              borderBottom: '10px solid #dfe1e2',
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
              borderBottom: '9px solid #ffffff',
            }}
          />
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #dfe1e2',
              borderTop: '4px solid #1b1b1b',
              borderRadius: '0.5rem',
              padding: '1.125rem 1.25rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
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
              boxShadow: '0 2px 4px rgba(0, 94, 162, 0.25)',
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

const calendarNavButtonStyle = {
  width: 34,
  height: 34,
  border: '1px solid #dfe1e2',
  borderRadius: '0.375rem',
  backgroundColor: '#ffffff',
  color: '#1b1b1b',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

export default PlanMyPathSelectDate;

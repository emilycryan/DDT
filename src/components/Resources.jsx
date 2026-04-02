import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* USWDS theme colors for icons and top bars */
const EDUCATIONAL_CARD_COLORS = [
  { accent: '#005ea2', iconBg: '#e7f2f5' },   /* Primary */
  { accent: '#d83933', iconBg: '#f9dede' },   /* Secondary — Heart Health */
  { accent: '#00bde3', iconBg: '#e5f6f9' },   /* Accent cool — Prevention card 3 */
];

const ACCENT_COOL_BLUE = EDUCATIONAL_CARD_COLORS[2].accent;

const educationalCards = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
      </svg>
    ),
    title: 'Diabetes Prevention',
    description: 'Over 96 million American adults have prediabetes — and most don\'t know it. Learn how modest weight loss and regular physical activity can cut your risk of type 2 diabetes by more than 50%.',
    bullets: [
      { text: 'Understanding Prediabetes', path: '/resources/prediabetes/understanding-prediabetes' },
      { text: 'Nutrition & Blood Sugar', path: '/resources/prediabetes/nutrition-blood-sugar' },
      { text: 'Physical Activity & Insulin Sensitivity', path: '/resources/prediabetes/exercise-insulin-sensitivity' },
      { text: 'DPP Program Overview', path: '/resources/prediabetes/dpp-program-overview' },
    ],
    linkText: 'Explore diabetes resources →',
    linkHref: '/resources/prediabetes/understanding-prediabetes',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Heart Health',
    description: 'Heart disease is the leading cause of death in the United States. Discover how lifestyle choices around nutrition, activity, stress, and sleep can measurably reduce your risk — at any age.',
    bullets: [
      { text: 'Know Your Numbers', path: '/resources/heart-health/know-your-numbers' },
      { text: 'Blood Pressure & Cholesterol', path: '/resources/heart-health/blood-pressure-cholesterol' },
      { text: 'Heart-Healthy Eating', path: '/resources/heart-health/heart-healthy-eating' },
      { text: 'Stress & Cardiovascular Risk', path: '/resources/heart-health/stress-cardiovascular-risk' },
    ],
    linkText: 'Explore heart health resources →',
    linkHref: '/resources/heart-health/know-your-numbers',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Overall Healthy Living',
    description: 'Prevention isn\'t one thing — it\'s a combination of daily habits. Find practical guidance on nutrition, physical activity, sleep, stress management, and social well-being that fit real life.',
    bullets: [
      { text: 'Building Healthy Habits', path: '/resources/healthy-living/building-healthy-habits' },
      { text: 'Sleep & Recovery', path: '/resources/healthy-living/sleep-recovery' },
      { text: 'Mental Health & Resilience', path: '/resources/healthy-living/mental-health-resilience' },
      { text: 'Social Connection', path: '/resources/healthy-living/social-connection' },
    ],
    linkText: 'Explore healthy living guides →',
    linkHref: '/resources/healthy-living/building-healthy-habits',
  },
];

const Resources = ({ onNavigate }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main style={{ minHeight: '80vh', backgroundColor: '#ffffff' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: isMobile ? '2rem 1rem' : '3rem 2rem',
        }}
      >
        {/* Breadcrumbs */}
        <nav
          style={{
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: '#5c5c5c',
          }}
          aria-label="Breadcrumb"
        >
          <Link to="/" style={{ color: '#005ea2', textDecoration: 'underline' }}>
            Home
          </Link>
          <span style={{ margin: '0 0.5rem', color: '#5c5c5c' }}>/</span>
          <span style={{ color: '#323a45', fontWeight: 600 }}>Resources</span>
        </nav>

        {/* Hero Section */}
        <section style={{ marginBottom: '3rem' }}>
          <span
            style={{
              display: 'inline-block',
              backgroundColor: '#e7f2f5',
              color: '#005ea2',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              padding: '0.4rem 1rem',
              borderRadius: '0.25rem',
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-body)',
              textTransform: 'uppercase',
            }}
          >
            Prevention Resources
          </span>

          <h1
            style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontFamily: 'var(--font-header)',
              fontWeight: 700,
              color: '#1b1b1b',
              lineHeight: 1.2,
              margin: '0 0 0.5rem 0',
            }}
          >
            Prevention Resources
          </h1>

          <p
            style={{
              fontSize: '1.125rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              color: '#323a45',
              lineHeight: 1.5,
              margin: '0 0 0.75rem 0',
            }}
          >
            Tools and information to support your health journey
          </p>

          <p
            style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              color: '#323a45',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Access evidence-based resources, programs, and tools to help prevent chronic diseases and maintain a healthy lifestyle.
          </p>
        </section>

        {/* Prevention Resources — three interactive cards */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Card 1 — Programs (primary blue) */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => onNavigate?.('lifestyle-programs')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate?.('lifestyle-programs'); } }}
            style={{
              backgroundColor: '#005ea2',
              borderRadius: '0.25rem',
              padding: '2rem',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              border: '1px solid #005ea2',
              display: 'flex',
              flexDirection: 'column',
              minHeight: isMobile ? undefined : 420,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 94, 162, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                padding: '0.35rem 0.875rem',
                borderRadius: '0.25rem',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Programs Near You
            </span>

            <h2
              style={{
                fontSize: isMobile ? '1.75rem' : '2rem',
                fontFamily: 'var(--font-header)',
                fontWeight: 700,
                color: 'white',
                margin: '0 0 1rem 0',
                lineHeight: 1.2,
              }}
            >
              Find a Lifestyle Change Program
            </h2>

            <p
              style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                color: 'rgba(255,255,255,0.95)',
                lineHeight: 1.6,
                margin: '0 0 1.5rem 0',
                flex: 1,
              }}
            >
              CDC-recognized Lifestyle Change Intervention (LCI) programs are proven to lower the chances of type 2 diabetes and other chronic conditions. Find a program in your community or online that fits your schedule and lifestyle.
            </p>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'white',
                color: '#005ea2',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '0.25rem',
                marginTop: 'auto',
              }}
            >
              Search Programs
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </div>

          {/* Card 2 — Plan My Path (dark, same as original second card) */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => onNavigate?.('plan-my-path')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate?.('plan-my-path'); } }}
            style={{
              backgroundColor: '#1b1b1b',
              borderRadius: '0.25rem',
              padding: '2rem',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              border: '1px solid #1b1b1b',
              display: 'flex',
              flexDirection: 'column',
              minHeight: isMobile ? undefined : 420,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                padding: '0.35rem 0.875rem',
                borderRadius: '0.25rem',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Guided Plan
            </span>

            <h2
              style={{
                fontSize: isMobile ? '1.75rem' : '2rem',
                fontFamily: 'var(--font-header)',
                fontWeight: 700,
                color: 'white',
                margin: '0 0 1rem 0',
                lineHeight: 1.2,
              }}
            >
              Plan My Path
            </h2>

            <p
              style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.6,
                margin: '0 0 1.5rem 0',
                flex: 1,
              }}
            >
              Build a personalized, step-by-step Action Plan that captures your motivators, logistics, and class preferences — then take it with you when you connect with a program.
            </p>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'white',
                color: '#1b1b1b',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '0.25rem',
                marginTop: 'auto',
              }}
            >
              Create Plan
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </div>

          {/* Card 3 — Quick questions (accent cool blue, matches Overall Healthy Living column) */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => onNavigate?.('risk-assessment')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate?.('risk-assessment'); } }}
            style={{
              backgroundColor: ACCENT_COOL_BLUE,
              borderRadius: '0.25rem',
              padding: '2rem',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              border: `1px solid ${ACCENT_COOL_BLUE}`,
              display: 'flex',
              flexDirection: 'column',
              minHeight: isMobile ? undefined : 420,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 189, 227, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255,255,255,0.25)',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                padding: '0.35rem 0.875rem',
                borderRadius: '0.25rem',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="14" r="7" />
                <path d="M12 11v3l2 1.5" />
                <path d="M9 3h6" />
                <path d="M12 3V1" />
              </svg>
              Free • 10 Minutes
            </span>

            <h2
              style={{
                fontSize: isMobile ? '1.75rem' : '2rem',
                fontFamily: 'var(--font-header)',
                fontWeight: 700,
                color: 'white',
                margin: '0 0 1rem 0',
                lineHeight: 1.2,
              }}
            >
              Answer a Few Questions
            </h2>

            <p
              style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                color: 'rgba(255,255,255,0.95)',
                lineHeight: 1.6,
                margin: '0 0 1.5rem 0',
                flex: 1,
              }}
            >
              Not sure where to start? Our free, confidential questions help you understand how your health picture relates to conditions like type 2 diabetes, heart disease, and more — and point you toward the right resources.
            </p>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'white',
                color: ACCENT_COOL_BLUE,
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '0.25rem',
                marginTop: 'auto',
              }}
            >
              Get Started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </div>
        </section>


        {/* Educational Resources Section */}
        <section>
          <h2
            style={{
              fontSize: isMobile ? '1.5rem' : '1.75rem',
              fontFamily: 'var(--font-header)',
              fontWeight: 700,
              color: '#1b1b1b',
              margin: '0 0 0.5rem 0',
            }}
          >
            Educational Resources
          </h2>

          <p
            style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              color: '#323a45',
              lineHeight: 1.5,
              margin: '0 0 1.5rem 0',
            }}
          >
            Evidence-based guides covering the most common preventable chronic conditions.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '1.5rem',
            }}
          >
            {educationalCards.map((card, i) => {
              const colors = EDUCATIONAL_CARD_COLORS[i % EDUCATIONAL_CARD_COLORS.length];
              return (
              <div
                key={i}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '0.25rem',
                  padding: '1.5rem',
                  border: '1px solid #e0e0e0',
                  borderTop: `3px solid ${colors.accent}`,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '0.25rem',
                    backgroundColor: colors.iconBg,
                    color: colors.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  {card.icon}
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-header)',
                    fontWeight: 600,
                    color: '#1b1b1b',
                    margin: '0 0 0.75rem 0',
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.9375rem',
                    fontFamily: 'var(--font-body)',
                    color: '#323a45',
                    lineHeight: 1.55,
                    margin: '0 0 1rem 0',
                  }}
                >
                  {card.description}
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    paddingLeft: 0,
                    margin: '0 0 1rem 0',
                    fontSize: '0.9375rem',
                    fontFamily: 'var(--font-body)',
                    color: '#323a45',
                    lineHeight: 1.6,
                  }}
                >
                  {card.bullets.map((bullet, j) => (
                    <li key={j} style={{ marginBottom: '0.25rem', paddingLeft: '1.25rem', position: 'relative' }}>
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: '0.65em',
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: colors.accent,
                          display: 'inline-block',
                        }}
                      />
                      <Link
                        to={bullet.path}
                        style={{
                          color: '#6B7280',
                          textDecoration: 'none',
                        }}
                      >
                        {bullet.text}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  to={card.linkHref || '#'}
                  style={{
                    marginTop: 'auto',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: colors.accent,
                    textDecoration: 'underline',
                  }}
                >
                  {card.linkText}
                </Link>
              </div>
            );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Resources;

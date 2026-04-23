import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


/* USWDS theme colors for icons and top bars */
const EDUCATIONAL_CARD_COLORS = [
  { accent: '#005ea2', iconBg: '#e7f2f5' },   /* Primary */
  { accent: '#d83933', iconBg: '#f9dede' },   /* Secondary — Heart Health */
  { accent: '#00bde3', iconBg: '#e5f6f9' },   /* Accent cool — Prevention card 3 */
];

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
      { text: 'Understanding Prediabetes', path: '/learn/prediabetes/understanding-prediabetes' },
      { text: 'Nutrition & Blood Sugar', path: '/learn/prediabetes/nutrition-blood-sugar' },
      { text: 'Physical Activity & Insulin Sensitivity', path: '/learn/prediabetes/physical-activity-insulin-sensitivity' },
      { text: 'National DPP Lifestyle Change Program Overview', path: '/learn/prediabetes/dpp-program-overview' },
    ],
    linkText: 'Explore diabetes resources →',
    linkHref: '/learn/prediabetes/understanding-prediabetes',
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
      { text: 'Know Your Numbers', path: '/learn/heart-health/know-your-numbers' },
      { text: 'Blood Pressure & Cholesterol', path: '/learn/heart-health/blood-pressure-cholesterol' },
      { text: 'Heart-Healthy Eating', path: '/learn/heart-health/heart-healthy-eating' },
      { text: 'Stress & Cardiovascular Risk', path: '/learn/heart-health/stress-cardiovascular-risk' },
    ],
    linkText: 'Explore heart health resources →',
    linkHref: '/learn/heart-health/know-your-numbers',
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
      { text: 'Building Healthy Habits', path: '/learn/healthy-living/building-healthy-habits' },
      { text: 'Sleep & Recovery', path: '/learn/healthy-living/sleep-recovery' },
      { text: 'Mental Health & Resilience', path: '/learn/healthy-living/mental-health-resilience' },
      { text: 'Social Connection', path: '/learn/healthy-living/social-connection' },
    ],
    linkText: 'Explore healthy living guides →',
    linkHref: '/learn/healthy-living/building-healthy-habits',
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
          <span style={{ color: '#323a45', fontWeight: 600 }}>Learn More</span>
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
            Learn More
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
            Learn More
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
            Evidence-based information to support your health journey
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
            Explore guides, videos, and expert resources to understand and prevent chronic diseases.
          </p>
        </section>

        {/* Educational Resources Section */}
        <section style={{ marginBottom: '3rem' }}>
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

        {/* Learn With Video Section */}
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
            Learn With Video
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
            CDC educational videos to help you understand how to manage prediabetes as part of a chronic disease prevention approach.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '1rem',
            }}
          >
            {[
              { title: 'Meet Lisa: Preventing Prediabetes', href: 'https://www.youtube.com/watch?v=azKL5xutMJE' },
              { title: 'Imagine: You + National Diabetes Prevention Program', href: 'https://www.youtube.com/watch?v=k_XoHSIG20U&t=2s' },
              { title: 'Sneak Peek into the Lifestyle Change Program', href: 'https://www.youtube.com/watch?v=w0NDVI4M_Bs' },
            ].map((video, i) => (
              <a
                key={i}
                href={video.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 1.25rem',
                  backgroundColor: '#f0f4f8',
                  borderRadius: '0.25rem',
                  textDecoration: 'none',
                  border: '1px solid #e0e0e0',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: '#005ea2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 2 }}>
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: '#005ea2',
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}
                >
                  {video.title}
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Resources;

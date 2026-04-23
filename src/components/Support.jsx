import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Support = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sectionStyles = {
    maxWidth: 1200,
    margin: '0 auto',
    padding: isMobile ? '2rem 1rem' : '3rem 2rem',
  };

  return (
    <main style={{ backgroundColor: '#ffffff', minHeight: '80vh' }}>
      <div style={sectionStyles}>
        <nav
          style={{
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: '#5c5c5c',
          }}
          aria-label="Breadcrumb"
        >
          <Link to="/" style={{ color: '#005ea2', textDecoration: 'underline' }}>Home</Link>
          <span style={{ margin: '0 0.5rem', color: '#5c5c5c' }}>/</span>
          <span style={{ color: '#323a45', fontWeight: 600 }}>Take Action</span>
        </nav>

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
          Take Action
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
          Take Action
        </h1>

        <h2
          style={{
            fontSize: '1.25rem',
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            color: '#323a45',
            margin: '0 0 1rem 0',
          }}
        >
          Choose Your Next Step
        </h2>

        <p
          style={{
            fontSize: '1rem',
            fontFamily: 'var(--font-body)',
            color: '#323a45',
            lineHeight: 1.6,
            margin: '0 0 1rem 0',
          }}
        >
          Your life is already in motion. Chronic conditions like diabetes, heart disease, and stroke may be part of the path, but they don&apos;t decide where it leads. Use these tools, tips, and connections to take the next step that feels right for you.
        </p>
      </div>

      <section style={{ ...sectionStyles, backgroundColor: '#f0f4f8', padding: isMobile ? '2rem 1rem' : '3rem 2rem', borderRadius: '0.25rem' }}>
        <h2
          style={{
            fontSize: isMobile ? '1.5rem' : '1.75rem',
            fontFamily: 'var(--font-header)',
            fontWeight: 700,
            color: '#1b1b1b',
            margin: '0 0 1.5rem 0',
          }}
        >
          Tools and Resources You Can Use Now
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0.25rem',
              padding: '1.5rem',
              border: '1px solid #e0e0e0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '0.25rem',
                  backgroundColor: '#005ea2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="14" rx="1"/>
                  <rect x="5" y="5" width="14" height="8"/>
                  <path d="M8 20h8M12 16v4" strokeLinecap="round"/>
                </svg>
              </div>
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontFamily: 'var(--font-header)',
                  fontWeight: 600,
                  color: '#1b1b1b',
                  margin: 0,
                }}
              >
                Interactive Tools &amp; Quick Questions
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ backgroundColor: '#f0f4f8', borderRadius: '0.25rem', padding: '1rem 1.25rem', border: '1px solid #e0e0e0' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: '#1b1b1b', fontSize: '1rem' }}>Quick questions to get started</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#323a45', flex: 1, minWidth: 200 }}>
                    See how your answers relate to conditions like diabetes, heart disease, and stroke.
                  </p>
                  <Link
                    to="/get-started"
                    style={{
                      display: 'inline-block',
                      padding: '0.5rem 1.25rem',
                      backgroundColor: '#005ea2',
                      color: 'white',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      borderRadius: '0.375rem',
                      textDecoration: 'none',
                      flexShrink: 0,
                    }}
                  >
                    Get started
                  </Link>
                </div>
              </div>

              <div style={{ backgroundColor: '#f0f4f8', borderRadius: '0.25rem', padding: '1rem 1.25rem', border: '1px solid #e0e0e0' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: '#1b1b1b', fontSize: '1rem' }}>Plan my Path</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#323a45', flex: 1, minWidth: 200 }}>
                    Create a personalized Action Plan to support a healthy lifestyle
                  </p>
                  <Link
                    to="/action/plan-my-path"
                    style={{
                      display: 'inline-block',
                      padding: '0.5rem 1.25rem',
                      backgroundColor: 'white',
                      color: '#1b1b1b',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      borderRadius: '0.375rem',
                      textDecoration: 'none',
                      border: '1px solid #1b1b1b',
                      flexShrink: 0,
                    }}
                  >
                    Create Plan
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0.25rem',
              padding: '1.5rem',
              border: '1px solid #e0e0e0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '0.25rem',
                  backgroundColor: '#1b1b1b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontFamily: 'var(--font-header)',
                  fontWeight: 600,
                  color: '#1b1b1b',
                  margin: 0,
                }}
              >
                Find a Lifestyle Change Program
              </h3>
            </div>
            <p
              style={{
                margin: '0 0 1.25rem 0',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: '#323a45',
                lineHeight: 1.5,
              }}
            >
              CDC-recognized programs are proven to prevent or delay type 2 diabetes and other chronic conditions. Find one that fits your schedule — in person or online.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ backgroundColor: '#f0f4f8', borderRadius: '0.25rem', padding: '1rem 1.25rem', border: '1px solid #e0e0e0' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: '#1b1b1b', fontSize: '1rem' }}>Search for a program near you</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#323a45', flex: 1, minWidth: 200 }}>
                    Browse local and virtual programs in your area.
                  </p>
                  <Link
                    to="/lifestyle-programs"
                    style={{
                      display: 'inline-block',
                      padding: '0.5rem 1.25rem',
                      backgroundColor: '#005ea2',
                      color: 'white',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      borderRadius: '0.375rem',
                      textDecoration: 'none',
                      flexShrink: 0,
                    }}
                  >
                    Search Programs
                  </Link>
                </div>
              </div>
              <div style={{ backgroundColor: '#f0f4f8', borderRadius: '0.25rem', padding: '1rem 1.25rem', border: '1px solid #e0e0e0' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: '#1b1b1b', fontSize: '1rem' }}>Support groups &amp; coaching</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#323a45', flex: 1, minWidth: 200 }}>
                    Connect with a coach or community group for ongoing support.
                  </p>
                  <a
                    href="#"
                    style={{
                      display: 'inline-block',
                      padding: '0.5rem 1.25rem',
                      backgroundColor: 'white',
                      color: '#1b1b1b',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      borderRadius: '0.375rem',
                      textDecoration: 'none',
                      border: '1px solid #1b1b1b',
                      flexShrink: 0,
                    }}
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ ...sectionStyles }}>
        <h2
          style={{
            fontSize: isMobile ? '1.5rem' : '1.75rem',
            fontFamily: 'var(--font-header)',
            fontWeight: 700,
            color: '#1b1b1b',
            margin: '0 0 0.5rem 0',
          }}
        >
          Connect With Support
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
          Programs, communities, and direct help when you need it.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#005ea2',
              borderRadius: '0.25rem',
              padding: '2rem',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              border: '1px solid #005ea2',
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Local &amp; Online Programs
            </span>

            <h3
              style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontFamily: 'var(--font-header)',
                fontWeight: 700,
                color: 'white',
                margin: '0 0 1rem 0',
                lineHeight: 1.2,
              }}
            >
              Lifestyle Change Intervention (LCI) Programs
            </h3>

            <p
              style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                color: 'rgba(255,255,255,0.95)',
                lineHeight: 1.6,
                margin: '0 0 1.5rem 0',
              }}
            >
              CDC-recognized evidence-based lifestyle change programs proven to prevent or delay chronic conditions. Find a program that fits your schedule — in person or online.
            </p>

            <Link
              to="/lifestyle-programs"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'white',
                color: '#005ea2',
                borderRadius: '0.25rem',
                padding: '0.75rem 1.25rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                textDecoration: 'none',
              }}
            >
              Find a program
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          <div
            style={{
              backgroundColor: '#1b1b1b',
              borderRadius: '0.25rem',
              padding: '2rem',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              border: '1px solid #1b1b1b',
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              Direct Help
            </span>

            <h3
              style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontFamily: 'var(--font-header)',
                fontWeight: 700,
                color: 'white',
                margin: '0 0 1rem 0',
                lineHeight: 1.2,
              }}
            >
              CDC Chronic Disease Contact Center
            </h3>

            <p
              style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.6,
                margin: '0 0 1.5rem 0',
              }}
            >
              Email and call-in support for questions, tools, and referrals. Our team can help connect you with local resources and answer your prevention questions.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
              <a
                href="tel:800-232-4636"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'white',
                  color: '#1b1b1b',
                  borderRadius: '0.25rem',
                  padding: '0.75rem 1.25rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                800-232-4636
              </a>
              <a
                href="mailto:cdcinfo@cdc.gov"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'white',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  textDecoration: 'underline',
                }}
              >
                Send us an email →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          ...sectionStyles,
          backgroundColor: '#f0f4f8',
          padding: isMobile ? '2rem 1rem' : '3rem 2rem',
          borderRadius: '0.25rem',
          border: '1px solid #e0e0e0',
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? '1.5rem' : '1.75rem',
            fontFamily: 'var(--font-header)',
            fontWeight: 700,
            color: '#1b1b1b',
            margin: '0 0 0.5rem 0',
          }}
        >
          Tips That Fit Your Life
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
          Everyday habits that make a difference — practical, actionable, and realistic.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '1.5rem',
          }}
        >
          {[
            {
              path: '/action/tips/how-to-read-food-labels',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              ),
              title: 'How to Read Food Labels',
              description: 'Decode nutrition facts to make smarter choices at the grocery store — without guesswork.',
            },
            {
              path: '/action/tips/meal-planning-on-budget',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <line x1="8" y1="6" x2="21" y2="6"/>
                  <line x1="8" y1="12" x2="21" y2="12"/>
                  <line x1="8" y1="18" x2="21" y2="18"/>
                  <line x1="3" y1="6" x2="3.01" y2="6"/>
                  <line x1="3" y1="12" x2="3.01" y2="12"/>
                  <line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
              ),
              title: 'Meal Planning on a Budget',
              description: 'Healthy eating doesn\'t have to be expensive. Simple strategies for nutritious meals that fit your wallet.',
            },
            {
              path: '/action/tips/moving-more-when-busy',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              ),
              title: "Moving More When You're Busy",
              description: "Small amounts of activity add up. Find easy ways to move throughout your day without a gym or extra time.",
            },
            {
              path: '/action/tips/setting-realistic-goals',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              ),
              title: 'Setting Realistic Goals',
              description: 'Goals you can stick with start small. Learn how to build momentum through achievable milestones.',
            },
          ].map((tip, i) => (
            <Link
              key={i}
              to={tip.path}
              style={{
                backgroundColor: 'white',
                borderRadius: '0.25rem',
                padding: '1.5rem',
                border: '1px solid #e0e0e0',
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                borderTop: '3px solid #005ea2',
              }}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    minWidth: 44,
                    borderRadius: '0.25rem',
                    backgroundColor: '#005ea2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {tip.icon}
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: '1.0625rem',
                      fontFamily: 'var(--font-header)',
                      fontWeight: 600,
                      color: '#005ea2',
                      margin: '0 0 0.5rem 0',
                    }}
                  >
                    {tip.title}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.9375rem',
                      fontFamily: 'var(--font-body)',
                      color: '#323a45',
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {tip.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Support;

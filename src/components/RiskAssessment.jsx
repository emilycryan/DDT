import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RiskAssessment = ({ onNavigate }) => {
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
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes get-started-card-pulse {
              0%, 100% { transform: translateY(0) scale(1); }
              50% { transform: translateY(-6px) scale(1.02); }
            }
            .get-started-choice-card {
              transition: box-shadow 0.2s ease;
            }
            .get-started-choice-card:hover {
              animation: get-started-card-pulse 0.55s ease-in-out 1;
              box-shadow: 0 12px 32px rgba(0, 94, 162, 0.22);
            }
            .get-started-choice-card:focus-visible {
              outline: 3px solid #005ea2;
              outline-offset: 3px;
            }
            .get-started-icon-circle {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 1.25rem auto;
              background-color: #005ea2;
              transition: background-color 0.25s ease;
            }
            .get-started-choice-card:hover .get-started-icon-circle,
            .get-started-choice-card:focus-visible .get-started-icon-circle {
              background-color: #007833;
            }
            @media (prefers-reduced-motion: reduce) {
              .get-started-choice-card:hover {
                animation: none;
                transform: translateY(-2px);
              }
            }
          `,
        }}
      />
      <section style={sectionStyles}>
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
          <span style={{ color: '#323a45', fontWeight: 600 }}>Get Started</span>
        </nav>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '2rem' : '3rem',
            alignItems: 'center',
          }}
        >
          <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
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
              Questions
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
              Get Started
            </h1>

            <p
              style={{
                fontSize: isMobile ? '1rem' : '1.125rem',
                fontFamily: 'var(--font-body)',
                color: '#323a45',
                lineHeight: 1.6,
                margin: '0 0 2rem 0',
                maxWidth: isMobile ? 'none' : 600,
              }}
            >
              Answer a few questions to learn how everyday factors relate to chronic conditions like diabetes, heart disease, and stroke. These evidence-based tools help spot where small lifestyle changes can make the biggest difference.
            </p>

            <div style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('assessment-selection');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#005ea2',
                  color: 'white',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                }}
              >
            Let&apos;s Go
          </button>
            </div>
          </div>

          {/* Hero image + quote overlay (USWDS-aligned contrast) */}
          <figure
            style={{
              position: 'relative',
              margin: 0,
              borderRadius: '0.75rem',
              overflow: 'hidden',
              minHeight: isMobile ? 280 : 360,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid #e0e0e0',
            }}
          >
            <img
              src="/workout-group.jpg"
              alt="Three adults jogging together outdoors on a path, smiling"
              style={{
                width: '100%',
                height: '100%',
                minHeight: isMobile ? 280 : 360,
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(27, 27, 27, 0.88) 0%, rgba(27, 27, 27, 0.35) 45%, transparent 72%)',
                pointerEvents: 'none',
              }}
            />
            <figcaption
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                padding: isMobile ? '1.5rem 1.25rem' : '2rem 1.75rem',
                fontFamily: 'var(--font-header)',
                fontWeight: 700,
                fontSize: isMobile ? '1.35rem' : 'clamp(1.5rem, 2.4vw, 2.125rem)',
                lineHeight: 1.25,
                color: '#ffffff',
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.65), 0 1px 3px rgba(0, 0, 0, 0.9)',
                borderLeft: '4px solid #005ea2',
                margin: isMobile ? '0 1rem 1rem' : '0 1.25rem 1.25rem',
                paddingLeft: '1rem',
              }}
            >
              <blockquote
                style={{
                  margin: 0,
                  padding: 0,
                  border: 'none',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;It&apos;s important to take care of myself for my family and my friends&rdquo;
              </blockquote>
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        id="assessment-selection"
        style={{
          backgroundColor: '#f0f4f8',
          padding: isMobile ? '2.5rem 1rem' : '3rem 2rem',
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2
            style={{
              fontSize: isMobile ? '1.5rem' : '1.75rem',
              fontFamily: 'var(--font-header)',
              fontWeight: 700,
              color: '#1b1b1b',
              margin: '0 0 0.75rem 0',
            }}
          >
            What brought you here today?
          </h2>

          <p
            style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              color: '#323a45',
              lineHeight: 1.6,
              margin: '0 0 2rem 0',
              maxWidth: 720,
            }}
          >
            Perhaps you&apos;re wondering what lifestyle changes might look like as someone with a newly diagnosed
            chronic condition. Or maybe you&apos;re a friend, family member or caregiver of someone with one or more
            chronic conditions. Let us know so we can tailor next questions and recommendations.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '1.5rem',
              marginBottom: '2.5rem',
            }}
          >
            {[
              {
                title: 'For Myself',
                description: "I'm concerned about my own health and want to understand my risk factors for chronic diseases like diabetes, heart disease, or stroke.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                ),
                onSelect: () => onNavigate?.('assessment-chronic'),
              },
              {
                title: 'For Someone I Care About',
                description: "I'm a caregiver, family member, or friend who is concerned about someone else's health and want to help them understand their risks.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                ),
                onSelect: () => onNavigate?.('assessment-caregiver'),
              },
              {
                title: 'Just Curious',
                description: "I'm generally interested in learning about chronic disease prevention. I feel pretty healthy but want to see what this is all about.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                ),
                onSelect: () => onNavigate?.('assessment-just-curious'),
              },
            ].map((card, i) => (
              <div
                key={i}
                className="get-started-choice-card"
                role="button"
                tabIndex={0}
                onClick={card.onSelect}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.onSelect(); } }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '0.25rem',
                  padding: '1.5rem',
                  border: '1px solid #e0e0e0',
                  borderTop: '3px solid #005ea2',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div className="get-started-icon-circle">
                  {card.icon}
                </div>
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontFamily: 'var(--font-header)',
                    fontWeight: 700,
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
                    margin: 0,
                  }}
                >
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0.25rem',
              padding: isMobile ? '2rem 1rem' : '2.5rem 2rem',
              border: '1px solid #e0e0e0',
              borderLeft: '4px solid #005ea2',
            }}
          >
            <h3
              style={{
                fontSize: '1.25rem',
                fontFamily: 'var(--font-header)',
                fontWeight: 700,
                color: '#1b1b1b',
                margin: '0 0 1rem 0',
              }}
            >
              How Does this Work?
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '1.5rem',
              }}
            >
              {[
                {
                  num: '1',
                  lead: 'Answer a few questions.',
                  body: 'Answer questions about your health, lifestyle and family history to learn what influences long-term health and how lifestyle changes can help prevent conditions like heart disease, stroke, and diabetes.',
                },
                {
                  num: '2',
                  lead: 'Get the facts.',
                  body: 'Access evidence-based information about preventing chronic diseases including obesity, COPD, and cardiovascular conditions.',
                },
                {
                  num: '3',
                  lead: 'Begin your journey.',
                  body: 'Access our resources, community-led programs and tools to better support your prevention journey.',
                },
              ].map((step) => (
                <div key={step.num}>
                  <h4
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      fontFamily: 'var(--font-header)',
                      color: '#005ea2',
                      margin: '0 0 0.5rem 0',
                    }}
                  >
                    {step.num}. {step.lead}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      fontFamily: 'var(--font-body)',
                      color: '#323a45',
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RiskAssessment;

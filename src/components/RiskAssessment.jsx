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
          Risk Assessment
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
          Am I at Risk?
        </h1>

        <p
          style={{
            fontSize: isMobile ? '1rem' : '1.125rem',
            fontFamily: 'var(--font-body)',
            color: '#323a45',
            lineHeight: 1.6,
            margin: '0 0 2rem 0',
            maxWidth: 600,
          }}
        >
          Take our comprehensive risk assessments to learn about your personal risk factors for chronic diseases. These evidence-based screening tools help identify areas where lifestyle changes can make a difference.
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
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
            Start Assessment
          </button>
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
            Who Are You Taking This For?
          </h2>

          <p
            style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              color: '#323a45',
              lineHeight: 1.6,
              margin: '0 0 2rem 0',
              maxWidth: 600,
            }}
          >
            Choose the option that best describes your situation. This helps us provide the most relevant assessment and recommendations.
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
                iconBg: '#005ea2',
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
                iconBg: '#007833',
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
                iconBg: '#323a45',
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
                <div
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: card.iconBg,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem auto',
                  }}
                >
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
              What Happens Next?
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '1.5rem',
              }}
            >
              {[
                { num: '1', title: 'Complete Assessment', text: 'Answer questions about your health, lifestyle, and family history.' },
                { num: '2', title: 'Get Your Results', text: 'Receive personalized risk assessment and prevention recommendations.' },
                { num: '3', title: 'Take Action', text: 'Access resources, programs, and tools to support your prevention journey.' },
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
                    {step.num}. {step.title}
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
                    {step.text}
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

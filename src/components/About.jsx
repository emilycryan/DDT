import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const featureItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Trusted Information',
    description: 'Clear, evidence-based guidance on the 12 major chronic conditions affecting Americans today.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <path d="M12 18h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Interactive Tools',
    description: 'Self-assessments, videos, and checklists that help you understand risks and take the next step.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Lifestyle Change Programs',
    description: 'Access to local and virtual resources that support lasting behavior change.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Stories and Learning',
    description: 'Real-world examples of people making changes that work for them.',
  },
];

const focusAreas = [
  'Nutrition',
  'Physical Activity',
  'Stress Management',
  'Sleep',
  'Social Connection',
];

const About = ({ onNavigate }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBeginAssessment = () => {
    if (onNavigate) onNavigate('risk-assessment');
    else window.location.href = '/get-started';
  };

  const handleExploreResources = () => {
    if (onNavigate) onNavigate('resources');
    else window.location.href = '/resources';
  };

  const sidebar = (
    <aside
      style={{
        flexShrink: 0,
        width: isMobile ? '100%' : '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        position: isMobile ? 'static' : 'sticky',
        top: 100,
        alignSelf: 'flex-start',
      }}
    >
      <div
        style={{
          backgroundColor: '#005ea2',
          borderRadius: '0.25rem',
          padding: '1.75rem',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-header)',
            fontWeight: 600,
            fontSize: '1.25rem',
            color: 'white',
            margin: '0 0 0.5rem 0',
          }}
        >
          Ready to start?
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.5,
            margin: '0 0 1.25rem 0',
          }}
        >
          Take the free risk assessment and get your personalized prevention plan.
        </p>
        <button
          type="button"
          onClick={handleBeginAssessment}
          style={{
            width: '100%',
            backgroundColor: 'white',
            color: '#005ea2',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: '1rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.25rem',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '0.75rem',
          }}
        >
          Begin Assessment
        </button>
        <button
          type="button"
          onClick={handleExploreResources}
          style={{
            width: '100%',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: '1rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.25rem',
            border: '2px solid rgba(255,255,255,0.9)',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            color: 'white',
          }}
        >
          Explore Resources
        </button>
      </div>

      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '0.25rem',
          padding: '1.75rem',
          border: '1px solid #e0e0e0',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-header)',
            fontWeight: 600,
            fontSize: '1.25rem',
            color: '#323a45',
            margin: '0 0 1rem 0',
          }}
        >
          Focus Areas
        </h3>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          {focusAreas.map((area, i) => (
            <li
              key={i}
              style={{
                paddingLeft: '1.25rem',
                position: 'relative',
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: '#323a45',
                lineHeight: 1.5,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '0.5rem',
                  width: 6,
                  height: 6,
                  backgroundColor: '#005ea2',
                  borderRadius: '50%',
                }}
              />
              {area}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );

  return (
    <main
      style={{
        backgroundColor: '#ffffff',
        minHeight: '80vh',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: isMobile ? '2rem 1rem' : '3rem 2rem',
        }}
      >
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
          <span style={{ color: '#323a45', fontWeight: 600 }}>About</span>
        </nav>

        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '2rem' : '3rem',
            alignItems: 'flex-start',
          }}
        >
          <article style={{ flex: 1, minWidth: 0 }}>
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
              About this Site
            </span>

            <h1
              style={{
                fontSize: isMobile ? '2rem' : '2.5rem',
                fontFamily: 'var(--font-header)',
                fontWeight: 700,
                color: '#1b1b1b',
                lineHeight: 1.2,
                margin: '0 0 0.75rem 0',
              }}
            >
              About this Site
            </h1>

            <p
              style={{
                fontSize: '1.125rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                color: '#323a45',
                lineHeight: 1.5,
                margin: '0 0 1.5rem 0',
              }}
            >
              Prevention is powerful. Here's why we built this.
            </p>

            <div
              style={{
                fontSize: '1.125rem',
                fontFamily: 'var(--font-body)',
                color: '#323a45',
                lineHeight: 1.7,
              }}
            >
              <p style={{ marginBottom: '1.5rem' }}>
                This site exists to help people take charge of their health before chronic conditions take hold. Too often, conditions like diabetes, heart disease, obesity, depression, and others are only addressed once symptoms appear. But research is clear: small, sustained lifestyle changes—made early—can prevent or delay the onset of many of the most common and costly health challenges.
              </p>

              <p style={{ marginBottom: '2rem' }}>
                Our goal is to make prevention practical. We bring together resources, tools, and stories that support everyday choices in areas like nutrition, physical activity, stress management, sleep, and social connection. Whether you are a busy parent, a caregiver, a health professional, or someone simply curious about your own risk, this site is designed to meet you where you are.
              </p>

              <h2
                style={{
                  fontSize: '1.5rem',
                  fontFamily: 'var(--font-header)',
                  fontWeight: 600,
                  color: '#1b1b1b',
                  marginBottom: '1.25rem',
                  marginTop: 0,
                }}
              >
                Here you'll find:
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {featureItems.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '1.25rem',
                      padding: '1.25rem',
                      borderRadius: '0.25rem',
                      backgroundColor: '#f0f4f8',
                      border: '1px solid #e0e0e0',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        minWidth: 48,
                        borderRadius: '0.25rem',
                        backgroundColor: '#005ea2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-header)',
                          fontWeight: 600,
                          fontSize: '1.0625rem',
                          color: '#1b1b1b',
                          margin: '0 0 0.25rem 0',
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '1rem',
                          color: '#323a45',
                          lineHeight: 1.55,
                          margin: 0,
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p style={{ marginBottom: '1.5rem' }}>
                This initiative reflects a simple truth: prevention is powerful. By addressing risks before conditions appear, we can improve quality of life, reduce healthcare costs, and build healthier families and communities.
              </p>

              <p
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#005ea2',
                  marginTop: '2rem',
                  marginBottom: 0,
                }}
              >
                Every visit to this site is a step toward health that lasts.
              </p>
            </div>
          </article>

          {!isMobile && sidebar}
        </div>

        {isMobile && (
          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e0e0e0' }}>
            {sidebar}
          </div>
        )}
      </div>
    </main>
  );
};

export default About;

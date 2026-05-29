import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PATHS = [
  {
    title: 'For Myself',
    who: 'Managing my own health',
    scenario:
      "You've been diagnosed with a chronic condition, or you want to understand your risk for diabetes, heart disease, or stroke.",
    path: '/get-started/for-myself',
    color: '#005ea2',
    labelColor: '#005ea2',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 1 0-7.78 7.78L12 21l8.84-8.62a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: 'For Someone I Care About',
    who: 'Caring for someone else',
    scenario:
      "You're a family member, friend, or caregiver helping someone navigate their health and risks.",
    path: '/get-started/for-someone',
    color: '#d83933',
    labelColor: '#a23737',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Just Curious',
    who: 'Exploring prevention',
    scenario:
      'You feel healthy and want to learn what chronic disease prevention is all about.',
    path: '/get-started/just-curious',
    color: '#0081a1',
    labelColor: '#0081a1',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    title: 'For My Child',
    who: 'Supporting my child',
    scenario:
      "You're a parent or guardian building healthy habits to lower your child's long-term risk.",
    path: '/get-started/for-child',
    color: '#c05600',
    labelColor: '#c05600',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="6" r="3" />
        <path d="M12 9v7M8 22l4-6 4 6M5 13h14" />
      </svg>
    ),
  },
];

const HomePathPicker = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goTo = (path) => {
    if (path.startsWith('http')) window.location.href = path;
    else navigate(path);
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .path-row {
              display: flex;
              align-items: center;
              gap: 1.25rem;
              width: 100%;
              padding: 1.4rem 1.6rem;
              border: 1px solid #dfe1e2;
              border-left-width: 6px;
              border-radius: 0.25rem;
              background: #ffffff;
              cursor: pointer;
              text-align: left;
              transition: transform 0.15s ease, box-shadow 0.15s ease;
            }
            .path-row:hover { transform: translateX(5px); box-shadow: 0 10px 24px rgba(0,0,0,0.12); }
            .path-row:focus-visible { outline: 3px solid #005ea2; outline-offset: 3px; }
            @media (prefers-reduced-motion: reduce) {
              .path-row { transition: box-shadow 0.15s ease; }
              .path-row:hover { transform: none; }
            }
            .path-row-badge {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              flex: none;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #ffffff;
            }
            .path-row-badge svg { width: 30px; height: 30px; }
            .path-row-mid { flex: 1 1 auto; }
            .path-row-who {
              font-family: var(--font-body);
              font-size: 0.75rem;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.07em;
              margin: 0 0 0.15rem 0;
            }
            .path-row-title {
              font-family: var(--font-header);
              font-size: 1.35rem;
              font-weight: 800;
              color: #1b1b1b;
              line-height: 1.2;
              margin: 0.1rem 0 0.35rem 0;
            }
            .path-row-scenario {
              font-family: var(--font-body);
              font-size: 1rem;
              line-height: 1.5;
              color: #565c65;
              margin: 0;
              max-width: 60ch;
            }
            .path-row-chev {
              font-size: 2rem;
              line-height: 1;
              color: #71767a;
              font-weight: 700;
              flex: none;
            }
            .path-row:hover .path-row-chev { color: #1b1b1b; }
            @media (max-width: 768px) {
              .path-row { align-items: flex-start; gap: 1rem; padding: 1.2rem 1.1rem; }
              .path-row-badge { width: 48px; height: 48px; }
              .path-row-badge svg { width: 24px; height: 24px; }
              .path-row-chev { display: none; }
            }
          `,
        }}
      />

      {/* Intro band */}
      <section style={{ backgroundColor: '#ffffff', padding: isMobile ? '2.5rem 15px 1.5rem' : '3.5rem 15px 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1
            style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontFamily: 'var(--font-header)',
              fontWeight: 700,
              color: '#1b1b1b',
              lineHeight: 1.2,
              margin: '0 0 1rem 0',
            }}
          >
            What brought you here today?
          </h1>
          <p
            style={{
              fontSize: isMobile ? '1rem' : '1.125rem',
              fontFamily: 'var(--font-body)',
              color: '#323a45',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: 760,
            }}
          >
            Perhaps you&apos;re wondering what lifestyle changes might look like as someone with a newly diagnosed
            chronic condition. Or maybe you&apos;re a friend, family member or caregiver of someone with one or more
            chronic conditions. Let us know so we can tailor next questions and recommendations.
          </p>
        </div>
      </section>

      {/* Guided path rows */}
      <section
        aria-label="Choose a path"
        style={{
          padding: isMobile ? '0 15px 2.5rem' : '0 15px 4rem',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {PATHS.map((p) => (
            <div
              key={p.title}
              className="path-row"
              role="button"
              tabIndex={0}
              aria-label={`${p.title} — ${p.who}. ${p.scenario}`}
              onClick={() => goTo(p.path)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  goTo(p.path);
                }
              }}
              style={{ borderLeftColor: p.color }}
            >
              <span className="path-row-badge" style={{ backgroundColor: p.color }}>
                {p.icon}
              </span>
              <div className="path-row-mid">
                <div className="path-row-who" style={{ color: p.labelColor }}>
                  {p.who}
                </div>
                <h2 className="path-row-title">{p.title}</h2>
                <p className="path-row-scenario">{p.scenario}</p>
              </div>
              <span className="path-row-chev" aria-hidden="true">
                &rsaquo;
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePathPicker;

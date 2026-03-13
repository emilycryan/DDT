import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Reusable USWDS-styled layout for resource sub-pages.
 * @param {string} categoryLabel - e.g. "Prediabetes", "Heart Health", "Overall Healthy Living"
 * @param {string} categoryPath - e.g. "/resources/prediabetes/understanding-prediabetes"
 * @param {Array<{path:string,title:string}>} pageSequence - ordered pages for "Next" link
 * @param {string} title - page title
 */
const ResourcePageLayout = ({ categoryLabel, categoryPath, pageSequence, title, children }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentIndex = pageSequence.findIndex((p) => p.path === location.pathname);
  const nextPage = currentIndex >= 0
    ? pageSequence[(currentIndex + 1) % pageSequence.length]
    : pageSequence[0];

  return (
    <main style={{ backgroundColor: '#ffffff', minHeight: '80vh' }}>
      <section style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: isMobile ? '2rem 1rem' : '3rem 2rem',
      }}>
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
          <Link to="/resources" style={{ color: '#005ea2', textDecoration: 'underline' }}>Resources</Link>
          <span style={{ margin: '0 0.5rem', color: '#5c5c5c' }}>/</span>
          <Link to={categoryPath} style={{ color: '#005ea2', textDecoration: 'underline' }}>{categoryLabel}</Link>
          <span style={{ margin: '0 0.5rem', color: '#5c5c5c' }}>/</span>
          <span style={{ color: '#323a45', fontWeight: 600 }}>{title}</span>
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
          {categoryLabel}
        </span>

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
          {title}
        </h1>

        {children}

        <div
          style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Link
            to={nextPage.path}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#005ea2',
              color: 'white',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '0.75rem 1.25rem',
              borderRadius: '0.25rem',
              textDecoration: 'none',
            }}
          >
            {nextPage.title}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ResourcePageLayout;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

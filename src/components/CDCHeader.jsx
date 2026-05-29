import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* Blue circular CDC logo fallback - USWDS primary blue */
const cdcLogoFallback = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#005ea2"/><text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-size="14" font-weight="700">CDC</text></svg>'
);

const CDCHeader = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Official US Government Banner - USWDS style */}
      <div style={{
        backgroundColor: '#1b1b1b',
        fontSize: '13px',
        padding: '8px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="20" height="11" viewBox="0 0 20 11" style={{ flexShrink: 0 }}>
            {/* Blue canton */}
            <rect x="0" y="0" width="8" height="6" fill="#012169"/>
            {/* Red stripes */}
            <rect x="0" y="0" width="20" height="0.85" fill="#C8102E"/>
            <rect x="0" y="1.7" width="20" height="0.85" fill="#C8102E"/>
            <rect x="0" y="3.4" width="20" height="0.85" fill="#C8102E"/>
            <rect x="0" y="5.1" width="20" height="0.85" fill="#C8102E"/>
            <rect x="0" y="6.8" width="20" height="0.85" fill="#C8102E"/>
            <rect x="0" y="8.5" width="20" height="0.85" fill="#C8102E"/>
            <rect x="0" y="10.2" width="20" height="0.8" fill="#C8102E"/>
            {/* White stripes */}
            <rect x="0" y="0.85" width="20" height="0.85" fill="white"/>
            <rect x="0" y="2.55" width="20" height="0.85" fill="white"/>
            <rect x="0" y="4.25" width="20" height="0.85" fill="white"/>
            <rect x="0" y="5.95" width="20" height="0.85" fill="white"/>
            <rect x="0" y="7.65" width="20" height="0.85" fill="white"/>
            <rect x="0" y="9.35" width="20" height="0.85" fill="white"/>
            {/* Stars (simplified as small circles) */}
            <circle cx="1" cy="1" r="0.3" fill="white"/>
            <circle cx="2.5" cy="1.5" r="0.3" fill="white"/>
            <circle cx="1" cy="2" r="0.3" fill="white"/>
            <circle cx="2.5" cy="2.5" r="0.3" fill="white"/>
            <circle cx="1" cy="3" r="0.3" fill="white"/>
            <circle cx="2.5" cy="3.5" r="0.3" fill="white"/>
            <circle cx="1" cy="4" r="0.3" fill="white"/>
            <circle cx="2.5" cy="4.5" r="0.3" fill="white"/>
            <circle cx="1" cy="5" r="0.3" fill="white"/>
            <circle cx="4" cy="1" r="0.3" fill="white"/>
            <circle cx="5.5" cy="1.5" r="0.3" fill="white"/>
            <circle cx="4" cy="2" r="0.3" fill="white"/>
            <circle cx="5.5" cy="2.5" r="0.3" fill="white"/>
            <circle cx="4" cy="3" r="0.3" fill="white"/>
            <circle cx="5.5" cy="3.5" r="0.3" fill="white"/>
            <circle cx="4" cy="4" r="0.3" fill="white"/>
            <circle cx="5.5" cy="4.5" r="0.3" fill="white"/>
            <circle cx="4" cy="5" r="0.3" fill="white"/>
            <circle cx="7" cy="1" r="0.3" fill="white"/>
            <circle cx="7" cy="2" r="0.3" fill="white"/>
            <circle cx="7" cy="3" r="0.3" fill="white"/>
            <circle cx="7" cy="4" r="0.3" fill="white"/>
            <circle cx="7" cy="5" r="0.3" fill="white"/>
          </svg>
          <span style={{ color: '#fff', fontFamily: 'var(--font-body)' }}>
            An official website of the United States government
          </span>
          </div>
          <button style={{
            background: 'none',
            border: 'none',
            color: '#73b3e7',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '13px',
            padding: '0',
            fontFamily: 'var(--font-body)'
          }}>
            Here's how you know
          </button>
        </div>
      </div>

      {/* CDC Header - Two-tier USWDS style */}
      <header style={{
        backgroundColor: '#ffffff',
        position: 'relative'
      }}>
        {/* Top tier: Branding */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px 15px',
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <img
            src="https://www.cdc.gov/homepage/images/cdc-logo.svg"
            alt="CDC Logo"
            style={{ height: '40px', width: '40px', flexShrink: 0, objectFit: 'contain' }}
            onError={(e) => { e.target.src = cdcLogoFallback; }}
          />
          <div style={{ minWidth: 0, flex: 1 }}>
            <Link
              to="/"
              style={{
                display: 'block',
                fontSize: isMobile ? '18px' : '24px',
                fontFamily: 'var(--font-header)',
                fontWeight: 700,
                color: '#005ea2',
                lineHeight: '1.2',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textDecoration: 'none'
              }}
            >
              CDC: Path2Prevention
            </Link>
            <div style={{
              fontSize: isMobile ? '12px' : '14px',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              color: '#323a45',
              lineHeight: '1.2',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              Centers for Disease Control and Prevention
            </div>
          </div>
          <Link
            to="/lifestyle-programs"
            style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              color: '#005ea2',
              border: '1px solid #005ea2',
              backgroundColor: 'transparent',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Find a Program
          </Link>
        </div>

      </header>
    </>
  );
};

export default CDCHeader;

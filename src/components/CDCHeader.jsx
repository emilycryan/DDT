import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const navLinkStyle = {
  color: '#323a45',
  textDecoration: 'none',
  fontSize: '16px',
  fontFamily: 'var(--font-body)',
  fontWeight: 400,
  whiteSpace: 'nowrap',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
};

/* Blue circular CDC logo fallback - USWDS primary blue */
const cdcLogoFallback = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#005ea2"/><text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-size="14" font-weight="700">CDC</text></svg>'
);

const CDCHeader = ({ goToHomeSection, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false); // Close mobile menu when switching to desktop
      }
    };

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
          <div style={{ minWidth: 0 }}>
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
        </div>

        {/* Separator */}
        <div style={{ borderBottom: '1px solid #e0e0e0' }} />

        {/* Bottom tier: Navigation */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px 15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px'
        }}>
          {/* Desktop Nav Links (left) */}
          <nav style={{
            display: isMobile ? 'none' : 'flex',
            gap: '18px',
            flex: 1
          }}>
            <Link to="/about" className="header-nav-text-link" style={navLinkStyle}>About</Link>
            <Link to="/learn" className="header-nav-text-link" style={navLinkStyle}>Learn More</Link>
            <Link to="/action" className="header-nav-text-link" style={navLinkStyle}>Take Action</Link>
            <Link to="/for-practitioners" className="header-nav-text-link" style={navLinkStyle}>For Practitioners</Link>
          </nav>

          {/* Right-side buttons: Find a Program + Get Started */}
          <div style={{ display: isMobile ? 'none' : 'flex', gap: '12px', alignItems: 'center' }}>
            <Link
              to="/lifestyle-programs"
              style={{
                ...navLinkStyle,
                display: 'inline-block',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                fontSize: '14px',
                fontWeight: 600,
                color: '#005ea2',
                border: '1px solid #005ea2',
                backgroundColor: 'transparent',
              }}
            >
              Find a Program
            </Link>
            <Link
              to="/get-started"
              style={{
                ...navLinkStyle,
                display: 'inline-block',
                backgroundColor: '#005ea2',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: isMobile ? 'block' : 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '5px',
              marginLeft: 'auto'
            }}
            aria-label="Toggle navigation menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#005ea2">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e0e0e0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: 1000,
            display: isMobile ? 'block' : 'none'
          }}>
            <nav style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '15px'
            }}>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} style={{ display: 'block', color: '#323a45', textDecoration: 'none', fontSize: '16px', fontWeight: 400, padding: '12px 0', borderBottom: '1px solid #e0e0e0', fontFamily: 'var(--font-body)' }}>About</Link>
              <Link to="/learn" onClick={() => setIsMenuOpen(false)} style={{ display: 'block', color: '#323a45', textDecoration: 'none', fontSize: '16px', fontWeight: 400, padding: '12px 0', borderBottom: '1px solid #e0e0e0', fontFamily: 'var(--font-body)' }}>Learn More</Link>
              <Link to="/action" onClick={() => setIsMenuOpen(false)} style={{ display: 'block', color: '#323a45', textDecoration: 'none', fontSize: '16px', fontWeight: 400, padding: '12px 0', borderBottom: '1px solid #e0e0e0', fontFamily: 'var(--font-body)' }}>Take Action</Link>
              <Link to="/for-practitioners" onClick={() => setIsMenuOpen(false)} style={{ display: 'block', color: '#323a45', textDecoration: 'none', fontSize: '16px', fontWeight: 400, padding: '12px 0', borderBottom: '1px solid #e0e0e0', fontFamily: 'var(--font-body)' }}>For Practitioners</Link>
              <Link to="/lifestyle-programs" onClick={() => setIsMenuOpen(false)} style={{ display: 'block', color: '#005ea2', textDecoration: 'none', fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-body)', border: '1px solid #005ea2', padding: '0.75rem 1rem', borderRadius: '0.375rem', marginBottom: '12px' }}>Find a Program</Link>
              <Link to="/get-started" onClick={() => setIsMenuOpen(false)} style={{ display: 'block', backgroundColor: '#005ea2', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', textDecoration: 'none', fontSize: '16px', fontWeight: '600', width: '100%', marginTop: '12px', textAlign: 'center' }}>Get Started</Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default CDCHeader;

import React, { useState, useEffect } from 'react';

const CDCHeader = () => {
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
      {/* Official US Government Banner */}
      <div style={{
        backgroundColor: '#f1f1f1',
        borderBottom: '1px solid #d6d7d9',
        fontSize: '13px',
        padding: '8px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 15px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <svg width="20" height="11" viewBox="0 0 20 11" style={{ marginRight: '8px' }}>
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
          <span style={{ color: '#5a5a5a' }}>
            An official website of the United States government
          </span>
          <button style={{
            background: 'none',
            border: 'none',
            color: '#0071bc',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '13px',
            padding: '0',
            marginLeft: '8px'
          }}>
            Here's how you know
          </button>
        </div>
      </div>

      {/* CDC Header */}
      <header style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #d6d7d9',
        padding: '15px 0',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* CDC Logo and Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: '1' }}>
            <img 
              src="https://www.cdc.gov/homepage/images/cdc-logo.svg"
              alt="CDC Logo"
              style={{ height: '40px', minWidth: '40px' }}
              onError={(e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMwMDcxQkMiLz4KPHRleHQgeD0iMjAiIHk9IjI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5DREMgPC90ZXh0Pgo8L3N2Zz4K";
              }}
            />
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontSize: isMobile ? '18px' : '24px',
                fontWeight: 'bold',
                color: '#0071bc',
                lineHeight: '1.2',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                Path 2 Prevention
              </div>
              <div style={{
                fontSize: isMobile ? '12px' : '14px',
                color: '#666',
                lineHeight: '1.2',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                Centers for Disease Control and Prevention
              </div>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <nav style={{ 
            display: isMobile ? 'none' : 'flex', 
            gap: '30px' 
          }}>
            <a href="#" style={{
              color: '#0071bc',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              whiteSpace: 'nowrap'
            }}>
              What is The Path?
            </a>
            <a href="#" style={{
              color: '#0071bc',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              whiteSpace: 'nowrap'
            }}>
              Why Does it Matter?
            </a>
            <a href="#" style={{
              color: '#0071bc',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              whiteSpace: 'nowrap'
            }}>
              Plan My Path
            </a>
            <a href="#" style={{
              color: '#0071bc',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              whiteSpace: 'nowrap'
            }}>
              Find a Program
            </a>
          </nav>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: isMobile ? 'block' : 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '5px',
              marginLeft: '15px'
            }}
            aria-label="Toggle navigation menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#0071bc">
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
            backgroundColor: '#fff',
            borderBottom: '1px solid #d6d7d9',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: 1000,
            display: isMobile ? 'block' : 'none'
          }}>
            <nav style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '15px'
            }}>
              <a href="#" style={{
                display: 'block',
                color: '#0071bc',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                padding: '12px 0',
                borderBottom: '1px solid #f1f1f1'
              }}>
                What is The Path?
              </a>
              <a href="#" style={{
                display: 'block',
                color: '#0071bc',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                padding: '12px 0',
                borderBottom: '1px solid #f1f1f1'
              }}>
                Why Does it Matter?
              </a>
              <a href="#" style={{
                display: 'block',
                color: '#0071bc',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                padding: '12px 0',
                borderBottom: '1px solid #f1f1f1'
              }}>
                Plan My Path
              </a>
              <a href="#" style={{
                display: 'block',
                color: '#0071bc',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                padding: '12px 0'
              }}>
                Find a Program
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default CDCHeader;

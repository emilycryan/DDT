import React, { useState, useEffect } from 'react';

const CDCFooter = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Main Footer - USWDS dark footer */}
      <footer style={{
        backgroundColor: '#1b1b1b',
        color: '#fff',
        padding: '40px 0 20px 0',
        fontFamily: 'var(--font-body)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          {/* Top Section with About CDC */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '20px',
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            {/* About CDC Section */}
            <div style={{ 
              flex: '1', 
              minWidth: isMobile ? '100%' : '300px' 
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '15px',
                color: '#fff',
                fontFamily: 'var(--font-body)'
              }}>
                About CDC
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'rgba(255,255,255,0.9)',
                marginBottom: '15px',
                fontFamily: 'var(--font-body)'
              }}>
                CDC works 24/7 to protect America from health, safety and security threats, both foreign and domestic. Whether diseases start at home or abroad, are chronic or acute, curable or preventable, human error or deliberate attack, CDC fights disease and supports communities and citizens to do the same.
              </p>
              <a href="https://www.cdc.gov/about/default.htm" target="_blank" rel="noopener noreferrer" style={{
                color: '#73b3e7',
                textDecoration: 'none',
                fontSize: '14px',
                fontFamily: 'var(--font-body)'
              }}>
                Learn more about CDC →
              </a>
            </div>
          </div>

          {/* Footer Links Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile 
              ? '1fr' 
              : 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: isMobile ? '20px' : '30px',
            marginBottom: '30px',
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '30px'
          }}>
            {/* Column 1 */}
            <div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: 'rgba(255,255,255,0.85)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    ':hover': { color: '#3498db' }
                  }}>
                    About CDC
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: 'rgba(255,255,255,0.85)',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Jobs
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: 'rgba(255,255,255,0.85)',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Funding
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: 'rgba(255,255,255,0.85)',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Policies
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: 'rgba(255,255,255,0.85)',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    File Viewers & Players
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: 'rgba(255,255,255,0.85)',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Privacy
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: 'rgba(255,255,255,0.85)',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    FOIA
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: 'rgba(255,255,255,0.85)',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    No Fear Act
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: 'rgba(255,255,255,0.85)',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    OIG
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: 'rgba(255,255,255,0.85)',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Nondiscrimination
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: 'rgba(255,255,255,0.85)',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div style={{
            textAlign: 'center',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255,255,255,0.2)',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'var(--font-body)'
          }}>
            <p style={{ margin: 0 }}>U.S. Department of Health & Human Services | CDC</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CDCFooter;

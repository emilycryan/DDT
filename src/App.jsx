import { useState, useEffect } from 'react'
import './App.css'
import CDCHeader from './components/CDCHeader'
import CDCFooter from './components/CDCFooter'

function App() {
  const [count, setCount] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', margin: 0, padding: 0 }}>
      {/* CDC Header */}
      <CDCHeader />

      {/* Main Content */}
      <main style={{ 
        backgroundColor: '#f8fafc',
        minHeight: '80vh'
      }}>
        {/* Hero Section */}
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '3rem 1rem' : '4rem 2rem',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '2rem' : '4rem',
          alignItems: 'center'
        }}>
          {/* Left Content */}
          <div style={{
            textAlign: isMobile ? 'center' : 'left'
          }}>
            {/* Trust Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '2rem',
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#22c55e">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm3.78-9.72a.75.75 0 0 0-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.5-4.5z"/>
              </svg>
              <span style={{
                color: '#22c55e',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Trusted by CDC
              </span>
            </div>

            {/* Main Heading */}
            <h1 style={{
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              fontWeight: 'bold',
              color: '#1e293b',
              lineHeight: '1.1',
              marginBottom: '1.5rem',
              margin: '0 0 1.5rem 0'
            }}>
              Your Path to Prevention Starts Here
            </h1>

            {/* Description */}
            <p style={{
              fontSize: isMobile ? '1rem' : '1.125rem',
              color: '#64748b',
              lineHeight: '1.6',
              marginBottom: '2rem',
              maxWidth: '500px',
              margin: isMobile ? '0 auto 2rem auto' : '0 0 2rem 0'
            }}>
              Evidence-based tools and resources to help prevent diabetes and other chronic diseases. Take control of your health journey with CDC's trusted guidance.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              <button style={{
                backgroundColor: '#1e40af',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                minWidth: isMobile ? '200px' : 'auto'
              }}>
                Begin Assessment
              </button>
              <button style={{
                backgroundColor: 'transparent',
                color: '#1e40af',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                border: '2px solid #1e40af',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                minWidth: isMobile ? '200px' : 'auto'
              }}>
                Learn More
              </button>
            </div>

            {/* Trust Indicators */}
            <div style={{
              display: 'flex',
              gap: '2rem',
              marginTop: '2rem',
              alignItems: 'center',
              justifyContent: isMobile ? 'center' : 'flex-start',
              flexWrap: 'wrap'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="#22c55e">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm3.78-9.72a.75.75 0 0 0-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.5-4.5z"/>
                </svg>
                <span style={{
                  fontSize: '14px',
                  color: '#64748b'
                }}>
                  Free & Confidential
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="#22c55e">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm3.78-9.72a.75.75 0 0 0-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.5-4.5z"/>
                </svg>
                <span style={{
                  fontSize: '14px',
                  color: '#64748b'
                }}>
                  HIPAA Compliant
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Personalized Health Journey Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e2e8f0'
          }}>
            {/* Medical Team Image */}
            <div style={{
              borderRadius: '0.75rem',
              height: '200px',
              marginBottom: '1.5rem',
              overflow: 'hidden'
            }}>
              <img 
                src="/medical-team.png" 
                alt="Healthcare professionals team - doctors and nurses"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>

            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '1rem',
              margin: '0 0 1rem 0'
            }}>
              Personalized Health Journey
            </h3>

            <p style={{
              fontSize: '0.95rem',
              color: '#64748b',
              lineHeight: '1.5',
              marginBottom: '1.5rem',
              margin: '0 0 1.5rem 0'
            }}>
              Get customized recommendations based on your unique health profile and risk factors.
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#3b82f6">
                <circle cx="8" cy="8" r="8"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm3.78-9.72a.75.75 0 0 0-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.5-4.5z" fill="white"/>
              </svg>
              <span style={{
                fontSize: '14px',
                color: '#3b82f6',
                fontWeight: '500'
              }}>
                Trusted by 2M+ Americans
              </span>
            </div>
          </div>
        </section>

        {/* Backed by Science Section */}
        <section style={{
          backgroundColor: 'white',
          padding: isMobile ? '3rem 1rem' : '4rem 2rem',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '1rem',
              margin: '0 0 1rem 0'
            }}>
              Backed by Science, Trusted by Millions
            </h2>

            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              marginBottom: '3rem',
              maxWidth: '600px',
              margin: '0 auto 3rem auto'
            }}>
              Evidence-based prevention strategies from the nation's health protection agency
            </p>

            {/* Three Column Features */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '2rem'
            }}>
              {/* Evidence-Based */}
              <div style={{
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#1e40af',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#1e293b',
                  marginBottom: '1rem',
                  margin: '0 0 1rem 0'
                }}>
                  Evidence-Based
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#64748b',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  All recommendations backed by rigorous scientific research and clinical studies
                </p>
              </div>

              {/* 2M+ Users */}
              <div style={{
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#059669',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#1e293b',
                  marginBottom: '1rem',
                  margin: '0 0 1rem 0'
                }}>
                  2M+ Users
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#64748b',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  Helping millions of Americans make informed health decisions every year
                </p>
              </div>

              {/* CDC Certified */}
              <div style={{
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#0ea5e9',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#1e293b',
                  marginBottom: '1rem',
                  margin: '0 0 1rem 0'
                }}>
                  CDC Certified
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#64748b',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  Official CDC resource meeting the highest standards of health information
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* CDC Footer */}
      <CDCFooter />
    </div>
  )
}

export default App

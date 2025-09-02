import { useState, useEffect } from 'react'
import './App.css'
import CDCHeader from './components/CDCHeader'
import CDCFooter from './components/CDCFooter'
import Chatbot from './components/Chatbot'

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


            {/* Main Heading */}
            <h1 style={{
              fontSize: isMobile ? '2.25rem' : '3rem',
              fontWeight: 'bold',
              color: '#1e293b',
              lineHeight: '1.1',
              marginBottom: '1.5rem',
              margin: '0 0 1.5rem 0'
            }}>
              Start Your Path to Prevention
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
              Get started on your path to preventing chronic diseases here. Find videos, interactive tools, and personalized information to help you learn more about preventing conditions like heart disease, stroke, diabetes, asthma, and obesity in your life.
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
                Am I at Risk?
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
                How It Works
              </button>
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
              Why Path to Prevention?
            </h3>

            <p style={{
              fontSize: '0.95rem',
              color: '#64748b',
              lineHeight: '1.5',
              marginBottom: '1.5rem',
              margin: '0 0 1.5rem 0'
            }}>
              Path to Prevention is an online resource for people who may be at risk for developing chronic diseases. Find videos, games, and other personalized information to help you learn more about prevention.
            </p>

            <div style={{
              backgroundColor: '#f8fafc',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #e2e8f0'
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: '#475569',
                margin: 0,
                fontStyle: 'italic'
              }}>
                "Many chronic diseases are preventable through lifestyle changes and early intervention."
              </p>
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
              Here's How It Works
            </h2>

            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              marginBottom: '3rem',
              maxWidth: '600px',
              margin: '0 auto 3rem auto'
            }}>
              Click into a section below to find videos, interactive games, and more to start on your Path to Prevention.
            </p>

            {/* Three Column Features */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '2rem'
            }}>
              {/* What is The Path? */}
              <div style={{
                textAlign: 'center',
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '0.75rem',
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
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
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#1e293b',
                  marginBottom: '1rem',
                  margin: '0 0 1rem 0'
                }}>
                  What is The Path?
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#64748b',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  Learn about chronic disease risk factors and how lifestyle changes can help prevent conditions like heart disease, stroke, and diabetes.
                </p>
              </div>

              {/* Get the Facts */}
              <div style={{
                textAlign: 'center',
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '0.75rem',
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
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
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#1e293b',
                  marginBottom: '1rem',
                  margin: '0 0 1rem 0'
                }}>
                  Get the Facts
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#64748b',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  Access evidence-based information about preventing chronic diseases including obesity, asthma, and cardiovascular conditions.
                </p>
              </div>

              {/* Start Your Plan */}
              <div style={{
                textAlign: 'center',
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '0.75rem',
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
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
                    <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#1e293b',
                  marginBottom: '1rem',
                  margin: '0 0 1rem 0'
                }}>
                  Start Your Plan
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#64748b',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  Take a risk assessment and create a personalized action plan with interactive tools and resources tailored to your needs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* CDC Footer */}
      <CDCFooter />
      
      {/* Chatbot */}
      <Chatbot />
    </div>
  )
}

export default App

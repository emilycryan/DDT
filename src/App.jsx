import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import CDCHeader from './components/CDCHeader'
import CDCFooter from './components/CDCFooter'
import Chatbot from './components/Chatbot'
import RiskAssessment from './components/RiskAssessment'
import AssessmentChronicConditions from './components/AssessmentChronicConditions'
import AssessmentCaregiver from './components/AssessmentCaregiver'
import AssessmentJustCurious from './components/AssessmentJustCurious'
import About from './components/About'
import Resources from './components/Resources'
import Support from './components/Support'
import ForPractitioners from './components/ForPractitioners'
import PractitionerFeedback from './components/PractitionerFeedback'
import HowItWorks from './components/HowItWorks'
import LifestylePrograms from './components/LifestylePrograms'

const PAGE_TO_PATH = {
  'about': '/about',
  'resources': '/resources',
  'support': '/support',
  'for-practitioners': '/for-practitioners',
  'how-it-works': '/how-it-works',
  'risk-assessment': '/get-started',
  'lifestyle-programs': '/lifestyle-programs',
  'assessment-chronic': '/get-started/for-myself',
  'assessment-caregiver': '/get-started/for-someone',
  'assessment-just-curious': '/get-started/just-curious',
}

const PATH_TO_PAGE = Object.fromEntries(Object.entries(PAGE_TO_PATH).map(([k, v]) => [v, k]))

const scrollToSection = (sectionId) => {
  requestAnimationFrame(() => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 30
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({ top: Math.max(0, elementTop - offset), behavior: 'smooth' })
    }
  })
}

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const onNavigate = (page) => {
    const path = PAGE_TO_PATH[page] || (page === 'home' ? '/' : `/${page}`)
    navigate(path)
    window.scrollTo(0, 0)
  }

  const goToHomeSection = (sectionId) => {
    navigate('/')
    setTimeout(() => scrollToSection(sectionId), 150)
  }

  const handleChatbotNavigate = (target) => {
    if (['about', 'resources', 'support', 'for-practitioners', 'how-it-works', 'risk-assessment', 'lifestyle-programs'].includes(target)) onNavigate(target)
    else goToHomeSection(target)
  }

  const navigateTo = (target) => {
    if (['about', 'resources', 'support', 'for-practitioners', 'how-it-works', 'risk-assessment', 'lifestyle-programs'].includes(target)) onNavigate(target)
    else goToHomeSection(target)
  }

  const currentPage = location.pathname === '/' ? 'home' : (PATH_TO_PAGE[location.pathname] || 'home')

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', margin: 0, padding: 0 }}>
      <CDCHeader goToHomeSection={goToHomeSection} currentPage={currentPage} />

      <Routes>
      <Route path="/about" element={<main style={{ minHeight: '80vh' }}><About /></main>} />
      <Route path="/resources" element={<main style={{ minHeight: '80vh' }}><Resources onNavigate={navigateTo} /></main>} />
      <Route path="/support" element={<main style={{ minHeight: '80vh' }}><Support /></main>} />
      <Route path="/for-practitioners" element={<main style={{ minHeight: '80vh' }}><ForPractitioners /></main>} />
      <Route path="/for-practitioners/feedback" element={<main style={{ minHeight: '80vh' }}><PractitionerFeedback /></main>} />
      <Route path="/how-it-works" element={<main style={{ minHeight: '80vh' }}><HowItWorks /></main>} />
      <Route path="/get-started" element={<RiskAssessment onNavigate={onNavigate} />} />
      <Route path="/get-started/for-myself" element={<AssessmentChronicConditions onBack={() => onNavigate('risk-assessment')} />} />
      <Route path="/get-started/for-someone" element={<AssessmentCaregiver onBack={() => onNavigate('risk-assessment')} />} />
      <Route path="/get-started/just-curious" element={<AssessmentJustCurious onBack={() => onNavigate('risk-assessment')} />} />
      <Route path="/lifestyle-programs" element={<main style={{ minHeight: '80vh' }}><LifestylePrograms /></main>} />
      <Route path="/" element={
        <main style={{ 
          backgroundColor: 'var(--bg-secondary)',
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
              fontFamily: 'var(--font-header)',
              fontWeight: '800',
              color: 'var(--text-primary)',
              lineHeight: '1.1',
              marginBottom: '1.5rem',
              margin: '0 0 1.5rem 0',
              letterSpacing: '-0.025em'
            }}>
              Start Your Path2Prevention
            </h1>

            {/* Description */}
            <p style={{
              fontSize: isMobile ? '1rem' : '1.125rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: '2rem',
              maxWidth: '500px',
              margin: isMobile ? '0 auto 2rem auto' : '0 0 2rem 0'
            }}>
              Get started on your CDC: Path2Prevention journey to prevent chronic diseases. Find videos, interactive tools, and personalized information to help you learn more about preventing conditions like heart disease, stroke, diabetes, COPD, and obesity in your life.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              <button 
                onClick={() => onNavigate('risk-assessment')}
                className="btn btn-primary"
                style={{
                  minWidth: isMobile ? '200px' : 'auto'
                }}
              >
                Am I at Risk?
              </button>
              <button 
                onClick={() => onNavigate('how-it-works')}
                className="btn btn-secondary"
                style={{
                  minWidth: isMobile ? '200px' : 'auto'
                }}
              >
                How It Works
              </button>
            </div>


          </div>

          {/* Right Content - Personalized Health Journey Card */}
          <div className="card" style={{
            padding: '2rem'
          }}>
            {/* Diverse Group Healthy Meal Image */}
            <div className="image-overlay" style={{
              height: '200px',
              marginBottom: '1.5rem'
            }}>
              <img 
                src="/diverse-group-eating.jpg" 
                alt="Diverse group of people sharing a healthy meal together around a wooden table"
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
              fontFamily: 'var(--font-header)',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              margin: '0 0 1rem 0'
            }}>
              Why CDC: Path2Prevention?
            </h3>

            <p style={{
              fontSize: '0.95rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
              marginBottom: '1.5rem',
              margin: '0 0 1.5rem 0'
            }}>
              CDC: Path2Prevention is an online resource for people who may be at risk for developing chronic diseases. Find videos, games, and other personalized information to help you learn more about prevention.
            </p>

            <div className="quote-card">
              <p style={{
                fontSize: '0.875rem',
                fontFamily: 'var(--font-body)',
                color: 'var(--text-secondary)',
                margin: 0,
                fontWeight: '500'
              }}>
                "Many chronic diseases are preventable through lifestyle changes and early intervention."
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section style={{
          backgroundColor: 'var(--bg-primary)',
          padding: isMobile ? '3rem 1rem' : '4rem 2rem',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontFamily: 'var(--font-header)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              margin: '0 0 1rem 0'
            }}>
              Here's How It Works
            </h2>

            <p style={{
              fontSize: '1.125rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--text-secondary)',
              marginBottom: '3rem',
              maxWidth: '600px',
              margin: '0 auto 3rem auto'
            }}>
              Click into a section below to find videos, interactive games, and more to start on your CDC: Path2Prevention.
            </p>

            {/* Three Column Features */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '2rem'
            }}>
              {/* What is The Path? */}
              <div 
                onClick={() => onNavigate('about')}
                className="card"
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  cursor: 'pointer'
                }}
              >
                <div className="icon-circle icon-circle-primary">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontFamily: 'var(--font-header)',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '1rem',
                  margin: '0 0 1rem 0'
                }}>
                  What is The Path?
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  Learn about chronic disease risk factors and how lifestyle changes can help prevent conditions like heart disease, stroke, and diabetes.
                </p>
              </div>

              {/* Get the Facts */}
              <div 
                onClick={() => onNavigate('resources')}
                className="card"
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  cursor: 'pointer'
                }}
              >
                <div className="icon-circle icon-circle-accent">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontFamily: 'var(--font-header)',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '1rem',
                  margin: '0 0 1rem 0'
                }}>
                  Get the Facts
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  Access evidence-based information about preventing chronic diseases including obesity, COPD, and cardiovascular conditions.
                </p>
              </div>

              {/* Start Your Plan */}
              <div 
                onClick={() => onNavigate('risk-assessment')}
                className="card"
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  cursor: 'pointer'
                }}
              >
                <div className="icon-circle icon-circle-grey">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontFamily: 'var(--font-header)',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '1rem',
                  margin: '0 0 1rem 0'
                }}>
                  Start Your Plan
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-secondary)',
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
      } />
      </Routes>

      {/* CDC Footer */}
      <CDCFooter />
      
      {/* Chatbot */}
      <Chatbot onNavigate={handleChatbotNavigate} />
    </div>
  )
}

export default App

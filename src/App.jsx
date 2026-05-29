import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import './App.css'
import CDCHeader from './components/CDCHeader'
import CDCFooter from './components/CDCFooter'
import Chatbot from './components/Chatbot'
import AssessmentChronicConditions from './components/AssessmentChronicConditions'
import AssessmentCaregiver from './components/AssessmentCaregiver'
import AssessmentJustCurious from './components/AssessmentJustCurious'
import ChildPathPlaceholder from './components/ChildPathPlaceholder'
import HomePathPicker from './components/HomePathPicker'
import About from './components/About'
import Learn from './components/Learn'
import Action from './components/Action'
import ForPractitioners from './components/ForPractitioners'
import PractitionerFeedback from './components/PractitionerFeedback'
import HowItWorks from './components/HowItWorks'
import LifestylePrograms from './components/LifestylePrograms'
import HowToReadFoodLabels from './components/HowToReadFoodLabels'
import MealPlanningOnBudget from './components/MealPlanningOnBudget'
import MovingMoreWhenBusy from './components/MovingMoreWhenBusy'
import SettingRealisticGoals from './components/SettingRealisticGoals'
import PlanMyPath from './components/PlanMyPath'
import PlanMyPathMotivators from './components/PlanMyPathMotivators'
import PlanMyPathDppInfo from './components/PlanMyPathDppInfo'
import PlanMyPathBarriers from './components/PlanMyPathBarriers'
import PlanMyPathClassPreferences from './components/PlanMyPathClassPreferences'
import PlanMyPathSelectDate from './components/PlanMyPathSelectDate'
import PlanMyPathCompleted from './components/PlanMyPathCompleted'
import FAQs from './components/FAQs'
import RiskFactorChecklist from './components/RiskFactorChecklist'
import WeeklyActivityTrackingSheet from './components/WeeklyActivityTrackingSheet'
import GoalSettingWorksheet from './components/GoalSettingWorksheet'

const PAGE_TO_PATH = {
  'about': '/about',
  'learn': '/learn',
  'action': '/action',
  'for-practitioners': '/for-practitioners',
  'how-it-works': '/how-it-works',
  'lifestyle-programs': '/lifestyle-programs',
  'plan-my-path': '/action/plan-my-path',
  'assessment-chronic': '/get-started/for-myself',
  'assessment-caregiver': '/get-started/for-someone',
  'assessment-just-curious': '/get-started/just-curious',
}

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

function PrefixRedirect({ fromPrefix, toPrefix }) {
  const location = useLocation()
  const pathname = location.pathname || '/'
  if (!pathname.startsWith(fromPrefix)) return <Navigate to="/" replace />

  const nextPathname = pathname.replace(fromPrefix, toPrefix)
  const to = `${nextPathname}${location.search || ''}${location.hash || ''}`
  return <Navigate to={to} replace />
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

  // Scroll to top on route change (including Link clicks)
  useEffect(() => {
    if (location.hash) {
      scrollToSection(location.hash.slice(1))
      return
    }

    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  const onNavigate = (page) => {
    const normalizedPage = page === 'resources' ? 'learn' : (page === 'support' ? 'action' : page)
    const path = PAGE_TO_PATH[normalizedPage] || (normalizedPage === 'home' ? '/' : `/${normalizedPage}`)
    navigate(path)
    window.scrollTo(0, 0)
  }

  const goToHomeSection = (sectionId) => {
    navigate('/')
    setTimeout(() => scrollToSection(sectionId), 150)
  }

  const handleChatbotNavigate = (destination) => {
    if (['about', 'learn', 'action', 'resources', 'support', 'for-practitioners', 'how-it-works', 'lifestyle-programs', 'plan-my-path'].includes(destination)) onNavigate(destination)
    else goToHomeSection(destination)
  }

  const navigateTo = (destination) => {
    if (['about', 'learn', 'action', 'resources', 'support', 'for-practitioners', 'how-it-works', 'lifestyle-programs', 'plan-my-path'].includes(destination)) onNavigate(destination)
    else goToHomeSection(destination)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', margin: 0, padding: 0 }}>
      <CDCHeader />

      <Routes>
      {/* Backward-compatible URL prefixes */}
      <Route path="/resources/*" element={<PrefixRedirect fromPrefix="/resources" toPrefix="/learn" />} />
      <Route path="/support/*" element={<PrefixRedirect fromPrefix="/support" toPrefix="/action" />} />

      <Route path="/about" element={<main style={{ minHeight: '80vh' }}><About onNavigate={onNavigate} /></main>} />
      <Route path="/learn" element={
        <main style={{ minHeight: '80vh' }}>
          <Learn onNavigate={navigateTo} />
          <section style={{ backgroundColor: '#f0f4f8', padding: isMobile ? '3rem 1rem' : '4rem 2rem' }}>
            <FAQs />
          </section>
        </main>
      } />
      <Route path="/action" element={<main style={{ minHeight: '80vh' }}><Action /></main>} />
      <Route path="/action/tips/how-to-read-food-labels" element={<main style={{ minHeight: '80vh' }}><HowToReadFoodLabels /></main>} />
      <Route path="/action/tips/meal-planning-on-budget" element={<main style={{ minHeight: '80vh' }}><MealPlanningOnBudget /></main>} />
      <Route path="/action/tips/moving-more-when-busy" element={<main style={{ minHeight: '80vh' }}><MovingMoreWhenBusy /></main>} />
      <Route path="/action/tips/setting-realistic-goals" element={<main style={{ minHeight: '80vh' }}><SettingRealisticGoals /></main>} />
      <Route path="/action/plan-my-path" element={<main style={{ minHeight: '80vh' }}><PlanMyPath /></main>} />
      <Route path="/action/plan-my-path/motivators" element={<main style={{ minHeight: '80vh' }}><PlanMyPathMotivators /></main>} />
      <Route path="/action/plan-my-path/dpp-info" element={<main style={{ minHeight: '80vh' }}><PlanMyPathDppInfo /></main>} />
      <Route path="/action/plan-my-path/barriers" element={<main style={{ minHeight: '80vh' }}><PlanMyPathBarriers /></main>} />
      <Route path="/action/plan-my-path/class-preferences" element={<main style={{ minHeight: '80vh' }}><PlanMyPathClassPreferences /></main>} />
      <Route path="/action/plan-my-path/select-date" element={<main style={{ minHeight: '80vh' }}><PlanMyPathSelectDate /></main>} />
      <Route path="/action/plan-my-path/completed" element={<main style={{ minHeight: '80vh' }}><PlanMyPathCompleted /></main>} />
      <Route path="/for-practitioners" element={<main style={{ minHeight: '80vh' }}><ForPractitioners /></main>} />
      <Route path="/for-practitioners/feedback" element={<main style={{ minHeight: '80vh' }}><PractitionerFeedback /></main>} />
      <Route path="/for-practitioners/risk-factor-checklist" element={<main style={{ minHeight: '80vh' }}><RiskFactorChecklist /></main>} />
      <Route path="/for-practitioners/weekly-activity-tracking-sheet" element={<main style={{ minHeight: '80vh' }}><WeeklyActivityTrackingSheet /></main>} />
      <Route path="/for-practitioners/goal-setting-worksheet" element={<main style={{ minHeight: '80vh' }}><GoalSettingWorksheet /></main>} />
      <Route path="/how-it-works" element={<main style={{ minHeight: '80vh' }}><HowItWorks /></main>} />
      <Route path="/get-started" element={<Navigate to="/" replace />} />
      <Route path="/get-started/for-myself" element={<AssessmentChronicConditions onBack={() => navigate('/')} />} />
      <Route path="/get-started/for-someone" element={<AssessmentCaregiver onBack={() => navigate('/')} />} />
      <Route path="/get-started/just-curious" element={<AssessmentJustCurious onBack={() => navigate('/')} />} />
      <Route path="/get-started/for-child" element={<main style={{ minHeight: '80vh' }}><ChildPathPlaceholder /></main>} />
      <Route path="/lifestyle-programs" element={<main style={{ minHeight: '80vh' }}><LifestylePrograms /></main>} />
      <Route path="/" element={<main style={{ minHeight: '80vh' }}><HomePathPicker /></main>} />
      </Routes>

      {/* CDC Footer */}
      <CDCFooter />
      
      {/* Chatbot */}
      <Chatbot onNavigate={handleChatbotNavigate} />
    </div>
  )
}

export default App

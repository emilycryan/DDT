import { SurveyProvider, useSurvey } from './context/SurveyContext.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Landing from './pages/Landing.jsx'
import Survey from './pages/Survey.jsx'
import Results from './pages/Results.jsx'

function Screen() {
  const { phase } = useSurvey()
  if (phase === 'survey') return <Survey />
  if (phase === 'results') return <Results />
  return <Landing />
}

export default function App() {
  return (
    <SurveyProvider>
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      <Header />
      <Screen />
      <Footer />
    </SurveyProvider>
  )
}

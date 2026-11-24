import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { FIRST_QUESTION_ID } from '../survey/questions.js'

/**
 * All survey state lives in React memory only. Nothing is written to
 * localStorage, cookies, or a server — when the user leaves or refreshes
 * the page, everything is gone.
 *
 * answers is a map of questionId -> answer value, so any answer
 * (e.g. the user's name) can be read back while the survey is running
 * and used to drive branching or interpolation in question text.
 */
const SurveyContext = createContext(null)

export function SurveyProvider({ children }) {
  // phase: 'landing' | 'survey' | 'results'
  const [phase, setPhase] = useState('landing')
  const [currentQuestionId, setCurrentQuestionId] = useState(FIRST_QUESTION_ID)
  const [answers, setAnswers] = useState({})
  // history of visited question ids, so Back works across branches
  const [history, setHistory] = useState([])

  const startSurvey = useCallback(() => {
    setAnswers({})
    setHistory([])
    setCurrentQuestionId(FIRST_QUESTION_ID)
    setPhase('survey')
  }, [])

  const answerQuestion = useCallback((questionId, value, nextQuestionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
    if (nextQuestionId) {
      setHistory((prev) => [...prev, questionId])
      setCurrentQuestionId(nextQuestionId)
    } else {
      setPhase('results')
    }
  }, [])

  const goBack = useCallback(() => {
    setHistory((prev) => {
      if (prev.length === 0) {
        setPhase('landing')
        return prev
      }
      const next = [...prev]
      const last = next.pop()
      setCurrentQuestionId(last)
      return next
    })
  }, [])

  const restart = useCallback(() => {
    setAnswers({})
    setHistory([])
    setCurrentQuestionId(FIRST_QUESTION_ID)
    setPhase('landing')
  }, [])

  const value = useMemo(
    () => ({
      phase,
      currentQuestionId,
      answers,
      startSurvey,
      answerQuestion,
      goBack,
      restart,
    }),
    [phase, currentQuestionId, answers, startSurvey, answerQuestion, goBack, restart],
  )

  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>
}

export function useSurvey() {
  const ctx = useContext(SurveyContext)
  if (!ctx) {
    throw new Error('useSurvey must be used inside <SurveyProvider>')
  }
  return ctx
}

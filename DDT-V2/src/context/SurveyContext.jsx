import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { FIRST_QUESTION_ID, END, resolveNext } from '../survey/questions.js'

/**
 * All survey state lives in React memory only. Nothing is written to
 * localStorage, cookies, or a server — when the user leaves or refreshes
 * the page, everything is gone.
 *
 * answers maps questionId -> answer value:
 *   name questions   → string | null (null = declined to share)
 *   radio            → option value string
 *   checkbox         → array of option value strings (+ answers.<id>_other text)
 *   age              → number
 *   zip (location)   → { zip } or { preference, state? }
 *   language         → array of up to 3 language strings
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

  /**
   * Record the answer(s) and advance. `extra` lets a question store
   * secondary values (e.g. "Something else" free text) in the same step.
   */
  const answerQuestion = useCallback(
    (questionId, value, extra = {}) => {
      const newAnswers = { ...answers, [questionId]: value, ...extra }
      setAnswers(newAnswers)
      const nextId = resolveNext(questionId, newAnswers)
      if (nextId === END) {
        setPhase('results')
      } else {
        setHistory((prev) => [...prev, questionId])
        setCurrentQuestionId(nextId)
      }
    },
    [answers],
  )

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

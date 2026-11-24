import { useState } from 'react'
import { useSurvey } from '../context/SurveyContext.jsx'
import { QUESTIONS } from '../survey/questions.js'

/** Replace "{name}" (or any {questionId}) in question text with stored answers. */
function interpolate(text, answers) {
  return text.replace(/\{(\w+)\}/g, (match, key) => answers[key] ?? match)
}

export default function Survey() {
  const { currentQuestionId, answers, answerQuestion, goBack } = useSurvey()
  const [textValue, setTextValue] = useState('')

  const question = QUESTIONS[currentQuestionId]
  if (!question) {
    return (
      <main id="main-content">
        <div className="grid-container usa-section">
          <div className="usa-alert usa-alert--error">
            <div className="usa-alert__body">
              <p className="usa-alert__text">
                Unknown question id: {currentQuestionId}
              </p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const prompt = interpolate(question.question, answers)

  function submitText(event) {
    event.preventDefault()
    const value = textValue.trim()
    if (!value) return
    setTextValue('')
    answerQuestion(question.id, value, question.next)
  }

  function choose(option) {
    answerQuestion(question.id, option.value, option.next)
  }

  return (
    <main id="main-content">
      <section className="usa-section">
        <div className="grid-container">
          <div className="grid-row">
            <div className="tablet:grid-col-8 desktop:grid-col-6">
              <h1 className="font-heading-xl text-primary-darker margin-top-0">
                {prompt}
              </h1>

              {question.type === 'text' && (
                <form className="usa-form" onSubmit={submitText}>
                  <label className="usa-label" htmlFor={question.id}>
                    Your answer
                  </label>
                  <input
                    className="usa-input"
                    id={question.id}
                    name={question.id}
                    type="text"
                    value={textValue}
                    onChange={(event) => setTextValue(event.target.value)}
                  />
                  <button type="submit" className="usa-button margin-top-3">
                    Next
                  </button>
                </form>
              )}

              {question.type === 'choice' && (
                <fieldset className="usa-fieldset">
                  <legend className="usa-sr-only">{prompt}</legend>
                  {question.options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className="usa-button usa-button--outline display-block margin-top-2"
                      onClick={() => choose(option)}
                    >
                      {option.label}
                    </button>
                  ))}
                </fieldset>
              )}

              <button
                type="button"
                className="usa-button usa-button--unstyled margin-top-4"
                onClick={goBack}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

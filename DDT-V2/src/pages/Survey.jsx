import { useSurvey } from '../context/SurveyContext.jsx'
import { QUESTIONS, SECTIONS, buildCtx } from '../survey/questions.js'
import NameQuestion from '../components/questions/NameQuestion.jsx'
import RadioQuestion from '../components/questions/RadioQuestion.jsx'
import CheckboxQuestion from '../components/questions/CheckboxQuestion.jsx'
import AgeQuestion from '../components/questions/AgeQuestion.jsx'
import ZipQuestion from '../components/questions/ZipQuestion.jsx'
import LanguageQuestion from '../components/questions/LanguageQuestion.jsx'

function SectionProgress({ current }) {
  const currentIndex = SECTIONS.indexOf(current)
  return (
    <div
      className="usa-step-indicator usa-step-indicator--no-labels margin-bottom-4"
      aria-label={`Section ${currentIndex + 1} of ${SECTIONS.length}: ${current}`}
    >
      <ol className="usa-step-indicator__segments">
        {SECTIONS.map((section, index) => (
          <li
            key={section}
            className={`usa-step-indicator__segment${
              index < currentIndex
                ? ' usa-step-indicator__segment--complete'
                : index === currentIndex
                  ? ' usa-step-indicator__segment--current'
                  : ''
            }`}
          >
            <span className="usa-step-indicator__segment-label">{section}</span>
          </li>
        ))}
      </ol>
      <div className="usa-step-indicator__header">
        <h2 className="usa-step-indicator__heading">
          <span className="usa-step-indicator__heading-counter">
            <span className="usa-sr-only">Section</span>
            <span className="usa-step-indicator__current-step">
              {currentIndex + 1}
            </span>
            <span className="usa-step-indicator__total-steps">
              {' '}of {SECTIONS.length}
            </span>
          </span>
          <span className="usa-step-indicator__heading-text">{current}</span>
        </h2>
      </div>
    </div>
  )
}

export default function Survey() {
  const { currentQuestionId, answers, answerQuestion, goBack } = useSurvey()

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

  const ctx = buildCtx(answers)
  const { intro, question: prompt, hint } = question.text(ctx, answers)
  const options = question.options ? question.options(ctx) : null
  const onAnswer = (value, extra) =>
    answerQuestion(question.id, value, extra)

  let body
  switch (question.type) {
    case 'name':
      body = <NameQuestion question={question} onAnswer={onAnswer} />
      break
    case 'radio':
      body = (
        <RadioQuestion question={question} options={options} onAnswer={onAnswer} />
      )
      break
    case 'checkbox':
      body = (
        <CheckboxQuestion question={question} options={options} onAnswer={onAnswer} />
      )
      break
    case 'age':
      body = <AgeQuestion question={question} onAnswer={onAnswer} />
      break
    case 'zip':
      body = <ZipQuestion question={question} onAnswer={onAnswer} />
      break
    case 'language':
      body = <LanguageQuestion question={question} onAnswer={onAnswer} />
      break
    default:
      body = null
  }

  return (
    <main id="main-content">
      <section className="usa-section">
        <div className="grid-container">
          <div className="grid-row">
            <div className="tablet:grid-col-10 desktop:grid-col-8">
              <SectionProgress current={question.section} />
              {intro && <p className="usa-intro">{intro}</p>}
              {/* key forces a fresh fieldset per question so local state resets */}
              <h1
                className="font-heading-xl text-primary-darker margin-top-0"
                key={`${question.id}-h`}
              >
                {prompt}
              </h1>
              {hint && <p className="usa-hint margin-bottom-2">{hint}</p>}
              <div key={question.id}>{body}</div>
              <button
                type="button"
                className="usa-button usa-button--unstyled margin-top-4"
                onClick={goBack}
              >
                &larr; Back
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

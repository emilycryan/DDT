import { useSurvey } from '../context/SurveyContext.jsx'
import { getResults } from '../survey/questions.js'

export default function Results() {
  const { answers, restart } = useSurvey()
  const results = getResults(answers)

  return (
    <main id="main-content">
      <section className="usa-section">
        <div className="grid-container">
          <div className="grid-row">
            <div className="tablet:grid-col-10 desktop:grid-col-8">
              <h1 className="font-heading-2xl text-primary-darker margin-top-0">
                {results.heading}
              </h1>
              <p className="usa-intro">{results.body}</p>
              <button
                type="button"
                className="usa-button usa-button--outline margin-top-2"
                onClick={restart}
              >
                Start over
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

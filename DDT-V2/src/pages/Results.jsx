import { useSurvey } from '../context/SurveyContext.jsx'
import { getResults } from '../survey/results.js'

export default function Results() {
  const { answers, restart } = useSurvey()
  const results = getResults(answers)

  return (
    <main id="main-content">
      <section className="usa-section bg-primary-lightest">
        <div className="grid-container">
          <div className="grid-row">
            <div className="tablet:grid-col-10 desktop:grid-col-8">
              <h1 className="font-heading-2xl text-primary-darker margin-top-0">
                {results.heading}
              </h1>
              <p className="usa-intro">{results.message}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="usa-section padding-top-4">
        <div className="grid-container">
          {results.filters.length > 0 && (
            <div className="margin-bottom-4">
              <h2 className="font-heading-md text-base-darker margin-bottom-1">
                Showing programs that match
              </h2>
              <ul className="usa-list usa-list--unstyled display-flex flex-wrap">
                {results.filters.map((filter) => (
                  <li
                    key={filter.label}
                    className="usa-tag usa-tag--big bg-primary-lighter text-ink margin-right-1 margin-bottom-1 text-no-uppercase"
                  >
                    <strong>{filter.label}:</strong>&nbsp;{filter.value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <h2 className="font-heading-lg text-primary-darker">
            {results.browsing
              ? 'All programs'
              : results.pName
                ? `Recommended programs for ${results.pName}`
                : 'Recommended programs'}
          </h2>

          <ul className="usa-card-group margin-top-2">
            {results.programs.map((program) => (
              <li
                key={program.id}
                className="usa-card tablet:grid-col-6 desktop:grid-col-4"
              >
                <div className="usa-card__container">
                  <div className="usa-card__header">
                    <h3 className="usa-card__heading font-heading-sm">
                      {program.name}
                    </h3>
                  </div>
                  <div className="usa-card__body">
                    <p className="font-body-2xs text-base margin-top-0">
                      {program.division}
                    </p>
                    <p>{program.description}</p>
                  </div>
                  <div className="usa-card__footer">
                    <button type="button" className="usa-button usa-button--outline">
                      Learn more
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="usa-alert usa-alert--info usa-alert--slim margin-top-4">
            <div className="usa-alert__body">
              <p className="usa-alert__text">
                Prototype: program listings and filtering are placeholders. The
                full program inventory, locator map, and tag-based filtering
                come later.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="usa-button usa-button--outline margin-top-4"
            onClick={restart}
          >
            Start over
          </button>
        </div>
      </section>
    </main>
  )
}
